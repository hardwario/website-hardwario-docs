---
slug: how-to-led-control
title: "Jak na: Ovládání LED"
---
import Image from '@theme/IdealImage';

Ovládání **LED integrované na modulu Core Module** je obdoba programu `Hello world`. V této kapitole si ukážeme několik jednoduchých příkladů.

## Odkazy {#references}
- [**Modul SDK pro LED**](https://sdk.hardwario.com/group__twr__led.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-sdk/blob/master/_examples/led-on-off/application.c)

:::info

V tomto jednoduchém příkladu se LED inicializuje a pak bliká po celou dobu běhu programu.

:::

<details>
<summary>
<b>
Příklad kódu: blikající LED
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

Druhý příklad **zapíná a vypíná LED** tlačítkem integrovaným na modulu Core Module.

Po startu programu LED navíc blikne. To se hodí u většiny firmwarů, protože je to dobrý signál, že se kód správně spustil.

:::

<details>
<summary>
<b>
Příklad kódu: LED ovládaná tlačítkem
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
