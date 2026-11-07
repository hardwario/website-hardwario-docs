---
slug: carlo-gavazzi-em1xx-series
title: Carlo Gavazzi řady EM1XX
---

import Image from '@theme/IdealImage';

[Webové stránky](https://www.gavazziautomation.com/en-global/product/EM111DINAV81XS1X)

![Analyzátor energie Carlo Gavazzi EM111](../../../../../../chester/supported-devices/modbus/images/carlo-gavazzi-em111.png)

### Popis {#description}

Řada EM1xx zahrnuje kompaktní a snadno ovladatelné analyzátory energie pro **jednofázové soustavy**. Hodí se k měření činné energie a k rozúčtování nákladů v bytech, komerčních objektech a lehkém průmyslu. Díky přímému nebo nepřímému měření proudu a podpoře dvou tarifů je řada EM1xx flexibilní, přesná a snadno se integruje.

:::info

Model **EM111DINAV81XS1X** popsaný na této stránce se zapojuje přímo, do 45 A, a k měření proudu **nepotřebuje** žádný **externí senzor**. Model EM111DINAV51XS1X je jiný: proud měří přes proudový transformátor se sekundárním proudem 5 A.

:::

 ---

### Silové zapojení {#power-installation}

#### Příklad zapojení: analyzátor energie Carlo Gavazzi EM111 {#example-of-installation-carlo-gavazzi-energy-analyzer-em111}

| **Analyzátor energie Carlo Gavazzi EM111** | |
|----------------------------------------|-----------------------------------------------|
| Pin 1                                 | **L (IN)**                                         |
| Pin 2                                 | **L (OUT)**                                         |
| Pin N (vlevo)                                | **N (IN)**                                         |
| Pin N (vpravo)                                | **N (OUT)**                                         |

#### Schéma zapojení (EM111) {#connection-diagram-em111}

![Schéma jednofázového zapojení EM111: L1 a N přes svorky 1, 2 a N](../../../../../../chester/supported-devices/modbus/images/carlo-gavazzi-em111-power.png)

---

### Komunikace Modbus {#modbus-communication}

#### Příklad zapojení komunikace Modbus: analyzátor energie Carlo Gavazzi EM111 {#example-of-modbus-communication-installation-carlo-gavazzi-energy-analyzer-em111}

| **Analyzátor energie Carlo Gavazzi EM111** | **CHESTER Modbus** |
|---------------------------|--------------------|
| Pin 8                     | Pin 6 (A−)      |
| Pin 6                     | Pin 7 (B+)        |
| Pin 7                    | Pin 1 (GND)        |

#### Komunikace Modbus (EM111) {#modbus-communication-em111}

![Schéma sběrnice RS-485 spojující svorky EM111 A- 8, B+ 6, GND 7 s masterem Modbus a PC](../../../../../../chester/supported-devices/modbus/images/carlo-gavazzi-em111-modbus.png)

---

### Ovládací tlačítka {#browsing-and-configuration-buttons}

* `◄` **Levé tlačítko**
    1. Pohyb v menu
    2. Snížení hodnoty
    3. Podržením vyberete položku nebo do ní vstoupíte

* `►` **Pravé tlačítko**
    1. Pohyb v menu
    2. Zvýšení hodnoty
---

### Konfigurace komunikace Modbus v analyzátoru energie {#modbus-communication-configuration-for-energy-analyzer}

1. Podržte tlačítko `◄` **(levé)** 1,5 sekundy.  
2. Na displeji se zobrazí `PASS`.  
3. Dalším stiskem tlačítka `◄` **(levé)** začnete zadávat heslo.  
4. Tlačítky `►` **(pravé)** a `◄` **(levé)** vybírejte číslice.  
5. Každou číslici potvrďte podržením tlačítka `◄` **(levé)** po dobu 1,5 sekundy; tím se přesunete na další.  
6. Výchozí heslo je `0000`.  
7. Po zadání hesla displej zobrazí `N PASS` a vyzve k zadání nového hesla (pokud ho chcete změnit).  
8. V menu se pohybujete tlačítky `►` **(pravé)** a `◄` **(levé)**.  
9. Hodnotu upravíte tak, že na požadované položce podržíte tlačítko `◄` **(levé)** alespoň 1,5 sekundy.  
10. Upravenou hodnotu potvrďte dalším dlouhým stiskem tlačítka `◄` **(levé)**.  
11. Po dokončení všech nastavení přejděte v menu na položku `END` a podržením tlačítka `◄` **(levé)** menu opusťte.  

:::info
Pokud elektroměr na dlouhý stisk nereaguje, tiskněte tlačítko `◄` **(levé)** blíže ke středu displeje.
:::


#### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Adresa | Přenosová rychlost | Parita | Stop bit |
|---------|-----------|--------|-----------|
| 1       | 9.6k      | Žádná   | 1         |

---

### Konfigurace komunikace Modbus v zařízení CHESTER {#modbus-communication-configuration-for-chester}

Parametry komunikace nastavíte v terminálu CHESTER těmito příkazy:


```
app config serial-mode modbus
app config serial-baudrate 9600
app config serial-parity none
app config serial-stop-bits 1
app config device-0 "em1xx,1"
config save
```

Příkazy platí pro variantu RS-485 firmwaru [**CHESTER Serial**](../../firmware/chester-serial/index.md). `device-0` je první slot pro zařízení; `em1xx,1` je typ zařízení a adresa Modbus elektroměru. Nastavení sériové linky musí odpovídat elektroměru. Příkaz `config save` konfiguraci uloží a zařízení restartuje. Podrobnosti najdete v části [**Sloty zařízení**](../../firmware/chester-serial/index.md#device-slots).

---

### Měřené hodnoty {#measured-values}

V každém hlášení je elektroměr jednou položkou seznamu `devices` s hodnotou `type_name` `em1xx`. Každý vzorek odebraný od předchozího hlášení je jednou položkou jeho seznamu `data` s těmito klíči:

| Měřená hodnota | Klíč |
| :--- | :--- |
| Napětí | `devices[].data[].voltage` |
| Proud | `devices[].data[].current` |
| Činný výkon | `devices[].data[].power` |
| Zdánlivý výkon | `devices[].data[].power_apparent` |
| Jalový výkon | `devices[].data[].power_reactive` |
| Účiník | `devices[].data[].power_factor` |
| Frekvence | `devices[].data[].frequency` |
| Odebraná činná energie | `devices[].data[].energy_in` |
| Dodaná činná energie | `devices[].data[].energy_out` |

Jednotky, rozsahy a rozlišení všech klíčů uvádí katalogová stránka [**CHESTER Serial**](../../catalog-applications/chester-serial/index.md#carlo-gavazzi-em1xx).


---
