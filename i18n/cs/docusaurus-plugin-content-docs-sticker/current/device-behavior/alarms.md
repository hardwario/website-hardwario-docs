---
slug: alarms
title: Alarmy
description: Jak fungují alarmy zařízení STICKER, od vestavěných alarmů a 16 nastavitelných pravidel po hysterezi, časování a to, co zařízení odešle a ukáže.
---

# Alarmy {#alarms}

:::caution Koncept
Tato stránka je koncept pro interní kontrolu. Tvrzení označená **[ověřit]** je ještě potřeba potvrdit na hardwaru nebo u vlastníka produktu.
:::

:::info Firmware v2.0.0
Tato stránka popisuje **firmware STICKER v2.0.0**. Kde se firmware v1.4.x chová jinak, upozorní na to poznámka **Firmware v1.4.x**.
:::

Alarm dává vědět, že některá hodnota nebo stav vyžaduje pozornost: teplota mimo rozsah, nezavřené dveře nebo sonda, která přestala odpovídat. Zařízení STICKER alarmy vyhodnocuje samo a každou změnu pošle přes rádio, ukáže na LED a na variantě s bzučákem ohlásí i zvukem. Tato stránka vysvětluje, jaké alarmy zařízení má a jak jednotlivé druhy pravidel rozhodují, kdy se alarm aktivuje a kdy se zruší. Popisuje také, co při spuštění alarmu uvidíte. Syntaxi v shellu a čísla kanálů najdete na stránce [**Pravidla alarmů**](../developer-access/alarm-rules.md).

## Vestavěné alarmy a nastavitelná pravidla {#built-in-alarms-and-configurable-rules}

Zařízení STICKER má dvě skupiny alarmů. **Vestavěné alarmy** není potřeba nastavovat:

| Vestavěný alarm | Kdy se aktivuje | Kdy se zruší |
|---|---|---|
| Slabá baterie | Napětí baterie klesne pod `battery-level` (výchozí 2,4 V) | Napětí vystoupí o 0,3 V nad práh (při výchozím nastavení 2,7 V) |
| Chybějící data (deska) | Hodnota zapnutého měření na desce (teplota, vlhkost, tlak, napětí analogového vstupu nebo baterie) chybí už 5 s. Jedno nepovedené čtení senzoru teploty a vlhkosti nebo barometru se ignoruje, počítá se až druhé po sobě. Chybějící napětí analogového vstupu nebo baterie se počítá hned | Hodnoty opět přicházejí |
| Chybějící data (1-Wire) | Sonda ve slotu 1-Wire s uloženým sériovým číslem (ROM) chybí nebo přestane odpovídat (jeden alarm za celou sondu, kanál `device`), nebo u sondy MACHINE PROBE přestane odpovídat jeden čip, zatímco ostatní odpovídají dál (jeden alarm na prvním kanálu tohoto čipu) | Sonda nebo čip znovu odpovídá |
| Nesouhlas senzoru | Ve slotu 1-Wire chybí očekávaný typ sondy a na sběrnici je sonda jiného typu, kterou nemůže převzít žádný volný slot | Vrátí se sonda správného typu, nebo se slot znovu přiřadí či vyprázdní |

**Nastavitelných pravidel** může být až 16, `alarm_0` až `alarm_15`. Každé pravidlo hlídá jednu hodnotu, kterou určují slot a kanál. Slot udává umístění senzoru: `mb` je základní deska zařízení STICKER, `s1` až `s4` jsou sloty 1-Wire. Kanál udává, kterou hodnotu daného senzoru pravidlo hlídá. Tentýž kanál může hlídat několik pravidel, například pro varovnou a kritickou úroveň. V alarmových hlášeních se pravidlo pozná podle svého čísla; vestavěné alarmy číslo pravidla nemají (dekodér ukáže `rule: null`).

## Pro které kanály lze nastavit pravidla {#which-channels-can-have-rules}

