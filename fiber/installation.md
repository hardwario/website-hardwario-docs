---
slug: installation
title: Installation
---
import Image from '@theme/IdealImage';

# Installation

This article provides instructions on bootstrap and configuration of the Linux system on the **FIBER** device. The platform is based on **Compute Module 4**, an industrial version of the popular **Raspberry Pi 4** platform.

In the article, we use two terms:

- **HOST:** The computer from which you will perform the setup.
- **TARGET:** The actual FIBER device you are setting up.

## Connect Target to Host

1. Open the top cover of the **FIBER** device.

   :::tip

   There are four screws under the rubber feet.

   :::

1. Put jumper to the **BOOT** position (it has to be vertically aligned with the `BOOT` label on the PCB).

   :::tip

   This will allow the device to be switched to the bootloader mode.

   :::

1. Connect the PoE adapter (must be 802.3af compliant) to the wall socket.

1. Connect an Ethernet cable between the LAN port of the PoE adapter and your LAN router (unless WiFi connectivity is desired).

1. Connect the USB-B cable to **HOST** and the backside USB connector on the **TARGET**.

## Activate Bootloader

1. Install the **rpiboot** tool - follow the instructions from this GitHub repository:

   **https://github.com/raspberrypi/usbboot**

1. Connect an Ethernet cable between the PoE port of the PoE adapter and the Ethernet (RJ-45) connector of the **TARGET**.

1. Start the `rpiboot` tool.

   :::tip

   This should switch the **TARGET** to the bootloader mode. On the **HOST**, a new USB disk will appear.

   :::

## Flash Raspberry Pi OS

1. Download, install, and launch the [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager) tool.

1. In the **Device** step, select **Raspberry Pi 4** (this includes Compute Module 4).

   <Image img={require('./images/rpi-imager-select-device.png')} alt="Raspberry Pi Imager Device step with Raspberry Pi 4 selected in the device list" />

1. In the **OS** step, select **Raspberry Pi OS (other)**.

   <Image img={require('./images/rpi-imager-choose-os.png')} alt="Raspberry Pi Imager OS step with the Raspberry Pi OS (other) category selected" />

1. Select **Raspberry Pi OS Lite (64-bit)**.

   <Image img={require('./images/rpi-imager-choose-os-lite.png')} alt="Raspberry Pi Imager OS list with Raspberry Pi OS Lite (64-bit) selected" />

1. In the **Storage** step, select the **FIBER** device (shown as **RPi-MSD-0001 Media**).

   <Image img={require('./images/rpi-imager-select-storage.png')} alt="Raspberry Pi Imager Storage step with the RPi-MSD-0001 Media USB device selected" />

1. In the **Customisation** step, enter a hostname for your **FIBER** device (e.g. `fiber`).

   <Image img={require('./images/rpi-imager-hostname.png')} alt="Raspberry Pi Imager Customisation step with the hostname field set to fiber" />

1. In the **Localisation** section, select your location, time zone, and keyboard layout.

   <Image img={require('./images/rpi-imager-localisation.png')} alt="Raspberry Pi Imager Localisation section with capital city, time zone, and keyboard layout selectors" />

1. In the **User** section, enter a username and password.

   <Image img={require('./images/rpi-imager-user.png')} alt="Raspberry Pi Imager User section with the username fiber and password fields filled in" />

   :::tip

   You can use `fiber` for username and `hardwario` for password.

   :::

   :::danger

   This is only recommended with public-key SSH authentication, otherwise use a strong passphrase.

   :::

1. Optional: In the **Wi-Fi** section, enter your wireless network's SSID and password.

   <Image img={require('./images/rpi-imager-wifi.png')} alt="Raspberry Pi Imager Wi-Fi section with SSID, password, and confirm password fields for a secure network" />

1. In the **Remote access** section, enable **SSH** and select your preferred authentication method.

   <Image img={require('./images/rpi-imager-ssh.png')} alt="Raspberry Pi Imager SSH authentication section with Enable SSH on and password authentication selected" />

