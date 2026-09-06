---
slug: hardwario-manager
title: HARDWARIO Manager
description: "Zařízení STICKER nemá žádná tlačítka, displej ani konfigurační kabel. Nastavuje se"
title_meta: "HARDWARIO Manager (STICKER)"
---

# HARDWARIO Manager {#hardwario-manager}

Zařízení STICKER nemá žádná tlačítka, displej ani konfigurační kabel. Nastavuje se
přes **NFC** aplikací **HARDWARIO Manager**, mobilní aplikací HARDWARIO. Přiložíte
telefon k zařízení a aplikace přečte nebo zapíše jeho nastavení.

:::tip Kompletní dokumentace aplikace
Tato stránka vysvětluje, jak HARDWARIO Manager zapadá do postupu nasazení zařízení
STICKER. Aplikaci samotnou najdete kompletně popsanou v sekci **APPS**:

- → [**Rychlý průvodce**](/apps/hardwario-manager/first-steps): instalace
  aplikace, zapnutí bezdrátového spojení a první přiložení. Začněte tady.
- → [**Dokumentace HARDWARIO Manager**](/apps/hardwario-manager): kompletní
  návody k aplikaci a přehled funkcí.
- → [**STICKER přes NFC**](/apps/hardwario-manager/sticker): nabídka STICKER
  a jak přiložení funguje.
:::

---

## Co budete potřebovat {#what-you-need}

- Telefon s **NFC** a nainstalovanou aplikací. Jak ji do telefonu dostat a jak
  zapnout NFC, popisuje [**Instalace aplikace**](/apps/hardwario-manager/install).
- **Secret key** zařízení. Zařízení STICKER komunikuje šifrovaným kanálem NFC, takže
  bez něj aplikace nic nepřečte ani nezapíše. Každé zařízení přidáte jednou (viz
  [**Uložené STICKERy**](/apps/hardwario-manager/sticker/saved-stickers)) a
  od té doby aplikace klíč doplňuje automaticky.

## Konfigurace bez baterií {#configuring-without-batteries}

Zařízení STICKER je připravené na NFC a lze ho konfigurovat **bez vložených baterií**.
Pole z telefonu zařízení napájí dost dlouho na to, aby si nastavení uložilo a
aplikovalo ho při dalším startu. Takhle se připravuje dávka zařízení před
instalací, viz
[**Konfigurace vypnutého zařízení**](/apps/hardwario-manager/sticker/offline-configuration).

Je to také důvod, proč nezprovozněné zařízení mlčí, dokud nedostane skutečné
klíče LoRaWAN: viz [**Funkce**](features.md).

---

## Co lze se zařízením STICKER dělat {#what-you-can-do-with-a-sticker}

| Úloha | Kde je to popsané |
|---|---|
| Přečíst sériové číslo, firmware a klíče LoRaWAN potřebné k registraci zařízení | [**Informace o zařízení a klíče LoRaWAN**](/apps/hardwario-manager/sticker/device-info) |
| Přečíst a upravit celou konfiguraci. Intervaly, senzory, historii, LoRaWAN | [**Konfigurace**](/apps/hardwario-manager/sticker/configuration) |
| Nastavit prahové, stavové a frekvenční alarmy | [**Pravidla alarmů**](/apps/hardwario-manager/sticker/alarms) |
| Nastavit mnoha zařízením stejnou konfiguraci | [**Šablony**](/apps/hardwario-manager/sticker/templates) |
| Zachytit konfiguraci celé flotily v jedné session | [**Načtení více zařízení**](/apps/hardwario-manager/sticker/batch-export) |
| Přiřadit externí sondy 1-Wire k jejich slotům | [**Senzory 1-Wire**](/apps/hardwario-manager/sticker/one-wire-sensors) |
| Otestovat zařízení od začátku do konce | [**Vzorek dat ze senzorů**](/apps/hardwario-manager/sticker/sample-data) |
| Přečíst měření uložená v zařízení | [**Historie senzorů**](/apps/hardwario-manager/sticker/sensor-history) |
| Restartovat, resetovat nebo znovu naklíčovat zařízení | [**Reset zařízení**](/apps/hardwario-manager/sticker/reset) |

Následnou registraci zařízení na síťovém serveru popisují
[**ChirpStack**](connectivity/lorawan-chirpstack.md) a
[**The Things Stack**](connectivity/lorawan-tts.md).

---

## Konfigurace přes shell {#configuring-over-the-shell-instead}

Aplikace je standardní cesta ke zprovoznění zařízení STICKER a jediná, která
nepotřebuje nic než telefon. Zařízení dodané v **režimu Debug** lze konfigurovat
i z konzole přes debugovací připojení, což je ale určené pro vývoj firmwaru,
ne pro nasazení, viz
[**Přístup pro vývojáře**](developer-mode.md) a kompletní
[**přehled konfiguračních parametrů**](developer-access/configuration.md).
