---
slug: firmware-flashing
title: Nahrání firmwaru
description: "Jak aktualizovat firmware zařízení GLIDER: dvě podporované metody a co každá z nich potřebuje."
title_meta: "Nahrání firmwaru (GLIDER)"
---
import Image from '@theme/IdealImage';

# Nahrání firmwaru {#firmware-flashing}

Firmware zařízení GLIDER lze aktualizovat dvěma způsoby:

- [**Přes USB-C**](application-over-at.md): není potřeba ladicí sonda. Doporučeno pro zařízení v ostrém provozu a aktualizace v terénu.
- [**Přes J-Link (SWD)**](application-over-j-link.md): vyžaduje sondu J-Link. Používá se při vývoji firmwaru.

Oba způsoby vedou ke stejnému výsledku: na čipu nRF9151 běží nový obraz aplikace. Vyberte postup podle toho, jaký hardware máte k dispozici.
