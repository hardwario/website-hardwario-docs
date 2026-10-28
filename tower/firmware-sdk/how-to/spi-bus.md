---
slug: how-to-spi-bus
title: "How To: SPI Bus"
---
import Image from '@theme/IdealImage';

:::info

This chapter goes over how to use TOWER SPI SDK Module if you want to read about the bus itself read the [**SPI Interface chapter**](../../hardware-interfaces/spi-interface.md).

:::

## References
- [**SPI SDK Module**](https://sdk.hardwario.com/group__twr__spi.html)
- GitHub Repository Example

## SPI Speed

You can choose from **several communication speeds**.

:::info

  The communication speed is limited by the maximal speed that the slave device can communicate, the length of the wires, noise, current consumption or electromagnetic radiation limits.

:::

```c showLineNumbers
TWR_SPI_SPEED_1_MHZ
TWR_SPI_SPEED_2_MHZ
TWR_SPI_SPEED_4_MHZ
TWR_SPI_SPEED_8_MHZ
TWR_SPI_SPEED_16_MHZ
```

## SPI Mode

Clock polarity and clock phase define when the output data is valid. Whether it's on the rising or falling edge.

This information can be found in the datasheet of the slave device.

```c showLineNumbers
TWR_SPI_MODE_0 // SPI mode of operation is 0 (CPOL = 0, CPHA = 0)
TWR_SPI_MODE_1 // SPI mode of operation is 1 (CPOL = 0, CPHA = 1)
TWR_SPI_MODE_2 // SPI mode of operation is 2 (CPOL = 1, CPHA = 0)
TWR_SPI_MODE_3 // SPI mode of operation is 3 (CPOL = 1, CPHA = 1)
```

## Transmitting and Receiving Data Examples

### Synchronous transfer
:::info

You need to create **transmit** and **receive** buffer.

Then you start the **blocking transfer** and you have to wait for it to finish.

:::

<details>
<summary>
<b>
Synchronous SPI Transfer Code Example
</b>
</summary>

  ```c showLineNumbers
  uint8_t tx_buffer[2] = { 0x20, 0x00 };
  uint8_t rx_buffer[2];

  twr_spi_transfer(tx_buffer, rx_buffer, sizeof(rx_buffer));
  ```

</details>

:::note

If you are just **transmitting** data, then replace the `rx_buffer` with `NULL` and vice-versa for just **receiving**.

The function returns `false` if the previous asynchronous transfer has not ended yet.

:::


### Asynchronous transfer
:::info

This is a **non-blocking** transfer where the **callback function is called** when the transfer is completed.

:::

<details>
<summary>
<b>
Asynchronous SPI Transfer Code Example
</b>
</summary>

  ```c showLineNumbers
  // In async transmit the buffers must be global or
  // in the function but defined as a static
  uint8_t tx_buffer[2] = { 0x20, 0x00 };
  uint8_t rx_buffer[2];

  void send_data(void)
  {
      // Check if previous asynchronous transfer is not running
      if (twr_spi_is_ready())
      {
          // Set event handler and optional parameter (NULL for now)
          twr_spi_async_transfer(tx_buffer, rx_buffer, sizeof(tx_buffer), _twr_spi_event_handler, NULL)
      }
  }

  void _twr_spi_event_handler(twr_spi_event_t event, void *event_param)
  {
      (void) event_param;

      if (event == TWR_SPI_EVENT_DONE)
      {
          // Transfer done, you can for example handle received data or initiate a new transfer
      }
  }
  ```

</details>
