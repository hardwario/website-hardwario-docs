---
title: Firmware
description: "Firmware katalogových aplikací CHESTER: sestavení ke stažení pro HARDWARIO Cloud a Cloud Legacy, nastavení jednotlivých aplikací a seznam změn."
---

# Firmware {#firmware}

Tato sekce popisuje firmware [**katalogových aplikací**](../catalog-applications/index.md) CHESTER: co který firmware dělá, jaké parametry můžete nastavit a jaká data odesílá. Funkce společné všem aplikacím, například LED, tlačítko nebo nastavení sítě, popisuje článek [**Společné funkce**](../catalog-applications/common-functionality.md).

Každá aplikace má vlastní stránku. Varianta firmwaru sestavená pro jiný hardware má podstránku, která uvádí jen to, čím se liší od hlavního firmwaru aplikace.

## Firmware aplikací pro HARDWARIO Cloud {#application-firmware}

Tento firmware je určený pro komunikaci s aktuálním [**HARDWARIO Cloud**](/cloud/).

Pokud jednotka už komunikovala s HARDWARIO Cloud, stačí aktualizovat jen hlavní [**firmware APP/BLE MCU přes BLE**](../platform-connectivity/hardwario-manager.md#firmware-update).

Pokud se jednotka dříve používala s Cloud Legacy, musíte nejdřív aktualizovat [**firmware modemu LTE**](../firmware-sdk/how-to-lte-v2.md#flash-lte-modem-firmware).


:::info

Některé katalogové aplikace obsahují podporu NB-IoT/LTE i LoRaWAN v jediném firmwaru. V takovém případě je potřeba nastavit komunikační režim.

Ve výchozím stavu zařízení **nepoužívá žádné rádio** (režim `none`), bliká oranžovou LED a je nutné nastavit konfigurační parametr **mode**.

- `app config mode lte` pro síť NB-IoT/LTE
- `app config mode lrw` pro síť LoRaWAN

Poté změny uložte příkazem `config save`. Zařízení se restartuje a použije správnou síť.

:::

#### Dostupná sestavení firmwaru aplikací {#available-application-firmware-builds}

*SDK **v4.0.1** · NCS **3.4.1** · Zephyr **4.4.2** · [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v4.0.1)*

<div className="firmware-builds-table">

| Název aplikace | Verze | Identifikátor | Datum sestavení | Poznámka |
| :--- | :--- | :---: | :---: | :--- |
| [**CHESTER Clime**](chester-clime/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/59489e4e91d741da930ab15b1ab9e31f) | <small>`59489e4e91d741da930ab15b1ab9e31f`</small> | 2026-09-07 |  |
| [**CHESTER Clime IAQ**](chester-clime/chester-clime-iaq.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/5dc54c6153974e879f5499d2483433c9) | <small>`5dc54c6153974e879f5499d2483433c9`</small> | 2026-09-07 |  |
| [**CHESTER Clime RTD**](chester-clime/chester-clime-rtd.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/f1cd7285ec574e159eb16ec9447163b6) | <small>`f1cd7285ec574e159eb16ec9447163b6`</small> | 2026-09-07 |  |
| [**CHESTER Clime TC**](chester-clime/chester-clime-tc.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/94d596f453d24ac3bef6fc8195b80028) | <small>`94d596f453d24ac3bef6fc8195b80028`</small> | 2026-09-07 |  |
| [**CHESTER Clime SPS30**](chester-clime/chester-clime-sps30.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/2d964ba3d4db4ea8902c9ce01d1838b0) | <small>`2d964ba3d4db4ea8902c9ce01d1838b0`</small> | 2026-09-07 |  |
| [**CHESTER Clime Radon**](chester-clime/chester-clime-radon.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/14682da830f04ce6bf1f48e3f165c288) | <small>`14682da830f04ce6bf1f48e3f165c288`</small> | 2026-09-07 |  |
| [**CHESTER Control**](chester-control/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/d3c2bf66783643f6be3431d32adb11ac) | <small>`d3c2bf66783643f6be3431d32adb11ac`</small> | 2026-09-07 |  |
| [**CHESTER Control 8Ch Z**](chester-control/chester-control-8ch-z.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/1e29c5be1d604788908a1a728ae38415) | <small>`1e29c5be1d604788908a1a728ae38415`</small> | 2026-09-07 | Podpora druhého modulu X0 ve slotu B (8 kanálů) a CHESTER-Z |
| [**CHESTER Control Z**](chester-control/chester-control-z.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/9d8514b702144c2d956640ee31f65cb0) | <small>`9d8514b702144c2d956640ee31f65cb0`</small> | 2026-09-07 | Podpora CHESTER-Z |
| [**CHESTER Current**](chester-current/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/98f42b431dfb4ba681abfea1958f0ef9) | <small>`98f42b431dfb4ba681abfea1958f0ef9`</small> | 2026-09-07 |  |
| [**CHESTER Current Z**](chester-current/chester-current-z.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/bd7bf21e742f4172ae48378ae55a3d6a) | <small>`bd7bf21e742f4172ae48378ae55a3d6a`</small> | 2026-09-07 | Podpora CHESTER-Z |
| [**CHESTER Demo**](chester-demo/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/fe66508fdb6a4d78b90b6e4a07d1e929) | <small>`fe66508fdb6a4d78b90b6e4a07d1e929`</small> | 2026-09-07 |  |
| [**CHESTER Meteo**](chester-meteo/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/60a5b9b6cddf40659d47cf125e123f86) | <small>`60a5b9b6cddf40659d47cf125e123f86`</small> | 2026-09-07 |  |
| [**CHESTER Meteo Z**](chester-meteo/chester-meteo-z.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/f3ce30b40ad6404b9ef3e661330d2f24) | <small>`f3ce30b40ad6404b9ef3e661330d2f24`</small> | 2026-09-07 | Podpora CHESTER-Z |
| [**CHESTER Meteo P**](chester-meteo/chester-meteo-p.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/8ae50ff5d08b436f8caf0926a994bc70) | <small>`8ae50ff5d08b436f8caf0926a994bc70`</small> | 2026-09-07 | Podpora pyranometru |
| [**CHESTER Meteo M**](chester-meteo/chester-meteo-m.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/0b1d815d983b40118c26ee0e425e9f76) | <small>`0b1d815d983b40118c26ee0e425e9f76`</small> | 2026-09-07 | Varianta Modbus pro meteostanice SenseCAP S1000 a S500 a prachový senzor CUBIC 6303 (volba parametry meteo-type a pm-type) |
| [**CHESTER Motion**](chester-motion/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/56cbeef2fcae46bcb69e76025800a33b) | <small>`56cbeef2fcae46bcb69e76025800a33b`</small> | 2026-09-07 |  |
| [**CHESTER Push**](chester-push/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/a218e5f6eeea4fefaa3656ada720d163) | <small>`a218e5f6eeea4fefaa3656ada720d163`</small> | 2026-09-07 |  |
| [**CHESTER Push FM**](chester-push/chester-push-fm.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/001543e218a04ffdbf65082532202736) | <small>`001543e218a04ffdbf65082532202736`</small> | 2026-09-07 |  |
| [**CHESTER Range**](chester-range/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/ace9410d06b24f6da06a15ca70587094) | <small>`ace9410d06b24f6da06a15ca70587094`</small> | 2026-09-07 |  |
| [**CHESTER Range Z**](chester-range/chester-range-z.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/a7fe82069e234fcdae96a69d798a807b) | <small>`a7fe82069e234fcdae96a69d798a807b`</small> | 2026-09-07 | Podpora CHESTER-Z |
| [**CHESTER Scale**](chester-scale/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/bd797484aa61413b82c3cbd041339d48) | <small>`bd797484aa61413b82c3cbd041339d48`</small> | 2026-09-07 |  |
| [**CHESTER Scale Z**](chester-scale/chester-scale-z.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/41adb245a2c74438a2baaf300b815abb) | <small>`41adb245a2c74438a2baaf300b815abb`</small> | 2026-09-07 | Podpora CHESTER-Z |
| [**CHESTER Serial RS-485**](chester-serial/chester-serial-rs485.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/cc16bc72ff9d41a5addc516e77abdec5) | <small>`cc16bc72ff9d41a5addc516e77abdec5`</small> | 2026-09-07 | RS-485 (multi-drop, max. 8 zařízení) |
| [**CHESTER Serial RS-232**](chester-serial/chester-serial-rs232.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/8be3907b12b5445b847fa03cb2970d6d) | <small>`8be3907b12b5445b847fa03cb2970d6d`</small> | 2026-09-07 | RS-232 (point-to-point, max. 1 zařízení) |
| [**CHESTER wM-Bus**](chester-wm-bus/index.md) | [**v4.0.1**](https://firmware.hardwario.com/chester/07488f3fd70e481aa21072ce3ac211e8) | <small>`07488f3fd70e481aa21072ce3ac211e8`</small> | 2026-09-07 |  |

</div>

## Firmware aplikací pro Cloud Legacy {#application-firmware-cloud-v1}

Tento firmware je určený pro komunikaci se starším [**HARDWARIO Cloud Legacy**](/cloud/legacy).

V tabulce níže je přehled dostupných sestavení firmwaru **katalogových aplikací**.

Firmware nahrajete mobilní aplikací [**HARDWARIO Manager**](../platform-connectivity/hardwario-manager.md) nebo podle článku [**Nahrání firmwaru**](../firmware-flashing/index.md).

:::info

Od verze firmwaru **v2.3.0** obsahují katalogové aplikace podporu NB-IoT/LTE i LoRaWAN v jediném firmwaru. Režim je potřeba nastavit
nejen u nových zařízení, ale také **při aktualizaci ze starší verze firmwaru**.

Ve výchozím stavu zařízení **nepoužívá žádné rádio** (režim `none`) a je nutné nastavit konfigurační parametr **mode**.

- `app config mode lte` pro síť NB-IoT/LTE
- `app config mode lrw` pro síť LoRaWAN

Poté změny uložte příkazem `config save`. Zařízení se restartuje a použije správnou síť.

:::


| Název aplikace | Verze | Identifikátor | Datum sestavení | Poznámka |
| :--- | :--- | :---: | :---: | :--- |
| [**CHESTER Clime**](../catalog-applications/chester-clime/index.md) | [**v2.3.0**](https://firmware.hardwario.com/chester/55e7f6ba38c04b88aa68ad7ec2b3f353) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`55e7f6ba38c04b88aa68ad7ec2b3f353`</small> | 2023-08-02 |  |
| [**CHESTER Clime Z**](../catalog-applications/chester-clime/index.md#chester-clime-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/ed45be6253344349a9b8ddc71a0cc673) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`ed45be6253344349a9b8ddc71a0cc673`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Clime IAQ**](../catalog-applications/chester-clime/index.md#chester-clime-iaq) | [**v2.3.2**](https://firmware.hardwario.com/chester/e0c41bfdc19a421c95bc245642c65813) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`e0c41bfdc19a421c95bc245642c65813`</small> | 2024-04-16 | Podpora **CHESTER-X10** |
| [**CHESTER Clime 1W**](../catalog-applications/chester-clime/index.md#chester-clime-1w) | [**v2.3.0**](https://firmware.hardwario.com/chester/5658239a71e34ef8ab6f703e45c1bbc2) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`5658239a71e34ef8ab6f703e45c1bbc2`</small> | 2023-08-02 |  |
| [**CHESTER Clime 1WH**](../catalog-applications/chester-clime/index.md#chester-clime-1wh) | [**v2.3.0**](https://firmware.hardwario.com/chester/86c4d01e7bfc452aa4ecd2bfc3e0f7c1) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`86c4d01e7bfc452aa4ecd2bfc3e0f7c1`</small> | 2023-08-02 | Podpora **CHESTER-S2**, **1-Wire** |
| [**CHESTER Clime RTD**](../catalog-applications/chester-clime/index.md#chester-clime-rtd) | [**v2.3.0**](https://firmware.hardwario.com/chester/78014d06151f41e39be6c491dbac696b) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`78014d06151f41e39be6c491dbac696b`</small> | 2023-08-02 |  |
| [**CHESTER Push**](../catalog-applications/chester-push/index.md) | [**v2.3.0**](https://firmware.hardwario.com/chester/a2f47dd13c1f4a94ae68af09aa54e089) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`a2f47dd13c1f4a94ae68af09aa54e089`</small> | 2023-08-02 |  |
| [**CHESTER Push FM**](../catalog-applications/chester-push/index.md) | [**v2.3.0**](https://firmware.hardwario.com/chester/cfdceffeaac04051a5dbd46a1ece73e5) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`cfdceffeaac04051a5dbd46a1ece73e5`</small> | 2023-08-02 |  |
| [**CHESTER Counter**](../catalog-applications/legacy/chester-counter.md#chester-counter) | [**v2.3.0**](https://firmware.hardwario.com/chester/31f2a2b55135499c896e1359373b5152) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`31f2a2b55135499c896e1359373b5152`</small> | 2023-08-02 |  |
| [**CHESTER Counter Z**](../catalog-applications/legacy/chester-counter.md#chester-counter-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/b035e5e4b948433fb994634a118e20fb) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`b035e5e4b948433fb994634a118e20fb`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Input**](../catalog-applications/legacy/chester-input.md#chester-input) | [**v2.3.2**](https://firmware.hardwario.com/chester/e97898e1678d4dbdb36184d459824f42) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`e97898e1678d4dbdb36184d459824f42`</small> | 2023-08-28 | Podpora **1-Wire** |
| [**CHESTER Input Z**](../catalog-applications/legacy/chester-input.md#chester-input-z) | [**v2.3.2**](https://firmware.hardwario.com/chester/9f88cb71a28446049a1be89d523447e7) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`9f88cb71a28446049a1be89d523447e7`</small> | 2023-08-28 | Podpora **CHESTER-Z1**, **1-Wire** |
| [**CHESTER Input ZH**](../catalog-applications/legacy/chester-input.md#chester-input-zh) | [**v2.3.2**](https://firmware.hardwario.com/chester/2e1e0c362223406da9ad70b9da5b23d1) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`2e1e0c362223406da9ad70b9da5b23d1`</small> | 2023-08-28 | Podpora **CHESTER-Z1**, **1-Wire**, **S2** |
| [**CHESTER Current**](../catalog-applications/chester-current/index.md) | [**v2.3.0**](https://firmware.hardwario.com/chester/52177a80039543d38725d4d9f57590ea) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`52177a80039543d38725d4d9f57590ea`</small> | 2023-08-02 |  |
| [**CHESTER Current Z**](../catalog-applications/chester-current/index.md#chester-current-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/fa2f25c0de5643e6ad77bcc118aad30c) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`fa2f25c0de5643e6ad77bcc118aad30c`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Current 1W**](../catalog-applications/chester-current/index.md#chester-current-1w) | [**v2.3.0**](https://firmware.hardwario.com/chester/80ecf08298914cdb9df632ca749e309e) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`80ecf08298914cdb9df632ca749e309e`</small> | 2023-08-02 |  |
| [**CHESTER Scale**](../catalog-applications/chester-scale/index.md) | [**v2.3.0**](https://firmware.hardwario.com/chester/c37b56df73cf4272b301a8f00eb1486d) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`c37b56df73cf4272b301a8f00eb1486d`</small> | 2023-08-02 |  |
| [**CHESTER Scale Z**](../catalog-applications/chester-scale/index.md#chester-scale-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/489e5fb2b9d943d28d4f1b2aba3ed540) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`489e5fb2b9d943d28d4f1b2aba3ed540`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Meteo**](../catalog-applications/chester-meteo/index.md) | [**v2.3.0**](https://firmware.hardwario.com/chester/7e886270374f4ebba8712324630c96b7) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`7e886270374f4ebba8712324630c96b7`</small> | 2023-08-02 |  |
| [**CHESTER Meteo Z**](../catalog-applications/chester-meteo/index.md#chester-meteo-z) | [**v2.3.0**](https://firmware.hardwario.com/chester/ef86634d1ad04d06a55c760333aa7a5e) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`ef86634d1ad04d06a55c760333aa7a5e`</small> | 2023-08-02 | Podpora **CHESTER-Z1** |
| [**CHESTER Range**](../catalog-applications/chester-range/index.md) | [**v2.3.1**](https://firmware.hardwario.com/chester/5c3cc2b6-b263-4f39-90ac-d409771bfaee) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`5c3cc2b6b2634f3990acd409771bfaee`</small> | 2024-03-20 |  |
| [**CHESTER Range Z**](../catalog-applications/chester-range/index.md#chester-range-z) | [**v2.3.1**](https://firmware.hardwario.com/chester/d45a7f55-4db8-469d-a4a4-1f221b14e117) [ℹ️](../catalog-applications/common-functionality.md#network-mode-configuration "Konfigurace režimu sítě") | <small>`d45a7f554db8469da4a41f221b14e117`</small> | 2024-03-20 | Podpora **CHESTER-Z1** |
