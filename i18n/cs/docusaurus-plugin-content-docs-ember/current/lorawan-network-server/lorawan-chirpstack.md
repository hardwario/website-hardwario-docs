---
slug: lorawan-chirpstack
title: ChirpStack v4
title_meta: "ChirpStack v4 (EMBER)"
---
import Image from '@theme/IdealImage';

# ChirpStack v4 {#chirpstack-v4}

Tento návod ukazuje, jak připojit bránu LoRaWAN **HARDWARIO EMBER** (MikroTik RouterOS) k síťovému serveru **ChirpStack v4**.

## Užitečná dokumentace {#useful-docs}
- Instalace ChirpStack v4 → https://docs.hardwario.com/apps/chirpstack/chirpstack-installation
- EMBER → ChirpStack: https://docs.hardwario.com/ember/chirpstack/chirpstack-ember/
- Konfigurace hotspotu EMBER (základy RouterOS, sekce LoRaWAN): https://docs.hardwario.com/ember/hotspot-configuration/

:::info
Než začnete konfigurovat bránu HARDWARIO EMBER, ověřte, že je **ChirpStack v4 nainstalovaný a spuštěný**.

Návod k instalaci najdete zde:  
https://docs.hardwario.com/apps/chirpstack/chirpstack-installation
:::


## Předpoklady {#prerequisites}
- Přístup do správcovského rozhraní zařízení EMBER (**WebFig** nebo **WinBox**)
- Koncový bod pro brány na serveru ChirpStack (název hostitele/IP + porty UDP): obvykle koncový bod **Gateway Bridge**
- Pokud nepoužíváte spravovaný síťový server HARDWARIO, zadejte jako adresu serveru LoRaWAN **svůj vlastní** server LoRaWAN (VPN tunely nejsou potřeba).

---

## 1) Zjistěte Gateway ID (EUI-64) ze zařízení EMBER {#1-get-the-gateway-id-eui-64-from-ember}
V systému MikroTik RouterOS se EUI brány zobrazuje jako **Gateway ID**:

- **IoT → LoRa → Devices → Gateway ID**
![Gateway ID zařízení EMBER](../../../../../ember/lorawan-network-server/images/ember-geteway-id.png)

---

## 2) Nastavte připojení zařízení EMBER (MikroTik RouterOS) k serveru ChirpStack {#2-configure-ember-mikrotik-routeros-to-connect-to-chirpstack}
> RouterOS obvykle vyžaduje, aby byla karta LoRa při změně nastavení LoRa **vypnutá** (Disabled).

1. V levém panelu otevřete **IoT**→ **LoRa**. Klikněte na řádek v seznamu a zvolte Disable. 
![EMBER: vypnutí karty LoRaWAN](../../../../../ember/lorawan-network-server/images/ember-disable-lrw-card.png)

2. V levém panelu otevřete **IoT**→ **LoRa**→ **Servers**. Zvolte **New** a vyplňte pole:
- Name: **Chirpstack**
- Address: **ENTER_ADDRESS_OF_CHIRPSTACK_SERVER**
- Protocol: **UDP**
- Up/Down porty: **1700** (nebo vlastní port)
![EMBER: přidání serveru ChirpStack](../../../../../ember/lorawan-network-server/images/ember-add-chirpstack-server.png)

3. Přejděte na **IoT → LoRa → Devices** a poklepejte na zařízení. V poli Network Servers zkontrolujte, že je vybrán ChirpStack. Pokud ne, klikněte na **+** a přidejte ho.
![EMBER: kontrola síťového serveru](../../../../../ember/lorawan-network-server/images/ember-check-chirpstack-net-ser.png)

4. Zapněte kartu LoRa. Přejděte na **IoT → LoRa → Devices → Enable**
![EMBER: zapnutí karty LoRaWAN](../../../../../ember/lorawan-network-server/images/ember-enable-lrw.png)

---

## 3) Zaregistrujte EMBER jako bránu v serveru ChirpStack {#3-register-ember-as-a-gateway-in-chirpstack}
1. V **ChirpStack v4** otevřete **Tenant → Gateways**.
2. Klikněte na **Add Gateway**.
3. Vyplňte:
   - Name: **EMBER-0** (nebo vlastní název)
   - Gateway ID: **GATEWAY_ID**
   - Stats Interval: **YOUR_PREFERENCE**
4. Klikněte na **Submit**.

![ChirpStack v4: Gateways](../../../../../ember/lorawan-network-server/images/chirpstack-add-geteway.png)

---

## 4) Ověřte provoz brány {#4-verify-gateway-traffic}
- Na zařízení EMBER: v **WebFig → LoRa → Traffic** by se měly zobrazovat příchozí zprávy, když koncová zařízení v okolí vysílají.
- V ChirpStack: brána by měla vykazovat aktivitu (např. aktualizaci stavu nebo hodnoty „last seen“).

---

## Odkazy na dekodéry payloadu (pro koncová zařízení) {#payload-decoder-links-for-end-devices}
EMBER (brána) pakety pouze přeposílá. Dekódování payloadu se v ChirpStack nastavuje **pro každé koncové zařízení/aplikaci** zvlášť.

Ukázkový dekodér (CHESTER Clime):
- Složka s kodekem: https://github.com/hardwario/chester-sdk/tree/main/applications/clime/codec
- JS dekodér pro ChirpStack: https://github.com/hardwario/chester-sdk/blob/main/applications/clime/codec/cs-decoder.js
