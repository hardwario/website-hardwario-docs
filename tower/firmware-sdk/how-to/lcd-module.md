---
slug: how-to-lcd-module
title: "How To: LCD Module"
---
import Image from '@theme/IdealImage';

The LCD Module **provides a simple way to show needed information** without connecting to a computer or any network. It is an **ultra-low-power device** so its usage should not bring you much trouble when powered with batteries.

## References
- [**LCD SDK Module**](https://sdk.hardwario.com/group__twr__module__lcd.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-lcd-clock-with-stopwatch/blob/main/src/application.c)

:::info

There are functions available for writing and printing onto the LCD but we have a more [**advanced solution with the GFX library**](./graphics-library.md).

Most of the LCD functions use the GFX library internally so you can as well use them directly.

:::

All you need to do to work with the LCD is to do the initialization, after that, you can start using the GFX library.

## LCD Module Power
The module can be switched **on** and **off** for power saving (mostly used to prolong battery life when used).

There are two functions available for the power management
- `twr_module_lcd_on()`
- `twr_module_lcd_off()`

:::caution

You have to call the `twr_module_lcd_on()` after you turn the LCD off, calling any `draw` function or `update` **won't turn the LCD back on**.

:::


## LCD integrated LEDs

LCD includes **6 small RGB LEDs**.

You can control them with standard functions `twr_led_*` [**from SDK**](./led-control.md) right after you get their driver.

To get the driver you have to use function `const twr_led_driver_t* twr_module_lcd_get_led_driver(void)` which returns pointer to the driver. Then you have to init the virtual LED with `void twr_led_init_virtual(twr_led_t *self, int channel, const twr_led_driver_t *driver, int idle_state)`.

The `channel` parameter is equal to the LED color:

- 0 is RED light
- 1 is GREEN light
- 2 is BLUE light

The `idle_state` sets the default on/off behavior.

- 0 means that LEDs are **default on**
- 1 means that LEDs are **default off**

:::info

This example prints out some text on the screen and lights up LCD LEDs with **blue color** for **1500 milliseconds** after any LCD button is pressed.

:::

<details>
<summary>
<b>
LCD LEDs Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_button_t button;
  twr_led_t lcdLed;

  twr_gfx_t *pgfx;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          twr_led_pulse(&lcdLed, 1500);

          char hello[6] = "Hello";
          twr_gfx_draw_string(pgfx, 10, 5, hello, true);
          twr_gfx_draw_line(pgfx, 0, 21, 128, 23, true);

          twr_gfx_update(pgfx);
      }
  }

  void application_init(void)
  {
      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);

      const twr_led_driver_t* driver = twr_module_lcd_get_led_driver();
      twr_led_init_virtual(&lcdLed, TWR_MODULE_LCD_LED_BLUE, driver, 1);

      twr_module_lcd_init();
      pgfx = twr_module_lcd_get_gfx();
      twr_gfx_set_font(pgfx, &twr_font_ubuntu_15);
  }
  ```

</p>
</details>

### LCD Buttons

:::info

In this example, we are going to switch the LCD-integrated LEDs on and off and make them blink.

You can switch them **on by pressing the left button** and switch them **off by pressing the right button**.

If you hold both buttons, the LEDs will blink fast.

:::

<details>
<summary>
<b>
LCD Buttons Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_led_t lcdLed;

  void lcd_event_handler(twr_module_lcd_event_t event, void *param)
  {
      (void) param;

      if (event == TWR_MODULE_LCD_EVENT_LEFT_CLICK)
      {
          twr_led_set_mode(&lcdLed, TWR_LED_MODE_ON);
      }
      else if (event == TWR_MODULE_LCD_EVENT_RIGHT_CLICK)
      {
        twr_led_set_mode(&lcdLed, TWR_LED_MODE_OFF);
      }
      else if (event == TWR_MODULE_LCD_EVENT_BOTH_HOLD)
      {
          twr_led_set_mode(&lcdLed, TWR_LED_MODE_BLINK_FAST);
      }
  }

  void application_init(void)
  {
      const twr_led_driver_t* driver = twr_module_lcd_get_led_driver();
      twr_led_init_virtual(&lcdLed, 2, driver, 1);

      twr_led_set_mode(&lcdLed, TWR_LED_MODE_OFF);
      twr_led_pulse(&lcdLed, 1000);

      twr_module_lcd_init();
      twr_module_lcd_set_event_handler(lcd_event_handler, NULL);
  }
  ```

</p>
</details>
