---
slug: configuration
title: Configuration
title_meta: "Configuration (STICKER)"
---
import Image from '@theme/IdealImage';




# Configuration (`config`)

Device settings are read and written with the `config` command over the developer shell. See [**Firmware Setup**](firmware-setup.md) for setting up the firmware and opening the console.

:::info Firmware v2.0.0
The `config` command and the parameters on this page apply to STICKER firmware v2.0.0. Key changes since v1.4.x:
- **P2P radio:** `radio-mode p2p` talks directly to a HARDWARIO FIBER modem and a ProXimos Hub over the HARDWARIO TOWER radio protocol, with no LoRaWAN network (see [**P2P**](#p2p)).
- **Shared radio parameters:** `lrw-deveui` / `lrw-appkey` are now `radio-deveui` / `radio-appkey`, and the link checks are `radio-link-check-interval` / `radio-link-check-fail-rejoin`. They apply to both LoRaWAN and P2P.
- **GP pins:** `cap-gpio-mode` and `cap-gpio-input-a` / `cap-gpio-input-b` replace `cap-input-a/-b` and `cap-pir-detector`. An external input can be digital, analog (0–24 V) or a pulse counter.
- **New parameters:** `cap-sht`, `sensor1-type`…`sensor4-type`, `lrw-datarate`, `lrw-region as923`, `alarm-buzzer-mode`, `radio-alarm-ack` and `interval-announce`.
- **NFC mailbox:** the phone talks to STICKER through the mailbox of the NFC chip (one tap, on Android and iOS) instead of the `hio.stck:cmd` / `hio.stck:rsp` NDEF records.
:::

:::caution Upgrading from v1.4.x
The renamed parameters have no aliases, so update your provisioning and bench scripts. After the upgrade:
- `radio-deveui` and `radio-appkey` **keep** the values stored as `lrw-deveui` / `lrw-appkey`.
- `radio-link-check-interval` and `radio-link-check-fail-rejoin` are **not migrated**: they go back to their defaults (`5` / `5`). Set them again if you changed them.
- The GP pin capabilities are **not migrated**: `cap-gpio-mode`, `cap-gpio-input-a` and `cap-gpio-input-b` start at `none`. Set them again.
- Alarm rules and the history channel selection are not migrated either, see [**Alarm Rules**](alarm-rules.md) and [**Sensor History**](sensor-history.md).
:::

:::tip Field vs. Developer Configuration
While this page documents interactive shell commands (`config`) accessed via an RTT debug connection, standard field configuration and commissioning are performed wirelessly over NFC using [**HARDWARIO Manager**](/sticker/hardwario-manager/).
:::

---

## Command Syntax

```text
config <subcommand> [value]
```

- Called **without a value**, the subcommand **reads** and prints the current setting.
- Called **with a value**, it **writes** the new setting.

Print every current value at once:

```text
config show
```

:::caution Saving changes
A `config` write updates the setting in RAM and takes effect immediately, but it is **not persisted** until you run `settings save`, which writes the configuration to flash and **reboots** the device (see [**Maintenance**](maintenance.md)). A change that is not saved is lost on the next power cycle. Alarm rules set with the `alarm` command (see [**Alarm Rules**](alarm-rules.md)) persist immediately and do not reboot.
:::

---

## Sampling and Reporting Intervals

| Command | Argument | Description |
|---|---|---|
| `config interval-sample` | `0`, or `5`-`3600` (seconds) | How often sensors are sampled. `0` means sample once, immediately before each report. |
| `config interval-report` | `60`-`86400` (seconds) | How often an uplink report is sent. Default `900` (15 minutes). |
| `config interval-announce` | `0`, or `1`-`168` (hours) | How often STICKER re-sends its Info uplink and its key settings (intervals, capabilities, detected 1-Wire sensors). Both are always sent after boot and after a join. `0` = no periodic re-send. Default `24`. |

**Example**: report every 10 minutes:

```bash
config interval-report 600
settings save
```

---

## Radio Settings

| Command | Argument | Description |
|---|---|---|
| `config radio-mode` | `off` / `lorawan` / `p2p` | Radio for all uplinks and downlinks. `off` = radio-silent: sensors, alarms and history keep running, nothing is transmitted. Default `off`. Writable over the shell or NFC only, never over a radio downlink. The radio is chosen at boot, so the change applies after `settings save`. |
| `config radio-deveui` | 16 hex digits | DevEUI, the node identity on LoRaWAN and P2P. |
| `config radio-appkey` | 32 hex digits | AppKey: the LoRaWAN OTAA root key; on P2P the root of the join and session keys. |

### LoRaWAN

| Command | Argument | Description |
|---|---|---|
| `config lrw-region` | `eu868` / `us915` / `au915` / `as923` | Frequency region (`as923` = AS923-1). A region that is not built into the firmware image keeps the radio silent (the device reports `lrw-disabled`); it never falls back to another band. Release images contain all four regions, debug images EU868 only. |
| `config lrw-sub-band` | `0`-`8` | US915/AU915 sub-band. `0` = all channels. Default `2`. |
| `config lrw-network` | `public` / `private` | Network type. |
| `config lrw-activation` | `otaa` / `abp` | Activation method. |
| `config lrw-adr` | `true` / `false` | Adaptive Data Rate (ADR). Default `true`. |
| `config lrw-datarate` | `auto`, `dr0`-`dr7` | Fixed uplink data rate, used only with `lrw-adr false` and applied after the join. `auto` leaves the data rate to the stack. Default `auto`. |
| `config lrw-joineui` | 16 hex digits | Join EUI (AppEUI). |
| `config lrw-nwkkey` | 32 hex digits | Network Key (OTAA). |
| `config lrw-devaddr` | 8 hex digits | Device Address (ABP). |
| `config lrw-nwkskey` | 32 hex digits | Network Session Key (ABP). |
| `config lrw-appskey` | 32 hex digits | Application Session Key (ABP). |

**Example**: EU868 with OTAA and enabling radio transmission:

```bash
config lrw-region eu868
config lrw-activation otaa
config radio-deveui 0102030405060708
config lrw-joineui 0807060504030201
config radio-appkey 0102030405060708090A0B0C0D0E0F10
config radio-mode lorawan
settings save
```

### P2P

With `radio-mode p2p`, STICKER talks directly to a HARDWARIO FIBER modem and a ProXimos Hub over the HARDWARIO TOWER radio protocol, with no LoRaWAN network. Telemetry, alarms, commands, history replay, network time and link supervision work as over LoRaWAN. The P2P parameters are writable over the shell only and must match the Hub. P2P is part of the release image; the debug image leaves it out. For the setup on the network side, see [**LoRa P2P Mode**](../connectivity/lora-p2p.md).

| Command | Argument | Description |
|---|---|---|
| `config p2p-frequency` | `863000000`-`870000000` (Hz) | Carrier frequency in the EU868 band. Default `869525000`. |
| `config p2p-spreading-factor` | `6`-`12` | LoRa spreading factor; higher means longer range and a lower data rate. A fixed network constant (no ADR). Default `7`. |
| `config p2p-tx-power` | `2`-`14` (dBm) | TX power. Default `14`. |
| `config p2p-modulation` | `lora` / `fsk` | Modulation. `fsk` works toward a stock TOWER gateway. Switching between `lora` and `fsk` pairs the node afresh. Default `lora`. |

### Link Supervision

These parameters apply to both radios.

| Command | Argument | Description |
|---|---|---|
| `config radio-link-check-interval` | `0`-`255` | Every Nth report is a link check: a LoRaWAN `LinkCheckReq`; on P2P (where every report is confirmed) the Nth report counts as the check. `0` = disabled. Default `5`. |
| `config radio-link-check-fail-rejoin` | `1`-`255` | Link-check failures before the link is re-established (a LoRaWAN OTAA rejoin, a P2P re-join). Default `5`. |

---

## Sensors and Capabilities

**Capability flags** tell the firmware which hardware is present on a given variant. They are normally set during factory provisioning and should not be changed in the field.

| Command | Argument | Description |
|---|---|---|
| `config cap-sht` | `true` / `false` | Onboard temperature and humidity sensor (SHT4x) present. Default `true`. |
| `config cap-barometer` | `true` / `false` | Barometric pressure sensor present. |
| `config cap-light-sensor` | `true` / `false` | Ambient light sensor present. |
| `config cap-accelerometer` | `true` / `false` | Accelerometer present (orientation, motion, free-fall). |
| `config cap-w1-sensors` | `true` / `false` | 1-Wire bus enabled; attached sensors are auto-detected on scan. |
| `config cap-hall-left` | `true` / `false` | Hall left sensor present. |
| `config cap-hall-right` | `true` / `false` | Hall right sensor present. |

### GP Pins (Inputs, PIR, Buzzer)

The GP_A and GP_B pins serve the external inputs A and B, the PIR motion detector or the buzzer variant. One parameter picks the owner, so a pin conflict cannot be stored.

| Command | Argument | Description |
|---|---|---|
| `config cap-gpio-mode` | `none` / `inputs` / `pir` / `buzzer` | Owner of GP_A and GP_B. `inputs` hands each pin to its input mode below; `pir` and `buzzer` take both pins. Default `none`. |
| `config cap-gpio-input-a` | `none` / `digital` / `analog` / `pulse` | Mode of input A, used only with `cap-gpio-mode inputs`. `digital` = state and pulse count, `analog` = voltage 0–24 V, `pulse` = pulse counter (for example an S0 meter output, either polarity). Default `none`. |
| `config cap-gpio-input-b` | `none` / `digital` / `analog` / `pulse` | Mode of input B, same values as input A. Default `none`. |

:::caution DIP switch on STICKER Input
On STICKER Input, the DIP switch S1 connects the external terminals to the inputs or to the 1-Wire bus. The firmware cannot read the switch, so the input mode and the switch position must match. An `analog` input with the switch in the 1-Wire position reads a floating pin. See [**STICKER Input Wiring**](../sticker-input-wiring/index.md).
:::

### 1-Wire Slots

| Command | Argument | Description |
|---|---|---|
| `config sensor1-rom` ... `config sensor4-rom` | 16 hex digits | ROM serial of the 1-Wire sensor bound to slot 1-4. All-zero = empty slot. Normally set by `w1 enroll` or by auto-enroll. |
| `config sensor1-type` ... `config sensor4-type` | `0` / `2` / `3` | Sensor type the slot expects: `0` none, `2` dallas (DS18B20), `3` machine probe. Set when a sensor is enrolled, or in advance during provisioning. If a sensor of another type shows up in the slot, STICKER raises a `sensor_mismatch` alarm and the slot's alarm rules stop. |

### Sensor Settings

| Command | Argument | Description |
|---|---|---|
| `config accel-motion-sensitivity` | `off` / `low` / `medium` / `high` | Accelerometer motion-detection sensitivity. Default `off`: motion detection is off (no `accel-motion` / `accel-count` events), and the accelerometer stays powered down between its periodic orientation readings. |

---

## Pulse Counters

| Command | Argument | Description |
|---|---|---|
| `config hall-left-counter` | `true` / `false` | Count pulses on the left Hall switch. |
| `config hall-right-counter` | `true` / `false` | Count pulses on the right Hall switch. |
| `config input-a-counter` | `true` / `false` | Count pulses on external input A in `digital` mode. An input in `pulse` mode always counts. |
| `config input-b-counter` | `true` / `false` | Count pulses on external input B in `digital` mode. An input in `pulse` mode always counts. |

For wiring details (DIP switches, 1-Wire, dry contact, analog), see [**STICKER Input Wiring**](../sticker-input-wiring/index.md).

---

## Alarms, Buzzer and Battery

| Command | Argument | Description |
|---|---|---|
| `config alarm-limit` | `0`-`3600` (seconds) | Alarm collection window. Default `10`. See [**Alarm Rules**](alarm-rules.md#alarm-uplinks-and-rate-limiting). |
| `config alarm-buzzer-mode` | `off` / `once` / `slow` / `normal` / `fast` / `continuous` | Buzzer melody while an alarm is active. Every mode except `off` plays the melody when a new alarm activates; `once` does not repeat it, `slow` / `normal` / `fast` repeat it every 120 / 30 / 10 s while an alarm stays active, `continuous` plays it back to back. Needs the buzzer variant and `cap-gpio-mode buzzer`. Default `off`. |
| `config radio-alarm-ack` | `true` / `false` | Send alarms as confirmed uplinks on both radios: each alarm waits for the network's acknowledgement and is sent again up to 3 times. Default `false`. |
| `config battery-level` | `1000`-`3600` (mV) | Low-battery alarm threshold. Default `2400`. |

---

## Device Identity & NFC Security Architecture

These parameters manage device identity, NFC access control, and claim provisioning. They are set during factory provisioning and should not be altered in standard operation.

| Command | Argument | Description |
|---|---|---|
| `config serial-number` | 10 decimal digits | Device serial number. |
| `config secret-key` | 32 hex digits | Device secret key used to secure the local NFC channel via AES-CCM. Readable/writable over shell only. |
| `config nonce-counter` | Integer | Anti-replay nonce counter enforced on the encrypted NFC channel. |
| `config claim-token` | 32 hex digits | 128-bit write-once device claim token. Once set during commissioning, it becomes immutable to lock unit ownership to a backend. |
| `config vendor-token` | 32 hex digits | Write-once vendor token, set at commissioning. |
| `config vendor-reset-allow` | `true` / `false` | Whether the device accepts a vendor reset. Over the air it can be changed only over the vendor NFC channel. Default `true`. |
| `config calibration` | `true` / `false` | Enable calibration mode (factory use). |

### NFC Mailbox and Claim Window

From firmware v2.0.0, the phone talks to STICKER through the **Fast Transfer Mode mailbox** of the ST25DV NFC chip:

- **One tap:** with the phone held still, a whole exchange (for example reading the full configuration, or writing and saving it) completes in one tap, on Android and iOS alike.
- **Powered device only:** the mailbox needs a running device. The tag holds no NDEF records, so a generic NFC reader, or a unit with a dead battery, shows a blank tag. Configuring a switched-off unit is no longer possible.
- **AES-CCM Security:** commands from [**HARDWARIO Manager**](/sticker/hardwario-manager/) are encrypted with the `secret-key`, and each transaction checks and increments the `nonce-counter` to prevent replay attacks.
- **Plaintext channel:** only two read-only commands answer without encryption: `get_basic_info` (serial number, nonce and versions, which the phone needs before it can encrypt) and `get_claim_info`. The plaintext channel is never reachable over a radio.
- **Claim window:** the window is either `active` (factory default) or `done`. While it is `active`, `get_claim_info` returns the serial number and the claim token. The app closes the window with `claim_done` after claiming. `claim_active` re-opens it, generates a new claim token if none is set, and returns the token over the encrypted channel. A vendor reset wipes the claim token and closes the window. On the shell, `ats claim active|done|status` drives the window (see [**Diagnostics**](diagnostics.md)).

:::caution Upgrade from v1.4.x: wipe the old NDEF records
Firmware v2.0.0 never writes the NFC memory, so a unit upgraded from v1.4.x keeps its old NDEF records, including the plaintext `hio.stck:clm` claim record. Wipe them once: run `nfc clear` on a debug build, or write an empty NDEF message from the phone.
:::