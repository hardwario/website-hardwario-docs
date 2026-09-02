---
slug: chester-x14
title: CHESTER-X14 (Ethernet)
description: Drátový rozšiřující modul 10/100 Ethernet pro platformu CHESTER, založený na hardwarovém TCP/IP kontroléru W5500 s podporou TCP a UDP.
keywords: [CHESTER-X14, Ethernet, 10/100 Ethernet, Ethernet modul, W5500, TCP/IP, UDP, RJ-45, drátová konektivita, CHESTER]
---

# CHESTER-X14 {#chester-x14}

**CHESTER-X14** je drátový rozšiřující modul **10/100 Ethernet** pro platformu CHESTER.

<div class="container">
<div class="row">
<div class="col col--4">

![3D render červené desky CHESTER-X14 R1.0 s kontrolérem W5500 v QFP, Ethernet magnetikou, krystalem 25 MHz a tlumivkou step-down převodníku](../../../../../chester/extension-modules/images/chester-x14-top.png)

</div>
<div class="col col--10">
</div>
</div>
</div>

## Přehled modulu {#module-overview}

CHESTER-X14 poskytuje rozhraní Ethernet 10/100 Mbps založené na hardwarovém TCP/IP kontroléru **W5500**, který integruje MAC i PHY a s hlavní deskou CHESTER komunikuje po **SPI**. Ethernet magnetika na desce (**ALANL100X1-DE12DT**) zajišťuje galvanické oddělení a úpravu signálu. Diferenciální přijímací a vysílací páry jsou vyvedeny na svorkovnici, kde se připojují jednotlivé vodiče Ethernetu.

Modul může být napájen přímo z hlavní desky CHESTER. Alternativně externí linka 5-28 VDC na +VIN napájí step-down převodník **TPS62933** na desce, jehož pevný výstup **5 V** (+V) napájí hlavní desku CHESTER. Schottkyho diody (**PMEG6010ELR**) chrání vstup. Přerušovací výstup signalizuje hlavní desce CHESTER, že Ethernet kontrolér vyžaduje obsluhu.

## Klíčové vlastnosti {#key-features}

* **10/100 Ethernet:** Drátová konektivita založená na hardwarovém TCP/IP kontroléru W5500.
* **Hostitelské rozhraní SPI:** Připojení k hlavní desce CHESTER po SPI.
* **Integrovaná magnetika a izolace:** Ethernet transformátor na desce (ALANL100X1-DE12DT) zajišťuje galvanické oddělení.
* **Flexibilní napájení:** Provoz z hlavní desky CHESTER nebo z volitelné linky 5-28 VDC na +VIN.
* **Ochrana vstupu:** Schottkyho diody (PMEG6010ELR) na napájecím vstupu.
* **Přerušovací výstup:** Dedikovaná přerušovací linka k hlavní desce CHESTER.
* **Stavové LED:** Indikace linku (zelená) a aktivity (červená) řízená obvodem W5500.

## Typické aplikace {#typical-applications}

* **Konektivita po pevné lince:** Drátový Ethernet tam, kde není dostupné nebo žádoucí mobilní pokrytí.
* **Průmyslové sítě:** Připojení zařízení CHESTER do místní průmyslové LAN.
* **Automatizace budov:** Drátová páteř pro monitoring budov a zařízení.
* **Brány:** Drátový uplink pro sběrné uzly dat.

## Technické specifikace {#technical-specifications}

| Parametr | Hodnota |
| :--- | :--- |
| **Typ rozhraní** | Ethernet 10/100 Mbps |
| **Ethernet kontrolér** | W5500 (hardwarový TCP/IP, integrovaný MAC + PHY) |
| **Hostitelské rozhraní** | SPI |
| **Magnetika** | Integrovaná (ALANL100X1-DE12DT) |
| **Galvanické oddělení** | Ano, díky Ethernet magnetice na desce |
| **Napájecí vstup (+VIN)** | 5-28 VDC (volitelné externí napájení) |
| **Napájecí výstup (+V)** | Pevných 5 V, napájí hlavní desku CHESTER |
| **Výstup Ethernetu** | Diferenciální páry Rx/Tx na svorkovnici |
| **Konektor** | Standardní header s rozestupem 2.54 mm (pájený) |
| **Revize hardwaru** | R1.0 |

## Klíčové součástky {#key-components}

| Součástka | Označení | Popis |
| :--- | :--- | :--- |
| **Ethernet kontrolér** | W5500 | Hardwarový TCP/IP embedded Ethernet kontrolér s rozhraním SPI (MAC + PHY) |
| **Ethernet magnetika** | ALANL100X1-DE12DT | Integrovaný LAN transformátor pro rozhraní 10/100 |
| **DC-DC převodník** | TPS62933 | Step-down převodník, vstup 5-28 VDC |
| **Ochrana vstupu** | PMEG6010ELR | Schottkyho diody pro ochranu vstupu |

