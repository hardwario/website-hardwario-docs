---
title: CHESTER Range Z
description: "Firmware CHESTER Range Z: čím se liší od hlavního firmwaru CHESTER Range při použití záložního modulu CHESTER-Z."
---

# CHESTER Range Z {#chester-range-z}

**CHESTER Range Z** je firmware CHESTER Range sestavený pro záložní modul **CHESTER-Z**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Range**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-range}

### Hardware {#hardware}

- Přidává modul **CHESTER-Z**: záložní baterii a vstup externího napájení se sledováním napětí (viz [**CHESTER-Z1**](../../ordering-codes.md#chester-z)).

### Chování {#behavior}

- Napětí externího napájení a napětí záložní baterie se posílají v každém hlášení.
- Každá změna externího napájení se uloží s časovou značkou jako událost **connected** nebo **disconnected** a odešle se nejpozději s příštím hlášením.
- Výpadek a obnovení externího napájení lze hlásit okamžitě (parametry `backup-report-disconnected` a `backup-report-connected`); hlášení odejde po prodlevě nastavené parametrem `event-report-delay` a počet takových hlášení za hodinu omezuje parametr `event-report-rate`.

### Konfigurační parametry {#configuration-parameters}

Přidané parametry:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Prodleva mezi změnou napájení a hlášením v sekundách |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu (firmware v4.0.1 jich pošle až o jedno víc); pravidelná hlášení se do limitu nepočítají |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Ostatní parametry jsou stejné.

### Data {#data}

Hlášení navíc obsahuje strukturu `backup` s napětím externího vstupu DC (`line_voltage`) a záložní baterie (`batt_voltage`) ve voltech, stavem napájení `state` (`connected` nebo `disconnected`) a událostmi napájení `events` od předchozího hlášení, každou s časem `timestamp` a typem `type` (`connected` nebo `disconnected`). V této ukázce externí napájení vypadlo a o 95 sekund později se obnovilo:

```json
{
  "backup": {
    "line_voltage": 24.02,
    "batt_voltage": 4.11,
    "state": "connected",
    "events": [
      {
        "timestamp": 1793944910,
        "type": "disconnected"
      },
      {
        "timestamp": 1793945005,
        "type": "connected"
      }
    ]
  }
}
```

Rozsahy a rozlišení popisuje stránka katalogové aplikace v části [**CHESTER Range Z**](../../catalog-applications/chester-range/index.md#chester-range-z).

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-range-z:v4.0.1](https://firmware.hardwario.com/chester/a7fe82069e234fcdae96a69d798a807b), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `a7fe82069e234fcdae96a69d798a807b`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/a7fe82069e234fcdae96a69d798a807b/hex), SHA256 `4f57170e580b197a7d63ef268ece8457fa4c6a5ce1f2939cc97de03e3b7a5c5c`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/a7fe82069e234fcdae96a69d798a807b/bin), SHA256 `a0ff1024deba933b02c776a0d001fb1b6d7ffa15fa2aef8dd1a0b0d49bd16ba2`
- **Sestavení ze SDK:** `west chester-update range --variant "CHESTER Range Z"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
