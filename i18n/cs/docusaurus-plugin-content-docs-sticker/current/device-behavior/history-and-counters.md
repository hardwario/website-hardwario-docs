---
slug: history-and-counters
title: Historie a čítače
description: Jak zařízení STICKER ukládá historii senzorů a čítače impulzů, jak dlouho data vydrží, jak je vyčtete a co přežije reset nebo výměnu baterií.
---

# Historie a čítače {#history-and-counters}

:::caution Koncept
Tato stránka je koncept pro interní kontrolu. Tvrzení označená **[ověřit]** je ještě potřeba potvrdit na hardwaru nebo u vlastníka produktu.
:::

:::info Firmware v2.0.0
Tato stránka popisuje **firmware STICKER v2.0.0**. Kde se firmware v1.4.x chová jinak, upozorní na to poznámka **Firmware v1.4.x**.
:::

Zařízení STICKER si ve vlastní paměti může uchovávat dva druhy dat: historii senzorů, která překlene výpadky rádiového spojení, a čítače impulzů, které sčítají impulzy z měřičů a sepnutí spínačů. Stránka vysvětluje, co obojí obsahuje, jak dlouho data vydrží, jak je vyčtete a co se s nimi stane po resetu, výměně baterií nebo aktualizaci firmwaru. Příkazy shellu a úplný přehled parametrů najdete na stránkách [**Historie senzorů**](../developer-access/sensor-history.md) a [**Konfigurace**](../developer-access/configuration.md).

## Historie senzorů ve zkratce {#sensor-history-in-brief}

Historie senzorů je buffer typu store-and-forward ve flash paměti zařízení. V každém intervalu hlášení do ní STICKER zapíše jeden záznam s posledními hodnotami senzorů, a to i bez připojení k síti. Backend si uložené záznamy může vyžádat později a doplnit si mezery v datech.

- **Co ukládá:** jen pravidelné vzorky ze senzorů. Rádiový provoz historie nezaznamenává: alarmové události, odpovědi na příkazy ani změny nastavení se do ní neukládají.
- **Ve výchozím stavu vypnutá:** historie se začne plnit, až zapnete `history-enable` a uložíte nastavení, a to v aplikaci HARDWARIO Manager v **Configuration → History** nebo downlinkem z příkladů níže.
- **Jeden záznam za interval hlášení:** STICKER zapíše jeden záznam každých `interval-report` (výchozí 900 s, tedy 15 min). Mimořádné hlášení vyvolané alarmem nebo příkazem `force_send` či `sample` žádný záznam nepřidá, takže mezi záznamy je vždy přesně jeden interval.
- **Ukládá se i offline:** STICKER zapíše záznam dřív, než zkontroluje spojení se sítí, takže zaznamenává už před prvním připojením k síti, během výpadku i s `radio-mode off`.
- **Sloupce:** `history-channels` vybírá až 24 kanálů. Výchozí jsou teplota a vlhkost ze senzoru na desce. Zaznamenat lze kterýkoli kanál senzoru, včetně kanálů sond 1-Wire, čítačů a napětí analogových vstupů. Kanály pohybu z PIR a akcelerometru zaznamenají `1`, pokud během intervalu nastala aspoň jedna událost pohybu.
- **Jen hodnoty:** záznam nemá vlastní časovou značku. Jeho čas vyplývá z času prvního záznamu a z intervalu. Nedostupná hodnota, například z odpojené sondy, se uloží jako chybějící a dekóduje se jako `null`.

## Kolik historie se vejde {#how-much-history-fits}

Historie zabírá oblast flash paměti o velikosti 32 KB, která je rozdělená na 16 stránek po 2 KB. Každá stránka pojme 1 757 B záznamů a žádný záznam nepřesahuje do další stránky. Záznam je velký jako všechny vybrané kanály dohromady: 1 B pro vlhkost a stavy, 2 B pro teploty, tlak, osvětlenost a napětí, 4 B pro čítače. Úplný seznam je na stránce [**Historie senzorů**](../developer-access/sensor-history.md).