## Konfigurace pinů {#pin-configuration}

Modul používá standardizované rozložení headeru kompatibilní s rozšiřujícími slotmi CHESTER.

:::note
Zobrazená konfigurace pinů platí pro hlavní desku CHESTER-M CGLS.
:::

### Zapojení konektoru CHESTER-X14 {#chester-x14-connector-pinout}

![Zapojení svorkovnice CHESTER-X14: INT, +V, +VIN, GND, Rx-, Rx+, Tx-, Tx+ na pinech 1-8](../../../../../chester/extension-modules/images/tb-chester-x14.png)

| Pin | Signál | Typ | Popis |
| :---: | :--- | :--- | :--- |
| 1 | INT | Výstup | Přerušovací výstup do hlavní desky CHESTER |
| 2 | +V | Napájecí výstup | Pevných 5 V ze step-down převodníku na desce (napájí hlavní desku CHESTER) |
| 3 | +VIN | Napájecí vstup | Volitelný externí DC vstup do step-down převodníku na desce (5-28 VDC) |
| 4 | GND | Zem | Referenční zem systému |
| 5 | Rx- | Ethernet | Přijímací pár (negativní) |
| 6 | Rx+ | Ethernet | Přijímací pár (pozitivní) |
| 7 | Tx- | Ethernet | Vysílací pár (negativní) |
| 8 | Tx+ | Ethernet | Vysílací pár (pozitivní) |

:::info
Modul může být napájen přímo z hlavní desky CHESTER. Když je na **+VIN** (pin 3) připojeno externí napájení **5-28 VDC**, step-down převodník TPS62933 na desce vytváří pevných **5 V** na **+V** (pin 2), které napájí hlavní desku CHESTER.
:::

### Hostitelské rozhraní (SPI) {#host-interface-spi}

Na rozdíl od většiny modulů CHESTER-X (které používají **I²C**) komunikuje CHESTER-X14 s hlavní deskou CHESTER po **SPI**. Kontrolér W5500 je řízen přes piny GP daného slotu modulu:

| Pin CHESTER-X | Funkce SPI | Signál W5500 |
| :--- | :--- | :--- |
| GP0 | MISO | ETH_MISO |
| GP1 | MOSI | ETH_MOSI |
| GP2 | SCLK | ETH_SCLK |
| GP3 | CS | ETH_CS |

