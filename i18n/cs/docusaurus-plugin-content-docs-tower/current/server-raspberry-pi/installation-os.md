---
slug: installation-os
title: Předinstalovaný obraz
description: "Tento návod ukazuje, jak na Raspberry Pi s nainstalovaným systémem Raspberry Pi OS nainstalovat všechny nástroje potřebné pro práci se zařízeními HARDWARIO TOWER."
---
import Image from '@theme/IdealImage';

Tento návod ukazuje, jak na **Raspberry Pi s nainstalovaným systémem Raspberry Pi OS** nainstalovat všechny nástroje potřebné pro práci se zařízeními HARDWARIO TOWER.

:::tip

Pokud už máte Raspberry Pi v provozu se systémem **Raspberry Pi OS** a chcete jen doplnit všechny potřebné nástroje, můžete se řídit [**kapitolou Čistá instalace**](./installation-clean-os.md).

:::

## Požadavky {#requirements}
- [**HARDWARIO Raspbian**](https://github.com/hardwario/bc-raspbian/releases/latest)
- [**Raspberry Pi Imager**](https://www.raspberrypi.com/software/)
- Raspberry Pi 3B+ nebo lepší
- MicroSD karta s minimální kapacitou 4 GB
- Čtečka microSD karet (+ volitelně adaptér na SD karty)
- Ethernetový kabel nebo Wi-Fi
- Router (nebo LAN switch) s nastaveným DHCP serverem
- Počítač s jedním z následujících operačních systémů:
  - Windows 7, 8, 10 (32bitový nebo 64bitový)
  - macOS (testováno na verzi 10.12.x)
  - Ubuntu (testováno na verzi 18.04.2 LTS)

## Nastavení {#set-up}

- Vložte microSD kartu do čtečky připojené k počítači
- Otevřete **Raspberry Pi Imager**
- Zvolte **CHOOSE OS** --> **Scroll Down** --> **Use Custom** --> **vyberte stažený obraz HARDWARIO Raspbian**
  - Mělo by to vypadat přibližně takto
    <div class="container">
    <div class="row">
      <div class="col col--7">
        <div><Image img={require('../../../../../tower/server-raspberry-pi/images/raspberry-pi-imager-set-up.png')} alt="Raspberry Pi Imager s vybraným obrazem HARDWARIO Raspbian a SDHC kartou, připravený k zápisu" /></div>
      </div>
      <div class="col col--3">
      </div>
    </div>
    </div>
- Otevřete **nastavení** kliknutím na **kolečko v levém dolním rohu**
  - Zapněte Set hostname: `hub`
  - Zapněte **SSH**
    - Použijte autentizaci heslem
  - Nastavte **heslo**
    - Můžete si nastavit jakékoli heslo, doporučujeme však silné. Jen si ho nezapomeňte. Uživatelské jméno prosím ponechte **pi**, protože na tomto jménu obraz závisí.
  - Volitelně můžete nastavit i bezdrátovou síť (Wi-Fi), pokud však máte připojení LAN, není to nutné
  <div class="container">
    <div class="row">
      <div class="col col--7">
        <div><Image img={require('../../../../../tower/server-raspberry-pi/images/raspberry-pi-imager-advanced.png')} alt="Rozšířené možnosti v Imageru: hostname hub, SSH s autentizací heslem, uživatelské jméno a bezdrátová síť LAN" /></div>
      </div>
      <div class="col col--3">
      </div>
    </div>
    </div>
  - Klikněte na tlačítko **Save**
- Klikněte na tlačítko **Write** a vyčkejte na **dokončení zápisu**

:::note

Po dokončení zápisu vložte microSD kartu do svého Raspberry Pi. Pokud jste nenastavili **Wi-Fi**, připojte ethernetový kabel. Připojte [**Radio Dongle**](../hardware-modules/about-radio-dongle.md) a zapněte napájení Raspberry Pi.

Poté můžete začít server používat.

:::

## Připojení k serveru {#connect-to-server}

Nyní, když máte server v provozu, můžete otevřít **webový prohlížeč na svém počítači** a připojit se k němu.

:::caution

Bez dalšího nastavení musíte být na **stejné síti jako Raspberry Pi**.

:::

Pro připojení k **Raspberry Pi** máte dvě možnosti, které lze zadat do adresního řádku:
- IP adresa Raspberry Pi (jak ji zjistit, najdete v [**průvodci přihlášením**](./login-guide.md#find-out-raspberry-pi-ip) )
- Hostname, který jste nastavili v předchozím kroku (v tomto návodu je to [**hub.local**](http://hub.local))


  <div class="container">
    <div class="row">
      <div class="col col--10">
        <div><Image img={require('../../../../../tower/server-raspberry-pi/images/hardwario-hub.png')} alt="Webové rozhraní HARDWARIO Hub na hub.local se záložkou Devices a tlačítkem Start pairing" /></div>
      </div>
      <div class="col col--3">
      </div>
    </div>
    </div>


## Řešení problémů {#troubleshooting}

Pokud je tlačítko **Start pairing** neaktivní a nelze jej stisknout, ujistěte se, že jste **nejprve připojili Radio Dongle a teprve poté zapnuli napájení Raspberry Pi.**

Pokud máte s připojením Radio Dongle stále potíže, může to být způsobeno tím, že jste provedli `apt update` a `apt upgrade`. V mosquitto je problém, kdy **anonymní připojení nejsou povolena**.
Tento problém vyřešíte spuštěním následujícího příkazu:

```bash
echo 'allow_anonymous true' | sudo tee /etc/mosquitto/conf.d/auth.conf
```
