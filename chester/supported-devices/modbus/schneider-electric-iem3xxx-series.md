---
slug: schneider-electric-iem3xxx-series
title: Schneider Electric iEM3xxx Series
---

import Image from '@theme/IdealImage';

[Website](https://www.se.com/cz/cs/product/A9MEM3255/iem3250-elektrom%C4%9Br-ct-modbus-2-digit%C3%A1ln%C3%AD-vstupy/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ maxWidth: '376px' }}>
        <Image img={require('./images/schneider-electric-iem3000-series.png')} alt="Schneider Electric iEM3255 DIN-rail energy meter with LCD and OK, ESC, arrow buttons" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

### Description

The iEM3200 series consists of compact, DIN-rail mounted energy meters designed for accurate and certified measurement of electrical energy in **single-phase** and **three-phase systems**. These meters are MID-compliant, making them suitable for both fiscal metering and cost allocation applications in residential, commercial, and light industrial installations.

:::info

This energy meter **requires** the use of an **external sensor**, such as a current transformer (CT), to measure current. The sensor must be selected based on the expected load and system configuration.

:::

 ---

### Power Installation

#### Example of Installation: Schneider Electric Energy Analyzer iEM3250

| **Schneider Electric Energy Analyzer iEM3250** | |
|----------------------------------------|-----------------------------------------------|
| Pin V1                                 | **L1**                                         |
| Pin V2                                 | **L2**                                         |
| Pin V3                                 | **L3**                                         |
| Pin Vn                                 | **N**                                         |

:::info

 In this case, it is also possible to connect the energy analyzer in single-phase mode, by wiring the neutral (N) to the Vn terminal and the phase (L) to terminal V1.

:::

---

### Sensor Installation

#### Example of Installation: Carlo Gavazzi AC Current Transformer CTD-1X 100 5A XXX


| **Schneider Electric Energy Analyzer iEM3250** | **Carlo Gavazzi AC Current Transformer CTD-1X 100 5A XXX** |
|----------------------------------------|-----------------------------------------------|
| Pin S1                                 | **S1 (K)**                                         |
| Pin S2                                | **S2 (L)**                                         |

#### Connection Diagram (iEM3250)

![Connection Diagram (iEM3250)](images/connection-diagram-iem3250.png)

---

### Modbus Communication

#### Example of Modbus Communication Installation: Schneider Electric Energy Analyzer iEM3250

| **Schneider Electric Energy Analyzer iEM3250** | **CHESTER Modbus** |
|---------------------------|--------------------|
| Pin D0/-                     | Pin 6 (A−)      |
| Pin D1/+                    | Pin 7 (B+)        |
| Pin 0V                    | Pin 1 (GND)        |

#### Modbus communication (iEM3250)

![Modbus communication (iEM3250)](images/modbus-communication-iem3250.png)

---

### Browsing and Configuration

* `▼` **Arrow button**
    1. Navigation through the menu
    2. Increasing/Decreasing the value

* `OK` **Select / Enter / Menu button**
  
* `ESC` **Escape button**

---

### Modbus Communication and CT Ratio Configuration for Energy Analyzer

1. Press and hold the `OK` and `ESC` buttons until the password prompt appears.  
2. Enter the password using the `▼` (**Arrow button**) button. (Default password for new meters is `0010`.)  
3. After entering the correct password, the configuration menu will appear.  
4. Use the `▼` (**Arrow button**) button to navigate to the menu item: `Communication – Change?`.  
5. Press the `OK` button to enter communication settings.  
6. Configure the following parameters as needed:  
   • Address  
   • Baud Rate  
   • Parity  
   • Stop Bit   
7. Continue using the `▼` (**Arrow button**) button to scroll to the end of the menu.  
8. At the `Exit Config` option, press the `OK` button to confirm and save the settings.

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
app config device-0 "iem3000,1"
config save
```

The commands are for the RS-485 variant of the [**CHESTER Serial**](../../firmware/chester-serial/index.md) firmware. `device-0` is the first device slot; `iem3000,1` is the device type and the Modbus address of the meter. The serial settings must match the meter. `config save` stores the configuration and restarts the device. More in [**Device Slots**](../../firmware/chester-serial/index.md#device-slots).

---

### Example of CT Ratio Selection

**Carlo Gavazzi AC Current Transformer CTD-1X 100 5A XXX**

| Model       | CT Ratio          |
|-------------|-------------------|
| CTD-1X 100 5A XXX | 20 *(100:5 → 20)* |

:::info

 The CT ratio is selected based on the maximum expected primary current. For example, if the system's maximum current is around 100 A, a 100:5 CT (20 CT) is chosen to step this down to 5 A for measurement devices.

:::

### Measured values

In each report the meter is one entry in the `devices` list, with `type_name` `iem3000`. Every sample taken since the previous report is one entry in its `data` list, with these keys:

| Measured Value | Key |
| :--- | :--- |
| Voltage L1, L2, L3 | `devices[].data[].voltage_l1`, `voltage_l2`, `voltage_l3` |
| Current L1, L2, L3 | `devices[].data[].current_l1`, `current_l2`, `current_l3` |
| Active power L1, L2, L3 | `devices[].data[].power_l1`, `power_l2`, `power_l3` |
| Total active power | `devices[].data[].power` |
| Total apparent power | `devices[].data[].power_apparent` |
| Total reactive power | `devices[].data[].power_reactive` |
| Total power factor (the meter's four-quadrant encoding, −2 to 2) | `devices[].data[].power_factor` |
| Frequency | `devices[].data[].frequency` |
| Imported active energy | `devices[].data[].energy_in` |
| Exported active energy | `devices[].data[].energy_out` |

Units, ranges and resolution of every key are on the [**CHESTER Serial**](../../catalog-applications/chester-serial/index.md#schneider-iem3000) catalog page.


---
