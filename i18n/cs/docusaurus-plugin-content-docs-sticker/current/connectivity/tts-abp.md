---
slug: tts-abp
title: The Things Stack – ABP
description: "Tato stránka vysvětluje, jak zaregistrovat zařízení HARDWARIO STICKER jako koncové zařízení LoRaWAN v The Things Stack (TTS) pomocí ABP (aktivace personalizací) a jak přidat formátovač payloadu (dekodér)."
---
import Image from '@theme/IdealImage';

# The Things Stack – ABP {#the-things-stack--abp}

Tato stránka vysvětluje, jak zaregistrovat zařízení **HARDWARIO STICKER** jako koncové zařízení LoRaWAN v **The Things Stack (TTS)** pomocí **ABP (aktivace personalizací)** a jak přidat formátovač payloadu (dekodér).

Užitečná dokumentace HARDWARIO:
- TTS: koncová zařízení  
  https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices
- Dekodér STICKER: https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js

:::info
Než zařízení STICKER zaregistrujete, ujistěte se, že máte přístup k nasazení **The Things Stack** (Cloud, Community nebo Enterprise) a že je brána LoRaWAN připojená a online.
:::

---

## Předpoklady {#prerequisites}

- Funkční brána LoRaWAN připojená k The Things Stack a nastavená pro váš region a frekvenční plán.
- Účet TTS s právem vytvářet aplikace a registrovat zařízení.
- Zařízení STICKER napájené a v pokrytí brány.

---

## 1) Získejte potřebné identifikátory a klíče LoRaWAN {#1-collect-the-required-lorawan-identifiers--keys}

Potřebné identifikátory a klíče pro vaše zařízení STICKER zjistíte v aplikaci [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/device-info).

Budete potřebovat:

- **DevEUI**
- **DevAddr**
- **NwkSKey** (Network Session Key)
- **AppSKey** (Application Session Key)

---

## 2) Zaregistrujte koncové zařízení STICKER {#2-register-the-sticker-end-device}

Ve své aplikaci:  
**Application → + Register end device**
![Tlačítko registrace koncového zařízení v TTS](../../../../../sticker/connectivity/images/tts-register-end-device.png)

Zvolte **Enter end device specifics manually**.

V části **End Device Type** nastavte:
- Frequency plan: zvolte svůj region (například **Europe 863–870 MHz**)
- LoRaWAN version: **LoRaWAN Specification 1.0.4**
- Regional Parameters version: **RP002 Regional Parameters 1.0.4**

Klikněte na **Show advanced activation, LoRaWAN class and cluster settings** a jako **Activation mode** zvolte **Activation by personalization (ABP)**.

V části **Device Identifiers** vyplňte:
- DevEUI: **DEV_EUI** (unikátní identifikátor vytištěný na zařízení)
- Device ID: vámi zvolené jméno tohoto zařízení (například **sticker-0x**)

V části **Activation Information** vyplňte:
- Device address (DevAddr): **DEVICE_ADDRESS**
- Network session key (NwkSKey): **NETWORK_SESSION_KEY**
- Application session key (AppSKey): **APPLICATION_SESSION_KEY**

![Identifikátory zařízení ABP v TTS](../../../../../sticker/connectivity/images/tts-create-end-device-abp.png)

Klikněte na **Register end device**.

![Tlačítko registrace v TTS](../../../../../sticker/connectivity/images/tts-create-end-device-submit.png)

---

## 3) Přidejte formátovač payloadu (dekodér) {#3-add-a-payload-formatter-decoder}

Pro dekódování surových bajtů uplinku do čitelných polí JSON přejděte na:  
**Application → (VAŠE_ZAŘÍZENÍ) → Payload formatters → Uplink**

Nastavte typ formátovače na **Custom Javascript formatter** a vložte dekodér STICKER z odkazu níže:
- https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js

![Přidání dekodéru v TTS](../../../../../sticker/connectivity/images/tts-decoder.png)

Klikněte na **Save changes**.

:::tip Generování downlink příkazů
_Kódování downlink příkazů je součástí připravovaného **firmwaru STICKER v1.4.0** (ne v1.3.x)._

Tentýž kodek `ttn.js` zároveň **kóduje downlink příkazy** (funkcí `encodeDownlink`), takže můžete zařízení posílat příkazy, například vynutit report, změnit nastavení nebo nastavit pravidlo alarmu. Přidejte stejný soubor ještě jako formátovač **Downlink** v **Application → (VAŠE_ZAŘÍZENÍ) → Payload formatters → Downlink** (Custom Javascript formatter), pak zařaďte příkaz jako objekt JSON na fPort **85** a The Things Stack ho zakóduje do bajtů. Pro sestavení příkazu a získání jeho JSON i hex podoby použijte [**generátor downlink příkazů**](downlink-commands-generator.mdx).
:::

---

## 4) Zkontrolujte uplinky {#4-verify-uplinks}

- Otevřete v konzoli TTS pohled **Live data** zařízení
- Měli byste vidět:
  - přicházející uplink rámce
  - dekódovaná pole JSON (pokud je formátovač payloadu správně nastavený)
