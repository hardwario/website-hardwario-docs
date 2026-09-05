---
slug: import-file
title: Import ze souboru
description: "Pokud už jsou vaše zařízení někde vypsaná, v tabulce od dodavatele, v exportu"
---

# Import zařízení STICKER ze souboru CSV nebo JSON {#import-stickers-from-a-csv-or-json-file}

Pokud už jsou vaše zařízení někde vypsaná (v tabulce od dodavatele, v exportu
z jiného systému, ve vlastní tabulce), můžete ten seznam nahrát do aplikace
naráz, místo abyste každé zařízení zadávali ručně.

Fungují dva formáty a oba dělají totéž:

- **CSV**: pro seznam, který žije v tabulkovém procesoru (Excel, Google Sheets,
  LibreOffice). Jediný formát, který umí nést i **tagy**.
- **JSON**: pro seznam vytvořený jiným systémem nebo skriptem.

Import zapisuje jen do vašeho uloženého seznamu, viz
[**Uložené STICKERy**](./saved-stickers.md).

---

## Vzory {#templates}

### CSV {#csv}

```csv
serial,name,secret_key,vendor_key,tags
2162165139,Front door,00112233445566778899aabbccddeeff,,warehouse-a;installed
2162165140,Loading bay,0123456789abcdef0123456789abcdef,,warehouse-a;needs-service
2162165141,Spare (no key yet),,,unassigned
```

Tři ukázkové řádky nahraďte svými a **hlavičkový řádek nechte**. Právě ten
aplikaci říká, který sloupec je který.

Povinný je jen `serial`, takže nejkratší platný soubor je:

```csv
serial
2162165139
2162165140
```

### JSON {#json}

```json
[
  {
    "serial": 2162165139,
    "name": "Front door",
    "secret_key": "00112233445566778899aabbccddeeff"
  },
  {
    "serial": 2162165140,
    "name": "Loading bay",
    "secret_key": "0123456789abcdef0123456789abcdef"
  },
  {
    "serial": 2162165141,
    "name": "Spare (no key yet)"
  },
  {
    "serial": 2162165143,
    "name": "Side gate",
    "secret_key": "0f1e2d3c4b5a69788796a5b4c3d2e1f0",
    "vendor_key": "ffeeddccbbaa99887766554433221100"
  }
]
```

Zabalený objekt funguje také, pokud to tak váš systém produkuje:

```json
{ "stickers": [ { "serial": 2162165139, "name": "Front door" } ] }
```

---

## Pole {#the-fields}

