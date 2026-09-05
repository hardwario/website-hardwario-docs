---
slug: power-management
title: Power Management
---
import Image from '@theme/IdealImage';

:::caution

This document goes deep into technical details and explains the HARDWARIO TOWER Industrial IoT Kit power management on the hardware level.

:::

The **HARDWARIO TOWER Industrial IoT Kit** has been designed the way to allow the connection of multiple power sources.

For example, this allows the [**Core Module**](../hardware-modules/about-core-module.md) to be powered from a **USB cable** and also have **batteries inserted in the Battery Module** at the same time. HARDWARIO TOWER automatically solves the problem by selecting the **appropriate power sources**.

:::info

  **What does it mean?**

  For example, when an external power supply (adapter or USB) is connected, the **battery is disconnected**. It is also possible to have **multiple external sources connected** at the same time, for example the **adapter plugged into the Power Module** and the **USB cable in the Core Module**.

  In this case, the module that is located in the **physically lower layer** will take priority and will be the one **that will deliver power** to the system.

:::

## Power Management Explanation

The **TOWER** header has two signals for system power distribution:

- **VDD**: Positive supply rail
  - 3.1 V when powering from batteries
  - 3.3 V from the external power supply
- **GND**: Ground (negative rail)

The module that can deliver power in the system is called the **energizer**. The energy is supplied either using an **external power supply**, or **batteries**.

:::note

  In both cases, an **energizer** contains the electronic circuit for **intelligent power management**.

:::

This additional electronics circuit controls (or is controlled by) **two auxiliary signals on the TOWER header**:

#### Signal BAT_OFF

This signal disconnects the batteries and prevents their discharging when another power source is available and the batteries are not needed.

#### Signal VDD_OFF

This signal is physically split into two parts:

- Signal **VDD_OFF_IN**
  - This signal is on the **bottom side of the module (the side with the pins)** and it disconnects the power supply output of the given module.
  - Each **power source module** (except the battery) uses **VDD_OFF_IN** from **the bottom side**, telling it to disconnect power as there is another active power source (logic ***1*** = **disconnect** power),

- Signal **VDD_OFF_OUT**
  - This signal is on the **top side of the module (the side with the sockets)** and it is chained to the **VDD_OFF_IN** signal of the module above the given one.
  - Each **power source module** (except the battery) provides a **VDD_OFF_OUT** signal on **the top side** of the module, indicating to other modules **it does provide power**.

## Connection Example

Possible power source modules at this moment are **Power Module** and **Core Module (when connected to USB)**. If stacked, the **lowest one** takes priority and by this logic, there are **two possibilities**:

- **Core Module on top of Power Module**, TOWER is **powered from Power Module**
- **Core Module below Power Module**, TOWER is **powered from USB (speaking about 3.3V VDD)**

:::caution

You should be wary of this, in case you are trying to build a device that includes for example the [**Smart LED Strip**](./how-to/smart-led-strip.md). The device will not work as expected if you put **Core Module below the Power Module**.

:::

## Circuits Examples

:::info

This is an example of the electronic circuit of the **battery energizer**.

:::

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('./images/energizer-circuit-battery.png')} alt="Battery energizer schematic: four AAA cells into a TPS62745 step-down at 3.1 V with load disconnect" /></div>
    </div>
    <div class="col col--2">
      <p>
      </p>
    </div>
  </div>
</div>
<br />

:::info

  This is an example of the electronics circuit of the energizer powered by an **external power supply**.

:::

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('./images/energizer-circuit-external.png')} alt="External-supply energizer schematic: USB 5 V through diodes into a TLV73333 regulator with VDD_OFF and BAT_OFF" /></div>
    </div>
    <div class="col col--2">
      <p>
      </p>
    </div>
  </div>
</div>
