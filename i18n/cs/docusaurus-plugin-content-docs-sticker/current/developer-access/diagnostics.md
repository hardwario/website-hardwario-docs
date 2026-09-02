---
title: Diagnostika
description: "Sada příkazů ats seskupuje diagnostiku pouze pro čtení, nástroje pro ověření hardwaru a pomocníky pro testování na stole, dostupné přes vývojářskou konzoli (viz Nastavení firmwaru). Na rozdíl od podpříkazů config diagnostické příkazy podsystémy…"
---
import Image from '@theme/IdealImage';

# Diagnostika (`ats`) {#diagnostics-ats}

Sada příkazů `ats` seskupuje diagnostiku pouze pro čtení, nástroje pro ověření hardwaru a pomocníky pro testování na stole, dostupné přes vývojářskou konzoli (viz [**Nastavení firmwaru**](firmware-setup.md)). Na rozdíl od podpříkazů `config` diagnostické příkazy podsystémy zařízení jen zkoumají a testují, aniž by přepisovaly uložené konfigurační parametry.

:::info Firmware v1.4.0
Ve **firmwaru STICKER v1.4.0** byla rodina diagnostických shell příkazů **přejmenována z `tester` na `ats`** (Automated Test System). Hlavní novinky ve v1.4.0:
- **Informace o zařízení při připojení:** Automatický informační paket odeslaný při každém připojení do sítě nebo synchronizaci hodin.
- **Rozšířené nástroje `ats`:** Přidány `ats lrw reset`, `ats lrw compose`, `ats lrw lc` a vkládání surových příkazů (`ats cmd lrw|nfc`).
- **Ověření zprovoznění:** `ats device info` zobrazuje sériové číslo, secret key zařízení a claim token zapisovatelný jen jednou.
:::

---

## Informace o zařízení a zprovoznění {#device--provisioning-info}

| Příkaz | Popis |
|---|---|
| `ats device info` | Vypíše sériové číslo hardwaru, verzi firmwaru, build profil, dobu běhu systému, stav hodin RTC, AES secret key a 128bitový claim token. |
| `ats device reboot` | Provede úplný restart systému. |

### Telemetrie s informacemi o zařízení při připojení {#device-info-on-join-telemetry}
Ve firmwaru v1.4.0 a novějším zařízení STICKER automaticky vytvoří a odešle **informační uplink payload** vždy, když dokončí proceduru připojení k LoRaWAN nebo provede synchronizaci síťových hodin. Tento uplink obsahuje:
- Sériové číslo a verzi vydání firmwaru
- Příčinu resetu (zapnutí, watchdog, softwarový reset, reset pinem)
- 128bitový claim token zapisovatelný jen jednou
- Aktivní režim radia (stav `radio-mode`)
- Napětí baterie pod zatížením

---

## Testování senzorového podsystému {#sensor-subsystem-testing}

| Příkaz | Popis |
|---|---|
| `ats sensors sample` | Okamžitě přečte a zobrazí aktuální měření ze všech senzorů na desce a připojených senzorů 1-Wire. |
| `ats sensors serial` | Vypíše fyzická sériová čísla (ROM kódy) všech nalezených senzorů 1-Wire. |
| `ats sensors reset` | Vynuluje všechny aktivní pulzní čítače (Hallovy kontakty a externí vstupy A/B). |
| `ats sensors check <sensor> [timeout]` | Sleduje konkrétní kanál senzoru a průběžně vypisuje změny hodnot do konzole pro živé testování na stole. |

---

## Testování signalizace LED {#led-signal-testing}

Stavová LED signalizuje heartbeat řazený podle závažnosti (stav připojení do sítě, režim radia, stav alarmu) a jednorázové vzory pro interakci (přístup přes NFC, spuštění vstupu). Definice vzorů viz [**Popis hardwaru**](hardware-description.md#led-indication).

Podpříkazy `ats led` slouží k testování jednotlivých barevných kanálů při výrobě nebo diagnostické kontrole:

| Příkaz | Popis |
|---|---|
| `ats led cycle [count]` | Postupně projde červený, žlutý a zelený kanál LED. `count` určuje počet opakování (`0` zastaví, výchozí `1`). |
| `ats led switch <color> <state>` | Ručně nastaví jednotlivý kanál LED (`red`, `yellow` nebo `green`) na `on` nebo `off`. |

---

## Diagnostika LoRaWAN a vkládání příkazů {#lorawan-diagnostics--command-injection}

| Příkaz | Popis |
|---|---|
| `ats lrw status` | Vypíše aktuální stav stacku LoRaWAN, typ aktivace (OTAA/ABP), klíče session a stav link checku. |
| `ats lrw check` | Zařadí a odešle okamžitý uplink s vloženým MAC příkazem `LinkCheckReq`. |
| `ats lrw compose [budget]` | Sestaví standardní telemetrický rámec bez odeslání a vypíše surový hexadecimální payload pro fPort 2 do konzole. |
| `ats lrw reset` | Vynuluje čítače rámců LoRaWAN a parametry DevNonce (vyvolá okamžitý restart). |
| `ats lrw lc <result>` | Simuluje odpověď na link check (`ok` nebo `fail`) pro lokální ladění session. |

:::info Vkládání surových příkazových rámců (debug buildy)
Debug buildy zpřístupňují injektory surových protobuf zpráv:
- `ats cmd lrw <hex>` — Vloží surový binární příkazový rámec do procesoru downlink příkazů LoRaWAN.
- `ats cmd nfc <hex>` — Vloží surový binární příkazový rámec do enginu šifrovaných NFC příkazů.

Odpovědi se vypisují přímo do konzole jako hexadecimální řetězce. Odložené hardwarové akce (restart, factory reset) se validují, ale při vložení ze shellu se potlačí.
:::
