---
slug: firmware-debugging
title: Debugging
---
import Image from '@theme/IdealImage';

:::info

If you want to use the JLink probe to do some advanced debugging, you can [**read the separate chapter for that**](./advanced-debugging.md).

:::

## Starting Simple

The easiest way to debug and also the way how all the things started was just to print out whatever you consider important to know.

We will use the serial port to print the information over USB into the connected PC.

## Core Module

The [**Core Module**](../hardware-modules/about-core-module.md) has an integrated FTDI chip connected to the UART2. You do not need to use a separate serial converter, just connect the USB cable to your computer.

## Logging Example

:::note

You can visit the [**twr_log SDK Module**](https://sdk.hardwario.com/group__twr__log.html).

:::

<details>
<summary>
<b>
Logging Code Example
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

Example of output:

```
# 4.54 <I> Button event handler - event: 0
# 4.84 <I> Button event handler - event: 1
# 4.84 <I> Button event handler - event: 2
# 10.24 <I> Button event handler - event: 0
# 12.24 <I> Button event handler - event: 3
# 13.64 <I> Button event handler - event: 1
```

### Colored Logs

:::info

You can colorize logs into 4 different colors with commands down below.

:::

#### Debug (purple)

```c
twr_log_debug("Log");
```

#### Info (green)

```c
twr_log_info("Log");
```

#### Warning (orange)

```c
twr_log_warning("Log");
```

#### Error (red)

```c
twr_log_error("Log");
```


## Read Logs With HARDWARIO Code

:::info

If you didn’t already, you should install [**HARDWARIO Code**](./about-hardwario-code.md).

:::

You can use our Visual Studio Code extension to attach the console to the **connected Core Module.**

You can use two commands in the extension to attach the console:

- [**Build + Flash (Console)**](./hardwario-extension-tutorial.md#build--flash-console)
- [**Attach Console**](./hardwario-extension-tutorial.md#attach-console)

:::note

  It is advised to use the first one. It will **build the firmware** so it includes all the changes that you did and **flashes it to the device**. After the flashing is done the console will be attached and you can see all the logs.

:::

If you just want to attach the console to the **running Core Module** without building and flashing, you can use the **Attach console command**.

Either way, you should see the log messages in the console at the bottom tab

:::tip

To learn more about this console you can visit [**HARDWARIO TOWER Console chapter**](./hardwario-tower-console.md).

:::

<Image img={require('./images/code-console-debug-example.png')} alt="TOWER console tab in VS Code streaming application log lines with timestamps and a temperature reading" />
<br />

:::tip

You can check those links for more information:

- [**Tips and Tricks for Microcontroller Programming and Debugging**](https://www.youtube.com/watch?v=cDaG1CdP5Ew)
- [**Poor Man’s Trace**](https://mcuoneclipse.com/2015/04/04/poor-mans-trace-free-of-charge-function-entryexit-trace-with-gnu-tools/)
- [**The Lauterbach Company**](https://www.lauterbach.com/frames.html?home.html)

:::