| Vybrané kanály | Velikost záznamu (B) | Počet záznamů | Dny při intervalu 15 min | Dny při intervalu 5 min | Dny při intervalu 1 min |
|---|---|---|---|---|---|
| Jen teplota | 2 | 14 048 | 146 | 49 | 9,8 |
| Teplota a vlhkost (výchozí) | 3 | 9 360 | 97,5 | 32,5 | 6,5 |
| Výchozí a jedna sonda DS18B20 | 5 | 5 616 | 58,5 | 19,5 | 3,9 |
| Výchozí a jeden čítač, nebo výchozí a dvě sondy DS18B20 | 7 | 4 016 | 41,8 | 13,9 | 2,8 |
| Největší možný záznam: 5 čítačů a 19 kanálů po 2 B | 58 | 480 | 5 | 1,7 | 0,3 |

Počítejte zhruba s 15/16 uvedených dob. Když je buffer plný, STICKER smaže celou nejstarší stránku najednou a každý start nechá zbytek jedné stránky nevyužitý. [**Kalkulačka historie senzorů**](../developer-access/sensor-history-calculator.mdx) spočítá velikost záznamu a pokrytou dobu pro libovolný výběr kanálů.

## Kdy se záznamy přepíšou nebo zahodí {#when-records-are-overwritten-or-discarded}

Za běžného provozu funguje buffer jako kruhový. Když je všech 16 stránek plných, STICKER smaže nejstarší stránku a použije ji znovu, takže nejstarší šestnáctina historie zmizí najednou. Po každém startu začne STICKER novou stránku a zbytek předchozí nechá prázdný, takže časté restarty historii zkracují.

Celou uloženou historii STICKER zahodí a začne ukládat od začátku, když:

- změníte `interval-report`, protože časy záznamů vyplývají z intervalu;
- změníte něco, co určuje rozvržení záznamu: `history-channels`, schopnost, kterou zaznamenávaný kanál potřebuje (například `cap-sht`), nebo typ senzoru ve slotu 1-Wire, jehož kanály se zaznamenávají;
- spustíte `history clear` v shellu, `factory_reset` nebo `vendor_reset`.

Restart, výměna baterií, ztráta spojení se sítí ani odpojená sonda historii nezahodí; odpojená sonda jen zanechá ve svých sloupcích chybějící hodnoty. `device_reset` uložené záznamy zachová, ale vrátí `history-enable`, `history-channels`, `interval-report` a schopnosti senzorů na výchozí hodnoty. Ukládání historie je pak vypnuté, dokud ho znovu nezapnete. Uložené záznamy zůstanou pro `req_history` čitelné jen tehdy, když vznikly s výchozím výběrem kanálů a výchozími schopnostmi senzorů; záznamy pořízené s jiným výběrem se po restartu nenajdou. Pokud ukládání znovu zapnete s jiným `interval-report`, než se kterým vznikly uložené záznamy, STICKER je zahodí, jakmile zapíše první nový záznam.

:::tip
Než změníte interval hlášení, výběr kanálů nebo sloty 1-Wire, historii si vyčtěte.
:::

## Ztráta napájení a časové značky {#power-loss-and-timestamps}

