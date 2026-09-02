---
slug: changelog
title: Seznam změn TOWER
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "Tato stránka sleduje všechny podstatné změny napříč platformou TOWER — včetně firmwaru / SDK a hardwarových modulů. Pomocí záložek níže můžete filtrovat podle kategorie změn."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Seznam změn TOWER {#tower-changelog}

Tato stránka sleduje všechny podstatné změny napříč platformou TOWER — včetně **firmwaru / SDK** a **hardwarových modulů**. Pomocí záložek níže můžete filtrovat podle kategorie změn.

:::info

TOWER je aktuálně v **režimu údržby** — dostává pouze opravy chyb a drobná vylepšení. Aktivní vývoj pokračuje na [twr-zephyr](https://github.com/hardwario/twr-zephyr), experimentálním portu Zephyr RTOS pro Core Module.

- Zdrojový kód SDK: [hardwario/twr-sdk](https://github.com/hardwario/twr-sdk)
- Hardwarová schémata: [hardwario/twr-hardware](https://github.com/hardwario/twr-hardware)
- Port pro Zephyr (experimentální): [hardwario/twr-zephyr](https://github.com/hardwario/twr-zephyr)

:::

---

## Obecné aktualizace platformy {#general-platform-updates}

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware a aplikace" default>

### 2025-09-10 {#2025-09-10}

- **[FW/SDK]** `twr-zephyr`: Přidán README a LICENSE — port Zephyr RTOS pro Core Module je nyní zdokumentován

### 2025-03-03 {#2025-03-03}

- **[FW/SDK]** `twr-zephyr`: Přidána ukázková aplikace s tlačítkem

### 2025-02-11 {#2025-02-11}

- **[FW/SDK]** `twr-zephyr`: Aktivní nízkopříkonový časovač pro desku Core Module

### 2025-02-08 {#2025-02-08}

- **[FW/SDK]** `twr-zephyr`: Implementován rádiový subsystém (`twr_radio`) nad Spirit1

### 2023-10-31 {#2023-10-31}

- **[FW/SDK]** `twr-sdk`: Přidána možnost třetího detektoru zaplavení na Sensor Module

### 2023-02-20 {#2023-02-20}

- **[FW/SDK]** `twr-sdk`: Nahrazeno newlib nano knihovnou picolibc — opravuje problémy s formátováním `%llx`

### 2023-01-23 {#2023-01-23}

- **[FW/SDK]** `twr-sdk`: Opraven výpočet prahu alarmu LIS2DH12 pro všechny měřicí rozsahy

### 2022-12-28 {#2022-12-28}

- **[FW/SDK]** `twr-sdk`: Přidána validace parametrů ve funkcích plánovače; přidán typ chyby `invalid parameter`

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

### 2025-04-15 {#2025-04-15}

- Do hardwarového repozitáře přidána knihovna komponent pro Eagle (`hardwario.lbr`)

### 2023-10-13 {#2023-10-13}

- **Serial Dongle R1.0** — přidána schémata

### 2022-04-04 {#2022-04-04}

- **Mini Battery Module** — do schémat přidány informace o konektoru solárního panelu

### 2020-07-14 {#2020-07-14}

- **Battery Module** — aktualizovaná schémata s 3pinovým solárním konektorem

### 2020-05-19 {#2020-05-19}

- **Maxi Base Module R1.0** — přidán výkres schématu

### 2019-12-09 {#2019-12-09}

- **Ethernet Module** a **RS-485 Module** — přidána schémata

### 2019-08-05 {#2019-08-05}

- **GPS Module 1.2** — přidáno schéma

### 2019-05-13 {#2019-05-13}

- **LoRa Module R1.4** — přidáno schéma

### 2018-07-11 {#2018-07-11}

- **Core Module 2.1** — přidán výkres schématu

{/* separator */}
</TabItem>
</Tabs>