1. Optional: In the **Raspberry Pi Connect** section, you can enable remote access via Raspberry Pi Connect. For this guide, we leave it disabled.

   <Image img={require('./images/rpi-imager-connect.png')} alt="Raspberry Pi Imager Raspberry Pi Connect section with the enable toggle left off" />

1. Review the summary and click **WRITE** to start the flashing process.

   <Image img={require('./images/rpi-imager-summary.png')} alt="Raspberry Pi Imager Write image summary listing device, OS, storage, and customisations before writing" />

1. Confirm the warning dialog by clicking **I UNDERSTAND, ERASE AND WRITE**.

   <Image img={require('./images/rpi-imager-confirm.png')} alt="Raspberry Pi Imager warning dialog with the I UNDERSTAND, ERASE AND WRITE confirmation button" />

1. Wait for the writing process to complete.

   <Image img={require('./images/rpi-imager-writing.png')} alt="Raspberry Pi Imager writing the OS image to the storage device with a progress bar" />

1. When finished, press the **RESET** button on the **TARGET** (located next to the USB connector).

1. Wait for the **TARGET** to boot and connect to the network.

   :::tip

   You may find the IP address of your **TARGET** from your DHCP server's leases.

   :::

## Update System

1. Update the package list to get information on the newest versions of packages:

   ```sh
   sudo apt update
   ```

1. Upgrade all installed packages to their latest versions:

   ```sh
   sudo apt upgrade -y
   ```

1. Reboot the system to apply updates:

   ```sh
   sudo reboot
   ```

## Configure Hardware

This section configures the I2C bus and real-time clock (RTC) on the **FIBER** device.

1. Install the **I2C tools** package for I2C bus diagnostics:

   ```sh
   sudo apt install -y i2c-tools
   ```

1. Configure the `i2c-dev` kernel module to load automatically at boot:

   ```sh
   echo 'i2c-dev' | sudo tee -a /etc/modules-load.d/i2c.conf > /dev/null
   ```

1. Add hardware configuration to the boot configuration file:

   ```sh
   cat << EOF | sudo tee -a /boot/firmware/config.txt > /dev/null
   dtparam=i2c_arm=on
   dtparam=i2c_vc=on
   disable_poe_fan=1
   force_eeprom_read=0
   camera_auto_detect=0
   dtoverlay=i2c-rtc,pcf85063a,i2c_csi_dsi
   EOF
   ```

   :::tip

   This enables I2C interfaces, disables the PoE fan control, and configures the RTC overlay for the PCF85063A chip.

   :::

1. Reboot the system to apply the hardware configuration:

   ```sh
   sudo reboot
   ```

1. Verify the I2C bus is accessible by scanning for devices:

   ```sh
   sudo i2cdetect -y 10
   ```

   :::tip

   You should see the RTC device listed on the I2C bus.

   :::

1. Install additional utilities for hardware clock access:

   ```sh
   sudo apt install util-linux-extra
   ```

1. Verify the hardware clock is accessible:

   ```sh
   sudo hwclock -v
   ```

## Install ChirpStack

1. Install required packages for **ChirpStack** (MQTT broker and Redis):

   ```sh
   sudo apt install \
       mosquitto \
       mosquitto-clients \
       redis-server \
       redis-tools
   ```

1. Install the **GPG tool** for verifying package signatures:

   ```sh
   sudo apt install gpg
   ```

1. Create the directory for **APT keyrings** if it doesn't exist:

   ```sh
   sudo mkdir -p /etc/apt/keyrings/
   ```

1. Download and add the **ChirpStack** repository GPG key:

   ```sh
   sudo sh -c 'wget -q -O - https://artifacts.chirpstack.io/packages/chirpstack.key | gpg --dearmor > /etc/apt/keyrings/chirpstack.gpg'
   ```

