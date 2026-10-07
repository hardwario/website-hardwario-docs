---
slug: configuration
title: Konfigurace
title_meta: "Konfigurace (STICKER)"
---
import Image from '@theme/IdealImage';




# Konfigurace (`config`) {#configuration-config}

Nastavení zařízení se čte a zapisuje příkazem `config` ve vývojářském shellu. Přípravu firmwaru a otevření konzole popisuje stránka [**Nastavení firmwaru**](firmware-setup.md).

:::info Firmware v1.4.0
Příkaz `config` a většina parametrů na této stránce platí pro firmware STICKER v1.4.0. Hlavní novinky ve v1.4.0:
- **Z výroby v režimu Radio-Silent:** Rádio je ve výchozím stavu vypnuté (`radio-mode off`) a šetří energii, dokud ho neaktivujete přes NFC v aplikaci [**HARDWARIO Manager**](/sticker/hardwario-manager/) nebo ze shellu.
- **Šifrovaný přístup přes NFC:** Lokální příkazový kanál šifrovaný AES-CCM (`hio.stck:cmd` / `hio.stck:rsp`) s ochranou proti opakovanému odeslání (replay) pomocí nonce.
- **Claim token zapisovatelný jen jednou:** Neměnný token (`config claim-token`) pro bezpečnou registraci v cloudu.
- **Dohled nad spojením:** Kontroly spojení LoRaWAN (`lrw-link-check-interval`, `lrw-link-check-fail-rejoin`).
- **Historie senzorů:** Ukládání záznamů a jejich opětovné odeslání (viz [**Historie senzorů**](sensor-history.md)).
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

**Příklad**: hlášení každých 10 minut:

```bash
config interval-report 600
settings save
```

---

## Nastavení LoRaWAN a rádia {#lorawan--radio-settings}

| Příkaz | Argument | Popis |
|---|---|---|
| `config radio-mode` | `on` / `off` | Zapne nebo vypne rádio LoRaWAN. **Výchozí hodnota ve v1.4.0+ je `off` (režim Radio-Silent)**. |
| `config lrw-region` | `eu868` / `us915` / `au915` | Frekvenční region. |
| `config lrw-sub-band` | `0`-`8` | Sub-band pro US915/AU915. `0` = všechny kanály. Výchozí `2`. |
| `config lrw-network` | `public` / `private` | Typ sítě. |
| `config lrw-activation` | `otaa` / `abp` | Metoda aktivace. |
| `config lrw-adr` | `true` / `false` | Adaptivní datová rychlost (ADR). |
| `config lrw-deveui` | 16 hex číslic | Device EUI. |
| `config lrw-joineui` | 16 hex číslic | Join EUI (AppEUI). |
| `config lrw-nwkkey` | 32 hex číslic | Network Key (OTAA). |
| `config lrw-appkey` | 32 hex číslic | Application Key (OTAA). |
| `config lrw-devaddr` | 8 hex číslic | Device Address (ABP). |
| `config lrw-nwkskey` | 32 hex číslic | Network Session Key (ABP). |
| `config lrw-appskey` | 32 hex číslic | Application Session Key (ABP). |
| `config lrw-link-check-interval` | `0`-`255` | Vyžádá si LinkCheckReq s každým N-tým uplinkem. `0` = vypnuto. Výchozí `5`. |
| `config lrw-link-check-fail-rejoin` | `1`-`255` | Počet selhání kontroly spojení, po kterých se zkusí rejoin OTAA. Výchozí `5`. |

**Příklad**: EU868 s aktivací OTAA a zapnutým vysíláním:

```bash
config lrw-region eu868
config lrw-activation otaa
config lrw-deveui 0102030405060708
config lrw-joineui 0807060504030201
config lrw-appkey 0102030405060708090A0B0C0D0E0F10
config radio-mode on
settings save
```

---

## Senzory a schopnosti {#sensors-and-capabilities}

**Příznaky schopností** říkají firmwaru, jaký hardware je na dané variantě osazený. Nastavují se obvykle při zprovoznění ve výrobě a v terénu se nemají měnit.

