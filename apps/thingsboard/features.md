---
slug: features
title: Advanced
description: "Advanced features of HARDWARIO Dashboards: assets, the Rule Engine and integrations."
title_meta: "Advanced (HARDWARIO Dashboards)"
---
import Image from '@theme/IdealImage';

# Advanced

When your devices, dashboards, sharing and users are in place (see the [step-by-step guides](/apps/thingsboard/index#step-by-step)), these tools help you organize larger projects, automate workflows and deliver reports to your customers.

:::tip We'll do it for you
Some of these features need technical setup. If you'd rather not do it yourself, write to us at [ask@hardwario.com](mailto:ask@hardwario.com).
:::

---

## [Assets](/apps/thingsboard/assets)

Assets are logical containers that represent real-world objects (buildings, floors, zones or equipment) in HARDWARIO Dashboards. Unlike devices (which represent physical hardware), assets let you build a structured hierarchy that makes access control, dashboard abstraction, and scaling significantly easier.

**Use assets when you need to:**
- Create multi-level hierarchies (e.g. Region → City → Building → Floor)
- Group multiple sensors under a single logical entity
- Share access to a set of devices with a customer through a single asset

{/* Hidden for now (2026-11-18): email notifications and scheduled reports

---

## [Email notifications](/apps/thingsboard/email-notification)

For notification scenarios beyond the [Notification rules](/apps/thingsboard/notifications-manager), the Rule Engine lets you build fully custom email notification chains using JavaScript. This approach gives you complete control over device filtering, data formatting, and rate limiting.

**Use this approach when you need to:**
- Filter notifications by device label or custom attributes
- Format telemetry values and timestamps in the email body (e.g. CET conversion)
- Implement custom rate limiting logic (e.g. one email per 24 hours per device)

---

## [Scheduled reports](/apps/thingsboard/email-reports)

Automatically generate and send periodic PDF reports to your customers on a defined schedule. Reports are built in a visual layout designer and delivered via a configurable email template, completely hands-free once set up.

**Use scheduled reports when you need to:**
- Send monthly or weekly data summaries to clients
- Include charts and tables from multiple devices in a single PDF document
- Automate recurring reporting without manual work

*/}

---

## [Rule Engine](/apps/thingsboard/rule-engine)

The Rule Engine processes every message from your devices: calculations, alarms, notifications, integrations with other systems and device commands. Rule chains are set up by **HARDWARIO**: tell us what you need and we build it for you.

**Typical requests:**
- Calculations and unit conversions (e.g. multi-phase sums, consumption per day)
- Alarms that create and clear themselves based on limits
- Sending data to your ERP, CRM or database
- Commands from a dashboard button to the device

See [Rule Engine](/apps/thingsboard/rule-engine) for all options and how it works.

---

## [Integrations](/apps/thingsboard/integrations)

Connect HARDWARIO Dashboards to other systems, for example a [ChirpStack](/apps/thingsboard/chirpstack-integration) LoRaWAN network server.

:::info ThingsBoard documentation
HARDWARIO Dashboards is built on ThingsBoard. More details in the official ThingsBoard documentation: [ThingsBoard PE documentation](https://thingsboard.io/docs/pe/).
:::
