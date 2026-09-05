---
title: Reading Data
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reading Data

Most resources live under a Space: `/v2/spaces/{space_id}/…`. Every example needs an
`<api-key>` (see [**Authentication**](authentication.md)) and a `<space-id>`.

## List your spaces

```bash
curl -H 'X-API-KEY: <api-key>' \
  'https://api.hardwario.cloud/v2/spaces'
```

## List devices in a space

`GET /v2/spaces/{space_id}/devices`: supports `limit`, `offset`, `name`,
`serial_number`, `tag_ids`, and `sort_by`/`order_by` query parameters.

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
curl -H 'X-API-KEY: <api-key>' \
  -H 'Accept: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices?limit=500'
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

api_key = '<api-key>'
space_id = '<space-id>'

devices = requests.get(
    f'https://api.hardwario.cloud/v2/spaces/{space_id}/devices?limit=500',
    headers={'X-API-KEY': api_key},
).json()

for d in devices:
    print(d['id'], d['name'])
```

</TabItem>
</Tabs>

## Read a device's messages

`GET /v2/spaces/{space_id}/messages`: filter with these query parameters:

| Parameter | Description |
|---|---|
| `device_id` | Only messages from this device |
| `tag_id` | Only messages from devices with this tag |
| `type[]` | Message type(s): `data`, `session`, `config`, … (repeatable) |
| `direction` | `up` (from device) or `down` (to device) |
| `after` / `before` | Time range (ISO-8601) |
| `limit` | Max messages to return |
| `offset` | UUID of the last message read. The pagination cursor |

```bash
curl -H 'X-API-KEY: <api-key>' \
  -H 'Accept: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/messages?device_id=<device-id>&limit=100'
```

:::caution Defaults differ from the web interface
Over the API, `after` defaults to **24 hours ago** and `limit` defaults to **20**.
If you see messages in the web but not over the API, widen `after` and raise
`limit`.
:::

**Latest value only**: ask for one message, newest first:

```bash
curl -H 'X-API-KEY: <api-key>' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/messages?device_id=<device-id>&type[]=data&limit=1'
```

## Pagination

Page through large result sets with `limit` plus `offset` (pass the `id` of the
last item you received as the next request's `offset`). For messages you can also
walk a time window with `after`/`before`.
