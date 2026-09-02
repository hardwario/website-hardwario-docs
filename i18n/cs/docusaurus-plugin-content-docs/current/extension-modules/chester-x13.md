---
slug: chester-x13
title: CHESTER-X13 (sběrnice CAN)
description: Rozšiřující modul pro CAN a CAN FD pro platformu CHESTER, založený na řadiči MCP2518FD a transceiveru TCAN3413, s terminací sběrnice na desce.
keywords: [CHESTER-X13, CAN, CAN FD, sběrnice CAN, CANbus, MCP2518FD, TCAN3413, SPI, terminace sběrnice, drátová konektivita, CHESTER]
---
import Image from '@theme/IdealImage';

# CHESTER-X13 {#chester-x13}

**CHESTER-X13** je rozšiřující modul pro **sběrnici CAN** s podporou **CAN FD** pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">
<div><Image img={require('../../../../../chester/extension-modules/images/chester-x13-top.png')} alt="3D render červené desky CHESTER-X13 R1.2 s řadičem CAN MCP2518FD, krystalem 20 MHz, transceiverem TCAN3413 a tlumivkou step-down převodníku"/></div>
</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

CHESTER-X13 poskytuje rozhraní **CAN / CAN FD** založené na externím řadiči CAN **MCP2518FD**, který se základní deskou CHESTER komunikuje po **SPI**. Fyzickou sběrnici budí transceiver **TCAN3413** na desce a linky **CANH** / **CANL** jsou vyvedené na svorkovnici. Zakončovací rezistory sběrnice jsou na desce k dispozici, ale ve výchozím stavu odpojené, takže modul může být kdekoli na sběrnici.

Modul může běžet přímo ze základní desky CHESTER. Alternativně přivádí externí linka 5-28 V DC na +VIN energii do step-down převodníku **TPS62933** na desce, jehož pevný výstup **5 V** napájí základní desku CHESTER. Vstup chrání Schottkyho diody (**PMEG6010ELR**). Výstup přerušení signalizuje základní desce CHESTER, že řadič CAN potřebuje obsluhu.

## Klíčové vlastnosti {#key-features}

* **CAN a CAN FD:** Drátová konektivita založená na řadiči CAN MCP2518FD.
* **Rozhraní k hostu po SPI:** K základní desce CHESTER se připojuje po SPI.
* **Transceiver na desce:** Fyzickou sběrnici CAN budí transceiver TCAN3413.
* **Volitelná terminace sběrnice:** Terminace ~120 Ω na desce, ve výchozím stavu odpojená.
* **Flexibilní napájení:** Běží ze základní desky CHESTER, nebo z volitelné linky 5-28 V DC na +VIN.
* **Ochrana vstupu:** Schottkyho diody (PMEG6010ELR) na napájecím vstupu.
* **Výstup přerušení:** Vyhrazená linka přerušení k základní desce CHESTER.

## Typické aplikace {#typical-applications}

* **Průmyslové sítě CAN:** Připojení zařízení CHESTER ke sběrnici CAN / CAN FD.
* **Monitorování strojů a zařízení:** Odečet dat ze zařízení, která nabízejí rozhraní CAN.
* **Mobilní stroje a vozidla:** Telemetrie ze zemědělských, stavebních a dalších mobilních strojů.
* **Energetické systémy:** Monitorování generátorů, střídačů a bateriových systémů s rozhraním CAN.
* **Dodatečný sběr dat:** Odbočení dat z existující sběrnice CAN.

## Technické parametry {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ rozhraní** | CAN / CAN FD |
| **Bitová rychlost** | Až 1 Mbit/s (klasický CAN), až 5 Mbit/s (CAN FD) |
| **Řadič CAN** | MCP2518FD (externí, SPI) |
| **Transceiver CAN** | TCAN3413 |
| **Rozhraní k hostu** | SPI |
| **Terminace sběrnice** | ~120 Ω na desce, ve výchozím stavu odpojená |
| **Napájecí vstup (+VIN)** | 5-28 V DC (volitelné externí napájení) |
| **Napájecí výstup (+V)** | Pevných 5 V, napájí základní desku CHESTER |
| **Výstup sběrnice** | CANH / CANL na svorkovnici |
| **Rozhraní desky** | Castellated otvory na dvou protilehlých hranách, připájené k základní desce CHESTER |
| **Revize hardwaru** | R1.2 |

## Klíčové součástky {#key-components}

| Součástka | Typové označení | Popis |
| :--- | :--- | :--- |
| **Řadič CAN** | MCP2518FD | Externí řadič CAN FD s rozhraním SPI |
| **Transceiver CAN** | TCAN3413 | Transceiver CAN FD (rozhraní k fyzické sběrnici) |
| **Převodník DC-DC** | TPS62933 | Snižující převodník, vstup 5-28 V DC |
| **Ochrana vstupu** | PMEG6010ELR | Schottkyho diody pro ochranu vstupu |

## Zapojení pinů {#pin-configuration}

Modul používá standardizované rozvržení konektoru kompatibilní se slotem pro rozšiřující moduly CHESTER.

