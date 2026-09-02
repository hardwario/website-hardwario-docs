---
slug: how-to-power-module
title: "How To: Power Module"
description: "Modul Power nabízí dvě funkce:"
---
import Image from '@theme/IdealImage';

Modul Power nabízí dvě funkce:

- Ovládání výkonového zařízení robustním relé (230 V / 16 A)
- Připojení 5V adresovatelných LED (**WS2812B**) a jejich ovládání.

:::note

Tento návod se zabývá **ovládáním relé**. Pokud se chcete dozvědět o ovládání LED pásku, podívejte se na samostatnou kapitolu [**Smart LED Strip**](./smart-led-strip.md).

:::

## Odkazy {#references}
- [**Modul Power v SDK**](https://sdk.hardwario.com/group__twr__module__power.html)
- [**Příklad v GitHub repozitáři**](https://github.com/hardwario/twr-radio-power-controller/blob/main/src/application.c)

:::info

V níže uvedeném příkladu nastavíme relé po inicializaci do vypnutého stavu.
Ke přepnutí stavu použijeme [**tlačítko**](./push-button.md).

:::

<details>
<summary>
<b>
Příklad kódu pro ovládání relé modulu Power
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

Ovládání [**Smart LED pásku**](./smart-led-strip.md) popisujeme v samostatném návodu.

:::
