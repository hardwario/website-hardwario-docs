---
title: CHESTER Current Z
description: "Firmware CHESTER Current Z: čím se liší od hlavního firmwaru CHESTER Current, aby podporoval záložní modul CHESTER-Z1."
---

# CHESTER Current Z {#chester-current-z}

**CHESTER Current Z** je firmware CHESTER Current sestavený pro záložní modul **CHESTER-Z1**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Current**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-current}

### Hardware {#hardware}

- Přidává modul **CHESTER-Z1**: záložní baterii a sledování externího vstupu DC (viz [**CHESTER-Z1**](../../ordering-codes.md#chester-z)).
- Na rozdíl od firmwaru CHESTER Clime firmware CHESTER Current modul za běhu nerozpozná, takže funkce záložního napájení vyžadují toto sestavení.

### Chování {#behavior}

- Aktuální **napětí baterie** a **napětí externího zdroje DC** se posílají v každém hlášení.
- Při změně na napájecím vstupu DC se uloží časová značka změny spolu se stavem **connected**/**disconnected**. Události se ukládají do bufferu (nejvýše 32) a odešlou se nejpozději s pravidelným hlášením (parametr `interval-report`).
- Změny napájecího vstupu DC do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) lze volitelně hlásit **okamžitě** nebo s nastavitelným **zpožděním** (parametr `event-report-delay`), aby se do hlášení vešlo i více změn krátce po sobě.
- Maximální počet hlášení událostí za hodinu lze nastavit (parametr `event-report-rate`). Limit šetří baterii zařízení a snižuje objem přenášených dat; pravidelná hlášení podle parametru `interval-report` se do něj nepočítají.

### Konfigurační parametry {#configuration-parameters}

Přidané parametry pro záložní modul:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `event-report-delay` | Event report delay | `<1-86400>` | `1` | Prodleva mezi změnou napájení a hlášením v sekundách |
| `event-report-rate` | Event report rate | `<1-3600>` | `30` | Nejvyšší počet hlášení událostí za hodinu (firmware v4.0.1 jich pošle až o jedno víc); pravidelná hlášení se do limitu nepočítají |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Ostatní parametry jsou stejné.

### Data {#data}

Hlášení navíc obsahuje strukturu `backup`. Každé pole včetně jednotky, rozsahu a rozlišení popisuje katalogová stránka v části [**CHESTER Current Z**](../../catalog-applications/chester-current/index.md#chester-current-z).

| Klíč | Hodnota |
| :--- | :--- |
| `line_voltage` | Napětí externího vstupu DC ve V |
| `batt_voltage` | Napětí záložní baterie ve V |
| `state` | `connected`, když je externí napájení připojené, jinak `disconnected` |
| `events` | Změny napájení od posledního hlášení (nejvýše 32), každá s klíči `timestamp` a `type` (`connected`, `disconnected`) |

V režimu LoRaWAN má hlavička nastavený příznak BACKUP (bit 4) a payload navíc obsahuje externí napětí a napětí baterie v mV (po 2 bajtech) a stav (1 bajt), a to mezi teploměry 1-Wire a kanály. Dekodér je vrací jako `backup.line_voltage` a `backup.battery_voltage` ve V a `backup.backup_state` (`connected`, `disconnected`).

Ukázka zachycuje strukturu `backup` v hlášení, které následuje po obnovení externího napájení:

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "backup": {
    "line_voltage": 24.01,
    "batt_voltage": 4.09,
    "state": "connected",
    "events": [
      { "timestamp": 1793960915, "type": "connected" }
    ]
  }
}
```

</details>

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-current-z:v4.0.1](https://firmware.hardwario.com/chester/bd7bf21e742f4172ae48378ae55a3d6a), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `bd7bf21e742f4172ae48378ae55a3d6a`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/bd7bf21e742f4172ae48378ae55a3d6a/hex), SHA256 `65878e40ce529daeec834db185af0d0aeb5fdb4a0baba46e7993cb163ae8986a`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/bd7bf21e742f4172ae48378ae55a3d6a/bin), SHA256 `f93fffbd5059872dce0af106a91fed55b3c16a07621f92a9165f0e6972e7951e`
- **Sestavení ze SDK:** `west chester-update current --variant "CHESTER Current Z"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
