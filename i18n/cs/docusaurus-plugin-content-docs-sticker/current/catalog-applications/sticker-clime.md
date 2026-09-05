---
slug: sticker-clime
title: STICKER Clime
description: "STICKER Clime používá standardní vzory stavové LED popsané v Signalizace LED. Startovní karusel, stavový heartbeat každé 3 sekundy i vzory pro NFC a alarmy jsou u všech aplikací STICKER stejné."
---
import Image from '@theme/IdealImage';

# STICKER Clime {#sticker-clime}

**STICKER Clime** je kompaktní bezdrátový senzor LoRaWAN určený pro přesné monitorování teploty a vlhkosti. Napájený dvěma bateriemi AA vydrží v provozu velmi dlouho a je ideální pro regulaci klimatu v budovách, monitorování skladů nebo analýzu prostředí v průmyslu a zemědělství.

![STICKER Clime](../../../../../sticker/catalog-applications/images/sticker-clime-top.png)

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](https://docs.hardwario.com/sticker/first-steps): Postup zprovoznění krok za krokem.
* [**Koupit STICKER Clime**](https://www.hardwario.store/p/sticker-clime): Nákup v našem obchodě.
* [**Objednací kódy**](https://docs.hardwario.com/sticker/ordering-codes): Seznam součástek a jejich objednacích čísel.
* [**Popis hardwaru**](https://docs.hardwario.com/sticker/hardware-description): Technické detaily a přehled hardwaru.
* [**Oficiální stránka produktu**](https://www.hardwario.com/products/sticker/): Funkce a přehled.

## Typická použití {#typical-use-cases}

#### Chytré monitorování kvality materiálu {#smart-monitoring-for-material-quality}

- Sledování teploty a vlhkosti při skladování a používání materiálu je klíčové u procesů jako vstřikování plastů. Vlhkost vzniklá teplotními rozdíly může způsobit kondenzaci na granulátu a tím pórovitost výsledného produktu. Dlouhodobé měření pomáhá tyhle skryté problémy odhalit.

#### Spolehlivé monitorování skladování léků {#reliable-monitoring-for-medicine-storage}

- Skladování léků vyžaduje přesnou kontrolu prostředí. Každá výraznější změna teploty nebo vlhkosti se musí hlásit okamžitě. Velké skladovací prostory často potřebují víc senzorů, aby bylo pokrytí úplné a spolehlivé.

#### Ochrana pacientů díky chytrému měření {#protecting-patients-with-smart-sensing}

- S rostoucími globálními teplotami a častějšími klimatickými extrémy je udržení stabilních podmínek v nemocničních pokojích kritické. Selhávající klimatizace, nebo i otevřené okno, může pacienty ohrozit. Senzory teploty a vlhkosti v každém pokoji umožňují včasné varování a lepší péči.

## Ukázková zpráva JSON {#example-json-message}

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
<p>

```json
{
  "event": "interval",
  "voltage": 3.01,
  "battery": 98,
  "temperature": 24.5,
  "humidity": 48.5,
  "illuminance": 120,
  "pressure": 101300
}
```

</p>
</details>

## Stavová LED {#status-led}

STICKER Clime používá standardní vzory stavové LED popsané v [**Signalizace LED**](/sticker/hardware-description#led-indication). Startovní karusel, stavový heartbeat každé 3 sekundy i vzory pro NFC a alarmy jsou u všech aplikací STICKER stejné.

Clime měří hodnoty prostředí, ne diskrétní vstupy, takže obvykle nemá nakonfigurované žádné Hallovy senzory ani externí vstupy. V praxi to znamená, že uvidíte jen **heartbeat**, vzory pro **NFC** a **červené bliknutí alarmu** při překročení prahu teploty nebo vlhkosti. Zeleno-oranžové sekvence aktivace vstupů se na standardní jednotce Clime neobjeví.

## Seznam změn {#changelog}

### 2025-11-23 – v1.0.0 {#2025-11-23--v100}

- První vydání: monitorování teploty, vlhkosti, osvětlení a tlaku přes LoRaWAN

:::info

Kompletní přehled všech změn platformy najdete v [**seznamu změn STICKER**](/sticker/changelog).

:::
