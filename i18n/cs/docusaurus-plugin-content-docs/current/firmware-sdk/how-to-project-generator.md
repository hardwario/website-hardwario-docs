---
slug: how-to-project-generator
title: "Jak na: Project Generator"
description: "Používá se také ke generování různých variant katalogových aplikací. Různé varianty najdete v souborech project.yaml."
---
import Image from '@theme/IdealImage';

# Jak na: Project Generator {#how-to-project-generator}

**CHESTER SDK Project Generator** zjednodušuje konfiguraci projektu tím, že poskytuje strukturovaný přístup k jeho nastavení, celý založený na konfiguraci **YAML**.

Používá se také ke generování různých **variant** katalogových aplikací. Různé varianty najdete v souborech `project.yaml`.

Poté zavoláte `west chester-update --variant "CHESTER Clime 1W"` pro aktualizaci souborů projektu a následně `west build` pro rekompilaci projektu.

## Příkaz WEST {#west-command}

`west chester-update <name>` Vygeneruje soubory podle funkcí v project.yaml.

`west chester-update <name> --list` Vypíše všechny dostupné varianty.

`west chester-update <name> --variant <variant-name>` Vygeneruje soubory podle funkcí varianty v project.yaml.

`west chester-update <name> --version <v.X.Y.Z>` Vygeneruje soubory podle project.yaml s použitím zadané hodnoty `fw_version`.

Příklady:

`west chester-update clime --variant chester-clime-z`

`west chester-update clime --variant chester-clime-rtd --version v3.2.1`

:::tip

  Po jakékoli změně v `project.yaml` lze tento příkaz zavolat a aktualizovat projekt novými změnami.

:::

:::info

  Všechny příkazy lze spustit bez zadání `<name>`, pokud už se nacházíte ve složce projektu, s výjimkou příkazu `west chester-init`.

:::

## ** Project YAML ** {#project-yaml}

Konfigurační soubor `project.yaml` je základním kamenem pro nastavení a přizpůsobení vašeho projektu.

Tento kompletní návod popisuje krok za krokem, jak projekt efektivně nakonfigurovat pomocí uvedené struktury YAML.

### Informace o projektu {#project-information}

Zadejte základní údaje o projektu podle konfigurace YAML.
```yaml
project:
    variant: Variant-name
    company: 2024 COMPANY a.s.
    license: 'SPDX-License-Identifier: LicenseRef-COMPANY-5-Clause'
    fw_name: CHESTER Example
    fw_bundle: com.hardwario.chester.example
    fw_version: v1.0.0
```
Varianta je navíc zahrnuta v `Kconfig.variant`, například:
```c
config VARIANT_<VARIANT-NAME>
    bool "Enable VARIANT_<VARIANT-NAME>"
    default y
```
V projektu ji lze použít takto:
```c
#if defined(CONFIG_VARIANT_<VARIANT-NAME>)
// Your code
#endif /* defined(CONFIG_VARIANT_<VARIANT-NAME>) */
```
### Specifikace funkcí {#feature-specification}

Tato část popisuje dostupné funkce nebo subsystémy, které lze zahrnout do konfigurace projektu. Každá funkce představuje konkrétní funkcionalitu nebo komponentu, kterou je možné do projektu integrovat.

#### Funkce subsystémů {#subsystem-features}

Označení `subsystem-` odkazuje na funkční modul nebo komponentu v rámci softwarové architektury. Příklad:
```yaml
features:
- subsystem-bluetooth
```

