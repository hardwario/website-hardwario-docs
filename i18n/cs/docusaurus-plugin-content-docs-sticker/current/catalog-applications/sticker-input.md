---
slug: sticker-input
title: STICKER Input
---
import Image from '@theme/IdealImage';

# STICKER Input {#sticker-input}

**STICKER Input** je kompaktní bezdrátový modul LoRaWAN pro připojení externích senzorů a čtení digitálních nebo analogových signálů. Napájejí ho dvě baterie AA. Podporuje teplotní sondy 1-Wire i sondu MACHINE PROBE a jeho dva externí vstupy fungují jako digitální vstupy, analogové vstupy 0–24 V nebo čítače impulzů S0, a proto se hodí pro nejrůznější průmyslové a monitorovací aplikace.

![STICKER Input](../../../../../sticker/catalog-applications/images/sticker-input-top.png)

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](/sticker/first-steps): Zprovoznění krok za krokem.
* [**Koupit STICKER Input**](https://www.hardwario.store/p/sticker-input): Nákup v našem e-shopu.
* [**Objednací kódy**](/sticker/ordering-codes): Seznam součástí a jejich objednacích čísel.
* [**Popis hardwaru**](/sticker/hardware-description): Technické údaje a přehled hardwaru.
* [**Oficiální stránka produktu**](https://www.hardwario.com/products/sticker/): Funkce a přehled.

## Typická použití {#typical-use-cases}

#### Chytré sledování teploty {#smart-temperature-monitoring}
- Některé výrobní procesy vyžadují sledování teploty v extrémních rozsazích, které běžná elektronika nezvládne. V takových případech jsou nezbytné externí senzory, například teplotní sondy 1-Wire. K jedné datové lince lze připojit až čtyři senzory, takže měření může být podrobné a snadno se rozšiřuje.

#### Digitalizace starších strojů {#digitizing-legacy-machines}
- Digitalizovat starší stroje bývá složité, i když stále spolehlivě fungují. Mnohé mají digitální výstup 24 V, případně lze poblíž výstupního mechanismu doplnit indukční senzor, který zachytí každý vyrobený kus. Kusy se pak jednoduše počítají z digitálních signálů.

#### Chytrá detekce otevření/zavření {#smart-openclose-detection}
- Detekce dveří a oken neslouží jen k zabezpečení: je také klíčová pro chytré vytápění a chlazení. Tradiční systémy mohou být kvůli přísným certifikačním standardům drahé. STICKER Input nabízí jednoduchou a cenově dostupnou alternativu s vestavěným senzorem magnetického pole nebo digitálními vstupy pro běžné spínače.

## Konfigurace a zapojení externích vstupů {#configuration-and-wiring-of-external-inputs}

Dokumentace → [**Zapojení vstupů STICKER Input**](/sticker/sticker-input-wiring/sticker-input-wiring)

Stránka popisuje zapojení vstupů zařízení STICKER Input včetně nastavení přepínačů DIP a podporovaných režimů, jako jsou senzory 1-Wire, vstupy pro bezpotenciálové kontakty, čítače impulzů S0 a analogové vstupy 0–24 V.

## Ukázková zpráva JSON {#example-json-message}

Pravidelné hlášení tak, jak ho dekóduje dekodér `ttn.js` z verze v2.0.0 (fPort 2). V příkladu je vstup A nastavený jako `digital` i s počtem impulzů, vstup B jako `analog` (napětí ve V) a ve slotu 1-Wire č. 1 je sonda Dallas DS18B20. Vstup v režimu `pulse` posílá `input_a_count` / `input_b_count` a hodnotu `input_a_is_active` / `input_b_is_active`, která je vždy `false`; vstup v režimu `analog` posílá jen `input_a_voltage` / `input_b_voltage`.

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
  "input_a_count": 120,
  "input_a_is_active": true,
  "input_b_voltage": 12.35,
  "w1_sensors": [
    {
      "slot": 1,
      "type": 2,
      "type_name": "dallas",
      "values": { "temperature": 21.5 },
      "units": { "temperature": "degC" }
    }
  ]
}
```

</details>

## Stavová LED {#status-led}

STICKER Input používá standardní vzory stavové LED popsané v kapitole [**Signalizace LED**](/sticker/hardware-description#led-indication). Startovní sekvence, stavový heartbeat každé 3 sekundy i vzory pro NFC a alarmy jsou u všech aplikací STICKER stejné.

Právě tato aplikace digitální vstupy a Hallovy spínače skutečně využívá, a proto je u ní nejdůležitější signalizace **aktivace vstupu**. Tyto vstupy hlásí oba směry, takže z pořadí barev poznáte, ke které hraně došlo:

| Událost | Vzor |
|---|---|
| Vstup se aktivuje (kontakt se sepne, magnet se přiblíží) | Zelená, pak oranžová |
| Vstup se vrátí do klidu (kontakt se rozepne, magnet se vzdálí) | Oranžová, pak zelená |

Zapojení a nastavení přepínačů DIP tak ověříte přímo na místě, bez konzole a bez připojení k síti: aktivujte vstup a sledujte pořadí obou barev.

Vstup v režimu `pulse` (S0) nemá stav, takže započítané impulzy zobrazí jen sekvenci zelená, pak oranžová. LED blikne nejvýš jednou za 0,5 s, takže při rychlých impulzech nedostane každý impulz vlastní bliknutí. Vstup v režimu `analog` nebliká vůbec.

:::warning
Blikání při aktivaci vstupu je pomůcka pro uvádění do provozu a **skončí hodinu po zapnutí napájení**. Počítání a hlášení pokračují normálně. Pokud vizuální potvrzení při testování potřebujete znovu, odpojte zařízení od napájení a znovu ho připojte.
:::

## Seznam změn {#changelog}

### 2026-10-19 – v2.0.0 {#2026-10-19--v200}

- Režim každého externího vstupu se volí parametrem `cap-gpio-mode inputs` spolu s `cap-gpio-input-a` / `cap-gpio-input-b`: `digital`, `analog` nebo `pulse`; nahrazují dřívější přepínače `cap-input-a/-b`, jejichž hodnoty se při aktualizaci nepřenášejí
- Režim `analog` měří na vstupu 0–24 V; hodnotu lze posílat v telemetrii, ukládat do historie a použít v prahových alarmech
- Režim `pulse` je čítač impulzů pro výstupy S0 měřičů (libovolná polarita, ošetření zákmitů 20 ms)
- Každý slot 1-Wire si pamatuje očekávaný typ senzoru (`sensor1-type`…`sensor4-type`: `2` Dallas, `3` MACHINE PROBE); jiný senzor ve slotu vyvolá alarm `sensor_mismatch`
- Sonda 1-Wire připojená až po zapnutí do slotu, který na ni čeká (má uloženou ROM nebo `sensorN-type`), se najde bez restartu: sběrnice se kontroluje 2 minuty po startu, potom po dalších 5 a 10 minutách a dále každých 15 minut
- Každý kanál sondy 1-Wire lze použít v pravidlech alarmů a ukládat do historie; MACHINE PROBE s nefunkčním akcelerometrem dál měří teplotu

### 2025-11-23 – v1.0.0 {#2025-11-23--v100}

- První vydání: digitální vstupy, počítání impulzů, teplotní sondy 1-Wire a analogové měření přes LoRaWAN

:::info

Úplný přehled všech změn platformy najdete v [**seznamu změn STICKER**](/sticker/changelog).

:::
