---
slug: how-to-relay-module
title: "Jak na to: Relay Module"
description: "S naším modulem Relay Module můžete snadno ovládat obvody s vysokým napětím/proudem. Tento modul je speciálně navržen tak, aby měl nízkou spotřebu energie."
---
import Image from '@theme/IdealImage';

S naším modulem [**Relay Module**](../../hardware-modules/about-relay-module.md) můžete snadno ovládat **obvody s vysokým napětím/proudem**. Tento modul je speciálně navržen tak, aby měl nízkou spotřebu energie.

:::info

Relé spotřebovává energii pouze při změně stavu.

:::

## Odkazy {#references}
- [**SDK modul Relay Module**](https://sdk.hardwario.com/group__twr__module__relay.html)
- Příklad v GitHub repozitáři

:::tip

V příkladu je I2C adresa relé nastavena jako `TWR_MODULE_RELAY_I2C_ADDRESS_DEFAULT`. Pokud chcete na jednom zařízení použít **druhý modul Relay Module**, můžete použít také `TWR_MODULE_RELAY_I2C_ADDRESS_ALTERNATE`.

Stačí jen připájet **0ohmový rezistor** do druhé pozice na modulu Relay Module.

:::

## Příklad {#example}

:::info

V příkladu níže se relé na modulu **Relay Module** **zapne/vypne** pokaždé, když stisknete tlačítko na modulu **Core Module nebo Button Module**.

:::

<details>
<summary>
<b>
Ukázkový kód pulzu pro Relay Module
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
