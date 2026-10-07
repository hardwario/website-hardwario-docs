---
slug: how-to-pir-module
title: "How To: PIR Module"
---
import Image from '@theme/IdealImage';

The [**PIR module**](../../hardware-modules/about-pir-module.md) is mostly used as a **motion detector**. Thanks to its low power consumption it can safely be used with **batteries acting as the only power source**.

## References
- [**PIR SDK Module**](https://sdk.hardwario.com/group__twr__module__pir.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-sdk/blob/master/_examples/pir/application.c)

## Sensitivity

SDK offers you **four types of sensitivity** defined as enum type, so you can use simple names:

- `TWR_MODULE_PIR_SENSITIVITY_LOW`
- `TWR_MODULE_PIR_SENSITIVITY_MEDIUM`
- `TWR_MODULE_PIR_SENSITIVITY_HIGH`
- `TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH`

It is very hard to predict how exactly the PIR sensor will act in your particular use case, it is **always a good idea to test every type of sensitivity** to find out which one to use for the best results.

## Example

:::info

This example uses **Medium sensitivity**. When movement is detected, the message **Movement detected!** is sent to your computer via USB.

:::

<details>
<summary>
<b>
Motion Detection Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_module_pir_t pir;
  twr_button_t button;

  void pir_event_handler(twr_module_pir_t *self, twr_module_pir_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_MODULE_PIR_EVENT_MOTION)
      {
          twr_log_debug("Movement detected!");
      }
  }

  void application_init(void)
  {
      twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_ABS);

      twr_module_pir_init(&pir);
      twr_module_pir_set_sensitivity(&pir, TWR_MODULE_PIR_SENSITIVITY_MEDIUM);
      twr_module_pir_set_event_handler(&pir, pir_event_handler, NULL);
  }
  ```

</p>
</details>
