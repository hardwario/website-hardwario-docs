---
slug: downlink-commands
title: Příkazy přes downlink
---
import Image from '@theme/IdealImage';

# Příkazy přes downlink a správa na dálku (`fPort 85`) {#downlink-commands--remote-management-fport-85}

Zařízení STICKER přijímá příkazy jako **downlinky LoRaWAN na fPort 85** a odpovídá na ně zprávami na **fPort 85**. V režimu [**LoRa P2P**](./lora-p2p.md) putují stejné příkazy i odpovědi přes ProXimos Hub.

Příkazy lze posílat ve dvou formátech:
- **Jako JSON (doporučeno):** Pokud má síťový server kodek payloadu STICKER (`ttn.js`) přiřazený jako formátovač downlinků, můžete příkazy zařazovat jako strukturované objekty JSON.
- **Jako surový hex:** Předem zakódované binární bajty payloadu lze poslat přímo na fPort 85, aniž by procházely kodérem LNS.

Ve všech ukázkách JSON níže je `seq` pořadové ID transakce, které volíte sami (například `1`); zařízení ho vrátí v odpovědi uplinkem.

:::info Firmware v2.0.0
Příkazy a příklady na této stránce platí pro firmware STICKER **v2.0.0** a jsou zakódované kodekem `ttn.js` verze v2.0.0. Oproti v1.4.0:
- **Stránkované odpovědi:** Odpověď, která se nevejde do jednoho rámce, se rozdělí na stránky se stejným `seq` a zařízení je pošle všechny samo.
- **Nové příkazy:** `get_settings` (klíčová nastavení na vyžádání) a `get_radio_state` (stav spojení a diagnostika rádia).
- **Pravidla alarmů** mají 18 bajtů a hodnotu určují slotem a kanálem. Sedmnáctibajtová pravidla z v1.4.x zařízení nepřijme.
- **`alarms_replace`** přepíše celou tabulku alarmů jedním `set_param`.
- **`get_info`** už neobsahuje claim token ani stav spojení; stav spojení zjistíte příkazem `get_radio_state`.
:::

:::caution Uložení změn konfigurace
Parametry změněné na dálku pomocí `set_param` se okamžitě projeví v RAM. Změny se ale **neuloží do flash paměti**, dokud nepošlete příkaz `settings_save` nebo `set_param` s `"save": true` (obojí vyvolá restart zařízení). Neuložené změny se při dalším vypnutí a zapnutí zahodí.
:::

---

## Akční příkazy (bez parametrů) {#action-commands-no-parameters}

Akční příkazy spouštějí systémové operace, vyžádají si diagnostická hlášení nebo zjistí stav zařízení.

| Akce | Příkaz JSON | Hex (fPort 85) | Popis |
|---|---|---|---|
| **Vyžádat informace o zařízení** | `{"command":"get_info","seq":1}` | `08012200` | Vrátí **Info** zařízení: verzi a typ sestavení firmwaru, sériové číslo, dobu běhu, čas, napětí baterie, příčinu resetu, stav zařízení, aktivní alarmy a stav slotů 1-Wire. |
| **Vyžádat klíčová nastavení** | `{"command":"get_settings","seq":1}` | `0801fa0100` | Vrátí settings-info: interval hlášení a vzorkování, zapnutí historie, všechny příznaky senzorů a typy nalezených senzorů 1-Wire. Je mnohem kratší než `get_config`. |
| **Vyžádat stav rádia** | `{"command":"get_radio_state","seq":1}` | `0801820200` | Vrátí stav spojení, SF / datovou rychlost, vysílací výkon, RSSI/SNR posledního downlinku a uplinku, využití duty cycle a čítače od startu. |
| **Odeslat hlášení ihned** | `{"command":"force_send","seq":1}` | `08014a00` | Ihned odešle telemetrický uplink na fPort 2. Odpovědí je tento uplink. |
| **Změřit a odeslat** | `{"command":"sample","seq":1}` | `0801aa0100` | Provede nové měření senzorů a pošle ho jako telemetrický uplink na fPort 2. |
| **Získat konfiguraci** | `{"command":"get_config","seq":1}` | `08012a00` | Vrátí úplný výpis aktivních parametrů zařízení v několika stránkách. |
| **Prohledat sběrnici 1-Wire** | `{"command":"w1_scan","seq":1}` | `08017200` | Prohledá sběrnici 1-Wire a najde připojené senzory Dallas / Machine Probe. |
| **Synchronizovat hodiny RTC** | `{"command":"clock_sync","seq":1}` | `08016200` | Vyžádá si síťový čas (na LoRaWAN přes `DeviceTimeReq`) a odpoví zprávou Info se synchronizovaným časem. |
| **Uložit připravenou konfiguraci** | `{"command":"settings_save","seq":1}` | `08013200` | Zapíše čekající konfiguraci z RAM do flash paměti NVS a restartuje zařízení. |
| **Restartovat systém** | `{"command":"reboot","seq":1}` | `08013a00` | Restartuje zařízení, jakmile odešle odpověď. |
| **Vynutit opětovné připojení** | `{"command":"lrw_join","seq":1}` | `08018a0100` | Zahájí nové připojení k síti (na LoRaWAN OTAA Join, na P2P nové spárování). |
| **Přehrát melodii bzučáku** | `{"command":"buzzer_play","seq":1,"buzzer_play":{"kind":3}}` | `0801e201020803` | Přehraje melodii bzučáku 3 (melodie 1–3, `0` přehrávání zastaví). Vyžaduje variantu s bzučákem a `cap-gpio-mode buzzer`. |

