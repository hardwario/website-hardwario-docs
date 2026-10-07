---
slug: origin-plus
title: "ORIGIN+"
description: Multisenzorový požární detektor Nexelec ORIGIN+ s LoRaWAN, který detekuje kouř, teplo i CO a má certifikaci NF a CE.
---

# Nexelec ORIGIN+ {#nexelec-origin}

![Nexelec ORIGIN+](/img/smart-devices/nexelec-origin-plus.webp)

**ORIGIN+** je multisenzorový požární detektor LoRaWAN od společnosti [Nexelec](https://nexelec.fr/), který v jednom certifikovaném zařízení spojuje detekci kouře, tepla a CO. Je určený k monitorování požární bezpečnosti budov a alarmy se přes LoRaWAN spravují na dálku.

## Klíčové parametry {#key-specifications}

| Parametr | Hodnota |
|---|---|
| Detekce | Optická detekce kouře (EN 14604), teplo, CO |
| Konektivita | LoRaWAN třídy A (EU868) |
| Baterie | Výdrž baterie 10 let (nevyměnitelná) |
| Výstup alarmu | Místní bzučák + uplink přes LoRaWAN |
| Certifikace | NF (francouzská norma), CE, EN 14604 |
| Montáž | Na strop (magneticky nebo šrouby) |
| Rozměry | Kompaktní kulaté provedení |

## Data přes LoRaWAN {#lorawan-data}

Detektor ORIGIN+ posílá uplink při každém alarmu a také pravidelné stavové zprávy. Zprávy obsahují:

- **Stav alarmu**: stav alarmu kouře / tepla / CO
- **Úroveň baterie**: zbývající kapacita baterie v procentech
- **Výsledek autotestu**: výsledek pravidelného automatického autotestu
- **Teplota**: naměřená okolní teplota

## Integrace s HARDWARIO {#hardwario-integration}

Detektor ORIGIN+ se do řešení HARDWARIO začlení přes LoRaWAN:

1. **Síťový server LoRaWAN**: Zaregistrujte detektor ORIGIN+ v [ChirpStack](/apps/chirpstack/index) nebo [The Things Stack](/apps/the-things-stack/index).
2. **HARDWARIO Cloud**: Dekódované payloady přeposílejte do HARDWARIO Cloud, kde spravujete alarmy a reporty.
3. **Nasazení ve více budovách**: Detektory ORIGIN+ na více podlažích nebo v několika budovách sledujete z jednoho dashboardu.

## Zdroje {#resources}

- [Produktová stránka Nexelec ORIGIN+](https://nexelec.fr/)
- [Produkty Nexelec v e-shopu HARDWARIO Store](https://www.hardwario.store/cz/smart-devices)
- [Integrace s ChirpStack](/apps/chirpstack/index)
- [Integrace s The Things Stack](/apps/the-things-stack/index)
