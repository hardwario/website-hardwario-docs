---
slug: machine-probe
title: MACHINE PROBE
description: "Sonda MACHINE PROBE není omezená jen na STICKER Input — je plně kompatibilní i se zařízením HARDWARIO CHESTER, které nabízí stejné rozhraní 1-Wire. Tutéž sondu tak lze použít na obou platformách bez jakékoli hardwarové úpravy."
---

# MACHINE PROBE (v1.3) {#machine-probe-v13}

**MACHINE PROBE** je externí měřicí sonda určená k montáži přímo na sledované zařízení. V jedné krabičce je integrovaná sada digitálních senzorů (teplota, vlhkost, akcelerometr, okolní osvětlení, Hallova sonda), které komunikují po vnitřní sběrnici **I²C**. Převodník 1-Wire na I²C zpřístupňuje celou sondu jedinou datovou linkou **1-Wire**, takže z pohledu zařízení STICKER Input se sonda chová jako jedno zařízení připojené třívodičovým kabelem.

:::tip

Sonda MACHINE PROBE není omezená jen na STICKER Input — je plně kompatibilní i se zařízením **HARDWARIO CHESTER**, které nabízí stejné rozhraní 1-Wire. Tutéž sondu tak lze použít na obou platformách bez jakékoli hardwarové úpravy.

:::

## Popis a využití v praxi {#description-and-real-world-use}

Sonda se už osvědčila v provozu — například při monitorování **vibračních dopravníků** v projektu ProXimos, kde spolehlivě:

- měří **teplotu** sledovaného zařízení,
- měří **relativní vlhkost** okolí,
- detekuje **pohyb, rázy a vibrace** pomocí akcelerometru.

Kombinací těchto veličin lze sledovat nejen provozní podmínky, ale i skutečný chod stroje — třeba rozpoznat, jestli zařízení opravdu běží, stojí, nebo nadměrně vibruje.

### Příklad: monitorování vibrací motoru {#example-monitoring-motor-vibration}

Typickým použitím je **monitorování vibrací elektromotorů, pump a ventilátorů**. Sonda MACHINE PROBE se montuje přímo na kostru motoru a její vestavěný akcelerometr průběžně snímá mechanické vibrace. Z měřených dat lze:

- potvrdit, jestli motor **běží, nebo stojí** (přítomnost a úroveň vibrací),
- odhalit **postupný růst vibrací**, který často předchází mechanické závadě — opotřebeným ložiskům, nesouososti hřídele nebo nevyváženému zatížení,
- zkombinovat údaj o vibracích s **teplotou** měřenou sondou a zachytit tak přehřívání, které se rozvíjí spolu s nadměrnými vibracemi.

Sonda se tím stává jednoduchým stavebním prvkem **prediktivní údržby**: místo čekání na poruchu motoru se trend vibrací a teploty odesílá přes LoRaWAN a výstrahu lze vyvolat ještě před havárií.

## Elektrické parametry {#electrical-specifications}

| Parametr | Hodnota |
| --- | --- |
| Rozsah napájecího napětí | **3.0 – 5.5 V** |
| Ochrana proti obrácení polarity | **Ano** (integrovaná) |
| Sběrnice senzorů | I²C (vnitřní), zpřístupněná přes převodník 1-Wire |
| Připojení | Třívodičový propojovací kabel |

:::info

Integrovaná ochrana proti obrácení polarity chrání elektroniku sondy před špatným zapojením napájecích vodičů. I tak doporučujeme držet se při instalaci správného pořadí vodičů podle tabulky níže.

:::

## Zapojení {#wiring}

Sonda se připojuje **třívodičovým kabelem** s tímto zapojením:

| Vodič | Signál | Popis |
| --- | --- | --- |
| Minus | **GND** | Zem / společný vodič |
| Data | **DATA** | Datová sběrnice 1-Wire |
| Plus | **VDD** | Napájení 3.0 – 5.5 V |

## Senzory a čipy na desce {#onboard-sensors-and-chips}

Následující tabulka shrnuje aktivní součástky osazené na desce **MACHINE PROBE R1.3**, včetně jejich funkce a adresy I²C.

| Označení | Čip | Funkce | Adresa I²C |
| --- | --- | --- | --- |
| U2 | DS28E17Q+ | Převodník 1-Wire → I²C (obsluhuje veškerou komunikaci sondy) | — |
| U4 | SHT30-DIS-B2.5KS | Senzor teploty a vlhkosti | 0x45 |
| U6 | LIS2DH12TR | Akcelerometr / senzor pohybu | 0x19 |
| U3 | TMP112AID | Digitální senzor teploty | 0x48 |
| U7 | OPT3001DNP | Digitální senzor okolního osvětlení | 0x44 |
| U8 | SI7210-B-03-IV | Hallova sonda / magnetometr | 0x32 |
| U5 | M24C04-FMH6TG | Paměť EEPROM | 0x50 |
| U1 | TPS7A05285PDB | Lineární regulátor (LDO) | — |

:::note

Čip **DS28E17Q+ (U2)** funguje jako převodník mezi sběrnicí 1-Wire (směrem ke STICKER Input) a vnitřní sběrnicí I²C, na které jsou zapojené všechny senzory sondy. Adresy I²C tedy platí v rámci vnitřní sběrnice sondy, ne přímo na rozhraní zařízení STICKER Input.

:::

## Osazení desky {#board-assembly}

Označení součástek (horní strana):

![MACHINE PROBE R1.3 — osazení, označení součástek](../../../../../sticker/sticker-input-wiring/images/machine-probe-asm-names.png)

Hodnoty součástek (horní strana):

![MACHINE PROBE R1.3 — osazení, hodnoty součástek](../../../../../sticker/sticker-input-wiring/images/machine-probe-asm-values.png)

<details>
<summary><b>Zobrazit schéma (MACHINE PROBE R1.3)</b></summary>
<p>

![MACHINE PROBE R1.3 — schéma](../../../../../sticker/sticker-input-wiring/images/machine-probe-schematic.png)

</p>
</details>
