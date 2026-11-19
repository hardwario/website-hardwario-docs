---
slug: batch-write
title: Hromadný zápis
description: "Hodnoty konfigurace zařízení STICKER nastavíte v aplikaci HARDWARIO Manager jednou a přes NFC je zapíšete do jednoho zařízení za druhým, zbytek se nemění."
title_meta: "Hromadný zápis (HARDWARIO Manager pro STICKER)"
---

# Zápis stejného nastavení do mnoha zařízení STICKER {#write-the-same-settings-to-many-stickers}

**Hromadný zápis** nastaví skupině zařízení stejné hodnoty v jedné relaci:
hodnoty zadáte jednou a pak přikládáte telefon k jednomu zařízení STICKER za
druhým. Zapíšou se jen hodnoty, které změníte; ostatní nastavení každého
zařízení zůstane, jak bylo.

Každé zařízení musí běžet (s vloženými bateriemi) a aplikace potřebuje jeho
secret key, který si vezme ze seznamu
[**Uložená zařízení STICKER**](./saved-stickers.md).

---

## Nastavení hodnot {#set-the-values}

1. Přejděte na **STICKER → Konfigurace → Hromadný zápis**.
2. Otevřete potřebné sekce a nastavte hodnoty, které chcete změnit.
3. Formulář můžete také vyplnit z uložené předvolby: **Více akcí → Použít
   šablonu**, viz [**Šablony**](./templates.md).

<img src="/img/hw-manager/hw-manager-batch-write.png" alt="Formulář Hromadný zápis s otevřenou sekcí Měření a hlášení: interval hlášení i interval měření ukazují Beze změny a dole je připnuté tlačítko Zapsat do zařízení" width="320" />

V záhlaví formuláře stojí **Nová konfigurace**, nebo sériové číslo zařízení
STICKER, které aplikace četla naposledy; formulář sám je v obou případech prázdný. Každé pole začíná hodnotou **Beze změny**: čísla a klíče jsou prázdné
a přepínače i výběry nabízejí kromě svých hodnot také **Beze změny**. Když pole
vyprázdníte nebo znovu zvolíte **Beze změny**, ze zápisu vypadne.

Pole, které závisí na jiném, zůstává k dispozici, dokud je to druhé **Beze
změny**, protože zařízení už může mít hodnotu, při které se uplatní.
Například **Podpásmo** se zobrazuje, dokud nenastavíte jiný region než US915
nebo AU915.

Počítadlo velikosti pod formulářem ukazuje, kolik zápis zabere z limitu 448 B.

---

## Zápis jednoho zařízení za druhým {#write-device-after-device}

Klepněte na **Zapsat do zařízení** a přiložte telefon k prvnímu zařízení
STICKER.

Po každém zápisu se obrazovka připraví na další zařízení, takže můžete projít
celou přepravku, aniž byste mezi přiloženími sahali na displej. Pod výzvou
vidíte:

- průběžný počet, například **Zapsáno: 2**; zařízení, ke kterému telefon
  přiložíte dvakrát, se počítá jednou;
- výsledek posledního přiložení: **Zapsáno:** se zařízením a jeho sériovým
  číslem, nebo červeně důvod, proč zápis nedoběhl. Neúspěšné přiložení hromadný
  zápis neukončí; stačí telefon k zařízení přiložit znovu.

Tlačítkem **Zastavit** se vrátíte do formuláře. Hodnoty v něm zůstanou
a formulář ukáže, kolik zařízení je zatím zapsaných, takže můžete hodnotu
změnit a pokračovat.

U zařízení z vašeho seznamu uložených zařízení přidá každý zápis záznam do jeho
[**historie změn**](./change-log.md), a to jen se zapsanými hodnotami.

:::tip Kontrola přečtením jednoho zařízení
Hromadný zápis zařízení nečte. Výsledek si ověříte volbou **Konfigurace →
Načíst** u některého z nich.
:::

---

## Zápis konfiguračního souboru do mnoha zařízení {#write-a-configuration-file-to-many-devices}

Stejně funguje i **Konfigurovat ze souboru**. Formulář se otevře s hodnotami ze
souboru, každé nastavení, které soubor neobsahuje, má hodnotu **Beze změny**
a **Zapsat do zařízení** soubor zapíše do každého zařízení STICKER, ke kterému
telefon přiložíte. Viz [**Konfigurace**](./configuration.md#configure-from-file).
