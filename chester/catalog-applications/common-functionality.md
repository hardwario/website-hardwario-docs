---
slug: common-functionality
title: Common Functionality
---
import Image from '@theme/IdealImage';

# Common Functionality

The **catalog applications** share common functionality. For example the button behaviour or the way settings are handled.

## Network Mode Configuration

Some catalog firmwares can use either an NB-IoT/LTE or a LoRaWAN network. After power-up, such firmware does not send data, the **LED is blinking yellow** and you need to configure the correct radio mode.

This `app mode` configuration is needed currently for these catalog applications:

- [CHESTER Clime](../firmware/chester-clime/index.md)
- [CHESTER Control](../firmware/chester-control/index.md)
- [CHESTER Push](../firmware/chester-push/index.md)
- [CHESTER Current](../firmware/chester-current/index.md)
- [CHESTER Scale](../firmware/chester-scale/index.md)
- [CHESTER Meteo](../firmware/chester-meteo/index.md)
- [CHESTER Serial](../firmware/chester-serial/index.md)

[CHESTER Demo](../firmware/chester-demo/index.md), [CHESTER Motion](../firmware/chester-motion/index.md), [CHESTER Range](../firmware/chester-range/index.md) and [CHESTER wM-Bus](../firmware/chester-wm-bus/index.md) communicate over NB-IoT/LTE only and start in the `lte` mode, so they need no mode setting.

The default functionality is that a device **does not use any radio** (mode `none`) and you need to set configuration parameter **mode**.

- `app config mode lte` for NB-IoT/LTE network
- `app config mode lrw` for LoRaWAN network

Then apply changes by typing `config save`. The device will reboot and use the correct network.

### Default LTE Mode

Starting from firmware **v3.5.0**, the default LTE mode has been changed to **LTE-M with NB-IoT fallback** (`lte-m,nb-iot`). This means the device will first try to connect using LTE-M and fall back to NB-IoT if LTE-M is not available.


## Button Behaviour

Applications define actions for the mainboard button. The actions are chosen based on the number of consecutive presses of the button. Before an action is executed, **CHESTER** will blink the orange LED once for each button press, indicating the amount of consecutive presses. The actions are:

| Number of presses | Action                                      |
| :---------------: | :------------------------------------------ |
|         1         | Send data immediately                       |
|         2         | Sample data immediately                     |
|         3         | Sample, aggregate and send data immediately |
|         4         | Reboot the device                           |
|         5         | Turn on the load LED for 2 minutes          |

## LED Behaviour

When **CHESTER** is powered on, the LED will be lit red until the application is initialized. Then **CHESTER** will blink the green LED every five seconds to indicate the app is running.

