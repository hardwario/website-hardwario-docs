---
title: Odesílání downlinků
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Odesílání downlinků {#sending-downlinks}

Zařízení můžete ovládat i přes API. Downlink se **zařadí do fronty** a doručí se
při příštím startu zařízení, odeslání uplinku nebo dotazu na cloud, takže odpověď
nemusí přijít hned (viz [**Downlink**](/cloud/downlink)). Existují tři druhy downlinků,
každý s vlastním endpointem pod `/v2/spaces/{space_id}/devices/{device_id}`:

<Tabs>
<TabItem value="config" label="Konfigurace" default>

`POST …/devices/{device_id}/configs`: tělo je **pole příkazů `app config`** ve formátu JSON:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>/configs' \
  -d '["app config interval-report 1800", "app config interval-sample 60"]'
```

:::warning Neposílejte `config save`
Cloud konfiguraci použije a uloží automaticky. Kdybyste `config save` přidali,
mohla by se změna použít dvakrát, proto ho vynechte.
:::

</TabItem>
<TabItem value="shell" label="Příkaz shellu">

`POST …/devices/{device_id}/commands`: tělo je **pole příkazů shellu** ve formátu JSON;
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

`POST …/devices/{device_id}/downlinks`: tělo je **objekt** JSON, který dekóduje
firmware zařízení:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>/downlinks' \
  -d '{ "relay": true, "setpoint": 21.5 }'
```

</TabItem>
</Tabs>
