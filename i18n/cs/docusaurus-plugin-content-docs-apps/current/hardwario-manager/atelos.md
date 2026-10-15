---
slug: atelos
title: Účet ATELOS
---

# Účet ATELOS {#atelos-account}

**ATELOS** je produkční cloud HARDWARIO, se kterým aplikace HARDWARIO Manager
pracuje. Uchovává tajné údaje každého zařízení a eviduje, kdo ho vlastní, takže
je aplikace nemusí mít uložené jen v telefonu. Po přihlášení může aplikace zařízení
**nárokovat** a vyplnit za vás jejich klíče.

Otevřete na domovské obrazovce dlaždici **ATELOS account**.

:::info Dlaždici účtu nemá každé sestavení
Dlaždice **ATELOS account** (přihlášení, vytvoření účtu, změna hesla, My devices)
je jen v sestaveních, která obsahují správu účtu ATELOS; veřejné vydání aplikace
HARDWARIO Manager ji zatím nemá. Nárokování zařízení STICKER funguje v každém
sestavení: bez přihlášení zařízení nárokujete k tomuto telefonu, viz
[**Nárokování zařízení STICKER**](#claim-a-sticker).
:::

---

## Přihlášení {#log-in}

1. Otevřete **ATELOS account** a zvolte **Log in to ATELOS**.
2. Zadejte **jméno účtu nebo e-mail** a své heslo.
3. Potvrďte.

Po přihlášení se všechna zařízení, která jste nárokovali v systému ATELOS,
automaticky načtou do seznamu [**Saved STICKERs**](./sticker/saved-stickers.md)
i s uloženým secret key. Klíče u těchto zařízení nemusíte zadávat ručně.

## Vytvoření účtu {#create-an-account}

Zvolte **Create an ATELOS account** (nabízí ji i přihlašovací obrazovka) a
vyplňte formulář.

## Změna hesla {#change-your-password}

Otevřete **ATELOS account → Change password**.

## My devices {#my-devices}

V části **ATELOS account → My devices** najdete zařízení vedená pod vaším účtem
ATELOS. Jde o jiný seznam než ten, který má aplikace uložený v telefonu.

---

## Nárokování zařízení STICKER {#claim-a-sticker}

Nárokováním zařízení zapíšete v ATELOSu jako své a aplikace tím získá přístup
k jeho secret key. Nárokované zařízení už nikdo jiný nárokovat nemůže.

1. Otevřete **STICKER** a klepněte na **Claim a STICKER** na konci nabídky (nebo
   otevřete **Saved STICKERs** a nárokujte zařízení tam).
2. Zvolte **Tap over NFC** a přiložte telefon k zařízení STICKER. Aplikace přečte
   jeho sériové číslo a zařízení nárokuje.
3. Pokud nejste přihlášení, aplikace se zeptá, jak zařízení nárokovat:
   - **Log in & claim**: k vašemu účtu ATELOS (jen sestavení se správou účtu).
   - **Stay logged out**: k tomuto telefonu.
4. Až o to aplikace požádá, přiložte telefon k zařízení ještě jednou, aby se
   uzavřelo okno pro nárokování.

Zařízení pak najdete v seznamu [**Saved STICKERs**](./sticker/saved-stickers.md)
i s jeho secret key.

:::info Vendor token se zadává ručně
Při nárokování se přenese **secret key** zařízení, **vendor token** zatím ne.
Ten potřebujete pro operace popsané v
[**Reset zařízení → Vendor changes**](./sticker/reset.md) a zadáte ho ručně na
obrazovce s detailem zařízení.
:::

:::info Přidání zařízení bez nárokování
Obrazovka pro nárokování zařízení registruje v ATELOSu, a proto potřebuje
spojení s ATELOSem. Pokud
chcete přidat zařízení, ke kterým už klíče máte (z exportu od kolegy, z CSV nebo
z QR kódu), použijte místo toho **Saved STICKERs → Import**. Viz
[**Saved STICKERs**](./sticker/saved-stickers.md).
:::
