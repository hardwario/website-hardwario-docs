---
slug: about-lcd-module
title: O modulu LCD Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/lcd-module.png')} alt="LCD Module s 1,28palcovým paměťovým displejem Sharp a dvěma tlačítky" /></div>
    </div>
    <div class="col col--6">
      <p>
        LCD Module používá unikátní technologii, takzvaný paměťový displej od společnosti Sharp. Má rozlišení 128 x 128 pixelů při úhlopříčce 1,28 palce. Řadič displeje má ultranízkou spotřebu, takže aktivní grafický displej vydrží dlouho běžet na baterie.
      </p>
      <p>
        Aplikaci ovládáte dvěma tlačítky pod displejem. Modul má také senzor gest (Avago APDS-9960). Tento obvod s infračerveným vysílačem a čtyřmi směrovými fotodiodami citlivými na různé vlnové délky umí měřit i intenzitu a barvu světla nebo sloužit jako senzor přiblížení.
      </p>
      <p>
        LCD Module má také šest LED RGB, které mohou indikovat stav nebo sloužit jako světelný alarm.
      </p>
    </div>
  </div>
</div>

:::tip

Modul **LCD Module** můžete použít například pro bezdrátový termostat nebo k přímému **zobrazení hodnot z různých senzorů** uvnitř i venku.

:::

## Vlastnosti {#features}
- Paměťový LCD **LS013B7DH03 (Sharp)**
- Rozlišení displeje: **128 x 128 pixelů**
- Velikost displeje: 1,28 palce
- Dvě **tlačítka**
- Senzor gest **APDS-9960 (Avago)**
  - Pohyb
  - Intenzita světla
  - Přiblížení
- 6x **miniaturní RGB LED**
- Typická spotřeba < 16 μA
- Rozsah provozního napětí: 2,7 V až 3,3 V
- Rozsah provozních teplot: -20 až 70 °C
- Rozměry: 33 x 55 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/lcd-module-bg)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-lcd)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__lcd)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_lcd.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_lcd.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73740)
