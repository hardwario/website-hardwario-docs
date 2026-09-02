---
slug: how-to-temperature-sensor
title: "How To: Teplotní senzor"
description: "Core Module je vybaven integrovaným teplotním senzorem TMP112. Jde o velmi přesný senzor s nízkou spotřebou připojený přes sběrnici I²C (viz adresní prostor)."
---
import Image from '@theme/IdealImage';

[**Core Module**](../../hardware-modules/about-core-module.md) je vybaven integrovaným teplotním senzorem **TMP112**. Jde o velmi přesný senzor s nízkou spotřebou připojený přes sběrnici I²C (viz adresní prostor).

:::note

  Pokud se chcete podívat, jak je **TMP112** zapojen, prohlédněte si [**schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-core).

:::

## Odkazy {#references}
- [**TMP112 SDK Module**](https://sdk.hardwario.com/group__twr__tmp112.html)
- [**Příklad v GitHub repozitáři**](https://github.com/hardwario/twr-radio-air-quality-monitor/blob/7e8b21a8becbf9e9834c08a17c04bcb95d62233c/src/application.c)

<details>
<summary>
<b>
Ukázka kódu pro integrovaný teplotní senzor
</b>
</summary>
<p>

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

</p>
</details>
