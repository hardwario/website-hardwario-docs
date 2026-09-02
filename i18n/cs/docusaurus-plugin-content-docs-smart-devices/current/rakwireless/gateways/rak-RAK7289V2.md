---
slug: rak-RAK7289V2
title: RAK7289V2
description: "Běží na systému WisGateOS 2 a podporuje více typů připojení k internetu (Ethernet, Wi-Fi, mobilní síť), aby byla zajištěna nepřetržitá dostupnost kritických IoT sítí."
---

import Image from '@theme/IdealImage';

# RAK7289V2 WisGate Edge Pro {#rak7289v2-wisgate-edge-pro}

**RAK7289V2 WisGate Edge Pro** je průmyslová venkovní LoRaWAN® brána. Je navržena pro vysokou spolehlivost a umístěna v krabičce s krytím IP67, takže je vhodná pro náročná prostředí a instalace na stožárech.

Běží na systému **WisGateOS 2** a podporuje více typů připojení k internetu (Ethernet, Wi-Fi, mobilní síť), aby byla zajištěna nepřetržitá dostupnost kritických IoT sítí.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/rakwireless/gateways/images/rak-RAK7289V2.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

## Hlavní vlastnosti {#key-features}

* **Průmyslová konstrukce:** vodotěsná hliníková krabička s krytím IP67.
* **Kanály:** 8 nebo 16 kanálů (podle modelu).
* **Více typů připojení:** Ethernet, Wi-Fi a LTE mobilní síť (u některých modelů s podporou dvou SIM karet).
* **GPS:** integrovaná GPS pro přesnou synchronizaci času a určení polohy.
* **Napájení:** napájení přes PoE (Power over Ethernet) pro jednodušší kabeláž.
* **Správa:** lokální webové rozhraní, SSH a vzdálená správa WisDM.

---

## Technické parametry {#technical-specifications}

| Vlastnost | Parametr |
| :--- | :--- |
| **Model** | RAK7289V2 |
| **LoRa kanály** | 8 nebo 16 kanálů |
| **Frekvence** | EU868 (podporuje i další regiony) |
| **Napájení** | **PoE (802.3af/at)** (48V) |
| **Spotřeba** | max. 12 W |
| **Konektivita** | Ethernet, Wi-Fi, LTE Cat 4 |
| **Antény** | externí konektory typu N (LoRa, LTE, GPS) |
| **Provozní teplota** | -40 °C až +65 °C |
| **Krytí** | IP67 |

---

## Rychlý průvodce {#quick-start-guide}

### 1. Zapojení hardwaru {#1-hardware-setup}
1.  **Antény:** Připojte antény LoRa, LTE a GPS **před** zapnutím zařízení, abyste ho nepoškodili.
2.  **SIM karta:** Pokud používáte mobilní síť, vložte SIM kartu do slotu pod vodotěsným krytem.
3.  **Montáž:** Pomocí přiložené sady namontujte bránu na stožár nebo na zeď.

### 2. Zapnutí {#2-power-on}
* Připojte ethernetový kabel z **PoE injektoru** (součást balení) do portu **ETH** na bráně.
* Zařízení se spustí.

### 3. Přístup k bráně {#3-accessing-the-gateway}

K lokálnímu webovému rozhraní brány se můžete připojit jedním ze dvou způsobů:

#### Režim Wi-Fi AP (výchozí) {#wifi-ap-mode-default}
1. Připojte počítač k Wi-Fi síti se SSID: `RAK7289CV2_XXXX` (kde XXXX jsou poslední bajty MAC adresy).
2. Heslo není vyžadováno.
3. Otevřete webový prohlížeč a přejděte na `192.168.230.1`.

#### Režim Ethernet {#ethernet-mode}
1. Připojte port **ETH** brány přímo k počítači.
2. Nastavte na počítači statickou IP adresu (například `169.254.15.100`), aby odpovídala záložní IP adrese brány (`169.254.15.1`).

### 4. Nastavení povinného hesla {#4-setting-the-mandatory-password}

Při prvním přístupu k bráně musíte nastavit heslo pro uživatele **root**. Heslo musí splňovat tato kritéria:

* alespoň **12 znaků**
* obsahuje alespoň jeden **speciální znak**
* obsahuje alespoň jednu **číslici**
* obsahuje alespoň jedno **písmeno latinky**

:::tip Gateway EUI
Po nastavení hesla budete přesměrováni na **Dashboard**, kde určíte svou zemi a region. Zkopírujte si **16znakové Gateway EUI**, které je tam zobrazené – budete ho potřebovat pro registraci na síťovém serveru.
:::

### 5. Připojení k internetu {#5-internet-connectivity}

Aby brána mohla komunikovat se síťovým serverem, potřebuje připojení k internetu. Přejděte na **Network > WAN**:

* **Ethernet:** Zapojte port ETH do svého routeru; ve výchozím nastavení se používá DHCP.
* **Wi-Fi:** Přejděte na **Wi-Fi**, zapněte rozhraní a vyhledejte svou místní síť.
* **Mobilní síť (modely s LTE):** Pokud používáte SIM kartu, nastavte APN v sekci **Cellular**.

Pokud vaše SIM karta vyžaduje PIN kód, musíte ho nastavit v konfiguraci. Přejděte na **Network → WAN → Cellular → General**, zapněte LTE Network, zadejte PIN své SIM karty do pole **PIN code** a klikněte na **Save**.
![PIN kód](../../../../../../smart-devices/rakwireless/gateways/images/sim-pin.png)
:::warning Cellular Note
Pokud SIM kartu nepoužíváte, vypněte mobilní rozhraní, abyste zabránili zaplňování logu hlášeními `SIM_ABSENT`.
:::

---

## Konfigurace pracovních režimů {#configuring-work-modes}

Brána podporuje několik pracovních režimů LoRaWAN. Přejděte na **LoRa > Configuration** a vyberte požadovaný režim:

### Basics Station (doporučeno pro TTS) {#basics-station-recommended-for-tts}

Pro připojení k The Things Stack vyberte **Basics Station**:

| Nastavení | Hodnota |
| :--- | :--- |
| **Basics Station Mode** | LNS Server |
| **Server URL** | `wss://hardwario-com.eu1.cloud.thethings.industries` (port 8887) |
| **Trust (CA Certificate)** | Nahrajte soubor [ISRG Root X1 .pem](https://letsencrypt.org/certs/isrgrootx1.pem) |
| **Client Token** | Vložte svůj TTS API Key |

### Další dostupné pracovní režimy {#other-available-work-modes}

* **Packet Forwarder:** používá se pro starší připojení Semtech UDP nebo ChirpStack MQTT.
* **Built-in Network Server:** umožňuje bráně fungovat jako samostatný LNS (ChirpStack).

---

## Možnosti LoRaWAN sítě {#lorawan-network-options}

Informace o podporovaných platformách síťových serverů LoRaWAN najdete v části [**Možnosti LoRaWAN sítě**](/smart-devices/rakwireless/gateways/index#lorawan-network-options)

---

## Zdroje {#resources}

* [Datasheet RAK7289V2](https://docs.rakwireless.com/Product-Categories/WisGate/RAK7289V2/Datasheet/)
* [Rychlý průvodce](https://docs.rakwireless.com/Product-Categories/WisGate/RAK7289V2/Quickstart/)
