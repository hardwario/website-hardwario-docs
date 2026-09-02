---
slug: how-to-rtc-clock
title: "How To: Hodiny RTC"
description: "Do jejích hardwarových registrů můžete uložit datum a čas a hodiny běží dál, i když znovu nahrajete firmware nebo resetujete procesor."
---
import Image from '@theme/IdealImage';

**R**eal **T**ime **C**lock (**RTC**) je hardwarová periferie v **mikrokontroléru STM32**. Používá se ve scheduleru pro plánování úloh a zároveň umí měřit reálný čas.

Do jejích hardwarových registrů můžete uložit **datum** a **čas** a hodiny běží dál, i když znovu nahrajete firmware nebo resetujete procesor.

:::caution

  Protože **STM32** v pouzdře **LQFP48** nemá **pin pro záložní baterii**, musíte zařízení nechat připojené **alespoň k jednomu zdroji** napájení, pokud chcete, aby **RTC dál počítalo**. Takže když potřebujete vyměnit bateriový modul, můžete Core Module nechat připojený přes USB, aby RTC běželo dál.

:::

## Odkazy {#references}
- [**RTC SDK Module**](https://sdk.hardwario.com/group__twr__onewire__relay.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-lcd-clock-with-stopwatch/blob/main/src/application.c)

## Struktura RTC {#rtc-structure}

Knihovna RTC používá standardní [**strukturu jazyka C pro čas**](https://www.tutorialspoint.com/c_standard_library/time_h.htm).

Obsahuje **sekundy**, **minuty**, **hodiny**, **den**, **měsíc**, **rok**. Pokud čtete RTC, je **timestamp** vyplněn správným UNIX timestampem.

## Nastavení data a času {#set-date-and-time}

:::info

Tento příklad nastaví RTC na **10.5.2020 18:26:10**.

:::

<details>
<summary>
<b>
Příklad kódu pro nastavení struktury RTC
</b>
</summary>
<p>

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
</p>
</details>

:::tip

Registr roku počítá od roku **1900**, takže pokud chcete nastavit rok **2020**, měli byste do proměnné `tm_year` zapsat hodnotu **120**.

Hodnota registru roku 0 znamená 1900 a hodnota 199 znamená 2099.

:::

## Získání data a času {#get-date-and-time}

<details>
<summary>
<b>
Příklad kódu pro čtení datetime z RTC
</b>
</summary>
<p>

  ```c showLineNumbers
  struct tm datetime;
  twr_rtc_get_datetime(&datetime);
  twr_log_debug("$DATE: \"%d-%02d-%02dT%02d:%02d:%02dZ\"", datetime.tm_year, datetime.tm_mon, datetime.tm_mday, datetime.tm_hour, datetime.tm_min, datetime.tm_sec);
  ```

</p>
</details>

:::tip

Abyste získali přesný **rok** v běžném formátu, stačí k hodnotě v `datetime.tm_year` přičíst **1900**.

:::
