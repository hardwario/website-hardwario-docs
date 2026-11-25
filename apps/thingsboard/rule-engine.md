---
slug: rule-engine
title: Rule Engine
description: "What the Rule Engine of HARDWARIO Dashboards does, what HARDWARIO can build for you with it (calculations, alarms, integrations, device commands) and how a custom rule chain is set up."
---

# Rule Engine

The Rule Engine processes every message that your devices send to HARDWARIO Dashboards. It works in **rule chains**: flowcharts made of nodes, where each node does one step, for example a calculation, a check against a limit, an alarm, an e-mail, or a call to another system. The data from your devices passes through these steps before it is saved and shown on your dashboards.

---

## Who sets it up

In HARDWARIO Dashboards, rule chains are set up and maintained by **HARDWARIO**. Your account does not have a Rule chains section: rule chains run for the whole platform, and a mistake in them could stop data from being saved.

You describe what you need, and we build, test and connect the rule chain for you.

---

## What we can build for you

- **Calculations and conversions:** unit conversions, sums of several phases or sensors, differences, consumption per hour or day, values derived from a calibration table.
- **Data cleaning:** ignore obviously wrong readings (for example a temperature of 1000 °C), smooth noisy values, or keep only selected values.
- **Alarms:** create an alarm when a value crosses a limit or a device stops sending data, and clear it automatically when the value is back to normal. Alarms can depend on more than one value or device.
- **Notifications:** e-mail, SMS or mobile push for situations that the [Notifications](/apps/thingsboard/notifications-manager) page does not cover, for example messages that combine several devices, or a daily summary.
- **Integrations with other systems:** send data to your ERP, CRM or database over REST API, MQTT or a webhook, or bring in data from outside, such as a weather forecast or prices.
- **Device commands:** forward a command from a dashboard button (for example "open the valve") to the device, or send commands on a schedule or when a condition is met.
- **Extra information on data:** add the location, customer, building or limits stored on the device to each message, so that dashboards and reports can use them.

---

## How it works

1. **Tell us what you need**, for example "send an SMS to the service team when the temperature in the cold room stays above 8 °C for 15 minutes". Write to [ask@hardwario.com](mailto:ask@hardwario.com) or to your HARDWARIO contact.
2. **We confirm the solution:** which devices and values it uses, who gets which messages, and anything that has to be added to the devices or dashboards.
3. **We build it in a separate rule chain** just for your devices and test it on real data.
4. **We connect it after your data is saved.** Your measurements are always stored first, so a custom rule never puts your data at risk.
5. **Changes later:** new limits, recipients or devices are a short request to us.

---

## What you can set up yourself

Some things do not need a rule chain, and you can do them directly in your account:

- **Notifications** when a value crosses a limit or a device stops sending data: see [Notifications](/apps/thingsboard/notifications-manager).
- **Dashboards** for your devices: see [Your first dashboard](/apps/thingsboard/creating-dashboard).
- **Users and access:** see [Groups, roles & permissions](/apps/thingsboard/users-managing).

:::info ThingsBoard documentation
HARDWARIO Dashboards is built on ThingsBoard. More details in the official ThingsBoard documentation: [Rule engine](https://thingsboard.io/docs/pe/user-guide/rule-engine/).
:::
