---
title: Teplotní senzory
sidebar_position: 1
description: "GLIDER podporuje až 8 digitálních teploměrů DS18B20 připojených přes sběrnici 1-Wire. Senzory se připojují k jednomu ze dvou portů 1-Wire na svorkovnici zařízení GLIDER (W1 nebo W2)."
---
import Image from '@theme/IdealImage';

# Externí teplotní senzory (1-Wire / DS18B20) {#external-temperature-sensors-1-wire--ds18b20}

GLIDER podporuje až **8 digitálních teploměrů DS18B20** připojených přes sběrnici **1-Wire**. Senzory se připojují k jednomu ze dvou portů 1-Wire na svorkovnici zařízení GLIDER (**W1** nebo **W2**).

Tato stránka vysvětluje, jak sondy zapojit, jak je vyhledat a jak odečítat teploty.

:::tip
Konfiguraci alarmů svázaných s těmito senzory najdete v části [**Konfigurace → Alarmy**](../configuration.md#alarms).
:::

## Hardware {#hardware}

GLIDER vyvádí sběrnici 1-Wire přes dva fyzické porty, které jsou elektricky rovnocenné a sdílejí stejný interní 1-Wire master Maxim DS2484:

| Port | Napájení | Data | Zem |
| :--- | :--- | :--- | :--- |
| **W1** | `W1V` | `W1D` | `W1G` |
| **W2** | `W2V` | `W2D` | `W2G` |

Standardní kabelové sestavy HARDWARIO DS18B20 mají tři vodiče:

| Barva vodiče | Funkce | Připojit k |
| :--- | :--- | :--- |
| 🔴 **Červený** | VCC (napájení) | `W1V` nebo `W2V` |
| 🟡 **Žlutý** | Data | `W1D` nebo `W2D` |
| ⚫ **Černý** | GND | `W1G` nebo `W2G` |

:::tip
Oba porty sdílejí uvnitř zařízení GLIDER stejnou logickou sběrnici 1-Wire. Osm logických „slotů“, které firmware sleduje, je nezávislých na tom, do kterého fyzického portu je sonda zapojena – vazba se dělá podle kódu ROM, ne podle portu.
:::

## Krok 1 – Zapojení sond {#step-1---wire-the-probes}

1. Před zapojováním zařízení GLIDER **vypněte**.
2. Odizolujte tři vodiče každého kabelu DS18B20 a připojte je k `W1` nebo `W2` podle tabulky výše.
3. Zařízení znovu zapněte.

Sondy můžete libovolně kombinovat mezi `W1` a `W2` – oba porty obsluhují stejnou sběrnici. Osm slotů je definováno softwarově a váže se na **sériové číslo ROM** každého DS18B20.

## Krok 2 – Vyhledání sběrnice {#step-2---scan-the-bus}

Po zapnutí zařízení požádejte firmware, aby vyhledal připojené senzory.

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

Poznámka `<- NEW` označuje kód ROM, který firmware dosud neviděl. Stiskněte **`y`** + **Enter**, čímž se nové senzory přiřadí k navrženým slotům a zařízení se restartuje.

Pro přeskočení potvrzovacího kroku (užitečné pro skripty nebo výrobní zprovoznění):

```text
therm scan --save
```

Tím se vazba uloží a zařízení se restartuje v jednom kroku.

Pokud chcete zároveň **smazat** sloty, jejichž kódy ROM už na sběrnici nejsou:

```text
therm scan --clear-missing
```

## Krok 3 – Odečtení teploty {#step-3---read-a-temperature}

Když je senzor přiřazen ke slotu, odečtěte jeho teplotu příkazem:

```text
therm read 1
```

(místo `1` zadejte číslo slotu 1–8). Pro odečtení všech obsazených slotů najednou:

```text
therm readall
```

Ukázkový výstup:

```text
Slot 1: 23.50 °C
Slot 2: 24.62 °C
```

Teplota se hlásí ve **°C s rozlišením 0.01 °C**. Neúspěšné odečty (odpojená sonda, chyba CRC, …) vracejí `NaN` a do cloudového payloadu se posílají jako `null`.

## Krok 4 – Kontrola stavu slotů {#step-4---inspect-slot-state}

```text
therm state
```

Zobrazí aktuální vazby slotů, poslední naměřenou teplotu a počítadla odečtů a chyb.

## Ruční přiřazení senzoru ke slotu {#manually-binding-a-sensor-to-a-slot}

Pokud znáte kód ROM sondy (například z etikety), můžete ji přiřadit přímo bez vyhledávání:

```text
therm config 1 28ff12b05316031d
```

…a poté uložit:

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

Prázdné sloty jsou z payloadu **vynechány** (neobjeví se jako `null`). Neúspěšný odečet se posílá jako `temperature: null`.

Kompletní schéma najdete v části [**Payload CBOR**](../payload.md).

## Kombinace s alarmy {#combining-with-alarms}

Každý slot teploměru lze svázat s jedním nebo více **pravidly alarmu**, která se aktivují, když teplota překročí nastavitelnou mez:

```text
alarm config 1-enabled true
alarm config 1-therm 1 # watch slot 1
alarm config 1-threshold 30 # trigger at 30 °C
alarm config 1-hysteresis 5 # release at 30 − 5 = 25 °C
AT&W
```

Kompletní přehled alarmů najdete v části [**Konfigurace**](../configuration.md) a na stránce [**Příkazy shellu**](../commands/shell-commands.md).
