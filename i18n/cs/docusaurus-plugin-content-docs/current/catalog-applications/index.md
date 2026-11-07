---
slug: catalog-applications
title: Katalogové aplikace
description: "Katalogové aplikace jsou hotový firmware pro CHESTER na běžné úlohy: co která umí, jaký hardware potřebuje a jak vypadají její data."
---
import Image from '@theme/IdealImage';

# Katalogové aplikace {#catalog-applications}

Tento článek popisuje takzvané **katalogové aplikace** pro platformu **CHESTER**.

**CHESTER** je rozšiřitelná IoT brána s nízkou spotřebou a otevřeným SDK postaveným nad operačním systémem **Zephyr**. Pro okamžité nasazení nabízí **HARDWARIO** několik aplikací pro konkrétní využití. Tyto **katalogové aplikace** dodává **HARDWARIO** s krátkou dodací lhůtou. Jejich zdrojové kódy jsou součástí **CHESTER SDK** a aplikace průběžně vylepšujeme, udržujeme a podporujeme.

**Katalogové aplikace** jsou také dobrým výchozím bodem pro vlastní firmwarovou aplikaci.

## Seznam aplikací {#application-list}

Jak jednotlivé katalogové aplikace fungují, zjistíte po kliknutí na název aplikace v tabulce níže.

Funkce společné všem aplikacím popisuje samostatný článek [**Společné funkce**](common-functionality.md).

Firmware ke stažení, konfigurační parametry a formát dat najdete v sekci [**Firmware**](../firmware/index.md).



| Aplikace | Účel aplikace | LoRaWAN | BLE tagy | Záložní modul (Z1) | 1-Wire (DS18B20) | Externí napájení |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| [**CHESTER Clime**](chester-clime/index.md) | Měření teploty, vlhkosti a IAQ | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |
| [**CHESTER Control**](chester-control/index.md) | Řízení 4 vstupů/výstupů | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |
| [**CHESTER Current**](chester-current/index.md) | Měření AC/DC proudu (4 kanály) | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Meteo**](chester-meteo/index.md) | Měření vítru, tlaku a počasí | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Motion**](chester-motion/index.md) | Detekce pohybu dvěma senzory PIR | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Push**](chester-push/index.md) | Hlášení stiskem tlačítka | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |
| [**CHESTER Range**](chester-range/index.md) | Ultrazvukové měření vzdálenosti | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Scale**](chester-scale/index.md) | Sledování hmotnosti (váhy) | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Serial**](chester-serial/index.md) | Brána Modbus pro RS-232/RS-485 | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |
| [**CHESTER wM-Bus**](chester-wm-bus/index.md) | Brána pro bezdrátový M-Bus | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |



:::info

- Varianta **CHESTER Clime IAQ** používá pro externí napájení modul CHESTER-X10 (6–28 V)
- **CHESTER Control** používá modul CHESTER-X4 se snižujícím měničem (step-down) a digitálními výstupy
- **CHESTER Push** používá modul CHESTER-Z1-F, který kombinuje záložní baterii s napájecím zdrojem; zařízení může běžet i jen na baterii
- **CHESTER wM-Bus** se dodává v bateriové variantě (primární články, jmenovité napětí 3,6 V, 26 000 mAh) nebo ve variantě DC s externím síťovým adaptérem (230 V AC)
- **CHESTER Serial** používá modul CHESTER-X12 (RS-232) nebo CHESTER-X2 (RS-485) s externím napájecím vstupem (6–28 V)

:::
