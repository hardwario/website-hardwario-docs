---
slug: how-to-gfx-graphics-library
title: "How To: Grafická knihovna"
description: "Protože brána TOWER podporuje stále více typů LCD, vyvinuli jsme univerzální grafickou knihovnu, kterou lze použít s mnoha typy displejů."
---
import Image from '@theme/IdealImage';

Protože brána TOWER podporuje stále více typů LCD, vyvinuli jsme **univerzální grafickou knihovnu**, kterou lze použít s mnoha typy displejů.

Počínaje naším [**LCD Modulem**](../../hardware-modules/about-lcd-module.md), přes **SSD1306**, **ST7735**, **MAX7219** nebo dokonce použitím digitálního LED pásku [**WS2812B**](./smart-led-strip.md) v maticové konfiguraci jako displeje.

## Odkazy {#references}
- [**GFX SDK Module**](https://sdk.hardwario.com/group__twr__gfx.html)
- [**Příklad v GitHub repozitáři**](https://github.com/hardwario/twr-infra-grid-lcd-mirror/blob/main/src/application.c)


:::caution

Před vypsáním jakéhokoli textu musíte vždy **nejprve nastavit font**. Jinak se nic nezobrazí. Nepoužité fonty jsou z důvodu optimalizace odstraněny.

Příklad: `twr_gfx_set_font(pgfx, &twr_font_ubuntu_13);`.

:::

## Příklady {#examples}

:::info

Každá změna, kterou provedete – vykreslení textu nebo linky, rotace displeje atd. – se **provádí interně** a žádné změny nejsou vidět, dokud nezavoláte funkci `twr_gfx_update(pgfx)`.

Je to tak navrženo z důvodu nízké spotřeby.

:::

### [**LCD Modul**](../../hardware-modules/about-lcd-module.md) {#lcd-module}

:::info

Toto je jednoduchý příklad výpisu `Hello world` na [**LCD Modul, který je dostupný pro TOWER Kit**](../../hardware-modules/about-lcd-module.md).

:::

<details>
<summary>
<b>
Příklad kódu použití GFX s LCD Modulem
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

### SSD1303 OLED {#ssd1303-oled}

:::info

Toto je příklad podobný předchozímu, ale zde k výpisu textu používáme OLED displej SSD1303.

:::

<details>
<summary>
<b>
Příklad kódu použití GFX s OLED SSD1303
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

### Vlastní GFX driver {#custom-gfx-driver}

:::info

Můžete si také vytvořit vlastní driver pro nějaký speciální displej, který chcete použít.

:::

Driver musí implementovat alespoň těchto 5 funkcí.

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
Příklad kódu implementace vlastního GFX driveru
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
