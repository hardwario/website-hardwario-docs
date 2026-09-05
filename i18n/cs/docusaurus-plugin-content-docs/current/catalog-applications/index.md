---
slug: catalog-applications
title: Katalogové aplikace
description: "Tento článek přináší informace o takzvaných katalogových aplikacích pro platformu CHESTER."
---
import Image from '@theme/IdealImage';

# Katalogové aplikace {#catalog-applications}

Tento článek přináší informace o takzvaných **katalogových aplikacích** pro platformu **CHESTER**.

**CHESTER** je rozšiřitelná low-power IoT brána s otevřeným SDK postaveným nad operačním systémem **Zephyr**. Pro okamžité nasazení nabízí **HARDWARIO** několik aplikací pro konkrétní použití. Tyto **katalogové aplikace** jsou od **HARDWARIO** dostupné s krátkou dodací lhůtou. Aplikace mají zdrojové kódy dostupné jako součást **CHESTER SDK** a jsou aktivně vylepšovány, udržovány a podporovány.

**Katalogové aplikace** také slouží jako výborný odrazový můstek pro vaši vlastní firmwarovou aplikaci.

## Seznam aplikací {#application-list}

Podrobnosti o tom, jak jednotlivé katalogové aplikace fungují, zobrazíte kliknutím na název aplikace v tabulce níže.

Společné funkce jsou popsány ve zvláštním článku [**Společná funkcionalita**](common-functionality.md).

Firmwary najdete v kapitole [**Firmware aplikací**](#application-firmware).



| Aplikace | Účel aplikace | LoRaWAN | BLE tagy | Záložní modul (Z1) | 1-Wire (DS18B20) | Externí napájení |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| [**CHESTER Clime**](chester-clime.md) | Měření teploty, vlhkosti a IAQ | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |
| [**CHESTER Control**](chester-control.md) | Řízení 4 vstupů/výstupů | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |
| [**CHESTER Current**](chester-current.md) | Měření AC/DC proudu (4 kanály) | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Meteo**](chester-meteo.md) | Měření vítru, tlaku a počasí | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Motion**](chester-motion.md) | Detekce pohybu dvěma PIR senzory | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Push**](chester-push.md) | Alarmování tlačítkem | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |
| [**CHESTER Range**](chester-range.md) | Ultrazvukové měření vzdálenosti | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Scale**](chester-scale.md) | Monitorování hmotnosti na váze | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> |
| [**CHESTER Serial**](chester-serial.md) | Modbus brána RS-232/RS-485 | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |
| [**CHESTER wM-Bus**](chester-wm-bus.md) | Brána pro bezdrátový M-Bus | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/cross.png" width="27" data-zoomable="false" alt="Nepodporováno" /> | <img src="/img/check.png" width="27" data-zoomable="false" alt="Podporováno" /> |



:::info

- Varianta **CHESTER Clime IAQ** používá CHESTER-X10 pro externí vstup napájení (6-28V)
- **CHESTER Control** používá modul CHESTER-X4 pro step-down napájení a digitální výstupy
- **CHESTER Push** používá CHESTER-Z1-F, který kombinuje záložní baterii s napájením; může běžet i pouze z baterie
- **CHESTER wM-Bus** je dostupný v bateriové variantě (6x článek D) nebo ve variantě DC s externím adaptérem 230V
- **CHESTER Serial** používá CHESTER-X12 (RS-232) nebo CHESTER-X2 (RS-485) s externím vstupem napájení (5-28V)

:::


## Firmware aplikací pro Cloud v2 {#application-firmware}

Tyto firmwary jsou pro novější komunikaci s [**Cloud v2**](/cloud/).