| Slot | Prahová pravidla (rozsah hodnot) | Stavová pravidla (0 nebo 1) | Četnostní pravidla (přírůstek čítače) |
|---|---|---|---|
| Základní deska zařízení STICKER (`mb`) | `temperature`, `humidity`, `pressure`, `illuminance`, `temperature-baro`, `input-a-voltage`, `input-b-voltage` | `hall-left-state`, `hall-right-state`, `input-a-state`, `input-b-state`, `pir-motion`, `accel-motion` | `hall-left-count`, `hall-right-count`, `input-a-count`, `input-b-count`, `pir-count`, `accel-count` |
| Sonda DS18B20 (`s1` až `s4`, typ `dallas`) | `temperature` | Žádná | Žádná |
| Sonda MACHINE PROBE (`s1` až `s4`, typ `machine-probe`) | `temperature`, `humidity`, `temperature-aux`, `illuminance`, `magnetic-field`, `accel-x`, `accel-y`, `accel-z` | `tilt` | Žádná |

- Kanály `accel-orientation` a `altitude` pravidla mít nemohou. Kanál `battery-voltage` hlídá jen vestavěný alarm slabé baterie.
- Pravidlo pro kanál, jehož senzor nebo vstup je vypnutý, se uloží, ale zůstane neaktivní, dokud senzor nebo vstup nezapnete.
- Pravidlo pro slot 1-Wire vyžaduje, aby slot měl určený typ senzoru (`sensor1-type` až `sensor4-type`, nastaví se při přiřazení sondy). Pravidlo zapsané pro typ, který slot už neočekává, je **zastaralé**: zařízení STICKER si ho ponechá, ale nikdy ho nevyhodnotí.

## Jak se chovají jednotlivé druhy pravidel {#how-each-rule-kind-behaves}

Druh pravidla vyplývá z kanálu, který pravidlo hlídá. Stejné pole `dwell` přitom u každého druhu znamená něco jiného.

### Prahová pravidla {#threshold-rules}

Prahové pravidlo hlídá, zda měřená hodnota zůstává v rozsahu od `lo` do `hi`.

- **Aktivace:** alarm se aktivuje, jakmile je hodnota pod `lo` (alarm LOW) nebo nad `hi` (alarm HIGH). Hodnota přesně na mezi je ještě v rozsahu.
- **Pásmo necitlivosti:** `dwell` je pásmo necitlivosti (hystereze) v jednotkách kanálu, ne čas. Alarm HIGH se zruší, jakmile hodnota klesne pod `hi` minus `dwell`, alarm LOW, jakmile vystoupí nad `lo` plus `dwell`. Mezi mezí a okrajem pásma alarm trvá, takže hodnota, která kolísá kolem meze, alarm při každém měření nespouští a neruší. S `dwell` 0 se alarm zruší, jakmile se hodnota vrátí do rozsahu. `hi` musí být větší než `lo` a `dwell` musí být od 0 do šířky rozsahu.
- **Přeskok na druhou stranu:** když hodnota přeskočí z jedné strany rovnou na druhou, starý alarm se zruší a nový se hned aktivuje.
- **Chybějící hodnota:** když senzor nedodá hodnotu, aktivní prahový alarm se zruší. Chybějící senzor místo něj ohlásí vestavěný alarm chybějících dat.
- **Doba reakce:** prahové pravidlo uvidí novou hodnotu, až když zařízení STICKER přečte své senzory. S výchozí hodnotou `interval-sample` 0 se to děje jednou za interval hlášení (výchozí 15 min), takže reakce prahového alarmu může trvat až jeden interval hlášení. Častější čtení senzorů nastavíte parametrem `interval-sample` (5–3600 s).

:::note Firmware v1.4.x
Ve firmwaru v1.4.x je `dwell` u prahového pravidla čas v sekundách, po který musí hodnota zůstat mimo rozsah, než se alarm aktivuje. Firmware v2.0.0 čte totéž pole jako pásmo necitlivosti v jednotkách kanálu, takže hodnota z v1.4.x po aktualizaci znamená něco jiného.
:::

### Stavová pravidla {#state-rules}

Stavové pravidlo hlídá dvouhodnotovou úroveň (0 nebo 1) Hallova spínače, digitálního vstupu nebo upozornění na náklon ze sondy MACHINE PROBE. Má klíče `from`, `to` a `dwell`, přičemž `dwell` je čas od 0 do 3600 s.

