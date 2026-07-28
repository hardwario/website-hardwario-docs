---
slug: bmeters-hydroclima-2
title: BMeters Hydroclima 2
---
import Image from '@theme/IdealImage';

# BMeters Hydroclima 2

[Web-Site](https://www.bmeters.com/en/products/hydroclima-2/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/bmeters-hydroclima-2.png')} width={376} height={376} alt="White BMeters Hydroclima 2 heat cost allocator with barcode, display, and button" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />


## Description

HYDROCLIMA-2 is a heat cost allocator with dual temperature sensors and ambient temperature recording. It features wireless M-Bus communication, 10-year battery life, and provides up to 24 months of historical consumption and temperature statistics.

## Configuration

:::info

The device is delivered **pre-configured**, but it can be reprogrammed and customized through [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering).

:::

### Configuration Procedure

Programming and configuration of the device is carried out by radio, using an [**RFM-RX2 receiver**](https://www.bmeters.com/en/products/rfm-rx2/) and [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering). 

To trigger the configuration procedure, the BMetering software must be properly configured:

- for the factory state of the allocator, press the button for < 1s
- for the allocator already configured, press the button for > 5s, until the display shows
the message “rF”. 

The method of configuration the allocator has been described in the documentation
concerning the **Bmetering software user manual**.

## Wireless M-Bus Address Configuration

### Where to Find the Address on the Device

The address is located **above the barcode and below the display**, as shown in the image below (8 digits).  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('./images/bmeters-hydroclima-2.png')} width={376} height={376} alt="Hydroclima 2 with the 8-digit wM-Bus address outlined next to the barcode above the display" />
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

