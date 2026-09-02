---
slug: application-over-at
title: Aplikace přes USB-C
description: "Firmware zařízení GLIDER můžete aktualizovat přes kabel USB-C, bez debug sondy."
---
import Image from '@theme/IdealImage';

# Aplikace přes USB-C {#application-over-usb-c}

Firmware zařízení GLIDER můžete aktualizovat přes **kabel USB-C**, bez debug sondy.

## Co budete potřebovat {#what-you-need}

- Funkční [**AT konzoli přes USB-C**](../console/usb-at.md).
- Soubor s obrazem firmwaru: **`zephyr.signed.bin`**. Buď si ho sestavte sami pomocí `west build`, nebo si o nejnovější vydání řekněte HARDWARIO.

## Postup {#steps}

1. Otevřete terminál v pracovním prostoru firmwaru pro GLIDER a aktivujte virtualenv:

    ```bash
    cd ~/Hardwario/firmware
    source .venv/bin/activate
    ```

2. Připojte zařízení GLIDER k počítači kabelem USB-C.

3. Spusťte příkaz pro nahrání firmwaru:

    ```bash
    west bin-to-at --input-file path/to/zephyr.signed.bin --output-file update.at
    west serial-console --input update.at
    ```

    Konzole přenese nový obraz do zařízení. Po dokončení se GLIDER restartuje do nového firmwaru.

4. Potvrďte nový obraz, aby nedošlo k návratu k předchozí verzi:

    ```text
    AT$FW="confirm"
    ```

5. Zkontrolujte verzi:

    ```text
    AT+CGMR
    ```

To je celý postup.

:::caution
Po restartu je nutné odeslat `AT$FW="confirm"`. Pokud tento krok vynecháte, zařízení se při dalším restartu vrátí k předchozímu firmwaru.
:::

:::info
Pokud už máte výstup buildu pro GLIDER ve složce `build/`, můžete `--input-file` vynechat - `west bin-to-at` najde `zephyr.signed.bin` automaticky.
:::
