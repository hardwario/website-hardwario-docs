---
slug: ble-tags
title: Bluetooth Tags
---

import Image from '@theme/IdealImage';

# CHESTER BLE Tag Subsystem

The **CHESTER** platform includes a dedicated **Teltonika EYE Sensor subsystem**, enabling seamless integration with up to eight Bluetooth tags for monitoring temperature and humidity.  
This subsystem provides reliable wireless environmental sensing for a wide range of applications.

---

## 1. Activating the Subsystem

To activate the **Teltonika EYE Sensor subsystem**, run the following command:

```
tag config enabled true
```

After enabling the subsystem, save the configuration and restart **CHESTER** to apply the change:

```
config save
```

```
device restart
```

---

## 2. Tag Activation

:::info
**The packaged sensor should come activated.**  
If it is not active, touch a **magnet** to the sensor to wake it from hibernation mode, as shown in the image below.
:::

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '376px', height: '250px' }}>
        <Image img={require('./images/tag-magnet.png')} alt="Magnet touched to a Teltonika EYE Sensor to wake it; the green LED confirms activation" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

<br />

---

## 3. Enrolling Tags

Before the sensors can be used, they must first be **enrolled** by the device.

To enroll a tag:
1. Place the tag close to **CHESTER**.
2. Run the command below and wait up to 10 seconds for discovery.

```
tag enroll
```

You can also define an **optional signal strength threshold** (from `-128` to `0 dBm`) to control enrollment sensitivity.  
Lower values (e.g. `-128 dBm`) provide greater range, while higher values (e.g. `-40 dBm`, the default) are stricter.

```
tag enroll <threshold>
```

Example:

```
tag enroll -55
```

Once enrollment is complete, make it **persistent** by saving the configuration:

```
config save
```

To list all currently enrolled tags, run:

```
tag list
```

---

## 4. Manual Tag Management

Instead of using automatic enrollment, you can manually add or remove tags by their **MAC address**.

### Add a Tag

To manually add a tag, run:

```
tag config devices add <MAC_ADDRESS>
```

Example:

```
tag config devices add 7cd9f413e360
```

### Remove a Tag

To remove a previously added tag, run:

```
tag config devices remove <MAC_ADDRESS>
```

Example:

```
tag config devices remove 7cd9f413e360
```

After adding or removing tags, save the configuration:

```
config save
```

---

## 5. Configuring via EYE App

The tags can be configured using the [**Teltonika EYE App**](https://wiki.teltonika-gps.com/view/EYE_SENSOR_/_BTSMP1#EYE_App_Configuration).  
We strongly recommend updating the firmware, as the default version does not allow some advanced settings.

### How to Configure

1. Open the **EYE App** and select the device from the list.  
2. Tap the **CONFIGURE** button to open the device settings screen.  
3. Adjust the configuration options as needed.  
   *(Note: The Android app provides more detailed information such as device name, address, and serial number. The iOS version is more limited.)*

:::info 
Accessing the configuration requires a PIN code. 

**Default PIN: 123456**

This PIN can be changed later in the device settings. 
:::

#### Teltonika EYE App — Device Overview

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div>
        <Image img={require('./images/ble-app-settings.png')} width={200} height={200} alt="EYE App device overview showing sensor readings, firmware status, and the CONFIGURE button" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

### Recommended Configuration

The following configuration is recommended for optimal communication performance and power efficiency when using Teltonika EYE Sensors with the CHESTER BLE Tag Subsystem.
This setup ensures stable data transmission, adequate advertising frequency for reliable sensor discovery, and balanced power consumption.

#### Teltonika EYE App — Device Configuration

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div>
        <Image img={require('./images/ble-settings.png')} width={200} height={200} alt="EYE App configuration screen: Tx power 4 dBm, 10 s advertising interval, Sensors packet, temperature and humidity active" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>


#### Configuration Settings Table

| **Setting**           | **Value**             |
| --------------------- | --------------------- |
| Power signal settings | 4 dBm                 |
| Advertising interval  | 10 s                  |
| Packet settings       | Sensors               |
| Active sensors        | Temperature, Humidity |

---

## 6. Signal Testing

The effective communication range between **CHESTER** and the Teltonika sensors depends on the **signal power configuration** of the tag.

To test the signal strength, run:

```
tag read
```

Check the **RSSI** value in the output:
- If the signal is **lower than -85 dBm**, consider increasing the tag’s power level for better stability.

## 7. Measured Parameters

| Measured Quantity       | Description                                                  |
|-------------------------|--------------------------------------------------------------|
| Temperature             | Ambient temperature of the sensor’s environment.|
| Humidity                | Relative humidity of the surrounding air. |
| Movement / Accelerometer| Detects motion, changes in orientation (pitch/roll) of the device. |
| Magnet Detection        | Detects magnetic field changes — e.g., door open/close via magnet. |
| Battery Voltage / Level | Monitors the internal battery’s voltage (to estimate remaining life).|


:::tip
If you need additional help or a visual walkthrough, check out the  
[**Video Guide**](https://docs.hardwario.com/chester/videos-chester/chester-pair-tag).
:::