Přerušovací výstup obvodu W5500 (INTn) je vyveden na svorku **INT** modulu (pin 1). Viz podsekce [Přerušovací pin](#interrupt-pin) níže.

### Přerušovací pin {#interrupt-pin}

Obvod W5500 signalizuje události (například příchozí paket) na svém přerušovacím výstupu, který je vyveden na svorku **INT** modulu (pin 1). Toto přerušení **musí být připojeno ke svorce INT hlavní desky CHESTER**, aby ho hlavní deska mohla detekovat. Na hlavní desce **CHESTER-M CGLS** přidejte propojovací vodič ze svorkovnice rozšiřujícího modulu ke svorce INT hlavní desky. Zapojení níže je zobrazeno pro modul ve **slotu B**; modul v jiném slotu se stejným způsobem připojuje ke svorce INT daného slotu.

![Nákres hlavní desky CHESTER s vodičem spojujícím svorku INT slotu B s přerušovacím pinem modulu](../../../../../chester/extension-modules/images/int-pin.png)

* Příklad: zapojení přerušení pro modul ve slotu B (CHESTER-M CGLS).

## Připojení Ethernetu {#ethernet-connection}

Ethernet magnetika se nachází na modulu, takže jednotlivé vodiče Ethernetu se zapojují přímo na piny svorkovnice (**Rx-**, **Rx+**, **Tx-**, **Tx+**). **Externí magnetika není potřeba**, protože magnetika na desce zajišťuje také **galvanické oddělení** rozhraní Ethernet.

Každý diferenciální pár (Rx a Tx) veďte jako **twistovaný pár** kabelem **Cat5e** nebo lepším a netwistované vedení u svorkovnice udržujte **co nejkratší**. Standardní linky 10/100BASE-TX (které W5500 používá) podporují délku kabelu až **100 m**.

Ethernet kabel zapojte na svorkovnici podle níže uvedené tabulky. Pin RJ-45 a barva vodiče odpovídají standardu **T568B**; pin CHESTER-X14 je převzat z tabulky zapojení výše.

| Pin RJ-45 | Vodič (T568B) | Signál Ethernetu | Pin CHESTER-X14 |
| :---: | :--- | :--- | :---: |
| 1 | Bílo-oranžová | ETH_TD+ (Tx+) | 8 |
| 2 | Oranžová | ETH_TD- (Tx-) | 7 |
| 3 | Bílo-zelená | ETH_RD+ (Rx+) | 6 |
| 6 | Zelená | ETH_RD- (Rx-) | 5 |
| 8 | Hnědá | ETH_GND (GND) | 4 |

### Průchod krabičkou {#enclosure-feed-through}

Ethernet kabel lze do krabičky přivést dvěma způsoby:

- **Kabelová průchodka (výchozí):** izolované vodiče Ethernetu protáhněte kabelovou průchodkou ve stěně krabičky a zapojte je na svorkovnici.
- **Panelový konektor RJ-45 (na vyžádání):** externí zdířka RJ-45 ve stěně krabičky umožňuje připojit standardní Ethernet kabel bez volného vedení uvnitř. Dostupné na vyžádání.

## Stavové LED {#status-leds}

Dvě stavové LED jsou umístěny pod potiskem **HARDWARIO.COM** v levém horním rohu desky. Obě jsou řízeny přímo kontrolérem W5500:

| LED | Signál W5500 | Barva | Funkce |
| :--- | :--- | :--- | :--- |
| **LED1** | ACTLED | Červená | Aktivita Ethernetu: přepíná se při vysílání nebo přijímání rámců |
| **LED2** | LINKLED | Zelená | Link Ethernetu: svítí, když je navázán link se sítí |

## Kompatibilní konfigurace CHESTER {#compatible-chester-configurations}

Modul CHESTER-X14 lze použít s různými konfiguracemi hlavních desek CHESTER. Níže jsou příklady kompatibilních sestav:

<div class="container">
<div class="row">
<div class="col col--6">
<h4>CHESTER-M (CGLS)</h4>

![Hlavní deska CHESTER-M CGLS s baterií typu D, superkondenzátory a svorkovnicemi A/B](../../../../../chester/extension-modules/images/chester-x14-cgls.png)

</div>
<div class="col col--6">
<h4>CHESTER-C4</h4>

![Nosná deska CHESTER-C4, modrá deska PCB s dvojitým držákem baterií typu D a svorkovnicemi](../../../../../chester/extension-modules/images/chester-x14-c4.png)

</div>
</div>
</div>

## Použití v CHESTER SDK {#chester-sdk-usage}

CHESTER-X14 lze v rámci CHESTER SDK použít pomocí shieldů `ctr_x14_a` a `ctr_x14_b`, nebo funkcí [Project Generatoru](/chester/firmware-sdk/how-to-project-generator) `hardware-chester-x14-a` a `hardware-chester-x14-b`.

- [Příklad použití SDK](https://github.com/hardwario/chester-sdk/tree/main/samples/chester_x14)

## Schémata {#schematic-diagrams}

Následující schémata zobrazují vnitřní zapojení modulu na třech listech: hlavní stránka, rozhraní Ethernet a napájení.

- [Schéma (PDF)](../../../../../chester/extension-modules/schematics/hio-chester-x14-r1.0.pdf)
- [Interaktivní prohlížeč konektorů, součástek, testovacích bodů a signálů PCB](pathname:///download/ibom/hio-chester-x14-r1.0.html)

### Hlavní stránka {#main-page}

![Schéma hlavní stránky CHESTER-X14: konektor modulu CHESTER-X s mapováním signálů svorkovnice (TD+, TD-, RD+, RD-, GND, VIN+, V+, INT), piny SPI GP0-GP3 (MISO, MOSI, SCLK, CS) a barvy vodičů RJ-45](../../../../../chester/extension-modules/images/hio-chester-x14-r1.0-1.png)

### Ethernet {#ethernet}

![Schéma Ethernetu CHESTER-X14: kontrolér MAC/PHY W5500 s krystalem 25 MHz, LED linku a aktivity a magnetika ALANL100X1-DE12DT](../../../../../chester/extension-modules/images/hio-chester-x14-r1.0-2.png)

### Napájení {#power}

![Schéma napájení CHESTER-X14: step-down převodník TPS62933 (výstup 5 V) se vstupními a výstupními Schottkyho diodami PMEG6010ELR](../../../../../chester/extension-modules/images/hio-chester-x14-r1.0-3.png)

## Nákres modulu {#module-drawing}

<div style={{ maxWidth: '500px' }}>

![Nákres rozložení desky CHESTER-X14 R1.0 s osazením součástek a popisky pinů na hraně](../../../../../chester/extension-modules/images/pc-chester-x14.png)

</div>
