---
slug: task-scheduler
title: Task Scheduler
description: "Náš scheduler jsme vyvinuli na základě potřeby jednoduchosti a nízké spotřeby energie. Plánuje, která úloha se má spustit a kdy. Tento scheduler není plnohodnotný RTOS (Real Time Operating System) a nemá skutečný kooperativní multitasking. Spustí se…"
---
import Image from '@theme/IdealImage';

Náš scheduler jsme vyvinuli na základě potřeby jednoduchosti a nízké spotřeby energie. Plánuje, která úloha se má spustit a kdy. Tento scheduler není plnohodnotný **RTOS** (**R**eal **T**ime **O**perating **S**ystem) a nemá skutečný kooperativní multitasking. Spustí se jedna úloha a když tato úloha skončí, spustí se další.

Je důležité **úlohu neblokovat**, ale provést potřebnou operaci rychle a nechat **scheduler spustit další úlohy**. Pokud potřebujete vytvořit nějakou prodlevu, jedním z řešení je vytvořit například stavový automat a naplánovat volání úlohy později.

## Odkazy {#references}
- [**Scheduler SDK Module**](https://sdk.hardwario.com/group__twr__scheduler.html)
- [**Příklad v repozitáři GitHub**](https://github.com/hardwario/twr-sdk/blob/master/_examples/scheduler-advanced/application.c)

## Registrace úlohy {#registering-a-task}

První věc, na kterou při práci se **schedulerem** pravděpodobně narazíte, je registrace jednoduché úlohy, která se má spustit ***za x sekund od nynějška***.

:::info

V příkladu níže kód inicializuje LCD Module a poté naplánuje úlohu, která se spustí po 5 sekundách a vypne LCD.

Při registraci úlohy si také můžete uložit její ID. Díky tomu budete moci s úlohou pracovat kdykoli budete chtít (spustit ji znovu, odregistrovat ji).

:::

<details>
<summary>
<b>
Příklad kódu pro jednorázové spuštění úlohy
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

## Odregistrování úlohy {#unregistering-a-task}

Pro odregistrování úlohy ze **scheduleru** (například když už není potřeba, aby se spouštěla) musíte použít funkci `void twr_scheduler_unregister(twr_scheduler_task_id_t task_id)`.

Ta bere jako parametr **ID** úlohy, která se má odregistrovat.

## Plánování spuštění registrované úlohy {#planning-to-run-registered-task}

Pokud zaregistrujete úlohu s třetím parametrem s jakoukoli hodnotou, úloha se spustí **právě jednou** po zadaném čase.

Například: `twr_scheduler_register(disableLCD, NULL, twr_tick_get() + 5000);` spustí úlohu po 5 sekundách

### Jednorázově {#one-time}

:::info

Funkci `twr_scheduler_register` můžete spustit s třetím parametrem `TWR_TICK_INFINITY` (`twr_scheduler_register(disableLCD, NULL, TWR_TICK_INFINITY);`), aby se úloha po registraci nespustila, ale pouze až když sami budete chtít.

:::

Pro spuštění registrované úlohy ještě jednou v budoucnosti musíte použít jednu z následujících funkcí.

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

Pro opětovné spuštění aktuální úlohy můžete použít funkce z první skupiny (s `current` v názvu).

Aby to fungovalo, musíte jednu z těchto funkcí zavolat přímo ve funkci dané úlohy.

Například pokud chcete **zapínat a vypínat LCD po 5 sekundách**, můžete použít tyto funkce.

:::

<details>
<summary>
<b>
Příklad kódu pro spuštění aktuální úlohy
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
      ldc_state = false;
    }
    else {
      twr_module_lcd_on();
      ldc_state = true;
    }
  twr_scheduler_plan_current_from_now(twr_tick_get() + 5000);
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

Pro spuštění úlohy odkudkoli můžete použít funkce z druhé skupiny (bez `current` v názvu).

Například pokud chcete **vypnout LCD 5 sekund po stisknutí tlačítka**, můžete použít tyto funkce.

:::

<details>
<summary>
<b>
Příklad kódu pro spuštění úlohy odkudkoli
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
    twr_scheduler_plan_from_now(turn_off_lcd_task_id, twr_tick_get() + 5000)
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
