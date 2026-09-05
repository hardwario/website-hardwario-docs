---
slug: uart-interface
title: Rozhraní UART
description: "Více o použití rozhraní UART se zařízením TOWER si můžete přečíst v kapitole How To: Rozhraní UART nebo v kapitole o debugování."
---
import Image from '@theme/IdealImage';

**UART** neboli **U**niversal **A**synchronous **R**eceiver-**T**ransmitter je asynchronní komunikační rozhraní používané většinou k přenosu sériových dat mezi zařízeními. K odesílání dat používá pouze dva kanály **RX** (přijímač) a **TX** (vysílač), není potřeba připojovat žádný hodinový signál.

:::info

Více o použití rozhraní UART se zařízením TOWER si můžete přečíst v kapitole [**How To: Rozhraní UART**](../firmware-sdk/how-to/uart-interface.md) nebo v [**kapitole o debugování**](../firmware-development/firmware-debugging.md).

:::

:::tip

Pokud se chcete o [**UART dozvědět více, existuje o něm článek**](https://www.analog.com/en/analog-dialogue/articles/uart-a-hardware-communication-protocol.html).

:::

TOWER má 3 kanály UART, **UART0** **UART1** **UART2**, kde je najdete si můžete přečíst v [**kapitole Pinout headerů**](../hardware-modules/header-pinout.md)

## Nastavení UART {#uart-setup}

Protože kanál UART nemá hodinový signál, který by komunikaci synchronizoval, musíte nastavit obě komunikující zařízení tak, aby byla synchronizovaná a věděla, jak data vysílat a přijímat.

Rozhraní UART lze nastavit třemi parametry

- **Baud rate**: rychlost, s jakou budou data odesílána
- **Datové bity**: počet datových bitů v každém paketu (5–9 bitů)
- **Paritní bity**: můžete zvolit lichou, sudou nebo žádnou paritu
- **Stop bity**: určují konec jednoho paketu. Může jít o 1 nebo 2 bity

:::tip

Konfiguraci nastavení UART můžete vidět v krátkém formátu. Například 8 datových bitů, žádná parita a 1 stop bit lze zapsat jako **8N1**.

:::

:::note

Na začátku každého paketu je vždy jeden **Start bit**.

:::

Pokud nastavíte obě zařízení stejně, získáte použitelná data, pokud ne, obdržíte nečitelná data.

## Logování {#logging}

Mnoho zařízení používá UART k odesílání sériových dat ze zařízení do terminálu počítače. Takto se odesílají logovací zprávy, aby si je uživatel/vývojář mohl přečíst.

TOWER k tomu používá UART2, pomocí SDK API `twr_log_*` můžete odesílat zprávy přes toto rozhraní UART do svého PC, takže můžete debugovat během vývoje své aplikace.

Parametry logovacího UART zařízení TOWER

- **Baud rate**: **115200**
- **8 datových bitů**
- **Žádná parita**
- **1 stop bit**

:::tip

Jak to udělat se dozvíte v samostatné [**kapitole o debugování**](../firmware-development/firmware-debugging.md).

:::
