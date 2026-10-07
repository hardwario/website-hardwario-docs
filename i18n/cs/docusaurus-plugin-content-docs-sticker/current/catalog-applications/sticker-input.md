---
slug: sticker-input
title: STICKER Input
---
import Image from '@theme/IdealImage';

# STICKER Input {#sticker-input}

**STICKER Input** je kompaktní bezdrátový modul LoRaWAN pro připojení externích senzorů a čtení digitálních nebo analogových signálů. Napájejí ho dvě baterie AA. Podporuje teplotní sondy 1-Wire, měření napětí a proudu i sledování digitálních vstupů do 30 V, a proto se hodí pro nejrůznější průmyslové a monitorovací aplikace.

![STICKER Input](../../../../../sticker/catalog-applications/images/sticker-input-top.png)

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](/sticker/first-steps): Zprovoznění krok za krokem.
* [**Koupit STICKER Input**](https://www.hardwario.store/p/sticker-input): Nákup v našem e-shopu.
* [**Objednací kódy**](/sticker/ordering-codes): Seznam součástí a jejich objednacích čísel.
* [**Popis hardwaru**](/sticker/hardware-description): Technické údaje a přehled hardwaru.
* [**Oficiální stránka produktu**](https://www.hardwario.com/products/sticker/): Funkce a přehled.

## Typická použití {#typical-use-cases}

#### Chytré sledování teploty {#smart-temperature-monitoring}
- Některé výrobní procesy vyžadují sledování teploty v extrémních rozsazích, které běžná elektronika nezvládne. V takových případech jsou nezbytné externí senzory, například teplotní sondy 1-Wire. K jedné datové lince lze připojit až 10 senzorů, takže měření může být podrobné a snadno se rozšiřuje.

#### Digitalizace starších strojů {#digitizing-legacy-machines}
- Digitalizovat starší stroje bývá složité, i když stále spolehlivě fungují. Mnohé mají digitální výstup 24 V, případně lze poblíž výstupního mechanismu doplnit indukční senzor, který zachytí každý vyrobený kus. Kusy se pak jednoduše počítají z digitálních signálů.

#### Chytrá detekce otevření/zavření {#smart-openclose-detection}
- Detekce dveří a oken neslouží jen k zabezpečení: je také klíčová pro chytré vytápění a chlazení. Tradiční systémy mohou být kvůli přísným certifikačním standardům drahé. STICKER Input nabízí jednoduchou a cenově dostupnou alternativu s vestavěným senzorem magnetického pole nebo digitálními vstupy pro běžné spínače.

## Konfigurace a zapojení externích vstupů {#configuration-and-wiring-of-external-inputs}

Dokumentace → [**Zapojení vstupů STICKER Input**](/sticker/sticker-input-wiring/sticker-input-wiring)

Stránka popisuje zapojení vstupů zařízení STICKER Input včetně nastavení přepínačů DIP a podporovaných režimů, jako jsou senzory 1-Wire, vstupy pro bezpotenciálové kontakty a analogové vstupy 0–24 V.

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

STICKER Input používá standardní vzory stavové LED popsané v kapitole [**Signalizace LED**](/sticker/hardware-description#led-indication). Startovní sekvence, stavový heartbeat každé 3 sekundy i vzory pro NFC a alarmy jsou u všech aplikací STICKER stejné.

Právě tato aplikace digitální vstupy a Hallovy spínače skutečně využívá, a proto je u ní nejdůležitější signalizace **aktivace vstupu**. Tyto vstupy hlásí oba směry, takže z pořadí barev poznáte, ke které hraně došlo:

| Událost | Vzor |
|---|---|
| Vstup se aktivuje (kontakt se sepne, magnet se přiblíží) | Zelená, pak oranžová |
| Vstup se vrátí do klidu (kontakt se rozepne, magnet se vzdálí) | Oranžová, pak zelená |

Zapojení a nastavení přepínačů DIP tak ověříte přímo na místě, bez konzole a bez připojení k síti: aktivujte vstup a sledujte pořadí obou barev.

:::warning
Blikání při aktivaci vstupu je pomůcka pro uvádění do provozu a **skončí hodinu po zapnutí napájení**. Počítání a hlášení pokračují normálně. Pokud vizuální potvrzení při testování potřebujete znovu, odpojte zařízení od napájení a znovu ho připojte.
:::

## Seznam změn {#changelog}

### 2025-11-23 – v1.0.0 {#2025-11-23--v100}

- První vydání: digitální vstupy, počítání impulzů, teplotní sondy 1-Wire a analogové měření přes LoRaWAN

:::info

Úplný přehled všech změn platformy najdete v [**seznamu změn STICKER**](/sticker/changelog).

:::
