---
slug: how-to-relay-module
title: "Jak na: Relay Module"
---
import Image from '@theme/IdealImage';

Modulem [**Relay Module**](../../hardware-modules/about-relay-module.md) snadno ovládáte **obvody s vysokým napětím nebo proudem**. Modul je navržený speciálně pro nízkou spotřebu energie.

:::info

Relé spotřebovává energii pouze při změně stavu.

:::

## Odkazy {#references}
- [**Modul SDK pro Relay Module**](https://sdk.hardwario.com/group__twr__module__relay.html)
- Příklad v repozitáři na GitHubu

:::tip

Adresa I2C relé je v příkladu nastavená na `TWR_MODULE_RELAY_I2C_ADDRESS_DEFAULT`. Pokud chcete na jednom zařízení použít **druhý modul Relay Module**, použijte `TWR_MODULE_RELAY_I2C_ADDRESS_ALTERNATE`.

Na modulu Relay Module pak stačí připájet **0ohmový rezistor** na druhou pozici.

:::

## Příklad {#example}

:::info

V příkladu níže se relé na modulu **Relay Module** při každém stisknutí tlačítka na modulu **Core Module nebo Button Module** **zapne, nebo vypne**.

:::

<details>
<summary>
<b>
Příklad kódu: přepínání relé na modulu Relay Module
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_module_relay_t relay;
  twr_button_t button;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          twr_module_relay_toggle(&relay);
      }
  }

  void application_init(void)
  {
      twr_module_relay_init(&relay, TWR_MODULE_RELAY_I2C_ADDRESS_DEFAULT);
      twr_module_relay_set_state(&relay, false);

      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);
  }
  ```

</p>
</details>
