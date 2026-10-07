---
slug: milesight-ug65
title: UG65
---

import Image from '@theme/IdealImage';

# Brána Milesight UG65-868M {#milesight-gateway-ug65-868m}

Milesight UG65 je **poloprůmyslová brána LoRaWAN®** s **čipsetem SX1302** a **podporou 8 kanálů**. Lze ji **nasadit s připojením přes Ethernet/PoE**, **obslouží velký počet koncových zařízení** a hodí se pro **chytré budovy i průmyslové aplikace**.  

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

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| E-shop HARDWARIO | https://www.hardwario.store/p/milesight-ug65                         |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-gateway/ug65           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ug65-user-guide-en.pdf |
| Produktový list       | https://resource.milesight.com/milesight/iot/document/ug65-datasheet-en.pdf |

---

## Konektivita {#connectivity}
| Typ         | Hodnota                                          |
|-------------|--------------------------------------------------|
| Wi-Fi       | Výchozí SSID: Gateway_**** / Heslo: iotpassword  |
| Adresa pro přístup | http://192.168.1.1                        |
| Přihlášení  | admin / password                                 |

---

## Konfigurace sítě {#network-configuration}

**Úvodní nastavení:**
1. Připojte bránu k napájení přes **PoE** nebo **napájecí adaptér**
2. Připojte se k **síti Wi-Fi** brány:
   - **SSID:** Gateway_**** (uvedené na štítku zařízení)
   - **Heslo:** iotpassword
3. Otevřete webový prohlížeč a přejděte na **http://192.168.1.1**
4. Přihlaste se údaji: **admin** / **password**

---

## Obecná nastavení {#general-settings}

Než začnete konfigurovat přeposílání paketů, nastavte přes webové rozhraní brány základní systémové parametry.

### System → General Settings {#system--general-settings}

Do pole **Hostname** zadejte ID zařízení vytištěné na jeho štítku (např. `ER10G-XXXX-XX`).

| Nastavení | Hodnota                                |
|----------|----------------------------------------|
| Hostname | ID zařízení ze štítku (`ER10G-XXXX-XX`) |

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

Vypněte přístupový bod Wi-Fi na bráně.

| Nastavení | Hodnota |
|---------|-------|
| Enable  | False |

:::note
Vypnete tím přístupový bod Wi-Fi, přes který se připojujete k webovému rozhraní brány. Než ho vypnete, ověřte, že se k bráně dostanete přes Ethernet.
:::

---

## Přeposílání paketů (CUPS) {#packet-forwarding-cups}

:::caution
Brána má z výroby **výchozí cíl přeposílání**, který **nelze upravit**. Tento výchozí cíl musíte **vypnout** a **vytvořit nový** podle postupu níže.
:::

**Co je CUPS?**
CUPS (Configuration and Update Server) nakonfiguruje bránu automaticky. Stačí nahrát klíč CUPS a brána si všechna ostatní nastavení stáhne sama.

**Postup nastavení:**

1. Ve webovém rozhraní brány **vypněte výchozí cíl** (ID: 0)
2. Vytvořte **nový cíl** s tímto nastavením:

| Nastavení       | Hodnota                                                               |
|-----------------|-----------------------------------------------------------------------|
| Enable          | True                                                                  |
| Type            | The Things Industries                                                 |
| Protocol        | CUPS                                                                  |
| Server address  | hardwario-com.eu1.cloud.thethings.industries                          |
| CA File (*.pem) | Stáhněte ze stránky [kořenových certifikátů TTI](https://www.thethingsindustries.com/docs/concepts/advanced/root-certificates/) |
| Client key file | Nahrajte soubor `cups.key` vygenerovaný ve svém účtu v The Things Stack |

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
Pokud bránu napájíte přes ethernetový kabel RJ45 s PoE, **nepřipojujte k ní zároveň externí napájecí adaptér**. Dva zdroje napájení současně mohou zařízení poškodit.
:::

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Hardwarový systém** | |
| CPU | Čtyřjádrový 1,5 GHz ARM Cortex-A53 |
| Paměť | 512 MB DDR4 |
| Flash | 8 GB eMMC |
| **LoRaWAN®** | |
| Kanály | 8 (half/full duplex) |
| Anténa | 2 × interní + 1 × N-Female externí |
| Frekvence | CN470 / IN865 / EU868 / RU864 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | 27 dBm |
| Citlivost | -140 dBm @292bps |
| Protokoly | V1.0 / V1.0.2 Class A/B/C |
| Podporovaná zařízení | ~2000 (uplink 10 min) |
| Funkce | Filtr paketů, analyzátor šumu, retransmise, FUOTA, multicast |
| **Rozhraní** | |
| Ethernet | 1 × RJ45 (10/100/1000 Mbps, PoE) |
| Wi-Fi | 802.11 b/g/n (2,4 GHz) |
| Mobilní síť (volitelně) | 4G LTE |
| USB | 1 × USB-C (napájení/konzole) |
| Tlačítko Reset | Ano |
| LED | Power, Status, LoRa, Wi-Fi, LTE, ETH |
| **Síť** | |
| Protokoly | MQTT, HTTP(S), Modbus TCP, BACnet/IP, VPN (IPSec, OpenVPN, WireGuard…) |
| Správa | Web, CLI, SNMP, API, DeviceHub |
| Spolehlivost | Záložní WAN (failover) |
| **Napájení** | |
| Zdroj | DC 9–24 V / PoE / 5V USB-C |
| Spotřeba | 2,9 W typ., 4,2 W max |
| **Fyzické vlastnosti** | |
| Rozměry | 180 × 110 × 55,5 mm |
| Hmotnost | 548 g |
| Kryt | PC+ABS, bílá/černá |
| Krytí | IP65 |
| Instalace | Na stůl, na zeď, na sloup |
| Provozní teplota | -40°C ~ +70°C |
| Vlhkost | 0–95% RH (nekondenzující) |
| **Certifikace** | CE, FCC, Telec, JATE, RCM, RoHS |
