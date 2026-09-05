---
slug: saved-stickers
title: Uložené STICKERy
description: "aniž by se vás na přihlašovací údaje ptaly."
---

# Uložené STICKERy {#saved-stickers}

**Saved STICKERs** je seznam zařízení, která spravujete. Drží **secret key** a
**vendor token** každého zařízení, takže všechny ostatní obrazovky mohou pracovat,
aniž by se vás na přihlašovací údaje ptaly.

Otevřete **STICKER → Saved STICKERs**. Titulek ukazuje, kolik zařízení máte.

<img src="/img/hw-manager/hw-manager-saved-stickers.png" alt="Seznam Saved STICKERs s vyhledávacím polem, barevně odlišenými tagy na řádcích a tlačítkem pro přidání" width="320" />

Polem **Serial or name** hledáte a ikonou tagu filtrujete, viz
[**Organizace zařízení tagy**](./tags.md).

---

## Přidání zařízení {#add-a-device}

Do seznamu se zařízení dostanou dvěma cestami.

**Nárokováním.** Obrazovka **Add** zařízení nárokuje k vašemu účtu ATELOS:
přiložte telefon přes NFC, naskenujte QR kód nebo zadejte údaje ručně. Nárokování
přenese secret key zařízení. Vyžaduje přihlášení do systému ATELOS, viz
[**Účet ATELOS**](../atelos.md).

**Importem.** Pokud už klíče máte (z exportu od kolegy, z tabulky nebo
z nasdíleného QR kódu), použijte místo toho **Import**. Účet není potřeba; viz
[**Import ze souboru**](./import-file.md).

---

## Detail zařízení {#a-devices-details}

Klepnutím na řádek zařízení otevřete.

<img src="/img/hw-manager/hw-manager-sticker-info.png" alt="Obrazovka s detailem uloženého zařízení s názvem, sériovým číslem, secret key, vendor tokenem, tagy a historií změn" width="320" />

| Pole | Poznámky |
|---|---|
| **Name** | Popisek podle vaší volby. Editovatelný. |
| **Serial number** | Identita zařízení. |
| **Secret key** | Lze zobrazit, zkopírovat i upravit. Potřebný pro každou šifrovanou výměnu. |
| **Vendor-token** | Lze zobrazit, zkopírovat i upravit. Potřebný pro [**Vendor changes**](./reset.md). |
| **Tags** | Viz [**Organizace zařízení tagy**](./tags.md). |
| **Change log** | Viz [**Historie změn zařízení**](./change-log.md). |

Menu na řádku nabízí i **Generate QR code**, které vytvoří claim QR kód nesoucí
sériové číslo a secret key, takže jiný operátor může k tomu zařízení získat stejný
přístup.

---

## Export zařízení {#export-devices}

Otevřete **menu ⋮** v seznamu a zvolte **Export**.

<img src="/img/hw-manager/hw-manager-saved-sticker-more.png" alt="Rozšířené menu Saved STICKERs s volbami Tags, Import, Export, Export logs, Delete all logs a Delete" width="320" />

Vyberte zařízení k exportu a pak zvolte, co zahrnout a kam to poslat:

- **Include vendor token**: ve výchozím stavu vypnuto.
- **Include tags**: přidá do CSV sloupec s tagy.

Pak vyberte cíl: **Share as QR code**, **Share as JSON** nebo
**Share as CSV**.

:::caution Exporty nesou tajné údaje
Export obsahuje secret key zařízení a volitelně i jejich vendor tokeny. Zacházejte
se souborem nebo QR kódem tak, jak byste zacházeli se samotnými klíči.
:::

Přenos QR kódem nese **až 8 zařízení na kód**; u delšího seznamu vytvoří aplikace
několik kódů za sebou a **Share next** vás jimi provede.

## Import zařízení {#import-devices}

Otevřete **menu ⋮** a zvolte **Import**:

- **Import from QR code**: naskenujte jeden nebo víc kódů a přes **Import more**
  projděte export z více kódů.
- **Import from file**: export ve formátu CSV nebo JSON. Formát souboru popisuje
  [**Import ze souboru**](./import-file.md).

Než se cokoli zapíše, aplikace potvrdí, co našla, včetně toho, kolik zařízení nese
klíče a kolik nových tagů vznikne. Zařízení se páruje podle sériového čísla, takže
opakovaný import existující položku aktualizuje, místo aby ji zdvojil.
