---
slug: chester-meteo
title: CHESTER Meteo
---
import Image from '@theme/IdealImage';

# CHESTER Meteo {#chester-meteo}

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Meteo**, její hardware a ukázkovou zprávu **JSON**.

:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::


## Přehled aplikace {#application-overview}

Zařízení **CHESTER Meteo** měří vítr a další podmínky prostředí: naměřené veličiny vzorkuje, agreguje a odesílá.

Katalogová aplikace **CHESTER Meteo** měří:
- Rychlost větru (m/s)
- Směr větru (0–360°)
- Srážky (mm)
- Atmosférický tlak (Pa)
- Teplotu (°C)
- Vlhkost (%RH)

## Varianty aplikace {#application-variants}

Zařízení **CHESTER Meteo** lze objednat v jedné z těchto variant:

### CHESTER Meteo {#chester-meteo}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X0B:A`: Vstupní modul (4 kanály)
* `CHESTER-S2`: Externí vlhkoměr
* Externí barometr
* `CHESTER-E1-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update meteo --variant "CHESTER Meteo"`

### CHESTER Meteo Z {#chester-meteo-z}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-X0B:A`: Vstupní modul (4 kanály)
* `CHESTER-Z1`: Záložní modul
* `CHESTER-S2`: Externí vlhkoměr
* Externí barometr
* `CHESTER-E1-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

Varianta sestavení firmwaru: `west chester-update meteo --variant "CHESTER Meteo Z"`

## Měření a chování {#measurement-and-behavior}

- Všechny senzory se **vzorkují** s nastavitelnou periodou (parametr `interval-sample`).
- Vzorky se pak **agregují** v nastavitelném intervalu: z uložených vzorků se pro každý senzor spočítá minimum, maximum, průměr a medián (parametr `interval-aggreg`).
- Každá agregovaná hodnota má svou časovou značku; hodnoty se odesílají v dávkách v intervalu hlášení (parametr `interval-report`).

### Rychlost větru {#wind-speed}

Rychlost větru se měří nepřetržitě i v době mezi vzorky (`interval-sample`). Každý vzorek je průměrná rychlost větru za dobu od předchozího vzorku. Při každé agregaci (`interval-aggreg`) se tyto vzorky agregují a z uložených vzorků se spočítá minimum, maximum, průměr a medián.

Díky nepřetržitému měření dává každá agregace přesnou minimální, maximální a průměrnou rychlost větru.

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
```

## Příkazy aplikace {#specific-commands}

:::info

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

:::

:::caution

Novou konfiguraci uplatníte příkazem `config save`, který uloží nové parametry a restartuje zařízení.

:::

Tímto příkazem nastavíte **interval vzorkování** v sekundách:

```
app config interval-sample <1-86400>
```

Tímto příkazem nastavíte **interval agregace** v sekundách:

```
app config interval-aggreg <1-86400>
```

Tímto příkazem nastavíte **interval hlášení** v sekundách:

```
app config interval-report <30-86400>
```

Tímto příkazem přečtete **aktuální hodnoty** pro **účely testování**:

```
meteo read ctr_meteo_a
```

## Firmware {#firmware}

