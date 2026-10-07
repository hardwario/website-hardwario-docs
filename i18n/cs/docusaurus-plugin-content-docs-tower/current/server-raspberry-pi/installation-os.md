---
slug: installation-os
title: Předinstalovaný obraz
---
import Image from '@theme/IdealImage';

Tento návod ukazuje, jak na kartu microSD pro **Raspberry Pi** nahrát náš připravený obraz systému, který už obsahuje všechny nástroje potřebné pro práci se zařízeními HARDWARIO TOWER.

:::tip

Pokud vám Raspberry Pi už běží se systémem **Raspberry Pi OS** a chcete jen doinstalovat potřebné nástroje, postupujte podle [**kapitoly Čistá instalace**](./installation-clean-os.md).

:::

## Požadavky {#requirements}
- [**HARDWARIO Raspbian**](https://github.com/hardwario/bc-raspbian/releases/latest)
- [**Raspberry Pi Imager**](https://www.raspberrypi.com/software/)
- Raspberry Pi 3B+ nebo lepší
- Karta microSD s kapacitou alespoň 4 GB
- Čtečka karet microSD (případně i adaptér na kartu SD)
- Ethernetový kabel nebo Wi-Fi
- Router (nebo LAN switch) s nastaveným DHCP serverem
- Počítač s jedním z následujících operačních systémů:
  - Windows 7, 8, 10 (32bitový nebo 64bitový)
  - macOS (testováno na verzi 10.12.x)
  - Ubuntu (testováno na verzi 18.04.2 LTS)

## Nastavení {#set-up}

- Vložte kartu microSD do čtečky připojené k počítači
- Spusťte **Raspberry Pi Imager**
- Zvolte **CHOOSE OS** --> **Scroll Down** --> **Use Custom** --> **vyberte stažený obraz HARDWARIO Raspbian**
  - Mělo by to vypadat přibližně takto:
    <div class="container">
    <div class="row">
      <div class="col col--7">
        <div><Image img={require('../../../../../tower/server-raspberry-pi/images/raspberry-pi-imager-set-up.png')} alt="Raspberry Pi Imager s vybraným obrazem HARDWARIO Raspbian a SDHC kartou, připravený k zápisu" /></div>
      </div>
      <div class="col col--3">
      </div>
    </div>
    </div>
- Kliknutím na **ozubené kolečko v levém dolním rohu** otevřete **nastavení**
  - Zapněte volbu Set hostname: `hub`
  - Zapněte **SSH**
    - Zvolte autentizaci heslem
  - Nastavte **heslo**
    - Heslo si můžete zvolit libovolné, doporučujeme ale silné. Hlavně ho nezapomeňte. Uživatelské jméno ponechte **pi**, obraz s ním počítá.
  - Volitelně můžete nastavit i bezdrátovou síť (Wi-Fi); pokud máte připojení LAN, není to nutné
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
- Klikněte na tlačítko **Write** a počkejte, až se **zápis dokončí**

:::note

Po dokončení zápisu vložte kartu microSD do Raspberry Pi. Pokud jste nenastavili **Wi-Fi**, připojte ethernetový kabel. Připojte [**Radio Dongle**](../hardware-modules/about-radio-dongle.md) a zapněte napájení Raspberry Pi.

Pak už můžete server začít používat.

:::

## Připojení k serveru {#connect-to-server}

Server teď běží, takže můžete otevřít **webový prohlížeč na svém počítači** a připojit se k němu.

:::caution

Bez dalšího nastavení musíte být ve **stejné síti jako Raspberry Pi**.

:::

K **Raspberry Pi** se připojíte dvěma způsoby. Do adresního řádku zadejte:
- IP adresu Raspberry Pi (jak ji zjistit, popisuje [**průvodce přihlášením**](./login-guide.md#find-out-raspberry-pi-ip))
- hostname, který jste nastavili v předchozím kroku (v tomto návodu je to [**hub.local**](http://hub.local))


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

Pokud je tlačítko **Start pairing** neaktivní a nelze ho stisknout, ujistěte se, že jste **nejdřív připojili Radio Dongle a teprve potom zapnuli napájení Raspberry Pi.**

Pokud se k zařízení Radio Dongle stále nedaří připojit, může to být tím, že jste spustili `apt update` a `apt upgrade`. Mosquitto pak **nepovoluje anonymní připojení**.
Problém vyřešíte tímto příkazem:

```bash
echo 'allow_anonymous true' | sudo tee /etc/mosquitto/conf.d/auth.conf
```
