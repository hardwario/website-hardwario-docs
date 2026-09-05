---
slug: changelog
title: CHESTER – seznam změn
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "Tato stránka sleduje všechny významné změny v rámci platformy CHESTER, včetně firmwaru, hardwaru a katalogových aplikací. Pomocí záložek níže lze filtrovat podle kategorie změn."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CHESTER – seznam změn {#chester-changelog}

Tato stránka sleduje všechny významné změny v rámci platformy CHESTER, včetně **firmwaru**, **hardwaru** a **katalogových aplikací**. Pomocí záložek níže lze filtrovat podle kategorie změn.

:::info

Tato stránka sleduje změny na úrovni platformy podle **data**. Poznámky k vydání jednotlivých verzí SDK a seznamy změn jednotlivých aplikací najdete v [**seznamu změn katalogových aplikací**](catalog-applications/changelog.md).

:::

---

## Obecné aktualizace platformy {#general-platform-updates}

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware a aplikace" default>

### 2026-06-22 {#2026-06-22}

- **[SDK v3.5.5]** Vydáno SDK **v3.5.5**: [vydání na GitHubu](https://github.com/hardwario/chester-sdk/releases/tag/v3.5.5) · [podrobný seznam změn](catalog-applications/changelog.md#v355-2026-06-22)
- **[FW/SDK]** Přidáno API pro stav synchronizace RTC (`ctr_rtc_is_synced`, `ctr_rtc_get_ts_ms`, `ctr_rtc_set_event_cb`)
- **[FW/SDK]** Opravena regrese spotřeby na desce CHESTER (odstraněno vbatt)
- **[FW/SDK]** Přidány režimy shutdown a one-shot pro TMP112
- **[FW/SDK]** Přechod na verzování podle git tagů

### 2026-04-27 {#2026-04-27}

- **[FW/SDK]** Blikání LED změněno na neblokující přístup s omezením frekvence, což zabraňuje blokování během blikacích sekvencí
- **[FW/SDK]** LoRaWAN payload pro 8kanálovou variantu rozdělen do dvou zpráv kvůli dodržení limitů velikosti payloadu

### 2026-04-14 {#2026-04-14}

- **[FW/SDK]** Opraven build pro variantu IAQ kombinující funkce modulů CHESTER-Z a CHESTER-X10
- **[FW/SDK]** Přidána podpora argumentů CLI a doplněn seznam aplikací v shellu

### 2026-04-02 {#2026-04-02}

- **[FW/SDK]** Přidána varianta se dvěma moduly CHESTER-X0 s podporou CHESTER-Z
- **[FW/SDK]** Přidán příkaz shellu pro skenování zařízení na sběrnici 1-Wire (W1)
- **[FW/SDK]** Přidána detekce hardwaru CHESTER-Z za běhu

### 2026-03-31 {#2026-03-31}

- **[FW/SDK]** Priorita inicializace GNSS M8 je nyní konfigurovatelná přes Kconfig (`CONFIG_CTR_GNSS_M8_INIT_PRIORITY`)

### 2026-03-11 {#2026-03-11}

- **[Apps]** Aplikace CHESTER Counter a CHESTER Signal přesunuty do `_legacy`, nejsou již aktivně udržovány

### 2026-03-10 {#2026-03-10}

- **[FW/SDK]** Výchozí režim LTE změněn z `lte-m` na `lte-m,nb-iot` (automatický přechod na NB-IoT je nyní zapnut ve výchozím nastavení)

### 2026-03-06 {#2026-03-06}

- **[Apps]** **CHESTER Serial** přidán jako nová katalogová aplikace: podporuje RS-485 (CHESTER-X2) a RS-232 (CHESTER-X12)

### 2026-02-11 {#2026-02-11}

- **[Apps]** **CHESTER Motion** přidán jako nová katalogová aplikace: detekce pohybu pomocí PIR s konfigurovatelnou citlivostí

### 2026-02-04 {#2026-02-04}

- **[Apps]** Přidána varianta **CHESTER Meteo M**: integrace senzorů Modbus RTU pro meteorologická data

### 2026-01-30 {#2026-01-30}

- **[Apps]** **CHESTER Scale** nyní podporuje konektivitu LoRaWAN

### 2026-01-19 {#2026-01-19}

- **[FW/SDK]** Přidána podpora měkkého timeoutu pro operace odesílání do cloudu a downlinku

### 2026-01-02 {#2026-01-02}

- **[FW/SDK]** Přidáno API metrik pro cloudový subsystém: zpřístupňuje interní počítadla a diagnostiku

### 2025-12-08 {#2025-12-08}

- **[Apps]** **CHESTER Clime** v3.5.1: nové varianty SPS30 (částice), Radon, TC (termočlánek); přechod na protokol Cloud v2

### 2025-12-03 {#2025-12-03}

- **[Apps]** **CHESTER Serial** v3.5.0: podpora LoRaWAN s binárním kódováním; přidána varianta RS-232; protokol Cloud v2

### 2025-11-28 {#2025-11-28}

- **[Apps]** **CHESTER Meteo**: přidána podpora půdních senzorů

### 2025-10-30 {#2025-10-30}

- **[FW/SDK]** Zavedena společná datová struktura pro agregaci (`ctr_data_aggreg`), jednotná pro všechny katalogové aplikace

### 2025-10-27 {#2025-10-27}

- **[FW/SDK]** Přidána konfigurovatelná politika připojení LTE: umožňuje detailní řízení chování modemu při připojování

### 2025-10-24 {#2025-10-24}

- **[Apps]** **CHESTER Control**: přidána podpora LoRaWAN

### 2025-10-15 {#2025-10-15}

- **[Apps]** **CHESTER wM-Bus**: přidán režim enroll/teach; scan-all, odesílání ze shellu, pole výrobce, LED a cloudový watchdog

### 2025-08-21 {#2025-08-21}

- **[Apps]** Varianta **CHESTER Clime Radon** sloučena do hlavní aplikace CHESTER Clime

### 2025-07-14 {#2025-07-14}

- **[Apps]** **CHESTER wM-Bus**: první vydání

### 2025-02-14 {#2025-02-14}

- **[Apps]** **CHESTER Meteo**: přidána podpora LoRaWAN

### 2025-01-31 {#2025-01-31}

- **[FW/SDK]** Nordic Connect SDK (NCS) aktualizováno na **v2.9**, upgrade základní platformy pro veškerý firmware CHESTER

### 2025-01-20 {#2025-01-20}

- **[Apps]** **CHESTER Clime**: přidán subsystém senzoru částic SPS30

### 2025-01-16 {#2025-01-16}

- **[Apps]** Několik katalogových aplikací: přidán downlink watchdog

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

### CHESTER-M R3.4 *(aktuální)* {#chester-m-r34-current}

- Aktuální produkční revize základní desky CHESTER-M
- Schéma: [R3.4 (PDF)](../../../../chester/hardware-description/hio-chester-m-r3.4.pdf)
- Interaktivní prohlížeč PCB: [iBOM R3.4](pathname:///download/ibom/chester-m-r3.4.html)

### CHESTER-M R3.3 {#chester-m-r33}

- **Odstraněno**: kryptočip ATSHA204A (adresa I²C `0x64`), již se neosazuje
- **Změněno**: popis konektoru J-Link/SWD přejmenován z `BLE` na `APP`

### CHESTER-M R3.2 {#chester-m-r32}

- Konektor J-Link/SWD označen `BLE` (přejmenován v R3.3)
- Kryptočip ATSHA204A přítomen na I²C adrese `0x64`

---

### CHESTER-U1 R1.1 *(aktuální)* {#chester-u1-r11-current}

- Kompaktní modul 38×38 mm: elektricky identický s CHESTER-M
- Stejný binární firmware běží bez úprav na CHESTER-M i CHESTER-U1
- Schéma: [R1.1 (PDF)](../../../../chester/hardware-description/hio-chester-u1-r1.1.pdf)

{/* separator */}
</TabItem>
</Tabs>

---

## Seznamy změn katalogových aplikací {#catalog-application-changelogs}

Tabulka níže odkazuje přímo na sekci se seznamem změn každé katalogové aplikace. Sloupec **Poslední aktualizace** udává, kdy byl seznam změn v této dokumentaci naposledy zkontrolován a aktualizován.

| Aplikace | Seznam změn | Poslední aktualizace |
|---|---|---|
| CHESTER Clime | [Seznam změn](/chester/catalog-applications/chester-clime/#changelog) | 2026-06-24 |
| CHESTER Control | [Seznam změn](/chester/catalog-applications/chester-control/#changelog) | 2026-06-22 |
| CHESTER Current | [Seznam změn](/chester/catalog-applications/chester-current/#changelog) | 2026-06-24 |
| CHESTER Meteo | [Seznam změn](/chester/catalog-applications/chester-meteo/#changelog) | 2026-06-24 |
| CHESTER Motion | [Seznam změn](/chester/catalog-applications/chester-motion/#changelog) | 2026-04-01 |
| CHESTER Push | [Seznam změn](/chester/catalog-applications/chester-push/#changelog) | 2026-04-01 |
| CHESTER Range | [Seznam změn](/chester/catalog-applications/chester-range/#changelog) | 2026-04-01 |
| CHESTER Scale | [Seznam změn](/chester/catalog-applications/chester-scale/#changelog) | 2026-06-22 |
| CHESTER Serial | [Seznam změn](/chester/catalog-applications/chester-serial/#changelog) | 2026-04-01 |
| CHESTER wM-Bus | [Seznam změn](/chester/catalog-applications/chester-wm-bus/#changelog) | 2026-06-24 |
