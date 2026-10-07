---
slug: changelog
title: Seznam změn STICKER
toc_min_heading_level: 2
toc_max_heading_level: 2
description: "Přehled všech významných změn platformy STICKER včetně firmwaru a katalogových aplikací."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Seznam změn STICKER {#sticker-changelog}

Tato stránka zaznamenává všechny důležité změny na platformě STICKER, včetně **firmwaru** a **katalogových aplikací**. Pomocí karet níže můžete změny filtrovat podle kategorie.

:::info

Zdrojový kód firmwaru: [hardwario/sticker-firmware](https://github.com/hardwario/sticker-firmware) na GitHubu.

:::

---

## Obecné aktualizace platformy {#general-platform-updates}

:::info Připravované aktualizace platformy

Na následujících funkcích a hardwarových rozšířeních se pro příští vydání aktivně pracuje:

- **[FW] Komunikační režim LoRa P2P**: Přímá rádiová komunikace peer-to-peer mezi uzly nebo s bránou, bez síťového serveru LoRaWAN
- **[FW/HW] Modul akustického bzučáku**: Hardwarové rozšíření pro varianty STICKER Clime a STICKER Input (osazuje se na místo senzoru PIR, proto ho nelze použít ve variantě STICKER Motion)
- **[Apps] Podpora analogového vstupu 0–24 V pro STICKER Input**: Měření a telemetrie průmyslových analogových napěťových signálů 0–24 V DC
- **[HW/FW] Převodník pro analogové sondy**: Rozšiřující modul pro STICKER Input ke čtení sond Pt100, Pt1000 a termočlánků

:::

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware a aplikace" default>

### 2026-08-26 – v1.4.0 {#2026-08-26--v140}

- **[FW] Ovládání na dálku přes LoRaWAN**: Plná konfigurace, dotazování na stav a řídicí příkazy přes fPort 85 (`set_param`, `get_param`, `get_config`, `get_info`, reset/rejoin) bez fyzického přístupu i bez NFC
- **[FW] Device Info on Join**: Automatický diagnostický uplink (sériové číslo, verze FW, příčina resetu, claim token, režim rádia, napětí baterie) odeslaný při každém připojení k síti a při synchronizaci hodin
- **[FW] Hodiny reálného času (RTC)**: Hodiny reálného času synchronizované se sítí (`DeviceTimeReq`); čas lze číst i nastavit přes NFC, downlinky LoRaWAN nebo shell (`clock`)
- **[FW] Historie senzorů (store-and-forward)**: Během výpadků sítě se vzorky ukládají do vyhrazeného kruhového oddílu flash (32 KB) a na vyžádání se znovu odešlou přes LoRaWAN (`req_history`) nebo NFC (`req_history_page`)
- **[FW] Systém alarmů a hlášení na fPort 3**: Dynamická pravidla ve více slotech (prahová, stavová, četnostní) s vestavěným filtrem šumu `dwell`, upozornění na slabou baterii a hlášení watchdogu chybějících dat na fPort 3
- **[FW] Šifrovaný přístup přes NFC**: Zabezpečená lokální komunikace šifrováním AES-CCM (`hio.stck:cmd` / `hio.stck:rsp`) a ochrana proti opakovanému odeslání (replay) pomocí nonce
- **[FW] Claim token zapisovatelný jen jednou**: Neměnný 128bitový claim token (`config claim-token`) pro okamžitou registraci v cloudu ještě před připojením k síti
- **[FW] Výchozí režim Radio-Silent z výroby**: Rádio je po vybalení vypnuté (`radio-mode off`), aby se baterie během přepravy nevybíjela; aktivuje se přes NFC
- **[FW] Jednotné schéma signalizace LED**: Heartbeat vzory řazené podle závažnosti (stav připojení, zhoršené spojení, aktivní alarmy, stav rádia) a vyhrazená bliknutí pro akce NFC a vstupů
- **[FW] Sada diagnostického CLI (`ats`)**: Diagnostické nástroje přejmenovány z `tester` na `ats`; přidány `ats lrw reset`, `ats lrw compose`, `ats lrw lc` a vkládání surových protobuf rámců (`ats cmd lrw|nfc`)
- **[FW] Neměnný bezpečnostní model firmwaru**: Záměrně odstraněné aktualizace přes DFU (`enter_dfu`), takže zařízení nemá žádnou vzdálenou útočnou plochu (firmware lze nahrát výhradně přes pady SWD)

### 2026-05-25 – v1.3.4 {#2026-05-25--v134}

- **[FW]** Jednotné doručování alarmů a událostí: okamžité odeslání přes LoRaWAN a centralizovaná obsluha LED
- **[FW]** Opravený výběr sub-bandu pro US915/AU915 a načítání pole `sub_band` z NFC
- **[FW]** Opravené OTAA pro LoRaWAN 1.0.x, AppKey se nyní správně vkládá do slotu NwkKey
- **[FW]** Časovač vzorkování senzorů aplikace se spustí i při částečném selhání inicializace senzorů

### 2026-05-15 – v1.3.2 / v1.3.3 {#2026-05-15--v132--v133}

- **[FW]** Sync word LoRaWAN se přepíná na privátní jen při výslovné konfiguraci
- **[FW]** Kalibrační režim vynucuje veřejnou síť LoRaWAN
- **[FW]** Přidán wrapper pro kompatibilitu dekodéru s ChirpStack v3 (`ttn.js`)

### 2026-05-14 – v1.3.1 {#2026-05-14--v131}

- **[FW]** Opravený kalibrační režim: aktivuje se při nastavení `config calibration true` přes shell nebo NFC, ne jen při detekci dvou magnetů při startu
- **[FW]** Příznak kalibrace se maže na začátku inicializace kalibrace, běh je tak jednorázový (po 2hodinové lhůtě nebo dřívějším resetu se zařízení vrací k normálnímu OTAA)

### 2026-05-04 – v1.3.0 {#2026-05-04--v130}

- **[FW]** Kalibrační režim s detekcí dvou magnetů Hallovými spínači (viz 2026-04-21)
- **[FW]** Souhrnné vydání s opravami chyb: stavový automat LoRaWAN, DS28E17, inicializace senzorů, načítání konfigurace z NFC (úplné detaily viz 2026-02-17 a 2026-04-01)

### 2026-04-21 {#2026-04-21}

- **[FW]** Přidán kalibrační režim s aktivací Hallovými spínači

### 2026-04-01 {#2026-04-01}

- **[FW]** Spolehlivější inicializace DS28E17 v sondě Machine Probe: opakuje `write_config` a pro kontrolu čte zapsaný registr zpět
- **[FW]** Opravené atomické čtení stavu při skenování sondy Machine Probe

### 2026-02-17 {#2026-02-17}

- **[FW]** Snížená latence přerušení PYQ1648 (PIR) z 2,5 ms na 100 µs pro rychlejší reakci na pohyb
- **[FW]** Přidán analogový pinctrl pro stav spánku I2C1: snižuje svodový proud v klidu
- **[FW]** Přidána kontrola verze konfigurace v NVS: při neshodě schématu po aktualizaci firmwaru obnoví výchozí hodnoty
- **[FW]** Opravený konflikt pinů GPIO: při zapnutém PIR se přeskakuje inicializace vstupu
- **[FW]** Přidána prodleva po spuštění ONEBURST na SI7210, aby se nečetly zastaralé hodnoty z Hallova senzoru
- **[FW]** Přidány příkazy shellu `reset_counts` pro čítače Hallových spínačů a vstupů
- **[FW]** Opravené čítače stavového automatu LoRaWAN (změna z `uint8_t` na `int`, aby nepřetékaly)
- **[FW]** Příznaky notifikací se při compose atomicky načtou a vymažou, což brání souběhům
- **[FW]** Rozdělená fronta zpráv pro LED, aby funkce volající blikání spotřebovala méně zásobníku
- **[FW]** Přidáno průběžné obnovování watchdogu během inicializace při startu
- **[FW]** Přidána kontrola CRC16 nad daty čtenými z DS28E17

### 2026-01-30 – v1.2.0 {#2026-01-30--v120}

- **[FW]** Opravená sekvence LED v režimu debug: zelené bliknutí nyní správně předchází žlutému

### 2025-12-15 – v1.1.0 {#2025-12-15--v110}

- **[FW]** Mechanismus opakování JOIN v LoRaWAN: zařízení se po neúspěšných pokusech zkouší připojit znovu

### 2025-11-23 – v1.0.0 {#2025-11-23--v100}

- **[FW]** První veřejné vydání firmwaru STICKER
- **[FW]** Konektivita LoRaWAN (Class A)
- **[FW]** Podpora tagů MIFARE/NFC přes DS28E17
- **[Apps]** **STICKER Clime**: první vydání (teplota, vlhkost)
- **[Apps]** **STICKER Input**: první vydání (digitální vstupy, počítání impulzů)
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
