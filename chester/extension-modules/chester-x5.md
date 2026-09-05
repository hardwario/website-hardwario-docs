---
slug: chester-x5
title: CHESTER-X5 (2-ch isol 50V input)
description: Two-channel isolated voltage-input extension module for the CHESTER platform. Each channel measures ±50 V through a reinforced isolated amplifier (AMC3330) and a 24-bit ADS122C04 I²C ADC.
keywords: [CHESTER-X5, isolated input, isolated voltage measurement, 50V, AMC3330, ADS122C04, 24-bit ADC, reinforced isolation, I2C, galvanic isolation, CHESTER]
---
import Image from '@theme/IdealImage';

# CHESTER-X5

The **CHESTER-X5** is a **2-channel isolated voltage-input** extension module for the CHESTER platform.

<div class="container">
<div class="row">
<div class="col col--4">
<div><Image img={require('./images/chester-x5-top.png')} alt="Top view of the CHESTER-X5 board showing the two AMC3330 isolated amplifiers and the ADS122C04 ADC"/></div>
</div>
<div class="col col--10">
</div>
</div>
</div>

## Module Overview

CHESTER-X5 provides **two isolated voltage inputs**, each measuring **−50 V to +50 V**. Each channel uses a reinforced isolated amplifier (**AMC3330**) with an integrated isolated DC-DC converter, so the input is **galvanically isolated** from the CHESTER electronics and from the other channel. A precision 0.1% resistor divider scales the ±50 V input to the amplifier, and its differential output is digitized by a shared 24-bit **ADS122C04** I²C ADC, channel 1 on AIN0/AIN1 and channel 2 on AIN2/AIN3.

Each channel's isolated amplifier is powered through its own load switch (**TPS22917**), so firmware can enable the channels independently and keep them off when idle to save energy. The ADC signals new samples on its data-ready line, which is routed to the slot's GP0 pin.

## Key Features

* **Two Isolated Inputs:** Two independent voltage channels, each with reinforced galvanic isolation.
* **±50 V Range:** Each channel measures −50 V to +50 V.
* **Precision Acquisition:** AMC3330 isolated amplifiers with 0.1% input dividers and a 24-bit ADS122C04 ADC.
* **I²C Interface:** The ADC is read over I²C; data-ready is signalled on GP0/A0.
* **Per-Channel Power Switching:** Each channel is powered through its own load switch (enabled via GP2 for channel 1, GP1 for channel 2) for low-power operation.

## Typical Applications

* **Isolated Voltage Measurement:** Measuring voltages that must be galvanically separated from the logic.
* **Floating / High-Side Voltages:** Measuring signals that are not referenced to the system ground.
* **Battery & Cell Monitoring:** Monitoring battery, cell, or module voltages.
* **Industrial Signal Measurement:** Industrial voltages where isolation is required for safety or accuracy.
* **Ground-Loop-Free Measurement:** Avoiding ground loops between the measured circuit and the CHESTER node.

## Technical Specifications

| Parameter | Value |
| :--- | :--- |
| **Module Type** | 2-channel isolated voltage input |
| **Channels** | 2 (independent), reinforced galvanic isolation |
| **Input Range** | −50 V to +50 V per channel |
| **Isolated Amplifier** | AMC3330DWE (integrated isolated DC-DC), one per channel |
| **ADC** | ADS122C04 (24-bit, 4-channel, I²C) |
| **Channel Mapping** | Ch1 → AIN0/AIN1, Ch2 → AIN2/AIN3 |
| **Host Interface** | I²C; data-ready (DRDY) on GP0/A0 |
| **I²C Address** | 0x40 (default); 0x41 via solder bridge S1 |
| **Channel Power Enable** | GP2/A2 (channel 1), GP1/A1 (channel 2) |
| **Logic Supply (VDD)** | 3.0 V |
| **Board Interface** | Castellated holes on two opposite edges, soldered to the CHESTER mainboard |
| **Hardware Revision** | R2.1 |

## Key Components

| Component | Part Number | Description |
| :--- | :--- | :--- |
| **Isolated Amplifier (×2)** | AMC3330DWE | Reinforced isolated amplifier with integrated isolated DC-DC; one per channel |
| **ADC** | ADS122C04IPW | 24-bit 4-channel I²C ADC digitizing both channels |
| **Load Switch (×2)** | TPS22917DBV | Per-channel power switch for the isolated amplifiers |

