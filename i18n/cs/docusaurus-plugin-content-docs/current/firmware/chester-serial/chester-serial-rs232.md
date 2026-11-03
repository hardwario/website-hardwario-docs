---
title: CHESTER Serial RS-232
description: "Firmware CHESTER Serial RS-232: čím se liší od společného firmwaru CHESTER Serial při připojení jediného zařízení RS-232 přes modul CHESTER-X12."
---

# CHESTER Serial RS-232 {#chester-serial-rs-232}

**CHESTER Serial RS-232** je firmware CHESTER Serial sestavený pro rozhraní RS-232 **CHESTER-X12**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Serial**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-serial}

### Hardware {#hardware}

- Používá modul **CHESTER-X12** ve slotu A: neizolované rozhraní RS-232 pro spojení bod-bod (viz [**CHESTER-X12**](../../extension-modules/chester-x12.md)).
- Pracuje s jedním zařízením s vlastním protokolem: se senzorem CO₂ **MicroSENS 180-HS** nebo se čtečkou RFID [**Promag MF7S**](../../supported-devices/serial-devices/promag-mf7s.md).

### Chování {#behavior}

- Toto sestavení nemá Modbus RTU: použijte transparentní režim (výchozí). Zařízení Modbus z tabulky [Podporovaná zařízení](index.md#supported-devices) s ním použít nelze.

### Konfigurační parametry {#configuration-parameters}

Parametry jsou stejné jako u firmwaru CHESTER Serial, povolené je ale jen jedno zařízení, v `device-0`. Parametr `serial-mode` ponechte na `transparent` a nastavte parametry linky podle zařízení; čtečka Promag MF7S komunikuje rychlostí 19200 Bd s 8 datovými bity, bez parity a s 1 stop bitem.

### Příkazy {#commands}

Příkazy `modbus` nefungují, protože toto sestavení nemá Modbus RTU.

### Data {#data}

Seznam `devices` v hlášení má nejvýše jednu položku.

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-serial-rs232:v4.0.1](https://firmware.hardwario.com/chester/8be3907b12b5445b847fa03cb2970d6d), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `8be3907b12b5445b847fa03cb2970d6d`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/8be3907b12b5445b847fa03cb2970d6d/hex), SHA256 `c5e5de31c9f7bfb9d8045f64a8567dae8de058a0c7275e2a9f92ef200e78c7cf`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/8be3907b12b5445b847fa03cb2970d6d/bin), SHA256 `54ce738f50a1171bb70b12cd7a83b0deade3a644aec35dbc2a81a9f9dca4e4b5`
- **Sestavení ze SDK:** `west chester-update serial --variant "CHESTER Serial RS-232"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
