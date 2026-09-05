---
title: Install ChirpStack Concentratord
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install ChirpStack Concentratord

This section installs and configures the **ChirpStack Concentratord** for the LoRa concentrator
module. **The hardware path is different between the two variants**, so pick the tab below that
matches your device:

:::info FIBER (CM4)

Connects via **USB**, the standard ChirpStack Concentratord configuration.

:::

:::info FIBER Lite (Pi 5)

Connects via **SPI** through a RAK2287 HAT, a different install path.

:::

<Tabs groupId="fiber-variant">
<TabItem value="fiber" label="USB (FIBER, CM4)" default>

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

1. Enable and start the **ChirpStack Concentratord** service:

   ```sh
   sudo systemctl enable --now chirpstack-concentratord
   ```

1. Check the service logs to verify successful startup and obtain the gateway ID:

   ```sh
   sudo journalctl -fu chirpstack-concentratord
   ```

   :::tip

   Copy the **Gateway ID** from the log output. You will need it to register the gateway in
   ChirpStack.

   :::

</TabItem>
<TabItem value="fiber-lite" label="SPI via RAK2287 HAT (FIBER Lite, Pi 5)">

The FIBER Lite concentrator is the same **RAK5146** LoRaWAN concentrator card, but seated on a
**RAK2287** Pi HAT connected via **SPI**, a different hardware path (SPI device + GPIO reset
pin) than the USB-connected variant above.

:::tip

You do **not** need RAKwireless's SX1302 HAL installer. ChirpStack Concentratord bundles the HAL
and ships a vendor profile for this hardware, which supplies the pin mapping (reset on
`gpiochip0` line 17), the RSSI offsets and the TX gain table.

:::

1. Enable SPI and confirm the HAT is detected. `dtparam=spi=on` ships commented out in Raspberry
   Pi OS:

   ```sh
   grep spi /boot/firmware/config.txt   # expect: dtparam=spi=on (uncommented)
   ls /dev/spidev*                       # expect: /dev/spidev0.0 and /dev/spidev0.1
   ```

   If `dtparam=spi=on` is commented out, uncomment it (or append it) in
   `/boot/firmware/config.txt` and reboot. If no `/dev/spidev*` device appears after that, the
   HAT is not seated. Do not continue until it is.

1. Download and install the **ChirpStack Concentratord** binary. ChirpStack does not publish
   Concentratord in its apt repository or as a GitHub release asset, only as a tarball on the
   artifacts server:

   ```sh
   curl -sL https://artifacts.chirpstack.io/downloads/chirpstack-concentratord/chirpstack-concentratord-sx1302_4.7.1_linux_arm64.tar.gz | sudo tar -xzf - -C /usr/bin --no-same-owner chirpstack-concentratord-sx1302
   ```

1. Create the configuration directory:

   ```sh
   sudo mkdir -p /etc/chirpstack-concentratord
   ```

1. Write the **Concentratord** configuration file:

   ```sh
   cat << EOF | sudo tee /etc/chirpstack-concentratord/chirpstack-concentratord-sx1302.toml > /dev/null
   [concentratord]
     log_level="INFO"
     log_to_syslog=false
     stats_interval="30s"

     [concentratord.api]
       event_bind="ipc:///tmp/concentratord_event"
       command_bind="ipc:///tmp/concentratord_command"

   [gateway]
     antenna_gain=2
     lorawan_public=true
     region="EU868"
     model="rak_2287"
     model_flags=[]
     gateway_id=""
     time_fallback_enabled=true

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
   EOF
   ```

   :::warning

   The `[gateway.concentrator]` channel plan is **mandatory**. The vendor profile supplies only
   the pin mapping, RSSI offsets and gain table, but it does not supply a channel plan. Without it
   every radio comes up `enabled: false` at frequency 0 and the daemon blocks indefinitely on
   `Opening SPI communication interface` with no error message, which looks exactly like a wiring
   or detection fault but is purely a configuration problem.

   :::

   :::note

   `model="rak_5146"` works here too. The two profiles share the same reset pin and neither drives
   a power-enable pin; they differ only in the SX1261 configuration used for Listen Before Talk,
   which EU868 does not use.

   :::

1. Create the **systemd** service file for **Concentratord**:

   ```sh
   cat << EOF | sudo tee /etc/systemd/system/chirpstack-concentratord.service > /dev/null
   [Unit]
   Description=ChirpStack Concentratord
   Documentation=https://www.chirpstack.io/
   After=network.target

   [Service]
   Type=simple
   ExecStart=/usr/bin/chirpstack-concentratord-sx1302 -c /etc/chirpstack-concentratord/chirpstack-concentratord-sx1302.toml
   Restart=on-failure
   RestartSec=5
   Group=chirpstack
   UMask=0007

   [Install]
   WantedBy=multi-user.target
   EOF
   ```

   :::warning

   `Group=chirpstack` and `UMask=0007` are load-bearing. Unlike the USB variant, this service runs
   as **root** so it can reach the SPI device and the GPIO reset pin, which means the ZeroMQ IPC
   sockets it creates in `/tmp` would default to `root:root` mode 0755. The MQTT Forwarder
   connects to them as the unprivileged `chirpstack` user, and connecting to a unix socket
   requires **write** permission, so it would be refused. These two lines make the sockets
   `root:chirpstack` mode 0770 instead. Both services will report `active` either way. The only
   symptom is that no uplinks ever reach MQTT.

   :::

1. Reload the **systemd** daemon to recognize the new service:

   ```sh
   sudo systemctl daemon-reload
   ```

1. Enable and start the **ChirpStack Concentratord** service:

   ```sh
   sudo systemctl enable --now chirpstack-concentratord
   ```

1. Check the service logs to verify successful startup and obtain the gateway ID:

   ```sh
   sudo journalctl -u chirpstack-concentratord | grep 'Gateway ID'
   ```

   A healthy start looks like this. `Frame received` lines appear on their own from any LoRaWAN
   traffic within range, before you register a device of your own:

   ```text
   INFO [libconcentratord::reset] Triggering sx130x reset
   INFO [...::concentrator] Configuring radio, radio: 0, enabled: true, center_freq: 867500000
   INFO [...::cmd::root] Gateway ID retrieved, gateway_id: "0016c001f13999e8"
   INFO [...::handler::uplink] Frame received, freq: 868100000, bw: 125000, mod: LoRa, dr: SF7
   ```

   :::tip

   Copy the **Gateway ID** from the log output. You will need it to register the gateway in
   ChirpStack.

   :::

</TabItem>
</Tabs>
