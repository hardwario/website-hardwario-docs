---
slug: history-and-counters
title: Historie a čítače
description: Jak zařízení STICKER ukládá historii senzorů a čítače, na kolik dní historie stačí, jak data vyčtete a co se zachová po restartu nebo resetu.
---

# Historie a čítače {#history-and-counters}

Tato stránka popisuje, jak zařízení STICKER ukládá historii senzorů a čítače, jak je vyčtete a co se z nich zachová po restartu nebo resetu.

## Historie senzorů {#sensor-history}

Historie senzorů uchovává naměřené hodnoty přímo v zařízení, takže po výpadku rádiového spojení můžete chybějící data doplnit.

- **Jeden záznam na každé hlášení:** zařízení uloží jeden záznam v každém intervalu hlášení (`interval-report`, výchozí 15 min), a to i bez připojení k síti.
- **Ve výchozím nastavení vypnutá:** zapněte ukládání historie (`history-enable`) a nastavení uložte, například v aplikaci HARDWARIO Manager v části **Configuration → History**.
- **Kanály si vyberete sami** (`history-channels`): až 24 hodnot, včetně sond 1-Wire, čítačů a napětí na vstupech. Ve výchozím nastavení se ukládají teplota a vlhkost z vestavěného senzoru.
- **Jen naměřené hodnoty:** alarmy ani změny nastavení se do historie neukládají. Chybějící hodnota, například z odpojené sondy, se v historii objeví jako `null`.

## Na kolik dní historie stačí {#how-long-the-history-lasts}

| Ukládané kanály | Počet dní při intervalu hlášení 15 min |
|---|---|
| Jen teplota | 146 |
| Teplota a vlhkost (výchozí) | 97,5 |
| Výchozí kanály a jedna sonda DS18B20 | 58,5 |

Při intervalu hlášení 5 min stačí historie na třetinu této doby. Když se paměť zaplní, zařízení smaže nejstarší šestnáctinu historie a ukládá dál. Počítejte proto s dobou asi o 6 % kratší. Pro jakýkoli jiný výběr kanálů dobu spočítá [**Kalkulačka historie senzorů**](../developer-access/sensor-history-calculator.mdx).

Restart, výměna baterií ani výpadek sítě historii nesmažou. Při každém restartu nebo ztrátě napájení se ale ztratí nejvýš asi 2 poslední záznamy.

Zařízení smaže celou historii, když:

- změníte interval hlášení nebo kanály historie;
- zapnete nebo vypnete senzor, jehož hodnoty historie ukládá;
- změníte typ sondy ve slotu 1-Wire, jehož hodnoty historie ukládá;
- obnovíte tovární nastavení.

:::tip
Než tato nastavení změníte nebo zařízení resetujete, historii si vyčtěte.
:::

## Vyčtení historie {#reading-the-history}

Zařízení historii nikdy neposílá samo. Vyčtete ji přes rádio nebo přes NFC.

**Přes rádio** pošle backend příkaz `req_history` jako downlink (zprávu ze sítě do zařízení), případně jen pro zvolené časové okno. Zařízení odpoví sérií uplinků (zpráv ze zařízení do sítě).

- Vyžádejte si jen časové okno, které potřebujete. Při nízké přenosové rychlosti v síti LoRaWAN může dlouhé vyčítání trvat i mnoho hodin.
- Po restartu počkejte s požadavkem aspoň jeden interval hlášení, jinak se může ztratit první nový záznam.
- Najednou může běžet jen jedno vyčítání. Když se spojení přeruší, pošlete požadavek znovu.
- Telemetrie (pravidelná hlášení s naměřenými hodnotami) čeká, dokud vyčítání neskončí. Alarmové reporty nečekají.

**Přes NFC** historii vyčtete v aplikaci HARDWARIO Manager v části **Tools → Sensor history**, a to i s vypnutým rádiem. Podrobnosti najdete na stránce [**Historie senzorů**](/apps/hardwario-manager/sticker/sensor-history) v průvodci aplikací HARDWARIO Manager.

<details>
<summary><b>Příklady downlinků</b></summary>

Downlinky posílejte na fPort 85, port LoRaWAN, který zařízení STICKER používá pro příkazy. Číslo `seq` si zvolíte sami a zařízení ho zopakuje v odpovědi.

| Hex | Co dělá |
|---|---|
| `08015a00` | Vyčte celou historii (`seq` 1) |
| `08025a0c0880cae2d0061090e6e2d006` | Vyčte jednu hodinu od 2026-05-28 20:26:40 UTC (`seq` 2) |
| `08051206120220011801` | Zapne ukládání historie a uloží nastavení, zařízení se restartuje (`seq` 5) |
| `080752021801` | Vynuluje čítač vstupu A (`seq` 7) |

Chyba `HISTORY_UNAVAILABLE` (4) znamená, že požadavku neodpovídá žádný záznam. `BUDGET_TOO_SMALL` (9) znamená, že je přenosová rychlost příliš nízká. Požadavek pošlete znovu, až bude vyšší. Jiné požadavky sestaví [**Generátor příkazů přes downlink**](../connectivity/downlink-commands-generator.mdx).

</details>

## Čítače {#counters}

Zařízení STICKER počítá sepnutí svých Hallových spínačů a vstupů. Vstup umí počítat i impulzy z měřiče, viz [**Rozhraní S0 (impulzní výstup)**](../sticker-input-wiring/s0-interface.md).

- **Čítače Hallových spínačů a vstupů** se ukládají s každým hlášením a vydrží restart i výměnu baterií. Při restartu se ztratí jen impulzy napočítané od posledního uložení, ve výchozím nastavení nejvýš za jeden interval hlášení.
- **Počty pohybů ze senzoru PIR a z akcelerometru** se neukládají a po každém restartu začínají od nuly.
- **Přetečení:** po hodnotě 4 294 967 295 začne čítač znovu od 0. Backend, který počítá spotřebu z rozdílů, musí zvládnout přetečení i reset čítačů.

Čítače Hallových spínačů a vstupů vynulujete v aplikaci HARDWARIO Manager volbou **Tools → Reset → Reset counters** nebo příkazem `reset_counters`. Reset čítačů platí hned, bez restartu.

## Co se kdy zachová {#what-survives-what}

| Data | Restart | Výměna baterií | Reset zařízení | Obnovení továrního nastavení |
|---|---|---|---|---|
| Uložené nastavení | Zachováno | Zachováno | Výchozí hodnoty | Výchozí hodnoty |
| Čítače Hallových spínačů a vstupů | Zachováno | Zachováno | Zachováno | Vynulováno |
| Historie senzorů | Zachováno | Zachováno | Zachováno | Smazáno |
| Uložená pravidla alarmů | Zachováno | Zachováno | Smazáno | Smazáno |

- Změny nastavení a pravidel alarmů, které jste neuložili, se při každém restartu ztratí.
- Reset zařízení zachová nastavení LoRaWAN, ale vypne historii, Hallovy spínače a vstupy, dokud je znovu nenastavíte. Historii zaznamenanou s jinými než výchozími kanály už po resetu zařízení nelze vyčíst.
- Obnovení továrního nastavení zachová jen identitu zařízení, DevEUI a JoinEUI.

Co který reset dělá, popisuje stránka [**Reset zařízení**](/apps/hardwario-manager/sticker/reset) v průvodci aplikací HARDWARIO Manager.
