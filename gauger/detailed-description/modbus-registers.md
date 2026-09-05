---
slug: modbus-registers
title: Modbus Registers
---

# Modbus Registers

The counted data can be read out from the device through Modbus TCP. There are eight holding registers in total, 2 for each channel. One holds the number of activations of the channel, the other one the number of deactivations.

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
| 45309   | FC03             | State of the 1th input                   |
| 45310   | FC03             | State of the 2th input                   |
| 45311   | FC03             | State of the 3th input                   |
| 45312   | FC03             | State of the 4th input                   |
