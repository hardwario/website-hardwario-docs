---
title: Diagnostics
---
import Image from '@theme/IdealImage';

# Diagnostics (`ats`)

The `ats` command suite groups read-only diagnostics, hardware verification tools, and bench-test helpers accessible over the developer console (see [**Firmware Setup**](firmware-setup.md)). Unlike `config` subcommands, diagnostic commands inspect and test device subsystems without overwriting stored configuration parameters.

:::info Firmware v1.4.0
In **STICKER firmware v1.4.0**, the diagnostic shell command family was **renamed from `tester` to `ats`** (Automated Test System). Key updates in v1.4.0 include:
- **Device Info on Join:** Automatic info packet transmitted upon every network Join or clock sync.
- **Enhanced `ats` Tooling:** Added `ats lrw reset`, `ats lrw compose`, `ats lrw lc`, and raw command injection (`ats cmd lrw|nfc`).
- **Provisioning Verification:** `ats device info` displays serial number, device secret key, and write-once claim token.
:::

---

## Device & Provisioning Info

| Command | Description |
|---|---|
| `ats device info` | Print hardware serial number, firmware version, build profile, system uptime, wall-clock RTC status, AES secret key, and 128-bit claim token. |
| `ats device reboot` | Issue a cold system reboot. |

### Device Info on Join Telemetry
In firmware v1.4.0+, STICKER automatically generates and transmits an **Info Uplink Payload** whenever a LoRaWAN Join procedure completes or a network clock sync is performed. This uplink includes:
- Serial number and firmware release version
- Reset cause (power-on, watchdog, software reset, pin reset)
- 128-bit write-once Claim Token
- Active radio mode (`radio-mode` status)
- Battery voltage under load

---

## Sensor Subsystem Testing

| Command | Description |
|---|---|
| `ats sensors sample` | Read and display current measurements from all onboard and attached 1-Wire sensors immediately. |
| `ats sensors serial` | Print physical serial numbers (ROM codes) for all discovered 1-Wire sensors. |
| `ats sensors reset` | Reset all active pulse counters (Hall switches and external inputs A/B) to zero. |
| `ats sensors check <sensor> [timeout]` | Monitor a specific sensor channel and stream value updates to the console for live bench testing. |

---

## LED Signal Testing

The status LED operates a severity-ordered heartbeat (network join state, radio mode, alarm status) and one-shot interaction patterns (NFC access, input triggers). See [**Hardware Description**](hardware-description.md#led-indication) for pattern definitions.

Use `ats led` subcommands to test individual color channels during manufacturing or diagnostic inspection:

| Command | Description |
|---|---|
| `ats led cycle [count]` | Cycle through red, yellow, and green LED channels. `count` specifies repetition loops (`0` stops, default `1`). |
| `ats led switch <color> <state>` | Manually set an individual LED channel (`red`, `yellow`, or `green`) to `on` or `off`. |

---

## LoRaWAN Diagnostics & Command Injection

| Command | Description |
|---|---|
| `ats lrw status` | Output current LoRaWAN stack state, activation type (OTAA/ABP), session keys, and link check status. |
| `ats lrw check` | Queue and transmit an immediate uplink with an embedded `LinkCheckReq` MAC command. |
| `ats lrw compose [budget]` | Assemble a standard telemetry payload frame without transmitting, printing the raw fPort-2 hex payload to the console. |
| `ats lrw reset` | Reset LoRaWAN frame counters and DevNonce parameters (triggers an immediate reboot). |
| `ats lrw lc <result>` | Simulate a link-check response (`ok` or `fail`) for local session debugging. |

:::info Raw Command Frame Injection (Debug Builds)
Debug builds expose raw protobuf message injectors:
- `ats cmd lrw <hex>`: Feed a raw binary command frame into the LoRaWAN downlink command processor.
- `ats cmd nfc <hex>`: Feed a raw binary command frame into the encrypted NFC command engine.

Responses are output directly to the console as hex strings. Deferred hardware actions (reboot, factory reset) are validated but suppressed during shell injection.
:::