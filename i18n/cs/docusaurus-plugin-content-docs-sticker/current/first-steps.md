---
slug: first-steps
title: Rychlý průvodce
description: "Vítejte! Tato stránka vám pomůže zařízení STICKER zapnout, zprovoznit a aktivovat a připojit ho k vámi zvolenému síťovému serveru LoRaWAN (ChirpStack, The Things Stack nebo vlastní backend)."
---
import Image from '@theme/IdealImage';

# Rychlý průvodce zařízením STICKER {#sticker-quick-start-guide}

Vítejte! Tato stránka vám pomůže zařízení STICKER **zapnout, zprovoznit a aktivovat** a připojit ho k vámi zvolenému síťovému serveru LoRaWAN (ChirpStack, The Things Stack nebo vlastní backend).

---

## Než začnete {#before-you-start}

#### Co je STICKER {#what-sticker-is}

**STICKER** je otevřená IoT platforma založená na SoC STM32WL s integrovanou konektivitou LoRaWAN a softwarově volitelným proprietárním režimem **LoRa P2P**. Jde o kompaktní senzorovou platformu na baterie postavenou na Zephyr RTOS, na které běží katalogové aplikace jako STICKER Clime, Input a Motion.

Technické detaily najdete v [**popisu hardwaru**](hardware-description).

#### Co budete potřebovat {#you-will-need}
- **Zařízení STICKER** (varianta Clime / Input / Motion)
- **2× baterii AA** (alkalickou nebo lithiovou, 1,5 V)
- **Bránu LoRaWAN** v dosahu
- **Síťový server LoRaWAN** (ChirpStack / TTS / vlastní LNS)
- Telefon s **NFC** a nainstalovanou aplikací [**HARDWARIO Manager**](hardwario-manager)

