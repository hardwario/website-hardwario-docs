---
slug: import-file
title: Import ze souboru
---

# Import zařízení STICKER ze souboru CSV nebo JSON {#import-stickers-from-a-csv-or-json-file}

Pokud už máte zařízení někde sepsaná (v tabulce od dodavatele, v exportu
z jiného systému nebo ve vlastní tabulce), můžete seznam nahrát do aplikace
najednou a nemusíte každé zařízení zadávat ručně.

Podporované jsou dva formáty se stejným výsledkem:

- **CSV**: pro seznam vedený v tabulkovém procesoru (Excel, Google Sheets,
  LibreOffice). Jako jediný formát umí přenést i **tagy**.
- **JSON**: pro seznam vytvořený jiným systémem nebo skriptem.

Import zapisuje jen do seznamu uložených zařízení, viz
[**Saved STICKERs**](./saved-stickers.md).

---

## Vzory {#templates}

### CSV {#csv}

```csv
serial,name,secret_key,vendor_key,tags
2162165139,Front door,00112233445566778899aabbccddeeff,,warehouse-a;installed
2162165140,Loading bay,0123456789abcdef0123456789abcdef,,warehouse-a;needs-service
2162165141,Spare (no key yet),,,unassigned
```

Tři ukázkové řádky nahraďte svými a **hlavičkový řádek ponechte**. Podle něj
aplikace pozná, který sloupec je který.

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

Pokud váš systém vytváří seznam zabalený v objektu, funguje i to:

```json
{ "stickers": [ { "serial": 2162165139, "name": "Front door" } ] }
```

---

## Pole {#the-fields}

| Pole | Povinné | Co to je |
|---|---|---|
| `serial` | **ano** | Sériové číslo zařízení jako prosté desítkové číslo, například `2162165139`. Identifikuje položku; podle něj se řádky přiřazují k zařízením. |
| `name` | ne | Vlastní název zařízení („Front door“). Když ho necháte prázdný, aplikace místo něj zobrazí `STICKER <serial>`. |
| `secret_key` | ne | Klíč AES-128 zařízení, **32 hexadecimálních číslic** (16 bajtů). Bez něj se zařízení uloží také, ale aplikace z něj umí jen číst a nemůže ho konfigurovat. |
| `vendor_key` | ne | Vendor token, jen pro výrobce a servis. Stejný formát, 32 hexadecimálních číslic. Pokud vám ho dodavatel nedal, nechte pole prázdné. |
| `tags` | ne | Vlastní označení pro seskupování a filtrování, **oddělená středníky**: `warehouse-a;installed`. **Jen v CSV**, viz níže. |

### serial {#serial}

Prosté číslo větší než nula, bez mezer, oddělovačů tisíců a předpon:
`2 162 165 139` i `2,162,165,139` aplikace odmítne.

### secret_key a vendor_key {#secretkey-and-vendorkey}

32 hexadecimálních číslic, například `00112233445566778899aabbccddeeff`. Fungují velká i malá
písmena (aplikace je ukládá malými) a mezery, dvojtečky a pomlčky se ignorují.

**Nulový** `secret_key` (`00000000000000000000000000000000`) aplikace odmítne:
je to výchozí hodnota firmwaru pro nenastavený klíč a se zařízením se s ní
komunikovat nedá. Řádek se přesto naimportuje, jen bez klíče. Nulový `vendor_key`
se naopak **přijímá**, protože u vendor tokenu samé nuly oprávněně znamenají
„nezprovozněno“.

### tags {#tags}

Tagy se oddělují středníky, takže `warehouse-a;installed;q3` jsou tři tagy.
Aplikace u nich ořízne okrajové mezery, zkrátí je na 32 znaků, odstraní duplicity
bez ohledu na velikost písmen a seřadí je. Tag, který telefon ještě nezná, se
během importu vytvoří; potvrzovací dialog uvede, kolik tagů bude nových. Viz
[**Organizace zařízení tagy**](./tags.md).

:::caution Tagy se přenášejí jen v CSV
Pole `tags` v souboru JSON se bez upozornění ignoruje, a to v obou směrech: ani
export aplikace do JSON tagy nezapisuje. Pokud váš seznam tagy obsahuje, použijte
CSV.
:::

---

## Pravidla, na kterých se často chybuje {#rules-that-trip-people-up}

