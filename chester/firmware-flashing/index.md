---
slug: firmware-flashing
title: Firmware Flashing
---
import Image from '@theme/IdealImage';

# Firmware Flashing

:::tip

Firmware is a software program or set of instructions programmed on a hardware device. In CHESTER, as in most modern embedded devices, the firmware is stored in the non-volatile type of storage, called flash memory. The process of writing the firmware to this flash memory is called flashing.

:::

On the CHESTER mainboard, there are several devices with user-upgradeable firmware:

1. Application + Bluetooth module

   The application module is located in the top left corner of the mainboard. The module encapsulates SoC (System-on-Chip) from Nordic Semiconductor, type nRF52840. This SoC provides 1 MB of flash memory and 256 kB of RAM. Apart from the main application functionality, this SoC hosts Bluetooth radio. Flashing can be done either [using J-Link](./application-over-j-link.md) through SWD connector labeled as `APP` (or `BLE` on hardware revision R3.2 and earlier) or [via Bluetooth](application-over-bluetooth.md) if the running application supports that.

1. Cellular IoT (NB-IoT + LTE-M) modem

   The cellular IoT modem is located in the top right corner of the mainboard (above the LoRaWAN modem). The modem comes in a SiP form (System-in-Package) from Nordic Semiconductor, type nRF9160. This SiP provides 1 MB of flash memory and 256 kB of RAM. Flashing can be done using J-Link through the SWD connector labeled as `LTE`.

1. LoRaWAN device modem

   The LoRaWAN device modem is located in the top right corner of the mainboard (below the LTE modem). The modem comes in form of a module from Murata, type CMWX1ZZABZ-078. The module encapsulates a radio chip from Semtech, type SX1276, and a microcontroller from STMicroelectronics, type STM32L072CZ. Flashing can be done using J-Link through the SWD connector labeled as `LRW`.

## Extension Modules

Apart from the mainboard itself, these are the other devices with the firmware in the CHESTER ecosystem:

1. Extension module CHESTER-Z1

1. Extension module CHESTER-S1
