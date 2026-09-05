---
slug: changelog
title: Seznam změn STICKER
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "Tato stránka zaznamenává všechny důležité změny na platformě STICKER, včetně firmwaru a katalogových aplikací. Kartami níže můžete filtrovat podle kategorie změn."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Seznam změn STICKER {#sticker-changelog}

Tato stránka zaznamenává všechny důležité změny na platformě STICKER, včetně **firmwaru** a **katalogových aplikací**. Kartami níže můžete filtrovat podle kategorie změn.

:::info

Zdrojový kód firmwaru: [hardwario/sticker-firmware](https://github.com/hardwario/sticker-firmware) na GitHubu.

:::

---

## Obecné aktualizace platformy {#general-platform-updates}

:::info Připravované aktualizace platformy

Na následujících funkcích a hardwarových rozšířeních se pro příští vydání aktivně pracuje:

- **[FW] Komunikační režim LoRa P2P**: Podpora přímé peer-to-peer radiové komunikace pro samostatná spojení mezi uzly nebo s bránou bez potřeby síťového serveru LoRaWAN
- **[FW/HW] Modul akustického bzučáku**: Hardwarové rozšíření pro varianty STICKER Clime a STICKER Input (instaluje se místo slotu pro senzor PIR; nekompatibilní s STICKER Motion)
- **[Apps] Podpora analogového vstupu 0–24 V pro STICKER Input**: Měření a telemetrie průmyslových analogových napěťových signálů 0–24 V DC
- **[HW/FW] Převodník pro analogové sondy**: Rozšiřující modul rozhraní pro STICKER Input umožňující odečet sond Pt100, Pt1000 a termočlánků

:::

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware a aplikace" default>

### 2026-08-26 – v1.4.0 {#2026-08-26--v140}

- **[FW] Vzdálené řízení přes LoRaWAN**: Plná konfigurace, dotazování na stav a řídicí příkazy přes fPort 85 (`set_param`, `get_param`, `get_config`, `get_info`, reset/rejoin) bez fyzického přístupu i bez NFC
- **[FW] Device Info on Join**: Automatický diagnostický uplink (sériové číslo, verze FW, příčina resetu, claim token, režim radia, napětí baterie) odeslaný při každém připojení do sítě a synchronizaci hodin
- **[FW] Hodiny reálného času (RTC)**: Sledování reálného času se synchronizací síťového času (`DeviceTimeReq`), čitelné i nastavitelné přes NFC, downlinky LoRaWAN nebo shell (`clock`)
- **[FW] Historie senzorů (store-and-forward)**: Vzorky ukládané během výpadků sítě do vyhrazené 32 KB kruhové flash partition s přehráním na žádost přes LoRaWAN (`req_history`) nebo NFC (`req_history_page`)
- **[FW] Engine alarmů a hlášení na fPort 3**: Dynamická pravidla ve více slotech (prahová, stavová, frekvenční) s integrovaným filtrováním šumu přes `dwell`, hlášení nízké baterie a watchdog při chybějících datech na fPort 3
- **[FW] Šifrovaný přístup přes NFC**: Zabezpečená lokální komunikace šifrováním AES-CCM (`hio.stck:cmd` / `hio.stck:rsp`) a ochrana proti opakování pomocí nonce
- **[FW] Claim token zapisovatelný jen jednou**: Neměnný 128bitový claim token (`config claim-token`) pro okamžité napojení na cloud ještě před připojením do sítě
- **[FW] Výchozí režim Radio-Silent z výroby**: Transceiver je po vybalení vypnutý (`radio-mode off`), aby se chránila baterie během přepravy; aktivuje se přes NFC
- **[FW] Jednotné schéma signalizace LED**: Heartbeat vzory řazené podle závažnosti (stav připojení, degradované spojení, aktivní alarmy, stav radia) a vyhrazená bliknutí pro akce NFC a vstupů
- **[FW] Sada diagnostického CLI (`ats`)**: Rodina diagnostických nástrojů přejmenována z `tester` $\rightarrow$ `ats`; přidány `ats lrw reset`, `ats lrw compose`, `ats lrw lc` a vkládání surových protobuf rámců (`ats cmd lrw|nfc`)
- **[FW] Neměnný bezpečnostní model firmwaru**: Záměrně odstraněná možnost aktualizace přes DFU (`enter_dfu`), aby byla plocha pro vzdálený útok nulová (firmware se nahrává výhradně přes SWD pady)

### 2026-05-25 – v1.3.4 {#2026-05-25--v134}

- **[FW]** Jednotné doručování alarmů a událostí: okamžité odeslání přes LoRaWAN a centralizovaná obsluha LED
- **[FW]** Opravený výběr sub-bandu pro US915/AU915 a načítání pole `sub_band` z NFC
- **[FW]** Opravené OTAA pro LoRaWAN 1.0.x, AppKey se nyní správně vkládá do slotu NwkKey
- **[FW]** Časovač vzorkování senzorů aplikace se spustí i při částečném selhání inicializace senzorů

### 2026-05-15 – v1.3.2 / v1.3.3 {#2026-05-15--v132--v133}

- **[FW]** Sync word LoRaWAN se přepíná na privátní jen při výslovné konfiguraci
- **[FW]** Kalibrační režim vynucuje veřejnou síť LoRaWAN
- **[FW]** Přidán kompatibilní wrapper dekodéru pro ChirpStack v3 (`ttn.js`)

### 2026-05-14 – v1.3.1 {#2026-05-14--v131}

- **[FW]** Opravený kalibrační režim: aktivuje se při nastavení `config calibration true` přes shell nebo NFC, ne jen při detekci dvou magnetů při startu
- **[FW]** Příznak kalibrace se maže na začátku inicializace kalibrace, běh je tak jednorázový (po 2hodinové lhůtě nebo dřívějším resetu se zařízení vrací k normálnímu OTAA)

### 2026-05-04 – v1.3.0 {#2026-05-04--v130}

- **[FW]** Kalibrační režim s detekcí dvou magnetů Hallovým senzorem (viz 2026-04-21)
- **[FW]** Souhrnné vydání s opravami chyb: stavový automat LoRaWAN, DS28E17, inicializace senzorů, načítání konfigurace z NFC (úplné detaily viz 2026-02-17 a 2026-04-01)

### 2026-04-21 {#2026-04-21}

- **[FW]** Přidán kalibrační režim s aktivací Hallovým senzorem

### 2026-04-01 {#2026-04-01}

- **[FW]** Opravená spolehlivost inicializace sondy DS28E17 machine probe: opakuje `write_config` a pro kontrolu čte zpět odražený registr
- **[FW]** Opravené atomické čtení stavu při skenování machine probe

### 2026-02-17 {#2026-02-17}

- **[FW]** Snížená latence přerušení PYQ1648 (PIR) z 2,5 ms na 100 µs pro rychlejší reakci na pohyb
- **[FW]** Přidán analogový pinctrl pro stav spánku I2C1: snižuje svodový proud v klidu
- **[FW]** Přidána kontrola verze konfigurace v NVS: při neshodě schématu po aktualizaci firmwaru obnoví výchozí hodnoty
- **[FW]** Opravený konflikt pinů GPIO: při zapnutém PIR se přeskakuje inicializace vstupu
- **[FW]** Přidána prodleva po spuštění ONEBURST na SI7210, aby se nečetly zastaralé hodnoty z Hallova senzoru
- **[FW]** Přidány shell příkazy `reset_counts` pro čítače Hallových kontaktů a vstupů
- **[FW]** Opravené čítače stavového automatu LoRaWAN (změna z `uint8_t` na `int`, aby nepřetékaly)
- **[FW]** Atomický snapshot a vymazání příznaků notifikací při compose, což brání souběhům
- **[FW]** Rozdělená fronta zpráv pro LED, aby se snížila spotřeba stacku volajícího blikání
- **[FW]** Přidána mezikrmení watchdogu během startovní inicializace
- **[FW]** Přidána kontrola CRC16 nad daty čtenými z DS28E17

### 2026-01-30 – v1.2.0 {#2026-01-30--v120}

- **[FW]** Opravená sekvence LED v debug režimu: zelené bliknutí nyní správně předchází žlutému

### 2025-12-15 – v1.1.0 {#2025-12-15--v110}

- **[FW]** Implementovaný mechanismus opakování JOIN pro LoRaWAN: zařízení po neúspěšných pokusech zkouší připojení znovu

### 2025-11-23 – v1.0.0 {#2025-11-23--v100}

- **[FW]** První veřejné vydání firmwaru STICKER
- **[FW]** Konektivita LoRaWAN (Class A)
- **[FW]** Podpora tagů MIFARE/NFC přes DS28E17
- **[Apps]** **STICKER Clime**: první vydání (teplota, vlhkost)
- **[Apps]** **STICKER Input**: první vydání (digitální vstupy, počítání pulzů)
- **[Apps]** **STICKER Motion**: první vydání (detekce pohybu PIR)

{/* separator */}
</TabItem>

<TabItem value="hw" label="Hardware">

:::info

Zatím nebyly zaznamenány žádné hardwarové revize. Aktualizace hardwaru se tu objeví, až vyjdou nové revize desek STICKER.

:::

{/* separator */}
</TabItem>
</Tabs>

---

## Seznamy změn katalogových aplikací {#catalog-application-changelogs}

| Aplikace | Seznam změn | Poslední aktualizace |
|---|---|---|
| STICKER Clime | [Seznam změn](/sticker/catalog-applications/sticker-clime/#changelog) | 2026-08-26 |
| STICKER Input | [Seznam změn](/sticker/catalog-applications/sticker-input/#changelog) | 2026-08-26 |
| STICKER Motion | [Seznam změn](/sticker/catalog-applications/sticker-motion/#changelog) | 2026-08-26 |
