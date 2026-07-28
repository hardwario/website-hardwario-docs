---
title: Sensor History
---

:::info Firmware v1.4.0
The functionality described on this page is part of the upcoming **STICKER firmware v1.4.0** and is not available in v1.3.x.
:::

# Sensor History (`history`)

Store-and-forward buffering records sensor readings to flash while the device is offline and replays them on request. Records survive power loss. Recording is enabled with two `config` parameters, and the buffer is inspected and managed with the `history` command over the developer shell (see [**Firmware Setup**](firmware-setup.md) for opening the console).

## Configuration

| Command | Argument | Description |
|---|---|---|
| `config history-enable` | `true` / `false` | Master switch for history recording. Default `false`. |
| `config history-sensors` | bitmask (uint32) | Which channels to record, one bit each. Default `0x0003` = **temperature + humidity**. `0` records no channels. |

Readings are captured on the `interval-sample` cadence (or once per report when `interval-sample` is `0`) — see [**Configuration**](configuration.md).

### Recordable channels

The `history-sensors` bitmask selects from these channels (bit *i* = channel *i*, 19 channels defined in a 32-bit mask):

- **`temperature`**, **`humidity`** — onboard sensor
- **`s1-temp`/`s1-hum` … `s4-temp`/`s4-hum`** — the four ROM-bound 1-Wire slots (a Dallas temperature slot has no humidity)
- **`hall-left`**, **`hall-right`**, **`input-a`**, **`input-b`** — pulse counters
- **`motion`** — PIR person-detection counter
- **`pressure`**, **`illuminance`**, **`orientation`**, **`accel-motion`** — barometer, light sensor, and accelerometer (`accel-motion` is the any-motion event counter; added in v1.4.0)

A channel whose capability is off — or a Dallas slot's humidity — is simply not recorded.

## `history` command

| Command | Description |
|---|---|
| `history info` | Buffer summary, including the live capacity for the selected channels. |
| `history count` | Number of stored records. |
| `history read [N]` | List records, optionally only the last `N`. |
| `history stats` | Per-sensor minimum, maximum and average. |
| `history sensors [<name> on/off]` | List the recorded channels, or toggle one. |
| `history enable <on/off>` | Enable or disable recording. |
| `history capture` | Sample now and store one record (bench test). |
| `history clear` | Erase the buffer. |

## Reading the buffer back

- **Over LoRaWAN** — the `req_history` downlink streams the matching records back as `history_frame` messages on fPort 85 (see [**Downlink Commands**](../lorawan-network-server/downlink-commands.md)).
- **Over NFC** — HARDWARIO Manager reads the buffer a page per tap (`req_history_page`); see the [**Sensor history guide**](../nfc-configurator-app/guides/sensor-history.md).

## Storage & capacity

History lives in a dedicated **32 KB flash ring**, separate from settings and LoRaWAN NVM. Record size is the sum of the selected channel widths (temperature / pressure / illuminance 2 B, humidity / orientation 1 B, counters 4 B), so capacity scales with how many channels you record — roughly **9,400 records (~98 days at a 15-minute interval)** for the temperature + humidity default, more for a single channel, down to a few hundred records when every channel is enabled.

:::caution A firmware update clears history
Upgrading or downgrading firmware **discards the stored history** (the on-flash format changed) — the buffer is erased once and recording restarts clean. Your settings and LoRaWAN keys are not affected.
:::
