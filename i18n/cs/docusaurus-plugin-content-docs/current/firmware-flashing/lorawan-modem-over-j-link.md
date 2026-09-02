---
slug: lorawan-modem-over-j-link
title: LoRaWAN modem přes J-Link
description: "Tento článek popisuje, jak nahrát firmware LoRaWAN modemu v zařízení CHESTER pomocí SEGGER J-Link."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LoRaWAN modem přes J-Link {#lorawan-modem-over-j-link}

Tento článek popisuje, jak nahrát firmware LoRaWAN modemu v zařízení CHESTER pomocí SEGGER J-Link.

## Požadavky {#requirements}

Budete potřebovat následující hardwarové a softwarové nástroje:

* Jeden z těchto operačních systémů:

  * **Ubuntu 20.04** a **Ubuntu 22.04**
  * **macOS 11** a **macOS 12**
  * **Windows 10** a **Windows 11**

* Zařízení HARDWARIO CHESTER (bude nutné otevřít horní kryt krabičky se šesti šroubky)

* USB debugger/programátor **SEGGER J-Link** (včetně 10pinového **SWD** adaptéru + plochého kabelu)

  :::tip

  **HARDWARIO** dodává **SEGGER J-Link** + veškeré potřebné příslušenství na vyžádání.

  :::

* Kabel **Micro-USB** s odpovídajícím typem konektoru k vašemu počítači

  :::danger

  Některé kabely **Micro-USB** poskytují pouze napájení a žádné datové signály. Pokud spojení mezi **SEGGER J-Link** a vaším systémem nefunguje, zkontrolujte v první řadě typ kabelu.

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

Firmware LoRaWAN modemu do zařízení CHESTER nahrajete podle těchto kroků:

1. Otevřete krabičku **CHESTER** (6 šroubků ze spodní strany).

1. Připojte 10pinový plochý kabel ke konektoru označenému `LRW`.

   :::caution

   Jeden z vodičů na plochém kabelu mezi J-Link a CHESTER má červenou barvu. Tato červená barva označuje **signál číslo 1**. Tento červeně označený signál musí být orientován k černé tečce umístěné vedle konektoru SWD na základní desce zařízení CHESTER. Stejné pravidlo pro kabel platí na straně **SEGGER J-Link**.

   :::

1. Připojte druhý konec 10pinového plochého kabelu k adaptérové desce SEGGER J-Link (a zapojte adaptérovou desku do zařízení SEGGER J-Link).

1. Připojte kabel Micro-USB k SEGGER J-Link a k vašemu počítači.

1. Připojte kabel **Micro-USB** k vašemu počítači a k **SEGGER J-Link**.

1. Stáhněte balíček firmwaru **LoRaWAN Modem** [**v1.4.1**](pathname:///download/hio-chester-lrw-v1.4.1.zip).

1. Rozbalte stažený balíček.

1. Otevřete aplikaci **Terminál** a přejděte do adresáře s rozbaleným balíčkem.

1. Spusťte proces nahrání firmwaru:

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

1. Měli byste obdržet zprávu o úspěšném provedení operace.

1. Odpojte **SEGGER J-Link** od konektoru **SWD**.

1. Odpojte a znovu připojte napájení zařízení CHESTER.

   :::danger

   Vynechání kroku s odpojením a připojením napájení může vést k nedefinovanému chování LoRaWAN modemu.

   :::
