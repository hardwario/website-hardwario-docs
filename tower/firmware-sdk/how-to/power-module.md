---
slug: how-to-power-module
title: "How To: Power Module"
---
import Image from '@theme/IdealImage';

The power module provides two features:

- Control high power device with robust relay (230 V / 16 A)
- Connect 5V addressable LEDs (**WS2812B**) and control them.

:::note

This tutorial goes over the **Relay Control**. If you want to learn about LED Strip control you can visit a separate [**Smart LED Strip chapter**](./smart-led-strip.md).

:::

## References
- [**Power Module SDK Module**](https://sdk.hardwario.com/group__twr__module__power.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-radio-power-controller/blob/main/src/application.c)

:::info

In the example below we set the relay to the off state after initialization.
To switch the state, we use the [**button**](./push-button.md).

:::

<details>
<summary>
<b>
Power Module Relay Control Code Example
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
          twr_module_power_relay_set_state(!twr_module_power_relay_get_state());
      }
  }

  void application_init(void)
  {
      twr_module_power_init();
      twr_module_power_relay_set_state(false);

      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);
  }
  ```

</details>

:::info

We have a separate tutorial on how to control [**Smart LED strip**](./smart-led-strip.md).

:::
