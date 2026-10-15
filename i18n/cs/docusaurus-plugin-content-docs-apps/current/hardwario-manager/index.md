---
slug: /hardwario-manager
title: HARDWARIO Manager
description: "HARDWARIO Manager je mobilní aplikace pro nastavení a správu zařízení HARDWARIO přímo v terénu."
---

# HARDWARIO Manager {#hardwario-manager}

**HARDWARIO Manager** je mobilní aplikace pro nastavování a správu zařízení
HARDWARIO v terénu. Jedna aplikace pokryje celý ekosystém: zařízení **STICKER**
nastavíte přes NFC přiložením telefonu, k zařízení **CHESTER** se připojíte přes
Bluetooth a přečtete jeho stav, upravíte konfiguraci, spustíte příkazy shellu
a aktualizujete firmware. Přes Bluetooth umí nastavit i bránu **FIBER**.

Aplikace je k dispozici pro **Android a iOS**, v **angličtině a češtině**. Kde ji
získáte, popisuje stránka [**Instalace aplikace**](./install.md).

---

## Co s ní zvládnete {#what-you-can-do}

| Zařízení | Jak s ním telefon komunikuje | Co aplikace umí |
|---|---|---|
| **STICKER** | NFC: přiložením telefonu k zařízení | Přečíst informace o zařízení a klíče LoRaWAN, přečíst a zapsat celou konfiguraci, vytvářet a používat konfigurační šablony, spravovat senzory a alarmy, přečíst uložená měření, resetovat zařízení a vést seznam zařízení, která spravujete |
| **CHESTER** | Bluetooth Low Energy | Přečíst informace o zařízení, upravit konfiguraci, otevřít terminál shellu, sdílet terminál s kolegou, aktualizovat firmware a restartovat zařízení |
| **FIBER** | Bluetooth Low Energy | Pojmenovat bránu, připojit ji k Wi-Fi nebo Ethernetu, zvolit její roli a připojit k ní zařízení STICKER a Beacony; která sestavení to obsahují, popisuje stránka [**FIBER**](./fiber/index.md) |

Zařízení STICKER lze nastavit i **bez vložených baterií**: pole NFC z telefonu
ho napájí dost dlouho na to, aby si nastavení uložilo. Viz
[**Konfigurace vypnutého zařízení**](./sticker/offline-configuration.md).

---

## Orientace v aplikaci {#getting-around}

Každá obrazovka má stejné záhlaví: logo **HARDWARIO** vlevo a tlačítko **menu**
vpravo. Klepnutím na logo se odkudkoli vrátíte na domovskou obrazovku, logo
tedy slouží jako tlačítko domů.

V menu najdete **Settings** (viz [**Nastavení aplikace**](./settings.md))
a odkazy na HARDWARIO **Cloud**, tuto **Documentation**, **Homepage**
a **Support**.

<img src="/img/hw-manager/hw-manager-menu.png" alt="Menu aplikace s položkou Settings a externími odkazy Cloud, Documentation, Homepage a Support" width="320" />

Na domovské obrazovce je mřížka dlaždic, jedna pro každou rodinu zařízení, kterou
sestavení obsahuje. Sestavení s účtem ATELOS přidávají dlaždici
**ATELOS account**. Po výběru rodiny zařízení uvidíte, co s ní aplikace umí.

---

## Kde začít {#where-to-start}

1. [**Instalace aplikace**](./install.md): nainstalujte ji do telefonu, zapněte NFC
   a udělte oprávnění, o která aplikace požádá.
2. [**STICKER**](./sticker/index.md): nastavte zařízení STICKER přes NFC.
3. [**CHESTER**](./chester/index.md): připojte se k zařízení CHESTER přes Bluetooth.
4. [**FIBER**](./fiber/index.md): nastavte bránu FIBER přes Bluetooth.
5. [**Účet ATELOS**](./atelos.md): jak aplikace zařízení nárokuje a vyplní za vás
   jejich klíče.
6. [**Nastavení aplikace**](./settings.md): vzhled, jazyk, zámek aplikace a doba,
   po kterou se uchovává historie změn zařízení.
7. [**Řešení problémů a FAQ**](./troubleshooting.md): co zkontrolovat, když něco
   nefunguje.
