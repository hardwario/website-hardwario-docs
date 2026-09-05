---
slug: promag-mf7s
title: Promag MF7S
description: "Když je interval-report nastaven na 0, CHESTER odešle data okamžitě po přiložení karty:"
---

import Image from '@theme/IdealImage';

# RFID čtečka Promag MF7S {#promag-mf7s-rfid-reader}

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/serial-devices/images/promag-rf7s.png')} width={376} height={376} alt="Černá RFID čtečka karet Promag MF7S s připojeným kabelem" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

### Popis {#description}

**Promag MF7S** je RFID čtečka karet, která komunikuje přes **RS-232** (19200 baud, 8N1). Čtečka automaticky odesílá UID karty, jakmile je karta přiložena. CHESTER provozuje vlákno pro naslouchání na pozadí, které průběžně přijímá karty a ukládá je do bufferu (max. 32 vzorků).

**Protokol:** `STX(0x02) + 8 HEX characters (UID) + CR + LF + ETX` = 12 bajtů na kartu.

---

### Hardware {#hardware}

- **Varianta:** CHESTER Serial RS-232 (`hio-chester-serial-rs232`)
- **Modul:** CHESTER-X12-A (RS-232)
- **Připojení:** Promag MF7S → RS-232 → CHESTER-X12-A
- **Přenosová rychlost:** 19200 (pevně nastaveno ovladačem)

---

### Konfigurace {#configuration}

#### Příkazy shellu {#shell-commands}

```
app config serial-mode transparent
app config serial-baudrate 19200
app config serial-data-bits 8
app config serial-parity none
app config serial-stop-bits 1
app config device-0 promag_mf7s
app config mode lte
app config interval-report 0
app config save
```

#### Přehled parametrů {#parameter-reference}

| Parametr | Hodnota | Popis |
|-----------|-------|-------------|
| `serial-mode` | `transparent` | Promag nepoužívá Modbus |
| `serial-baudrate` | `19200` | Pevně dané pro MF7S |
| `device-0` | `promag_mf7s` | Typ zařízení (bez adresy. Nejde o Modbus) |
| `mode` | `lte` nebo `lrw` | Komunikační režim |
| `interval-report` | `0` | Řízeno událostmi = okamžité odeslání při detekci karty |

#### Režim řízený událostmi (`interval-report = 0`) {#event-driven-mode-interval-report--0}

Když je `interval-report` nastaven na **0**, CHESTER odešle data **okamžitě** po přiložení karty:

- **Režim LTE:** Každá karta spustí `app_work_send()` → CBOR zpráva s kartou je odeslána okamžitě
- **Režim LoRaWAN:** Každá karta je vždy odeslána okamžitě (nezávisle na `interval-report`)

Pokud je `interval-report > 0`, karty se hromadí v bufferu (max. 32) a odesílají se periodicky.

---

### Příkazy shellu – ovladač {#shell-commands--driver}

#### Načtení verze firmwaru čtečky {#read-reader-firmware-version}

```
device promag_mf7s firmware
```

Výstup: `Firmware: MF7S-1.0`

#### Notifikace (LED + zvuk) {#notifications-led--sound}

```
device promag_mf7s notify
```

Provede sekvenci: zelená LED zap/vyp → červená LED zap/vyp → trojí pípnutí (vysoké, střední, nízké).

#### Režim vzorkování (interaktivní detekce) {#sampling-mode-interactive-detection}

```
device promag_mf7s sampling [timeout_s]
```

Přejde do interaktivního režimu. V shellu zobrazuje UID karet. Data se **neukládají** do bufferu. Timeout (výchozí 10 s) se resetuje při každém přiložení karty.

Výstup:
```
Sampling mode active (idle timeout: 10s)
Present cards to the reader...
Card UID: 12345678 (dec: 305419896)
Card UID: AABBCCDD (dec: 2864434397)
Sampling finished (total reads: 2)
```

#### Další příkazy {#other-commands}

```
device sample 0        # Show device status at index 0
device list            # List configured devices
app send               # Force immediate data send
```

---

### Payload – LTE (CBOR) {#payload--lte-cbor}

V režimu LTE se odesílá CBOR zpráva (max. 8 kB) se všemi nasbíranými kartami. Po úspěšném odeslání se buffer vymaže.

#### Příklad dekódovaného JSON payloadu {#example-decoded-json-payload}

<details>
<summary><b>Zobrazit příklad dekódovaného JSON payloadu</b></summary>
<p>

