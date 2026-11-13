---
slug: alarms
title: Alarmy
description: Jaké alarmy zařízení STICKER má, jak fungují tři druhy pravidel alarmů a co se stane, když alarm začne nebo skončí.
---
import LedPattern from '@site/src/components/LedPattern';

# Alarmy {#alarms}

Tato stránka popisuje vestavěné alarmy, tři druhy pravidel alarmů a to, co zařízení udělá, když alarm začne nebo skončí.

## Vestavěné alarmy a pravidla alarmů {#built-in-alarms-and-alarm-rules}

Tři alarmy fungují samy, bez nastavování:

| Vestavěný alarm | Kdy začne | Kdy skončí |
|---|---|---|
| Slabá baterie | Napětí baterií klesne pod práh slabé baterie (`battery-level`, výchozí 2,4 V) | Napětí stoupne o 0,3 V nad práh |
| Chybějící data | Zapnutý senzor nebo sonda 1-Wire přestane dodávat hodnoty | Hodnoty znovu přicházejí |
| Nesprávná sonda 1-Wire | Sonda slotu 1-Wire chybí a je připojená sonda jiného typu, kterou nemůže převzít žádný volný slot, viz [**Sondy 1-Wire**](one-wire.md) | Vrátí se správná sonda nebo se slot nastaví znovu |

Kromě toho můžete vytvořit až 16 pravidel alarmů. Každé pravidlo hlídá jednu hodnotu ze základní desky zařízení STICKER nebo ze sondy 1-Wire. Stejnou hodnotu může hlídat i několik pravidel, například pro varovnou a kritickou úroveň. Pravidlo je neaktivní, dokud je jeho senzor nebo vstup vypnutý.

## Tři druhy pravidel {#three-kinds-of-rules}

### Prahová pravidla {#threshold-rules}

Prahové pravidlo hlídá měřenou hodnotu, například teplotu, vlhkost nebo napětí na vstupu. Alarm začne, když naměřená hodnota opustí rozsah mezi dolní a horní mezí. Skončí, až když se hodnota vrátí do rozsahu a vzdálí se od meze o víc, než je pásmo necitlivosti (hystereze). Díky tomu alarm nezačíná a nekončí pořád dokola, když hodnota kolísá kolem meze.

Příklad: teplota v místnosti 5–30 °C s hysterezí 1 °C.

| Naměřená hodnota | Co se stane |
|---|---|
| 30,4 °C | Začne alarm HIGH |
| 29,5 °C | Alarm trvá, hodnota je stále nad 29 °C |
| 28,9 °C | Alarm HIGH skončí |
| 4,6 °C | Začne alarm LOW |
| 6,2 °C | Alarm LOW skončí, hodnota je nad 6 °C |

Ve výchozím nastavení čte zařízení STICKER senzory jednou za interval hlášení (`interval-report`, výchozí 15 min), takže prahový alarm může začít se zpožděním až 15 min. Chcete-li, aby alarm reagoval rychleji, nastavte kratší interval měření (`interval-sample`, 5–3600 s).

### Stavová pravidla {#state-rules}

Stavové pravidlo hlídá něco, co má jen dva stavy: Hallův spínač, digitální vstup, pohyb zachycený senzorem PIR či akcelerometrem nebo upozornění na náklon ze sondy MACHINE PROBE. Nastavíte, který stav alarm vyvolá a jak dlouho musí trvat, nejvýš 3600 s.

Příklad: dveře s kontaktem na vstupu A se smějí krátce otevřít. Při době trvání 5 s začne alarm teprve tehdy, když vstup A zůstane aktivní 5 s, a skončí, jakmile vstup přestane být aktivní. Pokud přestane být aktivní dřív, zařízení nic neodešle.

Další varianty stavového pravidla se vyvolají jednou při změně stavu nebo hlídají pohyb či klid. Popisuje je stránka [**Pravidla alarmů**](../developer-access/alarm-rules.md).

### Četnostní pravidla {#rate-rules}

Četnostní pravidlo hlídá čítač, například čítač Hallova spínače, vstupu, senzoru PIR nebo akcelerometru. Nastavíte počet, při kterém alarm začne, a délku okna pro počítání, nejvýš 3600 s.

