---
title: Flash Raspberry Pi OS
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Flash Raspberry Pi OS

FIBER ships in **two hardware variants**, and the flashing procedure differs between them —
**pick the tab below that matches your device** before you start:

:::info FIBER (CM4)

The industrial version, based on the Raspberry Pi Compute Module 4. Uses `rpiboot` and a BOOT
jumper to enter flashing mode.

:::

:::info FIBER Lite (Pi 5)

The Raspberry Pi 5 based bench-test variant. Flash a microSD card directly — no bootloader
activation step.

:::

<Tabs groupId="fiber-variant">
<TabItem value="fiber" label="FIBER (CM4)" default>

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

1. Install the **rpiboot** tool - follow the instructions from this GitHub repository:

   **https://github.com/raspberrypi/usbboot**

1. Connect an Ethernet cable between the PoE port of the PoE adapter and the Ethernet (RJ-45) connector of the **TARGET**.

1. Start the `rpiboot` tool.

   :::tip

   This should switch the **TARGET** to the bootloader mode. On the **HOST**, a new USB disk will appear.

   :::

1. Download, install, and launch the [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager) tool.

1. In the **Device** step, select **Raspberry Pi 4** (this includes Compute Module 4).

   <Image img={require('../images/rpi-imager-select-device.png')} alt="Raspberry Pi Imager Device step with Raspberry Pi 4 selected in the device list" />

1. In the **OS** step, select **Raspberry Pi OS (other)**.

   <Image img={require('../images/rpi-imager-choose-os.png')} alt="Raspberry Pi Imager OS step with the Raspberry Pi OS (other) category selected" />

1. Select **Raspberry Pi OS Lite (64-bit)**.

   <Image img={require('../images/rpi-imager-choose-os-lite.png')} alt="Raspberry Pi Imager OS list with Raspberry Pi OS Lite (64-bit) selected" />

1. In the **Storage** step, select the **FIBER** device (shown as **RPi-MSD-0001 Media**).

   <Image img={require('../images/rpi-imager-select-storage.png')} alt="Raspberry Pi Imager Storage step with the RPi-MSD-0001 Media USB device selected" />

1. In the **Customisation** step, enter a hostname for your **FIBER** device (e.g. `fiber`).

   <Image img={require('../images/rpi-imager-hostname.png')} alt="Raspberry Pi Imager Customisation step with the hostname field set to fiber" />

1. In the **Localisation** section, select your location, time zone, and keyboard layout.

   <Image img={require('../images/rpi-imager-localisation.png')} alt="Raspberry Pi Imager Localisation section with capital city, time zone, and keyboard layout selectors" />

1. In the **User** section, enter a username and password.

   <Image img={require('../images/rpi-imager-user.png')} alt="Raspberry Pi Imager User section with the username fiber and password fields filled in" />

   :::tip

   You can use `fiber` for username and `hardwario` for password.

   :::

   :::danger

   This is only recommended with public-key SSH authentication, otherwise use a strong passphrase.

   :::

1. Optional: In the **Wi-Fi** section, enter your wireless network's SSID and password.

   <Image img={require('../images/rpi-imager-wifi.png')} alt="Raspberry Pi Imager Wi-Fi section with SSID, password, and confirm password fields for a secure network" />

1. In the **Remote access** section, enable **SSH** and select your preferred authentication method.

   <Image img={require('../images/rpi-imager-ssh.png')} alt="Raspberry Pi Imager SSH authentication section with Enable SSH on and password authentication selected" />

1. Optional: In the **Raspberry Pi Connect** section, you can enable remote access via Raspberry Pi Connect. For this guide, we leave it disabled.

   <Image img={require('../images/rpi-imager-connect.png')} alt="Raspberry Pi Imager Raspberry Pi Connect section with the enable toggle left off" />

