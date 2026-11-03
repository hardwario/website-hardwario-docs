---
title: CHESTER Push FM
description: "Firmware CHESTER Push FM: co mění oproti hlavnímu firmwaru CHESTER Push, aby LED naposledy stisknutého tlačítka zůstala svítit."
---

# CHESTER Push FM {#chester-push-fm}

**CHESTER Push FM** (Flip Mode) je firmware CHESTER Push sestavený pro jiné chování LED v tlačítkách: LED naposledy stisknutého tlačítka zůstává svítit. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Push**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-push}

### Hardware {#hardware}

Hardware je stejný jako u hlavního firmwaru.

### Chování {#behavior}

- Firmware reaguje hned na stisk tlačítka, nečeká na jeho uvolnění, a nerozlišuje krátký a dlouhý stisk.
- Červená LED stisknutého tlačítka se rozsvítí a svítí, dokud nestisknete jiné tlačítko; LED předchozího tlačítka zhasne. Bzučák jednou pípne.

:::caution

Tato varianta není vhodná pro provoz s nízkou spotřebou, protože trvale svítící LED rychle vybíjí baterii.

:::

### Konfigurační parametry {#configuration-parameters}

Všechny parametry jsou stejné.

### Data {#data}

Každý stisk se počítá jako krátký. V hlášeních přes LTE roste `count_click` a všechny události jsou `clicked`; `count_hold` zůstává `0` a událost `held` se neobjeví. Ve zprávách LoRaWAN roste `press_count`, `hold_count` zůstává `0` a `hold_event` je vždy `false`.

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-push-fm:v4.0.1](https://firmware.hardwario.com/chester/001543e218a04ffdbf65082532202736), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `001543e218a04ffdbf65082532202736`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/001543e218a04ffdbf65082532202736/hex), SHA256 `0c7a2286d945c1e12bf9b4f0620beff519a8ade36f98c1da33527d18fa568f5a`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/001543e218a04ffdbf65082532202736/bin), SHA256 `7bdd6299de06d490cc2a17f49a506061e2e802f4be8d4235631e1087df6af2cf`
- **Sestavení ze SDK:** `west chester-update push --variant "CHESTER Push FM"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
