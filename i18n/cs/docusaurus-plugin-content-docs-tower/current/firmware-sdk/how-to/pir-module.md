---
slug: how-to-pir-module
title: "Jak na to: PIR Module"
description: "PIR module se nejčastěji používá jako detektor pohybu. Díky nízké spotřebě jej lze bezpečně používat s bateriemi jako jediným zdrojem napájení."
---
import Image from '@theme/IdealImage';

[**PIR module**](../../hardware-modules/about-pir-module.md) se nejčastěji používá jako **detektor pohybu**. Díky nízké spotřebě jej lze bezpečně používat s **bateriemi jako jediným zdrojem napájení**.

## Odkazy {#references}
- [**PIR SDK Module**](https://sdk.hardwario.com/group__twr__module__pir.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-sdk/blob/master/_examples/pir/application.c)

## Citlivost {#sensitivity}

SDK nabízí **čtyři úrovně citlivosti** definované jako výčtový typ, takže lze používat jednoduché názvy:

- `TWR_MODULE_PIR_SENSITIVITY_LOW`
- `TWR_MODULE_PIR_SENSITIVITY_MEDIUM`
- `TWR_MODULE_PIR_SENSITIVITY_HIGH`
- `TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH`

Je velmi těžké předpovědět, jak přesně se bude PIR senzor chovat ve vašem konkrétním případě použití, proto je **vždy dobré vyzkoušet každou úroveň citlivosti** a zjistit, která přinese nejlepší výsledky.

## Příklad {#example}

:::info

Tento příklad používá **střední citlivost**. Při detekci pohybu se do počítače přes USB odešle zpráva **Movement!**.

:::

<details>
<summary>
<b>
Ukázkový kód detekce pohybu
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
