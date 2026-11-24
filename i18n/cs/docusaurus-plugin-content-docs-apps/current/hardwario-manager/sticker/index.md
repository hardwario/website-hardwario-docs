---
slug: /hardwario-manager/sticker
title: STICKER
description: "Zařízení STICKER nastavíte přiložením telefonu k zapnutému zařízení: menu, komunikace na jedno přiložení, nárokování a řešení problémů."
title_meta: "STICKER (HARDWARIO Manager)"
---

# STICKER přes NFC {#sticker-over-nfc}

Zařízení STICKER se konfiguruje **přiložením telefonu k zařízení**. Nepotřebujete
kabely, programátor ani software na počítači. Telefon komunikuje s běžícím
zařízením přes jeho čip NFC, takže **baterie musí být vložené** a nabité. Pokud
nejsou, aplikace ohlásí, že zařízení nezapnulo NFC.

Otevřete **HARDWARIO Manager** a zvolte **STICKER**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-sticker.png" alt="Menu STICKER v aplikaci HARDWARIO Manager s položkami Informace o zařízení, Konfigurace, Senzory, Rádio, Nástroje a Uložená zařízení STICKER a s tlačítkem Nárokovat STICKER dole" width="320" />

---

## Menu {#the-menu}

| Položka | Co obsahuje |
|---|---|
| **Informace o zařízení** | Sériové číslo, firmware, doba provozu, baterie, alarmy, stav zařízení a stav rádia, viz [**Informace o zařízení**](./device-info.md) |
| **Konfigurace** | **Načíst** konfiguraci a upravit ji, **Hromadný export**, **Hromadný zápis**, **Konfigurovat ze souboru** a **Šablony**, viz [**Konfigurace**](./configuration.md) |
| **Senzory** | [**1-Wire senzory**](./one-wire-sensors.md), [**Odečíst data**](./sample-data.md) a [**Historie senzorů**](./sensor-history.md) |
| **Rádio** | **Režim rádia** (Vypnuto, LoRaWAN nebo P2P), **Klíče rádiového spojení** a **Připojení k radiové síti**, viz [**Rádio**](./radio.md) |
| **Nástroje** | **Synchronizovat čas**, **Režim kalibrace**, **Reset** a **Změny výrobce**, viz [**Nástroje**](./tools.md) |
| **Uložená zařízení STICKER** | Zařízení, která spravujete, a jejich uložené klíče, viz [**Uložená zařízení STICKER**](./saved-stickers.md) |

Tlačítkem **Nárokovat STICKER** dole zařízení zaregistrujete na sebe, takže si ho
nikdo jiný nemůže nárokovat, a uloží se i s klíči v tomto telefonu. Viz
[**Uložená zařízení STICKER**](./saved-stickers.md).

---

## Jak funguje přiložení {#how-a-tap-works}

Když vás obrazovka vyzve k přiložení telefonu, přiložte jeho zadní stranu
k zařízení STICKER a sekundu či dvě s ním nehýbejte. Anténa NFC bývá v **horní
části zadní strany** telefonu; pokud se nic nestane, pohybujte telefonem pomalu
kolem tohoto místa, dokud se zařízení nenačte.

Zařízení STICKER komunikuje **kanálem šifrovaným AES-CCM**, takže aplikace může
číst nebo zapisovat, jen když zná **tajný klíč** zařízení. Jakmile je zařízení
uložené, aplikace klíč doplní sama: z tagu přečte sériové číslo a nonce a klíč
dohledá v seznamu uložených zařízení. U většiny akcí tak nemusíte nic psát.

:::info Firmware v2.0.0 nebo novější
Každá komunikace proběhne na jedno přiložení s telefonem v klidu, na Androidu
i na iOS stejně. HARDWARIO Manager pracuje s firmwarem STICKER **v2.0.0**
a novějším. U zařízení s firmwarem **v1.4.x** aplikace ohlásí, že jeho firmware už
nepodporuje: nechte mu aktualizovat firmware na v2.0.0 nebo novější.
:::

---

## Když zařízení není ve vašem seznamu {#if-the-device-is-not-in-your-list}

Pokud se tag přečte správně, ale jeho sériové číslo mezi vašimi uloženými
zařízeními není, aplikace neskončí chybou, ale ukáže obrazovku
**Neznámý STICKER** a nabídne jeho **nárokování**. Viz
[**Uložená zařízení STICKER**](./saved-stickers.md).

---

## Řešení problémů {#troubleshooting}

| Problém | Co zkontrolovat |
|---|---|
| Zařízení STICKER nejde přečíst | Zkontrolujte, že je NFC zapnuté a nepřekáží silný obal. Přiložte horní část zadní strany telefonu naplocho k zařízení a několik sekund s ním nehýbejte. |
| *STICKER nepřijal příkaz* | Tajný klíč uložený pro toto sériové číslo je pravděpodobně špatný. Zkontrolujte ho v seznamu [**Uložená zařízení STICKER**](./saved-stickers.md) a zkuste to znovu. |
| *Tento STICKER nezapnul NFC* | Baterie chybí nebo je vybitá. Vložte nabitou baterii a zkuste to znovu. |
| Aplikace hlásí, že firmware už nepodporuje | Zařízení má firmware v1.4.x, který aplikace už nepodporuje. Nechte mu aktualizovat firmware na v2.0.0 nebo novější. |
| Konfigurace je příliš velká | Snižte počet nastavení. Během úprav aplikace ukazuje velikost konfigurace vzhledem k limitu zařízení. |
| Po **Připojení k radiové síti** nepřichází odezva | Otevřete **Informace o zařízení**: řádek **Rádio** ukazuje *Připojování*, dokud zařízení čeká, a *V pořádku*, jakmile ho síť přijme. Pokud zůstane na *Připojování*, zkontrolujte klíče, region a profil zařízení na svém síťovém serveru. |
