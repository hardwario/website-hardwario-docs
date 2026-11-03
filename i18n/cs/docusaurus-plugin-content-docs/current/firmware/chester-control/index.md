---
title: CHESTER Control
description: "Firmware katalogové aplikace CHESTER Control: režimy vstupních kanálů, ovládání výstupů, všechny konfigurační parametry s výchozími hodnotami a formát dat."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Control {#chester-control}

Firmware **CHESTER Control** měří a sleduje analogové a digitální vstupy. Navzorkované analogové hodnoty agreguje, počítá impulzy, každou změnu vstupu trigger zaznamená i s jejím typem a časovou značkou, výsledky ukládá do bufferu a odesílá je i s časovými značkami do HARDWARIO Cloud přes NB-IoT/LTE. Přes LoRaWAN posílá jen poslední hodnoty, bez historie z bufferu. Díky bufferování zaznamená více událostí a přitom šetří přenosové pásmo i energii potřebnou k přenosu dat. Na pokyn z HARDWARIO Cloud navíc spíná čtyři výstupy.

Tato stránka popisuje hlavní firmware. Varianty sestavené pro jiný hardware mají vlastní stránky, které uvádějí jen to, co mění: [**CHESTER Control Z**](chester-control-z.md) a [**CHESTER Control 8Ch Z**](chester-control-8ch-z.md).

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../common-functionality.md). Hardware a varianty produktu najdete na stránce katalogové aplikace [**CHESTER Control**](../../catalog-applications/chester-control/index.md).

## Podporovaný hardware {#supported-hardware}

Hlavní firmware podporuje:

- vstupní modul **CHESTER-X0** ve slotu A: čtyři vstupní kanály, každý v jednom z režimů popsaných níže (viz [**CHESTER-X0**](../../extension-modules/chester-x0.md))
- modul **CHESTER-X4** ve slotu B: čtyři výstupy spínané z HARDWARIO Cloud (viz [**CHESTER-X4**](../../extension-modules/chester-x4.md))
- teploměry **DS18B20** 1-Wire, nejvýše pět
- půdní senzory 1-Wire, které měří teplotu a vlhkost, nejvýše tři
- bluetoothové senzorové tagy (viz [**Tagy BLE**](../ble-tags.md))

Hlášení ze záložního modulu **CHESTER-Z** vyžaduje firmware [**CHESTER Control Z**](chester-control-z.md) nebo [**CHESTER Control 8Ch Z**](chester-control-8ch-z.md). Zdrojový kód obsahuje i podporu vlhkoměru **CHESTER-S2** s vlastními intervaly vzorkování a agregace (`hygro-interval-sample`, `hygro-interval-aggreg`), žádné sestavení v4.0.1 ji ale nezahrnuje.

## Měření a chování {#measurement-and-behavior}

