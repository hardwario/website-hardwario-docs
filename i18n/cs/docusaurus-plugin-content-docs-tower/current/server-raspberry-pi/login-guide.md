---
slug: login-guide
title: Průvodce přihlášením
description: "Tento dokument popisuje, jak se přihlásit k Raspberry Pi pomocí vzdáleného terminálu přes protokol SSH."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tento dokument popisuje, jak se přihlásit k Raspberry Pi pomocí **vzdáleného terminálu přes protokol SSH**.

:::caution

Tento návod předpokládá, že používáte čistý [**Raspberry Pi OS**](./installation-clean-os.md) nebo [**HARDWARIO Raspbian**](./installation-os.md).

:::

## Zjištění IP adresy Raspberry Pi {#find-out-raspberry-pi-ip}

Pokud se chcete k zařízení Raspberry Pi připojit pomocí IP adresy, musíte zjistit, jakou adresu mu DHCP server přidělil.

:::caution

Každá níže uvedená metoda předpokládá, že jste ve stejné síti jako Raspberry Pi.

:::

Existuje několik způsobů, jak zjistit, jakou adresu DHCP server vašim zařízením přidělil:
- Přihlaste se do routeru a přejděte na DHCP Clients, LAN Status nebo něco podobného, liší se to podle routeru
- Použijte počítačové nástroje jako [**Advanced IP Scanner (Windows)**](https://www.advanced-ip-scanner.com/cz/), [**IP Scanner (macOS)**](https://apps.apple.com/us/app/ip-scanner/id404167149?mt=12) nebo některý [**nástroj pro Linux**](https://www.techrepublic.com/article/how-to-scan-for-ip-addresses-on-your-network-with-linux/)
- Použijte mobilní aplikaci, například [**Fing**](https://www.fing.com)

:::tip

Budete hledat zařízení s konkrétním **hostname**, například **raspberry.local**.

:::

## Připojení pomocí PuTTY {#connect-with-putty}

Můžete použít **PuTTY**, což je aplikace, která umožňuje připojení ke vzdálenému terminálu přes SSH i jinými způsoby.

- Stáhněte si [**aplikaci PuTTY**](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
- Otevřete PuTTY a měli byste vidět **tuto obrazovku**
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
- Vyberte **SSH**, pokud již není vybráno
- Klikněte na **Open**
- Přihlaste se:
  - uživatelské jméno: ``pi``
  - heslo: ``raspberry``

:::info

Nyní byste měli být přihlášeni ke svému Raspberry Pi. Doporučujeme [**změnit heslo**](#change-the-password) (pokud nebylo změněno již při nahrávání systému na microSD kartu) a [**aktualizovat systém**](#update-the-system). Poté můžete navštívit [**sekci nástrojů příkazové řádky**](../command-line-tools/index.md) a seznámit se s nástroji nainstalovanými na Raspberry.

:::

## Připojení pomocí terminálu {#connect-with-terminal}

Na všech systémech můžete otevřít integrovaný terminál a připojit se příkazem ``ssh``

Otevřete terminál a spusťte následující příkaz:

<Tabs>
<TabItem value="hostname" label="Hostname" default>

Hostname se liší podle toho, kterou instalaci jste zvolili

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
  - heslo: ``raspberry`` nebo **jakékoli jiné, které jste zvolili**

:::info

Nyní byste měli být přihlášeni ke svému Raspberry Pi. Doporučujeme [**změnit heslo**](#change-the-password) (pokud nebylo změněno již při nahrávání systému na microSD kartu) a [**aktualizovat systém**](#update-the-system). Poté můžete navštívit [**sekci nástrojů příkazové řádky**](../command-line-tools/index.md) a seznámit se s nástroji nainstalovanými na Raspberry.

:::

## Změna hesla {#change-the-password}

Vždy byste měli **změnit výchozí heslo**. Uděláte to jednoduše spuštěním příkazu ``passwd`` v terminálu.

## Aktualizace systému {#update-the-system}

Z důvodu bezpečnosti a stability je důležité udržovat systém aktuální.
Systém se skládá z balíčků a aktualizovat je můžete následujícím příkazem:

```bash
sudo apt update && sudo apt upgrade
```
