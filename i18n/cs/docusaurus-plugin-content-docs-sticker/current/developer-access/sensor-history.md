---
slug: sensor-history
title: Historie senzorů
title_meta: "Historie senzorů (STICKER)"
---
import Image from '@theme/IdealImage';

# Historie senzorů a store-and-forward (`history`) {#sensor-history--store-and-forward-history}

**Historie senzorů** (Sensor History Engine) zajišťuje v zařízení STICKER funkci store-and-forward. STICKER ukládá měření ze senzorů do nevolatilní flash paměti v každém intervalu hlášení, a to i bez rádiového spojení. Po obnovení spojení nebo na žádost backendu lze uložené záznamy znovu odeslat rádiem, případně je přečíst na místě přes NFC.

Uložené záznamy přežijí výměnu baterií i ztrátu napájení. Záznam se nastavuje parametry `config` a na místě se spravuje příkazem shellu `history` (viz [**Nastavení firmwaru**](firmware-setup.md)).

:::info Firmware v2.0.0
Ve **firmwaru STICKER v2.0.0** se zaznamenávané kanály vybírají parametrem `history-channels`, který nahrazuje bitovou masku `history-sensors`. Zaznamenávat lze libovolný kanál senzoru včetně kanálů 1-Wire, teploty z barometru a analogových vstupů. Časy záznamů se řídí hodinami reálného času i přes restarty a výpadky napájení.
:::

---

## Konfigurace {#configuration}

| Příkaz | Argument | Popis |
|---|---|---|
| `config history-enable` | `true` / `false` | Hlavní vypínač záznamu historie. Výchozí `false`. |
| `config history-channels` | 48 hex číslic (24 bajtů) | Kanály k záznamu v pořadí, v jakém jsou v záznamu: až 24 jednobajtových položek, každá `slot × 32 + kanál` (slot `0` = základní deska, `1`-`4` = sloty 1-Wire `s1`-`s4`), `ff` = nepoužito. Výchozí `0001` a za ním bajty `ff`: **teplota + vlhkost** ze senzoru na desce. |

