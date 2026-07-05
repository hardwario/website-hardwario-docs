---
slug: /
title: HARDWARIO Cloud
---

# HARDWARIO Cloud

[**HARDWARIO Cloud**](https://hardwario.cloud/) is a device management platform for CHESTER and other HARDWARIO IoT devices. It provides a web interface and REST API for managing devices, receiving messages, configuring devices remotely, and pushing firmware updates over the air.

## Key Features

| Feature | Description |
|---|---|
| **Spaces** | Isolated workspaces — each with its own devices, users, tags and connectors |
| **Devices** | Add and manage IoT devices, view real-time status and firmware info |
| **Messages** | Browse uplink/downlink messages with JSON viewer and basic dashboard |
| **Tags** | Label groups of devices and connect them to connectors |
| **Connectors** | Webhook-based data forwarding with JavaScript transformation |
| **Downlink** | Send config, data or shell commands to devices remotely |
| **FOTA** | Push firmware updates over the air |
| **API** | Full REST API access with API keys |

## How It Works

```
CHESTER device  ──LTE/LoRaWAN──▶  HARDWARIO Cloud  ──Connector──▶  Your system
                                        │
                                   Web interface
                                   REST API
```

All devices belong to a **Space**. A space is the top-level container for everything — devices, users, tags, connectors and variables. You can have multiple spaces (e.g. one per customer or project).

See [**Spaces**](spaces.md) for more details.

## Automatic Codecs

In Cloud v2, device codecs (encoders and decoders) are bundled directly in the firmware and uploaded automatically when the device first connects. There is no need to configure codecs manually.

## Reliable Delivery

Cloud v2 together with the **LTE v2** subsystem in CHESTER adds:
- Automatic packet fragmentation (supports payloads of many kilobytes)
- Receive acknowledgment with automatic retransmission
- SHA-256 message signing

:::info

For information on how to use or upgrade CHESTER firmware to LTE v2, see [How To: LTE v2](/chester/firmware-sdk/how-to-lte-v2).

:::

## Naming Conventions

Names for spaces, devices, tags and connectors follow the same rules:

- Only lowercase letters (`a–z`), digits (`0–9`), and hyphens (`-`)
- At least 3 characters long
- Cannot start with a digit
- Cannot start or end with a hyphen

Regex: `/^[a-z][a-z0-9-]+[a-z0-9]$/`
