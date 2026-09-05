---
slug: common-functionality
title: Společná funkcionalita
description: "Některé katalogové firmwary umožňují konfiguraci pro použití sítě NB-IoT/LTE nebo LoRaWAN. Tento firmware po zapnutí neodesílá data, LED bliká žlutě a je potřeba nastavit správný režim rádia."
---
import Image from '@theme/IdealImage';

# Společná funkcionalita {#common-functionality}

**Katalogové aplikace** sdílejí společnou funkcionalitu. Například chování tlačítka nebo způsob, jakým se zpracovává nastavení.

## Konfigurace síťového režimu {#network-mode-configuration}

Některé katalogové firmwary umožňují konfiguraci pro použití sítě NB-IoT/LTE nebo LoRaWAN. Tento firmware po zapnutí neodesílá data, **LED bliká žlutě** a je potřeba nastavit správný režim rádia.

Tato konfigurace `app mode` je aktuálně potřeba u těchto katalogových aplikací:

- [CHESTER Clime](chester-clime.md)
- [CHESTER Control](chester-control.md)
- [CHESTER Push](chester-push.md)
- [CHESTER Current](chester-current.md)
- [CHESTER Scale](chester-scale.md)
- [CHESTER Meteo](chester-meteo.md)
- [CHESTER Range](chester-range.md)
- [CHESTER Motion](chester-motion.md)
- [CHESTER Serial](chester-serial.md)
- [CHESTER wM-Bus](chester-wm-bus.md)

Výchozí chování je, že zařízení **nepoužívá žádné rádio** (režim `none`) a je potřeba nastavit konfigurační parametr **mode**.

- `app config mode lte` pro síť NB-IoT/LTE
- `app config mode lrw` pro síť LoRaWAN

Poté změny uložte příkazem `config save`. Zařízení se restartuje a použije správnou síť.

### Výchozí režim LTE {#default-lte-mode}

Počínaje firmwarem **v3.5.0** byl výchozí režim LTE změněn na **LTE-M s návratem na NB-IoT** (`lte-m,nb-iot`). To znamená, že se zařízení nejprve pokusí připojit pomocí LTE-M a pokud LTE-M není dostupné, přejde na NB-IoT.


## Chování tlačítka {#button-behaviour}

Aplikace definují akce pro tlačítko na základní desce. Akce se vybírají podle počtu po sobě jdoucích stisků tlačítka. Před provedením akce zařízení **CHESTER** blikne oranžovou LED jednou za každý stisk tlačítka, čímž indikuje počet po sobě jdoucích stisků. Akce jsou:

| Počet stisků | Akce                                        |
| :---------------: | :------------------------------------------ |
|         1         | Okamžité odeslání dat                       |
|         2         | Okamžité vzorkování dat                     |
|         3         | Okamžité vzorkování, agregace a odeslání dat |
|         4         | Restart zařízení                            |
|         5         | Zapnutí zátěžové LED na 2 minuty            |

## Chování LED {#led-behaviour}

Když je zařízení **CHESTER** zapnuto, LED svítí červeně, dokud se aplikace neinicializuje. Poté zařízení **CHESTER** bliká zelenou LED každých pět sekund, čímž indikuje, že aplikace běží.

