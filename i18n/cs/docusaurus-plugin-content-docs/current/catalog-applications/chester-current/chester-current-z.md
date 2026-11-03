---
title: CHESTER Current Z
description: "CHESTER Current Z doplňuje CHESTER Current o záložní modul CHESTER-Z1, takže zařízení při výpadku externího napájení dál měří a výpadek nahlásí."
---

# CHESTER Current Z {#chester-current-z}

**CHESTER Current Z** je aplikace [**CHESTER Current**](index.md) se záložním modulem **CHESTER-Z1**.

:::info Firmware

Tato varianta používá **[firmware CHESTER Current Z](../../firmware/chester-current/chester-current-z.md)**.

:::

## Rozdíly oproti aplikaci CHESTER Current {#differences-from-chester-current}

- Při výpadku externího napájení běží dál na záložní baterii.
- V každém hlášení posílá napětí baterie a napětí externího zdroje DC.
- Výpadek i obnovení externího napájení okamžitě nahlásí.

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-K1-1C-2C-3C-4C`: 4x diferenciální vstup + 5 V boost
* `CHESTER-Z1`: Záložní modul
* `CHESTER-E2-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).
