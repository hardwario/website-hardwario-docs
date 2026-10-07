---
slug: index
title: The Things Stack
description: "The Things Stack (TTS) je moderní a škálovatelný síťový server LoRaWAN® navržený pro bezpečné, spolehlivé a flexibilní připojení zařízení IoT."
---
import Image from '@theme/IdealImage';

# The Things Stack {#the-things-stack}

## Úvod {#introduction}

[The Things Stack](https://www.thethingsindustries.com/docs/) (TTS) je moderní a škálovatelný síťový server LoRaWAN® navržený pro bezpečné, spolehlivé a flexibilní připojení zařízení IoT. Vyvíjí ho společnost The Things Industries a běží na něm veřejné i privátní sítě LoRaWAN. Nabízí pokročilou správu zařízení, bran a aplikací pro firmy, vývojáře i poskytovatele služeb.

### Klíčové přínosy {#key-benefits}

- **Bezpečnost na podnikové úrovni**: TTS chrání data a zajišťuje soulad s předpisy end-to-end šifrováním, bezpečným zprovozněním zařízení a architekturou pro více nájemců (multi-tenant).  
- **Škálovatelnost a spolehlivost**: Je určený pro rozsáhlá nasazení a podporuje clustering, redundanci i provoz ve více regionech.  
- **Flexibilní možnosti nasazení**: Je dostupný jako spravovaná cloudová služba, privátní cloud nebo instalace na vlastní infrastruktuře.  
- **Interoperabilita a otevřené standardy**: Plně odpovídá specifikaci LoRaWAN® a přes MQTT, webhooky nebo API se snadno propojí se stávajícími platformami IoT.  

### Co s TTS zvládnete {#what-you-can-do-with-tts}

S The Things Stack můžete nasadit a provozovat kompletní infrastrukturu LoRaWAN, od registrace zařízení a správy bran po směrování dat a integraci se systémy třetích stran.  
Můžete vytvářet a škálovat aplikace IoT pro chytré zemědělství, sledování majetku, správu energií, logistiku nebo průmyslové monitorování a přitom si ponechat plnou kontrolu nad sítí i daty.

---

The Things Stack je základ profesionálních sítí LoRaWAN: bezpečný, škálovatelný a interoperabilní. Ať už stavíte privátní řešení IoT, nebo provozujete globální nasazení, TTS vám dává nástroje, se kterými zařízení i data spolehlivě spravujete.

---

## Konfigurace The Things Stack {#configure-the-things-stack}

V tomto návodu The Things Stack nastavíte: přidáte brány a zaregistrujete koncová zařízení. Návod ukazuje, jak pracovat s nastavením LoRaWAN, jak přiřadit síťové parametry a jak zařízení správně zaregistrovat v aplikaci TTS.

👉 **Části návodu krok za krokem:**

- **Brány: https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-gateways**

- **Koncová zařízení: https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices**

---

## Síť LoRaWAN {#lorawan-network}
LoRaWAN je **protokol pro sítě s nízkou spotřebou a velkým pokrytím (LPWAN)** postavený nad modulací LoRa. Je navržený přímo pro aplikace internetu věcí (IoT). Modulace LoRa vychází z rozprostřeného spektra s rozmítáním (CSS), díky kterému nabízí **spojení na velké vzdálenosti**, **odolnost proti rušení** a **provoz s velmi nízkou spotřebou**.  

---

### Zařízení a brány {#devices-and-gateways}
Koncová zařízení, například **senzory nebo akční členy**, bývají napájená z baterií a komunikují modulací LoRa. Tato zařízení posílají zprávy protokolem **na principu ALOHA**, tedy odesílají data, kdykoli potřebují, a přijmout je může jakákoli **brána** v dosahu. Brány pak fungují jako **přeposílače paketů** (packet forwarder) a přijaté zprávy předávají přes IP (Ethernetem, Wi-Fi nebo mobilní sítí) na síťový server.  

### Síťový server {#network-server}
**Síťový server** je řídicím centrem sítě LoRaWAN. Zajišťuje:  
- Autentizaci a správu zařízení.  
- Odstranění duplicit, když tutéž zprávu přijme několik bran.  
- Výběr nejvhodnější brány pro downlinky.  
- Vynucení **end-to-end bezpečnosti** šifrováním AES-128.  

### Aplikační vrstva {#application-layer}
Po zpracování předá síťový server zprávy na **aplikační server**. Tam lze data **vizualizovat na dashboardech**, **integrovat do cloudových aplikací** nebo je použít ke spouštění **automatizačních scénářů**.  

### Topologie a typické využití {#topology-and-use-cases}
LoRaWAN používá topologii **„hvězda hvězd“** (star-of-stars), kde se koncová zařízení připojují k několika branám a ty jsou připojené k centrálnímu serveru. Tato architektura se hodí pro aplikace, které potřebují **velký dosah**, **nízkou spotřebu** a **malé a málo časté zprávy**. Typicky se používá v **chytrém zemědělství, chytrých městech, sledování majetku, odečtu měřidel energií a průmyslovém monitorování**.  

### Topologie sítě LoRaWAN {#lorawan-network-topology}

![Topologie sítě LoRaWAN](../../../../../apps/the-things-stack/images/lora-example.png)
