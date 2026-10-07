---
title: Proměnné
title_meta: "Proměnné (HARDWARIO Cloud API)"
---

# Proměnné {#variables}

[**Proměnné**](/cloud/variables) uchovávají u zařízení metadata typu klíč–hodnota (umístění,
kalibrační offset, inventární číslo …), která se hodí číst v transformační
funkci konektoru.

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

Proměnné vypíšete a filtrujete pomocí `GET …/variables?device_id=<device-id>` (dále podle `name`,
`environment`, `secure`). Jednotlivou proměnnou spravujete přes `GET/PUT/DELETE
…/variables/{id}` a hodnoty uzamknete přes `…/variables/{id}/lock` a `/unlock`.