- **Pravidlo na hranu** (`from` a `to` se liší, například `from 0 to 1`): vyvolá se, když úroveň přejde z `from` na `to`. Je-li nastavený `dwell`, musí nová úroveň vydržet `dwell` sekund, jinak se nic nestane. Po vyvolání zůstane alarm aktivní ještě po stejnou dobu `dwell` a brání dalšímu vyvolání. Pak skončí bez ohlášení: pravidlo na hranu žádnou událost deactivate neposílá.
- **Pravidlo na úroveň** (`from` a `to` jsou stejné, například `from 1 to 1`): je aktivní, dokud má úroveň hodnotu `to`. Je-li nastavený `dwell`, musí úroveň zůstat na `to` po dobu `dwell` sekund, než se alarm aktivuje. Alarm se zruší, jakmile úroveň přestane mít hodnotu `to`, a zrušení se ohlásí.

Hallovy spínače a digitální vstupy kontroluje zařízení STICKER každých 100 ms. Vstup v režimu `pulse` žádnou úroveň nemá, takže stavové pravidlo pro něj zůstane neaktivní.

### Pravidla pro pohyb (PIR a akcelerometr) {#motion-rules-pir-and-accelerometer}

Kanály `pir-motion` a `accel-motion` hlásí jen události pohybu. Konec pohybu nehlásí nikdy, a proto jejich pravidla pracují s časovými okny:

- **`from 0 to 1`** (hrana): vyvolá se při události pohybu. Dalších `dwell` sekund se pravidlo nemůže vyvolat znovu a pak alarm skončí bez ohlášení.
- **`from 1 to 1`** (pohyb začal a skončil): první událost alarm aktivuje a každá další spustí klidové okno `dwell` sekund znovu od začátku. Jakmile `dwell` uplyne bez události, alarm se zruší a zrušení se ohlásí. Na každé období pohybu tak připadá jeden alarm.
- **`from 0 to 0`** (klid): alarm se aktivuje, jakmile uplyne `dwell` sekund bez události, například u stroje, který musí nahlásit, že přestal vibrovat. Další událost alarm zruší a zrušení se ohlásí.

Akcelerometr hlásí události pohybu jen tehdy, když `accel-motion-sensitivity` není `off`.

### Četnostní pravidla {#rate-rules}

Četnostní pravidlo hlídá čítač Hallova spínače, vstupu (režim `digital` nebo `pulse`), PIR nebo akcelerometru. Má klíče `hi`, tedy počet přírůstků čítače, a `dwell`, délku okna pro počítání v sekundách (0–3600; 0 znamená `interval-report`).

- **Aktivace:** alarm se aktivuje, jakmile čítač v aktuálním okně vzroste aspoň o `hi`. Zařízení STICKER to kontroluje každé 3 s, takže na konec okna nečeká.
- **Trvale vysoká četnost:** dokud `hi` dosahuje i každé další okno, zůstává to jeden alarm. Zruší se na konci prvního okna, ve kterém čítač tolik nevzroste, a zrušení se ohlásí.
- **Vynulování čítače:** pravidlo se tím nevyvolá, okno jen začne znovu. S `hi` 0 se pravidlo nevyvolá nikdy.

:::note Firmware v1.4.x
Ve firmwaru v1.4.x je okno pro počítání u četnostního pravidla vždy `interval-report` a `dwell` po vyvolání alarmu jen blokuje další alarm. Pravidla pro pohyb `from 1 to 1` a `from 0 to 0` přibyla ve v2.0.0.
:::

## Příklady pravidel {#worked-examples}

### Teplota v místnosti 5–30 °C s pásmem necitlivosti 1 °C {#room-temperature-530-c-with-a-1-c-deadband}

Pravidlo 0: slot `mb`, kanál `temperature`, `lo` 5, `hi` 30, `dwell` 1. Každý řádek tabulky je jedno čtení senzoru:

