---
title: Variables
title_meta: "Variables (HARDWARIO Cloud API)"
---

# Variables

[**Variables**](/cloud/variables) store key–value metadata on a device (a location,
calibration offset, asset number …), useful to read inside a connector's
transformation function.

**Create a variable**: `POST /v2/spaces/{space_id}/variables`:

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

List and filter with `GET …/variables?device_id=<device-id>` (also `name`,
`environment`, `secure`). Manage a single variable with `GET/PUT/DELETE
…/variables/{id}`, and pin values with `…/variables/{id}/lock` and `/unlock`.
