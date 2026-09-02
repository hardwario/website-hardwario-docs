---
title: Hodiny reálného času
description: "Zařízení STICKER udržuje přesný čas pomocí vnitřních hodin reálného času (RTC). Přesný čas je potřeba pro časové značky záznamů v historii senzorů, pro spouštění událostí podle pravidel alarmů a pro stavové zprávy sítě."
---
import Image from '@theme/IdealImage';

# Hodiny reálného času (`clock`) {#real-time-clock-clock}

Zařízení STICKER udržuje přesný čas pomocí vnitřních hodin reálného času (RTC). Přesný čas je potřeba pro časové značky záznamů v [**historii senzorů**](sensor-history.md), pro spouštění událostí podle [**pravidel alarmů**](alarm-rules.md) a pro stavové zprávy sítě.

:::info Firmware v1.4.0
Možnosti hodin reálného času (RTC) popsané na této stránce jsou základní funkcí **firmwaru STICKER v1.4.0** a ve verzi v1.3.x nejsou k dispozici.
:::

---

## Mechanismy synchronizace času {#time-synchronization-mechanisms}

Hodiny RTC lze synchronizovat třemi nezávislými způsoby:

1. **Synchronizace ze sítě LoRaWAN (`DeviceTimeReq`):**
   - Zařízení si po připojení do sítě automaticky vyžádá síťový čas standardním MAC příkazem LoRaWAN `DeviceTimeReq`.
   - Periodická resynchronizace koriguje odchylku hodin při dlouhodobém nasazení v provozu.

2. **Lokální synchronizace přes šifrované NFC:**
   - Při konfiguraci aplikací **HARDWARIO Manager** v telefonu může systémový čas telefonu automaticky nastavit hodiny RTC zařízení STICKER přes NFC.

3. **Vzdálené a shell příkazy:**
   - Čas lze zjistit nebo ručně nastavit vývojářskými shell příkazy, případně vzdáleně downlink příkazy LoRaWAN na **fPort 85**.

---

## Vývojářské shell příkazy (`clock`) {#developer-shell-commands-clock}

Vývojářské shell příkazy umožňují hodiny RTC přímo prohlížet a spravovat (otevření konzole viz [**Nastavení firmwaru**](firmware-setup.md)):

| Příkaz | Popis |
|---|---|
| `clock get` | Přečte a vypíše aktuální čas v UTC a unixový timestamp. |
| `clock set <unix>` | Ručně nastaví hodiny RTC pomocí 32bitového unixového timestampu (sekundy od 1. 1. 1970). |
| `clock sync` | Vynutí okamžitý MAC příkaz LoRaWAN `DeviceTimeReq` s žádostí o synchronizaci síťového času. |
