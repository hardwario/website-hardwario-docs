---
slug: changelog
title: Seznam změn GAUGER
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "Tato stránka sleduje všechny významné změny na platformě GAUGER včetně firmwaru a hardwaru. Kategorie změn filtrujte pomocí záložek níže."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Seznam změn GAUGER {#gauger-changelog}

Tato stránka sleduje všechny významné změny na platformě GAUGER, včetně **firmwaru** a **hardwaru**. Pomocí záložek níže můžete filtrovat podle kategorie změn.

:::info

Firmware GAUGER je spravován interním procesem vydávání ve společnosti HARDWARIO (OTA aktualizace přes webové rozhraní zařízení). Pro GAUGER momentálně neexistuje veřejný repozitář firmwaru.

:::

---

## Obecné aktualizace platformy {#general-platform-updates}

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware a aplikace" default>

### 2025-12-15 – v1.6.0 {#2025-12-15--v160}

- **[FW]** Opraveny úniky paměti v HTTP serveru a v ovladači FRAM
- **[FW]** Opraveno přetečení bufferu při zpracování konfigurace a v HTTP serveru
- **[FW]** Zlepšena bezpečnost vláken: statické buffery přesunuty na zásobník
- **[FW]** Wi-Fi se nyní připojuje automaticky znovu, s exponenciálním odstupem
- **[FW]** Přidány kontroly prázdného ukazatele na síťovém rozhraní
- **[FW]** Opraven 4. vstup, který se zasekl a přestal počítat
- **[FW]** Aktualizováno ESP-IDF z 5.2.0 na 5.5.1

### 2025-08-29 – v1.5.1 {#2025-08-29--v151}

- **[FW]** Důvod resetu se nyní hlásí v `/api/v1/meta`
- **[FW]** Reset od watchdogu nyní vyvolá paniku místo tichého selhání
- **[FW]** Logy zůstávají v trvalé paměti i po restartu

### 2025-07-24 – v1.5.0 {#2025-07-24--v150}

- **[FW]** K této verzi nebyly zaznamenány žádné poznámky k vydání

### 2024-03-14 – v1.2.3 {#2024-03-14--v123}

- **[FW]** Zlepšeno zpracování chyb
- **[FW]** Firmware lze vrátit zpět tlačítkem USER
- **[FW]** Zařízení hlásí svůj chybový stav

### 2024-03-01 – v1.2.2 {#2024-03-01--v122}

- **[FW]** Vylepšení webového rozhraní
- **[FW]** Přepracováno vyhledávání sítí Wi-Fi

### 2024-03-01 – v1.2.1 {#2024-03-01--v121}

- **[FW]** Nové vyskakovací okno pro vyhledávání Wi-Fi a lepší zpracování chyb
- **[FW]** Přesměrování po změně nastavení sítě
- **[FW]** Odstraněna validace podsítě
- **[FW]** Vzhledová a ovládací vylepšení a řada oprav chyb

### 2024-03-01 – v1.2.0 {#2024-03-01--v120}

- **[FW]** Ukládání stavu čítačů nyní žurnálované
- **[FW]** Logování z webu je bezpečné vůči vláknům
- **[FW]** Nové chování LED
- **[FW]** Opraveno samovolné nulování čítačů
- **[FW]** Opraveno, že `factory_reset` neposílal odpověď
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
