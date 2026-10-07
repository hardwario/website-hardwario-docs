---
slug: about-sensor-module
title: O modulu Sensor Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/sensor-module.png')} alt="Sensor Module s pětipólovou odnímatelnou svorkovnicí pro univerzální vstupy a výstupy" /></div>
    </div>
    <div class="col col--6">
      <p>
        Sensor Module má až čtyři univerzální vstupy nebo výstupy na odnímatelné svorkovnici a podporuje režim master na sběrnici 1-Wire. Svorky fungují jako analogové i digitální vstupy a výstupy, takže k nim můžete připojit například různé externí digitální, analogové nebo odporové senzory. Přes sběrnici 1-Wire můžete komunikovat i s dalšími zařízeními.
      </p>
      <p>
        Svorky jsou připojené k signálům konektoru HARDWARIO TOWER: A je P4/A4/DAC0, B je P5/A5/DAC1 a C je P7/A6.
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
  - Odporový teplotní senzor (Pt 100, Pt 1000 atd.)
  - Analogový teplotní senzor (LM35, TMP37 atd.)
  - Teplotní senzor NTC
  - Ovládání digitálního reléového bloku 1-Wire
  - Tlačítko nebo jakýkoli typ spínače
  - Měření napětí
- Odnímatelná 4pinová šroubovací svorkovnice
- Rozsah provozního napětí: 1,65 V až 5,5 V
- Rozsah provozních teplot: -20 až 70 °C
- Rozměry: 33 x 55 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/sensor-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-sensor)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__sensor)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_sensor.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_sensor.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73750)
