---
slug: chester-x14
title: CHESTER-X14 (Ethernet)
description: Drátový rozšiřující modul 10/100 Ethernet pro platformu CHESTER, založený na hardwarovém TCP/IP kontroléru W5500 s podporou TCP a UDP.
keywords: [CHESTER-X14, Ethernet, 10/100 Ethernet, modul Ethernet, W5500, TCP/IP, UDP, RJ-45, drátová konektivita, CHESTER]
---
import Image from '@theme/IdealImage';

# CHESTER-X14 {#chester-x14}

**CHESTER-X14** je drátový rozšiřující modul **10/100 Ethernet** pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">
<div><Image img={require('../../../../../chester/extension-modules/images/chester-x14-top.png')} alt="3D render červené desky CHESTER-X14 R1.0 s kontrolérem W5500 v QFP, Ethernet magnetikou, krystalem 25 MHz a tlumivkou step-down převodníku"/></div>
</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

CHESTER-X14 poskytuje rozhraní Ethernet 10/100 Mb/s založené na hardwarovém TCP/IP kontroléru **W5500**, který integruje MAC i PHY a se základní deskou CHESTER komunikuje po **SPI**. Ethernet magnetika na desce (**ALANL100X1-DE12DT**) zajišťuje galvanické oddělení a úpravu signálu. Diferenciální přijímací a vysílací páry jsou vyvedené na svorkovnici, kam se připojují jednotlivé vodiče Ethernetu.

Modul může běžet přímo ze základní desky CHESTER. Alternativně přivádí externí linka 5-28 V DC na +VIN energii do step-down převodníku **TPS62933** na desce, jehož pevný výstup **5 V** (+V) napájí základní desku CHESTER. Vstup chrání Schottkyho diody (**PMEG6010ELR**). Výstup přerušení signalizuje základní desce CHESTER, že Ethernet kontrolér potřebuje obsluhu.

## Klíčové vlastnosti {#key-features}

* **10/100 Ethernet:** Drátová konektivita založená na hardwarovém TCP/IP kontroléru W5500.
* **Rozhraní k hostu po SPI:** K základní desce CHESTER se připojuje po SPI.
* **Integrovaná magnetika a oddělení:** Ethernet transformátor na desce (ALANL100X1-DE12DT) zajišťuje galvanické oddělení.
* **Flexibilní napájení:** Běží ze základní desky CHESTER, nebo z volitelné linky 5-28 V DC na +VIN.
* **Ochrana vstupu:** Schottkyho diody (PMEG6010ELR) na napájecím vstupu.
* **Výstup přerušení:** Vyhrazená linka přerušení k základní desce CHESTER.
* **Stavové LED:** Indikace linky (zelená) a aktivity (červená) řízená čipem W5500.

## Typické aplikace {#typical-applications}

* **Pevné připojení:** Drátový Ethernet tam, kde není mobilní pokrytí nebo není žádoucí.
* **Průmyslové sítě:** Připojení zařízení CHESTER do místní průmyslové sítě LAN.
* **Automatizace budov:** Drátová páteř pro monitorování budov a provozů.
* **Brány:** Drátový uplink pro uzly sbírající data.

## Technické parametry {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ rozhraní** | Ethernet 10/100 Mb/s |
| **Ethernet kontrolér** | W5500 (hardwarový TCP/IP, integrovaný MAC + PHY) |
| **Rozhraní k hostu** | SPI |
| **Magnetika** | Integrovaná (ALANL100X1-DE12DT) |
| **Galvanické oddělení** | Ano, díky Ethernet magnetice na desce |
| **Napájecí vstup (+VIN)** | 5-28 V DC (volitelné externí napájení) |
| **Napájecí výstup (+V)** | Pevných 5 V, napájí základní desku CHESTER |
| **Výstup Ethernetu** | Diferenciální páry Rx/Tx na svorkovnici |
| **Rozhraní desky** | Castellated otvory na dvou protilehlých hranách, připájené k základní desce CHESTER |
| **Revize hardwaru** | R1.0 |

## Klíčové součástky {#key-components}

| Součástka | Typové označení | Popis |
| :--- | :--- | :--- |
| **Ethernet kontrolér** | W5500 | Vestavěný Ethernet kontrolér s hardwarovým TCP/IP a rozhraním SPI (MAC + PHY) |
| **Ethernet magnetika** | ALANL100X1-DE12DT | Integrovaný LAN transformátor pro rozhraní 10/100 |
| **Převodník DC-DC** | TPS62933 | Snižující převodník, vstup 5-28 V DC |
| **Ochrana vstupu** | PMEG6010ELR | Schottkyho diody pro ochranu vstupu |

## Zapojení pinů {#pin-configuration}

Modul používá standardizované rozvržení konektoru kompatibilní se slotem pro rozšiřující moduly CHESTER.

