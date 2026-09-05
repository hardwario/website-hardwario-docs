---
slug: orno-or-we-516
title: Orno OR-WE-516
description: "Webové stránky"
---

import Image from '@theme/IdealImage';

[Webové stránky](https://www.orno.pl/en/energy-meters-with-mid/349-3-phase-energy-meter-with-rs-485-80a-mid-4-5-modules-din-th-35mm-5902560322415.html#download)

![ORNO OR-WE - 516](../../../../../../chester/supported-devices/modbus/images/orno-or-we-516.png)

### Popis {#description}

OR-WE-516 je kompaktní **třífázový** elektroměr určený pro přesné měření činné energie v elektrických instalacích. Je vybaven rozhraním **RS-485 Modbus** pro vzdálené čtení dat a má certifikaci MID pro fakturační měření.

:::info

Tento elektroměr **nevyžaduje** žádný **externí senzor** pro měření proudu. Měření probíhá vestavěně přes přímé připojení.

:::

 ---

### Silová instalace {#power-installation}

#### Příklad instalace: ORNO Energy Analyzer - OR-WE-516 {#example-of-installation-orno-energy-analyzer---or-we-516}

| **ORNO Energy Analyzer OR-WE-516** | |
|----------------------------------------|-----------------------------------------------|
| Pin 1                                  | **L1 (IN)**                                   |
| Pin 3                                  | **L2 (IN)**                                   |
| Pin 5                                  | **L3 (IN)**                                   |
| Pin 7                                  | **N (IN)**                                    |
| Pin 2                                  | **L1 (OUT)**                                  |
| Pin 4                                  | **L2 (OUT)**                                  |
| Pin 6                                  | **L3 (OUT)**                                  |

#### Schéma zapojení (OR-WE-516) {#connection-diagram-or-we-516}

![ORNO Energy Analyzer - OR-WE-516 - schéma zapojení ](../../../../../../chester/supported-devices/modbus/images/orno-or-we-516-connection-diagram.png)

:::info

V tomto případě je také možné zapojit analyzátor energie v jednofázovém režimu – fázi (L) přiveďte na svorku 1, nulový vodič (N) na svorku 7 a výstupní fázi (L out) na svorku 2.

:::

---

### Komunikace Modbus {#modbus-communication}

#### Příklad instalace komunikace Modbus: ORNO Energy Analyzer - OR-WE-516 {#example-of-modbus-communication-installation-orno-energy-analyzer---or-we-516}

| **ORNO Energy Analyzer OR-WE-516** | **CHESTER Modbus** |
|---------------------------|--------------------|
| Pin 20                    | Pin 6 (B)          |
| Pin 21                    | Pin 7 (A)          |


#### Schéma zapojení (OR-WE-516) {#connection-diagram-or-we-516-1}

![ORNO Energy Analyzer - OR-WE-516 - komunikace Modbus ](../../../../../../chester/supported-devices/modbus/images/orno-or-we-516-modbus.png)

---

### Tlačítka pro procházení a konfiguraci {#browsing-and-configuration-buttons}

* `➡️` **Pravé tlačítko**
    * Posun doprava v menu

* `⬅️` **Levé tlačítko**
    * Posun doleva v menu

---

### Konfigurace komunikace Modbus {#modbus-communication-configuration}


Nastavení komunikace elektroměru ORNO můžete upravit jedním z následujících způsobů:



#### 1. Pomocí oficiálního softwaru ORNO {#1-using-the-official-orno-software}

Komunikační parametry lze nakonfigurovat přímo pomocí oficiálního softwaru od firmy ORNO.  
Konfigurační nástroj si můžete stáhnout zde:  
**[Stáhnout konfigurační software ORNO pro OR-WE-516](../../../../../../chester/supported-devices/modbus/OR-WE-516_program.7z)**

Pro připojení zařízení k počítači použijte **standardní převodník USB–RS485**.  

:::info
Připojte stranu USB standardního převodníku USB–RS485 k počítači, kde je nainstalován konfigurační software ORNO.
Poté připojte stranu RS485 převodníku ke komunikačním svorkám elektroměru – **svorku A na pin 21** a **svorku B na pin 20**.
:::



#### 2. Pomocí terminálu CHESTER {#2-using-the-chester-terminal}

K terminálu se lze připojit několika způsoby:

- Použijte **aplikaci HARDWARIO Manager** (desktopovou nebo mobilní)
- Použijte **Cloud Terminal** v **[HARDWARIO Cloud](https://hardwario.cloud/)**
- Použijte **terminál v prohlížeči Google Chrome** na **[terminal.hardwario.com](https://terminal.hardwario.com/)**


#### Konfigurace komunikace Modbus pro CHESTER {#modbus-communication-configuration-for-chester}

Pro nastavení komunikačních parametrů přes terminál CHESTER použijte následující příkazy:


#### Konfigurace zařízení CHESTER {#configuration-of-chester}

Pro nakonfigurování elektroměru v aplikaci CHESTER zadejte do terminálu následující sadu příkazů. Tyto příkazy nastaví správný režim sériové komunikace, definují připojené zařízení a určí intervaly měření a přenosu dat.

```bash
# Configure communication with the energy meter
app config serial-mode "modbus"
app config serial-baudrate 9600
app config serial-data-bits 8
app config serial-parity "even"
app config serial-stop-bits 1

# Activate the device on the Modbus bus (format: "type,address")
app config device-0 "or_we_516,1"

# Configure application behavior and data transmission
app config mode "lte"
app config interval-sample 60
app config interval-aggreg 60
app config interval-report 30

# Save changes and verify settings
config save
app config show
```

##### Podrobný popis konfiguračních příkazů {#detailed-description-of-configuration-commands}

<details>
<summary><b>Zobrazit podrobný popis příkazů</b></summary>
<p>

| Příkaz | Výchozí hodnota | Popis |
| :--- | :--- | :--- |
| **`app config serial-mode "modbus"`** | `"transparent"` | Přepne vestavěnou sériovou linku z transparentního režimu do režimu Modbus RTU master. |
| **`app config serial-baudrate 9600`** | `9600` | Nastavuje rychlost komunikace (Baud rate). Musí odpovídat nastavení na displeji elektroměru. |
| **`app config serial-data-bits 8`** | `8` | Počet datových bitů v rámci Modbus. |
| **`app config serial-parity "even"`** | `"none"` | Nastavuje paritu (sudá parita), což je pro tento typ elektroměru standard. |
| **`app config serial-stop-bits 1`** | `1` | Počet stop bitů. |
| **`app config device-0 "or_we_516,1"`** | `""` | Přidá elektroměr do prvního volného slotu (`device-0`). Formát je `[typ_zařízení],[modbus_adresa]`. |
| **`app config mode "lte"`** | `"none"` | Určuje primární komunikační rozhraní zařízení CHESTER. V tomto případě je aktivován modul LTE (NB-IoT/LTE-M). |
| **`app config interval-sample 60`** | `60` | Interval (v sekundách) určující, jak často zařízení CHESTER načítá z elektroměru aktuální hodnoty. |
| **`app config interval-aggreg 60`** | `300` | Interval (v sekundách), během kterého jsou nasbíraná data agregována (zprůměrována nebo sečtena) do jednoho paketu. |
| **`app config interval-report 30`** | `1800` | Interval (v sekundách) určující, jak často zařízení CHESTER odesílá agregovaná data na server/do cloudu. |
| **`config save`** | — | Trvale uloží aktuální konfiguraci do flash paměti zařízení. |
| **`app config show`** | — | Vypíše aktuálně nastavené hodnoty pro ověření. |

</p>
</details>
---

### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Adresa  | Baud Rate | Parita | Stop bit |
|---------|-----------|--------|-----------|
| 1       | 9.6k      | Sudá   | 1         |

:::info
Tabulka výše ukazuje výchozí nastavení komunikace použité v naší instalaci.  
Elektroměr však může mít již nakonfigurované jiné hodnoty.  
Před použitím těchto nastavení v zařízení CHESTER ověřte skutečné komunikační parametry v menu analyzátoru energie. [➡️Navigace v menu elektroměru⬅️](#browsing-and-configuration-buttons)  
Nastavení v zařízení CHESTER musí odpovídat hodnotám nakonfigurovaným v elektroměru.
:::

### Měřené hodnoty {#measured-values}

| Měřená hodnota | Klíč / cesta                                 |
|----------------|----------------------------------------------|
| Výkon          | E_ENERGY_METER.METER_3.POWER.MEASUREMENTS    |
| Frekvence      | E_ENERGY_METER.METER_3.FREQUENCY.MEASUREMENTS|
| Energie In     | E_ENERGY_METER.METER_3.ENERGY_IN.MEASUREMENTS|
| Energie Out    | E_ENERGY_METER.METER_3.ENERGY_OUT.MEASUREMENTS|
| Napětí L1      | E_ENERGY_METER.METER_3.VOLTAGE_L1.MEASUREMENTS|
| Napětí L2      | E_ENERGY_METER.METER_3.VOLTAGE_L2.MEASUREMENTS|
| Napětí L3      | E_ENERGY_METER.METER_3.VOLTAGE_L3.MEASUREMENTS|
| Proud L1       | E_ENERGY_METER.METER_3.CURRENT_L1.MEASUREMENTS|
| Proud L2       | E_ENERGY_METER.METER_3.CURRENT_L2.MEASUREMENTS|
| Proud L3       | E_ENERGY_METER.METER_3.CURRENT_L3.MEASUREMENTS|
| Výkon L1       | E_ENERGY_METER.METER_3.POWER_L1.MEASUREMENTS |
| Výkon L2       | E_ENERGY_METER.METER_3.POWER_L2.MEASUREMENTS |
| Výkon L3       | E_ENERGY_METER.METER_3.POWER_L3.MEASUREMENTS |
| Energie L1     | E_ENERGY_METER.METER_3.ENERGY_L1.MEASUREMENTS|
| Energie L2     | E_ENERGY_METER.METER_3.ENERGY_L2.MEASUREMENTS|
| Energie L3     | E_ENERGY_METER.METER_3.ENERGY_L3.MEASUREMENTS|


---
