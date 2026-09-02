---
slug: origin-plus
title: "ORIGIN+"
description: Multisenzorový požární detektor Nexelec ORIGIN+ s LoRaWAN a detekcí kouře, tepla a CO. Certifikace NF a CE.
---

# Nexelec ORIGIN+ {#nexelec-origin}

![Nexelec ORIGIN+](/img/smart-devices/nexelec-origin-plus.webp)

**ORIGIN+** je multisenzorový požární detektor s LoRaWAN od [Nexelec](https://nexelec.fr/), který v jednom certifikovaném zařízení kombinuje detekci kouře, tepla a CO. Je určen pro monitorování požární bezpečnosti budov se vzdálenou správou alarmů přes LoRaWAN.

## Klíčové parametry {#key-specifications}

| Parametr | Hodnota |
|---|---|
| Detekce | Optická detekce kouře (EN 14604), teplo, CO |
| Konektivita | LoRaWAN Class A (EU868) |
| Baterie | Životnost baterie 10 let (nevyměnitelná) |
| Výstup alarmu | Lokální bzučák + uplink přes LoRaWAN |
| Certifikace | NF (francouzská norma), CE, EN 14604 |
| Montáž | Na strop (magneticky nebo šrouby) |
| Rozměry | Kompaktní kruhový design |

## Data přes LoRaWAN {#lorawan-data}

ORIGIN+ posílá uplinky při alarmových událostech a periodické stavové zprávy, které obsahují:

- **Stav alarmu**: stav alarmu kouře / tepla / CO
- **Úroveň baterie**: zbývající kapacita baterie v procentech
- **Výsledek autotestu**: stav periodického automatického autotestu
- **Teplota**: měření okolní teploty

## Integrace s HARDWARIO {#hardwario-integration}

Zařízení ORIGIN+ lze do instalací HARDWARIO integrovat přes LoRaWAN:

1. **LoRaWAN Network Server**: Zaregistrujte zařízení ORIGIN+ v [ChirpStack](/apps/chirpstack/index) nebo [The Things Stack](/apps/the-things-stack/index).
2. **HARDWARIO Cloud**: Přeposílejte dekódované payloady do HARDWARIO Cloud pro správu alarmů a reporting.
3. **Nasazení ve více budovách**: Sledujte zařízení ORIGIN+ napříč několika podlažími nebo budovami z jediného dashboardu.

## Zdroje {#resources}

- [Stránka produktu Nexelec ORIGIN+](https://nexelec.fr/)
- [Produkty Nexelec v HARDWARIO Store](https://www.hardwario.store/cz/smart-devices)
- [Integrace s ChirpStack](/apps/chirpstack/index)
- [Integrace s The Things Stack](/apps/the-things-stack/index)
