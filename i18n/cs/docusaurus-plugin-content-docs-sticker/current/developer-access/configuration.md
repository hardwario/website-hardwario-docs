---
slug: configuration
title: Konfigurace
description: "Nastavení zařízení se čte a zapisuje příkazem config přes vývojářský shell. Nastavení firmwaru a otevření konzole popisuje Nastavení firmwaru."
---
import Image from '@theme/IdealImage';




# Konfigurace (`config`) {#configuration-config}

Nastavení zařízení se čte a zapisuje příkazem `config` přes vývojářský shell. Nastavení firmwaru a otevření konzole popisuje [**Nastavení firmwaru**](firmware-setup.md).

:::info Firmware v1.4.0
Příkaz `config` a většina parametrů na této stránce platí pro firmware STICKER v1.4.0. Hlavní novinky ve v1.4.0:
- **Výchozí stav radio-silent:** Radio je ve výchozím stavu vypnuté (`radio-mode off`), aby se šetřila energie, dokud ho neaktivujete přes NFC v aplikaci [**HARDWARIO Manager**](../hardwario-manager) nebo ze shellu.
- **Šifrovaný přístup přes NFC:** Lokální příkazový kanál šifrovaný AES-CCM (`hio.stck:cmd` / `hio.stck:rsp`) s ochranou proti opakování pomocí nonce.
- **Claim token zapisovatelný jen jednou:** Neměnný token pro zprovoznění (`config claim-token`) pro bezpečné napojení na cloud.
- **Dohled nad spojením:** Kontroly spojení LoRaWAN (`lrw-link-check-interval`, `lrw-link-check-fail-rejoin`).
- **Historie senzorů:** Možnosti ukládání a přehrání (viz [**Historie senzorů**](sensor-history.md)).
:::

:::tip Konfigurace v provozu vs. vývojářská
Tato stránka dokumentuje interaktivní shell příkazy (`config`) dostupné přes debugovací připojení RTT, ale běžná konfigurace v provozu a uvedení do provozu se dělají bezdrátově přes NFC v aplikaci [**HARDWARIO Manager**](../hardwario-manager).
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

## Intervaly vzorkování a reportování {#sampling-and-reporting-intervals}

| Příkaz | Argument | Popis |
|---|---|---|
| `config interval-sample` | `0`, nebo `5`-`3600` (sekundy) | Jak často se vzorkují senzory. `0` znamená jeden vzorek vždy těsně před reportem. |
| `config interval-report` | `60`-`86400` (sekundy) | Jak často se posílá report uplinkem. Výchozí `900` (15 minut). |

**Příklad**: report každých 10 minut:

```bash
config interval-report 600
settings save
```

---

## Nastavení LoRaWAN a radia {#lorawan--radio-settings}

| Příkaz | Argument | Popis |
|---|---|---|
| `config radio-mode` | `on` / `off` | Zapne nebo vypne radio LoRaWAN. **Výchozí hodnota ve v1.4.0+ je `off` (režim Radio-Silent)**. |
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
| `config lrw-link-check-interval` | `0`-`255` | Vyžádá LinkCheckReq každý N-tý uplink. `0` = vypnuto. Výchozí `5`. |
| `config lrw-link-check-fail-rejoin` | `1`-`255` | Počet selhání kontroly spojení, po kterých se zkusí rejoin OTAA. Výchozí `5`. |

**Příklad**: EU868 s OTAA a zapnutím vysílání:

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

**Příznaky schopností** říkají firmwaru, jaký hardware je na dané variantě osazený. Nastavují se obvykle při zprovoznění ve výrobě a v provozu se nemají měnit.

