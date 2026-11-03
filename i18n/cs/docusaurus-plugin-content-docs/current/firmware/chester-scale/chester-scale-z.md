---
title: CHESTER Scale Z
description: "Firmware CHESTER Scale Z: čím se liší od hlavního firmwaru CHESTER Scale, aby podporoval záložní modul CHESTER-Z1."
---

# CHESTER Scale Z {#chester-scale-z}

**CHESTER Scale Z** je firmware CHESTER Scale sestavený pro záložní modul **CHESTER-Z1**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Scale**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-scale}

### Hardware {#hardware}

- Přidává modul **CHESTER-Z1**: záložní baterii a sledování externího vstupu DC (viz [**CHESTER-Z1**](../../ordering-codes.md#chester-z)).
- Na rozdíl od firmwaru CHESTER Clime firmware CHESTER Scale modul za běhu nerozpozná, takže funkce záložního napájení vyžadují toto sestavení.

### Chování {#behavior}

* Aktuální **napětí baterie** a **napětí externího zdroje DC** se posílají v každém hlášení.
* Při změně na napájecím vstupu DC se uloží časová značka změny spolu se stavem **connected**/**disconnected**. Události se ukládají do bufferu (nejvýše 32) a odešlou se nejpozději s pravidelným hlášením (parametr `interval-report`).
* Změny napájecího vstupu DC do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) lze volitelně hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`), aby se do hlášení vešlo i více změn krátce po sobě.
* Maximální počet hlášení událostí za hodinu lze nastavit (parametr `event-report-rate`). Pravidelná hlášení podle parametru `interval-report` se do něj nepočítají.

### Konfigurační parametry {#configuration-parameters}

Přidané parametry pro záložní modul:

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `event-report-delay` | `<1-86400>` | `1` | Prodleva mezi změnou napájení a hlášením v sekundách |
| `event-report-rate` | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu; pravidelná hlášení se do limitu nepočítají |
| `backup-report-connected` | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Ostatní parametry jsou stejné.

### Data {#data}

Hlášení navíc obsahuje strukturu `backup` s napětím externího vstupu DC (`line_voltage`) a záložní baterie (`batt_voltage`) v mV, stavem `state` (`connected` nebo `disconnected`) a událostmi `events` od posledního hlášení, každou s klíči `timestamp` a `type` (`connected`, `disconnected`). Uplinky LoRaWAN data záložního napájení nenesou.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "backup": {
    "line_voltage": 24010,
    "batt_voltage": 4090,
    "state": "connected",
    "events": []
  }
}
```

</details>

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-scale-z:v4.0.1](https://firmware.hardwario.com/chester/41adb245a2c74438a2baaf300b815abb), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `41adb245a2c74438a2baaf300b815abb`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/41adb245a2c74438a2baaf300b815abb/hex), SHA256 `cc407b752ec75a0071cf9d02f568f1dc6a15f937f0efa1fe43ddd7909e9c4e17`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/41adb245a2c74438a2baaf300b815abb/bin), SHA256 `146094947aefabb9ced2d7969e46a6c5eb84e0c7bb7bbec70ed105fa7120c74e`
- **Sestavení ze SDK:** `west chester-update scale --variant "CHESTER Scale Z"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
