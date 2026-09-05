---
slug: firmware-flashing
title: Nahrání firmwaru
description: "Firmware zařízení GLIDER lze aktualizovat dvěma způsoby:"
---
import Image from '@theme/IdealImage';

# Nahrání firmwaru {#firmware-flashing}

Firmware zařízení GLIDER lze aktualizovat dvěma způsoby:

- [**Přes USB-C**](application-over-at.md): není potřeba debug probe. Doporučeno pro produkční jednotky a aktualizace v terénu.
- [**Přes J-Link (SWD)**](application-over-j-link.md): vyžaduje sondu J-Link. Používá se při vývoji firmwaru.

Oba způsoby vedou ke stejnému výsledku: na čipu nRF9151 běží nový obraz aplikace. Vyberte postup, který odpovídá hardwaru, jenž máte k dispozici.
