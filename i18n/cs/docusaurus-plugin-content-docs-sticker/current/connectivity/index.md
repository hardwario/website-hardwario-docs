---
slug: /connectivity
title: Přehled konektivity
description: "Zařízení HARDWARIO STICKER podporuje několik bezdrátových komunikačních protokolů, takže si můžete vybrat radiovou architekturu optimální pro vaše nasazení."
---
import Image from '@theme/IdealImage';

# Přehled konektivity {#connectivity-overview}

Zařízení HARDWARIO STICKER podporuje několik bezdrátových komunikačních protokolů, takže si můžete vybrat radiovou architekturu optimální pro vaše nasazení.

:::tip Zprovoznění a režim radia
Bez ohledu na zvolený protokol konektivity lze stav radia i přihlašovací údaje nastavit bezdrátově přes NFC v aplikaci [**HARDWARIO Manager**](../hardwario-manager.md).
:::

---

## Porovnání protokolů {#protocol-comparison}

| Vlastnost | LoRaWAN | LoRa P2P |
|---|---|---|
| **Síťový server (LNS)** | Vyžadován (ChirpStack, TTS a další) | Žádný (přímé spojení mezi uzly nebo s bránou) |
| **Topologie** | Hvězda hvězd (uzel → brána → LNS) | Point-to-Point / Point-to-Multipoint |
| **Dosah a pokrytí** | Veřejné i privátní sítě bran | Přímé RF spojení na dohled |
| **Latence** | Standardní (plánované uplinky Class A) | Nízká (vlastní časování vysílání) |
| **Nejlépe se hodí pro** | Cloudové platformy, podnikový IoT s více nájemci | Izolované lokality, přímá spojení s bránou FIBER, privátní edge sítě |

---

## Dostupné protokoly {#available-protocols}

### Integrace LoRaWAN {#lorawan-integration}
Standardní provoz LoRaWAN Class A s aktivací OTAA/ABP, dynamickým ADR, šifrovanou telemetrií a vzdálenou správou přes fPort 85.

- **[Integrace ChirpStack v4](./lorawan-chirpstack.md)**: Průvodce nastavením pro vlastní nasazení LNS ChirpStack.
- **[Integrace The Things Stack](./lorawan-tts.md)**: Průvodce nastavením pro TTS Cloud a Community Edition.
- **[Downlink příkazy](./downlink-commands.md)**: Referenční přehled vzdálené konfigurace parametrů přes fPort 85.

### LoRa P2P (peer-to-peer) {#lora-p2p-peer-to-peer}
Softwarově volitelný proprietární režim radia, který umožňuje přímé nespravované vysílání radiových paketů bez prostředníka v podobě síťového serveru.

- **[Průvodce LoRa P2P](./lora-p2p.md)**: Přehled architektury, parametry RF rámců a integrace s edge bránou.
