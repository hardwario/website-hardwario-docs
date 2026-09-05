---
slug: how-to-smart-led-strip
title: "How To: Smart LED pásek"
description: "Smart LED pásek vám nabízí snadný způsob, jak zobrazovat hodnoty například teplotu jako barevný rozsah, blikáním apod."
---
import Image from '@theme/IdealImage';

Smart LED pásek vám nabízí snadný způsob, jak zobrazovat hodnoty například **teplotu jako barevný rozsah, blikáním** apod.

Je potřeba použít [**Power Module**](../../hardware-modules/about-power-module.md), který se stará o napájení a komunikaci mezi [**Core Module**](../../hardware-modules/about-core-module.md) a **LED páskem**.

## Odkazy {#references}
- [**LED Strip SDK Module**](https://sdk.hardwario.com/twr__led__strip_8h_source.html)
- [**Příklad v GitHub repozitáři**](https://github.com/hardwario/twr-sdk/blob/master/_examples/led-strip/application.c)

## Dostupné barvy {#available-colors}

LED diody použité [**na našem pásku**](https://www.hardwario.store/p/led-strip-rgbw-1m) jsou RGBW. To znamená, že obsahují samostatný světelný zdroj pro barvy **červenou**, **zelenou**, **modrou** a **bílou** (teplá bílá).

:::info

Abyste získali téměř studené bílé světlo, musíte nastavit každou jednotlivou barvu na stejnou hodnotu jako ostatní.

:::

## Příklad {#example}

V tomto příkladu nastavíte prvních 35 LED tak, aby každá svítila o 5 bodů jasněji než ta předchozí. Použije se modrá barva.

Pole `_led_strip_buffer ` je pro funkci LED pásku povinné. Jde v podstatě o popis LED pásku pro Core Module.

Pro nastavení barvy pixelu (LED na pásku) musíte poskytnout několik informací. To se dělá pomocí `twr_led_strip_set_pixel_rgbw(twr_led_strip_t *self, int position, uint8_t r, uint8_t g, uint8_t b, uint8_t w)`. Argumenty funkce jsou:

- `*self`: instance LED pásku, nejčastěji `&led_strip`
- `position`: pixel (LED) na pásku, který se má nastavit (**začíná od 0, nikoli od 1**)
- `r, g, b, w`: vyjádření **jak silně má každá barva svítit**, hodnoty musí být mezi 0 (minimum) a 255 (maximum)

Aby se změny projevily, musíte zavolat `twr_led_strip_write(&led_strip);`. Pokud to neuděláte, na pásku se nic nestane.

<details>
<summary>
<b>
Příklad kódu pro nastavení několika LED
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

Maximální jasnost celého LED pásku můžete omezit funkcí `twr_led_strip_set_brightness(twr_led_strip_t *self, uint8_t brightness)`.

:::

### Efekty LED pásku {#led-strip-effects}

K dispozici je několik funkcí s efekty.

:::tip

Tyto efekty vypadají skvěle a možná je využijete pro nějakou signalizaci, aniž byste je museli programovat sami.

:::

Pokud si chcete tyto efekty vyzkoušet, zde je kostra kódu pro pásek se 144 LED.

<details>
<summary>
<b>
Příklad kostry kódu pro efekty LED pásku
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

#### Efekt Test {#test-effect}

Jde o jednoduchý efekt, kterým můžete ověřit, zda všechny barvy LED pásku fungují správně

```c
twr_led_strip_effect_test(&led_strip);
```

#### Efekt Rainbow {#rainbow-effect}

LED pásek se rozsvítí v barvách duhy a bude tyto barvy plynule měnit do kruhu (co skončí na jedné straně pásku, začne na druhé).

:::note

Druhý parametr představuje rychlost změny. Nižší číslo = rychlejší změny.

:::

```c
twr_led_strip_effect_rainbow_cycle(&led_strip, 100);
```

:::tip

Existuje také funkce `twr_led_strip_effect_rainbow(&led_strip, 100);`, která funguje téměř stejně, ale chvíli trvá, než se barva objeví na jednom konci pásku poté, co zmizí z druhého.

:::

#### Efekt Color Wipe {#color-wipe-effect}

Vyplní celý pásek pixel po pixelu jednou barvou

```c
twr_led_strip_effect_color_wipe(&led_strip, 0x10000000, 20);
```

:::tip

První parametr přijímá barvu v hexadecimálním formátu (tato konkrétní je červená) a druhý parametr je rychlost. Čím nižší, tím rychleji.

:::

#### Efekt Theater {#theater-effect}

Způsobí přepínání LED podle vzoru níže: `-` znamená, že LED je zhasnutá, `X` znamená, že LED svítí.

```c
twr_led_strip_effect_color_wipe(&led_strip, 0x10000000, 20);
```

Vzor:

X–X–X–X–X–X -X–X–X–X–X– –X–X–X–X–X- X–X–X–X–X–X

:::tip

První parametr je barva v hexadecimálním formátu (uložená v `uint32_t), a druhý je rychlost změn. Čím nižší, tím rychleji.

:::

#### Efekt Stroboscope {#stroboscope-effect}

#### Efekt ICicle {#icicle-effect}

#### Efekt Pulse Color {#pulse-color-effect}

#### Efekt Thermometer {#thermometer-effect}

#### Zastavení efektu {#effect-stop}

Efekt můžete snadno zastavit touto funkcí

```c
twr_led_strip_effect_stop(&led_strip);
```

<details>
<summary>
<b>
Příklad kódu pro zastavení efektu LED pásku
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
