---
slug: lorawan-chirpstack
title: ChirpStack v4
description: "Než jednotku STICKER zaregistrujete v ChirpStack v4, vytáhněte přes NFC její výrobní klíče a nastavte radio:"
---
import Image from '@theme/IdealImage';

# ChirpStack v4 {#chirpstack-v4}

**ChirpStack v4** je open-source síťový server LoRaWAN pro privátní nasazení na vlastní infrastruktuře.

:::info Předpoklady
1. Ujistěte se, že je **ChirpStack v4** nainstalovaný a funkční. Viz [průvodce instalací ChirpStacku](https://docs.hardwario.com/apps/chirpstack/chirpstack-installation).
2. Před vytvořením profilů koncových zařízení v ChirpStacku si přes NFC vytáhněte přihlašovací údaje zařízení pomocí [**HARDWARIO Manager**](/sticker/hardwario-manager/).
:::

---

## Přihlašovací údaje zařízení a získání přes NFC {#device-credentials--nfc-extraction}

Než jednotku STICKER zaregistrujete v ChirpStack v4, vytáhněte přes NFC její výrobní klíče a nastavte radio:

1. Otevřete [**HARDWARIO Manager**](/sticker/hardwario-manager/) v telefonu s NFC.
2. Přiložte telefon ke krabičce STICKER a přečtěte si informace o zařízení.
3. Zapište si **DevEUI**, **JoinEUI/AppEUI** a **AppKey** (pro OTAA), případně statické klíče session (pro ABP).
4. Zkontrolujte, že je **`radio-mode`** zapnutý, aby se zařízení po zprovoznění pokusilo připojit.

---

## Volba metody aktivace {#select-activation-method}

| Režim aktivace | Popis | Potřebné údaje |
|---|---|---|
| **[OTAA – aktivace přes vzduch](./chirpstack-otaa.md)** *(doporučeno)* | Dynamické vyjednání klíčů session při připojení. Zajišťuje nejvyšší bezpečnost. | **DevEUI**, **JoinEUI (AppEUI)**, **AppKey** |
| **[ABP – aktivace personalizací](./chirpstack-abp.md)** | Předem přidělené statické klíče session. Proceduru připojení obchází. | **DevAddr**, **NwkSKey**, **AppSKey** |

---

## Profil zařízení a nastavení kodeku payloadu {#device-profile--payload-codec-setup}

Při konfiguraci **Device Profile** zařízení STICKER v ChirpStack v4:

- **Ovladač kodeku:** Zvolte kodek **JavaScript** a vložte oficiální dekodér STICKER (`ttn.js`).
- **Obousměrné možnosti:** Kodek automaticky parsuje telemetrické uplinky na fPort 2, alarmová hlášení na fPort 3 a formátuje vzdálené JSON downlinky na **fPort 85** (viz [**Downlink příkazy**](downlink-commands.md)).

---

## Užitečné odkazy {#useful-links}

- [Průvodce nastavením HARDWARIO Manager](/sticker/hardwario-manager/)
- [Průvodce instalací ChirpStack v4](https://docs.hardwario.com/apps/chirpstack/chirpstack-installation)
- [Dokumentace koncových zařízení ChirpStack](https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-end-devices)
- [Průvodce dekodéry payloadu v ChirpStacku](https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-decoding)
- [Dekodér payloadu STICKER (`ttn.js`) na GitHubu](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)
