---
slug: device-info
title: Informace o zařízení
---

# Informace o zařízení CHESTER {#chester-device-info}

Po připojení zařízení otevřete **CHESTER → Device info**. Nahoře je **Uptime**,
který se průběžně aktualizuje; pod ním jsou identifikační údaje zařízení.

<img src="/img/hw-manager/hw-manager-chester-device-info.png" alt="Obrazovka CHESTER Device Info s dobou běhu, výrobcem, produktem, hardwarovou variantou a revizí, firmwarem, sériovým číslem, claim tokenem, adresou Bluetooth a passkey" width="320" />

---

## Co se zobrazuje {#what-is-shown}

| Pole | Význam |
|---|---|
| **Uptime** | Doba od posledního startu zařízení, průběžně aktualizovaná |
| **Vendor name** | Výrobce |
| **Product name** | Produkt |
| **Hardware variant** | Kód varianty této jednotky |
| **Hardware revision** | Revize desky |
| **Firmware name** | Název aplikace ve firmwaru. Starší firmware ho nemusí hlásit |
| **Firmware version** | Běžící verze |
| **Serial number** | Identita zařízení |
| **Claim token** | Token používaný k nárokování zařízení |
| **Bluetooth address** | Adresa BLE zařízení |
| **Bluetooth passkey** | Šestimístný párovací passkey |

Pole, která zařízení nehlásí, se nezobrazí vůbec, ani jako prázdná. Každou
hodnotu lze označit a zkopírovat.

---

## Kopírování a sdílení {#copy-or-share-it}

Akce v horní liště vytvoří tentýž blok textu: název zařízení a pod ním jeden
řádek `Label: hodnota` na každé pole:

- **Copy device info** ho vloží do schránky.
- **Share device info** otevře panel sdílení telefonu.

Je to nejrychlejší způsob, jak poslat identitu zařízení podpoře.

---

## Ovládání zařízení {#device-controls}

V menu je tato obrazovka popsaná jako *sériové číslo, firmware, doba běhu
a ovládání zařízení*. Ovládací prvky jsou pod seznamem polí. **Save configuration**
uloží aktuální nastavení zařízení do jeho paměti, takže vydrží i restart.

Restart zařízení a obnovení výchozího nastavení z výroby najdete na stránce
[**Nástroje**](./tools.md).

Ovládací prvky jsou neaktivní, dokud aplikace komunikuje se zařízením. Pokud akce
selže, aplikace to oznámí a nabídne volbu **Details**, která zobrazí původní chybu
s tlačítkem **Copy**.

:::info Save configuration vs. uložení z obrazovky konfigurace
**Save configuration** tady uloží aktuální nastavení zařízení. Je to stejný
krok, který za vás po zapsání úprav udělá obrazovka
[**Konfigurace**](./configuration.md). Použijte ho, když jste nastavení změnili
v [**Terminálu**](./terminal.md) a chcete, aby zůstalo zachované.
:::