| Příkaz | Argument | Popis |
|---|---|---|
| `config cap-barometer` | `true` / `false` | Osazený senzor barometrického tlaku. |
| `config cap-pir-detector` | `true` / `false` | Osazený detektor pohybu PIR. |
| `config cap-light-sensor` | `true` / `false` | Osazený senzor okolního světla. |
| `config cap-accelerometer` | `true` / `false` | Osazený akcelerometr (orientace, pohyb, volný pád). |
| `config cap-w1-sensors` | `true` / `false` | Zapnutá sběrnice 1-Wire; připojené senzory se najdou automaticky při skenování. |
| `config cap-hall-left` | `true` / `false` | Osazený levý Hallův spínač. |
| `config cap-hall-right` | `true` / `false` | Osazený pravý Hallův spínač. |
| `config cap-input-a` | `true` / `false` | Osazený externí vstup A. |
| `config cap-input-b` | `true` / `false` | Osazený externí vstup B. |

**Nastavení senzorů:**

| Příkaz | Argument | Popis |
|---|---|---|
| `config accel-motion-sensitivity` | `off` / `low` / `medium` / `high` | Citlivost detekce pohybu akcelerometrem. Výchozí `off`, což akcelerometr vypne. |
| `config sensor1-rom` ... `config sensor4-rom` | 16 hex číslic | Přiřadí senzor 1-Wire ke slotu 1-4 podle sériového čísla v jeho ROM. Samé nuly = prázdný slot. |

---

## Čítače impulzů {#pulse-counters}

| Příkaz | Argument | Popis |
|---|---|---|
| `config hall-left-counter` | `true` / `false` | Počítat impulzy na levém Hallově spínači. |
| `config hall-right-counter` | `true` / `false` | Počítat impulzy na pravém Hallově spínači. |
| `config input-a-counter` | `true` / `false` | Počítat impulzy na externím vstupu A. |
| `config input-b-counter` | `true` / `false` | Počítat impulzy na externím vstupu B. |

Podrobnosti k zapojení (přepínače DIP, 1-Wire, bezpotenciálový kontakt, analogový vstup) najdete na stránce [**Zapojení vstupů STICKER Input**](../sticker-input-wiring/index.md).

---

## Identita zařízení a bezpečnostní architektura NFC {#device-identity--nfc-security-architecture}

Tyto parametry určují identitu zařízení, řízení přístupu přes NFC a claim token. Nastavují se ve výrobě a za běžného provozu se nemají měnit.

| Příkaz | Argument | Popis |
|---|---|---|
| `config serial-number` | 10 dekadických číslic | Sériové číslo zařízení. |
| `config secret-key` | 32 hex číslic | Secret key zařízení, kterým se zabezpečuje lokální kanál NFC pomocí AES-CCM. Číst i zapisovat ho lze jen přes shell. |
| `config nonce-counter` | Celé číslo | Čítač nonce, který chrání šifrované příkazové kanály NFC a LoRaWAN proti opakovanému odeslání (replay). |
| `config claim-token` | 32 hex číslic | 128bitový claim token zařízení zapisovatelný jen jednou. Po nastavení při uvedení do provozu už ho nelze změnit a vlastnictví zařízení zůstane vázané k jednomu backendu. |
| `config calibration` | `true` / `false` | Zapne kalibrační režim (pro výrobu). |

### Šifrovaný lokální přístupový kanál NFC {#encrypted-nfc-local-access-channel}

Od firmwaru v1.4.0 jsou lokální transakce čtení a zápisu přes NFC zabezpečené proti odposlechu a neoprávněné změně konfigurace:

- **Zabezpečení AES-CCM:** Komunikace s telefonem v aplikaci [**HARDWARIO Manager**](/sticker/hardwario-manager/) probíhá šifrovaným kanálem AES-CCM nad záznamy NDEF (`hio.stck:cmd` pro požadavky a `hio.stck:rsp` pro odpovědi).
- **Ochrana proti opakovanému odeslání:** Každá transakce ověří a zvýší `nonce-counter`, takže zachycenou komunikaci NFC nelze zneužít k útoku jejím opakovaným odesláním (replay).
- **Claim token:** 128bitovým `claim-token` lze fyzické zařízení svázat s cloudovou instancí zákazníka před nasazením nebo během něj, aniž by se muselo hned připojit k síti LoRaWAN.
