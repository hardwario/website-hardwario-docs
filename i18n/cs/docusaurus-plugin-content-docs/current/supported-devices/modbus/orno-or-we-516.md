---
slug: orno-or-we-516
title: ORNO OR-WE-516
---

import Image from '@theme/IdealImage';

[Webové stránky](https://www.orno.pl/en/energy-meters-with-mid/349-3-phase-energy-meter-with-rs-485-80a-mid-4-5-modules-din-th-35mm-5902560322415.html#download)

![ORNO OR-WE-516](../../../../../../chester/supported-devices/modbus/images/orno-or-we-516.png)

### Popis {#description}

OR-WE-516 je kompaktní **třífázový** elektroměr pro přesné měření činné energie v elektrických instalacích. Data z něj lze odečítat na dálku přes rozhraní **RS-485 Modbus** a díky certifikaci MID se hodí i pro fakturační měření.

:::info

Tento elektroměr **nepotřebuje** k měření proudu žádný **externí senzor**. Proud měří sám, vodiče se do něj zapojují přímo.

:::

 ---

### Silové zapojení {#power-installation}

#### Příklad zapojení: elektroměr ORNO OR-WE-516 {#example-of-installation-orno-energy-analyzer---or-we-516}

| **Elektroměr ORNO OR-WE-516** | |
|----------------------------------------|-----------------------------------------------|
| Pin 1                                  | **L1 (IN)**                                   |
| Pin 3                                  | **L2 (IN)**                                   |
| Pin 5                                  | **L3 (IN)**                                   |
| Pin 7                                  | **N (IN)**                                    |
| Pin 2                                  | **L1 (OUT)**                                  |
| Pin 4                                  | **L2 (OUT)**                                  |
| Pin 6                                  | **L3 (OUT)**                                  |

#### Schéma zapojení (OR-WE-516) {#connection-diagram-or-we-516}

![Schéma zapojení elektroměru ORNO OR-WE-516](../../../../../../chester/supported-devices/modbus/images/orno-or-we-516-connection-diagram.png)

:::info

Elektroměr lze zapojit i jednofázově: fázi (L) přiveďte na svorku 1, nulový vodič (N) na svorku 7 a výstupní fázi (L out) na svorku 2.

:::

---

### Komunikace Modbus {#modbus-communication}

#### Příklad zapojení komunikace Modbus: elektroměr ORNO OR-WE-516 {#example-of-modbus-communication-installation-orno-energy-analyzer---or-we-516}

| **Elektroměr ORNO OR-WE-516** | **CHESTER Modbus** |
|---------------------------|--------------------|
| Pin 20                    | Pin 6 (B)          |
| Pin 21                    | Pin 7 (A)          |


#### Schéma zapojení (OR-WE-516) {#connection-diagram-or-we-516-1}

![Zapojení komunikace Modbus elektroměru ORNO OR-WE-516](../../../../../../chester/supported-devices/modbus/images/orno-or-we-516-modbus.png)

---

### Ovládací tlačítka {#browsing-and-configuration-buttons}

* `➡️` **Pravé tlačítko**
    * Posun doprava v menu

* `⬅️` **Levé tlačítko**
    * Posun doleva v menu

---

### Konfigurace komunikace Modbus {#modbus-communication-configuration}


Parametry komunikace elektroměru ORNO nastavíte jedním z těchto způsobů:



#### 1. Pomocí oficiálního softwaru ORNO {#1-using-the-official-orno-software}

Ke konfiguraci slouží oficiální software ORNO.  
Konfigurační nástroj si stáhnete zde:  
**[Stáhnout konfigurační software ORNO pro OR-WE-516](pathname:///chester/supported-devices/modbus/OR-WE-516_program.7z)**

Zařízení k počítači připojíte **standardním převodníkem USB–RS-485**.  

:::info
Standardní převodník USB–RS-485 připojte stranou USB k počítači s nainstalovaným konfiguračním softwarem ORNO.
Stranu RS-485 pak připojte ke komunikačním svorkám elektroměru: **svorku A na pin 21** a **svorku B na pin 20**.
:::



#### 2. Pomocí terminálu CHESTER {#2-using-the-chester-terminal}

K terminálu se dostanete několika způsoby:

- v **aplikaci HARDWARIO Manager** (desktopové nebo mobilní),
- přes **Cloud Terminal** v **[HARDWARIO Cloud](https://hardwario.cloud/)**,
- v **terminálu pro prohlížeč Google Chrome** na **[terminal.hardwario.com](https://terminal.hardwario.com/)**.


#### Konfigurace komunikace Modbus v zařízení CHESTER {#modbus-communication-configuration-for-chester}

Parametry komunikace nastavíte v terminálu CHESTER těmito příkazy:


#### Konfigurace zařízení CHESTER {#configuration-of-chester}

Chcete-li elektroměr nastavit v aplikaci CHESTER, zadejte do terminálu tuto sadu příkazů. Příkazy nastaví správný režim sériové komunikace, zaregistrují připojené zařízení a určí intervaly měření a odesílání dat.

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
| **`app config serial-mode "modbus"`** | `"transparent"` | Přepne vestavěnou sériovou linku z transparentního režimu do režimu master Modbus RTU. |
| **`app config serial-baudrate 9600`** | `9600` | Nastaví přenosovou rychlost (baud rate). Musí odpovídat nastavení na displeji elektroměru. |
| **`app config serial-data-bits 8`** | `8` | Počet datových bitů v rámci Modbus. |
| **`app config serial-parity "even"`** | `"none"` | Nastaví sudou paritu, u tohoto typu elektroměru standardní. |
| **`app config serial-stop-bits 1`** | `1` | Počet stop bitů. |
| **`app config device-0 "or_we_516,1"`** | `""` | Přidá elektroměr do prvního volného slotu (`device-0`). Formát je `[device_type],[modbus_address]` (typ zařízení a adresa Modbus). |
| **`app config mode "lte"`** | `"none"` | Určí hlavní komunikační rozhraní zařízení CHESTER, zde modul LTE (NB-IoT/LTE-M). |
| **`app config interval-sample 60`** | `60` | Jak často (v sekundách) zařízení CHESTER čte z elektroměru aktuální hodnoty. |
| **`app config interval-aggreg 60`** | `300` | Interval (v sekundách), za který se nasbíraná data agregují (zprůměrují nebo sečtou) do jednoho paketu. |
| **`app config interval-report 30`** | `1800` | Jak často (v sekundách) zařízení CHESTER odesílá agregovaná data na server nebo do cloudu. |
| **`config save`** | — | Trvale uloží aktuální konfiguraci do paměti flash zařízení. |
| **`app config show`** | — | Vypíše aktuální nastavení pro kontrolu. |

</p>
</details>
---

### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Adresa  | Přenosová rychlost | Parita | Stop bit |
|---------|-----------|--------|-----------|
| 1       | 9.6k      | Sudá   | 1         |

:::info
V tabulce je výchozí nastavení komunikace, které používáme v naší instalaci.  
Elektroměr ale může mít nastavené jiné hodnoty.  
Než hodnoty zadáte do zařízení CHESTER, ověřte skutečné parametry komunikace v menu elektroměru. [➡️Ovládání menu elektroměru⬅️](#browsing-and-configuration-buttons)  
Nastavení zařízení CHESTER musí odpovídat hodnotám nastaveným v elektroměru.
:::

### Měřené hodnoty {#measured-values}

| Měřená hodnota | Klíč / cesta                                 |
|----------------|----------------------------------------------|
| Výkon          | E_ENERGY_METER.METER_3.POWER.MEASUREMENTS    |
| Frekvence      | E_ENERGY_METER.METER_3.FREQUENCY.MEASUREMENTS|
| Odebraná energie | E_ENERGY_METER.METER_3.ENERGY_IN.MEASUREMENTS|
| Dodaná energie | E_ENERGY_METER.METER_3.ENERGY_OUT.MEASUREMENTS|
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
