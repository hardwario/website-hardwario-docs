---
slug: how-to-battery-module
title: "Jak na: Battery Module"
---
import Image from '@theme/IdealImage';

Moduly [**Battery Module**](../../hardware-modules/about-battery-module.md) a [**Mini Battery Module**](../../hardware-modules/about-mini-battery-module.md) napájejí váš produkt ze **čtyř**, resp. **dvou baterií AAA**.
Modul automaticky rozpozná, že je připojeno externí napájení (AC modul, USB, …), a odpojí baterie od obvodu.

S tímto modulem můžete kontrolovat napětí baterií (**ručně**, nebo **pravidelně**) a při určitých úrovních napětí spustit vhodné akce.

## Odkazy {#references}
- [**Modul SDK pro Battery Module**](https://sdk.hardwario.com/group__twr__module__battery.html)
- Příklad v repozitáři na GitHubu

## Prahové hodnoty modulu Battery Module {#battery-module-thresholds}

SDK nabízí dvě **prahové hodnoty** úrovně napětí:

```
TWR_MODULE_BATTERY_EVENT_LEVEL_LOW
TWR_MODULE_BATTERY_EVENT_LEVEL_CRITICAL
```

:::tip

  Podle těchto prahových hodnot se můžete nechat upozornit, že se baterie v zařízení brzy vybijí, a nemusíte napětí průběžně kontrolovat.

:::

:::info

  V tomto příkladu se napětí a úroveň nabití pošlou do počítače přes USB pokaždé, když stisknete tlačítko na modulu Core Module.

:::

## Příklady {#examples}

<details>
<summary>
<b>
Příklad kódu: napětí přes USB
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
          twr_module_battery_measure();

          float voltage = 0.0;
          twr_module_battery_get_voltage(&voltage);

          int chargePercentage = -1;
          twr_module_battery_get_charge_level(&chargePercentage);

          twr_log_debug("Voltage %.3f", voltage);
          twr_log_debug("Charge: %d", chargePercentage);
      }
  }

  void application_init(void)
  {
      twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_ABS);

      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);

      twr_module_battery_init();
  }
  ```

</p>
</details>

:::info

  V tomto příkladu se napětí posílá přes rádio každých 60 minut.

  Pokud je napětí kritické, odešle se přes rádio i zpráva **„CRITICAL“**.

:::

<details>
<summary>
<b>
Příklad kódu: napětí periodicky přes rádio
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  #define BATTERY_UPDATE_INTERVAL (60 * 60 * 1000)

  void battery_event_handler(twr_module_battery_event_t event, void *event_param)
  {
      (void) event;
      (void) event_param;

      float voltage;

      if (event == TWR_MODULE_BATTERY_EVENT_UPDATE)
      {
          if (twr_module_battery_get_voltage(&voltage))
          {
              twr_radio_pub_battery(&voltage);
          }
      }
      if(event == TWR_MODULE_BATTERY_EVENT_LEVEL_CRITICAL)
      {
          twr_radio_pub_string("battery/level", "CRITICAL")
      }
  }

  void application_init(void)
  {
      twr_module_battery_init();
      twr_module_battery_set_event_handler(battery_event_handler, NULL);
      twr_module_battery_set_update_interval(BATTERY_UPDATE_INTERVAL);

      // Initialize radio
      twr_radio_init(TWR_RADIO_MODE_NODE_SLEEPING);
      twr_radio_pairing_request("battery-example", VERSION);
  }

  ```

</p>
</details>
