---
slug: chester-x12
title: CHESTER-X12 (RS-232)
description: RS-232 serial-communication extension module for the CHESTER platform, based on the SC16IS740IPW I²C-to-UART bridge and the MAX3226 transceiver, with on-board input-voltage monitoring.
keywords: [CHESTER-X12, RS-232, RS232, serial, SC16IS740IPW, MAX3226, I2C-to-UART, UART bridge, TPS62933, TLA2021, voltage monitoring, CHESTER]
---

# CHESTER-X12

The **CHESTER-X12** is an **RS-232** serial-communication extension module for the CHESTER platform.

<div class="container">
<div class="row">
<div class="col col--4">

![Top view of the red CHESTER-X12 board showing the SC16IS740IPW I²C-to-UART bridge, the MAX3226 RS-232 transceiver, the step-down inductor and crystal, and the ADR address solder bridge](images/chester-x12-top.png)

</div>
<div class="col col--10">
</div>
</div>
</div>

## Module Overview

CHESTER-X12 provides an **RS-232** serial interface. An **SC16IS740IPW** I²C-to-UART bridge connects to the CHESTER mainboard over **I²C**, and a **MAX3226EEUE+** transceiver converts the UART signals to true RS-232 levels with ±15 kV ESD protection. The RS-232 transmit and receive lines are brought out to the terminal block.

The module can run directly from the CHESTER mainboard. Alternatively, an external **5–28 VDC** line on **+VIN** feeds the on-board **TPS62933** step-down converter, whose fixed **5 V** output (**+V**) powers the CHESTER mainboard. Schottky diodes (**PMEG6010ELR**) protect the input. An on-board **TLA2021** ADC, read over I²C, monitors the input voltage.

## Key Features

* **RS-232 Interface:** Full-duplex serial with true RS-232 levels and ±15 kV ESD protection on the I/O pins (MAX3226EEUE+).
* **I²C-to-UART Bridge:** SC16IS740IPW bridges the RS-232 UART to the CHESTER mainboard's I²C bus.
* **Flexible Power:** Runs from the CHESTER mainboard, or from an optional 5–28 VDC line on +VIN via the on-board TPS62933 step-down.
* **Input Protection:** Schottky diodes (PMEG6010ELR) on the power input.
* **Input-Voltage Monitoring:** On-board I²C ADC (TLA2021) measures the input voltage.
* **Low-Power Control:** The RS-232 transceiver can be placed in shutdown via FORCEOFF# for low-power operation.

## Typical Applications

* **Industrial Sensors:** Connection to sensors and controllers through the CHESTER platform.
* **Legacy Equipment:** Integration with existing RS-232 devices.
* **Building Automation:** HVAC systems, lighting control, and metering.
* **Commercial:** Point-of-Sale (POS) terminals and barcode scanners.
* **Utilities:** Serial console access and laboratory equipment interfaces.

## Technical Specifications

| Parameter | Value |
| :--- | :--- |
| **Interface Type** | RS-232 |
| **Protocol** | Full-duplex asynchronous serial |
| **Baud Rate** | Up to 250 kbps (transceiver limit) / 3 Mbps (bridge limit) |
| **Data Bits** | 5, 6, 7, 8 |
| **Stop Bits** | 1, 1.5, 2 |
| **Parity** | None, Even, Odd, Mark, Space |
| **Flow Control** | Software (XON/XOFF) |
| **Host Interface** | I²C |
| **Power Input (+VIN)** | 5–28 VDC (optional external supply) |
| **Power Output (+V)** | Fixed 5 V, powers the CHESTER mainboard |
| **Voltage Monitoring** | On-board 12-bit I²C ADC (TLA2021), measures the input voltage |
| **Connector** | Standard 2.54 mm pitch header (Soldered) |
| **Hardware Revision** | R1.2 |

## Key Components

| Component | Part Number | Description |
| :--- | :--- | :--- |
| **I²C-to-UART Bridge** | SC16IS740IPW | Single UART with I²C interface, 64-byte FIFO |
| **RS-232 Transceiver** | MAX3226EEUE+ | True RS-232 levels, ±15 kV ESD protection |
| **Voltage-Monitoring ADC** | TLA2021 | 12-bit I²C ADC (address 0x49); measures the input voltage |
| **DC-DC Converter** | TPS62933 | Step-down converter, 5–28 VDC input, 5 V output |
| **Input Protection** | PMEG6010ELR | Schottky barrier diodes for input protection |

## Pin Configuration

The module uses a standardized header layout compatible with CHESTER extension slots.

:::note
The pin configuration shown is for the CHESTER-M CGLS mainboard.
:::

### CHESTER-X12 Connector Pinout

![CHESTER-X12 terminal block pinout](images/tb-chester-x12.png)

| Pin | Signal | Type | Description |
| :---: | :--- | :--- | :--- |
| 1 | +VIN | Power Input | Optional external DC input to the on-board step-down (5–28 VDC) |
| 2 | GND | Ground | System ground reference |
| 3 | +V | Power Output | Fixed 5 V from the on-board step-down (powers the CHESTER mainboard) |
| 4 | GND | Ground | System ground reference |
| 5 | RS232 TX | RS-232 | RS-232 transmit data (module output) |
| 6 | RS232 RX | RS-232 | RS-232 receive data (module input) |
| 7 | VDD | Power | 3.3 V logic supply from the CHESTER mainboard |
| 8 | GND | Ground | System ground reference |

