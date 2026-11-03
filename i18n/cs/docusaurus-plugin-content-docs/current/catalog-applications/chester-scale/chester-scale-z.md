---
title: CHESTER Scale Z
description: "CHESTER Scale Z doplňuje CHESTER Scale o záložní modul CHESTER-Z1, takže zařízení při výpadku externího napájení dál měří a výpadek nahlásí."
---

# CHESTER Scale Z {#chester-scale-z}

**CHESTER Scale Z** je aplikace [**CHESTER Scale**](index.md) se záložním modulem **CHESTER-Z1** pro nepřerušený provoz.

:::info Firmware

Tato varianta používá **[firmware CHESTER Scale Z](../../firmware/chester-scale/chester-scale-z.md)**.

:::

## Rozdíly oproti aplikaci CHESTER Scale {#differences-from-chester-scale}

- Při výpadku externího napájení běží dál na záložní baterii.
- V každém hlášení posílá napětí baterie a napětí externího zdroje DC.
- Výpadek i obnovení externího napájení okamžitě nahlásí.

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska
* `CHESTER-Z1`: Záložní modul
* `CHESTER-X3C:A` nebo `CHESTER-X3C:B`: Rozhraní pro tenzometrické snímače (2 kanály na modul)
* `CHESTER-E5-P`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).
