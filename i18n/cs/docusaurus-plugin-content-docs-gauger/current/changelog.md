---
slug: changelog
title: Seznam změn GAUGER
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "Přehled všech významných změn platformy GAUGER včetně firmwaru a hardwaru, s filtrováním podle kategorie změn pomocí záložek."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Seznam změn GAUGER {#gauger-changelog}

Na této stránce najdete všechny významné změny platformy GAUGER včetně **firmwaru** a **hardwaru**. Záložkami níže můžete změny filtrovat podle kategorie.

:::info

Firmware zařízení GAUGER vydává HARDWARIO interním procesem (aktualizace OTA přes webové rozhraní zařízení). Veřejný repozitář firmwaru GAUGER zatím neexistuje.

:::

---

## Obecné aktualizace platformy {#general-platform-updates}

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware a aplikace" default>

### 2025-12-15 – v1.6.0 {#2025-12-15--v160}

- **[FW]** Opraveny úniky paměti v HTTP serveru a v ovladači FRAM
- **[FW]** Opravena přetečení bufferů při zpracování konfigurace a v HTTP serveru
- **[FW]** Zlepšena vláknová bezpečnost: statické buffery přesunuty na zásobník
- **[FW]** Wi-Fi se nyní automaticky znovu připojuje s exponenciálně rostoucí prodlevou
- **[FW]** Přidány kontroly nulového ukazatele u síťového rozhraní
- **[FW]** Opraveno zaseknutí vstupu 4, který přestal počítat
- **[FW]** ESP-IDF aktualizováno z verze 5.2.0 na 5.5.1

### 2025-08-29 – v1.5.1 {#2025-08-29--v151}

- **[FW]** Důvod resetu se nyní hlásí v `/api/v1/meta`
- **[FW]** Reset od watchdogu nyní vyvolá paniku, místo aby zařízení tiše selhalo
- **[FW]** Logy zůstávají v trvalé paměti i po restartu

### 2025-07-24 – v1.5.0 {#2025-07-24--v150}

- **[FW]** K této verzi nebyly zaznamenány žádné poznámky k vydání

### 2024-03-14 – v1.2.3 {#2024-03-14--v123}

- **[FW]** Zlepšeno zpracování chyb
- **[FW]** Firmware lze vrátit zpět tlačítkem USER
- **[FW]** Zařízení rozesílá svůj chybový stav

### 2024-03-01 – v1.2.2 {#2024-03-01--v122}

- **[FW]** Vylepšení webového rozhraní
- **[FW]** Přepracováno vyhledávání sítí Wi-Fi

### 2024-03-01 – v1.2.1 {#2024-03-01--v121}

- **[FW]** Nové vyskakovací okno pro vyhledávání sítí Wi-Fi a lepší zpracování chyb
- **[FW]** Přesměrování po změně nastavení sítě
- **[FW]** Odstraněna kontrola podsítě
- **[FW]** Vzhledová a ovládací vylepšení a řada oprav chyb

### 2024-03-01 – v1.2.0 {#2024-03-01--v120}

- **[FW]** Ukládání stavů čítačů nyní používá žurnál
- **[FW]** Logování webového rozhraní je nyní vláknově bezpečné
- **[FW]** Nové chování LED
- **[FW]** Opraveno samovolné nulování čítačů
- **[FW]** Opraveno: `factory_reset` neposílal odpověď
- **[FW]** Opraveny vzhledové chyby ve výběru SSID

### 2024-02-16 – v1.1.0 {#2024-02-16--v110}

- **[FW]** K této verzi nebyly zaznamenány žádné poznámky k vydání

### 2024-01-22 – v1.0.0 {#2024-01-22--v100}

- **[FW]** První vydání

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

:::info

Zatím nebyly zaznamenány žádné hardwarové revize.

:::

{/* separator */}
</TabItem>
</Tabs>
