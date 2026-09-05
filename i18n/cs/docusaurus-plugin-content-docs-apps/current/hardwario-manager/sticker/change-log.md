---
slug: change-log
title: Historie změn zařízení
description: "Historie změn zaznamenává u uloženého zařízení STICKER každé čtení konfigurace"
---

# Zobrazení historie změn zařízení {#view-a-devices-change-log}

Historie změn zaznamenává u uloženého zařízení STICKER každé **čtení** konfigurace
a každý úspěšný **zápis**, takže vidíte, co na zařízení bylo nastaveno a kdy.

---

## Zapnutí historie změn {#turn-the-change-log-on}

Otevřete **Settings → STICKER change log** a zvolte, jak dlouho se záznamy mají
uchovávat: **Off**, **30**, **60** nebo **90 dnů**. Výchozí je 30 dnů. Volba **Off**
zastaví nové zaznamenávání; už zaznamenané položky zůstanou.

Viz [**Nastavení aplikace**](../settings.md).

---

## Otevření historie zařízení {#open-a-devices-log}

1. Přejděte na **STICKER → Saved STICKERs** a otevřete **Detail** zařízení.
2. Otevřete jeho **Change log** a zvolte položku ze seznamu **Recorded read**.
   Každá má datum, čas a informaci, které sekce pokrývá.

<img src="/img/hw-manager/hw-manager-sticker-log.png" alt="Obrazovka s detailem uloženého zařízení s otevřenou historií změn na zaznamenaném čtení" width="320" />

U vybrané položky můžete:

| Akce | Efekt |
|---|---|
| **Configure a STICKER with this** | Zapsat zaznamenanou konfiguraci zpět do zařízení. Obnovení do daného okamžiku |
| **Export this** | Nasdílet jednu položku jako soubor |
| **Export log** | Nasdílet celou historii tohoto zařízení |
| **Delete this entry** | Odstranit jen tuhle položku |
| **Delete full log** | Odstranit historii tohoto zařízení |

:::tip Obnovení starší konfigurace
**Configure a STICKER with this** je nejrychlejší cesta zpátky do funkčního stavu,
když se změna nepovede. Ke stejným zaznamenaným okamžikům se dostanete i přes
**Configuration → Configure from file**, kde zvolíte export historie změn a pak
konkrétní okamžik. Viz [**Konfigurace**](./configuration.md).
:::

---

## Napříč všemi zařízeními {#across-all-devices}

Z **menu ⋮** v seznamu **Saved STICKERs** můžete naráz **Export logs** nebo
**Delete all logs** pro všechna zařízení.

<img src="/img/hw-manager/hw-manager-saved-sticker-more.png" alt="Rozšířené menu Saved STICKERs s volbami Export logs a Delete all logs" width="320" />
