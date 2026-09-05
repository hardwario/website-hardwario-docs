---
title: Čtení dat
description: "Většina zdrojů se nachází pod prostorem (Space): /v2/spaces/{spaceid}/…. Každý příklad potřebuje"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Čtení dat {#reading-data}

Většina zdrojů se nachází pod prostorem (Space): `/v2/spaces/{space_id}/…`. Každý příklad potřebuje
`<api-key>` (viz [**Autentizace**](authentication.md)) a `<space-id>`.

## Výpis vašich prostorů {#list-your-spaces}

```bash
curl -H 'X-API-KEY: <api-key>' \
  'https://api.hardwario.cloud/v2/spaces'
```

## Výpis zařízení v prostoru {#list-devices-in-a-space}

`GET /v2/spaces/{space_id}/devices`: podporuje parametry dotazu `limit`, `offset`, `name`,
`serial_number`, `tag_ids` a `sort_by`/`order_by`.

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

## Čtení zpráv zařízení {#read-a-devices-messages}

`GET /v2/spaces/{space_id}/messages`: filtrujte pomocí těchto parametrů dotazu:

| Parametr | Popis |
|---|---|
| `device_id` | Pouze zprávy z tohoto zařízení |
| `tag_id` | Pouze zprávy ze zařízení s tímto tagem |
| `type[]` | Typ(y) zprávy: `data`, `session`, `config`, … (lze opakovat) |
| `direction` | `up` (ze zařízení) nebo `down` (do zařízení) |
| `after` / `before` | Časový rozsah (ISO-8601) |
| `limit` | Maximální počet vrácených zpráv |
| `offset` | UUID poslední přečtené zprávy. Kurzor stránkování |

```bash
curl -H 'X-API-KEY: <api-key>' \
  -H 'Accept: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/messages?device_id=<device-id>&limit=100'
```

:::caution Výchozí hodnoty se liší od webového rozhraní
Přes API je výchozí hodnota `after` **24 hodin zpět** a výchozí `limit` je **20**.
Pokud vidíte zprávy na webu, ale ne přes API, rozšiřte `after` a zvyšte
`limit`.
:::

**Pouze poslední hodnota**: vyžádejte si jednu zprávu, nejnovější první:

```bash
curl -H 'X-API-KEY: <api-key>' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/messages?device_id=<device-id>&type[]=data&limit=1'
```

## Stránkování {#pagination}

Velké sady výsledků procházejte pomocí `limit` a `offset` (jako `offset` dalšího požadavku
předejte `id` poslední přijaté položky). U zpráv můžete také
procházet časové okno pomocí `after`/`before`.
