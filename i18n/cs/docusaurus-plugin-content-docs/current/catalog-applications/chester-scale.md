---
slug: chester-scale
title: CHESTER Scale
description: "Tento článek popisuje základní funkce, hardware a příklad JSON zprávy katalogové aplikace CHESTER Scale."
---
import Image from '@theme/IdealImage';

# CHESTER Scale {#chester-scale}

Tento článek popisuje základní funkce, hardware a příklad **JSON** zprávy katalogové aplikace **CHESTER Scale**.

:::caution

Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:

- [**První kroky**](https://docs.hardwario.com/chester/first-steps): jak připojit zařízení do Cloudu.
- [**Společná funkcionalita**](common-functionality.md): jak funguje LED, tlačítko a konfigurace sítě.
- [**Správa platformy**](../category/platform-connectivity): jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

**CHESTER Scale** je určen pro bezdrátové měření hmotnosti pomocí tenzometrických snímačů. Aplikace podporuje připojení několika hmotnostních sond (až 4 kanály) a poskytuje přenos dat o hmotnosti v reálném čase přes sítě NB-IoT/LTE-M nebo LoRaWAN.

Zařízení je ideální pro:
- **Monitorování průmyslových zásobníků**: sledování hladiny náplně nádrží, sil nebo kontejnerů
- **Sledování palet a zboží**: monitorování změn hmotnosti v logistice a skladování
- **Monitorování hmotnosti hospodářských zvířat**: optimalizace krmných plánů a sledování zdraví zvířat
- **Zemědělské aplikace**: monitorování úlů, skladování krmiva atd.

## Varianty aplikace {#application-variants}

**CHESTER Scale** lze objednat v jedné z těchto variant:

### CHESTER Scale {#chester-scale}

Katalogová aplikace **CHESTER Scale** měří hmotnost až ze 4 kanálů tenzometrických snímačů.

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS`: standardní základní deska
* `CHESTER-X3C:A` nebo `CHESTER-X3C:B` – rozhraní pro tenzometrické snímače (2 kanály na modul)
* `CHESTER-E2-LP`: krabička s SMA pigtailem

Více podrobností najdete v [**objednacích kódech**](../ordering-codes.md).

Varianta buildu firmwaru: `west chester-update scale --variant "CHESTER Scale"`

:::info
Od verze **v3.5.5** firmware sestavený s `ctr_x3_b` detekuje modul CHESTER-X3 ve slotu B za běhu. Jediný firmware tak pokrývá hardware s jedním slotem (pouze A) i se dvěma sloty (A+B). Kanály B1/B2 se automaticky přeskočí, pokud modul ve slotu B není nainstalován.
:::

### CHESTER Scale Z {#chester-scale-z}

Katalogová aplikace **CHESTER Scale Z** obsahuje podporu záložní baterie pro nepřerušený provoz.

Hardware této aplikace se skládá z následujících objednacích kódů:

* `CHESTER-M-BCGLS`: standardní základní deska
* `CHESTER-Z1`: záložní modul
* `CHESTER-X3C:A` nebo `CHESTER-X3C:B` – rozhraní pro tenzometrické snímače (2 kanály na modul)
* `CHESTER-E2-LP`: krabička s SMA pigtailem

Více podrobností najdete v [**objednacích kódech**](../ordering-codes.md).

Varianta buildu firmwaru: `west chester-update scale --variant "CHESTER Scale Z"`

## Měření a chování {#measurement-and-behavior}

### Měření hmotnosti {#weight-measurement}

- Snímače hmotnosti jsou **vzorkovány** s konfigurovatelnou periodou (parametr `interval-sample`).
- Vzorky jsou následně **agregovány** v konfigurovatelném intervalu (parametr `interval-aggreg`). Z uložených vzorků se pro každý kanál vypočítá minimum, maximum, průměr a medián.
- Každá agregovaná hodnota má svoji časovou značku a odesílá se dávkově v intervalu reportu (parametr `interval-report`).
- Parametr `weight-measurement-interval` určuje, jak často se cyklus měření hmotnosti spouští.

### Konfigurace kanálů {#channel-configuration}

Aplikace podporuje až 4 kanály měření hmotnosti:
- **Kanál A1** a **kanál A2** ve slotu A
- **Kanál B1** a **kanál B2** ve slotu B

Každý kanál lze zapnout nebo vypnout jednotlivě.

### Záloha (CHESTER Scale Z) {#backup-chester-scale-z}

**CHESTER Scale Z** (vybavený modulem **CHESTER-Z1**) může navíc reportovat informace o záložní baterii a stavu externího DC napájení.

* Aktuální **napětí baterie** a **napětí externího DC** se odesílají v každém reportu.
* Když se změní stav DC napájecího vstupu, uloží se časová značka této události společně se stavem **connected**/**disconnected**, tato informace se ukládá do bufferu a buffer událostí se odešle (nejpozději) s pravidelným reportem.
* Volitelně lze změny DC napájecího vstupu reportovat **okamžitě** nebo s konfigurovatelným **zpožděním** (parametr `event-report-delay`).
* Maximální počet reportů za hodinu je konfigurovatelný (parametr `event-report-rate`).

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná příkazem `app config show`):

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

Při vybavení **zálohou** (CHESTER-Z1):

```
app config event-report-delay 1
app config event-report-rate 30
app config backup-report-connected true
app config backup-report-disconnected true
```

## Specifické příkazy {#specific-commands}

:::info

Celou strukturu příkazů můžete snadno prozkoumat – začněte příkazem `help`.

:::

:::caution

Pro použití nové konfigurace je nutné zavolat `config save`, což aplikuje nové konfigurační parametry a restartuje zařízení.

:::

### Reporting {#reporting}

Příkaz pro nastavení **intervalu reportu** v sekundách:

```
app config interval-report <30-86400>
```

### Vzorkování a agregace {#sampling-and-aggregation}

Příkaz pro nastavení **intervalu vzorkování** v sekundách:

```
app config interval-sample <1-86400>
```

Příkaz pro nastavení **intervalu agregace** v sekundách:

```
app config interval-aggreg <1-86400>
```

Příkaz pro nastavení **intervalu měření hmotnosti** v sekundách:

```
app config weight-measurement-interval <30-86400>
```

### Aktivace kanálů {#channel-activation}

Příkaz pro **zapnutí/vypnutí** kanálu A1:

```
app config channel-a1-active <true/false>
```

Příkaz pro **zapnutí/vypnutí** kanálu A2:

```
app config channel-a2-active <true/false>
```

Příkaz pro **zapnutí/vypnutí** kanálu B1:

```
app config channel-b1-active <true/false>
```

Příkaz pro **zapnutí/vypnutí** kanálu B2:

```
app config channel-b2-active <true/false>
```

### Záloha (CHESTER-Z1) {#backup-chester-z1}

Příkaz pro nastavení **zpoždění reportu události** v sekundách:

```
app config event-report-delay <1-86400>
```

Příkaz pro nastavení **frekvence reportů událostí** v reportech za hodinu:

```
app config event-report-rate <1-3600>
```

Příkaz pro zapnutí/vypnutí reportování při **připojení** zálohy:

```
app config backup-report-connected <true/false>
```

Příkaz pro zapnutí/vypnutí reportování při **odpojení** zálohy:

```
app config backup-report-disconnected <true/false>
```

## Firmware {#firmware}

Nejnovější firmware je dostupný v [kapitole Firmware](index.md#application-firmware) katalogových aplikací.

## Příklad JSON zprávy {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">

<details>
<summary><b>Zobrazit příklad JSON</b></summary>
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
<summary><b>Zobrazit příklad JSON</b></summary>
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
**CHESTER Scale** podporuje také integraci s **Bluetooth tagy** (subsystém Teltonika EYE Sensor) pro bezdrátové monitorování teploty a vlhkosti.
Jak tuto funkci aktivovat a nakonfigurovat, se dozvíte v dokumentaci [**Subsystém BLE Tag pro CHESTER**](ble-tags.md).
:::

---

## Seznam změn {#changelog}

### v3.5.5 – 2026-06-22 {#v355--2026-06-22}

- **Přidáno**: Detekce modulu CHESTER-X3 ve slotu B za běhu

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Nová varianta: **CHESTER Scale Z** s podporou záložního modulu CHESTER-Z1
- **Přidáno**: Integrace subsystému BLE tagů: bezdrátová teplota a vlhkost z tagů Teltonika EYE Sensor
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové API endpointy); předchozí firmware pro Cloud v1 zůstává dostupný samostatně
- **Změněno**: Jediný společný binární firmware pro LTE i LoRaWAN; podpora LoRaWAN se dokončuje (plánováno pro příští vydání)

:::info

Kompletní přehled všech změn platformy najdete v [**seznamu změn CHESTER**](/chester/changelog).

:::