If the **LED is blinking yellow**, you need to configure [which radio to use](#network-mode-configuration).

## Default Configuration

This is the default configuration (printed using the `app config show` command):

```
app config interval-sample 60
app config interval-aggreg 300
app config interval-report 1800
```

You can change configuration using the `app config` command, followed by `config save`. Example:

```
app config interval-sample 120
app config interval-aggreg 600
config save
```

This will apply the changes and restart the application. After the restart, you can verify the settings changed using the `app config show` command.

If you want to reset the configuration back to the default state, you can do so using `config reset`. In rare cases, when the CHESTER console isn't available, you can use the manual reset procedure. To initiate this, hold down the button while CHESTER boots. After holding the button for around 5 seconds, CHESTER will start rapidly blinking. At this point, you can release the button to proceed with the reset. If you continue holding the button until CHESTER stops blinking, the reset will be aborted.

:::caution

Resetting the configuration will also reset the connection parameters for LTE and LoRaWAN, which can leave CHESTER unable to communicate.

:::

You might also change configuration remotely over HARDWARIO Cloud using [**Config downlink command**](/cloud/downlink/config).
In cloud you don't send the `config save` command.

## Common Parameters

Most catalog firmware shares these configuration parameters. Each firmware page lists all parameters of its build with their defaults, which differ between applications: for example, `interval-report` is 900 s in CHESTER Current and CHESTER Scale and 1800 s elsewhere.

The **HARDWARIO Manager** column gives the name under which the HARDWARIO Manager app shows the parameter.

| Parameter | HARDWARIO Manager | Values | Meaning | Where |
| :--- | :--- | :--- | :--- | :--- |
| `mode` | Mode | `none`, `lte`, `lrw` | Network: none, NB-IoT/LTE or LoRaWAN (see [Network Mode Configuration](#network-mode-configuration)) | Every firmware; Demo, Motion, Range and wM-Bus offer only `none` and `lte` |
| `interval-sample` | Sample interval | `<1-86400>` | Sampling interval in seconds | Every firmware except Control and wM-Bus |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | Aggregation interval in seconds; the minimum, maximum, average and median are computed over it | Every firmware except Control, Motion and wM-Bus |
| `interval-report` | Report interval | `<30-86400>` | Report interval in seconds | Every firmware except wM-Bus; Serial also accepts `0` |
| `interval-poll` | Poll interval | `<0-86400>` | How often the device asks HARDWARIO Cloud for downlink messages, in seconds; `0` turns polling off | Every firmware except wM-Bus, which has its own `poll-interval`; Serial stores the value but does not use it |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | In LTE mode, the device restarts when it has not reached HARDWARIO Cloud for this many seconds; `0` turns the watchdog off | Every firmware except Demo, Motion and Serial |
| `event-report-delay` | Event report delay | `<1-86400>` | Delay between an event and its report in seconds | Firmware that reports events (alarms, inputs, backup power) |
| `event-report-rate` | Event report rate | `<1-3600>` | Event reports per hour at most (firmware v4.0.1 sends up to one more); periodic reports do not count toward this limit | Firmware that reports events |
| `backup-report-connected` | Backup report connected | `true`, `false` | Report immediately when external power returns | Builds with CHESTER-Z or CHESTER-X10 |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | Report immediately when external power fails | Builds with CHESTER-Z or CHESTER-X10 |

## Common Data {#common-data}

Every CHESTER catalog application sends these values. The page of each application describes only what that application sends in addition (see [Catalog Applications](index.md)).

### Over NB-IoT/LTE {#common-data-lte}

Every report carries these structures:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `message.version` | Version of the message format: `2` for CHESTER Clime, CHESTER Motion, CHESTER Range and CHESTER Serial, `1` for CHESTER Control, CHESTER Current, CHESTER Meteo, CHESTER Push and CHESTER Scale | | `1`, `2` | |
| `message.sequence` | Message counter, starts at 0 after a restart | | 0–4294967295 | 1 |
| `message.timestamp` | Time of the report (Unix time) | s | | 1 s |
| `system.uptime` | Time since the device started | s | | 1 s |
| `system.voltage_rest` | Battery voltage without load | V | 2.0–5.25 | 0.01 V |
| `system.voltage_load` | Battery voltage under the test load | V | 2.0–5.25 | 0.01 V |
| `system.current_load` | Current through the 100 Ω test load, computed from `voltage_load` | mA | 20–52 | 1 mA |
| `network.parameter.eest` | Energy estimate of the LTE connection; higher means less energy per transmission | | 5–9 | 1 |
| `network.parameter.ecl` | Coverage enhancement level | | 0–2 | 1 |
| `network.parameter.rsrp` | Reference signal received power | dBm | about −157 to −44 | 1 dBm |
| `network.parameter.rsrq` | Reference signal received quality | dB | about −19 to −3 | 1 dB |
| `network.parameter.snr` | Signal-to-noise ratio | dB | about −24 to 25 | 1 dB |
| `network.parameter.plmn` | Operator code (MCC and MNC), e.g. `23003` | | | |
| `network.parameter.cid` | Cell ID | | | |
| `network.parameter.band` | LTE band | | | |
| `network.parameter.earfcn` | Channel number (EARFCN) | | | |
| `thermometer.temperature` | Temperature inside the enclosure (TMP112 on the mainboard) | °C | −40 to 125 | 0.01 °C |
| `accelerometer.accel_x`, `accel_y`, `accel_z` | Acceleration along each axis (LIS2DH12, ±4 g range) | m/s² | −39.2 to 39.2 | 0.01 m/s² |
| `accelerometer.orientation` | Orientation of the device | | 1–6 | |

The network values come from the modem's connection evaluation (`%CONEVAL`) and are sent only in NB-IoT/LTE mode.

The battery values in `system` are measured 60 s after start and then every 12 hours. `thermometer` and `accelerometer` hold the last sample.

Two applications send the same values under other keys:

- CHESTER Meteo sends the acceleration as `accelerometer.acceleration_x`, `acceleration_y` and `acceleration_z`.
- CHESTER wM-Bus sends `frame.protocol` (value `3`), `frame.sequence` and `frame.timestamp` instead of `message`, `state.uptime` instead of `system.uptime`, and the battery values in `battery` (`battery.voltage_rest`, `battery.voltage_load` and `battery.current_load`) instead of `system`.

### Over LoRaWAN {#common-data-lorawan}

The applications with LoRaWAN (CHESTER Clime, CHESTER Control, CHESTER Current, CHESTER Meteo, CHESTER Push, CHESTER Scale and CHESTER Serial) send these fields in every uplink, as the HARDWARIO Cloud decoder outputs them:

| Key | Meaning | Unit | Range | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| `voltage_rest` | Battery voltage without load | V | 2.0–5.25 | 0.001 V |
| `voltage_load` | Battery voltage under the test load | V | 2.0–5.25 | 0.001 V |
| `current_load` | Current through the 100 Ω test load, computed from `voltage_load` | mA | 20–52 | 1 mA |
| `orientation` | Orientation of the device | | 1–6 | |
| `therm_temperature` | Temperature inside the enclosure (TMP112 on the mainboard) | °C | −40 to 125 | 0.01 °C |

## Runtime CHESTER-Z Detection

Starting from firmware **v3.5.4**, some applications support **runtime detection** of the CHESTER-Z backup module. This means a single firmware binary works both with and without the CHESTER-Z module installed.

- If CHESTER-Z is detected at boot, backup functionality (DC input monitoring, backup battery voltage, connection/disconnection events) is automatically enabled.
- If CHESTER-Z is not present, backup features are silently skipped with no impact on other functionality.
- This eliminates the need for separate "Z" firmware variants: for example, **CHESTER Clime** now covers what was previously **CHESTER Clime Z**.

Applications with runtime CHESTER-Z detection:

- [CHESTER Clime](../firmware/chester-clime/index.md)

:::note
Other applications will gradually adopt runtime Z detection in future firmware releases.
:::

## Cloud Metrics

The `cloud` shell command group provides diagnostic information about cloud communication. Use `cloud metrics` to display communication statistics:

```
cloud metrics
```

This shows uplink/downlink message counts, fragment counts, error counts with timestamps, and timestamps of last successful operations. This is useful for diagnosing connectivity issues in the field.

## BLE Tag Subsystem

:::info
**CHESTER** also supports integration with **Bluetooth tags** (Teltonika EYE Sensor subsystem) for wireless temperature and humidity monitoring.  
Learn how to activate and configure this feature in the [**CHESTER BLE Tag Subsystem** documentation](ble-tags.md).
:::

## Report Interval Jitter

The CHESTER Clime, CHESTER Control, CHESTER Demo, CHESTER Meteo, CHESTER Motion, CHESTER Range and CHESTER Scale firmware adds intentional jitter to the periodic sending of data with `interval-report`. This is used in case a lot of CHESTERs are placed near each other, so they don't transmit at the same time if they have set the same interval. This jitter is random in the range of ±20 % of `interval-report`. CHESTER Current, CHESTER Push and CHESTER Serial send at the fixed interval. CHESTER wM-Bus has no `interval-report`: it sends the meter data at the end of each scan.

For example, if `interval-report` is set to 100 seconds, you can receive periodic data where two messages have a time difference from 80 (-20%) to 120 (+20%) seconds.

In applications where there are multiple aggregated values, this jitter has a side-effect that sometimes you can see fewer or more aggregated values than expected. The missing values are not lost, they will be sent correctly in the next message.

This jitter is not applied to **events** like button presses or input changes. They report immediately.

## Shell Commands

Apart from the commands mentioned above, the shell offers many more commands. They can be listed using the `help` command.

Example `help` output from the **CHESTER Clime** application:

```
help
You can try to call commands with <-h> or <--help> parameter for more information.

Available commands:
  accel    :Accelerometer commands.
  aggreg   :Aggregate data immediately
  app      :Application commands.
  backup   :Backup module commands
  batt     :Battery commands.
  ble      :BLE commands.
  button   :Button commands.
  cloud    :Cloud commands.
  config   :Configuration commands.
  flash    :Flash shell commands
  gpio     :GPIO commands
  help     :Prints the help message.
  hygro    :Hygrometer commands.
  i2c      :I2C commands
  info     :Device information commands.
  kernel   :Kernel commands
  led      :LED commands.
  log      :Commands for controlling logger
  lrw      :LoRaWAN commands.
  lte      :LTE commands.
  mcuboot  :MCUboot commands
  rtc      :RTC commands for date/time operations.
  sample   :Sample immediately.
  send     :Send data immediately.
  therm    :Thermometer commands.
  w1       :1-Wire bus commands
```

Starting from firmware **v3.5.0**, all applications include the following diagnostic shell commands:

- **`i2c`**: I2C bus operations (scan, read, write) for hardware diagnostics
- **`mcuboot`**: MCUboot bootloader commands for firmware management
- **`gpio`**: GPIO pin control and inspection
- **`w1`**: 1-Wire bus scanning and device enumeration
- **`backup`**: CHESTER-Z backup module status (serial number, HW revision, voltages, DC input state)
- **`cloud`**: Cloud communication commands including `cloud metrics` for connectivity diagnostics

## Configuration backup v1.x.x → v2.x.x {#configuration-backup}

When upgrading an older **v1.x.x** firmware to **v2.x.x**, it is necessary to back up the application configuration. This step is most important for the **CHESTER Current** application, whose configuration holds the **current transformer calibration coefficients**.

If you forget to back up the data, they are not lost unless you executed `config save` command in newer firmware. However, you need to temporarily downgrade to [older firmware](https://github.com/hardwario/docs/blob/33661ca486dda9e6883d3a82edf0128ab32173d2/chester/catalog-applications/index.md#application-firmware) that can read the old configuration and apply the same configuration after the firmware is updated.

In the old firmware type `app config show` to the console. Then you need to copy all configuration items. If you use **HARDWARIO Manager** phone app or **HARDWARIO CLI** on your computer, you can highlight and copy current configuration text to your clipboard or text editor.

After updating to a newer firmware, paste the same lines to the console. If you use **HARDWARIO Manager** phone app or **HARDWARIO CLI** on your computer, you can paste all the lines together to the input line and press enter. All commands will be applied one by one. Check that configuration was applied correctly by typing `app config show`. Do not forget to apply changes by typing `config save`.

