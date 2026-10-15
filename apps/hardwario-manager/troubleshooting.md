---
slug: troubleshooting
title: Troubleshooting and FAQ
title_meta: "Troubleshooting and FAQ (HARDWARIO Manager)"
---

# Troubleshooting and FAQ

Start here when something in HARDWARIO Manager does not work. Device-specific
problems have their own pages: [**CHESTER troubleshooting**](./chester/troubleshooting.md)
covers Bluetooth connection and pairing in detail, and the [**FIBER**](./fiber/index.md)
pages list the messages of each FIBER step.

---

## NFC and STICKER

| Problem | What to check |
|---|---|
| Nothing happens when you hold the phone to the STICKER | NFC is on (**NFC is off** means it is switched off in the phone settings). Hold the **top back** of the phone flat against the device, without a thick case, and keep still for a few seconds. Move slowly around that area if it does not read. |
| **NFC is not available on this phone** | The phone has no NFC. It cannot configure a STICKER, but it can still be used for CHESTER and FIBER over Bluetooth. |
| **Couldn't reach the STICKER** | The tap was too short or the phone moved. Hold it against the device again and keep still. |
| On iPhone, the sheet says **Lift the phone for ~2 s, then tap again** | This is expected. The device needs a moment without the NFC field. Lift the phone, wait, and tap again. |
| **Unknown STICKER** | The device is not in your [**Saved STICKERs**](./sticker/saved-stickers.md), so the app does not have its secret key. Claim it or import its key. |
| A write seems to do nothing | The device silently ignores writes made with the wrong secret key. Check the saved secret key for this device. |
| **…firmware is too old to read history over NFC** | Reading sensor history needs STICKER firmware 1.4.0 or newer. |
| **…reports config version …, but this app supports version …** | The app and the STICKER firmware disagree on the configuration format. Update the app, or the STICKER firmware, so they match. |

---

## Bluetooth (CHESTER and FIBER)

| Problem | What to check |
|---|---|
| **Bluetooth is off** | Turn the phone's Bluetooth on and try again. |
| **Bluetooth permission needed** | Allow the **Nearby devices** permission for the app in the phone settings. On Android 11 and older, switch on **Location** as well. |
| The device is not found | Check it is powered and within a few metres, then scan again. |
| **Authorization expired** (FIBER) | The one-time session has ended. Long-press ENTER on the FIBER and scan the QR code again. |
| **Disconnected after 30 minutes** (CHESTER) | The app drops an unused link after 30 minutes. Reconnect from the same screen. |

Most Bluetooth errors explain what happened and what to do. **Technical details**
under the message holds the raw error, which you can copy into a support request.

---

## ATELOS and claiming

| Problem | What to check |
|---|---|
| **Could not register this phone with ATELOS** | Claiming without an account still needs ATELOS. Check the phone's internet connection. |
| **This STICKER belongs to another account** | The owner has to hand it over first, see [**Hand a device on**](./sticker/saved-stickers.md#hand-a-device-on). |
| **No server connection** | Check the phone's internet connection and try again. |

---

## FAQ

**Do I need an ATELOS account?**
No. Without an account, you claim a STICKER to the phone itself. An account lets
you claim devices into a shared group and pull their keys onto any phone you sign
in on. See [**ATELOS account**](./atelos.md).

**Does the app work without internet?**
Talking to devices over NFC and Bluetooth does not need internet. Claiming a
device, downloading firmware by QR code or ID, and the ATELOS account do. A CHESTER
firmware file already on the phone can be flashed with no signal, see
[**Firmware update**](./chester/firmware-update.md).

**Where are my saved devices and keys stored?**
On the phone, in its secure storage. They are kept across app updates.
Uninstalling the app can delete them, so export them first.

**How do I move my devices to another phone?**
Export them from **Saved STICKERs** (**⋮ → Export**) and import the file or QR
codes on the new phone, see [**Saved STICKERs**](./sticker/saved-stickers.md).
Devices claimed into an ATELOS account also appear after you sign in.

**Can I configure a STICKER without batteries?**
Yes. The NFC field powers the device long enough to store the settings, see
[**Configure a powered-off device**](./sticker/offline-configuration.md).

**Is the app available in Czech?**
Yes. Change it under **Settings → Language**, see [**App settings**](./settings.md).

**Which version of the app do I have?**
The version is shown at the bottom of the menu and of the **Settings** screen.
Include it when you contact support.

**Is there an iOS app?**
The app runs on iOS, but it is not in the App Store yet. See
[**Install the app**](./install.md).
