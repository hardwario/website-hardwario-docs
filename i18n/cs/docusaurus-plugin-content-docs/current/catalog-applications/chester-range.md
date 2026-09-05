---
slug: chester-range
title: CHESTER Range
description: "Tento článek popisuje základní funkce, hardware a ukázkovou JSON zprávu katalogové aplikace CHESTER Range."
---
import Image from '@theme/IdealImage';

# CHESTER Range {#chester-range}

Tento článek popisuje základní funkce, hardware a ukázkovou **JSON** zprávu katalogové aplikace **CHESTER Range**.

:::caution

Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:

- [**První kroky**](https://docs.hardwario.com/chester/first-steps): jak připojit zařízení do Cloudu.
- [**Společná funkcionalita**](common-functionality.md): jak funguje LED, tlačítko a konfigurace sítě.
- [**Platform Management**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::


## Přehled aplikace {#application-overview}

**CHESTER Range** měří vzdálenost pomocí ultrazvukového senzoru [MaxBotix MB7066](https://www.hardwario.store/p/ultrasonic-sensor). Umí také měřit teplotu senzorem DS18B20 na sběrnici 1-Wire a vlhkost pomocí **CHESTER-S2**.

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Range** lze objednat v jedné z těchto variant:

### CHESTER Range {#chester-range}

Katalogový hardware **CHESTER Range** se skládá z těchto objednacích kódů:

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0A:A`: Vstupní modul (4 kanály)

Více podrobností najdete v [**objednacích kódech**](../ordering-codes.md).

Varianta buildu firmwaru: `west chester-update range --variant "CHESTER Range"`

### CHESTER Range Z {#chester-range-z}

Katalogový hardware **CHESTER Range Z** se skládá z těchto objednacích kódů:

* `CHESTER-M-CGLS`: Standardní základní deska

* `CHESTER-X0A:A`: Vstupní modul (4 kanály)

* `CHESTER-Z1`: Záložní modul

Více podrobností najdete v [**objednacích kódech**](../ordering-codes.md).

Varianta buildu firmwaru: `west chester-update range --variant "CHESTER Range Z"`

## Měření a chování {#measurement-and-behavior}

- Všechny senzory jsou **vzorkovány** s konfigurovatelnou periodou (parametr `interval-sample`).
- Vzorky se následně **agregují** v konfigurovatelném intervalu. Z uložených vzorků se pro každý senzor spočítá minimum, maximum, průměr a medián (parametr `interval-aggreg`).
- Každá agregovaná hodnota má svou časovou značku a hodnoty se odesílají dávkově v intervalu reportu (parametr `interval-report`).

## Svorkovnice {#terminal-blocks}

Senzor připojte k **levé svorkovnici A**

| [**CHESTER-X0**](../extension-modules/chester-x0.md) v levém slotu A | Barva vodiče Maxbotix | Signál |
| ------------------------------------------------------------------- | -------------------- | ------ |
| A2 (CH1)                                                            | červená              | Power  |
| A3 (GND)                                                            | černá                | GND    |
| A4 (CH2)                                                            | žlutá                | Pulse  |

![Zapojení svorkovnice CHESTER-X0: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../../../../chester/catalog-applications/../extension-modules/images/tb-chester-x0.png)


## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná příkazem `app config show`):

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
```

## Specifické příkazy {#specific-commands}

:::info

Celou strukturu příkazů můžete snadno prozkoumat – začněte příkazem `help`.

:::

:::caution

Pro použití nové konfigurace je potřeba zavolat `config save`, což aplikuje nové konfigurační parametry a restartuje zařízení.

:::

Příkaz pro nastavení **intervalu vzorkování** v sekundách:

```
app config interval-sample <1-86400>
```

Příkaz pro nastavení **intervalu agregace** v sekundách:

```
app config interval-aggreg <1-86400>
```

Příkaz pro nastavení **intervalu reportu** v sekundách:

```
app config interval-report <30-86400>
```

```
aggreg
```

## Firmware {#firmware}

Nejnovější firmware je dostupný v [kapitole Firmware](index.md#application-firmware) katalogových aplikací.

## Ukázková JSON zpráva {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
V této ukázce **JSON** vidíte data ze všech tří variant

Každý dostupný senzor má jedno agregované měření, které obsahuje minimální, maximální, průměrnou a mediánovou hodnotu.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

```json
{
  "message": {
    "version": 1,
    "sequence": 1,
    "timestamp": 1685093572
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.4",
    "fw_name": "(unset)",
    "fw_version": "(unset)",
    "serial_number": "2159019054"
  },
  "system": {
    "uptime": 49,
    "voltage_rest": null,
    "voltage_load": null,
    "current_load": null
  },
  "network": {
    "imei": 351358816140765,
    "imsi": 901288910018953,
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -78,
      "rsrq": -5,
      "snr": 8,
      "plmn": 23003,
      "cid": 1011233,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 24.93
  },
  "accelerometer": {
    "acceleration_x": 0,
    "acceleration_y": -0.23,
    "acceleration_z": 9.65,
    "orientation": 2
  },
  "ultrasonic_ranger": {
    "distance": {
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 2.004,
          "max": 2.009,
          "avg": 2.008,
          "mdn": 2.008
        }
      ]
    }
  },
  "hygrometer": {
    "temperature": {
      "events": [],
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 24.9,
          "max": 25.03,
          "avg": 24.99,
          "mdn": 25.01
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 35.18,
          "max": 35.81,
          "avg": 35.45,
          "mdn": 35.36
        }
      ]
    }
  },
  "w1_thermometers": [
    {
      "serial_number": 222768959,
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 24.31,
          "max": 24.31,
          "avg": 24.31,
          "mdn": 24.31
        }
      ]
    },
    {
      "serial_number": 222690915,
      "measurements": [
        {
          "timestamp": 1685093569,
          "min": 27,
          "max": 27.43,
          "avg": 27.22,
          "mdn": 27.25
        }
      ]
    }
  ]
}
```

</p>
</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

:::info
**CHESTER Range** používá pro komunikaci po LoRaWAN kódování CBOR. Formát dekódované zprávy je identický s formátem LTE uvedeným výše.
:::

  </TabItem>
</Tabs>

---

## Seznam změn {#changelog}

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora LoRaWAN: jediný binární firmware pro LTE i LoRaWAN; režim se volí pomocí `app config mode lte` / `app config mode lrw`
- **Přidáno**: Nová varianta: **CHESTER Range Z** s podporou záložního modulu CHESTER-Z1
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové API endpointy); předchozí firmware pro Cloud v1 zůstává dostupný samostatně

:::info

Kompletní přehled všech změn platformy najdete v [**seznamu změn CHESTER**](/chester/changelog).

:::
