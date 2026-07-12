---
slug: how-to-accelerometer
title: "How To: Accelerometer"
---
import Image from '@theme/IdealImage';

The Core Module comes with three-axis ultra-low-power **linear accelerometer (LIS2DH12)** connected via the I²C bus. It is capable of motion detection based on interrupts.

## References
- [**Accelerometer SDK Module**](https://sdk.hardwario.com/group__twr__lis2dh12.html)
- GitHub Repository Example

You have two options for how to use the accelerometer:
  - **Continuous measurement of acceleration**
  - **Alarm, which triggers the event handler if defined conditions occur**

## Continuous Measurement

This can be achieved by setting the update interval in your code with function `twr_lis2dh12_set_update_interval`, which takes the pointer to instantiated accelerometer and time between measurements in milliseconds as parameters.

You also have to instantiate a structure `twr_lis2dh12_result_g_t` to store the results of measurements. Those values can be retrieved by calling `twr_lis2dh12_get_result_g` function.

:::info

  In the simple example below, we measure exact values of acceleration in g every second and send them over USB.

:::

<details>
<summary>
<b>
Continuous Measurement Code Example
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

## Alarm

The alarm is a feature that allows you to set up certain conditions when the alarm should be triggered (like wake up, when the module is moved in direction of the X-axis && acceleration is higher than 1g).

The module uses interrupts to inform the microcontroller. This means that it can sleep when it is not being moved and only be awakened when moved.

You can set conditions for the alarm in structure `twr_lis2dh12_alarm_t`.

When the accelerometer checks these settings it uses **logical AND operation** meaning that every set condition needs to occur for the alarm to be triggered.

:::info

In the example below, we set the alarm to be triggered when the Core Module is moved in direction of the X-axis with acceleration > 1g. When triggered, the integrated red LED will switch on for one second.

After flashing, try to move your Core Module very slowly. It will do nothing in any direction. Then try to move it quickly up and down - once again nothing happens, because this movement is on Z-axis. Now try to make a quick move on X-axis and the LED should light up.

:::

<details>
<summary>
<b>
Alarm Code Example
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
