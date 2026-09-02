---
slug: device-info
title: Informace o zařízení
description: "Po připojení zařízení otevřete CHESTER → Device info. Nahoře je Uptime,"
---

# Informace o zařízení CHESTER {#chester-device-info}

Po připojení zařízení otevřete **CHESTER → Device info**. Nahoře je **Uptime**,
který během sledování běží; pod ním následuje identita zařízení.

<img src="/img/hw-manager/hw-manager-chester-device-info.png" alt="Obrazovka CHESTER Device Info s dobou běhu, výrobcem, produktem, hardwarovou variantou a revizí, firmwarem, sériovým číslem, claim tokenem, Bluetooth adresou a passkey" width="320" />

---

## Co se zobrazuje {#what-is-shown}

| Pole | Význam |
|---|---|
| **Uptime** | Doba od posledního startu zařízení, aktualizovaná živě |
| **Vendor name** | Výrobce |
| **Product name** | Produkt |
| **Hardware variant** | Kód varianty této jednotky |
| **Hardware revision** | Revize desky |
| **Firmware name** | Aplikace firmwaru. Starší firmware ji hlásit nemusí |
| **Firmware version** | Běžící verze |
| **Serial number** | Identita zařízení |
| **Claim token** | Token používaný k nárokování zařízení |
| **Bluetooth address** | BLE adresa zařízení |
| **Bluetooth passkey** | Šestimístný párovací passkey |

Pole, která zařízení nehlásí, se vynechají, místo aby se zobrazila prázdná. Každou
hodnotu lze vybrat a zkopírovat.

---

## Zkopírování a nasdílení {#copy-or-share-it}

Akce v horní liště vytvoří tentýž blok textu — název zařízení a pod ním jeden
řádek `Label: hodnota` na každé pole:

- **Copy device info** ho vloží do schránky.
- **Share device info** otevře panel sdílení telefonu.

Je to nejrychlejší způsob, jak poslat identitu zařízení podpoře.

---

## Ovládání zařízení {#device-controls}

Menu tuhle obrazovku popisuje jako *sériové číslo, firmware, dobu běhu a ovládání
zařízení* — ovládací prvky jsou pod seznamem polí. **Save configuration** zapíše
to, co je na zařízení právě nastavené, do jeho paměti, takže nastavení přežije
restart.

Restart zařízení a jeho vrácení na výrobní výchozí hodnoty jsou v
[**Nástrojích**](./tools.md).

Ovládací prvky jsou neaktivní, dokud aplikace komunikuje se zařízením. Pokud akce
selže, aplikace to oznámí a nabídne **Details**, které otevře původní chybu
s tlačítkem **Copy**.

:::info Save configuration vs. uložení z obrazovky konfigurace
**Save configuration** tady zapíše to, co je na zařízení právě nastavené. Je to
stejný krok zápisu, který za vás po zapsání úprav dělá
[**Konfigurace**](./configuration.md) — použijte ho, když jste nastavení změnili
z [**Terminálu**](./terminal.md) a chcete, aby vydrželo.
:::
