---
slug: installation-clean-os
title: Čistá instalace
---
import Image from '@theme/IdealImage';

Tento návod ukazuje, jak na **Raspberry Pi s nainstalovaným systémem Raspberry Pi OS** nainstalovat všechny nástroje potřebné pro práci se zařízeními HARDWARIO TOWER.

:::tip

Pokud se nechcete zdržovat instalací, stáhněte si náš [**předinstalovaný obraz**](./installation-os.md) a hned ho začněte používat.

:::

## Příprava {#set-up}

Pokud jste to ještě neudělali, nainstalujte systém Raspberry Pi OS na kartu SD podle [**úvodního návodu**](https://www.raspberrypi.com/documentation/computers/getting-started.html#installing-the-operating-system).

Po dokončení instalace se stačí [**přihlásit k zařízení přes SSH**](./login-guide.md).

:::tip

Můžete také použít náš [**instalační skript**](https://github.com/hardwario/hio-raspbian/blob/master/install.sh), který Raspberry Pi pro práci s platformou TOWER připraví sám.

Skript spustíte tak, že se k Raspberry Pi připojíte a zadáte tyto příkazy:

```
wget https://raw.githubusercontent.com/hardwario/hio-raspbian/master/install.sh
chmod +x install.sh
./install.sh
```
:::

- Aktualizujte všechny balíčky

  Pokud jste to neudělali už při [**přihlášení k zařízení přes SSH**](./login-guide.md), spusťte tento příkaz, aby byl systém **aktuální**.

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

- Nainstalujte Node.js (potřebuje ho Node-RED)

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

- Nastavte spouštění PM2 při startu systému

  ```bash
  sudo -H PM2_HOME=/home/$(whoami)/.pm2 pm2 startup systemd -u $(whoami)
  sudo -H chmod 644 /etc/systemd/system/pm2-$(whoami).service
  ```

- Nainstalujte Python 3 a pip (potřebují je nástroje [**HARDWARIO CLI Tools**](../command-line-tools/index.md))

  ```bash
  sudo apt install python3 python3-pip python3-setuptools
  sudo pip3 install --upgrade pip
  ```

- Nainstalujte [**HARDWARIO CLI Tools**](../command-line-tools/index.md)

  ```bash
  sudo pip3 install --upgrade bcf bcg bch
  ```

- Přidejte pravidla udev

  ```bash
  echo 'SUBSYSTEMS=="usb", ACTION=="add", KERNEL=="ttyUSB*", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6015", ATTRS{serial}=="bc-usb-dongle*", SYMLINK+="bcUD%n", TAG+="systemd", ENV{SYSTEMD_ALIAS}="/dev/bcUD%n"'  | sudo tee --append /etc/udev/rules.d/58-bigclown-usb-dongle.rules
  ```

  :::caution

  Pokud máte zapojený [**Radio Dongle**](../hardware-modules/about-radio-dongle.md), odpojte ho a znovu zapojte, aby se **pravidlo udev** projevilo.

  :::

- Spusťte službu brány pro Radio Dongle

  ```bash
  pm2 start /usr/bin/python3 --name "bcg-ud" -- /usr/local/bin/bcg --device /dev/bcUD0
  pm2 save
  ```

- Volitelně můžete nainstalovat webový server, abyste měli k dispozici HARDWARIO Hub
  :::info

  HARDWARIO Hub je podobný aplikaci [**HARDWARIO Playground**](../desktop-programming/about-playground.md), ale běží v prohlížeči.

  :::

  :::caution

  Tento krok přepíše webový server, který jste případně nainstalovali dříve.

  :::

  ```bash
  sudo apt install -y nginx curl zip wget apt-transport-https openssl
  WEB_ZIP_URL=$(curl -L -s https://api.github.com/repos/hardwario/bch-hub-web/releases/latest | grep browser_download_url | grep zip | head -n 1 | cut -d '"' -f 4)
  wget "$WEB_ZIP_URL" -O /tmp/web.zip
  sudo unzip /tmp/web.zip -d /var/www/html
  rm /tmp/web.zip
  sudo apt install -y git mc htop tmux
  ```
