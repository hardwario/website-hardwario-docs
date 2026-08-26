---
slug: configuration-parameters
title: Configuration Parameters
---
import Image from '@theme/IdealImage';

# Configuration Parameters

This chapter describes every `lte config` parameter, the values it accepts and when to change it. For ready-made settings per SIM card provider, see [**SIM Card Setup**](sim-card-setup.md).

All parameters are displayed with `lte config show` and stored with `config save`.

---

### `antenna` – Antenna Type
Defines the type of antenna connected to the device:

- `internal` – Use the built-in antenna.
- `external` – Use an externally connected antenna.

---

### `mode` – Network Mode Selection
Specifies the preferred network connectivity modes and their priority:

- `lte-m,nb-iot` – Prefer **LTE-M**, fallback to NB-IoT.
- `nb-iot,lte-m` – Prefer **NB-IoT**, fallback to LTE-M.
- `lte-m` – Use **LTE-M only**.
- `nb-iot` – Use **NB-IoT only**.

> ⚠️ Ensure the selected mode is supported by your SIM card and the local network operator.

---

### `bands` – Frequency Band Lock
Restricts the modem to a subset of the supported frequency bands:

- Leave empty (`""`) to let the modem **scan all supported bands** — this is the default and the recommended setting.
- Enter a space-separated list of band numbers (for example `"3 8 20"`) to lock the modem to those bands only.

Locking the bands shortens the initial network search, but the device will **not** register if the operator uses a band that is not in the list. Only set it once you have confirmed the bands used at the deployment site with your operator.

---

### `network` – PLMN Selection
Forces registration to a specific operator, identified by its **PLMN ID** (MCC + MNC, for example `23003`):

- Leave empty (`""`) for **automatic** operator selection — this is the default.
- Enter a PLMN ID to force **manual** selection, which is typically needed for roaming SIM cards that would otherwise attach to an unsuitable partner network.

The PLMN IDs of the roaming partners used by the **HARDWARIO** Vodafone SIM cards are listed in the [**Vodafone SIM EU28+2**](vodafone-coverage.md) table.

---

### `apn` – Network APN (Access Point Name)
Defines the APN required to connect to the mobile network:

- The **APN** is provided by the **SIM card provider**.
- Leave empty for **auto-configuration**, if supported by the network and modem.

---

### `auth` – Authentication Method
Defines the method of APN authentication:

- `"none"` – No authentication.
- `"pap"` – Use PAP authentication (if supported).
- `"chap"` – Use CHAP authentication (if supported).

> If your SIM does not require authentication, use `"none"`.

---

### `username` – APN Username
The username used for APN authentication.  
Leave empty (`""`) if authentication is not required.

---

### `password` – APN Password
The password used for APN authentication.  
Leave empty (`""`) if authentication is not required.

---

### `addr` – Static IP Address
Specifies the static IP address assigned to the LTE network interface.
For global connection use `"157.245.24.13"`

---

## Legacy: Cloud v1 configuration

For our legacy [HARDWARIO Cloud v1](https://legacy.hardwario.cloud) firmwares (usually **CHESTER** catalogue firmware version 2.x.x) you need different values for these two config items:

- **IP** with Vodafone SIM card: `lte config addr 192.168.168.1`
- **IP** with non-Vodafone SIM card: `lte config addr 165.227.146.193`
- **APN**: `lte config apn hardwario.com`

Notice the APN has a `.com` suffix, and the IP leads to the Cloud v1 UDP server.

Don't forget to **save configuration changes by typing `config save`.**
