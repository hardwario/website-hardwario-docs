---
slug: features
title: Features
description: "This page describes notable behaviors of the STICKER firmware: how the device manages power, keeps its radio connection (LoRaWAN or P2P) healthy, and protects stored data."
title_meta: "Features (STICKER)"
---
import Image from '@theme/IdealImage';


:::info Firmware v2.0.0
This page describes **STICKER firmware v2.0.0**. Most of these features were introduced in v1.4.0 and extended in v2.0.0.
:::

# Firmware Features

This page describes notable behaviors of the STICKER firmware: how the device manages power, keeps its radio connection (LoRaWAN or P2P) healthy, and protects stored data. For the shell commands and configuration parameters that control these behaviors, see [**Developer Access**](developer-mode.md).

---

## Data retention

### The reset ladder – identity preserved by tier

A reset or firmware update must never un-provision a field device beyond the tier you explicitly ask for. STICKER's resets form a **severity ladder**; each tier keeps a strict subset of the one above it:

| Reset | What it keeps |
|---|---|
| **Reboot** | Everything. A plain restart. |
| **Device reset** | Device identity, **the full LoRaWAN provisioning** (keys and session), `radio-mode` with the P2P settings and pairing, the pulse counters and the sensor history: the device stays provisioned and connected; the rest of the configuration and the alarm rules return to defaults. **NFC/shell only**. |
| **Factory reset** | Device identity only: serial number, vendor token, secret key, nonce, claim token, DevEUI and JoinEUI. It **drops the LoRaWAN session and keys** and the P2P pairing, returns `radio-mode` to `off`, and **clears the pulse counters and the sensor history**. The device stays radio-silent until the radio is configured again. **NFC/shell only**. Rejected over a radio downlink, which would destroy the very session needed to confirm it. |
| **Vendor reset** | Serial number and vendor token only (plus the internal NFC nonce counter). The configuration, LoRaWAN keys, DevEUI, JoinEUI, claim token, secret key, pulse counters and history are all erased, and a **new secret key must be supplied** as part of the reset. The claim window closes; the owner re-opens it with `claim_active`, which also creates a new claim token. Over NFC it is authorised by the vendor token on the dedicated vendor channel; on a debug build the shell offers it too (`settings vendor-reset`). Refused when the device's `vendor-reset-allow` policy is off. |
| **`settings erase`** | Nothing. A full wipe back to a blank device, including the serial number. A shell-only "return to blank" escape hatch. |

The identity set (serial number, secret key, nonce counter, vendor token) and the LoRaWAN provisioning each record which tiers preserve them, so a config-schema migration on a firmware update restores the protected set after applying new defaults.

### The vendor token

Alongside the secret key, each device holds a **vendor token**, a privileged, per-device credential kept by the device owner. The two credentials do different jobs:

- The **secret key** secures the everyday encrypted NFC channel used to read and write configuration.
- The **vendor token** authorizes the privileged operations the secret key cannot: **setting a new secret key without knowing the current one** (for example when the key is lost; with the current key, the key can also be changed over the normal channel) and the **vendor reset** tier above, which wipes the device back to its serial number and vendor token, setting a new secret key in the process.

Because it unlocks re-keying and the deepest reset, the vendor token is never needed for routine configuration and is held only by the device owner. In [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/saved-stickers) it is stored per device under **Saved STICKERs** and used under **Tools → Vendor changes**; see the [**Reset guide**](/apps/hardwario-manager/sticker/reset).

### Pulse counters persist across power loss

The Hall and input pulse totalizers are saved to flash and restored on boot, so a battery swap, brownout, reboot or device reset no longer resets a metering total to zero. A factory or vendor reset clears them.

### Sensor history (store-and-forward)

When enabled, the device records sensor readings to flash and can replay a requested time window over the radio (LoRaWAN or P2P). Stored records survive power loss; a factory or vendor reset clears them. See [**Sensor History**](developer-access/sensor-history.md) for the configuration and commands.

---

## Operating and power modes

STICKER runs for 2+ years on two AA cells. On a provisioned device the firmware samples the sensors and sends radio uplinks (LoRaWAN or P2P) on the configured intervals, sleeping between them. In addition, a few special states protect the battery.

### Radio-silent mode

With **`radio-mode off`**, the factory default, the firmware does not try to join a network. The radio enters a **`DISABLED`** state and the radio stack is never brought up: the sub-GHz radio is never powered, so there is no join traffic and no radio burst at boot. Sensor sampling and history still run. This prevents a new device from draining its battery on join attempts during shipping and storage.

