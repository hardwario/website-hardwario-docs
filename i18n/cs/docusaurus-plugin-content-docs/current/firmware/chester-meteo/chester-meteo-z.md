---
title: CHESTER Meteo Z
description: "Firmware CHESTER Meteo Z: čím se liší od hlavního firmwaru CHESTER Meteo při použití záložního modulu CHESTER-Z1."
---

# CHESTER Meteo Z {#chester-meteo-z}

**CHESTER Meteo Z** je firmware CHESTER Meteo sestavený pro záložní modul **CHESTER-Z1**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Meteo**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-meteo}

### Hardware {#hardware}

- Přidává modul **CHESTER-Z1**, záložní modul se záložní baterií (viz [**CHESTER-Z1**](../../ordering-codes.md#chester-z)).
- Hlavní firmware CHESTER Meteo záložní modul nepodporuje, zařízení s modulem CHESTER-Z1 proto potřebuje toto sestavení.

### Chování {#behavior}

- Sleduje externí napájení a napětí záložní baterie.
- Výpadek i obnovení externího napájení okamžitě nahlásí. Pro tato hlášení platí parametry `event-report-delay` a `event-report-rate`.

### Konfigurační parametry {#configuration-parameters}

Přidané parametry záložního modulu:

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `backup-report-connected` | Backup report connected | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | Backup report disconnected | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Ostatní parametry jsou stejné.

### Data {#data}

Hlášení navíc obsahuje strukturu `backup` s napětím na vstupu DC (`line_voltage`) a napětím záložní baterie (`batt_voltage`) v mV, stavem externího napájení `state` (`connected` nebo `disconnected`) a jeho událostmi `events` od předchozího hlášení (`connected`, `disconnected`). V režimu LoRaWAN se hodnoty záložního modulu neodesílají. Každé pole s jednotkou, rozsahem a rozlišením popisuje katalogová stránka v části [**CHESTER Meteo Z**](../../catalog-applications/chester-meteo/index.md#chester-meteo-z).

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "backup": {
    "line_voltage": 24209,
    "batt_voltage": 4090,
    "state": "connected",
    "events": [
      {
        "timestamp": 1793606224,
        "type": "disconnected"
      },
      {
        "timestamp": 1793606403,
        "type": "connected"
      }
    ]
  }
}
```

</details>

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-meteo-z:v4.0.1](https://firmware.hardwario.com/chester/f3ce30b40ad6404b9ef3e661330d2f24), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `f3ce30b40ad6404b9ef3e661330d2f24`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/f3ce30b40ad6404b9ef3e661330d2f24/hex), SHA256 `05511cda9fdc6f31f3c8bc660738421b835f1f2609e4361ceb3cfd561071f10d`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/f3ce30b40ad6404b9ef3e661330d2f24/bin), SHA256 `c4838d74fffb6b12074b7cf241494b3576dcf75f55c8e1f2f8e84bf016775646`
- **Sestavení ze SDK:** `west chester-update meteo --variant "CHESTER Meteo Z"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
