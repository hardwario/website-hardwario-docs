---
slug: changelog
title: TAPPER Changelog
toc_min_heading_level: 2
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# TAPPER Changelog

This page tracks all notable changes across the TAPPER platform, including **firmware** and **hardware**. Use the tabs below to filter by change category.

:::info

Firmware source: [hardwario/tapper](https://github.com/hardwario/tapper) on GitHub.

:::

---

## General Platform Updates

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware & Applications" default>

### 2025-08-12 – v1.2.1

- **[FW]** Fixed non-TLS MQTT connection (regression from v1.2.0)
- **[FW]** Fixed license notice in source files

### 2025-06-26 – v1.2.0

- **[FW]** Network configuration via NetworkManager/dbus: TAPPER can now manage its own network interface
- **[FW]** New installation dependencies: `git pipx python3-dev cmake libdbus-1-dev libglib2.0-dev`

### 2025-05-28 – v1.1.0

- **[FW]** TLS support for MQTT connections: secure end-to-end communication

### 2025-05-23 – v1.0.3

- **[FW]** Fixed LED off-request logic
- **[FW]** README improvements

### 2025-05-23 – v1.0.2

- **[FW]** Minor fixes and stability improvements

### 2025-05-23 – v1.0.1

- **[FW]** Initial release
- **[FW]** MQTT communication
- **[FW]** MIFARE Classic NFC card reading
- **[FW]** Tamper switch detection
- **[FW]** Remote output control

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

:::info

No hardware revisions have been logged yet. Hardware updates will appear here when new TAPPER board revisions are released.

:::

{/* separator */}
</TabItem>
</Tabs>
