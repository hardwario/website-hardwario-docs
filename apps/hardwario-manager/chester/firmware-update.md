---
slug: firmware-update
title: Firmware update
---

# Update CHESTER firmware over Bluetooth

The app takes a firmware image and flashes it to the connected CHESTER over
Bluetooth.

Open **CHESTER → Tools → Firmware update**.

<img src="/img/hw-manager/hw-manager-chester-firmware-update.png" alt="The Firmware update screen with the three ways to choose an image: scan the firmware QR, enter the firmware ID, or open a firmware file" width="320" />

---

## Choose the image

The screen offers three ways to get the image:

| Source | When to use it |
|---|---|
| **Scan firmware QR** | You have the QR code that came with your custom build, or one from the [**pre-built binaries**](/chester/catalog-applications/catalog-applications#application-firmware) for catalog applications. |
| **Enter firmware ID** | You have the firmware's **unique identifier** (printed when the firmware was uploaded) or its sharable link. One ID always names the same image, so it can be read out over the phone. The download is checked against the checksum the firmware service publishes for it, and a mismatch refuses to flash. |
| **Open a firmware file** | The `.bin` file is already on the phone. No signal is needed, which helps in basements and cabinets. The app rejects a file that is not a valid firmware image before it reaches the device. |

---

## Run the update

1. Choose the image in one of the three ways above. The app downloads or reads
   it.
2. Check the summary: the file name, its **version**, **size**, and **SHA-256**
   digest, and for an image chosen by ID, **Checksum verified against the
   firmware service**. Use **Choose a different firmware** if it is not what you
   expected.
3. Choose **Start update**.

The update then runs through its stages, with a progress bar:

| Stage | What is happening |
|---|---|
| **Preparing…** | Getting the device ready |
| **Uploading… _n_%** | Transferring the image |
| **Testing the new image…** | The device checks the image it received |
| **Rebooting the device…** | The device restarts into the new firmware. A large image can take a few minutes to swap in |
| **Confirming the new image…** | The new firmware is marked as good |
| **Done** | |

The app reports success only after it has seen the confirmation: the device has
restarted, runs the new firmware, and will not roll back. The restart drops the
Bluetooth link, so the final screen offers **Reconnect**, which waits for the
device to boot and finds it again by its serial number.

:::caution Keep the app open and the device powered
You cannot navigate away while an update is running. Keep the phone near the
device and both powered until it finishes. **Cancel** asks first, because
stopping leaves the update unfinished: the device keeps the firmware it had, and
the whole image has to be uploaded again.
:::

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

If the upload stops responding (no progress for 90 seconds), the app aborts and
tells you. Usually the device lost power or went out of range.

If the device booted the new firmware but the confirmation never arrived, the app
says so: the device will go back to the old firmware on its next restart. Keep it
powered and next to the phone, then run the update again.

Other messages you may see:

- **The device refused the firmware image**: the image is not valid for this
  hardware. Check the QR points at firmware for this CHESTER variant.
- **The device has no room for the image**: reboot it and try again.
- **The downloaded firmware file is empty**: the QR or ID does not point at a
  valid image.

See [**Troubleshooting**](./troubleshooting.md) for connection problems.
