---
slug: installation-clean-os
title: Clean Installation
---
import Image from '@theme/IdealImage';

This tutorial demonstrates how to install all the needed tools for working with HARDWARIO TOWER devices onto your **Raspberry Pi with a Raspberry Pi OS installed**.

:::tip

If you don't want to bother with the installation, you can download our [**Pre-Installed Image**](./installation-os.md) and start using it right away.

:::

## Set up

If you didn't already, you should follow the [**Getting Started Tutorial**](https://www.raspberrypi.com/documentation/computers/getting-started.html#installing-the-operating-system) for how to install the Raspberry Pi OS onto an SD Card.

After the installation is done, you can just [**log into your device with SSH**](./login-guide.md).

:::tip

You can also use our [**Install script**](https://github.com/hardwario/hio-raspbian/blob/master/install.sh) which will do all the needed steps to prepare the Raspberry for use with TOWER.

To run the script, just run the following commands after connecting to the Raspberry.

```
wget https://raw.githubusercontent.com/hardwario/hio-raspbian/master/install.sh
chmod +x install.sh
./install.sh
```
:::

- Update and Upgrade all the packages

  If you didn't already do it in the [**log into your device with SSH**](./login-guide.md), you should run the following command to have the system **up to date**.

  ```bash
  sudo apt update && sudo apt upgrade
  ```

- Install all dependencies

  ```bash
  sudo apt install -y curl zip wget apt-transport-https openssl
  ```

- Install Mosquitto server and clients

  ```bash
  sudo apt install mosquitto mosquitto-clients
  ```

- Install Node.js (required by Node-RED)

  ```bash
  curl -sL  https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

- Install Node-RED

  ```bash
  sudo npm install -g --unsafe-perm node-red
  ```

- Install PM2
-
  ```bash
  sudo npm install -g pm2
  ```

- Run Node-RED with PM2

  ```bash
  pm2 start `which node-red` -- --verbose
  pm2 save
  ```

- Run PM2 on boot

  ```bash
  sudo -H PM2_HOME=/home/$(whoami)/.pm2 pm2 startup systemd -u $(whoami)
  sudo -H chmod 644 /etc/systemd/system/pm2-$(whoami).service
  ```

- Install Python 3 and pip (required by the [**HARDWARIO CLI Tools**](../command-line-tools/index.md))

  ```bash
  sudo apt install python3 python3-pip python3-setuptools
  sudo pip3 install --upgrade pip
  ```

- Install [**HARDWARIO CLI Tools**](../command-line-tools/index.md)

  ```bash
  sudo pip3 install --upgrade bcf bcg bch
  ```

- Add udev rules

  ```bash
  echo 'SUBSYSTEMS=="usb", ACTION=="add", KERNEL=="ttyUSB*", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6015", ATTRS{serial}=="bc-usb-dongle*", SYMLINK+="bcUD%n", TAG+="systemd", ENV{SYSTEMD_ALIAS}="/dev/bcUD%n"'  | sudo tee --append /etc/udev/rules.d/58-bigclown-usb-dongle.rules
  ```

  :::caution

  If you have the [**Radio Dongle**](../hardware-modules/about-radio-dongle.md) plugged you should unplug it and put it back for the **udev rule** to work.

  :::

- Run service for Gateway Radio Dongle

  ```bash
  pm2 start /usr/bin/python3 --name "bcg-ud" -- /usr/local/bin/bcg --device /dev/bcUD0
  pm2 save
  ```

- Optionally, you can install the webserver to have the HARDWARIO Hub available
  :::info

  HARDWARIO Hub is similar to [**HARDWARIO Playground**](../desktop-programming/about-playground.md) but in the browser.

  :::

  :::caution

  This will override any previous webserver that you might have installed.

  :::

  ```bash
  sudo apt install -y nginx curl zip wget apt-transport-https openssl
  WEB_ZIP_URL=$(curl -L -s https://api.github.com/repos/hardwario/bch-hub-web/releases/latest | grep browser_download_url | grep zip | head -n 1 | cut -d '"' -f 4)
  wget "$WEB_ZIP_URL" -O /tmp/web.zip
  sudo unzip /tmp/web.zip -d /var/www/html
  rm /tmp/web.zip
  sudo apt install -y git mc htop tmux
  ```
