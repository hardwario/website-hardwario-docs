---
slug: firmware-flashing
title: Nahrání firmwaru
description: "Firmware je softwarový program nebo sada instrukcí naprogramovaná v hardwarovém zařízení. V zařízení CHESTER, stejně jako ve většině moderních vestavěných zařízení, je firmware uložen v nevolatilním typu paměti zvané flash paměť. Proces zápisu…"
title_meta: "Nahrání firmwaru (CHESTER)"
---
import Image from '@theme/IdealImage';

# Nahrání firmwaru {#firmware-flashing}

:::tip

Firmware je softwarový program nebo sada instrukcí naprogramovaná v hardwarovém zařízení. V zařízení CHESTER, stejně jako ve většině moderních vestavěných zařízení, je firmware uložen v nevolatilním typu paměti zvané flash paměť. Proces zápisu firmwaru do této flash paměti se nazývá nahrání firmwaru (flashing).

:::

Na základní desce zařízení CHESTER je několik zařízení s firmwarem, který může uživatel aktualizovat:

1. Aplikační + Bluetooth modul

   Aplikační modul se nachází v levém horním rohu základní desky. Modul obsahuje SoC (System-on-Chip) od Nordic Semiconductor – typ nRF52840. Tento SoC poskytuje 1 MB flash paměti a 256 kB RAM. Kromě hlavní aplikační funkcionality tento SoC obsluhuje také Bluetooth rádio. Nahrání firmwaru lze provést buď [pomocí J-Link](./application-over-j-link.md) přes SWD konektor označený `APP` (nebo `BLE` u hardwarové revize R3.2 a starší), nebo [přes Bluetooth](application-over-bluetooth.md), pokud to běžící aplikace podporuje.

1. Cellular IoT (NB-IoT + LTE-M) modem

   Cellular IoT modem se nachází v pravém horním rohu základní desky (nad LoRaWAN modemem). Modem má podobu SiP (System-in-Package) od Nordic Semiconductor – typ nRF9160. Tento SiP poskytuje 1 MB flash paměti a 256 kB RAM. Nahrání firmwaru lze provést pomocí J-Link přes SWD konektor označený `LTE`.

1. LoRaWAN modem zařízení

   LoRaWAN modem zařízení se nachází v pravém horním rohu základní desky (pod LTE modemem). Modem má podobu modulu od Murata – typ CMWX1ZZABZ-078. Modul obsahuje rádiový čip od Semtech – typ SX1276, a mikrokontrolér od STMicroelectronics – typ STM32L072CZ. Nahrání firmwaru lze provést pomocí J-Link přes SWD konektor označený `LRW`.

## Rozšiřující moduly {#extension-modules}

Kromě samotné základní desky jsou v ekosystému CHESTER firmwarem vybavena i tato zařízení:

1. Rozšiřující modul CHESTER-Z1

1. Rozšiřující modul CHESTER-S1
