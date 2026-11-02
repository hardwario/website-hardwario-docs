---
slug: one-wire
title: Sondy 1-Wire
description: Jak zařízení STICKER najde sondy DS18B20 a MACHINE PROBE na sběrnici 1-Wire a co se stane, když se sonda odpojí, znovu připojí nebo vymění.
---

# Sondy 1-Wire {#1-wire-probes}

:::caution Koncept
Tato stránka je koncept pro interní kontrolu. Tvrzení označená **[ověřit]** je ještě potřeba potvrdit na hardwaru nebo u vlastníka produktu.
:::

:::info Firmware v2.0.0
Tato stránka popisuje **firmware STICKER v2.0.0**. Kde se firmware v1.4.x chová jinak, upozorní na to poznámka **Firmware v1.4.x**.
:::

Zařízení STICKER Input čte externí sondy na své sběrnici 1-Wire: teplotní sondy DS18B20 a sondu MACHINE PROBE. Stránka vysvětluje, jak STICKER sondy najde a přiřadí ke slotům a co uvidíte, když se sonda odpojí, znovu připojí nebo vymění. Na konci najdete postup výměny sondy krok za krokem. Zapojení a nastavení popisuje stránka [**Teplotní sondy 1-Wire**](../sticker-input-wiring/one-wire-dallas.md).

## Co STICKER podporuje {#what-is-supported}

| Sonda | Typ senzoru (číslo) | Kanály |
|---|---|---|
| DS18B20 | `dallas` (2) | `temperature` |
| [**MACHINE PROBE**](../sticker-input-wiring/machine-probe.md) | `machine-probe` (3) | `temperature`, `humidity`, `temperature-aux`, `illuminance`, `magnetic-field`, `tilt`, `accel-x`, `accel-y`, `accel-z` |

- **Čtyři sloty:** STICKER pracuje až se čtyřmi sondami ve slotech `s1` až `s4`. Každý slot je přiřazený k jedné sondě podle její ROM, tedy jedinečného identifikátoru, který má každé zařízení 1-Wire (kód rodiny, 48bitové sériové číslo a kontrolní součet). Slot určuje název, pod kterým se hodnoty objevují v telemetrii, v historii a v pravidlech alarmů.
- **Nejvýš dvě sondy každého typu:** firmware obslouží současně nejvýš dvě sondy DS18B20 a dvě sondy MACHINE PROBE a třetí sondu stejného typu ignoruje. V praxi to znamená až 2 sondy DS18B20 a k tomu 2 sondy MACHINE PROBE.
- **Předpoklady:** zařízení STICKER Input s přepínačem DIP S1 v poloze 1-Wire (přepínač 3 pro vstup A, 6 pro vstup B), `cap-w1-sensors true` a režim tohoto vstupu nastavený na `none`. Firmware release podporu 1-Wire obsahuje, výchozí sestavení debug ji vynechává.

## Jak STICKER hledá sondy {#how-sticker-finds-probes}

STICKER prohledává sběrnici a hledá na ní sondy jen v těchto chvílích:

- **Při startu,** pokud je nastavený aspoň jeden slot, tedy pokud má uloženou ROM (`sensorN-rom`) nebo očekávaný typ senzoru (`sensorN-type`). Nové zařízení bez nastaveného slotu při startu sběrnici neprohledává.
- **Na pozadí,** dokud některý nastavený slot nemá svou sondu: poprvé asi 2 min po startu, potom po dalších 5, 10 a 15 min a dál každých 15 min. To je zhruba 2, 7, 17 a 32 min po startu a potom každých 15 min. Každá kontrola je rychlé prohledání sběrnice a STICKER sondy ke slotům znovu přiřadí, jen když se sestava sond na sběrnici změnila. Jakmile má každý nastavený slot svou sondu, kontroly na pozadí skončí.
- **Na příkaz `w1_scan`,** poslaný downlinkem (zprávou ze sítě do zařízení) nebo přes NFC. Aplikace HARDWARIO Manager ho posílá, když čte sloty 1-Wire. Odpověď obsahuje až 4 ROM nalezené na sběrnici a STICKER přitom znovu přiřadí sondy ke slotům a spustí kontroly na pozadí od začátku. Na zařízení bez nastaveného slotu toto nové přiřazení nic nezmění.

Nalezenou sondu STICKER přiřadí bez restartu a pořídí z ní nové měření.

