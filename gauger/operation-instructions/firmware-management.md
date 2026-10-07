---
slug: firmware-management
title: Firmware Management
---

# Firmware Management

The device has remote over-the-air firmware update functionality. It can be triggered by pressing the **Upload Firmware** button in the System section of the Web UI. After the firmware is uploaded, the device will reboot so the change can take place. You can verify the upload by checking the version and firmware name fields in the table in the Status tab.

If needed the firmware can be rolled back by pressing the **Rollback Firmware** button in the System tab. Rollback availability is indicated in the appropriate field of the Status table. The device can only store one rollback firmware. If the device is rolled back, another rollback (if available) will be to the factory firmware version.

It is also possible to rollback the device from the error state (LED is rapidly blinking). This is particularly useful if the update breaks some part of the boot process, rendering the Web UI unavailable. Initiating the rollback is similar to resetting the device. Hold down the USER button, the error blinking will stop. After about 5 seconds of holding the button, the LED will start blinking even faster than before. While the LED is blinking, release the button to rollback the firmware. If you don't release the button, the device will return to the error state.

Some updates may invalidate the device's configuration. For this reason it is always recommended to back up the settings using the **Export** button in the Settings tab.
