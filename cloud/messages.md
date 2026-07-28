---
slug: messages
title: Messages
---

# Messages

The **Messages** page shows all messages exchanged between devices and the Cloud. You can access it from two places:

- **Left sidebar → Messages** — shows messages from all devices in the space
- **Device detail → Messages tab** — shows messages for that specific device only

## Message Types

| Type | Direction | Description |
|---|---|---|
| **data** | up | Periodic uplink payload with sensor readings |
| **session** | up/down | Exchanged during device boot — contains firmware info, config hash, network parameters |
| **config** | down | Configuration sent to the device (only when config hash changed) |
| **encoder** | up | JSON key mapping used to compress data messages |
| **decoder** | up | JSON key mapping used to decompress data messages |
| **shell** | down | Shell commands scheduled for the device |
| **firmware** | down | FOTA firmware update packets |

## Downlink States

Downlink messages (direction: `down`) have a delivery state:

| State | Meaning |
|---|---|
| **pending** | Waiting for the device to wake up and poll the Cloud |
| **sent** | Delivered to the device |
| **cancelled** | Cancelled manually — the device will not receive this message |

## Filtering

By default the list shows messages from the **last 10 days**. Use the filter bar to change:

- **Time range** — extend or narrow the period
- **Type** — filter by message type (data, session, config, …)
- **Direction** — uplink only, downlink only, or both

## Viewing a Message

- Click the **arrow icon** on a message row for a quick JSON preview inline
- Click the **ⓘ icon** to open the full message detail
- Click the **compare icon** on two messages to see a diff of their JSON bodies

## Basic Dashboard

The dashboard is a **debugging tool** that lets you plot values from messages using a small JavaScript function.

Click the **Dashboard** icon above the message list, paste a function that extracts values from each message, and the chart updates in real time.

**Example — plot thermometer temperature:**

<details>
<summary><b>Show Example</b></summary>
<p>

```js
return {
  date: message.created_at,
  Temperature: message.body?.thermometer?.temperature,
}
```

</p>
</details>

**Example — plot all measurements from an aggregated array:**

<details>
<summary><b>Show Example</b></summary>
<p>

```js
const points = message.body?.hygrometer?.temperature?.measurements?.map(m => m.avg);
return {
  date: message.created_at,
  Temperature: points,
}
```

</p>
</details>

:::info

For production dashboards and data visualization, use a [Connector](connectors.md) to push data to a dedicated service such as Grafana, Ubidots, or ThingsBoard.

:::
