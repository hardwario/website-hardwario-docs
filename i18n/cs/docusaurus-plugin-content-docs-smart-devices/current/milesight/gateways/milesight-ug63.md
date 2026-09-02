---
slug: milesight-ug63
title: UG63
description: "Milesight UG63 je kompaktní brána LoRaWAN® určená pro menší nasazení s podporou 8 kanálů a až 2000 koncových uzlů. Nabízí připojení přes Ethernet a 4G LTE, snadnou konfiguraci přes Wi-Fi a zajišťuje cenově efektivní pokrytí sítě."
---

import Image from '@theme/IdealImage';

# Milesight Gateway UG63-868M {#milesight-gateway-ug63-868m}

Milesight UG63 je **kompaktní brána LoRaWAN®** určená pro **menší nasazení** s **podporou 8 kanálů** a až **2000 koncových uzlů**. Nabízí **připojení přes Ethernet a 4G LTE**, snadnou **konfiguraci přes Wi-Fi** a zajišťuje **cenově efektivní pokrytí sítě**.  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/gateways/images/ug63-868m.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy pro integraci {#integration-links}
| Zdroj           | Odkaz                                                                 |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | Zatím není k dispozici                                                |
| Oficiální stránka | https://www.milesight.com/iot/product/lorawan-gateway/ug63           |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ug63-user-guide-en.pdf |
| Datasheet       | https://resource.milesight.com/milesight/iot/document/ug63-datasheet-en.pdf |

---

## Konektivita {#connectivity}
| Typ         | Hodnota                                 |
|-------------|-----------------------------------------|
| Wi-Fi       | Připojte se k SSID uvedenému na štítku zařízení |
| Přístupová URL | http://192.168.1.1                   |
| Přihlášení  | admin / password                        |

---

## Konfigurace sítě {#network-configuration}

**Prvotní nastavení:**
1. Zapněte bránu přes **USB-C**
2. Připojte se k **Wi-Fi síti** brány (SSID je uvedeno na štítku zařízení)
3. Otevřete webový prohlížeč a přejděte na **http://192.168.1.1**
4. Přihlaste se údaji: **admin** / **password**

**Nastavení sítě:**
1. Přejděte na **WAN** → **Connection Type**
2. Zvolte jednu z možností:
   - **DHCP Client** – Brána automaticky získá IP adresu z vašeho routeru
   - **Static IP** – IP adresu nastavíte ručně
3. Připojte bránu do vaší **LAN sítě** Ethernet kabelem
4. Při použití DHCP najdete přidělenou IP adresu v **Status** → **Ethernet**

**Závěrečné kroky:**
- Po konfiguraci z bezpečnostních důvodů **vypněte Wi-Fi**:
  - Přejděte na **Settings** → **WLAN** → **Enable** = **false**
- Připojte se k bráně znovu pomocí přidělené IP adresy

---

## Možnosti sítě LoRaWAN {#lorawan-network-options}

Informace o podporovaných platformách LoRaWAN network serverů najdete zde: 👉[**LoRaWAN Network Options**](https://docs.hardwario.com/smart-devices/milesight/gateways/index#lorawan-network-options)

---

## Přeposílání paketů {#packet-forwarding}

Zvolte jednu z následujících možností podle vaší konfigurace:

### Možnost 1: Embedded NS (samostatný provoz) {#option-1-embedded-ns-standalone}
**Vhodné pro:** uživatele bez externího aplikačního serveru

| Nastavení | Hodnota |
|---------|-------|
| Enable  | True  |
| Type    | Embedded NS |

Tento vestavěný network server umožňuje spravovat senzory přímo z webového rozhraní brány.

### Možnost 2: Chirpstack v4 (lokální server) {#option-2-chirpstack-v4-local-server}
**Vhodné pro:** uživatele s lokální instalací Chirpstack

| Nastavení    | Hodnota |
|--------------|-------|
| Enable       | True  |
| Type         | Chirpstack-v4 |
| Server address | IP adresa vašeho Chirpstack serveru (např. 10.0.0.52) |
| MQTT port    | 1883  |
| Region ID    | eu868 |

### Možnost 3: The Things Stack (cloud) {#option-3-the-things-stack-cloud}
**Vhodné pro:** uživatele cloudové IoT platformy

| Nastavení    | Hodnota |
|--------------|-------|
| Enable       | True  |
| Type         | Semtech |
| Server Address | hardwario-com.eu1.cloud.thethings.industries |
| Port up      | 1700  |
| Port Down    | 1700  |
| Data Retransmission | False |

---

## LNS a CUPS {#lns--cups}

**Co to je?**
- **LNS** (LoRaWAN Network Server) – Řídí komunikaci mezi bránou a senzory
- **CUPS** (Configuration and Update Server) – Automaticky konfiguruje a aktualizuje vaši bránu

**Postup nastavení:**

1. Ve webovém rozhraní brány přejděte na **Packet Forwarder** → **General**
2. Nastavte **Destination** na **Basics Station**

**Konfigurace LNS:**
| Nastavení | Hodnota |
|---------|-------|
| URI     | `wss://hardwario-com.eu1.cloud.thethings.industries:8887` |
| CA File | Stáhněte z [TTI root certificates](https://www.thethingsindustries.com/docs/concepts/advanced/root-certificates/), přejmenujte `.pem` na `.trust` |
| Client Key File | Nahrajte soubor `tc.key` z vašeho účtu The Things Stack |

**Konfigurace CUPS:**
| Nastavení | Hodnota |
|---------|-------|
| URI     | `https://hardwario-com.eu1.cloud.thethings.industries:443` |
| CA File | Stejný jako výše |
| Client Key File | Nahrajte soubor `cups.key` z vašeho účtu The Things Stack |
---

## Napájení {#power-supply}
| Typ    | Hodnota |
|--------|--------|
| Napájení | USB-C  |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Hardwarový systém** | |
| CPU | Dvoujádrový 240 MHz, 32bitový Xtensa® LX7 |
| Paměť | 8 MB PSRAM |
| Flash | 16 MB |
| **LoRaWAN®** | |
| Kanály | 8 (half-duplex) |
| Anténa | 1 × externí |
| Frekvence | CN470 / IN865 / EU868 / RU864 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Vysílací výkon | Max. 27 dBm |
| Citlivost | -140 dBm @292bps |
| Protokol | V1.0.3 Class A/C |
| Podporovaná zařízení | ~2000 |
| Pokročilé funkce | Filtrování paketů, retransmise |
| **Rozhraní** | |
| Ethernet | 1 × RJ45 (10/100 Mbps, Auto) |
| Mobilní síť (volitelně) | 4G LTE Cat1/GSM |
| Wi-Fi | 802.11 b/g/n (2,4 GHz, režim AP) |
| USB | 1 × USB-C (napájení/konzole) |
| Tlačítka | Reset |
| LED | System, LTE |
| **Síť** | HTTP(S), MQTT, VPN, OpenVPN klient |
| Konfigurace/aktualizace | Web, API, DeviceHub |
| **Napájení** | |
| Zdroj | 5V/2A (USB-C) / 5–12V DC / PoE splitter |
| Spotřeba | 1.3 W typ., 3.1 W max |
| **Fyzické vlastnosti** | |
| Rozměry | Ø115 × 21 mm (bez antény) |
| Hmotnost | 140 g (bez mobilní sítě), 158 g (s mobilní sítí) |
| Materiál krytu | PC+ABS, bílá |
| Krytí | IP30 |
| Instalace | Na stůl / na stěnu / na strop |
| Provozní teplota | -20°C ~ +50°C |
| Vlhkost | 0–95% RH (nekondenzující) |
| **Certifikace** | CE, FCC |
