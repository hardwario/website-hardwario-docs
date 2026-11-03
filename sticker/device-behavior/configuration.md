---
slug: configuration
title: Configuration
description: How to configure STICKER over NFC, by downlink or on the shell, when a change takes effect and what a reset does to the settings.
---
import LedPattern from '@site/src/components/LedPattern';

# Configuration

STICKER has no buttons and no display. This page shows the ways to configure it, when a change takes effect and what a reset does to the settings.

## Three ways to configure

| Way | What you need | What it can change |
|---|---|---|
| [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration) over NFC | A phone with NFC and the secret key of the device | All settings, including the LoRaWAN setup, but not the LoRa P2P radio settings |
| [**Downlink**](downlinks.md), a message from the network server | A working network connection | Most settings, such as intervals, sensors and alarm rules, but no network settings |
| Shell | A [**debug build**](firmware.md) and a J-Link probe | All settings |

NFC is the standard way. Installed devices run the release build, which has no shell.

## When a change takes effect

- **Most settings**, including the network settings, take effect after a save, which restarts the device. After the restart, the settings uplink (a message with the key settings) shows the result.
- **Alarm rules and counter resets** apply at once. Alarm rules that you do not save are lost at the next restart.

## NFC in practice

- **Batteries:** NFC works only while the device has working batteries. Otherwise the phone sees a blank tag.
- **Hold still:** keep the phone on the device. One tap covers a whole exchange.
- **Time limits:** a session ends 3 s after the last request and lasts at most 120 s.
- **Restart:** when an exchange restarts the device, the LED first shows the result and then the boot sequence.

| LED | Meaning |
|---|---|
| <LedPattern pattern="green" /> Solid green, up to 5 s | Phone detected |
| <LedPattern pattern="green yellow" /> Green and yellow, 2 s | Exchange worked. If the device answered with an error, the app shows it. |
| <LedPattern pattern="red" /> Red, 2 s | Exchange failed, for example because of a wrong key or because the answer did not reach the phone |

## Security

Every STICKER has its own secret key, which you add to HARDWARIO Manager once per device, see [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers). Commands and answers are encrypted, so without the key a phone can neither read nor change the configuration.

## Main settings and defaults

| Setting | Firmware default |
|---|---|
| Radio mode (`radio-mode`): `off`, `lorawan` or `p2p` | `off` |
| LoRaWAN region (`lrw-region`) | `eu868` |
| Report interval (`interval-report`, 60–86400 s) | 15 min |
| Sample interval (`interval-sample`) | `0`: sensors are read just before each report |
| Sensor history (`history-enable`) | Off |
| Low-battery alarm threshold (`battery-level`) | 2400 mV |
| Onboard temperature and humidity sensor (`cap-sht`) | On; all other sensors are off |

Check the values in HARDWARIO Manager before you install a device. All parameters and their ranges are in the [**Configuration**](../developer-access/configuration.md) reference.

## Device reset and factory reset

- **Device reset** returns the settings to their defaults but keeps the device identity, the radio mode, the LoRaWAN keys and most LoRaWAN settings.
- **Factory reset** keeps only the device identity (such as the serial number and the secret key) and the LoRaWAN identifiers DevEUI and JoinEUI. It erases the network keys and the other network settings and switches the radio off, so you have to set up the device again. It also clears the counters and the stored history.

Both resets are in HARDWARIO Manager, see [**Reset a device**](/apps/hardwario-manager/sticker/reset). If the network server refuses the device after a factory reset, see [**Troubleshooting**](troubleshooting.md).
