---
slug: how-to-eeprom-twr-config
title: "How To: Configuration"
---
import Image from '@theme/IdealImage';

`twr_config` functions help you to easily create a **variable** or **structure of variables** that are saved in internal **EEPROM memory**.

The library will automatically initialize your configuration when:
  - It runs for the first time
  - The signature parameter is different
  - The new configuration structure has a different length
  - The EEPROM is corrupted

## References
- [**EEPROM Config SDK Module**](https://sdk.hardwario.com/group__twr__config.html)
- GitHub Repository Example

## Initialization

The first parameter, `signature`, is a **unique number for your firmware**. This way if you load a different firmware to the **Core Module** that is using a configuration structure with **the same length**, the library will see that and initialize the configuration properly again.

The last parameter `init_config` can be:
- `NULL`: the config structure is **zeroed** when initialized
- **Pointer to structure**: the init_config is copied to the config structure when initialized

:::info

In the simple example below there is a structure for saving a PIR Module configuration (`report_interval`, `pir_sensitivity`, `pir_deadtime`).

In the `application_init()` is some showcase on how to use some of the functions available in the `twr_config_*` SDK module.

:::

<details>
<summary>
<b>
Simple PIR Module Configuration Code Example
</b>
</summary>
<p>

  ```c showLineNumbers
  #include <application.h>

  // Example structure that save configuration of PIR detector
  typedef struct config_t
  {
      uint16_t report_interval;
      uint8_t pir_sensitivity;
      uint16_t pir_deadtime;

  } config_t;

  config_t config;

  void application_init()
  {
      // Load configuration
      twr_config_init(0x12345678, &config, sizeof(config), NULL);

      // Change parameter
      config.report_interval = 500;

      // Save config to EEPROM
      twr_config_save();

      // Reset configuration
      twr_config_reset();
  }
  ```

</p>
</details>
