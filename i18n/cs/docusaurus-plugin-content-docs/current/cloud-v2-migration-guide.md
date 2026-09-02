---
slug: cloud-v2-migration-guide
title: Průvodce migrací na Cloud v2
description: "Tento článek vás provede celým procesem migrace z Cloud v1 na Cloud v2."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Průvodce migrací na Cloud v2 {#cloud-v2-migration-guide}

Tento článek vás provede celým procesem migrace z Cloud v1 na Cloud v2.

## 1. Aktualizace LTE modemu {#1-update-the-lte-modem}

V této části nastavíte potřebné softwarové nástroje a hardware pro práci se zařízením CHESTER. Popisuje, jak nainstalovat a ověřit HARDWARIO Command Line Tools ve virtuálním prostředí Pythonu a jak připojit programátor SEGGER J-Link. Především vás provede vymazáním aplikačního firmwaru, nahráním firmwaru LTE modemu a následnou opětovnou instalací aplikačního firmwaru, což je nutné pro začátek migrace na HARDWARIO Cloud v2.

👉 **Podrobný návod: [https://docs.hardwario.com/chester/firmware-flashing/lte-modem-over-j-link](/chester/firmware-flashing/lte-modem-over-j-link)**

## 2. Nahrání aplikace {#2-flash-the-application}

V této části se naučíte, jak nahrát aplikační firmware do zařízení CHESTER pomocí programátoru SEGGER J-Link. Popisuje potřebné nastavení hardwaru i softwaru, včetně instalace Pythonu, vytvoření virtuálního prostředí a instalace HARDWARIO Command Line Tools. Především ukazuje, jak připojit J-Link a poté nahrát aplikační firmware buď z HEX souboru, nebo přímo pomocí 128bitového unikátního ID.

👉 **Podrobný návod: [https://docs.hardwario.com/chester/firmware-flashing/application-over-j-link](/chester/firmware-flashing/application-over-j-link)**

## 3. Vložení SIM karty {#3-insert-the-sim-card}

![CHESTER – držák SIM karty](../../../../chester/images/chester-sim-holder.png)

## 4. Přidání zařízení do Cloud v2 {#4-add-the-device-to-cloud-v2}

#### 1. Přejděte na [HARDWARIO Cloud v2](https://hardwario.cloud/) {#1-go-to-hardwario-cloud-v2}
- Otevřete v prohlížeči rozhraní [HARDWARIO Cloud](https://hardwario.cloud/).

#### 2. Vytvořte nový Space {#2-create-a-new-space}
- Nejprve je potřeba vytvořit nový Space.
Klikněte na tlačítko v pravém horním rohu s označením + NEW SPACE.

![Cloud – vytvoření nového Space](../../../../chester/images/cloud-0.png)

#### 3. Vytvořte nové zařízení {#3-create-a-new-device}
- Jakmile je Space vytvořen, můžete přidat nové zařízení.
Klikněte na tlačítko v pravém horním rohu s označením + NEW DEVICE.

![Cloud – vytvoření nového zařízení](../../../../chester/images/cloud-2.png)

#### 4. Zadejte údaje o zařízení {#4-enter-device-details}

- Name
- Serial Number
- Claim Token
  
 (Volitelně můžete přidat také komentář a [tagy](https://docs.hardwario.com/cloud/tags))

 :::info
**[Tagy](https://docs.hardwario.com/cloud/tags)** seskupují zařízení podle firmwaru nebo funkcionality a lze je použít k filtrování.  
Také propojují zařízení s **[Connectory](https://docs.hardwario.com/cloud/connectors)**, čímž zajišťují správné směrování zpráv.  
Každý tag má **název** a **barvu**.  
:::


 ![Cloud – zadání údajů o zařízení](../../../../chester/images/cloud-3.png)

#### 5. Zařízení přidáno {#5-device-added}
Vaše zařízení je nyní **úspěšně přidáno** do Cloud v2.

:::info
Pro vizualizaci přicházejících dat můžete pokračovat možnostmi vizualizace popsanými zde:  
👉 [Dokumentace HARDWARIO Apps](https://docs.hardwario.com/apps/)  
:::
