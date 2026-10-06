---
slug: firmware-flashing
title: Nahrání firmwaru
description: "Jak aktualizovat firmware částí základní desky CHESTER: aplikace, modem LTE, modem LoRaWAN a CHESTER-Z přes J-Link nebo Bluetooth."
title_meta: "Nahrání firmwaru (CHESTER)"
---
import Image from '@theme/IdealImage';

# Nahrání firmwaru {#firmware-flashing}

:::tip

Firmware je softwarový program nebo sada instrukcí naprogramovaná v hardwarovém zařízení. V zařízení CHESTER, stejně jako ve většině moderních vestavěných zařízení, je firmware uložen v nevolatilní paměti typu flash. Zápisu firmwaru do této paměti se říká nahrání firmwaru (flashing).

:::

Na základní desce zařízení CHESTER je několik součástí s firmwarem, který může uživatel aktualizovat:

1. Aplikační + Bluetooth modul

   Aplikační modul se nachází v levém horním rohu základní desky. Modul obsahuje SoC (System-on-Chip) nRF52840 od firmy Nordic Semiconductor. Tento SoC má 1 MB flash paměti a 256 kB RAM. Kromě hlavní aplikace obsluhuje také rádio Bluetooth. Firmware lze nahrát buď [pomocí J-Link](./application-over-j-link.md) přes konektor SWD označený `APP` (nebo `BLE` u hardwarové revize R3.2 a starší), nebo [přes Bluetooth](application-over-bluetooth.md), pokud to běžící aplikace podporuje.

1. Modem pro mobilní IoT (NB-IoT + LTE-M)

   Modem pro mobilní IoT se nachází v pravém horním rohu základní desky (nad modemem LoRaWAN). Jde o SiP (System-in-Package) nRF9160 od firmy Nordic Semiconductor. Tento SiP má 1 MB flash paměti a 256 kB RAM. Firmware se nahrává pomocí J-Link přes konektor SWD označený `LTE`.

1. Modem LoRaWAN

   Modem LoRaWAN se nachází v pravém horním rohu základní desky (pod modemem LTE). Jde o modul CMWX1ZZABZ-078 od firmy Murata. Modul obsahuje rádiový čip SX1276 od firmy Semtech a mikrokontrolér STM32L072CZ od firmy STMicroelectronics. Firmware se nahrává pomocí J-Link přes konektor SWD označený `LRW`.

## Rozšiřující moduly {#extension-modules}

Kromě samotné základní desky jsou v ekosystému CHESTER firmwarem vybavena i tato zařízení:

1. Rozšiřující modul CHESTER-Z1

1. Rozšiřující modul CHESTER-S1
