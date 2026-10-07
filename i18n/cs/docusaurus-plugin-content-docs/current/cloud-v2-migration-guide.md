---
slug: cloud-v2-migration-guide
title: Průvodce migrací na Cloud v2
description: "Celý postup migrace z Cloud v1 na Cloud v2 krok za krokem."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Průvodce migrací na Cloud v2 {#cloud-v2-migration-guide}

Tento článek vás provede celou migrací z Cloud v1 na Cloud v2.

## 1. Aktualizace modemu LTE {#1-update-the-lte-modem}

Návod níže vás provede přípravou softwarových nástrojů a hardwaru pro práci se zařízením CHESTER: instalací a ověřením HARDWARIO Command Line Tools ve virtuálním prostředí Pythonu a připojením programátoru SEGGER J-Link. Hlavně ale popisuje, jak vymazat aplikační firmware, nahrát firmware modemu LTE a aplikační firmware znovu nainstalovat. Bez toho migraci na HARDWARIO Cloud v2 nezahájíte.

👉 **Podrobný návod: [https://docs.hardwario.com/chester/firmware-flashing/lte-modem-over-j-link](/chester/firmware-flashing/lte-modem-over-j-link)**

## 2. Nahrání aplikace {#2-flash-the-application}

Návod níže ukazuje, jak nahrát aplikační firmware do zařízení CHESTER programátorem SEGGER J-Link. Popisuje potřebný hardware a software včetně instalace Pythonu, vytvoření virtuálního prostředí a instalace HARDWARIO Command Line Tools. Hlavně ale ukazuje, jak připojit J-Link a nahrát aplikační firmware buď ze souboru HEX, nebo přímo podle 128bitového unikátního ID.

👉 **Podrobný návod: [https://docs.hardwario.com/chester/firmware-flashing/application-over-j-link](/chester/firmware-flashing/application-over-j-link)**

## 3. Vložení SIM karty {#3-insert-the-sim-card}

![CHESTER – držák SIM karty](../../../../chester/images/chester-sim-holder.png)

## 4. Přidání zařízení do Cloud v2 {#4-add-the-device-to-cloud-v2}

#### 1. Přejděte na [HARDWARIO Cloud v2](https://hardwario.cloud/) {#1-go-to-hardwario-cloud-v2}
- Otevřete v prohlížeči rozhraní [HARDWARIO Cloud](https://hardwario.cloud/).

#### 2. Vytvořte nový prostor {#2-create-a-new-space}
- Nejprve vytvořte nový prostor (**Space**).
Klikněte na tlačítko + NEW SPACE v pravém horním rohu.

![Cloud – vytvoření nového prostoru](../../../../chester/images/cloud-0.png)

#### 3. Vytvořte nové zařízení {#3-create-a-new-device}
- Jakmile prostor vytvoříte, můžete do něj přidat nové zařízení.
Klikněte na tlačítko + NEW DEVICE v pravém horním rohu.

![Cloud – vytvoření nového zařízení](../../../../chester/images/cloud-2.png)

#### 4. Zadejte údaje o zařízení {#4-enter-device-details}

- Name
- Serial Number
- Claim Token
  
 (Volitelně můžete přidat také komentář a [tagy](/cloud/tags))

 :::info
**[Tagy](/cloud/tags)** seskupují zařízení podle firmwaru nebo funkce a dají se použít k filtrování.  
Propojují také zařízení s **[konektory](/cloud/connectors)**, takže se zprávy směrují správně.  
Každý tag má **název** a **barvu**.  
:::


 ![Cloud – zadání údajů o zařízení](../../../../chester/images/cloud-3.png)

#### 5. Zařízení přidáno {#5-device-added}
Zařízení je teď **úspěšně přidané** do Cloud v2.

:::info
Možnosti vizualizace příchozích dat najdete zde:  
👉 [Dokumentace HARDWARIO Apps](/apps/)  
:::
