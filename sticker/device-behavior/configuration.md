---
slug: configuration
title: Configuration
description: How to configure STICKER over NFC, by downlink or on the shell, what each channel can set and when a change takes effect.
---

# Configuration

:::caution Draft
This page is a draft for internal review. Statements marked **[ověřit]** still need confirmation on hardware or from the product owner.
:::

:::info Firmware v2.0.0
This page describes **STICKER firmware v2.0.0**. Where firmware v1.4.x behaves differently, a **Firmware v1.4.x** note says so.
:::

STICKER has no buttons and no display. You configure it over NFC with a phone, remotely with downlinks or, on a debug build, on the shell. This page explains which channel can change which setting, when a change takes effect, what the device shows during an NFC session and how NFC access is protected. For the meaning of each parameter, see the [**Configuration**](../developer-access/configuration.md) reference.

## Three ways to configure

| Channel | What you need | Use it for |
|---|---|---|
| NFC with HARDWARIO Manager | A phone with NFC, the app and the secret key of the device; the device must be powered | Commissioning (LoRaWAN keys, region, `radio-mode`) and on-site changes of most settings |
| Downlink over LoRaWAN or LoRa P2P | A working network connection and access to the network server or the ProXimos Hub | Changing intervals, sensors and alarm rules on installed devices, also across a fleet |
| Shell | A debug or provisioning image and a J-Link probe on the SWD pads | Development, production provisioning and the LoRa P2P radio parameters |

- **NFC** is the standard way. HARDWARIO Manager reads the configuration, lets you edit it and writes it back while you hold the phone on the device. The steps in the app are described in [**HARDWARIO Manager configuration**](/apps/hardwario-manager/sticker/configuration).
- **Downlinks** reach an installed device without a visit, but they cannot change how the device connects to the network. A downlink is a message from the network server to the device, see [**Downlink processing**](downlinks.md).
- **The shell** exists only on debug and provisioning images. The release image that runs in installed devices has no shell, so a device has to be reflashed with a J-Link first, see [**Firmware versions and updates**](firmware.md).

## What each channel can set

| Settings | NFC | Downlink | Shell |
|---|---|---|---|
| Application: `interval-sample`, `interval-report`, `interval-announce`, `history-enable`, `history-channels`, `battery-level` | Yes | Yes | Yes |
| Sensors: `cap-*` capabilities including the GP pin modes, 1-Wire slots (`sensor1-rom` to `sensor4-rom`, `sensor1-type` to `sensor4-type`), counter switches, `accel-motion-sensitivity` | Yes | Yes | Yes |
| Alarms: rules `alarm_0` to `alarm_15`, `alarm-limit`, `alarm-buzzer-mode`, `radio-alarm-ack` | Yes | Yes | Yes |
| LoRaWAN: `radio-mode`, `lrw-region`, `lrw-sub-band`, `lrw-network`, `lrw-activation`, `lrw-adr`, `lrw-datarate`, `radio-link-check-interval`, `radio-link-check-fail-rejoin` | Yes | No | Yes |
| LoRaWAN identifiers and keys: DevEUI, JoinEUI, AppKey, NwkKey, DevAddr, NwkSKey, AppSKey | Yes, also readable | No; the keys are never sent over the radio | Yes |
| LoRa P2P radio: `p2p-frequency`, `p2p-spreading-factor`, `p2p-tx-power`, `p2p-modulation` | No | No | Yes |
| `calibration` (factory test mode) | Yes | No | Yes |
| `vendor-reset-allow` | Vendor channel only | No | Yes |
| `secret-key` | Only with the `set_secret_key` command | No | Yes |
| Claim token | Only with the `claim_active` command | No | Write once |
| Device identity: `serial-number`, `vendor-token`, `nonce-counter` | No | No | Provisioning only |

