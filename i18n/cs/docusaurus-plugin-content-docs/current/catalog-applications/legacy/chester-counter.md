---
slug: chester-counter
title: CHESTER Counter
---
import Image from '@theme/IdealImage';

# CHESTER Counter {#chester-counter}

:::warning

Aplikaci CHESTER Counter nahradila aplikace [**CHESTER Control**](/chester/catalog-applications/chester-control) se stejnými funkcemi.

:::

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Counter**, její hardware, výchozí konfiguraci a ukázkové zprávy **JSON**.

:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](/chester/catalog-applications/common-functionality): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity): jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

Aplikace **CHESTER Counter** počítá impulzy na osmi digitálních vstupech. Vstupy lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, spínači, relé apod. Aplikace počítá celkový počet impulzů a také počet impulzů od posledního hlášení (interval hlášení nastavuje parametr `interval-report`).

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Counter** lze objednat v jedné z těchto variant:

### CHESTER Counter {#chester-counter}

Hardware katalogové aplikace **CHESTER Counter** tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

Podrobnosti najdete na stránce [**Objednací kódy**](/chester/ordering-codes).

Shieldy pro sestavení firmwaru: `ctr_lte ctr_x0_a`

### CHESTER Counter Z {#chester-counter-z}

Hardware katalogové aplikace **CHESTER Counter Z** tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-Z1`: Záložní modul

Podrobnosti najdete na stránce [**Objednací kódy**](/chester/ordering-codes).

Shieldy pro sestavení firmwaru: `ctr_lte ctr_x0_a ctr_z`

## Záložní napájení {#backup}

Zařízení **CHESTER Counter Z** (s modulem **CHESTER-Z1**) navíc hlásí stav záložní baterie a externího napájení DC.

* Aktuální **napětí baterie** a **napětí externího zdroje DC** se posílají v každém hlášení.

* Při změně na napájecím vstupu DC se do bufferu uloží časová značka změny spolu se stavem **connected**/**disconnected** a buffer událostí se odešle nejpozději s pravidelným hlášením (parametr `interval-report`).

* Změny napájecího vstupu DC do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) lze volitelně hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`), aby se do hlášení vešlo i více změn krátce po sobě.

* Maximální počet hlášení za hodinu lze nastavit (parametr `event-report-rate`). Omezení počtu hlášení šetří komunikační pásmo a prodlužuje výdrž baterie.

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config interval-sample 60
app config interval-report 1800
```

## Firmware {#firmware}

Nejnovější firmware najdete na stránce Katalogové aplikace v kapitole [Firmware aplikací](/chester/catalog-applications/catalog-applications#application-firmware).

## Ukázková zpráva JSON {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
Ukázkovou zprávu odeslalo zařízení **CHESTER** s modulem **X0** jen ve slotu A, a to kvůli události tamper.

```json
{
  "frame": {
    "protocol": 1,
    "sequence": 2,
    "timestamp": 1688127148
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.4",
    "fw_version": "(unset)",
    "serial_number": "2159019054"
  },
  "state": {
    "uptime": 68
  },
  "battery": {
    "voltage_rest": null,
    "voltage_load": null,
    "current_load": null
  },
  "network": {
    "imei": 426556893,
    "imsi": 2907855241,
    "parameter": {
      "eest": 8,
      "ecl": 0,
      "rsrp": -75,
      "rsrq": -7,
      "snr": 16,
      "plmn": 23003,
      "cid": 1011233,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 24.31
  },
  "accelerometer": {
    "accel_x": -0.77,
    "accel_y": 3.37,
    "accel_z": 9.03,
    "orientation": 2
  },
  "counter": {
    "channel_1_total": 5,
    "channel_1_delta": 2,
    "channel_2_total": 5,
    "channel_2_delta": 3,
    "channel_3_total": 5,
    "channel_3_delta": 0,
    "channel_4_total": 7,
    "channel_4_delta": 0,
    "channel_5_total": null,
    "channel_5_delta": null,
    "channel_6_total": null,
    "channel_6_delta": null,
    "channel_7_total": null,
    "channel_7_delta": null,
    "channel_8_total": null,
    "channel_8_delta": null
  },
  "tamper": {
    "state": "active",
    "events": [
      {
        "timestamp": 1688127147,
        "type": "activated"
      }
    ]
  },
  "backup": {
    "line_voltage": 15,
    "batt_voltage": 2,
    "backup_state": 0,
    "events": []
  }
}
```


  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

```json
{
  "system": {
    "uptime": 86400,
    "voltage_rest": 3.6
  },
  "counter": {
    "channels": [
      {
        "id": 0,
        "count": 5020
      },
      {
        "id": 1,
        "count": 120
      }
    ]
  }
}
```
    
  </TabItem>
</Tabs>
