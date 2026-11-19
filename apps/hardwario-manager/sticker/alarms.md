---
slug: alarms
title: Alarm rules
description: "Set up to 16 STICKER alarm rules in HARDWARIO Manager: threshold, state or rate rules with a hold time, the alarm settings and a check of active alarms."
---

# Set up alarm rules

An alarm rule watches one measured value and marks the device as alarming when
the condition holds. A device holds up to **16** rules, edited under
**Configuration → Alarms**. The section also carries the settings that apply to
every alarm.

---

## Alarm settings

Above the rules, the Alarms section holds:

| Setting | What it does |
|---|---|
| **Battery level** | The low-battery threshold in mV (1000–3600, default 2400); the device raises a battery alarm below it |
| **Alarm buzzer** | How the buzzer sounds during an alarm, from `OFF` and `ONCE` to `CONTINUOUS`. Shown only while the GPIO pins drive the buzzer (**Sensors → GPIO pins**). |
| **Alarm limit** | The shortest time in seconds between two alarm uplinks (0 turns the limit off) |
| **Confirmed alarm uplinks** | Sends each alarm as a confirmed uplink: the device waits for the network's acknowledgement and retries up to 3 times |

**Alarm limit** and **Confirmed alarm uplinks** are hidden while the radio is
off, because no alarm goes out then.

---

## Add a rule

1. Go to **STICKER → Configuration → Read**, read the device, and open
   **Alarms**.
2. Choose **Add alarm**.
3. Pick the **Sensor** and the **Measured value**. The app shows the alarm type
   that follows from them, for example **Alarm type: threshold (analog band)**.
4. Set the condition and the hold time, then **Save**.
5. Tap **Save to device**.

<img src="/img/hw-manager/hw-manager-alarm-add.png" alt="The New alarm screen with Built-in sensors and Temperature selected, Alarm type: threshold (analog band), a Lower limit of 2 °C, an Upper limit of 8 °C, a Delay before firing of 300 s and the Save button" width="320" />

| Alarm type | Condition | Hold time |
|---|---|---|
| **threshold (analog band)** | **Lower limit** and **Upper limit**: the alarm fires when the value leaves the band | **Delay before firing**: how long the value must stay outside the band |
| **state (digital 0/1)** | **Active on**: the state that triggers the alarm | **Confirm time**: how long the input must hold that state; motion rules take a **Quiet time** instead |
| **rate (count increase)** | **Count**: the alarm fires when the count grows by at least this much within the window | **Counting window**: 0 means one report interval |

Hold times run from 0 to 3600 s.

The app warns you if a new rule duplicates one already set, and it refuses
values the device would reject.

:::caution A rule on a switched-off sensor never fires
If the sensor a rule watches is turned off in **Sensors**, the wizard says so
under the measured value and the rule list marks the rule **Inactive**. The
rule stays on the device but never fires until you turn the sensor on again.
:::

---

## Edit and delete

Open a rule's **⋮** menu and choose **Edit** to change it or **Delete** to
remove it. With all 16 rules in use, delete one before you add another.

A rule written for a 1-Wire sensor type that its slot no longer expects is
marked **Inactive** and is not evaluated. The device refuses a change that
leaves such rules behind, so edit or delete them first.

---

## Check which alarms are active

**STICKER → Device info** lists the **Active alarms** currently tripped on the
device. See [**Device info**](./device-info.md).

---

## Reuse rules across devices

Alarm rules can be carried in a **template**, so a fleet can be given the same
rules in one pass, see [**Templates**](./templates.md). They can also be set
over the air with the
[**Downlink Commands Generator**](/sticker/connectivity/downlink-commands-generator)
or the `alarm` shell command, see
[**Alarm Rules (Developer Access)**](/sticker/developer-access/alarm-rules).

:::info Template Generator rules do not reach the app
The [**Template Generator**](./template-generator.mdx) builds alarm rules in the
firmware v1.4 format. When you load such a template into the app, it converts
the template for firmware v2.0.0 and removes those rules, so set them up in the
app instead.
:::
