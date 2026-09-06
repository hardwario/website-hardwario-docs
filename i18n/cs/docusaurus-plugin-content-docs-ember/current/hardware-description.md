---
slug: hardware-description
title: Popis hardwaru
description: "Tento článek popisuje hardwarovou konfiguraci zařízení EMBER Hotspot."
title_meta: "Popis hardwaru (EMBER)"
---

# Popis hardwaru {#hardware-description}

Tento článek popisuje **hardwarovou konfiguraci zařízení EMBER Hotspot**.

## Přehled zařízení EMBER Hotspot {#ember-hotspot-overview}

Zařízení **EMBER Hotspot** je založeno na platformě **RBM33G** od **MikroTik**.  
Je vybaveno kartou **LoRaWAN** a volitelně může obsahovat **LTE modem**.

Krabička a konektory jsou **vodotěsné a prachotěsné**, poskytují krytí **IP67**.

### Rozložení konektorů {#connector-layout}
![Popis konektorů EMBER](../../../../ember/images/ember-connector-label-r2.png)

## Vnější konektory a antény {#external-connectors--antennas}

Zařízení je vybaveno kvalitními konektory pro napájení, síťové připojení a bezdrátovou komunikaci.

### Antény {#antennas}
- **LRW (LoRaWAN):** Jeden konektor typu N pro **volitelnou externí** anténu LoRa.
- **LTE1 a LTE2:** Dva konektory pro LTE antény (Main a Diversity). Používají se, pokud je nainstalován LTE modem zajišťující mobilní backhaul (podporuje 2G / 3G / 4G).

#### EMBER se dodává se dvěma vnitřními antén­ami {#ember-ships-with-two-internal-antennas}

Každé zařízení EMBER opouští výrobu se **dvěma antén­ami umístěnými uvnitř krabičky a již připojenými**:
jednou pro **LoRaWAN** (na u.FL konektoru `RFIO` karty LoRa) a jednou pro **LTE**. Rádio tedy
má vždy připojenou anténu, když bránu vybalíte: je bezpečné ji zapnout a **před začátkem není nutné
nic přišroubovávat**.

Balení obsahuje **napájecí adaptér 24 V DC** a žádné volné antény, viz
[Objednací kódy](ordering-codes.md).

#### Přechod na externí anténu {#switching-to-an-external-antenna}

Konektory **LRW**, **LTE1** a **LTE2** na krabičce jsou určeny pro **volitelné externí
antény**, které se vyplatí použít, pokud potřebujete větší dosah, než jaký zvládne vnitřní anténa, nebo když je
brána namontována někde, kde je odstíněná. Vnitřní anténa obsazuje u.FL konektor karty, takže
přechod je manuální krok:

1. **Odpojte napájení.**
2. Otevřete krabičku.
3. Odpojte vnitřní anténu z u.FL konektoru karty (`RFIO` na kartě LoRa) a na její místo zapojte
   pigtail odpovídajícího průchodkového konektoru (**LRW** pro LoRaWAN).
4. Zavřete krabičku a přišroubujte externí anténu na konektor.
5. Aktualizujte **`antenna-gain`** v RouterOS na zisk nyní použité antény, viz
   [Zisk antény a výstupní výkon](mikrotik/antenna-gain.md). Pokud zůstane hodnota pro starou anténu,
   brána vyzařuje nad nebo pod zákonným limitem EIRP.

:::caution
Krabičku zavírejte opatrně, protože krytí **IP67** závisí na jejím těsnění. A nikdy bránu nezapínejte s
prázdným u.FL konektorem karty LoRa: vysílání do otevřeného konektoru může poškodit výkonový
zesilovač karty.
:::

Pokud máte krabičku otevřenou a potřebujete karty od sebe odlišit: **karta LoRa má jediný u.FL
konektor** (`RFIO`), zatímco **karta LTE má dva** (`MAIN` a `AUX`).

### Napájení a data {#power-and-data}
- **DC IN:** Kruhový industriální konektor pro externí napájení 24 V DC.
- **LAN (Ethernet):** Slouží k lokální konfiguraci, správě zařízení a řešení problémů.
- **WAN (Ethernet + PoE):** Primární rozhraní pro připojení k internetu. Tento port také podporuje **pasivní PoE IN** pro napájení zařízení.

## Síťová rozhraní {#network-interfaces}

Zařízení **EMBER Hotspot** poskytuje dva kovové **RJ45 Ethernet porty** (10/100/1000 Mbit/s) skryté za vodotěsnými kabelovými průchodkami:

- **LAN** (umístěn na pravé straně zařízení)
  - Lokální konfigurace
  - Správa zařízení
  - Řešení problémů

- **WAN** (umístěn na levé straně zařízení)
  - Připojení k internetu a do cloudu
  - Použit jako vstup napájení PoE

## Možnosti napájení {#power-supply-options}

Zařízení lze napájet:

- napájecím adaptérem 24 V DC (přes **DC IN**)
- napájecím zdrojem 24 V DC (přes **DC IN**)
- pasivním **PoE** 24 V DC (Power over Ethernet) přes port **WAN**

:::danger
Při venkovní instalaci musí být **zařízení EMBER Hotspot namontováno s konektory směřujícími dolů**, aby bylo zachováno krytí IP67 a zabránilo se hromadění vody.
:::