Položky používají čísla kanálů z tabulek kanálů na stránce [**Pravidla alarmů**](alarm-rules.md#channels). Například teplota na desce (`00`), vlhkost (`01`), tlak (`02`) a teplota ze slotu 1-Wire 1 (`1 × 32 + 0` = `20`):

```bash
config history-channels 00010220ffffffffffffffffffffffffffffffffffffffff
config history-enable true
settings save
```

Příkaz `history sensors` níže vybírá kanály podle názvu, což bývá jednodušší než psát hexadecimální řetězec.

Za každý interval hlášení (`interval-report`) se uloží jeden záznam. Obsahuje poslední vzorek senzorů, odebraný podle rozvrhu `interval-sample` (nebo těsně před hlášením, pokud je `interval-sample` rovno `0`), viz [**Konfigurace**](configuration.md). Jak dlouho buffer při zvolených kanálech a intervalu vydrží, spočítá [**Kalkulačka historie senzorů**](sensor-history-calculator.mdx).

### Kanály, které lze zaznamenávat {#recordable-channels}

Zaznamenávat lze každý kanál základní desky a každého slotu 1-Wire s nastaveným typem senzoru. V shellu mají kanály základní desky prosté názvy (`temperature`, `pressure`, `input-a-voltage`, …) a kanály 1-Wire předponu slotu (`s1-temperature`, `s2-humidity`, …).

- Okamžikové kanály `pir-motion` a `accel-motion` zaznamenají `1`, pokud během intervalu nastala aspoň jedna událost.
- Položky s vypnutou schopností a položky slotu 1-Wire bez typu senzoru se přeskakují a nezabírají místo.
- Nedostupná hodnota (například u odpojené sondy) se uloží jako chybějící.

---

## Příkazy shellu (`history`) {#shell-commands-history}

| Příkaz | Popis |
|---|---|
| `history info` | Vypíše stav bufferu, využití paměti, kapacitu a časové segmenty. |
| `history count` | Zobrazí celkový počet aktuálně uložených záznamů. |
| `history read [N]` | Vypíše zaznamenané vzorky historie (nebo posledních `N` záznamů). Záznam pořízený před nastavením hodin ukazuje čas jako `up <s> (no-rtc)`, tedy dobu běhu od startu, při kterém vznikl. |
| `history stats` | Zobrazí minimum, maximum a průměr pro každý zaznamenaný kanál. |
| `history sensors [<channel> on\|off]` | Bez argumentů vypíše všechny kanály a u každého, zda se zaznamenává a zda je jeho schopnost zapnutá. S argumenty jeden kanál přidá nebo odebere. Změna výběru vyprázdní buffer. |
| `history enable on\|off` | Hlavní přepínač pro zapnutí nebo pozastavení záznamu historie. |
| `history capture` | Vynutí okamžité vzorkování senzorů a zapíše jeden záznam do bufferu (hodí se při testování na stole). |
| `history clear` | Vyprázdní celý kruhový buffer historie. |

`history sensors` a `history enable` změní běžící zařízení okamžitě; stejně jako zápis přes `config` se ale změna zachová až po `settings save`.

---

## Opětovné odeslání a stažení historie {#replaying--retrieving-history}

Data uložená v bufferu historie lze získat dvěma způsoby:

- **Přes rádio (opětovné odeslání na dálku):** Backend odešle v downlinku příkaz `req_history` na **fPort 85**. Zařízení STICKER pak pošle odpovídající rámce historie zpět jako uplinky `history_frame` na fPort 85 (viz [**Příkazy přes downlink**](../connectivity/downlink-commands.md)). Funguje to přes LoRaWAN i P2P.
- **Přes šifrované NFC (lokální stažení):** Aplikace **HARDWARIO Manager** čte buffer stránku po stránce v šifrované relaci NFC (`req_history_page`), takže data stáhnete celá offline a nespotřebujete vysílací čas rádia.

Každý rámec historie nese vlastní příznak `time_synced`: záznamy pořízené před nastavením hodin reálného času nemají skutečný čas a jsou označené jako nesynchronizované.

---

## Úložiště a kapacita kruhového bufferu {#storage--ring-buffer-capacity}

Záznamy historie se ukládají do vyhrazeného **kruhového oddílu flash paměti o velikosti 32 KB**, přísně odděleného od systémové konfigurace a přístupových údajů k rádiové síti. Buffer tvoří 16 stránek po 2 KB; každá stránka začíná 40bajtovou hlavičkou a pojme **1 757 B** záznamů.

Místo v paměti závisí na velikosti vybraných kanálů:
- Stavové kanály, příznaky pohybu, vlhkost a orientace: po 1 bajtu
- Teploty, tlak, osvětlenost, napětí, nadmořská výška, magnetické pole a zrychlení: po 2 bajtech
- Čítače (Hallovy spínače, vstupy, počty pohybů z PIR a akcelerometru): po 4 bajtech

**Odhad kapacity:**
Ve výchozí konfiguraci (teplota + vlhkost, 3 B na záznam) pojme stránka 585 záznamů a buffer o velikosti 32 KB **9 360 záznamů**, což při výchozím intervalu hlášení 15 minut odpovídá zhruba **97 dnům záznamu offline**. Pro jiné kanály a intervaly použijte stránku [**Kalkulačka historie senzorů**](sensor-history-calculator.mdx).

:::caution Kdy historie začíná znovu
- **Přechod z v1.4.x:** firmware v2.0.0 stránky historie z v1.4.x nenačte, takže je buffer po aktualizaci **prázdný**. Co potřebujete, si stáhněte před aktualizací. Návrat z v2.0.0 na starší verzi není podporovaný.
- **Změna rozvržení záznamu nebo intervalu:** změna `history-channels`, typu senzoru ve slotu 1-Wire, schopnosti, kterou používá zaznamenávaný kanál, nebo `interval-report` spustí buffer znovu od začátku.
- **Resety:** `settings factory-reset` a `settings vendor-reset` historii smažou; `settings device-reset` ji zachová (viz [**Údržba**](maintenance.md)).
- **Sestavení debug** drží historii v malém bufferu v RAM (992 B), který se při každém startu vyprázdní. Do flash paměti zaznamenává jen image release.
:::
