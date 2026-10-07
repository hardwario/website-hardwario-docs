---
slug: how-to-led-control
title: "How To: LED Control"
---
import Image from '@theme/IdealImage';

Controlling the **LED integrated into Core Module** is like printing `Hello world`. In this chapter, we will go over some simple examples of how to do that.

## References
- [**LED SDK Module**](https://sdk.hardwario.com/group__twr__led.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-sdk/blob/master/_examples/led-on-off/application.c)

:::info

In this simple example, the LED will be initialized and then it will blink continuously for the whole program runtime.

:::

<details>
<summary>
<b>
Simple Blinking LED Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_led_t led;

  void application_init(void)
  {
      twr_led_init(&led, TWR_GPIO_LED, false, false);
      twr_led_set_mode(&led, TWR_LED_MODE_BLINK);
  }
  ```

</p>
</details>

:::info

This second example uses Core Module integrated Button to **switch the LED ON/OFF**.

Also, the LED will blink at the start of the program. This is useful for most firmware, it is a good indicator that the code started well.

:::

<details>
<summary>
<b>
Button Controlled LED Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  // LED instance
  twr_led_t led;

  twr_button_t button;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          twr_led_set_mode(&led, TWR_LED_MODE_TOGGLE);
      }
  }

  // Application initialization function which is called once after boot
  void application_init(void)
  {
      // Initialize LED
      twr_led_init(&led, TWR_GPIO_LED, false, 0);
      twr_led_pulse(&led, 2000);

      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, 0);
      twr_button_set_event_handler(&button, button_event_handler, NULL);
  }
  ```

</p>
</details>

