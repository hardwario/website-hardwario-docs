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

The Rule Engine is the core automation system of HARDWARIO Dashboards. It processes every incoming message from your devices using a visual node-based editor, giving you full control over data transformation, alarm management, and third-party integrations.

**Use the Rule Engine when you need to:**
- Transform or calculate values from incoming telemetry (e.g. unit conversions, multi-phase sums)
- Create and automatically clear alarms based on threshold conditions
- Push data to external systems via REST API calls
- Route and process device commands (RPC)

:::caution
When editing the Root Rule Chain, always preserve the **Save Timeseries** and **Save Client Attributes** nodes. Removing them will stop all data from being saved to the database. See the [Rule Engine](/apps/thingsboard/rule-engine) guide for safe editing practices.
:::

---

## [Integrations](/apps/thingsboard/integrations)

Connect HARDWARIO Dashboards to other systems, for example a [ChirpStack](/apps/thingsboard/chirpstack-integration) LoRaWAN network server.

:::info ThingsBoard documentation
HARDWARIO Dashboards is built on ThingsBoard. More details in the official ThingsBoard documentation: [ThingsBoard PE documentation](https://thingsboard.io/docs/pe/).
:::
