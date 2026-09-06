---
slug: index
title: The Things Stack
description: "The Things Stack (TTS) je moderní a škálovatelný síťový server LoRaWAN® navržený pro bezpečnou, spolehlivou a flexibilní IoT konektivitu. Vyvíjí ho The Things Industries a pohání jím veřejné i privátní sítě LoRaWAN; nabízí pokročilou správu zařízení,…"
---
import Image from '@theme/IdealImage';

# The Things Stack {#the-things-stack}

## Úvod {#introduction}

[The Things Stack](https://www.thethingsindustries.com/docs/) (TTS) je moderní a škálovatelný síťový server LoRaWAN® navržený pro bezpečnou, spolehlivou a flexibilní IoT konektivitu. Vyvíjí ho The Things Industries a pohání jím veřejné i privátní sítě LoRaWAN; nabízí pokročilou správu zařízení, bran a aplikací vhodnou pro firmy, vývojáře i poskytovatele služeb.

### Klíčové přínosy {#key-benefits}

- **Bezpečnost na podnikové úrovni**: TTS používá end-to-end šifrování, bezpečné zprovoznění zařízení a architekturu s více nájemci, aby chránil data a zajistil soulad s pravidly.  
- **Škálovatelnost a spolehlivost**: Postavený pro velká nasazení, s clusterováním, redundancí a podporou více regionů.  
- **Flexibilní možnosti nasazení**: Dostupný jako spravovaná cloudová služba, privátní cloud nebo instalace na vlastní infrastruktuře.  
- **Interoperabilita a otevřené standardy**: Plně odpovídá specifikaci LoRaWAN® a snadno se integruje s existujícími IoT platformami přes MQTT, webhooky nebo API.  

### Co s TTS zvládnete {#what-you-can-do-with-tts}

S The Things Stack můžete nasadit a provozovat kompletní infrastrukturu LoRaWAN, od registrace zařízení a správy bran po směrování dat a integraci se systémy třetích stran.  
Můžete budovat a škálovat IoT aplikace pro chytré zemědělství, sledování majetku, správu energií, logistiku nebo průmyslové monitorování, a přitom si udržet plnou kontrolu nad sítí i daty.

---

The Things Stack je základ profesionálních sítí LoRaWAN: bezpečný, škálovatelný a interoperabilní. Ať už budujete privátní IoT řešení, nebo provozujete globální nasazení, TTS vám dá nástroje ke spolehlivé správě zařízení i dat.

---

## Konfigurace The Things Stack {#configure-the-things-stack}

V tomto návodu The Things Stack nastavíte: přidáte brány a zaregistrujete koncová zařízení. Ukazuje, jak pracovat s nastavením LoRaWAN, přiřazovat síťové parametry a správně registrovat zařízení v prostředí vaší aplikace TTS.

👉 **Části návodu krok za krokem:**

- **Brány: https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-gateways**

- **Koncová zařízení: https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices**

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

![Topologie sítě LoRaWAN](../../../../../apps/the-things-stack/images/lora-example.png)
