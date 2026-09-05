---
slug: chester-push
title: CHESTER Push
description: "Tento článek popisuje základní funkcionalitu, popis hardwaru a ukázkovou JSON zprávu katalogové aplikace CHESTER Push."
---
import Image from '@theme/IdealImage';

# CHESTER Push {#chester-push}

Tento článek popisuje základní funkcionalitu, popis hardwaru a ukázkovou **JSON** zprávu katalogové aplikace **CHESTER Push**.

:::caution

Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:

- [**První kroky**](https://docs.hardwario.com/chester/first-steps): jak připojit zařízení do Cloudu.
- [**Společná funkcionalita**](common-functionality.md): jak funguje LED, tlačítko a konfigurace sítě.
- [**Správa platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::


## Přehled aplikace {#application-overview}

Zařízení **CHESTER Push** má na krabičce tlačítka. Aplikace okamžitě odešle data při stisknutí kteréhokoli z tlačítek. U hromadných objednávek lze počet tlačítek konfigurovat. Standardní konfigurace nabízí čtyři tlačítka na levé straně. Alternativně můžeme dodat verzi s jedním tlačítkem (uprostřed krabičky). Na přání zákazníka také můžeme upravit potisk krabičky a doplnit různé textové popisky (nebo symboly) vedle jednotlivých tlačítek.

Aplikace umí rozlišit krátký a dlouhý stisk. V každé zprávě je událost rozlišující, které z tlačítek odeslání vyvolalo. Každá zpráva také obsahuje čítače krátkých a dlouhých stisků pro každé tlačítko.

Každé tlačítko je rovněž vybaveno **LED indikátorem**, takže obsluha vidí, že byl stisk rozpoznán. Pro slyšitelné potvrzení stisku tlačítka se navíc z integrovaného akustického bzučáku přehraje **pípnutí**.

Aplikace **CHESTER Push** integruje rozšiřující modul **CHESTER-Z1-F** s dobíjecí baterií **Li-Ion** a DC/DC napájecím zdrojem (rozsah vstupního napětí 6 VDC až 26 VDC), který dokáže nabíjet baterii a zajistit stabilní napájení aplikace. Odesílaná zpráva také poskytuje informace o přítomnosti externího napájení, napětí externí DC linky a napětí baterie. Díky těmto doplňkovým informacím lze **CHESTER Push** použít i pro monitorování výpadků napájení.

Zařízení **CHESTER Push** rovněž hlásí teplotu a orientaci zařízení (pomocí vestavěného akcelerometru). Všechny tyto hodnoty jsou obsaženy v každé zprávě odeslané ze zařízení.

### Chování LED {#led-behaviour}

Aplikace signalizuje události tlačítek na LED dvěma různými způsoby a zákazníci mohou určit, která varianta firmwaru jejich potřebám lépe vyhovuje.

- Standardní implementace **CHESTER Push**:

  LED na stisknutém tlačítku svítí po dobu 2 sekund (zeleně při krátkém stisku, červeně při dlouhém stisku).

  :::tip

  Tato varianta je vhodná pro nízkopříkonový provoz (měsíce z integrované baterie **Li-Ion**).

  :::

- Alternativní implementace **CHESTER Push FM** (zkratka pro **Flip Mode**):

  LED se přepne (červenou barvou) na tlačítko, které bylo stisknuto (předchozí tlačítko se zhasne).

  :::caution

  Tato varianta není vhodná pro nízkopříkonový provoz, protože trvale svítící LED rychle vybíjí baterii.

  :::

## Popis hardwaru {#chester-push}

Hardware katalogové aplikace **CHESTER Push** se skládá z následujících objednacích kódů:

* `CHESTER-M-CGLS`: základní deska CHESTER
* `CHESTER-Z1-F`: čtyři tlačítka (další varianty viz [**Objednací kódy**](../ordering-codes.md#chester-z))
* `CHESTER-E2-LP`: krabička se světlovodem a SMA anténním pigtailem

## Šablona krabičky {#enclosure-template}

Pro vlastní návrh krabičky můžete použít [**šablonu předního krytu**](pathname:///download/hio-enclosure-4push-130x175-cmyk.pdf).

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná příkazem `app config show`):

```
app config interval-report 1800
app config event-report-delay 1
app config event-report-rate 60
app config backup-report-connected false
app config backup-report-disconnected false
```

## Specifické příkazy {#specific-commands}

:::info

Celou stromovou strukturu příkazů můžete snadno prozkoumat – začněte příkazem `help`.

:::

Tímto příkazem nastavíte **interval hlášení** (v sekundách):

```
app config interval-report <value>
```

Tímto příkazem nastavíte krátké zpoždění (v sekundách) mezi událostí **button** nebo **backup** a jejím nahlášením:

```
app config event-report-delay <value>
```

Tímto příkazem omezíte počet asynchronních hlášení událostí **button** nebo **backup** v jednohodinovém okně:

```
app config event-report-rate <value>
```

:::tip

Tato funkce pomáhá šetřit energii u zařízení napájeného z baterie a optimalizuje množství přenášených dat. Pravidelná (periodická) hlášení nastavená parametrem `interval-report` se do tohoto limitu nepočítají.

:::

Těmito příkazy zapnete/vypnete hlášení událostí připojení/odpojení napájecího vstupu zálohovacího modulu:

```
app config backup-report-connected false
app config backup-report-disconnected false
```

## Firmware {#firmware}

Nejnovější firmware je k dispozici v kapitole [Firmware](index.md#application-firmware) katalogových aplikací.

## Ukázková JSON zpráva {#example-json-message}

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

</p>
</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

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

</p>
</details>

  </TabItem>
</Tabs>

---

## Seznam změn {#changelog}

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora LoRaWAN: jediný binární firmware pro LTE i LoRaWAN; režim lze zvolit pomocí `app config mode lte` / `app config mode lrw`
- **Změněno**: Refaktorováno na nový LoRaWAN framework `app_lrw` s pokrytím jednotkovými testy
- **Změněno**: Přijat protokol Cloud v2 (kódování CBOR, nové API endpointy); předchozí firmware pro Cloud v1 zůstává samostatně k dispozici

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
