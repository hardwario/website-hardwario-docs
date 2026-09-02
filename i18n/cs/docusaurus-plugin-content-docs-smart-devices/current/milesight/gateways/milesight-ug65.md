---
slug: milesight-ug65
title: UG65
description: "Milesight UG65 je poloprůmyslová brána LoRaWAN® postavená na čipsetu SX1302 s podporou 8 kanálů. Umožňuje nasazení přes Ethernet/PoE, nabízí vysokou kapacitu uzlů a je vhodná pro aplikace v inteligentních budovách a průmyslu."
---

import Image from '@theme/IdealImage';

# Milesight Gateway UG65-868M {#milesight-gateway-ug65-868m}

Milesight UG65 je **poloprůmyslová brána LoRaWAN®** postavená na **čipsetu SX1302** s **podporou 8 kanálů**. Umožňuje **nasazení přes Ethernet/PoE**, nabízí **vysokou kapacitu uzlů** a je vhodná pro **aplikace v inteligentních budovách a průmyslu**.  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/gateways/images/ug65-868m.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy pro integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-ug65                         |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-gateway/ug65           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ug65-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/ug65-datasheet-en.pdf |

---

## Konektivita {#connectivity}
| Typ         | Hodnota                                          |
|-------------|--------------------------------------------------|
| Wi-Fi       | Výchozí SSID: Gateway_**** / Heslo: iotpassword  |
| Adresa pro přístup | http://192.168.1.1                        |
| Přihlášení  | admin / password                                 |

---

## Konfigurace sítě {#network-configuration}

**Prvotní nastavení:**
1. Zapněte bránu přes **PoE** nebo **napájecí adaptér**
2. Připojte se k **Wi-Fi síti** brány:
   - **SSID:** Gateway_**** (uvedeno na etiketě zařízení)
   - **Heslo:** iotpassword
3. Otevřete webový prohlížeč a přejděte na **http://192.168.1.1**
4. Přihlaste se pomocí: **admin** / **password**

---

## Obecná nastavení {#general-settings}

Než začnete konfigurovat přeposílání paketů, nastavte přes webové rozhraní brány základní systémové parametry.

### System → General Settings {#system--general-settings}

Nastavte **Hostname** na ID zařízení vytištěné na etiketě zařízení (např. `ER10G-XXXX-XX`).

| Nastavení | Hodnota                                |
|----------|----------------------------------------|
| Hostname | ID zařízení z etikety (`ER10G-XXXX-XX`) |

### System → Time {#system--time}

Nastavte časovou zónu brány a zapněte synchronizaci NTP.

| Nastavení         | Hodnota                          |
|-------------------|----------------------------------|
| Time Zone         | 1 Czech Republic (Prague)        |
| Enable NTP Server | True                             |

### System → User Management {#system--user-management}

Změňte výchozí přihlašovací údaje, abyste bránu zabezpečili.

| Nastavení | Hodnota                     |
|----------|-----------------------------|
| Username | *(nastavte nové uživatelské jméno)* |
| Password | *(nastavte silné heslo)*    |

### Network → Interface → WLAN {#network--interface--wlan}

Vypněte Wi-Fi přístupový bod brány.

| Nastavení | Hodnota |
|---------|-------|
| Enable  | False |

:::note
Tímto se vypne Wi-Fi přístupový bod používaný pro připojení k webovému rozhraní brány. Před vypnutím se ujistěte, že máte funkční přístup přes Ethernet.
:::

---

## Přeposílání paketů (CUPS) {#packet-forwarding-cups}

:::caution
Brána je dodávána s **výchozí destinací**, kterou **nelze upravit**. Tuto výchozí destinaci musíte **vypnout** a **vytvořit novou** podle postupu níže.
:::

**Co je CUPS?**
CUPS (Configuration and Update Server) nakonfiguruje vaši bránu automaticky. Stačí nahrát klíč CUPS a brána si všechna ostatní nastavení stáhne sama.

**Postup nastavení:**

1. Ve webovém rozhraní brány **vypněte výchozí destinaci** (ID: 0)
2. Vytvořte **novou destinaci** s následujícím nastavením:

| Nastavení       | Hodnota                                                               |
|-----------------|-----------------------------------------------------------------------|
| Enable          | True                                                                  |
| Type            | The Things Industries                                                 |
| Protocol        | CUPS                                                                  |
| Server address  | hardwario-com.eu1.cloud.thethings.industries                          |
| CA File (*.pem) | Stáhněte z [root certifikátů TTI](https://www.thethingsindustries.com/docs/concepts/advanced/root-certificates/) |
| Client key file | Nahrajte `cups.key` vygenerovaný ve vašem účtu The Things Stack       |

**Důležité:**
- Nahrajte **pouze klíč CUPS** (`cups.key`)
- Brána si **automaticky stáhne** konfiguraci LNS (LoRaWAN Network Server)
- Nastavení LNS není potřeba konfigurovat ručně  

---

## Napájení {#power-supply}
| Typ    | Hodnota                       |
|--------|-------------------------------|
| Napájení | PoE nebo napájecí adaptér   |

:::warning
Pokud je brána napájena přes ethernetový kabel RJ45 s PoE, **nepřipojujte současně externí napájecí adaptér**. Použití obou zdrojů napájení zároveň může zařízení poškodit.
:::

---

## Technické specifikace {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Hardwarový systém** | |
| CPU | Quad-core 1.5 GHz ARM Cortex-A53 |
| Paměť | 512 MB DDR4 |
| Flash | 8 GB eMMC |
| **LoRaWAN®** | |
| Kanály | 8 (half/full duplex) |
| Antény | 2 × interní + 1 × N-Female externí |
| Frekvence | CN470 / IN865 / EU868 / RU864 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 27 dBm |
| Citlivost | -140 dBm @292bps |
| Protokoly | V1.0 / V1.0.2 Class A/B/C |
| Podporovaná zařízení | ~2000 (uplink 10 min) |
| Funkce | Filtr paketů, analyzátor šumu, retransmise, FUOTA, multicast |
| **Rozhraní** | |
| Ethernet | 1 × RJ45 (10/100/1000 Mbps, PoE) |
| Wi-Fi | 802.11 b/g/n (2.4 GHz) |
| Mobilní síť (volitelně) | 4G LTE |
| USB | 1 × USB-C (napájení/konzole) |
| Tlačítko Reset | Ano |
| LED | Power, Status, LoRa, Wi-Fi, LTE, ETH |
| **Síť** | |
| Protokoly | MQTT, HTTP(S), Modbus TCP, BACnet/IP, VPN (IPSec, OpenVPN, WireGuard…) |
| Správa | Web, CLI, SNMP, API, DeviceHub |
| Spolehlivost | WAN failover |
| **Napájení** | |
| Zdroj | DC 9–24 V / PoE / 5V USB-C |
| Spotřeba | 2.9 W typ., 4.2 W max |
| **Fyzické parametry** | |
| Rozměry | 180 × 110 × 55.5 mm |
| Hmotnost | 548 g |
| Kryt | PC+ABS, bílá/černá |
| Krytí | IP65 |
| Instalace | Na stůl, na zeď, na sloup |
| Provozní teplota | -40°C ~ +70°C |
| Vlhkost | 0–95% RH (nekondenzující) |
| **Certifikace** | CE, FCC, Telec, JATE, RCM, RoHS |
