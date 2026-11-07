---
slug: common-functionality
title: Společné funkce
---
import Image from '@theme/IdealImage';

# Společné funkce {#common-functionality}

**Katalogové aplikace** mají řadu společných funkcí, například chování tlačítka nebo práci s nastavením.

## Konfigurace režimu sítě {#network-mode-configuration}

Firmware některých katalogových aplikací umí komunikovat přes síť NB-IoT/LTE i LoRaWAN. Takový firmware po zapnutí neodesílá žádná data, **LED bliká žlutě** a je potřeba nastavit správný režim rádia.

Nastavení `app mode` je zatím potřeba u těchto katalogových aplikací:

- [CHESTER Clime](../firmware/chester-clime/index.md)
- [CHESTER Control](../firmware/chester-control/index.md)
- [CHESTER Push](../firmware/chester-push/index.md)
- [CHESTER Current](../firmware/chester-current/index.md)
- [CHESTER Scale](../firmware/chester-scale/index.md)
- [CHESTER Meteo](../firmware/chester-meteo/index.md)
- [CHESTER Serial](../firmware/chester-serial/index.md)

Aplikace [CHESTER Demo](../firmware/chester-demo/index.md), [CHESTER Motion](../firmware/chester-motion/index.md), [CHESTER Range](../firmware/chester-range/index.md) a [CHESTER wM-Bus](../firmware/chester-wm-bus/index.md) komunikují jen přes NB-IoT/LTE a startují v režimu `lte`, takže u nich režim nastavovat nemusíte.

Ve výchozím stavu zařízení **nepoužívá žádné rádio** (režim `none`) a je potřeba nastavit konfigurační parametr **mode**.

- `app config mode lte` pro síť NB-IoT/LTE
- `app config mode lrw` pro síť LoRaWAN

Poté změny uložte příkazem `config save`. Zařízení se restartuje a použije správnou síť.

### Výchozí režim LTE {#default-lte-mode}

Od firmwaru **v3.5.0** je výchozím režimem LTE **LTE-M s přechodem na NB-IoT** (`lte-m,nb-iot`). Zařízení se nejprve pokusí připojit přes LTE-M, a pokud LTE-M není dostupné, přejde na NB-IoT.


## Chování tlačítka {#button-behaviour}

Aplikace přiřazují tlačítku na základní desce různé akce. Kterou akci zařízení provede, určuje počet stisků tlačítka za sebou. Před provedením akce zařízení **CHESTER** blikne oranžovou LED tolikrát, kolikrát bylo tlačítko stisknuto. K dispozici jsou tyto akce:

| Počet stisků | Akce                                        |
| :---------------: | :------------------------------------------ |
|         1         | Okamžité odeslání dat                       |
|         2         | Okamžité vzorkování dat                     |
|         3         | Okamžité vzorkování, agregace a odeslání dat |
|         4         | Restart zařízení                            |
|         5         | Zapnutí zátěžové LED na 2 minuty            |

## Chování LED {#led-behaviour}

Po zapnutí zařízení **CHESTER** svítí LED červeně, dokud se aplikace neinicializuje. Potom každých pět sekund blikne zelená LED na znamení, že aplikace běží.

