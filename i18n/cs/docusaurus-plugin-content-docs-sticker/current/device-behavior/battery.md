---
slug: battery
title: Baterie a napájení
description: Jak zařízení STICKER využívá baterie, co ovlivňuje spotřebu, jak hlásí napětí baterie a co se stane při slabé baterii nebo její výměně.
---

# Baterie a napájení {#battery-and-power}

:::caution Koncept
Tato stránka je koncept pro interní kontrolu. Tvrzení označená **[ověřit]** je ještě potřeba potvrdit na hardwaru nebo u vlastníka produktu.
:::

:::info Firmware v2.0.0
Tato stránka popisuje **firmware STICKER v2.0.0**. Kde se firmware v1.4.x chová jinak, upozorní na to poznámka **Firmware v1.4.x**.
:::

Zařízení STICKER napájejí dvě baterie AA. Dozvíte se tu, co spotřebovává jejich energii, jak zařízení měří a hlásí napětí baterie, jak vás před vybitím baterií varuje a co se stane, když je vyměníte.

## Baterie a jejich výdrž {#batteries-and-battery-life}

- Zařízení STICKER potřebuje články **2× AA**.
- Zařízení vydrží **2+ roky na 2× AA**. Skutečná výdrž baterií závisí na konfiguraci a na rádiových podmínkách v místě instalace, viz část „Co ovlivňuje spotřebu“ níže.
- Doporučený typ článků je ještě potřeba potvrdit **[ověřit]**. [**Rychlý průvodce**](../first-steps.md) připouští alkalické nebo lithiové články 1,5 V a [**Popis hardwaru**](../hardware-description.md) uvádí jmenovitou kapacitu 3000 mAh.
- Specifikovaný rozsah provozního napětí je 1,8–3,6 V. Pod 1,8 V zařízení nenastartuje, viz část „Kontrola při startu pod 1,8 V“.

## Co ovlivňuje spotřebu {#what-drives-consumption}

Zařízení většinu času spí. Baterie vybíjí hlavně rádio a všechno, co zařízení drží vzhůru. Největší rozdíl dělají tyto faktory:

- **Interval hlášení.** Při každém hlášení (`interval-report`, výchozí 900 s) se zařízení probudí a vysílá. Kratší interval znamená víc vysílání.
- **Datová rychlost.** Daleko od brány musí zařízení používat nízkou datovou rychlost (DR), tedy pomalejší a odolnější nastavení rádia s vyšším spreading factorem (SF). Hlášení na SF12 (v EU868 DR0) potřebuje mnohonásobně víc energie než hlášení na SF7 (DR5). Se zapnutým ADR (adaptivní datová rychlost), což je výchozí stav, přesune síť zařízení na nejrychlejší datovou rychlost, která ještě funguje, takže dobré pokrytí branami šetří energii.
- **Připojování a opětovné připojování.** Zařízení, které se nemůže spojit se sítí, posílá stále další žádosti o připojení s pauzami, které rostou od 1 min do 1 h. Při laboratorním testu odcházela každá žádost o připojení na SF12, tedy s nejpomalejším nastavením. Viz [**Připojení k síti**](network-connection.md).
- **LED, dokud zařízení není připojené.** Během připojování a opětovného připojování spotřebuje žlutý a červený heartbeat každé 3 s zhruba tolik energie jako celý běžný provoz v klidu, takže kus bez pokrytí sítí vybíjí baterie rychleji. S `radio-mode off` zařízení nic nevysílá a jeho žluté bliknutí je velmi krátké.
- **Hallovy spínače.** Na kusech s osazenými dvěma Hallovými spínači odebírají spínače proud nepřetržitě, protože je nelze vypnout. Když jsou zapnuté, zařízení je navíc každých 100 ms kontroluje.
- **Interval vzorkování.** Ve výchozím nastavení (`interval-sample` 0) čte zařízení senzory jednou za hlášení. Samostatný interval vzorkování přidává další probuzení.
- **Připojený J-Link.** Programátor J-Link na padech SWD drží část procesoru pod napájením a přidává trvalou zátěž, dokud ho neodpojíte. Spotřebu měřte jen s odpojeným programátorem.
- **Firmware debug.** Firmware debug drží procesor vzhůru, aby zůstala dostupná konzole, a odebírá mnohem větší proud. Do hlubokého spánku přejde po 2 h bez aktivity v konzoli. V terénu používejte firmware release, viz [**Nastavení firmwaru**](../developer-access/firmware-setup.md).

