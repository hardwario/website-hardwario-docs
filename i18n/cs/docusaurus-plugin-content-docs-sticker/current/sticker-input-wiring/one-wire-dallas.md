---
slug: one-wire-dallas
title: Teplotní sondy 1-Wire (Dallas)
---

# Teplotní sondy 1-Wire (Dallas) {#1-wire-temperature-probes-dallas}

Zařízení STICKER Input podporuje standardní **teplotní sondy 1-Wire (Dallas)** (například řadu DS18B20). Senzory se připojují jediným datovým vodičem a díky adresovatelnosti sběrnice 1-Wire lze na jednu datovou linku zapojit více sond současně. Toto rozhraní se dobře hodí pro distribuované měření teploty na větší vzdálenosti a v náročných podmínkách.

## Zapojení {#wiring}

Sondu připojte ke vstupu A nebo B a přepínač DIP S1 nastavte do polohy pro 1-Wire: přepínač **3** pro vstup A nebo **6** pro vstup B (viz [Zapojení vstupů STICKER Input](./index.md#dip-switch-s1-settings)).

## Konfigurace {#configuration}

Sběrnici 1-Wire zapněte příkazem `config cap-w1-sensors true` a režim vstupu na pinu, který sběrnice používá, nechte na `none` (`cap-gpio-input-a` / `cap-gpio-input-b`).

## Sloty a typy senzorů {#slots-and-sensor-types}

STICKER pracuje až se **čtyřmi** senzory 1-Wire ve slotech 1–4. Senzor nalezený na sběrnici se automaticky přiřadí do volného slotu a slot si zapamatuje jeho ROM i očekávaný typ senzoru: `sensor1-type`…`sensor4-type`, kde `2` je teploměr Dallas a `3` je sonda [MACHINE PROBE](./machine-probe.md). Typ lze nastavit i předem, ještě před připojením sondy.

- **Sonda připojená až po zapnutí:** dokud slot čeká na svou sondu, sběrnice se kontroluje 2, 5, 10 a 15 minut po startu, potom každých 15 minut. Nalezená sonda se do slotu přiřadí bez restartu.
- **Jiný typ senzoru:** pokud očekávaný senzor chybí a na sběrnici je senzor jiného typu, slot vyvolá alarm `sensor_mismatch`. Dokud se nevrátí správný typ, pravidla alarmů slotu jsou neaktivní a jeho hodnoty jsou `null`.
- **Chybějící senzor:** sonda, která přestane odpovídat, vyvolá alarm chybějících dat.

Sonda Dallas má jeden kanál, `temperature` (°C). V telemetrii přichází v seznamu `w1_sensors`, například `{"slot": 1, "type": 2, "type_name": "dallas", "values": {"temperature": 21.5}, "units": {"temperature": "degC"}}`, a lze ji použít v pravidlech alarmů i ukládat do historie.
