---
slug: routerboard-lora
title: "RouterBOARD LoRa"
description: Brána LoRaWAN na platformě MikroTik RouterBOARD s vestavěným koncentrátorem LoRa a systémem RouterOS.
---

# MikroTik RouterBOARD LoRa {#mikrotik-routerboard-lora}

![MikroTik RouterBOARD LoRa](/img/smart-devices/mikrotik-routerboard-lora.webp)

**MikroTik RouterBOARD LoRa** je kompaktní brána LoRaWAN, která spojuje síťovou platformu RouterOS od společnosti MikroTik s vestavěnou kartou koncentrátoru LoRa. Přijímá LoRaWAN na 8 kanálech a podporuje standardní software Semtech packet forwarder.

## Klíčové parametry {#key-specifications}

| Parametr | Hodnota |
|---|---|
| Kanály LoRa | 8 kanálů (koncentrátor SX1301 nebo SX1302) |
| Frekvenční pásma | EU868, US915 (podle modelu) |
| Síťový software | RouterOS (MikroTik), Semtech UDP Packet Forwarder |
| Rozhraní LAN | 1× Gigabit Ethernet |
| Napájení | PoE (802.3af) nebo DC |
| Montáž | Kompaktní, na stůl nebo na lištu DIN |
| Protokoly | UDP Packet Forwarder, Basics Station |

## Integrace s HARDWARIO {#hardwario-integration}

Brána RouterBOARD LoRa připojuje zařízení CHESTER a STICKER k síťovým serverům LoRaWAN:

- **ChirpStack**: Nastavte bránu tak, aby přeposílala pakety LoRaWAN do vlastní instance [ChirpStack](/apps/chirpstack/index).
- **The Things Stack**: Zaregistrujte bránu v [The Things Stack](/apps/the-things-stack/index) a využijte síťový server LoRaWAN spravovaný v cloudu.
- **Privátní síť LoRaWAN**: Nasaďte lokální síť LoRaWAN pro jednu budovu nebo areál.

## Zdroje {#resources}

- [Oficiální web společnosti MikroTik](https://mikrotik.com/)
- [Produkty MikroTik v e-shopu HARDWARIO Store](https://www.hardwario.store/cz/smart-devices)
- [Integrace ChirpStack](/apps/chirpstack/index)
- [Integrace The Things Stack](/apps/the-things-stack/index)
- [Dokumentace CHESTER](/chester/)
