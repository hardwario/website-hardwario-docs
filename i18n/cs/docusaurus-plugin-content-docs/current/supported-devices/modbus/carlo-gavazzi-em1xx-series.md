---
slug: carlo-gavazzi-em1xx-series
title: Carlo Gavazzi řady EM1XX
---

import Image from '@theme/IdealImage';

[Webové stránky](https://www.gavazziautomation.com/en-global/product/EM111DINAV51XS1X)

![Analyzátor energie Carlo Gavazzi EM111](../../../../../../chester/supported-devices/modbus/images/carlo-gavazzi-em111.png)

### Popis {#description}

Řada EM1xx zahrnuje kompaktní a snadno ovladatelné analyzátory energie pro **jednofázové soustavy**. Hodí se k měření činné energie a k rozúčtování nákladů v bytech, komerčních objektech a lehkém průmyslu. Díky přímému nebo nepřímému měření proudu a podpoře dvou tarifů je řada EM1xx flexibilní, přesná a snadno se integruje.

:::info

Tento elektroměr **nepotřebuje** k měření proudu žádný **externí senzor**. Proud měří sám, vodiče se do něj zapojují přímo.

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
app config modbus-baud "9600"
app config modbus-addr "1"
app config modbus-parity "none"
app config modbus-stop-bits "1"
app config em-type "g1"
config save
```

---

### Měřené hodnoty {#measured-values}

| Měřená hodnota | Klíč / cesta                                   |
|----------------|----------------------------------------------|
| Proud        | E_ENERGY_METER.METER_1.CURRENT.MEASUREMENTS  |
| Napětí        | E_ENERGY_METER.METER_1.VOLTAGE.MEASUREMENTS  |
| Výkon          | E_ENERGY_METER.METER_1.POWER.MEASUREMENTS    |
| Frekvence      | E_ENERGY_METER.METER_1.FREQUENCY.MEASUREMENTS|
| Odebraná energie       | E_ENERGY_METER.METER_1.ENERGY_IN.MEASUREMENTS|
| Dodaná energie         | E_ENERGY_METER.METER_1.ENERGY_OUT.MEASUREMENTS|

---