- **Ztráta napájení:** historie přežije reset, ztrátu napájení i výměnu baterií. STICKER zapisuje záznamy do flash paměti po 8 bajtech a ještě nezapsaný zbytek drží v RAM, takže při každém restartu a každé ztrátě napájení přijdete nejvýš zhruba o poslední 2 záznamy.
- **Čas po výměně baterií:** při ztrátě napájení se hodiny zastaví. Po restartu STICKER čas nezná, dokud ho znovu nezíská: ze sítě po připojení, nebo z telefonu přes NFC (`clock_sync`, v aplikaci HARDWARIO Manager přes **Tools → Sync time**). Záznamy pořízené do té doby nesou čas od startu a skutečný čas dostanou, jakmile se hodiny nastaví.
- **Záznamy bez času:** pokud se zařízení znovu restartuje dřív, než čas vůbec získalo, záznamy z tohoto běhu už skutečný čas nikdy nedostanou. Jejich rámec historie uvádí `time_synced: false` a dekodér u každého záznamu ukáže `time: null`.
- **Vypnuté rádio:** s `radio-mode off` není k dispozici síťový čas, takže hodiny nastaví jen `clock_sync` přes NFC. Viz [**Hodiny reálného času**](../developer-access/clock.md).
- **Sestavení debug:** drží historii v RAM, v bufferu o velikosti 992 B, který je po každém startu prázdný. Do flash paměti zaznamenává jen image release. Nahrání image debug nebo provisioning oblast historie přepíše.

:::note Firmware v1.4.x
Firmware v2.0.0 neumí přečíst historii uloženou verzí v1.4.x, takže po aktualizaci začíná historie prázdná. Návrat ke starší verzi není podporovaný. Co potřebujete, si vyčtěte před aktualizací. Ve v1.4.x se navíc záznamy uložené po restartu nebo ztrátě napájení mohly posunout v čase o délku výpadku.
:::

## Vyčtení historie {#reading-the-history-out}

Uložené záznamy vyčtete dvěma způsoby: přes rádio downlinkem `req_history`, nebo přes NFC v aplikaci HARDWARIO Manager. Downlink je zpráva ze sítě do zařízení, uplink zpráva ze zařízení do sítě.

### Přes rádio {#over-the-radio}

- **Jen na vyžádání:** STICKER historii sám nikdy neodesílá, ani po výpadku. Backend musí poslat downlink `req_history` na fPort 85 (číslo portu LoRaWAN, které STICKER používá pro příkazy a odpovědi na ně). Funguje to přes LoRaWAN i přes [**LoRa P2P**](../connectivity/lora-p2p.md).
- **Časové okno:** požadavek omezují `from_unix` a `to_unix` (unixový čas v sekundách, UTC). Bez nich zařízení pošle celý buffer.
- **Série rámců:** zařízení pošle odpovídající záznamy jako uplinky `history_frame` na fPort 85, všechny se stejným `seq` jako požadavek. Odpovědí je už první rámec, samostatné potvrzení nepřichází. Každý rámec nese `pages`, například `"1/12"`; celkový počet je odhad z okamžiku, kdy přenos začal.
- **Tempo:** mezi rámci jsou nejméně 3 s. Duty cycle (podíl vysílacího času, který rádiové předpisy povolují; v EU868 je to 1 %, tedy 36 s za hodinu) může mezery ještě prodloužit.
- **Počet záznamů v rámci:** velikost každého rámce se řídí aktuální datovou rychlostí (DR, nastavení rychlosti v LoRaWAN; DR0 je nejpomalejší a unese nejméně dat). S výchozími 3bajtovými záznamy se do rámce vejde asi 9 záznamů při DR0 a asi 70 při DR5. Při DR0 zabere jeden rámec asi 2,1 s vysílacího času, takže dlouhé odesílání historie při nízké datové rychlosti může trvat mnoho hodin. Vyžádejte si jen to časové okno, které potřebujete.
- **Jen jedno odesílání najednou:** zařízení druhý `req_history` během probíhajícího odesílání ignoruje a neodpoví na něj. Když se během odesílání ztratí spojení, odesílání skončí; požadavek pošlete později znovu.
- **Ukládání během odesílání:** STICKER během odesílání historie dál zaznamenává a nové záznamy nechá pro další požadavek. Dokud odesílání běží, nemůže ve flash paměti otevřít novou stránku, takže záznam, který ji potřebuje, zahodí. První záznam po každém restartu novou stránku potřebuje, proto `req_history` posílejte až poté, co od restartu uplyne aspoň jeden `interval-report`.
- **Ostatní provoz:** pravidelná telemetrie čeká, dokud odesílání historie neskončí. Alarmy a odpovědi na příkazy nečekají.
- **Záznamy bez času** (`time: null`) zařízení vrací jen na požadavek bez časového okna, nebo dokud samo nemá nastavený čas.

