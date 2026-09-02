---
slug: firmware-debugging
title: Debugování
description: "Pokud chcete pro pokročilejší debugování použít sondu JLink, můžete si přečíst samostatnou kapitolu."
---
import Image from '@theme/IdealImage';

:::info

Pokud chcete pro pokročilejší debugování použít sondu JLink, můžete si [**přečíst samostatnou kapitolu**](./advanced-debugging.md).

:::

## Začínáme jednoduše {#starting-simple}

Nejjednodušší způsob debugování – a také způsob, kterým to všechno začalo – je jen vypisovat vše, co považujete za důležité vědět.

Pro výpis informací přes USB do připojeného PC použijeme sériový port.

## Core Module {#core-module}

[**Core Module**](../hardware-modules/about-core-module.md) má integrovaný čip FTDI připojený k UART2. Nepotřebujete samostatný sériový převodník, stačí připojit USB kabel k počítači.

## Příklad logování {#logging-example}

:::note

Můžete se podívat na [**SDK modul twr_log**](https://sdk.hardwario.com/group__twr__log.html).

:::

<details>
<summary>
<b>
Příklad kódu pro logování
</b>
</summary>
<p>

```c showLineNumbers
#include <application.h>

// LED instance
twr_led_t led;

// Button instance
twr_button_t button;

void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
{
    (void) self;
    (void) event_param;

    if (event == TWR_BUTTON_EVENT_PRESS)
    {
        twr_led_set_mode(&led, TWR_LED_MODE_TOGGLE);
    }
    // Logging in action
    twr_log_info("Button event handler - event: %i", event);
}

void application_init(void)
{
    // Initialize logging
    twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);

    // Initialize LED
    twr_led_init(&led, TWR_GPIO_LED, false, false);
    twr_led_set_mode(&led, TWR_LED_MODE_ON);

    // Initialize button
    twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
    twr_button_set_event_handler(&button, button_event_handler, NULL);
}
```

</p>
</details>

Příklad výstupu:

```
# 4.54 <I> Button event handler - event: 0
# 4.84 <I> Button event handler - event: 1
# 4.84 <I> Button event handler - event: 2
# 10.24 <I> Button event handler - event: 0
# 12.24 <I> Button event handler - event: 3
# 13.64 <I> Button event handler - event: 1
```

### Barevné logy {#colored-logs}

:::info

Logy můžete pomocí příkazů níže obarvit do 4 různých barev.

:::

#### Debug (fialová) {#debug-purple}

```c
twr_log_debug("Log");
```

#### Info (zelená) {#info-green}

```c
twr_log_info("Log");
```

#### Warning (oranžová) {#warning-orange}

```c
twr_log_warning("Log");
```

#### Error (červená) {#error-red}

```c
twr_log_error("Log");
```


## Čtení logů pomocí HARDWARIO Code {#read-logs-with-hardwario-code}

:::info

Pokud jste to ještě neudělali, nainstalujte si [**HARDWARIO Code**](./about-hardwario-code.md).

:::

Naše rozšíření pro Visual Studio Code můžete použít k připojení konzole k **připojenému zařízení Core Module.**

Pro připojení konzole můžete v rozšíření použít dva příkazy:

- [**Build + Flash (Console)**](./hardwario-extension-tutorial.md#build--flash-console)
- [**Attach Console**](./hardwario-extension-tutorial.md#attach-console)

:::note

  Doporučuje se použít první z nich. **Sestaví firmware**, takže obsahuje všechny změny, které jste udělali, a **nahraje jej do zařízení**. Po dokončení nahrání se připojí konzole a uvidíte všechny logy.

:::

Pokud chcete konzoli pouze připojit k **běžícímu zařízení Core Module** bez sestavení a nahrání firmwaru, můžete použít příkaz **Attach console**.

V obou případech byste měli vidět logovací zprávy v konzoli ve spodní záložce.

:::tip

Více o této konzoli se dozvíte v kapitole [**Konzole HARDWARIO TOWER**](./hardwario-tower-console.md).

:::

<Image img={require('../../../../../tower/firmware-development/images/code-console-debug-example.png')} alt="Záložka konzole TOWER ve VS Code streamující řádky logu aplikace s časovými značkami a naměřenou teplotou" />
<br />

:::tip

Pro více informací můžete navštívit tyto odkazy:

- [**Tipy a triky pro programování a debugování mikrokontrolérů**](https://www.youtube.com/watch?v=cDaG1CdP5Ew)
- [**Poor Man’s Trace**](https://mcuoneclipse.com/2015/04/04/poor-mans-trace-free-of-charge-function-entryexit-trace-with-gnu-tools/)
- [**Společnost Lauterbach**](https://www.lauterbach.com/frames.html?home.html)

:::
