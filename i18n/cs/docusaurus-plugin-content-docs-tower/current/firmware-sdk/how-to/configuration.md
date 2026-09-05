---
slug: how-to-eeprom-twr-config
title: "Jak na to: Konfigurace"
description: "Funkce twrconfig vám pomohou snadno vytvořit proměnnou nebo strukturu proměnných, které se ukládají do interní EEPROM paměti."
---
import Image from '@theme/IdealImage';

Funkce `twr_config` vám pomohou snadno vytvořit **proměnnou** nebo **strukturu proměnných**, které se ukládají do interní **EEPROM paměti**.

Knihovna automaticky inicializuje vaši konfiguraci, když:
  - Běží poprvé
  - Parametr signature je jiný
  - Nová konfigurační struktura má jinou délku
  - EEPROM je poškozená

## Odkazy {#references}
- [**EEPROM Config SDK Module**](https://sdk.hardwario.com/group__twr__config.html)
- Příklad v GitHub repozitáři

## Inicializace {#initialization}

První parametr, `signature`, je **unikátní číslo pro váš firmware**. Díky tomu, pokud do zařízení **Core Module** nahrajete jiný firmware, který používá konfigurační strukturu se **stejnou délkou**, knihovna to pozná a konfiguraci znovu správně inicializuje.

Poslední parametr `init_config` může být:
- `NULL`: konfigurační struktura je při inicializaci **vynulována**
- **Ukazatel na strukturu**: init_config se při inicializaci zkopíruje do konfigurační struktury

:::info

V jednoduchém příkladu níže je struktura pro uložení konfigurace modulu PIR Module (`report_interval`, `pir_sensitivity`, `pir_deadtime`).

Ve funkci `application_init()` je ukázka, jak použít některé z funkcí dostupných v SDK modulu `twr_config_*`.

:::

<details>
<summary>
<b>
Jednoduchý příklad kódu konfigurace modulu PIR Module
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
