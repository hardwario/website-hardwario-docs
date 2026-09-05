---
slug: sticker-motion
title: STICKER Motion
description: "STICKER Motion používá standardní vzory stavové LED popsané v Signalizace LED. Startovní karusel, stavový heartbeat každé 3 sekundy i vzory pro NFC a alarmy jsou u všech aplikací STICKER stejné."
---
import Image from '@theme/IdealImage';

# STICKER Motion {#sticker-motion}

**STICKER Motion** je kompaktní bezdrátový detektor pohybu LoRaWAN postavený pro provoz s extrémně nízkou spotřebou. Napájený dvěma bateriemi AA používá přesný senzor PIR k detekci pohybu a odesílání událostí, což ho předurčuje pro zabezpečení, monitorování objektů, retailovou analytiku a sledování logistiky.

![STICKER Motion](../../../../../sticker/catalog-applications/images/sticker-motion-top.png)

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](https://docs.hardwario.com/sticker/first-steps): Postup zprovoznění krok za krokem.
* [**Koupit STICKER Motion**](https://www.hardwario.store/p/sticker-motion): Nákup v našem obchodě.
* [**Objednací kódy**](https://docs.hardwario.com/sticker/ordering-codes): Seznam součástek a jejich objednacích čísel.
* [**Popis hardwaru**](https://docs.hardwario.com/sticker/hardware-description): Technické detaily a přehled hardwaru.
* [**Oficiální stránka produktu**](https://www.hardwario.com/products/sticker/): Funkce a přehled.

## Typická použití {#typical-use-cases}

#### Optimalizace pohybu v průmyslových prostorách {#optimizing-movement-in-industrial-spaces}
- Monitorování uliček v průmyslových prostorách pomáhá optimalizovat logistické trasy pro tok materiálu i hotových výrobků. Snižuje prostoje a minimalizuje bezpečnostní rizika z přeplněných cest a nepředvídatelného pohybu.

#### Chytřejší rozvržení prodejny díky datům o pohybu {#smarter-store-layouts-with-motion-data}
- V retailu znalost toho, kudy a jak často se zákazníci pohybují, proměňuje plánování rozvržení prodejny a zvyšuje prodeje. Se STICKER Motion můžete sledovat provoz v uličkách a určit nejfrekventovanější místa, a tím optimalizovat umístění produktů a zlepšit zážitek z nákupu.

#### Chytřejší komfort v rušných prostorách {#smarter-comfort-in-busy-spaces}
- Průměrný člověk vyzáří asi 100 W tepla za hodinu. V místech s vysokou frekvencí lidí, jako jsou čekárny, pomáhá sledování pohybu, teploty a vlhkosti udržet komfort i efektivitu. STICKER Motion snímá všechny tři veličiny pro chytřejší regulaci klimatu.

## Ukázková zpráva JSON {#example-json-message}

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

```json
{
  "event": "motion",
  "voltage": 3.01,
  "battery": 98,
  "orientation": 1,
  "acceleration_x": 12,
  "acceleration_y": -45,
  "acceleration_z": 1020,
  "count": 5
}
```

</p>
</details>

## Stavová LED {#status-led}

STICKER Motion používá standardní vzory stavové LED popsané v [**Signalizace LED**](/sticker/hardware-description#led-indication). Startovní karusel, stavový heartbeat každé 3 sekundy i vzory pro NFC a alarmy jsou u všech aplikací STICKER stejné.

Jeden detail je pro tuhle aplikaci specifický: detektor PIR a akcelerometr jsou **momentové** senzory, takže hlásí vždy jen aktivaci, nikdy návrat do klidu. Každá detekovaná pohybová událost proto zobrazí sekvenci aktivace **zelená, pak oranžová** a sekvenci uvolnění oranžová-pak-zelená na téhle jednotce nikdy neuvidíte.

:::warning
Blikání při pohybových událostech je pomůcka pro uvedení do provozu a **hodinu po zapnutí se zastaví**. Zařízení, které už při pohybu nebliká, ho stále detekuje a hlásí. Pokud potřebujete vizuální potvrzení zpět kvůli testování, jednotku vypněte a zapněte.
:::

## Seznam změn {#changelog}

### 2025-11-23 – v1.0.0 {#2025-11-23--v100}

- První vydání: detekce pohybu PIR s akcelerometrem a hlášením orientace přes LoRaWAN

:::info

Kompletní přehled všech změn platformy najdete v [**seznamu změn STICKER**](/sticker/changelog).

:::
