---
title: REST API
---

# HARDWARIO Cloud REST API

HARDWARIO Cloud v2 exposes a full REST API for everything you can do in the web
interface — reading devices and messages, managing tags and variables, sending
downlinks, and more.

- **Base URL:** `https://api.hardwario.cloud/v2`
- **Interactive reference:** [**API Swagger documentation**](https://api.hardwario.cloud/v2/documentation/) — the complete, always-current list of endpoints and schemas.
- **Format:** JSON. Send `Accept: application/json`; IDs are UUIDs.

:::tip Prefer Connectors for live data
For real-time delivery of device messages, use [**Connectors**](/cloud/connectors)
(HTTPS webhooks) rather than polling the REST API. Polling increases delivery
latency, data traffic, and load on the service — a webhook pushes each message to
you the moment it arrives.
:::

## Guides

- [**Authentication**](authentication.md) — create an API key and authenticate your requests.
- [**Reading Data**](reading-data.md) — list spaces, devices, and messages; filtering and pagination.
- [**Managing Devices**](devices.md) — provision, update, and remove devices.
- [**Tags**](tags.md) — create tags and assign them to devices.
- [**Variables**](variables.md) — per-device key–value metadata.
- [**Sending Downlinks**](downlinks.md) — push config, shell, and data commands to a device.
- [**Examples**](examples.md) — complete worked examples in cURL, Python, and Node.js.