### Naměřené hodnoty {#measured-values}

Hodnoty níže naměřila společnost HARDWARIO na testovacích kusech v laboratoři. Ukazují, kam energie odchází, a nejsou to garantované údaje. Celou tabulku je ještě potřeba potvrdit **[ověřit]**, protože hodnoty pocházejí ze dvou testovacích kampaní s různými sestaveními firmwaru a různým nastavením:

- **Klidový test:** rádio vypnuté, laboratorní zdroj 3,3 V.
- **Rádiový test:** LoRaWAN EU868, ADR zapnuté, hlášení každých 120 s, laboratorní zdroj 3,0 V.

Náboj v mC (milicoulombech) je proud vynásobený časem: 1 mC odpovídá 1 mA po dobu 1 s. Po každém vysílání zařízení ve dvou přijímacích oknech čeká na odpověď, a i to stojí energii.

| Co | Naměřeno | Test |
|---|---|---|
| Klidový stav, bez Hallových spínačů | průměrně asi 74 µA | Klidový test |
| Klidový stav, osazené dva Hallovy spínače | průměrně asi 119 µA | Klidový test |
| Samotné dva Hallovy spínače | asi 20–28 µA, nepřetržitě | Klidový test |
| Nejhlubší spánek mezi probuzeními | asi 3,7 µA | Klidový test |
| Jedno čtení senzorů | asi 27 mA po dobu asi 45 ms | Klidový test |
| Připojený J-Link | přidá asi 60–100 µA | Klidový test |
| Běžný provoz, připojeno | průměrně asi 155,6 µA | Rádiový test |
| Klidový stav mezi vysíláními, připojeno | asi 67,7–76 µA | Rádiový test |
| Rádiová část jednoho hlášení na SF7 (DR5) | asi 1,7 mC, k tomu asi 8–11 mC na přijímací okna | Rádiový test |
| Rádiová část jednoho hlášení na SF12 (DR0) | asi 85 mC, k tomu asi 8–11 mC na přijímací okna | Rádiový test |
| Jedna žádost o připojení na SF12 | asi 87 mC, k tomu asi 12 mC na její přijímací okna | Rádiový test |
| Heartbeat při připojování, žlutá a červená každé 3 s | zvýší klidový proud zhruba ze 76 µA na 149 µA, to je asi 1,75 mAh za den | Rádiový test |
| Zelený heartbeat | průměrně asi 6 µA | Jiný laboratorní test |
| Vypnuto kontrolou slabé baterie | asi 145 µA, příčina zatím nenalezena | Jiný laboratorní test |

## Jak se baterie měří a hlásí {#how-the-battery-is-measured-and-reported}

Zařízení měří napětí baterie pokaždé, když čte senzory: jednou hned po startu a pak jednou za hlášení, nebo jednou za `interval-sample`, pokud nastavíte interval vzorkování. Hodnotu najdete na místech uvedených v tabulce. Uplink je zpráva ze zařízení do sítě a jeho fPort je číslo portu LoRaWAN, podle kterého příjemce pozná, co zpráva obsahuje.