| Chyba (kód) | Význam | Co dělat |
|---|---|---|
| `HISTORY_UNAVAILABLE` (4) | V požadovaném okně nejsou žádné záznamy, nebo spojení nebylo připravené | Zkontrolujte, že je `history-enable` zapnuté a že okno pokrývá uložené záznamy |
| `BUDGET_TOO_SMALL` (9) | Záznamy existují, ale při aktuální datové rychlosti se do rámce nevejde ani jeden. Na 11bajtové úrovni (US915 DR0, AU915 DR2 a AS923 DR2) se to stává vždy a při mnoha zaznamenávaných kanálech i na 51bajtové úrovni, například EU868 DR0–DR2 **[ověřit]**. Touto chybou může skončit i probíhající odesílání, když datová rychlost klesne. | Požádejte znovu při vyšší datové rychlosti |

Přes LoRaWAN nese chyba jen svůj kód, bez textového popisu.

### Přes NFC {#over-nfc}

Aplikace HARDWARIO Manager čte historii přes NFC po stránkách (`req_history_page`). Čtení přes NFC nespotřebuje žádný vysílací čas a funguje i s vypnutým rádiem, pokud je zařízení napájené. Viz [**Historie senzorů**](/apps/hardwario-manager/sticker/sensor-history) v průvodci aplikací HARDWARIO Manager.

### Příklady downlinků {#downlink-examples}

Downlinky níže posílejte na fPort 85, buď jako JSON přes kodek STICKER (`ttn.js` v2.0.0), nebo jako surové bajty v hex či base64. `seq` si volíte sami a zařízení ho zopakuje v odpovědi. Okno v příkladech začíná v čase `1780000000` (2026-05-28 20:26:40 UTC).

| Význam | JSON | Hex | Base64 |
|---|---|---|---|
| Celý buffer **[ověřit]** | `{"seq":1,"command":"req_history"}` | `08015a00` | `CAFaAA==` |
| Jedna hodina od 2026-05-28 20:26:40 UTC **[ověřit]** | `{"seq":2,"command":"req_history","req_history":{"from_unix":1780000000,"to_unix":1780003600}}` | `08025a0c0880cae2d0061090e6e2d006` | `CAJaDAiAyuLQBhCQ5uLQBg==` |
| Vše od 2026-05-28 20:26:40 UTC dál **[ověřit]** | `{"seq":3,"command":"req_history","req_history":{"from_unix":1780000000}}` | `08035a060880cae2d006` | `CANaBgiAyuLQBg==` |
| Zapnout historii a uložit (zařízení se restartuje) **[ověřit]** | `{"seq":5,"command":"set_param","set_param":{"application":{"history_enable":true},"save":true}}` | `08051206120220011801` | `CAUSBhICIAEYAQ==` |

:::caution Použijte vnořený tvar JSON
Okno zapište dovnitř `"req_history": {…}`, jak ukazuje tabulka. Komentáře s ukázkami použití v `ttn.js` uvádějí plochý tvar s `from_unix` vedle `command`; kodér tato pole ignoruje, takže se z plochého tvaru bez varování stane požadavek na celý buffer.
:::

<details>
<summary><b>Dekódovaný rámec historie a chyba</b></summary>

Rámec historie ze sady testů firmwaru (fPort 85): stránka 1 ze 2, jeden záznam.

```text
01080a2a121880cae2d006220366085a280330840738016802
```

```json
{
  "seq": 10,
  "history_frame": {
    "records": [
      { "time": 1780000000, "temperature": 21.5, "humidity": 45 }
    ],
    "t0_unix": 1780000000,
    "present": 3,
    "interval_s": 900,
    "time_synced": true
  },
  "page_count": 2,
  "page_index": 0,
  "pages": "1/2"
}
```

