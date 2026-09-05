---
slug: how-to-gfx-graphics-library
title: "How To: Graphics Library"
---
import Image from '@theme/IdealImage';

With more and more types of LCD types supported by TOWER, we have developed a **universal graphics library** that can be used with many types of displays.

Starting with our [**LCD Module**](../../hardware-modules/about-lcd-module.md), **SSD1306**, **ST7735**, **MAX7219** or even using [**WS2812B**](./smart-led-strip.md) digital LED strip in matrix configuration as a display.

## References
- [**GFX SDK Module**](https://sdk.hardwario.com/group__twr__gfx.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-infra-grid-lcd-mirror/blob/main/src/application.c)


:::caution

You always have to **set the font first** before printing any text. Otherwise, nothing is displayed. Not used fonts are removed for optimization.

Example: `twr_gfx_set_font(pgfx, &twr_font_ubuntu_13);`.

:::

## Examples

:::info

Every change you make (draw a string or a line, rotate the display, etc.) is **done internally** and no changes are visible until you call the `twr_gfx_update(pgfx)` function.

This is done for low-power reasons.

:::

### [**LCD Module**](../../hardware-modules/about-lcd-module.md)

:::info

This is a simple example of printing `Hello world` to the [**LCD Module that is available for TOWER Kit**](../../hardware-modules/about-lcd-module.md).

:::

<details>
<summary>
<b>
Using GFX with LCD Module Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  // Pointer to GFX instance
  twr_gfx_t *pgfx;

  void application_init(void)
  {
      // LCD Module
      twr_module_lcd_init();
      pgfx = twr_module_lcd_get_gfx();

      twr_gfx_set_font(pgfx, &twr_font_ubuntu_13);
      twr_gfx_draw_string(pgfx, 50, 50, "Hello world", true);
      twr_gfx_update(pgfx);
  }
  ```

</p>
</details>

### SSD1303 OLED

:::info

This is a similar example to the last one, but here we use the SSD1303 OLED display for printing the string.

:::

<details>
<summary>
<b>
Using GFX with SSD1303 OLED Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_gfx_t gfx;
  twr_ssd1306_t ssd1306;
  TWR_SSD1306_FRAMEBUFFER(ssd1306_framebuffer, 128, 64)

  void application_init(void)
  {
      twr_ssd1306_init(&ssd1306, TWR_I2C_I2C0, TWR_SSD1306_ADDRESS_I2C_ADDRESS_DEFAULT, &ssd1306_framebuffer);
      twr_gfx_init(&gfx, &ssd1306, twr_ssd1306_get_driver());

      twr_gfx_set_font(&gfx, &twr_font_ubuntu_13);
      twr_gfx_draw_string(&gfx, 50, 50, "Hello world", true);
      twr_gfx_update(&gfx);
  }
  ```

</p>
</details>

### Custom GFX Driver

:::info

You can also create your driver for some special display that you want to use.

:::

The driver needs to implement at least these 5 functions.

```c showLineNumbers
#include <application.h>

twr_gfx_t gfx;
twr_ssd1306_t ssd1306;
TWR_SSD1306_FRAMEBUFFER(ssd1306_framebuffer, 128, 64)

void application_init(void)
{
    twr_ssd1306_init(&ssd1306, TWR_I2C_I2C0, TWR_SSD1306_ADDRESS_I2C_ADDRESS_DEFAULT, &ssd1306_framebuffer);
    twr_gfx_init(&gfx, &ssd1306, twr_ssd1306_get_driver());

    twr_gfx_set_font(&gfx, &twr_font_ubuntu_13);
    twr_gfx_draw_string(&gfx, 50, 50, "Hello world", true);
    twr_gfx_update(&gfx);
}
```

<details>
<summary>
<b>
Custom GFX Driver Implementation Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  bool led_matrix_is_ready(void *param)
  {
      return true;
  }

  void led_matrix_clear(void *param)
  {
      memset(framebuffer, 0x00, sizeof(framebuffer));
  }

  void led_matrix_draw_pixel(void *param, uint8_t x, uint8_t y, uint32_t enabled)
  {
      uint8_t sub = LED_MODULES_COUNT-1;

      if(enabled)
      {
          framebuffer[(sub - (x / 8)) + (8-y) * LED_MODULES_COUNT] |= 1 << (x % 8);
      }
      else
      {
          framebuffer[(sub - (x / 8)) + (8-y) * LED_MODULES_COUNT] &= ~(1 << (x % 8));
      }
  }

  twr_gfx_caps_t led_matrix_get_caps(twr_ls013b7dh03_t *self)
  {
      (void) self;
      static const twr_gfx_caps_t caps = { .width = 32, .height = 8 };
      return caps;
  }

  const twr_gfx_driver_t *led_matrix_get_driver(void)
  {
      static const twr_gfx_driver_t driver =
      {
          .is_ready = (bool (*)(void *)) led_matrix_is_ready,
          .clear = (void (*)(void *)) led_matrix_clear,
          .draw_pixel = (void (*)(void *, int, int, uint32_t)) led_matrix_draw_pixel,
          .update = (bool (*)(void *)) led_matrix_update,
          .get_caps = (twr_gfx_caps_t (*)(void *)) led_matrix_get_caps
      };

      return &driver;
  }
  ```

</p>
</details>
