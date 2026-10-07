---
slug: index
title: Milesight – Senzory
description: "Senzory LoRaWAN od Milesight otestované v HARDWARIO, s odkazy na podklady ke každému zařízení."
---

import Image from '@theme/IdealImage';

Přehled **senzorů Milesight**, které otestovala společnost HARDWARIO, s odkazy na další zdroje:

| Název                               | Typ                           | Přehled                                | Stránka produktu                                             | Odkaz na nákup                                            |
|-------------------------------------|-------------------------------|------------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------|
| [**Milesight AM319**](/smart-devices/milesight/sensors/milesight-am300/milesight-am319) | Senzor vnitřního prostředí    | [Podrobnosti](/smart-devices/milesight/sensors/milesight-am300/milesight-am319)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/am319) | [Koupit zde](https://www.hardwario.store/p/milesight-am319)             |
| [**Milesight EM400-MUD**](/smart-devices/milesight/sensors/milesight-em400) | Ultrazvukový senzor vzdálenosti | [Podrobnosti](/smart-devices/milesight/sensors/milesight-em400)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/em400-mud) | *Zatím není k dispozici*                                                    |
| [**Milesight EM500-CO2**](/smart-devices/milesight/sensors/milesight-em500) | Senzor CO₂                    | [Podrobnosti](/smart-devices/milesight/sensors/milesight-em500)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/em500-co2) | *Zatím není k dispozici*                                                    |
| [**Milesight GS601**](/smart-devices/milesight/sensors/milesight-gs601) | Detektor vapování a kouře     | [Podrobnosti](/smart-devices/milesight/sensors/milesight-gs601)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/gs601) | [Koupit zde](https://www.hardwario.store/p/milesight-gs601)             |
| [**Milesight VS135**](/smart-devices/milesight/sensors/milesight-vs135) | Senzor pro počítání osob      | [Podrobnosti](/smart-devices/milesight/sensors/milesight-vs135)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/vs135) | [Koupit zde](https://www.hardwario.store/p/milesight-vs135)             |
| [**Milesight VS373**](/smart-devices/milesight/sensors/milesight-vs373) | Senzor detekce pádů           | [Podrobnosti](/smart-devices/milesight/sensors/milesight-vs373)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/vs373) | [Koupit zde](https://www.hardwario.store/p/milesight-vs373)             |
| [**Milesight WS101**](/smart-devices/milesight/sensors/milesight-ws101) | Chytré tlačítko               | [Podrobnosti](/smart-devices/milesight/sensors/milesight-ws101)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/ws101) | [Koupit zde](https://www.hardwario.store/p/milesight-ws101)             |
| [**Milesight WS201**](/smart-devices/milesight/sensors/milesight-ws201) | Senzor zaplnění               | [Podrobnosti](/smart-devices/milesight/sensors/milesight-ws201)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/ws201) | *Zatím není k dispozici*                                                    |
| [**Milesight WS303**](/smart-devices/milesight/sensors/milesight-ws303) | Detektor úniku vody           | [Podrobnosti](/smart-devices/milesight/sensors/milesight-ws303)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/ws303) | [Koupit zde](https://www.hardwario.store/p/milesight-ws303)             |
| [**Milesight WS523**](/smart-devices/milesight/sensors/milesight-ws523) | Chytrá přenosná zásuvka       | [Podrobnosti](/smart-devices/milesight/sensors/milesight-ws523)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/ws523) | [Koupit zde](https://www.hardwario.store/p/milesight-ws523)             |
| [**Milesight WT101**](/smart-devices/milesight/sensors/milesight-wt101) | Termostatická hlavice         | [Podrobnosti](/smart-devices/milesight/sensors/milesight-wt101)       | [Oficiální stránky](https://www.milesight.com/iot/product/lorawan-sensor/wt101) | [Koupit zde](https://www.hardwario.store/p/milesight-wt101)             |

---

## Obecná konfigurace {#general-configuration}

**Přehled**  
Ke konfiguraci senzorů použijte mobilní aplikaci **Milesight ToolBox**, která je k dispozici pro obě platformy:  
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
- Senzory se konfigurují přes **NFC**.  
- Po načtení zařízení přejděte na záložku *Basic Information* a aktualizujte **Device Time**.  
- U všech zařízení je nutné nastavit správné **datum a čas**.  

**Připojení LoRaWAN**  
- Zařízení mají z výroby nastavený **AppKey pro OTAA** (výchozí hodnoty uvádí uživatelská příručka).  
- **Brána musí být nastavená jako Public.** Pokud je nastavená jako Private, zařízení se k síti nepřipojí.  

:::info
Konfiguraci zařízení v aplikaci **Milesight ToolBox** názorně ukazuje také **kompletní videonávod**:

https://docs.hardwario.com/smart-devices/milesight/videos-milesight/general-configuration
:::


---

## Možnosti sítě LoRaWAN {#lorawan-network-options}

Zařízení LoRaWAN můžete provozovat na jedné ze dvou podporovaných platforem síťového serveru. V obou spravujete brány, registrujete koncová zařízení, konfigurujete profily a zpracováváte data z payloadu.

### Možnost 1: The Things Stack {#option-1-the-things-stack}

Cloudový síťový server LoRaWAN vhodný pro malá i velká nasazení.

➡️ **Průvodce konfigurací: https://docs.hardwario.com//apps/the-things-stack/index#configure-the-things-stack**  



### Možnost 2: ChirpStack v4 {#option-2-chirpstack-v4}

Open-source síťový server LoRaWAN ideální pro instalace on-premise nebo v privátní síti.

➡️ **Průvodce prvními kroky: https://docs.hardwario.com//apps/chirpstack/index#getting-started-with-chirpstack-v4**
