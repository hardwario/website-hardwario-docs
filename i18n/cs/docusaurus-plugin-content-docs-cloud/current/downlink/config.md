---
title: Konfigurace
description: "Konfiguraci zařízení lze změnit stejně jako přes BLE nebo J-Link RTT: odešlete jeden nebo více"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Konfigurace {#config}

Konfiguraci zařízení lze změnit stejně jako přes BLE nebo J-Link RTT: odešlete jeden nebo více
příkazů `app config` a zařízení CHESTER je použije při dalším odeslání uplink paketu nebo při dotazu
na Cloud.

Otevřete u zařízení **Messages** → **+&nbsp;SCHEDULE DOWNLINK**, nastavte **Message type** na **config**,
zadejte příkazy do pole **Body** jako obyčejný **text** nebo **JSON** a klikněte na **SEND**.

![Dialog „Schedule downlink" s typem zprávy „config" a příkazy app config v poli Body](../../../../../cloud/downlink/images/downlink-config.png)

<Tabs>
  <TabItem value="text" label="Text" default>

```
app config mode lte
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
```

  </TabItem>
  <TabItem value="json" label="JSON">

```json
{
  "type": "config",
  "device_id": "<device-id>",
  "body": [
    "app config mode lte",
    "app config interval-sample 60",
    "app config interval-aggreg 300",
    "app config interval-report 1800"
  ]
}
```

  </TabItem>
</Tabs>

:::warning[Neposílejte config save přes Cloud]

Při **lokální** konfiguraci zařízení zadáváte na konci `config save`, aby se změny uložily a zařízení
se restartovalo. **Přes Cloud příkaz `config save` posílat nesmíte**, protože HARDWARIO Cloud konfiguraci
použije a uloží automaticky. Pokud jej přidáte sami, může se změna aplikovat dvakrát, proto jej vynechte.

:::

Kompletní seznam konfiguračních parametrů najdete v referenci
[**Default Configuration**](/chester/catalog-applications/common-functionality#default-configuration)
pro zařízení CHESTER; příkaz `app config show` vypíše aktuální hodnoty zařízení.
