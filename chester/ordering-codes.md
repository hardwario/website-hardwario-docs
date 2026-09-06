---
slug: ordering-codes
title: Ordering Codes
description: "This article defines all possible ordering codes for the CHESTER ecosystem."
title_meta: "Ordering Codes (CHESTER)"
---
import Image from '@theme/IdealImage';

# Ordering Codes

This article defines all possible ordering codes for the **CHESTER** ecosystem. The order specifications must be fully compliant with the part numbers stated below.

:::tip

Each product lists available parts, i.e. which parts are standard and usually immediately available. If you need a specific combination, talk to us for availability and **MOQ** (Minimum Order Quantity) conditions.

:::

## Mainboard Modules

### CHESTER-M: Standard Mainboard {#chester-m}

**Format:** `CHESTER-M-[A][B][C][D][E][G][L][N][S][V]`

**Legend:**

* `A` = Battery holder size "AA" (2x)
* `B` = Battery holder size "C" (1x)
* `C` = Cellular (NB-IoT + LTE-M modem)
* `D` = Developer variant (without supercapacitors and charger, with spring terminals for X modules)
* `E` = External power source variant (without supercapacitors and charger)
* `G` = GNSS (satellite positioning module GPS/Galileo/GLONASS/BeiDou)
* `L` = LoRaWAN (LoRaWAN modem)
* `S` = Nano-SIM holder
* `V` = Vodafone SIM chip

**Available parts:**

| Ordering Code     | Ordering Code      | Ordering Code      |
| :---------------- | :----------------- | :----------------- |
| `CHESTER-M-EL`    | `CHESTER-M-BEL`    | `CHESTER-M-AEL`    |
| `CHESTER-M-CS`    | `CHESTER-M-BCS`    | `CHESTER-M-ACS`    |
| `CHESTER-M-CV`    | `CHESTER-M-BCV`    | `CHESTER-M-ACV`    |
| `CHESTER-M-CES`   | `CHESTER-M-BCES`   | `CHESTER-M-ACES`   |
| `CHESTER-M-CGS`   | `CHESTER-M-BCGS`   | `CHESTER-M-ACGS`   |
| `CHESTER-M-CGV`   | `CHESTER-M-BCGV`   | `CHESTER-M-ACGV`   |
| `CHESTER-M-CGLS`  | `CHESTER-M-BCGLS`  | `CHESTER-M-ACGLS`  |
| `CHESTER-M-CDGLS` | `CHESTER-M-BCDGLS` | `CHESTER-M-ACDGLS` |

## Cover Modules

### CHESTER-S1: Integrated Multi-Sensor {#chester-s1}

**Format:** `CHESTER-S1-[B][C][M][N][P][T]`

:::info

This product connects to the system I²C bus on CHESTER-M via the 7-pin JST connector.

:::

**Legend**:

* `B` = Push-button w/ RGB LED
* `C` = CO2 sensor
* `M` = Microphone
* `N` = No microcontroller
* `P` = PIR detector
* `T` = Thermocamera

:::info

The lux meter and hygrometer are always included. In the case of the "N" version, their I²C bus is connected directly to the system I2C connector.

:::

**Available parts:**

| Ordering Code      |
| :----------------- |
| `CHESTER-S1-BCMP`  |
| `CHESTER-S1-BCMPT` |
| `CHESTER-S1-N`     |
| `CHESTER-S1-NP`    |

### CHESTER-Z1: Backup + Push-buttons {#chester-z}

:::caution

This product connects to the system I²C bus on CHESTER-M via the 7-pin JST connector.

:::

**Format:** `CHESTER-Z1-[X|1-F]`

**Legend:**

* `X` = Center push-button included
* `1-F` = Binary combination (represented by a single hexadecimal digit) of the installed push-buttons

:::info

Push-button bit 0 represents the top-most button.

:::

:::caution

An acoustic beeper is installed only if any of the pushbuttons are present.

:::

**Available parts:**

