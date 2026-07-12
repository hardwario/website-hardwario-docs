---
slug: how-to-project-generator
title: "How to: Project Generator"
---
import Image from '@theme/IdealImage';

# How to: Project Generator

The **CHESTER SDK Project Generator** simplifies project initialization and configuration management by providing a structured approach to project setup, all based on a **YAML** configuration.

It is also used for generating different **variants** of catalog applications. You can look to `project.yaml` files to see different variants.

Then you call `west chester-update --variant "CHESTER Clime 1W"` to update project files, then you call `west build` to recompile project.

## WEST Commands

### CHESTER Init


`west chester-init --list` List all available templates.


`west chester-init <name>` Create the project folder and project.yaml (minimal).


`west chester-init <name> --template <template-name>` Create the project folder and project.yaml (specified template).


:::tip

  If the project already exists, you can add a project.yaml into it calling the command.

:::

:::info

  If there is a `/vendor` folder in your directory, the project will be initialized in `vendor/application/`, otherwise it will be created in `chester/application/`.

:::

### CHESTER Create

`west chester-create <name>` Creates all necessary files to a buildable app.

:::caution

  This command will overwrite all previous files. If you have already created a custom project, prefer to use `chester-update`.

:::

### CHESTER Update

`west chester-update <name>` Generate files based on project.yaml features.

`west chester-update <name> --list` List all available variants.

`west chester-update <name> --variant <variant-name>` Generate files based on project.yaml variant features.

`west chester-update <name> --version <v.X.Y.Z>` Generate files based on project.yaml using the specified `fw_version`.

Examples:

`west chester-update clime --variant chester-clime-z`

`west chester-update clime --variant chester-clime-rtd --version v3.2.1`

:::tip

  After any change in `project.yaml` this command could be called to update the project with the new changes.

:::

:::info

  All commands can be executed without specifying `<name>` if you are already in the project folder, except for `west chester-init`.

:::

### CHESTER CBOR v2

`west chester-cbor <name>` Generate CBOR files.


## **File generation**

