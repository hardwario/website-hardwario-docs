---
title: CHESTER Control 8Ch Z
description: "Firmware CHESTER Control 8Ch Z: čím se liší od hlavního firmwaru CHESTER Control při osmi vstupních kanálech a se záložním modulem CHESTER-Z."
---

# CHESTER Control 8Ch Z {#chester-control-8ch-z}

**CHESTER Control 8Ch Z** je firmware CHESTER Control sestavený pro osm vstupních kanálů s druhým modulem **CHESTER-X0** ve slotu B a pro záložní modul **CHESTER-Z**. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Control**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-control}

### Hardware {#hardware}

- Přidává druhý modul **CHESTER-X0** ve slotu B s kanály 5 až 8 na svorkách B2, B4, B5 a B7.
- Přidává modul **CHESTER-Z**: záložní baterii a vstup externího napájení, stejně jako firmware [**CHESTER Control Z**](chester-control-z.md). Ani tento firmware bez modulu nepoběží.
- Nepodporuje výstupy modulu **CHESTER-X4**, protože v obou slotech jsou moduly CHESTER-X0: zprávy downlink s `output_X_state` ani šest stisků tlačítka nemají žádný účinek.

### Chování {#behavior}

- Kanály 5 až 8 fungují stejně jako kanály 1 až 4. Parametry pro trigger, counter a analogové vstupy jsou společné pro všech osm kanálů.
- Když firmware druhý modul CHESTER-X0 při startu nenajde, pracuje jen s kanály 1 až 4.
- Záložní napájení se hlásí stejně jako ve firmwaru [**CHESTER Control Z**](chester-control-z.md#behavior).

### Konfigurační parametry {#configuration-parameters}

Přidané parametry pro kanály 5 až 8:

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `channel-mode-5` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 5 (modul CHESTER-X0 ve slotu B, svorka B2) |
| `channel-mode-6` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 6 (svorka B4) |
| `channel-mode-7` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 7 (svorka B5) |
| `channel-mode-8` | `disabled`, `trigger`, `counter`, `voltage`, `current` | `disabled` | Režim kanálu 8 (svorka B7) |

Záložní modul přidává parametry `backup-report-connected` a `backup-report-disconnected`, stejně jako ve firmwaru [**CHESTER Control Z**](chester-control-z.md#configuration-parameters). Ostatní parametry jsou stejné.

### Příkazy {#commands}

Příkazy `channel` přijímají kanály 1 až 8.

### Data {#data}

- Struktury `trigger`, `counter`, `voltage` a `current` obsahují i kanály 5 až 8 (`channel` 5 až 8).
- Hlášení navíc obsahuje strukturu `backup` popsanou u firmwaru [**CHESTER Control Z**](chester-control-z.md#data).
- Zprávy LoRaWAN navíc obsahují `inputs_b` se stavem kanálů 5 až 8 ve stejném formátu jako `inputs_a`.

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-control-8ch-z:v4.0.1](https://firmware.hardwario.com/chester/1e29c5be1d604788908a1a728ae38415), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `1e29c5be1d604788908a1a728ae38415`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/1e29c5be1d604788908a1a728ae38415/hex), SHA256 `c42fdbdad6e7ffc33f7c9be40b6460af3b79fe30cc9a555daafa6a7e819fc71d`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/1e29c5be1d604788908a1a728ae38415/bin), SHA256 `29cf65eb704d01af14f2f6f8474ea227abb2243eb02417db7b8830c86efb912a`
- **Sestavení ze SDK:** `west chester-update control --variant "CHESTER Control 8Ch Z"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
