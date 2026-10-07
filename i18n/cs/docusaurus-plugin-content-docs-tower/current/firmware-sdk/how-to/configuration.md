---
slug: how-to-eeprom-twr-config
title: "Jak na: Konfigurace"
---
import Image from '@theme/IdealImage';

Funkcemi `twr_config` snadno vytvoříte **proměnnou** nebo **strukturu proměnných**, které se ukládají do interní **paměti EEPROM**.

Knihovna konfiguraci automaticky inicializuje, když:
  - Běží poprvé
  - Parametr signature se změnil
  - Nová konfigurační struktura má jinou délku
  - EEPROM je poškozená

## Odkazy {#references}
- [**Modul SDK pro konfiguraci v EEPROM**](https://sdk.hardwario.com/group__twr__config.html)
- Příklad v repozitáři na GitHubu

## Inicializace {#initialization}

První parametr, `signature`, je **jedinečné číslo vašeho firmwaru**. Když pak do modulu **Core Module** nahrajete jiný firmware s konfigurační strukturou **stejné délky**, knihovna to pozná a konfiguraci správně inicializuje znovu.

Poslední parametr `init_config` může být:
- `NULL`: konfigurační struktura se při inicializaci **vynuluje**
- **Ukazatel na strukturu**: init_config se při inicializaci zkopíruje do konfigurační struktury

:::info

V jednoduchém příkladu níže je struktura pro uložení konfigurace modulu PIR Module (`report_interval`, `pir_sensitivity`, `pir_deadtime`).

Ve funkci `application_init()` je ukázka, jak použít některé funkce z modulu SDK `twr_config_*`.

:::

<details>
<summary>
<b>
Příklad kódu: jednoduchá konfigurace modulu PIR Module
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
