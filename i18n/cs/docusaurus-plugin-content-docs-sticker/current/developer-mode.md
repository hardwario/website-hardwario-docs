---
slug: developer-mode
title: Přístup pro vývojáře
description: "Vývojářský přístup k zařízení STICKER: ladicí sestavení firmwaru přidává interaktivní shell přes RTT pro vývoj a diagnostiku na platformě Zephyr RTOS."
---
import Image from '@theme/IdealImage';

# Přístup pro vývojáře (režim Debug) {#developer-access-debug-mode}

STICKER je **otevřená platforma** postavená na Zephyr RTOS. **Sestavení debug** firmwaru přidává interaktivní konzoli shellu přes RTT, ve které vývojáři zařízení konfigurují a spouštějí diagnostiku přímo přes ladicí připojení.

## Režim Debug {#debug-mode}

Zařízení STICKER lze dodat v **režimu Debug**, který je určený především vývojářům. Zařízení se pak dodává v otevřeném stavu s přímým přístupem pro vývoj, takže jeho funkce můžete zkoumat, upravovat a rozšiřovat.

:::info
Koncoví uživatelé zařízení STICKER běžně nastavují přes **NFC** telefonem, bez kabelu a bez konzole. Viz [**HARDWARIO Manager**](/apps/hardwario-manager/sticker). Stránky níže se týkají vývoje firmwaru a konfigurace přes shell.
:::

---

## První kroky {#getting-started}

Jak firmware připravit na svém počítači, nahrát image debug a otevřít konzoli, popisuje stránka [**Nastavení firmwaru**](developer-access/firmware-setup.md).

---

:::info Firmware v1.4.0
Některé z níže uvedených příkazů shellu (`clock`, `history`, dynamická pravidla `alarm`, `settings erase` a přejmenovaná diagnostika `ats`) přinesl až **firmware STICKER v1.4.0**.
:::

## Přehled příkazů shellu {#shell-command-reference}

V otevřené konzoli se konfigurace i diagnostika zadávají příkazy shellu. Každý příkaz má vlastní stránku:

- [**Konfigurace**](developer-access/configuration.md): příkaz `config`: intervaly, LoRaWAN, senzory, schopnosti, čítače impulzů, identita zařízení.
- [**Pravidla alarmů**](developer-access/alarm-rules.md): příkaz `alarm` a limity alarmových uplinků.
- [**Historie senzorů**](developer-access/sensor-history.md): příkaz `history` a záznam store-and-forward.
- [**Hodiny reálného času**](developer-access/clock.md): příkaz `clock`.
- [**Údržba**](developer-access/maintenance.md): příkaz `settings`: save, reset, erase.
- [**Diagnostika**](developer-access/diagnostics.md): příkaz `ats`: informace o zařízení, testy senzorů a LED, stav LoRaWAN.
