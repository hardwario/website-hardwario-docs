---
slug: carlo-gavazzi-em1xx-series
title: Carlo Gavazzi EM1XX Series
description: "Web-Site"
---

import Image from '@theme/IdealImage';

[Web-Site](https://www.gavazziautomation.com/en-global/product/EM111DINAV51XS1X)

![Carlo Gavazzi - EM111](../../../../../../chester/supported-devices/modbus/images/carlo-gavazzi-em111.png)

### Popis {#description}

Série EM1xx zahrnuje kompaktní a snadno použitelné analyzátory energie určené pro **jednofázové systémy**. Tato zařízení jsou ideální pro měření aktivní energie a rozúčtování nákladů v bytových, komerčních a lehkých průmyslových aplikacích. S možností přímého nebo nepřímého měření proudu a s podporou správy dvou tarifů nabízí série EM1xx flexibilitu, přesnost a snadnou integraci.

:::info

Tento elektroměr **nevyžaduje** pro měření proudu žádný **externí senzor**. Měření zvládá díky přímému připojení sám.

:::

 ---

### Instalace napájení {#power-installation}

#### Příklad instalace: analyzátor energie Carlo Gavazzi EM111 {#example-of-installation-carlo-gavazzi-energy-analyzer-em111}

| **Carlo Gavazzi Energy Analyzer - EM111** | |
|----------------------------------------|-----------------------------------------------|
| Pin 1                                 | **L (IN)**                                         |
| Pin 2                                 | **L (OUT)**                                         |
| Pin N (vlevo)                                | **N (IN)**                                         |
| Pin N (vpravo)                                | **N (OUT)**                                         |

#### Schéma zapojení (EM111) {#connection-diagram-em111}

![Schéma zapojení jednofázového připojení EM111 s L1 a N přes svorky 1, 2 a N](../../../../../../chester/supported-devices/modbus/images/carlo-gavazzi-em111-power.png)

---

### Komunikace Modbus {#modbus-communication}

#### Příklad instalace komunikace Modbus: analyzátor energie Carlo Gavazzi EM111 {#example-of-modbus-communication-installation-carlo-gavazzi-energy-analyzer-em111}

| **Carlo Gavazzi Energy Analyzer – EM111** | **CHESTER Modbus** |
|---------------------------|--------------------|
| Pin 8                     | Pin 6 (A−)      |
| Pin 6                     | Pin 7 (B+)        |
| Pin 7                    | Pin 1 (GND)        |

#### Komunikace Modbus (EM111) {#modbus-communication-em111}

![Schéma sběrnice RS-485 spojující svorky EM111 A- 8, B+ 6, GND 7 s masterem Modbus a PC](../../../../../../chester/supported-devices/modbus/images/carlo-gavazzi-em111-modbus.png)

---

### Tlačítka pro procházení a konfiguraci {#browsing-and-configuration-buttons}

* `◄` **Levé tlačítko**
    1. Procházení menu
    2. Snižování hodnoty
    3. Přidržením potvrdíte volbu / vstoupíte

* `►` **Pravé tlačítko**
    1. Procházení menu
    2. Zvyšování hodnoty
---

### Konfigurace komunikace Modbus pro analyzátor energie {#modbus-communication-configuration-for-energy-analyzer}

1. Stiskněte a přidržte `◄` **(levé)** tlačítko po dobu 1,5 sekundy.  
2. Na displeji se zobrazí `PASS`.  
3. Dalším stiskem `◄` **(levého)** tlačítka začnete zadávat heslo.  
4. Pomocí tlačítek `►` **(pravé)** a `◄` **(levé)** vyberte číslice.  
5. Každou číslici potvrďte přidržením `◄` **(levého)** tlačítka po dobu 1,5 sekundy, čímž se přesunete na další.  
6. Výchozí heslo je `0000`.  
7. Po zadání hesla se na displeji zobrazí `N PASS` s výzvou k zadání nového hesla (pokud je potřeba).  
8. Po vstupu do menu se pohybujte pomocí tlačítek `►` **(pravé)** a `◄` **(levé)**.  
9. Chcete-li upravit jakoukoli hodnotu, stiskněte a přidržte `◄` **(levé)** tlačítko na požadované položce alespoň 1,5 sekundy.  
10. Po úpravě hodnoty ji potvrďte dalším dlouhým stiskem `◄` **(levého)** tlačítka.  
11. Až budete se všemi nastaveními hotovi, procházejte menu, dokud nenajdete `END`, a poté přidržením `◄` **(levého)** tlačítka nabídku opustíte.  

:::info
Pokud dlouhé stisky nereagují, zkuste `◄` **(levé)** tlačítko stiskávat blíže ke středové části displeje.
:::


#### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Adresa | Baud Rate | Parita | Stop bit |
|---------|-----------|--------|-----------|
| 1       | 9.6k      | Žádná   | 1         |

---

### Konfigurace komunikace Modbus pro CHESTER {#modbus-communication-configuration-for-chester}

Pomocí následujících příkazů nastavte parametry komunikace přes CHESTER Terminal:


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
| Energie na vstupu      | E_ENERGY_METER.METER_1.ENERGY_IN.MEASUREMENTS|
| Energie na výstupu     | E_ENERGY_METER.METER_1.ENERGY_OUT.MEASUREMENTS|

---
