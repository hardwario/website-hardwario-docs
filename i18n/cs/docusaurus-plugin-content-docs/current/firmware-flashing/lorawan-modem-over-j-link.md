---
slug: lorawan-modem-over-j-link
title: Modem LoRaWAN přes J-Link
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Modem LoRaWAN přes J-Link {#lorawan-modem-over-j-link}

Tento článek popisuje, jak nahrát firmware modemu LoRaWAN v zařízení CHESTER programátorem SEGGER J-Link.

## Požadavky {#requirements}

Budete potřebovat tento hardware a software:

* Jeden z těchto operačních systémů:

  * **Ubuntu 20.04** a **Ubuntu 22.04**
  * **macOS 11** a **macOS 12**
  * **Windows 10** a **Windows 11**

* Zařízení HARDWARIO CHESTER (bude potřeba otevřít horní kryt krabičky, který drží šest šroubů)

* USB debugger/programátor **SEGGER J-Link** (včetně 10pinového adaptéru **SWD** a plochého kabelu)

  :::tip

  **HARDWARIO** na požádání dodá **SEGGER J-Link** i veškeré potřebné příslušenství.

  :::

* Kabel **Micro-USB** s odpovídajícím typem konektoru k vašemu počítači

  :::danger

  Některé kabely **Micro-USB** vedou jen napájení, a ne data. Pokud spojení mezi programátorem **SEGGER J-Link** a počítačem nefunguje, zkontrolujte nejdřív kabel.

  :::

## Instalace {#installation}

**SEGGER J-Link Software and Documentation Pack** nainstalujete těmito kroky:

<Tabs groupId="operating-system">

<TabItem value="ubuntu" label="Ubuntu" default>

1. Stáhněte 64bitový balíček **DEB** z [tohoto odkazu](https://www.segger.com/downloads/jlink/JLink_Linux_x86_64.deb).

1. Otevřete aplikaci **Terminál**.

1. Přejděte do složky se staženým balíčkem, například:

   ```
   cd Downloads
   ```

1. Nainstalujte balíček tímto příkazem:

   ```
   sudo dpkg -i JLink_Linux_<VERSION>_x86_64.deb
   ```

   :::caution

   Nezapomeňte zástupný text `<VERSION>` nahradit skutečnou verzí v názvu souboru.

   :::

</TabItem>

<TabItem value="macos" label="macOS">

1. Stáhněte univerzální instalátor **PKG** z [tohoto odkazu](https://www.segger.com/downloads/jlink/JLink_MacOSX_universal.pkg).

1. Spusťte stažený instalátor a dokončete instalaci.

</TabItem>

<TabItem value="windows" label="Windows">

1. Stáhněte 64bitový instalátor pro Intel z [tohoto odkazu](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe).

1. Spusťte stažený instalátor a dokončete instalaci.

</TabItem>

</Tabs>

## Postup nahrání firmwaru {#flashing-procedure}

Firmware modemu LoRaWAN nahrajete do zařízení CHESTER takto:

1. Otevřete krabičku **CHESTER** (6 šroubků ze spodní strany).

1. Připojte 10pinový plochý kabel ke konektoru označenému `LRW`.

   :::caution

   Jeden z vodičů plochého kabelu mezi programátorem J-Link a zařízením CHESTER je červený a označuje **signál číslo 1**. Tento vodič musí směřovat k černé tečce vedle konektoru SWD na základní desce zařízení CHESTER. Stejné pravidlo platí i na straně programátoru **SEGGER J-Link**.

   :::

1. Druhý konec plochého kabelu připojte k desce adaptéru SEGGER J-Link (a adaptér zapojte do programátoru SEGGER J-Link).

1. Kabelem **Micro-USB** propojte počítač s programátorem **SEGGER J-Link**.

1. Stáhněte balíček firmwaru **LoRaWAN Modem** [**v1.4.1**](pathname:///download/hio-chester-lrw-v1.4.1.zip).

1. Rozbalte stažený balíček.

1. Otevřete aplikaci **Terminál** a přejděte do adresáře s rozbaleným balíčkem.

1. Spusťte nahrávání firmwaru:

   <Tabs groupId="operating-system">

   <TabItem value="ubuntu" label="Ubuntu" default>

   ```
   ./flash.sh
   ```

   </TabItem>

   <TabItem value="macos" label="macOS">

   ```
   ./flash.sh
   ```

   </TabItem>

   <TabItem value="windows" label="Windows">

   ```
   flash.bat
   ```

   </TabItem>

   </Tabs>

1. Měla by se zobrazit zpráva o úspěšném dokončení.

1. Odpojte **SEGGER J-Link** od konektoru **SWD**.

1. Odpojte a znovu připojte napájení zařízení CHESTER.

   :::danger

   Pokud tento krok vynecháte, může se modem LoRaWAN chovat nepředvídatelně.

   :::
