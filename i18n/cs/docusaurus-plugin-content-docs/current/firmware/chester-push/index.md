---
title: CHESTER Push
description: "Firmware katalogové aplikace CHESTER Push: hlášení stisků tlačítek a odezva LED, všechny konfigurační parametry s výchozími hodnotami a formát dat."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Push {#chester-push}

Firmware **CHESTER Push** udělá ze zařízení CHESTER tlačítkový terminál. Každý stisk tlačítka okamžitě nahlásí, rozliší krátký a dlouhý stisk a data odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

Tato stránka popisuje hlavní firmware. Sestavení [**CHESTER Push FM**](chester-push-fm.md) mění jen to, jak se rozsvěcují LED tlačítek, a jeho stránka uvádí jen tento rozdíl.

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../common-functionality.md). Hardware a šablonu krabičky najdete na stránce katalogové aplikace [**CHESTER Push**](../../catalog-applications/chester-push/index.md).

## Podporovaný hardware {#supported-hardware}

Firmware podporuje:

- modul [**CHESTER-Z1**](../../extension-modules/chester-z1.md), bez kterého firmware nefunguje; nese až pět tlačítek s LED, zvukový bzučák, vstup DC a záložní baterii Li-Ion
- teploměr a akcelerometr na základní desce
- bluetoothové senzorové tagy (viz [**Tagy BLE**](../ble-tags.md)); jejich hodnoty se odesílají jen v hlášeních přes LTE

