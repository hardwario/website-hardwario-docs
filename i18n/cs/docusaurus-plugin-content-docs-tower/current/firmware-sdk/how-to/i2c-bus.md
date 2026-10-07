---
slug: how-to-i2c-bus
title: "Jak na: Sběrnice I²C"
---
import Image from '@theme/IdealImage';

Je to hlavní **sběrnice, přes kterou TOWER komunikuje** s většinou **senzorů a modulů**. Každý z nich má svou adresu v adresním prostoru I²C platformy TOWER.

:::info

  API pro I²C běžně nepotřebujete, protože **všechny senzory mají své knihovny** v [**SDK**](https://sdk.hardwario.com/group__twr__i2c.html), které vám naměřená data předají. API pro I²C budete potřebovat, jen pokud chcete implementovat nový senzor nebo čip s rozhraním I²C.

:::

:::note

Tato kapitola na příkladech kódu ukazuje, jak API pro I²C používat. Více o samotné sběrnici I²C se dočtete v [**kapitole Sběrnice I²C**](../../hardware-interfaces/i2c-bus.md).

:::

## Odkazy {#references}
- [**Modul SDK pro I²C**](https://sdk.hardwario.com/group__twr__i2c.html)
- Příklad v repozitáři na GitHubu

:::caution

Než se sběrnicí **I²C** začnete pracovat, musíte ji vždy inicializovat.

Například `twr_i2c_init(TWR_I2C_I2C0, TWR_I2C_SPEED_400_KHZ);` inicializuje **I2C_0** na rychlost **400kHz**.

:::

## Příklady {#examples}

### Čtení {#read}

Ke čtení 8 nebo 16 bitů slouží vestavěné funkce SDK:

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
Příklad kódu: čtení 8 bitů přes I²C
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

Ke čtení většího množství dat přes **I²C** musíte vytvořit strukturu `twr_i2c_memory_transfer_t`.

:::

<details>
<summary>
<b>
Příklad kódu: čtení libovolného počtu bitů přes I²C
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

K zápisu 8 nebo 16 bitů slouží vestavěné funkce SDK:

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
Příklad kódu: zápis 8 bitů přes I²C
</b>
</summary>
<p>

  ```c showLineNumbers
  twr_i2c_memory_write_8b(TWR_I2C_I2C0, 0x48, 0x01, 0x81);
  ```

</p>
</details>

:::info

K zápisu většího množství dat přes **I²C** musíte vytvořit strukturu `twr_i2c_memory_transfer_t`.

:::

<details>
<summary>
<b>
Příklad kódu: zápis libovolného počtu bitů přes I²C
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
