---
slug: application-over-j-link
title: Aplikace přes J-Link
title_meta: "Aplikace přes J-Link (GLIDER)"
---
import Image from '@theme/IdealImage';

# Aplikace přes J-Link {#application-over-j-link}

Firmware zařízení GLIDER můžete aktualizovat ladicí sondou **SEGGER J-Link**. Tento rychlý způsob se používá při vývoji firmwaru.

## Co budete potřebovat {#what-you-need}

- Funkční pracovní prostor firmwaru GLIDER (nainstalovaný Zephyr / nRF Connect SDK včetně `west` a toolchainu).
- Sondu SEGGER J-Link připojenou přes SWD k ladicímu konektoru zařízení GLIDER (`SWDIO`, `SWCLK`, `GND`, `VTref`).
- Zapnuté zařízení GLIDER.
- Nainstalovaný softwarový balík SEGGER J-Link (`which JLinkExe` vrátí cestu).

## Postup {#steps}

1. Otevřete terminál v pracovním prostoru firmwaru GLIDER a aktivujte virtualenv:

    ```bash
    cd ~/Hardwario/firmware
    source .venv/bin/activate
    ```

2. Sestavte firmware (pokud už sestavený máte, tento krok přeskočte):

    ```bash
    west build -b gauger_lte/nrf9151/ns application
    ```

3. Nahrajte jej do zařízení:

    ```bash
    west flash
    ```

Příkaz `west flash` automaticky vymaže oblast aplikace, zapíše nový obraz a resetuje zařízení. Nový firmware běží ihned po dokončení příkazu.

:::caution
Nahrání přes J-Link předchozí obraz okamžitě přepíše a automatický návrat k předchozí verzi (rollback) není možný. Pokud chcete mít pojistku v podobě rollbacku zavaděče MCUboot, použijte postup [**Aplikace přes USB-C**](application-over-at.md).
:::

:::info
Pokud máte zapojeno několik sond, vyberte tu správnou příkazem `west flash --dev-id <jlink-serial-number>`.
:::
