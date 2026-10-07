---
slug: how-to-co2-module
title: "How To: CO₂ Module"
---
import Image from '@theme/IdealImage';

With CO₂ Module you can easily measure the concentration of **carbon dioxide**.

It is a low-power module that can be battery-powered for a long period. Remember that the device can need a few days before the best results are achieved.

The module uses [**infrared light for measurements**](https://en.wikipedia.org/wiki/Carbon_dioxide_sensor).

## References
- [**CO₂ SDK Module**](https://sdk.hardwario.com/group__twr__module__co2.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-radio-co2-monitor/blob/main/src/application.c)

:::info

  In this example, CO₂ levels will be measured and sent **over the radio** every 2 minutes.

:::

<details>
<summary>
<b>
CO₂ Over Radio Code Example
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
