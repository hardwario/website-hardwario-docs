---
slug: /connectivity
title: Přehled konektivity
description: "Zařízení HARDWARIO STICKER podporuje několik bezdrátových komunikačních protokolů, takže si pro své nasazení můžete vybrat nejvhodnější rádiovou architekturu."
---
import Image from '@theme/IdealImage';

# Přehled konektivity {#connectivity-overview}

Zařízení HARDWARIO STICKER podporuje několik bezdrátových komunikačních protokolů, takže si pro své nasazení můžete vybrat nejvhodnější rádiovou architekturu.

:::tip Zprovoznění a režim rádia
Bez ohledu na zvolený protokol konektivity lze stav rádia i klíče nastavit bezdrátově přes NFC v aplikaci [**HARDWARIO Manager**](../hardwario-manager.md).
:::

---

## Porovnání protokolů {#protocol-comparison}

| Vlastnost | LoRaWAN | LoRa P2P |
|---|---|---|
| **Síťový server (LNS)** | Nutný (ChirpStack, TTS a další) | Žádný (přímé spojení mezi uzly nebo s bránou) |
| **Topologie** | Hvězda hvězd (uzel → brána → LNS) | Point-to-Point / Point-to-Multipoint |
| **Dosah a pokrytí** | Veřejné i privátní sítě bran | Přímé rádiové spojení s přímou viditelností |
| **Latence** | Standardní (plánované uplinky Class A) | Nízká (vlastní časování vysílání) |
| **Nejlépe se hodí pro** | Cloudové platformy, podnikové IoT pro více klientů | Izolované lokality, přímá spojení s bránou FIBER, privátní edge sítě |

---

## Dostupné protokoly {#available-protocols}

### Integrace LoRaWAN {#lorawan-integration}
Standardní provoz LoRaWAN Class A s aktivací OTAA/ABP, dynamickým ADR, šifrovanou telemetrií a správou na dálku přes fPort 85.

- **[Integrace ChirpStack v4](./lorawan-chirpstack.md)**: Návod k nastavení vlastního síťového serveru ChirpStack.
- **[Integrace The Things Stack](./lorawan-tts.md)**: Návod k nastavení pro TTS Cloud a Community Edition.
- **[Příkazy přes downlink](./downlink-commands.md)**: Přehled nastavení parametrů na dálku přes fPort 85.

### LoRa P2P (peer-to-peer) {#lora-p2p-peer-to-peer}
Softwarově volitelný proprietární režim rádia: pakety se vysílají přímo, bez správy sítě a bez síťového serveru mezi uzly.

- **[Průvodce LoRa P2P](./lora-p2p.md)**: Přehled architektury, parametry RF rámců a integrace s edge bránou.
