---
slug: chirpstack-abp
title: ChirpStack v4 – ABP
---
import Image from '@theme/IdealImage';

# ChirpStack v4 – ABP {#chirpstack-v4--abp}

Tato stránka popisuje, jak **HARDWARIO STICKER** zaregistrovat jako koncové zařízení LoRaWAN v **ChirpStack v4** pomocí **ABP (aktivace personalizací)**, včetně doporučeného nastavení profilu zařízení a přidání dekodéru payloadu.

Užitečná dokumentace HARDWARIO:
- Instalace ChirpStack v4  
  https://docs.hardwario.com/apps/chirpstack/chirpstack-installation
- ChirpStack v4: koncová zařízení  
  https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-end-devices
- ChirpStack v4: dekódování dat (ukázka kodeku pro STICKER)  
  https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-decoding
- Dekodér STICKER: https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js

:::info
Než zařízení STICKER zaregistrujete, ujistěte se, že je **ChirpStack v4 nainstalovaný a běží**.

Pokyny k instalaci:  
https://docs.hardwario.com/apps/chirpstack/chirpstack-installation
:::

---

## Předpoklady {#prerequisites}

- Funkční brána LoRaWAN připojená k ChirpStack v4 a nastavená pro váš region a frekvenční plán.
- Tenant v ChirpStack v4, ve kterém je brána vidět a je online.
- Napájené zařízení STICKER v dosahu brány.

---

## 1) Získejte potřebné identifikátory a klíče LoRaWAN {#1-collect-the-required-lorawan-identifiers--keys}

Potřebné identifikátory a klíče zařízení STICKER zjistíte v aplikaci [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/device-info).

Budete potřebovat:

- **DevEUI**
- **DevAddr**
- **NwkSKey** (Network Session Key)
- **AppSKey** (Application Session Key)

---

## 2) Vytvořte profil zařízení pro STICKER (doporučeno) {#2-create-a-device-profile-for-sticker-recommended}

V ChirpStack v4:  
**Tenant → Device Profiles → Add Device Profile**
![ChirpStack: vytvoření profilu zařízení](../../../../../sticker/connectivity/images/chripstack-add-profile.png)

Dále nastavte tyto parametry:
- Name: **STICKER-ABP** (nebo vlastní označení zařízení)
- MAC Version: **LoRaWAN 1.0.4**
- Region: **EU868** (nebo US915, pokud jste mimo EU)
- Expected uplink interval: **X** (podle konfigurace firmwaru zařízení STICKER)
![ChirpStack: obecné nastavení profilu](../../../../../sticker/connectivity/images/chripstack-profile-general-abp.png)

Přejděte na záložku **Join (OTAA / ABP)** a zkontrolujte, že je volba **Device supports OTAA** vypnutá.
![ChirpStack: profil ABP](../../../../../sticker/connectivity/images/chirpstack-profile-join-abp.png)

Nakonec k profilu zařízení přidejte kodek. Přepněte na záložku Codec, v rozbalovacím seznamu Payload codec zvolte JavaScript functions a do vstupního pole vložte kodek z odkazu níže:
- https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js
![ChirpStack: nastavení kodeku zařízení](../../../../../sticker/connectivity/images/chirpstack-profile-codec.png)

Profil zařízení uložte kliknutím na **Submit**.

:::tip Generování příkazů přes downlink
_Kódování příkazů přes downlink přinesl **firmware STICKER v1.4.0** (verze v1.3.x ho nemají)._

Tento kodek zároveň **kóduje příkazy pro downlink** (funkcí `encodeDownlink`), takže není potřeba nic dalšího nastavovat. Chcete-li zařízení poslat příkaz, například vynutit odeslání hlášení, změnit nastavení nebo nastavit pravidlo alarmu, zařaďte ho na záložce **Queue** zařízení jako objekt JSON na fPort **85**; ChirpStack z něj kodekem vytvoří bajtový payload. Příkaz sestavíte a jeho podobu v JSON i hex získáte v [**generátoru příkazů přes downlink**](downlink-commands-generator.mdx).
:::

---

## 3) Vytvořte aplikaci v ChirpStack {#3-create-an-application-in-chirpstack}

V ChirpStack přejděte na **Applications → Add Application** a vyplňte pole:
- Name: **STICKER** (nebo libovolný název)
![ChirpStack: přidání aplikace](../../../../../sticker/connectivity/images/chirpstack-add-appliaction.png)

Uložte kliknutím na **Submit**.

---

## 4) Zaregistrujte koncové zařízení STICKER {#4-register-the-sticker-end-device}

Ve své aplikaci:  
**Application → End Devices → Add End Device**

Vyplňte:
- **Name** (srozumitelný název)
- **Device EUI (DevEUI)**
- **Device Profile** → zvolte profil STICKER, který jste vytvořili


![ChirpStack: přidání koncového zařízení](../../../../../sticker/connectivity/images/chirpstack-add-device-config-abp.png)

Uložte kliknutím na **Submit**.

### Aktivujte zařízení (ABP) {#activate-the-device-abp}

Po vytvoření zařízení otevřete jeho záložku **Activation**.

Vyplňte:
- **Device address (DevAddr)**
- **Network session key (NwkSKey)**
- **Application session key (AppSKey)**
![ChirpStack: zadání klíčů ABP](../../../../../sticker/connectivity/images/chirpstack-add-abp-keys.png)

Pak klikněte na **(Re)activate device**.

---

## 5) Zkontrolujte uplinky {#5-verify-uplinks}

- Přejděte na **Applications → (vaše aplikace) → Events**
- Zkontrolujte události **Up**
- Měli byste vidět:
  - surové bajty payloadu
  - dekódovaná pole JSON (pokud je kodek správný)
