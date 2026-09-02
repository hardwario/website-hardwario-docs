---
slug: about-lcd-module
title: O modulu LCD Module
description: "LCD Module využívá unikátní technologii – takzvaný paměťový displej vyvinutý společností Sharp. Nabízí rozlišení 128 x 128 pixelů při velikosti 1,28 palce. Obsahuje řadič displeje s extrémně nízkou spotřebou, takže můžete mít aktivní grafický displej…"
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/lcd-module.png')} alt="LCD Module s 1,28palcovým pamětovým displejem Sharp a dvěma tlačítky" /></div>
    </div>
    <div class="col col--6">
      <p>
        LCD Module využívá unikátní technologii – takzvaný paměťový displej vyvinutý společností Sharp. Nabízí rozlišení 128 x 128 pixelů při velikosti 1,28 palce. Obsahuje řadič displeje s extrémně nízkou spotřebou, takže můžete mít aktivní grafický displej s dlouhou dobou provozu z baterií.
      </p>
      <p>
        Svou aplikaci můžete ovládat pomocí dvou tlačítek umístěných pod LCD displejem. Modul je také vybaven senzorem gest (Avago APDS-9960). Tento obvod, složený z infračerveného vysílače a čtyř směrových fotodiod reagujících na různé vlnové délky, lze použít také k měření intenzity a barvy světla nebo jako senzor přiblížení.
      </p>
      <p>
        LCD Module dále obsahuje šest RGB LED, které lze využít k indikaci stavu nebo jako světelný alarm.
      </p>
    </div>
  </div>
</div>

:::tip

Příkladem použití modulu **LCD Module** je bezdrátový termostat, případně může přímo **zobrazovat hodnoty z různých senzorů** umístěných uvnitř i venku.

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
- Rozsah napájecího napětí: 2,7 V až 3,3 V
- Rozsah provozních teplot: -20 až 70 °C
- Rozměry: 33 x 55 mm

## Odkazy {#references}
- [**Obchod**](https://www.hardwario.store/p/lcd-module-bg)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-lcd)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__module__lcd)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_module_lcd.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_module_lcd.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=73740)
