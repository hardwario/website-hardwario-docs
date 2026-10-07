---
slug: how-to-accelerometer
title: "Jak na: Akcelerometr"
---
import Image from '@theme/IdealImage';

Modul Core Module má tříosý **lineární akcelerometr (LIS2DH12)** s ultranízkou spotřebou, připojený přes sběrnici I²C. Pohyb umí detekovat pomocí přerušení.

## Odkazy {#references}
- [**Modul SDK pro akcelerometr**](https://sdk.hardwario.com/group__twr__lis2dh12.html)
- Příklad v repozitáři na GitHubu

Akcelerometr lze používat dvěma způsoby:
  - **Průběžné měření zrychlení**
  - **Alarm, který spustí obsluhu události při splnění definovaných podmínek**

## Průběžné měření {#continuous-measurement}

Stačí v kódu nastavit interval aktualizace funkcí `twr_lis2dh12_set_update_interval`. Jejími parametry jsou ukazatel na instanci akcelerometru a doba mezi měřeními v milisekundách.

Dále je potřeba vytvořit instanci struktury `twr_lis2dh12_result_g_t`, do které se ukládají výsledky měření. Hodnoty z ní získáte voláním funkce `twr_lis2dh12_get_result_g`.

:::info

  V jednoduchém příkladu níže každou sekundu měříme přesné hodnoty zrychlení v g a odesíláme je přes USB.

:::

<details>
<summary>
<b>
Příklad kódu: průběžné měření
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_led_t led;

  twr_lis2dh12_t a;
  twr_lis2dh12_result_g_t a_result;

  void lis2_event_handler(twr_lis2dh12_t *self, twr_lis2dh12_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_LIS2DH12_EVENT_UPDATE) {
          twr_lis2dh12_get_result_g(&a, &a_result);
          twr_log_debug("X: %f\r\nY: %f\r\nZ: %f\r\n", a_result.x_axis, a_result.y_axis, a_result.z_axis);
      } else {
          twr_log_debug("error");
      }
  }

  void application_init(void)
  {
      twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_OFF);

      twr_lis2dh12_init(&a, TWR_I2C_I2C0, 0x19);
      twr_lis2dh12_set_event_handler(&a, lis2_event_handler, NULL);
      twr_lis2dh12_set_update_interval(&a, 1000);
  }
  ```

</p>
</details>

## Alarm {#alarm}

U alarmu nastavíte podmínky, za kterých se má spustit (například probuzení, když se modul pohne ve směru osy X && zrychlení je vyšší než 1g).

Modul dává mikrokontroléru vědět přerušením. Mikrokontrolér tak může spát, dokud se s modulem nehýbe, a probudí se jen při pohybu.

Podmínky alarmu nastavíte ve struktuře `twr_lis2dh12_alarm_t`.

Akcelerometr nastavení vyhodnocuje **logickou operací AND**: alarm se spustí, jen když nastanou všechny nastavené podmínky.

:::info

V příkladu níže nastavíme alarm tak, aby se spustil, když se modul Core Module pohne ve směru osy X se zrychlením > 1g. Po spuštění alarmu se na jednu sekundu rozsvítí integrovaná červená LED.

Po nahrání firmwaru zkuste modulem Core Module pohybovat velmi pomalu. V žádném směru se nic nestane. Pak s ním rychle pohněte nahoru a dolů. Opět se nic nestane, protože jde o pohyb v ose Z. Teď zkuste rychlý pohyb v ose X a LED by se měla rozsvítit.

:::

<details>
<summary>
<b>
Příklad kódu: alarm
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_led_t led;

  twr_lis2dh12_t a;
  twr_lis2dh12_result_g_t a_result;

  // alarm settings
  twr_lis2dh12_alarm_t alarm1;

  twr_scheduler_task_id_t disable_led_task;

  void disable_led(void* params)
  {
      (void) params;
      twr_led_set_mode(&led, TWR_LED_MODE_OFF);
  }

  void lis2_event_handler(twr_lis2dh12_t *self, twr_lis2dh12_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_LIS2DH12_EVENT_ALARM) {
          twr_led_set_mode(&led, TWR_LED_MODE_ON);
          twr_scheduler_plan_from_now(disable_led_task, 1000);
      }
  }

  void application_init(void)
  {
      // here you can set conditions for the alarm to be triggered
      alarm1.x_high = true;
      alarm1.threshold = 1;

      twr_led_init(&led, TWR_GPIO_LED, false, false);
      twr_led_set_mode(&led, TWR_LED_MODE_OFF);

      twr_lis2dh12_init(&a, TWR_I2C_I2C0, 0x19);
      twr_lis2dh12_set_alarm(&a, &alarm1);
      twr_lis2dh12_set_event_handler(&a, lis2_event_handler, NULL);

      disable_led_task = twr_scheduler_register(disable_led, NULL, TWR_TICK_INFINITY);
  }
  ```

</p>
</details>
