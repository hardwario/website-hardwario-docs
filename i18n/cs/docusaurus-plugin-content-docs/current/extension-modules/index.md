---
slug: extension-modules
title: Rozšiřující moduly
description: "Rozhraní základní desky CHESTER a rozšiřující moduly CHESTER-X, které přidávají vstupy pro senzory, I/O, napájení a možnosti připojení."
---
import Image from '@theme/IdealImage';

# Rozšiřující moduly {#extension-modules}

Základní deska CHESTER (CHESTER-M) obsahuje tato integrovaná rozhraní a periferie:

* Sběrnice I<sup>2</sup>C (včetně systému Sparkfun Qwiic Connect System)
* Sběrnice 1-Wire (s hardwarovým budičem sběrnice se silným pull-upem)
* Digitální teploměr I<sup>2</sup>C
* Tříosý akcelerometr MEMS
* Paměť NOR flash 8 MB
* Tříbarevná RGY LED
* Tlačítko

Klíčovou vlastností systému CHESTER je jeho hardwarová flexibilita daná širokou nabídkou rozšiřujících modulů. Tyto moduly se buď pájí ze spodní strany základní desky (k dispozici jsou dva sloty A+B), nebo se připojují přes systémovou sběrnici I2C (např. u modulů instalovaných v horním krytu krabičky).

:::tip

U varianty CHESTER DevKit lze moduly určené pro zadní stranu základní desky instalovat pomocí pružinových konektorů. Rozhraní tak můžete během vývoje rychle měnit. Pro ostré nasazení však důrazně doporučujeme moduly připájené přímo k základní desce (připájí je HARDWARIO).

:::

## Moduly na zadní straně {#backside-modules}

Moduly na zadní straně (na obrázku níže červeně) rozšiřují zařízení CHESTER o další rozhraní.
Modulární je i vývoj v CHESTER-SDK: každý modul má vlastní ovladač pro ZephyrRTOS, takže se snadno integruje.

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('../../../../../chester/extension-modules/images/explode-view.png')} alt="Rozložený pohled na CHESTER: kryty krabičky, základní deska s baterií a dva červené rozšiřující moduly na zadní straně"/></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>
<br />

Když modul **X** osadíte do levého slotu **„A“**, jeho signály se vyvedou na dvě levé svorkovnice **TB1** a **TB2** (viz modrý čtverec na obrázku níže).
Obě levé svorkovnice **TB1** a **TB2** jsou propojené paralelně, takže ke stejnému signálu nebo napájení snáze připojíte více senzorů.

Totéž platí pro pravý slot **„B“** a svorkovnice **TB5** a **TB6** (viz zelený čtverec na obrázku níže).

Je-li zařízení CHESTER v krabičce, můžete po vyjmutí baterie přes malé otvory zkontrolovat číslo modulu **„X_“** a revizi hardwaru **„R1.0“** (viz dvě oranžová kolečka na obrázku níže).

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('../../../../../chester/extension-modules/images/documentation-top.png')} alt="Nákres CHESTER-M: svorkovnice TB1/TB2 slotu A modře, svorkovnice TB5/TB6 slotu B zeleně, kontrolní otvory oranžově"/></div>
    </div>
    <div class="col col--8">
    </div>
  </div>
</div>
<br />

