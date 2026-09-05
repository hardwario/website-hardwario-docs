---
slug: lte-modem-over-j-link
title: LTE modem přes J-Link
description: "Tento článek popisuje, jak nahrát firmware LTE modemu v zařízení CHESTER pomocí SEGGER J-Link."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LTE modem přes J-Link {#lte-modem-over-j-link}

Tento článek popisuje, jak nahrát firmware LTE modemu v zařízení **CHESTER** pomocí **SEGGER J-Link**.

## Požadavky {#requirements}

Budete potřebovat následující hardwarové a softwarové nástroje:

* Jeden z těchto operačních systémů:

  * **Ubuntu** verze 24.04
  * **macOS** verze 15 (s nainstalovaným Homebrew)
  * **Windows** verze 11

* Distribuci **Python 3** nainstalovanou ve vašem systému:

  <Tabs groupId="operating-system">

  <TabItem value="ubuntu" label="Ubuntu" default>

  Spusťte tento příkaz v aplikaci **Terminal**:

  ```
  sudo apt install python3
  ```

  </TabItem>

  <TabItem value="macos" label="macOS">

  Spusťte tento příkaz v aplikaci **Terminal**:

  ```
  brew install python3
  ```

  </TabItem>

  <TabItem value="windows" label="Windows">

  Stáhněte si nejnovější stabilní instalátor z [tohoto odkazu](https://www.python.org/downloads/windows/).

  :::caution

  Zajistěte, aby instalátor pro Windows mohl upravit proměnnou `PATH`, aby byl spustitelný soubor **Python** dostupný odkudkoli.

  :::

  </TabItem>

  </Tabs>

* Zařízení **CHESTER** (budete muset otevřít horní kryt krabičky se šesti šrouby)

* USB debugger/programátor **SEGGER J-Link** (včetně 10pinového adaptéru **SWD** + plochého kabelu)

  :::tip

  **HARDWARIO** dodává J-Link + veškeré potřebné příslušenství na vyžádání.

  :::

* Kabel Micro-USB s odpovídajícím typem konektoru pro váš počítač

  :::danger

  Některé kabely Micro-USB poskytují pouze napájení a žádné datové signály. Pokud spojení mezi J-Link a vaším systémem nefunguje, zkontrolujte v první řadě typ kabelu.

  :::

* Balík aplikací v Pythonu **HARDWARIO Command Line Tools**

## Instalace {#installation}

**HARDWARIO Command Line Tools** nainstalujete těmito kroky:

1. Pouze na Windows: nainstalujte ovladače **SEGGER J-Link**:

   * Stáhněte [64bitový instalátor Intel/AMD](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe)
   * Stáhněte [32bitový instalátor Intel/AMD](https://www.segger.com/downloads/jlink/JLink_Windows.exe)
   * Stáhněte [64bitový instalátor ARM](https://www.segger.com/downloads/jlink/JLink_Windows_arm64.exe)

1. Otevřete aplikaci **Terminal** (Ubuntu nebo macOS) nebo **Command Prompt** (Windows).

1. Inicializujte virtuální prostředí **Python**:

   ```
   python3 -m venv hardwario-venv
   ```

1. Aktivujte virtuální prostředí **Python**:

   <Tabs groupId="operating-system">

   <TabItem value="ubuntu" label="Ubuntu" default>

   ```
   source hardwario-venv/bin/activate
   ```

   </TabItem>

   <TabItem value="macos" label="macOS">

   ```
   source hardwario-venv/bin/activate
   ```

   </TabItem>

   <TabItem value="windows" label="Windows">

   ```
   hardwario-venv\Scripts\activate.bat
   ```

   </TabItem>

   </Tabs>

   :::caution

   Když zavřete **Terminal** nebo **Command Prompt**, musíte virtuální prostředí **Python** znovu aktivovat. Jednoduše zopakujte příslušný příkaz pro danou platformu výše.

   :::

1. Nainstalujte **HARDWARIO Command Line Tools**:

   ```
   pip install hardwario
   ```

1. Instalaci můžete ověřit následujícím příkazem:

   ```
   hardwario --version
   ```

   Měl by vypsat výstup podobný tomuto:

   ```
   hardwario.chester v1.19.0
   hardwario.cloud v1.4.1
   hardwario.common v1.7.1
   hardwario.hardwario v1.2.0
   ```

## Postup nahrání firmwaru {#flashing-procedure}

Pro nahrání firmwaru LTE modemu do zařízení **CHESTER** postupujte takto:

1. Otevřete krabičku zařízení **CHESTER** (6 šroubů ze spodní strany).

1. Připojte 10pinový plochý kabel ke [konektoru označenému `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší).

   :::caution

   Jeden z vodičů plochého kabelu mezi **SEGGER J-Link** a **CHESTER** má červenou barvu. Tato červená barva označuje signál číslo `1`. Tento červený signál musí být orientován směrem k černé tečce umístěné vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo pro kabel platí i na straně **SEGGER J-Link**.

   :::

1. Připojte druhou stranu 10pinového plochého kabelu k adaptérové desce **SEGGER J-Link** (a zapojte adaptérovou desku do zařízení **SEGGER J-Link**).

1. Připojte kabel **Micro-USB** k počítači a k **SEGGER J-Link**.

1. Otevřete aplikaci **Terminal** (Ubuntu nebo macOS) nebo **Command Prompt** (Windows).

1. Aktivujte virtuální prostředí **Python**, kde máte nainstalované **HARDWARIO Command Line Tools** (viz předchozí kapitola).

1. Spuštěním tohoto příkazu vymažte aplikační firmware:

   ```
   hardwario chester app erase
   ```

   :::tip

   Vymazání aplikačního firmwaru je nutné, aby se zabránilo kolizi resetovacího signálu mezi **SEGGER J-Link** a aplikačním firmwarem.

   :::

1. Připojte 10pinový plochý kabel ke [konektoru označenému `LTE`](../developer-tools/segger-j-link.md#segger-j-link-to-lte-port-connection).

   :::caution

   Jeden z vodičů plochého kabelu mezi **SEGGER J-Link** a **CHESTER** má červenou barvu. Tato červená barva označuje signál číslo `1`. Tento červený signál musí být orientován směrem k černé tečce umístěné vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo pro kabel platí i na straně **SEGGER J-Link**.

   :::

1. Stáhněte balíček firmwaru **LTE modemu** [**v1.7.0**](pathname:///download/hio-chester-lte-v1.7.0.zip).

   :::info

   Pokud hledáte firmware LTE modemu kompatibilní s komunikačním stackem **LTE v1** pro službu **HARDWARIO Cloud v1**, musíte stáhnout a nahrát [**v1.3.0**](pathname:///download/hio-chester-lte-v1.3.0.zip).

   :::

1. Spuštěním tohoto příkazu nahrajte firmware LTE modemu:

   ```
   hardwario chester lte flash hio-chester-lte-v1.7.0.zip
   ```

1. Připojte 10pinový plochý kabel ke [konektoru označenému `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší).

   :::caution

   Jeden z vodičů plochého kabelu mezi **SEGGER J-Link** a **CHESTER** má červenou barvu. Tato červená barva označuje signál číslo `1`. Tento červený signál musí být orientován směrem k černé tečce umístěné vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo pro kabel platí i na straně **SEGGER J-Link**.

   :::

1. Nahrajte aplikační firmware.

1. Odpojte adaptér **SEGGER J-Link**.

## Firmware modemu Nordic nRF9160 {#nordic-nrf9160-modem-firmware}

Výše uvedený postup nahrává **firmware LTE modemu HARDWARIO** – komunikační stack, který připojuje **CHESTER** ke službě **HARDWARIO Cloud**. To je jiný image než **firmware modemu Nordic** (baseband image distribuovaný jako `mfw_nrf9160_*.zip`), což je nízkoúrovňový mobilní firmware samotného SiP **nRF9160**. Oba image se nahrávají nezávisle a různými příkazy.

Většina nasazení firmware modemu Nordic nikdy měnit nemusí. Tento postup potřebujete pouze tehdy, když konkrétní síť nebo SIM karta vyžaduje určitou verzi firmwaru modemu – například SIM karta **Vodafone Ukraine**, která vyžaduje **v1.3.7**. Viz [**Testované SIM karty a operátoři**](../platform-connectivity/cellular-networks/sim-card-setup.md#tested-sim-cards-and-operators).

:::caution

Konkrétní verzi firmwaru modemu Nordic nahrávejte pouze tehdy, když vám to řekne operátor nebo podpora **HARDWARIO**. Změna tohoto image ovlivní chování mobilní sítě ve všech sítích, nejen v té, kterou právě řešíte.

:::

Hardwarové zapojení, virtuální prostředí **Python** i pravidla pro kabeláž jsou stejné jako v části [**Postup nahrání firmwaru**](#flashing-procedure) výše.

1. Stáhněte balíček firmwaru modemu ze sekce ke stažení pro **nRF9160** u **Nordic Semiconductor**. Přímý odkaz pro verzi **1.3.7**: [`mfw_nrf9160_1.3.7.zip`](https://nsscprodmedia.blob.core.windows.net/prod/software-and-other-downloads/dev-kits/nrf9160-dk/nrf9160-modem-fw/mfw_nrf9160_1.3.7.zip).

1. Otevřete krabičku zařízení **CHESTER** (6 šroubů ze spodní strany) a připojte **SEGGER J-Link** ke [konektoru označenému `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší).

   :::caution

   Jeden z vodičů plochého kabelu mezi **SEGGER J-Link** a **CHESTER** má červenou barvu. Tato červená barva označuje signál číslo `1`. Tento červený signál musí být orientován směrem k černé tečce umístěné vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo pro kabel platí i na straně **SEGGER J-Link**.

   :::

1. Aktivujte virtuální prostředí **Python** s **HARDWARIO Command Line Tools** a spuštěním tohoto příkazu vymažte aplikační firmware:

   ```
   hardwario chester app erase
   ```

   :::tip

   Vymazání aplikačního firmwaru je nutné, aby se zabránilo kolizi resetovacího signálu mezi **SEGGER J-Link** a aplikačním firmwarem.

   :::

1. Přesuňte 10pinový plochý kabel na [konektor označený `LTE`](../developer-tools/segger-j-link.md#segger-j-link-to-lte-port-connection).

   :::caution

   Jeden z vodičů plochého kabelu mezi **SEGGER J-Link** a **CHESTER** má červenou barvu. Tato červená barva označuje signál číslo `1`. Tento červený signál musí být orientován směrem k černé tečce umístěné vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo pro kabel platí i na straně **SEGGER J-Link**.

   :::

1. Spuštěním tohoto příkazu nahrajte firmware modemu Nordic:

   ```
   hardwario device nrf91 flash mfw_nrf9160_1.3.7.zip
   ```

   :::info

   Všimněte si odlišného příkazu. `hardwario device nrf91 flash` zapisuje baseband image od Nordic, zatímco `hardwario chester lte flash` zapisuje firmware LTE modemu **HARDWARIO** popsaný [výše](#flashing-procedure).

   :::

1. Přesuňte 10pinový plochý kabel zpět na [konektor označený `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší), nahrajte aplikační firmware a odpojte adaptér **SEGGER J-Link**.

1. Nakonfigurujte SIM kartu jako obvykle: viz [**Nastavení SIM karty**](../platform-connectivity/cellular-networks/sim-card-setup.md). Nahrání firmwaru modemu Nordic nemění parametry `lte config`.
