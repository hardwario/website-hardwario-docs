---
slug: settings
title: App settings
---

# App settings

Open **Settings** with the gear icon in the top-right corner of any screen.

---

## Appearance

Choose how the app looks:

| Option | Effect |
|---|---|
| **System** | Follows the phone's light/dark setting. This is the default. |
| **Light** | Always light. |
| **Dark** | Always dark. |

---

## Language

| Option | Effect |
|---|---|
| **System default** | Follows the phone's language. This is the default. |
| **English** | Always English. |
| **Čeština** | Always Czech. |

The change applies immediately — you do not need to restart the app.

---

## Security

**Lock app with Face ID / passcode** — *Require authentication on launch and when
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

The change log records every configuration read and every successful write for a
saved device. See [**Device change log**](./sticker/change-log.md) for how to
read, export and reapply entries.

---

## Debug mode

Tapping the HARDWARIO logo at the bottom of the Settings screen **five times**
turns **Debug mode** on or off. A counter appears after the first tap to show
how many taps are left.

Debug mode adds the **NFC Console** to the STICKER Tools menu — a low-level
console for raw NFC commands — and shows a thin `debug mode` strip under the
header so you always know it is on. It is a diagnostic aid; leave it off for
normal use.

Debug mode is remembered, so it stays on until you turn it off again.
