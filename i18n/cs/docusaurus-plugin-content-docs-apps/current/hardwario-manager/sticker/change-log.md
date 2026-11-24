---
slug: change-log
title: Historie změn zařízení
description: "Historie změn zařízení STICKER v aplikaci HARDWARIO Manager: zapnutí, záznamy čtení a zápisů, obnovení dřívější konfigurace a export či smazání záznamů."
---

# Zobrazení historie změn zařízení {#view-a-devices-change-log}

Historie změn zaznamenává u uloženého zařízení STICKER každé **čtení** konfigurace
a každý úspěšný **zápis**, takže vidíte, jak bylo zařízení kdy nastavené.

---

## Zapnutí historie změn {#turn-the-change-log-on}

Z nabídky aplikace otevřete **Nastavení** a v sekci **Protokol změn STICKER**
zvolte, jak dlouho se záznamy mají uchovávat: **Vypnuto**, **30 dní**, **60 dní**
nebo **90 dní**. Výchozí je 30 dní. Volba **Vypnuto** zastaví další
zaznamenávání; dosavadní záznamy zůstanou.

Viz [**Nastavení aplikace**](../settings.md).

---

## Otevření historie zařízení {#open-a-devices-log}

1. Přejděte na **STICKER → Uložená zařízení STICKER** a klepněte na zařízení.
2. V sekci **Historie změn** zvolte položku ze seznamu **Zaznamenané čtení**.
   U každé je uvedené datum, čas a sekce, které zahrnuje (**Rádio**,
   **Aplikace**, **Senzory**, **Alarmy**).

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-sticker-log.png" alt="Obrazovka uloženého zařízení posunutá na Historii změn s vybraným zaznamenaným čtením a jeho akcemi" width="320" />

Zápis přes **Hromadný zápis** nebo **Konfigurovat ze souboru** zaznamená jen
hodnoty, které zapsal, ne celý formulář.

U vybrané položky můžete:

| Akce | Význam |
|---|---|
| **Konfigurovat STICKER s tímto** | Zapsat zaznamenanou konfiguraci zpět do zařízení. Obnovení stavu k danému okamžiku |
| **Exportovat toto** | Sdílet jednu položku jako soubor |
| **Exportovat protokol** | Sdílet celou historii tohoto zařízení |
| **Smazat tento záznam** | Odstranit jen tuto položku |
| **Smazat celý protokol** | Odstranit historii tohoto zařízení |

:::tip Obnovení starší konfigurace
Když se změna nepovede, **Konfigurovat STICKER s tímto** vás nejrychleji vrátí
do ověřeného funkčního stavu. Ke stejným zaznamenaným okamžikům se dostanete i
přes **Konfigurace → Konfigurovat ze souboru**: zvolíte export historie změn
a pak konkrétní okamžik. Viz [**Konfigurace**](./configuration.md).
:::

---

## Napříč všemi zařízeními {#across-all-devices}

V **nabídce ⋮** seznamu **Uložená zařízení STICKER** můžete historii všech
zařízení najednou exportovat (**Exportovat protokoly**) nebo smazat (**Smazat
všechny protokoly**). Zařízení i jejich klíče přitom zůstanou.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-saved-sticker-more.png" alt="Nabídka ⋮ seznamu Uložená zařízení STICKER s volbami Štítky, Importovat, Exportovat, Exportovat protokoly, Smazat všechny protokoly a Smazat" width="320" />
