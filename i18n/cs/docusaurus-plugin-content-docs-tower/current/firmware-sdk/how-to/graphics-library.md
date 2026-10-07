---
slug: how-to-gfx-graphics-library
title: "Jak na: Grafická knihovna"
---
import Image from '@theme/IdealImage';

Platforma TOWER podporuje stále víc typů LCD, a proto jsme vyvinuli **univerzální grafickou knihovnu**, kterou lze použít s mnoha typy displejů.

Funguje s naším modulem [**LCD Module**](../../hardware-modules/about-lcd-module.md), s displeji **SSD1306**, **ST7735** a **MAX7219**, a dokonce i s digitálním LED páskem [**WS2812B**](./smart-led-strip.md) zapojeným do matice jako displej.

## Odkazy {#references}
- [**Modul SDK pro GFX**](https://sdk.hardwario.com/group__twr__gfx.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-infra-grid-lcd-mirror/blob/main/src/application.c)


:::caution

Než vypíšete jakýkoli text, musíte vždy **nejdřív nastavit font**, jinak se nic nezobrazí. Nepoužité fonty se kvůli optimalizaci odstraňují.

Příklad: `twr_gfx_set_font(pgfx, &twr_font_ubuntu_13);`.

:::

## Příklady {#examples}

:::info

Každá změna, kterou uděláte (vykreslení textu nebo čáry, otočení displeje atd.), se **provede interně** a nic z toho není vidět, dokud nezavoláte funkci `twr_gfx_update(pgfx)`.

Je to tak kvůli nízké spotřebě.

:::

### [**LCD Module**](../../hardware-modules/about-lcd-module.md) {#lcd-module}

:::info

Jednoduchý příklad, který vypíše `Hello world` na [**modul LCD Module ze sady TOWER Kit**](../../hardware-modules/about-lcd-module.md).

:::

<details>
<summary>
<b>
Příklad kódu: GFX s modulem LCD Module
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

Příklad je podobný předchozímu, jen text vypisujeme na displej OLED SSD1303.

:::

<details>
<summary>
<b>
Příklad kódu: GFX s displejem OLED SSD1303
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

Pro speciální displej si můžete napsat i vlastní driver.

:::

Driver musí implementovat alespoň těchto 5 funkcí:

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
Příklad kódu: implementace vlastního driveru GFX
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
