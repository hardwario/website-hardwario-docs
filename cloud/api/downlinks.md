---
title: Sending Downlinks
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sending Downlinks

You can command devices over the API too. A downlink is **queued** and delivered
the next time the device boots, sends an uplink, or polls the Cloud, so the
response may not be immediate (see [**Downlink**](/cloud/downlink)). There are three
kinds, each with its own endpoint under `/v2/spaces/{space_id}/devices/{device_id}`:

<Tabs>
<TabItem value="config" label="Config" default>

`POST …/devices/{device_id}/configs`: the body is a JSON **array of `app config`
commands**:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>/configs' \
  -d '["app config interval-report 1800", "app config interval-sample 60"]'
```

:::warning Do not send `config save`
The Cloud applies and saves configuration automatically. Adding `config save`
yourself can double-apply the change, so omit it.
:::

</TabItem>
<TabItem value="shell" label="Shell command">

`POST …/devices/{device_id}/commands`: the body is a JSON **array of shell commands**;
you'll get each command's response back on the message:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>/commands' \
  -d '["info show", "app config show"]'
```

</TabItem>
<TabItem value="data" label="Data">

`POST …/devices/{device_id}/downlinks`: the body is a JSON **object** that your device
firmware decodes:

```bash
curl -X POST \
  -H 'X-API-KEY: <api-key>' \
  -H 'Content-Type: application/json' \
  'https://api.hardwario.cloud/v2/spaces/<space-id>/devices/<device-id>/downlinks' \
  -d '{ "relay": true, "setpoint": 21.5 }'
```

</TabItem>
</Tabs>
