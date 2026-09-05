---
slug: device-info
title: Informace o zařízení a klíče LoRaWAN
description: "Přečtěte identitu zařízení STICKER a klíče LoRaWAN, které potřebujete k jeho"
---

# Čtení informací o zařízení a klíčů LoRaWAN {#read-device-info-and-lorawan-keys}

Přečtěte identitu zařízení STICKER a klíče LoRaWAN, které potřebujete k jeho
registraci v síti, přes NFC, za několik sekund.

:::info Zařízení nejdřív uložte
Obě obrazovky používají šifrovaný kanál, takže zařízení musí být uložené se svým
**secret key**. Viz [**Uložené STICKERy**](./saved-stickers.md).
:::

---

## Čtení informací o zařízení {#read-device-info}

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Device info**.
2. Přiložte telefon k zařízení STICKER a nehýbejte s ním.

<img src="/img/hw-manager/hw-manager-device-info.png" alt="Informace o zařízení přečtené přes NFC se sériovým číslem, firmwarem, časem a dobou běhu" width="320" />

| Pole | Význam |
|---|---|
| **Serial number** | Identita zařízení |
| **Firmware** | Běžící verze firmwaru |
| **Time (UTC)** | Hodiny zařízení |
| **Uptime** | Doba od posledního startu |
| **Battery** | Naměřené napájecí napětí |
| **LoRaWAN** | Stav připojení LoRaWAN |
| **DevEUI** | Identifikátor zařízení v LoRaWAN |
| **Health** | Souhrn stavových příznaků zařízení |
| **Active alarms** | Která pravidla alarmů jsou právě vyvolaná, viz [**Pravidla alarmů**](./alarms.md) |

**Advanced** rozbalí další diagnostické podrobnosti, například build firmwaru a
příčinu posledního resetu. **Read again** čtení zopakuje bez opuštění obrazovky.
Znovu přiložte telefon k zařízení.

---

## Čtení klíčů LoRaWAN {#read-lorawan-keys}

1. Přejděte na **STICKER → LoRaWAN keys** a zvolte **Read LoRaWAN keys**.
2. Přiložte telefon k zařízení STICKER.

<img src="/img/hw-manager/hw-manager-lrw-keys.png" alt="Klíče LoRaWAN přečtené přes NFC" width="320" />

Co se zobrazí, závisí na režimu aktivace zařízení:

| Režim | Zobrazené klíče |
|---|---|
| **OTAA** | DevEUI, JoinEUI (AppEUI), AppKey |
| **ABP** | DevEUI, DevAddr a klíče session |

---

## Načtení několika zařízení v jedné session {#read-several-devices-in-one-session}

Obrazovka si vede seznam, místo aby poslední odečet přepsala. Pomocí **Scan next
STICKER** přidáte další zařízení, mezi zachycenými zařízeními se pohybujete
stránkovačem a **Clear all** začne znovu. Je to rychlá cesta, jak posbírat klíče
pro celou dávku zařízení, ještě než je zaregistrujete.

---

## Nasdílení klíčů {#share-the-keys}

Klíče nasdílejte jako **JSON**, **CSV**, **text** nebo **QR kód**, případně
použijte **Copy JSON to clipboard**. Když je zachycené víc než jedno zařízení,
akce sdílení pokrývají celou sadu a **Share all** je vyexportuje společně.

<img src="/img/hw-manager/hw-manager-lrw-keys-share.png" alt="Sdílení klíčů LoRaWAN jako JSON, CSV, text nebo QR kód" width="320" />

Použijte je k registraci zařízení v
[**ChirpStacku**](/sticker/connectivity/lorawan-chirpstack) nebo
[**The Things Stack**](/sticker/connectivity/lorawan-tts).

:::caution Export klíčů je úplný
Na rozdíl od exportu konfigurace export klíčů LoRaWAN nic neodstraňuje. AppKey
i klíče session jsou v něm celé, aby se soubor dal použít k registraci zařízení.
Zacházejte s ním podle toho a dávejte pozor, kde QR kód zobrazujete.
:::