| Ordering Code  |
| :------------- |
| `CHESTER-Z1`   |
| `CHESTER-Z1-F` |
| `CHESTER-Z1-X` |

## Carrier Boards

### CHESTER-B1: Batteries + wM-Bus {#chester-b1}

**Format:** `CHESTER-B1-[A][C][D][L][W]`

**Legend:**

* `A` = Battery holders configured for alkaline cells (2S3P or 2S4P configuration)
* `C` = Eight battery holders of size "C"
* `D` = Six battery holders of size "D"
* `L` = Battery holders configured for lithium cells (6P or 8P configuration)
* `W` = Wireless M-Bus (wM-Bus) module with u.FL connector for antenna

**Available parts:**

| Ordering Code    |
| :--------------- |
| `CHESTER-B1-AC`  |
| `CHESTER-B1-AD`  |
| `CHESTER-B1-ADW` |
| `CHESTER-B1-CL`  |
| `CHESTER-B1-DL`  |
| `CHESTER-B1-DLW` |

### CHESTER-C1: Interfaces + Control {#chester-c1}

**Format:** `CHESTER-C1-[R]`

**Legend:**

* `R` = Power relays included

**Available parts:**

| Ordering Code  |
| :------------- |
| `CHESTER-C1`   |
| `CHESTER-C1-R` |

## Backside Modules

### CHESTER-K1: 4x Diff. Input + 5 V Boost {#chester-k1}

**Format:** `CHESTER-K1-[1{C|V}]-[2{C|V}]-[3{C|V}]-[4{C|V}]`

:::caution

This expansion module occupies both backside slots "A" and "B".

:::

**Legend:**

* `1C` = Channel 1 configured for current measurements (differential)
* `1V` = Channel 1 configured for voltage measurements (single-ended)
* `2C` = Channel 2 configured for current measurements (differential)
* `2V` = Channel 2 configured for voltage measurements (single-ended)
* `3C` = Channel 3 configured for current measurements (differential)
* `3V` = Channel 3 configured for voltage measurements (single-ended)
* `4C` = Channel 4 configured for current measurements (differential)
* `4V` = Channel 4 configured for voltage measurements (single-ended)

**Available parts:**

| Ordering Code            |
| :----------------------- |
| `CHESTER-K1-1C-2C-3C-4C` |
| `CHESTER-K1-1C-2C-3C-4V` |
| `CHESTER-K1-1C-2C-3V-4V` |
| `CHESTER-K1-1C-2V-3V-4V` |
| `CHESTER-K1-1V-2V-3V-4V` |

### CHESTER-X0A: 4x Input w/ 5 V Boost {#chester-x0a}