Pokud **LED bliká žlutě**, je potřeba nastavit, [které rádio se má použít](#network-mode-configuration).

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
```

Konfiguraci změníte příkazem `app config` a uložíte příkazem `config save`. Příklad:

```
app config interval-sample 120
app config interval-aggreg 600
config save
```

Tím se změny uloží a aplikace se restartuje. Po restartu nové nastavení ověříte příkazem `app config show`.

Výchozí konfiguraci obnovíte příkazem `config reset`. Ve vzácných případech, kdy konzole zařízení CHESTER není dostupná, můžete konfiguraci resetovat ručně: podržte tlačítko během startu zařízení. Asi po 5 sekundách začne zařízení rychle blikat. Když teď tlačítko pustíte, reset proběhne. Pokud tlačítko držíte dál, dokud zařízení nepřestane blikat, reset se zruší.

:::caution

Reset konfigurace vymaže i parametry připojení k sítím LTE a LoRaWAN, takže zařízení CHESTER pak nemusí být schopné komunikovat.

:::

Konfiguraci můžete měnit i na dálku přes HARDWARIO Cloud, a to [**downlinkovým příkazem Config**](/cloud/downlink/config).
Příkaz `config save` se z cloudu neposílá.

## Společné parametry {#common-parameters}

Většina firmwaru katalogových aplikací má tyto konfigurační parametry společné. Stránka každého firmwaru uvádí všechny parametry svého sestavení i s výchozími hodnotami, které se mezi aplikacemi liší: například `interval-report` je u aplikací CHESTER Current a CHESTER Scale 900 s, jinde 1800 s.

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Význam | Kde |
| :--- | :--- | :--- | :--- | :--- |
| `mode` | Mode | `none`, `lte`, `lrw` | Síť: žádná, NB-IoT/LTE nebo LoRaWAN (viz [Konfigurace režimu sítě](#network-mode-configuration)) | Každý firmware; Demo, Motion, Range a wM-Bus nabízejí jen `none` a `lte` |
| `interval-sample` | Sample interval | `<1-86400>` | Interval vzorkování v sekundách | Každý firmware kromě Control a wM-Bus |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | Interval agregace v sekundách; počítá se za něj minimum, maximum, průměr a medián | Každý firmware kromě Control, Motion a wM-Bus |
| `interval-report` | Report interval | `<30-86400>` | Interval hlášení v sekundách | Každý firmware kromě wM-Bus; Serial přijme i `0` |
| `interval-poll` | Poll interval | `<0-86400>` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne | Každý firmware kromě wM-Bus, který má vlastní `poll-interval`; Serial hodnotu uloží, ale nepoužívá |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne | Každý firmware kromě Demo, Motion a Serial |
| `event-report-delay` | Event report delay | `<1-86400>` | Prodleva mezi událostí a hlášením v sekundách | Firmware, který hlásí události (alarmy, vstupy, záložní napájení) |
| `event-report-rate` | Event report rate | `<1-3600>` | Nejvyšší počet hlášení událostí za hodinu (firmware v4.0.1 jich pošle až o jedno víc); pravidelná hlášení se do limitu nepočítají | Firmware, který hlásí události |
| `backup-report-connected` | Backup report connected | `true`, `false` | Hlásit okamžitě obnovení externího napájení | Sestavení s modulem CHESTER-Z nebo CHESTER-X10 |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | Hlásit okamžitě výpadek externího napájení | Sestavení s modulem CHESTER-Z nebo CHESTER-X10 |

## Společná data {#common-data}

Tyto hodnoty odesílá každá katalogová aplikace CHESTER. Stránka každé aplikace popisuje jen to, co aplikace odesílá navíc (viz [Katalogové aplikace](index.md)).

### Přes NB-IoT/LTE {#common-data-lte}

Každé hlášení obsahuje tyto struktury:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `message.version` | Verze formátu zprávy: `2` u aplikací CHESTER Clime, CHESTER Motion, CHESTER Range a CHESTER Serial, `1` u aplikací CHESTER Control, CHESTER Current, CHESTER Meteo, CHESTER Push a CHESTER Scale | | `1`, `2` | |
| `message.sequence` | Počítadlo zpráv, po restartu začíná od 0 | | 0–4294967295 | 1 |
| `message.timestamp` | Čas hlášení (unixový čas) | s | | 1 s |
| `system.uptime` | Doba od startu zařízení | s | | 1 s |
| `system.voltage_rest` | Napětí baterie bez zátěže | V | 2,0–5,25 | 0,01 V |
| `system.voltage_load` | Napětí baterie pod testovací zátěží | V | 2,0–5,25 | 0,01 V |
| `system.current_load` | Proud testovací zátěží 100 Ω, dopočítaný z `voltage_load` | mA | 20–52 | 1 mA |
| `network.parameter.eest` | Odhad energetické náročnosti spojení LTE; vyšší hodnota znamená menší spotřebu na přenos | | 5–9 | 1 |
| `network.parameter.ecl` | Úroveň rozšíření pokrytí (coverage enhancement) | | 0–2 | 1 |
| `network.parameter.rsrp` | Výkon přijímaného referenčního signálu (RSRP) | dBm | přibližně −157 až −44 | 1 dBm |
| `network.parameter.rsrq` | Kvalita přijímaného referenčního signálu (RSRQ) | dB | přibližně −19 až −3 | 1 dB |
| `network.parameter.snr` | Odstup signálu od šumu | dB | přibližně −24 až 25 | 1 dB |
| `network.parameter.plmn` | Kód operátora (MCC a MNC), například `23003` | | | |
| `network.parameter.cid` | Identifikátor buňky | | | |
| `network.parameter.band` | Pásmo LTE | | | |
| `network.parameter.earfcn` | Číslo kanálu (EARFCN) | | | |
| `thermometer.temperature` | Teplota uvnitř krabičky (TMP112 na základní desce) | °C | −40 až 125 | 0,01 °C |
| `accelerometer.accel_x`, `accel_y`, `accel_z` | Zrychlení v jednotlivých osách (LIS2DH12, rozsah ±4 g) | m/s² | −39,2 až 39,2 | 0,01 m/s² |
| `accelerometer.orientation` | Orientace zařízení | | 1–6 | |

Hodnoty sítě pocházejí z vyhodnocení spojení v modemu (`%CONEVAL`) a odesílají se jen v režimu NB-IoT/LTE.

Hodnoty baterie ve struktuře `system` se měří 60 s po startu a pak každých 12 hodin. Struktury `thermometer` a `accelerometer` obsahují poslední vzorek.

Dvě aplikace odesílají tytéž hodnoty pod jinými klíči:

- Aplikace CHESTER Meteo odesílá zrychlení jako `accelerometer.acceleration_x`, `acceleration_y` a `acceleration_z`.
- Aplikace CHESTER wM-Bus odesílá místo struktury `message` klíče `frame.protocol` (hodnota `3`), `frame.sequence` a `frame.timestamp`, místo `system.uptime` klíč `state.uptime` a hodnoty baterie ve struktuře `battery` (`battery.voltage_rest`, `battery.voltage_load` a `battery.current_load`) místo ve struktuře `system`.

### Přes LoRaWAN {#common-data-lorawan}

Aplikace s podporou LoRaWAN (CHESTER Clime, CHESTER Control, CHESTER Current, CHESTER Meteo, CHESTER Push, CHESTER Scale a CHESTER Serial) posílají v každé zprávě tato pole, jak je vrací dekodér HARDWARIO Cloud:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `voltage_rest` | Napětí baterie bez zátěže | V | 2,0–5,25 | 0,001 V |
| `voltage_load` | Napětí baterie pod testovací zátěží | V | 2,0–5,25 | 0,001 V |
| `current_load` | Proud testovací zátěží 100 Ω, dopočítaný z `voltage_load` | mA | 20–52 | 1 mA |
| `orientation` | Orientace zařízení | | 1–6 | |
| `therm_temperature` | Teplota uvnitř krabičky (TMP112 na základní desce) | °C | −40 až 125 | 0,01 °C |

## Detekce CHESTER-Z za běhu {#runtime-chester-z-detection}

Od firmwaru **v3.5.4** umí některé aplikace rozpoznat záložní modul CHESTER-Z **za běhu**. Stejný binární soubor firmwaru tak funguje s nainstalovaným modulem CHESTER-Z i bez něj.

- Když zařízení při startu modul CHESTER-Z najde, automaticky zapne funkce záložního napájení (sledování vstupu DC, napětí záložní baterie, události připojení a odpojení).
- Když modul CHESTER-Z chybí, funkce záložního napájení se bez hlášení vynechají a na ostatní funkce to nemá žádný vliv.
- Samostatné varianty firmwaru „Z“ proto už nejsou potřeba: například **CHESTER Clime** teď pokrývá i to, co dřív obstarával **CHESTER Clime Z**.

Aplikace s detekcí CHESTER-Z za běhu:

- [CHESTER Clime](../firmware/chester-clime/index.md)

:::note
Ostatní aplikace dostanou detekci modulu Z za běhu postupně v dalších verzích firmwaru.
:::

## Cloudové metriky {#cloud-metrics}

Skupina příkazů shellu `cloud` slouží k diagnostice komunikace s cloudem. Příkaz `cloud metrics` vypíše statistiky komunikace:

```
cloud metrics
```

Výpis obsahuje počty zpráv uplink a downlink, počty fragmentů, počty chyb s časovými značkami a časy posledních úspěšných operací. Hodí se k diagnostice problémů s připojením v terénu.

## Subsystém BLE Tag {#ble-tag-subsystem}

:::info
Zařízení **CHESTER** umí přijímat data také z **Bluetooth tagů** (subsystém Teltonika EYE Sensor) a bezdrátově tak měřit teplotu a vlhkost.  
Jak tuto funkci zapnout a nastavit, popisuje stránka [**Bluetooth tagy**](ble-tags.md).
:::

## Rozptyl intervalu hlášení {#report-interval-jitter}

Firmware CHESTER Clime, CHESTER Control, CHESTER Demo, CHESTER Meteo, CHESTER Motion, CHESTER Range a CHESTER Scale přidává k pravidelnému odesílání dat v intervalu `interval-report` záměrný rozptyl (jitter). Když je blízko sebe hodně zařízení CHESTER se stejným intervalem, díky rozptylu nevysílají všechna ve stejnou chvíli. Rozptyl je náhodný v rozsahu ±20 % hodnoty `interval-report`. Aplikace CHESTER Current, CHESTER Push a CHESTER Serial odesílají v pevném intervalu. Aplikace CHESTER wM-Bus parametr `interval-report` nemá: data z měřičů odešle na konci každého skenování.

Je-li například `interval-report` nastavený na 100 sekund, může mezi dvěma pravidelnými zprávami uplynout 80 (-20 %) až 120 (+20 %) sekund.

V aplikacích, které posílají více agregovaných hodnot, má rozptyl vedlejší účinek: zpráva někdy obsahuje méně nebo více agregovaných hodnot, než byste čekali. Chybějící hodnoty se neztrácejí, přijdou v následující zprávě.

Na **události**, jako je stisk tlačítka nebo změna vstupu, se rozptyl nevztahuje. Ty se hlásí okamžitě.

## Příkazy shellu {#shell-commands}

Kromě výše uvedených příkazů nabízí shell řadu dalších. Vypíšete je příkazem `help`.

Příklad výstupu příkazu `help` z aplikace **CHESTER Clime**:

```
help
You can try to call commands with <-h> or <--help> parameter for more information.

Available commands:
  accel    :Accelerometer commands.
  aggreg   :Aggregate data immediately
  app      :Application commands.
  backup   :Backup module commands
  batt     :Battery commands.
  ble      :BLE commands.
  button   :Button commands.
  cloud    :Cloud commands.
  config   :Configuration commands.
  flash    :Flash shell commands
  gpio     :GPIO commands
  help     :Prints the help message.
  hygro    :Hygrometer commands.
  i2c      :I2C commands
  info     :Device information commands.
  kernel   :Kernel commands
  led      :LED commands.
  log      :Commands for controlling logger
  lrw      :LoRaWAN commands.
  lte      :LTE commands.
  mcuboot  :MCUboot commands
  rtc      :RTC commands for date/time operations.
  sample   :Sample immediately.
  send     :Send data immediately.
  therm    :Thermometer commands.
  w1       :1-Wire bus commands
```

Od firmwaru **v3.5.0** obsahují všechny aplikace tyto diagnostické příkazy shellu:

- **`i2c`**: operace na sběrnici I2C (skenování, čtení, zápis) pro diagnostiku hardwaru
- **`mcuboot`**: příkazy bootloaderu MCUboot pro správu firmwaru
- **`gpio`**: ovládání a kontrola pinů GPIO
- **`w1`**: skenování sběrnice 1-Wire a výpis zařízení
- **`backup`**: stav záložního modulu CHESTER-Z (sériové číslo, revize HW, napětí, stav vstupu DC)
- **`cloud`**: příkazy pro komunikaci s cloudem včetně `cloud metrics` pro diagnostiku připojení

## Záloha konfigurace v1.x.x → v2.x.x {#configuration-backup}

Před aktualizací staršího firmwaru **v1.x.x** na **v2.x.x** je nutné zálohovat konfiguraci aplikace. Nejdůležitější je to u aplikace **CHESTER Current**, jejíž konfigurace obsahuje **kalibrační koeficienty proudových transformátorů**.

Pokud zálohu zapomenete udělat, data se neztratí, dokud v novějším firmwaru nespustíte příkaz `config save`. Musíte ale dočasně nahrát zpět [starší firmware](https://github.com/hardwario/docs/blob/33661ca486dda9e6883d3a82edf0128ab32173d2/chester/catalog-applications/index.md#application-firmware), který starou konfiguraci přečte, a po aktualizaci firmwaru stejnou konfiguraci zadat znovu.

Ve starém firmwaru zadejte do konzole `app config show` a zkopírujte všechny konfigurační položky. V mobilní aplikaci **HARDWARIO Manager** i v nástroji **HARDWARIO CLI** na počítači stačí text aktuální konfigurace označit a zkopírovat do schránky nebo do textového editoru.

Po aktualizaci na novější firmware vložte stejné řádky do konzole. V aplikaci **HARDWARIO Manager** i v **HARDWARIO CLI** můžete vložit všechny řádky najednou do vstupního řádku a stisknout Enter; příkazy se provedou jeden po druhém. Příkazem `app config show` ověřte, že se konfigurace nastavila správně, a nezapomeňte změny uložit příkazem `config save`.
