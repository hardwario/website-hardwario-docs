---
title: CHESTER Control Z
description: "Firmware CHESTER Control Z: čím se liší od hlavního firmwaru CHESTER Control při použití záložního modulu CHESTER-Z."
---

# CHESTER Control Z {#chester-control-z}

**CHESTER Control Z** je firmware CHESTER Control sestavený pro záložní modul **CHESTER-Z**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Control**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-control}

### Hardware {#hardware}

- Přidává modul **CHESTER-Z**: záložní baterii a vstup externího napájení se sledováním napětí (viz [**CHESTER-Z1**](../../ordering-codes.md#chester-z)). Firmware modul vyžaduje: bez něj selže inicializace a watchdog zařízení asi po dvou minutách restartuje.
- Nepodporuje výstupy modulu **CHESTER-X4**: firmware je nespíná, takže zprávy downlink s `output_X_state` ani šest stisků tlačítka nemají žádný účinek.

### Chování {#behavior}

Záložní modul hlásí stav záložní baterie a externího napájení DC:

* Aktuální **napětí záložní baterie** a **napětí externího zdroje DC** se posílají v každém hlášení přes NB-IoT/LTE.

* Při změně na napájecím vstupu DC se do bufferu uloží časová značka změny spolu se stavem **connected**/**disconnected** a buffer událostí se odešle nejpozději s pravidelným hlášením (parametr `interval-report`).

* Ve výchozím stavu spustí změna do stavu **connected** (parametr `backup-report-connected`) nebo **disconnected** (parametr `backup-report-disconnected`) i samostatné hlášení. To se odešle po **prodlevě** nastavené parametrem `event-report-delay`, aby se do něj vešly i další změny krátce po sobě.

* Maximální počet hlášení za hodinu lze nastavit (parametr `event-report-rate`). Omezení počtu hlášení šetří komunikační pásmo a prodlužuje výdrž baterie.

### Konfigurační parametry {#configuration-parameters}

Přidané parametry pro záložní modul:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Parametry `event-report-delay` a `event-report-rate` platí i pro události záložního napájení. Ostatní parametry jsou stejné.

### Data {#data}

Hlášení navíc obsahuje strukturu `backup` s napětím externího vstupu DC (`line_voltage`) a záložní baterie (`batt_voltage`) ve voltech, stavem napájení `state` (`connected` nebo `disconnected`) a událostmi napájení `events` od předchozího hlášení. Dekodér tohoto firmwaru seznam `events` nerozkládá na jednotlivé položky, takže HARDWARIO Cloud zobrazí seznam čísel: unixový čas první změny a pak dvě čísla pro každou změnu, její odstup od tohoto času v sekundách a `1` (připojeno) nebo `0` (odpojeno). V této ukázce externí napájení vypadlo a o 95 sekund později se obnovilo:

```json
{
  "backup": {
    "line_voltage": 24.02,
    "batt_voltage": 4.11,
    "state": "connected",
    "events": [1793944910, 0, 0, 95, 1]
  }
}
```

Rozsahy a rozlišení popisuje stránka katalogové aplikace v části [**CHESTER Control Z**](../../catalog-applications/chester-control/index.md#chester-control-z). Zprávy LoRaWAN data záložního modulu neobsahují.

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-control-z:v4.0.1](https://firmware.hardwario.com/chester/9d8514b702144c2d956640ee31f65cb0), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `9d8514b702144c2d956640ee31f65cb0`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/9d8514b702144c2d956640ee31f65cb0/hex), SHA256 `41a07a19d6835fa676ac9a3502b0b3310a8b8669503da2414dcd4201c31584b1`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/9d8514b702144c2d956640ee31f65cb0/bin), SHA256 `87026795bb07ddf4b3ea7e7653cd484b273f140a20e883b62a7f958585145e5b`
- **Sestavení ze SDK:** `west chester-update control --variant "CHESTER Control Z"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
