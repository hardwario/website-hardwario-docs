---
slug: sticker-input
title: STICKER Input
description: "Dokumentace → Zapojení STICKER Input"
---
import Image from '@theme/IdealImage';

# STICKER Input {#sticker-input}

**STICKER Input** je kompaktní bezdrátový modul LoRaWAN pro připojení externích senzorů a čtení digitálních nebo analogových signálů. Napájí se dvěma bateriemi AA a podporuje teplotní sondy 1-Wire, měření napětí a proudu a sledování digitálních vstupů až do 30 V, což z něj dělá univerzální nástroj pro průmyslové a monitorovací aplikace.

![STICKER Input](../../../../../sticker/catalog-applications/images/sticker-input-top.png)

## Rychlé odkazy {#quick-links}

* [**Průvodce prvními kroky**](https://docs.hardwario.com/sticker/first-steps) – Podrobný návod k nastavení.
* [**Koupit STICKER Input**](https://www.hardwario.store/p/sticker-input) – Nákup v našem obchodě.
* [**Objednací kódy**](https://docs.hardwario.com/sticker/ordering-codes) - Seznam komponent a objednacích čísel.
* [**Popis hardwaru**](https://docs.hardwario.com/sticker/hardware-description) - Technické detaily a přehled hardwaru.
* [**Oficiální stránka produktu**](https://www.hardwario.com/products/sticker/) – Vlastnosti a přehled.

## Typické případy použití {#typical-use-cases}

#### Chytré sledování teploty {#smart-temperature-monitoring}
- Některé výrobní procesy vyžadují sledování teploty v extrémních rozsazích, které běžná elektronika nezvládne. V takových případech jsou nezbytné externí senzory – například teplotní sondy 1-Wire. K jedné datové lince lze připojit až 10 senzorů, což umožňuje detailní a snadno rozšiřitelné měření.

#### Digitalizace starších strojů {#digitizing-legacy-machines}
- Digitalizace starších strojů může být oříšek, i když stále spolehlivě fungují. Mnohé nabízejí digitální výstup 24 V, případně lze poblíž výstupního mechanismu doplnit indukční senzor, který detekuje každý vyrobený kus. To umožňuje jednoduché počítání kusů pomocí digitálních signálů.

#### Chytrá detekce otevření/zavření {#smart-openclose-detection}
- Detekce dveří a oken neslouží jen k zabezpečení – je také klíčová pro chytré vytápění a chlazení. Tradiční systémy mohou být kvůli přísným certifikačním standardům drahé. STICKER Input nabízí jednoduchou a cenově dostupnou alternativu s vestavěným senzorem magnetického pole nebo digitálními vstupy pro běžné spínače.

## Konfigurace a zapojení externích vstupů {#configuration-and-wiring-of-external-inputs}

Dokumentace → [**Zapojení STICKER Input**](/sticker/sticker-input-wiring/sticker-input-wiring)

Zde najdete informace o zapojení vstupů zařízení STICKER Input, včetně nastavení DIP přepínačů a podporovaných režimů, jako jsou senzory 1-Wire, vstupy pro bezpotenciálové kontakty a analogové vstupy 0–24 V.

## Ukázková zpráva JSON {#example-json-message}

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

```json
{
  "event": "change",
  "voltage": 3.01,
  "battery": 98,
  "orientation": 1,
  "input_1_state": true,
  "input_1_count": 120,
  "input_2_state": false,
  "input_2_count": 0
}
```

</p>
</details>

## Stavová LED {#status-led}

STICKER Input používá standardní vzory stavové LED popsané v kapitole [**Indikace LED**](/sticker/hardware-description#led-indication) – startovací karusel, stavový heartbeat každé 3 sekundy a vzory pro NFC a alarm jsou u všech aplikací STICKER shodné.

Protože právě tato aplikace skutečně využívá digitální vstupy a Hallovy senzory, má zde největší význam indikace **aktivace vstupu**. Tyto vstupy hlásí oba směry, takže pořadí barev prozradí, ke které hraně došlo:

| Událost | Vzor |
|---|---|
| Vstup se stane aktivním – kontakt se sepne, magnet se přiblíží | Zelená, poté oranžová |
| Vstup se vrátí do neaktivního stavu – kontakt se rozepne, magnet se vzdálí | Oranžová, poté zelená |

Díky tomu lze zapojení a nastavení DIP přepínačů ověřit přímo na místě bez konzole nebo připojení k síti: aktivujte vstup a sledujte pořadí obou barev.

:::warning
Blikání při aktivaci vstupu je pomůcka pro uvedení do provozu a **skončí hodinu po zapnutí napájení**. Počítání a hlášení pokračují normálně – pokud během testování potřebujete vizuální potvrzení znovu, jednotku vypněte a zapněte.
:::

## Seznam změn {#changelog}

### 2025-11-23 — v1.0.0 {#2025-11-23--v100}

- První vydání — digitální vstupy, počítání pulzů, teplotní sondy 1-Wire a analogové měření přes LoRaWAN

:::info

Kompletní přehled všech změn platformy najdete v [**seznamu změn STICKER**](/sticker/changelog).

:::
