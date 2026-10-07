---
slug: /installation
title: Instalace
description: "Jak nainstalovat klientskou aplikaci TAPPER na Raspberry Pi Zero 2 W."
title_meta: "Instalace (TAPPER)"
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

   Na spodní straně zařízení jsou dvě plastové západky. Uvolníte je plochým šroubovákem.

   :::

1. Vložte MicroSD kartu do počítače (doporučená velikost je 16 GB).

   :::info

   MicroSD kartu dostanete spolu se zařízením TAPPER.

   :::

1. Stáhněte a nainstalujte nástroj [**Raspberry Pi Imager**](https://github.com/raspberrypi/rpi-imager).

1. Klikněte na **CHOOSE DEVICE** a vyberte **Raspberry Pi Zero 2 W**.

1. Klikněte na **CHOOSE OS**, vyberte **Raspberry Pi OS (other)** a poté vyberte **Raspberry Pi OS Lite (64-bit)**.

1. Klikněte na **CHOOSE STORAGE** a vyberte cílovou MicroSD kartu.

1. Klikněte na **NEXT**. Nástroj se zeptá, jestli chcete upravit nastavení; klikněte na **EDIT SETTINGS**.

1. Zaškrtněte **Set hostname**.

1. Do pole **hostname** zadejte název hostitele zařízení TAPPER.

1. Zaškrtněte **Set username and password**.

1. Do polí **username** a **password** zadejte uživatelské jméno a heslo.

:::tip

Jako uživatelské jméno můžete použít `tapper` a jako heslo `hardwario`.

:::danger

Takové heslo použijte jen tehdy, když se přes SSH přihlašujete veřejným klíčem. Jinak zvolte silnou heslovou frázi.

Nastavení SSH autentizace veřejným klíčem (doporučeno): [**SSH s autentizací veřejným klíčem**](/tapper/security/#ssh-with-public-key-authentication-only)

Můžete použít [**generátor heslových frází Bitwarden**](https://bitwarden.com/password-generator/#password-generator).
       1. Jako typ vyberte Passphrase.
       1. Kliknutím na generate můžete nechat vygenerovat několik frází a vybrat si snáze zapamatovatelnou; doporučujeme nejvýše 6 pokusů.
              - Fráze si zapište a vyberte tu, kterou si nejlépe zapamatujete.

:::    

1. Zaškrtněte **Configure Wireless LAN**.

1. Do polí **SSID** a **Password** zadejte SSID a heslo bezdrátové sítě.

1. V rozbalovacím seznamu **Wireless LAN Country** vyberte zemi, ve které budete zařízení TAPPER používat.

1. Zaškrtněte **Set locale settings**.

1. V rozbalovacím seznamu **Time zone** vyberte své časové pásmo.

1. V rozbalovacím seznamu **Keyboard layout** vyberte rozložení klávesnice.

:::caution[Zabezpečení SSH]

Doporučujeme nastavit **SSH pouze s autentizací veřejným klíčem**. Pro jednoduchost ale můžete použít i přihlášení heslem.

V nástroji **Raspberry Pi Imager** to nastavíte v části [OS Customization](https://www.raspberrypi.com/documentation/computers/getting-started.html#advanced-options).

:::

### Aktualizace Raspberry Pi {#update-raspberry-pi}

1. Připojte se k Raspberry Pi přes SSH:

       `ssh tapper@[IP ADDRESS OF TAPPER]`

1. Aktualizujte systémové balíčky:

       `sudo apt update && sudo apt upgrade -y`

1. Restartujte systém:

       `sudo reboot`

### Instalace a nastavení potřebných balíčků {#install-and-set-up-required-packages}

1. Nainstalujte potřebné balíčky:
  
      `sudo apt install cmake git libdbus-1-dev libglib2.0-dev pipx python3-dev`

1. Balíček **pipx** je potřeba přidat do proměnné prostředí **PATH**:

       `pipx ensurepath`
  
   :::info

   Příkaz přidá záznam do souboru `~/.bashrc`.

   :::

1. Načtěte nové prostředí shellu:

       `source ~/.bashrc`

### Zapnutí SPI a sériového portu {#enable-spi-and-serial-port}

1. Zapněte sériový port a rozhraní SPI:

       `sudo raspi-config`

1. Obě rozhraní najdete pod volbou **Interface**.

### Instalace klienta TAPPER {#install-tapper-client}

Nainstalujte klienta TAPPER jako balíček Pythonu:

    `pipx install 'git+https://github.com/hardwario/tapper.git@main#egg=tapper'`

:::danger

Pokud chcete místo toho vyzkoušet nejnovější vývojovou verzi, použijte:

    `pipx install 'git+https://github.com/hardwario/tapper.git@dev#egg=tapper'`

:::

:::note

Příkaz `pipx` experimentálně podporuje přípony. Chcete-li nejnovější vývojovou verzi nainstalovat s příponou, připojte k příkazu `--suffix <suffix>`.

Například s `--suffix dev` se příkaz bude jmenovat `tapperdev`.

:::

### Testování {#testing}

Spusťte TAPPER v režimu ladění:

    `tapper run -d -h &lt;your_mqtt_broker_host&gt;`

Parametry:

- `-d` zapne výpis logů úrovně DEBUG do příkazové řádky
- `-h` určuje hostitele brokeru MQTT
