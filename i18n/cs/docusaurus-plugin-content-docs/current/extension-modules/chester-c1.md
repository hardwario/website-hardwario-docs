---
slug: chester-c1
title: CHESTER-C1 (I/O deska s relé)
---
import Image from '@theme/IdealImage';

# CHESTER-C1 {#chester-c1}
Tento článek popisuje nosnou desku **CHESTER-C1**.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-c1-top.png')} alt="Nosná deska CHESTER-C1 se dvěma výkonovými relé, držákem baterie velikosti C a zelenými svorkovnicemi podél spodní hrany" /></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}

**CHESTER-C1** je nosná deska pro **CHESTER-M**, která obsahuje:
- svorkovnici pro 4 digitální/analogové vstupy
- 2 výkonová relé
- svorkovnici rozhraní RS-485
- dvě svorkovnice 1-Wire
- měnič DC/DC
- držák pro 4 baterie velikosti C s napětím 3,6 V

Deska **CHESTER-C1** pasuje do krabičky Takachi WP20-28-5Cx.

## Technická specifikace {#technical-specification}

* Rozsah vstupního stejnosměrného napětí (VIN): **8-36 V**
* Podporovaná baterie velikosti C: 1 x **Saft LSH14** nebo 1 x **Saft LS26500\***
* Na vyžádání až 4 x baterie velikosti C nebo 3 x velikosti D (Saft LSH20 nebo LS33000)
* Jmenovité napětí baterie: **3,6 V**
* Klidový odběr z baterie **&lt;2 μA** (bez desky **CHESTER-M**)

_\* Baterii Saft LS26500 nelze použít s variantou CHESTER-M-E (bez superkondenzátorů)._

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md#chester-m).

## Výkres modulu {#module-drawing}

![Výkres desky CHESTER-C1 s pozicemi baterií BT1-BT4, relé K1/K2 a svorkovnicemi JP16 až JP5](../../../../../chester/extension-modules/images/chester-c1.png)

## Přehled vstupů a výstupů {#inputs-and-outputs-overview}

| Pozice   | Název     | Popis signálu                                       |
| -------- | --------- | --------------------------------------------------- |
| JP16     | VIN POWER | Vstup stejnosměrného napájení (VIN 8-36 V)          |
| JP8      | RELAY 1   | Výkonový výstup relé 1                              |
| JP9      | RELAY 2   | Výkonový výstup relé 2                              |
| JP11     | 1-WIRE    | 3pinová svorkovnice 1-Wire                          |
| JP10     | 1-WIRE    | 3pinová svorkovnice 1-Wire                          |
| JP4      | DIGITAL   | 2 x digitální I/O                                   |
| JP3      | ANALOG    | 2 x analogové I/O + 2 x VIN                         |
| JP12     | NA        | Nepoužito                                           |
| BT1-BT4  | BATTERY   | 4 x držák velikosti C pro primární článek 3,6 V*    |
| BT5-BT7  | BATTERY   | 3 x držák velikosti D pro primární článek 3,6 V*    |


_\* CHESTER-X SLOT A je ve výchozím stavu obsazený integrovaným modulem CHESTER-X1_

_\** Tlačítkem BYPASS BUTTON spustíte zařízení z baterie, i když není připojené stejnosměrné napájení_

## Zapojení konektorů {#pinout-description}

### Konektory bloku A {#block-a-connectors}

![Zapojení konektoru bloku A, piny 1-8: +V, A, B, EN, TX, RX, VDD, GND](../../../../../chester/extension-modules/images/block-a.png)

### Konektory 1-Wire {#1-wire-connectors}

![Zapojení konektoru 1-Wire, piny 1-3: VDD, DQ, GND](../../../../../chester/extension-modules/images/1-wire.png)

### Konektor I2C {#i2c-connector}

![Zapojení konektoru I2C, piny 1-5: INT, SDA, SCL, VDD, GND](../../../../../chester/extension-modules/images/i2c.png)

### Konektor SYSTEM {#system-connector}

![Zapojení konektoru SYSTEM, piny 1-7: NC, +V, GND, VDD, SCL, SDA, INT](../../../../../chester/extension-modules/images/system.png)

### Konektory bloku B {#block-b-connectors}

![Zapojení konektoru bloku B, piny 1-8: +V, DI2, GND, DI1, AI2, GND, AI1, VDD](../../../../../chester/extension-modules/images/block-b.png)

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód blízko hardwaru, nebo když vás zajímá, jak je systém navržený.

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-c1-r1.1.pdf)

<!--
- [TODO Interactive PCB connector, part, testpoint and signal browser]
-->

![Schéma CHESTER-C1, list 1: konektory základní desky X0 a X2, 1-Wire, SYSTEM, RS-485, relé, M-Bus a I2C](../../../../../chester/extension-modules/images/hio-chester-c1-r1.1-1.png)
![Schéma CHESTER-C1, list 2: expandér GPIO TCA9534A, RGY LED a budicí obvody relé](../../../../../chester/extension-modules/images/hio-chester-c1-r1.1-2.png)
![Schéma CHESTER-C1, list 3: zapojení baterií velikosti C/D, napájecí vstup a snižující měnič 5 V](../../../../../chester/extension-modules/images/hio-chester-c1-r1.1-3.png)
