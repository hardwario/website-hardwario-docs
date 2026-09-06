---
slug: integrations
title: Integrace
description: "ThingsBoard umožňuje plynulé propojení s externími systémy, cloudovými platformami a datovými službami. Tato sekce popisuje dostupné způsoby integrace, kterými rozšíříte svůj IoT ekosystém a zapnete pokročilé zpracování dat."
title_meta: "Integrace (ThingsBoard)"
---
import Image from '@theme/IdealImage';

# Integrace {#integrations}

ThingsBoard umožňuje plynulé propojení s externími systémy, cloudovými platformami a datovými službami. Tato sekce popisuje dostupné způsoby integrace, kterými rozšíříte svůj IoT ekosystém a zapnete pokročilé zpracování dat.

---

## [ChirpStack](/apps/thingsboard/chirpstack-integration) {#chirpstack}

Připojte svou infrastrukturu LoRaWAN přímo k platformě HARDWARIO ThingsBoard. Tato integrace překlenuje mezeru mezi vaším síťovým serverem ChirpStack a ThingsBoardem, takže můžete spravovat zařízení LoRaWAN, zpracovávat uplinky a posílat downlinky z jednoho rozhraní.

**Integraci s ChirpStackem použijte, když potřebujete:**
- Automaticky mapovat zařízení LoRaWAN na assety v ThingsBoardu
- Vizualizovat telemetrii a metadata z LoRaWAN v reálném čase
- Posílat downlink příkazy (RPC) přímo do svých zařízení LoRaWAN

:::info
Před nastavením integrace si připravte svůj certifikát CA a klientský certifikát. Postup nastavení zabezpečeného MQTT připojení krok za krokem najdete v návodu [ChirpStack MQTT přes TLS](/apps/thingsboard/chirpstack-integration).
:::
