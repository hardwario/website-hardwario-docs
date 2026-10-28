---
slug: how-to-rtc-clock
title: "How To: RTC Clock"
---
import Image from '@theme/IdealImage';

**R**eal **T**ime **C**lock (**RTC**) is a hardware peripheral in the **STM32 microcontroller**. It is used in scheduler for task planning and also can measure real-time.

You can save **date** and **time** into its hardware registers and the clock is running even if you flash it again or reset the processor.

:::caution

  Because the **STM32** in the **LQFP48** package does not have a **battery backup pin**, you have to keep connected to **at least a single source** of power if you would like **to keep the RTC counting**. So if you need to change the battery module you can keep the Core Module connected over USB to keep the RTC running.

:::

## References
- [**RTC SDK Module**](https://sdk.hardwario.com/group__twr__onewire__relay.html)
- [**GitHub Repository Example**](https://github.com/hardwario/twr-lcd-clock-with-stopwatch/blob/main/src/application.c)

## RTC Structure

RTC library uses standard [**C language structure for time**](https://www.tutorialspoint.com/c_standard_library/time_h.htm).

It contains **seconds**, **minutes**, **hours**, **day**, **month**, **year**. If you read the RTC then the **timestamp** is filled with the proper UNIX timestamp.

## Set Date and Time

:::info

This example sets up the RTC to **10.5.2020 18:26:10**.

:::

<details>
<summary>
<b>
RTC Structure Setup Code Example
</b>
</summary>

  ```c showLineNumbers
  struct tm datetime;

  datetime.tm_hour = 18;
  datetime.tm_min = 26;
  datetime.tm_sec = 10;

  datetime.tm_mon = 10;
  datetime.tm_mday = 5;
  datetime.tm_year = 120;

  twr_rtc_set_datetime(&datetime, 0);
  ```

</details>

:::tip

The year register counts from the year **1900** so if you want to set the year **2020** you should write the value **120** to the `tm_year` variable.

Year register value 0 stands for 1900 and value 199 stands for 2099.

:::

## Get Date and Time

<details>
<summary>
<b>
RTC Get Datetime Code Example
</b>
</summary>

  ```c showLineNumbers
  struct tm datetime;
  twr_rtc_get_datetime(&datetime);
  twr_log_debug("$DATE: \"%d-%02d-%02dT%02d:%02d:%02dZ\"", datetime.tm_year, datetime.tm_mon, datetime.tm_mday, datetime.tm_hour, datetime.tm_min, datetime.tm_sec);
  ```

</details>

:::tip

To get the exact **year** in the normal format you can just add **1900** to the value in `datetime.tm_year`.

:::
