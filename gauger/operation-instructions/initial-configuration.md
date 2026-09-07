---
slug: initial-configuration
title: Initial Configuration
---

# Initial Configuration

After first powering up the device, connect to the device.

Connecting through Ethernet is done by plugging in the cable and configuring your computer to be on the `192.168.255.0/24` network (using the address `192.168.255.1` is not allowed). Then you can navigate to the `192.168.255.1` address in your web browser to access the Web UI.

Connecting through WiFi is done by connecting to the device’s Access Point. The SSID is in the following format: `hardwario-gauger-IDIDIDIDIDID`. The default password is `12345678`. After connecting to the WiFi network, you will automatically be assigned an IP address. Then you can access the device at `192.168.254.1`.

## Configuration Options

| Name                     | JSON Key                      | Type    | Default Value | Description                               |
| :----------------------- | :---------------------------- | :------ | :------------ | :---------------------------------------- |
| Device name              | `device_name`                 | String  |               | Hostname of the device                    |
| Password                 | `password`                    | String  |               | Password for the Web UI                   |
| Web server status        | `enable_server`               | Bool    | true          | If false, HTTP server is disabled         |
| Ethernet status          | `eth.enabled`                 | Bool    | true          | If false, Ethernet is disabled            |
| Ethernet DHCP client     | `eth.net.dhcp`                | Bool    | false         | If true, DHCP client is enabled           |
| Ethernet IP address      | `eth.net.ip`                  | IP      | 192.168.255.1 | IP address of the Ethernet interface      |
| Ethernet Netmask         | `eth.net.netmask`             | IP      | 255.255.255.0 | Mask of the Ethernet interface            |
| WiFi Mode                | `wifi.enabled`                | Bool    | true          | If true, WiFi is enabled                  |
| WiFi Mode                | `wifi.station`                | Bool    | false         | If true, WiFi is in station mode, else AP |
| WiFi DHCP server status  | `wifi.net.dhcp`               | Bool    | true          | If true, WiFi DHCP is enabled             |
| WiFi IP address          | `wifi.net.ip`                 | IP      | 192.168.254.1 | IP address of the WiFi interface          |
| WiFi Netmask             | `wifi.net.netmask`            | IP      | 255.255.255.0 | Mask of the WiFi interface                |
| Input #N Active filter   | `inputs[n].active_duration`   | Integer | 20            | Active filter duration                    |
| Input #N Inactive filter | `inputs[n].inactive_duration` | Integer | 20            | Inactive filter duration                  |
| Modbus Port              | `modbus.port`                 | Integer | 502           | Port of the Modbus server                 |
| Modbus Status            | `modbus.enabled`              | Bool    | true          | If true, Modbus is enabled                |
