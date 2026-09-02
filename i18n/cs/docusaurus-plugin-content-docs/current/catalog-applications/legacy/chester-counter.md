---
slug: chester-counter
title: CHESTER Counter
description: "CHESTER Counter je nahrazen aplikací CHESTER Control, která nabízí stejnou funkcionalitu."
---
import Image from '@theme/IdealImage';

# CHESTER Counter {#chester-counter}

:::warning

CHESTER Counter je nahrazen aplikací [**CHESTER Control**](https://docs.hardwario.com/chester/catalog-applications/chester-control), která nabízí stejnou funkcionalitu.

:::

Tento článek popisuje základní funkcionalitu, hardware, výchozí konfiguraci a ukázkové zprávy **JSON** pro katalogovou aplikaci **CHESTER Counter**.

:::caution

Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:

- [**První kroky**](https://docs.hardwario.com/chester/first-steps) – jak připojit zařízení do Cloudu.
- [**Společná funkcionalita**](https://docs.hardwario.com/chester/catalog-applications/common-functionality) – jak funguje LED, tlačítko a konfigurace sítě.
- [**Platform Management**](https://docs.hardwario.com/chester/category/platform-connectivity) – jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

Aplikace **CHESTER Counter** se používá k počítání pulzů na osmi digitálních vstupech. Ty lze připojit k výstupu PLC/senzoru (NPN/PNP), tlačítku, přepínači, relé atd. Aplikace počítá celkový počet pulzů a také počet pulzů od posledního reportu (konfigurovatelné parametrem `interval-report`).

## Varianty aplikace {#application-variants}

**CHESTER Counter** lze objednat v jedné z těchto variant:

### CHESTER Counter {#chester-counter}

Katalogový hardware **CHESTER Counter** se skládá z těchto objednacích kódů:

* `CHESTER-M-BCGLS` - Standardní základní deska

* `CHESTER-X0B:A` - Vstupní modul (4 kanály)

Více podrobností najdete v [**Objednacích kódech**](https://docs.hardwario.com/chester/ordering-codes).

Volby shieldů pro build firmwaru: `ctr_lte ctr_x0_a`

### CHESTER Counter Z {#chester-counter-z}

Katalogový hardware **CHESTER Counter Z** se skládá z těchto objednacích kódů:

* `CHESTER-M-CGLS` - Standardní základní deska

* `CHESTER-X0B:A` - Vstupní modul (4 kanály)

* `CHESTER-Z1` - Záložní modul

Více podrobností najdete v [**Objednacích kódech**](https://docs.hardwario.com/chester/ordering-codes).

Volby shieldů pro build firmwaru: `ctr_lte ctr_x0_a ctr_z`

## Záloha {#backup}

**CHESTER Counter Z** (vybavený modulem **CHESTER-Z1**) může navíc reportovat informace o záložní baterii a stavu externího napájení DC.

* Aktuální **napětí baterie** a **napětí externího DC** se posílají v každém reportu.

* Když se změní stav vstupu napájení DC, uloží se časová značka události spolu se stavem **connected**/**disconnected**, tato informace se ukládá do bufferu a buffer událostí se odešle (nejpozději) s pravidelným reportem (parametr `interval-report`).

* Volitelně lze změny vstupu napájení DC do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) reportovat **okamžitě** nebo s konfigurovatelným **zpožděním** (parametr `event-report-delay`), což umožňuje zachytit více po sobě jdoucích změn vstupu.

* Maximální počet reportů za hodinu je konfigurovatelný (parametr `event-report-rate`). Omezení počtu událostí snižuje zatížení komunikačního pásma a prodlužuje životnost baterie.

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná příkazem `app config show`):

```
app config interval-sample 60
app config interval-report 1800
```

## Firmware {#firmware}

Nejnovější firmware je dostupný v [kapitole Firmware](https://docs.hardwario.com/chester/catalog-applications/catalog-applications#application-firmware) katalogových aplikací.

## Ukázková zpráva JSON {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
Tato ukázková zpráva byla odeslána zařízením **CHESTER** s modulem **X0** pouze ve slotu A. Zpráva byla odeslána kvůli události tamper.

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