<details>
  <summary>Možnosti funkcí subsystémů</summary>



  |         Název         |             Funkce              |             Konfigurace v `prj.conf`                    |
  | :-------------------: | :-----------------------------: | :-----------------------------------------------------: |
  |         Shell         |         subsystem-shell         |                  `CONFIG_CTR_SHELL=y`                   |
  |          ADC          |          subsystem-adc          |                   `CONFIG_CTR_ADC=y`                    |
  |     Accelerometer     |         subsystem-accel         |                  `CONFIG_CTR_ACCEL=y`                   |
  |        Battery        |         subsystem-batt          |                   `CONFIG_CTR_BATT=y`                   |
  |        Buffer         |          subsystem-buf          |                   `CONFIG_CTR_BUF=y`                    |
  |        BLE Tag        |        subsystem-ble-tag        |                 `CONFIG_CTR_BLE_TAG=y`                  |
  |       Bluetooth       |          subsystem-ble          |                   `CONFIG_CTR_BLE=y`                    |
  |        Button         |        subsystem-button         |                  `CONFIG_CTR_BUTTON=y`                  |
  |  CBPrintf FP Support  |  subsystem-cbprintf-fp-support  |             `CONFIG_CBPRINTF_FP_SUPPORT=y`              |
  |        Config         |        subsystem-config         |                  `CONFIG_CTR_CONFIG=y`                  |
  |         Cloud         |         subsystem-cloud         |                  `CONFIG_CTR_CLOUD=y`                   |
  |       Defaults        |       subsystem-defaults        |                 `CONFIG_CTR_DEFAULTS=y`                 |
  |        DS18B20        |        subsystem-ds18b20        |                 `CONFIG_CTR_DS18B20=y`                  |
  |         Edge          |         subsystem-edge          |                   `CONFIG_CTR_EDGE=y`                   |
  |   Entropy Generator   |   subsystem-entropy-generator   |              `CONFIG_ENTROPY_GENERATOR=y`               |
  |         Flash         |         subsystem-flash         |                  `CONFIG_CTR_FLASH=y`                   |
  |         GNSS          |         subsystem-gnss          |                   `CONFIG_CTR_GNSS=y`                   |
  |         GPIO          |         subsystem-gpio          |                   `CONFIG_CTR_GPIO=y`                   |
  |         Hygro         |         subsystem-hygro         |                  `CONFIG_CTR_HYGRO=y`                   |
  |         Info          |         subsystem-info          |                   `CONFIG_CTR_INFO=y`                   |
  |          LED          |          subsystem-led          |                   `CONFIG_CTR_LED=y`                    |
  |          Log          |          subsystem-log          |                   `CONFIG_CTR_LOG=y`                    |
  |          LTE          |          subsystem-lte          |               `CONFIG_CTR_LTE_CLKSYNC=y`                |
  |        LTE V2         |        subsystem-lte-v2         |                  `CONFIG_CTR_LTE_V2=y`                  |
  |          LRW          |          subsystem-lrw          |                   `CONFIG_CTR_LRW=y`                    |
  |     Machine Probe     |     subsystem-machine-probe     |              `CONFIG_CTR_MACHINE_PROBE=y`               |
  |       MB7066-A        |       subsystem-mb7066-a        | `CONFIG_MB7066_TIMER4=y` `CONFIG_MB7066_SAMPLE_COUNT=1` |
  |       MB7066-B        |       subsystem-mb7066-b        | `CONFIG_MB7066_TIMER4=y` `CONFIG_MB7066_SAMPLE_COUNT=1` |
  |          RTC          |          subsystem-rtc          |                   `CONFIG_CTR_RTC=y`                    |
  |          RTD          |          subsystem-rtd          |                   `CONFIG_CTR_RTD=y`                    |
  |       Settings        |       subsystem-settings        |                   `CONFIG_SETTINGS=y`                   |
  |        Signal         |        subsystem-signal         |                  `CONFIG_CTR_SIGNAL=y`                  |
  |      Soil Sensor      |      subsystem-soil-sensor      |               `CONFIG_CTR_SOIL_SENSOR=y`                |
  |         Test          |         subsystem-test          |                   `CONFIG_CTR_TEST=y`                   |
  |         Therm         |         subsystem-therm         |                  `CONFIG_CTR_THERM=y`                   |
  |         WDOG          |         subsystem-wdog          |                   `CONFIG_CTR_WDOG=y`                   |
  |          W1           |          subsystem-w1           |                    `CONFIG_CTR_W1=y`                    |
  |         ZCBOR         |         subsystem-zcbor         |     `CONFIG_ZCBOR=y` `CONFIG_ZCBOR_STOP_ON_ERROR=y`     |
  | BT Filter Accept List | subsystem-bt-filter-accept-list |            `CONFIG_BT_FILTER_ACCEPT_LIST=y`             |
  |      BT Observer      |      subsystem-bt-observer      |                 `CONFIG_BT_OBSERVER=y`                  |
