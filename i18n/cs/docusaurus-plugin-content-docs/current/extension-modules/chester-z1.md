---
slug: chester-z1
title: CHESTER-Z1 (baterie, tlačítka, LED)
---
import Image from '@theme/IdealImage';

# CHESTER-Z1 {#chester-z1}
Tento článek popisuje rozšiřující modul **CHESTER-Z1**, který se montuje pod horní kryt.

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

Modul **CHESTER-Z1** spojuje záložní napájení z dobíjecí baterie Li-Ion, napájecí vstup se širokým rozsahem napětí a volitelné rozhraní člověk-stroj (HMI) s podsvícenými tlačítky a akustickou zpětnou vazbou. Používá se hlavně se základní deskou **CHESTER-M**, ale funguje i s platformou [**HARDWARIO TOWER**](/tower/) a ekosystémy třetích stran, jako jsou **Raspberry Pi**, **Arduino**, **ESP** atd. Modul se montuje pod horní kryt krabičky řady Takachi WP13-18.

Modul **CHESTER-Z1** komunikuje přes digitální rozhraní I2C (v roli slave).

Přes I2C jsou dostupné tyto funkce:

1. **Příkazy HMI, tj. ovládání LED a bzučáku**
   1. Jednorázová indikace v popředí
   2. Trvalé vzory na pozadí
2. **Detekce událostí**
   1. Události tlačítek (stisk, uvolnění, kliknutí, podržení)
   2. Události napětí DC linky (připojení, odpojení)
3. **Stavové informace**
   1. Napětí DC linky
   2. Napětí baterie
   3. Stav tlačítka
4. Identifikace produktu a informace o verzi

Typická využití modulu **CHESTER-Z1** (možné jsou i další scénáře):

* Využití 1 (CHESTER-Z1):
  * Napájení zařízení **CHESTER** z fotovoltaického panelu nebo stejnosměrného zdroje se zálohou
  * Napájení systému z baterie modulu **CHESTER-Z1** (baterie se dobíjí z fotovoltaického panelu nebo stejnosměrného zdroje 6-28 V)
* Využití 2 (CHESTER-Z1-X):
  * Jedno podsvícené tlačítko a akustická zpětná vazba
  * Napájení systému ze základní desky **CHESTER-M** (2 články AA nebo modul **CHESTER-X4**)
* Využití 3 (CHESTER-Z1-F):
  * Čtyři podsvícená tlačítka a akustická zpětná vazba
  * Napájení systému z baterie modulu **CHESTER-Z1** (baterie se dobíjí z externí stejnosměrné linky)

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md#chester-z).

## Technická specifikace {#technical-specification}

* Rozsah vstupního stejnosměrného napětí (VIN): **6-28 VDC**, vhodné i pro **solární panel 12-18 V\***
* Jmenovité napětí baterie: **3,7 V**
* Nabíjecí proud baterie: **100 mA**
* Klidový odběr z baterie **55 μA** (bez desky CHESTER-M)
* Doporučený typ baterie pro venkovní použití: Samsung ICR18650-22P**
* Provozní teplota: **-40 až +70 °C** (bez baterie Li-Ion)
* Skladovací teplota: **-40 až +85 °C** (bez baterie Li-Ion)

_\*Optimální fotovoltaický panel pro zařízení CHESTER: 12 V / 10 W_

_\** Vhodná pro napájení ze solárního panelu; rozsah teplot pro nabíjení -20 až +45 °C, pro vybíjení -20 až +70 °C_

## Nabíječka baterie a ochranný obvod {#battery-charger-and-protection-circuit}
Modul **CHESTER-Z1** má nabíjecí obvod MCP73833 a ochranný obvod AP9101C, který baterii chrání: hlídá přepětí při nabíjení, podpětí při vybíjení a nadměrný nabíjecí i vybíjecí proud.

:::caution

Chcete-li zařízení poprvé spustit z baterie bez stejnosměrného napájení, je nutné **dlouze stisknout tlačítko Bypass (BYPASS)**.

:::

Díky nízkému nabíjecímu proudu (100 mA) se rozsah teplot pro nabíjení rozšiřuje na -20 až +45 °C. Pro venkovní použití při nízkých teplotách je nejvhodnější baterie Li-Ion Samsung ICR18650-22P.

## Výkres modulu {#module-drawing}

![Výkres desky CHESTER-Z1 s umístěním držáku baterie BT1, tlačítka bypass S6, vstupů VIN JP1/JP2 a konektoru SYSTEM](../../../../../chester/extension-modules/images/chester-z1.png)

## Vstupy / výstupy a funkce {#input--output-and-functions}

| Pozice   | Název   | Popis signálu                       |
| -------- | ------- | ----------------------------------- |
| JP1      | VIN     | Konektor JST pro stejnosměrné napájení 6-28 V |
| JP2      | VIN     | Svorkovnice pro stejnosměrné napájení 6-28 V |
| JP4      | SYSTEM  | Konektor JST CHESTER SYSTEM         |
| JP5      | SWD     | Ladicí konektor SWD mikrokontroléru |
| BT1      | BATTERY | Držák baterie Li-Ion 18650          |
| S6       | BYPASS  | Tlačítko pro obejití ochrany baterie* |

_\* Tlačítkem BYPASS spustíte zařízení z baterie, i když není připojené stejnosměrné napájení_

## Zapojení konektoru SYSTEM {#system-connector-pinout-description}

![Piny 1–7 konektoru SYSTEM přiřazené k NC, +V, GND, VDD, SCL, SDA, INT](../../../../../chester/extension-modules/images/system.png)

## Blokové schéma {#block-diagram}
![Blokové schéma: chráněný stejnosměrný vstup, stabilizátory, nabíječka a ochrana baterie Li-Ion, MCU Cortex-M0+, HMI, systémový konektor](../../../../../chester/extension-modules/images/chester-z-block-diagram.png)

## Schéma zapojení {#schematic-diagram}

Schéma zapojení se hodí, pokud programujete nízkoúrovňový kód blízko hardwaru, nebo když vás zajímá, jak je systém navržený.

- [Schéma (PDF)](pathname:///chester/extension-modules/schematics/hio-chester-z1-r2.1.pdf)

<!--
- [TODO Interactive PCB connector, part, testpoint and signal browser]
-->

![Schéma CHESTER-Z1 R2.1, list 1: stejnosměrný vstup 6-26 V, eFuse, snižující měniče a konektor SYSTEM](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-1.png)
![Schéma CHESTER-Z1 R2.1, list 2: nabíječka Li-Ion MCP73833, ochrana baterie AP9101C a tlačítko bypass](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-2.png)
![Schéma CHESTER-Z1 R2.1, list 3: MCU STM32L010, ladicí konektor, výstup přerušení a měření napětí](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-3.png)
![Schéma CHESTER-Z1 R2.1, list 4: zapojení konektoru KIT pro HARDWARIO TOWER s tranzistorem signálu INT](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-4.png)
![Schéma CHESTER-Z1 R2.1, list 5: dva budiče RGB LED LP55231, pět tlačítek a bzučák](../../../../../chester/extension-modules/images/hio-chester-z1-r2.1-5.png)
