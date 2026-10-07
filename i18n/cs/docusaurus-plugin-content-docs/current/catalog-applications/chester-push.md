---
slug: chester-push
title: CHESTER Push
---
import Image from '@theme/IdealImage';

# CHESTER Push {#chester-push}

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Push**, její hardware a ukázkovou zprávu **JSON**.

:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::


## Přehled aplikace {#application-overview}

Zařízení **CHESTER Push** má na krabičce tlačítka. Jakmile stisknete kterékoli z nich, aplikace okamžitě odešle data. U větších objednávek lze počet tlačítek přizpůsobit. Standardní provedení má čtyři tlačítka na levé straně, dodat můžeme i verzi s jedním tlačítkem uprostřed krabičky. Na přání zákazníka také upravíme potisk krabičky a vedle jednotlivých tlačítek doplníme textové popisky (nebo symboly).

Aplikace rozliší krátký a dlouhý stisk. Každá zpráva obsahuje událost, ze které poznáte, které tlačítko odeslání vyvolalo, a také čítače krátkých a dlouhých stisků všech tlačítek.

Každé tlačítko má také **indikační LED**, takže obsluha vidí, že zařízení stisk zaznamenalo. Stisk navíc slyšitelně potvrdí **pípnutí** z vestavěného bzučáku.

Aplikace **CHESTER Push** využívá rozšiřující modul **CHESTER-Z1-F** s dobíjecí baterií **Li-Ion** a napájecím zdrojem DC/DC (rozsah vstupního napětí 6 VDC až 26 VDC), který nabíjí baterii a zajišťuje stabilní napájení. Zpráva obsahuje také informaci, zda je připojené externí napájení, napětí na externím vstupu DC a napětí baterie. Díky tomu lze zařízení **CHESTER Push** použít i ke sledování výpadků napájení.

Zařízení **CHESTER Push** hlásí také teplotu a svou orientaci (z vestavěného akcelerometru). Všechny tyto hodnoty jsou v každé odeslané zprávě.

### Chování LED {#led-behaviour}

Aplikace umí signalizovat stisky tlačítek na LED dvěma způsoby a zákazník si vybere variantu firmwaru, která mu lépe vyhovuje.

- Standardní varianta **CHESTER Push**:

  LED na stisknutém tlačítku svítí 2 sekundy (zeleně při krátkém stisku, červeně při dlouhém).

  :::tip

  Tato varianta je vhodná pro provoz s nízkou spotřebou (na vestavěnou baterii **Li-Ion** vydrží měsíce).

  :::

- Alternativní varianta **CHESTER Push FM** (zkratka **Flip Mode**):

  Červeně se rozsvítí LED naposledy stisknutého tlačítka a LED předchozího tlačítka zhasne.

  :::caution

  Tato varianta není vhodná pro provoz s nízkou spotřebou, protože trvale svítící LED rychle vybíjí baterii.

  :::

## Popis hardwaru {#chester-push}

Hardware katalogové aplikace **CHESTER Push** tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: základní deska CHESTER
* `CHESTER-Z1-F`: čtyři tlačítka (další varianty viz [**Objednací kódy**](../ordering-codes.md#chester-z))
* `CHESTER-E2-LP`: krabička se světlovodem a anténním pigtailem SMA

## Šablona krabičky {#enclosure-template}

Pro vlastní návrh krabičky můžete použít [**šablonu předního krytu**](pathname:///download/hio-enclosure-4push-130x175-cmyk.pdf).

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config interval-report 1800
app config event-report-delay 1
app config event-report-rate 60
app config backup-report-connected false
app config backup-report-disconnected false
```

## Příkazy aplikace {#specific-commands}

:::info

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

:::

Tímto příkazem nastavíte **interval hlášení** (v sekundách):

```
app config interval-report <value>
```

Tímto příkazem nastavíte krátké zpoždění (v sekundách) mezi událostí **button** nebo **backup** a jejím nahlášením:

```
app config event-report-delay <value>
```

Tímto příkazem omezíte počet asynchronních hlášení událostí **button** nebo **backup** za hodinu:

```
app config event-report-rate <value>
```

:::tip

Limit šetří baterii zařízení a snižuje objem přenášených dat. Pravidelná hlášení podle parametru `interval-report` se do něj nepočítají.

:::

Těmito příkazy zapnete nebo vypnete hlášení připojení a odpojení napájení na vstupu záložního modulu:

```
app config backup-report-connected false
app config backup-report-disconnected false
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

- **Přidáno**: Podpora LoRaWAN: jediný binární soubor firmwaru pro LTE i LoRaWAN; režim se volí příkazem `app config mode lte` / `app config mode lrw`
- **Změněno**: Přepracováno na nový framework LoRaWAN `app_lrw` pokrytý jednotkovými testy
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové endpointy API); firmware pro Cloud v1 je nadále k dispozici samostatně

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
