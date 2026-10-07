---
slug: settings
title: Nastavení aplikace
---

# Nastavení aplikace {#app-settings}

**Settings** otevřete ikonou ozubeného kola v pravém horním rohu jakékoli
obrazovky.

---

## Vzhled {#appearance}

Zvolte, jak má aplikace vypadat:

| Volba | Význam |
|---|---|
| **System** | Řídí se světlým nebo tmavým režimem telefonu. Výchozí volba. |
| **Light** | Vždy světlá. |
| **Dark** | Vždy tmavá. |

---

## Jazyk {#language}

| Volba | Význam |
|---|---|
| **System default** | Řídí se jazykem telefonu. Výchozí volba. |
| **English** | Vždy anglicky. |
| **Čeština** | Vždy česky. |

Změna se projeví okamžitě. Aplikaci není potřeba restartovat.

---

## Zabezpečení {#security}

**Lock app with Face ID / passcode**: *Vyžadovat autentizaci při spuštění a při
návratu do aplikace.* Ve výchozím stavu vypnuto.

Když je volba zapnutá, aplikace při každém otevření i při každém návratu z jiné
aplikace vyžaduje biometrické ověření nebo kód zařízení. Po zapnutí se aplikace
nezamkne hned, ale až při dalším spuštění nebo návratu.

:::info Bez zámku telefonu není zámek aplikace
Pokud telefon nemá vlastní zámek obrazovky, aplikace vás nezablokuje a otevře
se normálně.
:::

---

## Historie změn STICKER {#sticker-change-log}

*Jak dlouho uchovávat historii změn konfigurace u každého uloženého zařízení
STICKER. Volba Off zaznamenávání zastaví (dosavadní záznamy zůstanou).*

| Volba | Význam |
|---|---|
| **Off** | Zaznamenávání se zastaví. Dosavadní záznamy zůstanou. |
| **30 days** | Výchozí. |
| **60 days** | |
| **90 days** | |

Historie změn zaznamenává u uloženého zařízení každé čtení konfigurace a každý
úspěšný zápis. Jak záznamy číst, exportovat a znovu použít, popisuje stránka
[**Historie změn zařízení**](./sticker/change-log.md).

---

## Ladicí režim {#debug-mode}

Když **pětkrát** klepnete na logo HARDWARIO ve spodní části obrazovky **Settings**,
zapnete nebo vypnete ladicí režim (**Debug mode**). Po prvním klepnutí se objeví
počítadlo, které ukazuje, kolik klepnutí zbývá.

Ladicí režim přidá do nabídky **Tools** zařízení STICKER položku **NFC Console**
(nízkoúrovňovou konzoli pro surové příkazy NFC) a pod záhlavím zobrazí tenký
pásek `debug mode`, abyste vždy věděli, že je zapnutý. Je to diagnostická
pomůcka; při běžném používání ho nechte vypnutý.

Aplikace si ladicí režim pamatuje, takže zůstane zapnutý, dokud ho nevypnete.
