---
slug: rak-RAK7289V2
title: RAK7289V2
---

import Image from '@theme/IdealImage';

# RAK7289V2 WisGate Edge Pro {#rak7289v2-wisgate-edge-pro}

**RAK7289V2 WisGate Edge Pro** je venkovní brána LoRaWAN® v průmyslovém provedení. Je navržená pro vysokou spolehlivost a má krabičku s krytím IP67, takže se hodí do náročného prostředí i k instalaci na stožár.

Běží na systému **WisGateOS 2** a k internetu se může připojit několika cestami (Ethernet, Wi-Fi, mobilní síť), aby kritické sítě IoT zůstaly stále dostupné.

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

## Klíčové vlastnosti {#key-features}

* **Průmyslové provedení:** Vodotěsná hliníková krabička s krytím IP67.
* **Kanály:** 8 nebo 16 kanálů (podle modelu).
* **Více páteřních připojení:** Ethernet, Wi-Fi a mobilní síť LTE (některé modely podporují dvě SIM karty).
* **GPS:** Vestavěná GPS pro přesnou synchronizaci času a určení polohy.
* **Napájení:** Přes PoE (Power over Ethernet), což zjednodušuje kabeláž.
* **Správa:** Lokální webové rozhraní, SSH a vzdálená správa přes WisDM.

---

## Technické parametry {#technical-specifications}

| Vlastnost | Specifikace |
| :--- | :--- |
| **Model** | RAK7289V2 |
| **Kanály LoRa** | 8 nebo 16 kanálů |
| **Frekvence** | EU868 (podporuje i další regiony) |
| **Napájení** | **PoE (802.3af/at)** (48V) |
| **Příkon** | max. 12 W |
| **Konektivita** | Ethernet, Wi-Fi, LTE Cat 4 |
| **Antény** | Externí konektory typu N (LoRa, LTE, GPS) |
| **Provozní teplota** | -40 °C až +65 °C |
| **Krytí** | IP67 |

---

## Rychlý průvodce {#quick-start-guide}

### 1. Zapojení hardwaru {#1-hardware-setup}
1.  **Antény:** Antény LoRa, LTE a GPS připojte **před** zapnutím zařízení, jinak hrozí jeho poškození.
2.  **SIM karta:** Pokud používáte mobilní síť, vložte SIM kartu do slotu pod vodotěsným krytem.
3.  **Montáž:** Pomocí přiložené sady namontujte bránu na stožár nebo na zeď.

### 2. Zapnutí {#2-power-on}
* Připojte ethernetový kabel z **PoE injektoru** (součást balení) do portu **ETH** na bráně.
* Zařízení nastartuje.

### 3. Přístup k bráně {#3-accessing-the-gateway}

K lokálnímu webovému rozhraní brány se můžete připojit jedním ze dvou způsobů:

#### Režim Wi-Fi AP (výchozí) {#wifi-ap-mode-default}
1. Připojte počítač k síti Wi-Fi se SSID `RAK7289CV2_XXXX` (XXXX jsou poslední bajty MAC adresy).
2. Heslo není potřeba.
3. Otevřete webový prohlížeč a přejděte na `192.168.230.1`.

#### Režim Ethernet {#ethernet-mode}
1. Připojte port **ETH** brány přímo k počítači.
2. Nastavte na počítači statickou IP adresu (například `169.254.15.100`), aby odpovídala záložní IP adrese brány (`169.254.15.1`).

### 4. Nastavení povinného hesla {#4-setting-the-mandatory-password}

Při prvním přihlášení do brány musíte nastavit heslo uživatele **root**. Heslo musí:

* mít alespoň **12 znaků**
* obsahovat alespoň jeden **speciální znak**
* obsahovat alespoň jednu **číslici**
* obsahovat alespoň jedno **písmeno latinky**

:::tip Gateway EUI
Po nastavení hesla vás brána přesměruje na **Dashboard**, kde zvolíte zemi a region. Zkopírujte si zobrazené **16znakové Gateway EUI**. Budete ho potřebovat při registraci na síťovém serveru.
:::

### 5. Připojení k internetu {#5-internet-connectivity}

Aby brána mohla komunikovat se síťovým serverem, potřebuje připojení k internetu. Přejděte do **Network > WAN**:

* **Ethernet:** Zapojte port ETH do routeru; brána ve výchozím stavu používá DHCP.
* **Wi-Fi:** Přejděte na **Wi-Fi**, zapněte rozhraní a vyhledejte svou lokální síť.
* **Mobilní síť (modely s LTE):** Pokud používáte SIM kartu, nastavte APN v sekci **Cellular**.

Pokud SIM karta vyžaduje PIN, zadejte ho v nastavení. Přejděte do **Network → WAN → Cellular → General**, zapněte LTE Network, do pole **PIN code** zadejte PIN SIM karty a klikněte na **Save**.
![PIN kód](../../../../../../smart-devices/rakwireless/gateways/images/sim-pin.png)
:::warning Mobilní síť
Pokud SIM kartu nepoužíváte, vypněte mobilní rozhraní, jinak log zahltí zprávy `SIM_ABSENT`.
:::

---

## Konfigurace pracovních režimů {#configuring-work-modes}

Brána podporuje několik pracovních režimů LoRaWAN. Přejděte do **LoRa > Configuration** a vyberte požadovaný režim:

### Basics Station (doporučeno pro TTS) {#basics-station-recommended-for-tts}

Chcete-li se připojit k The Things Stack, vyberte **Basics Station**:

| Nastavení | Hodnota |
| :--- | :--- |
| **Basics Station Mode** | LNS Server |
| **Server URL** | `wss://hardwario-com.eu1.cloud.thethings.industries` (port 8887) |
| **Trust (CA Certificate)** | Nahrajte soubor [ISRG Root X1 .pem](https://letsencrypt.org/certs/isrgrootx1.pem) |
| **Client Token** | Vložte svůj API klíč z TTS |

### Další dostupné pracovní režimy {#other-available-work-modes}

* **Packet Forwarder:** Používá se pro starší připojení Semtech UDP nebo ChirpStack MQTT.
* **Built-in Network Server:** Brána pak sama funguje jako samostatný LNS (ChirpStack).

---

## Možnosti sítě LoRaWAN {#lorawan-network-options}

Podporované platformy síťových serverů LoRaWAN popisuje část [**Možnosti sítě LoRaWAN**](/smart-devices/rakwireless/gateways/index#lorawan-network-options).

---

## Zdroje {#resources}

* [Produktový list RAK7289V2](https://docs.rakwireless.com/Product-Categories/WisGate/RAK7289V2/Datasheet/)
* [Rychlý průvodce](https://docs.rakwireless.com/Product-Categories/WisGate/RAK7289V2/Quickstart/)
