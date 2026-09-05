---
slug: promag-mf7s
title: Promag MF7S
---

import Image from '@theme/IdealImage';

# Promag MF7S RFID Reader

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/promag-rf7s.png')} width={376} height={376} alt="Black Promag MF7S RFID card reader with attached cable" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

### Description

The **Promag MF7S** is an RFID card reader that communicates via **RS-232** (19200 baud, 8N1). The reader automatically transmits the card UID when a card is presented. CHESTER runs a background listener thread that continuously receives cards and stores them in a buffer (max 32 samples).

**Protocol:** `STX(0x02) + 8 HEX characters (UID) + CR + LF + ETX` = 12 bytes per card.

---

### Hardware

- **Variant:** CHESTER Serial RS-232 (`hio-chester-serial-rs232`)
- **Module:** CHESTER-X12-A (RS-232)
- **Connection:** Promag MF7S → RS-232 → CHESTER-X12-A
- **Baud rate:** 19200 (fixed, set by driver)

---

### Configuration

#### Shell Commands

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

#### Parameter Reference

| Parameter | Value | Description |
|-----------|-------|-------------|
| `serial-mode` | `transparent` | Promag does not use Modbus |
| `serial-baudrate` | `19200` | Fixed for MF7S |
| `device-0` | `promag_mf7s` | Device type (no address, not Modbus) |
| `mode` | `lte` or `lrw` | Communication mode |
| `interval-report` | `0` | Event-driven = immediate send on card detection |

#### Event-Driven Mode (`interval-report = 0`)

When `interval-report` is set to **0**, CHESTER sends data **immediately** after a card is presented:

- **LTE mode:** Each card triggers `app_work_send()` → CBOR message with the card is sent immediately
- **LoRaWAN mode:** Each card is always sent immediately (independent of `interval-report`)

When `interval-report > 0`, cards accumulate in the buffer (max 32) and are sent periodically.

---

### Shell Commands – Driver

#### Read Reader Firmware Version

```
device promag_mf7s firmware
```

Output: `Firmware: MF7S-1.0`

#### Notifications (LED + Sound)

```
device promag_mf7s notify
```

Performs the sequence: green LED on/off → red LED on/off → triple beep (high, medium, low).

#### Sampling Mode (Interactive Detection)

```
device promag_mf7s sampling [timeout_s]
```

Enters interactive mode. Displays card UIDs in the shell. Data is **not stored** in the buffer. The timeout (default 10 s) resets on each card presentation.

Output:
```
Sampling mode active (idle timeout: 10s)
Present cards to the reader...
Card UID: 12345678 (dec: 305419896)
Card UID: AABBCCDD (dec: 2864434397)
Sampling finished (total reads: 2)
```

#### Other Commands

```
device sample 0        # Show device status at index 0
device list            # List configured devices
app send               # Force immediate data send
```

---

### Payload – LTE (CBOR)

LTE mode sends a CBOR message (max 8 KB) with all collected cards. The buffer is cleared after a successful send.

#### Example Decoded JSON Payload

<details>
<summary><b>Show Example Decoded JSON Payload</b></summary>
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

`card_uid` is a uint32 (decimal). Hex conversion: `305419896` = `0x12345678`, `2864434397` = `0xAABBCCDD`.

:::

---

### Payload – LoRaWAN (Binary)

LoRaWAN sends a compact binary message (max 51 bytes). Each message contains **one device**.

#### Payload Structure (22 bytes)

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

**Total size: 22 bytes**

#### Example Payload (hex)

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

#### Decoding in Node-RED / JavaScript

<details>
<summary><b>Show JavaScript Decoder</b></summary>
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

### Typical Use Cases

#### Access Control / Attendance System (Immediate Send)

```
app config device-0 promag_mf7s
app config mode lte
app config interval-report 0
app config save
```

Each card is sent **immediately** after being presented.

#### Data Collection with Periodic Upload (Battery Saving)

```
app config device-0 promag_mf7s
app config mode lte
app config interval-report 900
app config save
```

Cards accumulate in the buffer (max 32) and are sent **every 15 minutes**.

#### LoRaWAN Mode

```
app config device-0 promag_mf7s
app config mode lrw
app config save
```

Each card is sent **immediately** as a binary message (22 bytes). Always sends the **last presented card** plus a total read counter.
