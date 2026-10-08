---
slug: sensor-history
title: Historie senzorů
title_meta: "Historie senzorů (STICKER)"
---
import Image from '@theme/IdealImage';

# Historie senzorů a store-and-forward (`history`) {#sensor-history--store-and-forward-history}

**Historie senzorů** (Sensor History Engine) zajišťuje v zařízení STICKER funkci store-and-forward. Když zařízení ztratí spojení LoRaWAN, měření ze senzorů se průběžně ukládají do nevolatilní flash paměti. Po obnovení spojení nebo na žádost backendu lze uložené záznamy znovu odeslat rádiem, případně je přečíst na místě přes NFC.

Uložené záznamy přežijí výměnu baterií i ztrátu napájení. Záznam se nastavuje parametry `config` a na místě se spravuje příkazem shellu `history` (viz [**Nastavení firmwaru**](firmware-setup.md)).

:::info Firmware v1.4.0
Store-and-forward popsaný na této stránce je základní funkcí **firmwaru STICKER v1.4.0**. Během výpadků sítě ukládá vzorky ze senzorů do flash paměti a na vyžádání je znovu odešle.
:::

---

## Konfigurace {#configuration}

| Příkaz | Argument | Popis |
|---|---|---|
| `config history-enable` | `true` / `false` | Hlavní vypínač záznamu historie. Výchozí `false`. |
| `config history-sensors` | Bitová maska (uint32) | Maska kanálů určující, které kanály senzorů se mají ukládat, zadaná jako desítkové číslo. Výchozí `3` (`0x0003`, **teplota + vlhkost**). `0` vypíná záznam kanálů. |

Za každý interval hlášení (`interval-report`) se uloží jeden záznam. Obsahuje poslední vzorek senzorů, odebraný podle rozvrhu `interval-sample` (nebo těsně před hlášením, pokud je `interval-sample` rovno `0`), viz [**Konfigurace**](configuration.md). Jak dlouho buffer při zvolených kanálech a intervalu vydrží, spočítá [**Kalkulačka historie senzorů**](sensor-history-calculator.mdx).

### Kanály, které lze zaznamenávat {#recordable-channels}

V bitové masce `history-sensors` odpovídá bit *i* kanálu *i* (v 32bitovém poli lze vybrat až 19 kanálů):

- **`temperature`**, **`humidity`**: Integrované senzory prostředí
- **`s1-temp`/`s1-hum` … `s4-temp`/`s4-hum`**: Sloty senzorů 1-Wire 1 až 4
- **`hall-left`**, **`hall-right`**, **`input-a`**, **`input-b`**: Impulzní a čítačové vstupy
- **`motion`**: Počet detekcí pohybu vestavěným senzorem PIR
- **`pressure`**, **`illuminance`**, **`orientation`**, **`accel-motion`**: Barometr, osvětlenost, náklon z akcelerometru a čítače událostí pohybu

Kanály neosazených fyzických senzorů se automaticky přeskakují.

---

## Příkazy shellu (`history`) {#shell-commands-history}

| Příkaz | Popis |
|---|---|
| `history info` | Vypíše stav bufferu, využití paměti a odhad kapacity. |
| `history count` | Zobrazí celkový počet aktuálně uložených záznamů. |
| `history read [N]` | Vypíše zaznamenané vzorky historie (nebo posledních `N` záznamů). |
| `history stats` | Zobrazí minimum, maximum a průměr pro každý zaznamenaný senzor. |
| `history sensors [<name> on/off]` | Zobrazí aktuálně aktivní kanály historie nebo jednotlivý kanál přepne. |
| `history enable <on/off>` | Hlavní přepínač pro zapnutí nebo pozastavení záznamu historie. |
| `history capture` | Vynutí okamžité vzorkování senzorů a zapíše jeden záznam do bufferu (hodí se při testování na stole). |
| `history clear` | Vyprázdní celý kruhový buffer historie. |

---

## Opětovné odeslání a stažení historie {#replaying--retrieving-history}

Data uložená v bufferu historie lze získat dvěma způsoby:

- **Přes LoRaWAN (opětovné odeslání na dálku):** Backend odešle v downlinku příkaz `req_history` na **fPort 85**. Zařízení STICKER pak pošle odpovídající rámce historie zpět jako uplinky `history_frame` na fPort 85 (viz [**Příkazy přes downlink**](../connectivity/downlink-commands.md)).
- **Přes šifrované NFC (lokální stažení):** Aplikace **HARDWARIO Manager** čte buffer stránku po stránce v šifrované relaci NFC (`req_history_page`), takže data stáhnete celá offline a nespotřebujete vysílací čas LoRaWAN.

---

## Úložiště a kapacita kruhového bufferu {#storage--ring-buffer-capacity}

Záznamy historie se ukládají do vyhrazeného **kruhového oddílu flash paměti o velikosti 32 KB**, přísně odděleného od systémové konfigurace a přístupových údajů LoRaWAN.

Místo v paměti závisí na velikosti vybraných kanálů:
- Teplota / tlak / osvětlenost: po 2 bajtech
- Vlhkost / orientace: po 1 bajtu
- Čítače (impulzní vstupy, pohyb z PIR a akcelerometru): po 4 bajtech

**Odhad kapacity:**
Ve výchozí konfiguraci (teplota + vlhkost) pojme buffer o velikosti 32 KB **9 408 záznamů**, což při výchozím intervalu hlášení 15 minut odpovídá **98 dnům záznamu offline**. Pro jiné kanály a intervaly použijte stránku [**Kalkulačka historie senzorů**](sensor-history-calculator.mdx).

:::caution Chování paměti při aktualizaci firmwaru
Opětovné nahrání nebo aktualizace image firmwaru znovu inicializuje rozvržení oddílu historie (32 KB) a **vymaže uložené záznamy historie**. Systémová konfigurace a přístupové údaje LoRaWAN zůstanou zachované.
:::
