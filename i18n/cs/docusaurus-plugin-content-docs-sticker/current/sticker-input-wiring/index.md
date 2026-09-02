---
slug: sticker-input-wiring
title: Zapojení vstupů STICKER Input
description: "Zapojení pro 1-WIRE (Dallas, ...):"
---
import Image from '@theme/IdealImage';

# Zapojení vstupů STICKER Input {#sticker-input-wiring}

## Legenda DIP přepínačů {#dip-switch-legend}

- |🟥←| **ON** — DIP přepínač v poloze ON (červeně)
- |→⬛| **OFF** — DIP přepínač v poloze OFF (černě)

## Vstup 1-Wire {#1-wire-input}
Zapojení pro 1-WIRE (Dallas, ...):
- DIP přepínače povolují datové linky (DQ1/DQ2).

![STICKER 1-Wire](../../../../../sticker/sticker-input-wiring/images/sticker-1w.png)

---

## Vstup pro suchý kontakt {#dry-contact-input}
Zapojení pro DRY CONTACT:  
- Pull-up 560 kΩ a uzemnění přes 33 kΩ.  

![STICKER suchý kontakt](../../../../../sticker/sticker-input-wiring/images/sticker-dry-contact.png)

---

## Analogový vstup (0–24 V) {#analog-input-024-v}
Analogový vstup 0–24 V:  
- Dělič 1 kΩ / 33 kΩ.

![STICKER analogový vstup](../../../../../sticker/sticker-input-wiring/images/sticker-analog-input.png)

## Senzor SO {#so-sensor}

![STICKER ](../../../../../sticker/sticker-input-wiring/images/sticker-so-sensor.png)
