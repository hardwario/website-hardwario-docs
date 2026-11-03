---
title: CHESTER Serial
description: "CHESTER Serial je katalogová aplikace, která připojí elektroměry a senzory s RS-485 nebo RS-232 do cloudu: co umí, jaký má hardware, varianty a firmware."
---

# CHESTER Serial {#chester-serial}

**CHESTER Serial** je univerzální aplikace pro průmyslovou sériovou komunikaci. Slouží jako flexibilní brána, která průmyslová zařízení (senzory, elektroměry) připojí do cloudu přes LTE-M/NB-IoT nebo LoRaWAN.

:::info Firmware

Konfigurační parametry, podporovaná zařízení, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER Serial](../../firmware/chester-serial/index.md)**.

:::

## Co umí {#what-it-can-do}

- Přes modul [**CHESTER-X2**](../../extension-modules/chester-x2.md) čte až 8 podřízených zařízení Modbus RTU na sběrnici RS-485 typu multi-drop.
- Přes modul [**CHESTER-X12**](../../extension-modules/chester-x12.md) připojí jedno zařízení spojením bod-bod přes RS-232.
- Má ovladače pro elektroměry (Carlo Gavazzi, ORNO, Schneider), hybridní střídač SolaX, ultrazvukový průtokoměr FlowT, radonovou sondu Piketronic, senzor CO₂ MicroSENS a čtečku karet RFID Promag.
- Data odesílá přes LTE (kódování CBOR) nebo LoRaWAN (úsporné binární kódování).
- Sbírá hodnoty z bluetoothových senzorových tagů.

## Hardware {#hardware}

Obě varianty mají stejnou základní desku i krabičku a liší se modulem rozhraní:

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-E2-LP`: Krabička s pigtailem SMA
* `CHESTER-X2` (modul rozhraní RS-485) nebo `CHESTER-X12` (modul rozhraní RS-232), viz [Varianty](#variants)

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

:::caution

Zařízení **CHESTER Serial** potřebuje pro nepřetržitý provoz externí napájení (5–28 V DC). Senzory i sériové rozhraní jsou napájené trvale.

:::

## Technické specifikace {#technical-specifications}

| Vlastnost | Hodnota |
| :--- | :--- |
| **Operační systém** | Zephyr RTOS |
| **Fyzické rozhraní** | RS-232 (modul X12), RS-485 (modul X2) |
| **Aplikační protokoly** | Transparentní (RAW), Modbus RTU |
| **Cloudové formáty** | CBOR (LTE), optimalizovaný binární (LoRaWAN) |
| **Napájení** | Vyžadován externí zdroj (5–28 V DC) |

## Varianty {#variants}

| Varianta | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Serial RS-485**](chester-serial-rs485.md) | Rozhraní RS-485 CHESTER-X2, až 8 zařízení Modbus RTU | [CHESTER Serial RS-485](../../firmware/chester-serial/chester-serial-rs485.md) |
| [**CHESTER Serial RS-232**](chester-serial-rs232.md) | Rozhraní RS-232 CHESTER-X12, 1 zařízení | [CHESTER Serial RS-232](../../firmware/chester-serial/chester-serial-rs232.md) |

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
