---
slug: event-driven-programming
title: Programování řízené událostmi
---
import Image from '@theme/IdealImage';

Tento způsob programování používá většina firmwarů. Pokaždé, když na některém modulu nebo tagu dojde k nějaké události, zavolá se její obsluha.

Můžete si například nastavit obsluhu, která se zavolá pokaždé, když se něco stane na modulu [**Button Module**](../hardware-modules/about-button-module.md). V této obslužné funkci pak zjistíte, co přesně se stalo, a podle toho zareagujete.

:::info

  Tento způsob programování se mírně liší od postupu popsaného v [**kapitole Plánovač úloh**](./task-scheduler.md), i když události někdy plánuje právě plánovač.

:::

## Příklad programování řízeného událostmi {#example-of-event-driven-programming}

Nejdřív nastavíte obslužnou funkci události (event handler), tedy funkci, která se zavolá, když událost nastane.

Funkce musí mít pro každý modul a tag **specifickou signaturu**, kterou najdete v **příkladech** na [**GitHubu**](https://github.com/hardwario) nebo v kapitolách **„Jak na:“** v této sekci.

:::info

  V prvním příkladu se funkce volá pokaždé, když na modulu **Button Module** nastane nějaká událost.

  Modul **Button Module** je výjimečný tím, že u něj na rozdíl od většiny modulů nenastavujete interval aktualizace. Tlačítko totiž může někdo stisknout kdykoli.

:::

<details>
<summary>
<b>
Příklad kódu obslužné funkce události tlačítka
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  // This function dispatches button events
  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      if (event == TWR_BUTTON_EVENT_CLICK)
      {
          // Pulse LED for 100 milliseconds
          twr_led_pulse(&led, 100);

          // Increment press count
          button_click_count++;

          twr_log_info("APP: Publish button press count = %u", button_click_count);

          // Publish button message on radio
          twr_radio_pub_push_button(&button_click_count);
      }
      else if (event == TWR_BUTTON_EVENT_HOLD)
      {
          // Pulse LED for 250 milliseconds
          twr_led_pulse(&led, 250);

          // Increment hold count
          button_hold_count++;

          twr_log_info("APP: Publish button hold count = %u", button_hold_count);

          // Publish message on radio
          twr_radio_pub_event_count(TWR_RADIO_PUB_EVENT_HOLD_BUTTON, &button_hold_count);
      }
  }

  // Button instance
  twr_button_t button;

  void application_init(void)
  {
      // Initialize button
      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);
  }
  ```

</p>
</details>

:::info

  Ve druhém příkladu se funkce volá pokaždé, když se aktualizuje **teplotní senzor** integrovaný v modulu Core Module. Interval aktualizace je nastavený na 5 sekund (5 * 1000 milisekund).

  Na rozdíl od předchozího příkladu musíte kromě obslužné funkce nastavit i **interval aktualizace**, se kterým se pak obslužná funkce volá pravidelně.

:::

<details>
<summary>
<b>
Příklad kódu obslužné funkce události teplotního senzoru
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  #define TMP112_UPDATE_INTERVAL (5 * 1000)

  void tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)
  {
      float value;

      if (event == TWR_TMP112_EVENT_ERROR)
      {
          return;
      }
      else if(event == TWR_TMP112_EVENT_UPDATE)
      {
          if (twr_tmp112_get_temperature_celsius(self, &value))
          {
              twr_radio_pub_temperature(TWR_RADIO_PUB_CHANNEL_R1_I2C0_ADDRESS_ALTERNATE, &value);
          }
      }
  }

  void application_init(void)
  {
      // Initialize TMP112
      twr_tmp112_init(&temperature, TWR_I2C_I2C0, 0x49);
      twr_tmp112_set_event_handler(&temperature, tmp112_event_handler, &temperature_event_param);
      twr_tmp112_set_update_interval(&temperature, TMP112_UPDATE_INTERVAL);
  }
  ```

</p>
</details>
