---
slug: changelog
title: Seznam změn TAPPER
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "Přehled všech významných změn platformy TAPPER včetně firmwaru a hardwaru, s filtrováním podle kategorie změn pomocí záložek."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Seznam změn TAPPER {#tapper-changelog}

Na této stránce najdete všechny významné změny platformy TAPPER včetně **firmwaru** a **hardwaru**. Záložkami níže můžete změny filtrovat podle kategorie.

:::info

Zdrojový kód firmwaru: [hardwario/tapper](https://github.com/hardwario/tapper) na GitHubu.

:::

---

## Obecné aktualizace platformy {#general-platform-updates}

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware a aplikace" default>

### 2025-08-12 – v1.2.1 {#2025-08-12--v121}

- **[FW]** Opraveno připojení MQTT bez TLS (chyba zanesená ve verzi v1.2.0)
- **[FW]** Opravena licenční poznámka ve zdrojových souborech

### 2025-06-26 – v1.2.0 {#2025-06-26--v120}

- **[FW]** Konfigurace sítě přes NetworkManager/dbus: zařízení TAPPER nyní může spravovat vlastní síťové rozhraní
- **[FW]** Nové instalační závislosti: `git pipx python3-dev cmake libdbus-1-dev libglib2.0-dev`

### 2025-05-28 – v1.1.0 {#2025-05-28--v110}

- **[FW]** Podpora TLS pro připojení MQTT: zabezpečená komunikace end-to-end

### 2025-05-23 – v1.0.3 {#2025-05-23--v103}

- **[FW]** Opravena logika požadavku na vypnutí LED
- **[FW]** Vylepšení souboru README

### 2025-05-23 – v1.0.2 {#2025-05-23--v102}

- **[FW]** Drobné opravy a vylepšení stability

### 2025-05-23 – v1.0.1 {#2025-05-23--v101}

- **[FW]** První vydání
- **[FW]** Komunikace přes MQTT
- **[FW]** Čtení NFC karet MIFARE Classic
- **[FW]** Detekce stavu spínače tamper
- **[FW]** Vzdálené ovládání výstupu

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

:::info

Zatím tu nejsou zaznamenané žádné hardwarové revize. Změny hardwaru se tu objeví, jakmile vyjdou nové revize desky TAPPER.

:::

{/* separator */}
</TabItem>
</Tabs>
