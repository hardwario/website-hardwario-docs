---
slug: first-steps
title: Getting Started
description: "Welcome to the HARDWARIO Cloud, the platform where your devices are managed and where your live data lands."
title_meta: "Getting Started (HARDWARIO Cloud)"
---

# HARDWARIO Cloud Quick Start Guide

Welcome to the **HARDWARIO Cloud**, the platform where your devices are managed and where your live
data lands. Follow these steps to create an account, register your first device, and start working
with its messages.

## Step 1: Create a HARDWARIO Cloud Account

1. Go to [**https://hardwario.cloud**](https://hardwario.cloud)
2. Click **SIGN UP**
3. Create an account using a **Google** or **Microsoft** account, or an **email and password** (verify your email).
4. Once verified, **log in**.

![HARDWARIO Cloud "Create account" screen with email and password fields and Google and Microsoft sign-up options](images/create-account.png)

:::info
For improved security, we recommend authenticating via **Google** or **Microsoft**.
:::

## Step 2: Create Your Space

1. In the top-right corner, click **SPACES → NEW SPACE**.

   ![SPACES page with the "+ NEW SPACE" button highlighted in the top-right corner](images/spaces-new-space.png)

2. Name your space (for example: `my-home`, `office-sensors`, `warehouse`). Follow the [**Naming Conventions**](/cloud/#naming-conventions).

   ![The "Create new space" dialog: enter a name and click CREATE](images/create-space.png)

3. This is where your devices will live. See [**Spaces**](/cloud/spaces) for details.

## Step 3: Add a Device

1. Select your **Space**.
2. Go to **DEVICES → +NEW DEVICE**.

   ![DEVICES page with the "+ NEW DEVICE" button highlighted in the top-right corner](images/devices-new-device.png)

3. Provide the device information: either **scan the QR code** (`⛶ SCAN DEVICE`) to fill everything in automatically, or enter the **Name**, **HARDWARIO Serial Number (HSN)**, and **Claim Token** manually.

   ![The "Create new device" dialog: scan the QR code, or fill in Name, Serial Number, and Claim Token](images/create-new-device.png)

4. Save it: your device is now **registered in the Cloud**. See [**Devices**](/cloud/devices) for everything you can do next.

## Step 4: See Your Data

Once the device is powered up and connected, its uplinks appear in the Cloud.

- Read its incoming payloads under [**Messages**](/cloud/messages).
- Group and filter related devices with [**Tags**](/cloud/tags).
- Store per-device key–value information with [**Variables**](/cloud/variables).

![MESSAGES view showing a device's uplink message expanded with its decoded JSON payload](images/messages.png)

## Step 5: Act on Your Devices

The Cloud is bidirectional: send configuration, data, or shell commands back with a
[**Downlink**](/cloud/downlink), and push new [**Firmware**](/cloud/firmware) over the air.

## Step 6: Integrate With Your Systems

Route your data out of the Cloud with [**Connectors**](/cloud/connectors) (webhooks), or query it
programmatically with the [**REST API**](/cloud/api).

## Step 7: Manage Access

Invite teammates and control who can see and change your Space under [**Users**](/cloud/users).

## Next Steps

Browse the full [**HARDWARIO Cloud documentation**](/cloud/) for details on every feature.