</details>

#### Hardwarové funkce CHESTER {#hardware-chester-feature}

Označení `hardware-chester-` odkazuje na konkrétní hardwarovou komponentu nebo zařízení v hardwarovém ekosystému projektu. Příklad:
```yaml
features:
- hardware-chester-z
```

#### Vlastní funkce {#custom-feature}

Označuje funkci, kterou si zákazník může přidat podle konkrétních požadavků. Příklad:
```yaml
features:
- custom-x
- custom-y
```

Tyto funkce zapnou potřebné konfigurace v: `app.overlay`, `Kconfig`, `prj.conf`. Kromě toho jsou zahrnuty i v `features.h` s předřazeným `FEATURE_*`, například:
```c
#define FEATURE_SUBSYSTEM_BLE 1
#define FEATURE_HARDWARE_CHESTER_Z 1
#define FEATURE_CUSTOM_X 1
#define FEATURE_CUSTOM_Y 1
```

Soubor `features.h` je při kompilaci vkládán automaticky a není potřeba ho nikde vkládat pomocí `#include`.

#### Konfigurační volby {#config-options}
Každá konfigurační volba umožňuje nastavení konkrétních parametrů, což poskytuje přesnou kontrolu a přizpůsobení chování aplikace. Ty jsou následně generovány do `app_config.c` a `app_config.h`.

- **Typ: int**

```yaml
parameters:
- name: interval-sample # Name separated by '-'
  type: int
  min: 30 # Minimum value
  max: 86400 # Maximum value
  default: 1800 # Default value
  help: 'Get/Set sample itnerval' # Help parameter message
```
- **Typ: float**

```yaml
parameters:
- name: alarm-threshold # Name separated by '-'
  type: float
  min: -40.0 # Minimum value
  max: 500.0 # Maximum value
  default: 125.5 # Default value
  help: 'Get/Set alarm threshold' # Help parameter message
```

- **Typ: enum**
```yaml
  - name: scan-mode
    type: enum
    help: "Get/Set scan mode"
    default: "off"
    valueset:
      - "off"
      - "interval"
      - "daily"
      - "weekly"
      - "monthly"
```

- **Typ: string**

```yaml
parameters:
- name: string-param-name # Name separated by '-'
  type: string
  buffer_size: 35 # Buffer string size
  default: "Let's connect and control ANYTHING" # Default string
  help: 'Get/Set string-param-name' # Help parameter message
```
- **Typ: bool**

```yaml
parameters:
- name: ch1-enabled # Name separated by '-'
  type: bool
  default: true
  help: 'Get/Set CH1 enable' # Help parameter message
```
- **Typ: pole int**

```yaml
parameters:
- name: int-array-name # Name separated by '-'
  type: array[int]
  len: 4 # Length of the array
  min: 30 # Minimum array element value
  max: 86400 # Maximum array element value
  default: [31, 32, 33, 34] # or null to declare [0, 0, 0, 0]
  help: 'Get/Set int-array-name' # Help parameter message
```
- **Typ: pole float**

```yaml
parameters:
- name: float-array-name # Name separated by '-'
  type: array[float]
  len: 4 # Length of the array
  min: 0.0 # Minimum array element value
  max: 25.0 # Maximum array element value
  default: [1.0, 2.0, 3.0, 4.0] # or null to declare [0.0, 0.0, 0.0, 0.0]
  help: 'Get/Set float-array-name' # Help parameter message
```
- **Typ: pole bool**

```yaml
parameters:
- name: bool-array-name # Name separated by '-'
  type: array[bool]
  len: 4 # Length of the array
  default: [true, false, true, true] # or null to declare [false, false, false, false]
  help: 'Get/Set bool-array-name' # Help parameter message
```

- **Typ: enum**

