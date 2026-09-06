---
slug: /hardware
title: Popis hardwaru
description: "V tomto článku najdete podrobnosti o hardwarové konfiguraci zařízení TAPPER."
title_meta: "Popis hardwaru (TAPPER)"
---

import Image from '@theme/IdealImage';

# Popis hardwaru TAPPER {#tapper-hardware-description}

V tomto článku najdete podrobnosti o hardwarové konfiguraci zařízení TAPPER.

## Základní parametry {#basic-parameters}

| **Elektrické**                       |                           |
| :----------------------------------- | ------------------------: |
| Minimální napájecí napětí            |                      10 V |
| Maximální napájecí napětí            |                      30 V |
| Typická spotřeba                     |                     1.4 W |
| Maximální spotřeba                   |                     2.5 W |
| **Vstupy**                           |                           |
| Nominální průřez svorkovnice         |        1.5 mm<sup>2</sup> |
| DC napájecí jack                     |               1.35x3.5 mm |
| **Výstupy**                          |                           |
| RGB LED                              | 355 mcd, 710 mcd, 140 mcd |
| Bzučák                               |          80 dBA / 2.7 kHz |
| **Fyzické**                          |                           |
| Rozměry krabičky                     |            155x84x21.3 mm |
| Materiál krabičky                    |        ASA+PC (UL 94 V-0) |
| Krytí krabičky                       |                      IP40 |
| Barva krabičky                       |    dopravní bílá RAL 9016 |
| Provozní teplota                     |          -20 °C až +60 °C |

## Schéma zapojení {#schematic-diagram}

- [Schéma R1.1 (PDF)](../../../../tapper/media/hio-tapper-r1.1-schematic.pdf)

### Napájení {#power}

![Schéma napájení TAPPER R1.1: vstup 10–30 V přes svorkovnici nebo DC jack, snižující převodník L6981CDR s výstupem 5 V](../../../../tapper/images/hio-tapper-r1.1-schematic-1.png)

### Raspberry Pi + breakout deska PN532 {#raspberry-pi--pn532-breakout-board}

![Schéma TAPPER R1.1: propojení GPIO Raspberry Pi Zero 2 W s breakout deskou PN532 přes SPI](../../../../tapper/images/hio-tapper-r1.1-schematic-2.png)

### Periferie {#peripherals}

![Schéma periferií TAPPER R1.1: RGB LED a bzučák řízené tranzistory a vstup tamper spínače](../../../../tapper/images/hio-tapper-r1.1-schematic-3.png)
