---
slug: about-sensor-module
title: O modulu Sensor Module
description: "Modul Sensor Module nabízí až čtyři univerzální vstupy nebo výstupy na odnímatelné svorkovnici s podporou režimu master na sběrnici 1-Wire. Svorky lze použít jako analogový i digitální vstup/výstup. Můžete tak například připojit různé externí…"
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/sensor-module.png')} alt="Sensor Module s pětipólovou odnímatelnou svorkovnicí pro univerzální vstupy a výstupy" /></div>
    </div>
    <div class="col col--6">
      <p>
        Modul Sensor Module nabízí až čtyři univerzální vstupy nebo výstupy na odnímatelné svorkovnici s podporou režimu master na sběrnici 1-Wire. Svorky lze použít jako analogový i digitální vstup/výstup. Můžete tak například připojit různé externí digitální, analogové nebo rezistivní senzory. Rovněž můžete komunikovat s dalšími zařízeními na sběrnici 1-Wire.
      </p>
      <p>
        Svorky jsou připojeny na signály headeru HARDWARIO TOWER. A je P4/A4/DAC0, B je P5/A5/DAC1 a C je P7/A6.
      </p>
    </div>
  </div>
</div>

:::tip

Prostřední pin VCC lze ovládat softwarově. Na tomto pinu můžete zapnout 3 V.

:::

## Vlastnosti {#features}
- Konfigurovatelné režimy svorek:
  - Analogový vstup nebo výstup
  - Digitální vstup nebo výstup
  - Pull-up rezistor žádný/4,7 kΩ/56 Ω
- Příklady rozhraní:
  - Digitální teplotní senzor na sběrnici 1-Wire (DS18B20)
  - Rezistivní teplotní senzor (Pt 100, Pt 1000 atd.)
  - Analogový teplotní senzor (LM35, TMP37 atd.)
  - Teplotní senzor NTC
  - Ovládání digitálního reléového bloku 1-Wire
  - Tlačítko nebo jakýkoli typ přepínače
  - Měření napětí
- Zásuvná 4pinová šroubovací svorkovnice
- Rozsah provozního napětí: 1,65 V až 5,5 V
- Rozsah provozních teplot: -20 až 70 °C
- Rozměry: 33 x 55 mm

## Odkazy {#references}
- [**Store**](https://www.hardwario.store/p/sensor-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-sensor)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__sensor)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_sensor.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_sensor.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73750)
