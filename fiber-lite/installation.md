---
slug: installation
title: Installation
---
import Image from '@theme/IdealImage';

# Installation

This article provides instructions on bootstrap and configuration of the Linux system and full
LoRaWAN software stack on the **FIBER Lite** device, based on the **Raspberry Pi 5** platform.

Unlike the Compute Module 4 based [FIBER](/fiber/installation), FIBER Lite uses a plain
Raspberry Pi 5 — there is no bootloader-activation step, no BOOT jumper, and no `rpiboot` tool.
You flash a microSD card directly, as with any standard Raspberry Pi.

## Flash Raspberry Pi OS

:::tip

The screenshots below are reused from the Raspberry Pi Imager flow on the CM4-based
[FIBER](/fiber/installation) guide, since the tool and most steps are identical regardless of
device. A few steps look slightly different in practice: the **Device** picker shows
**Raspberry Pi 5** highlighted instead of Raspberry Pi 4, the **Storage** step lists your
microSD card reader by its own name instead of `RPi-MSD-0001 Media` (that name is specific to
the CM4's `rpiboot` USB boot mode, not used here), and the example hostname/username shown is
`fiber`/`fiber` rather than `fiber-lite`/`fiberlite` — use the FIBER Lite values given in the
steps below regardless of what the screenshot shows.

:::

1. Download, install, and launch the [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager) tool.

1. In the **Device** step, select **Raspberry Pi 5**.

1. In the **OS** step, select **Raspberry Pi OS (other)**.

   <Image img={require('./images/rpi-imager-choose-os.png')} />

1. Select **Raspberry Pi OS Lite (64-bit)**.

   <Image img={require('./images/rpi-imager-choose-os-lite.png')} />

1. In the **Storage** step, select the microSD card for the FIBER Lite device.

1. In the **Customisation** step (gear icon, or Ctrl+Shift+X), enter a hostname for your FIBER
   Lite device (e.g. `fiber-lite`).

   <Image img={require('./images/rpi-imager-hostname.png')} />

1. In the **Localisation** section, select your location, time zone, and keyboard layout.

   <Image img={require('./images/rpi-imager-localisation.png')} />

1. In the **User** section, enter a username and password.

   <Image img={require('./images/rpi-imager-user.png')} />

   :::tip

   You can use `fiberlite` for username and `hardwario` for password.

   :::

   :::danger

   This is only recommended with public-key SSH authentication, otherwise use a strong
   passphrase.

   :::

1. Optional: in the **Wi-Fi** section, enter your wireless network's SSID and password as a LAN
   fallback.

   <Image img={require('./images/rpi-imager-wifi.png')} />

1. In the **Remote access** section, enable **SSH** and select your preferred authentication
   method.

   <Image img={require('./images/rpi-imager-ssh.png')} />

1. Optional: in the **Raspberry Pi Connect** section, you can enable remote access via Raspberry
   Pi Connect. For this guide, we leave it disabled.

   <Image img={require('./images/rpi-imager-connect.png')} />

1. Review the summary and click **WRITE** to start flashing, then confirm the warning dialog.

1. Wait for the writing process to complete.

   <Image img={require('./images/rpi-imager-writing.png')} />

1. When writing completes, insert the microSD card into the FIBER Lite device and power it on.

1. Wait for the device to boot and connect to the network (30-90 seconds on first boot), then
   find its IP address. Try these in order:

   - **Router/DHCP leases** — check your router's admin page for a client named after the
     hostname you set (e.g. `fiber-lite`).
   - **mDNS** — `ping raspberrypi.local` or `ping <hostname>.local` (the hostname you set in
     Imager), if mDNS resolves on your network.
   - **Network scan** — from another machine on the same LAN/subnet:

     ```sh
     nmap -sn 192.168.1.0/24
     ```

     replacing `192.168.1.0/24` with your actual subnet. Look for a new host that wasn't there
     before you powered on the device.
   - **Monitor + keyboard** — as a last resort, connect a display and keyboard directly to the
     Pi and run `hostname -I` at the console.

   :::tip

   **Skip the guesswork with a static IP.** Instead of hunting for whatever address DHCP handed
   out, set one yourself before first boot: put the freshly flashed card back into your computer
   and create `network-config` at the root of the boot partition (`bootfs`, the small FAT
   volume — same partition as `meta-data`/`user-data`):

   ```yaml title="network-config"
   version: 2
   ethernets:
     eth0:
       dhcp4: false
       addresses:
         - 192.168.1.50/24
       gateway4: 192.168.1.1
       nameservers:
         addresses: [192.168.1.1, 1.1.1.1]
   ```

   Adjust the address, gateway, and subnet to match your network, then boot the device and SSH
   straight to `192.168.1.50` — no lease lookup or scan needed.

   This only applies on an instance's **first** boot, the same as `user-data` — see the
   cloud-init gotcha below. If you're adding this file to a card that has already booted once
   (so the account already exists), also bump `instance-id` in `meta-data` to a new value,
   otherwise cloud-init skips it as "already configured."

   :::

1. SSH into the device using the username and IP address (or hostname) from the previous steps:

   ```sh
   ssh fiberlite@<TARGET IP ADDRESS>
   ```

   Accept the host key fingerprint prompt on first connection, then enter the password you set
   in Imager. All commands in the rest of this guide are run from this SSH session, on the
   device itself.

:::danger

**Cloud-init gotcha.** Recent Raspberry Pi OS images use **cloud-init** instead of the older
`ssh`-file/`userconf.txt` mechanism. If you ever need to hand-edit `/boot/firmware/meta-data`
directly (instead of using Imager's Customisation dialog), the key **must** be `instance-id`
(hyphen), **not** `instance_id` (underscore) — the underscored key is silently ignored, and
cloud-init will skip user creation on every subsequent boot, causing "Permission denied" on SSH
indefinitely even after fixing `user-data`. Always use Imager's own dialog for the username/
password/SSH settings; you should not need to touch cloud-init files by hand in normal use. If
SSH connections are refused outright (no password prompt at all), or accepted but every password
is rejected, see **Troubleshooting** in the sidebar.

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
   EOF
   ```

1. Reboot the system to apply the hardware configuration:

   ```sh
   sudo reboot
   ```

:::danger

**Do not add an external RTC overlay.** The Compute Module 4 based FIBER guide adds
`dtoverlay=i2c-rtc,pcf85063a,i2c_csi_dsi` for an external PCF85063A real-time clock chip. **Do not
add this on FIBER Lite.** The Raspberry Pi 5 has a **native built-in RTC** that registers
automatically as `rtc0` — the external overlay has no chip to talk to and only produces a
harmless-but-noisy `error -EREMOTEIO` in the kernel log.

:::

1. Install additional utilities for hardware clock access:

   ```sh
   sudo apt install util-linux-extra
   ```

1. Verify the (built-in) hardware clock is accessible:

   ```sh
   sudo hwclock -v
   ```

## Install Docker

Docker is required for the dashboard landing page (see [Dashboard](#dashboard) below).

1. Install Docker and Docker Compose:

   ```sh
   sudo apt install -y docker.io docker-compose
   ```

   :::tip

   Debian's package is named `docker-compose` (not `docker-compose-plugin`, which is Docker's own
   repository naming and is not available from the default Raspberry Pi OS repositories). Both
   the `docker compose` and `docker-compose` command forms work after installing it.

   :::

1. Add your user to the `docker` group so you don't need `sudo` for Docker commands:

   ```sh
   sudo usermod -aG docker $USER
   ```

   :::tip

   Group membership only takes effect on your next login. Log out and back in (or run
   `newgrp docker` in the current shell), then verify with `docker ps` before continuing — if it
   still asks for `sudo`, the group change hasn't taken effect yet.

   :::

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

1. Update the package list and install the **ChirpStack** package (SQLite variant):

   ```sh
   sudo apt update
   sudo apt install chirpstack-sqlite
   ```

1. Create the `/var/lib/chirpstack` directory and the SQLite database file with proper ownership:

   ```sh
   sudo mkdir -p /var/lib/chirpstack
   sudo chown chirpstack:chirpstack /var/lib/chirpstack
   sudo chmod 0750 /var/lib/chirpstack
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
   sudo chown chirpstack:chirpstack /etc/chirpstack/chirpstack.toml
   sudo chmod 0640 /etc/chirpstack/chirpstack.toml
   sudo sed -i "s|secret = \"you-must-replace-this\"|secret = \"$(openssl rand -base64 32)\"|" /etc/chirpstack/chirpstack.toml
   ```

1. Enable and start the **ChirpStack** service:

   ```sh
   sudo systemctl enable --now chirpstack-sqlite
   ```

1. Now, you can access **ChirpStack** at this address: `http://[TARGET IP ADDRESS]:8080/`

   :::danger

   The default login is `admin` / `admin`. Change this password before exposing the device on any
   shared network.

   :::

## Install ChirpStack Concentratord (RAK2287 + RAK5146, SPI)

:::danger

**Not yet verified on real hardware.** The steps in this section were researched but never
actually tested against a connected RAK2287 + RAK5146 — treat them as a documented starting point,
not a guaranteed working procedure. Update this section once verified.

:::

The FIBER Lite concentrator is the **RAK5146** LoRaWAN concentrator card seated on a **RAK2287**
Pi HAT, connected via **SPI** — this is a different hardware path (SPI device + GPIO reset pin)
than the USB-connected RAK5146 variant used on the Compute Module 4 based FIBER.

1. Before configuring anything, verify SPI is enabled and the HAT is detected:

   ```sh
   grep spi /boot/firmware/config.txt   # expect: dtparam=spi=on (uncommented)
   ls /dev/spidev*                       # expect: at least one device once the HAT is seated
   ```

   If `dtparam=spi=on` is commented out, uncomment it (or append it) in
   `/boot/firmware/config.txt` and reboot. If no `/dev/spidev*` device appears after that, the
   HAT is not seated/detected — do not proceed with the steps below until it is.

1. Use **RAKwireless's own SX1302 HAL installer** for the RAK2287 on Raspberry Pi, rather than the
   generic ChirpStack Concentratord USB configuration used on the CM4-based FIBER — the SPI
   variant needs the correct SPI device path and GPIO reset-pin handling that RAKwireless's own
   tooling provides. See RAKwireless's documentation for the RAK2287/RAK5146 Raspberry Pi HAT for
   the current installer script and region configuration (EU868 for European deployments).

1. Once running, check the Concentratord logs to obtain the **Gateway ID**, which you'll need to
   register the gateway in ChirpStack:

   ```sh
   sudo journalctl -fu chirpstack-concentratord
   ```

## Install ChirpStack MQTT Forwarder

This section installs the **ChirpStack MQTT Forwarder** that connects the Concentratord to the
MQTT broker. It depends on Concentratord already running (see above).

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

1. Enable and start the service:

   ```sh
   sudo systemctl enable --now chirpstack-mqtt-forwarder
   ```

## Register a Gateway and a Device

:::danger

This section builds directly on the concentrator setup above, which is **not yet verified on real
hardware**. The ChirpStack UI steps themselves are standard ChirpStack v4 usage and apply
regardless of concentrator model, but the whole chain has not been exercised end-to-end
(gateway → real uplink) on a FIBER Lite unit yet.

:::

Installing the software gets ChirpStack, the concentrator, and the MQTT forwarder running, but
nothing joins the network until a **gateway** and at least one **device** are registered inside
ChirpStack itself.

1. Log in to ChirpStack (`http://[TARGET IP ADDRESS]:8080/`, `admin`/`admin` or whatever you
   changed it to). A default tenant named **ChirpStack** already exists — use it, or create your
   own under **Tenants**.

1. Under **Gateways**, click **Add gateway**:
   - **Gateway ID** — copy this from the Concentratord logs (`sudo journalctl -fu
     chirpstack-concentratord`), printed once the concentrator connects.
   - **Name** — anything descriptive, e.g. `fiber-lite-gw`.
   - **Region** — must match one of the `enabled_regions` in `/etc/chirpstack/chirpstack.toml`
     (e.g. `eu868` for Europe).

   Once saved, the gateway's detail page shows a **Last seen at** timestamp that updates
   periodically if the concentrator → MQTT forwarder → ChirpStack chain is actually working.

1. Under **Device profiles**, click **Add device profile**. At minimum set:
   - **Region** — same region as the gateway.
   - **MAC version** — match what your test device (e.g. STICKER, CHESTER) actually speaks
     (LoRaWAN 1.0.x for most HARDWARIO devices; check the device's own documentation).
   - **Regional parameters revision** — leave at ChirpStack's default unless your device needs a
     specific one.
   - **Join type** — **OTAA** for typical HARDWARIO devices.

1. Under **Applications**, click **Add application** to group devices under (e.g.
   `fiber-lite-test`).

1. Inside that application, click **Add device**:
   - **Device EUI** — the DevEUI printed on the physical device or its documentation.
   - **Device profile** — the one created above.
   - **Device name** — anything descriptive.

   After creating the device, open its **OTAA keys** tab and set the **Application key**
   (`AppKey`) — and **Network key** (`NwkKey`) if the device profile is LoRaWAN 1.1 — to match
   what is programmed into the physical device. These must match exactly on both sides or the
   join will silently fail.

1. Power on the physical LoRaWAN device. Watch the device's **LoRaWAN frames** tab (live view) in
   the ChirpStack UI — a join-request followed by a join-accept should appear within seconds if
   the gateway is in range and everything above is configured correctly. If nothing appears at
   all, re-check the gateway's **Last seen at** timestamp first — no traffic reaching the gateway
   means the problem is on the radio/concentrator side, not the device registration.

   :::tip

   Once joined, uplinks publish to the MQTT topic
   `application/<application-id>/device/<dev-eui>/event/up` — the same wildcard topic
   (`application/+/device/+/event/up`) the Node-RED flow below subscribes to.

   :::

## Install InfluxDB

1. Download the **InfluxData** repository GPG key and verify its fingerprint before trusting it:

   ```sh
   curl --silent --location -O https://repos.influxdata.com/influxdata-archive.key
   gpg --show-keys --with-fingerprint --with-colons ./influxdata-archive.key 2>&1 \
     | grep -q '^fpr:\+24C975CBA61A024EE1B631787C3D57159FC2F927:$' \
     && echo "fingerprint OK"
   ```

1. Add the key and repository:

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   cat influxdata-archive.key | gpg --dearmor | sudo tee /etc/apt/keyrings/influxdata-archive.gpg > /dev/null
   rm influxdata-archive.key
   echo 'deb [signed-by=/etc/apt/keyrings/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main' | sudo tee /etc/apt/sources.list.d/influxdata.list
   ```

1. Update the package list and install **InfluxDB 2.x** with its CLI:

   ```sh
   sudo apt update
   sudo apt install -y influxdb2 influxdb2-cli
   sudo systemctl enable --now influxdb
   ```

1. Initialize the organization, bucket, and API token non-interactively:

   ```sh
   influx setup --username fiberlite --password '<choose a password>' \
     --org fiber-lite --bucket fiber-lite --token "$(openssl rand -hex 32)" --force
   ```

   :::tip

   `openssl rand -hex 32` generates a random 64-character token so you don't have to invent one.
   Immediately after, run `influx auth list` to print it back out — store it, together with the
   password you chose, in your device's credentials record; they are needed again for the
   Node-RED flow and the Grafana datasource below.

   :::

## Install Node-RED

1. Download and run the **Node-RED** installation script non-interactively:

   ```sh
   bash <(curl -sL https://github.com/node-red/linux-installers/releases/download/v2.1.1/install-update-nodered-deb) \
     --confirm-root --confirm-install --confirm-pi
   ```

   :::tip

   Check the actual current release asset name/URL before running this — release filenames on the
   `node-red/linux-installers` GitHub repository have changed between versions. The
   `--confirm-*` flags skip interactive prompts, which is required when running over SSH.

   :::

1. Enable the **Node-RED** service to start automatically on boot:

   ```sh
   sudo systemctl enable nodered.service
   sudo reboot
   ```

1. Set an explicit credential-encryption secret. Without this, Node-RED regenerates a new one on
   every restart and any stored flow credentials become unrecoverable. In
   `~/.node-red/settings.js`, uncomment and set:

   ```js
   credentialSecret: "<a random secret>",
   ```

1. Secure the editor. It is **wide open by default** — Node-RED's own install output explicitly
   warns against exposing it unsecured. Generate a password hash:

   ```sh
   node-red admin hash-pw
   ```

   Then, in `settings.js`, uncomment and fill in the `adminAuth` block with that hash:

   ```js
   adminAuth: {
       type: "credentials",
       users: [{
           username: "admin",
           password: "<bcrypt hash from above>",
           permissions: "*"
       }]
   },
   ```

   ```sh
   sudo systemctl restart nodered.service
   ```

1. Install the InfluxDB node:

   ```sh
   cd ~/.node-red && npm install node-red-contrib-influxdb
   sudo systemctl restart nodered.service
   ```

   :::tip

   A restart is required — Node-RED does not hot-load newly installed node types while already
   running.

   :::

1. Build a flow: **MQTT in** (topic `application/+/device/+/event/up`, broker
   `localhost:1883`) → **Function** (parse the ChirpStack uplink JSON, set `msg.measurement` and
   `msg.payload = [fields, tags]`) → **InfluxDB out** (config node: `influxdbVersion: "2.0"`,
   `url: http://localhost:8086`, token from the InfluxDB setup step; node: `org: fiber-lite`,
   `bucket: fiber-lite`).

   :::tip

   Without a LoRaWAN gateway/device connected yet, this flow is scaffolding — build it now so it's
   ready as soon as a gateway and device are registered (see **Register a Gateway and a Device**
   above) and passing real uplinks.

   :::

1. Now, you can access **Node-RED** at this address: `http://[TARGET IP ADDRESS]:1880/`

## Install Grafana

1. Install prerequisites and add the **Grafana** repository:

   ```sh
   sudo apt-get install -y apt-transport-https wget gnupg
   sudo mkdir -p /etc/apt/keyrings
   sudo wget -O /etc/apt/keyrings/grafana.asc https://apt.grafana.com/gpg-full.key
   sudo chmod 644 /etc/apt/keyrings/grafana.asc
   echo "deb [signed-by=/etc/apt/keyrings/grafana.asc] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
   ```

1. Update the package list, install, and enable **Grafana**:

   ```sh
   sudo apt-get update
   sudo apt-get install -y grafana
   sudo systemctl enable --now grafana-server
   ```

1. Change the default admin password via the API:

   ```sh
   curl -X PUT http://localhost:3000/api/admin/users/1/password \
     -u admin:admin -H "Content-Type: application/json" \
     -d '{"password":"<new password>"}'
   ```

1. Add the InfluxDB datasource:

   ```sh
   curl -X POST http://localhost:3000/api/datasources \
     -u admin:<new password> -H "Content-Type: application/json" \
     -d '{
       "name": "InfluxDB fiber-lite", "type": "influxdb", "access": "proxy",
       "url": "http://localhost:8086",
       "jsonData": {"version": "Flux", "organization": "fiber-lite", "defaultBucket": "fiber-lite", "tlsSkipVerify": true},
       "secureJsonData": {"token": "<influxdb token from the InfluxDB setup step>"}
     }'
   ```

1. Now, you can access **Grafana** at this address: `http://[TARGET IP ADDRESS]:3000/`

   :::tip

   Dashboard panels are best built once there's real device/gateway data flowing in — there's
   nothing meaningful to visualize before that.

   :::

## Dashboard

FIBER Lite ships a landing page on port 80 with tiles linking to every service, live system
metrics, and an SSH quick-copy button — styled to the HARDWARIO brand (colors, typography, logo).
It is a self-contained static page with a small Python backend for live stats — no external
framework or Docker container required for the page itself. The logo and font below are fetched
from `hardwario.com`/Google Fonts at page-load time for simplicity; self-hosting them is possible
but not required.

1. Create the dashboard directory:

   ```sh
   mkdir -p ~/fiber-lite-dashboard
   ```

1. Write `index.html` — this is the dashboard's web page (layout, styling, and the little script
   that fills in your device's IP and refreshes the live stats). The block below is collapsed by
   default since it's long; click the bar to expand it, then copy the whole thing into the
   command:

   <details>
   <summary><b>Click to expand: full index.html code</b></summary>
   <p>

   ```sh
   cat << 'EOF' > ~/fiber-lite-dashboard/index.html
   <!DOCTYPE html>
   <html lang="en">
   <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>FIBER Lite</title>
   <style>
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

   :root {
     --blue-bright: #009cfa; --blue-dark: #016ad4; --navy: #06367a;
     --red: #e30427; --c-blue: #009cfa; --c-orange: #ff8d28; --c-cyan: #00c0e8; --c-green: #34c759;
     --bg: #ffffff; --surface: #ffffff; --surface-muted: #f3f4f6; --heading: #000000;
     --text: #252532; --text-mute: rgba(37,37,50,.7); --text-faint: rgba(37,37,50,.5);
     --border: #e6e6e6; --input-bg: #ffffff; --input-bd: #d1d5db;
     --primary: var(--blue-bright); --link: var(--blue-dark);
     --focus-ring: color-mix(in srgb, var(--blue-bright) 35%, transparent);
   }
   [data-theme="dark"] {
     --red: #f43f5e; --bg: #0f0f14; --surface: #1a1a22; --surface-muted: #131319;
     --heading: #ffffff; --text: #e7e7ee; --text-mute: rgba(231,231,238,.64);
     --text-faint: rgba(231,231,238,.45); --border: #2b2b36; --input-bg: #1a1a22; --input-bd: #34343f;
     --link: #4db5ff; --focus-ring: color-mix(in srgb, var(--blue-bright) 45%, transparent);
   }
   :root { --font-sans: "Inter", system-ui, sans-serif; --font-mono: ui-monospace, monospace;
     --radius: 8px; --radius-lg: 16px; --shadow-sm: 0 6px 18px rgba(16,16,30,.06); --ease: cubic-bezier(.2,.8,.2,1); }
   [data-theme="dark"] { --shadow-sm: 0 6px 18px rgba(0,0,0,.45); }
   *,*::before,*::after{box-sizing:border-box}*{margin:0}html,body{height:100%;max-width:100%;overflow-x:hidden}
   html{font-family:var(--font-sans);scroll-behavior:smooth}
   body{background:var(--bg);color:var(--text);font-size:16px;line-height:1.625;-webkit-font-smoothing:antialiased;transition:background-color .25s var(--ease),color .25s var(--ease)}
   img,svg{display:block;max-width:100%}input,button{font:inherit;color:inherit}button{background:none;border:0;cursor:pointer}
   a{color:var(--link);text-decoration:none}a:hover{color:var(--blue-dark)}
   h1,h2,h3,h4{font-weight:700;line-height:1.1;letter-spacing:-.02em;color:var(--heading)}
   :focus-visible{outline:2px solid var(--primary);outline-offset:2px}
   .hp-root{background:var(--bg);color:var(--text);overflow-x:hidden;min-height:100vh;display:flex;flex-direction:column}
   .hp-main{flex:1 0 auto;width:100%;margin:0 auto;padding:40px 48px 72px}
   .hp-ssh .hp-mono{word-break:break-all;overflow-wrap:anywhere}
   header.hp-head{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-bottom:40px}
   .hp-brand{display:flex;align-items:center;gap:16px}.hp-brand img{height:40px}
   .hp-title{font-size:22px;font-weight:700;letter-spacing:-.01em;color:var(--heading)}
   .hp-glabel{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mute)}
   .hp-mono{font-family:var(--font-mono);font-variant-numeric:tabular-nums}
   .hp-head-right{display:flex;align-items:center;gap:14px}
   .hp-clock-block{text-align:right;line-height:1.25}.hp-clock{font-size:20px;font-weight:600;color:var(--heading)}
   .hp-date{font-size:12px;color:var(--text-mute)}
   .hp-theme-btn{width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--border);background:var(--surface-muted);border-radius:8px;color:var(--text);flex:0 0 auto}
   .hp-search-wrap{position:relative;margin-bottom:40px}
   .hp-search-icon{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--text-faint);display:flex}
   .hp-search{width:100%;height:48px;padding:0 16px 0 44px;background:var(--input-bg);border:1px solid var(--input-bd);border-radius:8px;color:var(--text);font-size:15px;outline:none}
   .hp-search:focus{border-color:var(--blue-bright);box-shadow:0 0 0 3px var(--focus-ring)}
   .hp-card{display:block;background:var(--surface);border:1px solid var(--border);border-radius:16px;box-shadow:var(--shadow-sm);transition:transform .2s var(--ease),border-color .15s,box-shadow .15s}
   .hp-svc:hover{transform:translateY(-3px);border-color:var(--red);box-shadow:0 10px 24px -12px rgba(0,0,0,.5)}
   .hp-svc:hover .hp-arrow{color:var(--blue-bright);transform:translate(2px,-2px)}
   .hp-arrow{color:var(--text-faint);transition:transform .2s var(--ease),color .15s;display:flex}
   .hp-svc.hp-hidden{display:none}
   @keyframes hp-pulse{0%{box-shadow:0 0 0 0 rgba(52,199,89,.5)}100%{box-shadow:0 0 0 9px rgba(52,199,89,0)}}
   .hp-dot{display:inline-block;width:8px;height:8px;border-radius:999px;background:var(--c-green);animation:hp-pulse 1.8s var(--ease) infinite}
   section.hp-sys{padding:24px 28px;margin-bottom:44px}
   .hp-sys-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}
   .hp-sys-title{display:flex;align-items:center;gap:10px}.hp-sys-title span.ic{color:var(--blue-bright);display:flex}
   .hp-sys-title span.label{font-size:15px;font-weight:600;color:var(--heading)}
   .hp-sys-up{display:flex;align-items:center;gap:8px}.hp-sys-up span.uptime{font-size:12px;color:var(--text-mute)}
   .hp-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
   .hp-stat-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}
   .hp-stat-row .val{font-size:14px;font-weight:600;color:var(--heading)}
   .hp-bar-track{height:6px;background:var(--surface-muted);border-radius:999px;overflow:hidden}
   .hp-bar-fill{height:100%;border-radius:999px;transition:width .5s var(--ease)}
   .hp-section{margin-bottom:44px}
   .hp-svcgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}
   .hp-svc-card{padding:20px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px}
   .hp-svc-name{display:flex;align-items:center;gap:10px;margin-bottom:4px}.hp-svc-name span.n{font-size:16px;font-weight:600;color:var(--heading)}
   .hp-svc-desc{font-size:13px;color:var(--text-mute)}.hp-svc-port{font-size:12px;color:var(--text-faint);margin-top:6px}
   .hp-access-card{padding:20px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
   .hp-access-left{display:flex;align-items:center;gap:14px;min-width:0}.hp-access-left .ic{color:var(--blue-bright);display:flex;flex:0 0 auto}
   .hp-access-name{font-size:16px;font-weight:600;color:var(--heading);margin-bottom:3px}.hp-access-cmd{font-size:13px;color:var(--text-mute)}
   .hp-copy-btn{height:36px;padding:0 16px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}
   .hp-dev-card{padding:14px 18px;display:inline-flex;align-items:center;gap:12px}
   .hp-dev-badge{width:32px;height:32px;border-radius:8px;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700}
   .hp-dev-name{font-size:15px;font-weight:600;color:var(--heading)}
   footer.hp-foot{flex-shrink:0;border-top:1px solid var(--border);padding:20px 48px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
   footer.hp-foot img{height:16px;opacity:.9}footer.hp-foot .tag{font-size:12px;color:var(--text-faint)}
   @media (max-width:720px){
     .hp-main{padding:24px 18px 48px}.hp-head{flex-direction:column;align-items:flex-start;gap:16px}
     .hp-head-right{width:100%;justify-content:space-between}.hp-metrics{grid-template-columns:repeat(2,1fr);gap:20px 24px}
     .hp-svcgrid{grid-template-columns:1fr}.hp-foot{padding:18px;flex-direction:column;align-items:flex-start;gap:10px}
     .hp-ssh{flex-direction:column;align-items:flex-start}.hp-clock{font-size:17px!important}
     .hp-ssh>div{min-width:0}.hp-ssh button{width:100%}
   }
   </style>
   </head>
   <body>
   <div class="hp-root">
     <div class="hp-main">
       <header class="hp-head">
         <div class="hp-brand">
           <img src="https://www.hardwario.com/hw-mark-pos.svg" alt="HARDWARIO">
           <div>
             <div class="hp-title">FIBER Lite</div>
             <div class="hp-glabel" style="margin-top:3px;">Raspberry Pi 5</div>
           </div>
         </div>
         <div class="hp-head-right">
           <div class="hp-clock-block hp-mono">
             <div class="hp-clock" id="clock">--:--:--</div>
             <div class="hp-date" id="today">-</div>
           </div>
           <button class="hp-theme-btn" id="themeToggle" title="Toggle theme">
             <svg id="iconMoon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
             <svg id="iconSun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
           </button>
         </div>
       </header>

       <div class="hp-search-wrap">
         <span class="hp-search-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg></span>
         <input class="hp-search" id="search" placeholder="Search services…">
       </div>

       <section class="hp-card hp-sys">
         <div class="hp-sys-head">
           <div class="hp-sys-title">
             <span class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"></path></svg></span>
             <span class="label">Raspberry Pi 5</span>
           </div>
           <div class="hp-sys-up"><span class="hp-dot"></span><span class="uptime hp-mono" id="uptime">UP --</span></div>
         </div>
         <div class="hp-metrics">
           <div><div class="hp-stat-row"><span class="hp-glabel">CPU</span><span class="val hp-mono" id="cpuVal">--%</span></div><div class="hp-bar-track"><div class="hp-bar-fill" id="cpuBar" style="width:0%;background:var(--c-green);"></div></div></div>
           <div><div class="hp-stat-row"><span class="hp-glabel">MEM</span><span class="val hp-mono" id="memVal">--%</span></div><div class="hp-bar-track"><div class="hp-bar-fill" id="memBar" style="width:0%;background:var(--c-blue);"></div></div></div>
           <div><div class="hp-stat-row"><span class="hp-glabel">Disk /</span><span class="val hp-mono" id="diskVal">--%</span></div><div class="hp-bar-track"><div class="hp-bar-fill" id="diskBar" style="width:0%;background:var(--c-cyan);"></div></div></div>
           <div><div class="hp-stat-row"><span class="hp-glabel">Temp</span><span class="val hp-mono" id="tempVal">--°C</span></div><div class="hp-bar-track"><div class="hp-bar-fill" id="tempBar" style="width:0%;background:var(--c-orange);"></div></div></div>
         </div>
       </section>

       <section class="hp-section">
         <div class="hp-glabel" style="margin-bottom:16px;">LoRaWAN &amp; Data</div>
         <div class="hp-svcgrid" id="serviceGrid">
           <a class="hp-card hp-svc" data-search="chirpstack lorawan network server" href="http://TARGET_IP:8080" target="_blank" rel="noreferrer">
             <div class="hp-svc-card"><div><div class="hp-svc-name"><span class="hp-dot"></span><span class="n">ChirpStack</span></div><div class="hp-svc-desc">LoRaWAN Network Server</div><div class="hp-svc-port hp-mono">:8080</div></div><span class="hp-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span></div>
           </a>
           <a class="hp-card hp-svc" data-search="node-red data processing login required" href="http://TARGET_IP:1880" target="_blank" rel="noreferrer">
             <div class="hp-svc-card"><div><div class="hp-svc-name"><span class="hp-dot"></span><span class="n">Node-RED</span></div><div class="hp-svc-desc">Data processing (login required)</div><div class="hp-svc-port hp-mono">:1880</div></div><span class="hp-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span></div>
           </a>
           <a class="hp-card hp-svc" data-search="influxdb time-series database" href="http://TARGET_IP:8086" target="_blank" rel="noreferrer">
             <div class="hp-svc-card"><div><div class="hp-svc-name"><span class="hp-dot"></span><span class="n">InfluxDB</span></div><div class="hp-svc-desc">Time-series database</div><div class="hp-svc-port hp-mono">:8086</div></div><span class="hp-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span></div>
           </a>
           <a class="hp-card hp-svc" data-search="grafana visualization dashboards" href="http://TARGET_IP:3000" target="_blank" rel="noreferrer">
             <div class="hp-svc-card"><div><div class="hp-svc-name"><span class="hp-dot"></span><span class="n">Grafana</span></div><div class="hp-svc-desc">Visualization and dashboards</div><div class="hp-svc-port hp-mono">:3000</div></div><span class="hp-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span></div>
           </a>
         </div>
       </section>

       <section class="hp-section">
         <div class="hp-glabel" style="margin-bottom:16px;">Access</div>
         <div class="hp-card hp-ssh hp-access-card">
           <div class="hp-access-left">
             <span class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m4 17 6-6-6-6M12 19h8"></path></svg></span>
             <div><div class="hp-access-name">SSH</div><div class="hp-access-cmd hp-mono" id="sshCmd">ssh fiberlite@TARGET_IP</div></div>
           </div>
           <button class="hp-copy-btn" id="copyBtn">COPY</button>
         </div>
       </section>

       <section class="hp-section" style="margin-bottom:48px;">
         <div class="hp-glabel" style="margin-bottom:16px;">Developer</div>
         <div style="display:flex;gap:12px;flex-wrap:wrap;">
           <a class="hp-card hp-dev-card" href="https://github.com/hardwario" target="_blank" rel="noreferrer">
             <span class="hp-dev-badge">HW</span><span class="hp-dev-name">GitHub</span>
             <span class="hp-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span>
           </a>
         </div>
       </section>
     </div>

     <footer class="hp-foot">
       <img id="footerLogo" src="https://www.hardwario.com/logo-dark.svg" alt="HARDWARIO">
       <span class="tag">FIBER Lite · Engineered in the heart of Europe</span>
     </footer>
   </div>

   <script>
   (function () {
     var THEME_KEY = 'fiber-lite-theme';
     var sshTarget = 'fiberlite@' + window.location.hostname;
     document.getElementById('sshCmd').textContent = 'ssh ' + sshTarget;
     document.querySelectorAll('a[href*="TARGET_IP"]').forEach(function (a) {
       a.href = a.href.replace('TARGET_IP', window.location.hostname);
     });

     function applyTheme(theme) {
       document.querySelector('.hp-root').setAttribute('data-theme', theme);
       document.getElementById('iconMoon').style.display = theme === 'dark' ? '' : 'none';
       document.getElementById('iconSun').style.display = theme === 'dark' ? 'none' : '';
       document.getElementById('footerLogo').src = theme === 'dark'
         ? 'https://www.hardwario.com/logo-dark.svg'
         : 'https://www.hardwario.com/logo.svg';
     }
     var savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
     applyTheme(savedTheme);
     document.getElementById('themeToggle').addEventListener('click', function () {
       var next = document.querySelector('.hp-root').getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
       localStorage.setItem(THEME_KEY, next);
       applyTheme(next);
     });

     function tick() {
       var d = new Date();
       document.getElementById('clock').textContent = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
       document.getElementById('today').textContent = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
     }
     tick();
     setInterval(tick, 1000);

     var copyBtn = document.getElementById('copyBtn');
     copyBtn.addEventListener('click', function () {
       navigator.clipboard.writeText(sshTarget && ('ssh ' + sshTarget)).catch(function () {});
       copyBtn.textContent = 'COPIED';
       setTimeout(function () { copyBtn.textContent = 'COPY'; }, 1600);
     });

     var searchInput = document.getElementById('search');
     searchInput.addEventListener('input', function () {
       var q = searchInput.value.trim().toLowerCase();
       document.querySelectorAll('#serviceGrid .hp-svc').forEach(function (card) {
         var hay = card.getAttribute('data-search') || '';
         card.classList.toggle('hp-hidden', q.length > 0 && hay.indexOf(q) === -1);
       });
     });

     function refreshStats() {
       fetch('/api/stats', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (s) {
         document.getElementById('cpuVal').textContent = s.cpu + '%';
         document.getElementById('cpuBar').style.width = s.cpu + '%';
         document.getElementById('memVal').textContent = s.mem + '%';
         document.getElementById('memBar').style.width = s.mem + '%';
         document.getElementById('diskVal').textContent = s.disk + '%';
         document.getElementById('diskBar').style.width = s.disk + '%';
         if (s.temp !== null) {
           document.getElementById('tempVal').textContent = s.temp + '°C';
           document.getElementById('tempBar').style.width = Math.min(s.temp, 100) + '%';
         }
         document.getElementById('uptime').textContent = 'UP ' + s.uptime;
       }).catch(function () {});
     }
     refreshStats();
     setInterval(refreshStats, 4000);
   })();
   </script>
   </body>
   </html>
   EOF
   ```

   </p>
   </details>

   :::tip

   The service tiles and SSH command use `window.location.hostname` to fill in the target IP
   automatically — open the page from whatever address you actually browse to, and the links/SSH
   command adjust themselves. No need to hand-edit IP addresses into the file.

   :::

1. Write `serve.py` — this is the small program that actually runs the dashboard: a
   dependency-free Python web server that serves the `index.html` page above and exposes a
   `/api/stats` endpoint with live CPU/memory/disk usage and temperature. Same as above, click
   to expand the code, then copy the whole thing into the command:

   <details>
   <summary><b>Click to expand: full serve.py code</b></summary>
   <p>

   ```sh
   cat << 'EOF' > ~/fiber-lite-dashboard/serve.py
   #!/usr/bin/env python3
   import http.server
   import json
   import os
   import time

   BASE_DIR = os.path.dirname(os.path.abspath(__file__))


   def get_cpu_percent(interval=0.3):
       def read():
           with open('/proc/stat') as f:
               line = f.readline()
           parts = [int(x) for x in line.split()[1:8]]
           idle = parts[3] + parts[4]
           total = sum(parts)
           return idle, total

       idle1, total1 = read()
       time.sleep(interval)
       idle2, total2 = read()
       idle_delta = idle2 - idle1
       total_delta = total2 - total1
       if total_delta <= 0:
           return 0.0
       return round((1 - idle_delta / total_delta) * 100, 1)


   def get_mem_percent():
       info = {}
       with open('/proc/meminfo') as f:
           for line in f:
               k, v = line.split(':', 1)
               info[k.strip()] = int(v.strip().split()[0])
       total = info['MemTotal']
       avail = info.get('MemAvailable', info.get('MemFree', 0))
       used = total - avail
       return round(used / total * 100, 1)


   def get_disk_percent(path='/'):
       st = os.statvfs(path)
       total = st.f_blocks * st.f_frsize
       free = st.f_bfree * st.f_frsize
       used = total - free
       return round(used / total * 100, 1)


   def get_temp_c():
       try:
           with open('/sys/class/thermal/thermal_zone0/temp') as f:
               return round(int(f.read().strip()) / 1000, 1)
       except OSError:
           return None


   def get_uptime_str():
       with open('/proc/uptime') as f:
           seconds = float(f.read().split()[0])
       days = int(seconds // 86400)
       hours = int((seconds % 86400) // 3600)
       return f"{days}d {hours:02d}h"


   class Handler(http.server.SimpleHTTPRequestHandler):
       def __init__(self, *args, **kwargs):
           super().__init__(*args, directory=BASE_DIR, **kwargs)

       def do_GET(self):
           if self.path == '/api/stats':
               data = {
                   "cpu": get_cpu_percent(),
                   "mem": get_mem_percent(),
                   "disk": get_disk_percent(),
                   "temp": get_temp_c(),
                   "uptime": get_uptime_str(),
               }
               body = json.dumps(data).encode()
               self.send_response(200)
               self.send_header('Content-Type', 'application/json')
               self.send_header('Content-Length', str(len(body)))
               self.send_header('Cache-Control', 'no-store')
               self.end_headers()
               self.wfile.write(body)
               return
           super().do_GET()

       def log_message(self, format, *args):
           pass


   if __name__ == '__main__':
       server = http.server.ThreadingHTTPServer(('0.0.0.0', 80), Handler)
       server.serve_forever()
   EOF
   ```

   </p>
   </details>

1. Run it as a systemd service (root is required to bind port 80 without `setcap`/`authbind`):

   ```sh
   cat << EOF | sudo tee /etc/systemd/system/fiber-lite-dashboard.service > /dev/null
   [Unit]
   Description=FIBER Lite Dashboard
   After=network.target

   [Service]
   Type=simple
   WorkingDirectory=$HOME/fiber-lite-dashboard
   ExecStart=/usr/bin/python3 $HOME/fiber-lite-dashboard/serve.py
   Restart=on-failure
   RestartSec=2

   [Install]
   WantedBy=multi-user.target
   EOF

   sudo systemctl daemon-reload
   sudo systemctl enable --now fiber-lite-dashboard.service
   ```

1. Now, you can access the dashboard at this address: `http://[TARGET IP ADDRESS]/`

   The page includes a light/dark theme toggle (persisted per browser), a service search filter,
   and the same four service tiles plus SSH/GitHub links described above.

## Firewall

1. Install `ufw`:

   ```sh
   sudo apt install -y ufw
   ```

1. **Allow SSH before enabling the firewall** — reversing this order can lock you out:

   ```sh
   sudo ufw allow 22/tcp
   sudo ufw allow from 10.0.0.0/24 to any port 80
   sudo ufw allow from 10.0.0.0/24 to any port 1880
   sudo ufw allow from 10.0.0.0/24 to any port 8080
   sudo ufw allow from 10.0.0.0/24 to any port 8086
   sudo ufw allow from 10.0.0.0/24 to any port 3000
   ```

   :::tip

   Adjust `10.0.0.0/24` to match your actual LAN subnet.

   :::

1. Enable the firewall:

   ```sh
   sudo ufw enable
   ```

1. Immediately verify SSH and all web UIs are still reachable from another machine on the LAN
   before disconnecting.

## Ports & Default Credentials

| Service | Port | URL | Default Login |
|---|---|---|---|
| Dashboard | 80 | `http://[TARGET IP ADDRESS]/` | — (no authentication) |
| ChirpStack | 8080 | `http://[TARGET IP ADDRESS]:8080/` | `admin` / `admin` |
| Node-RED | 1880 | `http://[TARGET IP ADDRESS]:1880/` | set during installation (`adminAuth`) |
| InfluxDB | 8086 | `http://[TARGET IP ADDRESS]:8086/` | set during installation (`influx setup`) |
| Grafana | 3000 | `http://[TARGET IP ADDRESS]:3000/` | set during installation (changed from `admin`/`admin`) |
| SSH | 22 | `ssh <user>@[TARGET IP ADDRESS]` | set in Raspberry Pi Imager |
| Mosquitto (MQTT) | 1883 | internal only (`localhost`) | — |

:::danger

**ChirpStack's default login (`admin` / `admin`) is not changed by any step above** — unlike
Node-RED and Grafana, which get a password set during installation, ChirpStack ships with the
stock default and nothing in this guide rotates it. Change it before exposing the device on any
shared network: log in to the web UI and update the password under the user's account settings.

:::

Running into problems? See **Troubleshooting** in the sidebar for common issues and their fixes.
