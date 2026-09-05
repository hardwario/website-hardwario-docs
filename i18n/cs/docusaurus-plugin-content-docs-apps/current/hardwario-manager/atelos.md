---
slug: atelos
title: Účet ATELOS
description: "pracuje. Drží tajné údaje každého zařízení a záznam o tom, kdo ho vlastní, takže"
---

# Účet ATELOS {#atelos-account}

**ATELOS** je produkční cloud HARDWARIO, se kterým aplikace HARDWARIO Manager
pracuje. Drží tajné údaje každého zařízení a záznam o tom, kdo ho vlastní, takže
je aplikace nemusí držet jen v telefonu. Po přihlášení může aplikace zařízení
**nárokovat** a vyplnit za vás jejich klíče.

Otevřete na domovské obrazovce dlaždici **ATELOS account**.

---

## Přihlášení {#log-in}

1. Otevřete **ATELOS account** a zvolte **Log in to ATELOS**.
2. Zadejte **jméno účtu nebo e-mail** a své heslo.
3. Potvrďte.

Po přihlášení se všechna zařízení, která jste v ATELOSu nárokovali, automaticky
natáhnou do vašeho seznamu [**Uložené STICKERy**](./sticker/saved-stickers.md),
včetně uloženého secret key. Klíče u těchto zařízení nemusíte zadávat ručně.

## Vytvoření účtu {#create-an-account}

Zvolte **Create an ATELOS account** (nabízí se i z přihlašovací obrazovky) a
vyplňte formulář.

## Změna hesla {#change-your-password}

Otevřete **ATELOS account → Change password**.

## My devices {#my-devices}

**ATELOS account → My devices** vypisuje zařízení vedená pod vaším účtem ATELOS,
na rozdíl od lokálního seznamu v telefonu.

---

## Nárokování zařízení STICKER {#claim-a-sticker}

Nárokování zaznamená zařízení k vašemu účtu ATELOS a dá aplikaci přístup k jeho
secret key.

1. Otevřete **STICKER** a klepněte na **Claim a STICKER** na konci menu (nebo
   otevřete **Saved STICKERs** a přidejte zařízení odtud).
2. Zvolte, jak zařízení identifikovat:
   - **Tap over NFC**: přiložte telefon k zařízení STICKER.
   - **Scan QR code**: naskenujte claim QR kód zařízení.
   - **Enter manually**: napište sériové číslo.
3. Pokud nejste přihlášení, aplikace nabídne **Log in and claim**.

:::info Vendor token se zadává ručně
Nárokování přenese **secret key** zařízení. Ještě nepřenáší **vendor token**,
který je potřeba pro operace v
[**Reset zařízení → Vendor changes**](./sticker/reset.md). Ten zadejte ručně na
obrazovce s detailem zařízení.
:::

:::info Přidání zařízení bez nárokování
Obrazovka **Add** zařízení nárokuje, takže vyžaduje přihlášení do ATELOSu. Pokud
chcete přidat zařízení, ke kterým už klíče máte (z exportu od kolegy, z CSV nebo
z QR kódu), použijte místo toho **Saved STICKERs → Import**. Viz
[**Uložené STICKERy**](./sticker/saved-stickers.md).
:::
