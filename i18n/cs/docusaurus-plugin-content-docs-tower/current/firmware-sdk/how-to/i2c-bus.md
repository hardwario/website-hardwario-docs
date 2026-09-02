---
slug: how-to-i2c-bus
title: "How To: Sběrnice I²C"
description: "Toto je hlavní sběrnice, kterou TOWER používá pro komunikaci s většinou senzorů a modulů. Všechny mají svou adresu v adresním prostoru TOWER I²C."
---
import Image from '@theme/IdealImage';

Toto je hlavní **sběrnice, kterou TOWER používá** pro komunikaci s většinou **senzorů a modulů**. Všechny mají svou adresu v adresním prostoru TOWER I²C.

:::info

  Běžně nepotřebujete používat I²C API, protože **všechny senzory mají své knihovny** v [**SDK**](https://sdk.hardwario.com/group__twr__i2c.html), které vám poskytnou naměřená data. I²C API budete potřebovat v případě, že chcete implementovat nový I²C senzor nebo čip.

:::

:::note

Tato kapitola prochází několik ukázek kódu, jak používat I²C API. Více o samotném I²C se dočtete v [**kapitole Sběrnice I²C**](../../hardware-interfaces/i2c-bus.md).

:::

## Odkazy {#references}
- [**I²C SDK Module**](https://sdk.hardwario.com/group__twr__i2c.html)
- Ukázka v GitHub repozitáři

:::caution

Než začnete se sběrnicí **I²C** pracovat, musíte ji vždy nejprve inicializovat.

Například `twr_i2c_init(TWR_I2C_I2C0, TWR_I2C_SPEED_400_KHZ);` inicializuje **I2C_0** rychlostí **400kHz**.

:::

## Příklady {#examples}

### Čtení {#read}

Pro čtení 8 nebo 16 bitů můžete použít vestavěné funkce SDK

```c showLineNumbers
bool twr_i2c_memory_read_8b (twr_i2c_channel_t channel, uint8_t device_address, uint32_t memory_address, uint8_t *data)
bool twr_i2c_memory_read_16b (twr_i2c_channel_t channel, uint8_t device_address, uint32_t memory_address, uint16_t *data)
```

:::info

Například můžete přečíst 8 bitů dat z adresy paměti `0x01` přes `I2C_0` ze zařízení s adresou `0x48` a data uložit do proměnné `reg_configuration`.

:::

<details>
<summary>
<b>
Ukázka kódu pro čtení 8 bitů přes I²C
</b>
</summary>
<p>

  ```c showLineNumbers
  uint8_t reg_configuration;
  twr_i2c_memory_read_8b(TWR_I2C_I2C0, 0x48, 0x01, &reg_configuration);
  ```

</p>
</details>

:::info

Pro čtení většího množství dat přes **I²C** musíte vytvořit strukturu `twr_i2c_memory_transfer_t`.

:::

<details>
<summary>
<b>
Ukázka kódu pro čtení libovolného počtu bitů přes I²C
</b>
</summary>
<p>

  ```c showLineNumbers
  twr_i2c_memory_transfer_t transfer;
  uint8_t rx_buffer[6];

  transfer.device_address = 0x48;
  transfer.memory_address = 0x28;
  transfer.buffer = rx_buffer;
  transfer.length = sizeof(rx_buffer);

  twr_i2c_memory_read(TWR_I2C_I2C0, &transfer);
  ```

</p>
</details>


### Zápis {#write}

Pro zápis 8 nebo 16 bitů můžete použít vestavěné funkce SDK

```c showLineNumbers
bool twr_i2c_memory_write_8b (twr_i2c_channel_t channel, uint8_t device_address, uint32_t memory_address, uint8_t data)
bool twr_i2c_memory_write_16b (twr_i2c_channel_t channel, uint8_t device_address, uint32_t memory_address, uint16_t data)
```

:::info

Například můžete zapsat 8 bitů dat, konkrétně `0x81`, na adresu paměti `0x01` přes `I2C_0` do zařízení s adresou `0x48`.

:::

<details>
<summary>
<b>
Ukázka kódu pro zápis 8 bitů přes I²C
</b>
</summary>
<p>

  ```c showLineNumbers
  twr_i2c_memory_write_8b(TWR_I2C_I2C0, 0x48, 0x01, 0x81);
  ```

</p>
</details>

:::info

Pro zápis většího množství dat přes **I²C** musíte vytvořit strukturu `twr_i2c_memory_transfer_t`.

:::

<details>
<summary>
<b>
Ukázka kódu pro zápis libovolného počtu bitů přes I²C
</b>
</summary>
<p>

  ```c showLineNumbers
  twr_i2c_memory_transfer_t transfer;
  uint8_t tx_buffer[2] = { 0x20, 0x00 };

  transfer.device_address = 0x48;
  transfer.memory_address = 0x28;
  transfer.buffer = tx_buffer;
  transfer.length = sizeof(tx_buffer);

  twr_i2c_memory_read(TWR_I2C_I2C0, &transfer);
  ```

</p>
</details>
