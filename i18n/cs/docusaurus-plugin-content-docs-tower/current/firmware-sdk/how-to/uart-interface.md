---
slug: how-to-uart-interface
title: "How To: Rozhraní UART"
description: "Core Module má 3 rozhraní UART, která můžete využít. Signály jednotlivých kanálů se jmenují TXDx, RXDx, kde x je 0, 1 nebo 2."
---
import Image from '@theme/IdealImage';

[**Core Module**](../../hardware-modules/about-core-module.md) má 3 rozhraní UART, která můžete využít. Signály jednotlivých kanálů se jmenují TXD**x**, RXD**x**, kde **x** je 0, 1 nebo 2.

Pozice signálů najdete ve výkresu s pinoutem modulu.

## Odkazy {#references}
- [**UART SDK Module**](https://sdk.hardwario.com/group__twr__uart.html)
- Příklad v repozitáři na GitHubu

## Zápis na UART {#uart-write}

### Synchronní zápis {#synchronous-write}

Funkce `twr_uart_write` potřebuje vědět, **kolik bajtů se má odeslat**. Proto je nutné použít `sizeof(uart_tx)`.

:::info

Tento příklad zapíše `Hello world` přes **UART1** s přenosovou rychlostí **115200**.

Nastavení bude **8 datových bitů, bez parity a 1 stop bit**.

Tento zápis je blokující, budete muset počkat, dokud se zápis nedokončí.

:::

<details>
<summary>
<b>
Příklad kódu pro synchronní zápis na UART
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  void application_init()
  {
      twr_uart_init(TWR_UART_UART1, TWR_UART_BAUDRATE_115200, TWR_UART_SETTING_8N1);
      char uart_tx[] = "Hello world\r\n";
      twr_uart_write(TWR_UART_UART1, uart_tx, strlen(uart_tx));
  }
  ```

</p>
</details>


### Asynchronní zápis {#asynchronous-write}

:::info

Tohle je trochu složitější, protože musíte vytvořit strukturu FIFO a pole bufferu FIFO. Potom FIFO inicializujete a přiřadíte ho k rozhraní UART.

V tomto příkladu ukazujeme pouze **asynchronní zápis**.

:::

<details>
<summary>
<b>
Příklad kódu pro asynchronní zápis na UART
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_fifo_t tx_fifo;
  uint8_t tx_fifo_buffer[32];

  void uart_handler(twr_uart_channel_t channel, twr_uart_event_t event, void *param)
  {
      if (event == TWR_UART_EVENT_ASYNC_WRITE_DONE)
      {
          // here you can for example send more data
      }
  }

  void application_init()
  {
      twr_uart_init(TWR_UART_UART1, TWR_UART_BAUDRATE_115200, TWR_UART_SETTING_8N1);
      twr_uart_set_event_handler(TWR_UART_UART1, uart_handler, NULL);

      twr_fifo_init(&tx_fifo, tx_fifo_buffer, sizeof(tx_fifo_buffer));
      // We set only TX FIFO, for RX_FIFO we pass NULL
      twr_uart_set_async_fifo(TWR_UART_UART1, &tx_fifo, NULL);

      char uart_tx[] = "Hello world\r\n";
      twr_uart_async_write(TWR_UART_UART1, uart_tx, strlen(uart_tx));
  }
  ```

</p>
</details>

## Čtení z UART {#uart-read}

Pro **čtení přijatých bajtů** máte opět dvě možnosti. Data můžete číst **synchronně** ve své úloze, nebo **asynchronně** pomocí callbacků.

### Synchronní čtení {#synchronous-read}

<details>
<summary>
<b>
Příklad kódu pro synchronní čtení z UART
</b>
</summary>
<p>

  ```c showLineNumbers
  void application_task()
  {
      // Define receive buffer
      uint8_t uart_rx[32];
      // Synchronous reading
      size_t number_of_rx_bytes = twr_uart_read(TWR_UART_UART1, uart_rx, sizeof(uart_rx), 500);

      char uart_tx[32];
      snprintf(uart_tx, sizeof(uart_tx), "RX bytes: %d\r\n", number_of_rx_bytes);
      twr_uart_write(TWR_UART_UART1, uart_tx, strlen(uart_tx));

      twr_scheduler_plan_current_now();
  }
  ```

</p>
</details>

### Asynchronní čtení {#asynchronous-read}

:::info

Tento příklad asynchronně odesílá a přijímá data na `TWR_UART_UART1` s přenosovou rychlostí **115200**.

Nastavení bude **8 datových bitů, bez parity a 1 stop bit**.

:::

:::caution

Tento příklad není energeticky úsporný. Pokud spustíte čtení z UART funkcí `twr_uart_async_read_start`, zařízení **Core Module** nepřejde do režimu spánku, dokud nezavoláte `twr_uart_async_read_stop`.

:::


<details>
<summary>
<b>
Příklad kódu pro asynchronní čtení z UART
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  twr_fifo_t tx_fifo;
  twr_fifo_t rx_fifo;
  uint8_t tx_fifo_buffer[64];
  uint8_t rx_fifo_buffer[64];

  void uart_handler(twr_uart_channel_t channel, twr_uart_event_t event, void *param)
  {
      uint8_t rx_data[32];

      if (event == TWR_UART_EVENT_ASYNC_WRITE_DONE)
      {
          // here you can for example send more data
      }
      if (event == TWR_UART_EVENT_ASYNC_READ_DATA)
      {
          // Read data from FIFO by a single byte as you receive it
          size_t number_of_rx_bytes = twr_uart_async_read(TWR_UART_UART1, rx_data, sizeof(rx_data));
          char uart_tx[32];
          snprintf(uart_tx, sizeof(uart_tx), "RX: %d\r\n", number_of_rx_bytes);
          twr_uart_async_write(TWR_UART_UART1, uart_tx, strlen(uart_tx));
      }
      if (event == TWR_UART_EVENT_ASYNC_READ_TIMEOUT)
      {
          // No data received during set timeout period
          char uart_tx[] = "Timeout\r\n";
          twr_uart_async_write(TWR_UART_UART1, uart_tx, strlen(uart_tx));
          // You can also read received bytes here instead of TWR_UART_EVENT_ASYNC_READ_DATA
      }
  }

  void application_init()
  {
      twr_uart_init(TWR_UART_UART1, TWR_UART_BAUDRATE_115200, TWR_UART_SETTING_8N1);
      twr_uart_set_event_handler(TWR_UART_UART1, uart_handler, NULL);

      twr_fifo_init(&tx_fifo, tx_fifo_buffer, sizeof(tx_fifo_buffer));
      twr_fifo_init(&rx_fifo, rx_fifo_buffer, sizeof(rx_fifo_buffer));

      twr_uart_set_async_fifo(TWR_UART_UART1, &tx_fifo, &rx_fifo);

      twr_uart_async_read_start(TWR_UART_UART1, 500);

      char uart_tx[] = "Hello world\r\n";
      twr_uart_async_write(TWR_UART_UART1, uart_tx, strlen(uart_tx));
  }
  ```

</p>
</details>
