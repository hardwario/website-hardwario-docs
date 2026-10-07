---
slug: lora-p2p
title: Režim LoRa P2P
---
import Image from '@theme/IdealImage';

# Režim LoRa P2P (peer-to-peer) {#lora-p2p-peer-to-peer-mode}

:::info Připravovaná funkce
Komunikační režim LoRa P2P přinese připravované vydání firmwaru platformy.
:::

V režimu **LoRa P2P (peer-to-peer)** vysílají zařízení STICKER proprietární nespravované rádiové rámce přímo dalším uzlům nebo edge přijímačům, bez připojení k síťovému serveru LoRaWAN (LNS).

---

## Hlavní výhody {#key-advantages}

- **Žádná infrastruktura síťového serveru:** Funguje bez cloudových i lokálních síťových serverů LoRaWAN (ChirpStack, TTS).
- **Nízká latence a vlastní časování:** Přímé vysílání bez vyjednávání připojení k síti a bez režie duty cycle na straně LNS.
- **Samostatné edge brány:** Hodí se pro přímé spárování se zařízením HARDWARIO FIBER nebo s vlastními edge přijímači v odlehlých či izolovaných (air-gapped) nasazeních.
- **Úspora energie:** Odpadají okna pro příjem downlinků i opakované žádosti o připojení mimo pokrytí sítě.

---

## Architektura a topologie {#architecture--topology}

V režimu LoRa P2P obchází zařízení STICKER vrstvu MAC protokolu LoRaWAN, ale využívá spodní modulační vrstvu LoRa PHY čipů Semtech SX1262 / STM32WL. Rámce jdou přímo ze zařízení do přijímače, který provozujete vy. Po cestě není žádná brána, žádný Join ani síťový server.

```mermaid
flowchart LR
  S1([STICKER]) -->|LoRa PHY| RX[Edge receiver]
  S2([STICKER]) -->|LoRa PHY| RX
  RX --> Backend[Your system]
  classDef hero fill:#009cfa,stroke:#016ad4,stroke-width:2px,color:#ffffff;
  class RX hero;
```

Porovnejte to s cestou přes [**LoRaWAN**](./index.md), kde uplinky putují STICKER → brána → síťový server → vaše aplikace. V režimu P2P není vrstva MAC protokolu LoRaWAN, a tedy ani procedura připojení (Join), ADR ani síťově řízená okna pro downlinky. Obě strany jen musí mít shodně nastavené parametry rádia uvedené níže.

---

## Parametry rádia {#radio-parameters}

Při provozu v režimu P2P musí mít vysílač i přijímač nastavené shodné fyzické parametry rádia:

| Parametr | Výchozí hodnota | Popis |
|---|---|---|
| **Frekvence** | 868,100 MHz (EU868) / 915,000 MHz (US915) | Střední frekvence kanálu. |
| **Šířka pásma (BW)** | 125 kHz | Šířka pásma kanálu. |
| **Spreading Factor (SF)** | SF7 | Kompromis mezi rezervou spoje (link budget) či dosahem a dobou vysílání (SF7 až SF12). |
| **Coding Rate (CR)** | 4/5 | Schéma dopředné korekce chyb. |
| **Délka preambule** | 8 symbolů | Preambule pro synchronizaci rádiového rámce. |
| **Sync Word** | `0x12` (privátní) | Sync word na úrovni PHY, který izoluje privátní provoz P2P. |
| **Vysílací výkon** | +14 dBm | Výstupní vysílací výkon. |

---

## Konfigurace a správa {#configuration--management}

Parametry P2P a režim rádia nastavíte na místě přes NFC v aplikaci [**HARDWARIO Manager**](/sticker/hardwario-manager/) nebo ve vývojářském shellu přes RTT:

```bash
config radio-mode p2p
config p2p-frequency 868100000
config p2p-sf 7
config p2p-bandwidth 125
settings save
```

Podrobné postupy uvedení do provozu v terénu najdete v dokumentaci aplikace [**HARDWARIO Manager**](/sticker/hardwario-manager/).
