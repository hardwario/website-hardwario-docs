---
slug: chirpstack-end-devices
title: End Devices
title_meta: "End Devices (ChirpStack)"
---
import Image from '@theme/IdealImage';

# End Devices Configuration Guide

This tutorial guides you through the process of creating device profiles and adding end devices in ChirpStack v4.

---

## 1. Device Profiles  

After adding gateways, the next step is to create device profiles in ChirpStack.  

1. In the navigation bar, click **Device Profiles**.  
2. Click **Add Device Profile** (top right).  

3. Enter the required information such as:  
   - Name  
   - Region  
   - MAC Version  
   - ADR Algorithm  
   - Expected Uplink Interval  

![ChirStack v4 - Gateways](images/chirpstack-tutorial-5.png)

---

### Example for HARDWARIO devices

If you are using CHESTER or STICKER as an end device, you can find examples of device profile configurations in the following links:

| **Device** | **Documentation Link** |
|-------------|-------------------------|
| **CHESTER** | https://docs.hardwario.com/chester/platform-connectivity/lorawan-radio#chirpstack-configuration |
| **STICKER** | https://docs.hardwario.com/sticker/connectivity/lorawan-chirpstack |

---

## 2. Applications – Adding End Devices  

Next, create an application:  

1. In the navigation bar, select **Applications** (bottom of the menu).  

2. Create a new application and open it.  

3. Add devices by providing details such as:  
   - **Name**  
   - **Device EUI** 
   - **Join EUI / AppEUI** 
   - **Device Profile**  

Click **Submit**.  

![ChirStack v4 - Gateways](images/chirpstack-tutorial-11.png)

After creating the device, go to the **Activation** tab and enter:  
- **Device Address**  
- **Network Session Key**  
- **Application Session Key**  

Finally, click **(Re)activate Device**.  

![ChirStack v4 - Gateways](images/chirpstack-tutorial-13.png)

## Video Tutorial

:::tip
If you need further assistance or a visual demonstration of the process described in this guide, consult the [**Video Guide**](https://docs.hardwario.com/apps/videos-apps/chirpstack-devices).
:::