---
slug: catalog-applications
title: Varianty STICKER
description: "Zařízení HARDWARIO STICKER je k dispozici ve třech hotových funkčních variantách: STICKER Clime, STICKER Input a STICKER Motion. Všechny varianty mají společnou platformu STM32WL, několikaletý provoz na 2× článek AA, šifrovanou konfiguraci přes NFC a…"
---
import Image from '@theme/IdealImage';

# Varianty STICKER {#sticker-variants}

Zařízení HARDWARIO STICKER je k dispozici ve třech hotových funkčních variantách: **STICKER Clime**, **STICKER Input** a **STICKER Motion**. Všechny varianty mají společnou platformu STM32WL, několikaletý provoz na 2× článek AA, šifrovanou konfiguraci přes NFC a plnou vzdálenou správu přes LoRaWAN (fPort 85).

---

## Porovnání variant {#variant-comparison}

| Varianta | Hlavní účel | Integrované senzory / vstupy | Externí rozšíření | Klíčová použití |
|---|---|---|---|---|
| [**STICKER Clime**](/sticker/catalog-applications/sticker-clime/) | Monitorování prostředí | Teplota, relativní vlhkost, okolní osvětlení, barometrický tlak | — | Sledování klimatu v interiéru, chlazený dodavatelský řetězec, skleníky, čisté prostory |
| [**STICKER Input**](/sticker/catalog-applications/sticker-input/) | Průmyslové a sondové rozhraní | Teplota, relativní vlhkost, 2× digitální/napěťový vstup (0–30 V) | Sběrnice 1-Wire (Dallas, Machine Probe), pulzní čítače S0 | Odečet měřičů energií, stav stroje, monitorování průmyslových PLC |
| [**STICKER Motion**](/sticker/catalog-applications/sticker-motion/) | Detekce přítomnosti a pohybu | Detektor pohybu PIR, tříosý akcelerometr, dva Hallovy kontakty | — | Zabezpečení budov, obsazenost prostor, monitorování dveří, pohyb majetku |

---

## Přehled variant {#overview-of-variants}

### STICKER Clime {#sticker-clime}

**STICKER Clime** je určený pro přesné monitorování mikroklimatu v budovách, skladech a průmyslových objektech.

* **Integrované senzory:** Senzor Sensirion SHT43 (**±0,2 °C** teplota, **±2 %** vlhkost), senzor okolního osvětlení OPT3001 a senzor barometrického tlaku MPL3115A2.
* **Hlavní přínos:** Kompletní přehled o kvalitě prostředí a okolních podmínkách bez potřeby kabelů k externím senzorům.
* **Novinky ve v1.4.0:** Ukládání historie do flash paměti (store-and-forward) během výpadků sítě a konfigurovatelné prahové alarmy s okamžitým hlášením na fPort 3.

→ [**Více o STICKER Clime**](/sticker/catalog-applications/sticker-clime/)

---

### STICKER Input {#sticker-input}

**STICKER Input** připojuje externí průmyslové senzory, čte pulzní čítače a měří digitální nebo analogové signály.

* **Vstupy a rozhraní:** Svorkovnice pro 2 digitální/napěťové vstupy (až 30 V DC), podpora rozhraní S0 pro odečet elektroměrů, plynoměrů nebo vodoměrů a sběrnice 1-Wire.
* **Podporované sondy:** Automatické nalezení senzorů 1-Wire (Dallas DS18B20) a průmyslových senzorů HARDWARIO Machine Probe.
* **Hlavní přínos:** Univerzální převodník pro zapojení existující průmyslové infrastruktury a měřičů médií do sítí LoRaWAN.

→ [**Více o STICKER Input**](/sticker/catalog-applications/sticker-input/)

---

### STICKER Motion {#sticker-motion}

**STICKER Motion** kombinuje pasivní infračervený senzor pohybu, akcelerometr a magnetické dveřní kontakty pro kompletní sledování objektu i majetku.

* **Integrované senzory:** Senzor PIR PYD1698 (dosah detekce 5 m, zorný úhel **≥ 50°**), tříosý akcelerometr LIS2DH12 (náklon, vibrace, detekce volného pádu) a dva Hallovy kontakty A1266 pro detekci otevření dveří či okna.
* **Hlavní přínos:** Okamžitá detekce přítomnosti osob a fyzické manipulace při minimální spotřebě.
* **Novinky ve v1.4.0:** Konfigurovatelný parametr `dwell` v pravidlech alarmů pro potlačení falešných poplachů způsobených zakmitáváním vstupu nebo opotřebením kontaktu.

→ [**Více o STICKER Motion**](/sticker/catalog-applications/sticker-motion/)