The radio is also `DISABLED` when:

- `radio-mode` is `p2p` but the device has no P2P keys: an all-zero AppKey, or a DevEUI that gives no valid P2P address (for example an all-zero one).
- The stored LoRaWAN region is not supported by the firmware image. The radio never falls back to another band.

The device stays radio-silent until `radio-mode` is set to `lorawan` or `p2p` (with the matching keys) and the device is **rebooted**. On a developer console, `ats radio status` reports `DISABLED`, and the status LED shows one yellow flash every 3 seconds.

### Low-battery shutdown at power-up

At every power-up the firmware measures the battery before it starts anything else. Below **1.8 V** the device does not start: after the boot carousel it blinks red, then switches itself off and stays off until the batteries are replaced or it is reset with NRST. A depleted cell therefore no longer boot-loops on brownout. If the battery monitor itself fails, the device boots normally.

### Debug deep-sleep (auto-suspend)

A **debug** build keeps the CPU awake so the RTT console stays reachable, which steadily drains the battery. To protect a forgotten bench unit, the debug firmware enters **deep sleep** (STM32 Shutdown) after a configurable idle period with no shell activity (`CONFIG_APP_DEBUG_AUTOSUSPEND_S`, default `7200` seconds, 2 hours; `0` disables it).

- Any shell input resets the idle timer; the `power suspend` command enters deep sleep on demand.
- Wake is by **NRST or a power cycle**, which is a clean boot. The stored identity and LoRaWAN keys survive; RAM state and the wall clock are re-established (time re-syncs from the network).
- The **release** build is unaffected; it already sleeps between activity through normal power management.

---

## Radio connection management

The firmware supervises the radio link, LoRaWAN or P2P, and recovers from outages on its own:

- It checks the link periodically: every Nth report, set by `config radio-link-check-interval` (default 5; `0` disables link checks). On LoRaWAN this is a `LinkCheckReq`. On P2P every report is sent confirmed anyway; the Nth one counts as the link check (an unacknowledged one is a failed check) and also asks the Hub for link figures. Any authenticated downlink also counts as a successful check.
- One or two missed answers are tolerated. Three failed checks in a row put the link into a degraded state, in which every report carries a link check.
- **LoRaWAN recovery ladder:** entering the degraded state, and each failed check in it, restores the default (maximum) TX power and lowers the data rate by one step. A check that succeeds on the lower data rate returns the device to normal operation with the same session. With ADR on, the network raises the data rate again later.
- The device re-establishes the link only when `config radio-link-check-fail-rejoin` checks (default 5) have failed in the degraded state and, on LoRaWAN, the ladder has reached its floor (the region's lowest data rate at the default TX power): an OTAA **rejoin** on LoRaWAN, a re-join on P2P (P2P has no ladder). Rejoin attempts back off between tries. With the default settings (EU868, starting at DR5, 900 s report interval), link loss to rejoin takes about 4–5 hours.
- **ABP** devices cannot rejoin (they never join), so they stay in a degraded state and keep checking the link.

This replaces an earlier failure mode where the device could stop transmitting after a few messages.

### Periodic announce

After every boot or join the device sends its **Info** and a **settings-info** uplink (intervals, every sensor capability flag, detected 1-Wire sensors). It re-sends the same pair every `interval-announce` hours (default 24, range 1–168, `0` = off), so the network keeps an up-to-date copy of the device's configuration even if the device never reboots.

### Self-recovery from a crash

A CPU fault reboots the device at once instead of leaving it hung until the watchdog. The next Info reports the fault reason and the PC and LR registers, so the fault is visible from the network.

---

## Sensor reliability

Sensor readings are range-checked before they reach telemetry, history, or alarms, so a glitchy sample does not raise a false alarm or skew stored data. A configured sensor that stops producing valid readings raises an alarm, so a silently failed sensor is surfaced instead of being reported as missing data indefinitely.

---

## Real-time clock

The device keeps wall-clock time, synchronized from the network on join (LoRaWAN `DeviceTimeReq`, or the network time of the P2P Hub) and re-synchronized about once a week, whichever radio is in use. It can also be set from a phone over NFC. Only times from 2024-01-01 to the end of 2098 are accepted. The clock is used to timestamp sensor-history records and alarm events; history records keep their real time across reboots and power loss.