Rámce z firmwaru v2.0.0 nesou také `channels`, seznam zaznamenaných sloupců, například `["temperature", "humidity"]`.

Odpověď, když požadavku neodpovídá žádný záznam, tedy `HISTORY_UNAVAILABLE` pro `seq` 1 **[ověřit]**:

```text
01080132020804
```

```json
{ "seq": 1, "error": { "code": 4 } }
```

</details>

## Čítače impulzů {#pulse-counters}

STICKER počítá impulzy a aktivace na svých vstupech a senzorech. Čítače Hallových spínačů a vstupů sčítají průběžně a STICKER jejich stavy ukládá do flash paměti, takže po restartu počítají dál. Počty pohybů z PIR a akcelerometru jsou jen v RAM a po každém startu začínají od 0.

| Čítač | Pole v telemetrii | Co počítá | Kdy počítá | Ukládá se do flash paměti |
|---|---|---|---|---|
| Hallův spínač, levý a pravý | `hall_left_count`, `hall_right_count` | Každé sepnutí spínače (přiložený magnet), kontrola každých 100 ms | `cap-hall-left` a `hall-left-counter` jsou `true` (pravý obdobně); ve výchozím stavu jsou všechny `false` | Ano |
| Vstup A nebo B, režim `digital` | `input_a_count`, `input_b_count` | Každé sepnutí vstupu, kontrola každých 100 ms, takže kratší impulzy mohou uniknout | `cap-gpio-mode inputs`, `cap-gpio-input-a digital` a `input-a-counter true` (B obdobně) | Ano |
| Vstup A nebo B, režim `pulse` (měřiče S0) | `input_a_count`, `input_b_count` | Každý impulz, počítaný v přerušení: každé opuštění klidové úrovně zjištěné při startu, po 20 ms ustálené úrovně | `cap-gpio-mode inputs` a `cap-gpio-input-a pulse` (B obdobně); počítá vždy, `input-a-counter` se ignoruje | Ano |
| Pohyb (PIR) | `motion_count` | Každá detekce PIR | `cap-gpio-mode pir` | Ne |
| Pohyb (akcelerometr) | `accel_motion_count` | Každá událost pohybu z akcelerometru | `cap-accelerometer true` a `accel-motion-sensitivity` jiná než `off` | Ne |

- Hodnota čítače se posílá v každém telemetrickém uplinku, dokud je jeho senzor nebo vstup zapnutý, i když je 0. S vypnutým `hall-left-counter` se počet z Hallova spínače posílá dál, ale neroste.
- Čítač v impulzním režimu zatím ve firmwaru v2.0.0 není otestovaný na hardwaru, viz [**Rozhraní S0 (impulzní výstup)**](../sticker-input-wiring/s0-interface.md).
- Sonda MACHINE PROBE žádné čítače nemá.

### Kdy se čítače ukládají {#when-counters-are-saved}

STICKER ukládá stavy všech čtyř čítačů Hallových spínačů a vstupů do NVS (úložiště nastavení ve flash paměti) společně, a to jen tehdy, když se některá hodnota od posledního uložení změnila:

- s výchozím `interval-sample` 0: v každém cyklu hlášení, tedy každých `interval-report` a při každém mimořádném hlášení vyvolaném alarmem nebo příkazem `force_send` či `sample`;
- s nastaveným `interval-sample` (5–3600 s): navíc při každém vzorkování senzorů.

Ukládání na síti nezávisí, takže probíhá i před prvním připojením k síti, během výpadku a s `radio-mode off`.

**Co se může ztratit:** impulzy načítané od posledního uložení. Přijdete o ně při ztrátě napájení, výměně baterií nebo jakémkoli jiném restartu. Ve výchozím nastavení jde nejvýš o impulzy za jeden interval hlášení (15 min). Kratší `interval-sample` toto okno zúží za cenu častějších zápisů do flash paměti. Počty pohybů z PIR a akcelerometru se neukládají nikdy.

