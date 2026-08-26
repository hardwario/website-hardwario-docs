---
slug: network-requirements
title: Network Requirements
---
import Image from '@theme/IdealImage';

# Network Requirements

Before deploying **CHESTER** on a network you have not tested before, compare what the device supports with what the local operator actually provides. The two lists below are meant to be used together — the first one states the device capabilities, the second one is a checklist you can forward to your SIM card provider or mobile operator.

If you are using a **HARDWARIO** Vodafone or 1NCE SIM card, this has already been done for you — go straight to [**SIM Card Setup**](sim-card-setup.md).

---

## What the Device Supports

| Capability | CHESTER support |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Radio technology**      | **LTE-M** (Cat M1) and **NB-IoT** (Cat NB1). Both technologies are supported and their priority is configurable — see [`mode`](configuration-parameters.md#mode--network-mode-selection).       |
| **Frequency bands**       | 1, 2, 3, 4, 5, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28 and 66. No band lock is applied by default — the modem scans all supported bands. The scan can be narrowed down with [`bands`](configuration-parameters.md#bands--frequency-band-lock). |
| **Operator selection**    | Automatic PLMN selection, or a manually forced PLMN ID — see [`network`](configuration-parameters.md#network--plmn-selection).                                                                  |
| **Data roaming**          | Supported. The device accepts the *registered, roaming* state as a fully valid registration.                                                                         |
| **APN**                   | Both the default (network-provided) APN and an explicitly configured one — see [`apn`](configuration-parameters.md#apn--network-apn-access-point-name).                                         |
| **APN authentication**    | `none`, `PAP` or `CHAP` — see [`auth`](configuration-parameters.md#auth--authentication-method).                                                                                                |
| **SIM form factor**       | **Nano-SIM (4FF)**. A soldered **MFF2** SIM chip variant is available for bulk orders.                                                                               |
| **Power saving**          | The firmware requests **PSM** (Power Saving Mode). PSM is not a hard requirement — **CHESTER** also works on networks that do not grant it, only at the cost of a higher power consumption. |

---

## What to Confirm with Your Operator

Each answer below maps directly to one of the [configuration parameters](configuration-parameters.md) described in the previous chapter.

* **Bands** — which of the supported bands does the network use at the deployment site, separately for LTE-M and NB-IoT?
* **APN** — is an explicit APN required, or can the default (network-provided) APN be used?
* **APN authentication** — is `PAP` or `CHAP` required and, if so, what are the credentials?
* **PLMN** — must a specific PLMN ID be forced, for example when the SIM operates in permanent roaming?
* **Data roaming** — is data roaming enabled on the subscription?
* **PSM** — does the network support and grant **PSM**?
* **Other network-specific requirements** — IMEI/IMSI whitelisting, fixed IP address assignment, firewall or port restrictions on the operator side.

Once you have the answers, apply them as described in [**SIM Card Setup**](sim-card-setup.md) under *Other SIM cards*.
