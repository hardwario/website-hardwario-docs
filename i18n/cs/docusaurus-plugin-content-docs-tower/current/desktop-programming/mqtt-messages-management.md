---
slug: mqtt-messages-management
title: Správa zpráv MQTT
---
import Image from '@theme/IdealImage';


V této kapitole si projdeme **záložku Messages** aplikace HARDWARIO Playground.

:::info

**Záložka Messages** má smysl hlavně tehdy, když jste připojeni k zařízení **Radio Dongle**. Jak se připojit, popisuje [**kapitola Správa rádiové sítě**](./radio-network-management.md).

:::

## Záložka Messages {#messages-tab}

Na této záložce uvidíte všechny zprávy ze spárovaných zařízení, případně i jakékoli jiné zprávy MQTT.

:::note

Pokud o protokolu MQTT a zprávách MQTT moc nevíte, podívejte se do [**sekce Protokol MQTT**](../mqtt-protocol/index.md).

:::

Ve výchozím nastavení se zobrazují jen zprávy ze **zařízení HARDWARIO TOWER**.

<Image img={require('../../../../../tower/desktop-programming/images/messages-tab.png')} alt="Záložka Messages s výpisem příchozích zpráv MQTT z teploměru a sekcemi Publish a Subscribed topics níže" />

### Zprávy {#messages}
Hlavní část záložky je nahoře: zobrazují se tu všechny zprávy.

Zprávy přicházejí z [**odebíraných topiců**](#subscribed-topics), které můžete změnit v dolní části záložky.

Topic zprávy zkopírujete **tlačítkem Clipboard** nebo prostým kliknutím na řádek s požadovaným topicem. Hodí se to při [**programování v Node-RED**](./node-red-programming.md). V pravém horním rohu by se měl objevit zelený čtvereček.

Vpravo je **tlačítko Pin**, kterým si důležitou zprávu připnete nahoru.

Můžete také **smazat všechny zprávy** (**Clear all messages**), a tím vymazat celou historii.
:::caution

Tento krok je **nevratný**, buďte proto opatrní.

:::

### Publikování zprávy {#publish-message}
V této části záložky můžete **publikovat zprávy MQTT**:
- Do levého pole zadejte **topic zprávy**, například `node/test`
- Do pravého pole zadejte zprávu, kterou chcete pod tímto topicem poslat, například `test message`

Po kliknutí na tlačítko **Publish** by se zpráva měla objevit v horní části (pokud zvolený topic odebíráte).

<Image img={require('../../../../../tower/desktop-programming/images/messages-publish.png')} alt="Pole pro publikování zprávy s topicem node/test, payloadem test message a tlačítkem Publish" />

### Odebírané topicy {#subscribed-topics}
V dolní části záložky vyberete, **jaké topicy chcete odebírat**.

:::note

Tím určíte, které zprávy se zobrazí v horní části záložky. Ve výchozím nastavení tu nemusíte nic měnit, protože každá zpráva ze zařízení HARDWARIO TOWER začíná na `node/` nebo `bridge/` a tyto topicy už odebíráte.

:::

<Image img={require('../../../../../tower/desktop-programming/images/messages-subscribe.png')} alt="Seznam odebíraných topiců s výchozími odběry node/# a bridge/#" />

Chcete-li přidat nový topic, napište ho do pole a stiskněte **tlačítko Subscribe**. Topic se objeví v seznamu.

Topic ze **seznamu odebíraných** odstraníte **tlačítkem s křížkem** vedle něj.

:::note

Seznam se **vrací do výchozího stavu při každém** spuštění aplikace HARDWARIO Playground.

:::

:::tip

O další záložce se dozvíte v kapitole [**Programování v Node-RED**](./node-red-programming.md).

:::