## Přiřazení první sondy {#enrolling-the-first-probe}

STICKER sondu používá, až když je pro ni nastavený slot. Slot nastavíte těmito způsoby:

- **HARDWARIO Manager:** v **STICKER → Tools → 1-Wire sensors** přečtěte sloty a prohledejte sběrnici, každou sondu přiřaďte ke slotu a zvolte **Save to device**. Viz [**Senzory 1-Wire**](/apps/hardwario-manager/sticker/one-wire-sensors) v průvodci aplikací HARDWARIO Manager.
- **Zprovoznění:** předem nastavte `sensorN-type` (2 pro DS18B20, 3 pro MACHINE PROBE) a uložte. Při dalším startu STICKER prohledá sběrnici a vyhovující sondu sám přiřadí do nejnižšího volného slotu, který její typ přijímá. Slot bez typu přijme jakoukoli sondu, proto typy nastavujte postupně od `sensor1-type` a žádný slot nevynechávejte; jinak sonda skončí v nižším slotu bez typu a slot s typem zůstane ve stavu `absent`.
- **Downlink:** přečtěte ROM příkazem `w1_scan`, pak zapište `sensorN-rom` příkazem `set_param` a uložte. Slot používá jiné pořadí bajtů než odpověď na prohledání, podrobnosti najdete u postupu výměny níže.
- **Shell** (image provisioning; výchozí sestavení debug podporu 1-Wire ani příkaz `w1` nemá): `w1 scan` nebo `w1 enroll`, potom `settings save`.

**Automatické přiřazení:** kdykoli STICKER přiřazuje sondy ke slotům a najde sondu, která nepatří žádnému slotu, přiřadí ji do nejnižšího volného slotu, tedy do slotu bez ROM, který očekává typ této sondy nebo žádný typ. Takové přiřazení zůstává v RAM, dokud se nastavení neuloží, a do flash paměti ho zapíše kterékoli pozdější uložení. Neuložené přiřazení se při dalším startu zopakuje jen tehdy, když uložené nastavení už obsahuje aspoň jeden nastavený slot (s uloženou ROM nebo `sensorN-type`), protože jen tehdy STICKER při startu prohledá sběrnici **[ověřit]**. Pokud se mezitím změnily sondy na sběrnici, může sonda skončit v jiném slotu, takže po přiřazení nastavení uložte.

## Jak se sondy přiřazují ke slotům {#how-probes-are-assigned-to-slots}

Kdykoli STICKER přiřazuje sondy ke slotům, řídí se těmito pravidly:

1. Slot s uloženou ROM dostane sondu přesně s touto ROM, ať se sondy najdou v jakémkoli pořadí. Slot proto vždy znamená tutéž fyzickou sondu.
2. Každá zbývající sonda připadne do nejnižšího volného slotu, který očekává její typ nebo žádný typ.
3. Nastavený slot, který zůstane bez své sondy, má stav `absent`. Stav `replaced` má, když je na sběrnici nová sonda stejného typu, a stav `mismatch`, když očekává určitý typ a na sběrnici je sonda jiného typu, kterou nemohl převzít žádný volný slot.

Dodržujte stejné pořadí slotů na všech zařízeních, jinak bude tentýž název slotu na různých zařízeních znamenat jinou sondu.

## Když se sonda odpojí {#when-a-probe-is-disconnected}

Když sondu odpojíte, přeruší se její kabel nebo sonda selže, projeví se to takto. Restart přitom není potřeba.

- **Hodnoty:** od příštího čtení senzorů jsou hodnoty slotu v telemetrii i v historii `null`. Ve výchozím nastavení čte STICKER senzory jednou za interval hlášení.
- **Stav slotu:** `absent` v uplinku Info, tedy ve stavové zprávě, kterou zařízení posílá do sítě po každém připojení. Slot si ponechá ROM a STICKER sondu zkouší znovu při každém čtení.
- **Alarm chybějících dat:** jakmile hodnoty chybí 5 s, STICKER vyvolá jeden alarm chybějících dat pro celou sondu (kanál `device`, číslo 255). Aktivní prahový alarm slotu se zruší, protože jeho hodnota chybí. Dokud je alarm aktivní, bliká červená LED.
- **Jeden čip sondy MACHINE PROBE:** když selže jen jeden čip a sonda dál odpovídá, ostatní kanály si hodnoty ponechají a alarm chybějících dat uvede první kanál vadného čipu. Čip, který od přiřazení slotu ještě nic nenahlásil, například TMP112, který daná revize sondy nemá, alarm nikdy nevyvolá.

