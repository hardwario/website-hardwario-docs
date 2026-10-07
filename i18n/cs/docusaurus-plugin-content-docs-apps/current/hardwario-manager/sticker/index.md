---
slug: /hardwario-manager/sticker
title: STICKER
description: "Zařízení STICKER se konfiguruje přiložením telefonu, bez kabelů, programátoru a softwaru na počítači."
title_meta: "STICKER (HARDWARIO Manager)"
---

# STICKER přes NFC {#sticker-over-nfc}

Zařízení STICKER se konfiguruje **přiložením telefonu k zařízení**. Nepotřebujete
kabely, programátor ani software na počítači. Zařízení STICKER podporuje NFC a lze
ho nastavit i **bez vložených baterií**: pole NFC z telefonu napájí čip dost
dlouho na to, aby nastavení uložil, a zařízení ho začne používat po dalším
startu.

Otevřete **HARDWARIO Manager** a zvolte **STICKER**.

<img src="/img/hw-manager/hw-manager-sticker.jpg" alt="Menu STICKER v aplikaci HARDWARIO Manager s položkami Device info, LoRaWAN keys, Configuration, Templates, Tools a Saved STICKERs" width="320" />

:::info Ke snímkům obrazovky
Snímky v této sekci pocházejí ze staršího sestavení aplikace, takže několik popisků má
jinak velká písmena než současná verze, která název produktu píše všude velkými
písmeny. Rozvržení obrazovek ale odpovídá.
:::

---

## Menu {#the-menu}

| Položka | Co dělá |
|---|---|
| **Device info** | Čtení sériového čísla, verze firmwaru, doby běhu a hodin, viz [**Informace o zařízení a klíče LoRaWAN**](./device-info.md) |
| **LoRaWAN keys** | Čtení DevEUI a klíčů potřebných k registraci zařízení v síti |
| **Configuration** | Čtení a úprava celé konfigurace zařízení, viz [**Konfigurace**](./configuration.md) |
| **Templates** | Znovu použitelné konfigurační předvolby, viz [**Šablony**](./templates.md) |
| **Tools** | Synchronizace času, senzory, historie, resety, viz [**Nástroje**](./tools.md) |
| **Saved STICKERs** | Spravovaná zařízení a jejich uložené klíče, viz [**Saved STICKERs**](./saved-stickers.md) |

Tlačítkem **Claim a STICKER** dole zařízení zapíšete ke svému účtu ATELOS, aby
aplikace mohla doplnit jeho klíče. Viz [**Účet ATELOS**](../atelos.md).

---

## Jak funguje přiložení {#how-a-tap-works}

Když se na obrazovce objeví *hold the phone against the …*, přiložte zadní stranu
telefonu k zařízení STICKER a nehýbejte s ním sekundu či dvě. Anténa NFC bývá
v **horní části zadní strany** telefonu; pokud se nic nestane, pohybujte
telefonem pomalu kolem tohoto místa, dokud se tag nenačte.

Zařízení STICKER komunikuje **kanálem šifrovaným AES-CCM**, takže aplikace může
číst nebo zapisovat, jen když zná **secret key** zařízení. Jakmile je zařízení
uložené, aplikace klíč doplní automaticky: z tagu přečte sériové číslo a nonce
a klíč dohledá v seznamu uložených zařízení. U většiny akcí tak nemusíte nic
psát.

:::info Přiložení na Androidu a iOS se liší
Na **Androidu** držíte telefon u zařízení po celou dobu komunikace.

Na **iOS** probíhá celá komunikace v jednom systémovém panelu skenování, který vás
uprostřed vyzve, abyste **telefon oddálili a znovu přiložili**. Oddálení je
nutné: zařízení potřebuje na okamžik zůstat bez pole NFC. Postupujte podle pokynů
v panelu a při každém přiložení držte telefon v klidu.
:::

---

## Když zařízení není ve vašem seznamu {#if-the-device-is-not-in-your-list}

Pokud se tag přečte správně, ale jeho sériové číslo není mezi vašimi uloženými
zařízeními, nezobrazí aplikace chybu, ale obrazovku **Unknown STICKER**
a nabídne jeho **nárokování**. Viz [**Účet ATELOS**](../atelos.md).

---

## Řešení problémů {#troubleshooting}

| Problém | Co zkontrolovat |
|---|---|
| Zařízení STICKER nejde přečíst | Zkontrolujte, že je NFC zapnuté a nepřekáží silný obal. Přiložte horní část zadní strany telefonu naplocho k zařízení a několik sekund s ním nehýbejte. |
| Zápis se zdánlivě neprojeví | Zápisy se špatným secret key zařízení bez upozornění ignoruje. Ověřte, že je pro toto zařízení uložený správný secret key. |
| Konfigurace je příliš velká | Snižte počet nastavení. Během úprav aplikace ukazuje velikost konfigurace vzhledem k limitu zařízení. |
| Po připojení (join) do sítě LoRaWAN nepřichází odezva | Zkontrolujte klíče a profil zařízení na svém síťovém serveru. |