```yaml
parameters:
- name: enum-name-{} # Name separated by '-' and '{}' in the index location
  type: enum
  valueset: # Enumerators
  - trigger
  - counter
  - voltage
  - current
```

V `app_config.c`:
```c
const struct ctr_config_item items[] = {
	CTR_CONFIG_ITEM_ENUM("enum-name-1", m_config_interim.enum_name_1, ((const char*[]){"trigger", "counter", "voltage", "current"}), "Get/Set enum-name-1", APP_CONFIG_ENUM_NAME_TRIGGER),
	CTR_CONFIG_ITEM_ENUM("enum-name-2", m_config_interim.enum_name_2, ((const char*[]){"trigger", "counter", "voltage", "current"}), "Get/Set enum-name-2", APP_CONFIG_ENUM_NAME_COUNTER),
	CTR_CONFIG_ITEM_ENUM("enum-name-3", m_config_interim.enum_name_3, ((const char*[]){"trigger", "counter", "voltage", "current"}), "Get/Set enum-name-3", APP_CONFIG_ENUM_NAME_VOLTAGE),
	CTR_CONFIG_ITEM_ENUM("enum-name-4", m_config_interim.enum_name_4, ((const char*[]){"trigger", "counter", "voltage", "current"}), "Get/Set enum-name-4", APP_CONFIG_ENUM_NAME_CURRENT),
};
```
V `app_config.h`:
```c
enum app_config_enum_name_ {
	APP_CONFIG_ENUM_NAME_TRIGGER = 0,
	APP_CONFIG_ENUM_NAME_COUNTER = 1,
	APP_CONFIG_ENUM_NAME_VOLTAGE = 2,
	APP_CONFIG_ENUM_NAME_CURRENT = 3,
};
struct app_config {
	enum app_config_enum_name enum_name_1;
	enum app_config_enum_name enum_name_2;
	enum app_config_enum_name enum_name_3;
	enum app_config_enum_name enum_name_4;
};
```

:::info

V konfiguračních souborech aplikace (`app_config.c` a `app_config.h`) je valueset přiřazen k indexům enum-name.

:::

- **Typ: enum (vlastní)**
```yaml
parameters:
- name: enum-name # Name separated by '-'
  type: enum
  valueset: # Enumerators
  - npn
  - pnp
  related: # variable(s) of enum
  - name: trigger  # Name separated by '-'
    default: npn # Default
    help: 'Get/Set trigger-enum-name' # Help parameter message
  - name: counter  # Name separated by '-'
    default: pnp # Default
    help: 'Get/Set counter-enum-name' # Help parameter message
```

:::info

Sekce `related` určuje proměnné enum přiřazené k parametru enum-name. Tyto proměnné (trigger, counter atd.) používají stejné hodnoty enum (npn, pnp atd.) a poskytují pro každou proměnnou vlastní výchozí hodnoty a texty nápovědy.
:::

V `app_config.c`:
```c
const struct ctr_config_item items[] = {
CTR_CONFIG_ITEM_ENUM("trigger-enum-name", m_config_interim.trigger_enum_name, ((const char*[]){"npn", "pnp"}), "Get/Set trigger-enum-name", APP_CONFIG_ENUM_NAME_NPN),
CTR_CONFIG_ITEM_ENUM("counter-enum-name", m_config_interim.counter_enum_name, ((const char*[]){"npn", "pnp"}), "Get/Set counter-enum-name", APP_CONFIG_ENUM_NAME_PNP),
};
```
V `app_config.h`:
```c
struct app_config {
    enum app_config_enum_name trigger_enum_name;
    enum app_config_enum_name counter_enum_name;
};
```

### Deklarace příkazů {#commands-declaration}
Příkazy definují konkrétní akce, které lze spustit v prostředí shellu projektu. Příkazy se přidávají do `app_shell.c`. Příklad:
```yaml
commands:
- name: sample  # Name separated by '-'
  callback: app_work_sample() # This function should be manually created
  help: 'Sample immediately.'
```
### `depends_on` u funkcí a příkazů {#features-and-commands-dependson}
Po spuštění **Project Generatoru** se na základě vybrané **varianty** a **funkcí** vygenerují soubory `features.h` a `variants.h`. To umožňuje přidat závislosti k jakémukoli parametru nebo příkazu pomocí řádků jako:
```yaml
depends_on: defined(FEATURE_<feature_name>)`
```
nebo
```yaml
depends_on: defined(VARIANT_<variant_name>)`
```

