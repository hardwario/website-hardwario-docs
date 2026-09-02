---
slug: how-to-co2-module
title: "How To: Modul CO₂"
description: "S modulem CO₂ můžete snadno měřit koncentraci oxidu uhličitého."
---
import Image from '@theme/IdealImage';

S modulem CO₂ můžete snadno měřit koncentraci **oxidu uhličitého**.

Jde o nízkopříkonový modul, který lze dlouhodobě napájet z baterie. Nezapomeňte, že zařízení může potřebovat několik dní, než dosáhne nejlepších výsledků.

Modul používá k [**měření infračervené světlo**](https://en.wikipedia.org/wiki/Carbon_dioxide_sensor).

## Odkazy {#references}
- [**CO₂ SDK Module**](https://sdk.hardwario.com/group__twr__module__co2.html)
- [**Ukázka v GitHub repozitáři**](https://github.com/hardwario/twr-radio-co2-monitor/blob/main/src/application.c)

:::info

  V tomto příkladu se bude každé 2 minuty měřit hladina CO₂ a odesílat **do počítače přes USB**.

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