| Příkaz | Argument | Popis |
|---|---|---|
| `config cap-barometer` | `true` / `false` | Osazený senzor barometrického tlaku. |
| `config cap-pir-detector` | `true` / `false` | Osazený detektor pohybu PIR. |
| `config cap-light-sensor` | `true` / `false` | Osazený senzor okolního osvětlení. |
| `config cap-accelerometer` | `true` / `false` | Osazený akcelerometr (orientace, pohyb, volný pád). |
| `config cap-w1-sensors` | `true` / `false` | Zapnutá sběrnice 1-Wire; připojené senzory se najdou automaticky při skenování. |
| `config cap-hall-left` | `true` / `false` | Osazený levý Hallův senzor. |
| `config cap-hall-right` | `true` / `false` | Osazený pravý Hallův senzor. |
| `config cap-input-a` | `true` / `false` | Osazený externí vstup A. |
| `config cap-input-b` | `true` / `false` | Osazený externí vstup B. |

**Nastavení senzorů:**

| Příkaz | Argument | Popis |
|---|---|---|
| `config accel-motion-sensitivity` | `off` / `low` / `medium` / `high` | Citlivost detekce pohybu akcelerometrem. Výchozí `off`, což akcelerometr vypne. |
| `config sensor1-rom` ... `config sensor4-rom` | 16 hex číslic | Přiřadí senzor 1-Wire ke slotu 1-4 podle jeho ROM sériového čísla. Samé nuly = prázdný slot. |

---

## Pulzní čítače {#pulse-counters}

| Příkaz | Argument | Popis |
|---|---|---|
| `config hall-left-counter` | `true` / `false` | Počítat pulzy na levém Hallově kontaktu. |
| `config hall-right-counter` | `true` / `false` | Počítat pulzy na pravém Hallově kontaktu. |
| `config input-a-counter` | `true` / `false` | Počítat pulzy na externím vstupu A. |
| `config input-b-counter` | `true` / `false` | Počítat pulzy na externím vstupu B. |

Podrobnosti k zapojení (DIP přepínače, 1-Wire, suchý kontakt, analog) najdete v [**Zapojení vstupů STICKER Input**](../sticker-input-wiring/index.md).

---

## Identita zařízení a bezpečnostní architektura NFC {#device-identity--nfc-security-architecture}

Tyto parametry spravují identitu zařízení, řízení přístupu přes NFC a zprovoznění claim tokenu. Nastavují se při zprovoznění ve výrobě a při běžném provozu se nemají měnit.

| Příkaz | Argument | Popis |
|---|---|---|
| `config serial-number` | 10 dekadických číslic | Sériové číslo zařízení. |
| `config secret-key` | 32 hex číslic | Secret key zařízení, kterým se zabezpečuje lokální kanál NFC pomocí AES-CCM. Čitelný i zapisovatelný jen přes shell. |
| `config nonce-counter` | Celé číslo | Čítač nonce proti opakování, vynucovaný na šifrovaných příkazových kanálech NFC a LoRaWAN. |
| `config claim-token` | 32 hex číslic | 128bitový claim token zařízení zapisovatelný jen jednou. Po nastavení při uvedení do provozu se stane neměnným a uzamkne vlastnictví jednotky k backendu. |
| `config calibration` | `true` / `false` | Zapne kalibrační režim (pro výrobu). |

### Šifrovaný lokální přístupový kanál NFC {#encrypted-nfc-local-access-channel}

Od firmwaru v1.4.0 jsou lokální transakce čtení a zápisu přes NFC zabezpečené proti odposlechu a neoprávněné rekonfiguraci:

- **Zabezpečení AES-CCM:** Komunikace s telefonem přes [**HARDWARIO Manager**](../hardwario-manager) používá šifrovaný kanál AES-CCM nad záznamy NDEF (`hio.stck:cmd` pro žádosti a `hio.stck:rsp` pro odpovědi).
- **Mechanismus proti opakování:** Každá transakce vyhodnotí a zvýší `nonce-counter`, což brání útokům přehráním zachycených NFC session.
- **Zprovoznění claim tokenu:** 128bitový `claim-token` umožňuje svázat fyzickou jednotku s cloudovou instancí zákazníka před nasazením nebo během něj, aniž by bylo potřeba okamžité připojení k LoRaWAN.
