---
slug: chester-serial
title: CHESTER Serial
---
import Image from '@theme/IdealImage';

# CHESTER Serial {#chester-serial}

Tento článek popisuje základní funkce katalogové aplikace **CHESTER Serial**, její hardware, výchozí konfiguraci a ukázkovou zprávu **JSON**.

:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::

## Přehled aplikace {#application-overview}

**CHESTER Serial** je univerzální aplikace pro průmyslovou sériovou komunikaci. Slouží jako flexibilní brána, která průmyslová zařízení (senzory, elektroměry) připojí do cloudu přes LTE-M/NB-IoT nebo LoRaWAN.

Podle osazeného rozšiřujícího modulu aplikace podporuje dvě komunikační rozhraní:
* **RS-485** (s modulem [**CHESTER-X2**](../extension-modules/chester-x2.md)): Modbus RTU Master, sběrnice multi-drop, až 8 podřízených zařízení
* **RS-232** (s modulem [**CHESTER-X12**](../extension-modules/chester-x12.md)): spojení bod-bod, 1 zařízení

Podporuje 11 typů zařízení, mimo jiné elektroměry, senzory prostředí a obecná zařízení Modbus. Data přenáší přes LTE (kódování CBOR) nebo LoRaWAN (optimalizované binární kódování, které do jedné zprávy sdruží data více zařízení).

## Varianty aplikace {#application-variants}

Aplikaci **CHESTER Serial** lze objednat v jedné z těchto variant:

### CHESTER Serial RS-485 {#chester-serial-rs-485}

Tato varianta má rozšiřující modul **CHESTER-X2**. Je určená pro běžnou průmyslovou sběrnici, na které je více zařízení zapojeno za sebou (daisy-chain).

* **Rozhraní:** neizolovaná RS-485
* **Topologie:** sběrnice multi-drop
* **Kapacita:** až 8 podřízených zařízení Modbus RTU

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-X2`: Modul rozhraní RS-485
* `CHESTER-X10`: Externí napájecí vstup (5–28 V DC)
* `CHESTER-E2-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

### CHESTER Serial RS-232 {#chester-serial-rs-232}

Tato varianta má rozšiřující modul **CHESTER-X12**. Je určená pro spojení bod-bod s jedním periferním zařízením, se staršími zařízeními nebo se senzory, které potřebují přímé sériové spojení.

* **Rozhraní:** neizolovaná RS-232
* **Topologie:** spojení bod-bod
* **Kapacita:** jedno zařízení (spojení 1:1)

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-X12`: Modul rozhraní RS-232
* `CHESTER-E2-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

:::caution

Zařízení **CHESTER Serial** potřebuje pro nepřetržitý provoz externí napájení (5–28 V DC). Senzory i sériové rozhraní jsou napájené trvale.

:::

## Podporovaná zařízení {#supported-devices}

Firmware přímo podporuje tato zařízení:

| Zařízení | Řetězec typu | Rozhraní | Měření |
| :--- | :--- | :--- | :--- |
| **MicroSENS 180-HS** | `microsens_180hs` | RS-232 (ASCII) | CO2 (obj. %), teplota, tlak |
| **SenseCAP S1000 / S500** | `sensecap_s1000` | RS-485 Modbus | Teplota, vlhkost, tlak, osvětlenost, vítr |
| **CUBIC 6303** | `cubic_6303` | RS-485 Modbus | PM1.0, PM2.5, PM10 |
| **Lambrecht** | `lambrecht` | RS-485 Modbus | Data meteostanice |
| **Piketronic RPP-R** | `piketronic` | RS-485 Modbus | Koncentrace radonu (Bq/m³), teplota, vlhkost |
| **Generic Modbus** | `generic` | RS-485 Modbus | Vlastní mapování registrů |
| **Carlo Gavazzi EM1XX** | `em1xx` | RS-485 Modbus | Napětí, proud, výkon, frekvence, odebraná a dodaná energie (jednofázově) |
| **Carlo Gavazzi EM5XX** | `em5xx` | RS-485 Modbus | Napětí, proud, výkon, frekvence, energie po fázích (třífázově) |
| **ORNO OR-WE-504** | `or_we_504` | RS-485 Modbus | Napětí, proud, výkon, energie (jednofázově) |
| **ORNO OR-WE-516** | `or_we_516` | RS-485 Modbus | Napětí, proud, výkon po fázích, energie (třífázově) |
| **Schneider iEM3000** | `iem3000` | RS-485 Modbus | Napětí, proud, výkon, energie po fázích (třífázově) |

