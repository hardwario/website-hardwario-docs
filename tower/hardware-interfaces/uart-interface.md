---
slug: uart-interface
title: UART Interface
---
import Image from '@theme/IdealImage';

**UART** or **U**niversal **A**synchronous **R**eceiver-**T**ransmitter is an asynchronous communication interface used mostly to transfer serial data between devices. It uses only two channels **RX** (receiver) and **TX** (transmitter) to send data, you don't need to connect any clock signal.

:::info

To read more about UART Interface usage with TOWER you can read the [**How To: UART Interface Chapter**](../firmware-sdk/how-to/uart-interface.md) or the [**Debugging chapter**](../firmware-development/firmware-debugging.md).

:::

:::tip

If you want to know more about [**UART there is an article about it**](https://www.analog.com/en/analog-dialogue/articles/uart-a-hardware-communication-protocol.html).

:::

TOWER has 3 UART channels, **UART0** **UART1** **UART2**, you can read where to find them in the [**Header Pinout chapter**](../hardware-modules/header-pinout.md)

## UART Setup

As the UART channel does not have a clock signal that would synchronize the communication you have to set up both communicating devices so they are synchronized and know how to transmit and receive data.

There are three parameters that you can set up the UART with

- **Baud rate**: this is the speed with which the data will be sent
- **Data Bits**: number of data bits in each packet (5-9 bits)
- **Parity Bits**: you can choose to have Odd, even or none parity
- **Stop Bits**: this determines the end of one packet. It can be 1 or 2 bits

:::tip

You can see a short format of the UART setup configuration. For example, 8 Data Bits, No Parity and 1 Stop Bit can be represented as **8N1**.

:::

:::note

At the start of each packet, there is always one **Start Bit**.

:::

If you set up both devices the same, you will get viable data, if not, you will receive not readable data.

## Logging

A lot of devices use the UART to send the serial data from the device to the computer terminal. This is used to send log messages so the user/developer can read them.

TOWER uses UART2 for this, you can use `twr_log_*` SDK API to send the messages over this UART interface to your PC so you can debug while developing your application.

TOWER logging UART parameters

- **Baud Rate**: **115200**
- **8 Data bits**
- **No Parity**
- **1 Stop Bit**

:::tip

You can visit a separate [**Debugging chapter**](../firmware-development/firmware-debugging.md) to learn about how to do that.

:::
