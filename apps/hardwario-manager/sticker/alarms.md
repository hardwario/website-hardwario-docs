---
slug: alarms
title: Alarm rules
---

# Set up alarm rules

An alarm rule watches one measured quantity and marks the device as alarming
when the condition holds. Rules live in **slots** on the device — up to **16** —
and are edited under **Configuration → Alarms**.

---

## Add a rule

1. Go to **STICKER → Configuration**, read the device, and open **Alarms**.
2. Choose **New alarm**.
3. Pick the rule kind, choose its source and quantity, and set the values.
4. Confirm, then **Save to device**.

| Rule kind | Watches |
|---|---|
| **Threshold (analog band)** | A measured value entering or leaving a band — for example a temperature above a limit |
| **State (digital 0/1)** | A digital input reaching a given state |
| **Rate (count increase)** | A counter rising by more than an allowed amount over the period |

Open **Advanced** on a rule to set its **hysteresis** — the margin a value has to
come back through before the alarm clears. Hysteresis stops a value sitting right
on the limit from alarming and clearing repeatedly.

The app warns you if a new rule duplicates one already in a slot.

---

## Edit, rename and clear

Choose **Edit alarm** on an existing rule to change it. **Rename alarm** gives a
slot a friendly name, and **Clear** empties the slot on the device.

:::info Alarm names stay on the phone
A friendly alarm name is stored by the app, not written to the device. It makes
the slots readable for you; it does not travel with the device or appear in its
uplinks.
:::

---

## Check which alarms are active

**STICKER → Device info → Advanced** lists the **Active alarms** currently
tripped on the device. See
[**Device info and LoRaWAN keys**](./device-info.md).

---

## Reuse rules across devices

Alarm rules can be carried in a **template**, so a fleet can be given the same
rules in one pass — see [**Templates**](./templates.md). Rules can also be built
in a browser with the
[**Template Generator**](./template-generator.mdx), and set over the air with the
[**Downlink Commands Generator**](/sticker/connectivity/downlink-commands-generator)
or the `alarm` shell command — see
[**Alarm Rules (Developer Access)**](/sticker/developer-access/alarm-rules).