:::tip

Pro některé typy zařízení můžete použít i krátké aliasy: `microsens`, `sensecap`, `cubic`, `em111`, `em540`.

:::

## Chování aplikace {#application-behavior}

### Režim Modbus RTU {#modbus-rtu-mode}

V režimu Modbus pracuje zařízení CHESTER jako Modbus RTU Master a pravidelně dotazuje všechna nastavená podřízená zařízení:

* Zařízení se **vzorkují** s nastavitelnou periodou (parametr `interval-sample`).
* Nasbíraná měření se odesílají najednou v intervalu hlášení (parametr `interval-report`).
* Na sběrnici RS-485 lze současně nastavit až **8 zařízení**.
* Podporované funkce Modbus: FC01, FC02, FC03, FC04, FC05, FC06, FC0F a FC10.

### Transparentní režim {#transparent-mode}

V transparentním režimu pracuje zařízení CHESTER jako obousměrný most mezi sériovým portem a cloudem:

* Data přijatá po sériové lince se přeposílají do cloudu.
* Připojit lze jen jedno zařízení (slot `device-0`).
* Hodí se pro ladění, starší zařízení nebo nestandardní protokoly.

### Sdružování dat více zařízení v LoRaWAN {#lorawan-multi-device-packing}

V síti LoRaWAN aplikace adaptivně sdružuje data více zařízení (protokol v2), aby co nejlépe využila vysílací čas (airtime):

* Průběžně zjišťuje aktuální Data Rate, a tím i dostupnou MTU.
* Kde je to možné, sdružuje odečty více zařízení do jediného uplinku.
* První uplink obsahuje systémová data (baterie, teplota, akcelerometr) a data zařízení.
* Následující uplinky obsahují pouze data zařízení.

## Technické specifikace {#technical-specifications}

| Vlastnost | Hodnota |
| :--- | :--- |
| **Operační systém** | Zephyr RTOS |
| **Fyzické rozhraní** | RS-232 (modul X12), RS-485 (modul X2) |
| **Aplikační protokoly** | Transparentní (RAW), Modbus RTU |
| **Cloudové formáty** | CBOR (LTE), optimalizovaný binární (LoRaWAN) |
| **Napájení** | Vyžadován externí zdroj (5–28 V DC) |

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

```
app config mode none
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
app config interval-poll 0
app config serial-mode transparent
app config serial-baudrate 9600
app config serial-data-bits 8
app config serial-parity none
app config serial-stop-bits 1
app config device-0
app config device-1
app config device-2
app config device-3
app config device-4
app config device-5
app config device-6
app config device-7
```

## Příkazy aplikace {#specific-commands}

:::info

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

:::

:::caution

Novou konfiguraci uplatníte příkazem `config save`, který uloží nové parametry a restartuje zařízení.

:::

### Příkazy akcí {#action-commands}

Tímto příkazem **okamžitě spustíte vzorkování** (výsledek se uloží do bufferu vzorků):

```
sample
```

Tímto příkazem **okamžitě odešlete data**:

```
send
```

### Režim sítě {#network-mode}

Tímto příkazem nastavíte **komunikační režim**:

```
app config mode <none/lte/lrw>
```

### Hlášení {#reporting}

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

Tímto příkazem nastavíte **interval dotazování přes LTE** v sekundách (0 = vypnuto):

