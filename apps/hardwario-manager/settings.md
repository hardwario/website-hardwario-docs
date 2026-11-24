---
slug: settings
title: App settings
description: "HARDWARIO Manager settings: light or dark appearance, English or Czech, a Face ID or passcode app lock, STICKER change log retention and debug mode."
---

# App settings

Tap the **menu** button (☰) in the top-right corner of any screen and choose
**Settings**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-app-menu.png" alt="The app menu with Settings at the top, the External links Cloud, Documentation, Homepage and Support, and the app version at the bottom" width="320" />

---

## Appearance

Choose how the app looks:

| Option | Effect |
|---|---|
| **System default** | Follows the phone's light/dark setting. This is the default. |
| **Light** | Always light. |
| **Dark** | Always dark. |

---

## Language

| Option | Effect |
|---|---|
| **System default** | Follows the phone's language. This is the default. |
| **English** | Always English. |
| **Čeština** | Always Czech. |

The change applies immediately. You do not need to restart the app.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-settings.png" alt="The Settings screen with Appearance (System default, Light, Dark), Language (System default, English, Čeština) and the start of Security" width="320" />

---

## Security

**Lock app with Face ID / passcode**: *Require authentication on launch and when
returning to the app.* Off by default.

When it is on, the app asks for your biometrics or device passcode each time you
open it and each time you switch back to it from another app. Switching it on
does not lock the app straight away; it takes effect the next time you launch or
return to the app.

:::info No phone lock, no app lock
If the phone has no screen lock of its own, the app opens normally rather than
locking you out.
:::

---

## STICKER change log

*How long to keep the config-change history for each saved STICKER. Off stops
logging (existing logs are kept).*

| Option | Effect |
|---|---|
| **Off** | Stop recording. Logs already recorded are kept. |
| **30 days** | The default. |
| **60 days** | |
| **90 days** | |

<img className="app-screenshot" src="/img/hw-manager/hw-manager-settings-change-log.png" alt="Settings scrolled down: Security with the Face ID or passcode lock switched off, and STICKER change log with Off, 30 days (selected), 60 days and 90 days" width="320" />

The change log records every configuration read and every successful write for a
saved device. See [**Device change log**](./sticker/change-log.md) for how to
read, export and reapply entries.

---

## Debug mode

Tapping the HARDWARIO logo at the bottom of the app menu **five times** turns
**Debug mode** on or off. A counter appears after the first tap to show how many
taps are left.

While Debug mode is on, the app shows a thin `debug mode` strip under the header
so you always know it is on, and adds:

- **Debug tools** to the STICKER **Tools** menu: **Unclaim**, **Write claim
  code** and the **NFC Console**, a low-level console for raw NFC commands. See
  [**Tools**](./sticker/tools.md#debug-tools).
- the **STICKER NFC transport** section to Settings, described below.

It is a diagnostic aid; leave it off for normal use. Debug mode is remembered,
so it stays on until you turn it off again.

---

## STICKER NFC transport

The section **STICKER NFC transport · debug mode** appears in Settings only while
Debug mode is on. It picks how the app talks to a STICKER over NFC:

| Option | Effect |
|---|---|
| **Mailbox** | *The default.* Use it for every STICKER on firmware v2.0.0 or newer. |
