---
title: CHESTER Serial RS-485
description: "Firmware CHESTER Serial RS-485: co přidává ke společnému firmwaru CHESTER Serial pro zařízení Modbus RTU na sběrnici RS-485 modulu CHESTER-X2."
---

# CHESTER Serial RS-485 {#chester-serial-rs-485}

**CHESTER Serial RS-485** je firmware CHESTER Serial sestavený pro rozhraní RS-485 **CHESTER-X2**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Serial**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-serial}

### Hardware {#hardware}

- Používá modul **CHESTER-X2** ve slotu A: neizolované rozhraní RS-485 (viz [**CHESTER-X2**](../../extension-modules/chester-x2.md)).
- Pracuje se zařízeními Modbus RTU z tabulky [Podporovaná zařízení](index.md#supported-devices): až 8 zařízení na jedné sběrnici multi-drop, každé s vlastní adresou.

### Chování {#behavior}

- Při každém vzorkování přečte nastavená zařízení jedno po druhém a mezi dvěma zařízeními počká 50 ms, aby se sběrnice ustálila.

### Konfigurační parametry {#configuration-parameters}

Parametry jsou stejné jako u firmwaru CHESTER Serial. Pro zařízení Modbus RTU nastavte `serial-mode` na `modbus` a každému zařízení zadejte jeho adresu Modbus, například `app config device-0 "em1xx,1"`.

### Příkazy {#commands}

Příkazy `modbus` fungují jen v této variantě, protože Modbus RTU má jen toto sestavení.

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-serial-rs485:v4.0.1](https://firmware.hardwario.com/chester/cc16bc72ff9d41a5addc516e77abdec5), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `cc16bc72ff9d41a5addc516e77abdec5`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/cc16bc72ff9d41a5addc516e77abdec5/hex), SHA256 `6e53308ef2a26e463c7536278438786e17ef7ee1a265736bb897536f6ef48768`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/cc16bc72ff9d41a5addc516e77abdec5/bin), SHA256 `2e69e20679c1788ec9a5810cf7aa6ab738d9cc9e9ad00171d2c067a94a27ad75`
- **Sestavení ze SDK:** `west chester-update serial --variant "CHESTER Serial RS-485"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
