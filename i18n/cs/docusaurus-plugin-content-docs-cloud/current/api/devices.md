---
title: Správa zařízení
---

# Správa zařízení {#managing-devices}

Zařízení můžete vytvářet, upravovat a odstraňovat programově, což se hodí, když
zprovozňujete mnoho zařízení z vlastního systému.

**Vytvoření zařízení**: `POST /v2/spaces/{space_id}/devices`. Zadejte **Name**,
**HARDWARIO Serial Number** (`serial_number`) a **Claim Token** zařízení
(`token`); volitelně přidejte vlastní `external_id` nebo připojte `tags`:

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
Claim Token je pro každé zařízení jedinečný. Naskenujte ho z QR kódu, nebo ho
vypište příkazem shellu `info show`. Viz [**První kroky**](/cloud/first-steps).
:::

Další endpointy pro zařízení: `PUT …/devices/{id}` (přejmenování, nastavení `external_id`, změna
`tags`), `GET …/devices/{id}` (jedno zařízení), `GET …/devices/count` a
`DELETE …/devices/{id}`.
