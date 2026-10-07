---
slug: task-scheduler
title: Task Scheduler
---
import Image from '@theme/IdealImage';

We’ve developed our scheduler based on our need for simplicity, and low-power efficiency. It plans which task needs to be run and when. This scheduler is not the full-blown **RTOS** (**R**eal **T**ime **O**perating **S**ystem) and it doesn’t have real cooperative multitasking. One task is run and when this task exits, then another task is run.

It is important to **not block the task** but do the necessary operation quickly and let the **scheduler run other tasks**. In case you need to create some delay, then the one solution is to create for example a state machine and schedule to call the task later.

## References
- [**Scheduler SDK Module**](https://sdk.hardwario.com/group__twr__scheduler.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-sdk/blob/master/_examples/scheduler-advanced/application.c)

## Registering a Task

The first thing you will probably run into when working with **Scheduler** is registering a simple task to be run in ***x second(s) from now***.

:::info

In the example below the code will initialize the LCD Module and then schedule a task to run after 5 seconds that will turn the LCD off.

You can also save the task ID when registering a task. Thanks to this you will be able to work on the task anytime you want (run it again, unregister the task).

:::

<details>
<summary>
<b>
Run Task Once Code Example
</b>
</summary>
<p>

```c showLineNumbers
#include <application.h>

twr_scheduler_task_id_t turn_off_lcd_task_id;

static void disableLCD(void* param) {
    (void) param;
    twr_module_lcd_off();
}

void application_init(void)
{
    twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);

    twr_module_lcd_init();

    // Register to run disableLCD function in 5 seconds from the start of the code
    turn_off_lcd_task_id = twr_scheduler_register(disableLCD, NULL, twr_tick_get() + 5000);
}
```
</p>
</details>

## Unregistering a Task

To unregister a task from the **scheduler** (for example when it is not needed to be run anymore) you have to use the `void twr_scheduler_unregister(twr_scheduler_task_id_t task_id)` function.

This takes **ID** of the to-be-unregistered task as a parameter.

## Planning to Run Registered Task

If you register a task with third parameter as any value, the task will be run **exactly once** after the given time.

For example: `twr_scheduler_register(disableLCD, NULL, twr_tick_get() + 5000);` will run the task after 5 seconds.

### One time

:::info

You can run `twr_scheduler_register` with a third parameter `TWR_TICK_INFINITY` (`twr_scheduler_register(disableLCD, NULL, TWR_TICK_INFINITY);`) to not run the task after registering but only when you want.

:::

To run the registered task one more time in the future, you have to use one of the following functions.

```c
void twr_scheduler_plan_current_now()
void twr_scheduler_plan_current_absolute(twr_tick_t tick)
void twr_scheduler_plan_current_relative(twr_tick_t tick)
void twr_scheduler_plan_current_from_now(twr_tick_t tick)
```

```c
void twr_scheduler_plan_now(twr_scheduler_task_id_t task_id)
void twr_scheduler_plan_absolute(twr_scheduler_task_id_t task_id, twr_tick_t tick)
void twr_scheduler_plan_relative(twr_scheduler_task_id_t task_id, twr_tick_t tick)
void twr_scheduler_plan_from_now(twr_scheduler_task_id_t task_id, twr_tick_t tick)
```

:::info

To run a current task again you can use functions from the first set (with the `current` in the name).

You have to call one of these functions in the task function itself for it to work.

For example, if you want to **turn the LCD on and off after 5 seconds** you can use these functions.

:::

<details>
<summary>
<b>
Run Current Task Code Example
</b>
</summary>
<p>

```c showLineNumbers
#include <application.h>

twr_scheduler_task_id_t turn_off_lcd_task_id;

bool lcd_state = true;

static void disableLCD(void* param) {
    (void) param;

    if(lcd_state == true) {
      twr_module_lcd_off();
      lcd_state = false;
    }
    else {
      twr_module_lcd_on();
      lcd_state = true;
    }
  twr_scheduler_plan_current_from_now(5000);
}

void application_init(void) {
    twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);

    twr_module_lcd_init();

    // Register to run disableLCD function in 5 seconds from the start of the code
    turn_off_lcd_task_id = twr_scheduler_register(disableLCD, NULL, twr_tick_get() + 5000);
}
```

</p>
</details>

:::info

To run a task anywhere you can use functions from the second set (without the `current` in the name).

For example, if you want to **turn the LCD off 5 seconds after pushing a button** you can use these functions.

:::

<details>
<summary>
<b>
Run Task From Anywhere Code Example
</b>
</summary>
<p>

```c showLineNumbers
#include <application.h>

twr_scheduler_task_id_t turn_off_lcd_task_id;

twr_button_t button;

static void disableLCD(void* param) {
    (void) param;
    twr_module_lcd_off();
}

void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param) {
  if (event == TWR_BUTTON_EVENT_CLICK) {
    twr_scheduler_plan_from_now(turn_off_lcd_task_id, 5000);
  }
}

void application_init(void) {
    twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);

    twr_module_lcd_init();

    twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
    twr_button_set_event_handler(&button, button_event_handler, NULL);

    // Register to run disableLCD function in 5 seconds from the start of the code
    turn_off_lcd_task_id = twr_scheduler_register(disableLCD, NULL, TWR_TICK_INFINITY);
}
```

</p>
</details>
