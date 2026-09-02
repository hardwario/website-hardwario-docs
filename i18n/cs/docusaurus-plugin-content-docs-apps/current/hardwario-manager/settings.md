---
slug: settings
title: Nastavení aplikace
description: "obrazovky."
---

# Nastavení aplikace {#app-settings}

**Settings** otevřete ikonou ozubeného kola v pravém horním rohu jakékoli
obrazovky.

---

## Vzhled {#appearance}

Zvolte, jak má aplikace vypadat:

| Volba | Efekt |
|---|---|
| **System** | Řídí se světlým/tmavým nastavením telefonu. Toto je výchozí. |
| **Light** | Vždy světlá. |
| **Dark** | Vždy tmavá. |

---

## Jazyk {#language}

| Volba | Efekt |
|---|---|
| **System default** | Řídí se jazykem telefonu. Toto je výchozí. |
| **English** | Vždy anglicky. |
| **Čeština** | Vždy česky. |

Změna se projeví okamžitě — aplikaci není potřeba restartovat.

---

## Zabezpečení {#security}

**Lock app with Face ID / passcode** — *Vyžadovat autentizaci při spuštění a při
návratu do aplikace.* Ve výchozím stavu vypnuto.

Když je zapnuté, aplikace si při každém otevření i při každém návratu z jiné
aplikace vyžádá vaši biometriku nebo kód zařízení. Zapnutí aplikaci nezamkne
hned; projeví se až při dalším spuštění nebo návratu.

:::info Bez zámku telefonu není zámek aplikace
Pokud telefon nemá vlastní zámek obrazovky, aplikace se otevře normálně, místo
aby vás nepustila dál.
:::

---

## Historie změn STICKER {#sticker-change-log}

*Jak dlouho uchovávat historii změn konfigurace u každého uloženého zařízení
STICKER. Off zastaví zaznamenávání (existující historie zůstane).*

| Volba | Efekt |
|---|---|
| **Off** | Zastaví zaznamenávání. Už zaznamenaná historie zůstane. |
| **30 days** | Výchozí. |
| **60 days** | |
| **90 days** | |

Historie změn zaznamenává u uloženého zařízení každé čtení konfigurace a každý
úspěšný zápis. Jak záznamy číst, exportovat a znovu aplikovat, popisuje
[**Historie změn zařízení**](./sticker/change-log.md).

---

## Debug mode {#debug-mode}

Klepnutím na logo HARDWARIO ve spodní části obrazovky Settings **pětkrát** zapnete
nebo vypnete **Debug mode**. Po prvním klepnutí se objeví počítadlo, které
ukazuje, kolik klepnutí zbývá.

Debug mode přidá do menu STICKER Tools **NFC Console** — nízkoúrovňovou konzoli
pro surové příkazy NFC — a pod záhlavím zobrazí tenký pásek `debug mode`, abyste
vždy věděli, že je zapnutý. Je to diagnostická pomůcka; pro běžné použití ho
nechte vypnutý.

Debug mode si aplikace pamatuje, takže zůstane zapnutý, dokud ho znovu nevypnete.