This tool can automatically generate the following files based on the provided YAML configuration:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="init" label="Init">
    <table style={{ margin: '20px auto' }}>
      <tr>
        <td>/project-name</td>
      </tr>
      <tr>
        <td align="left"><code>project.yaml</code></td>
      </tr>
    </table>
  </TabItem>
  <TabItem value="update" label="Update">
    <table style={{ display: 'inline-table', margin: '20px' }}>
      <tr>
        <td align="center">/project-name</td>
      </tr>
      <tr>
        <td align="left">
          <code>app.overlay<br /></code>
          <code>Kconfig<br /></code>
          <code>Kconfig.variant<br /></code>
          <code>prj.conf<br /></code>
          <code>CMakeLists.txt<br /></code>
          <code>VERSION<br /></code>
        </td>
      </tr>
    </table>
    <table style={{ display: 'inline-table', margin: '20px' }}>
      <tr>
        <td align="center">/project-name/src</td>
      </tr>
      <tr>
        <td align="left">
          <code>app_config.c<br /></code>
          <code>app_config.h<br /></code>
          <code>app_shell.c<br /></code>
          <code>feature.h<br /></code>
        </td>
      </tr>
    </table>
  </TabItem>
  <TabItem value="create" label="Create">
    <table style={{ display: 'inline-table', margin: '20px' }}>
      <tr>
        <td align="center">/project-name/src</td>
      </tr>
      <tr>
        <td align="left">
          <code>app_config.c<br /></code>
          <code>app_config.h<br /></code>
          <code>app_shell.c<br /></code>
          <code>feature.h<br /></code>
          <code>app_cbor.c<br /></code>
          <code>app_cbor.h<br /></code>
          <code>app_send.c<br /></code>
          <code>app_send.h<br /></code>
          <code>app_data.c<br /></code>
          <code>app_data.h<br /></code>
          <code>app_sensor.c<br /></code>
          <code>app_sensor.h<br /></code>
          <code>app_handler.c<br /></code>
          <code>app_handler.h<br /></code>
          <code>app_work.c<br /></code>
          <code>app_work.h<br /></code>
          <code>app_init.c<br /></code>
          <code>app_init.h<br /></code>
          <code>app_power.c<br /></code>
          <code>app_power.h<br /></code>
        </td>
      </tr>
    </table>
    <table style={{ display: 'inline-table', margin: '20px' }}>
      <tr>
        <td align="center">/project-name</td>
      </tr>
      <tr>
        <td align="left">
          <code>app.overlay<br /></code>
          <code>Kconfig<br /></code>
          <code>Kconfig.variant<br /></code>
          <code>prj.conf<br /></code>
          <code>CMakeLists.txt<br /></code>
          <code>VERSION<br /></code>
          <code>pm_static.yml*<br /></code>
        </td>
      </tr>
    </table>
    <table style={{ display: 'inline-table', margin: '20px' }}>
      <tr>
        <td align="center">/project-name/codec</td>
      </tr>
      <tr>
        <td align="left">
          <code>cbor-decoder.yaml</code><br />
        </td>
      </tr>
    </table>
    <table style={{ display: 'inline-table', margin: '20px' }}>
      <tr>
        <td align="center">/project-name/child_image</td>
      </tr>
      <tr>
        <td align="left">
          <code>mcuboot.conf<br /></code>
        </td>
      </tr>
    </table>
        <table style={{ display: 'inline-table', margin: '20px' }}>
      <tr>
        <td align="center">/project-name/child_image/boards*</td>
      </tr>
      <tr>
        <td align="left">
          <code>chester_nrf52840.overlay*<br /></code>
        </td>
      </tr>
    </table>
  </TabItem>
  <TabItem value="cbor" label="CBOR">
    <table style={{ margin: '20px auto' }}>
      <tr>
        <td align="center">project-name/src</td>
      </tr>
      <tr>
        <td align="left">
          <code>app_cbor.c<br /></code>
          <code>app_cbor.h<br /></code>
        </td>
      </tr>
    </table>
  </TabItem>
</Tabs>

## ** Project YAML **
The `project.yaml` configuration file serves as the cornerstone for setting up and customizing your project.

This comprehensive guide outlines the step-by-step process to effectively configure your project using the provided YAML structure.

### Project Information

Enter essential project details as outlined in the YAML configuration.
```yaml
project:
    variant: Variant-name
    company: 2024 COMPANY a.s.
    license: 'SPDX-License-Identifier: LicenseRef-COMPANY-5-Clause'
    fw_name: CHESTER Example
    fw_bundle: com.hardwario.chester.example
    fw_version: v1.0.0
```
Furthermore, the variant is included in `Kconfig.variant` such as:
```c
config VARIANT_<VARIANT-NAME>
    bool "Enable VARIANT_<VARIANT-NAME>"
    default y
```
It can be used in the project using:
```c
#if defined(CONFIG_VARIANT_<VARIANT-NAME>)
// Your code
#endif /* defined(CONFIG_VARIANT_<VARIANT-NAME>) */
```
### Feature Specification

This section outlines the available features or subsystems that can be included in the project configuration. Each feature represents a specific functionality or component that can be integrated into the project.

#### Subsystem features

The term `subsystem-` refers to a functional module or component within the software architecture. Example:
```yaml
features:
- subsystem-bluetooth
```

