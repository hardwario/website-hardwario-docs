---
slug: index
title: Milesight – Senzory
description: "Zde je seznam senzorů Milesight otestovaných společností HARDWARIO včetně referenčních zdrojů:"
---

import Image from '@theme/IdealImage';

Zde je seznam **senzorů Milesight** otestovaných společností HARDWARIO včetně referenčních zdrojů:

| Název                               | Typ                           | Přehled                                | Produktová stránka                                           | Odkaz na nákup                                            |
|-------------------------------------|-------------------------------|------------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------|
| [**Milesight AM319**](/smart-devices/milesight/sensors/milesight-am300/milesight-am319) | Senzor prostředí              | [Podrobnosti](/smart-devices/milesight/sensors/milesight-am300/milesight-am319)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/am319) | [Koupit zde](https://www.hardwario.store/p/milesight-am319)             |
| [**Milesight EM400-MUD**](/smart-devices/milesight/sensors/milesight-em400) | Ultrazvukový senzor vzdálenosti | [Podrobnosti](/smart-devices/milesight/sensors/milesight-em400)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/em400-mud) | *Zatím nedostupné*                                                    |
| [**Milesight EM500-CO2**](/smart-devices/milesight/sensors/milesight-em500) | Senzor CO₂                    | [Podrobnosti](/smart-devices/milesight/sensors/milesight-em500)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/em500-co2) | *Zatím nedostupné*                                                    |
| [**Milesight GS601**](/smart-devices/milesight/sensors/milesight-gs601) | Detektor vapování a kouře     | [Podrobnosti](/smart-devices/milesight/sensors/milesight-gs601)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/gs601) | [Koupit zde](https://www.hardwario.store/p/milesight-gs601)             |
| [**Milesight VS135**](/smart-devices/milesight/sensors/milesight-vs135) | Senzor pro počítání osob      | [Podrobnosti](/smart-devices/milesight/sensors/milesight-vs135)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/vs135) | [Koupit zde](https://www.hardwario.store/p/milesight-vs135)             |
| [**Milesight VS373**](/smart-devices/milesight/sensors/milesight-vs373) | Senzor detekce pádu           | [Podrobnosti](/smart-devices/milesight/sensors/milesight-vs373)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/vs373) | [Koupit zde](https://www.hardwario.store/p/milesight-vs373)             |
| [**Milesight WS101**](/smart-devices/milesight/sensors/milesight-ws101) | Chytré tlačítko               | [Podrobnosti](/smart-devices/milesight/sensors/milesight-ws101)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/ws101) | [Koupit zde](https://www.hardwario.store/p/milesight-ws101)             |
| [**Milesight WS201**](/smart-devices/milesight/sensors/milesight-ws201) | Senzor monitorování naplnění  | [Podrobnosti](/smart-devices/milesight/sensors/milesight-ws201)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/ws201) | *Zatím nedostupné*                                                    |
| [**Milesight WS303**](/smart-devices/milesight/sensors/milesight-ws303) | Senzor detekce zaplavení      | [Podrobnosti](/smart-devices/milesight/sensors/milesight-ws303)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/ws303) | [Koupit zde](https://www.hardwario.store/p/milesight-ws303)             |
| [**Milesight WS523**](/smart-devices/milesight/sensors/milesight-ws523) | Chytrá přenosná zásuvka       | [Podrobnosti](/smart-devices/milesight/sensors/milesight-ws523)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/ws523) | [Koupit zde](https://www.hardwario.store/p/milesight-ws523)             |
| [**Milesight WT101**](/smart-devices/milesight/sensors/milesight-wt101) | Termostatická hlavice         | [Podrobnosti](/smart-devices/milesight/sensors/milesight-wt101)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/wt101) | [Koupit zde](https://www.hardwario.store/p/milesight-wt101)             |

---

## Obecná konfigurace {#general-configuration}

**Přehled**  
Ke konfiguraci senzorů použijte mobilní aplikaci **Milesight ToolBox**, dostupnou na obou platformách:  
- Apple App Store: https://apps.apple.com/us/app/milesight-toolbox/id1518748039  
- Google Play Store: https://play.google.com/store/apps/details?id=com.ursalinknfc&hl=en&pli=1  

#### QR kód – Milesight ToolBox {#qr-code--milesight-toolbox}
<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '250px', height: '250px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/sensors/images/milesight-toolbox.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

**Instalace a konfigurace**  
- Konfigurace probíhá přes **NFC**.  
- Po načtení zařízení přejděte na kartu *Basic Information* a aktualizujte **Device Time**.  
- Nastavení správného **data a času** je vyžadováno u všech zařízení.  

**Připojení LoRaWAN**  
- Zařízení jsou předkonfigurována s **AppKey pro OTAA** (výchozí hodnoty jsou uvedeny v uživatelské příručce).  
- **Brána musí být nastavena jako Public.** Pokud je brána nastavena jako Private, zařízení se nebudou moci připojit k síti.  

:::info
K lepšímu přehledu o konfiguraci zařízení pomocí aplikace **Milesight ToolBox** nabízíme také **kompletní videonávod**:

https://docs.hardwario.com/smart-devices/milesight/videos-milesight/general-configuration
:::


---

## Možnosti sítě LoRaWAN {#lorawan-network-options}

Pro provoz vašeho zařízení LoRaWAN si můžete vybrat ze dvou podporovaných platforem síťového serveru. Obě řešení umožňují správu bran, registraci koncových zařízení, konfiguraci profilů a zpracování dat payloadu.

### Možnost 1: The Things Stack {#option-1-the-things-stack}

Cloudový LoRaWAN Network Server vhodný pro malá i velká nasazení.

➡️ **Průvodce konfigurací: https://docs.hardwario.com//apps/the-things-stack/index#configure-the-things-stack**  



### Možnost 2: ChirpStack v4 {#option-2-chirpstack-v4}

Open-source LoRaWAN Network Server ideální pro on-premise nebo privátní instalace sítě.

➡️ **Průvodce prvními kroky: https://docs.hardwario.com//apps/chirpstack/index#getting-started-with-chirpstack-v4**