:::info
The module can run directly from the CHESTER mainboard. When an external **5–28 VDC** supply is connected to **+VIN** (Pin 1), the on-board TPS62933 step-down converter produces a fixed **5 V** on **+V** (Pin 3), which powers the CHESTER mainboard.
:::

:::warning ESD Protection Modification Required
The RS-232 transceiver uses negative voltage levels. CHESTER must have modified ESD protection on inputs for signals **A3** and **A4** on **slot A**, or **B3** and **B4** on **slot B**. The standard unidirectional TVS diodes (**SMA6J28A**) must be replaced with bidirectional ones (**SMA6J28CA**). If ESD protection is not required, these diodes can be removed.

<div style={{ maxWidth: '500px' }}>

![TVS Diodes Location](images/chester-x12-tvs-modification.png)

</div>
:::

### Host Interface (I²C)

CHESTER-X12 communicates with the CHESTER mainboard over the standard **I²C** bus. Two devices sit on the bus: the **SC16IS740IPW** UART bridge and a **TLA2021** voltage-monitoring ADC.

The UART bridge address is selected by the on-board solder bridge **S1** (silkscreen **ADR**): **0x54** in **slot A** and **0x55** in **slot B**. When the module is supplied as part of a complete CHESTER unit, this address is set at the factory; a standalone module must have its address set by the user. The TLA2021 ADC sits at address **0x49**.

Besides SDA/SCL, the module uses the slot's GP pins:

| CHESTER-X pin | Signal | Source / function |
| :--- | :--- | :--- |
| GP0 / A0 | INVALID# | MAX3226EEUE+ — RS-232 receiver level-valid indicator |
| GP1 / A1 | ADC_EN | Enables the TLA2021 input-voltage measurement |
| GP2 / A2 | IRQ | SC16IS740IPW UART interrupt |
| GP3 / A3 | FORCEOFF# | MAX3226EEUE+ shutdown (low-power) control |

The transceiver's FORCEON input is tied high, so firmware can place the RS-232 transceiver into a low-power shutdown state by asserting **FORCEOFF#** (GP3/A3).

## RS-232 Connection

Wire the serial device to the terminal block: **RS232 TX** (Pin 5), **RS232 RX** (Pin 6), and a common **GND** (Pin 2, 4, or 8). Only the transmit and receive data lines are brought out — no hardware handshaking (RTS/CTS) lines are available on the connector.

The RS-232 interface is **not galvanically isolated**, so the serial device and the CHESTER node must share a common ground reference.

### Enclosure Feed-Through

Two options bring the serial cable into the enclosure:

- **Cable gland (default):** route the RS-232 conductors through a cable gland in the enclosure wall and wire them to the terminal block.
- **Panel-mount connector (on request):** an external connector in the enclosure wall lets the user plug in the serial cable, with no loose wiring inside. Available on request.

## Compatible CHESTER Configurations

The CHESTER-X12 module can be used with various CHESTER mainboard configurations. Below are examples of compatible setups:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![CHESTER-M CGLS mainboard with D-cell battery, supercapacitors, and A/B terminal blocks](images/chester-x12-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![CHESTER-C4 carrier board, a blue PCB with dual D-cell battery holder and terminal blocks](images/chester-x12-c4.png)

</div>
</div>
</div>

## CHESTER SDK usage

CHESTER-X12 can be used as part of the CHESTER SDK using the `ctr_x12_a` and `ctr_x12_b` shields, or `hardware-chester-x12-a` and `hardware-chester-x12-b` [Project Generator](/chester/firmware-sdk/how-to-project-generator) features.

- [Example SDK usage](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x12_loop)

## Schematic Diagrams

The following diagrams show the internal wiring of the module across its three sheets: the main page, the interface, and the power supply.

- [Schematic (PDF)](schematics/hio-chester-x12-r1.2.pdf)
- [Interactive PCB connector, part, testpoint and signal browser](pathname:///download/ibom/hio-chester-x12-r1.2.html)

### Main Page

![CHESTER-X12 main-page schematic: the CHESTER-X module connector mapping the terminal-block signals (+VIN, GND, +V, RS232 TX/RX, VDD) and the GP pins GP0-GP3 (INVALID#, ADC_EN, UART IRQ, FORCEOFF#)](images/hio-chester-x12-r1.2-1.png)

### Interface

![CHESTER-X12 interface schematic: SC16IS740IPW I²C-to-UART bridge with 14.7456 MHz crystal (I²C address 0x54/0x55) and the MAX3226EEUE+ RS-232 transceiver](images/hio-chester-x12-r1.2-2.png)

### Power

![CHESTER-X12 power schematic: TPS62933 step-down converter (5 V output) with PMEG6010ELR Schottky diodes and the TLA2021 input-voltage-monitoring ADC](images/hio-chester-x12-r1.2-3.png)

## Module Drawing

<div style={{ maxWidth: '500px' }}>

![CHESTER-X12 board layout drawing with component placement and edge pin labels](images/pc-chester-x12.png)

</div>
