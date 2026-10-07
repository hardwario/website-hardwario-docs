---
slug: lte-modem-over-j-link
title: Modem LTE přes J-Link
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Modem LTE přes J-Link {#lte-modem-over-j-link}

Tento článek popisuje, jak nahrát firmware modemu LTE v zařízení **CHESTER** programátorem **SEGGER J-Link**.

## Požadavky {#requirements}

Budete potřebovat tento hardware a software:

* Jeden z těchto operačních systémů:

  * **Ubuntu** verze 24.04
  * **macOS** verze 15 (s nainstalovaným Homebrew)
  * **Windows** verze 11

* Nainstalovaný **Python 3**:

  <Tabs groupId="operating-system">

  <TabItem value="ubuntu" label="Ubuntu" default>

  Spusťte tento příkaz v aplikaci **Terminál**:

  ```
  sudo apt install python3
  ```

  </TabItem>

  <TabItem value="macos" label="macOS">

  Spusťte tento příkaz v aplikaci **Terminál**:

  ```
  brew install python3
  ```

  </TabItem>

  <TabItem value="windows" label="Windows">

  Stáhněte si nejnovější stabilní instalátor z [tohoto odkazu](https://www.python.org/downloads/windows/).

  :::caution

  Povolte instalátoru úpravu proměnné `PATH`, aby byl **Python** dostupný z libovolného adresáře.

  :::

  </TabItem>

  </Tabs>

* Zařízení **CHESTER** (bude potřeba otevřít horní kryt krabičky, který drží šest šroubů)

* USB debugger/programátor **SEGGER J-Link** (včetně 10pinového adaptéru **SWD** a plochého kabelu)

  :::tip

  **HARDWARIO** na požádání dodá J-Link i veškeré potřebné příslušenství.

  :::

* Kabel Micro-USB s odpovídajícím typem konektoru pro váš počítač

  :::danger

  Některé kabely Micro-USB vedou jen napájení, a ne data. Pokud spojení mezi programátorem J-Link a počítačem nefunguje, zkontrolujte nejdřív kabel.

  :::

* Sada nástrojů **HARDWARIO Command Line Tools** pro Python

## Instalace {#installation}

**HARDWARIO Command Line Tools** nainstalujete těmito kroky:

1. Pouze na Windows: nainstalujte ovladače **SEGGER J-Link**:

   * Stáhněte [64bitový instalátor Intel/AMD](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe)
   * Stáhněte [32bitový instalátor Intel/AMD](https://www.segger.com/downloads/jlink/JLink_Windows.exe)
   * Stáhněte [64bitový instalátor ARM](https://www.segger.com/downloads/jlink/JLink_Windows_arm64.exe)

1. Otevřete aplikaci **Terminál** (Ubuntu nebo macOS) nebo **Příkazový řádek** (Windows).

1. Vytvořte virtuální prostředí pro **Python**:

   ```
   python3 -m venv hardwario-venv
   ```

1. Aktivujte virtuální prostředí pro **Python**:

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

   Když zavřete **Terminál** nebo **Příkazový řádek**, musíte virtuální prostředí pro **Python** znovu aktivovat. Stačí zopakovat příkaz pro svou platformu uvedený výše.

   :::

1. Nainstalujte **HARDWARIO Command Line Tools**:

   ```
   pip install hardwario
   ```

1. Instalaci ověříte tímto příkazem:

   ```
   hardwario --version
   ```

   Výstup by měl vypadat přibližně takto:

   ```
   hardwario.chester v1.19.0
   hardwario.cloud v1.4.1
   hardwario.common v1.7.1
   hardwario.hardwario v1.2.0
   ```

## Postup nahrání firmwaru {#flashing-procedure}

Chcete-li do zařízení **CHESTER** nahrát firmware modemu LTE, postupujte takto:

1. Otevřete krabičku zařízení **CHESTER** (6 šroubů ze spodní strany).

1. Připojte 10pinový plochý kabel ke [konektoru označenému `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší).

   :::caution

   Jeden z vodičů plochého kabelu mezi programátorem **SEGGER J-Link** a zařízením **CHESTER** je červený a označuje signál číslo `1`. Tento vodič musí směřovat k černé tečce vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo platí i na straně programátoru **SEGGER J-Link**.

   :::

1. Druhý konec plochého kabelu připojte k desce adaptéru **SEGGER J-Link** (a adaptér zapojte do programátoru **SEGGER J-Link**).

1. Kabelem **Micro-USB** propojte počítač s programátorem **SEGGER J-Link**.

1. Otevřete aplikaci **Terminál** (Ubuntu nebo macOS) nebo **Příkazový řádek** (Windows).

1. Aktivujte virtuální prostředí pro **Python**, do kterého jste nainstalovali **HARDWARIO Command Line Tools** (viz předchozí kapitola).

1. Tímto příkazem vymažte aplikační firmware:

   ```
   hardwario chester app erase
   ```

   :::tip

   Aplikační firmware je nutné vymazat, jinak by se resetovací signál programátoru **SEGGER J-Link** střetl s aplikačním firmwarem.

   :::

1. Připojte 10pinový plochý kabel ke [konektoru označenému `LTE`](../developer-tools/segger-j-link.md#segger-j-link-to-lte-port-connection).

   :::caution

   Jeden z vodičů plochého kabelu mezi programátorem **SEGGER J-Link** a zařízením **CHESTER** je červený a označuje signál číslo `1`. Tento vodič musí směřovat k černé tečce vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo platí i na straně programátoru **SEGGER J-Link**.

   :::

1. Stáhněte balíček firmwaru **modemu LTE** [**v1.7.0**](pathname:///download/hio-chester-lte-v1.7.0.zip).

   :::info

   Firmware modemu LTE kompatibilní s komunikačním stackem **LTE v1** pro službu **HARDWARIO Cloud v1** je verze [**v1.3.0**](pathname:///download/hio-chester-lte-v1.3.0.zip); stáhněte a nahrajte tu.

   :::

1. Tímto příkazem nahrajte firmware modemu LTE:

   ```
   hardwario chester lte flash hio-chester-lte-v1.7.0.zip
   ```

1. Připojte 10pinový plochý kabel ke [konektoru označenému `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší).

   :::caution

   Jeden z vodičů plochého kabelu mezi programátorem **SEGGER J-Link** a zařízením **CHESTER** je červený a označuje signál číslo `1`. Tento vodič musí směřovat k černé tečce vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo platí i na straně programátoru **SEGGER J-Link**.

   :::

1. Nahrajte aplikační firmware.

1. Odpojte adaptér **SEGGER J-Link**.

## Firmware modemu Nordic nRF9160 {#nordic-nrf9160-modem-firmware}

Postup výše nahrává **firmware modemu LTE od HARDWARIO**, tedy komunikační stack, který připojuje zařízení **CHESTER** ke službě **HARDWARIO Cloud**. **Firmware modemu Nordic** (baseband image distribuovaný jako `mfw_nrf9160_*.zip`) je jiný image: nízkoúrovňový firmware mobilního modemu v samotném SiP **nRF9160**. Oba image se nahrávají nezávisle a různými příkazy.

U většiny nasazení není potřeba firmware modemu Nordic vůbec měnit. Tento postup potřebujete jen tehdy, když konkrétní síť nebo SIM karta vyžaduje určitou verzi firmwaru modemu; například SIM karta **Vodafone Ukraine** vyžaduje **v1.3.7**. Podrobnosti najdete v části [**Otestované SIM karty a operátoři**](../platform-connectivity/cellular-networks/sim-card-setup.md#tested-sim-cards-and-operators).

:::caution

Konkrétní verzi firmwaru modemu Nordic nahrávejte pouze tehdy, když vám to řekne operátor nebo podpora **HARDWARIO**. Změna tohoto image ovlivní chování modemu ve všech mobilních sítích, nejen v té, jejíž problém právě řešíte.

:::

Zapojení hardwaru, virtuální prostředí pro **Python** i pravidla pro kabeláž jsou stejné jako v části [**Postup nahrání firmwaru**](#flashing-procedure) výše.

1. Stáhněte balíček firmwaru modemu ze stránky ke stažení pro **nRF9160** na webu **Nordic Semiconductor**. Přímý odkaz pro verzi **1.3.7**: [`mfw_nrf9160_1.3.7.zip`](https://nsscprodmedia.blob.core.windows.net/prod/software-and-other-downloads/dev-kits/nrf9160-dk/nrf9160-modem-fw/mfw_nrf9160_1.3.7.zip).

1. Otevřete krabičku zařízení **CHESTER** (6 šroubů ze spodní strany) a připojte **SEGGER J-Link** ke [konektoru označenému `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší).

   :::caution

   Jeden z vodičů plochého kabelu mezi programátorem **SEGGER J-Link** a zařízením **CHESTER** je červený a označuje signál číslo `1`. Tento vodič musí směřovat k černé tečce vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo platí i na straně programátoru **SEGGER J-Link**.

   :::

1. Aktivujte virtuální prostředí pro **Python** s nástroji **HARDWARIO Command Line Tools** a tímto příkazem vymažte aplikační firmware:

   ```
   hardwario chester app erase
   ```

   :::tip

   Aplikační firmware je nutné vymazat, jinak by se resetovací signál programátoru **SEGGER J-Link** střetl s aplikačním firmwarem.

   :::

1. Přesuňte 10pinový plochý kabel na [konektor označený `LTE`](../developer-tools/segger-j-link.md#segger-j-link-to-lte-port-connection).

   :::caution

   Jeden z vodičů plochého kabelu mezi programátorem **SEGGER J-Link** a zařízením **CHESTER** je červený a označuje signál číslo `1`. Tento vodič musí směřovat k černé tečce vedle konektoru **SWD** na základní desce zařízení **CHESTER**. Stejné pravidlo platí i na straně programátoru **SEGGER J-Link**.

   :::

1. Tímto příkazem nahrajte firmware modemu Nordic:

   ```
   hardwario device nrf91 flash mfw_nrf9160_1.3.7.zip
   ```

   :::info

   Všimněte si odlišného příkazu. `hardwario device nrf91 flash` zapisuje baseband image od firmy Nordic, zatímco `hardwario chester lte flash` zapisuje firmware modemu LTE od **HARDWARIO** popsaný [výše](#flashing-procedure).

   :::

1. Přesuňte 10pinový plochý kabel zpět na [konektor označený `APP`](../developer-tools/segger-j-link.md#segger-j-link-to-app-port-connection) (nebo `BLE` u hardwarové revize R3.2 a starší), nahrajte aplikační firmware a odpojte adaptér **SEGGER J-Link**.

1. SIM kartu nastavte jako obvykle podle stránky [**Nastavení SIM karty**](../platform-connectivity/cellular-networks/sim-card-setup.md). Nahrání firmwaru modemu Nordic nemění parametry `lte config`.
