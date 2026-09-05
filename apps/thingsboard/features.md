---
slug: features
title: Features
---
import Image from '@theme/IdealImage';

# Features

ThingsBoard offers advanced tools for organizing your IoT infrastructure, automating workflows, and delivering reports to your customers. This section covers the key capabilities available on the HARDWARIO ThingsBoard platform.

---

## [Assets](assets)

Assets are logical containers that represent real-world objects (buildings, floors, zones, or equipment) in your ThingsBoard environment. Unlike devices (which represent physical hardware), assets let you build a structured hierarchy that makes access control, dashboard abstraction, and scaling significantly easier.

**Use assets when you need to:**
- Create multi-level hierarchies (e.g. Region → City → Building → Floor)
- Group multiple sensors under a single logical entity
- Share access to a set of devices with a customer through a single asset

---

## [Notification Rules](notifications-manager)

The Notification Rules Manager is a no-code dashboard for setting up threshold-based alerts. Define conditions for your telemetry data and get notified by email or SMS whenever those thresholds are crossed, with no programming required.

**Use notification rules when you need to:**
- Get alerted when a sensor value exceeds a defined limit
- Monitor multiple devices from a single rule
- Control alert frequency with duration and cooldown settings

---

## [Email Notifications](email-notification)

For more advanced notification scenarios, ThingsBoard's Rule Engine lets you build fully custom email notification chains using JavaScript. This approach gives you complete control over device filtering, data formatting, and rate limiting.

**Use this approach when you need to:**
- Filter notifications by device label or custom attributes
- Format telemetry values and timestamps in the email body (e.g. CET conversion)
- Implement custom rate limiting logic (e.g. one email per 24 hours per device)

---

## [Scheduled Reports](email-reports)

Automatically generate and send periodic PDF reports to your customers on a defined schedule. Reports are built in a visual layout designer and delivered via a configurable email template, completely hands-free once set up.

**Use scheduled reports when you need to:**
- Send monthly or weekly data summaries to clients
- Include charts and tables from multiple devices in a single PDF document
- Automate recurring reporting without manual work

---

## [Embedding Dashboards](embedding-dashboards)

Embed public ThingsBoard dashboards directly into external web applications using a simple `iframe`. The approach is optimized for React-based documentation frameworks like Docusaurus (MDX), so your live charts render right inside your own pages.

**Use dashboard embedding when you need to:**
- Display live telemetry and charts inside an external website or documentation page
- Share a read-only dashboard without requiring viewers to log in
- Integrate ThingsBoard visuals into a Docusaurus (MDX) project with the correct JSX syntax

---

## [Rule Engine](rule-engine)

The Rule Engine is ThingsBoard's core automation system. It processes every incoming message from your devices using a visual node-based editor, giving you full control over data transformation, alarm management, and third-party integrations.

**Use the Rule Engine when you need to:**
- Transform or calculate values from incoming telemetry (e.g. unit conversions, multi-phase sums)
- Create and automatically clear alarms based on threshold conditions
- Push data to external systems via REST API calls
- Route and process device commands (RPC)

:::caution
When editing the Root Rule Chain, always preserve the **Save Timeseries** and **Save Client Attributes** nodes. Removing them will stop all data from being saved to the database. See the [Rule Engine](rule-engine) guide for safe editing practices.
:::
