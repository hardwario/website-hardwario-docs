---
slug: bmeters-hydrocal-m4
title: BMeters Hydrocal M4
---
import Image from '@theme/IdealImage';

# BMeters Hydrocal M4

[Web-Site](https://www.bmeters.com/en/products/hydrocal-m4/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/bmeters-hydrocal-m4.png')} width={376} height={376} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Description

Compact heat/BTU meter capable of measuring the amount of energy used for heating and/or cooling individual utilities served by a centralized system.

## Configuration

### Configuration Guide for Hydrocal M4 Thermal energy meter via NFC

This guide describes the steps to configure a Hydrocal M4 Thermal energy meter using an Android smartphone.

---

### Step 1: Install the Configuration App

Download the **B METERS NFC Config** application from the Google Play Store:

[https://play.google.com/store/apps/details?id=it.gread.bmeters_appnfc&hl=en](https://play.google.com/store/apps/details?id=it.gread.bmeters_appnfc&hl=en)

You can scan the QR code below to go directly to the app:

![QR Code - B Meters NFC Config](images/bmeters-app-qr.png)

---

### Step 2: Connect to the Meter

1. Enable **NFC** on your Android device.
2. Open the **B METERS NFC Config** app.
3. Hold your smartphone close to the NFC tag on the water meter until the connection is established.

---

### Step 3: Select Device Type

From the list of available devices, select:
- **HYDROCAL-M4**

---

### Step 4: Configure Sensor Parameters

Adjust the following settings:

- **AMR**: Check (enable automatic meter reading)  
- **Global encryption**: Check (Use of a global key instead of an individual one)  
- **Ignore 5L**: Press **Next**, then select **Ignore 5L** (so that transmission starts immediately)  

:::info

- The M-Bus icon lights up to indicate it is being prepared.  
- Both the M-Bus icon and the transmission symbol must blink for data transmission to start.  

:::


---

### Step 5: Write Configuration to Meter

1. Bring your phone close to the NFC tag again.
2. Tap the **Write** button.
3. Wait for the message: **Writing Done**.

---

### Step 6: Verify Settings

1. Tap the **Read** button.
2. Check that the configured values match what was written.

Your water meter is now successfully configured.

## Wireless M-Bus Address Configuration

### Where to Find the Address on the Device

The address is located on the **left side below the barcode**, as shown in the image below (8 digits).  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/bmeters-hydrocal-m4.png')} width={376} height={376} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

### Mapping the wM-Bus Address to Chester

The mapping must be carried out using the **Chester terminal**, for example with:  

- [**Hardwario Monitor (Windows)**](https://github.com/hardwario/hio-monitor/releases)
- [**Hardwario Manager (Android)**](https://play.google.com/store/apps/details?id=com.hardwario.manager)
- [**Google Chrome Terminal**](https://terminal.hardwario.com/)

---

### Managing and Adding wM-Bus Device Addresses in Chester

Here you can manage the list of **wM-Bus addresses** (**add/remove**), adjust scan settings, and review example configurations for typical setups.  

- [**Address List Configuration**](/chester/catalog-applications/chester-wm-bus#address-list-configuration) – **manage and edit** the list of linked wM-Bus **addresses**  
- [**Scan Configuration**](/chester/catalog-applications/chester-wm-bus#scan-configuration) – **adjust scan settings** for device communication 
- [**Example Configurations**](/chester/catalog-applications/chester-wm-bus#example-configurations) – reference **templates** for typical setups 

---

## Message Encryption and Key Management

The **transmitted messages are encrypted** to optimize energy consumption during data transmission, which extends the overall battery life.

The **received data must therefore be decrypted**, which is done using **decryption keys**.  
To achieve this, there are two options:

- [**Hardwario Cloud**](/chester/catalog-applications/chester-wm-bus#hardwario-cloud--decryption-keys) – tutorial on how to enter and manage decryption keys  
- [**Decryption page**](https://wmbusmeters.org/) – online tool for manual data decryption and analysis  
