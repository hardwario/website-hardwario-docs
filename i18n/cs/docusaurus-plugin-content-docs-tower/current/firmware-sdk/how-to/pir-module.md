---
slug: how-to-pir-module
title: "Jak na: PIR Module"
---
import Image from '@theme/IdealImage';

Modul [**PIR Module**](../../hardware-modules/about-pir-module.md) se nejčastěji používá jako **detektor pohybu**. Díky nízké spotřebě ho můžete bez obav napájet **jen z baterií**.

## Odkazy {#references}
- [**Modul SDK pro PIR Module**](https://sdk.hardwario.com/group__twr__module__pir.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-sdk/blob/master/_examples/pir/application.c)

## Citlivost {#sensitivity}

SDK nabízí **čtyři úrovně citlivosti** definované jako výčtový typ, takže lze používat jednoduché názvy:

- `TWR_MODULE_PIR_SENSITIVITY_LOW`
- `TWR_MODULE_PIR_SENSITIVITY_MEDIUM`
- `TWR_MODULE_PIR_SENSITIVITY_HIGH`
- `TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH`

Jak přesně se bude senzor PIR v konkrétní situaci chovat, se dá jen těžko předpovědět. Proto je **vždy dobré vyzkoušet všechny úrovně citlivosti** a vybrat tu, která funguje nejlépe.

## Příklad {#example}

:::info

Tento příklad používá **střední citlivost**. Při detekci pohybu se do počítače přes USB odešle zpráva **Movement detected!**.

:::

<details>
<summary>
<b>
Příklad kódu: detekce pohybu
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
