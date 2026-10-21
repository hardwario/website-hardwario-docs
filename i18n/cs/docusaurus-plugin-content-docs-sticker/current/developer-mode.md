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

:::info Firmware v2.0.0
Stránky níže popisují **firmware STICKER v2.0.0**. Pokud přecházíte z v1.4.x, všimněte si změn v shellu:
- **Přejmenované parametry:** z `lrw-deveui` / `lrw-appkey` jsou `radio-deveui` / `radio-appkey`, z `lrw-link-check-*` je `radio-link-check-*` a místo `cap-input-a/-b` a `cap-pir-detector` jsou `cap-gpio-mode` a `cap-gpio-input-a/-b`. Staré názvy nefungují ani jako aliasy, takže upravte své skripty.
- **Pravidla alarmů** určují hodnotu senzoru slotem a kanálem (`alarm set 0 mb temperature lo 2 hi 8`), viz [**Pravidla alarmů**](developer-access/alarm-rules.md).
- **Historie senzorů** vybírá kanály parametrem `history-channels`, který nahrazuje `history-sensors`.
- **Diagnostika rádia** se přesunula z `ats lrw` do `ats radio`, které pokrývá LoRaWAN i P2P.
:::

## Přehled příkazů shellu {#shell-command-reference}

V otevřené konzoli se konfigurace i diagnostika zadávají příkazy shellu. Každý příkaz má vlastní stránku:

- [**Konfigurace**](developer-access/configuration.md): příkaz `config`: intervaly, rádio (LoRaWAN a P2P), senzory, piny GP, alarmy a bzučák, čítače impulzů, identita zařízení a NFC.
- [**Pravidla alarmů**](developer-access/alarm-rules.md): příkaz `alarm`, seznam kanálů `sensor types` a limity alarmových uplinků.
- [**Historie senzorů**](developer-access/sensor-history.md): příkaz `history` a záznam store-and-forward.
- [**Hodiny reálného času**](developer-access/clock.md): příkaz `clock`.
- [**Údržba**](developer-access/maintenance.md): příkaz `settings`: save, reset, erase.
- [**Diagnostika**](developer-access/diagnostics.md): příkaz `ats`: informace o zařízení, testy senzorů a LED, stav rádia (LoRaWAN nebo P2P), claim okno.

Se senzory pomáhají ještě dva příkazy:

- `sensor types [<type>]` vypíše typy senzorů (`motherboard`, `dallas`, `machine-probe`) a jejich kanály s názvy a čísly, které berou příkazy `alarm` a `history`.
- `w1 list|scan|enroll|clear` spravuje sloty 1-Wire: `w1 scan` vypíše všechna zařízení na sběrnici, `w1 enroll` přiřadí nepřiřazená zařízení do volných slotů (`w1 enroll <slot> [<rom>]` přiřadí jedno), `w1 list` vypíše tabulku slotů a `w1 clear <slot>` slot uvolní. Příkaz je jen v sestaveních s podporou 1-Wire (výchozí sestavení debug 1-Wire vynechává, viz [**Nastavení firmwaru**](developer-access/firmware-setup.md#build-variants)).
