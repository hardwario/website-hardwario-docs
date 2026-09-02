---
slug: how-to-gpio-pins
title: "Jak na: GPIO piny"
description: "Pro propojení modulu Core Module s okolním světem můžete využít mnoho GPIO pinů (General Purpose Input/Output piny)."
---
import Image from '@theme/IdealImage';

Pro propojení modulu Core Module s okolním světem můžete využít mnoho **GPIO pinů** (**G**eneral **P**urpose **I**nput/**O**utput piny).
Piny jsou popsané v Header Pinout. V SDK mají piny názvy `TWR_GPIO_P0` až `TWR_GPIO_P17`. Existují také dva speciální piny určené pro `TWR_GPIO_LED` a `TWR_GPIO_BUTTON`.

## Odkazy {#references}
- [**GPIO SDK Module**](https://sdk.hardwario.com/group__twr__gpio.html)
- Příklad v repozitáři na GitHubu

:::info

Tento příklad rozsvítí **LED na modulu Core Module**. Běžnější a pohodlnější způsob ovládání LED je použít kód [**`twr_led`**](./led-control.md), ale zde používáme `twr_gpio`, abychom vysvětlili **základy GPIO**.

:::

<details>
<summary>
<b>
Příklad kódu: GPIO jako výstup
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  void application_init(void)
  {
      twr_gpio_init(TWR_GPIO_LED);
      twr_gpio_set_mode(TWR_GPIO_LED, TWR_GPIO_MODE_OUTPUT);
      twr_gpio_set_output(TWR_GPIO_LED, 1);
  }
  ```

</p>
</details>

:::info

Tento příklad **přečte stav tlačítka** a podle něj se **LED nastaví do stavu ON/OFF**.

:::

<details>
<summary>
<b>
Příklad kódu: GPIO jako vstup a výstup
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  void application_init(void)
  {
      twr_gpio_init(TWR_GPIO_LED);
      twr_gpio_set_mode(TWR_GPIO_LED, TWR_GPIO_MODE_OUTPUT);

      twr_gpio_init(TWR_GPIO_BUTTON);
      twr_gpio_set_mode(TWR_GPIO_BUTTON, TWR_GPIO_MODE_INPUT);

      // The Core Module has hardware pull-down so next call is commented out
      // twr_gpio_set_pull(TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN);
  }

  void application_task()
  {
      uint8_t button_state = twr_gpio_get_input(TWR_GPIO_BUTTON);
      twr_gpio_set_output(TWR_GPIO_LED, button_state);

      // Repeat this task again after 10 ms
      twr_scheduler_plan_current_relative(10);
  }
  ```

</p>
</details>
