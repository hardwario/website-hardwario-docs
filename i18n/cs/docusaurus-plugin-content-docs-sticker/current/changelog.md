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

- **[FW/HW] Modul akustického bzučáku**: Hardwarové rozšíření pro varianty STICKER Clime a STICKER Input (osazuje se na místo senzoru PIR, proto ho nelze použít ve variantě STICKER Motion)
- **[HW/FW] Převodník pro analogové sondy**: Rozšiřující modul pro STICKER Input ke čtení sond Pt100, Pt1000 a termočlánků

:::

<Tabs groupId="changelog-category">
<TabItem value="all" label="Firmware a aplikace" default>

### 2026-10-19 – v2.0.0 {#2026-10-19--v200}

- **[FW] Vydání s nekompatibilními změnami; při přechodu z v1.4.x je potřeba zasáhnout**: spolu s firmwarem aktualizujte HARDWARIO Manager, přejděte na dekodér `ttn.js` z verze v2.0.0 (ve smíšené flotile volte dekodér podle verze firmwaru v Info), znovu nahrajte pravidla alarmů a výběr kanálů historie, znovu nastavte `cap-gpio-*` a `radio-link-check-*` a jednou smažte staré záznamy NDEF v NFC. Uložená historie je po aktualizaci prázdná a návrat na starší verzi není podporovaný · [Poznámky k vydání](https://github.com/hardwario/sticker-firmware/blob/v2.0.0/doc/version%202.0.md) · [vydání na GitHubu](https://github.com/hardwario/sticker-firmware/releases/tag/v2.0.0)
- **[FW] Rádiový režim LoRa P2P**: `radio-mode p2p` propojí STICKER s modemem HARDWARIO FIBER / ProXimos Hubem přes rádiový protokol HARDWARIO TOWER (AES-CCM, odesílání potvrzované bránou, párování vzduchem) bez sítě LoRaWAN; telemetrie, alarmy, příkazy, historie i síťový čas fungují stejně jako přes LoRaWAN. Oba rádiové režimy zvládá jeden obraz firmwaru
- **[FW] NFC na jedno přiložení pro Android i iOS**: všechny příkazy z telefonu jdou přes rychlou schránku (mailbox) čipu ST25DV během jednoho přiložení; tag nenese žádný záznam NDEF, takže NFC teď vyžaduje napájené zařízení (konfigurace bez baterií a automatické spuštění aplikace na Androidu byly odstraněny)
- **[FW] Bezpečnější claiming**: claim token lze přečíst jen z napájeného zařízení, dokud je okno pro claiming otevřené; `claim_done` / `claim_active` ho zavírají a znovu otevírají
- **[FW] Ohlášení konfigurace**: po každém startu/joinu a každých `interval-announce` hodin (výchozí 24 h) pošle zařízení Info a souhrn nastavení; příkazem `get_settings` si ho lze vyžádat kdykoli
- **[FW] Diagnostika rádia a stránkované odpovědi**: nový příkaz `get_radio_state` (stav spojení, SF/DR, vysílací výkon, RSSI/SNR, využití duty cycle); odpovědi a telemetrie, které se nevejdou do jednoho rámce, přicházejí jako číslované stránky
- **[FW] Vylepšení LoRaWAN**: region AS923, pevná přenosová rychlost při vypnutém ADR (`lrw-datarate`), obnova po ztrátě spojení zhruba za 4–5 h místo 9–10 h, odesílání s ohledem na duty cycle, odpověď na `DevStatusAns`
- **[FW] Model kanálů senzorů**: každá hodnota senzoru je dvojice (slot, kanál), na kterou lze nastavit alarm a kterou lze zaznamenávat; `history-channels` nahrazuje `history-sensors`; slot 1-Wire očekává konkrétní typ senzoru a jinak vyvolá alarm `sensor_mismatch`
- **[FW] Úpravy alarmového systému**: `alarms_replace` přepíše celou tabulku pravidel jednou zprávou; `dwell` u prahových pravidel je teď hystereze v jednotkách kanálu; pravidla rychlosti počítají v okně `dwell` sekund; pravidla pro začátek/konec pohybu a klid; stav alarmů v každém rámci telemetrie; volitelně potvrzované alarmy (`radio-alarm-ack`) a melodie bzučáku (`alarm-buzzer-mode`)
- **[FW] Piny GP a vstupy**: `cap-gpio-mode` a `cap-gpio-input-a/-b` nahrazují dřívější příznaky pro vstupy, PIR a bzučák; vstup může být digitální, analogový 0–24 V nebo čítač pulzů S0; `cap-sht` vypíná vestavěný senzor teploty a vlhkosti
- **[FW] Robustnost**: pod 1,8 V při startu zařízení zabliká červeně a vypne se, místo aby se opakovaně restartovalo; při chybě CPU se okamžitě restartuje a příčinu nahlásí v dalším Info; časová razítka historie se řídí RTC; chybějící hodnota se dekóduje jako `null`; `factory_reset` nově maže i čítače pulzů a historii
- **[FW] Přejmenované parametry shellu**: `lrw-deveui` / `lrw-appkey` → `radio-deveui` / `radio-appkey` (hodnoty zůstávají); `lrw-link-check-*` → `radio-link-check-*` (vrací se na výchozí hodnoty); `ats lrw` → `ats radio`
- **[FW] Provisioningový obraz firmwaru**: každé vydání nově obsahuje i `hio-sticker-<verze>-provisioning.hex`
- **[Apps] STICKER Input**: analogové vstupy 0–24 V a počítání pulzů S0
- **[Apps] STICKER Motion**: pravidla alarmů pro začátek/konec pohybu a klid
- **[Apps] STICKER Clime**: na všechny vestavěné hodnoty (včetně teploty z barometru) lze nastavit alarm a zaznamenávat je; vestavěný SHT4x lze vypnout

### 2026-08-18 – v1.4.0 {#2026-08-18--v140}

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
| STICKER Clime | [Seznam změn](/sticker/catalog-applications/sticker-clime/#changelog) | 2026-10-21 |
| STICKER Input | [Seznam změn](/sticker/catalog-applications/sticker-input/#changelog) | 2026-10-21 |
| STICKER Motion | [Seznam změn](/sticker/catalog-applications/sticker-motion/#changelog) | 2026-10-21 |
