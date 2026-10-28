---
slug: how-to-relay-module
title: "How To: Relay Module"
---
import Image from '@theme/IdealImage';

With our [**Relay Module**](../../hardware-modules/about-relay-module.md) you can easily control **high voltage/current circuits**. This module is specially designed to consume low levels of power.

:::info

The relay consumes power only when changing state.

:::

## References
- [**Relay Module SDK Module**](https://sdk.hardwario.com/group__twr__module__relay.html)
- GitHub Repository Example

:::tip

In the example, the Relay I2C address is set as `TWR_MODULE_RELAY_I2C_ADDRESS_DEFAULT`, you can also use `TWR_MODULE_RELAY_I2C_ADDRESS_ALTERNATE` if you want to use a **second Relay Module** on one device.

You will just have to solder the **0-ohm resistor** to the second position on the Relay Module.

:::

## Example

:::info

In the example below, the relay on the **Relay Module** will turn **On/Off** every time you press the button on the **Core Module or Button Module**.

:::

<details>
<summary>
<b>
Relay Module Pulse Code Example
</b>
</summary>

  ```c showLineNumbers
  #include <application.h>

  twr_module_relay_t relay;
  twr_button_t button;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          twr_module_relay_toggle(&relay);
      }
  }

  void application_init(void)
  {
      twr_module_relay_init(&relay, TWR_MODULE_RELAY_I2C_ADDRESS_DEFAULT);
      twr_module_relay_set_state(&relay, false);

      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);
  }
  ```

</details>
