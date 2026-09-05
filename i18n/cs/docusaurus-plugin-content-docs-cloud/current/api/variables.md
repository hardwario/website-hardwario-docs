---
title: Proměnné
description: "Proměnné uchovávají metadata typu klíč–hodnota u zařízení (umístění,"
---

# Proměnné {#variables}

[**Proměnné**](/cloud/variables) uchovávají metadata typu klíč–hodnota u zařízení (umístění,
kalibrační offset, číslo majetku …), hodí se pro čtení uvnitř transformační
funkce konektoru.

**Vytvoření proměnné**: `POST /v2/spaces/{space_id}/variables`:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/variables' \
  -d '{
    "device_id": "<device-id>",
    "name": "location",
    "value": "warehouse-A-shelf-3"
  }'
```

Výpis a filtrování pomocí `GET …/variables?device_id=<device-id>` (dále `name`,
`environment`, `secure`). Jednotlivou proměnnou spravujte pomocí `GET/PUT/DELETE
…/variables/{id}` a hodnoty uzamkněte pomocí `…/variables/{id}/lock` a `/unlock`.
