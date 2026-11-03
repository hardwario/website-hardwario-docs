---
slug: downlinks
title: Zpracování downlinků
description: Jak zařízení STICKER přijímá příkazy přes rádio, kdy se změny projeví a jak na příkazy odpovídá.
---

# Zpracování downlinků {#downlink-processing}

Zařízení STICKER můžete ovládat na dálku downlinky, tedy zprávami, které mu posílá síťový server. Tato stránka popisuje, co s nimi zařízení udělá.

## Jak se příkaz dostane do zařízení {#how-a-command-reaches-the-device}

Zařízení STICKER přijímá downlinky vždy jen krátkou chvíli po každém svém uplinku (zprávě ze zařízení). Příkaz proto čeká na síťovém serveru až do dalšího uplinku. Obvykle je to další pravidelné hlášení, které zařízení posílá jednou za interval hlášení (`interval-report`, výchozí 15 min).

1. Zařaďte příkaz do fronty na **fPort 85**, kde zařízení STICKER přijímá příkazy. Přidělte mu pořadové číslo (`seq`) 1 nebo vyšší.
2. Zařízení příkaz přijme po svém dalším uplinku a vykoná ho.
3. Odpověď pošle jako uplink na fPort 85 se stejným pořadovým číslem.

Pokud odpověď nepřijde, přečtěte si nejdřív aktuální nastavení příkazem `get_settings`. Teprve potom opakujte příkaz, který ukládá změny nebo restartuje zařízení.

## Příkazy přes rádio a přes NFC {#commands-over-the-radio-and-over-nfc}

Příkazy, které by mohly zařízení odříznout od sítě nebo prozradit jeho tajné údaje, fungují jen přes NFC v aplikaci [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration).

**Přes rádio** můžete:

- číst nastavení, informace o zařízení nebo stav rádia (`get_param`, `get_config`, `get_settings`, `get_info`, `get_radio_state`)
- měnit a ukládat nastavení nebo zařízení restartovat (`set_param`, `settings_save`, `reboot`)
- nulovat čítače, znovu připojit zařízení k síti nebo seřídit hodiny (`reset_counters`, `lrw_join`, `clock_sync`)
- hned změřit a odeslat hodnoty, prohledat sběrnici 1-Wire, přehrát melodii bzučáku nebo vyčíst historii (`sample`, `force_send`, `w1_scan`, `buzzer_play`, `req_history`)

**Jen přes NFC** (nebo v shellu) fungují:

- reset zařízení a obnovení továrního nastavení (`device_reset`, `factory_reset`)
- reset LoRaWAN (`lrw_reset`)
- přechod do kalibračního režimu (`enter_calibration`)
- nastavení nového secret key (`set_secret_key`)

Tyto příkazy zařízení přes rádio odmítne s chybou `NOT_READY`. Downlinky sestavíte nástrojem [**Generátor příkazů přes downlink**](../connectivity/downlink-commands-generator.mdx). Jak vypadá každý příkaz v hex i v JSON, popisuje stránka [**Příkazy přes downlink**](../connectivity/downlink-commands.md).

<details>
<summary><b>Příklady downlinků</b></summary>

Downlinky jsou zapsané v hex a posílají se na fPort 85. Číslo v závorce je pořadové číslo.

| Hex | Co příkaz udělá |
|---|---|
| `08032200` | `get_info` (3): pošle uplink Info (informace o zařízení) |
| `0807fa0100` | `get_settings` (7): pošle uplink s nastavením (hlavní parametry) |
| `08043200` | `settings_save` (4): uloží změny a pak se restartuje |
| `08056200` | `clock_sync` (5): získá čas ze sítě a pak pošle uplink Info |
| `08064a00` | `force_send` (6): místo odpovědi pošle telemetrii (naměřené hodnoty) |
| `08118a0100` | `lrw_join` (17): bez restartu se znovu připojí k síti |
| `080812023001` | `set_param` (8): smaže všechna pravidla alarmů, ale jen do dalšího restartu |

</details>

## Kdy se změna projeví {#when-a-change-takes-effect}

- **Po uložení:** většina nastavení poslaných příkazem `set_param` začne platit až po uložení (`settings_save` nebo `set_param` se `save`), při kterém se zařízení restartuje. Do té doby zařízení pracuje se současným nastavením, i když příkazy pro čtení už ukazují nové hodnoty. Příkaz `reboot` bez uložení změny zahodí.
- **Hned:** pravidla alarmů a vynulování čítačů se projeví bez restartu. Neuložená pravidla alarmů se při dalším restartu vrátí na původní.
- **Nikdy přes rádio:** downlinkem nezměníte režim rádia, region, klíče LoRaWAN ani další síťová nastavení, protože chybná hodnota by mohla spojení přerušit. Pokud `set_param` některé z nich obsahuje, zařízení odpoví `NOT_WRITABLE` a nezmění vůbec nic. Tato nastavení měňte přes NFC, viz [**Konfigurace**](configuration.md).

Zařízení nastavení uloží, restartuje se nebo se znovu připojí k síti, až když odešle odpověď, nejpozději ale zhruba 2 min po příkazu.

## Odpovědi {#answers}

Většina příkazů odpovídá krátkým potvrzením (`Ack`). Příkazy pro čtení vracejí rovnou data.

Dlouhá odpověď přijde v několika částech, které zařízení pošle samo. Dekodér je označí, například `"pages": "2/4"`. Zařízení daleko od brány vysílá nízkou přenosovou rychlostí: každý uplink unese jen několik bajtů a jeho odeslání trvá dlouho, proto na velkou odpověď počítejte aspoň s hodinou. Pokud některá část chybí, pošlete stejný příkaz `get_config` nebo `get_param` znovu s polem `page` nastaveným na `page_index` chybějící části. Hodnota `page_index` začíná od 0, takže část označená `"2/4"` má `page` 1.

<details>
<summary><b>Chybové odpovědi</b></summary>

U odmítnutého nastavení dekódovaná chyba určí i to, o které nastavení jde, a to dvěma čísly: číslem skupiny a číslem pole.

| Chyba | Obvyklá příčina |
|---|---|
| `BAD_REQUEST` (1) | Příkaz nešlo dekódovat |
| `OUT_OF_RANGE` (2) | Hodnota nebo pravidlo alarmu mimo povolený rozsah, nebo neexistující část odpovědi |
| `NOT_READY` (3) | Příkaz na tomto kanálu není povolený, ještě se odesílá jiná dlouhá odpověď, nebo sběrnice 1-Wire či bzučák nejsou připravené |
| `HISTORY_UNAVAILABLE` (4) | V požadovaném časovém okně nejsou žádné záznamy, například proto, že je historie vypnutá |
| `NOT_SUPPORTED` (7) | Neznámý příkaz nebo funkce, kterou tento firmware nemá |
| `NOT_WRITABLE` (8) | Nastavení nejde přes tento kanál zapsat, například nastavení LoRaWAN přes rádio |
| `BUDGET_TOO_SMALL` (9) | Odpověď je na současnou přenosovou rychlost příliš velká. Zkuste to znovu při vyšší přenosové rychlosti, nebo údaje přečtěte přes NFC |

</details>
