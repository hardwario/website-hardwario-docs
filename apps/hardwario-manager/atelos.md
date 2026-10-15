---
slug: atelos
title: ATELOS account
---

# ATELOS account

**ATELOS** is the HARDWARIO production cloud that HARDWARIO Manager works
against. It holds each device's secrets and records who owns it, so the app does
not have to store that on the phone alone. Signing in lets the app **claim**
devices and fill in their keys for you.

Open the **ATELOS account** tile on the home screen.

:::info Not every build has the account tile
The **ATELOS account** tile (log in, create an account, change the password,
My devices) is only in builds that include the ATELOS account hub; the public
release of HARDWARIO Manager does not include it yet. Claiming a STICKER works
in every build: without signing in, you claim the device to this phone, see
[**Claim a STICKER**](#claim-a-sticker).
:::

---

## Log in

1. Open **ATELOS account** and choose **Log in to ATELOS**.
2. Enter your **account name or email** and your password.
3. Confirm.

Once you are signed in, every device you have claimed in ATELOS is pulled into
your [**Saved STICKERs**](./sticker/saved-stickers.md) list automatically, with
its stored secret key. You do not have to enter keys for those devices by hand.

## Create an account

Choose **Create an ATELOS account** (it is also offered from the login screen)
and follow the form.

## Change your password

Open **ATELOS account → Change password**.

## My devices

**ATELOS account → My devices** lists the devices held under your ATELOS
account, as distinct from the local list on the phone.

---

## Claim a STICKER

Claiming records the device as yours in ATELOS and gives the app access to its
secret key. Once a device is claimed, nobody else can claim it.

1. Open **STICKER** and tap **Claim a STICKER** at the bottom of the menu (or
   open **Saved STICKERs** and claim a device from there).
2. Choose **Tap over NFC** and hold the phone against the STICKER. The app reads
   its serial number and claims it.
3. If you are not signed in, the app asks how to claim it:
   - **Log in & claim**: claim it into your ATELOS account (builds with the
     account hub only).
   - **Stay logged out**: claim it to this phone.
4. When the app asks, hold the phone against the device once more to close its
   claim window.

The device is then in your [**Saved STICKERs**](./sticker/saved-stickers.md)
with its secret key.

:::info The vendor-token is entered by hand
Claiming brings across the device's **secret key**. It does not yet bring across
the **vendor-token**, which is needed for the operations under
[**Reset a device → Vendor changes**](./sticker/reset.md). Enter that token by
hand on the device's detail screen.
:::

:::info Adding a device without claiming it
The claim screen registers the device in ATELOS, so it needs a connection to
ATELOS. To add
devices you already hold keys for (from a colleague's export, a CSV, or a QR
code), use **Saved STICKERs → Import** instead. See
[**Saved STICKERs**](./sticker/saved-stickers.md).
:::
