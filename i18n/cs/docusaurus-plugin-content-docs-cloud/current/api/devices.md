---
title: Správa zařízení
description: "Vytvářejte, upravujte a odstraňujte zařízení programově, užitečné při"
---

# Správa zařízení {#managing-devices}

Vytvářejte, upravujte a odstraňujte zařízení programově, užitečné při
zprovoznění mnoha zařízení z vašeho vlastního systému.

**Vytvoření zařízení**: `POST /v2/spaces/{space_id}/devices`. Zadejte **Name**,
**HARDWARIO Serial Number** (`serial_number`) a **Claim Token** zařízení
(`token`); volitelně přidejte vlastní `external_id` nebo přiložte `tags`:

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
Claim Token je pro každé zařízení unikátní. Naskenujte jeho QR kód nebo jej
načtěte shell příkazem `info show`. Viz [**První kroky**](/cloud/first-steps).
:::

Další endpointy pro zařízení: `PUT …/devices/{id}` (přejmenování, nastavení `external_id`, změna
`tags`), `GET …/devices/{id}` (jedno zařízení), `GET …/devices/count` a
`DELETE …/devices/{id}`.
