---
slug: sim-card-setup
title: SIM Card Setup
---
import Image from '@theme/IdealImage';

# SIM Card Setup

This chapter takes a device from the box to a registered network connection. Follow it in order: set the radio mode first, then apply the settings for your SIM card, then verify the result.

Every configuration change must be confirmed with `config save`, which stores the settings and reboots the device.

---

## Step 1 - Select the radio mode

Some catalog firmwares can use either a cellular (NB-IoT/LTE-M) or a LoRaWAN network. After power-up such a firmware does **not** send any data, the **LED is blinking yellow**, and the radio mode has to be selected first.

The default is that the device uses **no radio at all** (mode `none`), so this step is mandatory on the following catalog applications:

- [CHESTER Clime](https://docs.hardwario.com/chester/catalog-applications/chester-clime)
- [CHESTER Control](https://docs.hardwario.com/chester/catalog-applications/chester-control)
- [CHESTER Push](https://docs.hardwario.com/chester/catalog-applications/chester-push)
- [CHESTER Current](https://docs.hardwario.com/chester/catalog-applications/chester-current)
- [CHESTER Scale](https://docs.hardwario.com/chester/catalog-applications/chester-scale)
- [CHESTER Meteo](https://docs.hardwario.com/chester/catalog-applications/chester-meteo)
- [CHESTER Range](https://docs.hardwario.com/chester/catalog-applications/chester-range)

Set the `mode` parameter to the network you want to use:

```
app config mode lte
```

```
app config mode lrw
```

Use `lte` for an NB-IoT/LTE-M network and `lrw` for LoRaWAN. Then apply the change:

```
config save
```

The device reboots and starts using the selected network.

---

## Step 2 - Apply the settings for your SIM card

Pick the section matching your SIM card. If a parameter is left **empty**, the device performs **auto-configuration** based on the available hardware and the network environment.

### Vodafone SIM card

Reference LTE settings for **CHESTER** with a **Vodafone** SIM card:

```
lte config mode "lte-m,nb-iot"
lte config bands ""
lte config network ""
lte config apn ""
lte config auth "none"
lte config username ""
lte config password ""
lte config addr "192.168.192.4"
```

### 1NCE SIM card

Reference LTE settings for **CHESTER** with a **1NCE** SIM card:

```
lte config mode "lte-m,nb-iot"
lte config bands ""
lte config network ""
lte config apn "iot.1nce.net"
lte config auth "none"
lte config username ""
lte config password ""
lte config addr "157.245.24.13"
```

### Other SIM cards

For a SIM card from another provider, start from the settings below and set the `apn` according to your SIM card holder:

```
lte config antenna "internal"
lte config mode "lte-m,nb-iot"
lte config bands ""
lte config network ""
lte config apn ""
lte config auth "none"
lte config username ""
lte config password ""
lte config addr "157.245.24.13"
lte config modemtrace false
```

| SIM card holder        | APN              |
| :--------------------- | :----------------|
| 1NCE                   | iot.1nce.net     |
| Onomondo               | onomondo         |
| Slovak Telekom         | nbiot.telekom.sk |
| Mobily Saudi Arabia    | M2M-NB           |

If your provider is not listed, ask them for the APN and whether APN authentication is required. The [**Network Requirements**](network-requirements.md) chapter contains a checklist you can forward to them directly.

Do not forget to save the configuration:

```
config save
```

---

## Tested SIM cards and operators

The combinations below have been validated by **HARDWARIO** in the field. This list grows as further operators are put into service. If your operator is not here, it does not mean the device will not work, only that we have not verified it ourselves.

{/* Growth table: add a row for every newly validated operator / SIM card variant. Keep the Status column honest - only mark a row as verified once it has actually run in the field. */}

| SIM card / operator | Coverage | Technology | APN | Notes |
| :------------------ | :------- | :--------- | :-- | :---- |
| **Vodafone** (HARDWARIO) | Europe + roaming partners worldwide | NB-IoT, LTE-M | `hardwario` | Per-country PLMN IDs and APNs are listed in [**Vodafone SIM EU28+2**](vodafone-coverage.md). |
| **1NCE** (HARDWARIO) | Non-European countries | NB-IoT, LTE-M | `iot.1nce.net` | Recommended outside Europe. |
| **Vodafone United Kingdom** | United Kingdom | NB-IoT | `hardwario` | Roaming onto Vodafone UK, PLMN `23415`. |
| **Onomondo** | Multi-operator | NB-IoT, LTE-M | `onomondo` | APN confirmed, no band or PLMN lock required. |
| **Slovak Telekom** | Slovakia | NB-IoT | `nbiot.telekom.sk` | |
| **Mobily** | Saudi Arabia | NB-IoT | `M2M-NB` | |
| **Vodafone Ukraine** | Ukraine | NB-IoT only | *(empty)* | Requires **Nordic nRF9160** modem firmware **v1.3.7**, see [**Nordic nRF9160 Modem Firmware**](../../firmware-flashing/lte-modem-over-j-link.md#nordic-nrf9160-modem-firmware). Apart from that, use the [**Other SIM cards**](#other-sim-cards) settings unchanged. |

:::note

Roaming partners and shared networks change over time, so a working combination can stop working without any change on the device. If a previously working deployment stops registering, run a [**network scan**](diagnostics.md#list-available-networks) at the site before changing the configuration.

:::

---

## Step 3 - Verify your settings

Display the current configuration:

```
lte config show
```

Query the LTE registration state:

```
lte state
```

Read the IMSI (International Mobile Subscriber Identity) of the SIM card. This works even when **CHESTER** is not attached to a network:

```
lte imsi
```

Read the ICCID (Integrated Circuit Card Identifier):

```
lte iccid
```

Read the device IMEI (International Mobile Equipment Identity):

```
lte imei
```

If the device does not reach a registered state, continue with [**Diagnostics and Troubleshooting**](diagnostics.md).