| Kde | Co dostanete |
|---|---|
| Telemetrický uplink na fPort 2, pole `voltage` | V každém hlášení, v krocích po 20 mV, dekódované ve voltech, například `3.36`. `null` znamená, že zatím žádné měření není. |
| Uplink **Info** na fPort 85, pole `battery` | Poslední měření v mV. Když žádné měření není k dispozici, pole chybí. |
| LoRaWAN DevStatusAns | Úroveň baterie v odpovědi na dotaz síťového serveru na stav zařízení (DevStatusReq): 1 při 2,4 V a méně, rovnoměrně roste až na 254 při 3,6 V a více. 255 znamená, že žádné měření není k dispozici. Například ChirpStack ji ukazuje jako baterii zařízení. |
| Historie senzorů | Kanál `battery-voltage`, uložený v mV a dekódovaný ve voltech, pokud ho přidáte do `history-channels`. Viz [**Historie senzorů**](../developer-access/sensor-history.md). |
| HARDWARIO Manager | Položka **Battery** na obrazovce [**Device info**](/apps/hardwario-manager/sticker/device-info), přečtená přes NFC. |

Vývoj baterie v čase sledujte podle `voltage` v telemetrii: přichází s každým hlášením, kdežto alarm slabé baterie jen označí okamžik, kdy napětí překročí práh.

:::note Firmware v1.4.x
Firmware v1.4.x přehlédl DevStatusReq, který dorazil spolu s příkazem ADR (LinkADRReq). Přesně tak ho posílá ChirpStack, a proto ChirpStack u zařízení úroveň baterie nezobrazoval.
:::

## Alarm slabé baterie {#low-battery-alarm}

Za běhu vás zařízení varuje dřív, než se baterie vybijí. Když naměřené napětí klesne pod `battery-level` (výchozí 2400 mV, rozsah 1000–3600 mV), zařízení vyvolá alarm slabé baterie:

- Odešle alarmový uplink na fPort 3 s kanálem `battery-voltage`, typem `low` a naměřeným napětím. Stejně jako ostatní alarmy odejde na konci okna `alarm-limit`, které má ve výchozím nastavení 10 s. Alarm je vestavěný a nepatří mezi 16 pravidel alarmů, takže dekódovaná událost nemá číslo pravidla (`rule` je `null`).
- Zhruba do 10 s odešle telemetrické hlášení.
- Stavová LED přidá každé 3 s červené bliknutí, pokud nemá přednost vzor stavu sítě.
- **Info** hlásí stavový příznak `alarm_low_battery` a uvádí alarm mezi aktivními alarmy.

Alarm se zruší, když napětí vystoupí o víc než 0,3 V nad práh, při výchozím nastavení tedy nad 2,7 V. Zařízení pak odešle druhý alarmový uplink s událostí `deactivate`. Odstup 0,3 V brání tomu, aby se alarm zapínal a vypínal, když napětí kolísá kolem prahu.

Zařízení porovnává poslední měření s prahem každé 3 s, takže se alarm v praxi řídí rozvrhem měření popsaným výše. Stavy alarmů se drží jen v paměti: po výměně baterií zařízení nastartuje bez alarmu a událost `deactivate` neodešle. Nové napětí se objeví v příštím telemetrickém hlášení a v **Info**.

Napětí baterie neklesá rovnoměrně, zvlášť u lithiových článků, a proto je práh nastavitelný. Výchozí hodnota nechává široký odstup nad napětím, při kterém zařízení přestane fungovat. Práh změníte přes NFC v aplikaci HARDWARIO Manager, downlinkem `set_param` (příkazem ze sítě do zařízení) nebo příkazem `config battery-level` v konzoli. Nová hodnota platí po uložení, které zařízení restartuje, viz [**Konfigurace**](../developer-access/configuration.md). Jak se alarmy sbírají a odesílají, popisují stránky [**Alarmy**](alarms.md) a [**Pravidla alarmů**](../developer-access/alarm-rules.md).

<details>
<summary><b>Dekódovaný alarm slabé baterie (fPort 3)</b></summary>

