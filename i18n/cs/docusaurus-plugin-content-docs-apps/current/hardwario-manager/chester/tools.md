---
slug: tools
title: Nástroje
description: "s jeho konfigurací."
---

# Nástroje pro CHESTER {#chester-tools}

**CHESTER → Tools** obsahuje tři akce, které pracují se samotným zařízením, ne
s jeho konfigurací.

<img src="/img/hw-manager/hw-manager-chester-tools.png" alt="Menu CHESTER Tools se položkami Firmware update, Reboot device a Factory reset" width="320" />

| Nástroj | Co dělá |
|---|---|
| [**Firmware update**](./firmware-update.md) | Nahraje nový firmware přes Bluetooth, z QR kódu |
| **Reboot device** | Restartuje zařízení CHESTER. Spojení se přeruší |
| **Factory reset** | Vrátí konfiguraci zařízení CHESTER na výrobní výchozí hodnoty |

---

## Reboot device {#reboot-device}

Restartuje zařízení. Protože zařízení CHESTER při restartu přeruší své Bluetooth
spojení, aplikace se odpojí. Po pár sekundách, až zařízení naběhne, se znovu
připojte z průvodce nastavením. Nastavení už zapsaná do zařízení restart přežijí;
co bylo změněno a neuloženo, ne.

## Factory reset {#factory-reset}

Vrátí konfiguraci zařízení na výrobní výchozí hodnoty. Jde o destruktivní akci,
takže aplikace před jejím provedením žádá potvrzení.

:::danger Factory reset smaže, co jste nastavili
Intervaly, komunikační režim, nastavení LTE i LoRaWAN a navázané sloty BLE tagů
se všechny vrátí na výchozí hodnoty. Pokud byste konfiguraci mohli ještě
potřebovat, nejdřív ji vyexportujte. **Share configuration** na obrazovce
[**Konfigurace**](./configuration.md) ji celou vypíše jako text.
:::

Pokud akce selže, aplikace to ohlásí, místo aby selhala tiše, a pod **Details**
nabídne původní chybu. Viz [**Řešení problémů**](./troubleshooting.md).
