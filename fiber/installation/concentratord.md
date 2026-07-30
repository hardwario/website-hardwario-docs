---
title: Install ChirpStack Concentratord
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install ChirpStack Concentratord

This section installs and configures the **ChirpStack Concentratord** for the LoRa concentrator
module. **The hardware path is different between the two variants** — pick the tab below that
matches your device:

:::info FIBER (CM4)

Connects via **USB** — the standard ChirpStack Concentratord configuration.

:::

:::info FIBER Lite (Pi 5)

Connects via **SPI** through a RAK2287 HAT — a different install path, **not yet verified on
real hardware**.

:::

<Tabs groupId="fiber-variant">
<TabItem value="fiber" label="USB — FIBER (CM4)" default>

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

   Copy the **Gateway ID** from the log output - you will need it to register the gateway in
   ChirpStack.

   :::

</TabItem>
<TabItem value="fiber-lite" label="SPI, RAK2287 HAT — FIBER Lite (Pi 5)">

:::danger

**Not yet verified on real hardware.** The steps in this section were researched but never
actually tested against a connected RAK2287 + RAK5146 — treat them as a documented starting
point, not a guaranteed working procedure. Update this section once verified.

:::

The FIBER Lite concentrator is the same **RAK5146** LoRaWAN concentrator card, but seated on a
**RAK2287** Pi HAT connected via **SPI** — a different hardware path (SPI device + GPIO reset
pin) than the USB-connected variant above.

1. Before configuring anything, verify SPI is enabled and the HAT is detected:

   ```sh
   grep spi /boot/firmware/config.txt   # expect: dtparam=spi=on (uncommented)
   ls /dev/spidev*                       # expect: at least one device once the HAT is seated
   ```

   If `dtparam=spi=on` is commented out, uncomment it (or append it) in
   `/boot/firmware/config.txt` and reboot. If no `/dev/spidev*` device appears after that, the
   HAT is not seated/detected — do not proceed with the steps below until it is.

1. Use **RAKwireless's own SX1302 HAL installer** for the RAK2287 on Raspberry Pi, rather than
   the generic ChirpStack Concentratord USB configuration used above — the SPI variant needs the
   correct SPI device path and GPIO reset-pin handling that RAKwireless's own tooling provides.
   See RAKwireless's documentation for the RAK2287/RAK5146 Raspberry Pi HAT for the current
   installer script and region configuration (EU868 for European deployments).

1. Once running, check the Concentratord logs to obtain the **Gateway ID**, which you'll need to
   register the gateway in ChirpStack:

   ```sh
   sudo journalctl -fu chirpstack-concentratord
   ```

</TabItem>
</Tabs>
