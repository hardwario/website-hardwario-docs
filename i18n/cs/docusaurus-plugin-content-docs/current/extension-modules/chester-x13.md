---
slug: chester-x13
title: CHESTER-X13 (CAN Bus)
description: Rozšiřující modul CAN a CAN FD pro platformu CHESTER, založený na řadiči MCP2518FD a transceiveru TCAN3413, s terminací sběrnice na desce.
keywords: [CHESTER-X13, CAN, CAN FD, CAN Bus, CANbus, MCP2518FD, TCAN3413, SPI, terminace sběrnice, drátová konektivita, CHESTER]
---

# CHESTER-X13 {#chester-x13}

**CHESTER-X13** je rozšiřující modul **CAN Bus** s podporou **CAN FD** pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">

![3D render červené desky CHESTER-X13 R1.2 s řadičem CAN MCP2518FD, krystalem 20 MHz, transceiverem TCAN3413 a tlumivkou step-down převodníku](../../../../../chester/extension-modules/images/chester-x13-top.png)

</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

CHESTER-X13 poskytuje rozhraní **CAN / CAN FD** založené na externím řadiči CAN **MCP2518FD**, který komunikuje s hlavní deskou CHESTER přes **SPI**. Fyzickou sběrnici budí transceiver **TCAN3413** na desce a linky **CANH** / **CANL** jsou vyvedeny na svorkovnici. Zakončovací rezistory sběrnice jsou na desce k dispozici, ale ve výchozím stavu odpojené, takže modul může být umístěn kdekoli na sběrnici.

Modul může být napájen přímo z hlavní desky CHESTER. Alternativně externí linka 5-28 VDC na +VIN napájí step-down převodník **TPS62933** na desce, jehož pevný výstup **5 V** napájí hlavní desku CHESTER. Vstup chrání Schottkyho diody (**PMEG6010ELR**). Výstup přerušení signalizuje hlavní desce CHESTER, že řadič CAN vyžaduje pozornost.

## Klíčové vlastnosti {#key-features}

* **CAN a CAN FD:** Drátová konektivita založená na řadiči CAN MCP2518FD.
* **Hostitelské rozhraní SPI:** Připojení k hlavní desce CHESTER přes SPI.
* **Transceiver na desce:** Transceiver TCAN3413 budí fyzickou sběrnici CAN.
* **Volitelná terminace sběrnice:** Terminace ~120 Ω na desce, ve výchozím stavu odpojená.
* **Flexibilní napájení:** Z hlavní desky CHESTER, nebo z volitelné linky 5-28 VDC na +VIN.
* **Ochrana vstupu:** Schottkyho diody (PMEG6010ELR) na napájecím vstupu.
* **Výstup přerušení:** Dedikovaná linka přerušení k hlavní desce CHESTER.

## Typické aplikace {#typical-applications}

* **Průmyslové sítě CAN:** Připojení zařízení CHESTER ke sběrnici CAN / CAN FD.
* **Monitorování strojů a zařízení:** Čtení dat ze zařízení s rozhraním CAN.
* **Mobilní stroje a vozidla:** Telemetrie zemědělských, stavebních a dalších mobilních strojů.
* **Energetické systémy:** Monitorování generátorů, invertorů a bateriových systémů s rozhraním CAN.
* **Dodatečný sběr dat:** Odběr dat z existující sběrnice CAN.

## Technické specifikace {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ rozhraní** | CAN / CAN FD |
| **Bitová rychlost** | Až 1 Mbit/s (klasický CAN), až 5 Mbit/s (CAN FD) |
| **Řadič CAN** | MCP2518FD (externí, SPI) |
| **Transceiver CAN** | TCAN3413 |
| **Hostitelské rozhraní** | SPI |
| **Terminace sběrnice** | ~120 Ω na desce, ve výchozím stavu odpojená |
| **Napájecí vstup (+VIN)** | 5-28 VDC (volitelné externí napájení) |
| **Napájecí výstup (+V)** | Pevných 5 V, napájí hlavní desku CHESTER |
| **Výstup sběrnice** | CANH / CANL na svorkovnici |
| **Konektor** | Standardní header s rozestupem 2,54 mm (pájený) |
| **Revize hardwaru** | R1.2 |