<details>
  <summary>Subsystem Feature Options</summary>



  |         Name          |             Feature             |               Configuration in `prj.conf`               |
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
  |   TinyCrypt SHA256    |   subsystem-tinycrypt-sha256    |               `CONFIG_TINYCRYPT_SHA256=y`               |
  |       TinyCrypt       |       subsystem-tinycrypt       |                  `CONFIG_TINYCRYPT=y`                   |
  |         WDOG          |         subsystem-wdog          |                   `CONFIG_CTR_WDOG=y`                   |
  |          W1           |          subsystem-w1           |                    `CONFIG_CTR_W1=y`                    |
  |         ZCBOR         |         subsystem-zcbor         |     `CONFIG_ZCBOR=y` `CONFIG_ZCBOR_STOP_ON_ERROR=y`     |
  | BT Filter Accept List | subsystem-bt-filter-accept-list |            `CONFIG_BT_FILTER_ACCEPT_LIST=y`             |
  |      BT Observer      |      subsystem-bt-observer      |                 `CONFIG_BT_OBSERVER=y`                  |
</details>

#### Hardware CHESTER feature

The term `hardware-chester-` refers to a specific hardware component or device within the project's hardware ecosystem. Example:
```yaml
features:
- hardware-chester-z
```

#### Custom Feature

Refers to a feature that a customer can add based on specific requirements. Example:
```yaml
features:
- custom-x
- custom-y
```

These features will enable the necessary configurations on: `app.overlay`, `Kconfig`, `prj.conf`. Furthermore, they are also included in `features.h` by pre-pending `FEATURE_*` such as:
```c
#define FEATURE_SUBSYSTEM_BLE 1
#define FEATURE_HARDWARE_CHESTER_Z 1
#define FEATURE_CUSTOM_X 1
#define FEATURE_CUSTOM_Y 1
```

File `features.h` is included during compilation automatically and it is not needed to include ty by `#include` anywhere.

#### Config Options
Each config option allows for specific parameter settings, enabling precise control and customization of the application's behavior. These are then generated to `app_config.c` and `app_config.h`.

- **Type: int**

```yaml
parameters:
- name: interval-sample # Name separated by '-'
  type: int
  min: 30 # Minimum value
  max: 86400 # Maximum value
  default: 1800 # Default value
  help: 'Get/Set sample itnerval' # Help parameter message
```
- **Type: float**

```yaml
parameters:
- name: alarm-threshold # Name separated by '-'
  type: float
  min: -40.0 # Minimum value
  max: 500.0 # Maximum value
  default: 125.5 # Default value
  help: 'Get/Set alarm threshold' # Help parameter message
```

- **Type: enum**
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

- **Type: string**

```yaml
parameters:
- name: string-param-name # Name separated by '-'
  type: string
  buffer_size: 35 # Buffer string size
  default: "Let's connect and control ANYTHING" # Default string
  help: 'Get/Set string-param-name' # Help parameter message
```
- **Type: bool**

```yaml
parameters:
- name: ch1-enabled # Name separated by '-'
  type: bool
  default: true
  help: 'Get/Set CH1 enable' # Help parameter message
```
- **Type: int array**

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
- **Type: float array**

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
- **Type: bool array**

```yaml
parameters:
- name: bool-array-name # Name separated by '-'
  type: array[bool]
  len: 4 # Length of the array
  default: [true, false, true, true] # or null to declare [false, false, false, false]
  help: 'Get/Set bool-array-name' # Help parameter message
```

- **Type: enum**

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

In `app_config.c`:
```c
const struct ctr_config_item items[] = {
	CTR_CONFIG_ITEM_ENUM("enum-name-1", m_config_interim.enum_name_1, ((const char*[]){"trigger", "counter", "voltage", "current"}), "Get/Set enum-name-1", APP_CONFIG_ENUM_NAME_TRIGGER),
	CTR_CONFIG_ITEM_ENUM("enum-name-2", m_config_interim.enum_name_2, ((const char*[]){"trigger", "counter", "voltage", "current"}), "Get/Set enum-name-2", APP_CONFIG_ENUM_NAME_COUNTER),
	CTR_CONFIG_ITEM_ENUM("enum-name-3", m_config_interim.enum_name_3, ((const char*[]){"trigger", "counter", "voltage", "current"}), "Get/Set enum-name-3", APP_CONFIG_ENUM_NAME_VOLTAGE),
	CTR_CONFIG_ITEM_ENUM("enum-name-4", m_config_interim.enum_name_4, ((const char*[]){"trigger", "counter", "voltage", "current"}), "Get/Set enum-name-4", APP_CONFIG_ENUM_NAME_CURRENT),
};
```
In `app_config.h`:
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

