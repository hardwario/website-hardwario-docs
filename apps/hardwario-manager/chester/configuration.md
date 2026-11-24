---
slug: configuration
title: Configuration
description: "Configure a CHESTER in HARDWARIO Manager: Quick setup for intervals and LTE or LoRaWAN, Advanced configuration for all parameters, and saving."
title_meta: "Configuration (HARDWARIO Manager for CHESTER)"
---

# Configure a CHESTER

Open **CHESTER → Configuration**. The app reads the device's configuration
(**Reading configuration…**) and opens **Quick setup**, a guided form over the
settings most deployments need. **Advanced configuration** shows every
parameter the device has. Your edits carry between the two, and nothing reaches
the device until you save. Saving restarts the device, see [**Saving**](#saving).

The share button in the top bar (**Share configuration**) sends the whole
configuration as text: one `<module> config <name> <value>` shell command per
setting, the BLE tag slots included, with any edits you have not saved yet. It is
a record of the configuration you can keep or send to support.

:::caution The shared configuration includes the keys
The text carries every value the device reports, the LoRaWAN keys included.
Share it only with people you trust.
:::

---

## Quick Set-up

The form is headed with the device it is working on, for example **CHESTER
2159019023**. Sections appear only if the device actually has them.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-configuration.png" alt="Quick setup with the Intervals section, Sample interval 1 min and Report interval 10 min, and the Communication section with Mode set to LTE, above the Advanced configuration and Save to CHESTER buttons" width="320" />

A setting with a description has a **?** button beside it. Tap it to read what
the setting does.

### Intervals

The **Intervals** section holds **Sample interval** and **Report interval**.
Each takes a number and a unit (s, min or h), with quick picks of common values.
The allowed range is shown under the field, in the unit you picked.

### Communication mode

The **Communication** section starts with **Mode**: **None**, **LTE** or
**LoRaWAN**, whichever the firmware offers. The fields of the mode you pick
appear below it in the same section.

### LTE

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-configuration-lte.png" alt="The Communication section with Mode LTE: SIM set to Other, Radio mode, APN, IP address and Antenna" width="320" />

| Setting | Options |
|---|---|
| **SIM** | **Vodafone SIM**, or **Other** for a SIM from any other operator |
| **Radio mode** | **LTE-M**, **NB-IoT**, or **Both** |
| **APN** | The access point name of the SIM's data service. Shown only with **Other** |
| **IP address** | The address of the server the device reports to. Digits and dots only |
| **Antenna** | **Internal** or **External** |

**Vodafone SIM** leaves the APN empty, so the network assigns it, lets the
device choose the network automatically and sets **Radio mode** to **Both**.
The app selects **Vodafone SIM** by itself when the device already holds those
values. Choose **Other** when your SIM needs a specific APN.

:::info More LTE settings in Advanced configuration
The rest of the LTE parameters, such as the network (PLMN ID), the
authentication and the LTE bands, are under **Advanced configuration → LTE**.
:::

### LoRaWAN

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-configuration-lorawan.png" alt="The Communication section with Mode LoRaWAN, Activation OTAA, Band EU868, an empty Class and the start of the Keys with DevEUI not set, above the Advanced configuration and Save to CHESTER buttons" width="320" />

| Setting | Options |
|---|---|
| **Activation** | **OTAA** or **ABP** |
| **Band** | The regional band plan, for example **EU868**. It must match the gateway's region |
| **Class** | **Class A** sleeps between uplinks and uses the least power. **Class C** listens for downlinks all the time |

Under **Keys** come the identifiers and keys of the activation you picked:
**DevEUI**, **JoinEUI (AppEUI)** and **AppKey** for OTAA; **DevAddr**,
**NwkSKey** and **AppSKey** for ABP.

Key fields accept hex with or without separators and show how many characters
are expected, for example *32 hex characters (16 B)*. Each has a copy button
(**Copy key**) and a button that fills in a random value (**Generate random
key**). Below the keys:

- **Generate keys** fills every key of the activation with random values,
  except the DevEUI, which identifies the device.
- **Share keys** sends the activation and its keys as text, for registering the
  device on your LoRaWAN network server.

---

## Advanced configuration

**Advanced configuration**, at the bottom of Quick setup, shows **every**
parameter the device reports, grouped by module into collapsed cards. Which
groups appear depends on the firmware: **Application**, **LTE**, **LoRaWAN**,
**Bluetooth**, **BLE tags**, **1-Wire** and others. Each card's subtitle counts
its settings, for example **12 settings**, adds how many you changed, and says
how many values are out of range.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-advanced.png" alt="Advanced configuration with the device name at the top and the collapsed groups Application, Bluetooth, BLE tags and CLOUD, each with its settings count, above the Go to Quick Set-up and Save to device buttons" width="320" />

Expand a group and each setting is shown to match its type: a switch for a
boolean, a dropdown for a fixed set of choices, a number field with its range,
an interval with a unit, a hex field for a key. A **?** button beside a setting
explains it.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-advanced-application.png" alt="The Application group expanded, showing its interval fields, each with a value, a unit and a question-mark help button" width="320" />

Settings that do not apply are hidden: an alarm's threshold and hysteresis
while that alarm is off, and the LoRaWAN keys of the activation you are not
using. A hidden setting keeps any edit you made to it.

On firmware that reports it, the **Bluetooth** group holds the pairing
passkey. Left empty, the device uses the factory passkey printed on its label.

The **BLE tags** group says **Tag slots are managed in BLE tags, not here.**,
with **Open BLE tags** to go there, see [**BLE tags**](./ble-tags.md).

**Go to Quick Set-up** returns to the guided form.

---

## Saving

The save button sits at the bottom of the screen: **Save to CHESTER** in Quick
setup, **Save to device** in Advanced configuration. It stays disabled until
something has changed and every value is valid. An out-of-range value is
flagged under its field, and the bar says **Some values are out of range or
invalid. Fix them before writing.** with **Show**, which jumps to the first one.

The button with the clock-arrow icon next to the form's heading
(**Revert changes**) discards your edits. If you leave with edits not saved, the
app asks **Discard changes?**: **Keep editing** or **Discard**.

Saving writes each changed setting and then stores them in the device's memory
with `config save`. **The device then restarts to apply them**, which drops the
Bluetooth connection. The app waits for the device and reconnects on its own:

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-reconnect.png" alt="The Reconnecting to CHESTER banner with the serial number, the attempt count and a countdown to the next attempt, and a Cancel button" width="320" />

**Reconnecting to CHESTER** and the serial number, with **Attempt 1 of 5** and a
countdown to the next attempt. The first attempt comes after 30 seconds; the
five attempts together wait up to about 9 minutes. **Cancel** stops waiting. If
every attempt fails, the app says so; connect again from
[**Connect to CHESTER**](./connect.md).

The device's shell reports problems in words rather than status codes, so the app
reads the reply and tells you what happened:

- if the device rejects a value, the save fails and quotes the device's own words;
- if a write fails partway, the app names the setting that failed and warns that
  the configuration was only partly saved. Reload it to see the current state;
- if the writes land but the final `config save` fails, the app warns that the
  values will be lost on the next reboot.

---

## If the read comes back empty

A device that does not answer, or whose firmware does not support the
configuration shell commands, is reported as **No configuration** rather than
shown as an empty form, with the reason and **Try again**. Keep the device close
to the phone and try again; if it stays silent, reconnect. See
[**Troubleshooting**](./troubleshooting.md).
