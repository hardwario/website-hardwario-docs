---
slug: extension-modules
title: Rozšiřující moduly
description: "Základní deska CHESTER (CHESTER-M) obsahuje tato integrovaná rozhraní a periferie:"
---
import Image from '@theme/IdealImage';

# Rozšiřující moduly {#extension-modules}

Základní deska CHESTER (CHESTER-M) obsahuje tato integrovaná rozhraní a periferie:

* Sběrnice I<sup>2</sup>C (včetně systému Sparkfun Qwiic Connect System)
* Sběrnice 1-Wire (s hardwarovým budičem sběrnice se silným pull-up)
* Digitální teploměr I<sup>2</sup>C
* Tříosý MEMS akcelerometr
* Paměť NOR flash 8 MB
* Tříbarevná RGY LED
* Tlačítko

Klíčovou vlastností systému CHESTER je jeho hardwarová flexibilita daná širokou nabídkou rozšiřujících modulů. Tyto moduly se buď pájí ze spodní strany základní desky (k dispozici jsou dva sloty A+B), nebo se připojují přes systémovou sběrnici I2C (např. u modulů instalovaných v horním krytu krabičky).

:::tip

U varianty CHESTER DevKit lze moduly určené pro zadní stranu základní desky instalovat pomocí pružinových konektorů. To umožňuje rychlou výměnu rozhraní během vývojového cyklu. Pro reálné nasazení zařízení se však důrazně doporučuje mít moduly připájené přímo k základní desce (pájení provádí HARDWARIO).

:::

## Moduly na zadní straně {#backside-modules}

Moduly na zadní straně (červené moduly na obrázku níže) dále rozšiřují funkce zařízení CHESTER o další rozhraní.
Toto rozšíření je modulární i ve vývoji s CHESTER-SDK, kde má každý modul vlastní ovladač pro ZephyrRTOS pro snadnou integraci.

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

Umístěním modulu **X** do levého slotu **„A“** se jeho signály připojí ke dvěma levým svorkovnicím **TB1** a **TB2** (viz modrý čtverec na obrázku níže).
Obě levé svorkovnice **TB1** a **TB2** jsou propojeny paralelně, takže můžete snáze připojit více senzorů ke stejnému signálu/napájení.

Totéž platí pro pravý slot **„B“** a svorkovnice **TB5** a **TB6** (viz zelený čtverec na obrázku níže).

Když je zařízení CHESTER namontováno v krabičce, můžete po vyjmutí baterie zkontrolovat číslo modulu **„X_“** a hardwarovou revizi **„R1.0“** skrz malé otvory (viz dvě oranžová kolečka na obrázku níže).

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
| [**CHESTER-X0A**](chester-x0.md)  | Až 4 digitální a analogové vstupy a výstupy, kanály proudové smyčky 4-20 mA, napěťové vstupy 0-10 V, bezpotenciálový kontakt, vstup NPN nebo PNP, včetně 5V boost měniče. |
| [**CHESTER-X0B**](chester-x0.md)  | Až 4 digitální a analogové vstupy a výstupy, kanály proudové smyčky 4-20 mA, napěťové vstupy 0-10 V, bezpotenciálový kontakt, vstup NPN nebo PNP, bez 5V boost měniče.   |
| [**CHESTER-X1**](chester-x1.md)   | Až osm kanálů 1-Wire (např. pro digitální teplotní senzory Dallas DS18B20)                                                                                 |
| [**CHESTER-X2**](chester-x2.md)   | Rozhraní TTL/UART i RS-485 (např. pro komunikaci Modbus)                                                                                               |
| [**CHESTER-X3A**](chester-x3.md)  | Až 2 senzory RTD (odporové teplotní senzory), například Pt 100 a Pt 1000                                                                                   |
| [**CHESTER-X3B**](chester-x3.md)  | Až 2 termočlánkové kanály (typ B/C/E/J/K/N/R/S/T)                                                                                                            |
| [**CHESTER-X3C**](chester-x3.md)  | Až 2 kanály pro tenzometrické snímače (load cell), které lze použít k měření hmotnosti                                                                                |
| [**CHESTER-X4**](chester-x4.md)   | DC/DC měnič zajišťující napájení z externí linky 6-28 VDC (umožňuje měření vstupního napětí)                                                               |
| [**CHESTER-X5**](chester-x5.md)   | Dvoukanálové izolované analogové vstupy pro měření napětí +/- 50 V                                                                                               |
| [**CHESTER-X6**](chester-x6.md)   | Rozhraní pro náš vlastní protokol S-Wire zaměřený na nízkopříkonové periferie                                                                                |
| [**CHESTER-X7**](chester-x7.md)   | Jednokanálový převodník s diferenciálním vstupem a softwarově řízeným 5V boost měničem pro proudové sondy a další průmyslové senzory                                |
| [**CHESTER-X8**](chester-x8.md)   | Ultrapřesný akcelerometr                                                                                                                                       |
| [**CHESTER-X9**](chester-x9.md)   | Čtyřkanálový výstupní modul s chytrým chráněným spínačem pro ovládání relé a solenoidů                                                                          |
| [**CHESTER-X10**](chester-x10.md) | DC/DC měnič + nabíječka Li-Po zajišťující napájení z externí linky 6-30 VDC (umožňuje měření vstupního napětí)                                               |
| [**CHESTER-X12**](chester-x12.md) | Sériové rozhraní RS-232 s vyhrazeným napájecím vstupem 5-28 VDC pro průmyslová sériová zařízení a starší techniku                                  |
| [**CHESTER-X13**](chester-x13.md) | Rozhraní sběrnice CAN s podporou CAN FD a vestavěným step-down měničem (až 28 V)                                                                             |
| [**CHESTER-X14**](chester-x14.md) | Konektivita 10/100 Ethernet s vestavěným step-down měničem (až 28 V)                                                                                     |
| [**CHESTER-K1**](chester-k1.md)   | Čtyřkanálový převodník s diferenciálním vstupem a softwarově řízeným 5V boost měničem pro proudové sondy a další průmyslové senzory                                |

