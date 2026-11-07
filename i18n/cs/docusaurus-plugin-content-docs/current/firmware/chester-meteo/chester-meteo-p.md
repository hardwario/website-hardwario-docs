---
title: CHESTER Meteo P
description: "Firmware CHESTER Meteo P: čím se liší od hlavního firmwaru CHESTER Meteo při měření pyranometrem na analogových vstupech slotu B."
---

# CHESTER Meteo P {#chester-meteo-p}

**CHESTER Meteo P** je firmware CHESTER Meteo sestavený pro **pyranometr**, senzor intenzity slunečního záření (volba sestavení `CONFIG_APP_PYRANOMETER=y`). Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Meteo**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-meteo}

### Hardware {#hardware}

- Přidává pyranometr s napěťovým výstupem, který firmware čte na analogových vstupech B0 a B1 rozšiřujícího slotu B. Pro každé čtení zapne výstup B3 téhož slotu.

### Chování {#behavior}

- Při každém vzorku firmware zapne výstup B3, počká 100 ms, změří napětí na analogových vstupech B0 a B1 a výstup B3 zase vypne.
- Napětí se agregují stejně jako hodnoty ostatních senzorů: za každý interval agregace minimum, maximum, průměr a medián.

### Konfigurační parametry {#configuration-parameters}

Všechny parametry jsou stejné.

### Data {#data}

Hlášení navíc obsahuje strukturu `pyranometer` s hodnotami `irradiance_1` (vstup B0) a `irradiance_2` (vstup B1). Každá má `measurements` s časovou značkou a napětím `min`, `max`, `avg` a `mdn` v mV, od 0 do 3600 mV (plný rozsah převodníku ADC); firmware napětí na intenzitu záření nepřepočítává. V režimu LoRaWAN se hodnoty pyranometru neodesílají. Každé pole s jednotkou, rozsahem a rozlišením popisuje katalogová stránka v části [**CHESTER Meteo P**](../../catalog-applications/chester-meteo/index.md#data-chester-meteo-p).

:::caution

Firmware v4.0.1 bere referenční časovou značku měření `pyranometer` z poslední agregace hlášení místo z první. Všechny dekódované časové značky se proto opožďují o `interval-aggreg` vynásobený počtem položek zmenšeným o jednu: s výchozími intervaly má hlášení zhruba šest položek a časové značky jsou zhruba o 25 minut pozdější.

:::

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-meteo-p:v4.0.1](https://firmware.hardwario.com/chester/8ae50ff5d08b436f8caf0926a994bc70), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `8ae50ff5d08b436f8caf0926a994bc70`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/8ae50ff5d08b436f8caf0926a994bc70/hex), SHA256 `7ce9b1afb2f99ec07b0aa78d12e14b458a0b729e3b4d87879a33181afb81b948`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/8ae50ff5d08b436f8caf0926a994bc70/bin), SHA256 `68d850e4873db8c1725d3fc97f6571dff42c1665b7b91bbccc2f4d14595a06d4`
- **Sestavení ze SDK:** `west chester-update meteo --variant "CHESTER Meteo P"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
