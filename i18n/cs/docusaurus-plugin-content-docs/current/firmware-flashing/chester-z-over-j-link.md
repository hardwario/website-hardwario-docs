---
slug: chester-z-over-j-link
title: CHESTER-Z1 přes J-Link
description: "Tento článek popisuje, jak nahrát firmware do modulu CHESTER-Z1 pomocí SEGGER J-Link."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER-Z1 přes J-Link {#chester-z1-over-j-link}

Tento článek popisuje, jak nahrát firmware do modulu **CHESTER-Z1** pomocí **SEGGER J-Link**.

## Požadavky {#requirements}

Budete potřebovat následující hardwarové a softwarové nástroje:

* Jeden z těchto operačních systémů:

  * **Ubuntu 20.04** a **Ubuntu 22.04**
  * **macOS 11** a **macOS 12**
  * **Windows 10** a **Windows 11**

* Cílové zařízení **CHESTER-Z1** (namontované v horním krytu)

* USB debugger/programátor **SEGGER J-Link** (včetně 10pinového **SWD** adaptéru + plochého kabelu)

  :::tip

  **HARDWARIO** nabízí **SEGGER J-Link** + veškeré potřebné příslušenství na vyžádání.

  :::

* Kabel **Micro-USB** s vhodným typem konektoru pro váš počítač

  :::danger

  Některé kabely **Micro-USB** vedou pouze napájení a žádné datové signály. Pokud spojení mezi **SEGGER J-Link** a vaším systémem nefunguje, zkontrolujte v první řadě typ kabelu.

  :::

## Instalace {#installation}

**SEGGER J-Link Software and Documentation Pack** nainstalujete těmito kroky:

<Tabs groupId="operating-system">

<TabItem value="ubuntu" label="Ubuntu" default>

1. Stáhněte 64bitový balíček **DEB** z [**tohoto odkazu**](https://www.segger.com/downloads/jlink/JLink_Linux_x86_64.deb).

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

   Nezapomeňte zástupný text `<VERSION>` nahradit skutečnou verzí uvedenou v názvu souboru.

   :::

</TabItem>

<TabItem value="macos" label="macOS">

1. Stáhněte univerzální instalátor **PKG** z [**tohoto odkazu**](https://www.segger.com/downloads/jlink/JLink_MacOSX_universal.pkg).

1. Spusťte stažený instalátor a dokončete instalaci.

</TabItem>

<TabItem value="windows" label="Windows">

1. Stáhněte 64bitový instalátor pro Intel z [**tohoto odkazu**](https://www.segger.com/downloads/jlink/JLink_Windows_x86_64.exe).

1. Spusťte stažený instalátor a dokončete instalaci.

</TabItem>

</Tabs>

## Nahrání firmwaru {#flashing}

Firmware modulu **CHESTER-Z1** nahrajete následujícími kroky:

1. Otevřete krabičku **CHESTER** (6 šroubů ze spodní strany).

   :::tip

   Desku **CHESTER-Z1** není nutné z horního krytu demontovat. Konektor **SWD** pro **SEGGER J-Link** je dostupný ze spodní strany desky.

   :::

1. V horním krytu na desce **CHESTER-Z1** najděte 9pinový konektor **SWD**.

1. Propojte **SEGGER J-Link** a 9pinový konektor **SWD** plochým kabelem.

   :::caution

   Jeden z vodičů na plochém kabelu mezi J-Link a CHESTER má červenou barvu. Tato červená barva označuje **signál číslo 1**. Tento červeně označený signál musí být orientovaný k bílé tečce umístěné vedle konektoru SWD na desce CHESTER-Z1. Stejné pravidlo pro kabel platí na straně **SEGGER J-Link**.

   :::

1. Připojte kabel **Micro-USB** k počítači a k **SEGGER J-Link**.

1. Stáhněte balíček firmwaru **CHESTER-Z1** [**v1.4.0**](pathname:///download/hio-chester-z-v1.4.0.zip).

1. Rozbalte stažený balíček.

1. Otevřete aplikaci **Terminál** a přejděte do adresáře s rozbaleným balíčkem.

1. Spusťte proceduru nahrání firmwaru:

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
