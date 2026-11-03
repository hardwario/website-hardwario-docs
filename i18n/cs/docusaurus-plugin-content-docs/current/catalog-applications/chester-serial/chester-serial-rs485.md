---
title: CHESTER Serial RS-485
description: "CHESTER Serial RS-485 čte až osm zařízení Modbus RTU na jedné sběrnici RS-485 přes modul CHESTER-X2 a napájí se externě přes modul CHESTER-X10."
---

# CHESTER Serial RS-485 {#chester-serial-rs-485}

**CHESTER Serial RS-485** je varianta aplikace [**CHESTER Serial**](index.md) s rozšiřujícím modulem **CHESTER-X2**. Je určená pro běžnou průmyslovou sběrnici, na které je více zařízení zapojeno za sebou (daisy-chain).

:::info Firmware

Tato varianta používá **[firmware CHESTER Serial RS-485](../../firmware/chester-serial/chester-serial-rs485.md)**.

:::

## Rozdíly oproti aplikaci CHESTER Serial {#differences-from-chester-serial}

* **Rozhraní:** neizolovaná RS-485
* **Topologie:** sběrnice multi-drop
* **Kapacita:** až 8 podřízených zařízení Modbus RTU

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-X2`: Modul rozhraní RS-485
* `CHESTER-X10`: Externí napájecí vstup (5–28 V DC)
* `CHESTER-E2-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).