## Když se tatáž sonda znovu připojí {#when-the-same-probe-is-reconnected}

Jakmile sonda znovu odpoví, při nejbližším čtení:

- slot přejde zpět do stavu `ok` a hodnoty se znovu objeví;
- alarm chybějících dat se zruší a zrušení se ohlásí;
- sondě MACHINE PROBE se znovu nastaví akcelerometr.

Restart není potřeba. Pokud se zařízení restartovalo, zatímco byla sonda odpojená, slot po startu sondu nemá a STICKER ji najde při kontrole na pozadí nebo po příkazu `w1_scan`.

## Když se sonda vymění {#when-a-probe-is-replaced}

Nová sonda má jinou ROM, i když jde o stejný model. STICKER nikdy sám nepřesune novou sondu do slotu té staré, protože ten slot zůstává přiřazený ke staré ROM.

| Situace | Starý slot | Nová sonda |
|---|---|---|
| Stejný typ, volný slot je k dispozici | `replaced`, hodnoty `null`, alarm chybějících dat | Přiřadí se do volného slotu a její hodnoty se objeví pod tímto slotem |
| Stejný typ, žádný volný slot | `replaced`, hodnoty `null`, alarm chybějících dat | Nepoužívá se, dokud ji nepřiřadíte |
| Jiný typ, volný slot ji může převzít | `absent`, hodnoty `null`, alarm chybějících dat | Přiřadí se do volného slotu se svým vlastním typem |
| Jiný typ, žádný volný slot ji nemůže převzít | `mismatch`, hodnoty `null`, alarm `sensor_mismatch` místo alarmu chybějících dat, pravidla alarmů slotu jsou neaktivní | Nepoužívá se, dokud ji nepřiřadíte |

- Pravidla alarmů a kanály historie starého slotu nepřecházejí s novou sondou do jiného slotu.
- Pokud sondu vyměníte za běhu zařízení, STICKER novou sondu sám hledat nezačne: starý slot se dál považuje za obsazený, takže se nespustí žádná kontrola na pozadí (pokud už na svou sondu nečeká jiný nastavený slot). Nové přiřazení vyvolejte příkazem `w1_scan` (aplikace HARDWARIO Manager ho posílá, když čte sloty 1-Wire), nebo zařízení restartujte.

### Výměna sondy krok za krokem {#replace-a-probe-step-by-step}

Tento postup umístí novou sondu do slotu té staré, takže její hodnoty, pravidla alarmů a historie zůstanou pod stejným názvem slotu. Potřebujete telefon s NFC a aplikací HARDWARIO Manager a zařízení musí být napájené.

1. Odpojte starou sondu a novou připojte ke stejnému vstupu. Přepínač DIP nechte, jak je.
2. V aplikaci HARDWARIO Manager přejděte na **STICKER → Tools → 1-Wire sensors**, zvolte **Read slots & scan the 1-Wire bus** a přiložte telefon k zařízení. Při prohledání STICKER zároveň znovu přiřadí sondy ke slotům, takže nová sonda může sama skončit ve volném slotu.
3. Přečtěte sloty ještě jednou, aby aplikace ukázala, kam STICKER novou sondu umístil **[ověřit]**.
4. Novou sondu, kterou aplikace zobrazuje podle její ROM, přiřaďte ke slotu staré sondy. Aplikace ji přitom odebere z jakéhokoli jiného slotu. Sondy od sebe rozlišíte tak, že jednu zahřejete v ruce a sledujete, která aktuální hodnota se mění.
5. Vyprázdněte každý slot, který už sondu nemá.
6. Zvolte **Save to device** a přiložte telefon k zařízení. STICKER sloty uloží a restartuje se.
7. Zkontrolujte výsledek: příští uplink Info ukáže slot ve stavu `ok`, telemetrie pro něj obsahuje hodnoty a jeho alarm chybějících dat nebo nesouhlasu senzoru se zruší. Pokud se slot, který jste vyprázdnili, v telemetrii dál objevuje s hodnotami `null`, má ještě nastavený očekávaný typ senzoru: nastavte jeho `sensorN-type` na 0 a uložte.
8. Pokud je nová sonda jiného typu, zapište pravidla alarmů slotu znovu, protože pravidla zapsaná pro starý typ zůstávají neaktivní. Pokud historie zaznamenává kanály tohoto slotu, začne znovu od začátku, protože se změnilo rozvržení jejího záznamu.

