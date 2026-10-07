---
slug: changelog
title: Seznam změn
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Seznam změn {#changelog}

Tato stránka zachycuje všechny významné změny ve firmwaru katalogových aplikací CHESTER od verze **v3.0.0** (migrace na Cloud v2).

:::tip Nejnovější vydání

**SDK v4.0.1** (2026-09-07): [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v4.0.1) · [Firmware ke stažení](/chester/catalog-applications/catalog-applications/#application-firmware)

:::

:::info

Tento seznam změn zahrnuje **vydání SDK** a změny katalogových aplikací. Chronologický přehled všech změn platformy včetně revizí hardwaru najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::

---

## v4.0.1 (2026-09-07) {#v401-2026-09-07}

**NCS:** 3.4.1 · **Zephyr:** 4.4.2 · [Úplný seznam commitů](https://github.com/hardwario/chester-sdk/compare/v4.0.0...v4.0.1) · [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v4.0.1)

Toto vydání opravuje chybu v subsystému `ctr_adc`. Chyba se týká každého firmwaru verze v4.0.0, který čte analogové vstupy CHESTER X0, konkrétně aplikací CHESTER **Control** a **Meteo**. Aktualizace na v4.0.1 problém odstraní; konfiguraci není třeba měnit.

### SDK / společné {#sdk--common}

- Opravena regrese analogových vstupů CHESTER-X0 zavedená ve verzi v4.0.0: kvůli posunu o jeden index v mapování kanálů vzorkoval každý kanál sousední pin
- Snížena spotřeba RAM přibližně o 500 bajtů
- Přidán volitelný ladicí subsystém `ctr_trace`

---

## v4.0.0 (2026-08-10) {#v400-2026-08-10}

**NCS:** 3.4.0 · **Zephyr:** 4.4.1 · [Úplný seznam commitů](https://github.com/hardwario/chester-sdk/compare/v3.5.5...v4.0.0) · [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v4.0.0)

Toto vydání přináší nekompatibilní změny a s nimi všechna vylepšení a opravy z nejnovějších verzí systému Zephyr a nRF Connect SDK i další drobná vylepšení samotného SDK.

### SDK / společné {#sdk--common-1}

- NCS aktualizováno na v3.4.
  - Přechod z nástroje Partition Manager na **sysbuild + DTS partitions**.
  - Knihovnu TinyCrypt nahradilo rozhraní PSA.
- Přidána funkce `ctr_rtc_set_event_cb()` pro oznámení o synchronizaci.
- Obnovena podpora `FW_VERSION` z důvodu kompatibility.
- API sekvenceru LED `ctr_led` označeno jako zastaralé.
- Optimalizována spotřeba RAM, úspora přibližně 17 kB.
- Přidán příkaz shellu `tag read all [timeout]`

### Subsystém cloudu {#chester-cloud}

- Přidán **zásobník zpráv** (`CONFIG_CTR_CLOUD_SPOOL`), fronta typu store-and-forward nad LittleFS, takže zprávy přečkají selhání uplinku i restarty.

### CHESTER Control {#chester-control}

- Snížen maximální počet teploměrů 1-Wire (10 -> 5) a půdních senzorů (10 -> 3).

### CHESTER Serial {#chester-serial}

- Nové ovladače: střídač SolaX X3-Hybrid G3; radonová sonda Piketronic RPP-R.

### Průvodce aktualizací {#update-guide}

Toto vydání není zpětně kompatibilní a pro správnou funkci může vyžadovat změny v kódu. Kompletní postup najdete v [průvodci migrací na v4.0.0](/chester/sdk-v4-migration-guide). Popisuje aktualizaci `west.yml` a toolchainu, převod aplikace na sysbuild i všechny nutné změny ve zdrojových kódech a Kconfigu a končí kontrolním seznamem.

Doporučujeme vyjít z funkčního workspace ve verzi v3.5.5 a nepřecházet ze starší verze rovnou na v4.0.0.

---

## v3.5.5 (2026-06-22) {#v355-2026-06-22}

*NCS **2.9.0** · Zephyr **3.7.99** · [GitHub Release](https://github.com/hardwario/chester-sdk/releases/tag/v3.5.5)*

### SDK / společné {#sdk--common-2}
- Blikání LED převedeno na neblokující řešení s omezenou četností: sekvence blikání už nic neblokují
- Payload LoRaWAN pro 8kanálovou variantu X0 rozdělen do dvou zpráv kvůli limitu payloadu 51 bajtů
- Přidáno API pro stav synchronizace RTC: `ctr_rtc_is_synced()`, `ctr_rtc_get_ts_ms()`, `ctr_rtc_set_event_cb()`
- Přechod na verzování podle git tagů (soubory VERSION odstraněny)
- Opravena regrese ve spotřebě na desce CHESTER (vbatt odstraněn)
- Přidány režimy shutdown a one-shot pro TMP112
- Rozšířeny ovladače elektroměrů; kódování CBOR převedeno na nativní float32

### CHESTER Scale {#chester-scale}
- Přidána detekce CHESTER-X3 ve slotu B za běhu: jeden firmware nyní funguje s jedním osazeným slotem (A) i se dvěma (A+B); když modul chybí, kanály B1/B2 se místo hlášení chyb měření přeskočí a do logu se zapíše informační zpráva

### CHESTER Control {#chester-control-1}
- Snížena paměťová náročnost: data půdních senzorů a teploměrů se nyní alokují dynamicky

---

## v3.5.4 (2026-04-14) {#v354-2026-04-14}

### SDK / společné {#sdk--common-3}
- Přidána detekce CHESTER-Z za běhu: jediný firmware funguje s modulem Z i bez něj
- Přidán příkaz shellu pro skenování sběrnice 1-Wire (W1)
- Skript pro nasazení (deploy) rozšířen o argumenty příkazové řádky a úplný seznam aplikací

### CHESTER Clime {#chester-clime}
- Detekce CHESTER-Z za běhu: odstraněna samostatná varianta Clime Z
- Opravena chyba sestavení varianty IAQ při současném použití funkcí Z a X10

### CHESTER Control {#chester-control-2}
- Přidána varianta se dvěma moduly X0 (CHESTER Control 8Ch Z) s podporou CHESTER-Z

---

## v3.5.3 (2026-03-06) {#v353-2026-03-06}

### CHESTER Serial {#chester-serial-1}
- Přidána nová katalogová aplikace CHESTER Serial
- Podporuje RS-485 (CHESTER-X2, multi-drop, až 8 zařízení) a RS-232 (CHESTER-X12, bod-bod)

---

## v3.5.2 (2026-03-10) {#v352-2026-03-10}

### SDK / společné {#sdk--common-4}
- Do všech aplikací přidány příkazy shellu pro I2C, MCUboot a GPIO
- Výchozí režim LTE změněn na `lte-m,nb-iot` (automatický přechod na NB-IoT)
- CHESTER Counter a CHESTER Signal přesunuty do složky `_legacy`

### GNSS {#gnss}
- Prioritu inicializace M8 lze nově nastavit v Kconfigu

---

## v3.5.1 (2025-12-08) {#v351-2025-12-08}

### SDK / společné {#sdk--common-5}
- Přidáno API pro metriky cloudu: zpřístupňuje čítače uplinků a downlinků, chyby a diagnostiku
- Podpora soft timeoutu pro operace odesílání do cloudu a downlinku
- Nebezpečné konfigurační příkazy se odfiltrují z dat stahovaných z cloudu
- Ve všech aplikacích zavedena společná struktura pro agregaci dat (`ctr_data_aggreg`)
- Nastavitelná strategie připojení k síti LTE (aggressive, periodic, progressive)
- Vylepšen úsporný provoz LTE v sítích bez PSM

### CHESTER Clime {#chester-clime-1}
- Nové varianty: SPS30 (prachové částice), Radon, TC (termočlánek)
- Teplotní senzory DS18B20 (1-Wire) zapnuty ve všech variantách
- Odstraněny starší varianty Clime 1W a Clime 1WH (sloučeny do základní varianty)
- Aplikace Radon sloučena do Clime jako varianta
- Přidáno kódování dat půdních senzorů pro LoRaWAN
- Přidán watchdog pro downlink

### CHESTER Control {#chester-control-3}
- Přidána podpora LoRaWAN s testy kódování/dekódování
- Přidána varianta Z
- Přidána podpora CHESTER X9
- Přidána podpora půdních senzorů
- Přidána hodnota delta do agregací čítačů
- Opraveno chybějící odemčení mutexu

### CHESTER Current {#chester-current}
- Přidány příkazy shellu pro kalibraci kanálů
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
- Přidána jako nová katalogová aplikace: detekce pohybu senzory PIR

### CHESTER wM-Bus {#chester-wm-bus}
- Přidána jako nová katalogová aplikace
- Přidán režim enroll (učení) pro párování zařízení
- Přidán režim scan-all s podporou konfigurace dekódování v cloudu
- Přidán příkaz shellu send

---

## v3.3.0 (2025-07-14) {#v330-2025-07-14}

### SDK / společné {#sdk--common-6}
- Všechny katalogové aplikace aktualizovány na v3.3.0
- Vylepšení subsystému BLE tagů: počet slotů pro tagy zvýšen na 32, nižší nároky na RAM, vylepšeno chování režimu enroll
- Konfigurační subsystém: přidán reset do továrního nastavení, konfigurační položka typu HEX a parse callback pro jednotlivé položky
- Opraveny deadlocky mutexů v agregaci BLE tagů ve všech aplikacích
- LoRaWAN: klíče nově používají konfigurační položku typu HEX, opraven rozsah datarate

### CHESTER Clime {#chester-clime-2}
- Přidána integrace generátoru projektů
- Přidána podpora LoRa pro variantu IAQ
- Opraveny podmínky #ifdef pro termočlánek

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

### SDK / společné {#sdk--common-7}
- **Velké vydání**: migrace z protokolu Cloud v1 na Cloud v2
- Zaveden generátor projektů (`west chester-update`) pro správu variant
- Přidán subsystém LTE v2 s architekturou stavového automatu
- Přidána podpora GNSS
- Přidán sekvencer plynulých přechodů jasu LED
- Zavedeny soubory VERSION pro všechny aplikace
- Subsystém BLE tagů: dřívější ukončení skenování, nastavitelná délka skenování

### CHESTER Clime {#chester-clime-3}
- První aplikace portovaná na Cloud v2
- Přidána podpora 1-Wire do výchozí varianty

### CHESTER Meteo {#chester-meteo-1}
- Portováno na Cloud v2
- Přidána podpora pyranometru (varianta Meteo P)
