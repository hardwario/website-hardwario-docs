---
slug: integrations
title: Integrace
title_meta: "Integrace (ThingsBoard)"
---
import Image from '@theme/IdealImage';

# Integrace {#integrations}

ThingsBoard se snadno propojí s externími systémy, cloudovými platformami a datovými službami. Tato sekce popisuje dostupné způsoby integrace, kterými svůj ekosystém IoT rozšíříte o pokročilé zpracování dat.

---

## [ChirpStack](/apps/thingsboard/chirpstack-integration) {#chirpstack}

Připojte svou infrastrukturu LoRaWAN přímo k platformě HARDWARIO ThingsBoard. Integrace propojí síťový server ChirpStack s platformou ThingsBoard, takže v jednom rozhraní spravujete zařízení LoRaWAN, zpracováváte uplinky a posíláte downlinky.

**Integraci se serverem ChirpStack použijte, když potřebujete:**
- Automaticky mapovat zařízení LoRaWAN na assety v platformě ThingsBoard
- Vizualizovat telemetrii a metadata z LoRaWAN v reálném čase
- Posílat příkazy přes downlink (RPC) přímo do zařízení LoRaWAN

:::info
Před nastavením integrace si připravte certifikát CA a klientský certifikát. Postup nastavení zabezpečeného připojení MQTT krok za krokem najdete v návodu [ChirpStack MQTT přes TLS](/apps/thingsboard/chirpstack-integration).
:::
