---
slug: index
title: ThingsBoard
description: "ThingsBoard is an open-source IoT platform that helps businesses connect devices, collect data, and turn it into clear, useful insights."
---
import Image from '@theme/IdealImage';

# ThingsBoard

[**ThingsBoard**](https://app.hardwario.cloud/) is an open-source IoT platform that helps businesses connect devices, collect data, and turn it into clear, useful insights. With ready-to-use dashboards, alerts, and automation tools, it makes it easy to monitor operations, improve efficiency, and scale IoT projects without deep technical expertise.

:::info
**System Access:** You can log in to the HARDWARIO ThingsBoard platform at **https://app.hardwario.cloud/**.

If you are interested in gaining access to the system to view data visualizations and graphs from your HARDWARIO devices, please contact **ask@hardwario.com**.
:::

:::tip Devices from HARDWARIO Cloud
With the [automatic connection](/apps/thingsboard/cloud-connection#automatic-connection) from HARDWARIO Cloud, your devices appear in your ThingsBoard account by themselves - you only add one connector with your device group ID.
:::

---

## Example of an IoT Data Dashboard

import ThingsBoardDashboard from '@site/src/components/ThingsBoardDashboard';

<ThingsBoardDashboard />

---

## Getting Started

Follow these steps to set up ThingsBoard and start monitoring your devices from scratch.

---

### 1. Create a Device in ThingsBoard

Start by logging into [ThingsBoard](https://app.hardwario.cloud/) and creating a new device.
This device will act as the endpoint that receives and stores data sent from HARDWARIO Cloud.

👉 [Adding a New Device](/apps/thingsboard/creating-device)

---

### 2. Connect to HARDWARIO Cloud

Go to [HARDWARIO Cloud](https://hardwario.cloud/) and set up a Connector that points to your ThingsBoard device.
This connector will securely transmit your device data from HARDWARIO Cloud to ThingsBoard.

👉 [Connecting to ThingsBoard](/apps/thingsboard/cloud-connection)

---

### 3. Create a Dashboard

Once the connection is established and data is flowing, create a dashboard in ThingsBoard.
Add widgets such as cards, charts, and gauges to visualize your data in real time.

👉 [Creating a Dashboard](/apps/thingsboard/creating-dashboard)

---

### 4. Set Up User Roles and Groups

ThingsBoard lets you precisely control what each user can see and do.
Define roles with specific permissions and organize users into groups tied to their devices and dashboards.

👉 [User Management](/apps/thingsboard/users-managing)

---

### 5. Add Users

Create user accounts, assign them to groups, and send activation links so your customers can log in and access their dashboards.

👉 [Adding Users](/apps/thingsboard/users)

---

### 6. Share a Dashboard via Public Link

Generate a read-only public URL for any dashboard and share it with clients or stakeholders, with no login required.

👉 [Public Link](/apps/thingsboard/public-link)

---

## Features

ThingsBoard offers a range of advanced features for organizing your data, automating workflows, and delivering reports. See the [Features](/apps/thingsboard/features) section for a full overview.

| Feature | Description |
|---------|-------------|
| [Assets](/apps/thingsboard/assets) | Organize devices into logical hierarchies (buildings, floors, zones) to simplify access control and dashboard abstraction. |
| [Notification Rules](/apps/thingsboard/notifications-manager) | Set up threshold-based email and SMS alerts without writing code, directly from a dashboard widget. |
| [Email Notifications](/apps/thingsboard/email-notification) | Build custom Rule Chains to send conditional email alerts with formatted data and configurable rate limiting. |
| [Scheduled Reports](/apps/thingsboard/email-reports) | Automatically generate and deliver periodic PDF reports to customers on a defined schedule. |
| [Rule Engine](/apps/thingsboard/rule-engine) | Visual programming for data transformation, alarm management, third-party integrations, and device automation. |
