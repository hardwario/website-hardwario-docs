---
slug: troubleshooting
title: Troubleshooting
description: Symptoms that support and customers meet with STICKER, what usually causes each one and how to resolve it.
---

# Troubleshooting

:::caution Draft
This page is a draft for internal review. Statements marked **[ověřit]** still need confirmation on hardware or from the product owner.
:::

:::info Firmware v2.0.0
This page describes **STICKER firmware v2.0.0**. Where firmware v1.4.x behaves differently, a **Firmware v1.4.x** note says so.
:::

Start from what you observe. Each answer names the usual causes, how to tell them apart and what to do, and links to the page that explains the behavior in detail. Two sources answer most questions: the status LED, which flashes every 3 s, and the **Info** uplink, which the device sends after every join and every 24 h.

## Connection and data

### The device sends nothing after you insert the batteries

Watch the status LED for 10 s after the boot sequence (red, yellow and green) ends.

- **One very short yellow flash every 3 s:** the radio is disabled. The firmware default is `radio-mode off`, so a unit that was not set up for a network stays silent while it keeps measuring. Set `radio-mode` to `lorawan` (or `p2p`) in HARDWARIO Manager over NFC and save; the device restarts and joins. Units set up by the production template already have `lorawan` **[ověřit]**.
- **A short yellow and red flash every 3 s:** the device tries to join but gets no answer. Check in the network server that the device exists with the right DevEUI, JoinEUI and AppKey, the right region (for US915 or AU915 also the sub-band set in `lrw-sub-band`, default 2) and that a gateway is in range. The pause between join attempts grows from 60 s up to 1 h, so after a fix either wait or restart the device to join at once.
- **No light at all:** the batteries are flat or inserted wrong, or the battery was below 1.8 V at startup and the device switched itself off. Insert fresh batteries.

Details: [**Startup and initialization**](startup.md), [**Network connection**](network-connection.md).

### The boot light sequence repeats about once a minute

An essential part of the device, usually the radio, failed to start. The device then waits 60 s and restarts. Between the sequences the LED stays dark, NFC does not start and nothing is sent. Return the device for service. If the LED stays dark all the time even with fresh batteries, the watchdog or the LED failed to start. Such a device needs service as well.

Details: [**Startup and initialization**](startup.md).

### Data arrived for a while and then stopped

The device most likely lost the radio link. While it is still joined it checks the link with every 5th report. After 3 failed checks it enters the `WARNING` state (two very short yellow flashes every 3 s), checks the link with every report and steps down to more robust data rates. With OTAA it rejoins when no step is left; at the defaults (EU868, 900 s reports) this takes about 4–5 h from the moment the link is lost. With ABP the device cannot rejoin and stays in `WARNING` until a check passes again.

What to do:

- Check the gateway and its backhaul first; one gateway outage stops all devices behind it.
- If the device is far from the gateway, move the gateway or the device, then wait for the rejoin or restart the device.
- Values measured while the device was offline are not sent later on their own. If sensor history is enabled, read the gap with `req_history` once the device is back.

If the data stopped about 2 h after installation or after a J-Link was unplugged, check `debug` in the last **Info**. If it is `true`, the device runs a debug or provisioning image, which goes into deep sleep after 2 h without shell activity. Flash the release image instead.

Details: [**Network connection**](network-connection.md), [**History and counters**](history-and-counters.md), [**Firmware versions and updates**](firmware.md).

### The network server shows repeated join requests

Each join request means the device has lost its session: at startup, after a failed join, after the recovery steps were used up, after 4 × `interval-report` without a telemetry uplink leaving the device, or after an `lrw_join` command. Repeated joins usually point to weak coverage (link checks keep failing) or to a network server that does not answer the join (wrong keys or region). Every join attempt costs far more energy than a report sent at a good data rate, so a device that keeps rejoining drains its batteries faster.

Details: [**Network connection**](network-connection.md).

### Join requests arrive, but the network server rejects them

After `factory_reset`, `lrw_reset` or `vendor_reset` the device starts its join counter (DevNonce) from zero again, and a LoRaWAN 1.0.4 network server rejects every DevNonce that it has already seen from the device. Clear the DevNonces that the network server has stored for the device. After a factory reset, also check that you wrote the AppKey and the region again over NFC, because the reset erases them.

Details: [**Network connection**](network-connection.md).

### Can STICKER work with a private LoRaWAN network?

Yes. STICKER works with any LoRaWAN 1.0.x network server, including your own ChirpStack. "Private network" in the device settings (`lrw-network`) refers only to the radio sync word. Most private network servers use gateways with the public sync word, so keep the default `public`. Choose `private` only when your gateways use the private sync word. This setting can be changed over NFC or the shell, never by a downlink.

Details: [**Configuration**](configuration.md), [**Connectivity overview**](../connectivity/index.md).

### Can the report interval be one minute?

Yes, `interval-report` accepts 60–86400 s. Two limits apply: a short interval drains the batteries faster, and in EU868 the device may use only 36 s of airtime per hour. At the lowest data rates a report every minute does not fit into that budget, so reports wait or are dropped. Change the interval in HARDWARIO Manager or with a `set_param` downlink followed by a save.

Details: [**Messages and timing**](messages.md), [**Battery and power**](battery.md).

## Battery and power

### One device drains its batteries much faster than others

Compare the device with a healthy one in this order:

