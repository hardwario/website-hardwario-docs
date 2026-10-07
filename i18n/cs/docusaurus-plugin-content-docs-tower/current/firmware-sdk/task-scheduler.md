---
slug: task-scheduler
title: Plánovač úloh
---
import Image from '@theme/IdealImage';

Vlastní plánovač (scheduler) jsme vyvinuli, protože jsme potřebovali jednoduchost a nízkou spotřebu energie. Plánuje, která úloha se má spustit a kdy. Nejde o plnohodnotný **RTOS** (**R**eal **T**ime **O**perating **S**ystem) a nemá skutečný kooperativní multitasking: spustí se jedna úloha, a když skončí, spustí se další.

Je důležité **úlohu neblokovat**: potřebnou operaci proveďte rychle a nechte **plánovač spustit další úlohy**. Pokud potřebujete prodlevu, můžete například vytvořit stavový automat a volání úlohy naplánovat na později.

## Odkazy {#references}
- [**Modul Scheduler v SDK**](https://sdk.hardwario.com/group__twr__scheduler.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-sdk/blob/master/_examples/scheduler-advanced/application.c)

## Registrace úlohy {#registering-a-task}

Při práci s **plánovačem** nejspíš nejdřív budete registrovat jednoduchou úlohu, která se má spustit ***za x sekund***.

:::info

Kód v příkladu níže inicializuje modul LCD Module a naplánuje úlohu, která za 5 sekund displej vypne.

Při registraci si můžete uložit ID úlohy. S úlohou pak můžete kdykoli dál pracovat (znovu ji spustit nebo odregistrovat).

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

Úlohu z **plánovače** odregistrujete (například když už se nemá spouštět) funkcí `void twr_scheduler_unregister(twr_scheduler_task_id_t task_id)`.

Jejím parametrem je **ID** úlohy, kterou chcete odregistrovat.

## Plánování spuštění registrované úlohy {#planning-to-run-registered-task}

Pokud úlohu zaregistrujete s libovolnou hodnotou třetího parametru, spustí se po zadaném čase **právě jednou**.

Například `twr_scheduler_register(disableLCD, NULL, twr_tick_get() + 5000);` spustí úlohu za 5 sekund.

### Jednorázově {#one-time}

:::info

Funkci `twr_scheduler_register` můžete spustit s třetím parametrem `TWR_TICK_INFINITY` (`twr_scheduler_register(disableLCD, NULL, TWR_TICK_INFINITY);`), aby se úloha po registraci nespustila a spustila se až tehdy, kdy budete chtít.

:::

Chcete-li registrovanou úlohu v budoucnu spustit znovu, použijte jednu z těchto funkcí:

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

Aktuální úlohu znovu spustíte funkcemi z první skupiny (s `current` v názvu).

Aby to fungovalo, musíte jednu z těchto funkcí zavolat přímo ve funkci dané úlohy.

Hodí se například tehdy, když chcete **každých 5 sekund přepnout displej LCD (zapnout, nebo vypnout)**.

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

Úlohu odkudkoli spustíte funkcemi z druhé skupiny (bez `current` v názvu).

Hodí se například tehdy, když chcete **vypnout displej LCD 5 sekund po stisknutí tlačítka**.

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
