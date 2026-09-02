---
slug: installation-clean-os
title: Čistá instalace
description: "Tento návod ukazuje, jak nainstalovat všechny potřebné nástroje pro práci se zařízeními HARDWARIO TOWER na váš Raspberry Pi s nainstalovaným Raspberry Pi OS."
---
import Image from '@theme/IdealImage';

Tento návod ukazuje, jak nainstalovat všechny potřebné nástroje pro práci se zařízeními HARDWARIO TOWER na váš **Raspberry Pi s nainstalovaným Raspberry Pi OS**.

:::tip

Pokud se nechcete zdržovat instalací, můžete si stáhnout náš [**předinstalovaný image**](./installation-os.md) a začít ho hned používat.

:::

## Příprava {#set-up}

Pokud jste to ještě neudělali, projděte si [**úvodní návod**](https://www.raspberrypi.com/documentation/computers/getting-started.html#installing-the-operating-system), jak nainstalovat Raspberry Pi OS na SD kartu.

Po dokončení instalace se stačí [**přihlásit k zařízení přes SSH**](./login-guide.md).

:::tip

Můžete také použít náš [**instalační skript**](https://github.com/hardwario/hio-raspbian/blob/master/install.sh), který provede všechny potřebné kroky k přípravě Raspberry pro použití s TOWER.

Pro spuštění skriptu stačí po připojení k Raspberry spustit následující příkazy.

```
wget https://raw.githubusercontent.com/hardwario/hio-raspbian/master/install.sh
chmod +x install.sh
./install.sh
```
:::

- Aktualizujte a povyšte všechny balíčky

  Pokud jste to neudělali už při [**přihlášení k zařízení přes SSH**](./login-guide.md), spusťte následující příkaz, aby byl systém **aktuální**.

  ```bash
  sudo apt update && sudo apt upgrade
  ```

- Nainstalujte všechny závislosti

  ```bash
  sudo apt install -y curl zip wget apt-transport-https openssl
  ```

- Nainstalujte server a klienty Mosquitto

  ```bash
  sudo apt install mosquitto mosquitto-clients
  ```

- Nainstalujte Node.js (vyžadováno Node-RED)

  ```bash
  curl -sL  https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

- Nainstalujte Node-RED

  ```bash
  sudo npm install -g --unsafe-perm node-red
  ```

- Nainstalujte PM2
-
  ```bash
  sudo npm install -g pm2
  ```

- Spusťte Node-RED pomocí PM2

  ```bash
  pm2 start `which node-red` -- --verbose
  pm2 save
  ```

- Spouštění PM2 při startu systému

  ```bash
  sudo -H PM2_HOME=/home/$(whoami)/.pm2 pm2 startup systemd -u $(whoami)
  sudo -H chmod 644 /etc/systemd/system/pm2-$(whoami).service
  ```

- Nainstalujte Python 3 a pip (vyžadováno nástroji [**HARDWARIO CLI Tools**](../command-line-tools/index.md))

  ```bash
  sudo apt install python3 python3-pip python3-setuptools
  sudo pip3 install --upgrade pip
  ```

- Nainstalujte [**HARDWARIO CLI Tools**](../command-line-tools/index.md)

  ```bash
  sudo pip3 install --upgrade bcf bcg bch
  ```

- Přidejte udev pravidla

  ```bash
  echo 'SUBSYSTEMS=="usb", ACTION=="add", KERNEL=="ttyUSB*", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6015", ATTRS{serial}=="bc-usb-dongle*", SYMLINK+="bcUD%n", TAG+="systemd", ENV{SYSTEMD_ALIAS}="/dev/bcUD%n"'  | sudo tee --append /etc/udev/rules.d/58-bigclown-usb-dongle.rules
  ```

  :::caution

  Pokud máte zapojený [**Radio Dongle**](../hardware-modules/about-radio-dongle.md), odpojte ho a znovu zapojte, aby se **udev pravidlo** projevilo.

  :::

- Spusťte službu pro Gateway Radio Dongle

  ```bash
  pm2 start /usr/bin/python3 --name "bcg-ud" -- /usr/local/bin/bcg --device /dev/bcUD0
  pm2 save
  ```

- Volitelně můžete nainstalovat webový server, abyste měli k dispozici HARDWARIO Hub
  :::info

  HARDWARIO Hub je podobný jako [**HARDWARIO Playground**](../desktop-programming/about-playground.md), ale běží v prohlížeči.

  :::

  :::caution

  Tímto se přepíše jakýkoli dříve nainstalovaný webový server.

  :::

  ```bash
  sudo apt install -y nginx curl zip wget apt-transport-https openssl
  WEB_ZIP_URL=$(curl -L -s https://api.github.com/repos/hardwario/bch-hub-web/releases/latest | grep browser_download_url | grep zip | head -n 1 | cut -d '"' -f 4)
  wget "$WEB_ZIP_URL" -O /tmp/web.zip
  sudo unzip /tmp/web.zip -d /var/www/html
  rm /tmp/web.zip
  sudo apt install -y git mc htop tmux
  ```
