---
slug: change-log
title: Historie změn zařízení
---

# Zobrazení historie změn zařízení {#view-a-devices-change-log}

Historie změn zaznamenává u uloženého zařízení STICKER každé **čtení** konfigurace
a každý úspěšný **zápis**, takže vidíte, jak bylo zařízení kdy nastavené.

---

## Zapnutí historie změn {#turn-the-change-log-on}

Otevřete **Settings → STICKER change log** a zvolte, jak dlouho se záznamy mají
uchovávat: **Off**, **30**, **60** nebo **90 dnů**. Výchozí je 30 dnů. Volba **Off**
zastaví další zaznamenávání; dosavadní záznamy zůstanou.

Viz [**Nastavení aplikace**](../settings.md).

---

## Otevření historie zařízení {#open-a-devices-log}

1. Přejděte na **STICKER → Saved STICKERs** a otevřete **Detail** zařízení.
2. Otevřete jeho **Change log** a zvolte položku ze seznamu **Recorded read**.
   U každé je uvedené datum, čas a sekce, které zahrnuje.

<img src="/img/hw-manager/hw-manager-sticker-log.png" alt="Obrazovka s detailem uloženého zařízení s otevřenou historií změn na zaznamenaném čtení" width="320" />

U vybrané položky můžete:

| Akce | Význam |
|---|---|
| **Configure a STICKER with this** | Zapsat zaznamenanou konfiguraci zpět do zařízení. Obnovení stavu k danému okamžiku |
| **Export this** | Sdílet jednu položku jako soubor |
| **Export log** | Sdílet celou historii tohoto zařízení |
| **Delete this entry** | Odstranit jen tuto položku |
| **Delete full log** | Odstranit historii tohoto zařízení |

:::tip Obnovení starší konfigurace
Když se změna nepovede, **Configure a STICKER with this** vás nejrychleji vrátí
do ověřeného funkčního stavu. Ke stejným zaznamenaným okamžikům se dostanete i
přes **Configuration → Configure from file**: zvolíte export historie změn a pak
konkrétní okamžik. Viz [**Konfigurace**](./configuration.md).
:::

---

## Napříč všemi zařízeními {#across-all-devices}

V **menu ⋮** seznamu **Saved STICKERs** můžete historii všech zařízení najednou
exportovat (**Export logs**) nebo smazat (**Delete all logs**).

<img src="/img/hw-manager/hw-manager-saved-sticker-more.png" alt="Nabídka ⋮ seznamu Saved STICKERs s volbami Export logs a Delete all logs" width="320" />