```json
{
  "message": {
    "version": 2,
    "sequence": 1,
    "timestamp": 1735905238
  },
  "attribute": {
    "vendor_name": "HARDWARIO",
    "product_name": "CHESTER-M",
    "hw_variant": "CDGLS",
    "hw_revision": "R3.4",
    "fw_version": "v3.5.1",
    "serial_number": "2159019335"
  },
  "system": {
    "uptime": 3600,
    "voltage_rest": 3.65,
    "voltage_load": 3.42,
    "current_load": 38
  },
  "network": {
    "parameter": {
      "eest": 7,
      "ecl": 0,
      "rsrp": -85,
      "rsrq": -8,
      "snr": 12,
      "plmn": 23003,
      "cid": 12345678,
      "band": 20,
      "earfcn": 6300
    }
  },
  "thermometer": {
    "temperature": 23.45
  },
  "accelerometer": {
    "accel_x": 0.01,
    "accel_y": -0.02,
    "accel_z": 1.00,
    "orientation": 2
  },
  "devices": [
    {
      "device": 0,
      "type": 11,
      "type_name": "promag_mf7s",
      "addr": 0,
      "data": [
        {
          "timestamp": 1735905200,
          "card_uid": 305419896
        },
        {
          "timestamp": 1735905230,
          "card_uid": 2864434397
        }
      ]
    }
  ]
}
```

</p>
</details>

:::info

`card_uid` je uint32 (dekadicky). Převod do hex: `305419896` = `0x12345678`, `2864434397` = `0xAABBCCDD`.

:::

---

### Payload – LoRaWAN (binární) {#payload--lorawan-binary}

LoRaWAN odesílá kompaktní binární zprávu (max. 51 bajtů). Každá zpráva obsahuje **jedno zařízení**.

#### Struktura payloadu (22 bajtů) {#payload-structure-22-bytes}

```
Offset  Size  Field
------  ----  -----
0       1B    Header: [version:4bit=1][device_idx:4bit]
1       5B    Battery (CHESTER standard encoding)
6       1B    Accelerometer orientation
7       2B    Thermometer (INT16 LE, /100 °C)
9       1B    Device type (11 = PROMAG_MF7S)
10      1B    Device address (0)
11      1B    Status flags (0x01=valid)
12      4B    Card UID (big-endian)
16      4B    Timestamp of last read (little-endian, unix)
20      2B    Total reads counter (uint16 LE)
```

**Celková velikost: 22 bajtů**

#### Příklad payloadu (hex) {#example-payload-hex}

```
10                     # Header: version=1, device_idx=0
0E 0F D2 0D 26         # Battery: rest=3650mV, load=3421mV, current=38mA
02                     # Accelerometer: orientation=2
29 09                  # Thermometer: 2345 → 23.45°C
0B                     # Device type: 11 (promag_mf7s)
00                     # Address: 0
01                     # Status: valid
12 34 56 78            # Card UID: 0x12345678 (BE)
D0 E0 4B 67            # Last read timestamp: 1735905488 (LE)
02 00                  # Total reads: 2
```

#### Dekódování v Node-RED / JavaScriptu {#decoding-in-node-red--javascript}

<details>
<summary><b>Zobrazit JavaScript dekodér</b></summary>
<p>

```javascript
function decode(payload) {
    var buf = Buffer.from(payload, 'hex');
    var offset = 0;

    var header = buf.readUInt8(offset++);
    var version = (header >> 4) & 0x0F;
    var device_idx = header & 0x0F;

    // Skip system data (8 bytes)
    offset += 8;

    var device_type = buf.readUInt8(offset++);
    var device_addr = buf.readUInt8(offset++);
    var status = buf.readUInt8(offset++);

    // Promag MF7S (type 11)
    if (device_type === 11) {
        var uid = buf.readUInt32BE(offset); offset += 4;
        var timestamp = buf.readUInt32LE(offset); offset += 4;
        var total_reads = buf.readUInt16LE(offset); offset += 2;

        return {
            device_idx: device_idx,
            device_type: "promag_mf7s",
            card_uid: uid.toString(16).toUpperCase().padStart(8, '0'),
            card_uid_dec: uid,
            last_read_timestamp: timestamp,
            total_reads: total_reads,
            valid: (status & 0x01) !== 0
        };
    }
}
```

</p>
</details>

---

### Typické případy použití {#typical-use-cases}

#### Řízení přístupu / docházkový systém (okamžité odeslání) {#access-control--attendance-system-immediate-send}

```
app config device-0 promag_mf7s
app config mode lte
app config interval-report 0
app config save
```

Každá karta je odeslána **okamžitě** po přiložení.

#### Sběr dat s periodickým odesíláním (úspora baterie) {#data-collection-with-periodic-upload-battery-saving}

```
app config device-0 promag_mf7s
app config mode lte
app config interval-report 900
app config save
```

Karty se hromadí v bufferu (max. 32) a odesílají se **každých 15 minut**.

#### Režim LoRaWAN {#lorawan-mode}

```
app config device-0 promag_mf7s
app config mode lrw
app config save
```

Každá karta je odeslána **okamžitě** jako binární zpráva (22 bajtů). Vždy se odesílá **poslední přiložená karta** plus celkový počet načtení.
