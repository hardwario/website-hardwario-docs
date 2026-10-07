---
slug: about-soil-sensor
title: O senzoru Soil Sensor
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/soil-sensor.png')} alt="Sonda senzoru půdní vlhkosti s vytištěnou hloubkovou stupnicí a dlouhým kabelem zakončeným třemi vodiči s dutinkami" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Soil Moisture Sensor</b> je moderní, zcela utěsněný kapacitní senzor vlhkosti s teplotním senzorem. Komunikuje protokolem 1-Wire a má 2 metry dlouhý třívodičový kabel. K jednomu masteru 1-Wire lze připojit mnoho senzorů. Teplotní senzor je v horní části nad půdou. Elektronika je celá zalitá těsnicí hmotou, takže odolá jakémukoli počasí.
      </p>
      <p>
        Senzor vrací vlhkost půdy v relativních hodnotách. Je velmi citlivý: na suchu vrací 6500, plně ponořený ve vodě 13000. Měří dvěma měděnými pásky ve vnitřních vrstvách čtyřvrstvé desky plošných spojů, takže kontakty nejsou vystavené přímé vlhkosti a neoxidují.
      </p>
    </div>
  </div>
</div>
<br />

:::note

Senzor je také možné použít pro **měření hladiny vody**.

:::

:::info

K dispozici je také [**Arduino knihovna pro Soil Sensor**](https://github.com/hardwario/SoilSensor) (budete potřebovat i [**knihovnu DS28E17**](https://github.com/hardwario/arduino-DS28E17)).

:::

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/soil-sensor-connection.png')} alt="Návod na zapojení: černý vodič GND, červený VDD a žlutý datový vodič senzoru půdní vlhkosti na Sensor Module R1.1 a R1.0" /></div>
    </div>
    <div class="col col--6">
      <p>
      </p>
    </div>
  </div>
</div>
<br />

:::tip

**Nedoporučujeme** umísťovat horní část senzoru pod zem. Zemnicí plochy v této oblasti by mohly ovlivnit měřicí elektrody a přesnost měření.

:::

## Vlastnosti {#features}
- Senzor půdní vlhkosti
- Plně digitální konstrukce
- Komunikace po sběrnici **1-Wire**
- Možnost připojit více senzorů paralelně
- Převodník kapacity na digitální signál **ZSSC3123**
- Digitální **teplotní senzor TMP112**
- Rozsah provozního napětí: 2,8 V až 5,5 V
- Rozsah provozních teplot: -40 až +85 °C
- Krytí IP 68

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/soil-sensor-set)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-soil-sensor)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__soil__sensor.html)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_soil_sensor.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_soil_sensor.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=117389)
