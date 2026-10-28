---
slug: how-to-soil-sensor
title: "How To: Soil Sensor"
---
import Image from '@theme/IdealImage';

Soil Moisture sensor measures moisture and temperature.

## References
- [**Soil Sensor SDK Module**](https://sdk.hardwario.com/group__twr__soil__sensor.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-radio-soil-sensor/blob/main/src/application.c)

:::info

This is the simplest example with a single connected sensor to the [**Sensor Module**](../../hardware-modules/about-soil-sensor.md).

:::

<details>
<summary>
<b>
Writing a single sensor values to the console Code Example
</b>
</summary>

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

</details>

:::info

When you connect **multiple sensors**, you need to initialize them with `twr_soil_sensor_init_multiple`. In the **event handler**, you then get the `device_address` in the callback parameter, or you can get the sensor index by calling `twr_soil_sensor_get_index_by_device_address()`.

The example below shows how to work with multiple sensors.

:::

<details>
<summary>
<b>
Multiple Connected Sensors Code Example
</b>
</summary>

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

</details>
