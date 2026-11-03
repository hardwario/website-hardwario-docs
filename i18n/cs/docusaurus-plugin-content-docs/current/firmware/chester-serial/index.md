---
title: CHESTER Serial
description: "Firmware katalogové aplikace CHESTER Serial: nastavení sériové linky a zařízení, ovladače zařízení, příkazy a formát dat."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER Serial {#chester-serial}

Firmware **CHESTER Serial** udělá ze zařízení CHESTER bránu pro zařízení se sériovým rozhraním. Elektroměry, senzory a další zařízení čte přes Modbus RTU nebo přes jejich vlastní sériový protokol a naměřené hodnoty odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

Firmware se sestavuje ve dvou variantách, jedné pro každé sériové rozhraní: [**CHESTER Serial RS-485**](chester-serial-rs485.md) a [**CHESTER Serial RS-232**](chester-serial-rs232.md). Tato stránka popisuje, co mají obě varianty společné; jejich vlastní stránky uvádějí jen to, čím se liší.

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim, tagy BLE a příkazy konzole), popisuje článek [**Společné funkce**](../common-functionality.md). Hardware a varianty produktu najdete na stránce katalogové aplikace [**CHESTER Serial**](../../catalog-applications/chester-serial/index.md).

## Podporovaný hardware {#supported-hardware}

Firmware podporuje:

