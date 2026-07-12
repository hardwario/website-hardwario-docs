---
slug: zenner-caltos-e
title: Zenner caltos-E
---
import Image from '@theme/IdealImage';

# Zenner caltos-E

[Web-Site](https://zenner.com/products/hkv_caltos_e/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/zenner-caltos-e.png')} width={376} height={376} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Description

The caltos E electronic heat cost allocator precisely records radiator heat consumption using advanced temperature measurement. Its integrated wireless M-Bus (wM-Bus) interface ensures reliable data transmission for modern sub-metering applications.

## Configuration

:::info

The device is delivered **pre-configured**.
:::

## Wireless M-Bus Address Configuration

### Where to Find the Address on the Device

The address is located **at the very bottom of the device**, as shown in the image below (8 digits).  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/zenner-caltos-e.png')} width={376} height={376} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

### Mapping the wM-Bus Address to CHESTER

The mapping must be carried out using the **CHESTER terminal**, for example with:  

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