Pokud **LED bliká žlutě**, je potřeba nastavit, [které rádio se má použít](#network-mode-configuration).

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná pomocí příkazu `app config show`):

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
```

Konfiguraci můžete změnit příkazem `app config` následovaným příkazem `config save`. Příklad:

```
app config interval-sample 120
app config interval-aggreg 600
config save
```

Tím se změny uloží a aplikace se restartuje. Po restartu můžete změněné nastavení ověřit příkazem `app config show`.

Pokud chcete konfiguraci vrátit zpět do výchozího stavu, můžete použít `config reset`. Ve vzácných případech, kdy konzole CHESTER není k dispozici, můžete použít manuální postup resetu. Zahájíte jej podržením tlačítka během startu zařízení CHESTER. Po podržení tlačítka přibližně 5 sekund začne zařízení CHESTER rychle blikat. V tuto chvíli můžete tlačítko uvolnit a pokračovat v resetu. Pokud budete tlačítko držet dál, dokud zařízení CHESTER nepřestane blikat, reset bude zrušen.

:::caution

Reset konfigurace vymaže i parametry připojení pro LTE a LoRaWAN, což může způsobit, že zařízení CHESTER nebude schopno komunikovat.

:::

Konfiguraci můžete také měnit vzdáleně přes HARDWARIO Cloud pomocí [**downlink příkazu Config**](../../cloud/downlink/config).
V cloudu příkaz `config save` neodesíláte.

## Detekce CHESTER-Z za běhu {#runtime-chester-z-detection}

Počínaje firmwarem **v3.5.4** některé aplikace podporují **detekci za běhu** zálohovacího modulu CHESTER-Z. To znamená, že jediný binární firmware funguje jak s nainstalovaným modulem CHESTER-Z, tak bez něj.

- Pokud je modul CHESTER-Z detekován při startu, automaticky se zapne zálohovací funkcionalita (monitorování DC vstupu, napětí záložní baterie, události připojení/odpojení).
- Pokud modul CHESTER-Z není přítomen, zálohovací funkce se tiše přeskočí bez dopadu na ostatní funkcionalitu.
- Odpadá tak potřeba samostatných „Z" variant firmwaru: například **CHESTER Clime** nyní pokrývá to, co dříve zajišťoval **CHESTER Clime Z**.

Aplikace s detekcí CHESTER-Z za běhu:

- [CHESTER Clime](chester-clime.md)

:::note
Další aplikace budou detekci Z za běhu postupně přebírat v budoucích vydáních firmwaru.
:::

## Cloudové metriky {#cloud-metrics}

Skupina shellových příkazů `cloud` poskytuje diagnostické informace o komunikaci s cloudem. Pomocí `cloud metrics` zobrazíte statistiky komunikace:

```
cloud metrics
```

Zobrazí se počty uplink/downlink zpráv, počty fragmentů, počty chyb s časovými značkami a časové značky posledních úspěšných operací. To je užitečné pro diagnostiku problémů s připojením v terénu.

## Subsystém BLE Tag {#ble-tag-subsystem}

:::info
Zařízení **CHESTER** podporuje také integraci s **Bluetooth tagy** (subsystém Teltonika EYE Sensor) pro bezdrátové měření teploty a vlhkosti.  
Jak tuto funkci aktivovat a nastavit se dozvíte v dokumentaci [**Subsystém CHESTER BLE Tag**](ble-tags.md).
:::

## Rozptyl intervalu hlášení {#report-interval-jitter}

Periodické odesílání dat pomocí `interval-report` má záměrný rozptyl (jitter). Ten se používá pro případ, kdy je blízko sebe umístěno mnoho zařízení CHESTER, aby nevysílala ve stejnou chvíli, pokud mají nastavený stejný interval. Tento rozptyl je náhodný v rozsahu ±20 % hodnoty `interval-report`.

Například pokud je `interval-report` nastaven na 100 sekund, můžete přijímat periodická data, kde mají dvě zprávy časový rozdíl od 80 (-20 %) do 120 (+20 %) sekund.

V aplikacích, kde je více agregovaných hodnot, má tento rozptyl vedlejší efekt, že někdy můžete vidět méně nebo více agregovaných hodnot, než se očekává. Chybějící hodnoty nejsou ztraceny, budou správně odeslány v následující zprávě.

Tento rozptyl se neuplatňuje na **události**, jako je stisk tlačítka nebo změna vstupu. Ty jsou hlášeny okamžitě.

## Shellové příkazy {#shell-commands}

Kromě výše zmíněných příkazů nabízí shell mnoho dalších. Lze je vypsat příkazem `help`.

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

Počínaje firmwarem **v3.5.0** obsahují všechny aplikace následující diagnostické shellové příkazy:

- **`i2c`**: operace na sběrnici I2C (scan, čtení, zápis) pro hardwarovou diagnostiku
- **`mcuboot`**: příkazy bootloaderu MCUboot pro správu firmwaru
- **`gpio`**: ovládání a kontrola pinů GPIO
- **`w1`**: skenování sběrnice 1-Wire a výpis zařízení
- **`backup`**: stav zálohovacího modulu CHESTER-Z (sériové číslo, HW revize, napětí, stav DC vstupu)
- **`cloud`**: příkazy pro komunikaci s cloudem včetně `cloud metrics` pro diagnostiku připojení

## Záloha konfigurace v1.x.x → v2.x.x {#configuration-backup}

Při aktualizaci staršího firmwaru **v1.x.x** na **v2.x.x** je nutné zálohovat konfiguraci aplikace. Nejdůležitější je tento krok u aplikace **CHESTER Current**, kde jsou v konfiguraci uloženy **kalibrační koeficienty proudových transformátorů**.

Pokud zapomenete data zálohovat, nejsou ztracena, dokud v novějším firmwaru neprovedete příkaz `config save`. Je však potřeba dočasně přejít zpět na [starší firmware](https://github.com/hardwario/docs/blob/33661ca486dda9e6883d3a82edf0128ab32173d2/chester/catalog-applications/index.md#application-firmware), který dokáže starou konfiguraci přečíst, a po aktualizaci firmwaru stejnou konfiguraci aplikovat.

Ve starém firmwaru napište do konzole `app config show`. Poté je potřeba zkopírovat všechny konfigurační položky. Pokud používáte mobilní aplikaci **HARDWARIO Manager** nebo **HARDWARIO CLI** na počítači, můžete text aktuální konfigurace označit a zkopírovat do schránky nebo textového editoru.

Po aktualizaci na novější firmware vložte stejné řádky do konzole. Pokud používáte mobilní aplikaci **HARDWARIO Manager** nebo **HARDWARIO CLI** na počítači, můžete všechny řádky vložit najednou do vstupního řádku a stisknout enter. Všechny příkazy se postupně provedou. Ověřte, že konfigurace byla správně aplikována, zadáním `app config show`. Nezapomeňte změny uložit příkazem `config save`.
