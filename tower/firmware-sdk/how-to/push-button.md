---
slug: how-to-push-button
title: "How To: Push Button"
---
import Image from '@theme/IdealImage';

[**The Core Module**](../../hardware-modules/about-core-module.md) comes with one button that can be used when there is no other module on top of the Core Module, otherwise, it is pretty hard to reach.

If you want to use the button even when you can't reach the Core Module, you can use [**Button Module**](../../hardware-modules//about-button-module.md).

:::note

This tutorial shows how to work with an integrated button or Button Module, but it can be used for your buttons or switches.

:::

## References
- [**Push Button SDK Module**](https://sdk.hardwario.com/group__twr__button.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-sdk/blob/master/_examples/button/application.c)


## Example

:::info

In the example below, the button is initialized with the `button_event_handler` function as a handler. It will be called every time an event occurs on the button module.

If the button is pressed, the LED on Core Module will be turned off.

If the button is held for 1.5 seconds, the LED on Core Module will start blinking fast.

:::

<details>
<summary>
<b>
Push Button Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_led_t led;
  twr_button_t button;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          twr_led_set_mode(&led, TWR_LED_MODE_OFF);
      } else if (event == TWR_BUTTON_EVENT_HOLD ) {
          twr_led_set_mode(&led, TWR_LED_MODE_BLINK_FAST);
      }
  }

  void application_init(void)
  {
      // Initialize LED
      twr_led_init(&led, TWR_GPIO_LED, false, false);
      twr_led_set_mode(&led, TWR_LED_MODE_OFF);

      // Initialize button
      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN,0);
      twr_button_set_event_handler(&button, button_event_handler, NULL);

      // Set HOLD time
      twr_button_set_hold_time(&button, 1500);
  }
  ```

</p>
</details>
