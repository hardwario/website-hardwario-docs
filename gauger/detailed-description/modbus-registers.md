---
slug: modbus-registers
title: Modbus Registers
---

# Modbus Registers

The counted data can be read out from the device through Modbus TCP. There are twelve holding registers in total. Two of them count each channel: one holds the number of activations, the other one the number of deactivations. A further register per channel holds the current state of the input.

| Address | Reading function | Description                              |
| :------ | :--------------- | :--------------------------------------- |
| 45301   | FC03             | Number of activations of the 1st input   |
| 45302   | FC03             | Number of activations of the 2nd input   |
| 45303   | FC03             | Number of activations of the 3rd input   |
| 45304   | FC03             | Number of activations of the 4th input   |
| 45305   | FC03             | Number of deactivations of the 1st input |
| 45306   | FC03             | Number of deactivations of the 2nd input |
| 45307   | FC03             | Number of deactivations of the 3rd input |
| 45308   | FC03             | Number of deactivations of the 4th input |
| 45309   | FC03             | State of the 1st input                   |
| 45310   | FC03             | State of the 2nd input                   |
| 45311   | FC03             | State of the 3rd input                   |
| 45312   | FC03             | State of the 4th input                   |
