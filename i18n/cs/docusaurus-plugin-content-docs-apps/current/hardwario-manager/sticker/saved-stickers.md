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

**Nárokováním.** Obrazovka **Add** zařízení nárokuje k vašemu účtu ATELOS:
zařízení načtete přiložením telefonu (NFC), naskenováním QR kódu nebo ručním
zadáním údajů. Při nárokování se přenese secret key zařízení. Nárokování vyžaduje
přihlášení k účtu ATELOS, viz
[**Účet ATELOS**](../atelos.md).

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

Před zápisem aplikace shrne, co našla, včetně toho, kolik zařízení má klíče a
kolik nových tagů vznikne. Zařízení se přiřazují podle sériového čísla, takže
opakovaný import existující položku aktualizuje a nevytvoří duplikát.