:::note
Zobrazené zapojení pinů platí pro základní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X13 {#chester-x13-connector-pinout}

![Zapojení svorkovnice CHESTER-X13: INT, RH, CANH, CANL, RL, GND, GND, +VIN na pinech 1-8](../../../../../chester/extension-modules/images/tb-chester-x13.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | INT | Výstup | Výstup přerušení k základní desce CHESTER |
| 2 | RH | Terminace CAN | Vývod terminace pro CANH (spojením s CANH zapnete terminaci na desce) |
| 3 | CANH | Sběrnice CAN | Linka sběrnice CAN, high |
| 4 | CANL | Sběrnice CAN | Linka sběrnice CAN, low |
| 5 | RL | Terminace CAN | Vývod terminace pro CANL (spojením s CANL zapnete terminaci na desce) |
| 6 | GND | Zem | Systémová zemní reference |
| 7 | GND | Zem | Systémová zemní reference |
| 8 | +VIN | Napájecí vstup | Volitelný externí stejnosměrný vstup do step-down převodníku na desce (5-28 V DC) |

:::info
Modul může běžet přímo ze základní desky CHESTER. Když je na **+VIN** (pin 8) připojené externí napájení **5-28 V DC**, vytváří step-down převodník TPS62933 na desce pevných **5 V**, kterými se napájí základní deska CHESTER.
:::

### Rozhraní k hostu (SPI) {#host-interface-spi}

Na rozdíl od většiny modulů CHESTER-X (které používají **I²C**) komunikuje CHESTER-X13 se základní deskou CHESTER po **SPI**. Řadič MCP2518FD se řídí přes piny GP slotu modulu:

| Pin CHESTER-X | Funkce SPI | Signál MCP2518FD |
| :--- | :--- | :--- |
| GP0 | SCLK | SCK |
| GP1 | MOSI | SDI |
| GP2 | MISO | SDO |
| GP3 | CS | NCS |

Výstup přerušení (INT) čipu MCP2518FD je vyvedený na svorku **INT** modulu (pin 1). Viz podsekce [Přerušovací pin](#interrupt-pin) níže.

### Přerušovací pin {#interrupt-pin}

MCP2518FD signalizuje události (například přijatý rámec CAN) na svém výstupu přerušení, který je vyvedený na svorku **INT** modulu (pin 1). Toto přerušení **musí být propojené se svorkou INT základní desky CHESTER**, aby ho deska mohla zaznamenat. Na základní desce **CHESTER-M CGLS** přidejte propojovací vodič ze svorkovnice rozšiřujícího modulu na svorku INT základní desky. Zapojení níže je znázorněné pro modul ve **slotu B**; modul v jiném slotu se stejným způsobem připojí ke svorce INT daného slotu.

![Nákres hlavní desky CHESTER s vodičem spojujícím svorku INT slotu B s přerušovacím pinem modulu](../../../../../chester/extension-modules/images/int-pin.png)

* Příklad: zapojení přerušení pro modul ve slotu B (CHESTER-M CGLS).

## Připojení sběrnice CAN {#can-bus-connection}

Sběrnice CAN se zapojuje přímo na piny svorkovnice **CANH** (pin 3) a **CANL** (pin 4). Použijte **kroucenou dvojlinku** s charakteristickou impedancí **120 Ω**, sběrnici veďte v **lineární (řetězové) topologii** — vyhněte se hvězdicovému rozvržení a dlouhým odbočkám — a nekroucenou část kabeláže u svorkovnice udržujte **co nejkratší**.

Rozhraní CAN **není galvanicky oddělené**, takže všechny uzly musí mít společnou zemní referenci. Zem sběrnice **GND** připojte na jeden z pinů GND svorkovnice (pin 6 nebo 7).

### Zakončovací rezistory {#termination-resistors}

Sběrnice CAN musí být na **obou fyzických koncích** zakončená rezistorem **120 Ω** mezi CANH a CANL. CHESTER-X13 má terminaci na desce, která je ve výchozím stavu **odpojená** (uzel v prostředku sběrnice zakončený být nesmí).

Zapněte ji **jen tehdy, když je modul na konci sběrnice**, a to spojením **CANH s RH** (pin 3 s pinem 2) a **CANL s RL** (pin 4 s pinem 5) na svorkovnici.

### Průchod krabičkou {#enclosure-feed-through}

Kabel CAN lze do krabičky přivést dvěma způsoby:

- **Kabelová vývodka (výchozí):** vodiče CAN protáhnete vývodkou ve stěně krabičky a zapojíte do svorkovnice.
- **Konektor do panelu (na vyžádání):** externí konektor ve stěně krabičky umožní uživateli kabel CAN zapojit, bez volné kabeláže vevnitř. Na vyžádání.

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X13 lze použít s různými konfiguracemi základních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Základní deska CHESTER-M CGLS s baterií velikosti D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x13-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska s dvojitým držákem baterií velikosti D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x13-c4.png)

</div>
</div>
</div>

## Použití s CHESTER SDK {#chester-sdk-usage}

CHESTER-X13 lze v rámci CHESTER SDK použít přes shieldy `ctr_x13_a` a `ctr_x13_b`, případně přes funkce [Project Generatoru](/chester/firmware-sdk/how-to-project-generator) `hardware-chester-x13-a` a `hardware-chester-x13-b`.

- [Ukázka použití v SDK](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x13)

## Schémata {#schematic-diagrams}

Kompletní schéma — hlavní strana, rozhraní CAN a napájení — je k dispozici jako PDF:

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x13-r1.2.pdf)
- [Interaktivní prohlížeč CHESTER-X13](pathname:///download/ibom/hio-chester-x13-r1.2.html)

## Výkres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Výkres rozvržení desky CHESTER-X13 R1.2 s rozmístěním součástek a popisky pinů na hranách](../../../../../chester/extension-modules/images/pc-chester-x13.png)

</div>
