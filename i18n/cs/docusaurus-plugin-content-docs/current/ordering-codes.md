---
slug: ordering-codes
title: Objednací kódy
description: "Přehled všech objednacích kódů produktů ekosystému CHESTER."
title_meta: "Objednací kódy (CHESTER)"
---
import Image from '@theme/IdealImage';

# Objednací kódy {#ordering-codes}

Tento článek uvádí všechny objednací kódy produktů ekosystému **CHESTER**. Objednávka musí přesně odpovídat níže uvedeným objednacím číslům.

:::tip

U každého produktu najdete dostupné varianty, tedy ty, které jsou standardní a obvykle ihned k dispozici. Pokud potřebujete jinou kombinaci, zeptejte se nás na dostupnost a podmínky **MOQ** (minimální objednací množství).

:::

## Moduly základní desky {#mainboard-modules}

### CHESTER-M: Standardní základní deska {#chester-m}

**Formát:** `CHESTER-M-[A][B][C][D][E][G][L][N][S][V]`

**Legenda:**

* `A` = Držák baterií velikosti „AA“ (2x)
* `B` = Držák baterií velikosti „C“ (1x)
* `C` = Mobilní síť (modem NB-IoT + LTE-M)
* `D` = Vývojářská varianta (bez superkondenzátorů a nabíječky, s pružinovými svorkami pro moduly X)
* `E` = Varianta s externím zdrojem napájení (bez superkondenzátorů a nabíječky)
* `G` = GNSS (modul satelitního určování polohy GPS/Galileo/GLONASS/BeiDou)
* `L` = LoRaWAN (modem LoRaWAN)
* `S` = Držák Nano-SIM
* `V` = SIM čip Vodafone

**Dostupné varianty:**

| Objednací kód     | Objednací kód      | Objednací kód      |
| :---------------- | :----------------- | :----------------- |
| `CHESTER-M-EL`    | `CHESTER-M-BEL`    | `CHESTER-M-AEL`    |
| `CHESTER-M-CS`    | `CHESTER-M-BCS`    | `CHESTER-M-ACS`    |
| `CHESTER-M-CV`    | `CHESTER-M-BCV`    | `CHESTER-M-ACV`    |
| `CHESTER-M-CES`   | `CHESTER-M-BCES`   | `CHESTER-M-ACES`   |
| `CHESTER-M-CGS`   | `CHESTER-M-BCGS`   | `CHESTER-M-ACGS`   |
| `CHESTER-M-CGV`   | `CHESTER-M-BCGV`   | `CHESTER-M-ACGV`   |
| `CHESTER-M-CGLS`  | `CHESTER-M-BCGLS`  | `CHESTER-M-ACGLS`  |
| `CHESTER-M-CDGLS` | `CHESTER-M-BCDGLS` | `CHESTER-M-ACDGLS` |

## Krycí moduly {#cover-modules}

### CHESTER-S1: Integrovaný multisenzor {#chester-s1}

**Formát:** `CHESTER-S1-[B][C][M][N][P][T]`

:::info

Tento produkt se připojuje k systémové sběrnici I²C desky CHESTER-M 7pinovým konektorem JST.

:::

**Legenda**:

* `B` = Tlačítko s RGB LED
* `C` = Senzor CO2
* `M` = Mikrofon
* `N` = Bez mikrokontroléru
* `P` = PIR detektor
* `T` = Termokamera

:::info

Luxmetr a vlhkoměr jsou součástí vždy. U verze „N“ je jejich sběrnice I²C připojená přímo k systémovému konektoru I²C.

:::

**Dostupné varianty:**

| Objednací kód      |
| :----------------- |
| `CHESTER-S1-BCMP`  |
| `CHESTER-S1-BCMPT` |
| `CHESTER-S1-N`     |
| `CHESTER-S1-NP`    |

### CHESTER-Z1: Záložní napájení + tlačítka {#chester-z}

:::caution

Tento produkt se připojuje k systémové sběrnici I²C desky CHESTER-M 7pinovým konektorem JST.

:::

**Formát:** `CHESTER-Z1-[X|1-F]`

**Legenda:**

* `X` = Včetně středového tlačítka
* `1-F` = Binární kombinace osazených tlačítek (zapsaná jednou šestnáctkovou číslicí)

:::info

Bit 0 odpovídá nejvýše umístěnému tlačítku.

:::

:::caution

