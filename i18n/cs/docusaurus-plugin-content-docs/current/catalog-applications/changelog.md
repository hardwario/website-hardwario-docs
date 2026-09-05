---
slug: changelog
title: Seznam změn
toc_min_heading_level: 2
toc_max_heading_level: 3
description: "Tato stránka zachycuje všechny významné změny ve firmwaru katalogových aplikací CHESTER od verze v3.0.0 (migrace na Cloud v2)."
---

# Seznam změn {#changelog}

Tato stránka zachycuje všechny významné změny ve firmwaru katalogových aplikací CHESTER od verze **v3.0.0** (migrace na Cloud v2).

:::tip Nejnovější vydání

**SDK v4.0.0** (2026-08-10): [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v4.0.0) · [Soubory firmwaru ke stažení](catalog-applications#application-firmware)

:::

:::info

Tento seznam změn pokrývá **vydání verzí SDK** a změny katalogových aplikací. Chronologický záznam všech změn platformy včetně hardwarových revizí najdete v [**seznamu změn platformy CHESTER**](/chester/changelog).

:::

---

## v4.0.0 (2026-08-10) {#v400-2026-08-10}

**NCS:** 3.4.0 · **Zephyr:** 4.4.1 · [Kompletní log commitů](https://github.com/hardwario/chester-sdk/compare/v3.5.5...v4.0.0) · [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v4.0.0)

Toto vydání přináší nekompatibilní změny a zároveň všechna vylepšení a opravy z nejnovějších verzí Zephyr a nRF Connect SDK, stejně jako další menší vylepšení v samotném SDK.

### SDK / Common {#sdk--common}

- Aktualizace NCS na v3.4.
  - Přechod z Partition Manageru na **sysbuild + DTS partitions**.
  - Odstranění TinyCrypt ve prospěch PSA.
- Přidáno `ctr_rtc_set_event_cb()` pro notifikaci o synchronizaci.
- Obnovena podpora `FW_VERSION` z důvodu kompatibility.
- API sekvenceru LED `ctr_led` označeno jako zavržené.
- Optimalizováno využití RAM, úspora přibližně 17 kB.
- Přidán shell příkaz `tag read all [timeout]`

### CHESTER Cloud {#chester-cloud}

- Přidána **frontnaonta zpráv** (`CONFIG_CTR_CLOUD_SPOOL`) – store-and-forward frontnaonta postavená na LittleFS, takže zprávy přežijí selhání uplinku i restarty.

### CHESTER Control {#chester-control}

- Snížena kapacita pro 1-Wire teploměry (10 -> 5) a půdní senzory (10 -> 3).

### CHESTER Serial {#chester-serial}

- Nové ovladače: střídač SolaX X3-Hybrid G3; radonová sonda Piketronic RPP-R.

### Průvodce aktualizací {#update-guide}

Toto vydání není zpětně kompatibilní a pro správnou funkci může vyžadovat změny v kódu. Kompletní postup najdete v [průvodci migrací na v4.0.0](/chester/sdk-v4-migration-guide). Popisuje aktualizaci `west.yml` a toolchainu, převod aplikace na sysbuild i všechny nutné změny ve zdrojových kódech a Kconfigu a končí kontrolním seznamem.

Doporučujeme začít z funkčního workspace v3.5.5, ne přeskakovat ze starší verze přímo na v4.0.0.

---

## v3.5.5 (2026-06-22) {#v355-2026-06-22}

*NCS **2.9.0** · Zephyr **3.7.99** · [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v3.5.5)*

### SDK / Common {#sdk--common-1}
- Blikání LED převedeno na neblokující přístup s omezením frekvence: zabraňuje blokování během blikacích sekvencí
- LoRaWAN payload pro 8kanálovou variantu X0 rozdělen do dvou zpráv, aby splňoval limit 51 bajtů
- Přidáno API pro stav synchronizace RTC: `ctr_rtc_is_synced()`, `ctr_rtc_get_ts_ms()`, `ctr_rtc_set_event_cb()`
- Přechod na verzování podle git tagů (soubory VERSION odstraněny)
- Opravena regrese ve spotřebě na desce CHESTER (vbatt odstraněn)
- Přidány režimy shutdown a one-shot pro TMP112
- Rozšířeny ovladače elektroměrů; kódování CBOR převedeno na nativní float32

### CHESTER Scale {#chester-scale}
- Přidána detekce CHESTER-X3 ve slotu B za běhu: jediný firmware nyní pokrývá jednoslotový (A) i dvouslotový (A+B) hardware; kanály B1/B2 se při chybějícím modulu přeskočí s informačním logem místo hlášení chyb měření

### CHESTER Control {#chester-control-1}
- Snížena paměťová náročnost: data půdních senzorů a teploměrů jsou nyní alokována dynamicky

---

## v3.5.4 (2026-04-14) {#v354-2026-04-14}

### SDK / Common {#sdk--common-2}
- Přidána detekce CHESTER-Z za běhu: jediný firmware funguje s modulem Z i bez něj
- Přidán shell příkaz pro skenování sběrnice 1-Wire (W1)
- Deploy skript aktualizován o argumenty CLI a kompletní seznam aplikací

### CHESTER Clime {#chester-clime}
- Detekce CHESTER-Z za běhu: odstraněna samostatná varianta Clime Z
- Opravena chyba buildu varianty IAQ, když jsou přítomny funkce Z i X10

### CHESTER Control {#chester-control-2}
- Přidána varianta se dvěma moduly X0 (CHESTER Control 8Ch Z) s podporou CHESTER-Z

---

## v3.5.3 (2026-03-06) {#v353-2026-03-06}

### CHESTER Serial {#chester-serial-1}
- Přidán CHESTER Serial jako nová katalogová aplikace
- Podporuje RS-485 (CHESTER-X2, multi-drop, až 8 zařízení) a RS-232 (CHESTER-X12, point-to-point)

---

## v3.5.2 (2026-03-10) {#v352-2026-03-10}

### SDK / Common {#sdk--common-3}
- Do všech aplikací přidány shell příkazy pro I2C, MCUboot a GPIO
- Výchozí LTE režim změněn na `lte-m,nb-iot` (automatický fallback na NB-IoT)
- CHESTER Counter a CHESTER Signal přesunuty do složky `_legacy`

### GNSS {#gnss}
- Přidána konfigurovatelná priorita inicializace M8 přes Kconfig

---

## v3.5.1 (2025-12-08) {#v351-2025-12-08}

### SDK / Common {#sdk--common-4}
- Přidáno API pro cloudové metriky: zpřístupňuje počítadla uplinků/downlinků, chyby a diagnostiku
- Podpora soft timeoutu pro operace odesílání do cloudu a downlinku
- Nebezpečné konfigurační příkazy filtrovány z cloudových downloadů
- Ve všech aplikacích zavedena společná struktura pro agregaci dat (`ctr_data_aggreg`)
- Konfigurovatelná politika připojení LTE (aggressive, periodic, progressive)
- Vylepšeno nízkoenergetické chování LTE pro sítě bez PSM

### CHESTER Clime {#chester-clime-1}
- Nové varianty: SPS30 (částice), Radon, TC (termočlánek)
- Povoleny teplotní senzory DS18B20 (1-Wire) pro všechny varianty
- Odstraněny starší varianty Clime 1W a Clime 1WH (sloučeny do základní)
- Aplikace Radon sloučena do Clime jako varianta
- Přidáno LoRaWAN kódování pro půdní senzory
- Přidán watchdog pro downlink

### CHESTER Control {#chester-control-3}
- Přidána podpora LoRaWAN s testy kódování/dekódování
- Přidána varianta Z
- Přidána podpora CHESTER X9
- Přidána podpora půdních senzorů
- Přidána hodnota delta do agregací počítadel
- Opraveno chybějící odemčení mutexu

### CHESTER Current {#chester-current}
- Přidány shell příkazy pro kalibraci kanálů
- Vylepšena podpora LoRaWAN
- Opraven kalibrační rozsah, přidán watchdog pro downlink

### CHESTER Meteo {#chester-meteo}
- Přidána varianta CHESTER Meteo M (Modbus RTU: senzory Lambrecht, Sensecap/OPM)
- Přidána podpora půdních senzorů
- Přidána podpora LoRaWAN
- Vylepšena podpora pyranometru

### CHESTER Scale {#chester-scale-1}
- Přidána podpora LoRaWAN (LRW)

### CHESTER Motion {#chester-motion}
- Přidáno jako nová katalogová aplikace: detekce pohybu založená na PIR

### CHESTER wM-Bus {#chester-wm-bus}
- Přidáno jako nová katalogová aplikace
- Přidán režim enroll (teach) pro párování zařízení
- Přidán scan all s podporou konfigurace cloud-decode
- Přidán shell příkaz send

---

## v3.3.0 (2025-07-14) {#v330-2025-07-14}

### SDK / Common {#sdk--common-5}
- Všechny katalogové aplikace aktualizovány na v3.3.0
- Vylepšení subsystému BLE tagů: počet slotů pro tagy zvýšen na 32, snížen dopad na RAM, vylepšeno chování režimu enroll
- Konfigurační subsystém: přidán factory reset, HEX konfigurační položka, parse callback pro jednotlivé položky
- Opraveny deadlocky mutexů v agregaci BLE tagů ve všech aplikacích
- LoRaWAN: opraveny klíče, aby používaly HEX konfigurační položku, opraven rozsah datarate

### CHESTER Clime {#chester-clime-2}
- Přidána integrace generátoru projektů
- Přidána podpora LoRa pro variantu IAQ
- Opraveny #ifdef ochrany pro termočlánek

### CHESTER Control {#chester-control-4}
- Portováno na Cloud v2 s generátorem projektů
- Přidány prahové hodnoty linek X4
- 6× stisk tlačítka zapne výstupy X9

### CHESTER Current {#chester-current-1}
- Portováno na Cloud v2 s generátorem projektů
- Přidán dekodér pro ChirpStack

### CHESTER Push {#chester-push}
- Portováno na Cloud v2 s generátorem projektů

### CHESTER Range {#chester-range}
- Portováno na Cloud v2 s podporou BLE tagů

### CHESTER Scale {#chester-scale-2}
- Portováno na Cloud v2

### CHESTER Demo {#chester-demo}
- Přidány síťové parametry a podpora BLE

---

## v3.0.0 (2024-07-17) {#v300-2024-07-17}

### SDK / Common {#sdk--common-6}
- **Velké vydání**: migrace z protokolu Cloud v1 na Cloud v2
- Zaveden generátor projektů (`west chester-update`) pro správu variant
- Přidán subsystém LTE v2 s architekturou stavového automatu
- Přidána podpora GNSS
- Přidán sekvencer plynulého prosvětlování LED
- Zavedeny soubory VERSION pro všechny aplikace
- Subsystém BLE tagů: dřívější ukončení skenování, konfigurovatelná délka skenování

### CHESTER Clime {#chester-clime-3}
- První aplikace portovaná na Cloud v2
- Přidán 1-Wire ve výchozí variantě

### CHESTER Meteo {#chester-meteo-1}
- Portováno na Cloud v2
- Přidána podpora pyranometru (varianta Meteo P)
