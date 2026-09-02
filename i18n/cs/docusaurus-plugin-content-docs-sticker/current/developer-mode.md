---
slug: developer-mode
title: Přístup pro vývojáře
description: "STICKER je otevřená platforma postavená na Zephyr RTOS. Debug build firmwaru přidává interaktivní shell konzoli přes RTT, kterou vývojáři používají ke konfiguraci zařízení a k diagnostice přímo přes debugovací připojení."
---
import Image from '@theme/IdealImage';

# Přístup pro vývojáře (režim Debug) {#developer-access-debug-mode}

STICKER je **otevřená platforma** postavená na Zephyr RTOS. **Debug build** firmwaru přidává interaktivní shell konzoli přes RTT, kterou vývojáři používají ke konfiguraci zařízení a k diagnostice přímo přes debugovací připojení.

## Režim Debug {#debug-mode}

Zařízení STICKER lze dodat v **režimu Debug**, který je určený především vývojářům. V této konfiguraci se zařízení dodává v otevřeném stavu s přímým přístupem pro vývoj, takže můžete jeho funkce zkoumat, upravovat a rozšiřovat.

:::info
Koncoví uživatelé konfigurují zařízení STICKER běžně přes **NFC** pomocí telefonu, bez kabelu a bez konzole. Viz [**HARDWARIO Manager**](/apps/hardwario-manager/sticker). Stránky níže se týkají vývoje firmwaru a konfigurace přes shell.
:::

---

## První kroky {#getting-started}

Pro nastavení firmwaru lokálně, nahrání debug image a otevření konzole postupujte podle [**Nastavení firmwaru**](developer-access/firmware-setup.md).

---

:::info Firmware v1.4.0
Několik shell příkazů níže — `clock`, `history`, dynamická pravidla `alarm`, `settings erase` a přejmenovaná diagnostika `ats` — je nových v připravovaném **firmwaru STICKER v1.4.0**.
:::

## Přehled shell příkazů {#shell-command-reference}

Jakmile je konzole otevřená, konfigurace a diagnostika se zadávají jako shell příkazy. Každý příkaz má vlastní stránku:

- [**Konfigurace**](developer-access/configuration.md) - příkaz `config`: intervaly, LoRaWAN, senzory, schopnosti, pulzní čítače, identita zařízení.
- [**Pravidla alarmů**](developer-access/alarm-rules.md) - příkaz `alarm` a limity alarmových uplinků.
- [**Historie senzorů**](developer-access/sensor-history.md) - příkaz `history` a záznam store-and-forward.
- [**Hodiny reálného času**](developer-access/clock.md) - příkaz `clock`.
- [**Údržba**](developer-access/maintenance.md) - příkaz `settings`: save, reset, erase.
- [**Diagnostika**](developer-access/diagnostics.md) - příkaz `ats`: informace o zařízení, testy senzorů a LED, stav LoRaWAN.
