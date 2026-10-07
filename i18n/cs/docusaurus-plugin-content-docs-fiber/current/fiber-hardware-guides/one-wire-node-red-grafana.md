---
title: Čtení senzorů 1-Wire do Grafany
---

# Čtení senzorů 1-Wire do Grafany {#reading-1-wire-sensors-into-grafana}

**Pouze FIBER**: zařízení FIBER Lite nemá 1-Wire hub (viz [Co je jinak](/fiber/fiber-lite/introduction#whats-different)).

Osm izolovaných portů 1-Wire zařízení FIBER vidí Linux jako osm nezávislých řadičů sběrnice (bus master),
takže sonda na portu 3 je dostupná na jiné cestě než sonda na portu 5. Ke čtení není potřeba instalovat
ovladač ani nic nastavovat, jádro porty zpřístupňuje samo.

## Jak je osm portů zapojeno {#how-the-eight-ports-are-wired}

Porty **nejsou** řízené softwarově přes GPIO (bit-banging). Jsou za převodníkem I2C na 1-Wire
**DS2482** s adresou `0x18` na sběrnici `i2c-10`, který obsluhuje modul jádra `ds2482`. Každý fyzický
port má vlastní řadič (master):

```sh
ls /sys/bus/w1/devices/
```

```text
w1_bus_master1  w1_bus_master2  w1_bus_master3  w1_bus_master4
w1_bus_master5  w1_bus_master6  w1_bus_master7  w1_bus_master8
```

`w1_bus_masterN` odpovídá fyzickému portu *N*. Převodník a moduly `ds2482`, `wire` a
`w1_therm` jsou součástí dodávaného image, takže není co instalovat ani zapínat.

## Jak zjistit, na kterých portech jsou sondy {#finding-which-ports-have-probes}

Každý nalezený senzor se navíc objeví jako symbolický odkaz přímo v `/sys/bus/w1/devices/`, pojmenovaný
podle kódu rodiny a jedinečného ROM ID (`28-…` je rodina DS18B20):

```sh
ls -d /sys/bus/w1/devices/28-*
```

Na kterém portu je který senzor, zjistíte dotazem na řadiče:

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
poslední známé ROM ID, ale přestane se aktualizovat, viz [Řešení problémů](#troubleshooting) níže.

## Čtení teploty {#reading-a-temperature}

Každý senzor zpřístupňuje soubor `temperature` v **tisícinách stupně Celsia**:

```sh
cat /sys/bus/w1/devices/28-00000bc830e0/temperature
```

```text
24625
```

To je 24,625 °C (hodnotu vydělte tisícem).

Surový soubor `w1_slave` obsahuje stejnou hodnotu a navíc stav CRC, což se hodí při diagnostice
nespolehlivé sondy nebo dlouhého kabelu:

```sh
cat /sys/bus/w1/devices/28-00000bc830e0/w1_slave
```

```text
8a 01 4b 46 7f ff 06 10 2c : crc=2c YES
8a 01 4b 46 7f ff 06 10 2c t=24625
```

`crc=2c YES` znamená, že je hodnota spolehlivá. `NO` znamená, že hodnota na druhém řádku je
nesmyslná a je třeba ji zahodit, ne započítat do průměru.

:::note

Čtení těchto souborů spustí na sběrnici převod, který trvá až ~750 ms na senzor. Aplikace
FIBER už tytéž sondy vzorkuje každé 2 sekundy, takže vlastní dotazy omezte.
Několik sekund mezi čteními bohatě stačí a sběrnice tak zůstane volná pro aplikaci,
která řídí alarmy.

:::

## Jak dostat naměřené hodnoty do Node-RED {#getting-the-readings-into-node-red}

Stačí jediný uzel `exec`, bez doplňkového (contrib) balíčku a bez dalších závislostí. Nechte ho
spouštět krátký příkaz shellu a výstup zpracujte v Node-RED.

Použijte uzel **inject** s opakovaným intervalem → uzel **exec**, který spouští:

```sh
for d in /sys/bus/w1/devices/28-*; do echo "$(basename $d) $(cat $d/temperature)"; done
```

a za ním uzel **function**, který řádky převede na jednu zprávu pro každý senzor:

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

Výstup připojte na uzel **influxdb batch** a hodnoty se uloží jako measurement `onewire` s tagem
ROM ID, připravené k zobrazení v grafu.

:::tip

Jako tag použijte **ROM ID**, ne číslo portu. ROM ID je v sondě napevno vypálené, takže si senzor
v databázi zachová identitu, i když ho někdo přepojí na jiný port. Přesně to potřebujete, když
porovnáváte historii za týden.

:::

## Ukládání a vizualizace naměřených hodnot {#storing-and-visualizing-the-readings}

Node-RED, InfluxDB a Grafana jsou na obou variantách součástí stejného sdíleného stacku, viz
[Instalace Node-RED](/fiber/installation/node-red), [Instalace InfluxDB](/fiber/installation/influxdb)
a [Instalace Grafany](/fiber/installation/grafana). Flow výše tedy zapisuje do InfluxDB na
stejném zařízení a Grafana data čte lokálně.

Obvyklým výchozím bodem pro panel je časová řada `temperature` seskupená podle tagu
`sensor`.

:::note

Než flow zapojíte, ověřte, že je stack nainstalovaný:

```sh
command -v influxd grafana-server node-red
```

Pokud příkaz nic nevrátí, jednotka běží na image sestaveném dřív, než se tyto služby přidaly.
Nasměrujte flow na jiný počítač, který je má. Na zařízení FIBER běží **Mosquitto**, takže nejjednodušší
je publikovat hodnoty do MQTT a na druhém počítači je odebírat.

:::

## Řešení problémů {#troubleshooting}

**Port hlásí `0` podřízených zařízení (slaves).** Na tomto fyzickém portu nebylo nic nalezeno.
Nejprve zkontrolujte zapojení sondy: 1-Wire potřebuje datový vodič a zem, sonda s parazitním
napájením navíc pull-up rezistor. Porty jsou vzájemně izolované, takže porucha na jednom neovlivní ostatní.

**`crc=... NO`.** Senzor odpověděl, ale rámec byl poškozený. Obvykle jde o délku kabelu,
rušení nebo nekvalitní spoj. Takové vzorky raději zahoďte, než abyste je započítali do průměru.

**Senzor po odpojení zmizí.** Jádro odstraní uzel zařízení, jakmile senzor přestane odpovídat.
Kód, který čte pevnou cestu, musí s chybějícím souborem počítat a nespadnout.
