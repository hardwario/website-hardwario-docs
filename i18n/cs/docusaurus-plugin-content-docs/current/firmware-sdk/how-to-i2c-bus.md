---
slug: how-to-i2c-bus
title: "Jak na: sběrnice I²C"
---
import Image from '@theme/IdealImage';

# Jak na: sběrnice I²C {#how-to-ic-bus}

Tento článek ukazuje, jak komunikovat s cílovými zařízeními na sběrnici I²C (zařízení CHESTER je na sběrnici řadičem, tzv. controllerem).

:::caution

Z pohledu systému Zephyr je správné komunikovat s cílovými zařízeními I²C přes řádný ovladač zařízení podle [modelu ovladačů zařízení Zephyr](https://docs.zephyrproject.org/latest/kernel/drivers/index.html).

Pro jednoduché ověření konceptu však lze použít následující postup.

:::

## Příklad kódu {#code-example}

Zapněte sběrnici I²C v souboru `prj.conf`:

```
CONFIG_I2C=y
```

Do zdrojového souboru vložte potřebné hlavičkové soubory:

```c
#include <zephyr/device.h>
#include <zephyr/devicetree.h>
#include <zephyr/drivers/i2c.h>
#include <stderr.h>
#include <stdint.h>
```

Příklad funkce, která přečte jeden bajt dat z konkrétního registru:

```c
static int read(uint8_t devaddr, uint8_t regaddr, uint8_t *regval)
{
	int ret;

	const struct device *dev = DEVICE_DT_GET(DT_NODELABEL(i2c0));

	if (!device_is_ready(dev)) {
		LOG_ERR("Device not ready");
		return -ENODEV;
	}

	ret = i2c_write_read(dev, devaddr, &regaddr, 1, regval, 1);
	if (ret) {
		LOG_ERR("Call `i2c_write_read` failed: %d", ret);
		return ret;
	}

	return 0;
}
```

Příklad funkce, která zapíše jeden bajt dat do konkrétního registru:

```c
static int write(uint8_t devaddr, uint8_t regaddr, uint8_t regval)
{
	int ret;

	const struct device *dev = DEVICE_DT_GET(DT_NODELABEL(i2c0));

	if (!device_is_ready(dev)) {
		LOG_ERR("Device not ready");
		return -ENODEV;
	}

	uint8_t buf[2] = { regaddr, regval };

	ret = i2c_write(dev, buf, 2, devaddr);
	if (ret) {
		LOG_ERR("Call `i2c_write` failed: %d", ret);
		return ret;
	}

	return 0;
}
```

## Sken I²C {#i2c-scan}

Sběrnici I²C proskenujete příkazem shellu `i2c scan i2c@40003000`.

```
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:             -- -- -- -- -- -- -- -- -- -- -- --
10: 10 -- -- -- -- -- -- -- -- 19 -- -- -- -- -- --
20: 20 -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- 48 -- -- 4b -- -- -- --
50: -- 51 -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
6 devices found on i2c@40003000
```

Adresy senzorů I²C najdete v článku [Adresní prostor I²C](../hardware-description/i2c-address-space.md).

## Odkazy {#references}

Podrobnosti o API pro I²C najdete v dokumentaci API systému Zephyr:
https://docs.zephyrproject.org/latest/hardware/peripherals/i2c.html
