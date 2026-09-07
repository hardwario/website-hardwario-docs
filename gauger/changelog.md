---
slug: changelog
title: GAUGER Changelog
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "This page tracks all notable changes across the GAUGER platform, including firmware and hardware. Use the tabs below to filter by change category."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# GAUGER Changelog

This page tracks all notable changes across the GAUGER platform, including **firmware** and **hardware**. Use the tabs below to filter by change category.

:::info

GAUGER firmware is managed through HARDWARIO's internal release process (OTA updates via the device web interface). There is currently no public firmware repository for GAUGER.

:::

---

## General Platform Updates

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware & Applications" default>

### 2025-12-15 – v1.6.0

- **[FW]** Fixed memory leaks in the HTTP server and the FRAM driver
- **[FW]** Fixed buffer overflows in the configuration handling and the HTTP server
- **[FW]** Improved thread safety: static buffers moved to the stack
- **[FW]** Wi-Fi now reconnects automatically, with exponential backoff
- **[FW]** Added null-pointer checks on the network interface
- **[FW]** Fixed input 4 getting stuck and no longer counting
- **[FW]** Updated ESP-IDF from 5.2.0 to 5.5.1

### 2025-08-29 – v1.5.1

- **[FW]** The reset reason is now reported in `/api/v1/meta`
- **[FW]** A watchdog reset now raises a panic instead of failing silently
- **[FW]** Logs are kept in persistent memory across reboots

### 2025-07-24 – v1.5.0

- **[FW]** No release notes were recorded for this version

### 2024-03-14 – v1.2.3

- **[FW]** Improved error handling
- **[FW]** Firmware can be rolled back using the USER button
- **[FW]** The device broadcasts its error state

### 2024-03-01 – v1.2.2

- **[FW]** Web interface improvements
- **[FW]** Wi-Fi scanning refactored

### 2024-03-01 – v1.2.1

- **[FW]** New Wi-Fi scanning pop-up and better error handling
- **[FW]** Redirect after a network settings change
- **[FW]** Subnet validation removed
- **[FW]** Visual and usability improvements, plus many bug fixes

### 2024-03-01 – v1.2.0

- **[FW]** Counter storage now journalled
- **[FW]** Web logging made thread safe
- **[FW]** New LED behaviour
- **[FW]** Fixed counters resetting on their own
- **[FW]** Fixed `factory_reset` not sending a response
- **[FW]** Fixed visual bugs in the SSID picker

### 2024-02-16 – v1.1.0

- **[FW]** No release notes were recorded for this version

### 2024-01-22 – v1.0.0

- **[FW]** Initial release

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

:::info

No hardware revisions have been logged yet.

:::

{/* separator */}
</TabItem>
</Tabs>
