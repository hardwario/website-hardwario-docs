---
slug: saved-stickers
title: Saved STICKERs
---

# Saved STICKERs {#saved-stickers}

**Saved STICKERs** je seznam zařízení, která spravujete. Uchovává **secret key**
a **vendor token** každého zařízení, takže se vás ostatní obrazovky na přístupové
údaje nemusí ptát.

Otevřete **STICKER → Saved STICKERs**. V nadpisu vidíte počet zařízení.

<img src="/img/hw-manager/hw-manager-saved-stickers.png" alt="Seznam Saved STICKERs s vyhledávacím polem, barevně odlišenými tagy na řádcích a tlačítkem pro přidání" width="320" />

Pole **Serial or name** slouží k vyhledávání, ikona tagu k filtrování, viz
[**Organizace zařízení tagy**](./tags.md).

---

## Přidání zařízení {#add-a-device}

Zařízení můžete do seznamu přidat dvěma způsoby.

**Nárokováním.** Obrazovka pro nárokování načte zařízení přes NFC a nárokuje ho
v ATELOSu, buď k vašemu účtu ATELOS, nebo bez přihlášení k tomuto telefonu. Při
nárokování se přenese secret key zařízení, viz
[**Účet ATELOS**](../atelos.md#claim-a-sticker).

**Importem.** Pokud už klíče máte (z exportu od kolegy, z tabulky nebo
ze sdíleného QR kódu), použijte místo toho **Import**. Účet není potřeba; viz
[**Import ze souboru**](./import-file.md).

---

## Detail zařízení {#a-devices-details}

Klepnutím na řádek zařízení otevřete.

<img src="/img/hw-manager/hw-manager-sticker-info.png" alt="Obrazovka s detailem uloženého zařízení s názvem, sériovým číslem, secret key, vendor tokenem, tagy a historií změn" width="320" />

| Pole | Poznámky |
|---|---|
| **Name** | Libovolný název. Lze ho upravit. |
| **Serial number** | Identita zařízení. |
| **Secret key** | Lze zobrazit, zkopírovat i upravit. Nutný pro každou šifrovanou komunikaci. |
| **Vendor-token** | Lze zobrazit, zkopírovat i upravit. Nutný pro [**Vendor changes**](./reset.md). |
| **Tags** | Viz [**Organizace zařízení tagy**](./tags.md). |
| **Change log** | Viz [**Historie změn zařízení**](./change-log.md). |

Nabídka řádku obsahuje také **Generate QR code**: vytvoří QR kód pro nárokování
se sériovým číslem a secret key, díky kterému může jiný technik získat
k zařízení stejný přístup.

---

## Předání zařízení {#hand-a-device-on}

Chcete-li zařízení předat někomu dalšímu (prodej, předání zákazníkovi), otevřete
nabídku řádku, zvolte **Unclaim** a přiložte telefon k zařízení. Aplikace
v tomto pořadí:

1. vrátí zařízení do režimu nárokování, aby šlo nárokovat přiložením,
2. uvolní jeho vlastnictví v ATELOSu,
3. odebere ho i s uloženým klíčem z tohoto telefonu.

Nechte telefon u zařízení několik sekund. Zařízení potřebuje krátkou pauzu bez
pole NFC, než přijme kód pro nárokování, a aplikace na ni počká, místo aby
hlásila chybu. Když selže první krok, nic se neuvolní a zařízení zůstane vaše
i v telefonu.

Stejnou akci pro zařízení, které držíte v ruce, najdete pod
**Tools → Debug tools → Unclaim**, viz [**Nástroje**](./tools.md#debug-tools).

:::info Zařízení, ke kterému telefon nemá kód pro nárokování
Pokud telefon nemá pro zařízení uložený kód pro nárokování, upozorní na to
potvrzovací dialog: když se zařízení nepodaří vrátit do režimu nárokování, další
majitel ho přidá podle sériového čísla, ne přiložením.
:::

---

## Export zařízení {#export-devices}

Otevřete **menu ⋮** v seznamu a zvolte **Export**.

<img src="/img/hw-manager/hw-manager-saved-sticker-more.png" alt="Nabídka ⋮ seznamu Saved STICKERs s volbami Tags, Import, Export, Export logs, Delete all logs a Delete" width="320" />

Vyberte zařízení k exportu a pak zvolte, co má export obsahovat a kam ho odeslat:

- **Include vendor token**: ve výchozím stavu vypnuto.
- **Include tags**: přidá do CSV sloupec s tagy.

Nakonec zvolte způsob sdílení: **Share as QR code**, **Share as JSON** nebo
**Share as CSV**.

:::caution Exporty obsahují tajné údaje
Export obsahuje secret key zařízení a volitelně i jejich vendor tokeny. Se souborem
nebo QR kódem zacházejte stejně opatrně jako se samotnými klíči.
:::

Jeden QR kód pojme **až 8 zařízení**; u delšího seznamu vytvoří aplikace několik
kódů za sebou, mezi kterými přecházíte tlačítkem **Share next**.

## Import zařízení {#import-devices}

Otevřete **menu ⋮** a zvolte **Import**:

- **Import from QR code**: naskenujte jeden nebo více kódů; u exportu rozděleného
  do více kódů pokračujte volbou **Import more**.
- **Import from file**: export ve formátu CSV nebo JSON. Formát souboru popisuje stránka
  [**Import ze souboru**](./import-file.md).
- **Enter manually**: zadejte sériové číslo a secret key (případně i vendor-token)
  zařízení, jehož klíč už máte. Do ATELOSu se nic neposílá, zařízení se uloží
  jen do tohoto telefonu.

Před zápisem aplikace shrne, co našla, včetně toho, kolik zařízení má klíče a
kolik nových tagů vznikne. Zařízení se přiřazují podle sériového čísla, takže
opakovaný import existující položku aktualizuje a nevytvoří duplikát.
