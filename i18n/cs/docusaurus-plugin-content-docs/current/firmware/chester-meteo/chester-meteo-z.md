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

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `backup-report-connected` | `true`, `false` | `true` | Hlásit okamžitě obnovení externího napájení |
| `backup-report-disconnected` | `true`, `false` | `true` | Hlásit okamžitě výpadek externího napájení |

Ostatní parametry jsou stejné.

### Data {#data}

Hlášení navíc obsahuje strukturu `backup` s externím napětím (`line_voltage`) a napětím záložní baterie (`batt_voltage`) ve voltech, stavem externího napájení `state` (`connected` nebo `disconnected`) a jeho událostmi `events` (`connected`, `disconnected`). V režimu LoRaWAN se hodnoty záložního modulu neodesílají.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
  "backup": {
    "line_voltage": 24.21,
    "batt_voltage": 3.41,
    "state": "connected",
    "events": [
      {
        "timestamp": 1675784338,
        "type": "disconnected"
      },
      {
        "timestamp": 1675784518,
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
