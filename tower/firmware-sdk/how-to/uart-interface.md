---
slug: how-to-uart-interface
title: "How To: UART Interface"
---
import Image from '@theme/IdealImage';

[**Core Module**](../../hardware-modules/about-core-module.md) has 3 UARTs you can use. The signal for each channel is named TXD**x**, RXD**x** where **x** is 0, 1 or 2.

Please refer to the module drawing pinout where you find the signal's positions.

## References
- [**UART SDK Module**](https://sdk.hardwario.com/group__twr__uart.html)
- GitHub Repository Example

## UART Write

### Synchronous Write

Function `twr_uart_write` needs to know how **many bytes to send**. That’s why you need to use `sizeof(uart_tx)`.

:::info

This example will write a `Hello world` through the **UART1** with the baud rate of **115200**.

There will be **8 data bits, none parity and 1 stop bit**.

This writing is blocking, you will have to wait before the write is done.

:::

<details>
<summary>
<b>
Synchronous UART Write Code Example
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


### Asynchronous Write

:::info

This is a little bit complicated because you need to create a FIFO structure and a FIFO buffer array. Then you initialize the FIFO and assign it to the UART.

In this example, we demonstrate just the **async write**.

:::

<details>
<summary>
<b>
Asynchronous UART Write Code Example
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

## UART Read

There are again two options to **read received bytes**. You can read data **synchronously** in your task, or **asynchronously** using callbacks.

### Synchronous Read

<details>
<summary>
<b>
Synchronous UART Read Code Example
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

### Asynchronous Read

:::info

This example does asynchronous send and receives of data on `TWR_UART_UART1` with the baud rate of **115200**.

There will be **8 data bits, none parity and 1 stop bit**.

:::

:::caution

This example is not low power. If you start UART reading with `twr_uart_async_read_start` function the **Core Module** will not go to sleep until you call the `twr_uart_async_read_stop`.

:::


<details>
<summary>
<b>
Asynchronous UART Read Code Example
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
