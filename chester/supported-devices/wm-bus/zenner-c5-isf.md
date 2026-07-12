---
slug: zenner-c5-isf
title: Zenner C5-ISF
---
import Image from '@theme/IdealImage';

# Zenner C5-ISF

[Web-Site](https://zenner.com/products/wmz_zelsius_c5_isf-2/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/zenner-c5-isf.png')} width={376} height={376} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Description

The zelsius C5-ISF is a compact and precise thermal energy meter with a robust single-jet flow sensor. It features a wireless M-Bus (wM-Bus) communication interface for efficient and accurate remote consumption monitoring.

## Configuration

:::info

The device is delivered **pre-configured**.
:::

## Wireless M-Bus Address Configuration

### Where to Find the Address on the Device

The address is located **in the center below the barcode** and consists of the **last two groups of four digits**, as shown in the image below (8 digits).  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/zenner-c5-isf.png')} width={376} height={376} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

### Mapping the wM-Bus Address to CHESTER

The mapping must be carried out using the **CHESTER Terminal**, for example with:  

- [**HARDWARIO Monitor (Windows)**](https://github.com/hardwario/hio-monitor/releases)
- [**HARDWARIO Manager (Android)**](https://play.google.com/store/apps/details?id=com.hardwario.manager)
- [**Google Chrome Terminal**](https://terminal.hardwario.com/)

---

### Managing and Adding wM-Bus Device Addresses in CHESTER

Here you can manage the list of **wM-Bus addresses** (**add/remove**), adjust scan settings, and review example configurations for typical setups.  

- [**Address List Configuration**](/chester/catalog-applications/chester-wm-bus#address-list-configuration) – **manage and edit** the list of linked wM-Bus **addresses**  
- [**Scan Configuration**](/chester/catalog-applications/chester-wm-bus#scan-configuration) – **adjust scan settings** for device communication 
- [**Example Configurations**](/chester/catalog-applications/chester-wm-bus#example-configurations) – reference **templates** for typical setups 

---

## Message Encryption and Key Management

The **transmitted messages are encrypted** to optimize energy consumption during data transmission, which extends the overall battery life.

The **received data must therefore be decrypted**, which is done using **decryption keys**.  
To achieve this, there are two options:

- [**HARDWARIO Cloud**](/chester/catalog-applications/chester-wm-bus#hardwario-cloud--decryption-keys) – tutorial on how to enter and manage decryption keys  
- [**Decryption page**](https://wmbusmeters.org/) – online tool for manual data decryption and analysis  