1. **Radio state:** a device that keeps joining (short yellow and red flash) or sits in `WARNING` transmits far more than a connected one.
2. **Data rate:** a device far from the gateway sends at a low data rate (high spreading factor). One report at SF12 needs many times the energy of a report at SF7: the transmission alone takes about 50 times the charge (about 85 mC against 1.7 mC). The device also listens for an answer after each uplink, which costs another 8–11 mC, so a whole report at SF12 costs about 8 times as much as one at SF7 **[ověřit]**. The network server shows the data rate of each uplink.
3. **Report interval:** check `interval-report` in the settings-info uplink.
4. **Sampling interval:** a short `interval-sample` adds sensor readings; check it in the settings-info uplink too.
5. **Hardware variant:** Hall sensors draw current all the time, so variants with them use more energy.
6. **Firmware image:** a debug or provisioning image (`debug: true` in the **Info**) keeps the processor awake, so the device draws much more current than with the release image.
7. **Bench leftovers:** a J-Link probe left connected adds a constant load.

If none of these explains the difference, return the device for service.

Details: [**Battery and power**](battery.md).

### The LED shows a red and yellow double flash every 3 s

This pattern means that the device could not load its stored settings and runs on factory defaults **[ověřit]**. It has then lost its network identity and configuration. The per-device NFC key may be lost with them, in which case HARDWARIO Manager cannot write a new configuration **[ověřit]**. Restart the device once. If the pattern comes back, return the unit for service.

Details: [**Startup and initialization**](startup.md).

## Settings and commands

### I changed a setting but nothing happened

Most settings are only staged when you change them. They take effect after a save, and the save restarts the device. Check that:

- the change was saved (`save` in `set_param` or a separate `settings_save`);
- the setting is allowed on the channel you used: LoRaWAN settings, including `radio-mode`, can be changed only over NFC or the shell, never by a downlink;
- you waited for the restart and the new join. The **settings-info** and `get_settings` already show a value that is only staged, so check that the device restarted: the next telemetry has `boot: true` and the **Info** a small `uptime_s`.

Alarm rules are the exception: they apply at once, but they are lost at the next restart unless saved.

Details: [**Configuration**](configuration.md), [**Downlink processing**](downlinks.md).

### A downlink is answered with an error

The answer on fPort 85 carries an error code and, for a rejected field, a `fault_field` number that identifies it.

| Error | Usual cause |
|---|---|
| `NOT_WRITABLE` | The command tries to change a setting that cannot be changed over the radio, such as a LoRaWAN key or `radio-mode`. The whole command is rejected. |
| `NOT_READY` | The command is not allowed over the radio, another paged answer is still being sent, or `lrw_join` was sent while LoRaWAN changes are unsaved. |
| `OUT_OF_RANGE` | A value or an alarm rule is outside its allowed range. |
| `BUDGET_TOO_SMALL` | The answer does not fit at the current data rate. Retry when the device uses a higher data rate. |
| `BAD_REQUEST` | The downlink could not be decoded, or it uses a field that firmware v2.0.0 no longer accepts. |

Details: [**Downlink processing**](downlinks.md).

### The NFC app cannot read the device

NFC in firmware v2.0.0 needs a powered device: with flat batteries the tag looks empty. Keep the phone on the device during the whole exchange; a session ends after 3 s without a request and lasts at most 120 s. Use a HARDWARIO Manager version that supports firmware v2.0.0.

Details: [**Configuration**](configuration.md).

:::note Firmware v1.4.x
Firmware v1.4.x could be configured over NFC without batteries. Firmware v2.0.0 removed this, so the device must be powered.
:::

## Sensor values

### The decoded payload shows `null` values

A `null` value means that the sensor is enabled but has no valid reading: a probe is disconnected, a sensor failed or a reading was out of range. A missing key is different: it means that the capability is turned off in the settings.

Details: [**Payload and decoder**](payload.md), [**1-Wire probes**](one-wire.md).

### A 1-Wire probe was replaced and its values stay `null`

The device never moves a new probe into the slot of the old one by itself, because a slot remembers the serial number of its probe. While the old slot still counts as bound, the device does not even look for the new probe, so trigger a binding with `w1_scan` (in HARDWARIO Manager under **STICKER → Tools → 1-Wire sensors**) or restart the device. If a free slot can take the new probe, the device enrolls it there and its values appear under that slot. The old slot is then reported in the Info uplink as `replaced` (same probe type) or `absent` (different type), or as `mismatch` when no free slot could take a probe of another type. To keep the original slot, clear or update its stored serial number and save, as described in the replacement procedure.

Details: [**1-Wire probes**](one-wire.md).

### Counters went back to zero

- The PIR and accelerometer motion counts are kept in RAM only and start from zero after every restart. This is expected.
- The Hall and input counters are saved to flash and survive restarts and battery replacement. They are cleared only by `reset_counters`, `factory_reset` or `vendor_reset`.
- After an upgrade from v1.4.x the input capabilities are reset, so the input counters disappear from telemetry until the inputs are configured again.

Details: [**History and counters**](history-and-counters.md).

### Alarm reports are missing

Alarm reports are unconfirmed by default and are not repeated, so one lost uplink means one lost report; the alarm state still travels in every telemetry uplink. Turn on `radio-alarm-ack` to have alarm reports confirmed and retried. Also check that the rules were saved (unsaved rules disappear at the next restart). After any restart the device reports every alarm condition that still holds again.

Details: [**Alarms**](alarms.md).

## Data and time

### History records have no time, or the time is wrong

The clock is lost when the batteries are removed and is set again from the network after the next join. Records taken before that are re-dated once the clock is set. Records from a startup that never received the time stay without a timestamp and decode with `time: null`. With `radio-mode off` the device gets the time only from an NFC `clock_sync`.

Details: [**History and counters**](history-and-counters.md), [**Messages and timing**](messages.md).

### Which firmware version runs on the device?

The Info uplink carries the version (`fw_version`). Send `get_info` to get it at once.

Details: [**Firmware versions and updates**](firmware.md).
