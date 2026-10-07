---
slug: /hardwario-manager/chester
title: CHESTER
description: "Správa zařízení CHESTER přes Bluetooth Low Energy v aplikaci HARDWARIO Manager: stav, konfigurace, shell, přiřazení tagů BLE a aktualizace firmwaru."
title_meta: "CHESTER (HARDWARIO Manager)"
---

# CHESTER přes Bluetooth {#chester-over-bluetooth}

Zařízení CHESTER se spravuje přes **Bluetooth Low Energy**. Po připojení
telefonu můžete číst stav zařízení, upravovat konfiguraci, ovládat shell,
přiřazovat externí senzorové tagy BLE, aktualizovat firmware a zařízení
restartovat.

Otevřete **HARDWARIO Manager** a zvolte **CHESTER**.

<img src="/img/hw-manager/hw-manager-chester-menu.png" alt="Obrazovka CHESTER s kartou připojeného zařízení nad položkami Device info, Configuration, Open Terminal, Tools a BLE tags" width="320" />

---

## Menu {#the-menu}

| Položka | Co dělá |
|---|---|
| [**Device info**](./device-info.md) | Sériové číslo, firmware, doba běhu a ovládání zařízení |
| [**Configuration**](./configuration.md) | Čtení a úprava konfigurace zařízení |
| [**Open Terminal**](./terminal.md) | Odesílání příkazů shellu do konzole zařízení |
| [**Tools**](./tools.md) | Aktualizace firmwaru, restart, factory reset |
| [**BLE tags**](./ble-tags.md) | Přiřazení externích senzorových tagů BLE ke slotům a čtení jejich hodnot |

---

## Karta připojeného zařízení {#the-connected-device-card}

Nad menu ukazuje **Connected CHESTER** název zařízení, ke kterému jste připojeni.
Šipkou rozbalíte souhrn (firmware, sériové číslo, adresu BLE a dobu běhu,
**podle stavu při posledním připojení**), tlačítkem **Disconnect** spojení ukončíte.

<img src="/img/hw-manager/hw-manager-chester-connected-details.png" alt="Rozbalená karta připojeného zařízení CHESTER s firmwarem, sériovým číslem, adresou BLE, dobou běhu a akcí Disconnect" width="320" />

:::info Vždy jen jedno zařízení, a jen dokud je obrazovka otevřená
Aplikace udržuje jen **jedno** připojení k zařízení CHESTER a to je vázané na
obrazovku CHESTER. Když ji opustíte, zařízení se odpojí. Když se budete chtít znovu připojit, průvodce
nastavením vám zařízení nabídne v seznamu **Recent devices**.
:::

---

## Než začnete {#before-you-start}

- Bluetooth musí být zapnutý a aplikace potřebuje oprávnění **Zařízení
  v okolí**, viz [**Instalace aplikace**](../install.md).
- Párování používá šestimístný **passkey** svázaný se zařízením. Aplikace ho načte
  za vás, když naskenujete QR kód na štítku zařízení CHESTER.
- Držte telefon blízko zařízení. Většina problémů s připojením je otázka dosahu
  nebo zastaralého párování, viz [**Řešení problémů**](./troubleshooting.md).

Začněte stránkou [**Připojení a párování**](./connect.md).
