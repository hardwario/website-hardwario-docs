---
title: Diagnostika
---
import Image from '@theme/IdealImage';

# Diagnostika (`ats`) {#diagnostics-ats}

Sada příkazů `ats` ve vývojářské konzoli (viz [**Nastavení firmwaru**](firmware-setup.md)) zahrnuje diagnostiku jen pro čtení, nástroje k ověření hardwaru a pomůcky pro testování na stole. Na rozdíl od podpříkazů `config` diagnostické příkazy podsystémy zařízení jen zkoumají a testují a uložené konfigurační parametry nepřepisují.

:::info Firmware v2.0.0
Hlavní změny ve **firmwaru STICKER v2.0.0**:
- **Diagnostika pro obě rádia:** z `ats lrw` je `ats radio`, které funguje pro LoRaWAN i P2P.
- **Claim okno a nové vkládání příkazů:** `ats claim active|done|status` a vedle `ats cmd lrw|nfc` také `ats cmd vnd|plain|history`.
- **Podrobnější informace o zařízení:** `ats device info` přidává údaje o rádiovém spojení, poslední chybu CPU, stavové příznaky zařízení a stav mailboxu NFC.
- **Uplink Info:** odchází po startu a po připojení na obou rádiích a opakuje se každých `interval-announce` hodin, následovaný klíčovým nastavením. Nově nese poslední chybu CPU a stav slotů 1-Wire; údaje o rádiovém spojení se přesunuly do příkazu `get_radio_state`.
:::

---

## Informace o zařízení a zprovoznění {#device--provisioning-info}

| Příkaz | Popis |
|---|---|
| `ats device info` | Vypíše verzi firmwaru, typ sestavení (release nebo debug), sériové číslo, dobu běhu, stav rádia, RSSI/SNR posledního downlinku, spreading factor / datovou rychlost a vysílací výkon, čítače spojení a provozu rádia, napětí baterie, příčinu resetu, poslední chybu CPU (po restartu kvůli chybě), stavové příznaky zařízení, dostupnost mailboxu NFC, aktuální čas, DevEUI, secret key (zamaskovaný) a claim token. |
| `ats device reboot` | Provede studený restart systému. |

### Info a oznámení nastavení {#info-and-settings-announce}
Zařízení STICKER odesílá **uplink Info** na fPort 85 po každém startu a připojení k síti (v LoRaWAN i P2P), jako odpověď na příkaz `clock_sync` a znovu každých `interval-announce` hodin (výchozí 24 h). Po startu, připojení a pravidelném oznámení následuje za zprávou Info uplink **settings-info** s klíčovým nastavením: intervaly, `history-enable`, všechny příznaky schopností a typy nalezených senzorů 1-Wire. Zpráva Info obsahuje:
- Sériové číslo, verzi firmwaru a typ sestavení
- Dobu běhu a aktuální čas
- Příčinu resetu a po restartu kvůli chybě poslední chybu CPU (důvod, PC, LR)
- Napětí baterie
- Stavové příznaky zařízení (druhy aktivních alarmů, vypnuté rádio, výpadek spojení, problémy s NFC, nesynchronizované hodiny, otevřené claim okno) a aktivní alarmy
- Stav každého slotu 1-Wire (`ok`, `absent`, `replaced` nebo `mismatch`)

Při čtení přes NFC nese zpráva Info navíc DevEUI a claim token. Údaje o rádiovém spojení (stav spojení, SF/DR, vysílací výkon, RSSI/SNR v obou směrech, využití duty cycle, čítače) ve zprávě Info nejsou; hostitel je čte příkazem `get_radio_state`.

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