In the application's configuration files (`app_config.c` and `app_config.h`), the valueset is associated with enum-name indices.

:::

- **Type: enum (Custom)**
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

The `related` section specifies enum variables associated with the enum-name parameter. These variables (trigger, counter, etc.) share the same enum values (npn, pnp, etc.) and provide specific default values and help messages for each variable.
:::

In `app_config.c`:
```c
const struct ctr_config_item items[] = {
CTR_CONFIG_ITEM_ENUM("trigger-enum-name", m_config_interim.trigger_enum_name, ((const char*[]){"npn", "pnp"}), "Get/Set trigger-enum-name", APP_CONFIG_ENUM_NAME_NPN),
CTR_CONFIG_ITEM_ENUM("counter-enum-name", m_config_interim.counter_enum_name, ((const char*[]){"npn", "pnp"}), "Get/Set counter-enum-name", APP_CONFIG_ENUM_NAME_PNP),
};
```
In `app_config.h`:
```c
struct app_config {
    enum app_config_enum_name trigger_enum_name;
    enum app_config_enum_name counter_enum_name;
};
```

### Commands declaration
The commands define specific actions that can be executed within the project shell environment. Commands are added to `app_shell.c`. Example:
```yaml
commands:
- name: sample  # Name separated by '-'
  callback: app_work_sample() # This function should be manually created
  help: 'Sample immediately.'
```
### Features and Commands `depends_on`
Once the **Project Generator** is executed `features.h` and `variants.h` are generated based on the selected **variant** and **features**. This enables the addition of dependencies to any parameter or commands by including lines such as:
```yaml
depends_on: defined(FEATURE_<feature_name>)`
```
or
```yaml
depends_on: defined(VARIANT_<variant_name>)`
```

:::tip

Additionally, you can utilize logical operators **&& (AND)** and **|| (OR)** to incorporate multiple dependencies.

:::

Example:
In project.yaml:
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
In `app_config.c`:
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
In `app_config.h`:
```c
struct app_config {
#if defined(FEATURE_HARDWARE_CHESTER_Z)
	float float_param_name;
#endif /* defined(FEATURE_HARDWARE_CHESTER_Z) */

    int int_array_name[4];
};
```
### Extras declaration
These extras are employed when non-default **feature** configurations are necessary in the `prj.conf` file.

When project requirements diverge from the default **features** configurations provided by underlying libraries or frameworks, these extras are utilized. They enable custumers to finely adjust the project's configuration to address specific needs not covered by default settings.

Example in `prj.conf`:
```yaml
extras:
- CONFIG_ADC_TLA2021_INIT_PRIORITY=60
- CONFIG_ADC_NRFX_SAADC=n
- CONFIG_ADC_SHELL=n
- CONFIG_NEWLIB_LIBC_NANO=n
```
### Preserved Code Blocks

In the context of this codebase, preserved code blocks are sections of code that are designated to remain unchanged during file generation or updates. These blocks are identified by special comment markers:
```c
/* ### Preserved code "block-name" (begin) */
// Preserved code content
/* ^^^ Preserved code "block-name" (end) */
```

:::info

Any code enclosed between these markers will be preserved without modification, allowing developers to maintain custom or critical sections within generated files.

:::

### Directives `clang-format`

To control the behavior of `clang-format` within the codebase, developers can use special directives to exclude specific sections from automatic formatting:
```c
/* ### Preserved code "block-name" (begin) */
/* clang-format off */
// Preserved code content excluded from formatting
/* clang-format on */
/* ^^^ Preserved code "block-name" (end) */
```

## **CBOR v2**

