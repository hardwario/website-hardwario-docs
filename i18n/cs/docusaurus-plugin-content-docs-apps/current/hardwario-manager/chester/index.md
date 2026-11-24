---
slug: /hardwario-manager/chester
title: CHESTER
description: "Správa zařízení CHESTER přes Bluetooth Low Energy v aplikaci HARDWARIO Manager: stav, konfigurace, shell, přiřazení tagů BLE a aktualizace firmwaru."
title_meta: "CHESTER (HARDWARIO Manager)"
---

# CHESTER přes Bluetooth {#chester-over-bluetooth}

Zařízení CHESTER se spravuje přes **Bluetooth Low Energy**. Po připojení
telefonu můžete číst stav zařízení, upravovat konfiguraci, ovládat shell,
přiřazovat externí senzorové tagy BLE, aktualizovat firmware, zařízení
restartovat a vracet jeho konfiguraci do továrního nastavení.

Otevřete **HARDWARIO Manager** a zvolte **CHESTER**. Dokud není žádné zařízení
připojené, ukazuje aplikace obrazovku **Připojit k CHESTER**, viz
[**Připojení a párování**](./connect.md).

---

## Menu {#the-menu}

Jakmile je zařízení připojené, nese obrazovka v nadpisu jeho název, například
**CHESTER 2159019023**, a nabízí, co s ním můžete dělat.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-menu.png" alt="Menu CHESTER s nadpisem CHESTER a sériovým číslem, s položkami Informace o zařízení, Konfigurace, Terminál, Nástroje a BLE tagy a s tlačítkem Odpojit dole" width="320" />

| Položka | Co dělá |
|---|---|
| [**Informace o zařízení**](./device-info.md) | Sériové číslo, firmware, doba provozu a ovládání zařízení |
| [**Konfigurace**](./configuration.md) | Načíst a upravit konfiguraci zařízení |
| [**Terminál**](./terminal.md) | Odesílat příkazy shellu přes konzoli zařízení |
| [**Nástroje**](./tools.md) | Aktualizace firmwaru, restart, tovární nastavení |
| [**BLE tagy**](./ble-tags.md) | Přiřadit externí BLE senzorové tagy do slotů a číst jejich hodnoty |

Tlačítkem **Odpojit** dole na obrazovce spojení ukončíte. Aplikace se vrátí na
obrazovku **Připojit k CHESTER**, odkud se dostanete k dalšímu zařízení.

---

## Jak dlouho spojení trvá {#how-long-the-connection-lasts}

Aplikace udržuje vždy jen **jedno** připojení k zařízení CHESTER. Spojení vydrží,
i když se v aplikaci přesunete jinam: můžete se vrátit na domovskou obrazovku
nebo na stránky STICKER a po návratu najdete CHESTER stále připojený.

Spojení skončí, když:

- klepnete na **Odpojit**;
- zařízení zmizí, například při restartu nebo když se dostane mimo dosah;
- uplyne 30 minut, během kterých aplikace se zařízením nekomunikuje.

Po 30 minutách vysvětlí obrazovka **Připojit k CHESTER**, co se stalo,
upozorněním **Odpojeno po 30 minutách**. Odtud se připojíte znovu.

Když zařízení restartuje sama aplikace (po uložení konfigurace, restartu nebo
obnovení továrního nastavení), počká, až se zařízení vrátí, a připojí se k němu
sama. Viz [**Konfigurace**](./configuration.md#saving) a
[**Nástroje**](./tools.md).

---

## Než začnete {#before-you-start}

- Bluetooth musí být zapnutý a aplikace potřebuje oprávnění **Zařízení
  v okolí**, viz [**Instalace aplikace**](../install.md).
- Párování používá šestimístný **passkey** svázaný se zařízením. Aplikace ho načte
  za vás, když naskenujete QR kód na štítku zařízení CHESTER, takže telefon
  potřebuje pro první spárování připojení k internetu.
- Držte telefon blízko zařízení. Většina problémů s připojením je otázka dosahu
  nebo zastaralého párování, viz [**Řešení problémů**](./troubleshooting.md).

Začněte stránkou [**Připojení a párování**](./connect.md).