Akustický bzučák se osazuje jen tehdy, když je osazené alespoň jedno tlačítko.

:::

**Dostupné varianty:**

| Objednací kód  |
| :------------- |
| `CHESTER-Z1`   |
| `CHESTER-Z1-F` |
| `CHESTER-Z1-X` |

## Nosné desky {#carrier-boards}

### CHESTER-B1: Baterie + wM-Bus {#chester-b1}

**Formát:** `CHESTER-B1-[A][C][D][L][W]`

**Legenda:**

* `A` = Držáky baterií zapojené pro alkalické články (zapojení 2S3P nebo 2S4P)
* `C` = Osm držáků baterií velikosti „C“
* `D` = Šest držáků baterií velikosti „D“
* `L` = Držáky baterií zapojené pro lithiové články (zapojení 6P nebo 8P)
* `W` = Modul Wireless M-Bus (wM-Bus) s konektorem u.FL pro anténu

**Dostupné varianty:**

| Objednací kód    |
| :--------------- |
| `CHESTER-B1-AC`  |
| `CHESTER-B1-AD`  |
| `CHESTER-B1-ADW` |
| `CHESTER-B1-CL`  |
| `CHESTER-B1-DL`  |
| `CHESTER-B1-DLW` |

### CHESTER-C1: Rozhraní + řízení {#chester-c1}

**Formát:** `CHESTER-C1-[R]`

**Legenda:**

* `R` = Včetně silových relé

**Dostupné varianty:**

| Objednací kód  |
| :------------- |
| `CHESTER-C1`   |
| `CHESTER-C1-R` |

## Moduly na zadní straně {#backside-modules}

### CHESTER-K1: 4x dif. vstup + 5 V boost {#chester-k1}

**Formát:** `CHESTER-K1-[1{C|V}]-[2{C|V}]-[3{C|V}]-[4{C|V}]`

:::caution

Tento rozšiřující modul obsazuje oba sloty „A“ a „B“ na zadní straně.

:::

**Legenda:**

* `1C` = Kanál 1 nastavený na měření proudu (diferenciální)
* `1V` = Kanál 1 nastavený na měření napětí (nesymetrické)
* `2C` = Kanál 2 nastavený na měření proudu (diferenciální)
* `2V` = Kanál 2 nastavený na měření napětí (nesymetrické)
* `3C` = Kanál 3 nastavený na měření proudu (diferenciální)
* `3V` = Kanál 3 nastavený na měření napětí (nesymetrické)
* `4C` = Kanál 4 nastavený na měření proudu (diferenciální)
* `4V` = Kanál 4 nastavený na měření napětí (nesymetrické)

**Dostupné varianty:**

| Objednací kód            |
| :----------------------- |
| `CHESTER-K1-1C-2C-3C-4C` |
| `CHESTER-K1-1C-2C-3C-4V` |
| `CHESTER-K1-1C-2C-3V-4V` |
| `CHESTER-K1-1C-2V-3V-4V` |
| `CHESTER-K1-1V-2V-3V-4V` |

### CHESTER-X0A: 4x vstup s 5 V boost {#chester-x0a}