| Hodnota | Co se stane |
|---|---|
| 29,8 °C | Nic, hodnota je v rozsahu 5–30 °C |
| 30,4 °C | Aktivuje se alarm HIGH |
| 29,5 °C | Alarm trvá, hodnota je stále nad 29 °C |
| 28,9 °C | Alarm HIGH se zruší |
| 4,6 °C | Aktivuje se alarm LOW |
| 5,7 °C | Alarm trvá, hodnota je stále pod 6 °C |
| 6,2 °C | Alarm LOW se zruší |

### Sonda DS18B20 pro 2–8 °C s pásmem necitlivosti 0,5 °C {#ds18b20-probe-28-c-with-a-05-c-deadband}

Pravidlo 1: slot `s1` (sonda DS18B20 ve slotu 1-Wire 1), kanál `temperature`, `lo` 2, `hi` 8, `dwell` 0,5. Takové pravidlo se hodí pro lednici.

- Alarm HIGH se aktivuje nad 8 °C a zruší se pod 7,5 °C.
- Alarm LOW se aktivuje pod 2 °C a zruší se nad 2,5 °C.
- Když se sonda odpojí, její hodnota bude `null`: aktivní alarm HIGH nebo LOW se zruší a místo něj se aktivuje vestavěný alarm chybějících dat pro tuto sondu.
- Slot 1 už musí očekávat sondu DS18B20 (`sensor1-type` 2), jinak zařízení pravidlo odmítne.

### Vstup A aktivní aspoň 5 s {#input-a-held-active-for-5-s}

Pravidlo 2: slot `mb`, kanál `input-a-state`, `from 1 to 1`, `dwell` 5. Hodí se pro dveřní kontakt, u kterého krátké otevření nevadí.

- Vstup A přejde do aktivního stavu (úroveň 1): alarm se aktivuje teprve poté, co vstup zůstane aktivní 5 s. Když vstup přestane být aktivní dřív, nic se neodešle.
- Vstup A přestane být aktivní: alarm se okamžitě zruší a zrušení se ohlásí.
- Vstup vyžaduje `cap-gpio-mode inputs` a `cap-gpio-input-a digital`.

### Vstup A napočítá 100 impulzů za 15 s {#input-a-counts-100-pulses-within-15-s}

Pravidlo 3: slot `mb`, kanál `input-a-count`, `hi` 100, `dwell` 15. Hodí se pro průtokoměr nebo pro výrobní linku, která nesmí běžet příliš rychle.

- Alarm se aktivuje, jakmile se v aktuálním okně 15 s napočítá 100 impulzů; zařízení to kontroluje každé 3 s.
- Dokud i každé další okno 15 s dosahuje 100 impulzů, zůstává to jeden alarm. Zruší se po prvním okně s menším počtem impulzů.
- Vstup vyžaduje `cap-gpio-mode inputs` a buď `cap-gpio-input-a pulse`, nebo `cap-gpio-input-a digital` spolu s `input-a-counter true`.

Stejná čtyři pravidla v shellu sestavení debug nebo provisioning (pravidlo pro `s1` vyžaduje nejdřív `sensor1-type 2`):

```text
alarm set 0 mb temperature lo 5 hi 30 dwell 1
alarm set 1 s1 temperature lo 2 hi 8 dwell 0.5
alarm set 2 mb input-a-state from 1 to 1 dwell 5
alarm set 3 mb input-a-count hi 100 dwell 15
```

<details>
<summary><b>Hodnoty pravidel a downlinky k těmto příkladům</b></summary>

Každé pravidlo je 18bajtová hodnota; její strukturu popisuje stránka [**Příkazy přes downlink**](../connectivity/downlink-commands.md). Hodnoty i downlinky za vás sestaví [**Generátor příkazů přes downlink**](../connectivity/downlink-commands-generator.mdx). Downlink je zpráva ze sítě do zařízení; zařízení STICKER přijímá příkazy na fPort 85, portu LoRaWAN určeném pro příkazy. Každý downlink níže zapíše jedno pravidlo a uloží ho (`"save": true`), takže se zařízení potom restartuje. Více pravidel zapíšete tak, že je pošlete bez `save` a `save` nastavíte jen u posledního.

