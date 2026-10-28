---
slug: how-to-i2c-bus
title: "How To: I²C Bus"
---
import Image from '@theme/IdealImage';

This is the main **bus TOWER uses** to communicate with most of the **sensors and modules**. All of them have their address in the TOWER I²C address space.

:::info

  Normally you don’t need to use I²C API, because **all the sensors have their libraries** in the [**SDK**](https://sdk.hardwario.com/group__twr__i2c.html) that gives you the measured data. You will need I²C APIs in case you want to implement a new I²C sensor or chip.

:::

:::note

This chapter goes over some code examples of how to use I²C API. To read more about I²C itself, you can visit [**I²C Bus chapter**](../../hardware-interfaces/i2c-bus.md).

:::

## References
- [**I²C SDK Module**](https://sdk.hardwario.com/group__twr__i2c.html)
- GitHub Repository Example

:::caution

To start working with **I²C** you always have to initialize it before you start working with it.

For example `twr_i2c_init(TWR_I2C_I2C0, TWR_I2C_SPEED_400_KHZ);` will initialize **I2C_0** with the speed of **400kHz**.

:::

## Examples

### Read

To read 8 or 16 bits, you can use the built-in SDK functions

```c showLineNumbers
bool twr_i2c_memory_read_8b (twr_i2c_channel_t channel, uint8_t device_address, uint32_t memory_address, uint8_t *data)
bool twr_i2c_memory_read_16b (twr_i2c_channel_t channel, uint8_t device_address, uint32_t memory_address, uint16_t *data)
```

:::info

For example, you can read 8 bits of data from memory address `0x01` over `I2C_0` from a device with address `0x48` and save the data to the `reg_configuration` variable.

:::

<details>
<summary>
<b>
Read 8 bits over I²C Code Example
</b>
</summary>

  ```c showLineNumbers
  uint8_t reg_configuration;
  twr_i2c_memory_read_8b(TWR_I2C_I2C0, 0x48, 0x01, &reg_configuration);
  ```

</details>

:::info

To read more data over **I²C** you have to create a `twr_i2c_memory_transfer_t` structure.

:::

<details>
<summary>
<b>
Read custom number of bits over I²C Code Example
</b>
</summary>

  ```c showLineNumbers
  twr_i2c_memory_transfer_t transfer;
  uint8_t rx_buffer[6];

  transfer.device_address = 0x48;
  transfer.memory_address = 0x28;
  transfer.buffer = rx_buffer;
  transfer.length = sizeof(rx_buffer);

  twr_i2c_memory_read(TWR_I2C_I2C0, &transfer);
  ```

</details>


### Write

To write 8 or 16 bits, you can use the built-in SDK functions

```c showLineNumbers
bool twr_i2c_memory_write_8b (twr_i2c_channel_t channel, uint8_t device_address, uint32_t memory_address, uint8_t data)
bool twr_i2c_memory_write_16b (twr_i2c_channel_t channel, uint8_t device_address, uint32_t memory_address, uint16_t data)
```

:::info

For example, you can write 8 bits, `0x81` to be specific, of data to memory address `0x01` over `I2C_0` to a device with address `0x48`.

:::

<details>
<summary>
<b>
Write 8 bits over I²C Code Example
</b>
</summary>

  ```c showLineNumbers
  twr_i2c_memory_write_8b(TWR_I2C_I2C0, 0x48, 0x01, 0x81);
  ```

</details>

:::info

To write more data over **I²C** you have to create a `twr_i2c_memory_transfer_t` structure.

:::

<details>
<summary>
<b>
Write custom number of bits over I²C Code Example
</b>
</summary>

  ```c showLineNumbers
  twr_i2c_memory_transfer_t transfer;
  uint8_t tx_buffer[2] = { 0x20, 0x00 };

  transfer.device_address = 0x48;
  transfer.memory_address = 0x28;
  transfer.buffer = tx_buffer;
  transfer.length = sizeof(tx_buffer);

  twr_i2c_memory_read(TWR_I2C_I2C0, &transfer);
  ```

</details>
