---
slug: samples
title: Samples
description: "Overview of the CHESTER SDK samples for extension modules, sensors, BLE, LTE, LoRaWAN and GNSS; each one is a separate project to build and flash."
---
import Image from '@theme/IdealImage';

# Samples

In the SDK subfolder `samples\`, you find many samples explaining working with different sensors and subsystems. Each sample is a separate project, which you can compile and flash to CHESTER.

| Sample            | Comment                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| accel             | Accelerometer example                                                                                        |
| adc               | Analog to digital converter                                                                                  |
| blinky            | LED blinking                                                                                                 |
| chester_c2        | **CHESTER-C2**                                                                                               |
| chester_k         | **CHESTER-K1** 4-ch diff input                                                                               |
| chester_s1        | **CHESTER-S1** temperature, humidity, pressure, CO2, PIR sensor, button                                      |
| chester_x0        | [**CHESTER-X0**](../extension-modules/chester-x0.md) (4-ch input/output)                                     |
| chester_x2        | [**CHESTER-X2**](../extension-modules/chester-x2.md) (serial communication RS-485 and TTL UART)              |
| chester_x2_loop   | [**CHESTER-X2**](../extension-modules/chester-x2.md) TX/RX loop example                                      |
| chester_x3        | [**CHESTER-X3**](../extension-modules/chester-x3.md) (Precision ADC, RTD, PT1000, strain gauge)              |
| chester_x4        | [**CHESTER-X4**](../extension-modules/chester-x4.md) Step-down DC/DC with ADC and 4 power outputs            |
| chester_x7        | [**CHESTER-X7**](../extension-modules/chester-x7.md) Single channel diff input                               |
| chester_z         | **CHESTER-Z1** Rechargeable battery backup module with DC/DC converter and charger                           |
| ctr_barometer_tag | Barometer Tag support from TOWER Kit                                                                         |
| ctr_batt          | Measure **CHESTER-M** battery voltage at a rest or load                                                      |
| ctr_ble           | BLE advertising                                                                                              |
| ctr_ble_scan      | BLE scanner                                                                                                  |
| ctr_buf           | Using `ctr_buf` to pack numbers, strings and data to a binary structure                                      |
| ctr_edge          | Pin interrupts                                                                                               |
| ctr_edge_x0       | Pin interrupts on [**CHESTER-X0**](../extension-modules/chester-x0.md)                                       |
| ctr_info          | Read device information from PIB block (serial number, variant,...)                                          |
| ctr_lte_if_v2     | Example of using LTE_v2 library                                                                              |
| ctr_machine_probe | Read **Machine Probe** temperature, humidity, illuminance, magnetometer and accelerometer                    |
| ctr_meteo         | Read wind speed, direction and rainfall from meteo station                                                   |
| ctr_soil_sensor   | Read moisture and temperature from **Soil Sensor**                                                           |
| ds18b20           | Read temperature from multiple 1-Wire DS18B20 temperature sensors                                            |
| ds2484            |                                                                                                              |
| expander          | TCA9534A GPIO expander example                                                                               |
| gnss              | GNSS example to get location data                                                                            |
| gpio              | Write to GPIO pins                                                                                           |
| hygro             | Reading temperature and humidity from CHESTER-S2 hygro sensor                                                |
| i2c_master        | I2C master communication example                                                                             |
| i2c_slave         | I2C slave communication example                                                                              |
| lrw               | LoRaWAN example                                                                                              |
| lte               | LTE example                                                                                                  |
| lte_cbor          | LTE example with CBOR to JSON encoding                                                                       |
| modbus            | RS-485 Modbus reading example                                                                                |
| opt3001           | OPT3001 luxmeter example reading illuminance                                                                 |
| people_counter    |                                                                                                              |
| pt1000            | RTD temperature reading with [**CHESTER-X3**](../extension-modules/chester-x3.md) and PT1000 sensor          |
| rfmux             | Switching RFMUX between LTE/LoRaWAN and internal/external antenna                                            |
| sensor_pnp_npn    | [**CHESTER-X0**](../extension-modules/chester-x0.md) input pin change detection using `ctr_edge`             |
| sleep             | Low-power example to test idle current consumption                                                           |
| sleep_chester_x2  | Low-power example to test idle current consumption with [**CHESTER-X2**](../extension-modules/chester-x2.md) |
| therm             | Reading temperature from CHESTER-M on-board temperature sensor                                               |
| wdog              | Watchdog example                                                                                             |
| weight_scale      |                                                                                                              |