```
app config interval-poll <0-86400>
```

### Sériová linka {#serial-line}

Tímto příkazem nastavíte **provozní režim sériové linky**:

```
app config serial-mode <transparent/modbus>
```

Tímto příkazem nastavíte **přenosovou rychlost**:

```
app config serial-baudrate <1200-115200>
```

Tímto příkazem nastavíte **počet datových bitů**:

```
app config serial-data-bits <7-9>
```

Tímto příkazem nastavíte **paritu**:

```
app config serial-parity <none/odd/even>
```

Tímto příkazem nastavíte **počet stop bitů**:

```
app config serial-stop-bits <1-2>
```

### Konfigurace zařízení {#device-configuration}

Sloty zařízení 0–7 nastavíte ve formátu `type[,addr[,timeout]]`:

```
app config device-<n> "<type>,<addr>,<timeout>"
```

Kde:
* `n`: index slotu zařízení (0–7)
* `type`: řetězec typu zařízení (viz tabulka Podporovaná zařízení)
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

### Příkazy Modbus {#modbus-commands}

Čtení registrů Modbus z podřízeného zařízení:

```
modbus read <slave> <addr> <count> [holding|input]
```

Zápis hodnoty do registru Modbus:

```
modbus write <slave> <addr> <value>
```

Vzorkování nastaveného zařízení Modbus:

```
modbus sample
```

### Příkazy sériové linky {#serial-commands}

Odeslání dat v hex na sériovou linku a čekání na odpověď:

```
serial send <hex> [timeout_s]
```

Čtení dat z přijímacího bufferu (RX) sériové linky:

```
serial recv [timeout_s]
```

### Příkazy zařízení {#device-commands}

Výpis všech nastavených zařízení:

```
device list
```

Vzorkování konkrétního zařízení podle indexu slotu:

```
device sample <0-7>
```

Reset konkrétního zařízení:

```
device reset <0-7>
```

Příkazy pro konkrétní typ zařízení:

```
device microsens_180hs <subcommand>
device em1xx <subcommand>
device or_we_504 <subcommand>
device or_we_516 <subcommand>
device em5xx <subcommand>
device iem3000 <subcommand>
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

</p>
</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

Zařízení **CHESTER Serial** kóduje payload LoRaWAN binárně a data více zařízení sdružuje podle protokolu v2. Payload je komprimovaný tak, aby se vešel do MTU LoRaWAN (51–222 bajtů podle Data Rate). Odečty více zařízení se pokud možno sdruží do jediného uplinku.

Dekodér pro ChirpStack/TTN je k dispozici v souboru `codec/cs-decoder.js`. Podporuje starší protokol v1 (jedno zařízení) i protokol v2 (sdružování dat více zařízení).

:::info

Kvůli omezené velikosti payloadu v LoRaWAN se hodnoty zařízení kódují ve formátu **Float16** (IEEE 754, poloviční přesnost). Dekodér je automaticky převede zpět na hodnoty s plnou přesností.

:::

  </TabItem>
</Tabs>

---

## Seznam změn {#changelog}

### v4.0.0 – 2026-08-10 {#v400--2026-08-10}

- **Přidáno**: Ovladač pro střídač **SolaX X3-Hybrid G3**
- **Přidáno**: Ovladač pro radonovou sondu [**Piketronic RPP-R**](../supported-devices/modbus/piketronic-rpp-r.md) (typ `piketronic`)

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Přidáno**: Podpora LoRaWAN: optimalizované binární kódování se sdružováním dat více zařízení pro úsporu přenosového pásma
- **Přidáno**: Podpora rozhraní RS-232 přes rozšiřující modul CHESTER-X12 (vedle stávajícího RS-485/CHESTER-X2)
- **Přidáno**: 10 profilů typů zařízení včetně elektroměrů, senzorů prostředí a obecných zařízení Modbus RTU
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové endpointy API); firmware pro Cloud v1 nebyl pro tuto aplikaci k dispozici

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
