---
slug: hotspot-configuration
title: Konfigurace hotspotu
description: "Podrobnosti o konfiguraci zařízení EMBER Hotspot, kterou definuje konfigurační skript RouterOS."
---
import Image from '@theme/IdealImage';

# Konfigurace hotspotu {#hotspot-configuration}

Tento článek podrobně popisuje konfiguraci zařízení EMBER Hotspot, kterou definuje [**konfigurační skript RouterOS**](https://help.mikrotik.com/docs/display/ROS/Getting+started).

## Koncept systému {#system-concept}

Služba **EMBER** má alespoň jednu lokalitu, můžete ale využít i více lokalit a více instancí síťového serveru.

Minimální konfigurace lokality:

* Jedno zařízení **LoRaWAN** (například CHESTER)

* Jedna brána **LoRaWAN** (EMBER Hotspot)

* Jedna instance serveru **LoRaWAN** (**ChirpStack** nebo **The Things Stack** na vlastním serveru, nebo **The Things Stack** provozovaný společností **HARDWARIO** jako [spravovaná služba](cloud-service.md))

Každé zařízení **EMBER Hotspot** může obsloužit více než 100 zařízení **LoRaWAN**, pokud jsou v jeho rádiovém dosahu.

:::tip

Redundantní konfigurace lokality vyžaduje minimálně dvě jednotky **EMBER Hotspot** (obě v rádiovém dosahu zařízení).

:::

## IP adresy {#ip-addresses}

Adresy **IP** mají tato rozhraní:

* **WAN Ethernet**: adresu přiděluje klient **DHCP**

* **LAN Ethernet**: neroutovaná adresa `172.31.255.254`

  :::caution

  Na tomto rozhraní běží server **DHCP**.

  :::

* **LTE Modem**: adresu dynamicky přiděluje operátor **LTE**

* **OpenVPN endpoint**: `192.168.16.10` pro 1. hotspot, `192.168.16.11` pro 2. hotspot atd.

* **WireGuard endpoint**: `192.168.17.10` pro 1. hotspot, `192.168.17.11` pro 2. hotspot atd.

Zařízení **EMBER Hotspot** má z výroby tyto přihlašovací údaje:

* Uživatelské jméno: `admin`

* Heslo: `ember`

Ke správě slouží tyto služby:

* **SSH**: přístup ke vzdálenému shellu

* **WinBox**: desktopová konfigurační aplikace

* **WebFig**: webová konfigurační aplikace

* **RouterOS API**: HTTP REST API

Přístup je povolen jen z IP sítě **LAN** `172.31.255.0/24` a z VPN endpointů spravované služby `192.168.16.1` a `192.168.17.1`.

## VPN tunely {#vpn-tunnels}

[Spravovaná služba](cloud-service.md) HARDWARIO je se všemi jednotkami **EMBER Hotspot** propojená dvěma nezávislými VPN tunely přes internetové připojení **LTE**:

* **OpenVPN**: VPN na bázi TCP pro provoz **LoRaWAN**

* **WireGuard**: VPN na bázi UDP pro vzdálenou správu zařízení **EMBER Hotspot**

## Základ protokolu {#protocol-basis}

Podporovaný protokol **LoRaWAN** vychází ze [**specifikace LoRaWAN**](https://lora-alliance.org/about-lorawan/).

Podporované připojení **LTE** vychází ze specifikací **3GPP**.

## Konvence pojmenování {#naming-convention}

Název zařízení **EMBER Hotspot** se skládá z identifikátoru zákazníka, indexu spravované služby a indexu zařízení **EMBER Hotspot**.

```
/system identity set name=ember-<customer identifier>-<01>-hotspot-<01>
```

## Stránky konfigurace {#configuration-pages}

Konfigurace je rozdělená do těchto stránek:

- [Konfigurace rozhraní](hotspot-configuration/interface-configuration.md)
- [LoRaWAN](hotspot-configuration/lorawan.md)
- [Zabezpečení přístupu](hotspot-configuration/securing-access.md)