:::tip

Pro zahrnutí více závislostí můžete navíc použít logické operátory **&& (AND)** a **|| (OR)**.

:::

Příklad:
V project.yaml:
```yaml
parameters:
- name: float-param-name
  type: float
  min: -40.0
  max: 5000.0
  default: 125.5
  help: 'Get/Set float-param'
  depends_on: defined(FEATURE_HARDWARE_CHESTER_Z)
- name: int-array-name
  type: array[int]
  len: 4
  min: 30
  max: 86400
  default: [31, 32, 33, 34]
  help: 'Get/Set int-array-name'
```
V `app_config.c`:
```c
const struct ctr_config_item items[] = {
#if defined(FEATURE_HARDWARE_CHESTER_Z)
    CTR_CONFIG_ITEM_FLOAT("float-param-name", m_config_interim.float_param_name, -40.0f, 5000.0f, "Get/Set float-param.", 125.5f),
#endif /* defined(FEATURE_HARDWARE_CHESTER_Z) */

    CTR_CONFIG_ITEM_FLOAT("int-array-name-1", m_config_interim.int_array_name[0], 30, 86400, "Get/Set int-array-name-1", 31),
    CTR_CONFIG_ITEM_FLOAT("int-array-name-2", m_config_interim.int_array_name[1], 30, 86400, "Get/Set int-array-name-1", 32),
    CTR_CONFIG_ITEM_FLOAT("int-array-name-3", m_config_interim.int_array_name[2], 30, 86400, "Get/Set int-array-name-1", 33),
    CTR_CONFIG_ITEM_FLOAT("int-array-name-4", m_config_interim.int_array_name[3], 30, 86400, "Get/Set int-array-name-1", 34),
};
```
V `app_config.h`:
```c
struct app_config {
#if defined(FEATURE_HARDWARE_CHESTER_Z)
	float float_param_name;
#endif /* defined(FEATURE_HARDWARE_CHESTER_Z) */

    int int_array_name[4];
};
```
### Deklarace extras {#extras-declaration}
Tyto extras se používají tehdy, když jsou v souboru `prj.conf` potřeba nevýchozí konfigurace **funkcí**.

Pokud se požadavky projektu odchylují od výchozích konfigurací **funkcí** poskytovaných podkladovými knihovnami či frameworky, využijí se právě tyto extras. Umožňují zákazníkům jemně doladit konfiguraci projektu a pokrýt specifické potřeby, které výchozí nastavení neřeší.

Příklad v `prj.conf`:
```yaml
extras:
- CONFIG_ADC_TLA2021_INIT_PRIORITY=60
- CONFIG_ADC_NRFX_SAADC=n
- CONFIG_ADC_SHELL=n
- CONFIG_NEWLIB_LIBC_NANO=n
```
### Zachované bloky kódu {#preserved-code-blocks}

V rámci této kódové báze jsou zachované bloky kódu úseky kódu určené k tomu, aby zůstaly nezměněné při generování nebo aktualizaci souborů. Tyto bloky se označují speciálními komentářovými značkami:
```c
/* ### Preserved code "block-name" (begin) */
// Preserved code content
/* ^^^ Preserved code "block-name" (end) */
```

:::info

Jakýkoli kód uzavřený mezi těmito značkami bude zachován bez úprav, což vývojářům umožňuje udržovat vlastní nebo kritické části v generovaných souborech.

:::

### Direktivy `clang-format` {#directives-clang-format}

Pro řízení chování nástroje `clang-format` v kódové bázi mohou vývojáři použít speciální direktivy, které vyloučí konkrétní části z automatického formátování:
```c
/* ### Preserved code "block-name" (begin) */
/* clang-format off */
// Preserved code content excluded from formatting
/* clang-format on */
/* ^^^ Preserved code "block-name" (end) */
```
