---
slug: uart-interface
title: Rozhraní UART
---
import Image from '@theme/IdealImage';

**UART** neboli **U**niversal **A**synchronous **R**eceiver-**T**ransmitter je asynchronní komunikační rozhraní, které se nejčastěji používá k sériovému přenosu dat mezi zařízeními. Data přenáší jen po dvou kanálech, **RX** (přijímač) a **TX** (vysílač), bez hodinového signálu.

:::info

Jak se rozhraní UART používá na platformě TOWER, popisuje kapitola [**Jak na: Rozhraní UART**](../firmware-sdk/how-to/uart-interface.md) a [**kapitola Debugování**](../firmware-development/firmware-debugging.md).

:::

:::tip

Pokud se chcete o UART dozvědět víc, přečtěte si [**článek o tomto rozhraní**](https://www.analog.com/en/analog-dialogue/articles/uart-a-hardware-communication-protocol.html).

:::

TOWER má 3 kanály UART: **UART0**, **UART1** a **UART2**. Kde je najdete, se dočtete v [**kapitole Pinout konektorů**](../hardware-modules/header-pinout.md).

## Nastavení UART {#uart-setup}

Kanál UART nemá hodinový signál, který by komunikaci synchronizoval, a proto musíte obě zařízení nastavit stejně, aby byla synchronizovaná a věděla, jak data vysílat a přijímat.

Rozhraní UART se nastavuje čtyřmi parametry:

- **Baud rate**: rychlost odesílání dat
- **Datové bity**: počet datových bitů v každém paketu (5–9 bitů)
- **Paritní bity**: můžete zvolit lichou, sudou nebo žádnou paritu
- **Stop bity**: určují konec jednoho paketu. Může jít o 1 nebo 2 bity

:::tip

Nastavení UART se často zapisuje zkráceně. Například 8 datových bitů, žádnou paritu a 1 stop bit zapíšete jako **8N1**.

:::

:::note

Na začátku každého paketu je vždy jeden **Start bit**.

:::

Pokud obě zařízení nastavíte stejně, dostanete čitelná data; jinak budou data nečitelná.

## Logování {#logging}

Mnoho zařízení posílá přes UART sériová data do terminálu počítače. Tak se odesílají logovací zprávy, které si pak uživatel nebo vývojář přečte.

TOWER k tomu používá UART2. Funkcemi API `twr_log_*` ze SDK můžete přes toto rozhraní posílat zprávy do počítače a aplikaci tak při vývoji debugovat.

Parametry rozhraní UART pro logování na platformě TOWER:

- **Baud rate**: **115200**
- **8 datových bitů**
- **Žádná parita**
- **1 stop bit**

:::tip

Jak na to, popisuje samostatná [**kapitola Debugování**](../firmware-development/firmware-debugging.md).

:::