Pokud STICKER při startu nedokáže načíst uložené nastavení, čítače během tohoto běhu začnou od 0 a STICKER je neukládá, takže poslední platné stavy zůstanou ve flash paměti pro další bezchybný start.

### Po resetu, výměně baterií nebo aktualizaci firmwaru {#after-a-reset-battery-swap-or-firmware-update}

- **Při startu:** STICKER obnoví stavy čítačů z flash paměti, přičte impulzy načítané během samotného startu a počítá dál.
- **Aktualizace firmwaru:** nahrání nového firmwaru přes J-Link bez úplného smazání čipu (mass erase) stavy čítačů zachová. Úplné smazání čipu nebo `settings erase` je smaže.
- **Přechod z v1.4.x:** režimy vstupů se nepřevádějí a začínají na `none`. Dokud znovu nenastavíte `cap-gpio-mode` a `cap-gpio-input-a` nebo `cap-gpio-input-b`, vstupy nic nepočítají a `input_a_count` a `input_b_count` z telemetrie zmizí. Uložené stavy čítačů zůstanou ve flash paměti a jakmile vstup znovu zapnete, čítání na ně naváže.
- **Přetečení:** čítače jsou 32bitové. Po hodnotě 4 294 967 295 přetečou na 0. Backend, který spotřebu určuje z rozdílů, musí zvládnout přetečení i vynulování.

### Nulování čítačů {#resetting-counters}

Příkaz `reset_counters` vynuluje stavy vybraných čítačů. Funguje přes LoRaWAN, LoRa P2P, NFC i v shellu. Čítače se vybírají příznaky `hall_left`, `hall_right`, `input_a` a `input_b`. Změna platí okamžitě a nulové hodnoty se hned uloží, bez restartu. Příkaz bez příznaku nevynuluje nic. Počty pohybů z PIR a akcelerometru tímto způsobem vynulovat nejdou; začínají od 0 po každém startu.

Takto vynulujete jen vstup A:

```json
{ "seq": 7, "command": "reset_counters", "reset_counters": { "input_a": true } }
```

Hex (fPort 85): `080752021801`, base64 `CAdSAhgB` **[ověřit]**.

- Použijte vnořený tvar jako v ukázce. Plochý tvar z komentářů s ukázkami použití v `ttn.js` (`"input_a": true` vedle `"command"`) se zakóduje jako prázdný příkaz, který nic nevynuluje.
- Když čítač vynulujete, četnostní pravidlo alarmu nad ním se nevyvolá; okno pravidla pro počítání začne znovu.
- `factory_reset` a `vendor_reset` vynulují stavy všech čtyř čítačů. `device_reset` je zachová, ale nastavení Hallových spínačů a vstupů vrátí na výchozí hodnoty (vypnuto), takže nepočítají, dokud je znovu nenastavíte.

Další příklady příkazů najdete na stránce [**Příkazy přes downlink**](../connectivity/downlink-commands.md).

:::note Firmware v1.4.x
Firmware v1.4.x ukládá čítače stejným způsobem a ve stejném formátu, takže se jejich stavy do v2.0.0 přenesou. Firmware v1.3.x a starší je neukládal vůbec, takže je každý restart vrátil na 0. Ve v1.4.x `factory_reset` čítače i historii zachovával.
:::

## Co se kdy zachová {#what-survives-what}

