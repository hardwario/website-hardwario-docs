---
slug: chirpstack-gateways
title: Brány
description: "Tento návod vás provede přidáním a nastavením brány v ChirpStack v4."
title_meta: "Brány (ChirpStack)"
---
import Image from '@theme/IdealImage';

# Průvodce konfigurací bran {#gateways-configuration-guide}

Tento návod vás provede přidáním a nastavením brány v ChirpStack v4.

---

V levém navigačním menu pod tenantem zvolte **Gateways** a pak klikněte vpravo nahoře na tlačítko **Add Gateway**.  

Objeví se formulář, kde zadáte informace o bráně, jako je:  
- **Name**  
- **Gateway ID**  
- **Stats Interval**  

Po vyplnění klikněte na **Submit**.  

![ChirStack v4 - brány](../../../../../../apps/chirpstack/chirpstack-configuration/images/chirpstack-tutorial-1.png)

:::info
Pokud používáte naši **bránu EMBER**, **Gateway ID** najdete v **softwaru MikroTik** pod **LoRa → Devices**.  
:::

---

## Brány EMBER – software MikroTik {#ember-gateways--mikrotik-software}

Pokud jako bránu používáte naši **EMBER**, celá její konfigurace se dělá přímo v **systému MikroTik**.
Po nastavení by se brána měla zobrazit a být připravená k připojení k systému ChirpStack.


Zde je odkaz na **návod krok za krokem** pro **aktualizaci brány přes MikroTik**:
https://docs.hardwario.com/ember/mikrotik/gateway-update



## Videonávod {#video-tutorial}

:::tip
Pokud potřebujete další pomoc nebo vizuální ukázku postupu popsaného v tomto návodu, podívejte se na [**videonávod**](https://docs.hardwario.com/apps/videos-apps/chirpstack-ember).
:::
