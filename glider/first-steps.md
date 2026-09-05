---
slug: first-steps
title: Quick Start Guide
---
import Image from '@theme/IdealImage';

# GLIDER Quick Start Guide

Thank you for choosing the GLIDER device.

Follow these steps to set it up and start viewing your live data in **HARDWARIO Cloud**.

---

## Step 1: Create a HARDWARIO Cloud Account

1. Go to [**https://hardwario.cloud**](https://hardwario.cloud)
2. Click **SIGN UP**
3. Create an account using:
 - **Google** or **Microsoft** account
 - **Email and password** (don't forget to verify your email)
4. Once verified, **log in**.

:::info
For improved security, we recommend authenticating via **Google** or **Microsoft**, as these identity providers use verified credentials and **advanced account protection** mechanisms.
:::

---

## Step 2: Create Your Space

1. In the top-right corner, click **SPACES → NEW SPACE**
2. Name your space (for example: `my-home`, `office-sensors`, `warehouse`)
3. This is where your **GLIDER devices** will live.

:::caution
Please follow our [**Naming Conventions**](https://docs.hardwario.com/cloud/#naming-conventions) when creating your space.
:::

---

## Step 3: Add a Device

1. Select your **Space**
2. Go to **DEVICES → +NEW DEVICE**
3. Enter the information about your **GLIDER**: you can choose one of the following options:

 **Option 1: Scan the QR Code**
 Use the **`SCAN DEVICE`** feature in the HARDWARIO Cloud to **scan the QR code** on your GLIDER, and all the **information** will be **filled in automatically**!

 **Option 2: Manually**
 You can add a device manually by filling in the following fields:
 - **Name**
 - **Serial Number (SN)**
 - **Claim Token**

:::info
The **Claim Token** and **Serial Number** are unique for each device. You can obtain them by **scanning the QR code** on the device with any QR code reader, by running **`AT$INFO?`** through the [**USB-C AT console**](console/usb-at.md), or by running **`info show`** through the [**J-Link RTT console**](console/rtt-jlink.md).
:::

4. Save it: your GLIDER is now **registered in the Cloud**!

:::tip
**Need more details?**
You can find more in-depth information about the **HARDWARIO Cloud** here:
 [https://docs.hardwario.com/cloud/](https://docs.hardwario.com/cloud/)
:::

---

## Step 4: Power Up Your GLIDER

:::caution
> **Important:** Add the device to the Cloud **before powering it up.**
> Otherwise, it might take longer (up to several hours) to connect.
:::

1. Insert your **nano-SIM card** (unless the device shipped pre-provisioned).
2. Screw the **LTE antenna** firmly onto the SMA connector.
3. Connect the device to its power source. GLIDER will boot and start scanning for a cellular network.
4. Wait a few minutes for the first uplink to arrive in HARDWARIO Cloud.

:::info
GLIDER does **not** signal cloud connectivity through the LEDs. The fastest way to confirm that the device is online is to look at **Show device messages** in HARDWARIO Cloud (see [Step 6](#step-6-see-your-data-in-the-cloud)), or to attach the [**RTT Console (J-Link)**](console/rtt-jlink.md) and read the modem log directly.
:::

If the device does not come online, try one of these quick actions:

- **Press the button four times** to reboot the device.
- **Remove and reconnect power.**
- Move the device closer to a window or open space to improve cellular reception.

---

#### Network Mode & Connectivity Troubleshooting

If your device still has trouble connecting to the network (especially when using your own SIM card or roaming):

* **Check Network Mode:** GLIDER ships with **LTE band 8** and **LTE band 20** enabled by default (Europe). For deployments outside the EU you may need to enable other bands.
* **Verify APN/PLMN:** If you are using a non-default SIM, configure the APN through the AT console.
* **Read the modem logs:** Attach the [**RTT Console (J-Link)**](console/rtt-jlink.md). The modem prints every attach attempt, signal level and APN negotiation directly to the log.

---

## Step 5: Check the Status LED

GLIDER has three on-board status LEDs (red, green, yellow). Their behaviour is intentionally minimal to save power:

- Every **5 seconds** the firmware emits a brief **30 ms pulse**:
    - **Green pulse** when no alarm rule is currently active.
    - **Red pulse** when at least one alarm rule is currently active.
- After a button click is recognized, the **yellow LED** blinks **once per detected click** (50 ms on, 200 ms off). For example a triple-click produces three short yellow blinks before the corresponding action runs.
- During boot, none of the LEDs are driven.

:::caution
The 30 ms pulse is a quick flicker, not a steady blink, and in bright ambient light it can be easy to miss. The LEDs report **alarm state only**. They do not indicate cellular attach or cloud connectivity. Use the cloud dashboard or one of the consoles to verify the device is online.
:::

:::info
You can also manually toggle the LEDs from any console via the `led` shell command, see [**Shell Commands**](commands/shell-commands.md).
:::

---

## Step 6: See Your Data in the Cloud

1. In [**HARDWARIO Cloud**](https://hardwario.cloud), open **DEVICES**
2. Click the **chat icon** next to your device
3. You'll see **messages and live data** sent from GLIDER

By default GLIDER samples sensors every **60 seconds** and sends a payload every **300 seconds (5 minutes)**. To force an immediate uplink:

- **AT console (USB-C):** `AT$SHELL="app send"`
- **RTT console (J-Link):** `app send`

For an explanation of the payload structure, see [**CBOR Payload**](payload.md).

---

## Step 7: Configure Your Device

Once connected, you can:

- Use the [**USB-C AT Console**](console/usb-at.md), recommended for day-to-day provisioning
- Use the [**J-Link RTT Console**](console/rtt-jlink.md), which gives full developer access with logs and the Zephyr shell

Common configuration tasks:

| Setting | How to change it |
| :--- | :--- |
| Sample interval (default 60 s) | `app config interval-sample <seconds>` |
| Send interval (default 300 s) | `app config interval-send <seconds>` |
| Bind a DS18B20 to a slot | `therm scan --save` (auto-detect) |
| Enable digital input CH1 | `inputs config 1-mode counter` |
| Configure a temperature alarm | `alarm config 1-enabled true`, `alarm config 1-threshold 30` |

After making changes, save them to flash and reboot:

```text
AT&W
```

For the full reference, see [**Configuration**](configuration.md) and the [**Shell Commands**](commands/shell-commands.md) page.

---

## Step 8: Check and Update GLIDER Firmware

It's always a good idea to make sure your GLIDER is running the **latest firmware version**.

### Check Firmware Version

You can check it in two ways:

1. **Via USB-C (AT console):**
 ```text
 AT+CGMR
 ```
 …or for a richer info dump:
 ```text
 AT$INFO?
 ```

2. **Via J-Link (Zephyr shell):**
 ```bash
 info show
 ```

### Update Firmware

If a newer version is available, you can update GLIDER in two ways:

1. **Over the AT console (USB-C)**: recommended for production units and field updates. No probe required.
 [**Application over AT (USB-C)**](firmware-flashing/application-over-at.md)

2. **Over J-Link (SWD)**: recommended for development.
 [**Application over J-Link**](firmware-flashing/application-over-j-link.md)

For an overview of both methods see the [**Firmware Flashing**](firmware-flashing/index.md) article.

---

 **That's it!**
Your GLIDER is now connected, configured, and up to date, ready to collect and send data to the cloud.

---

## Step 9: Explore Applications and Integrations

Your GLIDER can do much more than just send data!
You can extend its functionality using [**HARDWARIO Applications**](https://docs.hardwario.com/apps/), ready-made modules and tools that help you:

- **Visualize your data** using dashboards and charts
- **Integrate GLIDER** into existing IoT systems
- **Build automations and analytics** for your specific use case

All applications are easy to deploy and can transform your GLIDER into a complete IoT solution.

:::info
 Learn more and explore available applications here:
[**https://docs.hardwario.com/apps/**](https://docs.hardwario.com/apps/)
:::
