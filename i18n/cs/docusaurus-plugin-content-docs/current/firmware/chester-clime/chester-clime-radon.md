---
title: CHESTER Clime Radon
description: "Firmware CHESTER Clime Radon: čím se liší od hlavního firmwaru CHESTER Clime při měření radonu sondou Piketronic RPP-R přes RS-485 Modbus."
---

# CHESTER Clime Radon {#chester-clime-radon}

**CHESTER Clime Radon** je firmware CHESTER Clime sestavený pro radonovou sondu [**Piketronic RPP-R**](../../supported-devices/modbus/piketronic-rpp-r.md) připojenou přes RS-485 Modbus. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Clime**](index.md). Stejnou sondu umí číst i firmware [**CHESTER Serial RS-485**](../chester-serial/chester-serial-rs485.md) s driverem `piketronic`, jehož zapojení popisuje stránka sondy.

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-clime}

### Hardware {#hardware}

- Přidává modul **CHESTER-X2** ve slotu A, rozhraní RS-485 pro radonovou sondu.
- Nepodporuje vlhkoměr **CHESTER-S2**.

### Konfigurační parametry {#configuration-parameters}

Parametry `hygro-t-alarm-*` nejsou k dispozici. Připojení sondy přes Modbus má vlastní nastavení v příkazu `radon config`:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `modbus-baud` | Modbus baud | `<1200-19200>` | `19200` | Přenosová rychlost |
| `modbus-addr` | Modbus addr | `<1-247>` | `1` | Adresa sondy na sběrnici Modbus |
| `modbus-parity` | Modbus parity | `none`, `odd`, `even` | `even` | Parita |
| `modbus-stop-bits` | Modbus stop bits | `1`, `2` | `1` | Počet stop bitů |

Příklad: `radon config modbus-addr 2` a potom `config save`.

### Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `radon read` | Okamžitě přečte sondu a vypíše hodnoty |

### Data {#data}

Pole struktury `radon_probe` s jednotkami, rozsahy a rozlišením popisuje stránka katalogové aplikace v části [**Radonová sonda**](../../catalog-applications/chester-clime/index.md#radon-probe).

Hlášení navíc obsahuje strukturu `radon_probe` a nemá strukturu `hygrometer`:

| Klíč | Hodnota | Jednotka |
| :--- | :--- | :--- |
| `concentration_hourly` | Koncentrace radonu, klouzavý průměr za poslední hodinu; každá položka v `measurements` má `timestamp` a `value` | Bq/m³ |
| `concentration_daily` | Koncentrace radonu, klouzavý průměr za poslední den; každá položka v `measurements` má `timestamp` a `value` | Bq/m³ |
| `chamber_temperature` | Teplota v měřicí komoře (`min`, `max`, `avg`, `mdn`) | °C |
| `chamber_humidity` | Vlhkost v měřicí komoře (`min`, `max`, `avg`, `mdn`) | % |

Koncentrace se ze sondy čtou na konci každého intervalu agregace. Přes LoRaWAN firmware hodnoty radonu neodesílá.

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-clime-radon:v4.0.1](https://firmware.hardwario.com/chester/14682da830f04ce6bf1f48e3f165c288), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `14682da830f04ce6bf1f48e3f165c288`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/14682da830f04ce6bf1f48e3f165c288/hex), SHA256 `f36a31b04c4e15e6e11d67c5254198e03636fba3d7758b683ae0d256414a26ed`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/14682da830f04ce6bf1f48e3f165c288/bin), SHA256 `9d4ebb8b9176229311a0f833f54420c2a7bee672399c1c150c7c4fae5d633ca9`
- **Sestavení ze SDK:** `west chester-update clime --variant "CHESTER Clime Radon"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