| Pravidlo | 18bajtová hodnota | Downlink s uložením (hex, fPort 85) |
|---|---|---|
| `alarm_0`, teplota 5–30 °C, pásmo necitlivosti 1 °C | `0300000100000000a0400000f0410000803f` | `080112182a141a120300000100000000a0400000f0410000803f1801` **[ověřit]** |
| `alarm_1`, `s1` DS18B20, 2–8 °C, pásmo necitlivosti 0,5 °C | `03010002000000000040000000410000003f` **[ověřit]** | `080212182a14221203010002000000000040000000410000003f1801` **[ověřit]** |
| `alarm_2`, `input-a-state` z 1 na 1, 5 s | `03000901010100000000000000000000a040` **[ověřit]** | `080312182a142a1203000901010100000000000000000000a0401801` **[ověřit]** |
| `alarm_3`, `input-a-count` aspoň 100 za 15 s | `03000a010000000000000000c84200007041` **[ověřit]** | `080412182a14321203000a010000000000000000c842000070411801` **[ověřit]** |

První downlink jako JSON pro kodek STICKER:

```json
{ "seq": 1, "command": "set_param", "set_param": { "alarms": { "alarm_0": "0300000100000000a0400000f0410000803f" }, "save": true } }
```

</details>

## Co se stane, když se alarm aktivuje nebo zruší {#what-happens-when-an-alarm-triggers-or-clears}

Když se alarm pravidla či vestavěný alarm aktivuje nebo zruší, zařízení STICKER postupuje takto:

1. **Alarmové hlášení na fPort 3.** První změna otevře okno pro sběr o délce `alarm-limit` sekund (výchozí 10 s). Všechny změny v tomto okně se spojí do jednoho alarmového hlášení, které zařízení odešle na konci okna. Okno, ve kterém se nasbíralo 16 změn, se odešle hned. S `alarm-limit 0` odchází každá změna okamžitě. fPort je číslo portu LoRaWAN, podle kterého se rozlišují typy zpráv.
2. **Mimořádná telemetrie na fPort 2.** První změna také vyvolá telemetrický uplink (zprávu ze zařízení do sítě) s aktuálními hodnotami, a to po náhodném zpoždění až 10 s. Nejvýš jeden takový mimořádný uplink odešle zařízení STICKER za každé období `alarm-limit`.
3. **Stav alarmů v každém telemetrickém uplinku.** Každý uplink na fPort 2 nese `alarm_status` a `alarm_status_flags` s příznaky `alarm_any`, `alarm_threshold`, `alarm_state`, `alarm_rate`, `alarm_no_data`, `alarm_low_battery` a `alarm_sensor_mismatch`. Stav se tak do sítě dostane, i když se alarmové hlášení ztratí.
4. **Aktivní alarmy v uplinku Info.** Pole `active_alarms` obsahuje všechny aktivní alarmy s jejich slotem, kanálem a typem. Uplink Info odchází po každém připojení k síti, každých `interval-announce` hodin (výchozí 24 h) a na vyžádání příkazem `get_info`. Aplikace HARDWARIO Manager ukazuje stejný seznam v poli **Active alarms** na obrazovce **Device info**.
5. **Červená LED.** Dokud je aktivní některý alarm, LED každé 3 s krátce (5 ms) blikne červeně. Přednost před tímto bliknutím mají jiné vzory: relace NFC, nepovedené načtení nastavení, síťové vzory (připojování nebo opětovné připojování: žluté a červené bliknutí; zhoršené spojení: dvě žlutá bliknutí) a jedno žluté bliknutí při `radio-mode off`. Dokud se zobrazuje některý z nich, alarmové bliknutí neuvidíte, i když zařízení STICKER alarmy dál vyhodnocuje. Všechny vzory LED popisuje stránka [**Popis hardwaru**](../hardware-description.md).
6. **Bzučák.** Na variantě s bzučákem a s `cap-gpio-mode buzzer` zahraje bzučák podle `alarm-buzzer-mode` alarmovou melodii (pět krátkých pípnutí, asi 0,9 s) pokaždé, když se aktivuje nový alarm, i když už jsou aktivní jiné alarmy. Dokud zůstává aktivní některý alarm, melodie se opakuje podle tabulky níže, a jakmile se zruší poslední alarm, bzučák ztichne. Varianta s bzučákem zatím s firmwarem v2.0.0 nebyla na hardwaru otestovaná **[ověřit]**.

