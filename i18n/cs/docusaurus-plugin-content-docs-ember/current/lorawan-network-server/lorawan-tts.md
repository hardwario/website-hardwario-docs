---
slug: lorawan-tts
title: The Things Stack
title_meta: "The Things Stack (EMBER)"
---
import Image from '@theme/IdealImage';

# The Things Stack {#the-things-stack}

Tento návod ukazuje, jak připojit bránu LoRaWAN **HARDWARIO EMBER** (MikroTik RouterOS) k platformě **The Things Stack (TTS)**.

## Užitečná dokumentace {#useful-docs}
- Registrace brány v TTS: https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-gateways/
- MikroTik RouterOS + TTS (UDP / LNS / CUPS): https://help.mikrotik.com/docs/spaces/ROS/pages/67633276/The%2BThings%2BStack
- Konfigurace hotspotu EMBER (základy RouterOS): https://docs.hardwario.com/ember/hotspot-configuration/

## Předpoklady {#prerequisites}
- Přístup do správcovského rozhraní zařízení EMBER (**WinBox**)
- Účet v TTS s oprávněním vytvářet brány
- Pokud nepoužíváte spravovaný síťový server HARDWARIO, zadejte jako adresu serveru LoRaWAN **svůj vlastní** server LoRaWAN (VPN tunely nejsou potřeba).

---

## 1) Zjistěte Gateway EUI (EUI-64) {#1-get-the-gateway-eui-eui-64}
V systému MikroTik RouterOS se EUI brány zobrazuje jako **Gateway ID**:

- **IoT → LoRa → Devices → Gateway ID**
![Gateway ID zařízení EMBER](../../../../../ember/lorawan-network-server/images/ember-geteway-id.png)
---

## 2) Zaregistrujte bránu v The Things Stack {#2-register-the-gateway-in-the-things-stack}
1. V konzoli TTS klikněte na **Register gateway**.
2. Zadejte **Gateway EUI** (použijte **Gateway ID** z RouterOS).
3. Vyplňte údaje o bráně:
   - **Gateway ID** (zvolený identifikátor zařízení, např. **test-gateway-001**)
   - **Gateway Name** (zvolený název zařízení, např. **Test Gateways-001**)   
   - **Frequency plan** (zvolte plán podle svého regionu a hardwaru, např. Europe 868.1 MHz)
4. Zapněte **Require authenticated connection**.
5. Zapněte obě volby:
   - **Generate API key for CUPS**
   - **Generate API key for LNS**
6. Klikněte na **Register gateway** a **stáhněte oba klíče API** (CUPS + LNS).

---

## 3) Nastavte připojení zařízení EMBER (MikroTik RouterOS) k TTS {#3-configure-ember-mikrotik-routeros-to-connect-to-tts}
> RouterOS obvykle vyžaduje, aby byla karta LoRa při změně nastavení LoRa **vypnutá** (Disabled).

V levém panelu otevřete **IoT**→ **LoRa**. Klikněte na řádek v seznamu a zvolte Disable. 
![EMBER: vypnutí karty LoRaWAN](../../../../../ember/lorawan-network-server/images/ember-disable-lrw-card.png)
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
- Auth Key: (hodnota ze souboru **„cups.key“**)
![EMBER: přidání serveru TTS](../../../../../ember/lorawan-network-server/images/ember-tts-server.png)

### Kořenové certifikáty (nutné pro SSL/TLS) {#root-certificates-required-for-ssltls}

Aby se RouterOS mohl k platformě **The Things Stack (LNS / CUPS)** připojit přes zabezpečené TLS, naimportujte do něj oficiální **kořenové certifikáty CA platformy The Things Stack** a označte je jako důvěryhodné (**trusted**).

- Certifikáty stáhněte zde:  
  https://www.thethingsindustries.com/docs/reference/root-certificates/
  
V levém panelu otevřete **Files**→ **Upload** a vyberte soubor „ca.pem“.
![EMBER: nahrání certifikátu TTS](../../../../../ember/lorawan-network-server/images/ember-upload-file.png)

V levém panelu otevřete **System**→ **Certificates**→ **Import**. Klikněte na rozbalovací šipku, vyberte soubor „ca.pem“ a klikněte na **Import**.
![EMBER: import certifikátu TTS](../../../../../ember/lorawan-network-server/images/ember-import-certificate.png)

### Výběr síťového serveru {#select-network-server}
Vyberte síťový server.

- V levém panelu otevřete **IoT → LoRa** a klikněte na zařízení. V novém okně vyberte tlačítkem **+** server TTS a klikněte na **OK**.
![EMBER: výběr síťového serveru](../../../../../ember/lorawan-network-server/images/ember-add-select-network-server.png)
---
## 4) Zapněte a ověřte {#4-enable-and-verify}
1. V RouterOS: **IoT → LoRa → Devices → Enable**
![EMBER: zapnutí karty LoRaWAN](../../../../../ember/lorawan-network-server/images/ember-enable-lrw.png)
2. V konzoli TTS otevřete bránu a zkontrolujte, že se aktualizují **Live data**.

---

## Odkazy na dekodéry payloadu (pro koncová zařízení) {#payload-decoder-links-for-end-devices}
Dekodéry se v TTS konfigurují pro každé **koncové zařízení/aplikaci** (Payload Formatter).

Příklad dekodéru (CHESTER Clime):
- Složka s kodekem: https://github.com/hardwario/chester-sdk/tree/main/applications/clime/codec
- Referenční JS dekodér: https://github.com/hardwario/chester-sdk/blob/main/applications/clime/codec/cs-decoder.js
