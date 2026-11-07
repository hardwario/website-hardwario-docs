---
slug: orno-or-we-504
title: ORNO OR-WE-504
---

import Image from '@theme/IdealImage';

[Webové stránky](https://www.orno.pl/en/energy-meters-without-mid/340-1-phase-energy-meter-wtih-rs-485-80a-5901752481282.html#download)

![ORNO OR-WE-504](../../../../../../chester/supported-devices/modbus/images/orno-or-we-504.png)

### Popis {#description}

**OR-WE-504** je kompaktní **jednofázový** elektroměr pro sledování elektrických parametrů a spotřeby činné energie.
Data z něj lze odečítat na dálku přes rozhraní **RS-485 Modbus RTU**.

Elektroměr **není certifikovaný podle MID** a slouží k **technickému monitoringu**, nikoli k fakturačnímu měření.

:::info

Tento elektroměr **nepotřebuje žádné externí proudové senzory**.
Proud i napětí měří přímo vlastními obvody.

:::

---

### Silové zapojení {#power-installation}

#### Příklad zapojení: elektroměr ORNO OR-WE-504 {#example-of-installation-orno-energy-analyzer---or-we-504}

| **Elektroměr ORNO OR-WE-504** | |
|-------------------------------------|----------------|
| Pin 1                               | **L (IN)**     |
| Pin N                               | **N (IN)**     |
| Pin 3                               | **L (OUT)**    |

#### Schéma zapojení (OR-WE-504) {#connection-diagram-or-we-504}

![Schéma zapojení elektroměru ORNO OR-WE-504](../../../../../../chester/supported-devices/modbus/images/orno-or-we-504-connection-diagram.png)

:::info

Nulový vodič lze připojit buď přímo ke **svorce N** elektroměru, nebo na nulovou přípojnici v rozvaděči.

:::

---

### Komunikace Modbus {#modbus-communication}

#### Příklad zapojení komunikace Modbus: elektroměr ORNO OR-WE-504 {#example-of-modbus-communication-installation-orno-energy-analyzer---or-we-504}

| **Elektroměr ORNO OR-WE-504** | **CHESTER Modbus** |
|-------------------------------------|--------------------|
| Pin 23                              | Pin 7 (A)          |
| Pin 25                              | Pin 6 (B)          |
| Pin 24 (volitelně)                  | GND (volitelně)   |

#### Schéma zapojení (OR-WE-504) {#connection-diagram-or-we-504-1}

![Zapojení komunikace Modbus elektroměru ORNO OR-WE-504](../../../../../../chester/supported-devices/modbus/images/orno-or-we-504-modbus.png)

:::info

Pokud převodník RS-485 nemá svorku GND, **pin 24 nemusíte zapojovat**.

:::

---

### Konfigurace komunikace Modbus {#modbus-communication-configuration}

Parametry komunikace elektroměru OR-WE-504 nastavíte jedním z těchto způsobů.

---

#### 1. Pomocí oficiálního softwaru ORNO {#1-using-the-official-orno-software}

Ke konfiguraci slouží oficiální konfigurační software ORNO.

[**Stáhnout konfigurační software ORNO pro OR-WE-504**](https://files.orno.pl/support/Others/ORNO/ORWE504_5901752481282/OR-WE-504_program.zip)

Zařízení k počítači připojíte **standardním převodníkem USB–RS-485**.

:::info

Převodník USB–RS-485 připojte stranou USB k počítači.
Vodiče RS-485 připojte k elektroměru:
- **A → Pin 23**
- **B → Pin 25**

:::

---

#### 2. Pomocí terminálu CHESTER {#2-using-the-chester-terminal}

K terminálu CHESTER se dostanete jedním z těchto způsobů:

- v **aplikaci HARDWARIO Manager** (desktopové nebo mobilní),
- přes **Cloud Terminal** v **[HARDWARIO Cloud](https://hardwario.cloud/)**,
- v **terminálu pro prohlížeč Google Chrome** na **[terminal.hardwario.com](https://terminal.hardwario.com/)**.

---

#### Konfigurace komunikace Modbus v zařízení CHESTER {#modbus-communication-configuration-for-chester}

Parametry komunikace nastavíte v terminálu CHESTER těmito příkazy:

#### Konfigurace zařízení CHESTER {#configuration-of-chester}

```
app config serial-mode modbus
app config serial-baudrate 9600
app config serial-parity none
app config serial-stop-bits 1
app config device-0 "or_we_504,1"
config save
```

Příkazy platí pro variantu RS-485 firmwaru [**CHESTER Serial**](../../firmware/chester-serial/index.md). `device-0` je první slot pro zařízení; `or_we_504,1` je typ zařízení a adresa Modbus elektroměru. Nastavení sériové linky musí odpovídat elektroměru. Příkaz `config save` konfiguraci uloží a zařízení restartuje. Podrobnosti najdete v části [**Sloty zařízení**](../../firmware/chester-serial/index.md#device-slots).

---

### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Adresa | Přenosová rychlost | Parita | Stop bit |
|--------|-----------|--------|----------|
| 1      | 9.6k      | Žádná  | 1        |

:::info

V tabulce je výchozí nastavení komunikace.
Elektroměr ale může být nastavený jinak.

Než hodnoty zadáte do zařízení CHESTER, ověřte skutečné parametry komunikace
v konfiguračním softwaru ORNO.

Konfigurace zařízení CHESTER musí **odpovídat konfiguraci elektroměru**.

:::

---

### Měřené hodnoty {#measured-values}

V každém hlášení je elektroměr jednou položkou seznamu `devices` s hodnotou `type_name` `or_we_504`. Každý vzorek odebraný od předchozího hlášení je jednou položkou jeho seznamu `data` s těmito klíči:

| Měřená hodnota | Klíč |
| :--- | :--- |
| Napětí | `devices[].data[].voltage` |
| Proud | `devices[].data[].current` |
| Činný výkon | `devices[].data[].power` |
| Zdánlivý výkon | `devices[].data[].power_apparent` |
| Jalový výkon | `devices[].data[].power_reactive` |
| Účiník | `devices[].data[].power_factor` |
| Frekvence | `devices[].data[].frequency` |
| Odebraná činná energie | `devices[].data[].energy_in` |

Jednotky, rozsahy a rozlišení všech klíčů uvádí katalogová stránka [**CHESTER Serial**](../../catalog-applications/chester-serial/index.md#orno-or-we-504).


---