:::note Příkazy dostupné přes rádio
Přes LoRaWAN i P2P přijímá firmware v2.0.0 příkazy `set_param`, `get_param`, `get_info`, `get_config`, `get_settings`, `get_radio_state`, `settings_save`, `reboot`, `force_send`, `sample`, `reset_counters`, `req_history`, `clock_sync`, `w1_scan`, `lrw_join` a `buzzer_play`. Resetovací příkazy (`factory_reset`, `device_reset`, `lrw_reset`) a `enter_calibration` fungují jen přes NFC nebo shell.
:::

---

## Konfigurace na dálku (`set_param` a `get_param`) {#remote-configuration-setparam--getparam}

Přes rádio může `set_param` zapisovat konfigurační skupiny `application`, `sensors` a `alarms`. Skupinu `lorawan` (klíče, region, ADR, datová rychlost, `radio_mode`) a parametry rádia P2P lze přečíst přes `get_param` / `get_config`, nastavit je ale jde jen přes NFC nebo shell.

### Příklady {#examples}

**Nastavení intervalu hlášení na 10 minut (600 sekund):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "application": { "interval_report": 600 } } }
```

*Hex (fPort 85):* `08011205120318d804`

**Nastavení intervalu opakovaného ohlášení Info a nastavení na 24 hodin (`interval_announce`):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "application": { "interval_announce": 24 } } }
```

*Hex (fPort 85):* `0801120412024018`

**Přidělení pinů GP vstupům a měření analogového napětí na vstupu A:**

```json
{ "command": "set_param", "seq": 1, "set_param": { "sensors": { "cap_gpio_mode": "inputs", "cap_gpio_input_a": "analog" } } }
```

*Hex (fPort 85):* `080112082206d80101e00102`

**Dotaz na konkrétní parametr (například interval hlášení):**

```json
{ "command": "get_param", "seq": 1, "get_param": { "application_field": [3] } }
```

*Hex (fPort 85):* `08011a03120103`

**Vynulování čítačů impulzů (levý Hallův spínač a externí vstup A):**

```json
{ "command": "reset_counters", "seq": 1, "reset_counters": { "hall_left": true, "input_a": true } }
```

*Hex (fPort 85):* `0801520408011801`

---

## Dynamická pravidla alarmů (`alarms`) {#dynamic-alarm-rules-alarms}

Pravidla alarmů lze měnit na dálku. Obsadit lze až 16 pravidel (`alarm_0` až `alarm_15`). Každé pravidlo hlídá jednu hodnotu, kterou určuje **slot** (kde senzor je) a **kanál** (která hodnota daného senzoru). Aktivní alarmy posílají okamžitá hlášení uplinkem na **fPort 3**.

### Struktura pravidla (18 bajtů) {#rule-layout-18-bytes}

Každá hodnota `alarm_N` je 18bajtový blok, v JSON zapsaný jako hex řetězec:

| Bajt | Pole | Význam |
|---|---|---|
| 0 | Příznaky | Bit 0 = pravidlo existuje, bit 1 = pravidlo je zapnuté. `03` = aktivní pravidlo, `00` = prázdné pravidlo |
| 1 | Slot | `0` = senzory na desce, `1`–`4` = slot 1-Wire 1–4 |
| 2 | Kanál | Číslo kanálu daného typu senzoru (viz níže) |
| 3 | Typ senzoru | `1` = deska, `2` = Dallas, `3` = Machine Probe |
| 4 | Z | Jen stavová pravidla: předchozí úroveň (0/1) |
| 5 | Do | Jen stavová pravidla: spouštěcí úroveň (0/1) |
| 6–9 | Dolní mez | Float, little-endian. Prahová pravidla: dolní mez |
| 10–13 | Horní mez | Float, little-endian. Prahová pravidla: horní mez; pravidla četnosti: počet, který spustí alarm |
| 14–17 | Dwell | Float, little-endian. Prahová pravidla: pásmo hystereze v jednotkách kanálu (0 až horní − dolní mez); stavová pravidla: čas v sekundách (0–3600); pravidla četnosti: okno počítání v sekundách (0–3600, 0 = interval hlášení) |

Prahové pravidlo se aktivuje, jakmile hodnota opustí pásmo `[dolní, horní]`, a zruší se, až se vrátí dovnitř o víc než dwell (pod `horní − dwell`, nebo nad `dolní + dwell`).

Běžné kanály:

| Typ senzoru | Kanály |
|---|---|
| Deska (`1`) | `0` teplota, `1` vlhkost, `2` tlak, `3` osvětlení, `4` teplota barometru, `5`/`7` stav levého/pravého Hallova spínače, `6`/`8` počet impulzů levého/pravého Hallova spínače, `9`/`12` stav vstupu A/B, `10`/`13` počet impulzů vstupu A/B, `11`/`14` napětí vstupu A/B, `15` pohyb PIR, `16` počet PIR, `17` pohyb akcelerometru, `18` počet akcelerometru |
| Dallas (`2`) | `0` teplota |
| Machine Probe (`3`) | `0` teplota, `1` vlhkost, `2` pomocná teplota, `3` osvětlení, `4` magnetické pole, `5` náklon, `6`–`8` zrychlení X/Y/Z |

### Příklady {#examples-1}

**Nastavení pravidla 0 (prah teploty na desce: alarm pod 5 °C nebo nad 30 °C):**

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "0300000100000000a0400000f04100000000" } } }
```

*Hex (fPort 85):* `080112162a141a120300000100000000a0400000f04100000000`

**Smazání pravidla alarmu 0:**

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms": { "alarm_0": "000000000000000000000000000000000000" } } }
```

*Hex (fPort 85):* `080112162a141a12000000000000000000000000000000000000`

**Nahrazení celé tabulky alarmů jen pravidlem 0 a uložení:**

`alarms_replace` vyprázdní všech 16 pravidel dřív, než se použijí pravidla ze stejné zprávy, takže pravidla smazaná na serveru zmizí i ze zařízení. `save` změnu uloží a zařízení restartuje.

```json
{ "command": "set_param", "seq": 1, "set_param": { "alarms_replace": true, "alarms": { "alarm_0": "0300000100000000a0400000f04100000000" }, "save": true } }
```

*Hex (fPort 85):* `0801121a2a141a120300000100000000a0400000f0410000000018013001`

Pokud tabulku posíláte v několika downlincích, nastavte `alarms_replace` jen v první zprávě a `save` jen v poslední.

---

## Vyžádání historie na dálku (`req_history`) {#remote-history-replay-reqhistory}

Záznamy ze senzorů, které se během výpadků sítě uložily do flash paměti, získáte downlinkem `req_history` s požadovaným časovým oknem (unixové časové značky). Zařízení STICKER pak uložená měření pošle zpět jako sérii stránek `history_frame` na **fPort 85**, všechny se `seq` požadavku.

**Vyžádání historie senzorů:**

```json
{ "command": "req_history", "seq": 1, "req_history": { "from_unix": 1780000000, "to_unix": 1780003600 } }
```

*Hex (fPort 85):* `08015a0c0880cae2d0061090e6e2d006`

---

## Nastavení downlinků na síťovém serveru {#network-server-downlink-setup}

- **ChirpStack v4:** Přejděte na **Device → Queue** a zvolte **fPort 85**. Zařaďte buď surový hexadecimální payload, nebo strukturovaný objekt JSON (pokud používáte kodek v profilu zařízení).
- **The Things Stack (TTS):** Přejděte na **Device → Messaging → Downlink** a nastavte **fPort 85**. Vložte přímo hexadecimální bajty, nebo payload JSON, pokud je kodek přiřazený jako formátovač payloadu downlinku.