### 1. CSV musí být oddělené čárkami, ne středníky {#1-a-csv-must-be-comma-separated-not-semicolon-separated}

To je nejčastější příčina chyby. V českém, německém, francouzském a většině
dalších evropských národních prostředí Windows zapisuje Excel při *Uložit jako
CSV* jako oddělovač **středníky**:

```csv
serial;name;secret_key          ← the app will NOT read this
```

Import pak selže s hlášením `No "serial" column in the header row.` Před importem
soubor otevřete v libovolném textovém editoru a zkontrolujte, že první řádek zní
`serial,name,secret_key` s **čárkami**.

Jak soubor uložit s čárkami:

- **Google Sheets**: *Soubor › Stáhnout › Hodnoty oddělené čárkami (.csv)*. Vždy
  s čárkami, bez ohledu na jazyk. Nejsnazší řešení.
- **LibreOffice Calc**: *Uložit jako › Text CSV*, zaškrtněte *Upravit nastavení
  filtru* a nastavte **Oddělovač polí** na `,`.
- **Excel na Windows**: změňte systémový oddělovač seznamu: *Nastavení Windows ›
  Čas a jazyk › Oblast › Další nastavení data, času a oblasti › Změnit formáty
  data, času nebo čísel › Další nastavení* → nastavte **Oddělovač seznamu** na
  `,` a soubor uložte znovu.
- **Nebo nahraďte ručně**: otevřete uložený soubor v textovém editoru a každý
  znak `;` nahraďte znakem `,`. Dělejte to jen tehdy, když žádný z názvů ani tagů
  neobsahuje čárku nebo středník, jinak rozdělíte i buňky, které rozdělit nechcete.

### 2. Názvy s čárkou potřebují uvozovky {#2-names-with-a-comma-need-quotes}

Podle standardu CSV se pole obsahující čárku uzavírá do dvojitých uvozovek
a dvojitá uvozovka uvnitř pole se zdvojuje.

```csv
serial,name
2162165141,"Wing A, room 3"
2162165142,"The ""cold"" store"
```

Tabulkové procesory to dělají automaticky.

### 3. Názvy hlaviček, pořadí a další sloupce {#3-header-names-order-and-extra-columns}

U hlavičky nezáleží na **velikosti písmen** a sloupce mohou být v libovolném
pořadí. Sloupce, které aplikace nezná, ignoruje, takže stávající tabulku
naimportujete beze změn a vlastní sloupce jako `location` nebo `note` odstraňovat
nemusíte.

```csv
Note,SECRET_KEY,Serial,Tags     ← all fine
```

### 4. Kódování a konce řádků {#4-encoding-and-line-endings}

Ukládejte v kódování **UTF-8**, aby se zachovala diakritika v názvech. Značka
pořadí bajtů (BOM, kterou přidává Excel u formátu *CSV UTF-8*) nevadí. Fungují
konce řádků z Windows i z Unixu, prázdné řádky se přeskakují a nový řádek na
konci souboru je volitelný.

### 5. Velikost souboru {#5-file-size}

Nejvýše 2 MB, tedy tisíce řádků; skutečný seznam se k limitu ani nepřiblíží.

---

## Import souboru {#import-the-file}

1. Uložte soubor tam, kde ho telefon najde: pošlete si ho e-mailem nebo ho
   zkopírujte do složky se staženými soubory (**Downloads**), na Google Drive,
   iCloud Drive a podobně.
2. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Saved STICKERs**.
3. Otevřete **menu ⋮**, zvolte **Import**, pak **Import from file** a vyberte
   soubor `.csv` nebo `.json`.

<img src="/img/hw-manager/hw-manager-saved-sticker-more.png" alt="Nabídka ⋮ seznamu Saved STICKERs s volbami Tags, Import, Export, Export logs, Delete all logs a Delete" width="320" />

Před zápisem aplikace shrne, co našla: kolik zařízení se naimportuje, kolik
z nich má secret key, kolik nových tagů vznikne a které řádky musela přeskočit.
Import potvrdíte klepnutím na **Import**.

Druhá položka této nabídky, **Import from QR code**, slouží ke stejnému účelu bez
souboru: přenese až 8 zařízení najednou ze seznamu sdíleného z jiného telefonu.

---

## Co import udělá {#what-an-import-does}

- **Slučuje podle sériového čísla.** Sériové číslo, které v seznamu ještě není, se
  přidá; to, které tam už je, se aktualizuje. Import nikdy nic nemaže.
