---
slug: lora-at-commands
title: LoRa AT Commands Configuration
---
import Image from '@theme/IdealImage';

This document describes how to configure HARDWARIO TOWER LoRa devices with AT commands over a USB virtual serial port.

:::info

This document does not explain project-specific firmware commands and functions. They are explained in the project itself.

These commands apply to all firmware in the [**HARDWARIO Playground**](../desktop-programming/about-playground.md) with the prefix `twr-lora-`.

:::

## LoRa Configuration

The LoRa module can be configured with **AT commands** sent to the [**Core Module**](../hardware-modules/about-core-module.md) over a USB virtual serial port.

:::tip

The easiest way to configure the LoRa Module is with our [**HARDWARIO Console**](../firmware-development/hardwario-tower-console.md) which is a part of the [**HARDWARIO Code**](../firmware-development/about-hardwario-code.md).

:::

You can also use a terminal emulator application such as [**Hterm**](http://der-hammer.info/pages/terminal.html), [**Putty**](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html), [**Picocom**](https://pkgs.org/download/picocom).

Parameters for the configuration are:
- Baud **115200**
- **8 data bits, 1 stop bit, no parity** (8N1)
- `CR+LF` as the **end-of-line** sequence for both transmit and receive

## About AT Commands

To list all possible commands use `AT$HELP`. The set of supported commands will depend on your firmware version.

<details>
<summary>
<b>
AT$HELP Example Output
</b>
</summary>

```showLineNumbers
AT$HELP
AT$DEVEUI
AT$DEVADDR
AT$NWKSKEY
AT$APPSKEY
AT$APPKEY
AT$APPEUI
AT$BAND 0:AS923, 1:AU915, 5:EU868, 6:KR920, 7:IN865, 8:US915
AT$MODE 0:ABP, 1:OTAA
AT$NWK Network type 0:private, 1:public
AT$ADR Automatic data rate 0:disabled, 1:enabled
AT$DR Data rate 0-15
AT$REPU Repeat of unconfirmed transmissions 1-15
AT$REPC Repeat of confirmed transmissions 1-8
AT$JOIN Send OTAA Join packet
AT$FRMCNT Get frame counters
AT$LNCHECK MAC Link Check
AT$RFQ Get RSSI/SNR of last RX packet
AT$DEBUG Show debug UART communication
AT$REBOOT Firmware reboot
AT$FRESET LoRa Module factory reset
AT$SEND Immediately send packet
AT$STATUS Show status
AT$BLINK LED blink 3 times
AT$LED LED on/off
AT+CLAC List all available AT commands
AT$HELP This help
```

</details>

### Read Value

To read the value of a variable, you just have to append the question mark `?` to the end of the **corresponding AT command**

```
AT$APPSKEY?
```

The current value of the variable will be shown in the terminal

```
APPSKEY: BF22C15EB89237A65DAABB05B2C91EB4
```

### Update Value

To update the value of the variable use the following syntax of a variable followed by `=` and the desired value

```
AT$APPSKEY=BF22C15EB89237A65DAABB05B2C91EB4
```

:::tip

You can use [**online key generators**](https://loratools.nl/#/keys) for testing purposes.

:::

## OTAA - Over-the-Air Activation

OTAA means that the session keys (the ones with **S** in the name) are generated in the LoRa network during **JOIN**. The keys are then automatically transferred to your LoRa module.

:::info

If your LoRa network does not support the OTAA activation method, **read the ABP section below**. If you are not sure which activation type to use, start with OTAA.

:::

For the OTAA activation method, the LoRa network needs to know the DevEUI of your LoRa module. You can read the value with the command `AT$DEVEUI?`, you should get back something like this

```
$DEVEUI: 009335FF931FEADC
OK
```

The LoRa network also needs to know the `APPKEY` and `APPEUI` values. You can either read the values from your LoRa module and transfer them into your LoRa network, or you can let the LoRa network generate new values for you to set in your module, for example:

```
AT$APPEUI=324502A5676BADD7
OK
AT$APPKEY=44D4A5DA7A9507F036C5A2750211F052
OK
```

:::note

Each time you get an `OK`, the value has been saved in the LoRa module’s internal flash memory.

:::

:::info

Some LoRa networks also support generating `DEVEUI` but we do not recommend changing this value.

:::

Finally, switch the modem into **OTAA** mode and send a **JOIN** command to exchange the session keys. Make sure your modem has a good signal because it needs **bidirectional communication** with the gateway to complete the **JOIN**.

```
AT$MODE=1  // Set OTAA(1)
OK
AT$NWK=1   // Public(1) or private(0) network config (TTN is public)
OK
AT$JOIN
OK
$JOIN_OK
```

:::info

Note that the **OK** response to **JOIN** command does not mean that the join was successful. Wait for a few seconds to get either `$JOIN_OK` (join was successful) or `$JOIN_ERROR` (join failed). If the join was successful, the LoRa module is ready to communicate.

:::

## ABP - Activation by Personalization

**ABP** means that you set up session keys manually. `AT$MODE` has to be **set to 0 (ABP)**, which is the default setting after a LoRa module power reset.

If you use the ABP mode, you need to set the `APPSKEY` and `NWKSKEY` values manually via the corresponding AT commands.

```
AT$APPSKEY=5505CA3E4620843B324502A5676BADD7
OK
AT$NWKSKEY=44D4A5DA7A9507F036C5A2750211F050
OK
```

:::note

Each time you get an `OK`, the value has been saved in the LoRa module’s internal flash memory.

:::

The LoRa network will need to know the `DEVEUI` and `DEVADDR` values from your LoRa module.
Use the commands `AT$DEVEUI?` and `AT$DEVADDR?` to read the values.

```
AT$DEVEUI?
$DEVEUI: 009335FF931FEADC
OK
AT$DEVADDR?
$DEVADDR: 26012C39
OK
```