| `alarm-buzzer-mode` | Zvuk při aktivním alarmu |
|---|---|
| `off` (výchozí) | Žádný |
| `once` | Melodie jednou při každém novém alarmu |
| `slow` | Melodie každých 120 s |
| `normal` | Melodie každých 30 s |
| `fast` | Melodie každých 10 s |
| `continuous` | Melodie bez přestávky |

## Doručení a spolehlivost {#delivery-and-reliability}

- **Ve výchozím stavu bez potvrzení:** alarmové hlášení, které se cestou ztratí, se znovu neodesílá. Stav se do sítě přesto dostane s dalším telemetrickým uplinkem.
- **Potvrzované alarmy:** s `radio-alarm-ack true` jsou alarmová hlášení potvrzované uplinky. Síť musí každé z nich potvrdit a nepotvrzené hlášení zařízení STICKER zopakuje až 3krát, po náhodných prodlevách 1–2 s, 1–4 s a 1–8 s. Alarmové hlášení, které potvrzení nikdy nedostane, se nepočítá jako neúspěšná kontrola spojení.
- **Výpadek spojení:** dokud zařízení STICKER není připojené k síti, alarmové hlášení zadrží a přidává do něj další změny. Odešle ho po dalším připojení k síti, hned po uplincích Info a settings-info. Viz [**Připojení k síti**](network-connection.md).
- **Omezení velikosti:** jeden rámec alarmového hlášení pojme až 8 změn, při nízké datové rychlosti méně. Datová rychlost je nastavení rychlosti v LoRaWAN, které omezuje i velikost rámce. Jedno hlášení zabere nejvýš 4 rámce; co se nevejde, odejde v dalším hlášení. Zadržené hlášení pojme až 16 změn; další změny se zahodí, ale do `total` se dál započítávají. Na nejnižším stupni datové rychlosti (11 B), kde se do rámce nevejde ani jedna změna, nesou stav jen alarmové bity v telemetrii.
- **Restart po příkazu:** příkaz, který zařízení restartuje, například uložení nebo reset, nejdřív počká, až odejdou alarmové rámce z fronty, nejvýš však 120 s.
- **Po každém restartu:** stav alarmů se drží v RAM a začíná prázdný. Podmínky, které stále platí, se znovu aktivují a po připojení k síti se znovu ohlásí: prahová pravidla při prvním vyhodnocení, stavová pravidla na úroveň po uplynutí svého `dwell`, slabá baterie při prvním platném měření a chybějící data po 5 s. Pravidla na hranu a četnostní pravidla se znovu vyvolají až při nové události, stejně jako pravidla pro pohyb `from 0 to 1` a `from 1 to 1`. Pravidlo pro klid (`from 0 to 0`) se znovu aktivuje `dwell` sekund po restartu, pokud mezitím nepřijde žádná událost pohybu, a alarm `sensor_mismatch` se vrátí, jakmile STICKER při startu přiřadí sondy ke slotům. Jakmile backend zjistí restart, například podle `boot: true` v prvním telemetrickém uplinku po připojení k síti, měl by uzavřít své otevřené alarmy.

:::note Firmware v1.4.x
Ve firmwaru v1.4.x pojme okno pro sběr nejvýš 8 změn a alarmové rámce se mohou ztratit při shluku změn nebo když se zařízení restartuje hned po příkazu.
:::

<details>
<summary><b>Dekódovaná alarmová hlášení</b></summary>

Aktivace alarmu z teplotního příkladu (pravidlo 0) při 30,4 °C **[ověřit]**:

