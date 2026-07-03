---
title: HARDWARIO Cloud Setup
sidebar_position: 3
---
import Image from '@theme/IdealImage';

# Connecting GLIDER to HARDWARIO Cloud

GLIDER ships ready to talk to **HARDWARIO Cloud** out of the box. All you need is to register the device in the web UI using two pieces of information that are unique to every unit: the **serial number** and the **claim token**.

:::tip
This page is a focused walk-through of the cloud pairing. For the full end-to-end setup (Cloud account, space, device, power-up, LED check), see the [**Quick Start Guide**](first-steps.md).
:::

## What you will need

- A HARDWARIO Cloud account: [https://cloud.hardwario.com](https://cloud.hardwario.com)
- A GLIDER that is **powered on** and connected to a cellular network
- Access to either the **RTT console** or the **AT console** to read out the credentials

:::info
If you do not have a console set up yet, follow one of these first:

- [**RTT Console (J-Link)**](console/rtt-jlink.md) - for development setups with a J-Link probe.
- [**AT Console (USB-C)**](console/usb-at.md) - recommended for first-time provisioning.
:::

## Step 1 - Read the serial number and claim token

#### Using the RTT console (Zephyr shell)

```text
info show
```

You can also query individual fields:

```text
info serial-number
info claim-token
```

#### Using the AT console

```text
AT$INFO?
```

You should see output similar to:

```text
$INFO: "vendor-name","HARDWARIO"
$INFO: "product-name","GLIDER"
$INFO: "hw-revision","R1.1"
$INFO: "hw-variant",""
$INFO: "serial-number","2163212289"
$INFO: "claim-token","ab01ad36ab1234567890abcdef..."
```

Write down the values for **`serial-number`** and **`claim-token`** - you need both in the next step.

## Step 2 - Create the device in HARDWARIO Cloud

1. Sign in at [https://cloud.hardwario.com](https://cloud.hardwario.com).
2. Open the **space** you want the device to live in (or create a new one).
3. Press **Create new device**.
4. Fill in:
 - **Name** - any human-readable label, e.g. `Warehouse-A freezer`.
 - **Serial number** - the value from Step 1.
 - **Claim token** - the value from Step 1.
5. Press **Create**.

The device now appears in your space.

## Step 3 - Verify that data arrives

1. Open the new device in the cloud UI.
2. Navigate to **Show device messages**.

Within a few minutes you should see the first CBOR payload arrive. By default GLIDER:

- Samples sensors every **60 seconds** (`app config interval-sample`)
- Sends a payload every **300 seconds / 5 minutes** (`app config interval-send`)

To force an immediate uplink:

- **AT console:** `AT$SHELL="app send"`
- **RTT console:** `app send`

The payload structure is documented on the [**CBOR Payload**](payload.md) page.

## Troubleshooting

| Symptom | What to check |
| :--- | :--- |
| Device shows as **offline** in the cloud | Wait up to 5 minutes for the first uplink. Verify the SIM is active and has data. Force `app send`. |
| `AT$INFO?` shows an empty claim token | The device has not been provisioned. Contact HARDWARIO support. |
| Messages arrive but data fields look wrong | Confirm that the cloud has the correct CBOR decoder for this firmware. See [**CBOR Payload**](payload.md). |
| Device disconnects every 36 hours | Downlink watchdog reset - see `app config downlink-wdg-interval` in [**Configuration**](configuration.md). |

#### Reading firmware logs

If you cannot tell why the device fails to connect, attach the [**RTT Console (J-Link)**](console/rtt-jlink.md) and watch the modem logs. You will see LTE-M attach attempts, APN negotiation and any CBOR send errors.