Tlačítka se v datech jmenují `button_x` (prostřední tlačítko) a `button_1` až `button_4`. Která z nich zařízení má, určuje objednací kód modulu CHESTER-Z1 (viz [**Objednací kódy**](../../ordering-codes.md#chester-z)).

## Měření a chování {#measurement-and-behavior}

- Stisk tlačítka se **hlásí okamžitě**: zařízení počká `event-report-delay` sekund, aby se stisky krátce po sobě dostaly do jednoho hlášení, a pak hlášení odešle.
- Za hodinu odejde nejvýše `event-report-rate` hlášení událostí. Limit šetří baterii zařízení a snižuje objem přenášených dat; události nad limit počkají na další pravidelné hlášení a pravidelná hlášení se do limitu nepočítají.
- Firmware rozliší **krátký stisk** (`clicked`) a **dlouhý stisk** (`held`). Každé hlášení obsahuje pro každé tlačítko čítače krátkých a dlouhých stisků od spuštění zařízení a události tlačítka od předchozího hlášení s jejich časovými značkami.
- Hlášení obsahuje nejvýše 8 událostí na tlačítko. Další stisky téhož tlačítka před příštím hlášením se nezapočítají.
- Teploměr, akcelerometr a napětí na modulu CHESTER-Z1 se vzorkují každou minutu, napájecí napětí základní desky každých 12 hodin. Bluetoothové tagy se vzorkují každých `interval-sample` sekund a agregují každých `interval-aggreg` sekund.
- Pravidelné hlášení odchází každých `interval-report` sekund, bez náhodného rozptylu popsaného v článku [**Společné funkce**](../common-functionality.md#report-interval-jitter).
- Když externí napájení modulu CHESTER-Z1 vypadne nebo se obnoví, zařízení to okamžitě nahlásí (parametry `backup-report-*`), takže zařízení CHESTER Push může sledovat i výpadky napájení.

### Chování LED {#led-behavior}

Každé tlačítko má vlastní LED a každý stisk potvrdí bzučák:

- **Krátký stisk:** zelená LED tlačítka jednou blikne a bzučák jednou pípne.
- **Dlouhý stisk:** červená LED tlačítka dvakrát blikne a bzučák dvakrát pípne.

:::tip

Toto chování je vhodné pro provoz s nízkou spotřebou (na vestavěnou baterii **Li-Ion** vydrží zařízení měsíce).

:::

Sestavení [**CHESTER Push FM**](chester-push-fm.md) rozsvěcuje LED jinak.

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Interval vzorkování bluetoothových tagů v sekundách |
| `interval-aggreg` | `<1-86400>` | `300` | Interval agregace vzorků z bluetoothových tagů v sekundách |
| `interval-report` | `<30-86400>` | `1800` | Interval hlášení v sekundách |
| `interval-poll` | `<0-86400>` | `0` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách; `0` dotazování vypne |
| `downlink-wdg-interval` | `<0-1209600>` | `129600` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |
| `event-report-delay` | `<1-86400>` | `1` | Prodleva mezi událostí a hlášením v sekundách (stisk tlačítka, změna záložního napájení) |
| `event-report-rate` | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu; pravidelná hlášení se do limitu nepočítají |
| `backup-report-connected` | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Parametry `interval-sample` a `interval-aggreg` se uplatní jen s bluetoothovými tagy; teploměr a akcelerometr se vzorkují každou minutu bez ohledu na ně.

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../common-functionality.md#network-mode-configuration).

## Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `sample` | Okamžitě navzorkuje senzory |
| `send` | Okamžitě odešle data |

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-push:v4.0.1](https://firmware.hardwario.com/chester/a218e5f6eeea4fefaa3656ada720d163), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `a218e5f6eeea4fefaa3656ada720d163`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/a218e5f6eeea4fefaa3656ada720d163/hex), SHA256 `e4a111d6731186ec3d5d52b6290ea7f95721dacff0a39cb9285dbdd24a315cfd`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/a218e5f6eeea4fefaa3656ada720d163/bin), SHA256 `fa8e4fdbe285bcbcd9a8b73aaa869b35c57992441c98f5485fd31d004be7fd21`
- **Sestavení ze SDK:** `west chester-update push --variant "CHESTER Push"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Ukázková zpráva JSON {#example-json-message}

<Tabs>
  <TabItem value="lte" label="LTE">

Ukázka zachycuje hlášení hlavního firmwaru:

- `backup`: napětí na vstupu DC, napětí baterie, stav a události napájecího vstupu modulu CHESTER-Z1
- `button_x` a `button_1` až `button_4`: pro každé tlačítko čítače krátkých (`count_click`) a dlouhých (`count_hold`) stisků a události od předchozího hlášení

**Události** tlačítek:
* `clicked`
* `held`

**Události** záložního napájení:
* `connected`
* `disconnected`

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 1,
    "timestamp": 1672910024
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.2",
    "fw_name": "CHESTER Push",
    "fw_version": "v1.4.0",
    "serial_number": "2159018247"
  },
  "system": {
    "uptime": 173,
    "voltage_rest": 3.96,
    "voltage_load": 3.86,
    "current_load": 38
  },
  "backup": {
    "line_voltage": 0.01,
    "batt_voltage": 3.43,
    "state": "disconnected",
    "events": [
      {
        "timestamp": 1672910010,
        "type": "disconnected"
      }
    ]
  },
  "network": {
    "imei": 351358815178303,
    "imsi": 901288003957939,
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -87,
      "rsrq": -6,
      "snr": 13,
      "plmn": 23003,
      "cid": 939040,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 21.56
  },
  "accelerometer": {
    "acceleration_x": -0.31,
    "acceleration_y": 0.15,
    "acceleration_z": 9.88,
    "orientation": 2
  },
  "button_x": {
    "count_click": 0,
    "count_hold": 0,
    "events": []
  },
  "button_1": {
    "count_click": 3,
    "count_hold": 1,
    "events": [
      {
        "timestamp": 1672910020,
        "type": "held"
      }
    ]
  },
  "button_2": {
    "count_click": 12,
    "count_hold": 0,
    "events": [
      {
        "timestamp": 1672910023,
        "type": "clicked"
      }
    ]
  },
  "button_3": {
    "count_click": 0,
    "count_hold": 0,
    "events": []
  },
  "button_4": {
    "count_click": 0,
    "count_hold": 0,
    "events": []
  }
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "voltage_rest": 3.8,
  "voltage_load": 3.75,
  "current_load": 15,
  "orientation": 1,
  "therm_temperature": 22.5,
  "backup": {
    "line_voltage": 24.0,
    "battery_voltage": 4.1,
    "backup_state": true
  },
  "button_x": {
    "press_count": 42,
    "hold_count": 3,
    "press_event": true,
    "hold_event": false
  },
  "button_1": {
    "press_count": 10,
    "hold_count": 1,
    "press_event": false,
    "hold_event": false
  }
}
```

</details>

  </TabItem>
</Tabs>

## Seznam změn {#changelog}

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora LoRaWAN: jediný binární soubor firmwaru pro LTE i LoRaWAN; režim se volí příkazem `app config mode lte` / `app config mode lrw`
- **Změněno**: Přepracováno na nový framework LoRaWAN `app_lrw` pokrytý jednotkovými testy
- **Změněno**: Přechod na protokol HARDWARIO Cloud (kódování CBOR, nové endpointy API); firmware pro Cloud Legacy je nadále k dispozici samostatně

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