- jeden modul sériového rozhraní ve slotu A: **CHESTER-X2** (RS-485) ve variantě RS-485, nebo **CHESTER-X12** (RS-232) ve variantě RS-232
- zařízení uvedená v části [Podporovaná zařízení](#supported-devices)
- bluetoothové senzorové tagy (viz [**Tagy BLE**](../ble-tags.md))

## Podporovaná zařízení {#supported-devices}

Firmware má ovladač pro každé z těchto zařízení. Každé zařízení se zadává do jednoho ze slotů `device-0` až `device-7` svým typem, za kterým u zařízení Modbus následuje jeho adresa Modbus (viz [Sloty zařízení](#device-slots)):

| Zařízení | Typ a adresa | Rozhraní | Měření |
| :--- | :--- | :--- | :--- |
| **MicroSENS 180-HS** | `microsens_180hs` | RS-232, vlastní protokol | Koncentrace CO₂ (obj. %), teplota, tlak |
| [**Promag MF7S**](../../supported-devices/serial-devices/promag-mf7s.md) | `promag_mf7s` | RS-232, vlastní protokol | UID každé karty RFID přiložené ke čtečce |
| [**Carlo Gavazzi EM1XX**](../../supported-devices/modbus/carlo-gavazzi-em1xx-series.md) | `em1xx,<addr>` | RS-485, Modbus RTU | Jednofázově: napětí, proud, činný, zdánlivý a jalový výkon, účiník, frekvence, odebraná a dodaná energie |
| [**Carlo Gavazzi EM5XX**](../../supported-devices/modbus/carlo-gavazzi-em5xx-series.md) | `em5xx,<addr>` | RS-485, Modbus RTU | Třífázově: napětí, proud, výkon a účiník po fázích; celkový proud, činný, zdánlivý a jalový výkon, účiník, frekvence, odebraná a dodaná energie |
| [**ORNO OR-WE-504**](../../supported-devices/modbus/orno-or-we-504.md) | `or_we_504,<addr>` | RS-485, Modbus RTU | Jednofázově: napětí, proud, činný, zdánlivý a jalový výkon, účiník, frekvence, odebraná energie |
| [**ORNO OR-WE-516**](../../supported-devices/modbus/orno-or-we-516.md) | `or_we_516,<addr>` | RS-485, Modbus RTU | Třífázově: napětí, proud, výkon a účiník po fázích; celkový činný, zdánlivý a jalový výkon, účiník, frekvence, celková, odebraná a dodaná energie |
| [**Schneider iEM3000**](../../supported-devices/modbus/schneider-electric-iem3xxx-series.md) | `iem3000,<addr>` | RS-485, Modbus RTU | Třífázově: napětí, proud a výkon po fázích; celkový činný, zdánlivý a jalový výkon, účiník, frekvence, odebraná a dodaná energie |
| **FlowT FT201** | `flowt_ft201,<addr>` | RS-485, Modbus RTU | Ultrazvukový průtokoměr: průtok, rychlost proudění, kladný, záporný a čistý proteklý objem, energie pro vytápění a chlazení, teplota na vstupu a výstupu, kvalita signálu |
| [**Piketronic RPP-R**](../../supported-devices/modbus/piketronic-rpp-r.md) | `piketronic,<addr>` | RS-485, Modbus RTU | Koncentrace radonu (Bq/m³, hodinový a denní průměr), teplota, vlhkost |
| **SolaX X3-Hybrid G3** | `solax_g3,<addr>` | RS-485, Modbus RTU | Hybridní střídač: výkon obou fotovoltaických řetězců, výkon, teplota a stav nabití baterie, výkon dodávaný do sítě, energie dodaná do sítě a spotřebovaná energie, výkon záložního výstupu EPS po fázích |

Zařízení RS-232 potřebují variantu RS-232 a transparentní režim, zařízení Modbus RTU variantu RS-485 a režim Modbus.

:::tip

Pro některé typy zařízení můžete použít i krátké aliasy: `microsens`, `sensecap`, `cubic`, `em111`, `em540`, `promag`, `flowt` a `solax`.

:::

:::caution

Firmware má pro každý typ zařízení jediný datový buffer. Připojte nejvýše jedno zařízení každého typu, jinak by se hodnoty dvou zařízení stejného typu promíchaly.

:::

Firmware přijme i typy `sensecap_s1000` (meteorologický senzor SenseCAP S1000/S500), `cubic_6303` (senzor prachových částic CUBIC 6303), `lambrecht` (meteostanice Lambrecht) a `generic` (libovolné zařízení Modbus), verze v4.0.1 pro ně ale nemá ovladač. V režimu Modbus čte senzory SenseCAP S1000 a CUBIC 6303 a prvních deset vstupních registrů obecného zařízení a hodnoty jen vypíše do logu; meteostanici Lambrecht nečte vůbec a žádné hodnoty těchto typů neodesílá. Meteostanice Lambrecht a SenseCAP a senzor CUBIC 6303 čte varianta M aplikace [**CHESTER Meteo**](../../catalog-applications/chester-meteo/index.md).

## Měření a chování {#measurement-and-behavior}

- Všechna nastavená zařízení, vnitřní teploměr a akcelerometr se **vzorkují** s nastavitelnou periodou (parametr `interval-sample`), poprvé 10 sekund po startu.
- Každé zařízení si uchová až 32 vzorků, každý s vlastní časovou značkou. Vzorky nad tento limit se až do dalšího hlášení zahazují.
- Vzorky se odesílají najednou v intervalu hlášení (parametr `interval-report`), poprvé 30 sekund po startu. Hlášení odcházejí přesně v tomto intervalu, bez náhodného rozptylu popsaného v článku [**Společné funkce**](../common-functionality.md#report-interval-jitter).
- Když je `interval-report` nastavený na `0`, zařízení po prvním hlášení už pravidelně nehlásí. Data odešle jen na vyžádání (příkazem `send` nebo tlačítkem) a po každém přečtení karty čtečkou Promag MF7S.
- Bluetoothové tagy se vzorkují se stejnou periodou a jejich hodnoty se agregují v intervalu agregace (parametr `interval-aggreg`): minimum, maximum, průměr a medián.

### Režim Modbus RTU {#modbus-rtu-mode}

V režimu Modbus (`serial-mode modbus`) pracuje zařízení CHESTER jako Modbus RTU Master a při každém vzorkování postupně přečte všechna nastavená podřízená zařízení:

* Na sběrnici RS-485 lze současně nastavit až **8 zařízení**, každé s vlastní adresou Modbus (1–247).
* Sériová linka používá parametry `serial-baudrate`, `serial-parity` a `serial-stop-bits`; Modbus RTU používá vždy 8 datových bitů.
* Pro celou sběrnici platí jeden časový limit odpovědi: nejdelší `timeout` z nastavených zařízení.
* Ovladače a příkazy `modbus` používají funkce Modbus 03 (čtení holding registrů), 04 (čtení vstupních registrů) a 06 (zápis jednoho registru).

### Transparentní režim {#transparent-mode}

V transparentním režimu (`serial-mode transparent`, výchozí) firmware Modbus nepoužívá. Sériovou linku otevře s nastavenými parametry pro zařízení s vlastním protokolem a pro příkazy `serial`:

* Připojit lze jen jedno zařízení (slot `device-0`).
* Data dekóduje ovladač zařízení a odesílají se jen dekódované hodnoty. Firmware v4.0.1 surová data ze sériové linky do cloudu nepřeposílá.
* Hodí se pro zařízení s vlastním protokolem (MicroSENS 180-HS, Promag MF7S) a pro testování sériového spojení příkazy `serial send` a `serial recv`.

### LoRaWAN {#lorawan}

V režimu LoRaWAN (`mode lrw`) firmware při každém hlášení odešle jeden uplink za každé nastavené zařízení, s odstupem jedné sekundy:

* Každý uplink má nejvýše 51 bajtů: hlavičku s číslem slotu, systémová data (napětí a proud baterie, orientace, vnitřní teplota) a poslední hodnoty zařízení.
* Většina hodnot zařízení se kóduje ve formátu **Float16**, viz [Ukázková zpráva JSON](#example-json-message).
* Čtečka Promag MF7S odešle uplink po každém přečtení karty.
* Zařízení typů bez ovladače se neodesílají.

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty vypíše příkaz `app config show`.

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `interval-sample` | `<1-86400>` | `60` | Interval vzorkování v sekundách |
| `interval-aggreg` | `<1-86400>` | `300` | Interval agregace hodnot z bluetoothových tagů v sekundách |
| `interval-report` | `<0-86400>` | `1800` | Interval hlášení v sekundách; `0` pravidelná hlášení vypne |
| `interval-poll` | `<0-86400>` | `0` | Interval dotazování HARDWARIO Cloud na zprávy downlink v sekundách; firmware v4.0.1 hodnotu uloží, ale nepoužívá ji |
| `serial-mode` | `transparent`, `modbus` | `transparent` | Protokol na sériové lince: vlastní protokol zařízení, nebo Modbus RTU |
| `serial-baudrate` | `<1200-115200>` | `9600` | Přenosová rychlost |
| `serial-data-bits` | `<7-9>` | `8` | Počet datových bitů; Modbus RTU používá vždy 8 |
| `serial-parity` | `none`, `odd`, `even` | `none` | Parita |
| `serial-stop-bits` | `<1-2>` | `1` | Počet stop bitů |
| `device-0` až `device-7` | `type[,addr[,timeout]]` | `""` | Zařízení ve slotech 0 až 7, viz [Sloty zařízení](#device-slots) |

Obě varianty mají stejné parametry. Varianta RS-232 přijme jen jedno zařízení, a používá proto jen `device-0`.

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../common-functionality.md#network-mode-configuration).

### Sloty zařízení {#device-slots}

Sloty zařízení 0–7 nastavíte ve formátu `type[,addr[,timeout]]`:

```
app config device-<n> "<type>,<addr>,<timeout>"
```

Kde:
* `n`: index slotu zařízení (0–7)
* `type`: řetězec typu zařízení (viz [Podporovaná zařízení](#supported-devices))
* `addr`: adresa podřízeného zařízení Modbus (1–247), v režimu Modbus povinná
* `timeout`: časový limit odpovědi v sekundách (výchozí: 1)

**Příklady konfigurace:**

```
# Gavazzi EM111 single-phase meter at address 1
app config device-0 "em1xx,1,1"

# ORNO OR-WE-516 three-phase meter at address 2
app config device-1 "or_we_516,2,1"

# Schneider iEM3000 at address 10 with 3s timeout
app config device-2 "iem3000,10,3"

# MicroSENS CO2 sensor (RS-232, no address needed)
app config device-0 "microsens_180hs"

# Clear a device slot
app config device-3 ""
```

:::tip

V režimu Modbus je adresa podřízeného zařízení povinná pro všechna zařízení. V transparentním režimu lze nastavit jen `device-0`.

:::

## Příkazy {#commands}

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

| Příkaz | Akce |
| :--- | :--- |
| `sample` | Okamžitě navzorkuje všechna zařízení a senzory |
| `send` | Okamžitě odešle data |
| `device list` | Vypíše nastavená zařízení s jejich typem, adresou a časovým limitem |
| `device sample <0-7>` | Okamžitě přečte zařízení v daném slotu a vypíše jeho hodnoty |
| `device reset <0-7>` | Resetuje zařízení v daném slotu; podporuje to jen MicroSENS 180-HS |
| `device <type> sample <addr>` | Přečte zařízení Modbus daného typu na zadané adrese a vypíše jeho hodnoty |
| `device microsens_180hs sample` | Přečte senzor MicroSENS 180-HS a vypíše jeho hodnoty |
| `device microsens_180hs calibrate zero [value]` | Kalibrace nulového bodu ve známé koncentraci CO₂; `value` je koncentrace CO₂ v obj. % × 1000, `0`–`500`, výchozí `40` (0,04 %) |
| `device microsens_180hs reset` | Softwarový reset senzoru |
| `device or_we_504 config <old_addr> <new_addr>` | Zapíše do elektroměru novou adresu Modbus |
| `device flowt_ft201 config <current_addr> <new_addr>` | Zapíše do průtokoměru novou adresu Modbus |
| `device flowt_ft201 read_info <addr>` | Vypíše sériové číslo a adresu přístroje |
| `device solax_g3 service <addr>` | Přečte servisní registry střídače (napětí a proudy fotovoltaiky a baterie, hodnoty sítě po fázích, stav BMS, poruchy) a vypíše je |
| `device promag_mf7s read_info` | Vypíše verzi firmwaru a název čtečky |
| `device promag_mf7s notify` | Čtečka pípne a blikne svými LED |
| `device promag_mf7s sampling [timeout_s]` | Vypisuje UID přiložených karet, ale neukládá je; skončí po `timeout_s` sekundách bez přiložené karty (výchozí 10) |
| `modbus read <slave> <addr> <count> [holding\|input]` | Přečte až 32 registrů (vstupní registry, pokud nezadáte `holding`) a vypíše je |
| `modbus write <slave> <addr> <value>` | Zapíše hodnotu do jednoho holding registru |
| `modbus sample` | Přečte zařízení typů `sensecap_s1000`, `cubic_6303` a `generic` a vypíše jejich hodnoty do logu |
| `serial send <hex> [timeout_s]` | Odešle na sériovou linku bajty zadané v hex a vypíše odpověď |
| `serial recv [timeout_s]` | Vypíše bajty přijaté po sériové lince |

Podpříkaz `config` u ostatních typů zařízení mění jen adresu, kterou ovladač použije do dalšího vzorkování; adresu proto nastavte ve slotu zařízení. Čtení zařízení Modbus (příkazy `modbus` a `device <type> sample <addr>`) vyžaduje režim Modbus a aspoň jedno nastavené zařízení; příkazy `serial` vyžadují transparentní režim a zařízení v `device-0`.

## Sestavení firmwaru {#firmware-build}

Společné sestavení neexistuje: stáhněte nebo sestavte variantu pro své rozhraní, [**CHESTER Serial RS-485**](chester-serial-rs485.md#firmware-build) nebo [**CHESTER Serial RS-232**](chester-serial-rs232.md#firmware-build).

## Ukázková zpráva JSON {#example-json-message}

<Tabs>
  <TabItem value="lte" label="LTE">

Hlášení obsahuje v poli `devices` jednu položku pro každý nastavený slot: `device` (číslo slotu), `type`, `type_name`, `addr` a `data`, tedy seznam vzorků od posledního hlášení, každý s časovou značkou `timestamp`. Klíče v `data` závisí na typu zařízení:

| Typ | Klíče v `data` |
| :--- | :--- |
| `microsens_180hs` | `co2_percent` (obj. %), `temperature` (°C), `pressure` (mbar) |
| `promag_mf7s` | `card_uid` |
| `em1xx` | `voltage`, `current`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `frequency`, `energy_in`, `energy_out` |
| `em5xx` | `current`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `frequency`, `energy_in`, `energy_out`, `voltage_l1`, `voltage_l2`, `voltage_l3`, `current_l1`, `current_l2`, `current_l3`, `power_l1`, `power_l2`, `power_l3`, `power_factor_l1`, `power_factor_l2`, `power_factor_l3` |
| `or_we_504` | `voltage`, `current`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `frequency`, `energy_in` |
| `or_we_516` | `voltage_l1`, `voltage_l2`, `voltage_l3`, `current_l1`, `current_l2`, `current_l3`, `power_l1`, `power_l2`, `power_l3`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `power_factor_l1`, `power_factor_l2`, `power_factor_l3`, `frequency`, `energy`, `energy_in`, `energy_out` |
| `iem3000` | `voltage_l1`, `voltage_l2`, `voltage_l3`, `current_l1`, `current_l2`, `current_l3`, `power_l1`, `power_l2`, `power_l3`, `power`, `power_apparent`, `power_reactive`, `power_factor`, `frequency`, `energy_in`, `energy_out` |
| `flowt_ft201` | `flow_s` (m³/s), `flow_m` (m³/min), `flow_h` (m³/h), `velocity` (m/s), `total_positive`, `total_negative`, `total_net`, `energy_hot`, `energy_cold`, `temp_inlet` a `temp_outlet` (°C), `signal_quality` |
| `piketronic` | `radon_concentration` (Bq/m³, hodinový průměr), `radon_concentration_day` (Bq/m³, denní průměr), `temperature` (°C), `humidity` (%) |
| `solax_g3` | `pv1_power`, `pv2_power`, `bat_power`, `feedin_power`, `eps_power_l1`, `eps_power_l2`, `eps_power_l3` (W), `bat_temp` (°C), `bat_soc` (%), `feedin_energy` a `consume_energy` (kWh) |

Elektroměry hlásí napětí ve V, proud v A, výkon v kW (zdánlivý výkon v kVA, jalový výkon v kvar), frekvenci v Hz a energii v kWh.

Ukázka níže pochází ze starší verze firmwaru (`fw_version` `v1.0.0`). Firmware v4.0.1 odesílá klíče uvedené výše, výkon elektroměrů hlásí v kW a v `network` nemá `imei` ani `imsi`.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "message": {
    "version": 1,
    "sequence": 42,
    "timestamp": 1738627200
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CGLS",
    "hw_revision": "R3.4",
    "fw_version": "v1.0.0",
    "serial_number": "2159018267"
  },
  "system": {
    "uptime": 86400,
    "voltage_rest": 3.65,
    "voltage_load": 3.42,
    "current_load": 28
  },
  "network": {
    "imei": 351358815180770,
    "imsi": 901288910018982,
    "parameter": {
      "rsrp": -85,
      "rsrq": -6,
      "snr": 12,
      "plmn": 23003,
      "cid": 939040,
      "band": 20
    }
  },
  "thermometer": {
    "temperature": 23.45
  },
  "accelerometer": {
    "accel_x": 0.012,
    "accel_y": -0.008,
    "accel_z": 1.002,
    "orientation": 2
  },
  "devices": [
    {
      "device": 0,
      "type": 7,
      "type_name": "em1xx",
      "addr": 1,
      "data": [
        {
          "timestamp": 1738627200,
          "voltage": 230.5,
          "current": 5.23,
          "power": 1198.0,
          "frequency": 50.01,
          "energy_in": 12345,
          "energy_out": 0
        }
      ]
    },
    {
      "device": 1,
      "type": 8,
      "type_name": "or_we_516",
      "addr": 2,
      "data": [
        {
          "timestamp": 1738627200,
          "voltage_l1": 230.1,
          "voltage_l2": 231.2,
          "voltage_l3": 229.8,
          "current_l1": 4.12,
          "current_l2": 3.89,
          "current_l3": 4.35,
          "power_l1": 948.0,
          "power_l2": 901.2,
          "power_l3": 996.5,
          "power_total": 2845.7,
          "energy": 98765
        }
      ]
    }
  ]
}
```

</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

Zařízení **CHESTER Serial** kóduje payload LoRaWAN binárně a za každé nastavené zařízení odešle jeden uplink. Každý uplink má nejvýše 51 bajtů.

Dekodér pro ChirpStack/TTN je k dispozici v souboru `codec/cs-decoder.js` této aplikace v sadě CHESTER SDK. Vrací systémové hodnoty (`voltage_rest`, `voltage_load`, `current_load`, `orientation`, `therm_temperature`), číslo slotu (`device_index`) a objekt `device` s klíči `type`, `type_name`, `addr`, `valid` a s hodnotami zařízení v `data`.

:::info

Kvůli omezené velikosti payloadu v LoRaWAN se hodnoty zařízení kódují ve formátu **Float16** (IEEE 754, poloviční přesnost). Dekodér je převede zpět na běžná čísla. Float16 uchová zhruba tři platné číslice a neumí hodnoty nad 65 504, takže velké součty energie přes LoRaWAN ztrácejí přesnost; hlášení přes LTE odesílají plné hodnoty.

:::

  </TabItem>
</Tabs>

## Seznam změn {#changelog}

### v4.0.0 – 2026-08-10 {#v400--2026-08-10}

- **Přidáno**: Ovladač pro střídač **SolaX X3-Hybrid G3**
- **Přidáno**: Ovladač pro radonovou sondu [**Piketronic RPP-R**](../../supported-devices/modbus/piketronic-rpp-r.md) (typ `piketronic`)

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora LoRaWAN: optimalizované binární kódování se sdružováním dat více zařízení pro úsporu přenosového pásma
- **Přidáno**: Podpora rozhraní RS-232 přes rozšiřující modul CHESTER-X12 (vedle stávajícího RS-485/CHESTER-X2)
- **Přidáno**: 10 profilů typů zařízení včetně elektroměrů, senzorů prostředí a obecných zařízení Modbus RTU
- **Změněno**: Přechod na protokol HARDWARIO Cloud (kódování CBOR, nové endpointy API); firmware pro Cloud Legacy nebyl pro tuto aplikaci k dispozici

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
