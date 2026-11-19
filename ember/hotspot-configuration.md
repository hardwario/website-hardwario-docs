---
slug: hotspot-configuration
title: Hotspot Configuration
description: "Details of the EMBER Hotspot configuration, which is defined by the RouterOS configuration script."
---
import Image from '@theme/IdealImage';

# Hotspot Configuration

In this article, you will find details on the EMBER Hotspot configuration. It is defined by the [**RouterOS configuration script**](https://help.mikrotik.com/docs/display/ROS/Getting+started).

## System Concept

There is at least one site for **EMBER** service, but you can use several network server instances and several sites.

The minimal site configuration is:

* One **LoRaWAN** device (such as CHESTER)

* One **LoRaWAN** gateway (EMBER Hotspot)

* One instance of a **LoRaWAN** server (**ChirpStack** or **The Things Stack** self-hosted, or **The Things Stack** operated by **HARDWARIO** as a [managed service](cloud-service.md))

Every **EMBER Hotspot** can serve more than 100 **LoRaWAN** devices if these are within the radio coverage.

:::tip

The redundant site configuration comes with a minimum of two **EMBER Hotspot** units (both within the radio coverage of the devices).

:::

## IP Addresses

These are the interfaces to which **IP** addresses apply:

* **WAN Ethernet**: assigned using **DHCP** client

* **LAN Ethernet**: non-routed `172.31.255.254`

  :::caution

  This interface provides **DHCP** server functionality.

  :::

* **LTE Modem**: assigned dynamically by an **LTE** carrier

* **OpenVPN endpoint**: `192.168.16.10` for the 1st hotspot, `192.168.16.11` for the 2nd hotspot, etc.

* **WireGuard endpoint**: `192.168.17.10` for the 1st hotspot, `192.168.17.11` for the 2nd hotspot, etc.

The initial **EMBER Hotspot** has the following login credentials:

* Username: `admin`

* Password: `ember`

The management is available through these services:

* **SSH**: remote shell access

* **WinBox**: desktop-based configuration application

* **WebFig**: web-based configuration application

* **RouterOS API**: HTTP REST API

The access is limited from the **LAN** IP network `172.31.255.0/24` and the managed service VPN endpoints `192.168.16.1` + `192.168.17.1`.

## VPN Tunnels

The HARDWARIO [managed service](cloud-service.md) is interconnected with all **EMBER Hotspot** units by two independent VPN tunnels over the **LTE** internet connectivity:

* **OpenVPN**: TCP-based VPN for **LoRaWAN** traffic

* **WireGuard**: UDP-based VPN for remote management of **EMBER Hotspot**

## Protocol Basis

The supported **LoRaWAN** protocol is based on the [**LoRaWAN specification**](https://lora-alliance.org/about-lorawan/).

The supported **LTE** connectivity is based on **3GPP** specifications.

## Naming Convention

The **EMBER Hotspot** name is a compound of the customer identifier + managed service index + **EMBER Hotspot** index.

```
/system identity set name=ember-<customer identifier>-<01>-hotspot-<01>
```

## Configuration Pages

The configuration is split into these pages:

- [Interface Configuration](hotspot-configuration/interface-configuration.md)
- [LoRaWAN](hotspot-configuration/lorawan.md)
- [Securing Access](hotspot-configuration/securing-access.md)
