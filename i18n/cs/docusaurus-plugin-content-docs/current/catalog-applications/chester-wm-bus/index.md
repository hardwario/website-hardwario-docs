---
title: CHESTER wM-Bus
description: "CHESTER wM-Bus je katalogová aplikace pro odečet měřičů Wireless M-Bus: co umí, jaký má hardware, jaké varianty a jaký firmware."
---
import Image from '@theme/IdealImage';

# CHESTER wM-Bus {#chester-wm-bus}

![Zařízení CHESTER wM-Bus v bílé krabičce, pohled šikmo shora](/img/chester/catalog-applications/chester-wm-bus.webp)

Zařízení **CHESTER wM-Bus** je brána **Wireless M-Bus**. V naplánovaných skenováních naslouchá nastaveným měřičům wM-Bus, přijaté surové pakety shromažďuje a odesílá přes síť **NB-IoT/LTE-M**.

:::info Firmware

Konfigurační parametry, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER wM-Bus](../../firmware/chester-wm-bus/index.md)**.

:::

## Co umí {#what-it-can-do}

- Podporuje všechny měřiče wM-Bus tříd T1 a C1 bez ohledu na výrobce.
- Měří spotřebu **tepla**, **plynu**, **elektřiny** a **vody** v domech a bytech a odečítá i **další zařízení wM-Bus**.
- Skenuje **periodicky**, **denně**, **týdně** nebo **měsíčně**.
- Během příjmu přepíná mezi **dvěma anténami**, aby skenovalo s co nejlepším příjmem v **obou polarizacích**.
- Díky nízké spotřebě vydrží na baterie 7 a více let při denním odečtu; objednat lze i variantu s externím napájením.
- Podporuje novější stack **LTEv2** a aktuální **HARDWARIO Cloud**.

## Hardware {#hardware}

Napájení šesti alkalickými články „D“.

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CES`: Standardní základní deska bez superkondenzátorů
* `CHESTER-B1-DLW`: Deska B1 se šesti držáky lithiových článků D a modulem wM-Bus

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/catalog-applications/images/chester-wm-bus.png')} width={376} height={376} alt="Brána CHESTER wM-Bus v bílé krabičce na stěnu se dvěma externími anténami" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

## Podporované senzory wM-Bus {#supported-wm-bus-sensors}

**CHESTER wM-Bus přijímá pakety z jakéhokoli měřiče wM-Bus, který vysílá v režimu T1 nebo C1, bez ohledu na výrobce.** Své měřiče tedy nemusíte ověřovat proti žádnému seznamu kompatibility.

Zařízení funguje jako **průchozí brána (pass-thru)**: přijaté telegramy wM-Bus přeposílá do cloudu a **dekódování na smysluplné jednotky probíhá v koncové IoT aplikaci**. Telegramy lze volitelně dešifrovat v cloudu pomocí [dešifrovacích klíčů](../../firmware/chester-wm-bus/index.md#hardwario-cloud--decryption-keys) uložených pro jednotlivá zařízení.

Zařízení CHESTER wM-Bus přijímá jen surové hexadecimální telegramy wM-Bus. Pokud nezapnete dekódování v cloudu, data měřičů neinterpretuje ani zařízení, ani HARDWARIO Cloud. Každý měřič wM-Bus kóduje data po svém a telegramy mohou být navíc zašifrované. Dekódování surových hexadecimálních hodnot na smysluplné jednotky je na zákazníkovi nebo integrátorovi.

Níže uvedené měřiče jsme sami otestovali a zdokumentovali, mimo jiné **vodoměry**, **měřiče tepla** a **indikátory topných nákladů** značek **BMeters** a **Zenner**. Seznam je výchozím bodem, ne omezením.

➡️ [Otestované senzory wM-Bus](../../supported-devices/wm-bus.md)

## Varianty {#variants}

| Varianta | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER wM-Bus DC**](chester-wm-bus-dc.md) | Externí adaptér 230 V místo článků D | [CHESTER wM-Bus](../../firmware/chester-wm-bus/index.md) |

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
