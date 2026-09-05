---
slug: carlo-gavazzi-em5xx-series
title: Carlo Gavazzi EM5XX Series
description: "Webové stránky"
---

import Image from '@theme/IdealImage';


[Webové stránky](https://www.gavazziautomation.com/en-global/product/EM530DINAV53XS1PFB)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '376px', height: '376px' }}>
        <Image img={require('../../../../../../chester/supported-devices/modbus/images/carlo-gavazzi-em5xx.png')} alt="Analyzátor energie Carlo Gavazzi EM530 na DIN lištu s LCD zobrazujícím hodnoty energie a výkonu" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />



### Popis {#description}

Řada EM5xx nabízí sortiment kompaktních a univerzálních analyzátorů energie určených pro monitorování spotřeby a kvality elektrické energie v **jednofázových**, **dvoufázových** a **třífázových soustavách**. Tato zařízení jsou ideální pro použití v domácnostech, komerčních i průmyslových prostředích, kde je zásadní přesné měření, spolehlivost a snadné použití.

:::info

Tento elektroměr **vyžaduje** použití **externího senzoru**, například proudového transformátoru (CT), pro měření proudu. Senzor je nutné vybrat podle očekávané zátěže a konfigurace soustavy.

:::

 ---

### Instalace napájení {#power-installation}

#### Příklad instalace: analyzátor energie Carlo Gavazzi EM530 {#example-of-installation-carlo-gavazzi-energy-analyzer-em530}

| **Analyzátor energie Carlo Gavazzi – EM530** | |
|----------------------------------------|-----------------------------------------------|
| Pin N                                 | **N**                                         |
| Pin 1                                 | **L1**                                         |
| Pin 2                                 | **L2**                                         |
| Pin 3                                 | **L3**                                         |

:::info

 V tomto případě je také možné zapojit analyzátor energie v jednofázovém režimu, a to připojením nulového vodiče (N) na svorku N a fáze (L) na svorku 1.

:::

#### Schéma zapojení (EM530) {#connection-diagram-em530}

![Carlo Gavazzi – EM530 – schéma zapojení](../../../../../../chester/supported-devices/modbus/images/cg-em530.png)

 ---
### Instalace senzoru {#sensor-installation}

#### Příklad instalace: rozevírací proudový transformátor CTA6X200A5A {#example-of-installation-split-core-current-transformer-cta6x200a5a}


| **Analyzátor energie Carlo Gavazzi – EM530** | **Rozevírací proudový transformátor – CTA6X200A5A** |
|----------------------------------------|-----------------------------------------------|
| Pin 13                                 | **K**                                         |
| Pin 14                                 | **L**                                         |


#### Schéma zapojení (CTA6X200A5A) {#connection-diagram-cta6x200a5a}

![Carlo Gavazzi – CTA6X200A5A – schéma zapojení ](../../../../../../chester/supported-devices/modbus/images/cta6x200a5a.png)

---

### Komunikace Modbus {#modbus-communication}

#### Příklad instalace komunikace Modbus: analyzátor energie Carlo Gavazzi EM530 {#example-of-modbus-communication-installation-carlo-gavazzi-energy-analyzer-em530}

| **Analyzátor energie Carlo Gavazzi – EM530** | **CHESTER Modbus** |
|---------------------------|--------------------|
| Pin 9                     | Pin 6 (A−)      |
| Pin 8                     | Pin 7 (B+)        |
| Pin 10                    | Pin 1 (GND)        |

#### Komunikace Modbus (EM530) {#modbus-communication-em530}

![Carlo Gavazzi – EM530 – komunikace Modbus](../../../../../../chester/supported-devices/modbus/images/cg-em530-modbus.png)

---

### Tlačítka pro navigaci a konfiguraci {#browsing-and-configuration-buttons}

* `▲` **Tlačítko nahoru**
    1. Navigace v menu
    2. Zvyšování hodnoty

* `▼` **Tlačítko dolů**
    1. Navigace v menu
    2. Snižování hodnoty

* `⯀` **Tlačítko Select / Enter / Menu**


---

### Konfigurace komunikace Modbus pro analyzátor energie {#modbus-communication-configuration-for-energy-analyzer}

1. Stiskněte tlačítko **Select** pro otevření menu.  
2. Tlačítkem **Select** vyberte položku **Setting**.  
3. Tlačítky **nahoru/dolů** vyberte položku menu: `r5485`.  
4. Zadejte konfigurační hodnoty podle tabulky níže.

#### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Adresa  | Baud Rate | Parita | Stop bit |
|---------|-----------|--------|-----------|
| 1       | 9.6k      | Žádná  | 1         |

---

### Konfigurace komunikace Modbus pro CHESTER {#modbus-communication-configuration-for-chester}

Pro nastavení komunikačních parametrů použijte v CHESTER Terminalu následující příkazy:


```
app config modbus-baud "9600"
app config modbus-addr "1"
app config modbus-parity "none"
app config modbus-stop-bits "1"
app config em-type "g2"
config save
```

---

### Konfigurace převodu CT {#ct-ratio-configuration}

1. Stiskněte tlačítko **Select** pro otevření menu.  
2. Tlačítkem **Select** vyberte položku **Reset**.  
3. Tlačítky **nahoru/dolů** přejděte na položku menu **MID res**.  
4. Stiskněte **Start**.  
5. Zadejte hodnoty převodu CT.  
6. Potvrďte nastavení volbou **YES** tlačítkem **nahoru** a poté stiskněte tlačítko **Select**.

:::warning
Tyto modely jsou **elektroměry certifikované podle MID** (Measuring Instruments Directive, evropská norma legální metrologie).  
Převod CT lze změnit **pouze předtím**, než zařízení zaznamená **1 kWh** aktivní energie.  
Po překročení 1 kWh je převod CT **trvale uzamčen** a **nelze jej změnit**, a to ani po obnovení výrobního nastavení nebo MID resetu.  
:::

### Příklad volby převodu CT {#example-of-ct-ratio-selection}

**Rozevírací proudový transformátor Carlo Gavazzi – CTA6X200A5A**

| Model       | Převod CT         |
|-------------|-------------------|
| CTA6X200A5A | 40 *(200:5 → 40)* |

:::info

 Převod CT se vybírá podle maximálního očekávaného primárního proudu. Pokud je například maximální proud soustavy okolo 200 A, zvolí se CT 200:5 (40 CT), který jej pro měřicí přístroje sníží na 5 A.

:::

>
### Měřené hodnoty {#measured-values}

| Měřená hodnota | Klíč / cesta                                 |
|----------------|----------------------------------------------|
| Proud          | E_ENERGY_METER.METER_2.CURRENT.MEASUREMENTS  |
| Napětí         | E_ENERGY_METER.METER_2.VOLTAGE.MEASUREMENTS  |
| Výkon          | E_ENERGY_METER.METER_2.POWER.MEASUREMENTS    |
| Frekvence      | E_ENERGY_METER.METER_2.FREQUENCY.MEASUREMENTS|
| Energie vstup  | E_ENERGY_METER.METER_2.ENERGY_IN.MEASUREMENTS|
| Energie výstup | E_ENERGY_METER.METER_2.ENERGY_OUT.MEASUREMENTS|
| Napětí L1      | E_ENERGY_METER.METER_2.VOLTAGE_L1.MEASUREMENTS|
| Napětí L2      | E_ENERGY_METER.METER_2.VOLTAGE_L2.MEASUREMENTS|
| Napětí L3      | E_ENERGY_METER.METER_2.VOLTAGE_L3.MEASUREMENTS|
| Proud L1       | E_ENERGY_METER.METER_2.CURRENT_L1.MEASUREMENTS|
| Proud L2       | E_ENERGY_METER.METER_2.CURRENT_L2.MEASUREMENTS|
| Proud L3       | E_ENERGY_METER.METER_2.CURRENT_L3.MEASUREMENTS|
| Výkon L1       | E_ENERGY_METER.METER_2.POWER_L1.MEASUREMENTS |
| Výkon L2       | E_ENERGY_METER.METER_2.POWER_L2.MEASUREMENTS |
| Výkon L3       | E_ENERGY_METER.METER_2.POWER_L3.MEASUREMENTS |
---
