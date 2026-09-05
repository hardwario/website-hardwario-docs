---
slug: chester-x8
title: CHESTER-X8 (přesný akcelerometr)
description: Rozšiřující modul s přesným tříosým akcelerometrem pro platformu CHESTER, založený na nízkošumovém MEMS akcelerometru ADXL355 na I²C, s vyvedenou sběrnicí I²C a GPIO na svorkovnici.
keywords: [CHESTER-X8, akcelerometr, tříosý, ADXL355, MEMS, vibrace, náklon, inklinace, I2C, detekce manipulace, CHESTER]
---
import Image from '@theme/IdealImage';

# CHESTER-X8 {#chester-x8}

**CHESTER-X8** je rozšiřující modul s přesným **tříosým akcelerometrem** pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">
<div><Image img={require('../../../../../chester/extension-modules/images/chester-x8-top.png')} alt="Pohled na desku CHESTER-X8 shora s tříosým MEMS akcelerometrem ADXL355"/></div>
</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

CHESTER-X8 měří zrychlení ve třech osách nízkošumovým MEMS akcelerometrem **ADXL355** s malým driftem. Nabízí volitelné rozsahy **±2 g / ±4 g / ±8 g** a rozlišení až **3,9 μg/LSB** (v rozsahu ±2 g) s malým offsetem při nulovém g. ADXL355 se k základní desce CHESTER připojuje po **I²C** na pevné adrese **0x1D**; jeho dva výstupy přerušení (INT1, INT2) jsou vyvedené na piny GP0 a GP1 slotu.

Kromě akcelerometru na desce svorkovnice modulu **vyvádí** sběrnici I²C (SCL/SDA), dvě uživatelské linky GPIO (DIO1, DIO2) a napájecí větve (VDD 3.0 V, +V, GND). Můžete tak na stejnou sběrnici připojit externí zařízení I²C nebo obě linky GPIO použít přímo. Modul nemá na desce žádný regulátor napětí. Běží z napájecích větví zařízení CHESTER.

## Klíčové vlastnosti {#key-features}

* **Přesný tříosý akcelerometr:** Nízkošumový MEMS senzor ADXL355 s malým driftem.
* **Volitelné rozsahy:** ±2 g, ±4 g a ±8 g.
* **Vysoké rozlišení:** Až 3,9 μg/LSB (v rozsahu ±2 g) s malým offsetem při nulovém g.
* **Rozhraní I²C:** Pevná adresa 0x1D, se dvěma linkami přerušení vyvedenými na GP0 a GP1.
* **Vyvedené I²C a GPIO:** Svorkovnice zpřístupňuje sběrnici I²C, dvě GPIO (DIO1/DIO2) a napájení pro rozšíření.
* **Bez externího napájení:** Běží přímo z napájecích větví zařízení CHESTER (VDD 3.0 V).

## Typické aplikace {#typical-applications}

* **Měření náklonu a inklinace:** Měření úhlu a orientace.
* **Monitorování vibrací:** Detekce a charakterizace vibrací.
* **Monitorování stavu konstrukcí:** Sledování pohybu nebo sedání stavebních konstrukcí.
* **Monitorování stavu stroje:** Dohled nad rotačními a vratnými zařízeními.
* **Seismické a geotechnické měření:** Zachycení pohybu s malou amplitudou a nízkou frekvencí.
* **Detekce manipulace a pohybu:** Rozpoznání manipulace se zařízením nebo jeho nosnou deskou či jejich pohybu.

## Technické parametry {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ modulu** | Přesný tříosý akcelerometr |
| **Akcelerometr** | ADXL355 (tříosý MEMS) |
| **Měřicí rozsahy** | ±2 g, ±4 g, ±8 g |
| **Rozlišení** | Až 3,9 μg/LSB (v rozsahu ±2 g) |
| **Rozhraní k hostu** | I²C |
| **Adresa I²C** | 0x1D (pevná; ASEL uzemněný) |
| **Linky přerušení** | INT1 → GP0/A0, INT2 → GP1/A1 |
| **Uživatelské digitální I/O** | DIO1 (GP2/A2), DIO2 (GP3/A3), na svorkovnici |
| **Napájení logiky (VDD)** | 3.0 V |
| **Rozhraní desky** | Castellated otvory na dvou protilehlých hranách, připájené k základní desce CHESTER |
| **Revize hardwaru** | R1.0 |

## Klíčové součástky {#key-components}

| Součástka | Typové označení | Popis |
| :--- | :--- | :--- |
| **Akcelerometr** | ADXL355 | Nízkošumový tříosý MEMS akcelerometr s malým driftem a digitálním rozhraním (zde v režimu I²C) |

## Zapojení pinů {#pin-configuration}

Modul používá standardizované rozvržení konektoru kompatibilní se slotem pro rozšiřující moduly CHESTER.

