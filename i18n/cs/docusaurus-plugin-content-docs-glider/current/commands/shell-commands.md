---
title: Příkazy shellu
sidebar_position: 2
title_meta: "Příkazy shellu (GLIDER)"
---
import Image from '@theme/IdealImage';

# Přehled příkazů shellu {#shell-commands-reference}

Ve firmwaru zařízení GLIDER běží plnohodnotný **shell Zephyr** s aplikačními příkazy pro všechny subsystémy. Shell je dostupný:

- přímo v [**konzoli RTT**](../console/rtt-jlink.md), nebo
- v [**konzoli AT**](../console/usb-at.md) přes `AT$SHELL="<command>"`.

:::tip
Odpovídající příkazy AT, dostupné přes USB-C, najdete na stránce [**Příkazy AT**](at-commands.md).
:::

Tato stránka uvádí jen příkazy specifické pro GLIDER; obecné příkazy systému Zephyr (`kernel`, `log`, `device`, …) neopakuje.

## Obecný podpříkaz `config` {#generic-config-sub-command}

Všechny konfigurovatelné moduly používají stejnou syntaxi `config`:

| Tvar | Význam |
| :--- | :--- |
| `<module> config show` | Vypíše všechny klíče modulu. |
| `<module> config show <key>` | Vypíše jeden klíč. |
| `<module> config <key> <value>` | Zapíše hodnotu. |

Změny pak uložte do flash paměti:

```text
AT&W
```

…nebo ekvivalentně ze shellu Zephyr restartujte zařízení příkazem `kernel reboot cold`. Hodnoty zapsané přes `<module> config` se při spuštění `&W` uloží automaticky.

## `app` – příkazy pro celou aplikaci {#app---application-wide-commands}

| Příkaz | Popis |
| :--- | :--- |
| `app config …` | Konfigurace globálních parametrů aplikace (intervaly vzorkování / odesílání, watchdog downlinku). |
| `app sample` | Vynutí jeden kompletní měřicí cyklus (čtení všech senzorů + vyhodnocení alarmů). |
| `app send` | Vynutí okamžité zakódování do CBOR + uplink. |

Konfigurovatelné klíče viz [**Konfigurace → `app`**](../configuration.md#global-app-settings).

## `inputs` – digitální vstupy {#inputs---digital-inputs}

| Příkaz | Popis |
| :--- | :--- |
| `inputs config …` | Konfigurace kanálů CH1 / CH2 (režim, ošetření zákmitů, ochranná doba, volba hrany). |
| `inputs show` | Vypíše aktuální čítače a poslední události pro oba kanály. |
| `inputs clear` | Vymaže buffer událostí obou kanálů. |

Konfigurovatelné klíče viz [**Konfigurace → Digitální vstupy**](../configuration.md#digital-inputs).

## `therm` – teploměry DS18B20 (1-Wire) {#therm---ds18b20-thermometers-1-wire}

| Příkaz | Popis |
| :--- | :--- |
| `therm config …` | Přiřazení / zobrazení kódů ROM pro 8 slotů. |
| `therm read <1-8>` | Přečte jeden slot. |
| `therm readall` | Přečte všechny obsazené sloty. |
| `therm scan` | Vyhledá senzory na sběrnici 1-Wire a navrhne změny (vyžádá si potvrzení). |
| `therm scan --save` | Vyhledá a automaticky uloží (bez dotazu). |
| `therm scan --clear-missing` | Jako `scan`, ale navíc vymaže sloty, jejichž kódy ROM už na sběrnici nejsou. |
| `therm state` | Aktuální přiřazení slotů + poslední teplota + čítače čtení/chyb. |

Postup krok za krokem popisuje stránka [**Externí teplotní senzory**](../external-sensors/temperature.md).

## `alarm` – teplotní alarmy {#alarm---temperature-alarms}

| Příkaz | Popis |
| :--- | :--- |
| `alarm config …` | Konfigurace až 32 pravidel alarmů (zapnutí, slot teploměru, prahová hodnota, hystereze). |
| `alarm evaluate` | Okamžitě vyhodnotí všechna pravidla. |
| `alarm state` | Zobrazí aktuální stav (aktivní / neaktivní) každého zapnutého pravidla. |

Konfigurovatelné klíče viz [**Konfigurace → Alarmy**](../configuration.md#alarms).

#### Příklad – alarm při vysoké teplotě na slotu 1 {#example---set-up-a-high-temperature-alarm-on-slot-1}

```text
alarm config 1-enabled true
alarm config 1-therm 1
alarm config 1-threshold 30
alarm config 1-hysteresis 5
AT&W
```

Alarm se aktivuje při teplotě **≥ 30 °C** a deaktivuje při **≤ 25 °C** (30 − 5).

## `modbus` – klient RS-485 Modbus RTU {#modbus---rs-485-modbus-rtu-client}

| Příkaz | Popis |
| :--- | :--- |
| `modbus enable` | Zapne napájení izolovaného budiče RS-485 (`RS_ON` v log. 1). |
| `modbus disable` | Odpojí napájení RS-485. |
| `modbus read <addr> <start> [count]` | Přečte vstupní registry (funkční kód Modbus 04). Výchozí hodnota `count` je 1, maximum 32. |

Linka má pevně nastavenou rychlost **19 200 baud, 8E1** (režim RTU), časový limit odpovědi je **500 ms**.

#### Příklad – načtení 4 vstupních registrů od adresy 0 ze zařízení 1 {#example---read-4-input-registers-starting-at-address-0-from-slave-1}

```text
modbus enable
modbus read 1 0 4
modbus disable
```

## `led` – stavové LED {#led---status-leds}

GLIDER má na desce tři signalizační LED: červenou (**r**), zelenou (**g**) a žlutou (**y**).

| Příkaz | Popis |
| :--- | :--- |
| `led on <r\|g\|y\|rg\|ry\|gy\|rgy>` | Rozsvítí jednu LED nebo libovolnou kombinaci. |
| `led off <r\|g\|y\|rg\|ry\|gy\|rgy>` | Zhasne jednu nebo více LED. |
| `led test` | Postupně blikne každou LED (kontrola funkce). |

Za běžného provozu firmware používá LED takto:

- Každých **5 sekund** se na **30 ms** krátce rozsvítí zelená LED, když není aktivní žádný alarm, nebo červená, když je aktivní alespoň jedno pravidlo alarmu. Záblesk je tak krátký, že ho na ostrém světle snadno přehlédnete.
- Když firmware rozpozná stisk tlačítka, **žlutá LED** blikne jednou za každý zaznamenaný stisk (50 ms svítí, 200 ms nesvítí). Ještě před spuštěním odpovídající akce tak vidíte, kolik stisků zařízení zaregistrovalo.

LED **nesignalizují** připojení k mobilní síti ani ke cloudu.
