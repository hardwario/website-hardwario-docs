---
title: CHESTER Control
description: "CHESTER Control je katalogová aplikace pro sledování vstupů a spínání výstupů: co umí, jaký má hardware, zapojení, varianty a firmware."
---

# CHESTER Control {#chester-control}

![Zařízení CHESTER Control zepředu s anténním konektorem nahoře a čtyřmi kabelovými průchodkami dole](/img/chester/catalog-applications/chester-control.webp)

Zařízení **CHESTER Control** sleduje digitální a analogové vstupy a na pokyn z HARDWARIO Cloud spíná výstupy. Zaznamenává změny vstupů, počítá impulzy, měří napětí a proud a data odesílá přes NB-IoT/LTE nebo LoRaWAN.

:::info Firmware

Konfigurační parametry, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER Control](../../firmware/chester-control/index.md)**.

:::

## Co umí {#what-it-can-do}

- Čte čtyři vstupy modulu **CHESTER-X0**, každý nastavený jako vstup trigger, counter, voltage nebo current.
- Každou změnu digitálního vstupu zaznamená s časovou značkou a umí ji nahlásit okamžitě.
- Počítá impulzy, například z výstupu S0 měřiče energie.
- Měří napětí 0–28 V a proud 0–24 mA z převodníků.
- Na dálku z HARDWARIO Cloud spíná čtyři výstupy modulu **CHESTER-X4**, které přivádějí napětí ze vstupu VIN.
- Čte teplotní sondy **DS18B20** 1-Wire a bluetoothové senzorové tagy.
- Se záložním modulem **CHESTER-Z1** (CHESTER Control Z) při výpadku externího napájení běží dál a změnu napájení nahlásí.

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-X4:B`: Step-down měnič a výstupy (4 kanály)

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

## Vstupy a výstupy {#inputs-and-outputs}

Zařízení **CHESTER Control** má tyto čtyři vstupy:

| **Typ**  | **Kanál**   | **Svorka**   | **Typ vstupu**    | **Rozsah vstupu** | **Typické použití**                   |
| :------- | :---------- | :----------- | :---------------- | :-------------- | :------------------------------------ |
| Trigger  | CH1         | A2           | Digitální (NPN/PNP) | 0 až 28 V      | Spínač, tlačítko, relé, senzor PLC    |
| Counter  | CH2         | A4           | Digitální (NPN/PNP) | 0 až 28 V      | Impulzní výstupy měřičů energie (např. S0) |
| Voltage  | CH3         | A5           | Analogový (napětí) | 0 až 28 V       | Různé napěťové převodníky             |
| Current  | CH4         | A7           | Analogový (proud) | 0 až 24 mA      | Různé proudové převodníky             |

Každý kanál lze v konfiguraci firmwaru přepnout na kterýkoli ze čtyř typů; tabulka ukazuje typické přiřazení. Vstupy a jejich možnosti podrobně popisuje stránka [**Firmware CHESTER Control**](../../firmware/chester-control/index.md#measurement-and-behavior).

Zařízení **CHESTER Control** navíc umí na dálku ovládat 4 digitální výstupy (6–28 V).

## Svorkovnice {#terminal-blocks}

| CHESTER-X0B v levém slotu A (signály A1–A8) | CHESTER-X4 v pravém slotu B (signály B1–B8)                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Použijte vstupy **CH1** až **CH4** a **GND** | Externí napájení připojte na **VIN** a **GND**.                                              |
|                                             | Použijte výstupy **CH1** až **CH4**; zapnutý výstup přivádí napětí z **VIN**                 |
| ![Rozložení svorek CHESTER-X0: VDD, CH1, GND, CH2, CH3, GND, CH4, +V](../../../../../../chester/extension-modules/images/tb-chester-x0.png) | ![Rozložení svorek CHESTER-X4: GND, CH1, CH2, CH3, CH4, GND, GND, VIN](../../../../../../chester/extension-modules/images/tb-chester-x4.png)                                                  |

Schéma zapojení zařízení **CHESTER Control** najdete v [**popisu svorkovnice**](../../extension-modules/chester-x0.md) rozšiřujícího modulu **CHESTER-X0**.
Rozšiřující modul **CHESTER-X0** je osazený v levém slotu **A**, takže použijte odpovídající svorky **A1** až **A8**.

## Varianty {#variants}

| Varianta | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Control Z**](chester-control-z.md) | Záložní modul CHESTER-Z1 | [CHESTER Control Z](../../firmware/chester-control/chester-control-z.md) |

Firmware [**CHESTER Control 8Ch Z**](../../firmware/chester-control/chester-control-8ch-z.md) čte osm vstupů s druhým modulem CHESTER-X0 ve slotu B místo modulu CHESTER-X4 a podporuje záložní modul CHESTER-Z.

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
