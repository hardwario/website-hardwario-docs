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

Nárokováním zařízení zapíšete ke svému účtu ATELOS a aplikace tím získá přístup
k jeho secret key.

1. Otevřete **STICKER** a klepněte na **Claim a STICKER** na konci nabídky (nebo
   otevřete **Saved STICKERs** a přidejte zařízení tam).
2. Zvolte, jak zařízení identifikovat:
   - **Tap over NFC**: přiložte telefon k zařízení STICKER.
   - **Scan QR code**: naskenujte QR kód zařízení pro nárokování.
   - **Enter manually**: zadejte sériové číslo.
3. Pokud nejste přihlášení, aplikace nabídne **Log in and claim**.

:::info Vendor token se zadává ručně
Při nárokování se přenese **secret key** zařízení, **vendor token** zatím ne.
Ten potřebujete pro operace popsané v
[**Reset zařízení → Vendor changes**](./sticker/reset.md) a zadáte ho ručně na
obrazovce s detailem zařízení.
:::

:::info Přidání zařízení bez nárokování
Obrazovka **Add** zařízení nárokuje, a proto vyžaduje přihlášení k účtu ATELOS. Pokud
chcete přidat zařízení, ke kterým už klíče máte (z exportu od kolegy, z CSV nebo
z QR kódu), použijte místo toho **Saved STICKERs → Import**. Viz
[**Saved STICKERs**](./sticker/saved-stickers.md).
:::
