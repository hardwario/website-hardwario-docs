---
slug: install
title: Instalace aplikace
---

# Instalace aplikace HARDWARIO Manager {#install-hardwario-manager}

**HARDWARIO Manager** běží na **Androidu** a **iOS**. O aktuální sestavení pro
svou platformu požádejte svou kontaktní osobu v HARDWARIO.

---

## Co budete potřebovat {#what-you-need}

| Co | K čemu |
|---|---|
| **Telefon s NFC** | Nutný ke konfiguraci zařízení **STICKER**. NFC má většina telefonů z posledních let. |
| **Bluetooth** | Nutný k připojení k zařízení **CHESTER**. |
| **Kamera** | Ke skenování QR kódů: párovacích štítků zařízení CHESTER, odkazů na firmware, kódů pro nárokování zařízení a sdílených šablon. |
| **Účet ATELOS** | Potřebný k nárokování zařízení a ke stažení jeho uloženého secret key do telefonu. Viz [**Účet ATELOS**](./atelos.md). |
| **Secret key zařízení** | Zařízení STICKER komunikuje šifrovaným kanálem NFC. Když zařízení nárokujete, klíč se vyplní za vás; zadat ho můžete i ručně. |

---

## 1. Zapněte NFC {#1-turn-on-nfc}

Aby telefon mohl komunikovat se zařízením STICKER, musí mít zapnuté NFC.

1. Otevřete v telefonu **Nastavení**.
2. Vyhledejte **NFC**.
3. Přepínač **zapněte**.

Pokud nastavení NFC nenajdete, telefon NFC nemá a zařízení STICKER s ním
nenastavíte. Pro připojení k zařízení CHESTER přes Bluetooth ho ale použít můžete.

---

## 2. Nainstalujte aplikaci {#2-install-the-app}

Nainstalujte sestavení pro svou platformu a aplikaci otevřete. Uložená zařízení,
šablony a nastavení zůstanou zachované i po aktualizacích.

---

## 3. Povolte oprávnění {#3-allow-the-permissions}

Aplikace žádá o každé oprávnění až ve chvíli, kdy ho poprvé potřebuje. Klepněte
na **Povolit** (nebo **Při používání aplikace**):

- **Kamera**: jen když skenujete QR kód.
- **Zařízení v okolí / Bluetooth**: jen když se připojujete k zařízení CHESTER.
- **Face ID / biometrika**: jen když si zapnete zámek aplikace v
  [**Nastavení aplikace**](./settings.md).

O oprávnění k NFC aplikace nežádá. NFC zapínáte jen jednou, v kroku 1.

:::info Oprávnění Bluetooth na Androidu
Na Androidu 12 a novějším potřebuje aplikace pro zařízení v okolí oprávnění
k **vyhledávání** i k **připojení**. Pokud je odmítnete, obrazovky zařízení
CHESTER vám nabídnou otevřít nastavení telefonu, kde je můžete udělit.
:::

---

## 4. Otevřete aplikaci {#4-open-the-app}

Otevřete **HARDWARIO Manager** a na domovské obrazovce vyberte rodinu zařízení:

- **STICKER**: konfigurace přes NFC. Pokračujte stránkou [**STICKER**](./sticker/index.md).
- **CHESTER**: připojení přes Bluetooth. Pokračujte stránkou [**CHESTER**](./chester/index.md).

Anténa NFC bývá v **horní části zadní strany** telefonu. Pokud telefon přiložení
nezaznamená, pohybujte jím pomalu kolem tohoto místa, dokud se zařízení nenačte.
