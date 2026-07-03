---
slug: nfc-configurator-config
title: Configuration
---
import Image from '@theme/IdealImage';

# NFC Configurator – Configuration

This page describes how to use the **HARDWARIO STICKER NFC Configurator** to write and read configuration over NFC, and lists all parameters that can be set on the device.

If you have not yet installed the application, start with the [**Setup →**](./setup.md) guide.

---

## How it works

The desktop application runs a small local web server and opens a secure HTTPS tunnel to the internet. Your phone connects to that tunnel by scanning a QR code.

When you enter a STICKER serial number on the phone, the desktop looks up the device's encryption key, encrypts the configuration, and sends the encrypted payload to the phone, which writes it to the STICKER over NFC.

:::info
STICKER includes an NFC interface that allows configuration even when batteries are not inserted, thanks to **NFC energy harvesting** the NFC field from the smartphone provides enough power to write settings into the device's internal EEPROM. When the device wakes up on battery power, it reads the NFC tag, applies the stored configuration and clears the temporary storage.
:::

---

## Writing configuration to a device

1. **Start the application.**
   - Windows: `python main.py`
   - Linux: `source .venv/bin/activate && python3 main.py`

2. **Select the parameters** you want to write, tick the checkboxes next to the items in the editor. Unchecked parameters are **not** sent to the device. The image below shows an example of turning on the alarm for sensor T1.
![Select parameters](images/config-app.png)

3. **Click Start.** The local server and HTTPS tunnel start automatically. A QR code appears in the desktop window after a few seconds.
![QR Code for HTTPS tunnel](images/qr-code.png)
4. **Connect your phone.** On your Android phone scan the QR code and open the page in **Google Chrome**. Click on **Enter site**.
![Scan serial number](images/pingy.png)

5. **Enter the serial number.** The phone interface has two tabs:
   - **SCAN**: tap **START SCAN** and point the camera at the 10-digit barcode on the STICKER.
   
   ![Pingy open web](images/start-scan.png)
   - **MANUAL**: type the 10-digit serial number and press Enter (or tap **OK**). Use this when the barcode is damaged or unreadable.
   ![Manual set serial number](images/manual-serial-number.png)

6. **Write over NFC.** When **WRITE CONFIGURATION** becomes active, tap it and hold the back of your phone flat against the STICKER. Keep the phone still until the write is confirmed.
7. When you are finished, click **Stop** to close the tunnel.

:::caution
The **Nonce counter** in the CSV is updated automatically on every successful write. A failed attempt does **not** increment the counter.
:::

---

## Reading configuration from a device

You can read the current configuration from a STICKER to verify it.

1. Start the application and connect your phone.
2. On the phone, tap **READ CONFIGURATION** and hold the phone against the STICKER.
3. The encrypted data is sent back to the desktop, decrypted and shown on both the phone and the desktop.

---

## Device lookup

You can preview a device before configuring it. On the **NFC** tab, type a 10-digit serial number into the **Serial Number** field and click **Lookup**. The application shows the product type, **DevEUI** and current **nonce counter**. This is a handy way to confirm the CSV is loaded correctly.

---

## Configuration parameters

The application lets you tick which parameters to write. Anything left unticked is **not** sent to the device, so a single configuration can be reused across many devices.

:::danger
You can also request a **factory reset**, which restores all settings to their default values before the new configuration is applied.

Use this option **with caution**, it wipes all current settings on the device, including LoRaWAN keys and alarm thresholds. There is no undo. Only enable factory reset when you are sure you want to start from a clean state.
:::
Parameters for config are [**here**](../developer-access/configuration.md)

---
      

## Troubleshooting

| Problem | Solution |
|---|---|
| Web NFC does not work on phone | You must use **Chrome on Android**. iOS, Safari, Firefox and other browsers are not supported. Make sure NFC is enabled in phone settings. |
| NFC write fails or times out | Hold the phone flat against the STICKER and keep it still for 2–3 seconds. Try a different position on the back of the phone, the NFC antenna is usually near the top or center. |
| `serial number not found` | The scanned device is not in the CSV. Make sure the file is named exactly `STICKER Inventory.csv` and contains a row for this device. |
| `No secret key for device` | The `Secret key` column is empty for this device in the CSV. Add the 32-character hex key. |
| `Payload too large` | Your configuration is bigger than 448 bytes. Uncheck parameters you do not need, only checked parameters count toward the limit. |
| `Rx 2 timeout` after LoRaWAN join | LoRaWAN server does not respond. Verify the LoRaWAN keys and the device profile in your network server. |
| Humidity alarm triggers immediately | Current humidity is outside the configured range (40 to 60 %). Adjust the humidity low and high thresholds. |
