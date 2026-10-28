---
slug: how-to-battery-module
title: "How To: Battery Module"
---
import Image from '@theme/IdealImage';

[**Battery Module**](../../hardware-modules/about-battery-module.md) and [**Mini Battery Module**](../../hardware-modules/about-mini-battery-module.md) allow you to power your product with **four** or **two AAA batteries**.
It automatically recognizes if external power is applied (AC module, USB, …) and disconnects batteries from the circuit.

With this module, you can check the battery voltage (**manually** or **periodically**) and schedule appropriate actions for certain voltage levels.

## References
- [**Battery SDK Module**](https://sdk.hardwario.com/group__twr__module__battery.html)
- GitHub Repository Example

## Battery Module Thresholds

SDK offers two voltage level **thresholds**:

```
TWR_MODULE_BATTERY_EVENT_LEVEL_LOW
TWR_MODULE_BATTERY_EVENT_LEVEL_CRITICAL
```

:::tip

  You can use these thresholds to notify yourself that your device will run out of batteries soon and you don't have to worry about checking the voltage now and then.

:::

:::info

  In this example, voltage and charge levels will be sent to your computer over USB every time you press a button on Core Module.

:::

## Examples

<details>
<summary>
<b>
Voltage Over USB Code Example
</b>
</summary>

  ```c showLineNumbers
  #include <application.h>

  twr_button_t button;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          twr_module_battery_measure();

          float voltage = 0.0;
          twr_module_battery_get_voltage(&voltage);

          int chargePercentage = -1;
          twr_module_battery_get_charge_level(&chargePercentage);

          twr_log_debug("Voltage %.3f", voltage);
          twr_log_debug("Charge: %d", chargePercentage);
      }
  }

  void application_init(void)
  {
      twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_ABS);

      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);

      twr_module_battery_init();
  }
  ```

</details>

:::info

  In this example, the voltage will be sent over the radio every 60 minutes.

  And if the voltage level is critical, it will send a **"CRITICAL"** message over the radio.

:::

<details>
<summary>
<b>
Voltage Periodically Over Radio Code Example
</b>
</summary>

  ```c showLineNumbers
  #include <application.h>

  #define BATTERY_UPDATE_INTERVAL (60 * 60 * 1000)

  void battery_event_handler(twr_module_battery_event_t event, void *event_param)
  {
      (void) event;
      (void) event_param;

      float voltage;

      if (event == TWR_MODULE_BATTERY_EVENT_UPDATE)
      {
          if (twr_module_battery_get_voltage(&voltage))
          {
              twr_radio_pub_battery(&voltage);
          }
      }
      if(event == TWR_MODULE_BATTERY_EVENT_LEVEL_CRITICAL)
      {
          twr_radio_pub_string("battery/level", "CRITICAL")
      }
  }

  void application_init(void)
  {
      twr_module_battery_init();
      twr_module_battery_set_event_handler(battery_event_handler, NULL);
      twr_module_battery_set_update_interval(BATTERY_UPDATE_INTERVAL);

      // Initialize radio
      twr_radio_init(TWR_RADIO_MODE_NODE_SLEEPING);
      twr_radio_pairing_request("battery-example", VERSION);
  }

  ```

</details>
