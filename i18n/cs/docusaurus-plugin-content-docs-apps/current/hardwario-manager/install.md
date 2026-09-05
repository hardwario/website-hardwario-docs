---
slug: install
title: Instalace aplikace
description: "platformu si řekněte svému kontaktu v HARDWARIO."
---

# Instalace aplikace HARDWARIO Manager {#install-hardwario-manager}

**HARDWARIO Manager** běží na **Androidu** a **iOS**. O aktuální build pro vaši
platformu si řekněte svému kontaktu v HARDWARIO.

---

## Co budete potřebovat {#what-you-need}

| Věc | Proč |
|---|---|
| **Telefon s NFC** | Nutný pro konfiguraci zařízení **STICKER**. Většina telefonů z posledních let ho má. |
| **Bluetooth** | Nutný pro připojení k zařízení **CHESTER**. |
| **Kameru** | Používá se ke skenování QR kódů. Párovacích etiket CHESTER, odkazů na firmware, claim kódů zařízení a nasdílených šablon. |
| **Účet ATELOS** | Potřebný k nárokování zařízení a k natažení jeho uloženého secret key do telefonu. Viz [**Účet ATELOS**](./atelos.md). |
| **Secret key zařízení** | Zařízení STICKER komunikuje šifrovaným kanálem NFC. Nárokování zařízení klíč vyplní za vás; zadat ho můžete i ručně. |

---

## 1. Zapněte NFC {#1-turn-on-nfc}

NFC musí být zapnuté, aby telefon mohl se zařízením STICKER komunikovat.

1. Otevřete v telefonu **Nastavení**.
2. Vyhledejte **NFC**.
3. Přepněte ho na **zapnuto**.

Pokud se žádné nastavení NFC neobjeví, telefon NFC nemá a zařízení STICKER
nenastaví. Pro zařízení CHESTER přes Bluetooth ho použít lze.

---

## 2. Nainstalujte aplikaci {#2-install-the-app}

Nainstalujte build pro svou platformu a otevřete ho. Vaše uložená zařízení,
šablony a nastavení se přes aktualizace zachovají.

---

## 3. Povolte oprávnění {#3-allow-the-permissions}

Aplikace si o oprávnění řekne, až ho poprvé potřebuje. Klepněte na **Povolit**
(nebo **Při používání aplikace**):

- **Kamera**: jen když skenujete QR kód.
- **Zařízení v okolí / Bluetooth**: jen když se připojujete k zařízení CHESTER.
- **Face ID / biometrika**: jen když si zapnete zámek aplikace v
  [**nastavení aplikace**](./settings.md).

Pro NFC se na oprávnění nikdo neptá. Zapnete ho jednou, v kroku 1.

:::info Oprávnění Bluetooth na Androidu
Na Androidu 12 a novějším potřebuje aplikace pro zařízení v okolí oprávnění
k **vyhledávání** i k **připojení**. Pokud je odmítnete, obrazovky CHESTER nabídnou
otevření nastavení telefonu, kde je udělíte.
:::

---

## 4. Otevřete aplikaci {#4-open-the-app}

Otevřete **HARDWARIO Manager** a z domovské mřížky vyberte rodinu zařízení:

- **STICKER**: konfigurace přes NFC. Pokračujte na [**STICKER**](./sticker/index.md).
- **CHESTER**: připojení přes Bluetooth. Pokračujte na [**CHESTER**](./chester/index.md).

Anténa NFC bývá v telefonu blízko **horní části zadní strany**. Pokud se přiložení
nezaregistruje, pohybujte telefonem pomalu kolem tohoto místa, dokud nedojde k
načtení.
