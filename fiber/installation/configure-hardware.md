---
title: Configure Hardware
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure Hardware

This section configures the I2C bus and real-time clock (RTC) on the device. **The RTC steps
below differ between the two variants**, so pick the tab that matches your device when you reach
them:

:::info FIBER (CM4)

Adds an RTC overlay for the external **PCF85063A** real-time clock chip.

:::

:::info FIBER Lite (Pi 5)

Skips the RTC overlay entirely, because the Raspberry Pi 5 has a **built-in RTC**, so this step and its
verification look different.

:::

1. Install the **I2C tools** package for I2C bus diagnostics:

   ```sh
   sudo apt install -y i2c-tools
   ```

1. Configure the `i2c-dev` kernel module to load automatically at boot:

   ```sh
   echo 'i2c-dev' | sudo tee -a /etc/modules-load.d/i2c.conf > /dev/null
   ```

1. Add hardware configuration to the boot configuration file:

   <Tabs groupId="fiber-variant">
   <TabItem value="fiber" label="FIBER (CM4)" default>

   ```sh
   cat << EOF | sudo tee -a /boot/firmware/config.txt > /dev/null
   dtparam=i2c_arm=on
   dtparam=i2c_vc=on
   disable_poe_fan=1
   force_eeprom_read=0
   camera_auto_detect=0
   dtoverlay=i2c-rtc,pcf85063a,i2c_csi_dsi
   EOF
   ```

   :::tip

   This enables I2C interfaces, disables the PoE fan control, and configures the RTC overlay for
   the external **PCF85063A** RTC chip.

   :::

   </TabItem>
   <TabItem value="fiber-lite" label="FIBER Lite (Pi 5)">

   ```sh
   cat << EOF | sudo tee -a /boot/firmware/config.txt > /dev/null
   dtparam=i2c_arm=on
   dtparam=i2c_vc=on
   disable_poe_fan=1
   force_eeprom_read=0
   camera_auto_detect=0
   EOF
   ```

   :::danger

   **Do not add an external RTC overlay.** FIBER (CM4) adds
   `dtoverlay=i2c-rtc,pcf85063a,i2c_csi_dsi` for an external PCF85063A real-time clock chip.
   **Do not add this on FIBER Lite.** The Raspberry Pi 5 has a **native built-in RTC** that
   registers automatically as `rtc0`. The external overlay has no chip to talk to and only
   produces a harmless-but-noisy `error -EREMOTEIO` in the kernel log (see **Troubleshooting**
   in the sidebar if you hit this).

   :::

   </TabItem>
   </Tabs>

1. Reboot the system to apply the hardware configuration:

   ```sh
   sudo reboot
   ```

1. <Tabs groupId="fiber-variant">
   <TabItem value="fiber" label="FIBER (CM4)" default>

   Verify the I2C bus is accessible by scanning for devices:

   ```sh
   sudo i2cdetect -y 10
   ```

   :::tip

   You should see the RTC device listed on the I2C bus.

   :::

   </TabItem>
   <TabItem value="fiber-lite" label="FIBER Lite (Pi 5)">

   There's no external RTC to scan for. The Pi 5's built-in RTC needs no verification step here.

   </TabItem>
   </Tabs>

1. Install additional utilities for hardware clock access:

   ```sh
   sudo apt install util-linux-extra
   ```

1. Verify the hardware clock is accessible:

   ```sh
   sudo hwclock -v
   ```
