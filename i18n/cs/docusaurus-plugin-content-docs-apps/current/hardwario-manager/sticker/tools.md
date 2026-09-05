---
slug: tools
title: Nástroje
description: "konfiguraci."
---

# Nástroje {#tools}

**STICKER → Tools** sdružuje akce, které pracují se zařízením přímo, ne přes jeho
konfiguraci.

| Nástroj | Co dělá |
|---|---|
| **Sync time** | Nastaví hodiny zařízení podle telefonu |
| [**1-Wire sensors**](./one-wire-sensors.md) | Prohledá sběrnici 1-Wire a přiřadí senzory do slotů |
| [**Sample data**](./sample-data.md) | Přečte hned všechny senzory a hodnoty odešle |
| [**Sensor history**](./sensor-history.md) | Přečte měření, která zařízení uložilo dříve |
| **Calibration mode** | Restartuje zařízení do servisního režimu kalibrace senzorů |
| [**Reset**](./reset.md) | Žebříček resetů, od restartu po factory reset |
| **Vendor changes** | Změní secret key nebo provede vendor reset, viz [**Reset zařízení**](./reset.md) |

---

## Sync time {#sync-time}

Zvolte **Sync time** a přiložte telefon k zařízení STICKER. Hodiny zařízení se
nastaví podle telefonu.

Právě synchronizované hodiny umožňují, aby uložená měření nesla absolutní časové
značky. Bez nich umí [**Historie senzorů**](./sensor-history.md) hlásit záznamy
jen relativně k okamžiku odečtu.

---

## Calibration mode {#calibration-mode}

Zvolte **Calibration mode** a přiložte telefon k zařízení STICKER. Zařízení se
restartuje do servisního režimu kalibrace senzorů.

Jde o servisní akci, která se používá, když je potřeba senzor zkalibrovat proti
referenci. Zařízení se potom vrátí do normálního provozu.

---

## NFC Console {#nfc-console}

Pokud je zapnutý [**Debug mode**](../settings.md), zobrazí Tools navíc
**NFC Console**, nízkoúrovňovou konzoli pro surové příkazy NFC, používanou
k diagnostice. Pro běžnou konfiguraci není potřeba.
