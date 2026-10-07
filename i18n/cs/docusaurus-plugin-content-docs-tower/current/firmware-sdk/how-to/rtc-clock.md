---
slug: how-to-rtc-clock
title: "Jak na: Hodiny RTC"
---
import Image from '@theme/IdealImage';

**R**eal **T**ime **C**lock (**RTC**) je hardwarová periferie v **mikrokontroléru STM32**. Měří reálný čas a využívá ji i plánovač k plánování úloh.

Do jejích hardwarových registrů můžete uložit **datum** a **čas** a hodiny běží dál, i když znovu nahrajete firmware nebo resetujete procesor.

:::caution

  Mikrokontrolér **STM32** v pouzdře **LQFP48** nemá **pin pro záložní baterii**. Pokud chcete, aby **RTC dál počítalo**, musí zůstat připojený **alespoň jeden zdroj** napájení. Když tedy potřebujete vyměnit bateriový modul, nechte modul Core Module připojený přes USB a RTC poběží dál.

:::

## Odkazy {#references}
- [**Modul SDK pro RTC**](https://sdk.hardwario.com/group__twr__onewire__relay.html)
- [**Příklad v repozitáři na GitHubu**](https://github.com/hardwario/twr-lcd-clock-with-stopwatch/blob/main/src/application.c)

## Struktura RTC {#rtc-structure}

Knihovna RTC používá standardní [**strukturu jazyka C pro čas**](https://www.tutorialspoint.com/c_standard_library/time_h.htm).

Obsahuje **sekundy**, **minuty**, **hodiny**, **den**, **měsíc** a **rok**. Při čtení RTC se do položky **timestamp** doplní správné časové razítko UNIX.

## Nastavení data a času {#set-date-and-time}

:::info

Tento příklad nastaví RTC na **10.5.2020 18:26:10**.

:::

<details>
<summary>
<b>
Příklad kódu: nastavení struktury RTC
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

Registr roku počítá od roku **1900**, takže pokud chcete nastavit rok **2020**, zapište do proměnné `tm_year` hodnotu **120**.

Hodnota registru roku 0 znamená 1900 a hodnota 199 znamená 2099.

:::

## Získání data a času {#get-date-and-time}

<details>
<summary>
<b>
Příklad kódu: čtení data a času z RTC
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

**Rok** v běžném formátu získáte tak, že k hodnotě v `datetime.tm_year` přičtete **1900**.

:::