- **LoRaWAN terms:** `lrw-activation` selects OTAA (over-the-air activation: the device joins the network with its AppKey) or ABP (activation by personalization: fixed session keys, no join). ADR (adaptive data rate) lets the network server tune the data rate and transmit power of the device.
- **Downlink limits:** a downlink that tries to write a setting marked "No" is answered with `NOT_WRITABLE`, and none of its values is applied. The `ttn.js` encoder of v2.0.0 cannot encode `alarm-buzzer-mode` and `radio-alarm-ack` from JSON; send these two as hex, see [**Downlink commands**](../connectivity/downlink-commands.md).
- **Alarm rules on the shell** are set with the `alarm` command instead of `config`, see [**Alarm rules**](../developer-access/alarm-rules.md).

## When a change takes effect

Writing a setting only stages it: the device keeps running with its current settings until the configuration is saved. Saving writes the settings to NVS (the settings storage in flash) and restarts the device, and the new settings apply from that boot on. HARDWARIO Manager saves whenever it writes a configuration, so the device restarts after each write **[ověřit]**.

| Change | When it takes effect |
|---|---|
| A setting written over NFC, by downlink or with `config` on the shell | After a save (`save` in `set_param`, `settings_save` or the shell `settings save`), which reboots the device |
| `radio-mode`, region, keys and the other radio settings | After the save, at the next boot, because the radio is set up only at boot |
| Alarm rules | At once, without a reboot; lost at the next reboot unless saved. The shell `alarm` command saves them at once. |
| `reset_counters` | At once; the counters are saved without a reboot |
| `reboot` without a save | All staged changes are discarded |
| `lrw_join` | Refused with `NOT_READY` while LoRaWAN changes are staged but not saved |

You do not need `lrw_join` after you change the LoRaWAN settings: the save reboots the device, and the device connects to the network at every boot. After the reboot it sends its Info and settings-info uplinks (messages from the device to the network), so the settings-info shows the key settings as saved, see [**Messages and timing**](messages.md). How saving works over a downlink is described in [**Downlink processing**](downlinks.md).

## NFC sessions

- **Power:** NFC works only on a powered device. A device without batteries, or with dead batteries, reads as a blank tag, so insert the batteries first.
- **Ready time:** NFC is ready about 1.2 s after a reset. A tap during the boot LED sequence cuts the sequence short.
- **One tap:** keep the phone still on the device. A whole exchange, for example reading the configuration or writing and saving it, runs in one tap on Android and iOS alike.
- **Reboot after a command:** a command that reboots the device (save, reboot, resets, a new secret key, calibration) first shows its result on the LED. Then the device reboots and the boot LED sequence follows.

| Session limit | Value |
|---|---|
| Longest session | 120 s |
| Session ends after no request for | 3 s |
| Rejected frames in a row that end the session | 8 |
| Phone left on the device without any exchange | NFC is released after 120 s, until the phone is moved |

The LED shows the progress of a session:

| LED | Meaning |
|---|---|
| Green, solid (at most 5 s) | Phone detected, no session started yet |
| Green, blinking (90 ms) | Session running |
| Green and yellow, 2 s | Session ended, the last exchange worked |
| Red, 2 s | Session ended, the last exchange failed: the request was rejected (wrong key, replayed or damaged frame), or its answer did not reach the phone |

Green and yellow means that the exchange worked, even when the device answered with an error such as a value out of range; the app shows the error. NFC gives no buzzer feedback. For all LED signals, see the [**Quick start guide**](../first-steps.md).

:::note Firmware v1.4.x
Firmware v1.4.x exchanged commands through NDEF records in the tag memory, which took two taps per command on iOS. It could also store a configuration written to a device without batteries and apply it at the next boot. Firmware v2.0.0 removed this, so configuring a powered-off device from HARDWARIO Manager works only with v1.4.x **[ověřit]**.
:::

## NFC security

- **Own key per device:** every STICKER has its own 128-bit secret key. HARDWARIO Manager needs it to talk to the device; you add each device to the app once, see [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers).
- **Encryption:** commands and answers are encrypted and authenticated with AES-128-CCM in the hardware of the device. Without the key a phone can neither read the configuration nor change anything.
- **Replay protection:** every command carries a counter that must be higher than the last accepted one, by at most 1024. The device stores the counter before it runs the command, so a recorded exchange cannot be played back, not even after a power cycle.
- **Without the key:** the device answers only two read-only requests in plain text: `get_basic_info` (serial number, NFC message counter, configuration version and firmware version) and `get_claim_info` (serial number and claim token, only while the claim window is open).
- **LoRaWAN keys:** anyone who has the secret key can read the LoRaWAN keys over NFC. Keep the secret key as safe as the LoRaWAN keys. Over the radio the keys never leave the device.
- **Changing the key:** `set_secret_key` replaces the secret key over the encrypted channel; the device reboots to use the new key.
- **Vendor channel:** a second encrypted channel uses the vendor token instead of the secret key. It carries the vendor reset and the `vendor-reset-allow` setting.

