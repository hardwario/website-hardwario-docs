---
slug: chester-z1
title: CHESTER-Z1 (Batt. Button LED)
description: "Tento článek popisuje rozšiřující modul do horního krytu CHESTER-Z1."
---
import Image from '@theme/IdealImage';

# CHESTER-Z1 {#chester-z1}
Tento článek popisuje rozšiřující modul do horního krytu **CHESTER-Z1**.

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('../../../../../chester/extension-modules/images/chester-z-top.png')} alt="Pohled shora na desku CHESTER-Z s držákem baterie 18650, bzučákem, tlačítkem bypass a konektory VIN a SYSTEM"/></div>
    </div>
    <div class="col col--10">
    </div>
  </div>
</div>
<br />

## Přehled modulu {#module-overview}

**CHESTER-Z1** kombinuje zálohování pomocí dobíjecí lithium-iontové baterie, široký rozsah vstupního napájecího napětí a volitelné rozhraní člověk-stroj (HMI) s podsvícenými tlačítky a akustickou zpětnou vazbou. Primárně se používá se zařízením **CHESTER-M** (základní deska), ale lze jej použít i s [**HARDWARIO TOWER**](../../tower) a ekosystémy třetích stran, jako jsou **Raspberry Pi**, **Arduino**, **ESP** atd. Modul se instaluje pod horní kryt krabičky řady Takachi WP13-18.

**CHESTER-Z1** poskytuje digitální komunikační rozhraní I2C (v roli slave).

Přes I2C je k dispozici následující funkcionalita:

1. **HMI příkazy – tj. ovládání LED a bzučáku**
   1. Jednorázová popředí indikace
   2. Kontinuální vzory na pozadí
2. **Detekce událostí**
   1. Události tlačítek (stisk, uvolnění, kliknutí, podržení)
   2. Události napětí DC linky (připojení, odpojení)
3. **Stavové informace**
   1. Napětí DC linky
   2. Napětí baterie
   3. Stav tlačítka
4. Identifikace produktu a informace o verzi

Toto jsou typické případy použití modulu **CHESTER-Z1** (možné jsou i další scénáře):

* Případ použití 1 (CHESTER-Z1):
  * Fotovoltaický solární panel nebo DC napájení se zálohou pro **CHESTER**
  * Napájení systému z baterie modulu **CHESTER-Z1** (dobíjitelné z fotovoltaického solárního panelu nebo DC napájení 6-28 V)
* Případ použití 2 (CHESTER-Z1-X):
  * Jedno podsvícené tlačítko a akustická zpětná vazba
  * Napájení systému ze zařízení **CHESTER-M** (2x článek AA nebo **CHESTER-X4**)
* Případ použití 3 (CHESTER-Z1-F):
  * Čtyři podsvícená tlačítka a akustická zpětná vazba
  * Napájení systému z baterie modulu **CHESTER-Z1** (dobíjitelné z externího DC napětí)

Více podrobností najdete v [**objednacích kódech**](../ordering-codes.md#chester-z).

## Technická specifikace {#technical-specification}

* Rozsah vstupního DC napětí (VIN): **6-28 VDC**, vhodné i pro **solární panel 12-18 V\***
* Jmenovité napětí baterie: **3,7 V**
* Nabíjecí proud baterie: **100 mA**
* Klidová spotřeba baterie **55 μA** (bez CHESTER-M)
* Doporučený typ baterie pro venkovní použití: Samsung ICR18650-22P**
* Provozní teplota: **-40 až +70 °C** (bez Li-Ion baterie)
* Skladovací teplota: **-40 až +85 °C** (bez Li-Ion baterie)

_\*Optimální fotovoltaický solární panel pro CHESTER: 12 V / 10 W_

_\** Vhodné pro aplikaci se solárním panelem, teplotní rozsah nabíjení -20 až +45 °C, vybíjení -20 až +70 °C_

## Nabíječ baterie a ochranný obvod {#battery-charger-and-protection-circuit}
**CHESTER-Z1** využívá nabíjecí obvod MCP73833 a ochranný obvod AP9101C, který chrání baterii detekcí přepětí při nabíjení, podpětí při vybíjení a nadproudu při nabíjení/vybíjení.

:::caution

Pro první spuštění při napájení z baterie bez DC vstupního napájení** je nutné dlouze stisknout tlačítko Bypass (BYPASS)**.

:::

Díky nízkému nabíjecímu proudu (100 mA) je teplotní rozsah nabíjení rozšířen na -20 až +45 °C. Optimálním typem Li-Ion baterie pro venkovní aplikace při nízkých teplotách je Samsung ICR18650-22P.

## Výkres modulu {#module-drawing}

![Výkres desky CHESTER-Z1 s umístěním držáku baterie BT1, tlačítka bypass S6, vstupů VIN JP1/JP2 a konektoru SYSTEM](../../../../../chester/extension-modules/images/chester-z1.png)

## Vstupy / výstupy a funkce {#input--output-and-functions}

| Pozice   | Název   | Popis signálu                       |
| -------- | ------- | ----------------------------------- |
| JP1      | VIN     | JST konektor DC napájení 6-28 V     |
| JP2      | VIN     | Svorka DC napájení 6-28 V           |
| JP4      | SYSTEM  | JST konektor CHESTER SYSTEM         |
| JP5      | SWD     | Konektor MCU SWD / debug            |
| BT1      | BATTERY | Držák Li-Ion baterie 18650          |
| S6       | BYPASS  | Tlačítko obejití ochrany baterie*   |

_\* Tlačítko BYPASS použijte pro spuštění z baterie bez DC vstupního napájení_

## Popis pinoutu konektoru SYSTEM {#system-connector-pinout-description}

![Piny 1–7 konektoru SYSTEM přiřazené k NC, +V, GND, VDD, SCL, SDA, INT](../../../../../chester/extension-modules/images/system.png)

## Blokové schéma {#block-diagram}
![Blokové schéma: chráněný DC vstup, regulátory, Li-Ion nabíječ a ochrana, MCU Cortex-M0+, HMI, systémový konektor](../../../../../chester/extension-modules/images/chester-z-block-diagram.png)

## Schéma zapojení {#schematic-diagram}

Schéma zapojení je užitečné, pokud programujete nízkoúrovňový kód související s hardwarem nebo pokud vás jen zajímá, jak je systém navržen.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-z1-r2.1.pdf)

<!--
- [TODO Interactive PCB connector, part, testpoint and signal browser]
-->

![Schéma CHESTER-Z1 R2.1, strana 1: DC vstup 6-26 V, eFuse, step-down měniče a konektor SYSTEM](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-1.png)
![Schéma CHESTER-Z1 R2.1, strana 2: Li-Ion nabíječ MCP73833, ochrana baterie AP9101C a tlačítko bypass](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-2.png)
![Schéma CHESTER-Z1 R2.1, strana 3: MCU STM32L010, debug konektor, výstup přerušení a měření napětí](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-3.png)
![Schéma CHESTER-Z1 R2.1, strana 4: pinout konektoru KIT pro HARDWARIO TOWER s tranzistorem signálu INT](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-4.png)
![Schéma CHESTER-Z1 R2.1, strana 5: dva RGB LED drivery LP55231, pět tlačítek a bzučák](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-5.png)
