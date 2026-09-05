---
slug: /installation
title: Instalace
description: "Základní instalace klientské aplikace TAPPER."
---

import Image from '@theme/IdealImage';

# Instalace klienta TAPPER {#tapper-client-installation}

Základní instalace klientské aplikace TAPPER.

## Příprava {#prepare}

:::info[TL;DR]

- Nahrajte systém na RPi
- Aktualizujte RPi a nainstalujte klienta
  ```bash
  # For easy copy
  sudo apt update && sudo apt upgrade
  sudo reboot
  # reconnect
  sudo apt install git pipx python3-dev cmake libdbus-1-dev libglib2.0-dev
  pipx ensurepath
  sudo raspi-config # enable serial port and SPI
  pipx install 'git+ssh://git@github.com/hardwario/tapper.git@main#egg=tapper' # stable
  ```
- Pokračujte v části [**Testování**](#testing)

:::

### Nahrání systému na Raspberry Pi {#flash-the-raspberry-pi}

1. Otevřete zařízení TAPPER.

   :::tip

   Ze spodní strany zařízení jsou dvě plastové západky. Použijte plochý šroubovák.

   :::

1. Vložte MicroSD kartu do počítače (preferovaná velikost je 16 GB).

   :::info

   MicroSD karta je se zařízením TAPPER dodávána.

   :::

1. Stáhněte a nainstalujte nástroj [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager).

1. Klikněte na **CHOOSE DEVICE** a vyberte **Raspberry Pi Zero 2 W**.

1. Klikněte na **CHOOSE OS**, vyberte **Raspberry Pi OS (other)** a poté vyberte **Raspberry Pi OS Lite (64-bit)**.

1. Klikněte na **CHOOSE STORAGE** a vyberte cílovou MicroSD kartu.

1. Klikněte na **NEXT**: nástroj se zeptá na přizpůsobení nastavení – klikněte na **EDIT SETTINGS**.

1. Zaškrtněte **Set hostname**.

1. Do pole **hostname** zadejte název hostitele pro vaše zařízení TAPPER.

1. Zaškrtněte **Set username and password**.

1. Do polí **username** a **password** zadejte uživatelské jméno a heslo.

:::tip

Jako uživatelské jméno můžete použít `tapper` a jako heslo `hardwario`.

:::danger

Toto je doporučeno pouze při SSH autentizaci veřejným klíčem, jinak použijte silné heslo.

Nastavení SSH autentizace veřejným klíčem (doporučeno): [**SSH s autentizací veřejným klíčem**](security#ssh-with-public-key-authentication-only)

Můžete použít [**generátor hesel Bitwarden**](https://bitwarden.com/password-generator/#password-generator).
       1. V typu vyberte Passphrase.
       1. Můžete kliknout na generovat několikrát pro lépe zapamatovatelné heslo, doporučujeme nejvýše 6 slov.
              - Hesla si zapište a poté vyberte to nejlépe zapamatovatelné.

:::    

1. Zaškrtněte **Configure Wireless LAN**.

1. Do polí **SSID** a **Password** zadejte SSID a heslo vaší bezdrátové sítě.

1. V rozbalovací nabídce **Wireless LAN Country** nastavte zemi, kde bude zařízení TAPPER používáno.

1. Zaškrtněte **Set locale settings**.

1. V rozbalovací nabídce **Time zone** vyberte své časové pásmo.

1. V rozbalovací nabídce **Keyboard layout** vyberte preferované rozložení klávesnice.

:::caution[Zabezpečení SSH]

Doporučuje se nastavit **SSH pouze s autentizací veřejným klíčem**. Pro jednoduchost můžete použít přihlášení heslem.

Nástroj **Raspberry Pi Imager** to umožňuje nastavit v rámci [OS Customization](https://www.raspberrypi.com/documentation/computers/getting-started.html#advanced-options).

:::

### Aktualizace Raspberry Pi {#update-raspberry-pi}

1. Připojte se ke svému Raspberry Pi přes SSH:

       `ssh tapper@[IP ADDRESS OF TAPPER]`

1. Aktualizujte systémové balíčky:

       `sudo apt update && sudo apt upgrade -y`

1. Restartujte systém:

       `sudo reboot`

### Instalace a nastavení potřebných balíčků {#install-and-set-up-required-packages}

1. Budeme potřebovat následující balíčky:
  
      `sudo apt install cmake git libdbus-1-dev libglib2.0-dev pipx python3-dev`

1. Balíček **pipx** je potřeba přidat do proměnné prostředí **PATH**:

       `pipx ensurepath`
  
   :::info

   Tím se přidá záznam do vašeho `~/.bashrc`

   :::

1. Načtěte nové prostředí shellu:

       `source ~/.bashrc`

### Zapnutí SPI a sériového portu {#enable-spi-and-serial-port}

1. Zapněte rozhraní sériového portu a SPI:

       `sudo raspi-config`

1. Obě rozhraní najdete pod volbou **Interface**.

### Instalace klienta TAPPER {#install-tapper-client}

Nainstalujte Python balíček klienta TAPPER:

    `pipx install 'git+https://github.com/hardwario/tapper.git@main#egg=tapper'`

:::danger

Pokud chcete místo toho vyzkoušet nejnovější vývojovou instalaci, můžete použít:

    `pipx install 'git+https://github.com/hardwario/tapper.git@dev#egg=tapper'`

:::

:::note

Příkaz `pipx` experimentálně podporuje přípony. Pokud chcete nejnovější vývojovou verzi s podporou přípon, připojte k příkazu `--suffix <suffix>`.

Příklad: `--suffix dev` by vedl k příkazu `tapperdev`

:::

### Testování {#testing}

Spusťte TAPPER v režimu ladění:

    `tapper run -d -h &lt;your_mqtt_broker_host&gt;`

Parametry:

- `-d` zapne DEBUG logování do CLI
- `-h` určuje MQTT hostitele
