---
slug: orno-or-we-504
title: Orno OR-WE-504
description: "Webové stránky"
---

import Image from '@theme/IdealImage';

[Webové stránky](https://www.orno.pl/en/energy-meters-without-mid/340-1-phase-energy-meter-wtih-rs-485-80a-5901752481282.html#download)

![ORNO OR-WE-504](../../../../../../chester/supported-devices/modbus/images/orno-or-we-504.png)

### Popis {#description}

**OR-WE-504** je kompaktní **jednofázový** elektroměr určený pro sledování elektrických parametrů a spotřeby činné energie.
Je vybaven rozhraním **RS-485 Modbus RTU** pro vzdálené odečítání dat.

Toto zařízení **není certifikováno podle MID** a je určeno pro **technický monitoring**, nikoli pro fakturační měření.

:::info

Tento elektroměr **nevyžaduje žádné externí proudové senzory**.
Proud i napětí se měří přímo interními obvody.

:::

---

### Silová instalace {#power-installation}

#### Příklad instalace: ORNO Energy Analyzer - OR-WE-504 {#example-of-installation-orno-energy-analyzer---or-we-504}

| **ORNO Energy Analyzer OR-WE-504** | |
|-------------------------------------|----------------|
| Pin 1                               | **L (IN)**     |
| Pin N                               | **N (IN)**     |
| Pin 3                               | **L (OUT)**    |

#### Schéma zapojení (OR-WE-504) {#connection-diagram-or-we-504}

![ORNO Energy Analyzer - OR-WE-504 - schéma zapojení](../../../../../../chester/supported-devices/modbus/images/orno-or-we-504-connection-diagram.png)

:::info

Nulový vodič lze připojit buď přímo ke **svorce N** elektroměru, nebo na nulovou přípojnici v rozvaděči.

:::

---

### Komunikace Modbus {#modbus-communication}

#### Příklad instalace komunikace Modbus: ORNO Energy Analyzer - OR-WE-504 {#example-of-modbus-communication-installation-orno-energy-analyzer---or-we-504}

| **ORNO Energy Analyzer OR-WE-504** | **CHESTER Modbus** |
|-------------------------------------|--------------------|
| Pin 23                              | Pin 7 (A)          |
| Pin 25                              | Pin 6 (B)          |
| Pin 24 (volitelně)                  | GND (volitelně)   |

#### Schéma zapojení (OR-WE-504) {#connection-diagram-or-we-504-1}

![ORNO Energy Analyzer - OR-WE-504 - komunikace Modbus](../../../../../../chester/supported-devices/modbus/images/orno-or-we-504-modbus.png)

:::info

Pokud převodník RS-485 nemá svorku GND, **Pin 24 není nutné připojovat**.

:::

---

### Konfigurace komunikace Modbus {#modbus-communication-configuration}

Komunikační parametry zařízení OR-WE-504 lze nastavit jedním z následujících způsobů.

---

#### 1. Pomocí oficiálního softwaru ORNO {#1-using-the-official-orno-software}

Komunikační parametry lze nastavit pomocí oficiálního konfiguračního softwaru ORNO.

[**Stáhnout konfigurační software ORNO pro OR-WE-504**](https://files.orno.pl/support/Others/ORNO/ORWE504_5901752481282/OR-WE-504_program.zip)

Pro připojení zařízení k počítači použijte **standardní převodník USB–RS485**.

:::info

Připojte stranu USB převodníku USB–RS485 k počítači.
Linky RS-485 připojte k elektroměru:
- **A → Pin 23**
- **B → Pin 25**

:::

---

#### 2. Pomocí terminálu CHESTER {#2-using-the-chester-terminal}

K terminálu CHESTER se dostanete jedním z těchto způsobů:

- Použijte **aplikaci HARDWARIO Manager** (desktopovou nebo mobilní)
- Použijte **Cloud Terminal** v **[HARDWARIO Cloud](https://hardwario.cloud/)**
- Použijte terminál v prohlížeči Google Chrome na **[terminal.hardwario.com](https://terminal.hardwario.com/)**

---

#### Konfigurace komunikace Modbus pro CHESTER {#modbus-communication-configuration-for-chester}

Pomocí následujících příkazů nastavte komunikační parametry v terminálu CHESTER:

#### Konfigurace zařízení CHESTER {#configuration-of-chester}

```
app config modbus-baud "9600"
app config modbus-addr "1"
app config modbus-parity "none"
app config modbus-stop-bits "1"
app config em-type "orno"
config save
```

---

### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Adresa | Přenosová rychlost | Parita | Stop bit |
|--------|-----------|--------|----------|
| 1      | 9.6k      | Žádná  | 1        |

:::info

Tabulka výše ukazuje výchozí nastavení komunikace.
Elektroměr však již může být nastaven jinak.

Než tato nastavení použijete v zařízení CHESTER, ověřte skutečné komunikační parametry
pomocí konfiguračního softwaru ORNO.

Ujistěte se, že konfigurace zařízení CHESTER **odpovídá konfiguraci elektroměru**.

:::

---

### Měřené hodnoty {#measured-values}

| Měřená hodnota | Klíč / cesta |
|---------------|------------|
| Napětí        | E_ENERGY_METER.METER_1.VOLTAGE.MEASUREMENTS |
| Proud         | E_ENERGY_METER.METER_1.CURRENT.MEASUREMENTS |
| Frekvence     | E_ENERGY_METER.METER_1.FREQUENCY.MEASUREMENTS |
| Výkon         | E_ENERGY_METER.METER_1.POWER.MEASUREMENTS |
| Účiník        | E_ENERGY_METER.METER_1.POWER_FACTOR.MEASUREMENTS |
| Odebraná energie | E_ENERGY_METER.METER_1.ENERGY_IN.MEASUREMENTS |

---
