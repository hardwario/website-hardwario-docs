---
title: Diagnostika
---
import Image from '@theme/IdealImage';

# Diagnostika (`ats`) {#diagnostics-ats}

Sada příkazů `ats` ve vývojářské konzoli (viz [**Nastavení firmwaru**](firmware-setup.md)) zahrnuje diagnostiku jen pro čtení, nástroje k ověření hardwaru a pomůcky pro testování na stole. Na rozdíl od podpříkazů `config` diagnostické příkazy podsystémy zařízení jen zkoumají a testují a uložené konfigurační parametry nepřepisují.

:::info Firmware v1.4.0
Ve **firmwaru STICKER v1.4.0** byla rodina diagnostických příkazů shellu **přejmenována z `tester` na `ats`** (Automated Test System). Hlavní novinky ve v1.4.0:
- **Informace o zařízení při připojení:** Automatický informační paket odeslaný při každém připojení k síti nebo synchronizaci hodin.
- **Rozšířené nástroje `ats`:** Přidány `ats lrw reset`, `ats lrw compose`, `ats lrw lc` a vkládání surových příkazů (`ats cmd lrw|nfc`).
- **Ověření zprovoznění:** `ats device info` zobrazuje sériové číslo, secret key zařízení a claim token zapisovatelný jen jednou.
:::

---

## Informace o zařízení a zprovoznění {#device--provisioning-info}

| Příkaz | Popis |
|---|---|
| `ats device info` | Vypíše sériové číslo hardwaru, verzi firmwaru, profil sestavení, dobu běhu systému, stav hodin RTC, AES secret key a 128bitový claim token. |
| `ats device reboot` | Provede studený restart systému. |

### Telemetrie s informacemi o zařízení při připojení {#device-info-on-join-telemetry}
Ve firmwaru v1.4.0 a novějším zařízení STICKER automaticky vytvoří a odešle **informační uplink payload** vždy, když dokončí připojení k síti LoRaWAN (Join) nebo synchronizuje hodiny se sítí. Tento uplink obsahuje:
- Sériové číslo a verzi vydání firmwaru
- Příčinu resetu (zapnutí, watchdog, softwarový reset, reset pinem)
- 128bitový claim token zapisovatelný jen jednou
- Aktivní režim rádia (stav `radio-mode`)
- Napětí baterie pod zátěží

---

## Testování senzorů {#sensor-subsystem-testing}

| Příkaz | Popis |
|---|---|
| `ats sensors sample` | Okamžitě přečte a zobrazí aktuální měření ze všech senzorů na desce a připojených senzorů 1-Wire. |
| `ats sensors serial` | Vypíše fyzická sériová čísla (ROM kódy) všech nalezených senzorů 1-Wire. |
| `ats sensors reset` | Vynuluje všechny aktivní čítače impulzů (Hallovy spínače a externí vstupy A/B). |
| `ats sensors check <sensor> [timeout]` | Sleduje konkrétní kanál senzoru a průběžně vypisuje změny hodnot do konzole pro živé testování na stole. |

---

## Testování signalizace LED {#led-signal-testing}

Stavová LED ukazuje heartbeat řazený podle závažnosti (stav připojení k síti, režim rádia, stav alarmu) a jednorázové vzory při interakci (přístup přes NFC, aktivace vstupu). Popis vzorů najdete na stránce [**Popis hardwaru**](hardware-description.md#led-indication).

Podpříkazy `ats led` slouží k testování jednotlivých barevných kanálů při výrobě nebo diagnostické kontrole:

| Příkaz | Popis |
|---|---|
| `ats led cycle [count]` | Postupně projde červený, žlutý a zelený kanál LED. `count` určuje počet opakování (`0` zastaví, výchozí `1`). |
| `ats led switch <color> <state>` | Ručně nastaví jednotlivý kanál LED (`red`, `yellow` nebo `green`) na `on` nebo `off`. |

---

## Diagnostika LoRaWAN a vkládání příkazů {#lorawan-diagnostics--command-injection}

| Příkaz | Popis |
|---|---|
| `ats lrw status` | Vypíše aktuální stav stacku LoRaWAN, typ aktivace (OTAA/ABP), klíče relace a stav kontroly spojení. |
| `ats lrw check` | Zařadí a okamžitě odešle uplink s příkazem MAC `LinkCheckReq`. |
| `ats lrw compose [budget]` | Sestaví standardní telemetrický rámec bez odeslání a vypíše surový hexadecimální payload pro fPort 2 do konzole. |
| `ats lrw reset` | Vynuluje čítače rámců LoRaWAN a parametry DevNonce (vyvolá okamžitý restart). |
| `ats lrw lc <result>` | Simuluje odpověď na link check (`ok` nebo `fail`) pro lokální ladění relace. |

:::info Vkládání surových příkazových rámců (sestavení debug)
Sestavení debug nabízí příkazy pro vkládání surových zpráv protobuf:
- `ats cmd lrw <hex>`: Vloží surový binární příkazový rámec do zpracování příkazů z downlinku LoRaWAN.
- `ats cmd nfc <hex>`: Vloží surový binární příkazový rámec do zpracování šifrovaných příkazů NFC.

Odpovědi se vypisují přímo do konzole jako hexadecimální řetězce. Odložené hardwarové akce (restart, factory reset) se ověří, ale při vložení ze shellu se neprovedou.
:::
