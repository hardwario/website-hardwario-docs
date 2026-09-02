---
slug: lorawan-chirpstack
title: ChirpStack v4
description: "Tato stránka je praktický checklist pro připojení zařízení HARDWARIO CHESTER k síti LoRaWAN pomocí ChirpStack v4."
---
import Image from '@theme/IdealImage';

# ChirpStack v4 {#chirpstack-v4}

Tato stránka je praktický checklist pro připojení zařízení **HARDWARIO CHESTER** k **síti LoRaWAN pomocí ChirpStack v4**.  
Popisuje, kde získat přihlašovací údaje LoRaWAN ze zařízení CHESTER a jak je nastavit v ChirpStack.

---

## Předpoklady {#prerequisites}

- Síť LoRaWAN s bránou a **ChirpStack v4**
- Přístup ke konzoli zařízení CHESTER (Bluetooth / USB / J-Link)
- Správný region LoRaWAN (např. **EU868**, **US915**) nastavený konzistentně na:
  - zařízení CHESTER
  - bráně
  - Network Serveru

---

## 1) Kde získat přihlašovací údaje LoRaWAN zařízení CHESTER {#1-where-to-get-chester-lorawan-credentials}

### 1.1 Připojení ke konzoli zařízení CHESTER {#11-connect-to-chester-console}

Můžete použít jeden z následujících nástrojů:

- **HARDWARIO Manager** (mobil, BLE)
- **HARDWARIO Terminal** (webový BLE terminál v Chrome)
- **J-Link + konzole HARDWARIO CLI**

### 1.2 Zobrazení konfigurace LoRaWAN {#12-display-lorawan-configuration}

Spusťte:

```bash
lrw config show
```

Uvidíte hodnoty jako:

- `lrw config band` (např. `eu868`)
- `lrw config mode` (`otaa` / `abp`)
- `lrw config deveui`
- `lrw config joineui`
- `lrw config appkey`

> Doporučení: používejte **OTAA**, pokud nemáte konkrétní důvod použít ABP.

---

## 2) Přepnutí katalogové aplikace do režimu LoRaWAN (pokud je potřeba) {#2-switch-catalog-application-to-lorawan-mode-if-needed}

Některé katalogové firmwary nezačnou vysílat data, dokud není vybrán komunikační režim.

```bash
app config mode lrw
config save
```

Zařízení CHESTER se restartuje a zapne rádio LoRaWAN.

---

## 3) Konfigurace zařízení CHESTER pro OTAA (doporučeno) {#3-configure-chester-for-otaa-recommended}

### 3.1 Parametry, které musí souhlasit {#31-parameters-that-must-match}

Mezi zařízením CHESTER a ChirpStack:

- **DevEUI**
- **JoinEUI / AppEUI**
- **AppKey**

### 3.2 Nastavení parametrů OTAA na zařízení CHESTER {#32-configure-otaa-parameters-on-chester}

```bash
lrw config mode otaa
lrw config nwk public
lrw config dutycycle false

lrw config deveui  <YOUR_DEV_EUI>
lrw config joineui <YOUR_JOIN_EUI>
lrw config appkey  "<YOUR_APPKEY>"

config save
```

Poznámky:
- AppKey zkopírovaný z uživatelského rozhraní může obsahovat mezery → doporučujeme uvozovky.
- `nwk public/private` musí odpovídat konfiguraci brány/sítě.

---

## 4) ChirpStack – Device Profile pro zařízení CHESTER {#4-chirpstack--device-profile-for-chester}

Vytvořte **Device Profile** s následujícím doporučeným nastavením:

| Parametr | Hodnota |
|---|---|
| MAC version | LoRaWAN 1.0.4 |
| Regional parameters revision | A |
| ADR algorithm | Default ADR algorithm (LoRa only) |
| Device supports OTAA | ON |
| Device supports Class-B | OFF |
| Device supports Class-C | OFF |

---

## 5) ChirpStack – aplikace a registrace zařízení {#5-chirpstack--application-and-device-registration}

### 5.1 Vytvoření aplikace {#51-create-an-application}

- Přejděte do **Applications**
- Vytvořte novou aplikaci

### 5.2 Přidání zařízení CHESTER jako end device {#52-add-chester-as-an-end-device}

Uvnitř aplikace:

- **Name**
- **Device EUI (DevEUI)**
- **Join EUI / AppEUI**
- **Device Profile**

Zařízení uložte.

### 5.3 Nastavení AppKey v ChirpStack {#53-configure-appkey-in-chirpstack}

- V detailu zařízení nastavte nebo vygenerujte **AppKey**
- AppKey pečlivě zkopírujte (případně použijte ikonu „oka")
- Stejný AppKey použijte v konfiguraci zařízení CHESTER

---


## 6) Dekodér payloadu (doporučeno) {#6-payload-decoder-recommended}

Pro dekódování uplink payloadů ze zařízení CHESTER:

1. Otevřete **Device Profile**
2. Přejděte na **Codec**
3. Vložte JavaScriptový dekodér payloadu


---

## Odkazy {#references}

- Konfigurace rádia LoRaWAN zařízení CHESTER:  
  https://docs.hardwario.com/chester/platform-connectivity/lorawan-radio
- Doporučená nastavení ChirpStack:  
  https://docs.hardwario.com/chester/platform-connectivity/lorawan-radio#chirpstack-configuration
- Návod k end device v ChirpStack:  
  https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-end-devices
