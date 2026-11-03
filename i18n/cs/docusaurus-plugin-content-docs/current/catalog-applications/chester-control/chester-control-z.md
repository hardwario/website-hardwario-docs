---
title: CHESTER Control Z
description: "CHESTER Control Z doplňuje CHESTER Control o záložní modul CHESTER-Z1, takže zařízení při výpadku externího napájení běží dál a výpadek nahlásí."
---

# CHESTER Control Z {#chester-control-z}

**CHESTER Control Z** je aplikace [**CHESTER Control**](index.md) se záložním modulem **CHESTER-Z1**.

:::info Firmware

Tato varianta používá **[firmware CHESTER Control Z](../../firmware/chester-control/chester-control-z.md)**.

:::

## Rozdíly oproti aplikaci CHESTER Control {#differences-from-chester-control}

- Při výpadku externího napájení běží dál na záložní baterii.
- Hlásí napětí externího napájení a záložní baterie a výpadek i obnovení externího napájení nahlásí okamžitě.
- Firmware v4.0.1 této varianty je sestavený bez podpory modulu CHESTER-X4, takže výstupy nespíná.

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-BCGLS`: Standardní základní deska

* `CHESTER-X0B:A`: Vstupní modul (4 kanály)

* `CHESTER-X4:B`: Step-down měnič a výstupy (4 kanály)

* `CHESTER-Z1`: Záložní modul

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).
