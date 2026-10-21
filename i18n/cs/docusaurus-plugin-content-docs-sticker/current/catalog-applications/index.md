---
slug: catalog-applications
title: Varianty STICKER
description: "HARDWARIO STICKER je k dispozici ve třech hotových funkčních variantách: STICKER Clime, STICKER Input a STICKER Motion."
---
import Image from '@theme/IdealImage';

# Varianty STICKER {#sticker-variants}

Zařízení HARDWARIO STICKER je k dispozici ve třech hotových funkčních variantách: **STICKER Clime**, **STICKER Input** a **STICKER Motion**. Všechny varianty mají společnou platformu STM32WL, vydrží několik let na dva články AA, nastavují se šifrovaně přes NFC a dají se plně spravovat na dálku přes LoRaWAN (fPort 85) nebo LoRa P2P.

---

## Porovnání variant {#variant-comparison}

| Varianta | Hlavní účel | Integrované senzory / vstupy | Externí rozšíření | Klíčová použití |
|---|---|---|---|---|
| [**STICKER Clime**](/sticker/catalog-applications/sticker-clime/) | Monitorování prostředí | Teplota, relativní vlhkost, osvětlenost, barometrický tlak | — | Sledování klimatu v interiéru, chladový řetězec, skleníky, čisté prostory |
| [**STICKER Input**](/sticker/catalog-applications/sticker-input/) | Rozhraní pro průmyslová zařízení a sondy | Teplota, relativní vlhkost, 2× externí vstup (každý digitální, analogový 0–24 V nebo čítač impulzů S0) | Sběrnice 1-Wire (Dallas, Machine Probe), čítače impulzů S0 | Odečet měřičů energií, stav stroje, sledování průmyslových PLC |
| [**STICKER Motion**](/sticker/catalog-applications/sticker-motion/) | Detekce přítomnosti a pohybu | Detektor pohybu PIR, tříosý akcelerometr, dva Hallovy spínače | — | Zabezpečení budov, obsazenost prostor, monitorování dveří, pohyb majetku |

---

## Přehled variant {#overview-of-variants}

### STICKER Clime {#sticker-clime}

**STICKER Clime** slouží k přesnému sledování mikroklimatu v budovách, skladech a průmyslových objektech.

* **Integrované senzory:** Senzor Sensirion SHT40 (**±0,2 °C** teplota, **±2 %** vlhkost), senzor okolního světla OPT3001 a senzor barometrického tlaku MPL3115A2.
* **Hlavní přínos:** Úplný přehled o kvalitě prostředí a okolních podmínkách, bez kabelů k externím senzorům.
* **Novinky ve v2.0:** Teplotu, vlhkost, tlak, osvětlenost i vlastní teplotu barometru lze použít v pravidlech alarmů a ukládat do historie. Vestavěný senzor teploty a vlhkosti se dá vypnout parametrem `cap-sht`. U prahových pravidel je `dwell` nově pásmo hystereze v jednotkách daného kanálu (například °C), ne čas v sekundách.

→ [**Více o STICKER Clime**](/sticker/catalog-applications/sticker-clime/)

---

### STICKER Input {#sticker-input}

**STICKER Input** připojuje externí průmyslové senzory, čte čítače impulzů a měří digitální nebo analogové signály.

* **Vstupy a rozhraní:** Svorkovnice pro 2 externí vstupy, z nichž každý lze nastavit jako digitální vstup, analogový vstup 0–24 V nebo čítač impulzů (například z výstupu S0 elektroměru, plynoměru nebo vodoměru), a sběrnice 1-Wire.
* **Podporované sondy:** Až čtyři senzory 1-Wire ve slotech 1–4: teploměry Dallas DS18B20 a průmyslové senzory HARDWARIO Machine Probe.
* **Hlavní přínos:** Univerzální převodník pro zapojení existující průmyslové infrastruktury a měřičů médií do sítí LoRaWAN.
* **Novinky ve v2.0:** Analogové měření 0–24 V a počítání impulzů S0 na externích vstupech, očekávaný typ senzoru pro každý slot 1-Wire s alarmem `sensor_mismatch` a rozpoznání sondy připojené až po zapnutí do slotu, který na ni čeká.

→ [**Více o STICKER Input**](/sticker/catalog-applications/sticker-input/)

---

### STICKER Motion {#sticker-motion}

**STICKER Motion** kombinuje pasivní infračervený senzor pohybu, akcelerometr a magnetické dveřní spínače, takže pokryje sledování objektů i majetku.

* **Integrované senzory:** Senzor PIR PYD1698 (dosah detekce 5 m, zorný úhel **≥ 50°**), tříosý akcelerometr LIS2DH12 (náklon, vibrace, detekce volného pádu) a dva Hallovy spínače A1266 pro detekci otevření dveří či okna.
* **Hlavní přínos:** Okamžitá detekce přítomnosti osob a fyzické manipulace při minimální spotřebě.
* **Novinky ve v2.0:** Pravidla alarmů pro PIR a akcelerometr umí sledovat celou epizodu pohybu (jeden alarm pro *začátek* a *konec pohybu*) nebo hlásit *klid*, například u stroje, který musí ohlásit, že přestal vibrovat.

→ [**Více o STICKER Motion**](/sticker/catalog-applications/sticker-motion/)
