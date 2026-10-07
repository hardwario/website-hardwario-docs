---
slug: tools
title: Nástroje
title_meta: "Nástroje (HARDWARIO Manager pro STICKER)"
---

# Nástroje {#tools}

**STICKER → Tools** sdružuje akce, které pracují se zařízením přímo, ne přes jeho
konfiguraci.

| Nástroj | Co dělá |
|---|---|
| **Sync time** | Nastaví hodiny zařízení podle telefonu |
| [**1-Wire sensors**](./one-wire-sensors.md) | Prohledá sběrnici 1-Wire a přiřadí senzory ke slotům |
| [**Sample data**](./sample-data.md) | Okamžitě přečte všechny senzory a hodnoty odešle |
| [**Sensor history**](./sensor-history.md) | Přečte měření, která zařízení uložilo dříve |
| **Calibration mode** | Restartuje zařízení do servisního režimu kalibrace senzorů |
| [**Reset**](./reset.md) | Resety od prostého restartu až po factory reset |
| **Vendor changes** | Změní secret key nebo provede vendor reset, viz [**Reset zařízení**](./reset.md) |

---

## Sync time {#sync-time}

Zvolte **Sync time** a přiložte telefon k zařízení STICKER. Hodiny zařízení se
nastaví podle telefonu.

Teprve se synchronizovanými hodinami mají uložená měření absolutní časové
značky. Bez nich [**Historie senzorů**](./sensor-history.md) uvádí čas záznamů
jen relativně k okamžiku čtení.

---

## Calibration mode {#calibration-mode}

Zvolte **Calibration mode** a přiložte telefon k zařízení STICKER. Zařízení se
restartuje do servisního režimu kalibrace senzorů.

Jde o servisní akci pro kalibraci senzoru podle reference. Zařízení se potom
vrátí do běžného provozu.

---

## NFC Console {#nfc-console}

Pokud je zapnutý [**ladicí režim**](../settings.md) (**Debug mode**), obsahuje
nabídka Tools navíc **NFC Console**, nízkoúrovňovou konzoli pro surové příkazy NFC
určenou k diagnostice. Pro běžnou konfiguraci ji nepotřebujete.