**Format:** `CHESTER-X0A[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code   |
| :-------------- |
| `CHESTER-X0A:A` |
| `CHESTER-X0A:B` |

### CHESTER-X0B: 4x Input w/o 5 V Boost {#chester-x0b}

**Format:** `CHESTER-X0B[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code   |
| :-------------- |
| `CHESTER-X0B:A` |
| `CHESTER-X0B:B` |

### CHESTER-X1: 8x 1-Wire Bus Driver {#chester-x1}

**Format:** `CHESTER-X1-[G][:{A|B}]`

**Legend:**

* `G` = Only four 1-Wire channels provided with ground terminal next to each channel
* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code    |
| :--------------- |
| `CHESTER-X1:A`   |
| `CHESTER-X1:B`   |
| `CHESTER-X1-G:A` |
| `CHESTER-X1-G:B` |

### CHESTER-X2: UART/RS-485 Interface {#chester-x2}

**Format:** `CHESTER-X2[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code  |
| :------------- |
| `CHESTER-X2:A` |
| `CHESTER-X2:B` |

### CHESTER-X3A: 2x Pt100/Pt1000 Interface {#chester-x3a}

**Format:** `CHESTER-X3A[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code   |
| :-------------- |
| `CHESTER-X3A:A` |
| `CHESTER-X3A:B` |

### CHESTER-X3B: 2x Thermocouple Interface {#chester-x3b}

**Format:** `CHESTER-X3B[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code   |
| :-------------- |
| `CHESTER-X3B:A` |
| `CHESTER-X3B:B` |

### CHESTER-X3C: 2x Load Cell Interface {#chester-x3c}

**Format:** `CHESTER-X3C[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code   |
| :-------------- |
| `CHESTER-X3C:A` |
| `CHESTER-X3C:B` |

### CHESTER-X4: 28 V Buck + 4x P Switch {#chester-x4}

:::info

Only a single instance of this module can be installed on CHESTER-M.

:::

**Format:** `CHESTER-X4[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code  |
| :------------- |
| `CHESTER-X4:A` |
| `CHESTER-X4:B` |

### CHESTER-X6: S-Wire Bus + 5 V Boost {#chester-x6}

:::info

Only a single instance of this module can be installed on CHESTER-M.

:::

**Format:** `CHESTER-X6[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code  |
| :------------- |
| `CHESTER-X6:A` |
| `CHESTER-X6:B` |

### CHESTER-X7: 1x Diff. Input + 5 V Boost {#chester-x7}

**Format:** `CHESTER-X7[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code  |
| :------------- |
| `CHESTER-X7:A` |
| `CHESTER-X7:B` |

### CHESTER-X8: Ultra-Precise Accelerometer {#chester-x8}

:::info

Only a single instance of this module can be installed on CHESTER-M.

:::

**Format:** `CHESTER-X8[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code  |
| :------------- |
| `CHESTER-X8:A` |
| `CHESTER-X8:B` |

### CHESTER-X9: 4x Protected N Switch {#chester-x9}

**Format:** `CHESTER-X9[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code  |
| :------------- |
| `CHESTER-X9:A` |
| `CHESTER-X9:B` |

### CHESTER-X10: 28 V Buck + Li-Po Charger {#chester-x10}

**Format:** `CHESTER-X10[:{A|B}]`

**Legend:**

* `:A` = Expansion module configured for backside slot "A" position
* `:B` = Expansion module configured for backside slot "B" position

**Available parts:**

| Ordering Code   |
| :-------------- |
| `CHESTER-X10:A` |
| `CHESTER-X10:B` |

## Enclosures

For more details and drawings, see [Enclosures](hardware-description/enclosures.md#list-of-enclosures) article.

| Ordering Code | Application                    | Note    |
| ------------- | ------------------------------ | ------- |
| CHESTER-E1-P  | CHESTER Clime                  |         |
| CHESTER-E2-P  | CHESTER Counter                |         |
| CHESTER-E3-P  | CHESTER Input/Current          |         |
| CHESTER-E4-FP | CHESTER Push                   |         |
| CHESTER-E5-P  | CHESTER Scale                  |         |
| CHESTER-E6-P  | CHESTER Scan, Signal and Track |         |
| CHESTER-E7-P  | CHESTER Clime IAQ              | S1      |
| CHESTER-E8-P  | CHESTER Input 8x               |         |
| CHESTER-E9-P  | CHESTER Input 8x + DC          |         |
| CHESTER-E10-P | CHESTER Meteo                  |         |
| CHESTER-E11-P | CHESTER + D1                   | Display |
| CHESTER-E12-P |                                |         |
| CHESTER-E13-P |                                |         |
| CHESTER-E14-P |                                |         |
| CHESTER-E15-P |                                |         |
| CHESTER-E16-P |                                |         |
| CHESTER-E17-P | CHESTER with C1 (Ekoterm)      |         |
| CHESTER-E18-P | CHESTER with C2 (Axilera)      |         |
| CHESTER-E19-P | CHESTER with B1 (wM-Bus)       |         |

## Other Accessories

### CHESTER-S2: External Hygrometer {#chester-s2}

**Format:** `CHESTER-S2`

:::info

This product connects to the system I²C bus on CHESTER-M via the 5-pin JST connector.

:::

**Available parts:**

| Ordering Code |
| :------------ |
| `CHESTER-S2`  |