The **CHESTER SDK Project Generator** utilizes `cbor-decoder.yaml` and `cbor-encoder.yaml` configuration files to automatically generate `app_cbor.c`and `app_cbor.h` files. These generated files are essential for handling **CBOR (Concise Binary Object Representation)** data encoding and decoding within the project.
The generator ensures that all fields are correctly initialized and encoded based on the YAML configuration.

### Generated CBOR Files

The generated `app_cbor.c` and `app_cbor.h` files include all the fields specified in the YAML configuration. The generator provides placeholder code for fields, which developers can later customize as needed. For example:

```c
	/* ### Preserved code "thermometer" (begin) */

	zcbor_uint32_put(zs, CODEC_KEY_E_THERMOMETER);
	{
		zcbor_map_start_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);

		zcbor_uint32_put(zs, CODEC_KEY_E_THERMOMETER__TEMPERATURE);

/* Filled in by Project Generator */
#if 0
		if (isnan(g_app_data.thermometer_temperature)) {
			zcbor_nil_put(zs, NULL);
		} else {
			zcbor_int32_put(zs, g_app_data._temperature * 100.f);
		}
#else
		zcbor_nil_put(zs, NULL);
#endif

		zcbor_map_end_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);
	}

	/* ^^^ Preserved code "thermometer" (end) */
```

### Special Fields Handling

For certain fields such as **TSO (Time Series Offset)** and **TSP (Time Series Period)**, the generator includes predefined encoding logic. These fields are crucial for handling time series data and are encoded with specific structures.

#### TSO - Time Series Offset

The TSO field is handled with a list encoding approach:

```c
	/* ### Preserved code "trigger" (begin) */

	zcbor_uint32_put(zs, CODEC_KEY_E_TRIGGER);
	{
    zcbor_map_start_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);

		zcbor_uint32_put(zs, CODEC_KEY_E_TRIGGER__EVENTS);
		{
			zcbor_list_start_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);

			/* Filled in by Project Generator */
			/* TSO - Times series offset */
			zcbor_uint64_put(zs, 1714731120); /* timestamp in seconds */

			for (int j = 0; j < 3; j++) {
				zcbor_uint32_put(zs, j);         /* offset in seconds */
				zcbor_uint32_put(zs, j * 100.f); /* samples min */
			}
			zcbor_list_end_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);
		}

		zcbor_map_end_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);
	}

	/* ^^^ Preserved code "trigger" (end) */
```
In this example, the TSO field includes a timestamp followed by multiple data points representing offsets and sample values.

#### TSP - Time Series Period

The TSP field is similarly handled with a list encoding approach:

```c
	/* ### Preserved code "counter" (begin) */

	zcbor_uint32_put(zs, CODEC_KEY_E_COUNTER);
	{
		zcbor_map_start_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);

		zcbor_uint32_put(zs, CODEC_KEY_E_COUNTER__MEASUREMENTS);
		{
			zcbor_list_start_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);

			/* Filled in by Project Generator */
			/* TSP - Times series period */
			zcbor_uint64_put(zs, 1714731120); /* timestamp in seconds */
			zcbor_uint32_put(zs, 1);          /* period in seconds */

			for (int j = 0; j < 3; j++) {
				zcbor_uint32_put(zs, j * 100.f); /* samples min */
				zcbor_uint32_put(zs, j * 100.f); /* samples max */
				zcbor_uint32_put(zs, j * 100.f); /* samples avg */
				zcbor_uint32_put(zs, j * 100.f); /* samples mdn */
			}

			zcbor_list_end_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);
		}

		zcbor_map_end_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);
	}

	/* ^^^ Preserved code "counter" (end) */
```
In this example, the TSP field includes a timestamp, a period, and multiple data points representing sample statistics.

:::caution

Any addition changes to `cbor-encoder.yaml` or `cbor-decoder.yaml` can be updated in the project using the command. However, if the addition or removal is made in a previously generated field protected by a preserved code block, simply delete the protected section in the code and call the command again.

:::
