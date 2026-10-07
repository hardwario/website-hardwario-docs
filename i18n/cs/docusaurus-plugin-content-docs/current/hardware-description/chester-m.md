---
slug: chester-m
title: Základní deska CHESTER-M
---
import Image from '@theme/IdealImage';

# CHESTER-M {#chester-m}

<div class="container">
  <div class="row">
    <div class="col col--2">
      <div><Image img={require('../../../../../chester/hardware-description/images/chester-m-enclosure.png')} alt="Základní deska CHESTER-M s baterií a svorkovnicemi namontovaná v bílé krabičce"/></div>
    </div>
    <div class="col col--10">
    CHESTER-M je univerzální základní deska s konektivitou LPWAN, kterou lze doplnit rozšiřujícími moduly <b>X</b>.
    </div>
  </div>
</div>
<br />

## Blokové schéma {#block-diagram}

![Blokové schéma CHESTER-M: MCU nRF52840 s modemy BLE, LTE a LoRa, GNSS, senzory, napájení a rozšiřující porty](../../../../../chester/hardware-description/images/block-diagram.png)


## Základní parametry {#basic-parameters}

Tento článek uvádí základní parametry platformy CHESTER:

| Název                          | Hodnota                    | Poznámka                                                      |
| :----------------------------- | :------------------------- | :------------------------------------------------------------ |
| Rozsah provozního napětí       | 2,0 až 5,25 V              | Jen pro základní desku; rozšiřujícími moduly lze rozsah rozšířit |
| Typický klidový proud          | 100 μA                     | Bez rozšiřujících modulů a periferií                          |
| Přídavný proud pro BLE         | 50 μA                      | Interval advertisingu 1 s                                     |
| Přídavný proud pro NB-IoT/LTE-M | 100 μA                    | Pro ECL=0 a 30minutový interval vysílání                      |
| Přídavný proud pro LoRaWAN     | 50 μA                      | Pro SF12 a 30minutový interval vysílání                       |
| Rozměry krabičky               | 130(š) x 175(v) x 45(h) mm | Standardní krabička                                           |
| Rozměry krabičky               | 200(š) x 280(v) x 45(h) mm | Nosná deska, nízký profil                                     |
| Rozměry krabičky               | 200(š) x 280(v) x 65(h) mm | Nosná deska, vysoký profil                                    |
| Rozsah provozních teplot       | -20 až +60 °C              |                                                               |
| Rozsah skladovacích teplot     | -30 až +70 °C              |                                                               |
| Stupeň krytí                   | IP 67                      | Lze ponořit do hloubky 1 m na 30 minut                        |

:::caution

Uvedené parametry se mohou lišit podle konkrétní konfigurace hardwaru a aplikace.

:::


## Popis konektorů {#connector-description}

### Popis svorkovnic {#terminal-blocks-description}

