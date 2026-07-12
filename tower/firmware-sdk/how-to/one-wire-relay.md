---
slug: how-to-one-wire-relay
title: "How To: 1-Wire Relay"
---
import Image from '@theme/IdealImage';

To make it easier to work with certain 1-Wire devices we implemented a module called `twr_onewire_relay` which allows you to control relay modules connected via 1-Wire bus, for example, the [**Relay module developed by Denkovi**](http://denkovi.com/1-wire-eight-channel-relay-module-for-home-automation-with-din-box).

## References
- [**1-Wire SDK Module**](https://sdk.hardwario.com/group__twr__onewire__relay.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-sdk/blob/master/_examples/onewire-relay/application.c)

:::info

In the example we allow the **relays** to be controlled with a **button integrated into the Core Module**.

With every press of the button, one more relay will be activated. When all relays are active, the next push of the button will switch off all of them and the cycle repeats.

:::

<details>
<summary>
<b>
Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_onewire_relay_t relay;
  twr_button_t button;

  twr_onewire_relay_channel_t relays[] = {
          TWR_ONEWIRE_RELAY_CHANNEL_Q1,
          TWR_ONEWIRE_RELAY_CHANNEL_Q2,
          TWR_ONEWIRE_RELAY_CHANNEL_Q3,
          TWR_ONEWIRE_RELAY_CHANNEL_Q4,
          TWR_ONEWIRE_RELAY_CHANNEL_Q5,
          TWR_ONEWIRE_RELAY_CHANNEL_Q6,
          TWR_ONEWIRE_RELAY_CHANNEL_Q7,
          TWR_ONEWIRE_RELAY_CHANNEL_Q8
  };

  int activated = 0;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          if (activated == 8) {
              for (int i = 0; i < 8; ++i) {
                  twr_onewire_relay_set_state(&relay, relays[i], false);
              }

              activated = 0;
          } else {
              twr_onewire_relay_set_state(&relay, relays[activated], true);
              activated++;
          }
      }
  }

  void application_init(void)
  {
      twr_onewire_relay_init(&relay, TWR_GPIO_P4, 0x00);

      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, 0);
      twr_button_set_event_handler(&button, button_event_handler, NULL);
  }
  ```

</p>
</details>
