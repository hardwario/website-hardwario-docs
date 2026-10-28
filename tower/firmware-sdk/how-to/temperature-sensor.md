---
slug: how-to-temperature-sensor
title: "How To: Temperature Sensor"
---
import Image from '@theme/IdealImage';

The [**Core Module**](../../hardware-modules/about-core-module.md) comes with an integrated temperature sensor **TMP112**. It is high accuracy and low power sensor connected via I²C bus (see address space).

:::note

  If you want to take a look at how **TMP112** is connected, please take a look at the [**schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-core).

:::

## References
- [**TMP112 SDK Module**](https://sdk.hardwario.com/group__twr__tmp112.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-radio-air-quality-monitor/blob/7e8b21a8becbf9e9834c08a17c04bcb95d62233c/src/application.c)

<details>
<summary>
<b>
Integrated Temperature Sensor Code Example
</b>
</summary>

  ```c showLineNumbers
  #include <application.h>

  twr_tmp112_t temp;

  void tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_TMP112_EVENT_UPDATE)
      {
          float temperature = 0.0;
          int16_t rawTemperature = 0;
          twr_tmp112_get_temperature_celsius(&temp, &temperature);
          twr_tmp112_get_temperature_raw(&temp, &rawTemperature);
          twr_log_debug("%.4f °C\r\n%d", temperature, rawTemperature);
      }
  }

  void application_init(void)
  {
      // initialize logging
      twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_ABS);

      // initialize TMP112 sensor
      twr_tmp112_init(&temp, TWR_I2C_I2C0, 0x49);

      // set measurement handler (call "tmp112_event_handler()" after measurement)
      twr_tmp112_set_event_handler(&temp, tmp112_event_handler, NULL);

      // automatically measure the temperature every 5 seconds
      twr_tmp112_set_update_interval(&temp, 5000);
  }
  ```

</details>
