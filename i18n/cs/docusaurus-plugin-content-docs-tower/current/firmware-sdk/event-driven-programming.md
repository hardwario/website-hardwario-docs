---
slug: event-driven-programming
title: Programování řízené událostmi
description: "Většina firmwaru používá tento typ programování. Funguje tak, že se volají události vždy, když na některém modulu nebo tagu k nějaké události dojde."
---
import Image from '@theme/IdealImage';

Většina firmwaru používá tento typ programování. Funguje tak, že se volají události vždy, když na některém modulu nebo tagu k nějaké události dojde.

Můžete si například nastavit událost, která se zavolá vždy, když se něco stane na [**Button Module**](../hardware-modules/about-button-module.md), a v této obslužné funkci můžete zjistit, co konkrétně se stalo, a podle toho provést nějakou akci.

:::info

  Tento způsob programování firmwaru se mírně liší od toho popsaného v [**kapitole Task Scheduler**](./task-scheduler.md). Události jsou však někdy plánovány právě plánovačem.

:::

## Příklad programování řízeného událostmi {#example-of-event-driven-programming}

Je potřeba nastavit obslužnou funkci události (event handler), tedy konkrétní funkci, která se zavolá, když nějaká událost nastane.

Funkce musí mít pro každý modul a tag **specifickou signaturu**, kterou najdete v **příkladech** na [**GitHubu**](https://github.com/hardwario) nebo v kapitolách **How To:** v této sekci.

:::info

  V prvním příkladu je funkce volaná pokaždé, když na **Button Module** nastane nějaká událost.

  **Button Module** je specifický tím, že u něj nemusíte nastavovat interval aktualizace jako u většiny modulů. Tlačítko lze totiž stisknout kdykoli.

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

  Ve druhém příkladu je funkce volaná pokaždé, když dojde k aktualizaci na **teplotním senzoru** integrovaném v Core Module. Interval aktualizace je nastaven na 5 sekund (5 * 1000 milisekund).

  Na rozdíl od předchozího příkladu musíte kromě obslužné funkce nastavit i **interval aktualizace**; díky tomuto intervalu bude obslužná funkce volána periodicky.

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

      if (event != TWR_TMP112_EVENT_ERROR)
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
