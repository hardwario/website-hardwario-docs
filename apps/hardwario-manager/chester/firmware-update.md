---
slug: firmware-update
title: Firmware update
description: "Flash CHESTER firmware over Bluetooth in HARDWARIO Manager from a QR code, an ID or a file: SHA-256 check, update stages and a safe return on failure."
---

import FlowSteps from '@site/src/components/FlowSteps';

# Update CHESTER firmware over Bluetooth

The app flashes a firmware image to the connected CHESTER over Bluetooth. Open
**CHESTER → Tools → Firmware update**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-firmware-update.png" alt="The Firmware update screen with its instructions and the Scan firmware QR, Enter firmware ID and Open a firmware file buttons" width="320" />

---

## Choose the firmware

There are three ways to give the app the firmware:

| Button | Where the firmware comes from |
|---|---|
| **Scan firmware QR** | A QR code with a link to the firmware image, or to its page on the HARDWARIO firmware service. The app downloads the image |
| **Enter firmware ID** | The firmware's **Unique identifier** on the HARDWARIO firmware service, typed in or pasted, with or without its dashes. A pasted link to the firmware works too. Choose **Download** |
| **Open a firmware file** | An `app_update.bin` already on the phone. No internet connection is needed, so prepare the file while you have a signal and update a device in a basement later |

An ID always names the same firmware, so it can be read out over the phone.
The [**pre-built binaries**](/chester/catalog-applications/catalog-applications#application-firmware)
for catalog applications list the ID and the link of every build. A custom build
gets its own ID and link when it is uploaded to the service.

For a file, pick the `app_update.bin` the firmware build produced. The app
refuses a `.hex` file, an archive or anything else that is not a firmware image.

---

## Run the update

1. Choose the firmware as above. The app shows **Downloading firmware…** (or
   **Reading the firmware file…**).
2. Check the summary: the firmware name, its version when known, its size, the
   **Firmware ID** when it came from the service, and its **SHA-256** digest. A
   firmware taken by its ID is also checked against the checksum the service
   publishes: **Checksum verified against the firmware service.** Use
   **Choose a different firmware** if it is not what you expected.
3. Choose **Start update**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-firmware-ready.png" alt="The firmware summary card with the name, version, size, Firmware ID and SHA-256, above the Start update and Choose a different firmware buttons" width="320" />

The update then runs through its stages, with a progress bar:

<FlowSteps zone="Firmware update" steps={[
  {role: 'Stage 1', title: 'Preparing…', detail: 'Getting the device ready'},
  {role: 'Stage 2', title: 'Uploading… n%', detail: 'Transferring the image'},
  {role: 'Stage 3', title: 'Testing the new firmware…', detail: 'The device checks the image it received'},
  {role: 'Stage 4', title: 'Applying the new firmware…', detail: 'The device restarts and swaps to the new firmware'},
  {role: 'Stage 5', title: 'Confirming the new firmware…', detail: 'The new firmware is marked as good'},
  {role: 'Result', title: 'Done', detail: 'The device runs the new firmware'},
]} />

While the device applies the new firmware, the app adds: *This can take up to 2
minutes. Do not power the device off.*

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-firmware-progress.png" alt="An update in progress: the stage name and progress bar, the reminder to keep the app open and the device powered, and the Cancel button" width="320" />

:::caution Keep the app open and the device powered
The screen asks you to *Keep the app open and the device powered until the
update finishes.* You cannot navigate back while an update is running. Keep the
phone near the device and both powered until it finishes.
:::

**Cancel** under the progress bar asks first: **Stop the update?** Stopping
leaves the update unfinished. The device keeps the firmware it already had,
and the whole firmware has to be uploaded again. Choose **Keep updating** or
**Stop update**.

When it finishes, the screen shows **Update complete**: the device has
restarted, runs the new firmware, and the update is confirmed, so it will not
roll back. The restart drops the Bluetooth connection, so choose **Reconnect**.
The app finds the device again and returns to the CHESTER menu.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-firmware-done.png" alt="The Update complete screen with the Reconnect button" width="320" />

---

## If it fails

A failed update is safe. The image is only confirmed after the device has
restarted and tested it, so a device that fails midway **reboots into its
previous firmware**.

The app says which phase failed, because that determines what to do next:

| When it failed | What it means |
|---|---|
| Before or during validation | The update never started. Try again. |
| During the upload | The transfer stopped before finishing. The device keeps its current firmware. Safe to retry. |
| After the upload | The device reverts to its previous firmware on the next reboot. Reconnect and check its version before retrying. |

Until the device restarts, an update that shows no progress for 90 seconds is
stopped, and the app tells you. Usually the device lost power or went out of
range. After the restart the swap is silent for a while, so the app waits up to
6 minutes for the confirmation. If none comes, it warns that the device booted
the new firmware but will go back to the old one on the next restart; run the
update again.

Other messages you may see:

- **The device refused the firmware image**: the image is not valid for this
  hardware. Check the QR points at firmware for this CHESTER variant.
- **The device has no room for the image**: reboot it and try again.
- **The downloaded firmware file is empty**: the QR does not point at a valid
  image.
- **The firmware service has no image with that unique identifier**: check the
  ID and try again.
- **The downloaded image does not match the checksum published for that
  identifier**: the download was altered on the way, for example by a captive
  portal. Check the phone's connection and try again.
- **That file is not a firmware image**, **That file is far too large to be a
  CHESTER firmware image**: pick the `app_update.bin` the firmware build
  produced.
- **The Bluetooth link to the device dropped during the update**: keep the
  device powered and next to the phone, then start the update again.

See [**Troubleshooting**](./troubleshooting.md) for connection problems.
