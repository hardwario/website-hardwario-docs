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
| **Síťový server (LNS)** | Nutný (ChirpStack, TTS a další) | Žádný. Síť místo něj řídí ProXimos Hub |
| **Topologie** | Hvězda hvězd (uzel → brána → LNS) | Hvězda (uzel → modem HARDWARIO FIBER → ProXimos Hub) |
| **Rádiový protokol** | MAC LoRaWAN 1.0.4, Class A | Rádiový protokol HARDWARIO TOWER (rámce AES-CCM, potvrzení od brány) |
| **Downlinky a správa** | Downlinky Class A na fPort 85 | Brána je ohlásí v potvrzení (ACK), stejné příkazy jako na fPort 85 |
| **Nejlépe se hodí pro** | Cloudové platformy, podnikové IoT pro více klientů | Izolované lokality bez pokrytí LoRaWAN, privátní sítě na místě s ProXimos Hubem |

---

## Dostupné protokoly {#available-protocols}

### Integrace LoRaWAN {#lorawan-integration}
Standardní provoz LoRaWAN Class A s aktivací OTAA/ABP, šifrovanou telemetrií a správou na dálku přes fPort 85. Podporované regiony jsou EU868, US915, AU915 a AS923 (AS923-1). Datovou rychlost řídí buď ADR, nebo ji při vypnutém ADR pevně nastavíte parametrem `lrw-datarate` (`dr0` až `dr7`). Odpovědi, které se nevejdou do jednoho rámce, zařízení samo rozdělí na stránky a pošle je postupně. Příkaz `get_radio_state` vrací stav spojení a diagnostiku rádia.

- **[Integrace ChirpStack v4](./lorawan-chirpstack.md)**: Návod k nastavení vlastního síťového serveru ChirpStack.
- **[Integrace The Things Stack](./lorawan-tts.md)**: Návod k nastavení pro TTS Cloud a Community Edition.
- **[Příkazy přes downlink](./downlink-commands.md)**: Přehled nastavení parametrů na dálku přes fPort 85.

### LoRa P2P (peer-to-peer) {#lora-p2p-peer-to-peer}
Druhý režim rádia, dostupný od firmwaru v2.0.0, pro lokality bez sítě LoRaWAN. STICKER se spáruje s ProXimos Hubem přes modem HARDWARIO FIBER a komunikuje rádiovým protokolem HARDWARIO TOWER, s potvrzováním od brány, downlinky, síťovým časem a dohledem nad spojením. Telemetrie, alarmy, příkazy i historie fungují stejně jako přes LoRaWAN.

- **[Průvodce LoRa P2P](./lora-p2p.md)**: Architektura, parametry rádia a konfigurace.