<details>
<summary><b>Výměna sondy přes rádio nebo v shellu</b></summary>

**Přes rádio** **[ověřit]**:

1. Pošlete `w1_scan`, například `{"seq":4,"command":"w1_scan"}` (hex `08047200` na fPort 85, port LoRaWAN pro příkazy). Odpověď obsahuje ROM nalezené na sběrnici, například `"rom": ["28abcdef010203b7"]`.
2. Přečtěte sloty příkazem `get_param`, například `{"seq":5,"command":"get_param","get_param":{"sensors_field":[11,12,13,14]}}` (hex `08051a061a040b0c0d0e`). Pole 11 až 14 jsou `sensor1_rom` až `sensor4_rom`.
3. Převeďte ROM nové sondy do formátu slotu: dva nulové bajty a za nimi šest bajtů sériového čísla (bajty 2 až 7 ROM) v obráceném pořadí. Z `28abcdef010203b7` tak vznikne `0000030201efcdab`.
4. Jedním příkazem `set_param` zapište slot, vyprázdněte každý jiný slot s novou sondou (smažte jeho ROM i typ) a uložte. Příklad níže zapíše slot 1 a vyprázdní slot 2.
5. Po restartu zkontrolujte uplink Info.

```json
{ "seq": 6, "command": "set_param", "set_param": { "sensors": { "sensor1_rom": "0000030201efcdab", "sensor2_rom": "0000000000000000", "sensor2_type": 0 }, "save": true } }
```

Hex (fPort 85): `0806121b22175a080000030201efcdab62080000000000000000c001001801`

**V shellu** (image provisioning) **[ověřit]**: `w1 list` vypíše sloty a `w1 scan` sondy na sběrnici. `w1 clear <slot>` slot zapomene, jeho ROM i typ. Vyprázdněte starý slot a každý slot, do kterého se dostala nová sonda. Pokud sonda sama neskončila ve správném slotu, přiřaďte ji příkazem `w1 enroll <slot> <rom>`. Výsledek zkontrolujte příkazem `w1 list` a uložte ho příkazem `settings save`. Jako `<rom>` zadejte 12místné sériové číslo tak, jak ho vypisují `w1 scan` a `w1 list`, ne 16místnou ROM z odpovědi na `w1_scan`.

</details>

## Kontrola naměřených hodnot {#reading-checks}

- **Rozsah:** hodnoty ze sondy DS18B20 mimo rozmezí −55 až 125 °C se odmítnou a hlásí se jako chybějící. Všechny ostatní hodnoty se také kontrolují proti platnému rozsahu svého kanálu.
- **Hodnota +85 °C:** sonda DS18B20 ukazuje po krátkém výpadku napájení přesně +85 °C. STICKER hlásí první hodnotu přesně +85 °C jako chybějící a přijme ji, až když i další čtení vrátí +85 °C, takže skutečných 85 °C se objeví o jedno čtení později.
- **Čipy sondy MACHINE PROBE:** STICKER čte sondu MACHINE PROBE čip po čipu. Vadný čip nechá na `null` jen své vlastní kanály. Čip TMP112 (`temperature-aux`) se po 3 neúspěšných čteních za sebou vynechává, dokud se sondy ke slotům znovu nepřiřadí (při startu, při prohledání sběrnice nebo při přiřazení nové sondy); starší revize sondy tento čip nemají.

## Jak se chybějící sondy projeví {#how-missing-probes-appear}

Údaj fPort v tabulce je číslo portu LoRaWAN, podle kterého se rozlišují typy zpráv.

| Kde | Co uvidíte |
|---|---|
| Telemetrie (fPort 2) | Slot se posílá dál, všechny jeho hodnoty jsou `null`. Vynechávají se jen sloty bez očekávaného typu. |
| Uplink Info (fPort 85) | `w1_slot_state` uvádí všechny čtyři sloty jako `none` (nepoužitý), `ok`, `absent`, `replaced` nebo `mismatch`. STICKER posílá Info po každém připojení k síti, každých `interval-announce` hodin (výchozí 24 h) a na příkaz `get_info`. |
| Alarmové hlášení (fPort 3) | `no_data` s kanálem `device` pro celou sondu, nebo s prvním kanálem a údajem `part` vadného čipu; `sensor_mismatch` s `detected_type` |
| Historie senzorů | Sloupce slotu se ukládají jako chybějící a dekódují se jako `null` |
| LED | Červené alarmové bliknutí každé 3 s, dokud je alarm aktivní |
| Shell (image provisioning) | `w1 list` u každého slotu ukazuje `present`, `absent`, `REPLACED?` nebo `MISMATCH` |

