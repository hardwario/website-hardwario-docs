---
slug: antenna-gain
title: "Antenna Gain & Output Power"
---

# Antenna Gain & Output Power

This page explains how transmit (TX) power works on a MikroTik LoRa gateway
(R11e-LR8G / wAP LR8G kit) and how to configure the `antenna-gain` setting so the
gateway stays within the legal radiated-power limit (EIRP).

:::warning Read this before attaching an external antenna
There is **no "TX power" setting on the gateway**. The card's only RF control is
`antenna-gain`, and its factory default is `0`. If you attach an antenna with gain
and leave the default, the gateway will radiate **above** the intended power and can
exceed the legal EIRP limit.
:::

---

## How TX power actually works

A MikroTik LoRa gateway does **not** set its own transmit power. The value comes from
the LoRaWAN Network Server and the gateway only compensates for the antenna:

```
radio output (at the connector) = server_value − antenna-gain
radiated EIRP                    = radio output + antenna gain − cable loss
```

- **`server_value`** — the TX power the Network Server requests, in dBm EIRP
  (Semtech UDP `txpk.powe` field). In ChirpStack this is `downlink_tx_power` in the
  region file (e.g. `region_eu868.toml`); `-1` means "use the band maximum".
- **`antenna-gain`** — a MikroTik gateway setting, in dBi. It is a **subtraction**, not
  a boost. It exists so that after the antenna adds its gain back, the radiated EIRP
  matches what the server asked for.

:::note Counter-intuitive
A **higher** `antenna-gain` value produces **lower** power out of the radio. It is a
compensation knob for regulatory compliance, not a way to increase range.
:::

---

## Configure `antenna-gain`

Enter the **real gain of the attached antenna in dBi, minus cable loss**.

:::note
For the full list of LoRa parameters and their exact definitions, see the MikroTik
documentation: [LoRa General Properties](https://help.mikrotik.com/docs/spaces/ROS/pages/16351619/General+Properties).
:::

### WebFig / WinBox

1. Open **LoRa** in the left menu.
2. Click the LoRa interface (e.g. `lora1`).
3. Go to the **General** tab.
4. Set **Antenna Gain** to the antenna's gain in dBi.
5. Click **Apply**.

![The Antenna Gain field in the WebFig / WinBox LoRa Device dialog](images/antenna-gain-winbox.png)

### CLI (terminal / SSH)

```
/lora print
/lora set [find] antenna-gain=2
```

> On newer RouterOS builds the menu may be `/iot lora` instead of `/lora`. If `/lora`
> is not found, use `/iot lora set [find] antenna-gain=2`.

---

## Recommended values

| Antenna | Gain | `antenna-gain` value |
| --- | --- | --- |
| wAP LR8G kit built-in antenna (868 MHz) | 2 dBi | `2` |
| MikroTik omni LoRa antenna kit (`TOF-0809-...`) | 6.5 dBi | `6.5` |
| Other external antenna | see its datasheet | antenna dBi − cable loss |

If the antenna gain is unknown, err on the **higher** side — the gateway will back off
its power further and stay within legal limits.

---

## Worked example (EU868)

Downlink on 869.525 MHz, EIRP limit **27 dBm**, 6.5 dBi antenna, server requests
`powe = 27`:

| `antenna-gain` | Radio output | Radiated EIRP | Result |
| --- | --- | --- | --- |
| `0` (default) | 27 dBm | **33.5 dBm** | <span style={{color: 'var(--ifm-color-danger)'}}>✗</span> 6.5 dB over the limit |
| `6.5` | 20.5 dBm | 27 dBm | <span style={{color: 'var(--ifm-color-success)'}}>✓</span> correct |
| `4.5` (6.5 dBi antenna − 2 dB cable) | 22.5 dBm | 27 dBm | <span style={{color: 'var(--ifm-color-success)'}}>✓</span> correct |

---

## Changing the transmit power itself

Because the gateway takes its power from the Network Server, change the **downlink** TX
power there — for example in ChirpStack, `downlink_tx_power` (dBm EIRP) in
`region_eu868.toml`. The **uplink** TX power is a property of the **end device** (node
firmware or ADR from the server), not the gateway.

To increase real-world range, use a better antenna and/or shorter, lower-loss cable —
then update `antenna-gain` accordingly. The setting itself never adds power.

:::caution wAP LR8G kit — connect the internal antenna first
On the wAP LR8G kit the internal antenna is **not connected from the factory**. Attach
it to the card's **RFIO** u.FL connector (with the device powered off) before use, or
the card cannot transmit or receive over the antenna at all.
:::

---

## Regulatory limits (EU868)

- **Uplink:** max 25 mW = **14 dBm**
- **Downlink** on 869.525 MHz (RX2 band): up to 500 mW = **27 dBm** EIRP
- **EIRP** = TX power (dBm) + antenna gain (dBi) − cable loss (dB)

Always check the LoRaWAN Regional Parameters and your local regulations for the values
that apply to your deployment.

---

## Further reading

- [MikroTik — LoRa General Properties](https://help.mikrotik.com/docs/spaces/ROS/pages/16351619/General+Properties)
  — full reference for all LoRa configuration parameters, including `antenna-gain`.
