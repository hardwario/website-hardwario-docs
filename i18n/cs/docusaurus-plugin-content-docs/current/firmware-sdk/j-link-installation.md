---
slug: j-link-installation
title: Instalace J-Link
description: "Následující článek vás provede instalací nástroje SEGGER J-Link."
---
import Image from '@theme/IdealImage';

# Instalace J-Link {#j-link-installation}

Následující článek vás provede instalací nástroje SEGGER J-Link.

## Postup instalace {#installation-steps}

1. Stáhněte **nRF Command Line Tools** z tohoto odkazu:

   https://www.nordicsemi.com/Products/Development-tools/nrf-command-line-tools/download

   :::tip

   V rozbalovacím seznamu na levé straně vyberte odpovídající platformu.

   :::

1. Nainstalujte stažené nástroje

   Instalace obsahuje nástroje příkazové řádky od Nordic Semiconductor, ale zahrnuje také **SEGGER J-Link Software and Documentation Pack**. Doporučujeme nainstalovat tyto dva balíčky společně pomocí instalátoru od Nordic Semiconductor, protože se tím předejde možným problémům s kompatibilitou a konfliktům verzí.

## Připojení hardwaru {#hardware-connection}

1. Připojte **SEGGER Cortex-M adapter** k zařízení **SEGGER J-Link**.

2. Připojte 10pinový plochý kabel **SWD** k adaptéru **SEGGER Cortex-M adapter** a druhý konec k zařízení CHESTER.

   :::info

   Na základní desce **CHESTER** jsou tři konektory **SWD**. Typicky budete pracovat s portem BLE (který je připojen k aplikačnímu mikrokontroleru).

   :::

3. Připojte Micro-USB kabel k zařízení SEGGER J-Link a k počítači.
