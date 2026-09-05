---
slug: /usage
title: Client Usage
description: "TAPPER client command line usage: the commands, options and arguments for operating the NFC reader from the shell."
---

import Image from '@theme/IdealImage';

# TAPPER Client CLI Usage

## Commands

Usage: `tapper COMMAND [OPTIONS] [ARGS]...`

### version

Write the version of the TAPPER client build into stdout.

`tapper version`

### run

Run the client.

`tapper run [OPTIONS]` or `sudo ~/.local/bin/tapper run [OPTIONS]` if you want to use the WiFi config.

:::info 

`sudo` is required for use of NetworkManager.

:::

#### Options

- `-c PATH` `--config PATH` path to the [configuration](#configuration) file
- `-d` `---debug` show debug output
- `-h IP` `--host IP` MQTT Broker host
- `-p PORT` `--port PORT` MQTT Broker port
- `-ca PATH` `--cafile PATH` Path to the CA certificate file
- `-cert PATH` `--certfile PATH` Path to the client certificate file for use with TLS
- `-key PATH` `--keyfile PATH` Path to the key file for use with TLS
- `--legacy` for use with legacy R1.0 hardware
- `--help` display help

#### Peripherals Behavior

**LED**

|        Behavior        |   Description    |
| :--------------------: | :--------------: |
| One Short Yellow Blink | NFC tag detected |
|  Continuous Red Light  | Tamper detected  |

**Buzzer**

|    Behavior     |   Description    |
| :-------------: | :--------------: |
| One Short Beep  | NFC tag detected |
| Continuous Beep | Tamper Detected  |

## Configuration

The TAPPER configuration file uses YAML syntax.

### MQTT

- Host is the host with the MQTT broker. At least this is required.
- Port is the port with the exposed MQTT broker.

```yaml
mqtt:
  host: "your_host" 
  port: 1883
  tls:
    cafile: "/path/to/file"
    certfile: "/path/to/file"
    keyfile: "/path/to/file"
```

#### TLS

To set up TLS, refer to [TLS Setup](/tapper/tls-setup/).

- Cafile is the path to the CA file to verify the server certificate with. (The signing CA)
- Certfile is the path to the client certificate file, signed by the CA.
- Keyfile is the path to the client key file.

:::warning[MQTT Server Certificate]

The **MQTT host** must **match** the **CN** or one of the **SANs** specified in the **server** X509 certificate.

See [MQTT TLS Setup](/tapper/tls-setup/)

:::

### WiFi

- WiFi can be set up either in static or in dynamic mode.

:::tip

The `passphrase` field can have the `psk` value acquired from `wpa_passphrase`.

:::

#### Dynamic 

Dynamic mode uses DHCP and sets the address, gateway, and DNS servers automatically.

```yaml
wifi:
  network: "MyWiFiSSID"
  passphrase: "supersecretpassword"
  mode: "dynamic"
```

#### Static

In static mode you have to set everything manually.

```yaml
wifi:
  network: "MyWiFiSSID"
  passphrase: "supersecretpassword"
  mode: "static"
  address: "192.168.1.100/24"
  gateway: "192.168.1.1"
  nameservers:  
  - 8.8.8.8
  - 1.1.1.1
```

The address can have a prefix length or a netmask attached, as shown in the example.

### Example

An example config file in `/home/hardwario/tapper.conf`:

```yaml
mqtt:
  host: "10.0.0.150"
  port: 8883
  tls:
    cafile: "/home/hardwario/ca.crt"
    certfile: "/home/hardwario/client.crt"
    keyfile: "/home/hardwario/client.key"
wifi:
  network: "MyWiFiSSID"
  passphrase: "supersecretpassword"
  mode: "static"
  address: "192.168.1.100/24"
  gateway: "192.168.1.1"
  nameservers:  
  - 8.8.8.8
  - 1.1.1.1
```

This would be used with: `sudo tapper run -c /home/hardwario/tapper.conf`