:::note
Zobrazené zapojení pinů platí pro základní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X14 {#chester-x14-connector-pinout}

![Zapojení svorkovnice CHESTER-X14: INT, +V, +VIN, GND, Rx-, Rx+, Tx-, Tx+ na pinech 1-8](../../../../../chester/extension-modules/images/tb-chester-x14.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | INT | Výstup | Výstup přerušení k základní desce CHESTER |
| 2 | +V | Napájecí výstup | Pevných 5 V ze step-down převodníku na desce (napájí základní desku CHESTER) |
| 3 | +VIN | Napájecí vstup | Volitelný externí stejnosměrný vstup do step-down převodníku na desce (5-28 V DC) |
| 4 | GND | Zem | Systémová zemní reference |
| 5 | Rx- | Ethernet | Přijímací pár (negativní) |
| 6 | Rx+ | Ethernet | Přijímací pár (pozitivní) |
| 7 | Tx- | Ethernet | Vysílací pár (negativní) |
| 8 | Tx+ | Ethernet | Vysílací pár (pozitivní) |

:::info
Modul může běžet přímo ze základní desky CHESTER. Když je na **+VIN** (pin 3) připojené externí napájení **5-28 V DC**, vytváří step-down převodník TPS62933 na desce pevných **5 V** na **+V** (pin 2), kterými se napájí základní deska CHESTER.
:::

### Rozhraní k hostu (SPI) {#host-interface-spi}

Na rozdíl od většiny modulů CHESTER-X (které používají **I²C**) komunikuje CHESTER-X14 se základní deskou CHESTER po **SPI**. Kontrolér W5500 se řídí přes piny GP slotu modulu:

| Pin CHESTER-X | Funkce SPI | Signál W5500 |
| :--- | :--- | :--- |
| GP0 | MISO | ETH_MISO |
| GP1 | MOSI | ETH_MOSI |
| GP2 | SCLK | ETH_SCLK |
| GP3 | CS | ETH_CS |

Výstup přerušení (INTn) čipu W5500 je vyvedený na svorku **INT** modulu (pin 1). Viz podsekce [Přerušovací pin](#interrupt-pin) níže.

### Přerušovací pin {#interrupt-pin}

W5500 signalizuje události (například přicházející paket) na svém výstupu přerušení, který je vyvedený na svorku **INT** modulu (pin 1). Toto přerušení **musí být propojené se svorkou INT základní desky CHESTER**, aby ho deska mohla zaznamenat. Na základní desce **CHESTER-M CGLS** přidejte propojovací vodič ze svorkovnice rozšiřujícího modulu na svorku INT základní desky. Zapojení níže je znázorněné pro modul ve **slotu B**; modul v jiném slotu se stejným způsobem připojí ke svorce INT daného slotu.

![Nákres hlavní desky CHESTER s vodičem spojujícím svorku INT slotu B s přerušovacím pinem modulu](../../../../../chester/extension-modules/images/int-pin.png)

* Příklad: zapojení přerušení pro modul ve slotu B (CHESTER-M CGLS).

## Připojení Ethernetu {#ethernet-connection}

Ethernet magnetika je na modulu, takže se jednotlivé vodiče Ethernetu zapojují přímo na piny svorkovnice (**Rx-**, **Rx+**, **Tx-**, **Tx+**). **Externí magnetika není potřeba**, protože magnetika na desce zajišťuje i **galvanické oddělení** rozhraní Ethernet.

Každý diferenciální pár (Rx a Tx) veďte jako **kroucenou dvojlinku** kabelem **Cat5e** nebo lepším a nekroucenou část kabeláže u svorkovnice udržujte **co nejkratší**. Standardní linky 10/100BASE-TX (které W5500 používá) zvládnou kabel až **100 m**.

Kabel Ethernetu zapojte do svorkovnice podle tabulky níže. Pin RJ-45 a barva vodiče odpovídají standardu **T568B**; pin CHESTER-X14 je převzatý z tabulky zapojení výše.

| Pin RJ-45 | Vodič (T568B) | Signál Ethernetu | Pin CHESTER-X14 |
| :---: | :--- | :--- | :---: |
| 1 | Bílo-oranžový | ETH_TD+ (Tx+) | 8 |
| 2 | Oranžový | ETH_TD- (Tx-) | 7 |
| 3 | Bílo-zelený | ETH_RD+ (Rx+) | 6 |
| 6 | Zelený | ETH_RD- (Rx-) | 5 |
| 8 | Hnědý | ETH_GND (GND) | 4 |

### Průchod krabičkou {#enclosure-feed-through}

Kabel Ethernetu lze do krabičky přivést dvěma způsoby:

- **Kabelová vývodka (výchozí):** izolované vodiče Ethernetu protáhnete vývodkou ve stěně krabičky a zapojíte do svorkovnice.
- **Konektor RJ-45 do panelu (na vyžádání):** externí zdířka RJ-45 ve stěně krabičky umožní uživateli zapojit standardní ethernetový kabel, bez volné kabeláže vevnitř. Na vyžádání.

## Stavové LED {#status-leds}

Dvě stavové LED jsou pod potiskem **HARDWARIO.COM** v levém horním rohu desky. Obě řídí přímo kontrolér W5500:

| LED | Signál W5500 | Barva | Funkce |
| :--- | :--- | :--- | :--- |
| **LED1** | ACTLED | Červená | Aktivita Ethernetu: přepíná se při vysílání nebo příjmu rámců |
| **LED2** | LINKLED | Zelená | Linka Ethernetu: svítí, když je navázané spojení se sítí |

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X14 lze použít s různými konfiguracemi základních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Základní deska CHESTER-M CGLS s baterií velikosti D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x14-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska s dvojitým držákem baterií velikosti D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x14-c4.png)

</div>
</div>
</div>

## Použití s CHESTER SDK {#chester-sdk-usage}

CHESTER-X14 lze v rámci CHESTER SDK použít přes shieldy `ctr_x14_a` a `ctr_x14_b`, případně přes funkce [Project Generatoru](/chester/firmware-sdk/how-to-project-generator) `hardware-chester-x14-a` a `hardware-chester-x14-b`.

- [Ukázka použití v SDK](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x14)

## Schémata {#schematic-diagrams}

Kompletní schéma — hlavní strana, rozhraní Ethernet a napájení — je k dispozici jako PDF:

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x14-r1.0.pdf)
- [Interaktivní prohlížeč CHESTER-X14](pathname:///download/ibom/hio-chester-x14-r1.0.html)

## Výkres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Výkres rozvržení desky CHESTER-X14 R1.0 s rozmístěním součástek a popisky pinů na hranách](../../../../../chester/extension-modules/images/pc-chester-x14.png)

</div>
