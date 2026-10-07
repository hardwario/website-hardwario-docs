---
slug: how-to-power-module
title: "Jak na: Power Module"
---
import Image from '@theme/IdealImage';

Modul Power Module nabízí dvě funkce:

- Ovládání výkonných spotřebičů robustním relé (230 V / 16 A)
- Připojení 5V adresovatelných LED (**WS2812B**) a jejich ovládání.

:::note

Tento návod popisuje **ovládání relé**. Ovládání LED pásku popisuje samostatná kapitola [**Smart LED Strip**](./smart-led-strip.md).

:::

## Odkazy {#references}
- [**Modul SDK pro Power Module**](https://sdk.hardwario.com/group__twr__module__power.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-radio-power-controller/blob/main/src/application.c)

:::info

V příkladu níže po inicializaci relé vypneme.
Stav pak přepínáme [**tlačítkem**](./push-button.md).

:::

<details>
<summary>
<b>
Příklad kódu: ovládání relé modulu Power Module
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_button_t button;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          twr_module_power_relay_set_state(!twr_module_power_relay_get_state());
      }
  }

  void application_init(void)
  {
      twr_module_power_init();
      twr_module_power_relay_set_state(false);

      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);
  }
  ```

</p>
</details>

:::info

Ovládání pásku [**Smart LED Strip**](./smart-led-strip.md) popisujeme v samostatném návodu.

:::
