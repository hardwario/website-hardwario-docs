---
slug: how-to-gpio-pins
title: "How To: GPIO Pins"
---
import Image from '@theme/IdealImage';

You can use many **GPIO pins** (**G**eneral **P**urpose **I**nput/**O**utput pins) to connect the Core Module with the outside world.
The pins are described in the Header Pinout. The pins in SDK have the names `TWR_GPIO_P0` to `TWR_GPIO_P17`. There are also two special pins dedicated to `TWR_GPIO_LED` and `TWR_GPIO_BUTTON`.

## References
- [**GPIO SDK Module**](https://sdk.hardwario.com/group__twr__gpio.html)
- GitHub Repository Example

:::info

This example will turn on the **LED on the Core Module**. The usual and more comfortable way to control LED is to use [**`twr_led`**](./led-control.md) code, but we use `twr_gpio` for now to explain the **GPIO basics**.

:::

<details>
<summary>
<b>
GPIO as Output Code Example
</b>
</summary>

  ```c showLineNumbers
  #include <application.h>

  void application_init(void)
  {
      twr_gpio_init(TWR_GPIO_LED);
      twr_gpio_set_mode(TWR_GPIO_LED, TWR_GPIO_MODE_OUTPUT);
      twr_gpio_set_output(TWR_GPIO_LED, 1);
  }
  ```

</details>

:::info

This example will **read the button state** and based on that the **LED will be set to the ON/OFF state**.

:::

<details>
<summary>
<b>
GPIO Input and Output Code Example
</b>
</summary>

  ```c showLineNumbers
  #include <application.h>

  void application_init(void)
  {
      twr_gpio_init(TWR_GPIO_LED);
      twr_gpio_set_mode(TWR_GPIO_LED, TWR_GPIO_MODE_OUTPUT);

      twr_gpio_init(TWR_GPIO_BUTTON);
      twr_gpio_set_mode(TWR_GPIO_BUTTON, TWR_GPIO_MODE_INPUT);

      // The Core Module has hardware pull-down so next call is commented out
      // twr_gpio_set_pull(TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN);
  }

  void application_task()
  {
      uint8_t button_state = twr_gpio_get_input(TWR_GPIO_BUTTON);
      twr_gpio_set_output(TWR_GPIO_LED, button_state);

      // Repeat this task again after 10 ms
      twr_scheduler_plan_current_relative(10);
  }
  ```

</details>