1. Review the summary and click **WRITE** to start the flashing process.

   <Image img={require('../images/rpi-imager-summary.png')} alt="Raspberry Pi Imager Write image summary listing device, OS, storage, and customisations before writing" />

1. Confirm the warning dialog by clicking **I UNDERSTAND, ERASE AND WRITE**.

   <Image img={require('../images/rpi-imager-confirm.png')} alt="Raspberry Pi Imager warning dialog with the I UNDERSTAND, ERASE AND WRITE confirmation button" />

1. Wait for the writing process to complete.

   <Image img={require('../images/rpi-imager-writing.png')} alt="Raspberry Pi Imager writing the OS image to the storage device with a progress bar" />

1. When finished, press the **RESET** button on the **TARGET** (located next to the USB connector).

1. Wait for the **TARGET** to boot and connect to the network.

   :::tip

   You may find the IP address of your **TARGET** from your DHCP server's leases.

   :::

</TabItem>
<TabItem value="fiber-lite" label="FIBER Lite (Pi 5)">

FIBER Lite uses a plain Raspberry Pi 5 — there is no bootloader-activation step, no BOOT jumper,
and no `rpiboot` tool. You flash a microSD card directly, as with any standard Raspberry Pi.

:::tip

The screenshots below are reused from the Raspberry Pi Imager flow on the CM4-based FIBER
(above), since the tool and most steps are identical regardless of device. A few steps look
slightly different in practice: the **Device** picker shows **Raspberry Pi 5** highlighted
instead of Raspberry Pi 4, the **Storage** step lists your microSD card reader by its own name
instead of `RPi-MSD-0001 Media` (that name is specific to the CM4's `rpiboot` USB boot mode, not
used here), and the example hostname/username shown is `fiber`/`fiber` rather than
`fiber-lite`/`fiberlite` — use the FIBER Lite values given in the steps below regardless of what
the screenshot shows.

:::

1. Download, install, and launch the [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager) tool.

1. In the **Device** step, select **Raspberry Pi 5**.

1. In the **OS** step, select **Raspberry Pi OS (other)**.

   <Image img={require('../fiber-lite/images/rpi-imager-choose-os.png')} />

1. Select **Raspberry Pi OS Lite (64-bit)**.

   <Image img={require('../fiber-lite/images/rpi-imager-choose-os-lite.png')} />

1. In the **Storage** step, select the microSD card for the FIBER Lite device.

1. In the **Customisation** step (gear icon, or Ctrl+Shift+X), enter a hostname for your FIBER
   Lite device (e.g. `fiber-lite`).

   <Image img={require('../fiber-lite/images/rpi-imager-hostname.png')} />

1. In the **Localisation** section, select your location, time zone, and keyboard layout.

   <Image img={require('../fiber-lite/images/rpi-imager-localisation.png')} />

1. In the **User** section, enter a username and password.

   <Image img={require('../fiber-lite/images/rpi-imager-user.png')} />

   :::tip

   You can use `fiberlite` for username and `hardwario` for password.

   :::

   :::danger

   This is only recommended with public-key SSH authentication, otherwise use a strong
   passphrase.

   :::

1. Optional: in the **Wi-Fi** section, enter your wireless network's SSID and password as a LAN
   fallback.

   <Image img={require('../fiber-lite/images/rpi-imager-wifi.png')} />

1. In the **Remote access** section, enable **SSH** and select your preferred authentication
   method.

   <Image img={require('../fiber-lite/images/rpi-imager-ssh.png')} />

1. Optional: in the **Raspberry Pi Connect** section, you can enable remote access via Raspberry
   Pi Connect. For this guide, we leave it disabled.

   <Image img={require('../fiber-lite/images/rpi-imager-connect.png')} />

1. Review the summary and click **WRITE** to start flashing, then confirm the warning dialog.

1. Wait for the writing process to complete.

   <Image img={require('../fiber-lite/images/rpi-imager-writing.png')} />

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

</TabItem>
</Tabs>
