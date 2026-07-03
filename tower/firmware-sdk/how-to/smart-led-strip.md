---
slug: how-to-smart-led-strip
title: "How To: Smart LED Strip"
---
import Image from '@theme/IdealImage';

The Smart LED Strip provides you an easy way to show values like **temperature as a color range, blinking** etc.

You need to use a [**Power Module**](../../hardware-modules/about-power-module.md) that takes care of power and communication between [**Core Module**](../../hardware-modules/about-core-module.md) and the **LED Strip**.

## References
- [**LED Strip SDK Module**](https://sdk.hardwario.com/twr__led__strip_8h_source.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-sdk/blob/master/_examples/led-strip/application.c)

## Available Colors

LEDs featured [**on our strip**](https://www.hardwario.store/led-strip-rgbw-1m-144-leds/) are RGBW. This means they include a separate light source for **Red**, **Green**, **Blue** and **White** (warm white) colors.

:::info

To get almost cool white light, you have to set every single color to the same value as the other ones.

:::

## Example

In this example, you will set 35 first LEDs each 5 points brighter than the previous one. The blue color will be used.

The `_led_strip_buffer ` is mandatory for the LED strip to work. It is basically a description of the LED strip for the Core Module.

To set the color of the pixel(LED on the strip) you will have to provide some information. This is done with the `twr_led_strip_set_pixel_rgbw(twr_led_strip_t *self, int position, uint8_t r, uint8_t g, uint8_t b, uint8_t w)`. The arguments of the function are:

- `*self` - an instance of the LED strip, most likely `&led_strip`
- `position` - pixel (LED) on the strip that should be set (**starts from 0, not 1**)
- `r, g, b, w` - representation of **how strongly every color should shine**, values must be between 0 (minimum) and 255 (maximum)

For the changes to take effect, you have to call `twr_led_strip_write(&led_strip);`. If you don't do that, nothing will happen on the strip.

<details>
<summary>
<b>
Set Few LEDs Code Example
</b>
</summary>
<p>

```c showLineNumbers
#include <application.h>

twr_led_strip_t led_strip;
static uint32_t _dma_buffer[144 * 4 * 2]; // count * type * 2
const twr_led_strip_buffer_t _led_strip_buffer =
        {
                .type = TWR_LED_STRIP_TYPE_RGBW,
                .count = 144,
                .buffer = _dma_buffer
        };

void application_init(void)
{
    twr_module_power_init();
    twr_led_strip_init(&led_strip, twr_module_power_get_led_strip_driver(), &_led_strip_buffer);

    uint8_t blue = 0;
    for (int i = 0; i < 35; ++i) {
        twr_led_strip_set_pixel_rgbw(&led_strip, i, 0, 0, blue, 0);
        blue += 5;
    }

    twr_led_strip_write(&led_strip);
}
```

</p>
</details>

:::tip

You can limit maximum brightness of the entire led strip with function `twr_led_strip_set_brightness(twr_led_strip_t *self, uint8_t brightness)`.

:::

### LED Strip Effects

There are several effect functions available.

:::tip

These effects look great and you can maybe use them for some signalization without the need of coding them yourself.

:::

If you want to try out these effects, there is a skeleton code for the 144 LEDs strip.

<details>
<summary>
<b>
LED Strip Effects Skeleton Code Example
</b>
</summary>
<p>

```c showLineNumbers
#include <application.h>

twr_led_strip_t led_strip;
static uint32_t _dma_buffer[144 * 4 * 2]; // count * type * 2
const twr_led_strip_buffer_t _led_strip_buffer =
        {
                .type = TWR_LED_STRIP_TYPE_RGBW,
                .count = 144,
                .buffer = _dma_buffer
        };

void application_init(void)
{
    twr_module_power_init();
    twr_led_strip_init(&led_strip, twr_module_power_get_led_strip_driver(), &_led_strip_buffer);

    // place examples here
    // highlight-next-line

}
```

</p>
</details>

#### Test Effect

This is a simple effect that you can just use to check if all the colors of the LED strip work well

```c
twr_led_strip_effect_test(&led_strip);
```

#### Rainbow Effect

The LED strip will light up in the color of a rainbow and will fluently change these colors in circles (what ends on one side of the strip starts on the other side).

:::note

The second parameter represents the speed of change. Lower number = quicker changes.

:::

```c
twr_led_strip_effect_rainbow_cycle(&led_strip, 100);
```

:::tip

There is also a function `twr_led_strip_effect_rainbow(&led_strip, 100);` which acts almost the same, but it takes a while before color appears on one end of a strip after disappearing from another.

:::

#### Color Wipe Effect

Fills the entire strip pixel by pixel with one color

```c
twr_led_strip_effect_color_wipe(&led_strip, 0x10000000, 20);
```

:::tip

The first parameter takes color in hex format (this particular is red color) and the second parameter is speed. The lower, the quicker.

:::

#### Theater Effect

Cause the LEDs to switch in the pattern shown below: `-` means that LED is off, `X` means that LED is on.

```c
twr_led_strip_effect_color_wipe(&led_strip, 0x10000000, 20);
```

Pattern:

X–X–X–X–X–X -X–X–X–X–X– –X–X–X–X–X- X–X–X–X–X–X

:::tip

The first parameter is a color in hex format (stored in `uint32_t), and the second one is the speed of changes. The lower, the quicker.

:::

#### Stroboscope Effect

#### ICicle Effect

#### Pulse Color Effect

#### Thermometer Effect

#### Effect Stop

You can easily stop the effect with this function

```c
twr_led_strip_effect_stop(&led_strip);
```

<details>
<summary>
<b>
Stop LED Strip Effect Code Example
</b>
</summary>
<p>

```c showLineNumbers
#include <application.h>

twr_led_strip_t led_strip;
static uint32_t _dma_buffer[144 * 4 * 2]; // count * type * 2
const twr_led_strip_buffer_t _led_strip_buffer =
        {
                .type = TWR_LED_STRIP_TYPE_RGBW,
                .count = 144,
                .buffer = _dma_buffer
        };


void stop_effect(void* param) {
    (void) param;
    twr_led_strip_effect_stop(&led_strip);
}

void application_init(void)
{
    twr_module_power_init();
    twr_led_strip_init(&led_strip, twr_module_power_get_led_strip_driver(), &_led_strip_buffer);

    twr_led_strip_effect_theater_chase_rainbow(&led_strip, 100);
    twr_scheduler_register(stop_effect, NULL, twr_tick_get() + 3000);
}
```

</p>
</details>