```text
010880cae2d00610011a0528c02f48022001
```

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "mb",
      "channel": "temperature",
      "rule": 0,
      "event": "activate",
      "type": "high",
      "value": 30.4,
      "time": 1780000000
    }
  ],
  "truncated": false
}
```

Zrušení téhož alarmu o 30 min později při 28,9 °C **[ověřit]**:

```text
010888d8e2d00610011a07100128942d48022001
```

```json
{
  "base_time": 1780001800,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "mb",
      "channel": "temperature",
      "rule": 0,
      "event": "deactivate",
      "type": "high",
      "value": 28.9,
      "time": 1780001800
    }
  ],
  "truncated": false
}
```

- `base_time`: čas otevření okna pro sběr jako unixová časová značka. `time` každé změny je `base_time` plus její posun v rámci okna.
- `total`: počet změn v okně, včetně těch, které se nevešly.
- `rule`: číslo pravidla 0–15, nebo `null` u vestavěného alarmu.
- `event`: `activate` nebo `deactivate`. `type` zachovává podmínku, takže alarm HIGH se zruší jako `deactivate` s `type` `high`.
- `type`: `low`, `high`, `trigger` (stavová pravidla, pravidla pro pohyb a četnostní pravidla), `no_data` nebo `sensor_mismatch`.
- `value`: hodnota v jednotkách kanálu. Četnostní pravidla hlásí stav čítače, stavová pravidla 0 nebo 1.
- `time_synced`: `false`, když zařízení ještě nemělo nastavené hodiny; každý `time` je pak `null`.

Příklady alarmů 1-Wire najdete na stránce [**Sondy 1-Wire**](one-wire.md).

</details>

## Kde se alarmy nastavují {#where-to-configure-alarms}

- **HARDWARIO Manager:** **Configuration → Alarms**, viz [**Pravidla alarmů**](/apps/hardwario-manager/sticker/alarms) v průvodci aplikací HARDWARIO Manager. Aplikace pravidla zapisuje i s uložením, takže se zařízení potom restartuje **[ověřit]**.
- **Downlink:** `set_param` s `alarms.alarm_0` až `alarms.alarm_15`. `alarms_replace` udělá z jedné zprávy kompletní tabulku pravidel, takže pravidla smazaná na hostiteli zmizí i ze zařízení. Viz [**Příkazy přes downlink**](../connectivity/downlink-commands.md) a [**Generátor příkazů přes downlink**](../connectivity/downlink-commands-generator.mdx); generátor zakóduje i `alarm_buzzer_mode` a `radio_alarm_ack`, které kodek `ttn.js` v2.0.0 z JSON zakódovat neumí.
- **Shell:** `alarm set`, `alarm new`, `alarm list` a `alarm clear` v sestavení debug nebo provisioning, viz [**Pravidla alarmů**](../developer-access/alarm-rules.md).

Kdy se změny projeví:

- Pravidlo zapsané downlinkem nebo přes NFC začne platit hned, bez restartu, ale restart přežije, jen když se uloží (`"save": true` ve zprávě nebo příkaz `settings_save`, obojí zařízení restartuje).
- V shellu `alarm set`, `alarm new` a `alarm clear` ukládají hned, bez restartu.
- Na odmítnuté pravidlo zařízení odpoví chybou `OUT_OF_RANGE` a `fault_field` 400 plus číslo pole pravidla (403 pro `alarm_0` až 418 pro `alarm_15`) a změny z celé zprávy vrátí zpět. Dekodér toto číslo rozdělí, takže chyba u odmítnutého `alarm_0` se dekóduje jako `"fault_group": 4` a `"fault_field": 3`.
- Obecné parametry alarmů se chovají jako ostatní nastavení: když je pošlete downlinkem nebo přes NFC, začnou platit až po uložení.

| Parametr | Výchozí | Význam |
|---|---|---|
| `alarm-limit` | 10 s (0–3600 s) | Okno pro sběr alarmového hlášení; 0 odešle každou změnu hned |
| `alarm-buzzer-mode` | `off` | Chování bzučáku na variantě s bzučákem |
| `radio-alarm-ack` | `false` | Odesílat alarmová hlášení jako potvrzované uplinky |
| `battery-level` | 2400 mV (1000–3600 mV) | Práh alarmu slabé baterie |

:::note Firmware v1.4.x
Pravidla z firmwaru v1.4.x mají 17 bajtů a používají jiná čísla typů 1-Wire (1 pro DS18B20 a 2 pro MACHINE PROBE místo 2 a 3). Nepřevádějí se: firmware v2.0.0 je při prvních startech po aktualizaci smaže, takže všechna pravidla zapište znovu.
:::
