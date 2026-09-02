---
slug: power-management
title: Správa napájení
description: "Zařízení STICKER je navržené pro provoz s extrémně nízkou spotřebou, aby vydrželo v terénu několik let bez externího napájení. Napájejí ho 2× běžné baterie AA (alkalické nebo lithiové články 1,5 V)."
---
import Image from '@theme/IdealImage';

# Správa napájení {#power-management}

Zařízení STICKER je navržené pro provoz s extrémně nízkou spotřebou, aby vydrželo v terénu několik let bez externího napájení. Napájejí ho **2× běžné baterie AA** (alkalické nebo lithiové články 1,5 V).

:::tip Zprovoznění přes NFC a aktivace radia
Parametry zařízení, klíče a aktivaci `radio-mode` lze spravovat bezdrátově telefonem s NFC a aplikací [**HARDWARIO Manager**](hardwario-manager) — a to i před vložením baterií.
:::

---

## Architektura napájení a monitorování {#battery-architecture--power-monitoring}

- **Provozní napětí:** Napájení z 2× baterie AA se širokým rozsahem vstupního napětí **1,8 V až 3,6 V**.
- **Extrémně nízký klidový proud:** Klidová spotřeba ve spánku **< 80 µA** díky režimům deep-sleep Zephyr RTOS na SoC STM32WL.
- **Dynamické měření napětí:** Napětí baterie se vzorkuje pod zatížením při aktivním vzorkování senzorů a při vysílacích cyklech, což zajišťuje přesnou telemetrii a vyvolává **alarmy nízké baterie** na **fPort 3**.

---

## Výchozí stav z výroby: režim Radio-Silent (v1.4.0+) {#factory-default-radio-silent-mode-v140}

Od firmwaru **v1.4.0** se zařízení STICKER dodává z výroby v **režimu Radio-Silent** (`radio-mode` vypnutý):

- **Nulové vysílání při přepravě:** Transceiver LoRaWAN je po vybalení úplně neaktivní, aby se baterie nevybíjela pokusy o připojení bez brány během přepravy nebo skladování.
- **Aktivace v terénu:** Vysílání (`radio-mode on`) se zapíná na místě při uvedení do provozu přiložením telefonu s aplikací [**HARDWARIO Manager**](hardwario-manager) přes NFC, nebo shell příkazem (`config radio-mode on`).

---

## Sběr energie z NFC (konfigurace bez baterií) {#nfc-energy-harvesting-battery-less-configuration}

- **Pasivní konfigurace:** Integrované rozhraní NFC tagu umožňuje plné zprovoznění zařízení **bez vložených baterií** nebo při vybitých bateriích.
- **Sběr RF energie:** RF pole telefonu s aplikací [**HARDWARIO Manager**](hardwario-manager) dodá dost energie na zápis parametrů přímo do EEPROM NFC tagu na desce.
- **Validace při startu:** Po vložení baterií zařízení STICKER nabootuje, zvaliduje čekající konfiguraci uloženou v EEPROM NFC, aplikuje parametry a spustí normální provoz.
