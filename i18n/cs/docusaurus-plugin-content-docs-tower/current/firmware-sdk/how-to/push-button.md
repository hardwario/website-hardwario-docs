---
slug: how-to-push-button
title: "Návod: Tlačítko"
description: "Core Module je vybaven jedním tlačítkem, které lze použít, pokud na modulu Core Module není nasazen žádný další modul – jinak je poměrně těžko dostupné."
---
import Image from '@theme/IdealImage';

[**Core Module**](../../hardware-modules/about-core-module.md) je vybaven jedním tlačítkem, které lze použít, pokud na modulu Core Module není nasazen žádný další modul – jinak je poměrně těžko dostupné.

Pokud chcete tlačítko používat i v případě, že se k modulu Core Module nedostanete, můžete využít [**Button Module**](../../hardware-modules//about-button-module.md)

:::note

Tento návod ukazuje, jak pracovat s integrovaným tlačítkem nebo modulem Button Module, ale lze jej použít i pro vaše vlastní tlačítka či spínače.

:::

## Odkazy {#references}
- [**Push Button SDK Module**](https://sdk.hardwario.com/group__twr__button.html)
- [**Příklad v GitHub repozitáři**](https://github.com/hardwario/twr-sdk/blob/master/_examples/button/application.c)


## Příklad {#example}

:::info

V příkladu níže je tlačítko inicializováno s funkcí `button_event_handler` jako obsluhou. Ta bude volána pokaždé, když na tlačítkovém modulu nastane událost.

Při stisknutí tlačítka se LED na modulu Core Module zhasne.

Pokud tlačítko podržíte 1,5 sekundy, LED na modulu Core Module začne rychle blikat.

:::

<details>
<summary>
<b>
Příklad kódu pro tlačítko
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
