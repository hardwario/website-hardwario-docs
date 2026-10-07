---
slug: how-to-one-wire-relay
title: "Jak na: 1-Wire relé"
---
import Image from '@theme/IdealImage';

Kvůli snazší práci s některými zařízeními 1-Wire jsme vytvořili modul `twr_onewire_relay`, kterým ovládáte reléové moduly připojené přes sběrnici 1-Wire, například [**reléový modul od firmy Denkovi**](http://denkovi.com/1-wire-eight-channel-relay-module-for-home-automation-with-din-box).

## Odkazy {#references}
- [**Modul SDK pro 1-Wire relé**](https://sdk.hardwario.com/group__twr__onewire__relay.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-sdk/blob/master/_examples/onewire-relay/application.c)

:::info

V tomto příkladu se **relé** ovládají **tlačítkem integrovaným v modulu Core Module**.

Každým stisknutím tlačítka se sepne o jedno relé víc. Když jsou sepnutá všechna relé, další stisknutí je všechna vypne a cyklus začne znovu.

:::

<details>
<summary>
<b>
Příklad kódu
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
