---
slug: sticker-motion
title: STICKER Motion
---
import Image from '@theme/IdealImage';

# STICKER Motion {#sticker-motion}

**STICKER Motion** je kompaktní bezdrátový detektor pohybu LoRaWAN s extrémně nízkou spotřebou. Napájejí ho dvě baterie AA; přesným senzorem PIR detekuje pohyb a odesílá události, takže se hodí pro zabezpečení, sledování objektů, analytiku v maloobchodě a sledování logistiky.

![STICKER Motion](../../../../../sticker/catalog-applications/images/sticker-motion-top.png)

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](/sticker/first-steps): Zprovoznění krok za krokem.
* [**Koupit STICKER Motion**](https://www.hardwario.store/p/sticker-motion): Nákup v našem e-shopu.
* [**Objednací kódy**](/sticker/ordering-codes): Seznam součástí a jejich objednacích čísel.
* [**Popis hardwaru**](/sticker/hardware-description): Technické údaje a přehled hardwaru.
* [**Oficiální stránka produktu**](https://www.hardwario.com/products/sticker/): Funkce a přehled.

## Typická použití {#typical-use-cases}

#### Optimalizace pohybu v průmyslových prostorách {#optimizing-movement-in-industrial-spaces}
- Sledování uliček v průmyslových prostorách pomáhá optimalizovat logistické trasy pro tok materiálu i hotových výrobků. Snižuje prostoje i bezpečnostní rizika z přeplněných cest a nepředvídatelného pohybu.

#### Chytřejší rozvržení prodejny díky datům o pohybu {#smarter-store-layouts-with-motion-data}
- Když v maloobchodě víte, kudy a jak často se zákazníci pohybují, můžete prodejnu lépe rozvrhnout a zvýšit prodeje. Se zařízením STICKER Motion sledujete provoz v uličkách a zjistíte nejfrekventovanější místa, podle kterých optimalizujete umístění zboží a zlepšíte zážitek z nákupu.

#### Komfort v rušných prostorách {#smarter-comfort-in-busy-spaces}
- Průměrný člověk vydává teplo o výkonu asi 100 W. V místech, kudy prochází hodně lidí, například v čekárnách, pomáhá sledování pohybu, teploty a vlhkosti udržet pohodlí i hospodárný provoz. STICKER Motion měří všechny tři veličiny, takže regulace klimatu může být chytřejší.

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

STICKER Motion používá standardní vzory stavové LED popsané v kapitole [**Signalizace LED**](/sticker/hardware-description#led-indication). Startovní sekvence, stavový heartbeat každé 3 sekundy i vzory pro NFC a alarmy jsou u všech aplikací STICKER stejné.

Jedna věc je pro tuto aplikaci specifická: detektor PIR a akcelerometr hlásí vždy jen **okamžitou** aktivaci, nikdy návrat do klidu. Každá zachycená událost pohybu proto zobrazí sekvenci aktivace **zelená, pak oranžová** a sekvenci uvolnění (oranžová, pak zelená) na tomto zařízení nikdy neuvidíte.

:::warning
Blikání při událostech pohybu je pomůcka pro uvádění do provozu a **hodinu po zapnutí přestane**. Zařízení, které už při pohybu nebliká, pohyb dál detekuje a hlásí. Pokud vizuální potvrzení při testování potřebujete znovu, odpojte zařízení od napájení a znovu ho připojte.
:::

## Seznam změn {#changelog}

### 2025-11-23 – v1.0.0 {#2025-11-23--v100}

- První vydání: detekce pohybu PIR s akcelerometrem a hlášením orientace přes LoRaWAN

:::info

Úplný přehled všech změn platformy najdete v [**seznamu změn STICKER**](/sticker/changelog).

:::