| Data | Restart | Výměna baterií | `device_reset` | `factory_reset` | Aktualizace firmwaru bez smazání |
|---|---|---|---|---|---|
| Uložené nastavení | ✓ | ✓ | ✗ | ✗ | ✓ |
| Klíče LoRaWAN a DevNonce | ✓ | ✓ | ✓ | ✗ | ✓ |
| Čítače Hallových spínačů a vstupů | ✓ | ✓ | ✓ | ✗ | ✓ |
| Počty pohybů z PIR a akcelerometru | ✗ | ✗ | ✗ | ✗ | ✗ |
| Historie senzorů | ✓ | ✓ | ✓ | ✗ | ✓ **[ověřit]** |
| Pravidla alarmů (uložená) | ✓ | ✓ | ✗ | ✗ | ✓ |
| Stav aktivních alarmů | ✗ | ✗ | ✗ | ✗ | ✗ |
| Hodiny | ✓ | ✗ | ✓ | ✓ | ✓ |
| Přiřazení slotů 1-Wire (uložená) | ✓ | ✓ | ✗ | ✗ | ✓ |

- **Uložené nastavení:** neuložené změny nastavení se při každém restartu ztratí. `device_reset` zachová identitu zařízení a celé zprovoznění LoRaWAN, všechno ostatní vrátí na výchozí hodnoty. `factory_reset` zachová jen identitu, DevEUI a JoinEUI.
- **Klíče LoRaWAN a DevNonce:** DevNonce je čítač obsažený v každé žádosti o připojení; podle něj síť pozná a odmítne zopakovanou žádost. STICKER se při každém startu připojuje k síti znovu, takže samotná síťová relace je po restartu vždy nová. Po `factory_reset` navíc zařízení počítá DevNonce znovu od nuly, takže síťový server, který si pamatuje už použité hodnoty DevNonce zařízení, může jeho pokusy o připojení odmítat, dokud je na serveru nevymažete.
- **Čítače:** impulzy načítané od posledního uložení se při restartu nebo výměně baterií ztratí. Po `device_reset` zůstanou stavy čítačů zachované, ale Hallovy spínače a vstupy začnou znovu počítat až poté, co je nastavíte.
- **Historie senzorů:** jen v image release. Každý restart nebo ztráta napájení stojí nejvýš asi 2 záznamy. Po `device_reset` záznamy zůstanou, ale ukládání historie je vypnuté a její nastavení má výchozí hodnoty. Po aktualizaci firmwaru zůstane historie zachovaná jen tehdy, když nové vydání používá stejné rozvržení záznamu; po přechodu z v1.4.x a po nahrání image debug nebo provisioning začíná prázdná.
- **Pravidla alarmů:** pravidlo zapsané downlinkem nebo přes NFC bez uložení se při každém restartu ztratí. Po přechodu z v1.4.x se stará pravidla smažou.
- **Stav aktivních alarmů:** po každém restartu začíná prázdný a alarmy, jejichž podmínky stále platí, se aktivují znovu, viz [**Alarmy**](alarms.md).
- **Hodiny:** přes restart běží dál, dokud jsou baterie vložené, a při ztrátě napájení se zastaví. Po připojení k síti si STICKER vyžádá čas ze sítě, pokud ho od startu ještě nedostal, a potom jednou týdně.
- **Přiřazení slotů 1-Wire:** automatické přiřazení, které se neuložilo, restart nepřežije. STICKER ho při dalším startu zopakuje jen tehdy, když uložené nastavení obsahuje ROM nebo `sensorN-type` aspoň jednoho slotu, protože jen tehdy při startu prohledá sběrnici **[ověřit]**, viz [**Sondy 1-Wire**](one-wire.md).

Co přesně který reset zachová, popisují stránky [**Údržba**](../developer-access/maintenance.md) a [**Reset zařízení**](/apps/hardwario-manager/sticker/reset) v průvodci aplikací HARDWARIO Manager.

:::note Firmware v1.4.x
Přechod z v1.4.x bez smazání zachová identitu, klíče LoRaWAN, čítače a přiřazení slotů 1-Wire. Režimy vstupů vrátí na `none`, nastavení kontroly spojení na 5 a 5 a `history-channels` na teplotu a vlhkost, smaže pravidla alarmů a historie po něm začíná prázdná.
:::
