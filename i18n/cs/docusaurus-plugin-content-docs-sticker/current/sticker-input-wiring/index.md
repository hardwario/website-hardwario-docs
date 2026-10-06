---
slug: sticker-input-wiring
title: Zapojení vstupů STICKER Input
sidebar_label: Zapojení
description: "Průvodce zapojením STICKER Input: nastavení přepínačů DIP a připojení vstupů 1-Wire, pulzních, kontaktních a analogových, včetně schémat."
---
import Image from '@theme/IdealImage';

# Zapojení vstupů STICKER Input {#sticker-input-wiring}

## Legenda přepínačů DIP {#dip-switch-legend}

- |🟥←| **ON**: přepínač DIP v poloze ON (červeně)
- |→⬛| **OFF**: přepínač DIP v poloze OFF (černě)

## Vstup 1-Wire {#1-wire-input}
Zapojení pro 1-Wire (Dallas, ...):
- Přepínače DIP zapínají datové linky (DQ1/DQ2).

![STICKER 1-Wire](../../../../../sticker/sticker-input-wiring/images/sticker-1w.png)

---

## Vstup pro bezpotenciálový kontakt {#dry-contact-input}
Zapojení pro DRY CONTACT:  
- Pull-up 560 kΩ a uzemnění přes 33 kΩ.  

![STICKER bezpotenciálový kontakt](../../../../../sticker/sticker-input-wiring/images/sticker-dry-contact.png)

---

## Analogový vstup (0–24 V) {#analog-input-024-v}
Analogový vstup 0–24 V:  
- Dělič 1 kΩ / 33 kΩ.

![STICKER analogový vstup](../../../../../sticker/sticker-input-wiring/images/sticker-analog-input.png)

## Senzor SO {#so-sensor}

![STICKER ](../../../../../sticker/sticker-input-wiring/images/sticker-so-sensor.png)