| Pole | Povinné | Co to je |
|---|---|---|
| `serial` | **ano** | Sériové číslo zařízení, jako obyčejné dekadické číslo, například `2162165139`. Je to identita položky. Řádky se k zařízením párují podle něj. |
| `name` | ne | Váš vlastní popisek zařízení („Front door"). Když ho necháte prázdný, aplikace zobrazí `STICKER <serial>`. |
| `secret_key` | ne | Klíč AES-128 zařízení. **32 hex číslic** (16 bajtů). Bez něj se zařízení uloží, ale aplikace ho umí jen číst, ne konfigurovat. |
| `vendor_key` | ne | Vendor token, jen pro vendor a servisní použití. Stejný tvar 32 hex číslic. Nechte prázdný, pokud vám ho dodavatel nedal. |
| `tags` | ne | Vaše vlastní popisky pro seskupování a filtrování, **oddělené středníky**: `warehouse-a;installed`. **Jen v CSV**, viz níže. |

### serial {#serial}

Obyčejné číslo větší než nula. Žádné mezery, oddělovače tisíců ani prefixy:
`2 162 165 139` i `2,162,165,139` se odmítnou.

### secret_key a vendor_key {#secretkey-and-vendorkey}

32 hex číslic, například `00112233445566778899aabbccddeeff`. Fungují velká i malá
písmena (aplikace je ukládá malými) a mezery, dvojtečky a pomlčky se ignorují.

**Nulový** `secret_key` (`00000000000000000000000000000000`) se odmítá: to je
nenastavená výchozí hodnota firmwaru a zařízení jí adresovat nelze. Řádek se
naimportuje, jen bez klíče. Nulový `vendor_key` se **přijímá**, u vendor tokenu
samé nuly legitimně znamenají „nezprovozněno".

### tags {#tags}

Tagy oddělují středníky, takže `warehouse-a;installed;q3` jsou tři tagy. Otrimují
se, zkrátí na 32 znaků, odduplikují bez ohledu na velikost písmen a seřadí. Tag,
který telefon ještě neviděl, se během importu vytvoří a potvrzovací dialog říká,
kolik jich bude nových. Viz
[**Organizace zařízení tagy**](./tags.md).

:::caution Tagy putují jen v CSV
Pole `tags` v souboru JSON se tiše ignoruje, v obou směrech. JSON export
aplikace tagy taky nezapisuje. Pokud váš seznam tagy má, použijte CSV.
:::

---

## Pravidla, na kterých lidé nejčastěji naráží {#rules-that-trip-people-up}

### 1. CSV musí být oddělené čárkami, ne středníky {#1-a-csv-must-be-comma-separated-not-semicolon-separated}

To je nejčastější příčina selhání. V češtině, němčině, francouzštině a většině
ostatních evropských locale Windows píše Excel při *Uložit jako CSV*
**středníky**:

```csv
serial;name;secret_key          ← the app will NOT read this
```

Import pak selže s `No "serial" column in the header row.` Před importem soubor
otevřete v jakémkoli textovém editoru a zkontrolujte, že první řádek je
`serial,name,secret_key` s **čárkami**.

Jak dostat čárky:

- **Google Sheets**: *Soubor › Stáhnout › Hodnoty oddělené čárkami (.csv)*. Vždy
  čárky, bez ohledu na jazyk. Nejsnazší náprava.
- **LibreOffice Calc**: *Uložit jako › Text CSV*, zaškrtněte *Upravit nastavení
  filtru* a nastavte **Oddělovač polí** na `,`.
- **Excel na Windows**: změňte systémový oddělovač seznamu: *Nastavení Windows ›
  Čas a jazyk › Oblast › Další nastavení data, času a oblasti › Změnit formáty
  data, času nebo čísel › Další nastavení* → nastavte **Oddělovač seznamu** na
  `,` a soubor uložte znovu.
- **Nebo nahraďte ručně**: otevřete uložený soubor v textovém editoru a nahraďte
  každý `;` za `,`. Dělejte to jen tehdy, když žádný z vašich názvů ani tagů
  neobsahuje čárku nebo středník, jinak rozdělíte špatné buňky.

### 2. Názvy s čárkou potřebují uvozovky {#2-names-with-a-comma-need-quotes}

Standardní CSV: pole obsahující čárku se dává do dvojitých uvozovek a doslovná
dvojitá uvozovka uvnitř se zdvojuje.

```csv
serial,name
2162165141,"Wing A, room 3"
2162165142,"The ""cold"" store"
```

Tabulkové procesory to za vás dělají automaticky.

### 3. Názvy hlaviček, pořadí a další sloupce {#3-header-names-order-and-extra-columns}

Hlavička se páruje **bez ohledu na velikost písmen** a sloupce mohou být
v jakémkoli pořadí. Sloupce, které aplikace nezná, se ignorují, takže existující
tabulka se naimportuje jak je, své sloupce `location` nebo `note` odstraňovat
nemusíte.

```csv
Note,SECRET_KEY,Serial,Tags     ← all fine
```

### 4. Kódování a konce řádků {#4-encoding-and-line-endings}

Ukládejte jako **UTF-8**, aby přežily názvy s diakritikou. Byte-order mark (ten,
který přidává Excel u *CSV UTF-8*) je v pořádku. Fungují konce řádků Windows i
Unixu, prázdné řádky se přeskakují a koncový nový řádek je volitelný.

### 5. Velikost souboru {#5-file-size}

Maximum 2 MB: tisíce řádků, takže skutečný seznam se k limitu ani nepřiblíží.

---

## Import souboru {#import-the-file}

1. Umístěte soubor tam, kam telefon dosáhne: pošlete si ho mailem, nebo ho
   zkopírujte do **Downloads** v telefonu, na Google Drive, iCloud Drive a tak dál.
2. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Saved STICKERs**.
3. Otevřete **menu ⋮**, zvolte **Import**, pak **Import from file** a vyberte svůj
   soubor `.csv` nebo `.json`.

<img src="/img/hw-manager/hw-manager-saved-sticker-more.png" alt="Rozšířené menu Saved STICKERs s volbami Tags, Import, Export, Export logs, Delete all logs a Delete" width="320" />

Než se cokoli zapíše, aplikace potvrdí, co našla: kolik zařízení se naimportuje,
kolik z nich nese secret key, kolik nových tagů vznikne a každý řádek, který
musela přeskočit. Klepnutím na **Import** to potvrdíte.

Druhá položka v tom menu, **Import from QR code**, dělá totéž pro až 8 zařízení
naráz a bez souboru, pro seznam nasdílený z jiného telefonu.

---

## Co import udělá {#what-an-import-does}

- **Sloučí podle sériového čísla.** Sériové číslo, které v seznamu ještě není, se
  přidá; to, které tam už je, se aktualizuje. Import nikdy nic nemaže.
- **Prázdné `name` zachová existující název**, místo aby ho vymazalo, takže lze
  částečný seznam naimportovat znovu bez ztráty popisků nastavených v telefonu.
- **Tagy se přidávají, ne nahrazují**: tagy ze souboru se sloučí s tím, co
  položka už nese.
- **Klíče jdou do bezpečného úložiště telefonu** (Keychain nebo Keystore), nikdy
  do obyčejného seznamu, stejně jako ručně zadaný klíč.
- **Samotných zařízení se to nedotkne.** Import mění jen to, co ví telefon; do
  žádného zařízení STICKER se nic nezapisuje a žádný trezor ATELOS se nemění.

---

## Když se řádek přeskočí {#if-a-row-is-skipped}

Potvrzovací dialog vypíše poznámku ke každému řádku, který nešlo vzít. Tyto
poznámky se ve všech jazycích aplikace zobrazují anglicky.

| Poznámka | Co se stalo | Náprava |
|---|---|---|
| `No "serial" column in the header row.` | Hlavička nemá sloupec `serial`. Téměř vždy CSV oddělené středníky. | Viz pravidlo 1 výše. |
| `The file has no rows.` | Soubor je prázdný, nebo má jen prázdné řádky. | Zkontrolujte, že jste vyexportovali správný list. |
| `Row N: skipped — invalid serial "…"` | Sériové číslo v tom řádku není obyčejné číslo větší než nula (mezery, oddělovače tisíců, písmena, `0`). | Napište sériové číslo jako samé číslice. Řádek `N` počítá hlavičku jako řádek 1. |
| `Row N: skipped — duplicate serial …` | Tentýž serial je v souboru dvakrát; pozdější řádek se zahodí. | Duplikát odstraňte, nebo oba řádky slučte, protože vyhrává první. |
| `Serial S: secret key ignored — must be 32 hex digits.` | Klíč není 16 bajtů hexu. Zařízení se naimportuje, jen bez klíče. | Zkontrolujte, jestli klíč není zkrácený nebo vložený jen částečně. |
| `Serial S: secret key ignored — an all-zero key …` | Klíč je celý z nul, což je nenastavená hodnota firmwaru. Zařízení se naimportuje, jen bez klíče. | Nechte buňku prázdnou, nebo si sežeňte skutečný klíč. |
| `Serial S: vendor key ignored — must be 32 hex digits.` | Totéž pro vendor token. | Nechte ho prázdný, pokud vám ho dodavatel nedal. |
| `Not valid JSON.` | Soubor `.json` se nedá naparsovat, obvykle koncová čárka nebo chybějící hranatá závorka. | Vložte ho do jakéhokoli validátoru JSON. |
| `JSON is not a list of STICKERs.` | JSON je jediný objekt, ne pole. | Zabalte ho do `[ … ]`, nebo použijte `{"stickers": [ … ]}`. |
| `Skipped an entry with no serial.` | Objekt JSON bez pole `serial`. | Doplňte sériové číslo. |
| `That file is too large to import …` | Nad limitem 2 MB. | Soubor rozdělte. |

---

## Vzor přímo z aplikace {#a-template-straight-from-the-app}

Pokud už máte uložené jedno zařízení, umí aplikace vyrobit správně tvarovaný
soubor k vyplnění: **menu ⋮ → Export**, vyberte zařízení, případně zapněte
**Include vendor token** a **Include tags** a pak dejte **Share as CSV** nebo
**Share as JSON**. Možnosti exportu popisují [**Uložené STICKERy**](./saved-stickers.md).

Co z toho vypadne, je přesně to, co importér čte zpět, takže je to nejbezpečnější
výchozí bod, a přesun seznamu mezi dvěma telefony je tím na dva kroky.

:::caution Soubor držte v bezpečí
Soubor obsahující hodnoty `secret_key` je stejně citlivý jako samotná zařízení:
kdokoli, kdo ho drží, může tato zařízení STICKER překonfigurovat. Posílejte ho
tak, jak byste posílali heslo, a po dokončení importu ho smažte z Downloads i
z pošty. Pokud chcete nasdílet jen to, *která* zařízení existují, exportujte bez
klíčů. Sloupec `secret_key` nechte prázdný.
:::
