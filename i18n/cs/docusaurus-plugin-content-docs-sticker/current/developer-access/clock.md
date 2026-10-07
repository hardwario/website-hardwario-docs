---
title: Hodiny reálného času
---
import Image from '@theme/IdealImage';

# Hodiny reálného času (`clock`) {#real-time-clock-clock}

Zařízení STICKER udržuje přesný čas pomocí vnitřních hodin reálného času (RTC). Přesný čas je potřeba k časovému označení záznamů [**historie senzorů**](sensor-history.md), událostí vyvolaných [**pravidly alarmů**](alarm-rules.md) a stavových zpráv sítě.

:::info Firmware v1.4.0
Hodiny reálného času (RTC) popsané na této stránce jsou základní funkcí **firmwaru STICKER v1.4.0**; ve verzi v1.3.x nejsou k dispozici.
:::

---

## Mechanismy synchronizace času {#time-synchronization-mechanisms}

Hodiny RTC lze synchronizovat třemi nezávislými způsoby:

1. **Synchronizace ze sítě LoRaWAN (`DeviceTimeReq`):**
   - Zařízení si po připojení k síti automaticky vyžádá síťový čas standardním příkazem MAC protokolu LoRaWAN `DeviceTimeReq`.
   - Pravidelná synchronizace pak opravuje odchylku hodin při dlouhodobém nasazení v terénu.

2. **Lokální synchronizace přes šifrované NFC:**
   - Při konfiguraci v aplikaci **HARDWARIO Manager** může telefon přes NFC automaticky nastavit hodiny RTC zařízení STICKER podle svého systémového času.

3. **Příkazy shellu a vzdálené příkazy:**
   - Čas lze zjistit nebo ručně nastavit vývojářskými příkazy shellu, případně na dálku příkazy přes downlink LoRaWAN na **fPort 85**.

---

## Vývojářské příkazy shellu (`clock`) {#developer-shell-commands-clock}

Vývojářskými příkazy shellu hodiny RTC přímo zobrazíte a nastavíte (otevření konzole popisuje stránka [**Nastavení firmwaru**](firmware-setup.md)):

| Příkaz | Popis |
|---|---|
| `clock get` | Přečte a vypíše aktuální čas v UTC a unixovou časovou značku. |
| `clock set <unix>` | Ručně nastaví hodiny RTC 32bitovou unixovou časovou značkou (sekundy od 1. 1. 1970). |
| `clock sync` | Okamžitě odešle příkaz MAC `DeviceTimeReq` a vyžádá si synchronizaci se síťovým časem. |
