---
slug: chester-scale
title: CHESTER Scale
---
import Image from '@theme/IdealImage';

# CHESTER Scale {#chester-scale}

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Scale**, její hardware a ukázkovou zprávu **JSON**.

:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

Zařízení **CHESTER Scale** slouží k bezdrátovému měření hmotnosti tenzometrickými snímači. Aplikace podporuje připojení několika snímačů hmotnosti (až 4 kanály) a data o hmotnosti přenáší v reálném čase přes sítě NB-IoT/LTE-M nebo LoRaWAN.

Zařízení se hodí například pro:
- **Sledování průmyslových zásobníků**: stav naplnění nádrží, sil nebo kontejnerů
- **Sledování palet a zboží**: změny hmotnosti v logistice a ve skladech
- **Sledování hmotnosti hospodářských zvířat**: lepší plánování krmení a kontrola zdraví zvířat
- **Zemědělství**: sledování úlů, zásob krmiva atd.

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Scale** lze objednat v jedné z těchto variant:

### CHESTER Scale {#chester-scale}

Katalogová aplikace **CHESTER Scale** měří hmotnost až ze 4 kanálů tenzometrických snímačů.

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: standardní základní deska
* `CHESTER-X3C:A` nebo `CHESTER-X3C:B`: rozhraní pro tenzometrické snímače (2 kanály na modul)
* `CHESTER-E2-LP`: krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update scale --variant "CHESTER Scale"`

:::info
Od verze **v3.5.5** rozpozná firmware sestavený s `ctr_x3_b` modul CHESTER-X3 ve slotu B za běhu. Stejný firmware tak funguje s jedním osazeným slotem (jen A) i se dvěma (A+B). Když ve slotu B modul není, kanály B1/B2 se automaticky vynechají.
:::

### CHESTER Scale Z {#chester-scale-z}

Katalogová aplikace **CHESTER Scale Z** podporuje záložní baterii pro nepřerušený provoz.

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: standardní základní deska
* `CHESTER-Z1`: záložní modul
* `CHESTER-X3C:A` nebo `CHESTER-X3C:B`: rozhraní pro tenzometrické snímače (2 kanály na modul)
* `CHESTER-E2-LP`: krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update scale --variant "CHESTER Scale Z"`

## Měření a chování {#measurement-and-behavior}

### Měření hmotnosti {#weight-measurement}

- Snímače hmotnosti se **vzorkují** s nastavitelnou periodou (parametr `interval-sample`).
- Vzorky se pak **agregují** v nastavitelném intervalu (parametr `interval-aggreg`): z uložených vzorků se pro každý kanál spočítá minimum, maximum, průměr a medián.
- Každá agregovaná hodnota má svou časovou značku; hodnoty se odesílají v dávkách v intervalu hlášení (parametr `interval-report`).
- Parametr `weight-measurement-interval` určuje, jak často se cyklus měření hmotnosti spouští.

### Konfigurace kanálů {#channel-configuration}

Aplikace podporuje až 4 kanály měření hmotnosti:
- **Kanál A1** a **kanál A2** ve slotu A
- **Kanál B1** a **kanál B2** ve slotu B

Každý kanál lze zapnout nebo vypnout samostatně.

### Záložní napájení (CHESTER Scale Z) {#backup-chester-scale-z}

Zařízení **CHESTER Scale Z** (s modulem **CHESTER-Z1**) navíc hlásí stav záložní baterie a externího napájení DC.

