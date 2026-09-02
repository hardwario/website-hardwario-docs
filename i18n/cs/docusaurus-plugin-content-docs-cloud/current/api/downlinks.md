---
title: Odesílání downlinků
description: "Zařízení můžete ovládat i přes API. Downlink se zařadí do fronty a doručí se"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Odesílání downlinků {#sending-downlinks}

Zařízení můžete ovládat i přes API. Downlink se **zařadí do fronty** a doručí se
při dalším startu zařízení, při odeslání uplinku nebo když se zařízení dotáže
Cloudu — odpověď tedy nemusí být okamžitá (viz [**Downlink**](/cloud/downlink)). Existují tři
druhy, každý má vlastní endpoint pod `/v2/spaces/{space_id}/devices/{device_id}`:

<Tabs>
<TabItem value="config" label="Konfigurace" default>

`POST …/devices/{device_id}/configs` — tělo je JSON **pole příkazů `app config`**:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>/configs' \
  -d '["app config interval-report 1800", "app config interval-sample 60"]'
```

:::warning Neposílejte `config save`
Cloud konfiguraci použije a uloží automaticky. Když `config save` přidáte sami,
může se změna aplikovat dvakrát — vynechte jej.
:::

</TabItem>
<TabItem value="shell" label="Příkaz shellu">

`POST …/devices/{device_id}/commands` — tělo je JSON **pole příkazů shellu**;
odpověď na každý příkaz dostanete zpět ve zprávě:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>/commands' \
  -d '["info show", "app config show"]'
```

</TabItem>
<TabItem value="data" label="Data">

`POST …/devices/{device_id}/downlinks` — tělo je JSON **objekt**, který dekóduje
firmware vašeho zařízení:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>/downlinks' \
  -d '{ "relay": true, "setpoint": 21.5 }'
```

</TabItem>
</Tabs>
