---
slug: /hardwario-manager
title: HARDWARIO Manager
description: "HARDWARIO v provozu. Je to jedna aplikace pro celý ekosystém: přiložením telefonu"
---

# HARDWARIO Manager {#hardwario-manager}

**HARDWARIO Manager** je mobilní aplikace pro nastavování a správu zařízení
HARDWARIO v provozu. Je to jedna aplikace pro celý ekosystém: přiložením telefonu
k zařízení **STICKER** ho nastavíte přes NFC, nebo se přes Bluetooth připojíte
k zařízení **CHESTER**, přečtete jeho stav, upravíte konfiguraci, spustíte shell
příkazy a aktualizujete firmware.

Aplikace běží na **Androidu a iOS**, v **angličtině a češtině**.

---

## Co s ní zvládnete {#what-you-can-do}

| Zařízení | Jak s ním telefon komunikuje | Co aplikace umí |
|---|---|---|
| **STICKER** | NFC. Přiložením telefonu k zařízení | Přečíst informace o zařízení a klíče LoRaWAN, přečíst a zapsat celou konfiguraci, postavit a aplikovat konfigurační šablony, spravovat senzory a alarmy, přečíst uložená měření, resetovat zařízení a vést si seznam zařízení, která spravujete |
| **CHESTER** | Bluetooth Low Energy | Přečíst informace o zařízení, upravit konfiguraci, otevřít shell terminál, nasdílet ten terminál kolegovi, aktualizovat firmware a restartovat zařízení |

Zařízení STICKER lze nastavit i **bez vložených baterií**, protože pole NFC z telefonu
zařízení napájí dost dlouho na to, aby si nastavení uložilo. Viz
[**Konfigurace vypnutého zařízení**](./sticker/offline-configuration.md).

---

## Orientace v aplikaci {#getting-around}

Každá obrazovka má stejné záhlaví: nápis **HARDWARIO Manager** vlevo a ozubené
kolo **nastavení** vpravo. Klepnutím na nápis se odkudkoli vrátíte na domovskou
obrazovku. Je to domovské tlačítko aplikace.

Domovská obrazovka je mřížka dlaždic, jedna pro každou rodinu zařízení, ke které
máte přístup, plus dlaždice pro váš **účet ATELOS**. Zvolte rodinu zařízení a
uvidíte, co s ní aplikace umí.

---

## Kde začít {#where-to-start}

1. [**Instalace aplikace**](./install.md): dostat ji do telefonu, zapnout NFC a
   udělit oprávnění, o která si řekne.
2. [**Účet ATELOS**](./atelos.md): přihlaste se, aby aplikace mohla zařízení
   nárokovat a vyplnit za vás jejich klíče.
3. [**STICKER**](./sticker/index.md): nastavování zařízení STICKER přes NFC.
4. [**CHESTER**](./chester/index.md): připojení k zařízení CHESTER přes Bluetooth.
5. [**Nastavení aplikace**](./settings.md): vzhled, jazyk, zámek aplikace a jak
   dlouho se uchovává historie změn zařízení.
