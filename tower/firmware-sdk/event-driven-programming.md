---
slug: event-driven-programming
title: Event-driven Programming
---
import Image from '@theme/IdealImage';

Most of the firmware uses this type of programming, it works by calling events each time some event occurs on some module or tag.

For example, you can set up an event that will be called each time that something happens on a [**Button Module**](../hardware-modules/about-button-module.md) and in this event handler, you can check specifically what happened and then do some action based on this.

:::info

  This type of programming the firmware slightly differs from the one described in [**Task Scheduler chapter**](./task-scheduler.md). Although the events are sometimes planned by the scheduler.

:::

## Example of Event-Driven Programming

You need to set the event handler, which is a specific function that will be called when some event occurs.

The functions must have a **specific signature** for every module and tag, you can see them in the **examples** on [**GitHub**](https://github.com/hardwario) or in the **How To: chapters** in this section.

:::info

  In the first example, there is a function called every time some event occurs on a **Button Module**.

  The **Button Module** is specific because you don't have to set the update interval like with most modules. After all, the button can be pressed at any time.

:::

<details>
<summary>
<b>
Button Event Handler Code Example
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

  In the second example, there is a function called every time an update occurs on the **Temperature Sensor** integrated into Core Module. The update interval is set for 5 seconds (5 * 1000 milliseconds).

  Contrary to the previous example you have to set the **update interval** as well as the event handler, this interval will make it so the event handler will be called periodically.

:::

<details>
<summary>
<b>
Temperature Sensor Event Handler Code Example
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
