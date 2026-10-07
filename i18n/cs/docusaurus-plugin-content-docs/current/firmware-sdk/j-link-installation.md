---
slug: j-link-installation
title: Instalace J-Link
---
import Image from '@theme/IdealImage';

# Instalace J-Link {#j-link-installation}

Tento článek vás provede instalací softwaru SEGGER J-Link.

## Postup instalace {#installation-steps}

1. Stáhněte **nRF Command Line Tools** z tohoto odkazu:

   https://www.nordicsemi.com/Products/Development-tools/nrf-command-line-tools/download

   :::tip

   V rozbalovacím seznamu na levé straně vyberte odpovídající platformu.

   :::

1. Nainstalujte stažené nástroje

   Instalační balíček obsahuje nástroje příkazové řádky od Nordic Semiconductor a navíc i **SEGGER J-Link Software and Documentation Pack**. Oba balíčky doporučujeme instalovat společně instalátorem od Nordic Semiconductor, předejdete tak možným problémům s kompatibilitou a konfliktům verzí.

## Připojení hardwaru {#hardware-connection}

1. Připojte adaptér **SEGGER Cortex-M adapter** k programátoru **SEGGER J-Link**.

2. Připojte 10pinový plochý kabel **SWD** k adaptéru **SEGGER Cortex-M adapter** a druhý konec k zařízení CHESTER.

   :::info

   Na základní desce **CHESTER** jsou tři konektory **SWD**. Obvykle budete pracovat s portem BLE, který je připojený k aplikačnímu mikrokontroléru.

   :::

3. Kabelem Micro-USB propojte programátor SEGGER J-Link s počítačem.
