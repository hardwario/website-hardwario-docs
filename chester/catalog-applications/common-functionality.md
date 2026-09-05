---
slug: common-functionality
title: Common Functionality
---
import Image from '@theme/IdealImage';

# Common Functionality

The **catalog applications** share common functionality. For example the button behaviour or the way settings are handled.

## Network Mode Configuration

Some catalog firmwares allows configuration to use NB-IoT/LTE or LoRaWAN network. This firmware after power-up is not sending data, the **LED is blinking yellow** and you need to configure correct radio mode.

This `app mode` configuration is needed currently for these catalog applications:

- [CHESTER Clime](chester-clime.md)
- [CHESTER Control](chester-control.md)
- [CHESTER Push](chester-push.md)
- [CHESTER Current](chester-current.md)
- [CHESTER Scale](chester-scale.md)
- [CHESTER Meteo](chester-meteo.md)
- [CHESTER Range](chester-range.md)
- [CHESTER Motion](chester-motion.md)
- [CHESTER Serial](chester-serial.md)
- [CHESTER wM-Bus](chester-wm-bus.md)

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

If you want to reset the configuration back to the default state, you can do so using `config reset`. In rare cases, when the CHESTER console isn't available, you can use the manual reset procedure. To initiate this, holding down the button while CHESTER boots. After holding the button for around 5 seconds, CHESTER will start rapidly blinking. At this point, you can release the button to proceed with the reset. If you continue holding the button until CHESTER stops blinking, the reset will be aborted.

:::caution

Reseting the configuration will also reset the connection parameters for LTE and LoRaWAN, which can result in CHESTER unable to communicate.

:::

You might also change configuration remotely over HARDWARIO Cloud using [**Config downlink command**](/cloud/downlink/config).
In cloud you don't send the `config save` command.

## Runtime CHESTER-Z Detection

Starting from firmware **v3.5.4**, some applications support **runtime detection** of the CHESTER-Z backup module. This means a single firmware binary works both with and without the CHESTER-Z module installed.

- If CHESTER-Z is detected at boot, backup functionality (DC input monitoring, backup battery voltage, connection/disconnection events) is automatically enabled.
- If CHESTER-Z is not present, backup features are silently skipped with no impact on other functionality.
- This eliminates the need for separate "Z" firmware variants: for example, **CHESTER Clime** now covers what was previously **CHESTER Clime Z**.

Applications with runtime CHESTER-Z detection:

- [CHESTER Clime](chester-clime.md)

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

The periodic sending of data with `interval-report` has intentional jitter. This is used in case lot of CHESTERs are placed near each other, so they don't transmit at the same time if they have set the same interval. This jitter is random in the range of ±20 % of `interval-report`.

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

When upgrading an older **v1.x.x** firmware to **v2.x.x**, it is necessary to back up the application configuration. The most important is this step in **CHESTER Current** application, where in configuration there are the **current transformers calibration coefficients**.

If you forget to back up the data, they are not lost unless you executed `config save` command in newer firmware. However, you need to temporarily downgrade to [older firmware](https://github.com/hardwario/docs/blob/33661ca486dda9e6883d3a82edf0128ab32173d2/chester/catalog-applications/index.md#application-firmware) that can read the old configuration and apply the same configuration after the firmware is updated.

In the old firmware type `app config show` to the console. Then you need to copy all configuration items. If you use **HARDWARIO Manager** phone app or **HARDWARIO CLI** on your computer, you can highlight and copy current configuration text to your clipboard or text editor.

After updating to a newer firmware, paste the same lines to the console. If you use **HARDWARIO Manager** phone app or **HARDWARIO CLI** on your computer, you can paste all the lines together to the input line and press enter. All commands will be applied one by one. Check that configuration was applied correctly by typing `app config show`. Do not forget to apply changes by typing `config save`.