#### Užitečné odkazy {#useful-links}
- Průvodce mobilní aplikací pro NFC: [**HARDWARIO Manager**](hardwario-manager)
- Dekodér STICKER: [ttn.js na GitHubu](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)
- Rozcestník datasheetů HARDWARIO: [hardwario.com/resources/datasheets](https://www.hardwario.com/resources/datasheets)

---

## Krok 1: Určete variantu svého zařízení STICKER {#step-1-identify-your-sticker-variant}

Zařízení STICKER přichází s předinstalovanou jednou z katalogových aplikací:

- **STICKER Clime**: Monitorování teploty, vlhkosti, osvětlení a barometrického tlaku.  
  [Dokumentace →](catalog-applications/sticker-clime)
- **STICKER Input**: Externí senzory (1-Wire, Machine Probe) a průmyslové vstupy (pulzy S0, logika 0–30 V).  
  [Dokumentace →](catalog-applications/sticker-input)
- **STICKER Motion**: Detekce pohybu PIR s extrémně nízkou spotřebou a sledování zrychlení ve třech osách.  
  [Dokumentace →](catalog-applications/sticker-motion)

---

## Krok 2: Zapnutí a výchozí stav z výroby (v1.4.0+) {#step-2-power-up--understand-factory-defaults-v140}

1. **Otevřete krabičku** a vložte dvě baterie AA podle značek polarity.
2. Sledujte **startovní sekvenci LED**: červená (0,5 s) → žlutá (0,5 s) → zelená (1,5 s).

:::note Výchozí stav z výroby: režim Radio-Silent
Od firmwaru **v1.4.0** se zařízení STICKER dodává v **režimu Radio-Silent** (`radio-mode` vypnutý), aby se baterie nevybíjela během přepravy. Zařízení se po vložení baterií **nepokusí** automaticky připojit k LoRaWAN, dokud ho neaktivujete přes NFC.
:::

3. **Signalizace stavovou LED:** Po startu bude LED blikat **1× žlutě každé 3 sekundy**, což znamená, že zařízení běží normálně, ale radio je vypnuté.

---

## Krok 3: Konfigurace a aktivace přes NFC {#step-3-configure--activate-via-nfc}

Zařízení STICKER používá pro lokální konfiguraci šifrované NFC. Konfigurace funguje i bez vložených baterií díky **sběru energie z NFC**.

:::tip Nastavení mobilní aplikace
Kompletní pokyny k získání klíčů pro zprovoznění, nastavení parametrů a správě šablon najdete v průvodci [**HARDWARIO Manager**](hardwario-manager).
:::

1. Otevřete v telefonu aplikaci [**HARDWARIO Manager**](hardwario-manager).
2. Přečtěte informace o zařízení a získejte výrobní **DevEUI**, **AppEUI/JoinEUI** a **claim token**.
3. Nastavte parametry LoRaWAN (DevEUI, AppEUI, AppKey, režim aktivace).
4. Přiložte telefon ke krabičce STICKER a zapište nastavení:
   - Zápis konfigurace automaticky **zapne `radio-mode`** a vyvolá připojení k LoRaWAN.
   - Stavový heartbeat LED se změní z **1× žluté** (radio vypnuté) na **žlutou + červenou** (připojování).
   - Po úspěšném připojení přejde LED na heartbeat **1× zelené** a odešle payload **Device Info on Join**.

---

## Krok 4: Registrace na síťovém serveru LoRaWAN {#step-4-register-on-your-lorawan-network-server}

### ChirpStack v4 {#chirpstack-v4}
1. Zaregistrujte zařízení pomocí DevEUI, JoinEUI a AppKey získaných z aplikace [**HARDWARIO Manager**](hardwario-manager).
2. Přiřaďte dekodér payloadu STICKER.
3. Postupujte podle úplného průvodce: [integrace s LNS ChirpStack](connectivity/lorawan-chirpstack).

### The Things Stack (TTS / TTN) {#the-things-stack-tts--ttn}
1. Přidejte nové koncové zařízení pomocí klíčů OTAA nebo ABP získaných z aplikace [**HARDWARIO Manager**](hardwario-manager).
2. Naimportujte dekodér payloadu.
3. Postupujte podle úplného průvodce: [integrace s The Things Stack](connectivity/lorawan-tts).

---

## Krok 5: Kontrola po uvedení do provozu {#step-5-post-commissioning-verification}

Po registraci a připojení:

- **Zkontrolujte uplinky:** Ověřte, že na dashboard vašeho LNS dorazil počáteční uplink **Device Info** (verze firmwaru, stav baterie, příčina resetu) i pravidelné pakety s daty ze senzorů.
- **Zkontrolujte stav LED:** Jedno zelené bliknutí každé 3 sekundy potvrzuje kvalitní spojení se sítí a bezproblémový provoz.
- **Upravte intervaly:** Vzorkovací a uplinkové intervaly dolaďte přes NFC v aplikaci [**HARDWARIO Manager**](hardwario-manager) nebo downlink příkazy LoRaWAN (fPort 85).

:::info Zapojení vstupů STICKER Input
Pokud používáte **STICKER Input**, projděte si před připojením externích sond pokyny ke svorkovnici a DIP přepínačům: [průvodce zapojením STICKER Input](sticker-input-wiring/index.md).
:::

---

## Kontrolní seznam při potížích {#troubleshooting-checklist}

- **Zařízení nesvítí (chybí startovní karusel LED)?** Zkontrolujte orientaci baterií nebo je vyměňte.
- **LED bliká nekonečně 1× žlutě?** Radio je v režimu Radio-Silent. Aktivujte vysílání aplikací konfigurace přes NFC pomocí [**HARDWARIO Manager**](hardwario-manager).
- **LED bliká žlutě + červeně?** Zařízení se pokouší připojit k síti, ale nedostává odpověď. Zkontrolujte vzdálenost od brány, frekvenční plán a shodu AppKey.
- **LED bliká červeně + žlutě (střídavě)?** Konfigurace je poškozená. Nastavte zařízení znovu přes NFC pomocí [**HARDWARIO Manager**](hardwario-manager).
- **Nepřicházejí žádné uplinky?** Zkontrolujte, že je v ChirpStacku nebo TTS správně přiřazený dekodér payloadu.
