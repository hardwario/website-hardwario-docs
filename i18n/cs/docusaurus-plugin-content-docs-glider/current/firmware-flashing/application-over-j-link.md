---
slug: application-over-j-link
title: Aplikace přes J-Link
description: "Firmware zařízení GLIDER lze aktualizovat pomocí ladicí sondy SEGGER J-Link. Tohle je nejrychlejší cesta používaná při vývoji firmwaru."
title_meta: "Aplikace přes J-Link (GLIDER)"
---
import Image from '@theme/IdealImage';

# Aplikace přes J-Link {#application-over-j-link}

Firmware zařízení GLIDER lze aktualizovat pomocí ladicí sondy **SEGGER J-Link**. Tohle je nejrychlejší cesta používaná při vývoji firmwaru.

## Co budete potřebovat {#what-you-need}

- Funkční pracovní prostředí firmwaru GLIDER (nainstalovaný Zephyr / nRF Connect SDK, s `west` a toolchainem).
- Sondu SEGGER J-Link připojenou přes SWD k ladicímu konektoru zařízení GLIDER (`SWDIO`, `SWCLK`, `GND`, `VTref`).
- Zapnuté zařízení GLIDER.
- Nainstalovaný softwarový balík SEGGER J-Link (`which JLinkExe` vrátí cestu).

## Postup {#steps}

1. Otevřete terminál v pracovním prostředí firmwaru GLIDER a aktivujte virtualenv:

    ```bash
    cd ~/Hardwario/firmware
    source .venv/bin/activate
    ```

2. Sestavte firmware (přeskočte, pokud už sestavení máte):

    ```bash
    west build -b gauger_lte/nrf9151/ns application
    ```

3. Nahrajte jej do zařízení:

    ```bash
    west flash
    ```

Příkaz `west flash` automaticky vymaže oblast aplikace, zapíše nový obraz a resetuje zařízení. Nový firmware běží ihned po dokončení příkazu.

:::caution
Nahrávání přes J-Link je destruktivní: předchozí obraz je okamžitě přepsán a neexistuje žádný automatický rollback. Pokud chcete využít záchrannou síť v podobě mechanismu rollbacku v MCUboot, použijte [**Aplikace přes USB-C**](application-over-at.md).
:::

:::info
Pokud máte zapojeno několik sond, vyberte jednu pomocí `west flash --dev-id <jlink-serial-number>`.
:::
