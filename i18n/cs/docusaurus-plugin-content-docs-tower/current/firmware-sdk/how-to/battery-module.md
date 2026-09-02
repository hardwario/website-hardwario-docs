---
slug: how-to-battery-module
title: "How To: Battery Module"
description: "Battery Module a Mini Battery Module umožňují napájet váš produkt čtyřmi nebo dvěma bateriemi AAA."
---
import Image from '@theme/IdealImage';

[**Battery Module**](../../hardware-modules/about-battery-module.md) a [**Mini Battery Module**](../../hardware-modules/about-mini-battery-module.md) umožňují napájet váš produkt **čtyřmi** nebo **dvěma bateriemi AAA**.
Modul automaticky rozpozná, že je připojeno externí napájení (AC modul, USB, …), a odpojí baterie od obvodu.

S tímto modulem můžete kontrolovat napětí baterií (**ručně** nebo **periodicky**) a naplánovat vhodné akce pro určité úrovně napětí.

## Odkazy {#references}
- [**Battery SDK Module**](https://sdk.hardwario.com/group__twr__module__battery.html)
- Příklad v GitHub repozitáři

## Prahové hodnoty modulu Battery Module {#battery-module-thresholds}

SDK nabízí dvě **prahové hodnoty** úrovně napětí:

```
TWR_MODULE_BATTERY_EVENT_LEVEL_LOW
TWR_MODULE_BATTERY_EVENT_LEVEL_CRITICAL
```

:::tip

  Tyto prahové hodnoty můžete využít k tomu, abyste se sami upozornili, že zařízení bude mít brzy vybité baterie, a nemuseli se starat o občasnou kontrolu napětí.

:::

:::info

  V tomto příkladu se napětí a úroveň nabití pošlou do vašeho počítače přes USB vždy, když stisknete tlačítko na modulu Core Module.

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

  A pokud je úroveň napětí kritická, pošle se přes rádio zpráva **"CRITICAL"**.

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
