---
slug: mqtt-messages-management
title: MQTT Messages Management
---
import Image from '@theme/IdealImage';


In this chapter, we will go over the **Messages Tab** of Playground

:::info

**Messages Tab** is really useful only after you connect to your **Radio Dongle**, you can read about how to do it in the [**Radio Network Management chapter**](./radio-network-management.md).

:::

## Messages Tab

In this tab, you can view all the messages from your paired devices or just any other MQTT message if you like.

:::note

If you don't know much about MQTT protocol and MQTT messages, you can visit an [**MQTT Protocol section**](../mqtt-protocol/index.md).

:::

By default, the messages that will show up will be just from **HARDWARIO TOWER devices**.

<Image img={require('./images/messages-tab.png')} alt="Messages tab listing incoming thermometer MQTT messages, with Publish and Subscribed topics sections below" />

### Messages
The main part of this tab is at the top where all the messages are shown.

You will receive messages from [**subscribed topics**](#subscribed-topics), you can change these topics at the bottom of the tab.

If you want to copy the topic of the message you can use the **Clipboard button** or just click the line with the topic that you want. This is useful for [**Node-RED Programming**](./node-red-programming.md). The green square should appear at the top right corner.

On the right side, there is a **Pin button**, if there is some message that is important to you, you can pin it to the top.

You can also **Clear all messages**, which will just delete the whole history.
:::caution

This is **irreversible**, so be careful.

:::

### Publish message
In this part of the tab, you can **Publish MQTT messages**
- In the left input field, you just put the **topic of the message**, for example, `node/test`
- In the right input field, you just put the message that you want to send under the selected topic, for example, `test message`

After you click the **Publish** button you should see the message appear in the top part (if you are subscribed to the topic you selected)

<Image img={require('./images/messages-publish.png')} alt="Publish message fields with topic node/test, payload test message, and the Publish button" />

### Subscribed topics
At the bottom of the tab, you can select what **topics you want to subscribe to**.

:::note

This determines what messages will be shown at the top part of the tab. By default, you don't have to touch this because every message from HARDWARIO TOWER devices will start with `node/` or `bridge/` to which you are already subscribed.

:::

<Image img={require('./images/messages-subscribe.png')} alt="Subscribed topics list with the default node/# and bridge/# subscriptions" />

If you want to add any new topic, you can just type it into the field and press the **Subscribe button**. The new topic will appear on the list.

If you want to remove the topic from the **subscribed list**, just press the **cross button** next to the topic.

:::note

This list **resets every time** you launch Playground.

:::

:::tip

To learn about the next tab visit [**Node-RED Programming**](./node-red-programming.md).

:::
