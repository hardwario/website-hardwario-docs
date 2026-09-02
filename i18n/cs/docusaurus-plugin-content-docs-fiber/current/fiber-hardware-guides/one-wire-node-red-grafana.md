---
title: Čtení senzorů 1-Wire do Grafany
description: "Osm izolovaných portů 1-Wire zařízení FIBER se v Linuxu objevuje jako osm nezávislých bus masterů, takže sonda"
---

# Čtení senzorů 1-Wire do Grafany {#reading-1-wire-sensors-into-grafana}

**Pouze FIBER** — zařízení FIBER Lite nemá 1-Wire hub (viz [V čem se liší](/fiber/fiber-lite/introduction#whats-different)).

Osm izolovaných portů 1-Wire zařízení FIBER se v Linuxu objevuje jako osm nezávislých bus masterů, takže sonda
na portu 3 je viditelná na jiné cestě než sonda na portu 5. Jejich čtení nevyžaduje instalaci ovladače
ani žádnou konfiguraci — jádro je zpřístupňuje samo.

## Jak je osm portů zapojeno {#how-the-eight-ports-are-wired}

Porty **nejsou** bit-banged GPIO. Sedí za převodníkem **DS2482** I2C na 1-Wire na
adrese `0x18` na sběrnici `i2c-10`, který obsluhuje modul jádra `ds2482`. Každý fyzický port má
vlastního mastera:

```sh
ls /sys/bus/w1/devices/
```

```text
w1_bus_master1  w1_bus_master2  w1_bus_master3  w1_bus_master4
w1_bus_master5  w1_bus_master6  w1_bus_master7  w1_bus_master8
```

`w1_bus_masterN` odpovídá fyzickému portu *N*. Převodník a moduly `ds2482`, `wire` a
`w1_therm` jsou součástí dodávaného image — není co instalovat ani zapínat.

## Jak zjistit, na kterých portech jsou sondy {#finding-which-ports-have-probes}

Každý detekovaný senzor se zároveň objeví jako symlink přímo pod `/sys/bus/w1/devices/`, pojmenovaný podle
svého rodinného kódu a unikátního ROM ID — `28-…` je rodina DS18B20:

```sh
ls -d /sys/bus/w1/devices/28-*
```

Chcete-li zjistit, na kterém portu který senzor je, zeptejte se masterů:

```sh
for m in /sys/bus/w1/devices/w1_bus_master*; do
  echo "$(basename "$m"): $(cat "$m/w1_master_slave_count") -> $(cat "$m/w1_master_slaves" | tr '\n' ' ')"
done
```

```text
w1_bus_master1: 0 ->
w1_bus_master2: 0 ->
w1_bus_master3: 1 -> 28-00000bc830e0
w1_bus_master4: 0 ->
...
```

Prázdný port hlásí `0` a nevypisuje nic. Port se senzorem, který zmizel, si ponechá
poslední známé ROM ID, ale přestane se aktualizovat — viz [Řešení problémů](#troubleshooting) níže.

## Čtení teploty {#reading-a-temperature}

Každý senzor zpřístupňuje soubor `temperature` v **tisícinách stupně Celsia**:

```sh
cat /sys/bus/w1/devices/28-00000bc830e0/temperature
```

```text
24625
```

To je 24,625 °C. Vydělte tisícem.

Surový soubor `w1_slave` dává stejnou hodnotu plus stav CRC, což je přesně to, co potřebujete při
diagnostice nespolehlivé sondy nebo dlouhého kabelu:

```sh
cat /sys/bus/w1/devices/28-00000bc830e0/w1_slave
```

```text
8a 01 4b 46 7f ff 06 10 2c : crc=2c YES
8a 01 4b 46 7f ff 06 10 2c t=24625
```

`crc=2c YES` znamená, že je čtení důvěryhodné. `NO` znamená, že hodnota na druhém řádku je
nesmysl a musí se zahodit, nikoli započítat do průměru.

:::note

Čtení těchto souborů spustí na sběrnici převod, který trvá až ~750 ms na senzor. Aplikace
FIBER už stejné sondy vzorkuje každé 2 sekundy, takže vlastní dotazování držte skromné —
pár sekund mezi čteními bohatě stačí a sběrnice tak zůstane volná pro aplikaci,
která řídí alarmy.

:::

## Jak dostat naměřené hodnoty do Node-RED {#getting-the-readings-into-node-red}

Stačí jediný uzel `exec` — žádný contrib balíček, žádná další závislost. Nasměrujte ho na krátký
shellový příkaz a nechte Node-RED zpracovat výstup.

Použijte uzel **inject** s opakovaným intervalem → uzel **exec** spouštějící:

```sh
for d in /sys/bus/w1/devices/28-*; do echo "$(basename $d) $(cat $d/temperature)"; done
```

a poté uzel **function**, který řádky převede na jednu zprávu na senzor:

```javascript
// exec output: one "28-<romid> <milli-degC>" line per sensor
var out = [];
(msg.payload || "").trim().split("\n").forEach(function (line) {
    var parts = line.trim().split(/\s+/);
    if (parts.length !== 2) { return; }
    var milli = parseInt(parts[1], 10);
    if (isNaN(milli)) { return; }
    out.push({
        measurement: "onewire",
        tags: { sensor: parts[0] },
        fields: { temperature: milli / 1000 }
    });
});
return [{ payload: out }];
```

Přiveďte to do uzlu **influxdb batch** a hodnoty přistanou jako measurement `onewire` označený
tagem s ROM ID, připravený ke grafování.

:::tip

Tagujte podle **ROM ID**, ne podle čísla portu. ROM ID je vypálené v sondě, takže si senzor podrží
svou identitu v databázi i tehdy, když ho někdo přesune na jiný port — a přesně to potřebujete
při porovnávání týdenní historie.

:::

## Ukládání a vizualizace naměřených hodnot {#storing-and-visualizing-the-readings}

Node-RED, InfluxDB a Grafana jsou součástí stejného sdíleného stacku u obou variant — viz
[Instalace Node-RED](/fiber/installation/node-red), [Instalace InfluxDB](/fiber/installation/influxdb)
a [Instalace Grafany](/fiber/installation/grafana). Výše uvedený flow tedy zapisuje do InfluxDB na
stejném zařízení a Grafana si data čte lokálně.

Časová řada `temperature` seskupená podle tagu `sensor` je obvyklý výchozí bod pro
panel.

:::note

Před zapojením flow ověřte, že je stack přítomen:

```sh
command -v influxd grafana-server node-red
```

Pokud se nic nevrátí, jednotka běží na image sestaveném dříve, než byly součástí. Nasměrujte
flow na jiný host, který je má — zařízení FIBER provozuje **Mosquitto**, takže publikování hodnot do MQTT
a odběr z onoho stroje je cesta nejmenšího odporu.

:::

## Řešení problémů {#troubleshooting}

**Port ukazuje `0` slave zařízení.** Na daném fyzickém portu není nic detekováno. Zkontrolujte nejprve zapojení
sondy — 1-Wire potřebuje data a zem a sonda s parazitním napájením potřebuje navíc pull-up. Porty
jsou vzájemně izolované, takže porucha na jednom neruší ostatní.

**`crc=... NO`.** Senzor odpověděl, ale rámec byl poškozený. Obvykle jde o délku kabelu,
rušení nebo nekvalitní spoj. Takové vzorky raději zahoďte, než abyste je započítali do průměru.

**Senzor po odpojení zmizí.** Jádro odstraní uzel zařízení, jakmile přestane odpovídat.
Kód, který čte pevnou cestu, musí zmizení souboru unést a nespadnout na něm.
