---
slug: integrations
title: Integrace
description: "Integrace HARDWARIO Dashboards se síťovým serverem ChirpStack: mapování zařízení LoRaWAN, zobrazení jejich telemetrie a příkazy přes downlink."
title_meta: "Integrace (HARDWARIO Dashboards)"
---
import Image from '@theme/IdealImage';

# Integrace {#integrations}

HARDWARIO Dashboards se snadno propojí s externími systémy, cloudovými platformami a datovými službami. Tato sekce popisuje dostupné způsoby integrace, kterými svůj ekosystém IoT rozšíříte o pokročilé zpracování dat.

---

## [ChirpStack](/apps/thingsboard/chirpstack-integration) {#chirpstack}

Připojte svou infrastrukturu LoRaWAN přímo k HARDWARIO Dashboards. Integrace propojí síťový server ChirpStack s HARDWARIO Dashboards, takže v jednom rozhraní spravujete zařízení LoRaWAN, zpracováváte uplinky a posíláte downlinky.

**Integraci se serverem ChirpStack použijte, když potřebujete:**
- Automaticky mapovat zařízení LoRaWAN na assety
- Vizualizovat telemetrii a metadata z LoRaWAN v reálném čase
- Posílat příkazy přes downlink (RPC) přímo do zařízení LoRaWAN

:::info
Před nastavením integrace si připravte certifikát CA a klientský certifikát. Postup nastavení zabezpečeného připojení MQTT krok za krokem najdete v návodu [ChirpStack MQTT přes TLS](/apps/thingsboard/chirpstack-integration).
:::

:::info Dokumentace ThingsBoard
HARDWARIO Dashboards jsou postavené na platformě ThingsBoard. Podrobnosti najdete v oficiální dokumentaci ThingsBoard (anglicky): [Integrations](https://thingsboard.io/docs/pe/user-guide/integrations/).
:::