- Každý ze čtyř kanálů modulu CHESTER-X0 se parametry `channel-mode-1` až `channel-mode-4` přepne do jednoho režimu: `trigger`, `counter`, `voltage` nebo `current`. Ve výchozím stavu jsou všechny kanály vypnuté (`disabled`), takže každému kanálu, který používáte, režim nastavte, například `app config channel-mode-1 trigger`.
- Data všech kanálů se ukládají do bufferu a odesílají se v dávkách v intervalu hlášení (parametr `interval-report`).
- Mezi dvěma hlášeními si každý kanál typu trigger uchová nejvýše 128 událostí a každý kanál typu counter, voltage a current nejvýše 64 agregovaných hodnot; další se až do příštího hlášení zahazují.
- Teploměry DS18B20 a půdní senzory se vzorkují a agregují podle parametrů `w1-therm-interval-sample` a `w1-therm-interval-aggreg`, bluetoothové tagy podle parametrů `analog-interval-sample` a `analog-interval-aggreg`.
- Žlutá LED krátce blikne při každé změně vstupu trigger a při každém započítaném impulzu, nejvýše pětkrát za sekundu. Bliká 30 minut od první změny, pak přestane a znovu začne až s první změnou po 30 minutách bez aktivity na vstupech. Při instalaci tak snadno zkontrolujete zapojení.
- Tlačítko funguje podle článku [**Společné funkce**](../common-functionality.md#button-behaviour) se dvěma rozdíly: dva stisky místo vzorkování požádají HARDWARIO Cloud o zprávy downlink a šest stisků zapne všechny čtyři výstupy modulu CHESTER-X4.

### Trigger {#trigger}

Vstup **trigger** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, spínači, relé apod. Chování vstupu **trigger** lze nastavit.

* Při změně vstupu se do bufferu uloží časová značka změny spolu se stavem **active**/**inactive** a buffer událostí se odešle nejpozději s pravidelným hlášením (parametr `interval-report`).

* Změna do stavu **active** (parametr `trigger-report-active`) nebo **inactive** (parametr `trigger-report-inactive`) může volitelně spustit samostatné hlášení. To se odešle po **prodlevě** nastavené parametrem `event-report-delay`, aby se do něj vešly i další změny vstupu krátce po sobě.

* Podporovány jsou oba typy vstupní logiky, **NPN** i **PNP** (parametr `trigger-input-type`).

* Minimální trvání úrovně se nastavuje zvlášť pro stav **active** (parametr `trigger-duration-active`) a **inactive** (parametr `trigger-duration-inactive`).

* Maximální počet hlášení za hodinu lze nastavit (parametr `event-report-rate`). Omezení počtu hlášení šetří komunikační pásmo a prodlužuje výdrž baterie.

### Counter {#counter}

Vstup **counter** lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, spínači, relé apod. Vstup průběžně počítá celkový počet impulzů.

* Hodnota čítače se pravidelně agreguje (parametr `counter-interval-aggreg`): každé měření obsahuje celkový počet impulzů a počet impulzů od předchozího měření. Buffer agregovaných měření se odesílá v nastavitelném intervalu (parametr `interval-report`).

* Podporovány jsou oba typy vstupní logiky, **NPN** i **PNP** (parametr `counter-input-type`).

* Minimální trvání úrovně se nastavuje zvlášť pro stav **active** (parametr `counter-duration-active`) a **inactive** (parametr `counter-duration-inactive`).

Časové parametry fungují u obou digitálních režimů stejně:

:::info

- Parametr `duration-active` nastavuje zpoždění v milisekundách mezi změnou vstupního signálu na aktivní úroveň (podle konfigurace `npn` nebo `pnp`) a okamžikem, kdy na tuto změnu zařízení CHESTER zareaguje. Hodí se k odfiltrování zákmitů (debounce), když je na vstup připojený „elektricky rušivý“ mechanický spínač nebo relé. Využijete ho i tehdy, když má zařízení CHESTER reagovat jen na impulzy delší než nastavená doba.
- Parametr `duration-inactive` funguje stejně jako `duration-active` výše, jen nastavuje čas pro opačnou hranu.
- Parametr `cooldown-time` je zpoždění, které chrání zařízení CHESTER před záplavou přerušení. Kdyby byl připojený příliš rychlý signál (>10 kHz), obsluha přerušení by mohla spotřebovat veškerý čas procesoru a zastavit běh ostatních vláken. Parametr proto vkládá krátkou prodlevu před dalším spuštěním obsluhy přerušení. Lze ponechat výchozí hodnotu 10 ms.

:::

### Voltage {#voltage}

Vstup **voltage** měří napětí v rozsahu **0–28 V** (pokrývá standard **0–10 V**).

* Napětí se pravidelně vzorkuje (parametr `analog-interval-sample`) a naměřené hodnoty se ukládají do **bufferu vzorků**.

* Nasbírané vzorky se pravidelně **agregují** (parametr `analog-interval-aggreg`). Ze vzorků v bufferu se spočítá minimum, maximum, průměr a medián. Těmto agregovaným výsledkům říkáme **měření**.

* Každé **měření** má svou časovou značku. **Měření** z bufferu se pravidelně odesílají jako časové řady (parametr `interval-report`).

### Current {#current}

Tento vstup měří analogový proud v rozsahu **0–24 mA** (pokrývá standard **4–20 mA**).

* Proud se pravidelně vzorkuje (parametr `analog-interval-sample`) a naměřené hodnoty se ukládají do **bufferu vzorků**.

* Nasbírané vzorky se pravidelně **agregují** (parametr `analog-interval-aggreg`). Ze vzorků v bufferu se spočítá minimum, maximum, průměr a medián. Těmto agregovaným výsledkům říkáme **měření**.

* Každé **měření** má svou časovou značku. **Měření** z bufferu se pravidelně odesílají jako časové řady (parametr `interval-report`).

## Řízení výstupů {#output-control}

S modulem **CHESTER-X4** ve slotu B firmware spíná čtyři výstupy, které v zapnutém stavu přivádějí napětí ze vstupu **VIN**.

Výstupy ovládáte downlinkem typu data, který nese tento JSON. Naplánujete ho v HARDWARIO Cloud ze zpráv zařízení (viz [**Data**](/cloud/downlink/data)), nebo ho pošlete na endpoint `downlinks` daného zařízení v API HARDWARIO Cloud (viz [**Odesílání downlinků**](/cloud/api/downlinks)):

```
{
  "output_1_state": 1,
  "output_2_state": 1,
  "output_3_state": 0,
  "output_4_state": 0
}
```

JSON nemusí obsahovat stav všech čtyř výstupů, stačí poslat `output_X_state` jen pro výstupy, které chcete změnit: `1` výstup zapne, `0` ho vypne.

Zařízení se HARDWARIO Cloud ptá na zprávy downlink každých `interval-poll` sekund a čekající zprávu převezme také při odeslání hlášení. Pokud ve frontě čeká nová řídicí zpráva downlink, cloud ji předá zařízení, které podle ní přepne jeden nebo více výstupů. Výstupy se spínají jen v režimu LTE; zprávy downlink ze sítě LoRaWAN firmware nezpracovává.

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `interval-report` | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `interval-poll` | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `downlink-wdg-interval` | `<0-1209600>` | `129600` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |
| `event-report-delay` | `<1-86400>` | `5` | Prodleva mezi událostí na vstupu trigger a hlášením v sekundách; změny, které přijdou během prodlevy, se odešlou ve stejném hlášení |
| `event-report-rate` | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu; pravidelná hlášení se do limitu nepočítají |
| `channel-mode-1` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 1 (modul CHESTER-X0 ve slotu A, svorka A2) |
| `channel-mode-2` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 2 (svorka A4) |
| `channel-mode-3` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 3 (svorka A5) |
| `channel-mode-4` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 4 (svorka A7) |
| `trigger-input-type` | `npn`, `pnp` | `npn` | Vstupní logika kanálů typu trigger |
| `counter-input-type` | `npn`, `pnp` | `npn` | Vstupní logika kanálů typu counter |
| `trigger-duration-active` | `<0-60000>` | `100` | Minimální trvání aktivní úrovně na vstupu trigger v milisekundách |
| `trigger-duration-inactive` | `<0-60000>` | `100` | Minimální trvání neaktivní úrovně na vstupu trigger v milisekundách |
| `trigger-cooldown-time` | `<0-60000>` | `10` | Prodleva po přerušení od vstupu trigger v milisekundách |
| `trigger-report-active` | `true`, `false` | `false` | Hlásit okamžitě, když vstup trigger přejde do stavu active |
| `trigger-report-inactive` | `true`, `false` | `false` | Hlásit okamžitě, když vstup trigger přejde do stavu inactive |
| `counter-interval-aggreg` | `<1-86400>` | `300` | Interval agregace kanálů typu counter v sekundách |
| `counter-duration-active` | `<0-60000>` | `2` | Minimální trvání aktivní úrovně na vstupu counter v milisekundách |
| `counter-duration-inactive` | `<0-60000>` | `2` | Minimální trvání neaktivní úrovně na vstupu counter v milisekundách |
| `counter-cooldown-time` | `<0-60000>` | `10` | Prodleva po přerušení od vstupu counter v milisekundách |
| `analog-interval-sample` | `<1-86400>` | `60` | Interval vzorkování kanálů typu voltage a current a bluetoothových tagů v sekundách |
| `analog-interval-aggreg` | `<1-86400>` | `300` | Interval agregace kanálů typu voltage a current a bluetoothových tagů v sekundách |
| `w1-therm-interval-sample` | `<1-86400>` | `60` | Interval vzorkování teploměrů DS18B20 a půdních senzorů v sekundách |
| `w1-therm-interval-aggreg` | `<1-86400>` | `300` | Interval agregace teploměrů DS18B20 a půdních senzorů v sekundách |

Parametry pro trigger, counter a analogové vstupy se uplatní jen u kanálů v odpovídajícím režimu. Firmware [**CHESTER Control 8Ch Z**](chester-control-8ch-z.md) přidává parametry `channel-mode-5` až `channel-mode-8` pro druhý modul CHESTER-X0 ve slotu B. Parametry `w1-therm-*` se uplatní jen s připojenými teploměry DS18B20 nebo půdními senzory.

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../common-functionality.md#network-mode-configuration).

## Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `sample` | Okamžitě navzorkuje vstupy a senzory |
| `send` | Okamžitě odešle data |
| `poll` | Okamžitě se zeptá HARDWARIO Cloud na zprávy downlink |
| `channel show [<channel>...]` | Vypíše režim a aktuální stav všech kanálů nebo jen uvedených |
| `channel read <channel> [<seconds>]` | Každou sekundu vypíše hodnotu kanálu, po zadanou dobu, ve výchozím stavu 10 sekund |
| `channel reset [<channel>]` | Smaže data jednoho kanálu nebo všech kanálů v bufferu, včetně hodnoty čítače |

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-control:v4.0.1](https://firmware.hardwario.com/chester/d3c2bf66783643f6be3431d32adb11ac), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `d3c2bf66783643f6be3431d32adb11ac`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/d3c2bf66783643f6be3431d32adb11ac/hex), SHA256 `94e30eec60f88aa6acafdb699579eb19493280505e4a6fb472166b13bd091837`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/d3c2bf66783643f6be3431d32adb11ac/bin), SHA256 `9444a6d1acec43a0f9a22eded8329c959158a2c86ef419d628a9d7daaf25f529`
- **Sestavení ze SDK:** `west chester-update control --variant "CHESTER Control"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Ukázková zpráva JSON {#example-json-message}

<Tabs>
  <TabItem value="lte" label="LTE">

Ukázka zachycuje hlášení s jedním kanálem v každém režimu:

- `trigger`: kanál, jeho aktuální stav `state` a události na vstupu `events` (`activated`, `deactivated`) s časovými značkami
- `counter`: kanál, celkový počet impulzů `value`, počet impulzů od posledního hlášení `delta` a agregovaná měření `measurements` s hodnotami `value` a `delta` za každý interval agregace
- `voltage` a `current`: kanál a agregovaná měření `measurements` s hodnotami `min`, `max`, `avg` a `mdn` ve V a mA

Teploměry DS18B20, půdní senzory a bluetoothové tagy přidávají struktury `w1_thermometers`, `soil_sensors` a `ble_tags`.

Firmware v4.0.1 se od ukázky liší ve dvou bodech: každé hlášení obsahuje i strukturu `system` s dobou běhu, napětím baterie v klidu a při zátěži a proudem při zátěži a struktura `network` nese místo `imei` a `imsi` parametry připojení LTE v položce `parameter`.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
    "accelerometer": {
        "accel_x": 0,
        "accel_y": 0,
        "accel_z": 9.57,
        "orientation": 2
    },
    "counter": [
        {
            "channel": 2,
            "delta": 5,
            "measurements": [
                {
                    "timestamp": 1705328041,
                    "value": 4,
                    "delta": 2
                },
                {
                    "timestamp": 1705328341,
                    "value": 7,
                    "delta": 3
                }
            ],
            "value": 7
        }
    ],
    "current": [
        {
            "channel": 4,
            "measurements": [
                {
                    "avg": 2,
                    "max": 5.03,
                    "mdn": 0,
                    "min": 0,
                    "timestamp": 1705328341
                }
            ]
        }
    ],
    "message": {
        "sequence": 1,
        "timestamp": 1705328341,
        "version": 1
    },
    "network": {
        "imei": 351358816128174,
        "imsi": 901288910100358
    },
    "thermometer": {
        "temperature": 22.75
    },
    "trigger": [
        {
            "channel": 1,
            "events": [
                {
                    "timestamp": 1705328233,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328233,
                    "type": "deactivated"
                },
                {
                    "timestamp": 1705328233,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328233,
                    "type": "deactivated"
                },
                {
                    "timestamp": 1705328234,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328234,
                    "type": "deactivated"
                },
                {
                    "timestamp": 1705328234,
                    "type": "activated"
                },
                {
                    "timestamp": 1705328235,
                    "type": "deactivated"
                }
            ],
            "state": "inactive"
        }
    ],
    "voltage": [
        {
            "channel": 3,
            "measurements": [
                {
                    "avg": 0.27,
                    "max": 1.35,
                    "mdn": 0,
                    "min": 0,
                    "timestamp": 1705328341
                }
            ]
        }
    ]
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

Zpráva LoRaWAN nese jen poslední hodnoty, bez časových značek:

- `voltage_rest`, `voltage_load` a `current_load`: napětí baterie v klidu a při zátěži ve V a proud při zátěži v mA
- `orientation` a `therm_temperature`: orientace z akcelerometru a vnitřní teplota ve °C
- `w1_thermometers` a `ble_tags`: poslední teplota z každého teploměru DS18B20 a poslední teplota a vlhkost z každého bluetoothového tagu
- `inputs_a`: jedna položka pro každý kanál podle jeho typu `type`: `trigger` s aktuálním stavem `state` a údajem, zda první změna od předchozího hlášení byla aktivace (`trigger_active`), nebo deaktivace (`trigger_inactive`), `counter` s celkovým počtem impulzů `count` a počtem impulzů od předchozího hlášení (`delta`), `voltage` ve V nebo `current` v mA s posledním vzorkem, nebo `disabled`

Data půdních senzorů se přes LoRaWAN neposílají.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "voltage_rest": 3.7,
  "voltage_load": 3.65,
  "current_load": 20,
  "orientation": 2,
  "therm_temperature": 23.5,
  "w1_thermometers": [22.1, 22.3],
  "ble_tags": [
    {
      "temperature": 21.5,
      "humidity": 55.0
    }
  ],
  "inputs_a": [
    {
      "type": "trigger",
      "state": true,
      "trigger_active": true,
      "trigger_inactive": false
    },
    {
      "type": "counter",
      "count": 1234,
      "delta": 12
    },
    {
      "type": "voltage",
      "voltage": 12.5
    },
    {
      "type": "current",
      "current": 4.2
    }
  ]
}
```

</details>

  </TabItem>
</Tabs>

## Seznam změn {#changelog}

### v4.0.1 – 2026-09-07 {#v401--2026-09-07}

- **Opraveno**: Analogové vstupy CHESTER-X0 ve verzi v4.0.0 četly sousední kanál (chyba o jedničku v mapování kanálů); konfiguraci není potřeba měnit

### v4.0.0 – 2026-08-10 {#v400--2026-08-10}

- **Změněno**: Snížen maximální počet teploměrů 1-Wire (10 → 5) a půdních senzorů (10 → 3) kvůli nižšímu využití RAM

### v3.5.5 – 2026-06-22 {#v355--2026-06-22}

- **Změněno**: Snížena paměťová náročnost: data půdních senzorů a teploměrů se nyní alokují dynamicky

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora LoRaWAN: jediný binární soubor firmwaru pro LTE i LoRaWAN; režim se volí příkazem `app config mode lte` / `app config mode lrw`
- **Přidáno**: Interval downlink watchdogu (`downlink-wdg-interval`) pro detekci ztráty komunikace s cloudem
- **Přidáno**: Nastavitelný interval dotazování cloudu (`interval-poll`)
- **Změněno**: Přechod na protokol HARDWARIO Cloud (kódování CBOR, nové endpointy API); předchozí firmware pro Cloud Legacy zůstává samostatně dostupný
- **Změněno**: Režim lze nyní nastavit zvlášť pro každý kanál (`channel-mode-1` až `channel-mode-4`)

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
