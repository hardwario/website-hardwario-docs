---
slug: downlink-commands
title: Downlink příkazy
description: "Zařízení STICKER zpracovává vzdálené příkazy přijaté jako downlinky LoRaWAN na fPort 85 a odpovědi posílá zpět na fPort 85."
---
import Image from '@theme/IdealImage';

# Downlink příkazy a vzdálená správa (`fPort 85`) {#downlink-commands--remote-management-fport-85}

Zařízení STICKER zpracovává vzdálené příkazy přijaté jako **downlinky LoRaWAN na fPort 85** a odpovědi posílá zpět na **fPort 85**.

Příkazy lze posílat ve dvou formátech:
- **Jako JSON (doporučeno):** Když je na síťovém serveru přiřazený kodek payloadu STICKER (`ttn.js`) jako formátovač downlinků, dají se příkazy zařazovat jako strukturované objekty JSON.
- **Jako surový hex:** Předem zakódované binární bajty payloadu lze poslat přímo na fPort 85 bez průchodu kodérem LNS.

Ve všech ukázkách JSON níže je `seq` uživatelsky určené transakční ID sekvence (například `1`), které se vrací v odpovídající odpovědi uplinkem.

:::info Vzdálené řízení ve firmwaru v1.4.0
Firmware **v1.4.0** přináší komplexní vzdálenou správu přes LoRaWAN na **fPort 85**. Zařízení lze překonfigurovat, dotazovat, synchronizovat nebo mu nařídit přehrání záznamů historie výhradně na dálku, bez potřeby fyzického připojení SWD nebo přístupu přes NFC.
:::

:::caution Uložení změn konfigurace
Parametry změněné na dálku pomocí `set_param` se okamžitě projeví v RAM. Změny se ale **neuloží do flash paměti**, dokud nepošlete příkaz `settings_save` (který vyvolá restart zařízení). Neuložené změny se při dalším vypnutí a zapnutí zahodí.
:::

---

## Akční příkazy (bez parametrů) {#action-commands-no-parameters}

Akční příkazy provádějí systémové operace, vyvolávají diagnostické reporty nebo vynucují reset stavu hardwaru.

| Akce | Příkaz JSON | Hex (fPort 85) | Popis |
|---|---|---|---|
| **Vyžádat informace o zařízení** | `{"command":"get_info","seq":1}` | `08012200` | Vyvolá okamžitý payload **Device Info on Join** (sériové číslo, verze FW, příčina resetu, claim token, stav baterie). |
| **Odeslat report ihned** | `{"command":"force_send","seq":1}` | `08014a00` | Vynutí okamžité vzorkování senzorů a odeslání uplinku na fPort 2. |
| **Získat konfiguraci** | `{"command":"get_config","seq":1}` | `08012a00` | Vrátí kompletní výpis aktivních parametrů zařízení. |
| **Prohledat sběrnici 1-Wire** | `{"command":"w1_scan","seq":1}` | `08017200` | Prohledá sběrnici 1-Wire a najde připojené senzory Dallas / Machine Probe. |
| **Synchronizovat hodiny RTC** | `{"command":"clock_sync","seq":1}` | `08016200` | Odešle MAC žádost `DeviceTimeReq` a synchronizuje hodiny reálného času se síťovým časem. |
| **Uložit připravenou konfiguraci** | `{"command":"settings_save","seq":1}` | `08013200` | Zapíše čekající konfiguraci z RAM do flash paměti NVS a restartuje zařízení. |
| **Restartovat systém** | `{"command":"reboot","seq":1}` | `08013a00` | Vyvolá okamžitý restart systému. |
| **Factory reset** | `{"command":"factory_reset","seq":1}` | `08014200` | Vrátí konfiguraci na výrobní výchozí hodnoty a zachová sériové číslo, secret key a claim token. |
| **Resetovat stack LoRaWAN**| `{"command":"lrw_reset","seq":1}` | `0801820100` | Vynuluje čítače rámců LoRaWAN a hodnoty DevNonce (restartuje MCU). |
| **Vynutit rejoin** | `{"command":"lrw_join","seq":1}` | `08018a0100` | Vynutí, aby stack LoRaWAN zahájil novou sekvenci připojení OTAA. |
| **Vstoupit do kalibrace** | `{"command":"enter_calibration","seq":1}` | `0801920100` | Vstoupí do kalibračního režimu pro Hallovy senzory a analogové vstupy. |

