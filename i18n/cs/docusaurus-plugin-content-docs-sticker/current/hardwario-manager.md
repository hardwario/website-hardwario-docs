---
slug: hardwario-manager
title: HARDWARIO Manager
description: "STICKER nemá tlačítka, displej ani konfigurační kabel a nastavuje se přes NFC v mobilní aplikaci HARDWARIO Manager."
title_meta: "HARDWARIO Manager (STICKER)"
---

# HARDWARIO Manager {#hardwario-manager}

Zařízení STICKER nemá tlačítka, displej ani konfigurační kabel. Nastavuje se
přes **NFC** v mobilní aplikaci **HARDWARIO Manager**. Stačí přiložit
telefon k zařízení a aplikace přečte nebo zapíše jeho nastavení.

:::tip Úplná dokumentace aplikace
Tato stránka popisuje, jakou roli hraje aplikace HARDWARIO Manager při nasazování
zařízení STICKER. Úplnou dokumentaci aplikace najdete v sekci **Aplikace**:

- → [**Rychlý průvodce**](/apps/hardwario-manager/first-steps): instalace
  aplikace, zapnutí bezdrátového rozhraní a první přiložení telefonu. Začněte zde.
- → [**Dokumentace aplikace HARDWARIO Manager**](/apps/hardwario-manager): všechny
  návody k aplikaci a přehled jejích funkcí.
- → [**STICKER přes NFC**](/apps/hardwario-manager/sticker): nabídka STICKER
  a jak probíhá přiložení telefonu.
:::

---

## Co budete potřebovat {#what-you-need}

- Telefon s **NFC** a nainstalovanou aplikací. Jak aplikaci nainstalovat a
  zapnout NFC, popisuje stránka [**Instalace aplikace**](/apps/hardwario-manager/install).
- **Secret key** zařízení. STICKER komunikuje šifrovaným kanálem NFC, takže
  bez tohoto klíče aplikace nic nepřečte ani nezapíše. Každé zařízení přidáte jen jednou (viz
  [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers)) a
  od té doby aplikace klíč doplňuje sama.

## Konfigurace bez baterií {#configuring-without-batteries}

Zařízení STICKER lze přes NFC nastavit i **bez vložených baterií**. Pole
z telefonu zařízení napájí dost dlouho na to, aby si nastavení uložilo; použije
ho při příštím startu. Takto se před instalací připravuje celá série zařízení, viz
[**Konfigurace vypnutého zařízení**](/apps/hardwario-manager/sticker/offline-configuration).

Proto také nezprovozněné zařízení nevysílá, dokud nedostane skutečné klíče
LoRaWAN: viz [**Funkce**](features.md).

---

## Co lze se zařízením STICKER dělat {#what-you-can-do-with-a-sticker}

| Úkol | Kde je popsaný |
|---|---|
| Přečíst sériové číslo, verzi firmwaru a klíče LoRaWAN potřebné k registraci zařízení | [**Informace o zařízení a klíče LoRaWAN**](/apps/hardwario-manager/sticker/device-info) |
| Přečíst a upravit celou konfiguraci: intervaly, senzory, historii, LoRaWAN | [**Konfigurace**](/apps/hardwario-manager/sticker/configuration) |
| Nastavit prahové, stavové a četnostní alarmy | [**Pravidla alarmů**](/apps/hardwario-manager/sticker/alarms) |
| Nastavit více zařízením stejnou konfiguraci | [**Šablony**](/apps/hardwario-manager/sticker/templates) |
| Načíst konfiguraci všech zařízení najednou | [**Načtení více zařízení**](/apps/hardwario-manager/sticker/batch-export) |
| Přiřadit externí sondy 1-Wire ke slotům | [**Senzory 1-Wire**](/apps/hardwario-manager/sticker/one-wire-sensors) |
| Otestovat celou cestu dat od senzoru po síťový server | [**Vzorek dat ze senzorů**](/apps/hardwario-manager/sticker/sample-data) |
| Přečíst měření uložená v zařízení | [**Historie senzorů**](/apps/hardwario-manager/sticker/sensor-history) |
| Restartovat nebo resetovat zařízení, nastavit mu nové klíče | [**Reset zařízení**](/apps/hardwario-manager/sticker/reset) |

Jak zařízení potom zaregistrovat na síťovém serveru, popisují stránky
[**ChirpStack**](connectivity/lorawan-chirpstack.md) a
[**The Things Stack**](connectivity/lorawan-tts.md).

---

## Konfigurace přes shell {#configuring-over-the-shell-instead}

Standardně se zařízení STICKER nastavuje v aplikaci a je to jediný způsob, ke
kterému stačí telefon. Zařízení dodané v **režimu Debug** lze nastavit i
z konzole přes ladicí připojení. Tento způsob je ale určený pro vývoj firmwaru,
ne pro nasazení; viz [**Přístup pro vývojáře**](developer-mode.md) a úplný
[**přehled konfiguračních parametrů**](developer-access/configuration.md).
