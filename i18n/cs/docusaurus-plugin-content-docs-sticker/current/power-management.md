---
slug: power-management
title: Správa napájení
description: "STICKER je navržený pro provoz s extrémně nízkou spotřebou, aby v terénu vydržel roky bez externího napájení."
title_meta: "Správa napájení (STICKER)"
---
import Image from '@theme/IdealImage';

# Správa napájení {#power-management}

Zařízení STICKER je navržené pro provoz s extrémně nízkou spotřebou, aby vydrželo v terénu několik let bez externího napájení. Napájejí ho **dvě běžné baterie AA** (alkalické nebo lithiové články 1,5 V).

:::tip Zprovoznění přes NFC a aktivace rádia
Parametry zařízení, klíče a aktivaci `radio-mode` nastavíte bezdrátově telefonem s NFC a aplikací [**HARDWARIO Manager**](/sticker/hardwario-manager/), a to i před vložením baterií.
:::

---

## Bateriové napájení a sledování napětí {#battery-architecture--power-monitoring}

- **Provozní napětí:** Napájení ze dvou baterií AA se širokým rozsahem vstupního napětí **1,8 V až 3,6 V**.
- **Extrémně nízký klidový proud:** Klidová spotřeba ve spánku **< 80 µA** díky režimům hlubokého spánku Zephyr RTOS na SoC STM32WL.
- **Dynamické měření napětí:** Napětí baterie se měří pod zátěží při vzorkování senzorů a při vysílání, takže telemetrie je přesná a zařízení může vyvolat **alarm slabé baterie** na **fPort 3**.

---

## Výchozí stav z výroby: režim Radio-Silent (v1.4.0+) {#factory-default-radio-silent-mode-v140}

Od firmwaru **v1.4.0** se zařízení STICKER dodává z výroby v **režimu Radio-Silent** (`radio-mode` vypnutý):

- **Nulové vysílání při přepravě:** Rádio LoRaWAN je po vybalení zcela neaktivní, aby se baterie během přepravy nebo skladování nevybíjela marnými pokusy o připojení mimo dosah brány.
- **Aktivace v terénu:** Vysílání (`radio-mode on`) se zapíná až na místě při uvedení do provozu, buď přiložením telefonu s aplikací [**HARDWARIO Manager**](/sticker/hardwario-manager/) přes NFC, nebo příkazem shellu (`config radio-mode on`).

---

## Sběr energie z NFC (konfigurace bez baterií) {#nfc-energy-harvesting-battery-less-configuration}

- **Pasivní konfigurace:** Díky vestavěnému tagu NFC lze zařízení plně zprovoznit **bez vložených baterií** i s vybitými bateriemi.
- **Sběr RF energie:** RF pole telefonu s aplikací [**HARDWARIO Manager**](/sticker/hardwario-manager/) dodá dost energie na zápis parametrů přímo do EEPROM tagu NFC na desce.
- **Kontrola při startu:** Po vložení baterií zařízení STICKER nastartuje, ověří čekající konfiguraci uloženou v EEPROM NFC, použije nové parametry a zahájí normální provoz.
