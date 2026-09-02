---
slug: /hardwario-manager/sticker
title: STICKER
description: "Zařízení STICKER se konfiguruje přiložením telefonu k zařízení. Žádné kabely,"
---

# STICKER přes NFC {#sticker-over-nfc}

Zařízení STICKER se konfiguruje **přiložením telefonu k zařízení**. Žádné kabely,
žádný programátor, žádný software na počítači. Zařízení STICKER je připravené na
NFC a lze ho nastavit i **bez vložených baterií** — pole NFC z telefonu napájí čip
dost dlouho na to, aby si nastavení uložil, a zařízení ho aplikuje při dalším
startu.

Otevřete **HARDWARIO Manager** a zvolte **STICKER**.

<img src="/img/hw-manager/hw-manager-sticker.jpg" alt="Menu STICKER v aplikaci HARDWARIO Manager s položkami Device info, LoRaWAN keys, Configuration, Templates, Tools a Saved STICKERs" width="320" />

:::info K snímkům obrazovky
Snímky v této sekci pocházejí ze staršího buildu, takže několik popisků má jinak
velká písmena než současná aplikace, která název produktu píše všude velkými.
Rozvržení obrazovek samotných odpovídá.
:::

---

## Menu {#the-menu}

| Položka | Co dělá |
|---|---|
| **Device info** | Přečte sériové číslo, verzi firmwaru, dobu běhu a hodiny — viz [**Informace o zařízení a klíče LoRaWAN**](./device-info.md) |
| **LoRaWAN keys** | Přečte DevEUI a klíče potřebné k registraci zařízení v síti |
| **Configuration** | Čtení a úprava celé konfigurace zařízení — viz [**Konfigurace**](./configuration.md) |
| **Templates** | Znovupoužitelné konfigurační presety — viz [**Šablony**](./templates.md) |
| **Tools** | Synchronizace času, senzory, historie, resety — viz [**Nástroje**](./tools.md) |
| **Saved STICKERs** | Zařízení, která spravujete, a jejich uložené klíče — viz [**Uložené STICKERy**](./saved-stickers.md) |

Tlačítko dole, **Claim a STICKER**, zaznamená zařízení k vašemu účtu ATELOS, aby
aplikace mohla doplnit jeho klíče. Viz [**Účet ATELOS**](../atelos.md).

---

## Jak funguje přiložení {#how-a-tap-works}

Když obrazovka napíše *hold the phone against the …*, přiložte zadní stranu
telefonu k zařízení STICKER a nehýbejte s ním sekundu či dvě. Anténa NFC bývá
v telefonu blízko **horní části zadní strany**; pokud se nic nestane, pohybujte
telefonem pomalu kolem tohoto místa, dokud nedojde k načtení.

Zařízení STICKER komunikuje **kanálem šifrovaným AES-CCM**, takže aplikace
potřebuje **secret key** zařízení, aby mohla číst nebo zapisovat. Jakmile je
zařízení uložené, aplikace klíč doplní automaticky — vezme sériové číslo a nonce
z tagu a klíč dohledá ve vašem uloženém seznamu — takže většina akcí nevyžaduje
žádné psaní.

:::info Android a iOS přikládají jinak
Na **Androidu** držíte telefon u zařízení po celou dobu výměny.

Na **iOS** běží celá výměna uvnitř jednoho systémového panelu skenování a panel
vás v polovině vyzve, abyste **telefon zvedli a přiložili znovu**. Tohle zvednutí
je nutné: dá zařízení okamžik bez pole, který potřebuje. Postupujte podle pokynů
na panelu a každé přiložení držte v klidu.
:::

---

## Když zařízení není ve vašem seznamu {#if-the-device-is-not-in-your-list}

Pokud se tag přečte správně, ale jeho sériové číslo není mezi vašimi uloženými
zařízeními, zobrazí aplikace obrazovku **Unknown STICKER** a nabídne jeho
**nárokování**, místo aby prostě selhala. Viz [**Účet ATELOS**](../atelos.md).

---

## Řešení problémů {#troubleshooting}

| Problém | Co zkontrolovat |
|---|---|
| Zařízení STICKER se nedá přečíst | NFC je zapnuté, v cestě není silný obal, přiložte horní část zadní strany telefonu naplocho k zařízení a několik sekund nehýbejte. |
| Zápis jako by nic nedělal | Zařízení tiše ignoruje zápisy provedené se špatným secret key. Ověřte, že je uložený secret key pro toto zařízení správný. |
| Konfigurace je příliš velká | Ubírejte nastavení. Aplikace během úprav zobrazuje velikost proti limitu zařízení. |
| Po připojení k LoRaWAN žádná odezva | Zkontrolujte klíče a profil zařízení ve svém síťovém serveru. |
