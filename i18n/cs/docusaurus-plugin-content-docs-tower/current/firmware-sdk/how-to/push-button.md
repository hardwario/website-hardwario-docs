---
slug: how-to-push-button
title: "Jak na: Tlačítko"
---
import Image from '@theme/IdealImage';

Modul [**Core Module**](../../hardware-modules/about-core-module.md) má jedno tlačítko. Dobře se k němu dostanete, jen když na modulu Core Module není nasazený žádný další modul; jinak je špatně dostupné.

Pokud chcete tlačítko používat, i když se k modulu Core Module nedostanete, použijte modul [**Button Module**](../../hardware-modules//about-button-module.md).

:::note

Tento návod ukazuje, jak pracovat s integrovaným tlačítkem nebo s modulem Button Module; stejný postup ale platí i pro vlastní tlačítka nebo spínače.

:::

## Odkazy {#references}
- [**Modul SDK pro tlačítko**](https://sdk.hardwario.com/group__twr__button.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-sdk/blob/master/_examples/button/application.c)


## Příklad {#example}

:::info

V příkladu níže se tlačítko inicializuje s obslužnou funkcí `button_event_handler`. Ta se zavolá pokaždé, když na tlačítku nastane nějaká událost.

Při stisknutí tlačítka se LED na modulu Core Module zhasne.

Pokud tlačítko podržíte 1,5 sekundy, LED na modulu Core Module začne rychle blikat.

:::

<details>
<summary>
<b>
Příklad kódu: tlačítko
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
