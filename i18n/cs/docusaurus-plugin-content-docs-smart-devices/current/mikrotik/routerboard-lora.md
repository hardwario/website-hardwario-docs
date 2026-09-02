---
slug: routerboard-lora
title: "RouterBOARD LoRa"
description: LoRaWAN brána na platformě MikroTik RouterBOARD s integrovaným LoRa koncentrátorem a systémem RouterOS.
---

# MikroTik RouterBOARD LoRa {#mikrotik-routerboard-lora}

![MikroTik RouterBOARD LoRa](/img/smart-devices/mikrotik-routerboard-lora.webp)

**MikroTik RouterBOARD LoRa** je kompaktní LoRaWAN brána, která kombinuje síťovou platformu RouterOS od MikroTik s integrovanou kartou LoRa koncentrátoru. Podporuje 8kanálový příjem LoRaWAN a standardní software Semtech packet forwarder.

## Klíčové parametry {#key-specifications}

| Parametr | Hodnota |
|---|---|
| Kanály LoRa | 8 kanálů (koncentrátor SX1301 nebo SX1302) |
| Frekvenční pásma | EU868, US915 (podle modelu) |
| Síťový software | RouterOS (MikroTik), Semtech UDP Packet Forwarder |
| Rozhraní LAN | 1× Gigabit Ethernet |
| Napájení | PoE (802.3af) nebo DC |
| Montáž | Kompaktní na stůl / na DIN lištu |
| Protokoly | UDP Packet Forwarder, Basics Station |

## Integrace s HARDWARIO {#hardwario-integration}

Brána RouterBOARD LoRa připojuje zařízení CHESTER a STICKER k LoRaWAN Network Serverům:

- **ChirpStack**: Nastavte bránu tak, aby přeposílala LoRaWAN pakety do vlastní instance [ChirpStack](/apps/chirpstack/index).
- **The Things Stack**: Zaregistrujte bránu v [The Things Stack](/apps/the-things-stack/index) a využijte cloudově spravovaný LoRaWAN network server.
- **Privátní síť LoRaWAN**: Nasaďte lokální síť LoRaWAN pro jednu budovu nebo areál.

## Zdroje {#resources}

- [Oficiální web MikroTik](https://mikrotik.com/)
- [Produkty MikroTik v HARDWARIO Store](https://www.hardwario.store/cz/smart-devices)
- [Integrace ChirpStack](/apps/chirpstack/index)
- [Integrace The Things Stack](/apps/the-things-stack/index)
- [Dokumentace CHESTER](/chester/)
