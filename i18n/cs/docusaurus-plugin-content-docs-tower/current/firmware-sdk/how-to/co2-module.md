---
slug: how-to-co2-module
title: "Jak na: CO₂ Module"
---
import Image from '@theme/IdealImage';

S modulem CO₂ Module snadno změříte koncentraci **oxidu uhličitého**.

Jde o modul s nízkou spotřebou, který může dlouho běžet na baterie. Počítejte s tím, že zařízení může potřebovat několik dní, než začne měřit nejpřesněji.

Modul měří pomocí [**infračerveného světla**](https://en.wikipedia.org/wiki/Carbon_dioxide_sensor).

## Odkazy {#references}
- [**Modul SDK pro CO₂ Module**](https://sdk.hardwario.com/group__twr__module__co2.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-radio-co2-monitor/blob/main/src/application.c)

:::info

  V tomto příkladu se každé 2 minuty změří koncentrace CO₂ a odešle **přes rádio**.

:::

<details>
<summary>
<b>
Ukázka kódu: CO₂ přes rádio
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  #define CO2_UPDATE_INTERVAL (2 * 60 * 1000)

  void co2_event_handler(twr_module_co2_event_t event, void *event_param)
  {
      (void) event_param;
      float value;

      if (event == TWR_MODULE_CO2_EVENT_UPDATE)
      {
          if (twr_module_co2_get_concentration_ppm(&value))
          {
              twr_radio_pub_co2(&value);
          }
      }
  }

  void application_init(void)
  {
      twr_module_co2_init();
      twr_module_co2_set_update_interval(CO2_UPDATE_INTERVAL);
      twr_module_co2_set_event_handler(co2_event_handler, NULL);
  }
  ```

</p>
</details>