Více o alarmových hlášeních najdete na stránce [**Alarmy**](alarms.md) a o historii na stránce [**Historie a čítače**](history-and-counters.md).

<details>
<summary><b>Dekódované příklady</b></summary>

Telemetrie ze sady testů firmwaru, ve slotu 1 chybí sonda MACHINE PROBE a ve slotu 2 sonda DS18B20:

```text
01da010408011003da010408021002
```

```json
{
  "w1_sensors": [
    {
      "slot": 1,
      "type": 3,
      "type_name": "machine-probe",
      "values": {
        "temperature": null,
        "humidity": null,
        "temperature-aux": null,
        "illuminance": null,
        "magnetic-field": null,
        "tilt": null,
        "accel-x": null,
        "accel-y": null,
        "accel-z": null
      },
      "units": {
        "temperature": "degC",
        "humidity": "%RH",
        "temperature-aux": "degC",
        "illuminance": "lx",
        "magnetic-field": "mT",
        "tilt": "bool",
        "accel-x": "m/s2",
        "accel-y": "m/s2",
        "accel-z": "m/s2"
      }
    },
    {
      "slot": 2,
      "type": 2,
      "type_name": "dallas",
      "values": { "temperature": null },
      "units": { "temperature": "degC" }
    }
  ]
}
```

Sonda DS18B20 ve slotu 1 přestala odpovídat **[ověřit]**:

```text
010880cae2d00610011a0c080138ff01480450ff0158022001
```

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "s1",
      "channel": "device",
      "sensor_type": "dallas",
      "rule": null,
      "event": "activate",
      "type": "no_data",
      "value": null,
      "time": 1780000000
    }
  ],
  "truncated": false
}
```

Slot 1 očekává sondu DS18B20, ale najde sondu MACHINE PROBE, kterou žádný volný slot nemůže převzít **[ověřit]**:

```text
010880cae2d00610011a0b0801280638ff01480558022001
```

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "s1",
      "channel": null,
      "sensor_type": "dallas",
      "rule": null,
      "event": "activate",
      "type": "sensor_mismatch",
      "value": 3,
      "time": 1780000000,
      "detected_type": "machine-probe"
    }
  ],
  "truncated": false
}
```

Čip TMP112 sondy MACHINE PROBE ve slotu 2 selhal, zatímco sonda dál odpovídá **[ověřit]**:

```text
010880cae2d00610011a0b080238ff014804500258032001
```

```json
{
  "base_time": 1780000000,
  "total": 1,
  "time_synced": true,
  "alarms": [
    {
      "slot": "s2",
      "channel": "temperature-aux",
      "part": "tmp112",
      "sensor_type": "machine-probe",
      "rule": null,
      "event": "activate",
      "type": "no_data",
      "value": null,
      "time": 1780000000
    }
  ],
  "truncated": false
}
```

Když sonda nebo čip znovu odpoví, následuje stejná událost s `"event": "deactivate"`.

</details>

:::note Firmware v1.4.x
Firmware v1.4.x čísluje typy sond 1 (DS18B20) a 2 (MACHINE PROBE) a jeho dekodér dává `temperature`, `humidity` a `tilt_alert` přímo do každé položky `w1_sensors`. Firmware v2.0.0 používá čísla 2 a 3 a hodnoty dává pod `values`, takže dekodéry i pravidla alarmů je potřeba upravit. Očekávaný typ senzoru pro každý slot, alarm `sensor_mismatch` a stavy slotů v uplinku Info jsou novinkou ve v2.0.0.
:::

:::note Firmware v1.4.x
Ve firmwaru v1.4.x se sonda připojená až po startu najde teprve po restartu nebo po příkazu `w1 scan` v shellu. Příkaz `w1_scan` sondy vypíše, ale ke slotům je nepřiřadí, a kontroly na pozadí neprobíhají. Uložená přiřazení ROM ke slotům se do v2.0.0 přenesou a STICKER při prvním přiřazení doplní ke každému slotu typ senzoru **[ověřit]**.
:::