- **Prázdné pole `name` existující název zachová** a nevymaže ho, takže částečný
  seznam můžete naimportovat znovu, aniž byste přišli o názvy nastavené v telefonu.
- **Tagy se přidávají, ne nahrazují**: tagy ze souboru se sloučí s tagy, které
  položka už má.
- **Klíče se ukládají do zabezpečeného úložiště telefonu** (Keychain nebo
  Keystore), nikdy do běžného seznamu, stejně jako ručně zadaný klíč.
- **Samotných zařízení se import nedotkne.** Mění jen údaje v telefonu; do
  žádného zařízení STICKER se nic nezapíše a žádný trezor ATELOS se nezmění.

---

## Když se řádek přeskočí {#if-a-row-is-skipped}

Potvrzovací dialog vypíše poznámku ke každému řádku, který nešlo načíst. Tyto
poznámky se ve všech jazycích aplikace zobrazují anglicky.

| Poznámka | Co se stalo | Náprava |
|---|---|---|
| `No "serial" column in the header row.` | Hlavička nemá sloupec `serial`. Téměř vždy CSV oddělené středníky. | Viz pravidlo 1 výše. |
| `The file has no rows.` | Soubor je prázdný, nebo má jen prázdné řádky. | Zkontrolujte, že jste vyexportovali správný list. |
| `Row N: skipped — invalid serial "…"` | Sériové číslo v tomto řádku není prosté číslo větší než nula (mezery, oddělovače tisíců, písmena, `0`). | Zapište sériové číslo jen číslicemi. Číslo řádku `N` počítá hlavičku jako řádek 1. |
| `Row N: skipped — duplicate serial …` | Stejné sériové číslo je v souboru dvakrát; pozdější řádek se zahodí. | Duplikát odstraňte, nebo oba řádky slučte, protože platí první. |
| `Serial S: secret key ignored — must be 32 hex digits.` | Klíč nemá 16 bajtů v hexadecimálním zápisu. Zařízení se naimportuje, jen bez klíče. | Zkontrolujte, jestli klíč není zkrácený nebo vložený jen částečně. |
| `Serial S: secret key ignored — an all-zero key …` | Klíč je celý z nul, což je nenastavená hodnota firmwaru. Zařízení se naimportuje, jen bez klíče. | Nechte buňku prázdnou, nebo si opatřete skutečný klíč. |
| `Serial S: vendor key ignored — must be 32 hex digits.` | Totéž pro vendor token. | Nechte ho prázdný, pokud vám ho dodavatel nedal. |
| `Not valid JSON.` | Soubor `.json` nejde zpracovat, obvykle kvůli čárce navíc na konci nebo chybějící závorce. | Zkontrolujte ho libovolným validátorem JSON. |
| `JSON is not a list of STICKERs.` | JSON je jediný objekt, ne pole. | Zabalte ho do `[ … ]`, nebo použijte `{"stickers": [ … ]}`. |
| `Skipped an entry with no serial.` | Objekt JSON bez pole `serial`. | Doplňte sériové číslo. |
| `That file is too large to import …` | Soubor překračuje limit 2 MB. | Soubor rozdělte. |

---

## Vzor přímo z aplikace {#a-template-straight-from-the-app}

Pokud už máte uložené aspoň jedno zařízení, aplikace vám vytvoří soubor ve
správném formátu, který stačí vyplnit: **menu ⋮ → Export**, vyberte zařízení,
případně zapněte **Include vendor token** a **Include tags** a zvolte
**Share as CSV** nebo **Share as JSON**. Možnosti exportu popisuje stránka
[**Saved STICKERs**](./saved-stickers.md).

Výsledný soubor má přesně ten formát, který import čte, takže je to nejbezpečnější
výchozí bod. Přesun seznamu mezi dvěma telefony tak zvládnete ve dvou krocích.

:::caution Soubor chraňte
Soubor obsahující hodnoty `secret_key` je stejně citlivý jako samotná zařízení:
kdo ho má, může tato zařízení STICKER překonfigurovat. Posílejte ho stejně
opatrně jako heslo a po dokončení importu ho smažte ze stažených souborů i
z pošty. Pokud chcete sdílet jen to, *která* zařízení existují, exportujte je bez
klíčů: sloupec `secret_key` nechte prázdný.
:::
