---
slug: how-to-analog-digital-converter
title: "Návod: Analogově-digitální převodník"
description: "Analogově-digitální převodník umí měřit napětí na jednom ze šesti vstupů A0 až A5 a vrátit naměřenou hodnotu. Výsledkem může být 16bitová hodnota nebo číslo typu float ve voltech."
---
import Image from '@theme/IdealImage';

Analogově-digitální převodník umí měřit napětí na jednom ze šesti vstupů **`A0`** až **`A5`** a vrátit naměřenou hodnotu. Výsledkem může být **`16bitová`** hodnota nebo číslo typu **`float`** ve voltech.

## Odkazy {#references}
- [**Modul ADC v SDK**](https://sdk.hardwario.com/group__twr__adc.html)
- Ukázka v repozitáři na GitHubu

## Typy vzorkování {#sampling-types}

Každý kanál lze nastavit na **jiné rozlišení a převzorkování**.

Bez ohledu na to, jaké rozlišení zvolíte (**6, 8, 10, 12**), je výsledek vždy převeden na **16bitovou** hodnotu v rozsahu **0-65535**.
V asynchronním režimu můžete hodnotu získat i přímo ve voltech v datovém typu **float**.

Vzorkování může být **synchronní** a **asynchronní**.

## Synchronní vzorkování {#synchronous-sampling}

:::info

  Během synchronního měření je kód **blokovaný, dokud měření neskončí**.

:::

<details>
<summary>
<b>
Ukázka kódu pro synchronní vzorkování
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  void application_init(void)
  {
      twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_OFF);

      twr_adc_init();
  }

  void application_task()
  {
      uint16_t adc;

      twr_adc_get_value(TWR_ADC_CHANNEL_A2, &adc);
      twr_log_debug("%d", adc);

      twr_scheduler_plan_current_relative(200);
  }
  ```

</p>
</details>

## Asynchronní vzorkování {#asynchronous-sampling}

:::info

  Asynchronní vzorkování **není blokující** a **běží na pozadí**.

  Jakmile je výsledek k dispozici, zavolá se vaše callback funkce. Je možné **spustit více kanálů**, plánovač navzorkuje každý kanál a zavolá callback **pro každý kanál zvlášť**.

:::

<details>
<summary>
<b>
Ukázka kódu pro asynchronní vzorkování
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  static void _adc_event_handler(twr_adc_channel_t channel, twr_adc_event_t event, void *param)
  {
      (void) channel;
      (void) param;

      if (event == TWR_ADC_EVENT_DONE)
      {
          uint16_t adc;
          twr_adc_async_get_value(TWR_ADC_CHANNEL_A2, &adc);
          twr_log_debug("%d", adc);

          float voltage;
          twr_adc_get_result_voltage(TWR_ADC_CHANNEL_A2, &voltage);
          twr_log_debug("%f", voltage);
      }
  }

  void application_init(void)
  {
      twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_OFF);

      twr_adc_init();
      twr_adc_set_event_handler(TWR_ADC_CHANNEL_A2, _adc_event_handler, NULL);
      twr_adc_resolution_set(TWR_ADC_CHANNEL_A2, TWR_ADC_RESOLUTION_12_BIT);
      twr_adc_oversampling_set(TWR_ADC_CHANNEL_A2, TWR_ADC_OVERSAMPLING_256);
  }

  void application_task()
  {
      twr_adc_async_measure(TWR_ADC_CHANNEL_A2);

      twr_scheduler_plan_current_relative(200);
  }
  ```

</p>
</details>
