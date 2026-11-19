---
slug: settings
title: Nastavení aplikace
description: "Nastavení aplikace HARDWARIO Manager: světlý či tmavý vzhled, angličtina nebo čeština, zámek přes Face ID či kód, protokol změn STICKER a režim ladění."
---

# Nastavení aplikace {#app-settings}

Na kterékoli obrazovce klepněte na tlačítko **nabídky** (☰) v pravém horním rohu
a zvolte **Nastavení**.

---

## Vzhled {#appearance}

Zvolte, jak má aplikace vypadat:

| Volba | Význam |
|---|---|
| **Výchozí nastavení systému** | Řídí se světlým nebo tmavým režimem telefonu. Výchozí volba. |
| **Světlý** | Vždy světlý vzhled. |
| **Tmavý** | Vždy tmavý vzhled. |

---

## Jazyk {#language}

| Volba | Význam |
|---|---|
| **Výchozí nastavení systému** | Řídí se jazykem telefonu. Výchozí volba. |
| **English** | Vždy anglicky. |
| **Čeština** | Vždy česky. |

Změna se projeví okamžitě. Aplikaci není potřeba restartovat.

---

## Zabezpečení {#security}

**Zamknout aplikaci pomocí Face ID / kódu**: *Vyžadovat ověření při spuštění
a návratu do aplikace.* Ve výchozím stavu vypnuto.

Když je volba zapnutá, aplikace při každém otevření i při každém návratu z jiné
aplikace vyžaduje biometrické ověření nebo kód zařízení. Po zapnutí se aplikace
nezamkne hned, ale až při dalším spuštění nebo návratu.

:::info Bez zámku telefonu není zámek aplikace
Pokud telefon nemá vlastní zámek obrazovky, aplikace vás nezablokuje a otevře
se normálně.
:::

---

## Protokol změn STICKER {#sticker-change-log}

*Jak dlouho uchovávat historii změn konfigurace pro každý uložený STICKER.
Vypnuto zastaví protokolování (existující protokoly zůstanou zachovány).*

| Volba | Význam |
|---|---|
| **Vypnuto** | Zaznamenávání se zastaví. Dosavadní záznamy zůstanou. |
| **30 dní** | Výchozí. |
| **60 dní** | |
| **90 dní** | |

Historie změn zaznamenává u uloženého zařízení každé čtení konfigurace a každý
úspěšný zápis. Jak záznamy číst, exportovat a znovu použít, popisuje stránka
[**Historie změn zařízení**](./sticker/change-log.md).

---

## Režim ladění {#debug-mode}

Když **pětkrát** klepnete na logo HARDWARIO dole v nabídce aplikace, zapnete
nebo vypnete režim ladění. Po prvním klepnutí se objeví počítadlo, které
ukazuje, kolik klepnutí zbývá.

Dokud je režim ladění zapnutý, aplikace pod záhlavím zobrazuje tenký pásek
`režim ladění`, abyste vždy věděli, že je zapnutý, a přidá:

- do nabídky **Nástroje** zařízení STICKER položku **Nástroje pro ladění**:
  **Zrušit nárok**, **Zapsat kód pro nárokování** a **NFC konzole**,
  nízkoúrovňovou konzoli pro surové příkazy NFC. Viz
  [**Nástroje**](./sticker/tools.md#debug-tools).
- do nastavení sekci **NFC přenos STICKER**, popsanou níže.

Je to diagnostická pomůcka; při běžném používání ho nechte vypnutý. Aplikace si
režim ladění pamatuje, takže zůstane zapnutý, dokud ho nevypnete.

---

## NFC přenos STICKER {#sticker-nfc-transport}

Sekce **NFC přenos STICKER · režim ladění** se v nastavení objeví, jen když je
zapnutý režim ladění. Určuje, jak aplikace se zařízením STICKER komunikuje přes
NFC:

| Volba | Význam |
|---|---|
| **Mailbox** | *Výchozí.* Pro každé zařízení STICKER s firmwarem v2.0.0 nebo novějším. |
