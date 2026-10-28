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

Pravidelné hlášení tak, jak ho dekóduje dekodér `ttn.js` z verze v2.0.0 (fPort 2). `motion_count` počítá detekce senzoru PIR, `accel_motion_count` počítá události pohybu z akcelerometru a `orientation` je poloha hlášená akcelerometrem (1–6).

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
  "orientation": 2,
  "motion_count": 5,
  "accel_motion_count": 3,
  "hall_left_count": 0,
  "hall_left_is_active": false
}
```

</details>

## Stavová LED {#status-led}

STICKER Motion používá standardní vzory stavové LED popsané v kapitole [**Signalizace LED**](/sticker/hardware-description#led-indication). Startovní sekvence, stavový heartbeat každé 3 sekundy i vzory pro NFC a alarmy jsou u všech aplikací STICKER stejné.

Jedna věc je pro tuto aplikaci specifická: detektor PIR a akcelerometr hlásí vždy jen **okamžitou** aktivaci, nikdy návrat do klidu. Každá zachycená událost pohybu proto zobrazí sekvenci aktivace **zelená, pak oranžová** a sekvenci uvolnění (oranžová, pak zelená) na tomto zařízení nikdy neuvidíte.

:::warning
Blikání při událostech pohybu je pomůcka pro uvádění do provozu a **hodinu po zapnutí přestane**. Zařízení, které už při pohybu nebliká, pohyb dál detekuje a hlásí. Pokud vizuální potvrzení při testování potřebujete znovu, odpojte zařízení od napájení a znovu ho připojte.
:::

## Seznam změn {#changelog}

### 2026-10-19 – v2.0.0 {#2026-10-19--v200}

- Detektor PIR se zapíná parametrem `cap-gpio-mode pir`, který nahrazuje dřívější přepínač `cap-pir-detector`; jeho hodnota se při aktualizaci nepřenáší
- Nové stavy pravidel alarmů pro PIR a akcelerometr: `from 1 to 1` vyvolá jeden alarm za celou epizodu pohybu (*začátek pohybu*, potom *konec pohybu*, jakmile uplyne `dwell` sekund bez události), `from 0 to 0` hlásí *klid*, jakmile uplyne `dwell` sekund bez události (například u stroje, který musí ohlásit, že přestal vibrovat)
- Pravidlo RATE na čítači nově počítá v okně `dwell` sekund a spustí se hned, jakmile počet dosáhne limitu

### 2025-11-23 – v1.0.0 {#2025-11-23--v100}

- První vydání: detekce pohybu PIR s akcelerometrem a hlášením orientace přes LoRaWAN

:::info

Úplný přehled všech změn platformy najdete v [**seznamu změn STICKER**](/sticker/changelog).

:::
