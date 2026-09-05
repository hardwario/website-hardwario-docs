---
slug: how-to-eeprom
title: "How To: EEPROM"
---
import Image from '@theme/IdealImage';

**EEPROM** is a special kind of memory. It is small (6 KB on [**Core Module**](../../hardware-modules/about-core-module.md) chip) memory with a limited number of **write/erase cycles**. It is **non-volatile memory**, which means that it does not require power to retain stored information. This means that bytes written/stored inside the EEPROM will **stay there until erased/rewritten** (even without the power)

:::info

Don’t be afraid of limited W/E cycles. In standard conditions, the chip guarantees **100 000 cycles**. Remember that those cycles are **Write/Erase**.

Reading from the EEPROM does not count, so it is completely **safe to read** from it as much as you wish.

:::


## References
- [**EEPROM SDK Module**](https://sdk.hardwario.com/group__twr__eeprom.html)
- GitHub Repository Example

### EEPROM Size
[**TOWER Core Module**](../../hardware-modules/about-core-module.md) has 6 KB EEPROM included. In case you need to find this value out inside your code, there is a function for this inside the SDK: `size_t twr_eeprom_get_size(void)`

## Read/Write Example

:::info

  In this example, we will write the float value and string to EEPROM immediately after the Core Module boots. With every press of a button, the data will be retrieved from EEPROM and sent to the computer. To test that the memory is persistent you can try to comment both `twr_eeprom_write` lines out (after running the original example once).

  It should still work and the debug should write the same string.

:::

:::note

Please note that some of our modules (currently `twr_radio_*` module only) use a **few last dozens of bytes** in EEPROM. If you use those modules, remember to use the memory addresses from **0 up to 6000**.

This makes sure that no data will be overwritten.

:::

:::info

Expected output of the example below.

```bash showLineNumbers
EEPROM size: 6144
Data:
3.141590
hello world!
```

:::

<details>
<summary>
<b>
EEPROM Test Code Example
</b>
</summary>
<p>




  ```c showLineNumbers
  #include <application.h>

  twr_button_t button;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          size_t eeprom = twr_eeprom_get_size();
          char readEeprom[13];
          float readFloat;

          twr_eeprom_read(0, &readFloat, 4);
          twr_eeprom_read(4, readEeprom, 12);
          readEeprom[12] = '\0';

          twr_log_debug("EEPROM size: %d\r\nData:\r\n%f\r\n%s", eeprom, readFloat, readEeprom);
      }
  }

  void application_init(void)
  {
      twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_ABS);

      float toWriteFloat = 3.14159;
      char toWrite[] = "hello world!";
      twr_eeprom_write(0, &toWriteFloat, sizeof(toWriteFloat));
      twr_eeprom_write(sizeof(toWriteFloat), toWrite, sizeof(toWrite));

      // Initialize button
      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);
  }
  ```

</p>
</details>
