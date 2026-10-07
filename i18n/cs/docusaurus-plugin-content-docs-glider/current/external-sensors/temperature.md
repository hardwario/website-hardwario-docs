---
title: Teplotní senzory
sidebar_position: 1
---
import Image from '@theme/IdealImage';

# Externí teplotní senzory (1-Wire / DS18B20) {#external-temperature-sensors-1-wire--ds18b20}

GLIDER podporuje až **8 digitálních teploměrů DS18B20** připojených přes sběrnici **1-Wire**. Senzory se připojují k jednomu ze dvou portů 1-Wire na svorkovnici zařízení GLIDER (**W1** nebo **W2**).

Tato stránka popisuje, jak sondy zapojit, vyhledat a jak z nich číst teplotu.

:::tip
Konfiguraci alarmů svázaných s těmito senzory najdete v části [**Konfigurace → Alarmy**](../configuration.md#alarms).
:::

## Hardware {#hardware}

GLIDER vyvádí sběrnici 1-Wire na dva fyzické porty. Oba jsou elektricky rovnocenné a obsluhuje je stejný interní master 1-Wire Maxim DS2484:

| Port | Napájení | Data | Zem |
| :--- | :--- | :--- | :--- |
| **W1** | `W1V` | `W1D` | `W1G` |
| **W2** | `W2V` | `W2D` | `W2G` |

Standardní kabelové sondy DS18B20 od HARDWARIO mají tři vodiče:

| Barva vodiče | Funkce | Připojit k |
| :--- | :--- | :--- |
| 🔴 **Červený** | VCC (napájení) | `W1V` nebo `W2V` |
| 🟡 **Žlutý** | Data | `W1D` nebo `W2D` |
| ⚫ **Černý** | GND | `W1G` nebo `W2G` |

:::tip
Oba porty sdílejí uvnitř zařízení GLIDER stejnou logickou sběrnici 1-Wire. Osm logických „slotů“, které firmware spravuje, nezávisí na tom, do kterého fyzického portu sondu zapojíte. Sondy se ke slotům přiřazují podle kódu ROM, ne podle portu.
:::

## Krok 1 – Zapojení sond {#step-1---wire-the-probes}

1. Před zapojováním zařízení GLIDER **vypněte**.
2. Odizolujte tři vodiče každého kabelu DS18B20 a připojte je k `W1` nebo `W2` podle tabulky výše.
3. Zařízení znovu zapněte.

Sondy můžete mezi `W1` a `W2` libovolně rozdělit, protože oba porty obsluhují stejnou sběrnici. Osm slotů je čistě softwarových a každý se váže na **sériové číslo ROM** jednoho senzoru DS18B20.

## Krok 2 – Prohledání sběrnice {#step-2---scan-the-bus}

Po zapnutí nechte firmware vyhledat připojené senzory.

#### Přes konzoli RTT {#via-rtt-console}

```text
therm scan
```

#### Přes konzoli AT {#via-at-console}

```text
AT$SHELL="therm scan"
```

Ukázkový výstup:

```text
Found 1 sensor(s):
 [1] 28ff12b05316031d <- NEW
 Slot 2: (empty)
 Slot 3: (empty)
 Slot 4: (empty)
 Slot 5: (empty)
 Slot 6: (empty)
 Slot 7: (empty)
 Slot 8: (empty)

Save changes? [y/N]
```

Značka `<- NEW` označuje kód ROM, který firmware dosud neviděl. Stiskem **`y`** + **Enter** nové senzory přiřadíte k navrženým slotům a zařízení se restartuje.

Potvrzení můžete přeskočit (hodí se pro skripty nebo zprovoznění ve výrobě):

```text
therm scan --save
```

Příkaz senzory přiřadí a zařízení restartuje v jednom kroku.

Pokud chcete zároveň **smazat** sloty, jejichž kódy ROM už na sběrnici nejsou:

```text
therm scan --clear-missing
```

## Krok 3 – Čtení teploty {#step-3---read-a-temperature}

Teplotu senzoru přiřazeného ke slotu přečtete příkazem:

```text
therm read 1
```

(místo `1` zadejte číslo slotu 1–8). Všechny obsazené sloty najednou přečtete příkazem:

```text
therm readall
```

Ukázkový výstup:

```text
Slot 1: 23.50 °C
Slot 2: 24.62 °C
```

Teplota se udává ve **°C s rozlišením 0,01 °C**. Neúspěšné čtení (odpojená sonda, chyba CRC, …) vrátí `NaN` a do payloadu pro cloud se odešle jako `null`.

## Krok 4 – Kontrola stavu slotů {#step-4---inspect-slot-state}

```text
therm state
```

Zobrazí aktuální přiřazení slotů, poslední naměřenou teplotu a čítače čtení a chyb.

## Ruční přiřazení senzoru ke slotu {#manually-binding-a-sensor-to-a-slot}

Pokud znáte kód ROM sondy (například ze štítku), můžete ji přiřadit přímo bez vyhledávání:

```text
therm config 1 28ff12b05316031d
```

…a pak konfiguraci uložit:

```text
AT&W
```

## Jak se teploty zobrazují v cloudu {#how-temperatures-appear-in-the-cloud}

Každý obsazený slot je součástí pole **`thermometers`** v payloadu CBOR:

```yaml
thermometers:
 - slot: 1
 temperature: 23.50
 - slot: 2
 temperature: 24.62
```

Prázdné sloty se do payloadu **nezahrnují** (neobjeví se ani jako `null`). Neúspěšné čtení se odešle jako `temperature: null`.

Úplné schéma najdete na stránce [**CBOR payload**](../payload.md).

## Kombinace s alarmy {#combining-with-alarms}

Každý slot teploměru lze svázat s jedním nebo více **pravidly alarmu**, která se aktivují, když teplota překročí nastavitelnou prahovou hodnotu:

```text
alarm config 1-enabled true
alarm config 1-therm 1 # watch slot 1
alarm config 1-threshold 30 # trigger at 30 °C
alarm config 1-hysteresis 5 # release at 30 − 5 = 25 °C
AT&W
```

Úplný popis alarmů najdete na stránkách [**Konfigurace**](../configuration.md) a [**Příkazy shellu**](../commands/shell-commands.md).
