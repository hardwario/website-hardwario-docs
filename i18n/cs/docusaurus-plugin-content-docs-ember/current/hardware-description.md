---
slug: hardware-description
title: Popis hardwaru
description: "Popis hardwarové konfigurace zařízení EMBER Hotspot."
title_meta: "Popis hardwaru (EMBER)"
---

# Popis hardwaru {#hardware-description}

Tento článek popisuje **hardwarovou konfiguraci zařízení EMBER Hotspot**.

## Přehled zařízení EMBER Hotspot {#ember-hotspot-overview}

Zařízení **EMBER Hotspot** je postavené na platformě **RBM33G** od společnosti **MikroTik**.  
Má kartu **LoRaWAN** a volitelně také **modem LTE**.

Krabička i konektory jsou **vodotěsné a prachotěsné** s krytím **IP67**.

### Rozložení konektorů {#connector-layout}
![Popis konektorů EMBER](../../../../ember/images/ember-connector-label-r2.png)

## Vnější konektory a antény {#external-connectors--antennas}

Zařízení má kvalitní konektory pro napájení, síťové připojení a bezdrátovou komunikaci.

### Antény {#antennas}
- **LRW (LoRaWAN):** Jeden konektor typu N pro **volitelnou externí** anténu LoRa.
- **LTE1 a LTE2:** Dva konektory pro antény LTE (Main a Diversity). Používají se, pokud je osazený modem LTE pro páteřní připojení přes mobilní síť (podporuje 2G / 3G / 4G).

#### EMBER se dodává se dvěma vnitřními anténami {#ember-ships-with-two-internal-antennas}

Každé zařízení EMBER odchází z výroby se **dvěma anténami, které jsou uvnitř krabičky a už připojené**:
jednou pro **LoRaWAN** (na konektoru u.FL `RFIO` karty LoRa) a jednou pro **LTE**. Rádio tak má
anténu připojenou hned po vybalení: bránu můžete bezpečně zapnout a **předem nemusíte nic
přišroubovat**.

V balení je **napájecí adaptér 24 V DC**, volné antény v něm nejsou, viz
[Objednací kódy](ordering-codes.md).

#### Přechod na externí anténu {#switching-to-an-external-antenna}

Konektory **LRW**, **LTE1** a **LTE2** na krabičce jsou určené pro **volitelné externí
antény**. Ty se vyplatí, když potřebujete větší dosah, než nabídne vnitřní anténa, nebo když je
brána namontovaná na odstíněném místě. Vnitřní anténa zabírá konektor u.FL na kartě, takže
přechod vyžaduje ruční zásah:

1. **Odpojte napájení.**
2. Otevřete krabičku.
3. Odpojte vnitřní anténu od konektoru u.FL na kartě (`RFIO` na kartě LoRa) a na její místo připojte
   pigtail odpovídajícího průchodkového konektoru (**LRW** pro LoRaWAN).
4. Zavřete krabičku a na konektor přišroubujte externí anténu.
5. V RouterOS nastavte **`antenna-gain`** na zisk nově použité antény, viz
   [Zisk antény a výstupní výkon](mikrotik/antenna-gain.md). Pokud ponecháte hodnotu pro původní anténu,
   bude brána vyzařovat nad zákonným limitem EIRP, nebo pod ním.

:::caution
Krabičku zavírejte pečlivě, krytí **IP67** závisí na jejím těsnění. Bránu také nikdy nezapínejte,
když je konektor u.FL karty LoRa prázdný: vysílání do nezapojeného konektoru může poškodit výkonový
zesilovač karty.
:::

Při otevřené krabičce karty rozlišíte takto: **karta LoRa má jediný konektor u.FL** (`RFIO`),
**karta LTE má dva** (`MAIN` a `AUX`).

### Napájení a data {#power-and-data}
- **DC IN:** Kruhový průmyslový konektor pro externí napájení 24 V DC.
- **LAN (Ethernet):** Slouží k lokální konfiguraci, správě zařízení a řešení problémů.
- **WAN (Ethernet + PoE):** Hlavní rozhraní pro připojení k internetu. Port podporuje také napájení zařízení přes **pasivní PoE IN**.

## Síťová rozhraní {#network-interfaces}

Zařízení **EMBER Hotspot** má dva kovové **ethernetové porty RJ45** (10/100/1000 Mbit/s) ukryté za vodotěsnými kabelovými průchodkami:

- **LAN** (na pravé straně zařízení)
  - Lokální konfigurace
  - Správa zařízení
  - Řešení problémů

- **WAN** (na levé straně zařízení)
  - Připojení k internetu a do cloudu
  - Vstup napájení PoE

## Možnosti napájení {#power-supply-options}

Zařízení lze napájet:

- napájecím adaptérem 24 V DC (přes **DC IN**)
- napájecím zdrojem 24 V DC (přes **DC IN**)
- pasivním **PoE** 24 V DC (Power over Ethernet) přes port **WAN**

:::danger
Při venkovní instalaci musí být **zařízení EMBER Hotspot namontované konektory dolů**, aby si zachovalo krytí IP67 a nehromadila se v něm voda.
:::