Dekódováno dekodérem `ttn.js` pro firmware v2.0.0. `value` je naměřené napětí baterie ve voltech a `time` je unixový čas v sekundách.

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "mb",
      "channel": "battery-voltage",
      "rule": null,
      "event": "activate",
      "type": "low",
      "value": 2.15,
      "time": 1780000000
    }
  ],
  "truncated": false
}
```

</details>

:::note Firmware v1.4.x
Firmware v1.4.x posílá tento alarm ve starším formátu: jeho dekodér ho ukazuje se slotem 254, `source` `battery` a `quantity` `voltage` místo kanálu `battery-voltage`.
:::

## Kontrola při startu pod 1,8 V {#startup-check-below-18-v}

Alarm slabé baterie varuje za běhu. Při každém startu navíc proběhne druhá, nezávislá kontrola: pod 1,8 V zařízení přehraje startovní sekvenci LED, 5 s bliká červeně, 1 s svítí červeně a samo se vypne. Znovu ho probudí jen reset přes pin NRST nebo odpojení a připojení napájení, například výměna baterií. Celou sekvenci popisuje stránka [**Start a inicializace**](startup.md).

- **Kontrola běží jen při startu.** Běžící zařízení pracuje i pod 1,8 V dál. Při laboratorním měření s firmwarem v1.4 fungovalo rádio až do zhruba 1,30–1,35 V **[ověřit]**. Pod zhruba 1,3 V se zařízení může zastavit bez čistého restartu a obnoví se až po odpojení a připojení napájení **[ověřit]**.
- **I vypnuté zařízení odebírá proud.** V tomto stavu odebírá asi 145 µA a příčina se zatím nenašla **[ověřit]**. Baterie se dál vybíjejí, proto je brzy vyměňte.
- **Testujte bez programátoru J-Link.** Připojený J-Link napájí procesor přes piny SWD a slabou baterii zakryje, proto chování při slabé baterii testujte s odpojeným programátorem **[ověřit]**.

:::note Firmware v1.4.x
Firmware v1.4.x baterii při startu nekontroluje. S téměř vybitou baterií se zařízení může restartovat pořád dokola, dokud baterie nevyměníte.
:::

## Výměna baterií {#replacing-the-batteries}

Po vyjmutí baterií zařízení okamžitě ztratí napájení. Po vložení nových projde běžným startem: startovní sekvencí LED, kontrolou baterie a připojením k síti. Jakmile je připojené, odešle **Info**, **settings-info** a první telemetrické hlášení. Viz [**Start a inicializace**](startup.md).

| Co | Po výměně |
|---|---|
| Konfigurace a klíče | Zachované, protože jsou uložené ve flash paměti |
| Celkové stavy čítačů Hallových spínačů a vstupů | Zachované. Impulzy napočítané od posledního uložení se ztratí, ve výchozím nastavení nejvýš za jeden interval hlášení |
| Historie senzorů | Zachovaná. Ztratí se nejvýš poslední jeden nebo dva záznamy, které ještě nebyly zapsané do flash paměti |
| Hodiny | Čas se ztratí. Zařízení si po připojení vyžádá čas od sítě, nebo ho nastavíte přes NFC nástrojem **Sync time** v části [**Tools**](/apps/hardwario-manager/sticker/tools) aplikace HARDWARIO Manager. Záznamy historie pořízené předtím dostanou správný čas, jakmile se hodiny nastaví |
| Síťová relace | LoRaWAN: nové připojení. Zařízení si ponechá čítač připojení (DevNonce), takže síť nové připojení přijme. LoRa P2P: spárování zůstane zachované |
| Aktivní alarmy | Zruší se. Podmínky, které stále platí, alarm vyvolají znovu |
| Počty pohybů z PIR a akcelerometru | Začnou znovu od 0 |
| Uplinky čekající na odeslání | Ztratí se |

Kus, který zmlkl kvůli příliš nízkému napětí baterie, se s novými bateriemi zotaví, protože výměna baterií znamená odpojení a připojení napájení. Čítače, historii a hodiny popisuje stránka [**Historie a čítače**](history-and-counters.md), uplinky po připojení stránka [**Zprávy a časování**](messages.md).
