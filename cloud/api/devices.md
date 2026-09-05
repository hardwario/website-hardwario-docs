---
title: Managing Devices
---

# Managing Devices

Create, update, and remove devices programmatically, handy for onboarding many
devices from your own system.

**Create a device**: `POST /v2/spaces/{space_id}/devices`. Provide the **Name**,
the **HARDWARIO Serial Number** (`serial_number`), and the device's **Claim Token**
(`token`); optionally add your own `external_id` or attach `tags`:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices' \
  -d '{
    "name": "meter-warehouse-01",
    "serial_number": "2159020389",
    "token": "<claim-token>",
    "external_id": "wh-01"
  }'
```

:::info
The Claim Token is unique per device. Scan its QR code or read it with the
`info show` shell command. See [**Getting Started**](/cloud/first-steps).
:::

Other device endpoints: `PUT …/devices/{id}` (rename, set `external_id`, change
`tags`), `GET …/devices/{id}` (single device), `GET …/devices/count`, and
`DELETE …/devices/{id}`.
