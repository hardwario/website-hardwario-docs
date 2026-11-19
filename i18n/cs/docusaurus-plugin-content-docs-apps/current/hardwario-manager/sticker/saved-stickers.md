---
slug: saved-stickers
title: Uložená zařízení STICKER
description: "Uložená zařízení STICKER v aplikaci HARDWARIO Manager drží tajný klíč a vendor-token: nárokování, import, export přes QR kód, JSON či CSV a zrušení nároku."
---

# Uložená zařízení STICKER {#saved-sticker-devices}

**Uložená zařízení STICKER** jsou seznam zařízení, která spravujete. Seznam
uchovává **tajný klíč** a **vendor-token** každého zařízení, takže se vás ostatní
obrazovky na přístupové údaje nemusí ptát.

Otevřete **STICKER → Uložená zařízení STICKER**. V nadpisu vidíte počet
zařízení.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-saved-stickers.png" alt="Seznam Uložená zařízení STICKER s vyhledávacím polem Sériové číslo nebo název, filtrem štítků, barevnými štítky na řádcích a tlačítkem Nárokovat STICKER" width="320" />

Pole **Sériové číslo nebo název** slouží k vyhledávání, ikona štítku
k filtrování, viz [**Organizace zařízení štítky**](./tags.md).

---

## Přidání zařízení {#add-a-device}

Zařízení můžete do seznamu přidat dvěma způsoby.

**Nárokováním.** Tlačítko **Nárokovat STICKER** dole v seznamu (nebo stejné
tlačítko v menu STICKER) otevře obrazovku **Nárokovat STICKER**. Zvolte
**Přiložit přes NFC** a přiložte telefon k zařízení. Nárokováním zařízení
zaregistrujete na sebe, takže si ho nikdo jiný nemůže nárokovat, a jeho tajný
klíč se přenese do seznamu v tomto telefonu.

**Importem.** Pokud už klíče máte (z exportu od kolegy, z tabulky nebo ze
sdíleného QR kódu), použijte místo toho **Importovat** v **nabídce ⋮**. Účet není
potřeba; viz [Import zařízení](#import-devices).

---

## Detail zařízení {#a-devices-details}

Klepnutím na řádek zařízení otevřete.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-sticker-info.png" alt="Obrazovka uloženého zařízení s názvem, sériovým číslem, skrytým tajným klíčem s tlačítky pro zobrazení, kopírování a změnu, skrytým vendor-tokenem s tlačítky pro zobrazení a kopírování, štítky a historií změn" width="320" />

| Pole | Poznámky |
|---|---|
| **Název** | Název, který jste zařízení dali, nebo jeho sériové číslo. Změníte ho volbou **Přejmenovat** v nabídce řádku. |
| **Sériové číslo** | Identita zařízení. |
| **Tajný klíč** | Lze zobrazit, zkopírovat i změnit. Nutný pro každou šifrovanou komunikaci. |
| **Vendor-token** | Lze zobrazit a zkopírovat. Nutný pro [**Změny výrobce**](./reset.md#vendor-changes). |
| **Štítky** | Rozbalením je upravíte, viz [**Organizace zařízení štítky**](./tags.md). |
| **Historie změn** | Viz [**Historie změn zařízení**](./change-log.md). |

Změna tajného klíče tady mění jen klíč, kterým se zařízením komunikuje tento
telefon; zařízení si ponechá svůj. Aplikace upozorní, že se špatným klíčem
komunikace se zařízením přestane fungovat. Nový klíč přímo v zařízení nastavíte
volbou [**Změnit tajný klíč**](./reset.md#vendor-changes).

Každý řádek má také nabídku:

| Akce | Význam |
|---|---|
| **Vygenerovat QR kód** | QR kód pro nárokování se sériovým číslem a tajným klíčem, se kterým jiný technik zařízení naimportuje se stejným přístupem |
| **Upravit štítky** | Přidá nebo odebere štítky zařízení |
| **Přejmenovat** | Pojmenuje zařízení; prázdný název znamená sériové číslo |
| **Zrušit nárok** | Předá zařízení dál: uvolní ho, vrátí ho do režimu nárokování a odebere ho i s klíčem z tohoto telefonu |

Při **Zrušit nárok** vás aplikace vyzve k přiložení telefonu k zařízení, aby ho
vrátila do režimu nárokování pro dalšího vlastníka.

---

## Export zařízení {#export-devices}

Otevřete **nabídku ⋮** v seznamu a zvolte **Exportovat**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-saved-sticker-more.png" alt="Nabídka ⋮ seznamu Uložená zařízení STICKER s volbami Štítky, Importovat, Exportovat, Exportovat protokoly, Smazat všechny protokoly a Smazat" width="320" />

Vyberte zařízení k exportu a pak zvolte, co má export obsahovat a kam ho odeslat:

- **Zahrnout vendor token**: ve výchozím stavu vypnuto.
- **Zahrnout štítky**: přidá do CSV sloupec se štítky.

Nakonec zvolte způsob sdílení: **Sdílet jako QR kód**, **Sdílet jako JSON** nebo
**Sdílet jako CSV**.

:::caution Exporty obsahují tajné údaje
Export obsahuje tajné klíče zařízení a volitelně i jejich vendor-tokeny. Se
souborem nebo QR kódem zacházejte stejně opatrně jako se samotnými klíči.
:::

Jeden QR kód pojme **až 8 zařízení**; u delšího seznamu vytvoří aplikace několik
kódů za sebou, mezi kterými přecházíte tlačítkem **Sdílet další**.

## Import zařízení {#import-devices}

Otevřete **nabídku ⋮** a zvolte **Importovat**:

- **Importovat z QR kódu**: naskenujte jeden nebo více kódů; u exportu
  rozděleného do více kódů pokračujte volbou **Importovat další**.
- **Importovat ze souboru**: export ve formátu CSV nebo JSON. Formát souboru
  popisuje stránka [**Import ze souboru**](./import-file.md).
- **Zadat ručně**: zadejte sériové číslo, tajný klíč a případně vendor-token.
  Zařízení se uloží jen v tomto telefonu.

Před zápisem aplikace shrne, co našla, včetně toho, kolik zařízení má klíče a
kolik nových štítků vznikne. Zařízení se přiřazují podle sériového čísla, takže
opakovaný import existující položku aktualizuje a nevytvoří duplikát.
