---
title: Hodiny reálného času
---
import Image from '@theme/IdealImage';

# Hodiny reálného času (`clock`) {#real-time-clock-clock}

Zařízení STICKER udržuje přesný čas pomocí vnitřních hodin reálného času (RTC). Přesný čas je potřeba k časovému označení záznamů [**historie senzorů**](sensor-history.md), událostí vyvolaných [**pravidly alarmů**](alarm-rules.md) a stavových zpráv sítě.

:::info Firmware v2.0.0
Ve **firmwaru STICKER v2.0.0** přichází síťový čas z kteréhokoli rádia (LoRaWAN nebo P2P) a hodiny přijmou jen čas mezi 1. 1. 2024 a 1. 1. 2099.
:::

---

## Mechanismy synchronizace času {#time-synchronization-mechanisms}

Hodiny RTC lze synchronizovat třemi nezávislými způsoby:

1. **Síťový čas:**
   - Když se naváže spojení a zařízení od startu ještě nemá síťový čas (připojení k LoRaWAN, připojení v P2P nebo start s uloženým spárováním P2P), vyžádá si čas automaticky: v LoRaWAN standardním příkazem MAC `DeviceTimeReq`, v P2P žádostí o čas na hub.
   - Žádost se přibalí k nejbližšímu běžnému uplinku, takže nestojí žádnou zprávu navíc.
   - Po prvním síťovém čase se zařízení zhruba jednou týdně synchronizuje znovu a opravuje tak odchylku hodin při dlouhodobém nasazení v terénu.

2. **Lokální synchronizace přes šifrované NFC:**
   - Při konfiguraci v aplikaci **HARDWARIO Manager** může telefon přes NFC automaticky nastavit hodiny RTC zařízení STICKER podle svého systémového času.

3. **Příkazy shellu a vzdálené příkazy:**
   - Čas lze zjistit nebo ručně nastavit vývojářskými příkazy shellu, případně na dálku příkazem `clock_sync` na **fPort 85** přes rádio nebo NFC.
   - `clock_sync` bez času požádá zařízení, aby si obstaralo síťový čas. Jakmile čas dorazí, zařízení odešle uplink Info s pořadovým číslem požadavku, takže hostitel odpověď spáruje se svým požadavkem. `clock_sync` s časem (přes NFC čas telefonu) nastaví hodiny RTC hned a odpoví výslednou zprávou Info.

Čas mimo přijímané okno (1. 1. 2024 až 1. 1. 2099) zařízení odmítne, ať přijde odkudkoli.

---

## Vývojářské příkazy shellu (`clock`) {#developer-shell-commands-clock}

Vývojářskými příkazy shellu hodiny RTC přímo zobrazíte a nastavíte (otevření konzole popisuje stránka [**Nastavení firmwaru**](firmware-setup.md)):

| Příkaz | Popis |
|---|---|
| `clock get` | Přečte a vypíše aktuální čas v UTC a unixovou časovou značku. |
| `clock set <unix>` | Ručně nastaví hodiny RTC unixovou časovou značkou (sekundy od 1. 1. 1970). Přijímaný rozsah: od 1. 1. 2024 (`1704067200`) do 1. 1. 2099 (`4070908800`), tato hodnota už se nepřijme. |
| `clock sync` | Vyžádá si síťový čas: v LoRaWAN `DeviceTimeReq`, v P2P žádostí na hub. Žádost odejde s nejbližším uplinkem a hodiny RTC se nastaví, jakmile dorazí odpověď. |