Nejnovější firmware najdete na stránce Katalogové aplikace v kapitole [Firmware aplikací](index.md#application-firmware).

## Ukázková zpráva JSON {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
Při této konfiguraci obsahuje každá struktura šest agregovaných hodnot. Každá z nich má svou časovou značku a hodnoty `min`, `max`, `avg` a `mdn` vypočtené z několika vzorků.

Rychlost větru je v **metrech za sekundu**.

Tlak je v **pascalech**.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

```json
{
  "message": {
    "version": 1,
    "sequence": 1,
    "timestamp": 1675784614
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.2",
    "fw_name": "CHESTER Meteo",
    "fw_version": "v2.0.0",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 361,
    "voltage_rest": 3.6,
    "voltage_load": 3.56,
    "current_load": 35
  },
  "backup": {
    "line_voltage": 24.21,
    "batt_voltage": 3.41,
    "state": "connected",
    "events": [
      {
        "timestamp": 1675784338,
        "type": "disconnected"
      },
      {
        "timestamp": 1675784518,
        "type": "connected"
      }
    ]
  },
  "network": {
    "imei": 351358815180770,
    "imsi": 901288910018982,
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -83,
      "rsrq": -4,
      "snr": 14,
      "plmn": 23003,
      "cid": 939040,
      "band": 20,
      "earfcn": 6447
    }
  },
  "thermometer": {
    "temperature": 21.37
  },
  "accelerometer": {
    "acceleration_x": -0.23,
    "acceleration_y": 0.07,
    "acceleration_z": 9.49,
    "orientation": 2
  },
  "weather_station": {
    "wind_speed": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 0,
          "max": 4,
          "avg": 2.78,
          "mdn": 2.8
        },
        {
          "timestamp": 1675784398,
          "min": 3.91,
          "max": 4.13,
          "avg": 4,
          "mdn": 4
        },
        {
          "timestamp": 1675784458,
          "min": 3.86,
          "max": 4.13,
          "avg": 4.03,
          "mdn": 4
        },
        {
          "timestamp": 1675784518,
          "min": 3.86,
          "max": 4.13,
          "avg": 4.03,
          "mdn": 4
        },
        {
          "timestamp": 1675784578,
          "min": 4,
          "max": 4.26,
          "avg": 4.13,
          "mdn": 4.13
        }
      ]
    },
    "wind_direction": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "value": 0
        },
        {
          "timestamp": 1675784398,
          "value": 0
        },
        {
          "timestamp": 1675784458,
          "value": 0
        },
        {
          "timestamp": 1675784518,
          "value": 7
        },
        {
          "timestamp": 1675784578,
          "value": 45
        }
      ]
    },
    "rainfall": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "value": 0
        },
        {
          "timestamp": 1675784398,
          "value": 0
        },
        {
          "timestamp": 1675784458,
          "value": 0
        },
        {
          "timestamp": 1675784518,
          "value": 2.79
        },
        {
          "timestamp": 1675784578,
          "value": 2.79
        }
      ]
    }
  },
  "barometer": {
    "pressure": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 98070,
          "max": 98075,
          "avg": 98072,
          "mdn": 98073
        },
        {
          "timestamp": 1675784398,
          "min": 98071,
          "max": 98078,
          "avg": 98072,
          "mdn": 98074
        },
        {
          "timestamp": 1675784458,
          "min": 98070,
          "max": 98070,
          "avg": 98070,
          "mdn": 98070
        },
        {
          "timestamp": 1675784518,
          "min": 98071,
          "max": 98078,
          "avg": 98072,
          "mdn": 98074
        },
        {
          "timestamp": 1675784578,
          "min": 98070,
          "max": 98075,
          "avg": 98072,
          "mdn": 98073
        }
      ]
    },
  },
  "hygrometer": {
    "temperature": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 21.53,
          "max": 21.67,
          "avg": 21.59,
          "mdn": 21.6
        },
        {
          "timestamp": 1675784398,
          "min": 21.44,
          "max": 21.56,
          "avg": 21.51,
          "mdn": 21.53
        },
        {
          "timestamp": 1675784458,
          "min": 21.47,
          "max": 21.67,
          "avg": 21.53,
          "mdn": 21.52
        },
        {
          "timestamp": 1675784518,
          "min": 21.43,
          "max": 21.58,
          "avg": 21.49,
          "mdn": 21.5
        },
        {
          "timestamp": 1675784578,
          "min": 21.39,
          "max": 21.57,
          "avg": 21.47,
          "mdn": 21.44
        }
      ]
    },
    "humidity": {
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 38.86,
          "max": 39.04,
          "avg": 38.95,
          "mdn": 38.95
        },
        {
          "timestamp": 1675784398,
          "min": 38.93,
          "max": 39.14,
          "avg": 39.04,
          "mdn": 39.07
        },
        {
          "timestamp": 1675784458,
          "min": 38.85,
          "max": 39.15,
          "avg": 39.02,
          "mdn": 39.02
        },
        {
          "timestamp": 1675784518,
          "min": 38.89,
          "max": 39.15,
          "avg": 39.08,
          "mdn": 39.08
        },
        {
          "timestamp": 1675784578,
          "min": 38.88,
          "max": 39.11,
          "avg": 39.02,
          "mdn": 39.03
        }
      ]
    }
  },
  "w1_thermometers": [
    {
      "serial_number": 170694685,
      "measurements": [
        {
          "timestamp": 1675784338,
          "min": 21.93,
          "max": 22.06,
          "avg": 22,
          "mdn": 22
        },
        {
          "timestamp": 1675784398,
          "min": 22.12,
          "max": 22.18,
          "avg": 22.13,
          "mdn": 22.12
        },
        {
          "timestamp": 1675784458,
          "min": 22.12,
          "max": 22.12,
          "avg": 22.12,
          "mdn": 22.12
        },
        {
          "timestamp": 1675784518,
          "min": 22.12,
          "max": 22.12,
          "avg": 22.12,
          "mdn": 22.12
        },
        {
          "timestamp": 1675784578,
          "min": 22.12,
          "max": 22.12,
          "avg": 22.12,
          "mdn": 22.12
        }
      ]
    }
  ],
  "soil_sensors": [
    {
      "serial_number": 203181,
      "temperature": {
        "measurements": [
          {
            "timestamp": 1675784338,
            "min": 22,
            "max": 22.06,
            "avg": 22.03,
            "mdn": 22.06
          },
          {
            "timestamp": 1675784398,
            "min": 22.06,
            "max": 22.12,
            "avg": 22.07,
            "mdn": 22.06
          },
          {
            "timestamp": 1675784458,
            "min": 22.06,
            "max": 22.12,
            "avg": 22.07,
            "mdn": 22.06
          },
          {
            "timestamp": 1675784518,
            "min": 22,
            "max": 22.06,
            "avg": 22.03,
            "mdn": 22.06
          },
          {
            "timestamp": 1675784578,
            "min": 22,
            "max": 22.06,
            "avg": 22.03,
            "mdn": 22.06
          }
        ]
      },
      "moisture": {
        "measurements": [
          {
            "timestamp": 1675784338,
            "min": 6256,
            "max": 6288,
            "avg": 6272,
            "mdn": 6272
          },
          {
            "timestamp": 1675784398,
            "min": 6272,
            "max": 6288,
            "avg": 6278,
            "mdn": 6272
          },
          {
            "timestamp": 1675784458,
            "min": 6272,
            "max": 6304,
            "avg": 6280,
            "mdn": 6272
          },
          {
            "timestamp": 1675784518,
            "min": 6256,
            "max": 6304,
            "avg": 6268,
            "mdn": 6272
          },
          {
            "timestamp": 1675784578,
            "min": 6256,
            "max": 6304,
            "avg": 6268,
            "mdn": 6272
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
  "voltage_rest": 3.7,
  "voltage_load": 3.65,
  "current_load": 18,
  "orientation": 2,
  "therm_temperature": 19.5,
  "hygro_temperature": 19.2,
  "hygro_humidity": 60.5,
  "wind_speed": 2.5,
  "wind_direction": 180,
  "rainfall": 2.0,
  "barometer": 101325,
  "w1_thermometers": [18.5, 19.0],
  "ble_tags": [
    {
      "temperature": 20.0,
      "humidity": 58.0
    }
  ],
  "soil_sensors": [
    {
      "temperature": 15.5,
      "moisture": 450
    }
  ]
}
```

</p>
</details>

  </TabItem>
</Tabs>

---

## Seznam změn {#changelog}

### v3.5.1 – 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Nová varianta: **CHESTER Meteo M** (Modbus RTU, podporuje senzory Lambrecht a Sensecap/OPM; typ senzoru se volí parametrem `meteo-type`)
- **Přidáno**: Podpora půdních senzorů: vlhkost a teplota z půdních sond Modbus
- **Přidáno**: Podpora LoRaWAN: jediný binární soubor firmwaru pro LTE i LoRaWAN; režim se volí příkazem `app config mode lte` / `app config mode lrw`
- **Vylepšeno**: Podpora pyranometru (intenzita slunečního záření)

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora půdních senzorů: měření vlhkosti a teploty půdními sondami 1-Wire (`soil_sensors` ve výstupu JSON)
- **Přidáno**: Nová varianta: **CHESTER Meteo P** se vstupem pro pyranometr k měření intenzity slunečního záření
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové endpointy API); předchozí firmware pro Cloud v1 zůstává dostupný samostatně

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