## Main parameters

The most important settings and their firmware defaults:

| Parameter | Default | Meaning |
|---|---|---|
| `radio-mode` | `off` | Radio: `off`, `lorawan` or `p2p`; read at boot |
| `lrw-region` | `eu868` | LoRaWAN region; also `us915`, `au915` and `as923` |
| `lrw-activation` | `otaa` | OTAA or ABP |
| `lrw-adr` | `true` | ADR on |
| `radio-link-check-interval` | `5` | Every 5th report checks the link with a LinkCheckReq (a request the network server answers); `0` turns the checks off |
| `radio-link-check-fail-rejoin` | `5` | Failed link checks before the device joins again |
| `interval-report` | `900` s | Report interval, 60–86400 s |
| `interval-sample` | `0` | `0` reads the sensors just before each report; 5–3600 s samples on its own timer |
| `interval-announce` | `24` h | How often the Info and settings-info are sent again; `0` turns this off, 1–168 h |
| `history-enable` | `false` | Sensor history off |
| `battery-level` | `2400` mV | Low-battery alarm threshold, 1000–3600 mV |
| `alarm-limit` | `10` s | Alarm collection window, 0–3600 s |
| `cap-sht` | `true` | Onboard temperature and humidity sensor on; all other `cap-*` capabilities are `false` and `cap-gpio-mode` is `none` |

For every parameter, its range and its shell syntax, see the [**Configuration**](../developer-access/configuration.md) reference. How to edit the settings in the app is described in [**HARDWARIO Manager configuration**](/apps/hardwario-manager/sticker/configuration).

:::note Firmware v1.4.x
Firmware v2.0.0 renamed several settings without aliases. `lrw-deveui` and `lrw-appkey` became `radio-deveui` and `radio-appkey` and keep their values; `lrw-link-check-*` became `radio-link-check-*` and returns to 5 and 5; the input, PIR and buzzer capabilities became `cap-gpio-mode`, `cap-gpio-input-a` and `cap-gpio-input-b` and return to `none`. Alarm rules and the history channel selection have to be written again, see [**Firmware versions and updates**](firmware.md).
:::

## Factory state

The firmware default of `radio-mode` is `off`. A device whose settings were never written measures, records history (when enabled) and evaluates alarms, but it does not transmit. In production, the identity, keys and settings of each unit are written with a provisioning image before the release image is flashed, and the radio mode is set at that step too. A unit can therefore leave production in either state: silent on the shelf (`off`) or ready to join the network on its first boot (`lorawan`), which is what the HARDWARIO STICKER Flash Tool and the [**Firmware setup**](../developer-access/firmware-setup.md) page set up. Which state delivered units are in still needs confirmation **[ověřit]**; the [**Quick start guide**](../first-steps.md) describes new units as radio-silent. Check `radio-mode` in HARDWARIO Manager before you install a device.

A device reset keeps `radio-mode` and the LoRaWAN keys and settings, except `radio-link-check-interval` and `radio-link-check-fail-rejoin`, which return to 5. A factory reset keeps only the identity (serial number, secret key, claim token and vendor token), `vendor-reset-allow`, the DevEUI and the JoinEUI. It sets `radio-mode` to `off` and erases the AppKey, the region and the other LoRaWAN and LoRa P2P settings, so write them again before you switch the radio on. It also restarts the join counter (DevNonce), so the network server may refuse the next joins of the device until you clear the used DevNonces there, see [**Network connection**](network-connection.md). The reset commands are described in [**Maintenance**](../developer-access/maintenance.md) and [**Reset a device**](/apps/hardwario-manager/sticker/reset).