Pokud vaše jednotka již komunikovala s Cloud v2, můžete aktualizovat pouze hlavní [**firmware APP/BLE MCU přes BLE**](../platform-connectivity/hardwario-manager.md#firmware-update).

Pokud byla vaše jednotka dříve používána s Cloud v1, musíte nejdříve aktualizovat [**firmware LTE modemu**](../firmware-sdk/how-to-lte-v2.md#flash-lte-modem-firmware).


:::info

Některé katalogové aplikace jsou postavené tak, že funkcionalita NB-IoT/LTE i LoRaWAN je v jediném firmwaru. Je potřeba nastavit komunikační režim.

Výchozí chování je, že zařízení **nepoužívá žádné rádio** (režim `none`), bliká oranžová LED a je nutné nastavit konfigurační parametr **mode**.

- `app config mode lte` pro síť NB-IoT/LTE
- `app config mode lrw` pro síť LoRaWAN

Poté změny uložte příkazem `config save`. Zařízení se restartuje a použije správnou síť.

:::

#### Dostupné buildy firmwaru aplikací {#available-application-firmware-builds}

*SDK **v4.0.0** · NCS **3.4.0** · Zephyr **4.4.1** · [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v4.0.0)*

<div className="firmware-builds-table">

| Název aplikace | Verze | Identifikátor | Datum buildu | Poznámka |
| :--- | :--- | :---: | :---: | :--- |
| [**CHESTER Clime**](chester-clime.md#chester-clime) | [**v4.0.0**](https://firmware.hardwario.com/chester/86dc4442f17a466e80bbd7899bdc344d) | <small>`86dc4442f17a466e80bbd7899bdc344d`</small> | 2026-08-10 |  |
| [**CHESTER Clime IAQ**](chester-clime.md#chester-clime-iaq) | [**v4.0.0**](https://firmware.hardwario.com/chester/1d0f4d4bca4d4ac98e3fe1e5694cd756) | <small>`1d0f4d4bca4d4ac98e3fe1e5694cd756`</small> | 2026-08-10 |  |
| [**CHESTER Clime RTD**](chester-clime.md#chester-clime-rtd) | [**v4.0.0**](https://firmware.hardwario.com/chester/ce650dfedcff467f955f4a6e60dc5fd2) | <small>`ce650dfedcff467f955f4a6e60dc5fd2`</small> | 2026-08-10 |  |
| [**CHESTER Clime TC**](chester-clime.md#chester-clime-tc) | [**v4.0.0**](https://firmware.hardwario.com/chester/89d1ea185a35468989c3c675f486c141) | <small>`89d1ea185a35468989c3c675f486c141`</small> | 2026-08-10 |  |
| [**CHESTER Clime SPS30**](chester-clime.md) | [**v4.0.0**](https://firmware.hardwario.com/chester/bb86d55e19904d0295063a1e643715d6) | <small>`bb86d55e19904d0295063a1e643715d6`</small> | 2026-08-10 |  |
| [**CHESTER Clime Radon**](chester-clime.md) | [**v4.0.0**](https://firmware.hardwario.com/chester/9441cc4abb7d49ec8496f9246ea88865) | <small>`9441cc4abb7d49ec8496f9246ea88865`</small> | 2026-08-10 |  |
| [**CHESTER Control**](chester-control.md#chester-control) | [**v4.0.0**](https://firmware.hardwario.com/chester/9bfe1038ecec48bfa6515858ebb00c8d) | <small>`9bfe1038ecec48bfa6515858ebb00c8d`</small> | 2026-08-10 |  |
| [**CHESTER Control 8Ch Z**](chester-control.md) | [**v4.0.0**](https://firmware.hardwario.com/chester/524b75145769423a835e92fe510f6622) | <small>`524b75145769423a835e92fe510f6622`</small> | 2026-08-10 | Podpora druhého modulu X0 ve slotu B (8 kanálů) a CHESTER-Z |
| [**CHESTER Control Z**](chester-control.md#chester-control-z) | [**v4.0.0**](https://firmware.hardwario.com/chester/6e70c29332114720bee4323e1ae91634) | <small>`6e70c29332114720bee4323e1ae91634`</small> | 2026-08-10 | Podpora CHESTER-Z |
| [**CHESTER Current**](chester-current.md#chester-current-1) | [**v4.0.0**](https://firmware.hardwario.com/chester/218eb822e7d7463b95dd8505d0b715a3) | <small>`218eb822e7d7463b95dd8505d0b715a3`</small> | 2026-08-10 |  |
| [**CHESTER Current Z**](chester-current.md#chester-current-z) | [**v4.0.0**](https://firmware.hardwario.com/chester/26467563906c433192b557dfdf0a21d9) | <small>`26467563906c433192b557dfdf0a21d9`</small> | 2026-08-10 | Podpora CHESTER-Z |
| **CHESTER Demo** | [**v4.0.0**](https://firmware.hardwario.com/chester/4f5bbf9d912a44e4959e379f9e5e4afc) | <small>`4f5bbf9d912a44e4959e379f9e5e4afc`</small> | 2026-08-10 |  |
| [**CHESTER Meteo**](chester-meteo.md#chester-meteo) | [**v4.0.0**](https://firmware.hardwario.com/chester/68ca9b1154d54ecf96416644163f0378) | <small>`68ca9b1154d54ecf96416644163f0378`</small> | 2026-08-10 |  |
| [**CHESTER Meteo Z**](chester-meteo.md#chester-meteo-z) | [**v4.0.0**](https://firmware.hardwario.com/chester/a1480cab823f43ebbe60d17cffa61d37) | <small>`a1480cab823f43ebbe60d17cffa61d37`</small> | 2026-08-10 | Podpora CHESTER-Z |
| [**CHESTER Meteo P**](chester-meteo.md) | [**v4.0.0**](https://firmware.hardwario.com/chester/b3f4f2d6b17241c1a86d922991b8c5eb) | <small>`b3f4f2d6b17241c1a86d922991b8c5eb`</small> | 2026-08-10 | Podpora pyranometru |
| [**CHESTER Meteo M**](chester-meteo.md) | [**v4.0.0**](https://firmware.hardwario.com/chester/0005c49e167441ccad985465a5b9b76f) | <small>`0005c49e167441ccad985465a5b9b76f`</small> | 2026-08-10 | Varianta Modbus s podporou senzorů Lambrecht a Sensecap/OPM (volba přes meteo-type) |
| [**CHESTER Motion**](chester-motion.md#chester-motion) | [**v4.0.0**](https://firmware.hardwario.com/chester/8f33773522e84b64a767547526914547) | <small>`8f33773522e84b64a767547526914547`</small> | 2026-08-10 |  |
| [**CHESTER Push**](chester-push.md#chester-push) | [**v4.0.0**](https://firmware.hardwario.com/chester/afa08a5aff3948b7b4238d4c9e044c7d) | <small>`afa08a5aff3948b7b4238d4c9e044c7d`</small> | 2026-08-10 |  |
| [**CHESTER Push FM**](chester-push.md) | [**v4.0.0**](https://firmware.hardwario.com/chester/b52ef7d705cf42b883fcaee1f024ae1f) | <small>`b52ef7d705cf42b883fcaee1f024ae1f`</small> | 2026-08-10 |  |
| [**CHESTER Range**](chester-range.md#chester-range) | [**v4.0.0**](https://firmware.hardwario.com/chester/949bf6a1220146849d7ba711632ef7bc) | <small>`949bf6a1220146849d7ba711632ef7bc`</small> | 2026-08-10 |  |
| [**CHESTER Range Z**](chester-range.md#chester-range-z) | [**v4.0.0**](https://firmware.hardwario.com/chester/2bc41e650fc54b069d7d08c4977b8644) | <small>`2bc41e650fc54b069d7d08c4977b8644`</small> | 2026-08-10 | Podpora CHESTER-Z |
| [**CHESTER Scale**](chester-scale.md#chester-scale) | [**v4.0.0**](https://firmware.hardwario.com/chester/e30ae54e3d00439a92bea441df62993a) | <small>`e30ae54e3d00439a92bea441df62993a`</small> | 2026-08-10 |  |
| [**CHESTER Scale Z**](chester-scale.md#chester-scale-z) | [**v4.0.0**](https://firmware.hardwario.com/chester/755c61dd167f4244ba456fa244de9bd9) | <small>`755c61dd167f4244ba456fa244de9bd9`</small> | 2026-08-10 | Podpora CHESTER-Z |
| [**CHESTER Serial RS-485**](chester-serial.md#chester-serial-rs-485) | [**v4.0.0**](https://firmware.hardwario.com/chester/163b633d47e546a1bb261d1555eee64f) | <small>`163b633d47e546a1bb261d1555eee64f`</small> | 2026-08-10 | RS-485 (multi-drop, max. 8 zařízení) |
| [**CHESTER Serial RS-232**](chester-serial.md#chester-serial-rs-232) | [**v4.0.0**](https://firmware.hardwario.com/chester/e8b8facaea3941629c3d254804b429e1) | <small>`e8b8facaea3941629c3d254804b429e1`</small> | 2026-08-10 | RS-232 (point-to-point, max. 1 zařízení) |
| [**CHESTER wM-Bus**](chester-wm-bus.md#chester-wm-bus-1) | [**v4.0.0**](https://firmware.hardwario.com/chester/26e000736e254c588279ee869aae3be0) | <small>`26e000736e254c588279ee869aae3be0`</small> | 2026-08-10 |  |

</div>

## Firmware aplikací pro Cloud v1 {#application-firmware-cloud-v1}

Tyto firmwary jsou pro starší komunikaci s [**Cloud v1**](/cloud/legacy).

Tabulka níže poskytuje přehled dostupných buildů firmwaru pro **katalogové aplikace**.

Pro nahrání firmwaru použijte aplikaci [**HARDWARIO Manager**](../platform-connectivity/hardwario-manager.md) na svém telefonu nebo postupujte podle článku [**Nahrání firmwaru**](../firmware-flashing/index.md).

:::info

Počínaje firmwarem **v2.3.0** jsou katalogové aplikace postavené tak, že funkcionalita NB-IoT/LTE i LoRaWAN je v jediném firmwaru. Režim je potřeba nastavit
nejen u nových zařízení, ale také **při aktualizaci ze starší verze firmwaru**.

Výchozí chování je, že zařízení **nepoužívá žádné rádio** (režim `none`) a je nutné nastavit konfigurační parametr **mode**.

- `app config mode lte` pro síť NB-IoT/LTE
- `app config mode lrw` pro síť LoRaWAN

Poté změny uložte příkazem `config save`. Zařízení se restartuje a použije správnou síť.

:::


| Název aplikace | Verze | Identifikátor | Datum buildu | Poznámka |
| :--- | :--- | :---: | :---: | :--- |
| [**CHESTER Clime**](chester-clime.md#chester-clime) | [**v2.3.0**](https://firmware.hardwario.com/chester/55e7f6ba38c04b88aa68ad7ec2b3f353) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`55e7f6ba38c04b88aa68ad7ec2b3f353`</small> | 2023-08-02 |  |
| [**CHESTER Clime Z**](chester-clime.md#chester-clime-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/ed45be6253344349a9b8ddc71a0cc673) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`ed45be6253344349a9b8ddc71a0cc673`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Clime IAQ**](chester-clime.md#chester-clime-iaq) | [**v2.3.2**](https://firmware.hardwario.com/chester/e0c41bfdc19a421c95bc245642c65813) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`e0c41bfdc19a421c95bc245642c65813`</small> | 2024-04-16 | Podpora **CHESTER-X10** |
| [**CHESTER Clime 1W**](chester-clime.md#chester-clime-1w) | [**v2.3.0**](https://firmware.hardwario.com/chester/5658239a71e34ef8ab6f703e45c1bbc2) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`5658239a71e34ef8ab6f703e45c1bbc2`</small> | 2023-08-02 |  |
| [**CHESTER Clime 1WH**](chester-clime.md#chester-clime-1wh) | [**v2.3.0**](https://firmware.hardwario.com/chester/86c4d01e7bfc452aa4ecd2bfc3e0f7c1) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`86c4d01e7bfc452aa4ecd2bfc3e0f7c1`</small> | 2023-08-02 | Podpora **CHESTER-S2**, **1-Wire** |
| [**CHESTER Clime RTD**](chester-clime.md#chester-clime-rtd) | [**v2.3.0**](https://firmware.hardwario.com/chester/78014d06151f41e39be6c491dbac696b) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`78014d06151f41e39be6c491dbac696b`</small> | 2023-08-02 |  |
| [**CHESTER Push**](chester-push.md#chester-push) | [**v2.3.0**](https://firmware.hardwario.com/chester/a2f47dd13c1f4a94ae68af09aa54e089) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`a2f47dd13c1f4a94ae68af09aa54e089`</small> | 2023-08-02 |  |
| [**CHESTER Push FM**](chester-push.md#chester-push) | [**v2.3.0**](https://firmware.hardwario.com/chester/cfdceffeaac04051a5dbd46a1ece73e5) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`cfdceffeaac04051a5dbd46a1ece73e5`</small> | 2023-08-02 |  |
| [**CHESTER Counter**](legacy/chester-counter.md#chester-counter) | [**v2.3.0**](https://firmware.hardwario.com/chester/31f2a2b55135499c896e1359373b5152) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`31f2a2b55135499c896e1359373b5152`</small> | 2023-08-02 |  |
| [**CHESTER Counter Z**](legacy/chester-counter.md#chester-counter-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/b035e5e4b948433fb994634a118e20fb) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`b035e5e4b948433fb994634a118e20fb`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Input**](legacy/chester-input.md#chester-input) | [**v2.3.2**](https://firmware.hardwario.com/chester/e97898e1678d4dbdb36184d459824f42) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`e97898e1678d4dbdb36184d459824f42`</small> | 2023-08-28 | Podpora **1-Wire** |
| [**CHESTER Input Z**](legacy/chester-input.md#chester-input-z) | [**v2.3.2**](https://firmware.hardwario.com/chester/9f88cb71a28446049a1be89d523447e7) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`9f88cb71a28446049a1be89d523447e7`</small> | 2023-08-28 | Podpora **CHESTER-Z1**, **1-Wire** |
| [**CHESTER Input ZH**](legacy/chester-input.md#chester-input-zh) | [**v2.3.2**](https://firmware.hardwario.com/chester/2e1e0c362223406da9ad70b9da5b23d1) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`2e1e0c362223406da9ad70b9da5b23d1`</small> | 2023-08-28 | Podpora **CHESTER-Z1**, **1-Wire**, **S2** |
| [**CHESTER Current**](chester-current.md#chester-current-1) | [**v2.3.0**](https://firmware.hardwario.com/chester/52177a80039543d38725d4d9f57590ea) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`52177a80039543d38725d4d9f57590ea`</small> | 2023-08-02 |  |
| [**CHESTER Current Z**](chester-current.md#chester-current-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/fa2f25c0de5643e6ad77bcc118aad30c) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`fa2f25c0de5643e6ad77bcc118aad30c`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Current 1W**](chester-current.md#chester-current-1w) | [**v2.3.0**](https://firmware.hardwario.com/chester/80ecf08298914cdb9df632ca749e309e) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`80ecf08298914cdb9df632ca749e309e`</small> | 2023-08-02 |  |
| [**CHESTER Scale**](chester-scale.md#chester-scale) | [**v2.3.0**](https://firmware.hardwario.com/chester/c37b56df73cf4272b301a8f00eb1486d) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`c37b56df73cf4272b301a8f00eb1486d`</small> | 2023-08-02 |  |
| [**CHESTER Scale Z**](chester-scale.md#chester-scale-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/489e5fb2b9d943d28d4f1b2aba3ed540) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`489e5fb2b9d943d28d4f1b2aba3ed540`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Meteo**](chester-meteo.md#chester-meteo) | [**v2.3.0**](https://firmware.hardwario.com/chester/7e886270374f4ebba8712324630c96b7) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`7e886270374f4ebba8712324630c96b7`</small> | 2023-08-02 |  |
| [**CHESTER Meteo Z**](chester-meteo.md#chester-meteo-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/ef86634d1ad04d06a55c760333aa7a5e) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`ef86634d1ad04d06a55c760333aa7a5e`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Range**](chester-range.md#chester-range) | [**v2.3.1**](https://firmware.hardwario.com/chester/5c3cc2b6-b263-4f39-90ac-d409771bfaee) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`5c3cc2b6b2634f3990acd409771bfaee`</small> | 2024-03-20 |  |
| [**CHESTER Range Z**](chester-range.md#chester-range-z) | [**v2.3.1**](https://firmware.hardwario.com/chester/d45a7f55-4db8-469d-a4a4-1f221b14e117) [ℹ️](common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`d45a7f554db8469da4a41f221b14e117`</small> | 2024-03-20 | Podpora **CHESTER-Z1** |