Signály na svorkovnicích určují rozšiřující moduly **X** osazené na zadní straně základní desky CHESTER.
Více informací najdete v kapitole [Moduly na zadní straně](../extension-modules/index.md#backside-modules).

### Pájené propojky svorkovnic {#terminal-block-solder-bridges}

Pokud ve slotu A nebo B není žádný rozšiřující modul, lze 8pinové svorkovnice nastavit pájenými propojkami.

Podle zapájených propojek mohou být na pinech svorkovnic tyto signály:

- Svorky **A1-A8** a **B1-B8** lze připojit na GND.
- Svorky **A6, A3, B6, B3** lze připojit na VDD
- Svorky **A5, A2, B5, B2** lze připojit na DQ (sběrnice 1-Wire).

#### Rozšíření 1-Wire {#1-wire-extension}

Obrázek ukazuje, jak sběrnici 1-Wire vyvést i na 8pinové svorkovnice A a B. Zapájejte vyznačené propojky a signály 1-Wire ze svorkovnice 1-Wire
se zduplikují na 8pinové svorkovnice.

Pozor, **pájené propojky** jsou na spodní straně PCB. Modré obdélníky propojek **vpravo** na obrázku níže proto ve skutečnosti připojují signály k **levým** 8pinovým svorkovnicím TB1 a TB2 (při pohledu na PCB zpředu).

![Spodní strana PCB s vyznačenými pájenými propojkami 1-Wire VDD a DQ a propojkami GND](../../../../../chester/hardware-description/images/solder-bridges.png)

Obrázek ukazuje zapojení svorkovnic:

![Pohled zpředu: svorky bloku A TB1/TB2 modře a svorky bloku B TB5/TB6 zeleně vedle svorek 1-Wire a I2C](../../../../../chester/hardware-description/images/terminal-blocks.png)

Připojení sběrnice 1-Wire ke svorkovnicím a 8pinovým konektorům JST:

| Pozice na svorkovnici   | Název signálu | Popis signálu      |
| :---------------------: | :---------: | :------------------- |
|        A1 nebo B1       |    `GND`    | Systémová zem |
|        A2 nebo B2       |    `DQ`     | Data 1-Wire          |
|        A3 nebo B3       |    `VDD`    | Napájení             |
|        A4 nebo B4       |    `GND`    | Systémová zem |
|        A5 nebo B5       |    `DQ`     | Data 1-Wire          |
|        A6 nebo B6       |    `VDD`    | Napájení             |
|        A7 nebo B7       | `NC or GND` | Nezapojeno nebo GND  |
|        A8 nebo B8       | `NC or GND` | Nezapojeno nebo GND  |

### Modul na zadní straně {#backside-module}

Tato část popisuje přiřazení signálů ve dvou slotech (A a B) na zadní straně základní desky **CHESTER**.

Sloty na zadní straně mají dvě řady signálů:

* **Horní řada** (blíže k anténě)

  Tato řada (devět pinů s roztečí 2,54 mm) přivádí napájecí větve a digitální signály podle tabulky níže.

* **Dolní řada** (blíže ke svorkovnicím)

  Tato řada (osm pinů s roztečí 2,54 mm) je připojená přímo ke svorkovnicím a význam jejích signálů závisí na konkrétním modulu.

#### Signály horní řady (slot A) {#top-row-signals-slot-a}

:::caution

Následující tabulka uvádí signály v pořadí zleva doprava, když desku otočíte (slot A je na pravé straně).

:::

| Pozice   | Název signálu | Popis signálu        | Připojení na nRF52840 |
| :------: | :---------: | :--------------------- | :--------------------: |
|    1     |    `+V`     | Systémová kladná větev |           -            |
|    2     |   `GP3A`    | Univerzální I/O        |      `P0.31/AIN7`      |
|    3     |   `GP2A`    | Univerzální I/O        |      `P0.02/AIN0`      |
|    4     |   `GP1A`    | Univerzální I/O        |      `P0.29/AIN5`      |
|    5     |   `GP0A`    | Univerzální I/O        |      `P0.03/AIN1`      |
|    6     |    `SDA`    | Systémová sběrnice I²C (data) |           -            |
|    7     |    `SCL`    | Systémová sběrnice I²C (hodiny) |           -            |
|    8     |    `VDD`    | Systémová větev VDD    |           -            |
|    9     |    `GND`    | Systémová zem  |           -            |

#### Signály horní řady (slot B) {#top-row-signals-slot-b}

:::caution

Následující tabulka uvádí signály v pořadí zleva doprava, když desku otočíte (slot B je na levé straně).

:::

| Pozice   | Název signálu | Popis signálu        | Připojení na nRF52840 |
| :------: | :---------: | :--------------------- | :--------------------: |
|    1     |    `+V`     | Systémová kladná větev |           -            |
|    2     |   `GP3B`    | Univerzální I/O        |      `P0.05/AIN3`      |
|    3     |   `GP2B`    | Univerzální I/O        |      `P0.04/AIN2`      |
|    4     |   `GP1B`    | Univerzální I/O        |      `P0.30/AIN6`      |
|    5     |   `GP0B`    | Univerzální I/O        |      `P0.28/AIN4`      |
|    6     |    `SDA`    | Systémová sběrnice I²C (data) |           -            |
|    7     |    `SCL`    | Systémová sběrnice I²C (hodiny) |           -            |
|    8     |    `VDD`    | Systémová větev VDD    |           -            |
|    9     |    `GND`    | Systémová zem  |           -            |


## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud píšete nízkoúrovňový kód pracující přímo s hardwarem, nebo pokud vás jen zajímá, jak je systém navržený.

- [Schéma R3.4 (PDF)](pathname:///chester/hardware-description/hio-chester-m-r3.4.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů PCB R3.4](pathname:///download/ibom/chester-m-r3.4.html)

### MCU {#mcu}
![Schéma 1/7: modul MCU/BLE MDBT50Q, konektor SWD, senzory RH/T, teploty a náklonu, NOR flash, 1-Wire, LED](../../../../../chester/hardware-description/images/hio-chester-m-1.png)

### LTE {#lte}
![Schéma 2/7: modem LTE nRF9160 s rozhraními SIM, RF přepínači a konektory antén](../../../../../chester/hardware-description/images/hio-chester-m-2.png)

### LoRaWAN {#lorawan}
![Schéma 3/7: modem LoRa Murata CMWX1ZZABZ, konektor SWD a budicí tranzistory LED](../../../../../chester/hardware-description/images/hio-chester-m-3.png)

### GNSS {#gnss}
![Schéma 4/7: modul GNSS SAM-M8Q se zátěžovými spínači TPS22917, tlačítkem a zátěžovým obvodem LED](../../../../../chester/hardware-description/images/hio-chester-m-4.png)

### Napájení {#power}
![Schéma 5/7: nabíjecí obvod LTC4425, zvyšující měnič TPS61023, LDO, vstupy baterie, spínání zátěže a ADC TLA2021](../../../../../chester/hardware-description/images/hio-chester-m-5.png)

### Svorky {#terminals}
![Schéma 6/7: patice modulů slotů A a B propojené se svorkovnicemi, konektory JST a ochrannými diodami](../../../../../chester/hardware-description/images/hio-chester-m-6.png)

### Spoje {#nets}
![Schéma 7/7: tlačítko, tamper, konektory SYSTEM, I2C, QWIIC a 1-Wire s ochranou ESD](../../../../../chester/hardware-description/images/hio-chester-m-7.png)


## Rozmístění na desce {#layout-placement}

- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů PCB R3.4](pathname:///download/ibom/chester-m-r3.4.html)

### Horní strana {#top}

![Horní strana desky CHESTER-M R3.4 s popisky konektorů, antén, svorkovnic a držáku baterie](../../../../../chester/hardware-description/images/documentation-top.png)

### Spodní strana {#bottom}

![Spodní strana desky CHESTER-M s rozšiřujícími sloty A a B, pájenými propojkami a zrcadlenými popisky svorek](../../../../../chester/hardware-description/images/documentation-bot.png)
