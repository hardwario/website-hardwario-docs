---
slug: how-to-soil-sensor
title: "How To: Soil Sensor"
description: "Senzor půdní vlhkosti měří vlhkost a teplotu."
---
import Image from '@theme/IdealImage';

Senzor půdní vlhkosti měří vlhkost a teplotu.

## Odkazy {#references}
- [**Modul SDK pro Soil Sensor**](https://sdk.hardwario.com/group__twr__soil__sensor.html)
- [**Příklad v GitHub repozitáři**](https://github.com/hardwario/twr-radio-soil-sensor/blob/main/src/application.c)

:::info

Toto je nejjednodušší příklad s jedním senzorem připojeným k [**Sensor Module**](../../hardware-modules/about-soil-sensor.md).

:::

<details>
<summary>
<b>
Příklad kódu pro výpis hodnot jednoho senzoru do konzole
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  // Soil sensor instance
  twr_soil_sensor_t soil_sensor;

  void soil_sensor_event_handler(twr_soil_sensor_t *self, uint64_t device_address, twr_soil_sensor_event_t event, void *event_param)
  {
      if (event == TWR_SOIL_SENSOR_EVENT_UPDATE)
      {
          uint16_t moisture;
          float temperature;

          twr_soil_sensor_get_cap_raw(self, device_address, &moisture);
          twr_soil_sensor_get_temperature_celsius(self, device_address, &temperature);
          twr_log_debug("Moisture: %d\tTemperature %.2f", moisture, temperature);
      }
  }

  void application_init(void)
  {
      twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);

      // Initialize soil sensor
      twr_soil_sensor_init(&soil_sensor);
      twr_soil_sensor_set_event_handler(&soil_sensor, soil_sensor_event_handler, NULL);
      twr_soil_sensor_set_update_interval(&soil_sensor, 1000);
  }
  ```

</p>
</details>

:::info

Když připojíte **více senzorů**, je potřeba je inicializovat pomocí `twr_soil_sensor_init_multiple`. V **event handleru** pak v parametru callbacku dostanete `device_address`, nebo můžete získat index senzoru voláním `twr_soil_sensor_get_index_by_device_address()`.

Příklad níže ukazuje, jak pracovat s více senzory.

:::

<details>
<summary>
<b>
Příklad kódu pro více připojených senzorů
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  #define MAX_SOIL_SENSORS                    5

  // Sensors array
  twr_soil_sensor_sensor_t sensors[MAX_SOIL_SENSORS];

  void soil_sensor_event_handler(twr_soil_sensor_t *self, uint64_t device_address, twr_soil_sensor_event_t event, void *event_param)
  {
      if (event == TWR_SOIL_SENSOR_EVENT_UPDATE)
      {
          int index = twr_soil_sensor_get_index_by_device_address(self, device_address);
    }
  }

  void application_init(void)
  {
      // Initialize soil sensors
      twr_soil_sensor_init_multiple(&soil_sensor, sensors, MAX_SOIL_SENSORS);
      twr_soil_sensor_set_event_handler(&soil_sensor, soil_sensor_event_handler, NULL);
      twr_soil_sensor_set_update_interval(&soil_sensor, SENSOR_UPDATE_SERVICE_INTERVAL);

  }
  ```

</p>
</details>
