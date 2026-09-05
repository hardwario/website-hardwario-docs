---
slug: lorawan-tts
title: The Things Stack
description: "Tato stránka popisuje, jak připojit zařízení HARDWARIO CHESTER k LoRaWAN Network Serveru The Things Stack (TTS)."
---
import Image from '@theme/IdealImage';

# The Things Stack {#the-things-stack}

Tato stránka popisuje, jak připojit zařízení **HARDWARIO CHESTER** k LoRaWAN Network Serveru **The Things Stack (TTS)**.

---

## Předpoklady {#prerequisites}

- Síť LoRaWAN s bránou a **The Things Stack**
- Přístup ke konzoli zařízení CHESTER (Bluetooth / USB / J-Link)
- Správně nastavený LoRaWAN region na zařízení CHESTER, na bráně a v TTS

---

## 1) Kde získat přihlašovací údaje pro LoRaWAN {#1-where-to-get-lorawan-credentials}

### 1.1 Ze zařízení CHESTER {#11-from-chester}

Připojte se ke konzoli zařízení CHESTER a spusťte:

```bash
lrw config show
```

Důležité parametry:

- `deveui`: Device EUI
- `joineui`: JoinEUI / AppEUI
- `band`: region
- `mode`: OTAA / ABP

### 1.2 Z The Things Stack {#12-from-the-things-stack}

Během registrace zařízení nakonfigurujete:

- **JoinEUI**
- **DevEUI**
- **AppKey**
- **Device ID**

---

## 2) Přepnutí katalogové aplikace do režimu LoRaWAN (pokud je potřeba) {#2-switch-catalog-application-to-lorawan-mode-if-needed}

```bash
app config mode lrw
config save
```

Zařízení CHESTER se restartuje a zapne rádio LoRaWAN.

---

## 3) Konfigurace zařízení CHESTER pro OTAA {#3-configure-chester-for-otaa}

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
- AppKey musí být vždy shodný v zařízení CHESTER a v TTS
- Pro AppKey používejte uvozovky, abyste předešli problémům s formátováním

---

## 4) The Things Stack – vytvoření aplikace {#4-the-things-stack--create-application}

1. Přejděte na **Home**
2. Klikněte na **Create application**
3. Vyplňte:
   - **Application ID**
   - **Application Name**
   - (Volitelně) popis a labely
4. Klikněte na **Create application**

---

## 5) The Things Stack – registrace koncového zařízení CHESTER {#5-the-things-stack--register-chester-end-device}

1. V aplikaci klikněte na **+ Register end device**
2. Zvolte **Enter the device manually**
3. Vyplňte:
   - **JoinEUI**
   - **DevEUI**
   - **AppKey**
   - **Device ID**
4. (Volitelně) přidejte labely (doporučeně stejné jako u brány/aplikace)
5. Klikněte na **Register end device**

---

## 6) Dekodér payloadu (doporučeno) {#6-payload-decoder-recommended}

Dekódování uplink payloadů zařízení CHESTER v The Things Stack:

1. Otevřete **End device**
2. Přejděte na **Payload formatters**
3. Použijte **Uplink formatter (JavaScript)**


---

## Odkazy {#references}

- Konfigurace rádia LoRaWAN v zařízení CHESTER:  
  https://docs.hardwario.com/chester/platform-connectivity/lorawan-radio
- Návod na koncová zařízení v The Things Stack:  
  https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices
