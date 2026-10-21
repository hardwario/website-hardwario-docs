---
slug: configuration
title: Konfigurace
title_meta: "Konfigurace (STICKER)"
---
import Image from '@theme/IdealImage';




# Konfigurace (`config`) {#configuration-config}

Nastavení zařízení se čte a zapisuje příkazem `config` ve vývojářském shellu. Přípravu firmwaru a otevření konzole popisuje stránka [**Nastavení firmwaru**](firmware-setup.md).

:::info Firmware v2.0.0
Příkaz `config` a parametry na této stránce platí pro firmware STICKER v2.0.0. Hlavní změny oproti v1.4.x:
- **Rádio P2P:** `radio-mode p2p` komunikuje přímo s modemem HARDWARIO FIBER a hubem ProXimos přes rádiový protokol HARDWARIO TOWER, bez sítě LoRaWAN (viz [**P2P**](#p2p)).
- **Společné parametry rádia:** z `lrw-deveui` / `lrw-appkey` jsou `radio-deveui` / `radio-appkey` a kontroly spojení nastavují `radio-link-check-interval` / `radio-link-check-fail-rejoin`. Platí pro LoRaWAN i P2P.
- **Piny GP:** `cap-gpio-mode` a `cap-gpio-input-a` / `cap-gpio-input-b` nahrazují `cap-input-a/-b` a `cap-pir-detector`. Externí vstup může být digitální, analogový (0–24 V) nebo čítač impulzů.
- **Nové parametry:** `cap-sht`, `sensor1-type`…`sensor4-type`, `lrw-datarate`, `lrw-region as923`, `alarm-buzzer-mode`, `radio-alarm-ack` a `interval-announce`.
- **Mailbox NFC:** telefon komunikuje se zařízením STICKER přes mailbox čipu NFC (jedno přiložení, na Androidu i iOS) místo záznamů NDEF `hio.stck:cmd` / `hio.stck:rsp`.
:::

:::caution Přechod z v1.4.x
Přejmenované parametry nemají aliasy, takže upravte své skripty pro zprovoznění a testování. Po aktualizaci:
- `radio-deveui` a `radio-appkey` **zachovají** hodnoty uložené jako `lrw-deveui` / `lrw-appkey`.
- `radio-link-check-interval` a `radio-link-check-fail-rejoin` se **nepřevádějí**: vrátí se na výchozí hodnoty (`5` / `5`). Pokud jste je měnili, nastavte je znovu.
- Schopnosti pinů GP se **nepřevádějí**: `cap-gpio-mode`, `cap-gpio-input-a` a `cap-gpio-input-b` začínají na `none`. Nastavte je znovu.
- Nepřevádějí se ani pravidla alarmů a výběr kanálů historie, viz [**Pravidla alarmů**](alarm-rules.md) a [**Historie senzorů**](sensor-history.md).
:::

:::tip Konfigurace v terénu a vývojářská konfigurace
Tato stránka popisuje interaktivní příkazy shellu (`config`) dostupné přes ladicí připojení RTT. Běžná konfigurace v terénu i uvedení do provozu ale probíhají bezdrátově přes NFC v aplikaci [**HARDWARIO Manager**](/sticker/hardwario-manager/).
:::

---

## Syntaxe příkazu {#command-syntax}

```text
config <subcommand> [value]
```

- Zavolaný **bez hodnoty** podpříkaz aktuální nastavení **přečte** a vypíše.
- Zavolaný **s hodnotou** nové nastavení **zapíše**.

Výpis všech aktuálních hodnot najednou:

```text
config show
```

:::caution Uložení změn
Zápis přes `config` změní nastavení v RAM a projeví se okamžitě, ale **neuloží se**, dokud nespustíte `settings save`, který zapíše konfiguraci do flash paměti a zařízení **restartuje** (viz [**Údržba**](maintenance.md)). Neuložená změna se při dalším vypnutí a zapnutí ztratí. Pravidla alarmů nastavená příkazem `alarm` (viz [**Pravidla alarmů**](alarm-rules.md)) se ukládají okamžitě a nevyvolávají restart.
:::

---

## Intervaly vzorkování a hlášení {#sampling-and-reporting-intervals}

| Příkaz | Argument | Popis |
|---|---|---|
| `config interval-sample` | `0`, nebo `5`-`3600` (sekundy) | Jak často se vzorkují senzory. `0` znamená jeden vzorek vždy těsně před odesláním hlášení. |
| `config interval-report` | `60`-`86400` (sekundy) | Jak často se uplinkem odesílá hlášení. Výchozí `900` (15 minut). |
| `config interval-announce` | `0`, nebo `1`-`168` (hodiny) | Jak často zařízení STICKER znovu odešle uplink Info a své klíčové nastavení (intervaly, schopnosti, nalezené senzory 1-Wire). Po startu a po připojení k síti se odesílají vždy. `0` = bez pravidelného opakování. Výchozí `24`. |

**Příklad**: hlášení každých 10 minut:

```bash
config interval-report 600
settings save
```

---

## Nastavení rádia {#radio-settings}

| Příkaz | Argument | Popis |
|---|---|---|
| `config radio-mode` | `off` / `lorawan` / `p2p` | Rádio pro všechny uplinky a downlinky. `off` = režim Radio-Silent: senzory, alarmy i historie dál běží, ale nic se nevysílá. Výchozí `off`. Zapsat ho lze jen přes shell nebo NFC, nikdy downlinkem přes rádio. Rádio se volí při startu, takže se změna projeví po `settings save`. |
| `config radio-deveui` | 16 hex číslic | DevEUI, identita zařízení v síti LoRaWAN i P2P. |
| `config radio-appkey` | 32 hex číslic | AppKey: kořenový klíč pro OTAA v LoRaWAN; v P2P základ klíčů pro připojení a relaci. |

### LoRaWAN {#lorawan}

| Příkaz | Argument | Popis |
|---|---|---|
| `config lrw-region` | `eu868` / `us915` / `au915` / `as923` | Frekvenční region (`as923` = AS923-1). Region, který v image firmwaru není, nechá rádio mlčet (zařízení hlásí `lrw-disabled`); na jiné pásmo nikdy nepřejde. Image release obsahují všechny čtyři regiony, image debug jen EU868. |
| `config lrw-sub-band` | `0`-`8` | Sub-band pro US915/AU915. `0` = všechny kanály. Výchozí `2`. |
| `config lrw-network` | `public` / `private` | Typ sítě. |
| `config lrw-activation` | `otaa` / `abp` | Metoda aktivace. |
| `config lrw-adr` | `true` / `false` | Adaptivní datová rychlost (ADR). Výchozí `true`. |
| `config lrw-datarate` | `auto`, `dr0`-`dr7` | Pevná datová rychlost uplinku; použije se jen s `lrw-adr false` a až po připojení k síti. `auto` nechá datovou rychlost na stacku. Výchozí `auto`. |
| `config lrw-joineui` | 16 hex číslic | Join EUI (AppEUI). |
| `config lrw-nwkkey` | 32 hex číslic | Network Key (OTAA). |
| `config lrw-devaddr` | 8 hex číslic | Device Address (ABP). |
| `config lrw-nwkskey` | 32 hex číslic | Network Session Key (ABP). |
| `config lrw-appskey` | 32 hex číslic | Application Session Key (ABP). |

**Příklad**: EU868 s aktivací OTAA a zapnutým vysíláním:

```bash
config lrw-region eu868
config lrw-activation otaa
config radio-deveui 0102030405060708
config lrw-joineui 0807060504030201
config radio-appkey 0102030405060708090A0B0C0D0E0F10
config radio-mode lorawan
settings save
```

### P2P {#p2p}

S `radio-mode p2p` komunikuje zařízení STICKER přímo s modemem HARDWARIO FIBER a hubem ProXimos přes rádiový protokol HARDWARIO TOWER, bez sítě LoRaWAN. Telemetrie, alarmy, příkazy, opětovné odeslání historie, síťový čas i dohled nad spojením fungují stejně jako přes LoRaWAN. Parametry P2P lze zapsat jen přes shell a musí odpovídat nastavení hubu. P2P je součástí image release; image debug ho vynechává. Nastavení na straně sítě popisuje stránka [**Režim LoRa P2P**](../connectivity/lora-p2p.md).

| Příkaz | Argument | Popis |
|---|---|---|
| `config p2p-frequency` | `863000000`-`870000000` (Hz) | Nosná frekvence v pásmu EU868. Výchozí `869525000`. |
| `config p2p-spreading-factor` | `6`-`12` | Spreading factor LoRa; vyšší hodnota znamená delší dosah a nižší datovou rychlost. Pevná konstanta sítě (bez ADR). Výchozí `7`. |
| `config p2p-tx-power` | `2`-`14` (dBm) | Vysílací výkon. Výchozí `14`. |
| `config p2p-modulation` | `lora` / `fsk` | Modulace. `fsk` slouží pro komunikaci se standardní bránou TOWER. Při přepnutí mezi `lora` a `fsk` se zařízení páruje znovu. Výchozí `lora`. |

### Dohled nad spojením {#link-supervision}

Tyto parametry platí pro obě rádia.

| Příkaz | Argument | Popis |
|---|---|---|
| `config radio-link-check-interval` | `0`-`255` | Každé N-té hlášení je kontrola spojení: v LoRaWAN `LinkCheckReq`; v P2P (kde se potvrzuje každé hlášení) se za kontrolu počítá N-té hlášení. `0` = vypnuto. Výchozí `5`. |
| `config radio-link-check-fail-rejoin` | `1`-`255` | Počet selhání kontroly spojení, po kterých se spojení naváže znovu (rejoin OTAA v LoRaWAN, nové připojení v P2P). Výchozí `5`. |

---

## Senzory a schopnosti {#sensors-and-capabilities}

**Příznaky schopností** říkají firmwaru, jaký hardware je na dané variantě osazený. Nastavují se obvykle při zprovoznění ve výrobě a v terénu se nemají měnit.

| Příkaz | Argument | Popis |
|---|---|---|
| `config cap-sht` | `true` / `false` | Osazený senzor teploty a vlhkosti na desce (SHT4x). Výchozí `true`. |
| `config cap-barometer` | `true` / `false` | Osazený senzor barometrického tlaku. |
| `config cap-light-sensor` | `true` / `false` | Osazený senzor okolního světla. |
| `config cap-accelerometer` | `true` / `false` | Osazený akcelerometr (orientace, pohyb, volný pád). |
| `config cap-w1-sensors` | `true` / `false` | Zapnutá sběrnice 1-Wire; připojené senzory se najdou automaticky při skenování. |
| `config cap-hall-left` | `true` / `false` | Osazený levý Hallův spínač. |
| `config cap-hall-right` | `true` / `false` | Osazený pravý Hallův spínač. |

### Piny GP (vstupy, PIR, bzučák) {#gp-pins-inputs-pir-buzzer}

Piny GP_A a GP_B obsluhují externí vstupy A a B, detektor pohybu PIR nebo variantu s bzučákem. Vlastníka pinů určuje jediný parametr, takže konfliktní nastavení nejde uložit.

| Příkaz | Argument | Popis |
|---|---|---|
| `config cap-gpio-mode` | `none` / `inputs` / `pir` / `buzzer` | Vlastník pinů GP_A a GP_B. `inputs` předá každý pin jeho režimu vstupu níže; `pir` a `buzzer` zaberou oba piny. Výchozí `none`. |
| `config cap-gpio-input-a` | `none` / `digital` / `analog` / `pulse` | Režim vstupu A, použije se jen s `cap-gpio-mode inputs`. `digital` = stav a počet impulzů, `analog` = napětí 0–24 V, `pulse` = čítač impulzů (například z výstupu S0 měřiče, libovolné polarity). Výchozí `none`. |
| `config cap-gpio-input-b` | `none` / `digital` / `analog` / `pulse` | Režim vstupu B, hodnoty jako u vstupu A. Výchozí `none`. |

:::caution Přepínač DIP u STICKER Input
U varianty STICKER Input připojuje přepínač DIP S1 externí svorky ke vstupům nebo ke sběrnici 1-Wire. Firmware polohu přepínače nezjistí, takže režim vstupu a poloha přepínače si musí odpovídat. Vstup v režimu `analog` s přepínačem v poloze 1-Wire měří nezapojený pin. Viz [**Zapojení vstupů STICKER Input**](../sticker-input-wiring/index.md).
:::

### Sloty 1-Wire {#1-wire-slots}

| Příkaz | Argument | Popis |
|---|---|---|
| `config sensor1-rom` ... `config sensor4-rom` | 16 hex číslic | Sériové číslo z ROM senzoru 1-Wire přiřazeného ke slotu 1-4. Samé nuly = prázdný slot. Obvykle ho nastaví `w1 enroll` nebo automatické přiřazení. |
| `config sensor1-type` ... `config sensor4-type` | `0` / `2` / `3` | Typ senzoru, který slot očekává: `0` žádný, `2` dallas (DS18B20), `3` machine probe. Nastaví se při přiřazení senzoru nebo předem při zprovoznění. Když se ve slotu objeví senzor jiného typu, zařízení STICKER vyvolá alarm `sensor_mismatch` a pravidla alarmů daného slotu se přestanou vyhodnocovat. |

### Nastavení senzorů {#sensor-settings}

| Příkaz | Argument | Popis |
|---|---|---|
| `config accel-motion-sensitivity` | `off` / `low` / `medium` / `high` | Citlivost detekce pohybu akcelerometrem. Výchozí `off`: detekce pohybu je vypnutá (žádné události `accel-motion` / `accel-count`) a akcelerometr mezi pravidelnými odečty orientace spí v úsporném režimu. |

---

## Čítače impulzů {#pulse-counters}

| Příkaz | Argument | Popis |
|---|---|---|
| `config hall-left-counter` | `true` / `false` | Počítat impulzy na levém Hallově spínači. |
| `config hall-right-counter` | `true` / `false` | Počítat impulzy na pravém Hallově spínači. |
| `config input-a-counter` | `true` / `false` | Počítat impulzy na externím vstupu A v režimu `digital`. Vstup v režimu `pulse` počítá vždy. |
| `config input-b-counter` | `true` / `false` | Počítat impulzy na externím vstupu B v režimu `digital`. Vstup v režimu `pulse` počítá vždy. |

Podrobnosti k zapojení (přepínače DIP, 1-Wire, bezpotenciálový kontakt, analogový vstup) najdete na stránce [**Zapojení vstupů STICKER Input**](../sticker-input-wiring/index.md).

---

## Alarmy, bzučák a baterie {#alarms-buzzer-and-battery}

| Příkaz | Argument | Popis |
|---|---|---|
| `config alarm-limit` | `0`-`3600` (sekundy) | Okno pro sběr alarmů. Výchozí `10`. Viz [**Pravidla alarmů**](alarm-rules.md#alarm-uplinks-and-rate-limiting). |
| `config alarm-buzzer-mode` | `off` / `once` / `slow` / `normal` / `fast` / `continuous` | Melodie bzučáku během aktivního alarmu. Každý režim kromě `off` zahraje melodii, když se aktivuje nový alarm; `once` ji neopakuje, `slow` / `normal` / `fast` ji opakují každých 120 / 30 / 10 s, dokud alarm trvá, `continuous` ji hraje bez přestávky. Vyžaduje variantu s bzučákem a `cap-gpio-mode buzzer`. Výchozí `off`. |
| `config radio-alarm-ack` | `true` / `false` | Odesílat alarmy na obou rádiích jako potvrzované uplinky: každý alarm čeká na potvrzení ze sítě a odešle se až třikrát znovu. Výchozí `false`. |
| `config battery-level` | `1000`-`3600` (mV) | Práh alarmu slabé baterie. Výchozí `2400`. |

---

## Identita zařízení a bezpečnostní architektura NFC {#device-identity--nfc-security-architecture}

Tyto parametry určují identitu zařízení, řízení přístupu přes NFC a claim token. Nastavují se ve výrobě a za běžného provozu se nemají měnit.

| Příkaz | Argument | Popis |
|---|---|---|
| `config serial-number` | 10 dekadických číslic | Sériové číslo zařízení. |
| `config secret-key` | 32 hex číslic | Secret key zařízení, kterým se zabezpečuje lokální kanál NFC pomocí AES-CCM. Číst i zapisovat ho lze jen přes shell. |
| `config nonce-counter` | Celé číslo | Čítač nonce, který chrání šifrovaný příkazový kanál NFC proti opakovanému odeslání (replay). |
| `config claim-token` | 32 hex číslic | 128bitový claim token zařízení zapisovatelný jen jednou. Po nastavení při uvedení do provozu už ho nelze změnit a vlastnictví zařízení zůstane vázané k jednomu backendu. |
| `config vendor-token` | 32 hex číslic | Vendor token zapisovatelný jen jednou, nastavuje se při uvedení do provozu. |
| `config vendor-reset-allow` | `true` / `false` | Zda zařízení přijme vendor reset. Bezdrátově ho lze změnit jen přes kanál NFC výrobce. Výchozí `true`. |
| `config calibration` | `true` / `false` | Zapne kalibrační režim (pro výrobu). |

### Mailbox NFC a claim okno {#nfc-mailbox-and-claim-window}

Od firmwaru v2.0.0 komunikuje telefon se zařízením STICKER přes **mailbox Fast Transfer Mode** čipu NFC ST25DV:

- **Jedno přiložení:** když telefon držíte v klidu, proběhne celá výměna (například přečtení celé konfigurace nebo její zápis a uložení) na jedno přiložení, na Androidu i na iOS.
- **Jen zapnuté zařízení:** mailbox potřebuje běžící zařízení. Tag neobsahuje žádné záznamy NDEF, takže obecná čtečka NFC nebo zařízení s vybitou baterií ukáže prázdný tag. Vypnuté zařízení už konfigurovat nejde.
- **Zabezpečení AES-CCM:** příkazy z aplikace [**HARDWARIO Manager**](/sticker/hardwario-manager/) se šifrují klíčem `secret-key` a každá transakce ověří a zvýší `nonce-counter`, takže zachycenou komunikaci nelze zneužít k útoku jejím opakovaným odesláním (replay).
- **Nešifrovaný kanál:** bez šifrování odpovídají jen dva příkazy, které nic nemění: `get_basic_info` (sériové číslo, nonce a verze, které telefon potřebuje, než začne šifrovat) a `get_claim_info`. Nešifrovaný kanál není nikdy dostupný přes rádio.
- **Claim okno:** okno je buď `active` (výchozí stav z výroby), nebo `done`. Dokud je `active`, vrátí `get_claim_info` sériové číslo a claim token. Aplikace okno po převzetí zařízení zavře příkazem `claim_done`. `claim_active` okno znovu otevře, vygeneruje nový claim token, pokud žádný není nastavený, a vrátí ho šifrovaným kanálem. Vendor reset claim token smaže a okno zavře. Ze shellu okno ovládá `ats claim active|done|status` (viz [**Diagnostika**](diagnostics.md)).

:::caution Přechod z v1.4.x: smažte staré záznamy NDEF
Firmware v2.0.0 do paměti NFC nikdy nezapisuje, takže na zařízení aktualizovaném z v1.4.x zůstanou staré záznamy NDEF včetně nešifrovaného záznamu `hio.stck:clm` s claim tokenem. Jednou je smažte: příkazem `nfc clear` v sestavení debug, nebo zápisem prázdné zprávy NDEF z telefonu.
:::
