---
slug: sticker-clime
title: STICKER Clime
---
import Image from '@theme/IdealImage';

# STICKER Clime {#sticker-clime}

**STICKER Clime** je kompaktní bezdrátový senzor LoRaWAN pro přesné měření teploty a vlhkosti. Na dvě baterie AA vydrží v provozu dlouho a hodí se například pro regulaci klimatu v budovách, sledování skladů nebo analýzu prostředí v průmyslu a zemědělství.

![STICKER Clime](../../../../../sticker/catalog-applications/images/sticker-clime-top.png)

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](/sticker/first-steps): Zprovoznění krok za krokem.
* [**Koupit STICKER Clime**](https://www.hardwario.store/p/sticker-clime): Nákup v našem e-shopu.
* [**Objednací kódy**](/sticker/ordering-codes): Seznam součástí a jejich objednacích čísel.
* [**Popis hardwaru**](/sticker/hardware-description): Technické údaje a přehled hardwaru.
* [**Oficiální stránka produktu**](https://www.hardwario.com/products/sticker/): Funkce a přehled.

## Typická použití {#typical-use-cases}

#### Chytré sledování kvality materiálu {#smart-monitoring-for-material-quality}

- Sledování teploty a vlhkosti při skladování a zpracování materiálu je klíčové například při vstřikování plastů. Teplotní rozdíly mohou vést ke kondenzaci vlhkosti na granulátu a ta pak způsobí pórovitost výsledného výrobku. Dlouhodobé měření pomáhá tyto skryté problémy odhalit.

#### Spolehlivé sledování skladů léčiv {#reliable-monitoring-for-medicine-storage}

- Skladování léků vyžaduje přesnou kontrolu prostředí. Každá výraznější změna teploty nebo vlhkosti se musí hlásit okamžitě. Velké skladovací prostory často potřebují víc senzorů, aby bylo pokrytí úplné a spolehlivé.

#### Ochrana pacientů díky chytrému měření {#protecting-patients-with-smart-sensing}

- S rostoucími globálními teplotami a častějšími klimatickými extrémy jsou stabilní podmínky v nemocničních pokojích zásadní. Pacienty může ohrozit porucha klimatizace, nebo i otevřené okno. Senzory teploty a vlhkosti v každém pokoji včas upozorní na problém a pomohou zlepšit péči.

## Ukázková zpráva JSON {#example-json-message}

Pravidelné hlášení tak, jak ho dekóduje dekodér `ttn.js` z verze v2.0.0 (fPort 2). Teplota je v °C, vlhkost v %, tlak v hPa, nadmořská výška v m a osvětlenost v lx. Zapnutý senzor bez platného měření se dekóduje jako `null`; chybějící klíč znamená, že je senzor vypnutý.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "voltage": 3.01,
  "boot": false,
  "alarm_status": 0,
  "alarm_status_flags": [],
  "temperature": 23.65,
  "humidity": 54,
  "pressure": 1013.5,
  "altitude": 321,
  "illuminance": 500
}
```

</details>

## Stavová LED {#status-led}

STICKER Clime používá standardní vzory stavové LED popsané v kapitole [**Signalizace LED**](/sticker/hardware-description#led-indication). Startovní sekvence, stavový heartbeat každé 3 sekundy i vzory pro NFC a alarmy jsou u všech aplikací STICKER stejné.

Clime měří hodnoty prostředí, ne diskrétní vstupy, takže obvykle nemá nastavené žádné Hallovy spínače ani externí vstupy. V praxi to znamená, že uvidíte jen **heartbeat**, vzory pro **NFC** a **červené bliknutí alarmu**, když se spustí pravidlo alarmu pro některou z měřených hodnot. Zeleno-oranžové sekvence aktivace vstupů se na standardním zařízení Clime neobjeví.

## Seznam změn {#changelog}

### 2026-10-19 – v2.0.0 {#2026-10-19--v200}

- Parametr `cap-sht` vypíná vestavěný senzor teploty a vlhkosti stejně jako ostatní senzory
- Vlastní teplota barometru je nový kanál (`temperature-baro`)
- Teplotu, vlhkost, tlak, osvětlenost i teplotu barometru lze použít v pravidlech alarmů a ukládat do historie (`history-channels`)
- U prahových pravidel je `dwell` nově pásmo hystereze v jednotkách daného kanálu, ne v sekundách

### 2025-11-23 – v1.0.0 {#2025-11-23--v100}

- První vydání: měření teploty, vlhkosti, osvětlenosti a tlaku přes LoRaWAN

:::info

Úplný přehled všech změn platformy najdete v [**seznamu změn STICKER**](/sticker/changelog).

:::