* Aktuální **napětí baterie** a **napětí externího zdroje DC** se posílají v každém hlášení.
* Při změně na napájecím vstupu DC se do bufferu uloží časová značka změny spolu se stavem **connected**/**disconnected** a buffer událostí se odešle nejpozději s pravidelným hlášením.
* Změny napájecího vstupu DC lze volitelně hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`).
* Maximální počet hlášení za hodinu lze nastavit (parametr `event-report-rate`).

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config interval-report 900
app config interval-sample 60
app config interval-aggreg 300
app config weight-measurement-interval 60
app config channel-a1-active true
app config channel-a2-active true
app config channel-b1-active true
app config channel-b2-active true
```

Se **záložním modulem** (CHESTER-Z1):

```
app config event-report-delay 1
app config event-report-rate 30
app config backup-report-connected true
app config backup-report-disconnected true
```

## Příkazy aplikace {#specific-commands}

:::info

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

:::

:::caution

Novou konfiguraci uplatníte příkazem `config save`, který uloží nové parametry a restartuje zařízení.

:::

### Hlášení {#reporting}

Tímto příkazem nastavíte **interval hlášení** v sekundách:

```
app config interval-report <30-86400>
```

### Vzorkování a agregace {#sampling-and-aggregation}

Tímto příkazem nastavíte **interval vzorkování** v sekundách:

```
app config interval-sample <1-86400>
```

Tímto příkazem nastavíte **interval agregace** v sekundách:

```
app config interval-aggreg <1-86400>
```

Tímto příkazem nastavíte **interval měření hmotnosti** v sekundách:

```
app config weight-measurement-interval <30-86400>
```

### Aktivace kanálů {#channel-activation}

Tímto příkazem **zapnete nebo vypnete** kanál A1:

```
app config channel-a1-active <true/false>
```

Tímto příkazem **zapnete nebo vypnete** kanál A2:

```
app config channel-a2-active <true/false>
```

Tímto příkazem **zapnete nebo vypnete** kanál B1:

```
app config channel-b1-active <true/false>
```

Tímto příkazem **zapnete nebo vypnete** kanál B2:

```
app config channel-b2-active <true/false>
```

### Záložní napájení (CHESTER-Z1) {#backup-chester-z1}

Tímto příkazem nastavíte **zpoždění hlášení události** v sekundách:

```
app config event-report-delay <1-86400>
```

Tímto příkazem nastavíte **četnost hlášení událostí** (počet hlášení za hodinu):

```
app config event-report-rate <1-3600>
```

Tímto příkazem zapnete nebo vypnete hlášení **připojení** napájení záložního modulu:

```
app config backup-report-connected <true/false>
```

Tímto příkazem zapnete nebo vypnete hlášení **odpojení** napájení záložního modulu:

```
app config backup-report-disconnected <true/false>
```

## Firmware {#firmware}

Nejnovější firmware najdete na stránce Katalogové aplikace v kapitole [Firmware aplikací](index.md#application-firmware).

## Ukázková zpráva JSON {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

```json
{
  "message": {
    "version": 1,
    "sequence": 1,
    "timestamp": 1673272805
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CGLS",
    "hw_revision": "R3.4",
    "fw_name": "CHESTER Scale",
    "fw_version": "v3.0.0",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 3600,
    "voltage_rest": 3.7,
    "voltage_load": 3.65,
    "current_load": 36
  },
  "backup": {
    "line_voltage": 24.01,
    "batt_voltage": 4.09,
    "state": "connected",
    "events": []
  },
  "network": {
    "imei": 351358815180770,
    "imsi": 901288910018982,
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -90,
      "rsrq": -8,
      "snr": 9,
      "plmn": 23003,
      "cid": 939040,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 22.18
  },
  "accelerometer": {
    "accel_x": 0.07,
    "accel_y": -0.16,
    "accel_z": 9.65,
    "orientation": 2
  },
  "weight": {
    "measurements": [
      {
        "timestamp": 1673272500,
        "raw_result_a1": 125430,
        "raw_result_a2": 98210,
        "raw_result_b1": 112340,
        "raw_result_b2": 87650
      },
      {
        "timestamp": 1673272560,
        "raw_result_a1": 125445,
        "raw_result_a2": 98225,
        "raw_result_b1": 112355,
        "raw_result_b2": 87660
      },
      {
        "timestamp": 1673272620,
        "raw_result_a1": 125420,
        "raw_result_a2": 98200,
        "raw_result_b1": 112330,
        "raw_result_b2": 87640
      }
    ]
  },
  "ble_tags": [
    {
      "addr": "1234567890AB",
      "rssi": -81,
      "voltage": 3.11,
      "humidity": {
        "measurements": [
          {
            "timestamp": 1673272500,
            "min": 54.78,
            "max": 55.31,
            "avg": 55.1,
            "mdn": 55.12
          }
        ]
      },
      "temperature": {
        "measurements": [
          {
            "timestamp": 1673272500,
            "min": 22.18,
            "max": 22.25,
            "avg": 22.23,
            "mdn": 22.25
          }
        ]
      }
    }
  ]
}
```

</p>
</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

```json
{
  "voltage_rest": 3.65,
  "voltage_load": 3.6,
  "current_load": 15,
  "orientation": 2,
  "therm_temperature": 22.4,
  "scale": {
    "channel_a1_active": true,
    "channel_a2_active": true,
    "channel_b1_active": true,
    "channel_b2_active": true,
    "raw_a1": 125430,
    "raw_a2": 98210,
    "raw_b1": 112340,
    "raw_b2": 87650
  }
}
```

</p>
</details>

  </TabItem>
</Tabs>

## Subsystém BLE Tag {#ble-tag-subsystem}

:::info
Zařízení **CHESTER Scale** umí přijímat data také z **Bluetooth tagů** (subsystém Teltonika EYE Sensor) a bezdrátově tak měřit teplotu a vlhkost.
Jak tuto funkci zapnout a nastavit, popisuje stránka [**Bluetooth tagy**](ble-tags.md).
:::

---

## Seznam změn {#changelog}

### v3.5.5 – 2026-06-22 {#v355--2026-06-22}

- **Přidáno**: Detekce modulu CHESTER-X3 ve slotu B za běhu

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Nová varianta: **CHESTER Scale Z** s podporou záložního modulu CHESTER-Z1
- **Přidáno**: Integrace subsystému BLE tagů: bezdrátové měření teploty a vlhkosti tagy Teltonika EYE Sensor
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové endpointy API); předchozí firmware pro Cloud v1 zůstává dostupný samostatně
- **Změněno**: Jediný společný binární soubor firmwaru pro LTE i LoRaWAN; podpora LoRaWAN se dokončuje (plánována pro příští vydání)

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