## Moduly do krytu {#cover-modules}

| Název modulu                      | Popis modulu                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHESTER-A1                        | AC/DC měnič pro napájení 110/230 V                                                                                                          |
| CHESTER-A1A                       | AC/DC měnič pro napájení 110/230 V se dvěma výkonovými relé 230V/16A                                                                                           |
| CHESTER-G1                        | Osmikanálový galvanicky oddělený vstupní modul s izolovaným DC/DC napájením                                                                                       |
| CHESTER-S1                        | Modul pro monitoring prostředí se senzory teploty, vlhkosti, oxidu uhličitého (CO2), intenzity osvětlení, atmosférického tlaku, akustického hluku a PIR            |
| [**CHESTER-Z1**](chester-z1.md)   | Modul zálohování Li-Ion baterií s DC/DC měničem a nabíječkou, vstup z linky 6-28 VDC nebo 12V solárního panelu                                                               |
| [**CHESTER-Z1-F**](chester-z1.md) | Modul zálohování Li-Ion baterií s DC/DC měničem a nabíječkou, vstup z linky 6-28 VDC nebo 12V solárního panelu + až 4 RGB podsvícená tlačítka s akustickou zpětnou vazbou |

## Nosné desky {#carrier-boards}

:::info

Tyto nosné desky vyžadují větší krabičku.

:::

| Název modulu                    | Popis modulu                                                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHESTER-B1                      | Držáky baterií pro až 6x baterii velikosti D nebo 8x velikosti C + LED mimo základní desku                                                                                     |
| CHESTER-B1-W                    | Držáky baterií pro až 6x baterii velikosti D nebo 8x velikosti C + LED mimo základní desku + wireless M-Bus (wM-Bus)                                                           |
| [**CHESTER-C1**](chester-c1.md) | Deska rozhraní s DC/DC měničem, 2x výkonové relé, svorkovnice 1-Wire, 4x digitální/analogový vstup a rozhraní RS-485 + držák pro 4x baterii velikosti C          |
| [**CHESTER-C5**](chester-c5.md) | Zakázková nosná deska pro CHESTER-U1 s až 16 kanály 1-Wire, zálohováním Li-Ion baterií, DC/DC měničem a nabíječkou, vstupem z linky 6-28 VDC nebo 12V solárního panelu, podporou QWIIC OLED |

:::caution

Pokud jste pro svůj projekt nenašli vhodný modul, kontaktujte HARDWARIO. Plán vývoje hardwarových rozšíření se řídí konkrétními potřebami projektů.

:::