:::note
Zobrazené zapojení pinů platí pro základní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X8 {#chester-x8-connector-pinout}

![Zapojení svorkovnice CHESTER-X8: VDD, GND, DIO1, SCL, SDA, DIO2, GND, +V na pinech 1-8](../../../../../chester/extension-modules/images/tb-chester-x8.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | VDD | Napájení | Napájení logiky 3.0 V ze základní desky CHESTER |
| 2 | GND | Zem | Systémová zemní reference |
| 3 | DIO1 | Digitální I/O | Uživatelský digitální vstup/výstup č. 1 (GP2/A2 slotu) |
| 4 | SCL | I²C | Hodinový signál I²C |
| 5 | SDA | I²C | Datový signál I²C |
| 6 | DIO2 | Digitální I/O | Uživatelský digitální vstup/výstup č. 2 (GP3/A3 slotu) |
| 7 | GND | Zem | Systémová zemní reference |
| 8 | +V | Napájení | Kladná systémová větev (závisí na napájecí variantě zařízení CHESTER) |

:::info
`VDD` je logická větev 3.0 V; `+V` je kladná systémová větev a její napětí závisí na napájecí variantě zařízení CHESTER. Kromě napájení akcelerometru ADXL355 na desce svorkovnice vyvádí i **sběrnici I²C** (SCL/SDA) a dvě uživatelská **GPIO** (DIO1, DIO2) pro rozšíření.
:::

### Rozhraní k hostu (I²C) {#host-interface-ic}

CHESTER-X8 komunikuje se základní deskou CHESTER po standardní sběrnici **I²C**. Akcelerometr **ADXL355** na desce sedí na pevné adrese I²C **0x1D** (propojka ASEL je uzemněná). Tatáž sběrnice I²C je vyvedená na svorkovnici (SCL/SDA), takže ji mohou využívat i externí zařízení I²C. Jen se vyhněte druhému zařízení na adrese 0x1D.

Modul používá piny GP slotu takto:

| Pin CHESTER-X | Funkce | Připojeno k |
| :--- | :--- | :--- |
| GP0 / A0 | ADXL355 INT1 | Přerušení akcelerometru 1 |
| GP1 / A1 | ADXL355 INT2 | Přerušení akcelerometru 2 |
| GP2 / A2 | DIO1 | Uživatelské GPIO (svorkovnice) |
| GP3 / A3 | DIO2 | Uživatelské GPIO (svorkovnice) |

Výstup data-ready (DRDY) čipu ADXL355 vyvedený není; pro vzorkování řízené přerušením použijte linky INT1/INT2 (GP0/GP1).

## Svorkovnice a rozšíření {#terminal-block-and-expansion}

Svorkovnice kromě akcelerometru na desce vyvádí i sběrnici I²C, dvě linky GPIO a napájecí větve, takže CHESTER-X8 může posloužit i jako malý rozšiřující konektor:

- **Externí zařízení I²C:** zapojte je na **SCL** (pin 4), **SDA** (pin 5), **VDD** (pin 1, 3.0 V) a **GND** (pin 2 nebo 7). Sběrnici dělí s akcelerometrem ADXL355 na desce (adresa 0x1D).
- **Uživatelské GPIO:** **DIO1** (pin 3) a **DIO2** (pin 6) jsou linky GP2/GP3 slotu, použitelné jako běžné digitální vstupy nebo výstupy.
- **Napájení:** **+V** (pin 8) je kladná systémová větev; **VDD** (pin 1) je logická větev 3.0 V.

Všechna externě připojená zařízení musí mít s modulem společnou **GND**.

### Průchod krabičkou {#enclosure-feed-through}

Kabeláž lze do krabičky přivést dvěma způsoby:

- **Kabelová vývodka (výchozí):** vodiče protáhnete vývodkou ve stěně krabičky a zapojíte do svorkovnice.
- **Konektor do panelu (na vyžádání):** externí konektor ve stěně krabičky umožní uživateli kabel zapojit, bez volné kabeláže vevnitř. Na vyžádání.

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X8 lze použít s různými konfiguracemi základních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Základní deska CHESTER-M CGLS s baterií velikosti D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x8-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska s dvojitým držákem baterií velikosti D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x8-c4.png)

</div>
</div>
</div>

## Schémata {#schematic-diagrams}

Kompletní schéma (akcelerometr ADXL355, jeho rozhraní I²C a vedení přerušení a vyvedení na svorkovnici) je k dispozici jako PDF:

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x8-r1.0.pdf)
- [Interaktivní prohlížeč CHESTER-X8](pathname:///download/ibom/hio-chester-x8-r1.0.html)

## Výkres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Výkres rozvržení desky CHESTER-X8 R1.0 se signály slotu nahoře a svorkovnicí VDD/GND/DIO/SCL/SDA dole](../../../../../chester/extension-modules/images/pc-chester-x8.png)

</div>