Příklad: průtokoměr na vstupu A nesmí za 15 s dodat 100 impulzů. Alarm začne, jakmile se v jednom okně napočítá 100 impulzů. Zařízení počet kontroluje každé 3 s. Dokud 100 impulzů dosahuje i každé další okno, jde stále o jeden alarm. Skončí po prvním okně s menším počtem impulzů.

## Co se stane, když alarm začne nebo skončí {#when-an-alarm-starts-or-ends}

- **Alarmový report:** první změnou začíná doba sběru (`alarm-limit`, výchozí 10 s). Všechny změny alarmů z této doby pak zařízení STICKER odešle společně v jednom alarmovém reportu. Je to zpráva se seznamem alarmů, které začaly nebo skončily.
- **Mimořádná telemetrie:** první změna navíc do 10 s vyvolá telemetrii (pravidelné hlášení s měřením) s aktuálními hodnotami.
- **Stav alarmů:** každá telemetrie nese stav alarmů, takže ho backend zjistí, i když se alarmový report ztratí.
- <LedPattern pattern="red" /> **LED:** dokud je aktivní některý alarm a zařízení je ve stavu Připojeno, LED každé 3 s velmi krátce blikne červeně.
- **Bzučák:** zařízení ve variantě s bzučákem zahraje při začátku alarmu krátkou melodii, jednou nebo opakovaně, dokud neskončí poslední alarm. Chování určuje režim bzučáku (`alarm-buzzer-mode`, výchozí vypnuto).

## Spolehlivost {#reliability}

- **Bez opakování:** ve výchozím nastavení se alarmový report, který se ztratí, znovu neposílá. Když zapnete potvrzované alarmy (`radio-alarm-ack`, výchozí vypnuto), síť každý alarmový report potvrdí a nepotvrzený report zařízení STICKER zopakuje až třikrát.
- **Mimo síť:** dokud zařízení STICKER nemá spojení, alarmový report zadrží, shromáždí v něm až 16 změn a odešle ho hned po novém připojení k síti.
- **Po restartu:** zařízení STICKER startuje bez aktivních alarmů. Alarmy, jejichž podmínka stále platí (například teplota mimo rozsah), zařízení ohlásí znovu, jakmile se připojí k síti. Když první telemetrie po restartu nese `boot: true`, uzavřete otevřené alarmy v backendu.

## Nastavení pravidel {#setting-up-rules}

- **HARDWARIO Manager:** **Configuration → Alarms**, viz [**Pravidla alarmů**](/apps/hardwario-manager/sticker/alarms) v průvodci aplikací HARDWARIO Manager.
- **Downlink** (zpráva ze sítě do zařízení): příkaz `set_param` s pravidly `alarm_0` až `alarm_15`. Příkaz za vás sestaví [**Generátor příkazů přes downlink**](../connectivity/downlink-commands-generator.mdx).
- **Shell:** příkazy `alarm`, viz [**Pravidla alarmů**](../developer-access/alarm-rules.md).

Pravidlo poslané downlinkem nebo přes NFC platí hned, ale restart přežije, až když ho uložíte. Při uložení se zařízení restartuje. Pravidla nastavená v shellu se ukládají okamžitě.

<details>
<summary><b>Příklady v podobě příkazů</b></summary>

V shellu zapíšete tři příklady jako pravidla 0 až 2 pro základní desku zařízení STICKER (`mb`) takto:

```text
alarm set 0 mb temperature lo 5 hi 30 dwell 1
alarm set 1 mb input-a-state from 1 to 1 dwell 5
alarm set 2 mb input-a-count hi 100 dwell 15
```

Parametr `dwell` je podle druhu pravidla hystereze, doba trvání stavu nebo okno pro počítání.

V downlinku má teplotní pravidlo podobu 18bajtové hodnoty `0300000100000000a0400000f0410000803f`. Jako JSON na fPort 85 (port LoRaWAN pro příkazy) ho zapíšete jako pravidlo 0 a uložíte takto:

```json
{ "seq": 1, "command": "set_param", "set_param": { "alarms": { "alarm_0": "0300000100000000a0400000f0410000803f" }, "save": true } }
```

Více pravidel zapíšete tak, že je pošlete bez `save` a `save` nastavíte jen u posledního. Když zařízení některé z pravidel odmítne, nepoužije z dané zprávy nic.

</details>
