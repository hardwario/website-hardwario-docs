---
slug: how-to-lcd-module
title: "Jak na: LCD Module"
---
import Image from '@theme/IdealImage';

Modul LCD Module **jednoduše zobrazí potřebné informace** bez připojení k počítači nebo k jakékoli síti. Má **ultranízkou spotřebu**, takže s ním nebudete mít potíže ani při napájení z baterií.

## Odkazy {#references}
- [**Modul SDK pro LCD Module**](https://sdk.hardwario.com/group__twr__module__lcd.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-lcd-clock-with-stopwatch/blob/main/src/application.c)

:::info

Pro psaní a kreslení na LCD existují samostatné funkce, máme ale i [**pokročilejší řešení s knihovnou GFX**](./graphics-library.md).

Většina funkcí LCD používá knihovnu GFX interně, takže ji můžete používat i přímo.

:::

Pro práci s LCD stačí modul inicializovat a pak už můžete používat knihovnu GFX.

## Napájení modulu LCD Module {#lcd-module-power}
Modul lze kvůli úspoře energie **zapnout** a **vypnout** (hlavně kvůli delší výdrži baterií).

Napájení řídí dvě funkce:
- `twr_module_lcd_on()`
- `twr_module_lcd_off()`

:::caution

Vypnutý LCD musíte znovu zapnout funkcí `twr_module_lcd_on()`; volání funkcí `draw` nebo `update` **LCD znovu nezapne**.

:::


## LED integrované v LCD {#lcd-integrated-leds}

Modul LCD má **6 malých LED RGB**.

Jakmile získáte jejich driver, ovládáte je standardními funkcemi `twr_led_*` [**ze SDK**](./led-control.md).

Driver získáte funkcí `const twr_led_driver_t* twr_module_lcd_get_led_driver(void)`, která vrací ukazatel na driver. Pak inicializujte virtuální LED funkcí `void twr_led_init_virtual(twr_led_t *self, int channel, const twr_led_driver_t *driver, int idle_state)`.

Parametr `channel` odpovídá barvě LED:

- 0 je červené světlo
- 1 je zelené světlo
- 2 je modré světlo

Parametr `idle_state` určuje, jestli jsou LED ve výchozím stavu zapnuté, nebo vypnuté:

- 0 znamená, že LED jsou **ve výchozím stavu zapnuté**
- 1 znamená, že LED jsou **ve výchozím stavu vypnuté**

:::info

Tento příklad vypíše na displej text a po stisknutí kteréhokoli tlačítka modulu LCD rozsvítí jeho LED **modře** na **1500 milisekund**.

:::

<details>
<summary>
<b>
Příklad kódu: LED na modulu LCD
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

### Tlačítka LCD {#lcd-buttons}

:::info

V tomto příkladu budeme LED integrované v modulu LCD zapínat, vypínat a rozblikávat.

Zapnete je **stisknutím levého tlačítka** a vypnete je **stisknutím pravého tlačítka**.

Pokud podržíte obě tlačítka, LED budou rychle blikat.

:::

<details>
<summary>
<b>
Příklad kódu: tlačítka modulu LCD
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