**Formát:** `CHESTER-X0A[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód   |
| :-------------- |
| `CHESTER-X0A:A` |
| `CHESTER-X0A:B` |

### CHESTER-X0B: 4x vstup bez 5 V boost {#chester-x0b}

**Formát:** `CHESTER-X0B[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód   |
| :-------------- |
| `CHESTER-X0B:A` |
| `CHESTER-X0B:B` |

### CHESTER-X1: Budič 8x sběrnice 1-Wire {#chester-x1}

**Formát:** `CHESTER-X1-[G][:{A|B}]`

**Legenda:**

* `G` = Jen čtyři kanály 1-Wire, vedle každého z nich zemnicí svorka
* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód    |
| :--------------- |
| `CHESTER-X1:A`   |
| `CHESTER-X1:B`   |
| `CHESTER-X1-G:A` |
| `CHESTER-X1-G:B` |

### CHESTER-X2: Rozhraní UART/RS-485 {#chester-x2}

**Formát:** `CHESTER-X2[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód  |
| :------------- |
| `CHESTER-X2:A` |
| `CHESTER-X2:B` |

### CHESTER-X3A: Rozhraní 2x Pt100/Pt1000 {#chester-x3a}

**Formát:** `CHESTER-X3A[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód   |
| :-------------- |
| `CHESTER-X3A:A` |
| `CHESTER-X3A:B` |

### CHESTER-X3B: Rozhraní 2x termočlánek {#chester-x3b}

**Formát:** `CHESTER-X3B[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód   |
| :-------------- |
| `CHESTER-X3B:A` |
| `CHESTER-X3B:B` |

### CHESTER-X3C: Rozhraní 2x tenzometr {#chester-x3c}

**Formát:** `CHESTER-X3C[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód   |
| :-------------- |
| `CHESTER-X3C:A` |
| `CHESTER-X3C:B` |

### CHESTER-X4: 28 V buck + 4x spínač P {#chester-x4}

:::info

Na desku CHESTER-M lze osadit jen jeden kus tohoto modulu.

:::

**Formát:** `CHESTER-X4[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód  |
| :------------- |
| `CHESTER-X4:A` |
| `CHESTER-X4:B` |

### CHESTER-X6: Sběrnice S-Wire + 5 V boost {#chester-x6}

:::info

Na desku CHESTER-M lze osadit jen jeden kus tohoto modulu.

:::

**Formát:** `CHESTER-X6[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód  |
| :------------- |
| `CHESTER-X6:A` |
| `CHESTER-X6:B` |

### CHESTER-X7: 1x dif. vstup + 5 V boost {#chester-x7}

**Formát:** `CHESTER-X7[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód  |
| :------------- |
| `CHESTER-X7:A` |
| `CHESTER-X7:B` |

### CHESTER-X8: Ultrapřesný akcelerometr {#chester-x8}

:::info

Na desku CHESTER-M lze osadit jen jeden kus tohoto modulu.

:::

**Formát:** `CHESTER-X8[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód  |
| :------------- |
| `CHESTER-X8:A` |
| `CHESTER-X8:B` |

### CHESTER-X9: 4x chráněný spínač N {#chester-x9}

**Formát:** `CHESTER-X9[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód  |
| :------------- |
| `CHESTER-X9:A` |
| `CHESTER-X9:B` |

### CHESTER-X10: 28 V buck + nabíječka Li-Po {#chester-x10}

**Formát:** `CHESTER-X10[:{A|B}]`

**Legenda:**

* `:A` = Rozšiřující modul nastavený pro slot „A“ na zadní straně
* `:B` = Rozšiřující modul nastavený pro slot „B“ na zadní straně

**Dostupné varianty:**

| Objednací kód   |
| :-------------- |
| `CHESTER-X10:A` |
| `CHESTER-X10:B` |

## Krabičky {#enclosures}

Více podrobností a výkresy najdete v článku [Krabičky](hardware-description/enclosures.md#list-of-enclosures).

| Objednací kód | Použití                        | Poznámka |
| ------------- | ------------------------------ | ------- |
| CHESTER-E1-P  | CHESTER Clime                  |         |
| CHESTER-E2-P  | CHESTER Counter                |         |
| CHESTER-E3-P  | CHESTER Input/Current          |         |
| CHESTER-E4-FP | CHESTER Push                   |         |
| CHESTER-E5-P  | CHESTER Scale                  |         |
| CHESTER-E6-P  | CHESTER Scan, Signal a Track   |         |
| CHESTER-E7-P  | CHESTER Clime IAQ              | S1      |
| CHESTER-E8-P  | CHESTER Input 8x               |         |
| CHESTER-E9-P  | CHESTER Input 8x + DC          |         |
| CHESTER-E10-P | CHESTER Meteo                  |         |
| CHESTER-E11-P | CHESTER + D1                   | Displej |
| CHESTER-E12-P |                                |         |
| CHESTER-E13-P |                                |         |
| CHESTER-E14-P |                                |         |
| CHESTER-E15-P |                                |         |
| CHESTER-E16-P |                                |         |
| CHESTER-E17-P | CHESTER s C1 (Ekoterm)         |         |
| CHESTER-E18-P | CHESTER s C2 (Axilera)         |         |
| CHESTER-E19-P | CHESTER s B1 (wM-Bus)          |         |

## Další příslušenství {#other-accessories}

### CHESTER-S2: Externí vlhkoměr {#chester-s2}

**Formát:** `CHESTER-S2`

:::info

Tento produkt se připojuje k systémové sběrnici I²C desky CHESTER-M 5pinovým konektorem JST.

:::

**Dostupné varianty:**

| Objednací kód |
| :------------ |
| `CHESTER-S2`  |
