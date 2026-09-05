---
slug: sensor-history
title: Historie senzorů
description: "Uložené záznamy přežijí výměnu baterií i ztrátu napájení. Záznam se konfiguruje parametry config a lokálně se spravuje shell příkazem history (viz Nastavení firmwaru)."
---
import Image from '@theme/IdealImage';

# Historie senzorů a store-and-forward (`history`) {#sensor-history--store-and-forward-history}

**Engine historie senzorů** zajišťuje pro zařízení STICKER funkci store-and-forward. Když zařízení přijde o konektivitu LoRaWAN, měření ze senzorů se průběžně ukládají do nevolatilní flash paměti. Po obnovení konektivity nebo na žádost backendu lze historické záznamy přehrát přes radiové rozhraní, případně je lokálně přečíst přes NFC.

Uložené záznamy přežijí výměnu baterií i ztrátu napájení. Záznam se konfiguruje parametry `config` a lokálně se spravuje shell příkazem `history` (viz [**Nastavení firmwaru**](firmware-setup.md)).

:::info Firmware v1.4.0
Funkce store-and-forward popsaná na této stránce je základní funkcí **firmwaru STICKER v1.4.0**. Během výpadků sítě zaznamenává vzorky ze senzorů do flash paměti a na žádost je přehraje.
:::

---

## Konfigurace {#configuration}

| Příkaz | Argument | Popis |
|---|---|---|
| `config history-enable` | `true` / `false` | Hlavní vypínač záznamu historie. Výchozí `false`. |
| `config history-sensors` | Bitová maska (uint32) | Maska kanálů určující, které kanály senzorů se mají ukládat. Výchozí `0x0003` (**teplota + vlhkost**). `0` vypíná záznam kanálů. |

Senzory se vzorkují a ukládají podle rozvrhu `interval-sample` (nebo jednou za uplink, pokud je `interval-sample` rovno `0`), viz [**Konfigurace**](configuration.md).

### Zaznamenatelné kanály {#recordable-channels}

Bitová maska `history-sensors` mapuje bit $i$ na kanál $i$ (v 32bitovém poli je volitelných až 19 kanálů):

- **`temperature`**, **`humidity`**: Integrované senzory prostředí
- **`s1-temp`/`s1-hum` … `s4-temp`/`s4-hum`**: Slot pro senzory 1-Wire 1 až 4
- **`hall-left`**, **`hall-right`**, **`input-a`**, **`input-b`**: Pulzní a čítačové vstupy
- **`motion`**: Počet detekcí pohybu integrovaným PIR
- **`pressure`**, **`illuminance`**, **`orientation`**, **`accel-motion`**: Barometr, okolní osvětlení, náklon z akcelerometru a čítače pohybových událostí

Kanály neosazených fyzických senzorů se automaticky přeskakují.

---

## Shell příkazy (`history`) {#shell-commands-history}

| Příkaz | Popis |
|---|---|
| `history info` | Vypíše stav bufferu, využití paměti a odhad kapacity. |
| `history count` | Zobrazí celkový počet aktuálně uložených záznamů. |
| `history read [N]` | Vypíše zaznamenané vzorky historie (nebo posledních `N` záznamů). |
| `history stats` | Zobrazí minimum, maximum a průměr pro každý zaznamenaný senzor. |
| `history sensors [<name> on/off]` | Zobrazí aktuálně aktivní kanály historie nebo jednotlivý kanál přepne. |
| `history enable <on/off>` | Hlavní přepínač pro zapnutí nebo pozastavení záznamu historie. |
| `history capture` | Vynutí okamžité vzorkování senzorů a zapíše jeden záznam do bufferu (užitečné při testování na stole). |
| `history clear` | Vyprázdní celý kruhový buffer historie. |

---

## Přehrání a získání historie {#replaying--retrieving-history}

Data uložená v bufferu historie lze získat dvěma způsoby:

- **Přes LoRaWAN (vzdálené přehrání):** Backend odešle downlink příkaz `req_history` na **fPort 85**. Zařízení STICKER pošle odpovídající historické rámce zpět jako uplinky `history_frame` na fPort 85 (viz [**Downlink příkazy**](../connectivity/downlink-commands.md)).
- **Přes šifrované NFC (lokální stažení):** Aplikace **HARDWARIO Manager** čte buffer stránku po stránce v šifrované NFC session (`req_history_page`), což umožňuje úplné offline stažení dat bez spotřeby vysílacího času LoRaWAN.

---

## Úložiště a kapacita kruhového bufferu {#storage--ring-buffer-capacity}

Záznamy historie se ukládají do vyhrazené **32 KB kruhové flash partition**, striktně oddělené od systémové konfigurace a přihlašovacích údajů LoRaWAN.

Zábor paměti se liší podle velikosti vybraného kanálu:
- Teplota / tlak / osvětlení: 2 bajty každý
- Vlhkost / orientace: 1 bajt každý
- Pulzní čítače: 4 bajty každý

**Odhad kapacity:**
Ve výchozí konfiguraci (teplota + vlhkost) uloží 32 KB flash buffer přibližně **9 400 záznamů**, což při vzorkovacím intervalu 15 minut odpovídá **~98 dnům offline záznamu**.

:::caution Chování paměti při aktualizaci firmwaru
Přehrání nebo aktualizace image firmwaru znovu inicializuje rozvržení 32 KB partition historie a **vymaže uložené záznamy historie**. Systémová konfigurace a přihlašovací údaje LoRaWAN zůstávají zachované.
:::
