---
slug: schneider-electric-iem3xxx-series
title: Schneider Electric řady iEM3xxx
---

import Image from '@theme/IdealImage';

[Webové stránky](https://www.se.com/cz/cs/product/A9MEM3255/iem3250-elektrom%C4%9Br-ct-modbus-2-digit%C3%A1ln%C3%AD-vstupy/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '376px', height: '376px' }}>
        <Image img={require('../../../../../../chester/supported-devices/modbus/images/schneider-electric-iem3000-series.png')} alt="Elektroměr Schneider Electric iEM3255 na DIN lištu s displejem LCD a tlačítky OK, ESC a se šipkou" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

### Popis {#description}

Řadu iEM3200 tvoří kompaktní elektroměry na DIN lištu pro přesné a certifikované měření elektrické energie v **jednofázových** a **třífázových soustavách**. Splňují směrnici MID, a hodí se proto pro fakturační měření i pro rozúčtování nákladů v bytových, komerčních a lehkých průmyslových instalacích.

:::info

Tento elektroměr **vyžaduje** k měření proudu **externí senzor**, například proudový transformátor (CT). Senzor vyberte podle očekávané zátěže a konfigurace soustavy.

:::

 ---

### Silové zapojení {#power-installation}

#### Příklad zapojení: elektroměr Schneider Electric iEM3250 {#example-of-installation-schneider-electric-energy-analyzer-iem3250}

| **Elektroměr Schneider Electric iEM3250** | |
|----------------------------------------|-----------------------------------------------|
| Pin V1                                 | **L1**                                         |
| Pin V2                                 | **L2**                                         |
| Pin V3                                 | **L3**                                         |
| Pin Vn                                 | **N**                                         |

:::info

 Elektroměr lze zapojit i jednofázově: nulový vodič (N) připojte na svorku Vn a fázi (L) na svorku V1.

:::

---

### Zapojení senzoru {#sensor-installation}

#### Příklad zapojení: proudový transformátor Carlo Gavazzi CTD-1X 100 5A XXX {#example-of-installation-carlo-gavazzi-ac-current-transformer-ctd-1x-100-5a-xxx}


| **Elektroměr Schneider Electric iEM3250** | **Proudový transformátor Carlo Gavazzi CTD-1X 100 5A XXX** |
|----------------------------------------|-----------------------------------------------|
| Pin S1                                 | **S1 (K)**                                         |
| Pin S2                                | **S2 (L)**                                         |

#### Schéma zapojení (iEM3250) {#connection-diagram-iem3250}

![Schéma zapojení elektroměru iEM3250](../../../../../../chester/supported-devices/modbus/images/connection-diagram-iem3250.png)

---

### Komunikace Modbus {#modbus-communication}

#### Příklad zapojení komunikace Modbus: elektroměr Schneider Electric iEM3250 {#example-of-modbus-communication-installation-schneider-electric-energy-analyzer-iem3250}

| **Elektroměr Schneider Electric iEM3250** | **CHESTER Modbus** |
|---------------------------|--------------------|
| Pin D0/-                     | Pin 6 (A−)      |
| Pin D1/+                    | Pin 7 (B+)        |
| Pin 0V                    | Pin 1 (GND)        |

#### Komunikace Modbus (iEM3250) {#modbus-communication-iem3250}

![Zapojení komunikace Modbus elektroměru iEM3250](../../../../../../chester/supported-devices/modbus/images/modbus-communication-iem3250.png)

---

### Ovládání a konfigurace {#browsing-and-configuration}

* `▼` **Tlačítko se šipkou**
    1. Pohyb v menu
    2. Zvýšení nebo snížení hodnoty

* `OK` **Tlačítko Select / Enter / Menu**
  
* `ESC` **Tlačítko Escape**

---

### Konfigurace komunikace Modbus a převodu CT v elektroměru {#modbus-communication-and-ct-ratio-configuration-for-energy-analyzer}

1. Podržte současně tlačítka `OK` a `ESC`, dokud se nezobrazí výzva k zadání hesla.  
2. Tlačítkem `▼` (**tlačítko se šipkou**) zadejte heslo. (Výchozí heslo nových elektroměrů je `0010`.)  
3. Po zadání správného hesla se zobrazí konfigurační menu.  
4. Tlačítkem `▼` (**tlačítko se šipkou**) přejděte na položku `Communication – Change?`.  
5. Tlačítkem `OK` otevřete nastavení komunikace.  
6. Podle potřeby nastavte tyto parametry:  
   • Address  
   • Baud Rate  
   • Parity  
   • Stop Bit   
7. Tlačítkem `▼` (**tlačítko se šipkou**) pokračujte až na konec menu.  
8. U položky `Exit Config` stiskněte tlačítko `OK`; tím nastavení potvrdíte a uložíte.

#### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Adresa  | Přenosová rychlost | Parita | Stop bit |
|---------|-----------|--------|-----------|
| 1       | 9.6k      | Žádná  | 1         |

---

### Konfigurace komunikace Modbus v zařízení CHESTER {#modbus-communication-configuration-for-chester}

Parametry komunikace nastavíte v terminálu CHESTER těmito příkazy:


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

**Proudový transformátor Carlo Gavazzi CTD-1X 100 5A XXX**

| Model       | Převod CT          |
|-------------|-------------------|
| CTD-1X 100 5A XXX | 20 *(100:5 → 20)* |

:::info

 Převod CT volte podle nejvyššího očekávaného primárního proudu. Je-li například maximální proud soustavy kolem 100 A, použijte CT 100:5 (převod 20), který proud pro měřicí přístroje sníží na 5 A.

:::

### Měřené hodnoty {#measured-values}

| Měřená hodnota | Klíč / cesta                                 |
|----------------|----------------------------------------------|
| Proud          | E_ENERGY_METER.METER_4.CURRENT.MEASUREMENTS  |
| Výkon          | E_ENERGY_METER.METER_4.POWER.MEASUREMENTS    |
| Frekvence      | E_ENERGY_METER.METER_4.FREQUENCY.MEASUREMENTS|
| Odebraná energie | E_ENERGY_METER.METER_4.ENERGY_IN.MEASUREMENTS|
| Dodaná energie | E_ENERGY_METER.METER_4.ENERGY_OUT.MEASUREMENTS|
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
