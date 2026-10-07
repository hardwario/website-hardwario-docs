---
slug: login-guide
title: Průvodce přihlášením
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tento návod popisuje, jak se k Raspberry Pi přihlásit ze **vzdáleného terminálu přes protokol SSH**.

:::caution

Návod předpokládá, že používáte čistý systém [**Raspberry Pi OS**](./installation-clean-os.md) nebo [**HARDWARIO Raspbian**](./installation-os.md).

:::

## Zjištění IP adresy Raspberry Pi {#find-out-raspberry-pi-ip}

Pokud se chcete k Raspberry Pi připojit přes IP adresu, musíte zjistit, jakou adresu mu přidělil DHCP server.

:::caution

Všechny níže uvedené postupy předpokládají, že jste ve stejné síti jako Raspberry Pi.

:::

Adresu, kterou DHCP server zařízením přidělil, zjistíte několika způsoby:
- Přihlaste se do routeru a otevřete sekci DHCP Clients, LAN Status nebo podobnou; její název se u různých routerů liší
- Použijte nástroj pro počítač, například [**Advanced IP Scanner (Windows)**](https://www.advanced-ip-scanner.com/cz/), [**IP Scanner (macOS)**](https://apps.apple.com/us/app/ip-scanner/id404167149?mt=12) nebo některý [**nástroj pro Linux**](https://www.techrepublic.com/article/how-to-scan-for-ip-addresses-on-your-network-with-linux/)
- Použijte mobilní aplikaci, například [**Fing**](https://www.fing.com)

:::tip

Hledáte zařízení s konkrétním **hostname**, například **raspberry.local**.

:::

## Připojení pomocí PuTTY {#connect-with-putty}

Můžete použít aplikaci **PuTTY**, která se ke vzdálenému terminálu připojí přes SSH i jinak.

- Stáhněte si [**aplikaci PuTTY**](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
- Spusťte PuTTY; měli byste vidět **tuto obrazovku**
<div class="container">
  <div class="row">
    <div class="col col--6">
      <div><Image img={require('../../../../../tower/server-raspberry-pi/images/putty-login.png')} alt="Konfigurace PuTTY s Host Name hub.local, portem 22, vybraným SSH a zvýrazněným tlačítkem Open" /></div>
    </div>
    <div class="col col--4">
    </div>
  </div>
</div>

- Zadejte svůj **hostname** nebo **IP adresu** (zde je to ``hub.local``)
- Vyberte **SSH**, pokud ještě není vybrané
- Klikněte na **Open**
- Přihlaste se:
  - uživatelské jméno: ``pi``
  - heslo: ``raspberry``

:::info

Teď byste měli být přihlášeni ke svému Raspberry Pi. Doporučujeme [**změnit heslo**](#change-the-password) (pokud jste ho nezměnili už při zápisu na kartu microSD) a [**aktualizovat systém**](#update-the-system). Potom se v [**sekci Nástroje příkazové řádky**](../command-line-tools/index.md) seznamte s nástroji, které jsou na Raspberry Pi nainstalované.

:::

## Připojení pomocí terminálu {#connect-with-terminal}

V každém operačním systému se můžete připojit z vestavěného terminálu příkazem ``ssh``.

Otevřete terminál a spusťte následující příkaz:

<Tabs>
<TabItem value="hostname" label="Hostname" default>

Hostname závisí na tom, kterou instalaci jste zvolili:

[**HARDWARIO Raspbian**](./installation-os.md)

```bash
ssh pi@hub.local
```

[**Raspberry Pi OS**](./installation-clean-os.md)

```bash
ssh pi@raspberry.local
```

</TabItem>
<TabItem value="ipAddress" label="IP adresa">

```bash
ssh pi@IP_ADDRESS
```

</TabItem>
</Tabs>

- Přihlaste se:
  - heslo: ``raspberry`` nebo **jakékoli jiné, které jste si zvolili**

:::info

Teď byste měli být přihlášeni ke svému Raspberry Pi. Doporučujeme [**změnit heslo**](#change-the-password) (pokud jste ho nezměnili už při zápisu na kartu microSD) a [**aktualizovat systém**](#update-the-system). Potom se v [**sekci Nástroje příkazové řádky**](../command-line-tools/index.md) seznamte s nástroji, které jsou na Raspberry Pi nainstalované.

:::

## Změna hesla {#change-the-password}

Vždy byste měli **změnit výchozí heslo**. Stačí v terminálu spustit příkaz ``passwd``.

## Aktualizace systému {#update-the-system}

Kvůli bezpečnosti a stabilitě je důležité udržovat systém aktuální.
Systém se skládá z balíčků, které aktualizujete tímto příkazem:

```bash
sudo apt update && sudo apt upgrade
```
