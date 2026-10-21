---
title: Diagnostics
---
import Image from '@theme/IdealImage';

# Diagnostics (`ats`)

The `ats` command suite groups read-only diagnostics, hardware verification tools, and bench-test helpers accessible over the developer console (see [**Firmware Setup**](firmware-setup.md)). Unlike `config` subcommands, diagnostic commands inspect and test device subsystems without overwriting stored configuration parameters.

:::info Firmware v2.0.0
Key changes in **STICKER firmware v2.0.0**:
- **Radio diagnostics for both radios:** `ats lrw` is now `ats radio` and works for LoRaWAN and P2P.
- **Claim window and new injectors:** `ats claim active|done|status`, and `ats cmd vnd|plain|history` next to `ats cmd lrw|nfc`.
- **Richer device info:** `ats device info` adds the radio link details, the last CPU fault, the device status flags and the NFC mailbox state.
- **Info uplink:** sent after boot and join on both radios and re-sent every `interval-announce` hours, followed by the key settings. It gained the last CPU fault and the 1-Wire slot state; the radio link details moved to the `get_radio_state` command.
:::

---

## Device & Provisioning Info

| Command | Description |
|---|---|
| `ats device info` | Print the firmware version, build type (release or debug), serial number, uptime, radio state, last downlink RSSI/SNR, spreading factor / data rate and TX power, radio link and traffic counters, battery voltage, reset cause, last CPU fault (after a fault reboot), device status flags, NFC mailbox availability, wall-clock time, DevEUI, the secret key (masked) and the claim token. |
| `ats device reboot` | Issue a cold system reboot. |

### Info and Settings Announce
STICKER sends an **Info uplink** on fPort 85 after every boot and join (on LoRaWAN and P2P), as the answer to a `clock_sync` command, and again every `interval-announce` hours (default 24 h). After boot, join and the periodic announce, the Info is followed by a **settings-info** uplink with the key settings: the intervals, `history-enable`, every capability flag and the detected 1-Wire sensor types. The Info includes:
- Serial number, firmware version and build type
- Uptime and wall-clock time
- Reset cause, and the last CPU fault (reason, PC, LR) after a fault reboot
- Battery voltage
- Device status flags (active alarm kinds, radio off, link down, NFC problems, clock not synced, claim window active) and the active alarms
- State of each 1-Wire slot (`ok`, `absent`, `replaced` or `mismatch`)

Read over NFC, the Info also carries the DevEUI and the claim token. The radio link details (link state, SF/DR, TX power, RSSI/SNR of both directions, duty-cycle use, counters) are not part of the Info; the host reads them with the `get_radio_state` command.

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

## Radio Diagnostics

`ats radio` works with the radio selected by `radio-mode`. Some subcommands exist only for one radio stack.

| Command | Description |
|---|---|
| `ats radio status` | Print the radio status (LoRaWAN or P2P). |
| `ats radio compose [budget]` | Assemble a telemetry frame without transmitting it and print it as hex. `budget` applies to LoRaWAN only. |
| `ats radio tx_mute on\|off` | Debug: telemetry fails before it reaches the air, to test link-loss handling. |
| `ats radio check` | LoRaWAN: transmit an uplink with an embedded `LinkCheckReq` MAC command. |
| `ats radio lc ok\|fail` | LoRaWAN, debug: inject a link-check result. |
| `ats radio reset` | LoRaWAN: reset the frame counters and DevNonce (triggers an immediate reboot). |
| `ats radio listen on\|off` | P2P: continuous receive as a reference receiver for a two-STICKER bench rig. |
| `ats radio unjoin` | P2P: clear the pairing (reboots). |
| `ats radio ack_drop <count>` | P2P, debug: make the next `<count>` acknowledgements of confirmed uplinks appear dropped. |

The P2P subcommands are available only in builds that include both the P2P radio and the shell; the standard debug build leaves P2P out.

---

## Claim Window

| Command | Description |
|---|---|
| `ats claim status` | Show the claim window state (`active` or `done`) and whether a claim token is set. |
| `ats claim active` | Re-open the claim window. |
| `ats claim done` | Close the claim window. |

See [**NFC Mailbox and Claim Window**](configuration.md#nfc-mailbox-and-claim-window) for how the window works.

---

## Command Injection and Bench Tools (Debug Builds)

Debug builds expose raw protobuf command injectors. Responses are output directly to the console as hex strings. Deferred hardware actions (reboot, factory reset) are validated but suppressed during shell injection.

| Command | Description |
|---|---|
| `ats cmd lrw <hex>` | Feed a raw binary command frame into the LoRaWAN downlink command processor. |
| `ats cmd nfc <hex>` | Feed a raw binary command frame into the encrypted NFC command engine. |
| `ats cmd vnd <hex>` | Feed a raw command into the vendor NFC channel. |
| `ats cmd plain <hex>` | Feed a raw command into the plaintext channel, which answers only `get_basic_info` and `get_claim_info`. |
| `ats cmd history [<from> [<to>]]` | Run the paged NFC history read. |
| `ats buzzer off` | Stop the buzzer immediately. |
| `ats buzzer beep <ms>` | Pulse the buzzer for `1`-`5000` ms. |
| `ats buzzer play <info\|warning\|alarm> [repeat_s]` | Play a melody, optionally repeated every `repeat_s` seconds (`0`-`999`). |

The `ats buzzer` commands exist only in builds with buzzer support and need `cap-gpio-mode buzzer`.

The `nfc` command reaches the NFC chip directly: `nfc mb status|on|off|serve` shows and drives the mailbox, and `nfc clear` wipes the NFC memory, including NDEF records left over from firmware v1.4.x.