---

## Vzdálená konfigurace (`set_param` a `get_param`) {#remote-configuration-setparam--getparam}

Systémové parametry jsou uspořádané do konfiguračních skupin `lorawan`, `application` a `sensors`.

### Příklady {#examples}

**Nastavení intervalu reportu na 10 minut (600 sekund):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "application": { "interval_report": 600 } } }
```

*Hex (fPort 85):* `08011205120318d804`

**Zapnutí vysílání (`radio_mode`):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "lorawan": { "radio_mode": true } } }
```

*Hex (fPort 85):* `080112040a022801`

**Zapnutí adaptivní datové rychlosti (ADR):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "lorawan": { "adr": true } } }
```

*Hex (fPort 85):* `080112040a022001`

**Dotaz na konkrétní parametr (například interval reportu):**

```json
{ "command": "get_param", "seq": 1, "get_param": { "application_field": [3] } }
```

*Hex (fPort 85):* `08011a03120103`

**Vynulování pulzních čítačů (levý Hallův kontakt a externí vstup A):**

```json
{ "command": "reset_counters", "seq": 1, "reset_counters": { "hall_left": true, "input_a": true } }
```

*Hex (fPort 85):* `0801520408011801`

---

## Dynamická pravidla alarmů (`alarms`) {#dynamic-alarm-rules-alarms}

Pravidla alarmů sledující teplotu, vlhkost, digitální vstupy nebo pulzní prahy lze aktualizovat na dálku. Naplnit lze až 16 pravidel (`alarm_0` až `alarm_15`). Aktivní alarmy posílají okamžitá hlášení uplinkem na **fPort 3**.

**Nastavení slotu 0 (prah teploty na desce: alarm pod 5 °C nebo nad 30 °C):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "03000000000000a0400000f0410000803f" } } }
```

*Hex (fPort 85):* `080112152a131a1103000000000000a0400000f0410000803f`

**Smazání pravidla alarmu ve slotu 0:**

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "0000000000000000000000000000000000" } } }
```

*Hex (fPort 85):* `080112152a131a110000000000000000000000000000000000`

---

## Vzdálené přehrání historie (`req_history`) {#remote-history-replay-reqhistory}

Pro získání offline záznamů ze senzorů, uložených ve flash paměti během výpadků sítě, pošlete downlink `req_history` s požadovaným oknem unixových timestampů. Zařízení STICKER pošle uložená měření zpět jako sekvenci paketů `history_frame` na **fPort 85**.

**Žádost o přehrání historie senzorů:**

```json
{ "command": "req_history", "seq": 1, "req_history": { "from_unix": 1780000000, "to_unix": 1780003600 } }
```

*Hex (fPort 85):* `08015a0c0880cae2d0061090e6e2d006`

---

## Nastavení downlinků na síťovém serveru {#network-server-downlink-setup}

- **ChirpStack v4:** Přejděte na **Device $\rightarrow$ Queue** a zvolte **fPort 85**. Zařaďte buď surový hexadecimální payload, nebo strukturovaný objekt JSON (pokud používáte kodek v profilu zařízení).
- **The Things Stack (TTS):** Přejděte na **Device $\rightarrow$ Messaging $\rightarrow$ Downlink** a nastavte **fPort 85**. Vložte přímo hexadecimální bajty, nebo payload JSON, pokud je kodek přiřazený jako formátovač downlink payloadu.