Stavová LED ukazuje heartbeat řazený podle závažnosti (stav připojení k síti, režim rádia, stav alarmu) a jednorázové vzory při interakci (přístup přes NFC, aktivace vstupu). Popis vzorů najdete na stránce [**Popis hardwaru**](../hardware-description.md#led-indication).

Podpříkazy `ats led` slouží k testování jednotlivých barevných kanálů při výrobě nebo diagnostické kontrole:

| Příkaz | Popis |
|---|---|
| `ats led cycle [count]` | Postupně projde červený, žlutý a zelený kanál LED. `count` určuje počet opakování (`0` zastaví, výchozí `1`). |
| `ats led switch <color> <state>` | Ručně nastaví jednotlivý kanál LED (`red`, `yellow` nebo `green`) na `on` nebo `off`. |

---

## Diagnostika rádia {#radio-diagnostics}

`ats radio` pracuje s rádiem, které vybral `radio-mode`. Některé podpříkazy existují jen pro jeden rádiový stack.

| Příkaz | Popis |
|---|---|
| `ats radio status` | Vypíše stav rádia (LoRaWAN nebo P2P). |
| `ats radio compose [budget]` | Sestaví telemetrický rámec bez odeslání a vypíše ho hexadecimálně. `budget` platí jen pro LoRaWAN. |
| `ats radio tx_mute on\|off` | Ladění: telemetrie selže ještě před vysíláním, aby šlo otestovat chování při ztrátě spojení. |
| `ats radio check` | LoRaWAN: odešle uplink s příkazem MAC `LinkCheckReq`. |
| `ats radio lc ok\|fail` | LoRaWAN, ladění: podstrčí výsledek kontroly spojení. |
| `ats radio reset` | LoRaWAN: vynuluje čítače rámců a DevNonce (vyvolá okamžitý restart). |
| `ats radio listen on\|off` | P2P: nepřetržitý příjem jako referenční přijímač pro testovací sestavu se dvěma zařízeními STICKER. |
| `ats radio unjoin` | P2P: zruší spárování (restartuje zařízení). |
| `ats radio ack_drop <count>` | P2P, ladění: dalších `<count>` potvrzení potvrzovaných uplinků se bude tvářit jako ztracených. |

Podpříkazy P2P jsou jen v sestaveních, která obsahují rádio P2P i shell; standardní sestavení debug P2P vynechává.

---

## Claim okno {#claim-window}

| Příkaz | Popis |
|---|---|
| `ats claim status` | Zobrazí stav claim okna (`active` nebo `done`) a zda je nastavený claim token. |
| `ats claim active` | Znovu otevře claim okno. |
| `ats claim done` | Zavře claim okno. |

Jak claim okno funguje, popisuje část [**Mailbox NFC a claim okno**](configuration.md#nfc-mailbox-and-claim-window).

---

## Vkládání příkazů a nástroje pro testování (sestavení debug) {#command-injection-and-bench-tools-debug-builds}

Sestavení debug nabízí příkazy pro vkládání surových příkazů protobuf. Odpovědi se vypisují přímo do konzole jako hexadecimální řetězce. Odložené hardwarové akce (restart, factory reset) se ověří, ale při vložení ze shellu se neprovedou.

| Příkaz | Popis |
|---|---|
| `ats cmd lrw <hex>` | Vloží surový binární příkazový rámec do zpracování příkazů z downlinku LoRaWAN. |
| `ats cmd nfc <hex>` | Vloží surový příkaz do zpracování příkazů NFC, jako by dorazil dešifrovaný šifrovaným kanálem NFC. |
| `ats cmd vnd <hex>` | Vloží surový příkaz do kanálu NFC výrobce. |
| `ats cmd plain <hex>` | Vloží surový příkaz do nešifrovaného kanálu, který odpovídá jen na `get_basic_info` a `get_claim_info`. |
| `ats cmd history [<from> [<to>]]` | Spustí stránkované čtení historie jako přes NFC. |
| `ats buzzer off` | Okamžitě zastaví bzučák. |
| `ats buzzer beep <ms>` | Pípne bzučákem na `1`-`5000` ms. |
| `ats buzzer play <info\|warning\|alarm> [repeat_s]` | Zahraje melodii, volitelně opakovanou každých `repeat_s` sekund (`0`-`999`). |

Příkazy `ats buzzer` jsou jen v sestaveních s podporou bzučáku a vyžadují `cap-gpio-mode buzzer`.

Příkaz `nfc` pracuje přímo s čipem NFC: `nfc mb status|on|off|serve` zobrazí a ovládá mailbox a `nfc clear` vymaže paměť NFC včetně záznamů NDEF, které zůstaly z firmwaru v1.4.x.
