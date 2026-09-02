---
slug: lorawan-tts
title: The Things Stack
description: "Než jednotku STICKER zaregistrujete v The Things Stack, vytáhněte přes NFC její výrobní klíče a nastavte radio:"
---
import Image from '@theme/IdealImage';

# The Things Stack {#the-things-stack}

**The Things Stack (TTS)** je spravovaný síťový server LoRaWAN od The Things Industries, dostupný jako veřejná cloudová služba (TTS Cloud / Community Edition) nebo jako privátní podnikové nasazení.

:::info Předpoklady
1. Ujistěte se, že máte přístup k aktivní instanci **The Things Stack** a v dosahu funkční bránu LoRaWAN.
2. Před vytvořením profilů koncových zařízení v TTS si přes NFC vytáhněte přihlašovací údaje zařízení pomocí [**HARDWARIO Manager**](../hardwario-manager).
:::

---

## Přihlašovací údaje zařízení a získání přes NFC {#device-credentials--nfc-extraction}

Než jednotku STICKER zaregistrujete v The Things Stack, vytáhněte přes NFC její výrobní klíče a nastavte radio:

1. Otevřete [**HARDWARIO Manager**](../hardwario-manager) v telefonu s NFC.
2. Přiložte telefon ke krabičce STICKER a přečtěte si údaje o zařízení.
3. Zapište si **DevEUI**, **JoinEUI (AppEUI)** a **AppKey** (pro OTAA), případně statické klíče session (pro ABP).
4. Zkontrolujte, že je **`radio-mode`** zapnutý, aby se zařízení po zprovoznění pokusilo připojit.

---

## Volba metody aktivace {#select-activation-method}

| Režim aktivace | Popis | Potřebné údaje |
|---|---|---|
| **[OTAA – aktivace přes vzduch](./tts-otaa.md)** *(doporučeno)* | Dynamické vyjednání klíčů session při připojení. Zajišťuje maximální bezpečnost. | **DevEUI**, **JoinEUI (AppEUI)**, **AppKey** |
| **[ABP – aktivace personalizací](./tts-abp.md)** | Předem přidělené statické klíče session. Proceduru připojení úplně vynechává. | **DevAddr**, **NwkSKey**, **AppSKey** |

---

## Formátovač payloadu a konfigurace downlinků {#payload-formatter--downlink-configuration}

Při registraci koncového zařízení STICKER v TTS:

- **Formátovač uplinku:** V **Payload Formatters → Uplink** přiřaďte oficiální dekodér payloadu STICKER (`ttn.js`). Ten dekóduje standardní data ze senzorů na fPort 2 a systémové a alarmové zprávy na fPort 3.
- **Formátovač downlinku:** V **Payload Formatters → Downlink** přiřaďte `ttn.js`, čímž zapnete kódování JSON payloadů pro vzdálenou správu na **fPort 85** (viz [**Downlink příkazy**](downlink-commands.md)).

---

## Užitečné odkazy {#useful-links}

- [Průvodce nastavením HARDWARIO Manager](../hardwario-manager)
- [Dokumentace koncových zařízení TTS](https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices)
- [Dekodér payloadu STICKER (`ttn.js`) na GitHubu](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)
