---
slug: changelog
title: Seznam změn TOWER
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "Přehled všech významných změn platformy TOWER včetně firmwaru, SDK a hardwarových modulů."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Seznam změn TOWER {#tower-changelog}

Tato stránka shrnuje všechny významné změny platformy TOWER včetně **firmwaru / SDK** a **hardwarových modulů**. Záložkami níže je můžete filtrovat podle kategorie.

:::info

Platforma TOWER je v **režimu údržby**: dostává už jen opravy chyb a drobná vylepšení. Aktivní vývoj pokračuje v repozitáři [twr-zephyr](https://github.com/hardwario/twr-zephyr), experimentálním portu Zephyr RTOS pro modul Core Module.

- Zdrojový kód SDK: [hardwario/twr-sdk](https://github.com/hardwario/twr-sdk)
- Hardwarová schémata: [hardwario/twr-hardware](https://github.com/hardwario/twr-hardware)
- Port pro Zephyr (experimentální): [hardwario/twr-zephyr](https://github.com/hardwario/twr-zephyr)
- Nástroj příkazové řádky `tower` a firmware v Rustu: [hardwario/tower](https://github.com/hardwario/tower)
- Desktopová aplikace TOWER Bridge: [hardwario/tower-bridge](https://github.com/hardwario/tower-bridge)

:::

---

## Obecné aktualizace platformy {#general-platform-updates}

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware a aplikace" default>

### 2026-10-23 {#2026-10-23}

- **[App]** `tower-bridge` [v1.1.0](https://github.com/hardwario/tower-bridge/releases/tag/v1.1.0): TOWER Bridge nově upozorní na novější verzi. Jednou denně se zeptá GitHubu na nejnovější vydání (nic dalšího neodesílá) a zobrazí **Update Available** v nabídce v oznamovací oblasti, banner na Dashboardu a jedno upozornění pro každou verzi. Sama nic neinstaluje; kontrolu lze vypnout v *Settings → About*. Při přechodu z 1.0.x aplikaci ukončete a nový soubor dejte místo starého; nastavení i historie zůstanou zachovány

### 2026-10-19 {#2026-10-19}

- **[App]** `tower-bridge` [v1.0.1](https://github.com/hardwario/tower-bridge/releases/tag/v1.0.1): Opravné vydání pro macOS. Upozornění na aktuálním macOS opět fungují (ve verzi 1.0.0 se nezobrazovalo nic, ani žádost o oprávnění) a na macOS 13 a novějším **Open at Login** registruje TOWER Bridge jako položku spouštěnou při přihlášení pod vlastním názvem místo položky na pozadí s názvem „HARDWARIO a.s.“. Uživatelé verze 1.0.0 na macOS by měli aktualizovat
- **[App]** `tower-bridge` [v1.0.0](https://github.com/hardwario/tower-bridge/releases/tag/v1.0.0): První vydání TOWER Bridge, aplikace v oznamovací oblasti a nástroje příkazové řádky (`tower-bridge-cli`) pro modul TOWER Bridge Module na Windows, macOS a Linuxu, navazující na nástroj `enmon`. Čte moduly Climate Module, CO2 Module, GPS Module, Relay Module a tagy Humidity, Temperature, Lux Meter, Barometer, VOC-LP a NFC Tag; nabízí dashboard s historií, tabulku dat s exportem do CSV a XLSX a alarmy s upozorněními; hodnoty publikuje přes MQTT a volitelně přes lokální REST API, metriky Prometheus a server MCP. Sestavení pro Windows a macOS jsou podepsaná

### 2026-10-18 {#2026-10-18}

- **[CLI]** `tower` [cli-v1.1.0](https://github.com/hardwario/tower/releases/tag/cli-v1.1.0): Druhé vydání nástroje příkazové řádky, ve stejný den jako 1.0.0, s odpovídajícími obrazy firmwaru. Viz [úplný seznam commitů](https://github.com/hardwario/tower/compare/cli-v1.0.0...cli-v1.1.0)
- **[CLI]** `tower` [cli-v1.0.0](https://github.com/hardwario/tower/releases/tag/cli-v1.0.0): První vydání nástroje `tower` pro příkazovou řádku a terminál, určeného pro nový stack TOWER v Rustu. Dekóduje konzolové spojení firmwaru TOWER (logy, události, shell), přes UART bootloader STM32 nahrává firmware, maže, resetuje a identifikuje desky a přemosťuje rádiovou síť do MQTT (`tower gateway`). Sestavení pro Linux (x86_64, ARM64, Raspberry Pi), macOS a Windows. `tower` komunikuje jen s firmwarem sestaveným ze stejných zdrojů: nahrajte obrazy dodané s vydáním (`radio_push_button.bin`, `radio_dongle_gateway.bin`, `blinky.bin`) nebo sestavte firmware z tagu

### 2025-09-10 {#2025-09-10}

- **[FW/SDK]** `twr-zephyr`: Přidány soubory README a LICENSE, port Zephyr RTOS pro modul Core Module je tak zdokumentovaný

### 2025-03-03 {#2025-03-03}

- **[FW/SDK]** `twr-zephyr`: Přidána ukázková aplikace s tlačítkem

### 2025-02-11 {#2025-02-11}

- **[FW/SDK]** `twr-zephyr`: Zapnut časovač s nízkou spotřebou (low power timer) pro desku Core Module

### 2025-02-08 {#2025-02-08}

- **[FW/SDK]** `twr-zephyr`: Implementován rádiový subsystém (`twr_radio`) nad Spirit1

### 2023-10-31 {#2023-10-31}

- **[FW/SDK]** `twr-sdk`: Přidána možnost připojit třetí detektor zaplavení k modulu Sensor Module

### 2023-02-20 {#2023-02-20}

- **[FW/SDK]** `twr-sdk`: Knihovna newlib nano nahrazena knihovnou picolibc, což opravuje problémy s formátováním `%llx`

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

- **Serial Dongle R1.0**: přidána schémata

### 2022-04-04 {#2022-04-04}

- **Mini Battery Module**: do schémat přidány informace o konektoru solárního panelu

### 2020-07-14 {#2020-07-14}

- **Battery Module**: aktualizována schémata s 3pinovým konektorem pro solární panel

### 2020-05-19 {#2020-05-19}

- **Maxi Base Module R1.0**: přidán výkres schématu

### 2019-12-09 {#2019-12-09}

- **Ethernet Module** a **RS-485 Module**: přidána schémata

### 2019-08-05 {#2019-08-05}

- **GPS Module 1.2**: přidáno schéma

### 2019-05-13 {#2019-05-13}

- **LoRa Module R1.4**: přidáno schéma

### 2018-07-11 {#2018-07-11}

- **Core Module 2.1**: přidán výkres schématu

{/* separator */}
</TabItem>
</Tabs>
