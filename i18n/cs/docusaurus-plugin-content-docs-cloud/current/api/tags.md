---
title: Tagy
description: "Tagy seskupují zařízení a právě podle nich konektory rozhodují, která"
---

# Tagy {#tags}

Tagy seskupují zařízení a právě podle nich [**konektory**](/cloud/connectors) rozhodují, která
zařízení přeposílat: konektor zpracovává zprávy ze zařízení, která mají stejný tag.

**Vytvoření tagu**: `POST /v2/spaces/{space_id}/tags` s hodnotami `name` a `color`
(hex):

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/tags' \
  -d '{ "name": "temperature-sensors", "color": "#009cfa" }'
```

**Přiřazení tagu k zařízení**: aktualizujte zařízení pomocí `id` tagu:

```bash
curl -X PUT \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>' \
  -d '{ "tags": [ { "id": "<tag-id>" } ] }'
```

Seznam tagů získáte pomocí `GET …/tags`; jednotlivý tag spravujete přes `GET/PUT/DELETE …/tags/{id}`.
