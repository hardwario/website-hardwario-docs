---
slug: how-to-lcd-module
title: "How To: LCD modul"
description: "LCD modul poskytuje jednoduchý způsob, jak zobrazit potřebné informace bez připojení k počítači nebo jakékoli síti. Jde o zařízení s extrémně nízkou spotřebou, takže jeho použití by vám nemělo způsobovat problémy ani při napájení z baterií."
---
import Image from '@theme/IdealImage';

LCD modul **poskytuje jednoduchý způsob, jak zobrazit potřebné informace** bez připojení k počítači nebo jakékoli síti. Jde o **zařízení s extrémně nízkou spotřebou**, takže jeho použití by vám nemělo způsobovat problémy ani při napájení z baterií.

## Odkazy {#references}
- [**LCD SDK Module**](https://sdk.hardwario.com/group__twr__module__lcd.html)
- [**Příklad v GitHub repozitáři**](https://github.com/hardwario/twr-lcd-clock-with-stopwatch/blob/main/src/application.c)

:::info

Pro psaní a vykreslování na LCD jsou dostupné funkce, ale my máme [**pokročilejší řešení pomocí knihovny GFX**](./graphics-library.md).

Většina funkcí LCD používá knihovnu GFX interně, takže ji můžete používat i přímo.

:::

Vše, co musíte pro práci s LCD udělat, je inicializace. Po ní můžete začít používat knihovnu GFX.

## Napájení LCD modulu {#lcd-module-power}
Modul lze **zapnout** a **vypnout** kvůli úspoře energie (většinou se to používá k prodloužení výdrže baterií).

Pro správu napájení jsou dostupné dvě funkce
- `twr_module_lcd_on()`
- `twr_module_lcd_off()`

:::caution

Po vypnutí LCD musíte zavolat `twr_module_lcd_on()`, protože volání jakékoli funkce `draw` nebo `update` **LCD znovu nezapne**.

:::


## LED integrované v LCD {#lcd-integrated-leds}

LCD obsahuje **6 malých RGB LED**.

Můžete je ovládat standardními funkcemi `twr_led_*` [**ze SDK**](./led-control.md) hned po získání jejich driveru.

Pro získání driveru musíte použít funkci `const twr_led_driver_t* twr_module_lcd_get_led_driver(void)`, která vrací ukazatel na driver. Poté musíte inicializovat virtuální LED pomocí `void twr_led_init_virtual(twr_led_t *self, int channel, const twr_led_driver_t *driver, int idle_state)`.

Parametr `channel` odpovídá barvě LED:

- 0 je ČERVENÉ světlo
- 1 je ZELENÉ světlo
- 2 je MODRÉ světlo

Parametr `idle_state` nastavuje výchozí chování zapnuto/vypnuto.

- 0 znamená, že LED jsou **výchozím stavem zapnuté**
- 1 znamená, že LED jsou **výchozím stavem vypnuté**

:::info

Tento příklad vypíše na displej text a po stisknutí jakéhokoli tlačítka LCD rozsvítí LED na LCD **modrou barvou** po dobu **1500 milisekund**.

:::

<details>
<summary>
<b>
Příklad kódu pro LED na LCD
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

V tomto příkladu budeme zapínat a vypínat LED integrované v LCD a rozblikáme je.

Zapnete je **stisknutím levého tlačítka** a vypnete je **stisknutím pravého tlačítka**.

Pokud podržíte obě tlačítka, LED budou rychle blikat.

:::

<details>
<summary>
<b>
Příklad kódu pro tlačítka LCD
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
