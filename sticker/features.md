---
slug: features
title: Features
description: "This page describes notable behaviors of the STICKER firmware: how the device manages power, keeps its LoRaWAN connection healthy, and protects stored data."
---
import Image from '@theme/IdealImage';


:::info Firmware v1.4.0
The features on this page will be added in the upcoming **STICKER firmware v1.4.0**.
:::

# Firmware Features

This page describes notable behaviors of the STICKER firmware: how the device manages power, keeps its LoRaWAN connection healthy, and protects stored data. For the shell commands and configuration parameters that control these behaviors, see [**Developer Access**](developer-mode.md).

---

## Data retention

### The reset ladder – identity preserved by tier

A reset or firmware update must never un-provision a field device beyond the tier you explicitly ask for. STICKER's resets form a **severity ladder**; each tier keeps a strict subset of the one above it:

| Reset | What it keeps |
|---|---|
| **Reboot** | Everything. A plain restart. |
| **Device reset** | Device identity **and the full LoRaWAN provisioning** (keys and session): the device stays provisioned and connected, only the configuration returns to defaults. Reachable over shell, NFC, or a LoRaWAN downlink. |
| **Factory reset** | Device identity only. Serial number, vendor token, secret key, nonce, claim token, DevEUI and JoinEUI. It **drops the LoRaWAN session and keys**, so the device re-joins the network. **NFC/shell only**. Rejected over a LoRaWAN downlink, which would destroy the very session needed to confirm it. |
| **Vendor reset** | Serial number and vendor token only. The configuration, LoRaWAN keys and secret key are all erased, and a **new secret key must be supplied** as part of the reset. Authorised by the vendor token, over the shell or the dedicated NFC vendor channel only. |
| **`settings erase`** | Nothing. A full wipe back to a blank device, including the serial number. A shell-only "return to blank" escape hatch. |

The identity set (serial number, secret key, nonce counter, vendor token) and the LoRaWAN provisioning each record which tiers preserve them, so a config-schema migration on a firmware update restores the protected set after applying new defaults.

### The vendor token

Alongside the secret key, each device holds a **vendor token**, a privileged, per-device credential kept by the device owner. The two credentials do different jobs:

- The **secret key** secures the everyday encrypted NFC channel used to read and write configuration.
- The **vendor token** authorizes the privileged operations the secret key cannot: **changing the secret key** (re-keying the device) and the **vendor reset** tier above, which wipes the device back to its serial number and vendor token, setting a new secret key in the process.

Because it unlocks re-keying and the deepest reset, the vendor token is never needed for routine configuration and is held only by the device owner. In [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/saved-stickers) it is stored per device under **Saved STICKERs** and used under **Tools → Vendor changes**; see the [**Reset guide**](/apps/hardwario-manager/sticker/reset).

### Pulse counters persist across power loss

The hall and input pulse totalizers are saved to flash and restored on boot, so a battery swap, brownout, or reset no longer resets a metering total to zero.

### Sensor history (store-and-forward)

When enabled, the device records sensor readings to flash and can replay a requested time window over LoRaWAN. Stored records survive power loss. See [**Sensor History**](developer-access/sensor-history.md) for the configuration and commands.

---

## Operating and power modes

STICKER runs for 2+ years on two AA cells. On a provisioned device the firmware samples the sensors and sends LoRaWAN uplinks on the configured intervals, sleeping between them. In addition, two special states further reduce power draw.

### Radio-silent mode (unprovisioned device)

If the configured **DevEUI is all-zero** (a device that has never been provisioned), the firmware does not try to join a network. It enters a **`DISABLED`** state and skips the entire LoRaWAN bring-up: the radio stack is never started and the sub-GHz radio is never powered, so there is no join traffic and no radio burst at boot. This prevents a blank device from draining its battery on join attempts that cannot succeed.

The device stays radio-silent until it is given a real DevEUI (and the rest of the LoRaWAN keys) and **rebooted**. On a developer console, `ats lrw status` reports `DISABLED`.

:::tip
A device can be provisioned over NFC while powered off. See [**Configure a powered-off device**](/apps/hardwario-manager/sticker/offline-configuration). After writing the keys, the device leaves radio-silent mode on its next boot.
:::

### Debug deep-sleep (auto-suspend)

A **debug** build keeps the CPU awake so the RTT console stays reachable, which steadily drains the battery. To protect a forgotten bench unit, the debug firmware enters **deep sleep** (STM32 Shutdown) after a configurable idle period with no shell activity (`CONFIG_APP_DEBUG_AUTOSUSPEND_S`, default `7200` seconds, 2 hours; `0` disables it).

- Any shell input resets the idle timer; the `power suspend` command enters deep sleep on demand.
- Wake is by **NRST or a power cycle**, which is a clean boot. The stored identity and LoRaWAN keys survive; RAM state and the wall clock are re-established (time re-syncs from the network).
- The **release** build is unaffected; it already sleeps between activity through normal power management.

---

## LoRaWAN connection management

The firmware supervises the LoRaWAN link and recovers from outages on its own:

- It requests a link check periodically (every Nth uplink, set by `config lrw-link-check-interval`).
- A single missed answer is tolerated; only repeated failures while the link is degraded escalate to an OTAA **rejoin**, after `config lrw-link-check-fail-rejoin` further failures. Rejoin attempts back off between tries.
- **ABP** devices cannot rejoin (they never join), so they stay in a degraded state instead.

This replaces an earlier failure mode where the device could stop transmitting after a few messages.

---

## Sensor reliability

Sensor readings are range-checked before they reach telemetry, history, or alarms, so a glitchy sample does not raise a false alarm or skew stored data. A configured sensor that stops producing valid readings raises an alarm, so a silently failed sensor is surfaced instead of being reported as missing data indefinitely.

---

## Real-time clock

The device keeps wall-clock time, synchronized from the network on join (LoRaWAN `DeviceTimeReq`) and optionally set from a phone over NFC. It is used to timestamp sensor-history records and alarm events.
