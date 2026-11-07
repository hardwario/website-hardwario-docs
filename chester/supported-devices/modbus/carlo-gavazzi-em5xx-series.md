---
slug: carlo-gavazzi-em5xx-series
title: Carlo Gavazzi EM5XX Series
---

import Image from '@theme/IdealImage';


[Website](https://www.gavazziautomation.com/en-global/product/EM530DINAV53XS1PFB)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ maxWidth: '376px' }}>
        <Image img={require('./images/carlo-gavazzi-em5xx.png')} alt="Carlo Gavazzi EM530 DIN-rail energy analyzer with LCD showing energy and power readings" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />



### Description

The EM5xx series offers a range of compact and versatile energy analyzers designed for monitoring electrical consumption and quality in **single-phase**, **two-phase**, and **three-phase systems**. These devices are ideal for use in residential, commercial, and industrial environments where accurate measurement, reliability, and ease of use are essential.

:::info

This energy meter **requires** the use of an **external sensor**, such as a current transformer (CT), to measure current. The sensor must be selected based on the expected load and system configuration.

:::

 ---

### Power Installation

#### Example of Installation: Carlo Gavazzi Energy Analyzer EM530

| **Carlo Gavazzi Energy Analyzer EM530** | |
|----------------------------------------|-----------------------------------------------|
| Pin N                                 | **N**                                         |
| Pin 1                                 | **L1**                                         |
| Pin 2                                 | **L2**                                         |
| Pin 3                                 | **L3**                                         |

:::info

 In this case, it is also possible to connect the energy analyzer in single-phase mode, by wiring the neutral (N) to the N terminal and the phase (L) to terminal 1.

:::

#### Connection Diagram (EM530)

![Carlo Gavazzi - EM530 - Connection Diagram](images/cg-em530.png)

 ---
### Sensor Installation

#### Example of Installation: Split Core Current Transformer CTA6X200A5A


| **Carlo Gavazzi Energy Analyzer EM530** | **Split Core Current Transformer CTA6X200A5A** |
|----------------------------------------|-----------------------------------------------|
| Pin 13                                 | **K**                                         |
| Pin 14                                 | **L**                                         |


#### Connection Diagram (CTA6X200A5A)

![Carlo Gavazzi - CTA6X200A5A - Connection Diagram ](images/cta6x200a5a.png)

---

### Modbus Communication

#### Example of Modbus Communication Installation: Carlo Gavazzi Energy Analyzer EM530

| **Carlo Gavazzi Energy Analyzer EM530** | **CHESTER Modbus** |
|---------------------------|--------------------|
| Pin 9                     | Pin 6 (A−)      |
| Pin 8                     | Pin 7 (B+)        |
| Pin 10                    | Pin 1 (GND)        |

#### Modbus communication (EM530)

![Carlo Gavazzi - EM530 - Modbus communication](images/cg-em530-modbus.png)

---

### Browsing and Configuration Buttons

* `▲` **Up button**
    1. Navigation through the menu
    2. Increasing the value

* `▼` **Down button**
    1. Navigation through the menu
    2. Decreasing the value

* `⯀` **Select / Enter / Menu button**


---

### Modbus Communication Configuration for Energy Analyzer

1. Press the **Select** button to open the menu.  
2. Use the **Select** button to choose the **Setting** option.  
3. Use the **Up/Down** buttons to select the menu item: `r5485`.  
4. Enter the configuration values according to the table below.

#### Default Modbus Communication Configuration

| Address | Baud Rate | Parity | Stop Bit |
|---------|-----------|--------|-----------|
| 1       | 9.6k      | None   | 1         |

---

### Modbus Communication Configuration for CHESTER

Use the following commands to configure communication parameters via CHESTER Terminal:


```
app config serial-mode modbus
app config serial-baudrate 9600
app config serial-parity none
app config serial-stop-bits 1
app config device-0 "em5xx,1"
config save
```

The commands are for the RS-485 variant of the [**CHESTER Serial**](../../firmware/chester-serial/index.md) firmware. `device-0` is the first device slot; `em5xx,1` is the device type and the Modbus address of the meter. The serial settings must match the meter. `config save` stores the configuration and restarts the device. More in [**Device Slots**](../../firmware/chester-serial/index.md#device-slots).

---

### CT Ratio Configuration

1. Press the **Select** button to open the menu.  
2. Use the **Select** button to choose the **Reset** option.  
3. Use the **Up/Down** buttons to navigate to the menu item **MID res**.  
4. Press **Start**.  
5. Enter the CT ratio values.  
6. Confirm the settings by selecting **YES** using the **Up** button, then press the **Select** button.

:::warning
These models are **MID-certified meters** (Measuring Instruments Directive, the EU legal metrology standard).  
The CT ratio can be changed **only before** the device registers **1 kWh** of active energy.  
After exceeding 1 kWh, the CT ratio becomes **permanently locked** and **cannot be modified**, even with a factory reset or MID reset.  
:::

### Example of CT Ratio Selection

**Carlo Gavazzi Split Core Current Transformer CTA6X200A5A**

| Model       | CT Ratio          |
|-------------|-------------------|
| CTA6X200A5A | 40 *(200:5 → 40)* |

:::info

 The CT ratio is selected based on the maximum expected primary current. For example, if the system's maximum current is around 200 A, a 200:5 CT (40 CT) is chosen to step this down to 5 A for measurement devices.

:::

### Measured values

In each report the meter is one entry in the `devices` list, with `type_name` `em5xx`. Every sample taken since the previous report is one entry in its `data` list, with these keys:

| Measured Value | Key |
| :--- | :--- |
| Voltage L1, L2, L3 | `devices[].data[].voltage_l1`, `voltage_l2`, `voltage_l3` |
| Current L1, L2, L3 | `devices[].data[].current_l1`, `current_l2`, `current_l3` |
| Neutral current | `devices[].data[].current` |
| Active power L1, L2, L3 | `devices[].data[].power_l1`, `power_l2`, `power_l3` |
| Total active power | `devices[].data[].power` |
| Total apparent power | `devices[].data[].power_apparent` |
| Total reactive power | `devices[].data[].power_reactive` |
| Total power factor | `devices[].data[].power_factor` |
| Power factor L1, L2, L3 | `devices[].data[].power_factor_l1`, `power_factor_l2`, `power_factor_l3` |
| Frequency | `devices[].data[].frequency` |
| Imported active energy | `devices[].data[].energy_in` |
| Exported active energy | `devices[].data[].energy_out` |

Units, ranges and resolution of every key are on the [**CHESTER Serial**](../../catalog-applications/chester-serial/index.md#carlo-gavazzi-em5xx) catalog page.

---

