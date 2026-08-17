---
slug: cellular-networks
title: Mobile Networks
---
import Image from '@theme/IdealImage';

# Mobile Networks

In this article, you will find details on various supported cellular networks and the particular settings in various environments. The **CHESTER** platform supports **LTE-M** and **NB-IoT** cellular technologies using  **nRF9160** System-in-Package from **Nordic Semiconductor**.

---

## Network Requirements

Before deploying **CHESTER** on a network you have not tested before, compare what the device supports with what the local operator actually provides. The two lists below are meant to be used together — the first one states the device capabilities, the second one is a checklist you can forward to your SIM card provider or mobile operator.

### What the Device Supports

| Capability | CHESTER support |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Radio technology**      | **LTE-M** (Cat M1) and **NB-IoT** (Cat NB1). Both technologies are supported and their priority is configurable — see [`mode`](#mode--network-mode-selection).       |
| **Frequency bands**       | 1, 2, 3, 4, 5, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28 and 66. No band lock is applied by default — the modem scans all supported bands. The scan can be narrowed down with [`bands`](#bands--frequency-band-lock). |
| **Operator selection**    | Automatic PLMN selection, or a manually forced PLMN ID — see [`network`](#network--plmn-selection).                                                                  |
| **Data roaming**          | Supported. The device accepts the *registered, roaming* state as a fully valid registration.                                                                         |
| **APN**                   | Both the default (network-provided) APN and an explicitly configured one — see [`apn`](#apn--network-apn-access-point-name).                                         |
| **APN authentication**    | `none`, `PAP` or `CHAP` — see [`auth`](#auth--authentication-method).                                                                                                |
| **SIM form factor**       | **Nano-SIM (4FF)**. A soldered **MFF2** SIM chip variant is available for bulk orders.                                                                               |
| **Power saving**          | The firmware requests **PSM** (Power Saving Mode). PSM is not a hard requirement — **CHESTER** also works on networks that do not grant it, only at the cost of a higher power consumption. |

### What to Confirm with Your Operator

Each answer below maps directly to one of the [configuration parameters](#configuration-parameters) described later in this article.

* **Bands** — which of the supported bands does the network use at the deployment site, separately for LTE-M and NB-IoT?
* **APN** — is an explicit APN required, or can the default (network-provided) APN be used?
* **APN authentication** — is `PAP` or `CHAP` required and, if so, what are the credentials?
* **PLMN** — must a specific PLMN ID be forced, for example when the SIM operates in permanent roaming?
* **Data roaming** — is data roaming enabled on the subscription?
* **PSM** — does the network support and grant **PSM**?
* **Other network-specific requirements** — IMEI/IMSI whitelisting, fixed IP address assignment, firewall or port restrictions on the operator side.

---

## Network Mode Configuration

Some catalog firmwares allows configuration to use NB-IoT/LTE or LoRaWAN network. This firmware after power-up is not sending data, the **LED is blinking yellow** and you need to configure correct radio mode.

This `app mode` configuration is needed currently for these catalog applications:

- [CHESTER Clime](https://docs.hardwario.com/chester/catalog-applications/chester-clime)
- [CHESTER Control](https://docs.hardwario.com/chester/catalog-applications/chester-control)
- [CHESTER Push](https://docs.hardwario.com/chester/catalog-applications/chester-push)
- [CHESTER Current](https://docs.hardwario.com/chester/catalog-applications/chester-current)
- [CHESTER Scale](https://docs.hardwario.com/chester/catalog-applications/chester-scale)
- [CHESTER Meteo](https://docs.hardwario.com/chester/catalog-applications/chester-meteo)
- [CHESTER Range](https://docs.hardwario.com/chester/catalog-applications/chester-range)

The default functionality is that a device **does not use any radio** (mode `none`) and you need to set configuration parameter **mode**.

- `app config mode lte` for NB-IoT/LTE network
- `app config mode lrw` for LoRaWAN network

Then apply changes by typing `config save`. The device will reboot and use the correct network.

---

In **HARDWARIO**, we do not restrict customers to use any SIM card provider of their preference (as long as the selected carrier offers one of the supported cellular technologies). On the other hand, for the SIM cards provided by **HARDWARIO**, we can provide an extended level of technical support.

As of now, we can deliver SIM cards for these three carriers:

* **Vodafone** in European countries.
* **1NCE** for other providers in non-European countries.

:::caution

We only support the **Nano-SIM** form factor (4FF) for plastic SIM cards. Alternatively, **HARDWARIO** can provide a SIM chip variant (MFF2) for bulk orders.

:::


## Vodafone Configuration
This is the reference LTE settings using **CHESTER** with the **Vodafone** SIM card:

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
---

## 1nce Configuration
This is the reference LTE settings with using **CHESTER** with the **1nce** SIM card:

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

---

## Other Settings

You can apply the settings using these commands:

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

If configuration parameters are left **empty**, the system will perform **auto-configuration** based on the available hardware and network environment.
- Select the **lte config apn** according to your **sim card holder**

| SimCard holder         | APN              |
| :--------------------- | :----------------|
| 1nce                   | iot.1nce.net     |
| Onomondo               | onomondo         |
| Slovak Telekom         | nbiot.telekom.sk |
| Mobily Saudi Arabia    | M2M-NB           |

---

## Network Settings

This article provides a settings reference for the tested networks and the current **Cloud v2**.

In case of older firmwares, see legacy [**Cloud v1**](#cloud-v1-configuration) chapter.

:::caution

The table below applies to the SIM cards provided by **HARDWARIO**. We cannot guarantee data validity if the SIM cards are sourced from anywhere else.

:::

---

## Configuration Parameters

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

The PLMN IDs of the roaming partners used by the **HARDWARIO** Vodafone SIM cards are listed in the [Vodafone SIM EU28+2](#vodafone-sim-eu282) table.

---

### `apn` – Network APN (Access Point Name)
Defines the APN required to connect to the mobile network:

- The **IP address** is provided by the **SIM card provider**.
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

## Test commands
You can verify the settings using this command:

```
lte config show
```

Run this command to query the LTE registration state:

```
lte state
```

You can read the IMSI (International Mobile Subscriber Identity) of the SIM card even when the CHESTER is not attached:

```
lte imsi
```

To read the ICCID (Integrated Circuit Card Identifier):

```
lte iccid
```

To read the device IMEI (International Mobile Equipment Identity):

```
lte imei
```

---

## Vodafone SIM EU28+2

This table applies for Vodafone SIM card. The `Carrier` column shows which roaming partner Vodafone uses in this area.

| Country                | Technology    | Carrier                           | PLMN ID  | APN         |
| :--------------------- | :------------ | :-------------------------------- | :------- | :---------- |
| Australia              | NB-IoT        | Vodafone                          | `50503`  | `hardwario` |
| Austria                | NB-IoT, LTE-M | A1 Austria                        | `23201`  | `hardwario` |
| Austria                | NB-IoT, LTE-M | Magenta T-Mobile Austria          | `23203`  | `hardwario` |
| Balearic               | NB-IoT, LTE-M | Vodafone Spain                    | `21401`  | `hardwario` |
| Belgium                | NB-IoT, LTE-M | Proximus Belgium                  | `20601`  | `hardwario` |
| Belgium                | NB-IoT, LTE-M | Orange Belgium                    | `20610`  | `hardwario` |
| Belgium                | NB-IoT, LTE-M | Base Belgium                      | `20620`  | `hardwario` |
| Bulgaria               | NB-IoT        | A1 Bulgaria                       | `28401`  | `hardwario` |
| Canada                 | LTE-M         | Telus Canada                      | `302220` | `hardwario` |
| Canada                 | LTE-M         | Bell Mobility Canada              | `302610` | `hardwario` |
| Canary Islands         | NB-IoT, LTE-M | Vodafone Spain                    | `21401`  | `hardwario` |
| Ceuta                  | NB-IoT, LTE-M | Vodafone Spain                    | `21401`  | `hardwario` |
| Croatia                | NB-IoT        | A1 HR                             | `21910`  | `hardwario` |
| Czech Republic         | NB-IoT        | T-Mobile Czech Republic           | `23001`  | `hardwario` |
| Czech Republic         | NB-IoT, LTE-M | Vodafone Czech Republic           | `23003`  | `hardwario` |
| Denmark                | NB-IoT, LTE-M | Nuuday                            | `23801`  | `hardwario` |
| Denmark                | NB-IoT, LTE-M | Telenor Denmark                   | `23802`  | `hardwario` |
| Denmark                | LTE-M         | Telia Denmark                     | `23820`  | `hardwario` |
| Estonia                | LTE-M         | Telia Estonia                     | `24801`  | `hardwario` |
| Estonia                | NB-IoT, LTE-M | Elisa Estonia                     | `24802`  | `hardwario` |
| Finland                | NB-IoT, LTE-M | Elisa Finland                     | `24405`  | `hardwario` |
| Finland                | NB-IoT, LTE-M | DNA Oy Finland                    | `24412`  | `hardwario` |
| Finland                | LTE-M         | Telia Finland                     | `24491`  | `hardwario` |
| France                 | LTE-M         | Orange France                     | `20801`  | `hardwario` |
| France                 | LTE-M         | SFR France                        | `20810`  | `hardwario` |
| France                 | NB-IoT, LTE-M | Bouygues France                   | `20820`  | `hardwario` |
| Germany                | NB-IoT, LTE-M | T-Mobile Germany                  | `26201`  | `hardwario` |
| Germany                | NB-IoT, LTE-M | Vodafone Germany                  | `26202`  | `hardwario` |
| Germany                | NB-IoT, LTE-M | Telefonica Germany                | `26207`  | `hardwario` |
| Greece                 | NB-IoT        | Vodafone-Panafon Greece           | `20205`  | `hardwario` |
| Hong Kong              | NB-IoT        | 3 Hong Kong                       | `45403`  | `hardwario` |
| Hungary                | NB-IoT, LTE-M | Telekom Hungary                   | `21630`  | `hardwario` |
| Hungary                | NB-IoT, LTE-M | Vodafone Hungary                  | `21670`  | `hardwario` |
| Iceland                | NB-IoT        | Vodafone Iceland                  | `27402`  | `hardwario` |
| Ireland                | NB-IoT        | Vodafone Ireland                  | `27201`  | `hardwario` |
| Ireland                | NB-IoT, LTE-M | Three Ireland (Hutchison) Limited | `27205`  | `hardwario` |
| Italy                  | NB-IoT, LTE-M | Vodafone Italy                    | `22210`  | `hardwario` |
| Italy                  | NB-IoT        | Wind Tre                          | `22288`  | `hardwario` |
| Japan                  | LTE-M         | NTT Docomo Japan                  | `44010`  | `hardwario` |
| Japan                  | LTE-M         | Softbank Japan                    | `44020`  | `hardwario` |
| Latvia                 | NB-IoT, LTE-M | LMT Latvia                        | `24701`  | `hardwario` |
| Liechtenstein          | NB-IoT, LTE-M | Swisscom Switzerland              | `22801`  | `hardwario` |
| Liechtenstein          | LTE-M         | Mobilkom Liechtenstein            | `29505`  | `hardwario` |
| Luxembourg             | LTE-M         | Post Luxembourg                   | `27001`  | `hardwario` |
| Madeira                | NB-IoT, LTE-M | Vodafone Portugal                 | `26801`  | `hardwario` |
| Malta                  | NB-IoT, LTE-M | Melita Mobile Ltd.                | `27877`  | `hardwario` |
| Melilla                | NB-IoT, LTE-M | Vodafone Spain                    | `21401`  | `hardwario` |
| Mexico                 | LTE-M         | Telcel Mexico                     | `334020` | `hardwario` |
| Mexico                 | LTE-M         | IUSACell Mexico                   | `334050` | `hardwario` |
| Netherlands            | NB-IoT, LTE-M | Vodafone Netherlands              | `20404`  | `hardwario` |
| Netherlands            | NB-IoT, LTE-M | Odido Netherlands                 | `20416`  | `hardwario` |
| New Zealand            | NB-IoT, LTE-M | One NZ                            | `53001`  | `hardwario` |
| Norway                 | NB-IoT, LTE-M | Telenor Mobil Norway              | `24201`  | `hardwario` |
| Poland                 | LTE-M         | Orange Poland                     | `26003`  | `hardwario` |
| Portugal               | NB-IoT, LTE-M | Vodafone Portugal                 | `26801`  | `hardwario` |
| Puerto Rico            | NB-IoT, LTE-M | T-Mobile United States            | `310260` | `hardwario` |
| Puerto Rico            | LTE-M         | Claro Puerto Rico                 | `330110` | `hardwario` |
| Romania                | NB-IoT, LTE-M | Vodafone Romania                  | `22601`  | `hardwario` |
| Romania                | LTE-M         | Orange Romania                    | `22610`  | `hardwario` |
| Russia                 | NB-IoT        | MTS Russia                        | `25001`  | `hardwario` |
| San Marino             | NB-IoT, LTE-M | Vodafone Italy                    | `22210`  | `hardwario` |
| Santa Cruz de Tenerife | NB-IoT, LTE-M | Vodafone Spain                    | `21401`  | `hardwario` |
| Slovakia               | NB-IoT, LTE-M | Orange Slovakia                   | `23101`  | `hardwario` |
| Slovenia               | NB-IoT, LTE-M | A1 Slovenia                       | `29340`  | `hardwario` |
| South Africa           | NB-IoT        | Vodacom South Africa              | `65501`  | `hardwario` |
| Spain                  | NB-IoT, LTE-M | Vodafone Spain                    | `21401`  | `hardwario` |
| Sweden                 | NB-IoT, LTE-M | Tele2 AB Sweden                   | `24007`  | `hardwario` |
| Sweden                 | LTE-M         | Telenor Sweden                    | `24008`  | `hardwario` |
| Switzerland            | NB-IoT, LTE-M | Swisscom Switzerland              | `22801`  | `hardwario` |
| Switzerland            | NB-IoT, LTE-M | Sunrise Switzerland               | `22802`  | `hardwario` |
| Taiwan                 | NB-IoT        | FarEasTone Taiwan                 | `46601`  | `hardwario` |
| United Kingdom         | NB-IoT        | Vodafone United Kingdom           | `23415`  | `hardwario` |
| United States          | NB-IoT, LTE-M | T-Mobile United States            | `310260` | `hardwario` |
| United States          | NB-IoT, LTE-M | AT&T                              | `310410` | `hardwario` |
| Vatican                | NB-IoT, LTE-M | Vodafone Italy                    | `22210`  | `hardwario` |
| Vietnam                | NB-IoT        | Viettel Vietnam                   | `45204`  | `hardwario` |

---

## Cloud v1 configuration

For our legacy [HARDWARIO Cloud v1](https://legacy.hardwario.cloud) firmwares (usually CHESTER catalogue firmware version is 2.x.x) you need to use a different settings for these two config items:

- **IP** with Vodafone SIM card: `lte config addr 192.168.168.1`
- **IP** with non-Vodafone SIM card: `lte config addr 165.227.146.193`
- **APN**: `lte config apn hardwario.com`

Notice the APN has a `.com` suffix, and IP leads to Cloud v1 UDP server.

Don't forget to **save configuration changes by typing `config save`.**

---

## List Available Networks

You can use CHESTER to scan for networks it can see. This is mainly for troubleshooting purposes.
you have to use J-Link RTT connection with [HARDWARIO CLI](../developer-tools/command-line-tools.md), this doesn't work with a BLE connection.

Open HARDWARIO CLI console by typing `hardwario chester app console`

```
lte config test true
config save

lte test uart enable
lte test wakeup
lte test cmd at\%xsystemmode=1,1,0,0
lte test cmd at+cfun=1
lte test cmd at\%cops=?

<wait for %COPS response>

lte config test false
config save
```

:::warning

Don't forget to disable modem test mode after you get the `%COPS` response so CHESTER can work properly again.

```
lte config test false
config save
```

:::

Response will be in application log during several minutes (e.g. ~3 minutes with usual bandlock for Bands 2, 4, 5, 8, 12, 20, 28) in the form like:

`%COPS: (2,"","","26201",7),(1,"","","26202",7)`

**Output explanation:**

`%COPS: [(<stat>,long alphanumeric <oper>,short alphanumeric <oper>,numeric <oper>[,<AcT>])]`

`<stat>`
- 0 – Unknown
- 1 – Available
- 2 – Current
- 3 – Forbidden

`<oper>`
- PLMNID of operator

`<AcT>`
- 7 – LTE-M
- 9 – NB-IoT

