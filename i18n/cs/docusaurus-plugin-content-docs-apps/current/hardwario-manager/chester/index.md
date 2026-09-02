---
slug: /hardwario-manager/chester
title: CHESTER
description: "Zařízení CHESTER se spravuje přes Bluetooth Low Energy. Připojte k němu"
---

# CHESTER přes Bluetooth {#chester-over-bluetooth}

Zařízení CHESTER se spravuje přes **Bluetooth Low Energy**. Připojte k němu
telefon a můžete přečíst jeho stav, upravit konfiguraci, ovládat jeho shell,
navázat externí senzorové BLE tagy, aktualizovat firmware a restartovat ho.

Otevřete **HARDWARIO Manager** a zvolte **CHESTER**.

<img src="/img/hw-manager/hw-manager-chester-menu.png" alt="Obrazovka CHESTER s kartou připojeného zařízení nad položkami Device info, Configuration, Open Terminal, Tools a BLE tags" width="320" />

---

## Menu {#the-menu}

| Položka | Co dělá |
|---|---|
| [**Device info**](./device-info.md) | Sériové číslo, firmware, doba běhu a ovládání zařízení |
| [**Configuration**](./configuration.md) | Čtení a úprava konfigurace zařízení |
| [**Open Terminal**](./terminal.md) | Odesílání shell příkazů do konzole zařízení |
| [**Tools**](./tools.md) | Aktualizace firmwaru, restart, factory reset |
| [**BLE tags**](./ble-tags.md) | Navázání externích senzorových BLE tagů do slotů a čtení jejich hodnot |

---

## Karta připojeného zařízení {#the-connected-device-card}

Nad menu pojmenovává **Connected CHESTER** zařízení, ke kterému jste připojení.
Jeho šipka rozbalí souhrn — firmware, sériové číslo, BLE adresu a dobu běhu,
**podle stavu při posledním připojení** — a **Disconnect** spojení ukončí.

<img src="/img/hw-manager/hw-manager-chester-connected-details.png" alt="Rozbalená karta připojeného zařízení CHESTER s firmwarem, sériovým číslem, BLE adresou a dobou běhu a akcí Disconnect" width="320" />

:::info Jedno zařízení naráz, a jen dokud je obrazovka otevřená
Aplikace drží **jedno** připojení k zařízení CHESTER a to patří obrazovce CHESTER.
Opuštěním obrazovky se zařízení odpojí. Pro opětovné připojení nabídne průvodce
nastavením zařízení znovu pod **Recent devices**.
:::

---

## Než začnete {#before-you-start}

- Bluetooth musí být zapnutý a aplikace potřebuje oprávnění k **zařízením
  v okolí** — viz [**Instalace aplikace**](../install.md).
- Párování používá šestimístný **passkey** svázaný se zařízením. Naskenování QR
  kódu na etiketě zařízení CHESTER je cesta, která ho za vás načte.
- Držte telefon blízko zařízení. Většina problémů s připojením je otázka dosahu
  nebo zastaralého párování — viz [**Řešení problémů**](./troubleshooting.md).

Začněte u [**Připojení a párování**](./connect.md).