1. Add the **ChirpStack** repository to the APT sources list:

   ```sh
   echo "deb [signed-by=/etc/apt/keyrings/chirpstack.gpg] https://artifacts.chirpstack.io/packages/4.x/deb stable main" | sudo tee /etc/apt/sources.list.d/chirpstack.list
   ```

1. Update the package list to include packages from the **ChirpStack** repository:

   ```sh
   sudo apt update
   ```

1. Install the **ChirpStack** package (SQLite variant):

   ```sh
   sudo apt install chirpstack-sqlite
   ```

1. Create the SQLite database file with proper ownership and permissions:

   ```sh
   sudo install -o chirpstack -g chirpstack -m 0640 /dev/null /var/lib/chirpstack/chirpstack.sqlite
   ```

1. Write the **ChirpStack** configuration file:

   ```sh
   cat << 'EOF' | sudo tee /etc/chirpstack/chirpstack.toml > /dev/null
   [logging]
     level = "info"

   [sqlite]
     path="sqlite:///var/lib/chirpstack/chirpstack.sqlite"
     pragmas=[
       "busy_timeout = 1000",
       "foreign_keys = ON",
     ]

   [redis]
     servers = ["redis://localhost/"]
     cluster = false

   [network]
     net_id = "000000"
     enabled_regions = [
       "as923",
       "as923_2",
       "as923_3",
       "as923_4",
       "au915_0",
       "cn470_10",
       "cn779",
       "eu433",
       "eu868",
       "in865",
       "ism2400",
       "kr920",
       "ru864",
       "us915_0",
       "us915_1",
     ]

   [api]
     bind = "0.0.0.0:8080"
     secret = "you-must-replace-this"

   [integration]
     enabled = ["mqtt"]

     [integration.mqtt]
       server = "tcp://localhost:1883/"
       json = true
   EOF
   ```

1. Generate and set a random secret key in the **ChirpStack** configuration:

   ```sh
   sudo sed -i "s|secret = \"you-must-replace-this\"|secret = \"$(openssl rand -base64 32)\"|" /etc/chirpstack/chirpstack.toml
   ```

1. Enable the **ChirpStack** service to start automatically on boot:

   ```sh
   sudo systemctl enable chirpstack-sqlite
   ```

1. Start the **ChirpStack** service:

   ```sh
   sudo systemctl start chirpstack-sqlite
   ```

1. Check the service logs to verify successful startup:

   ```sh
   sudo journalctl -fu chirpstack-sqlite
   ```

1. Now, you can access **ChirpStack** at this address: `http://[TARGET IP ADDRESS]:8080/`

## Install ChirpStack Concentratord

This section installs and configures the **ChirpStack Concentratord** for the LoRa concentrator module.

1. Download and install the **ChirpStack Concentratord** binary:

   ```sh
   curl -sL https://artifacts.chirpstack.io/downloads/chirpstack-concentratord/chirpstack-concentratord-sx1302_4.5.3_linux_arm64.tar.gz | sudo tar -xzf - -C /usr/bin --no-same-owner chirpstack-concentratord-sx1302
   ```

1. Create the configuration directory with proper ownership:

   ```sh
   sudo install -o chirpstack -g chirpstack -m 0750 -d /etc/chirpstack-concentratord
   ```

1. Create the configuration file with proper ownership and permissions:

   ```sh
   sudo install -o chirpstack -g chirpstack -m 0640 /dev/null /etc/chirpstack-concentratord/chirpstack-concentratord.toml
   ```

