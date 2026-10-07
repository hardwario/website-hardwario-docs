---
title: AT Commands
sidebar_position: 1
---
import Image from '@theme/IdealImage';

# AT Commands Reference

This page lists every AT command implemented by the GLIDER firmware. AT commands are issued through the [**USB-C console**](../console/usb-at.md).

:::tip
Looking for the Zephyr shell counterparts (used via J-Link, or via `AT$SHELL="…"` from the AT console)? See the [**Shell Commands**](shell-commands.md) page.
:::

The parser is HARDWARIO's **ATCI** (AT Command Interpreter). Every command starts with the `AT` prefix; some accept four different operations described below.

## 1. ATCI syntax

The ATCI parser supports four operations per command `AT<CMD>`:

| Type | Form | Meaning |
| :--- | :--- | :--- |
| **Action** | `AT<CMD>` | Execute the action with no parameters. |
| **Set** | `AT<CMD>=<value>` | Write / configure. |
| **Read** | `AT<CMD>?` | Read the current value. |
| **Test** | `AT<CMD>=?` | Get metadata: range, type, default, help. |

#### Asynchronous broadcasts

The device occasionally emits unsolicited messages, for example after boot:

| Broadcast | When |
| :--- | :--- |
| `@BOOT` | Emitted after `app_init` has finished. |
| `@LOG:<level>:<message>` | Log lines from the firmware. |

## 2. Command catalogue

### 2.1 System / session management

| Command | Operation | Description |
| :--- | :--- | :--- |
| `AT+CLAC` | action | List every registered AT command. |
| `AT$HELP` | action | Same as `AT+CLAC` but with hints. |
| `AT$CRC=<0\|1\|2>` | set | CRC mode: `0` off, `1` strict, `2` optional. |
| `AT$CRC?` | read | Current CRC mode. |
| `AT$SHELL="<command>"` | set | Run any Zephyr shell command and stream its output back as `$SHELL: "<line>"`. |
| `AT$REBOOT` | action | Reboot the device (requires `CONFIG_HIO_ATCI_CMD_REBOOT=y`). |

### 2.2 Device information (`hio_info`)

| Command | Operation | Reply / description |
| :--- | :--- | :--- |
| `ATI` | action | `"<product-name>[-<hw-variant>]-<hw-revision>"` |
| `AT+CGMI` | action | `+CGMI: "<vendor-name>"` |
| `AT+CGMM` | action | `+CGMM: "<product-name>"` |
| `AT+CGMR` | action | `+CGMR: "<hw-revision>"` |
| `AT+CGSN` | action | `+CGSN: "<serial-number>"` |
| `AT$INFO?` | read | Dump every info item as `$INFO: "<key>","<value>"`. |
| `AT$INFO="<key>"` | set | Read a single item by key. |
| `AT$INFO=?` | test | Print the info schema (keys, types, descriptions). |

### 2.3 Configuration (`hio_config`)

| Command | Operation | Description |
| :--- | :--- | :--- |
| `AT$CONFIG?` | read | Dump every config item across all modules. |
| `AT$CONFIG="<module>"` | set | Dump every item in the given module. |
| `AT$CONFIG="<module>","<key>"` | set | Read a single item. |
| `AT$CONFIG="<module>","<key>",<value>` | set | Write an item (strings must be quoted). |
| `AT$CONFIG=?` | test | Print the config schema: module, key, type, range, default, description. |
| `AT&W` | action | Save the configuration to flash and reboot. |
| `AT&F` | action | Factory reset all configuration and reboot. |

#### Example - change the send interval

```text
AT$CONFIG="app","interval-send",60
AT&W
```

### 2.4 Firmware update / DFU (`hio_atci_cmd_fw`)

| Command | Operation | Description |
| :--- | :--- | :--- |
| `AT$FW?` | read | Print `confirmed`, `version`, and `swap type` of the active image. |
| `AT$FW="info"` | set | Detailed dump of the primary and secondary slots (version, magic, swap state, image-ok, …). |
| `AT$FW="start",<size>` | set | Start a DFU session for an image of `<size>` bytes. |
| `AT$FW="chunk",<offset>,"<hex>"` | set | Write a chunk of hex-encoded data at the given offset (the hex payload is wrapped in quotes). |
| `AT$FW="done"` | set | Finalize the transfer and schedule the swap on next boot. |
| `AT$FW="confirm"` | set | Mark the running image as good after a successful test boot. |

Typically you do **not** build the DFU stream by hand; use the `west bin-to-at` helper instead:

```bash
west bin-to-at --output-file update.at
```

With no `--input-file`, the tool picks up `build/*/zephyr/zephyr.signed.bin` automatically. Stream the resulting file into the AT console with:

```bash
west serial-console --input update.at
```

For the full step-by-step walk-through (including the post-reboot `AT$FW="confirm"`), see [**Application over AT (USB-C)**](../firmware-flashing/application-over-at.md).

## 3. Error codes

| Code | Meaning |
| :--- | :--- |
| `ERROR: "Invalid command"` | Command does not start with `AT` (`-ENOMSG`). |
| `ERROR: "Command not found"` | Unknown AT command (`-ENOEXEC`). |
| `ERROR: "Command not supported"` | The command does not support the requested operation type (`-ENOTSUP`). |
| `ERROR: "Invalid argument"` | Bad argument format (`-EINVAL`). |
| `ERROR: "Permission denied"` | Insufficient authorization (`-EACCES`). |
| `ERROR: "Out of memory"` | `-ENOMEM`. |
| `ERROR: "I/O error"` | `-EIO`. |
| `ERROR: "Invalid CRC format"` | The CRC suffix is malformed. |
| `ERROR: "CRC mismatch"` | The CRC does not match the message. |

## 4. Running shell commands from AT

`AT$SHELL` is the bridge to the Zephyr shell. Anything you can type into the [**RTT console**](../console/rtt-jlink.md) can be executed through `AT$SHELL` as well:

```text
AT$SHELL="therm state"
AT$SHELL="therm scan"
AT$SHELL="therm scan --save"
AT$SHELL="kernel reboot cold"
AT$SHELL="log disable"
AT$SHELL="log enable wrn"
```

The shell's stdout is streamed back as `$SHELL: "<line>"` lines, followed by `OK` (or `ERROR`).

The full set of shell commands is documented on the [**Shell Commands**](shell-commands.md) page.
