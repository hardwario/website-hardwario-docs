---
title: Tags
title_meta: "Tags (HARDWARIO Cloud API)"
---

# Tags

Tags group devices, and they're how [**Connectors**](/cloud/connectors) decide which
devices to forward: a connector processes messages from devices that share its tag.

**Create a tag**: `POST /v2/spaces/{space_id}/tags` with a `name` and a `color`
(hex):

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/tags' \
  -d '{ "name": "temperature-sensors", "color": "#009cfa" }'
```

**Assign a tag to a device**: update the device with the tag's `id`:

```bash
curl -X PUT \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>' \
  -d '{ "tags": [ { "id": "<tag-id>" } ] }'
```

List tags with `GET …/tags`; manage a single tag with `GET/PUT/DELETE …/tags/{id}`.
