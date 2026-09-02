---
slug: firmware-update
title: Aktualizace firmwaru
description: "Aplikace stáhne image firmwaru z odkazu a nahraje ho do připojeného zařízení"
---

# Aktualizace firmwaru zařízení CHESTER přes Bluetooth {#update-chester-firmware-over-bluetooth}

Aplikace stáhne image firmwaru z odkazu a nahraje ho do připojeného zařízení
CHESTER přes Bluetooth.

Otevřete **CHESTER → Tools → Firmware update**.

<img src="/img/hw-manager/hw-manager-chester-firmware-update.png" alt="Obrazovka Firmware update s pokyny a tlačítkem Scan firmware QR" width="320" />

:::info Firmware pochází z QR kódu
Obrazovka aktualizace bere image z **QR kódu nesoucího odkaz na firmware** —
žádný katalog k prohlížení, žádná adresa k opsání, žádný výběr souboru. Ten QR
kód dostanete se svým vlastním buildem, nebo ho najdete u
[**předpřipravených binárek**](/chester/catalog-applications/catalog-applications#application-firmware)
katalogových aplikací.
:::

---

## Průběh aktualizace {#run-the-update}

1. Zvolte **Scan firmware QR** a namiřte kameru na kód.
2. Aplikace image stáhne — **Downloading firmware…**
3. Zkontrolujte souhrn: název souboru, jeho **velikost** a jeho digest
   **SHA-256**. Pokud to není, co jste čekali, použijte **Scan a different firmware**.
4. Zvolte **Start update**.

Aktualizace pak projde svými fázemi, s ukazatelem průběhu:

| Fáze | Co se děje |
|---|---|
| **Preparing…** | Připravuje se zařízení |
| **Uploading… _n_%** | Přenáší se image |
| **Testing the new image…** | Zařízení kontroluje přijatý image |
| **Rebooting the device…** | Zařízení se restartuje do nového firmwaru |
| **Confirming the new image…** | Nový firmware se označí jako dobrý |
| **Done** | |

Po dokončení aplikace potvrdí, že se zařízení restartuje s novým firmwarem, což
může chvíli trvat.

:::caution Nechte aplikaci otevřenou a zařízení napájené
Během aktualizace nemůžete z obrazovky odejít. Držte telefon blízko zařízení a
obojí napájené, dokud aktualizace neskončí.
:::

---

## Když aktualizace selže {#if-it-fails}

Selhaná aktualizace je bezpečná. Image se potvrdí až po tom, co zařízení
restartuje a otestuje ho, takže zařízení, které selže v polovině, **nabootuje do
předchozího firmwaru**.

Aplikace řekne, která fáze selhala, protože z toho vyplývá další postup:

| Kdy selhala | Co to znamená |
|---|---|
| Před validací nebo během ní | Aktualizace vůbec nezačala. Zkuste to znovu. |
| Během nahrávání | Přenos se zastavil před dokončením. Zařízení si drží současný firmware — opakování je bezpečné. |
| Po nahrání | Zařízení se při dalším restartu vrátí k předchozímu firmwaru. Připojte se znovu a před dalším pokusem zkontrolujte jeho verzi. |

Pokud aktualizace přestane odpovídat — 90 sekund bez postupu — aplikace ji přeruší
a řekne vám to. Obvykle zařízení přišlo o napájení nebo vypadlo z dosahu.

Další zprávy, které můžete vidět:

- **The device refused the firmware image** — image není pro tento hardware
  platný. Zkontrolujte, že QR kód míří na firmware pro tuto variantu zařízení
  CHESTER.
- **The device has no room for the image** — restartujte ho a zkuste to znovu.
- **The downloaded firmware file is empty** — QR kód nemíří na platný image.

Problémy s připojením řeší [**Řešení problémů**](./troubleshooting.md).
