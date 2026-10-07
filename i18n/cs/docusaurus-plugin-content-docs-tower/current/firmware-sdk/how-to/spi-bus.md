---
slug: how-to-spi-bus
title: "Jak na: Sběrnice SPI"
---
import Image from '@theme/IdealImage';

:::info

Tato kapitola popisuje, jak používat modul SDK pro SPI. O samotné sběrnici se dočtete v [**kapitole Rozhraní SPI**](../../hardware-interfaces/spi-interface.md).

:::

## Odkazy {#references}
- [**Modul SDK pro SPI**](https://sdk.hardwario.com/group__twr__spi.html)
- Příklad v repozitáři na GitHubu

## Rychlost SPI {#spi-speed}

Můžete vybírat z **několika komunikačních rychlostí**.

:::info

  Rychlost komunikace omezuje maximální rychlost podřízeného zařízení, délka vodičů, šum, odběr proudu nebo limity elektromagnetického vyzařování.

:::

```c showLineNumbers
TWR_SPI_SPEED_1_MHZ
TWR_SPI_SPEED_2_MHZ
TWR_SPI_SPEED_4_MHZ
TWR_SPI_SPEED_8_MHZ
TWR_SPI_SPEED_16_MHZ
```

## Režim SPI {#spi-mode}

Polarita a fáze hodinového signálu určují, kdy jsou výstupní data platná, tedy jestli na náběžné, nebo sestupné hraně.

Tuto informaci najdete v dokumentaci (datasheetu) podřízeného zařízení.

```c showLineNumbers
TWR_SPI_MODE_0 // SPI mode of operation is 0 (CPOL = 0, CPHA = 0)
TWR_SPI_MODE_1 // SPI mode of operation is 1 (CPOL = 0, CPHA = 1)
TWR_SPI_MODE_2 // SPI mode of operation is 2 (CPOL = 1, CPHA = 0)
TWR_SPI_MODE_3 // SPI mode of operation is 3 (CPOL = 1, CPHA = 1)
```

## Příklady vysílání a příjmu dat {#transmitting-and-receiving-data-examples}

### Synchronní přenos {#synchronous-transfer}
:::info

Je potřeba vytvořit **vysílací** a **přijímací** buffer.

Pak spustíte **blokující přenos** a počkáte, až skončí.

:::

<details>
<summary>
<b>
Příklad kódu: synchronní přenos SPI
</b>
</summary>
<p>

  ```c showLineNumbers
  uint8_t tx_buffer[2] = { 0x20, 0x00 };
  uint8_t rx_buffer[2];

  twr_spi_transfer(tx_buffer, rx_buffer, sizeof(rx_buffer));
  ```

</p>
</details>

:::note

Pokud data jen **vysíláte**, nahraďte `rx_buffer` hodnotou `NULL`; při pouhém **příjmu** naopak.

Funkce vrací `false`, pokud předchozí asynchronní přenos ještě neskončil.

:::


### Asynchronní přenos {#asynchronous-transfer}
:::info

Jde o **neblokující** přenos: po jeho dokončení se **zavolá funkce callback**.

:::

<details>
<summary>
<b>
Příklad kódu: asynchronní přenos SPI
</b>
</summary>
<p>

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

</p>
</details>