| Název modulu                      | Popis modulu                                                                                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**CHESTER-X0A**](chester-x0.md)  | Až 4 digitální a analogové vstupy a výstupy, kanály proudové smyčky 4-20 mA, napěťové vstupy 0-10 V, bezpotenciálový kontakt, vstup NPN nebo PNP, se zvyšujícím měničem 5 V. |
| [**CHESTER-X0B**](chester-x0.md)  | Až 4 digitální a analogové vstupy a výstupy, kanály proudové smyčky 4-20 mA, napěťové vstupy 0-10 V, bezpotenciálový kontakt, vstup NPN nebo PNP, bez zvyšujícího měniče 5 V.   |
| [**CHESTER-X1**](chester-x1.md)   | Až osm kanálů 1-Wire (např. pro digitální teplotní senzory Dallas DS18B20)                                                                                 |
| [**CHESTER-X2**](chester-x2.md)   | Rozhraní TTL/UART i RS-485 (např. pro komunikaci Modbus)                                                                                               |
| [**CHESTER-X3A**](chester-x3.md)  | Až 2 senzory RTD (odporové teplotní senzory), například Pt 100 a Pt 1000                                                                                   |
| [**CHESTER-X3B**](chester-x3.md)  | Až 2 termočlánkové kanály (typ B/C/E/J/K/N/R/S/T)                                                                                                            |
| [**CHESTER-X3C**](chester-x3.md)  | Až 2 kanály pro tenzometrické snímače (load cell) k měření hmotnosti                                                                                |
| [**CHESTER-X4**](chester-x4.md)   | DC/DC měnič pro napájení z externí linky 6-28 VDC (s měřením vstupního napětí)                                                               |
| [**CHESTER-X5**](chester-x5.md)   | Dvoukanálové izolované analogové vstupy pro měření napětí +/- 50 V                                                                                               |
| [**CHESTER-X6**](chester-x6.md)   | Rozhraní pro náš vlastní protokol S-Wire určený pro periferie s nízkou spotřebou                                                                                |
| [**CHESTER-X7**](chester-x7.md)   | Jednokanálový převodník s diferenciálním vstupem a softwarově řízeným zvyšujícím měničem 5 V pro proudové sondy a další průmyslové senzory                                |
| [**CHESTER-X8**](chester-x8.md)   | Ultrapřesný akcelerometr                                                                                                                                       |
| [**CHESTER-X9**](chester-x9.md)   | Čtyřkanálový výstupní modul s chytrým chráněným spínačem pro ovládání relé a solenoidů                                                                          |
| [**CHESTER-X10**](chester-x10.md) | DC/DC měnič + nabíječka Li-Po pro napájení z externí linky 6-30 VDC (s měřením vstupního napětí)                                               |
| [**CHESTER-X12**](chester-x12.md) | Sériové rozhraní RS-232 s vyhrazeným napájecím vstupem 5-28 VDC pro průmyslová sériová zařízení a starší techniku                                  |
| [**CHESTER-X13**](chester-x13.md) | Rozhraní sběrnice CAN s podporou CAN FD a vestavěným snižujícím měničem (až 28 V)                                                                             |
| [**CHESTER-X14**](chester-x14.md) | Připojení Ethernet 10/100 s vestavěným snižujícím měničem (až 28 V)                                                                                     |
| [**CHESTER-K1**](chester-k1.md)   | Čtyřkanálový převodník s diferenciálním vstupem a softwarově řízeným zvyšujícím měničem 5 V pro proudové sondy a další průmyslové senzory                                |

## Moduly do krytu {#cover-modules}

| Název modulu                      | Popis modulu                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHESTER-A1                        | AC/DC měnič pro napájení 110/230 V                                                                                                          |
| CHESTER-A1A                       | AC/DC měnič pro napájení 110/230 V se dvěma výkonovými relé 230V/16A                                                                                           |
| CHESTER-G1                        | Osmikanálový galvanicky oddělený vstupní modul s izolovaným DC/DC napájením                                                                                       |
| CHESTER-S1                        | Modul pro monitorování prostředí se senzory teploty, vlhkosti, oxidu uhličitého (CO2), osvětlenosti, atmosférického tlaku, hluku a pohybu (PIR)            |
| [**CHESTER-Z1**](chester-z1.md)   | Modul záložního napájení z baterie Li-Ion s DC/DC měničem a nabíječkou, vstup z linky 6-28 VDC nebo 12V solárního panelu                                                               |
| [**CHESTER-Z1-F**](chester-z1.md) | Modul záložního napájení z baterie Li-Ion s DC/DC měničem a nabíječkou, vstup z linky 6-28 VDC nebo 12V solárního panelu + až 4 RGB podsvícená tlačítka s akustickou zpětnou vazbou |

## Nosné desky {#carrier-boards}

:::info

Tyto nosné desky vyžadují větší krabičku.

:::

| Název modulu                    | Popis modulu                                                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHESTER-B1                      | Držáky pro až 6 baterií velikosti D nebo 8 baterií velikosti C + LED mimo základní desku                                                                                     |
| CHESTER-B1-W                    | Držáky pro až 6 baterií velikosti D nebo 8 baterií velikosti C + LED mimo základní desku + bezdrátový M-Bus (wM-Bus)                                                           |
| [**CHESTER-C1**](chester-c1.md) | Deska rozhraní s DC/DC měničem, 2 výkonovými relé, svorkami 1-Wire, 4 digitálními/analogovými vstupy a rozhraním RS-485 + držák pro 4 baterie velikosti C          |
| [**CHESTER-C5**](chester-c5.md) | Zakázková nosná deska pro modul CHESTER-U1 s až 16 kanály 1-Wire, záložním napájením z baterie Li-Ion, DC/DC měničem a nabíječkou, vstupem z linky 6-28 VDC nebo 12V solárního panelu a podporou QWIIC OLED |

:::caution

Pokud jste pro svůj projekt nenašli vhodný modul, kontaktujte HARDWARIO. Plán vývoje hardwarových rozšíření se řídí konkrétními potřebami projektů.

:::
