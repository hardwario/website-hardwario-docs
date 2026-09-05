---
slug: power-management
title: Power Management
description: "Power management options for CHESTER: battery packs, external supply, idle current, sleep modes and how to estimate battery life."
---
import Image from '@theme/IdealImage';

# Power Management

This article provides useful information about various power management options for CHESTER, which is a low-power device with a typical idle current in the range of 100-200 µA. Therefore, it can be powered by batteries in many applications for 3+ years.

:::info

As CHESTER is a generic platform with a vast range of applications running on it, the power consumption has to be characterized for every application implementation. You can easily get the average current over a longer period using CHESTER DevKit + Power Profiler Kit II from Nordic Semiconductor.

:::

## Battery Options

When a long battery lifespan or outdoor use (wide operational temperature range) is required, the proper battery chemistry selection is crucial. We have designed CHESTER to be compatible with the LiSoCl<sub>2</sub> chemistry. This type of battery provides the highest energy density among lithium batteries, a negligible self-discharge current (i.e. how much percentage of the capacity is lost when the battery is left on the shelf), and works in the temperature range from -60 to +85 °C (the figures have been taken from the Saft LS 26500 datasheet).

:::caution

The LiSoCl<sub>2</sub> chemistry has a very flat discharge curve. That means the voltage on the battery terminals is very steady across the battery lifespan. While this is a good thing at the first sight, it complicates the remaining capacity estimation.

:::

Another disadvantage of LiSoCl<sub>2</sub> chemistry is its relatively higher cost.

:::tip

In your projects, do not forget to consider battery replacement cost, both the actual battery and the replacement operation itself.

:::

## Integrated Battery Source

CHESTER mainboard (CHESTER-M) is provided in 3 variants from the battery holder perspective:

1. Fitted with one battery holder of the size "C".

   This variant is used together with the primary cell Saft LS 26500 (chemistry LiSoCl<sub>2</sub>) with a nominal voltage of 3.6 V and cell capacity of 7,700 mAh. The cell provides total energy storage of 27 Wh.

   :::tip

   This is the most common variant. This Saft battery is widely available; you can contact HARDWARIO for help when searching for a battery distributor.

   :::

1. Fitted with two battery holders of the size "AA".

   This variant is used together with the primary cell Saft LS 14500 (chemistry LiSoCl<sub>2</sub>) with a nominal voltage of 3.6 V and cell capacity of 2,600 mAh. The cells are connected in parallel and the total energy storage is 18 Wh. The advantage of this variant is its thinner height profile.

   :::tip

   This variant is not very common but it is essential anytime you need the internal primary battery and at the same time any cover module installed in the top part of the enclosure. For example, the extension module CHESTER-Z1-F (which features four illuminated push-buttons) with two AA primary batteries forms a robust push-button and indication device suitable for outdoor operation.

   :::

1. Without any battery holder.

   This variant is applicable when used together with external power sources provided from extension modules such as CHESTER-Z1, CHESTER-X4, CHESTER-X10, or carrier board CHESTER-B1.

## Battery Extension Modules

If you need to use primary (non-rechargeable) cells and more battery capacity than the options mentioned in the previous section, you can use these expansion modules:

* The CHESTER-B1 expansion module (in the carrier board format) can be fitted with:

  * Six battery holders of size "D" for primary cell Saft LS 33600 (chemistry LiSoCl<sub>2</sub>) with a nominal voltage of 3.6 V and cell capacity of 17,000 mAh. All cells installed will provide total energy storage of 367 Wh. This variant fits in a high-profile enclosure with dimensions of 200 x 280 x 65 mm.

    :::caution

    At least three of these battery cells have to be installed for the CHESTER mainboard variant without supercapacitors.

    :::

  * Eight battery holders of size "C" for primary cell Saft LS 26500 (chemistry LiSoCl<sub>2</sub>) with a nominal voltage of 3.6 V and cell capacity of 7,700 mAh. All cells installed will provide total energy storage of 201 Wh. This variant fits in a low-profile enclosure with dimensions of 200 x 280 x 45 mm.

    :::caution

    At least four of these battery cells have to be installed for the CHESTER mainboard variant without supercapacitors.

    :::

  * Six battery holders of size "D" for alkaline cells (alkaline-manganese dioxide) with a nominal voltage of 1.5 V and cell capacity of 17,000 mAh. All cells installed will provide total energy of 122 Wh. In this configuration, there are always two cells in series, making three parallel connections. This solution is suitable for projects with a temperature range of -10 to +50 °C. This variant fits in a high-profile enclosure with dimensions of 200 x 280 x 65 mm.

    :::caution

    All six of these battery cells have to be installed for the CHESTER mainboard variant without supercapacitors.

    :::

  * Eight battery holders of size "D" for alkaline cells (alkaline-manganese dioxide) with a nominal voltage of 1.5 V and cell capacity of 7,700 mAh. All cells installed will provide total energy of 74 Wh. In this configuration, there are always two cells in series, making three parallel connections. This solution is suitable for projects with a temperature range of -10 to +50 °C. This variant fits in a low-profile enclosure with dimensions of 200 x 280 x 45 mm.

* The CHESTER-Z1 expansion module with a rechargeable (and replaceable) lithium-ion battery (type 18650) with a nominal voltage of 3.7 V and a capacity of 2,000 mAh. This solution is suitable for projects where mains power (or DC line) is available, but long-term device operation is required in the event of a power failure. Alternatively, you can connect photovoltaic solar panels to the CHESTER-Z1 input terminals instead of the power adapter or DC line voltage.

  :::caution

  In HARDWARIO, we source a special model of lithium-ion 18650 battery with an extended operating temperature range of -20 °C to +50 °C. If a higher range is required, look into the LiSoCl<sub>2</sub>-based power source options described above.

  :::

## External Power Sources

The CHESTER device can be powered from a DC line (or power adapter) using these modules:

* Backside module CHESTER-X4

  CHESTER-X4 is a DC/DC converter with a voltage range of 6 to 28 VDC (no integrated battery charger).

* Backside module CHESTER-X10

  CHESTER-X10 is a DC/DC converter with a voltage range of 6 to 28 VDC + lithium-polymer battery charger.

* Cover module CHESTER-Z1

  CHESTER-Z1 is a DC/DC converter with a voltage range of 6-28 VDC + lithium-ion battery charger.
