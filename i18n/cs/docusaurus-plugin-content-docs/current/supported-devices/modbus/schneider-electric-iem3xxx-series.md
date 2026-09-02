---
slug: schneider-electric-iem3xxx-series
title: Schneider Electric IEM3XXX Series
description: "Webové stránky"
---

import Image from '@theme/IdealImage';

[Webové stránky](https://www.se.com/cz/cs/product/A9MEM3255/iem3250-elektrom%C4%9Br-ct-modbus-2-digit%C3%A1ln%C3%AD-vstupy/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '376px', height: '376px' }}>
        <Image img={require('../../../../../../chester/supported-devices/modbus/images/schneider-electric-iem3000-series.png')} alt="Elektroměr Schneider Electric iEM3255 na DIN lištu s LCD a tlačítky OK, ESC a se šipkami" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

### Popis {#description}

Řada iEM3200 se skládá z kompaktních elektroměrů pro montáž na DIN lištu, které jsou určeny pro přesné a certifikované měření elektrické energie v **jednofázových** a **třífázových systémech**. Tyto elektroměry odpovídají směrnici MID, takže jsou vhodné jak pro fakturační měření, tak pro rozúčtování nákladů v bytových, komerčních a lehkých průmyslových instalacích.

:::info

Tento elektroměr **vyžaduje** použití **externího senzoru**, například měřicího transformátoru proudu (CT), pro měření proudu. Senzor je nutné vybrat podle očekávané zátěže a konfigurace systému.

:::

 ---

### Instalace napájení {#power-installation}

#### Příklad instalace: Schneider Electric Energy Analyzer IEM3250 {#example-of-installation-schneider-electric-energy-analyzer-iem3250}

| **Schneider Electric Energy Analyzer IEM3250** | |
|----------------------------------------|-----------------------------------------------|
| Pin V1                                 | **L1**                                         |
| Pin V2                                 | **L2**                                         |
| Pin V3                                 | **L3**                                         |
| Pin Vn                                 | **N**                                         |

:::info

 V tomto případě je také možné zapojit analyzátor energie v jednofázovém režimu, tedy připojit nulový vodič (N) na svorku Vn a fázi (L) na svorku V1.

:::

---

### Instalace senzoru {#sensor-installation}

#### Příklad instalace: Carlo Gavazzi AC Current Transformer CTD-1X 100 5A XXX {#example-of-installation-carlo-gavazzi-ac-current-transformer-ctd-1x-100-5a-xxx}


| **Electric Energy Analyzer IEM3250** | **Carlo Gavazzi AC Current Transformer CTD-1X 100 5A XXX** |
|----------------------------------------|-----------------------------------------------|
| Pin S1                                 | **S1 (K)**                                         |
| Pin S2                                | **S2 (L)**                                         |

#### Schéma zapojení (IEM3250) {#connection-diagram-iem3250}

![Schéma zapojení (IEM3250)](../../../../../../chester/supported-devices/modbus/images/connection-diagram-iem3250.png)

---

### Komunikace Modbus {#modbus-communication}

#### Příklad zapojení komunikace Modbus: Schneider Electric Energy Analyzer IEM3250 {#example-of-modbus-communication-installation-schneider-electric-energy-analyzer-iem3250}

| **Schneider Electric Energy Analyzer IEM3250** | **CHESTER Modbus** |
|---------------------------|--------------------|
| Pin D0/-                     | Pin 6 (A−)      |
| Pin D1/+                    | Pin 7 (B+)        |
| Pin 0V                    | Pin 1 (GND)        |

#### Komunikace Modbus (IEM3250) {#modbus-communication-iem3250}

![Komunikace Modbus (IEM3250)](../../../../../../chester/supported-devices/modbus/images/modbus-communication-iem3250.png)

---

### Procházení a konfigurace {#browsing-and-configuration}

* `▼` **Tlačítko se šipkou**
    1. Navigace v menu
    2. Zvyšování/snižování hodnoty

* `OK` **Tlačítko Select / Enter / Menu**
  
* `ESC` **Tlačítko Escape**

---

### Konfigurace komunikace Modbus a převodu CT pro analyzátor energie {#modbus-communication-and-ct-ratio-configuration-for-energy-analyzer}

1. Stiskněte a držte tlačítka `OK` a `ESC`, dokud se nezobrazí výzva k zadání hesla.  
2. Zadejte heslo pomocí tlačítka `▼` (**tlačítko se šipkou**). (Výchozí heslo nových elektroměrů je `0010`.)  
3. Po zadání správného hesla se zobrazí konfigurační menu.  
4. Tlačítkem `▼` (**tlačítko se šipkou**) přejděte na položku menu: `Communication – Change?`.  
5. Stiskem tlačítka `OK` vstupte do nastavení komunikace.  
6. Podle potřeby nastavte následující parametry:  
   • Address  
   • Baud Rate  
   • Parity  
   • Stop Bit 
   • Stop Bit   
7. Tlačítkem `▼` (**tlačítko se šipkou**) pokračujte až na konec menu.  
8. U položky `Exit Config` stiskněte tlačítko `OK` pro potvrzení a uložení nastavení.

#### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Address | Baud Rate | Parity | Stop Bit |
|---------|-----------|--------|-----------|
| 1       | 9.6k      | None   | 1         |

---

### Konfigurace komunikace Modbus pro CHESTER {#modbus-communication-configuration-for-chester}

Pomocí následujících příkazů nastavte parametry komunikace v terminálu CHESTER Terminal:


```
app config modbus-baud "9600"
app config modbus-addr "1"
app config modbus-parity "none"
app config modbus-stop-bits "1"
app config em-type "g4"
config save
```

---

### Příklad volby převodu CT {#example-of-ct-ratio-selection}

**Carlo Gavazzi AC Current Transformer CTD-1X 100 5A XXX**

| Model       | Převod CT          |
|-------------|-------------------|
| CTD-1X 100 5A XXX | 20 *(100:5 → 20)* |

:::info

 Převod CT se vybírá podle maximálního očekávaného primárního proudu. Pokud je například maximální proud v systému okolo 100 A, zvolí se CT 100:5 (CT 20), který jej pro měřicí přístroje sníží na 5 A.

:::
>
### Měřené hodnoty {#measured-values}

| Měřená hodnota | Klíč / cesta                                 |
|----------------|----------------------------------------------|
| Proud          | E_ENERGY_METER.METER_4.CURRENT.MEASUREMENTS  |
| Výkon          | E_ENERGY_METER.METER_4.POWER.MEASUREMENTS    |
| Frekvence      | E_ENERGY_METER.METER_4.FREQUENCY.MEASUREMENTS|
| Energie dovnitř| E_ENERGY_METER.METER_4.ENERGY_IN.MEASUREMENTS|
| Energie ven    | E_ENERGY_METER.METER_4.ENERGY_OUT.MEASUREMENTS|
| Napětí L1      | E_ENERGY_METER.METER_4.VOLTAGE_L1.MEASUREMENTS|
| Napětí L2      | E_ENERGY_METER.METER_4.VOLTAGE_L2.MEASUREMENTS|
| Napětí L3      | E_ENERGY_METER.METER_4.VOLTAGE_L3.MEASUREMENTS|
| Proud L1       | E_ENERGY_METER.METER_4.CURRENT_L1.MEASUREMENTS|
| Proud L2       | E_ENERGY_METER.METER_4.CURRENT_L2.MEASUREMENTS|
| Proud L3       | E_ENERGY_METER.METER_4.CURRENT_L3.MEASUREMENTS|
| Výkon L1       | E_ENERGY_METER.METER_4.POWER_L1.MEASUREMENTS |
| Výkon L2       | E_ENERGY_METER.METER_4.POWER_L2.MEASUREMENTS |
| Výkon L3       | E_ENERGY_METER.METER_4.POWER_L3.MEASUREMENTS |

---