## Klíčové komponenty {#key-components}

| Komponenta | Označení | Popis |
| :--- | :--- | :--- |
| **Řadič CAN** | MCP2518FD | Externí řadič CAN FD s rozhraním SPI |
| **Transceiver CAN** | TCAN3413 | Transceiver CAN FD (rozhraní fyzické sběrnice) |
| **DC-DC převodník** | TPS62933 | Step-down převodník, vstup 5-28 VDC |
| **Ochrana vstupu** | PMEG6010ELR | Schottkyho diody pro ochranu vstupu |

## Konfigurace pinů {#pin-configuration}

Modul používá standardizované rozložení headeru kompatibilní s rozšiřujícími slty CHESTER.

:::note
Zobrazená konfigurace pinů platí pro hlavní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X13 {#chester-x13-connector-pinout}

![Zapojení svorkovnice CHESTER-X13: INT, RH, CANH, CANL, RL, GND, GND, +VIN na pinech 1-8](../../../../../chester/extension-modules/images/tb-chester-x13.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | INT | Výstup | Výstup přerušení k hlavní desce CHESTER |
| 2 | RH | Terminace CAN | Odbočka terminace pro CANH (spojte s CANH pro zapnutí terminace na desce) |
| 3 | CANH | Sběrnice CAN | Linka sběrnice CAN, high |
| 4 | CANL | Sběrnice CAN | Linka sběrnice CAN, low |
| 5 | RL | Terminace CAN | Odbočka terminace pro CANL (spojte s CANL pro zapnutí terminace na desce) |
| 6 | GND | Zem | Referenční zem systému |
| 7 | GND | Zem | Referenční zem systému |
| 8 | +VIN | Napájecí vstup | Volitelný externí vstup DC pro step-down na desce (5-28 VDC) |

:::info
Modul může být napájen přímo z hlavní desky CHESTER. Když je k **+VIN** (pin 8) připojeno externí napájení **5-28 VDC**, step-down převodník TPS62933 na desce vytváří pevných **5 V**, které napájejí hlavní desku CHESTER.
:::

### Hostitelské rozhraní (SPI) {#host-interface-spi}

Na rozdíl od většiny modulů CHESTER-X (které používají **I²C**) komunikuje CHESTER-X13 s hlavní deskou CHESTER přes **SPI**. Řadič MCP2518FD je řízen přes piny GP slotu modulu:

| Pin CHESTER-X | Funkce SPI | Signál MCP2518FD |
| :--- | :--- | :--- |
| GP0 | SCLK | SCK |
| GP1 | MOSI | SDI |
| GP2 | MISO | SDO |
| GP3 | CS | NCS |

Výstup přerušení MCP2518FD (INT) je vyveden na svorku **INT** modulu (pin 1). Viz podsekce [Pin přerušení](#interrupt-pin) níže.

### Pin přerušení {#interrupt-pin}

MCP2518FD signalizuje události (například přijatý rámec CAN) na svém výstupu přerušení, který je vyveden na svorku **INT** modulu (pin 1). Toto přerušení **musí být připojeno ke svorce INT hlavní desky CHESTER**, aby jej hlavní deska mohla detekovat. Na hlavní desce **CHESTER-M CGLS** přidejte propojovací vodič ze svorkovnice rozšiřujícího modulu na svorku INT hlavní desky. Zapojení níže je zobrazeno pro modul ve **slotu B**; modul v jiném slotu se stejným způsobem připojuje ke svorce INT daného slotu.

![Nákres hlavní desky CHESTER s vodičem spojujícím svorku INT slotu B s pinem přerušení modulu](../../../../../chester/extension-modules/images/int-pin.png)

* Příklad: zapojení přerušení pro modul ve slotu B (CHESTER-M CGLS).

## Připojení sběrnice CAN {#can-bus-connection}

Sběrnice CAN se zapojuje přímo na piny svorkovnice **CANH** (pin 3) a **CANL** (pin 4). Použijte kabel s **kroucenou dvojlinkou** s charakteristickou impedancí **120 Ω**, sběrnici zapojte v **lineární (řetězové) topologii** — vyhněte se hvězdicovému rozložení a dlouhým odbočkám — a jakékoli nekroucené vedení u svorkovnice udržujte **co nejkratší**.

Rozhraní CAN **není galvanicky oddělené**, takže všechny uzly musí mít společnou referenční zem. Připojte **GND** sběrnice na jeden z pinů GND svorkovnice (pin 6 nebo 7).

### Zakončovací rezistory {#termination-resistors}

Sběrnice CAN musí být zakončena rezistorem **120 Ω** mezi CANH a CANL na **obou fyzických koncích** sběrnice. CHESTER-X13 poskytuje terminaci na desce, která je **ve výchozím stavu odpojená** (uzel uprostřed sběrnice nesmí být zakončen).

Zapněte ji **pouze tehdy, když je modul na konci sběrnice**, spojením **CANH s RH** (pin 3 s pinem 2) a **CANL s RL** (pin 4 s pinem 5) na svorkovnici.

### Průchod krabičkou {#enclosure-feed-through}

Kabel CAN lze do krabičky přivést dvěma způsoby:

- **Kabelová průchodka (výchozí):** vodiče CAN veďte kabelovou průchodkou ve stěně krabičky a zapojte je na svorkovnici.
- **Konektor pro montáž do panelu (na vyžádání):** externí konektor ve stěně krabičky umožňuje uživateli kabel CAN zapojit bez volného vedení uvnitř. Dostupné na vyžádání.

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X13 lze použít s různými konfiguracemi hlavních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Hlavní deska CHESTER-M CGLS s baterií typu D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x13-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska PCB s dvojitým držákem baterií typu D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x13-c4.png)

</div>
</div>
</div>

## Použití v CHESTER SDK {#chester-sdk-usage}

CHESTER-X13 lze používat v rámci CHESTER SDK pomocí shieldů `ctr_x13_a` a `ctr_x13_b`, případně funkcí `hardware-chester-x13-a` a `hardware-chester-x13-b` v [Project Generatoru](/chester/firmware-sdk/how-to-project-generator).

- [Příklad použití SDK](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x13)

## Schémata {#schematic-diagrams}

Následující schémata zobrazují vnitřní zapojení modulu na jeho třech listech: hlavní stránka, rozhraní CAN a napájení.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x13-r1.2.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů PCB](pathname:///download/ibom/hio-chester-x13-r1.2.html)

### Hlavní stránka {#main-page}

![Schéma hlavní stránky CHESTER-X13: konektor modulu CHESTER-X mapující signály svorkovnice (INT, RH, CANH, CANL, RL, GND, +VIN) a piny SPI GP0-GP3 (SCK, SDI, SDO, NCS)](../../../../../chester/extension-modules/images/hio-chester-x13-r1.2-1.png)

### CAN {#can}

![Schéma CAN CHESTER-X13: řadič CAN FD MCP2518FD s krystalem 20 MHz, transceiver TCAN3413 a dělené zakončovací rezistory sběrnice](../../../../../chester/extension-modules/images/hio-chester-x13-r1.2-3.png)

### Napájení {#power}

![Schéma napájení CHESTER-X13: step-down převodník TPS62933 se vstupními a výstupními Schottkyho diodami PMEG6010ELR](../../../../../chester/extension-modules/images/hio-chester-x13-r1.2-2.png)

## Nákres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Nákres rozložení desky CHESTER-X13 R1.2 s umístěním součástek a popisky pinů na hraně](../../../../../chester/extension-modules/images/pc-chester-x13.png)

</div>
