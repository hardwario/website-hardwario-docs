---
slug: lorawan-tts
title: The Things Stack
description: "Tento návod ukazuje, jak připojit LoRaWAN bránu HARDWARIO EMBER (MikroTik RouterOS) k The Things Stack (TTS)."
title_meta: "The Things Stack (EMBER)"
---
import Image from '@theme/IdealImage';

# The Things Stack {#the-things-stack}

Tento návod ukazuje, jak připojit LoRaWAN bránu **HARDWARIO EMBER** (MikroTik RouterOS) k **The Things Stack (TTS)**.

## Užitečná dokumentace {#useful-docs}
- Registrace brány v TTS: https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-gateways/
- MikroTik RouterOS + TTS (UDP / LNS / CUPS): https://help.mikrotik.com/docs/spaces/ROS/pages/67633276/The%2BThings%2BStack
- Konfigurace hotspotu EMBER (základy RouterOS): https://docs.hardwario.com/ember/hotspot-configuration/

## Předpoklady {#prerequisites}
- Přístup do administračního rozhraní zařízení EMBER (**WinBox**)
- Účet v TTS s oprávněním vytvářet brány
- Pokud nepoužíváte spravovaný network server od HARDWARIO, nastavte adresu LoRaWAN serveru na **váš vlastní** LoRaWAN server (VPN tunely nejsou potřeba).

---

## 1) Zjištění Gateway EUI (EUI-64) {#1-get-the-gateway-eui-eui-64}
V systému MikroTik RouterOS se EUI brány zobrazuje jako **Gateway ID**:

- **IoT → LoRa → Devices → Gateway ID**
![Gateway ID zařízení EMBER](../../../../../ember/lorawan-network-server/images/ember-geteway-id.png)
---

## 2) Registrace brány v The Things Stack {#2-register-the-gateway-in-the-things-stack}
1. V konzoli TTS klikněte na **Register gateway**.
2. Zadejte **Gateway EUI** (použijte **Gateway ID** z RouterOS).
3. Vyplňte údaje o bráně:
   - **Gateway ID** (vámi zvolený identifikátor zařízení → příklad: **test-gateway-001**)
   - **Gateway Name** (vámi zvolený název zařízení → příklad **Test Gateways-001**)   
   - **Frequency plan** (zvolte ten, který odpovídá vašemu regionu/hardwaru; např. Europe 868.1 MHz)
4. Zapněte **Require authenticated connection**.
5. Zapněte obě volby:
   - **Generate API key for CUPS**
   - **Generate API key for LNS**
6. Klikněte na **Register gateway** a **stáhněte oba API klíče** (CUPS + LNS).

---

## 3) Konfigurace zařízení EMBER (MikroTik RouterOS) pro připojení k TTS {#3-configure-ember-mikrotik-routeros-to-connect-to-tts}
> RouterOS obvykle vyžaduje, aby byla LoRa karta během změny nastavení LoRa ve stavu **Disabled**.

V levém panelu otevřete **IoT**→ **LoRa**. Klikněte na řádek v seznamu a použijte disable. 
![Vypnutí LRW karty zařízení EMBER](../../../../../ember/lorawan-network-server/images/ember-disable-lrw-card.png)
Stažené klíče použijete v RouterOS.


### CUPS (Configuration & Update Server) {#cups-configuration--update-server}
- Protokol: **CUPS**
- Port: **443**
- Nastavte klíč CUPS (ze staženého souboru `cups.key`)
- Zapněte **SSL/TLS**

V levém panelu otevřete **IoT**→ **LoRa**→ **Servers**. Vyberte **New** a vyplňte pole:
- Name: **TTS-HARDWARIO cups**
- Address: **hardwario-com.eu1.cloud.thethings.industries**
- Port: **443**
- Auth Key: (hodnota ze souboru **"cups.key"**)
![Přidání serveru TTS v zařízení EMBER](../../../../../ember/lorawan-network-server/images/ember-tts-server.png)

### Root certifikáty (nutné pro SSL/TLS) {#root-certificates-required-for-ssltls}

Pro vytvoření zabezpečeného TLS připojení k **The Things Stack (LNS / CUPS)** naimportujte do RouterOS oficiální **Root CA certifikáty The Things Stack** a označte je jako **trusted**.

- Certifikáty stáhněte zde:  
  https://www.thethingsindustries.com/docs/reference/root-certificates/
  
V levém panelu otevřete **Files**→ **Upload** a vyberte soubor "ca.pem".
![Přidání certifikátu TTS v zařízení EMBER](../../../../../ember/lorawan-network-server/images/ember-upload-file.png)

V levém panelu otevřete **System**→ **Certificates**→ **Import**. Klikněte na rozbalovací šipku, vyberte soubor "ca.pem" a klikněte na **Import**.
![Import certifikátu TTS v zařízení EMBER](../../../../../ember/lorawan-network-server/images/ember-import-certificate.png)

### Výběr network serveru {#select-network-server}
Je potřeba vybrat network server.

- V levém panelu otevřete **IoT → LoRa** a klikněte na zařízení. Otevře se nové okno, kliknutím na **+** vyberte server TTS a poté klikněte na **OK**.
![Přidání serveru TTS v zařízení EMBER](../../../../../ember/lorawan-network-server/images/ember-add-select-network-server.png)
---
## 4) Zapnutí a kontrola {#4-enable-and-verify}
1. V RouterOS: **IoT → LoRa → Devices → Enable**
![Zapnutí LRW karty zařízení EMBER](../../../../../ember/lorawan-network-server/images/ember-enable-lrw.png)
2. V konzoli TTS otevřete bránu a zkontrolujte, že se aktualizují **Live data**.

---

## Odkazy na dekodéry payloadu (pro koncová zařízení) {#payload-decoder-links-for-end-devices}
Dekodéry se v TTS konfigurují pro každé **koncové zařízení/aplikaci** (Payload Formatter).

Příklad dekodéru (CHESTER Clime):
- Složka s kodekem: https://github.com/hardwario/chester-sdk/tree/main/applications/clime/codec
- Referenční JS dekodér: https://github.com/hardwario/chester-sdk/blob/main/applications/clime/codec/cs-decoder.js
