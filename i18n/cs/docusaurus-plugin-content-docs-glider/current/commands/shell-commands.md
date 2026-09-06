---
title: Příkazy shellu
sidebar_position: 2
description: "GLIDER provozuje plnohodnotný Zephyr shell, který zpřístupňuje příkazy na úrovni aplikace pro každý subsystém. Shell je dostupný přes:"
title_meta: "Příkazy shellu (GLIDER)"
---
import Image from '@theme/IdealImage';

# Přehled příkazů shellu {#shell-commands-reference}

GLIDER provozuje plnohodnotný **Zephyr shell**, který zpřístupňuje příkazy na úrovni aplikace pro každý subsystém. Shell je dostupný přes:

- [**RTT konzoli**](../console/rtt-jlink.md) přímo, nebo
- [**AT konzoli**](../console/usb-at.md) pomocí `AT$SHELL="<command>"`.

:::tip
Ekvivalentní AT příkazy dostupné přes USB-C najdete na stránce [**AT příkazy**](at-commands.md).
:::

Tato stránka uvádí příkazy specifické pro GLIDER. Obecné příkazy Zephyru (`kernel`, `log`, `device`, …) zde nejsou znovu uváděny.

## Obecný pod-příkaz `config` {#generic-config-sub-command}

Každý modul, který zpřístupňuje konfiguraci, používá stejnou syntaxi `config`:

| Tvar | Význam |
| :--- | :--- |
| `<module> config show` | Vypíše všechny klíče modulu. |
| `<module> config show <key>` | Vypíše jeden klíč. |
| `<module> config <key> <value>` | Zapíše hodnotu. |

Po provedení změn je uložte do flash paměti:

```text
AT&W
```

…nebo, ekvivalentně, ze Zephyr shellu restartujte pomocí `kernel reboot cold` – hodnoty zapsané přes `<module> config` se při spuštění `&W` uloží automaticky.

## `app` – příkazy pro celou aplikaci {#app---application-wide-commands}

| Příkaz | Popis |
| :--- | :--- |
| `app config …` | Konfigurace globálních parametrů aplikace (intervaly měření / odesílání, downlink watchdog). |
| `app sample` | Vynutí jeden kompletní měřicí cyklus (načtení všech senzorů + vyhodnocení alarmů). |
| `app send` | Vynutí okamžité CBOR zakódování + uplink. |

Konfigurovatelné klíče viz [**Konfigurace → `app`**](../configuration.md#global-app-settings).

## `inputs` – digitální vstupy {#inputs---digital-inputs}

| Příkaz | Popis |
| :--- | :--- |
| `inputs config …` | Konfigurace kanálů CH1 / CH2 (režim, debounce, cooldown, volba hrany). |
| `inputs show` | Vypíše aktuální čítače a poslední události pro oba kanály. |
| `inputs clear` | Vymaže buffer událostí obou kanálů. |

Konfigurovatelné klíče viz [**Konfigurace → Digitální vstupy**](../configuration.md#digital-inputs).

## `therm` – teploměry DS18B20 (1-Wire) {#therm---ds18b20-thermometers-1-wire}

| Příkaz | Popis |
| :--- | :--- |
| `therm config …` | Přiřazení / zobrazení ROM kódů pro 8 slotů. |
| `therm read <1-8>` | Načte jeden slot. |
| `therm readall` | Načte všechny obsazené sloty. |
| `therm scan` | Vyhledá senzory na sběrnici 1-Wire a navrhne změny (vyžádá si potvrzení). |
| `therm scan --save` | Vyhledá a automaticky uloží (bez dotazu). |
| `therm scan --clear-missing` | Jako `scan`, ale navíc vymaže sloty, jejichž ROM kódy už na sběrnici nejsou. |
| `therm state` | Aktuální přiřazení slotů + poslední teplota + čítače čtení/chyb. |

Podrobný postup krok za krokem najdete v [**Externí teplotní senzory**](../external-sensors/temperature.md).

## `alarm` – teplotní alarmy {#alarm---temperature-alarms}

| Příkaz | Popis |
| :--- | :--- |
| `alarm config …` | Konfigurace až 32 pravidel alarmů (zapnutí, slot teploměru, prahová hodnota, hystereze). |
| `alarm evaluate` | Okamžitě vyhodnotí všechna pravidla. |
| `alarm state` | Zobrazí aktuální stav (aktivní / neaktivní) každého zapnutého pravidla. |

Konfigurovatelné klíče viz [**Konfigurace → Alarmy**](../configuration.md#alarms).

#### Příklad – nastavení alarmu na vysokou teplotu na slotu 1 {#example---set-up-a-high-temperature-alarm-on-slot-1}

```text
alarm config 1-enabled true
alarm config 1-therm 1
alarm config 1-threshold 30
alarm config 1-hysteresis 5
AT&W
```

Alarm se aktivuje při **≥ 30 °C** a deaktivuje při **≤ 25 °C** (30 − 5).

## `modbus` – klient RS-485 Modbus RTU {#modbus---rs-485-modbus-rtu-client}

| Příkaz | Popis |
| :--- | :--- |
| `modbus enable` | Zapne napájení izolovaného budiče RS-485 (`RS_ON` v úrovni high). |
| `modbus disable` | Odpojí napájení RS-485. |
| `modbus read <addr> <start> [count]` | Načte vstupní registry (Modbus funkční kód 04). `count` je výchozí 1, maximum 32. |

Rychlost linky je pevně nastavena na **19 200 baud, 8E1** (režim RTU) a timeout odpovědi je **500 ms**.

#### Příklad – načtení 4 vstupních registrů od adresy 0 ze zařízení 1 {#example---read-4-input-registers-starting-at-address-0-from-slave-1}

```text
modbus enable
modbus read 1 0 4
modbus disable
```

## `led` – stavové LED {#led---status-leds}

GLIDER má tři signalizační LED na desce: če**r**venou, ze**g**enou, **y** žlutou.

| Příkaz | Popis |
| :--- | :--- |
| `led on <r\|g\|y\|rg\|ry\|gy\|rgy>` | Rozsvítí jednu LED nebo libovolnou kombinaci. |
| `led off <r\|g\|y\|rg\|ry\|gy\|rgy>` | Zhasne jednu nebo více LED. |
| `led test` | Postupně rozbliká každou LED (kontrolní test). |

Za běžného provozu firmware používá LED takto:

- Každých **5 sekund** je vyslán krátký **30ms pulz**, zelený když není aktivní žádný alarm, a červený když je aktivní alespoň jedno pravidlo alarmu. Pulz je natolik krátký, že jej lze na ostrém světle snadno přehlédnout.
- Po rozpoznání kliknutí tlačítkem blikne **žlutá LED** jednou za každé detekované kliknutí (50 ms svítí, 200 ms zhasnuto) jako zpětná vazba o tom, kolik kliknutí bylo zaznamenáno, ještě než se spustí odpovídající akce.

LED **neindikují** připojení k mobilní síti ani konektivitu do cloudu.
