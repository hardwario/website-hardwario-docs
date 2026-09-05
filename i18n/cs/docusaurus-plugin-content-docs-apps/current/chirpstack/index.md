---
slug: index
title: ChirpStack
description: "ChirpStack je open-source řešení pro budování privátních i veřejných sítí LoRaWAN. Umožňuje organizacím připojit zařízení s velkým dosahem a nízkou spotřebou, například senzory a měřiče, a spravovat je přes snadno použitelné rozhraní. ChirpStack…"
---
import Image from '@theme/IdealImage';

# ChirpStack {#chirpstack}

ChirpStack je open-source řešení pro budování privátních i veřejných [**sítí LoRaWAN**](#lorawan-network). Umožňuje organizacím připojit **zařízení s velkým dosahem a nízkou spotřebou**, například senzory a měřiče, a spravovat je přes snadno použitelné rozhraní. ChirpStack zjednodušuje provoz bezpečných IoT sítí a přitom nabízí flexibilitu při integraci s existujícími podnikovými systémy.

---

## Ukázka přehledového dashboardu {#example-of-an-dashboard-overview}

![Přehledový dashboard ChirpStacku](../../../../../apps/chirpstack/images/chirpstack-dashboard.png)

---

## Začínáme s ChirpStack v4 {#getting-started-with-chirpstack-v4}

Tento článek vás provede instalací a konfigurací ChirpStack v4 pro použití se zařízeními HARDWARIO.  

### 1. Nainstalujte ChirpStack v4 {#1-install-chirpstack-v4}

V tomto návodu se naučíte, jak nainstalovat síťový server ChirpStack a jeho komponenty. Vysvětluje potřebnou přípravu prostředí, instalaci balíčků a počáteční konfiguraci, aby vám ChirpStack v systému běžel.  

👉 **Návod krok za krokem: [https://docs.hardwario.com/apps/chirpstack/chirpstack-installation](./chirpstack-installation.md)**  

### 2. Nastavte ChirpStack v4 {#2-configure-chirpstack-v4}

V tomto návodu ChirpStack v4 nastavíte: přidáte brány, zaregistrujete zařízení a nastavíte dekodéry payloadu. Ukazuje, jak spravovat profily zařízení LoRaWAN, přiřazovat síťové parametry a vytvářet vlastní funkce kodeku, které surová data převedou na smysluplné hodnoty.

👉 **Části návodu krok za krokem:**

- **Brány: https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-gateways**  


- **Koncová zařízení: https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-end-devices**  


- **Dekódování dat: https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-decoding**  

---

## Síť LoRaWAN {#lorawan-network}
LoRaWAN je **protokol pro sítě s nízkou spotřebou a velkým pokrytím (LPWAN)** postavený nad modulací LoRa. Je navržený specificky pro aplikace internetu věcí (IoT). Modulace LoRa vychází z rozprostřeného spektra s rozmítáním (CSS), což umožňuje **spojení na velké vzdálenosti**, **odolnost proti rušení** a **provoz s velmi nízkou spotřebou**.  

---

### Zařízení a brány {#devices-and-gateways}
Koncová zařízení, například **senzory nebo aktory**, bývají napájená z baterií a komunikují modulací LoRa. Tato zařízení posílají zprávy protokolem **na principu ALOHA**, tedy odesílají data, kdykoli potřebují, a přijmout je může jakákoli **brána** v dosahu. Brány pak fungují jako **přeposílače paketů** a přijaté zprávy předávají přes IP (Ethernetem, Wi-Fi nebo mobilní sítí) na síťový server.  

### Síťový server {#network-server}
**Síťový server** je centrální inteligencí sítě LoRaWAN. Zajišťuje:  
- Autentizaci a správu zařízení.  
- Odstranění duplicit, když tutéž zprávu přijme několik bran.  
- Určení nejlepší cesty přes bránu pro downlinky.  
- Vynucení **end-to-end bezpečnosti** šifrováním AES-128.  

### Aplikační vrstva {#application-layer}
Po zpracování předá síťový server zprávy na **aplikační server**. Tam lze data **vizualizovat na dashboardech**, **integrovat do cloudových aplikací** nebo je použít ke spouštění **automatizačních scénářů**.  

### Topologie a případy použití {#topology-and-use-cases}
LoRaWAN používá **topologii hvězdy hvězd**, kde se koncová zařízení připojují k několika branám a ty jsou připojené k centrálnímu serveru. Tato architektura je ideální pro aplikace, které potřebují **velký dosah**, **nízkou spotřebu** a **malé, nepříliš časté zprávy**. Typicky se používá ve **chytrém zemědělství, chytrých městech, sledování majetku, měření spotřeb a průmyslovém monitorování**.  

### Topologie sítě LoRaWAN {#lorawan-network-topology}

![Topologie sítě LoRaWAN](../../../../../apps/chirpstack/images/lora-example.png)