## Pin Configuration

The module uses a standardized header layout compatible with CHESTER extension slots.

:::note
The pin configuration shown is for the CHESTER-M CGLS mainboard.
:::

### CHESTER-X5 Connector Pinout

![CHESTER-X5 terminal block pinout: INP1 on pin 2, INM1 on pin 3, INM2 on pin 6, INP2 on pin 7; pins 1, 4, 5, 8 do not connect](images/tb-chester-x5.png)

| Pin | Signal | Type | Description |
| :---: | :--- | :--- | :--- |
| 1 | DNC | — | Do not connect (isolation spacing) |
| 2 | INP1 | Isolated Input | Channel 1 positive input |
| 3 | INM1 | Isolated Input | Channel 1 negative input |
| 4 | DNC | — | Do not connect (isolation spacing) |
| 5 | DNC | — | Do not connect (isolation spacing) |
| 6 | INM2 | Isolated Input | Channel 2 negative input |
| 7 | INP2 | Isolated Input | Channel 2 positive input |
| 8 | DNC | — | Do not connect (isolation spacing) |

:::info
Each channel measures **−50 V to +50 V** and is **galvanically isolated** from the CHESTER electronics and from the other channel. The **DNC** pins (1, 4, 5, 8) have nothing connected. Leave them unconnected; they provide spacing that preserves the isolation between the channels and the logic side.
:::

### Host Interface (I²C)

CHESTER-X5 is read over the standard **I²C** bus through the on-board **ADS122C04** ADC, which digitizes both isolated channels (channel 1 on AIN0/AIN1, channel 2 on AIN2/AIN3). The slot pins are used as follows:

| CHESTER-X pin | Direction | Function |
| :--- | :--- | :--- |
| SDA / SCL | I²C | ADS122C04 communication |
| GP0 / A0 | Input | ADS122C04 data-ready (DRDY) |
| GP1 / A1 | Output | Enables channel 2 power (load switch) |
| GP2 / A2 | Output | Enables channel 1 power (load switch) |

The ADC's I²C address is **0x40** by default; setting solder bridge **S1** changes it to **0x41**, so two CHESTER-X5 modules can be used on one CHESTER without a conflict. GP3/A3 is not used.

## Input Connection

Connect the voltage source for **channel 1** to **INP1** (pin 2) and **INM1** (pin 3), and for **channel 2** to **INP2** (pin 7) and **INM2** (pin 6).

Because the inputs are galvanically isolated, the measured circuit does **not** need to share a ground with the CHESTER node, and the two channels are isolated from each other. Leave the **DNC** pins (1, 4, 5, 8) unconnected. Enable the channel's power from firmware (channel 1 via GP2, channel 2 via GP1) before taking a measurement.

:::warning
Do not exceed the **−50 V to +50 V** input range on either channel.
:::

### Enclosure Feed-Through

Two options bring the input wiring into the enclosure:

- **Cable gland (default):** route the conductors through a cable gland in the enclosure wall and wire them to the terminal block.
- **Panel-mount connector (on request):** an external connector in the enclosure wall lets the user plug in the cable, with no loose wiring inside. Available on request.

## Compatible CHESTER Configurations

The CHESTER-X5 module can be used with various CHESTER mainboard configurations. Below are examples of compatible setups:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![CHESTER-M CGLS mainboard with D-cell battery, supercapacitors, and A/B terminal blocks](images/chester-x5-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![CHESTER-C4 carrier board, a blue PCB with dual D-cell battery holder and terminal blocks](images/chester-x5-c4.png)

</div>
</div>
</div>

## Schematic Diagrams

The complete schematic (the two AMC3330 isolated input channels, their TPS22917 load switches, and the ADS122C04 ADC) is available as a PDF:

- [Schematic (PDF)](schematics/hio-chester-x5-r2.1.pdf)
- [Interactive CHESTER-X5 browser](pathname:///download/ibom/hio-chester-x5-r2.1.html)

## Module Drawing

<div style={{ maxWidth: '500px' }}>

![CHESTER-X5 R2.1 board layout drawing with slot signals on top and the isolated input terminals on the bottom](images/pc-chester-x5.png)

</div>