1. Write the **Concentratord** configuration file:

   ```sh
   cat << EOF | sudo tee /etc/chirpstack-concentratord/chirpstack-concentratord.toml > /dev/null
   [concentratord]
     log_level="INFO"
     log_to_syslog=false
     stats_interval="30s"
     disable_crc_filter=false

     [concentratord.api]
       event_bind="ipc:///tmp/concentratord_event"
       command_bind="ipc:///tmp/concentratord_command"

   [gateway]
     antenna_gain=0
     lorawan_public=true
     region="EU868"
     model="rak_5146"
     model_flags=["USB"]
     time_fallback_enabled=true
     gateway_id=""

     [gateway.concentrator]
       multi_sf_channels=[
         868100000,
         868300000,
         868500000,
         867100000,
         867300000,
         867500000,
         867700000,
         867900000,
       ]

       [gateway.concentrator.lora_std]
         frequency=868300000
         bandwidth=250000
         spreading_factor=7

       [gateway.concentrator.fsk]
         frequency=868800000
         bandwidth=125000
         datarate=50000

     [gateway.location]
       latitude=0.0
       longitude=0.0
       altitude=0
   EOF
   ```

1. Create the **systemd** service file for **Concentratord**:

   ```sh
   cat << EOF | sudo tee /etc/systemd/system/chirpstack-concentratord.service > /dev/null
   [Unit]
   Description=ChirpStack Concentratord
   Documentation=https://www.chirpstack.io/
   Wants=network-online.target
   After=network-online.target

   [Service]
   User=chirpstack
   Group=chirpstack
   ExecStart=/usr/bin/chirpstack-concentratord-sx1302 -c /etc/chirpstack-concentratord/chirpstack-concentratord.toml
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   EOF
   ```

1. Add the `chirpstack` user to the `dialout` group for serial port access:

   ```sh
   sudo usermod -aG dialout chirpstack
   ```

1. Reload the **systemd** daemon to recognize the new service:

   ```sh
   sudo systemctl daemon-reload
   ```

1. Enable the **ChirpStack Concentratord** service to start automatically on boot:

   ```sh
   sudo systemctl enable chirpstack-concentratord
   ```

1. Start the **ChirpStack Concentratord** service:

   ```sh
   sudo systemctl start chirpstack-concentratord
   ```

1. Check the service logs to verify successful startup and obtain the gateway ID:

   ```sh
   sudo journalctl -fu chirpstack-concentratord
   ```

   :::tip

   Copy the **Gateway ID** from the log output - you will need it to register the gateway in ChirpStack.

   :::

## Install ChirpStack MQTT Forwarder

This section installs the **ChirpStack MQTT Forwarder** that connects the Concentratord to the MQTT broker.

1. Install the **ChirpStack MQTT Forwarder** package:

   ```sh
   sudo apt install chirpstack-mqtt-forwarder
   ```

1. Write the **MQTT Forwarder** configuration file:

   ```sh
   cat << EOF | sudo tee /etc/chirpstack-mqtt-forwarder/chirpstack-mqtt-forwarder.toml > /dev/null
   [logging]
     level="info"
     log_to_syslog=false

   [backend]
     enabled="concentratord"

     [backend.concentratord]
     event_url = "ipc:///tmp/concentratord_event"
     command_url = "ipc:///tmp/concentratord_command"

   [mqtt]
     topic_prefix="eu868"
     server="tcp://127.0.0.1:1883"
     username=""
     password=""
     ca_cert=""
     tls_cert=""
     tls_key=""
   EOF
   ```

1. Enable the **ChirpStack MQTT Forwarder** service to start automatically on boot:

   ```sh
   sudo systemctl enable chirpstack-mqtt-forwarder
   ```

1. Start the **ChirpStack MQTT Forwarder** service:

   ```sh
   sudo systemctl start chirpstack-mqtt-forwarder
   ```

1. Check the service logs to verify successful startup:

   ```sh
   sudo journalctl -fu chirpstack-mqtt-forwarder
   ```

## Install Node-RED

1. Download and run the **Node-RED** installation script:

   ```sh
   bash <(curl -sL https://github.com/node-red/linux-installers/releases/latest/download/update-nodejs-and-nodered-deb)
   ```

1. Enable the **Node-RED** service to start automatically on boot:

   ```sh
   sudo systemctl enable nodered.service
   ```

1. Reboot the system to complete the installation:

   ```sh
   sudo reboot
   ```

1. Now, you can access **Node-RED** at this address: `http://[TARGET IP ADDRESS]:1880/`
