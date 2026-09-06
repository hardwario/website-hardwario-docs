---
slug: sensor-history
title: Historie senzorů
description: "Zařízení STICKER umí měření ukládat do sebe (store-and-forward), takže odečty"
title_meta: "Historie senzorů (HARDWARIO Manager for STICKER)"
---

# Čtení historie senzorů {#read-sensor-history}

Zařízení STICKER umí měření ukládat do sebe (store-and-forward), takže odečty
provedené v době, kdy bylo offline, se neztratí. Tyto uložené záznamy si přečtěte
přes NFC.

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Tools → Sensor history**.
2. Přiložte telefon k zařízení STICKER a nehýbejte s ním.
3. Uložené záznamy se načtou a zobrazí k prohlédnutí.

Protože jedno přiložení NFC přenese vždy jednu stránku, načítá se velký buffer
po **stránkách**. Přikládejte dál, dokud se nenačte všechno.

---

## Co dostanete {#what-you-get}

Obrazovka je datový pohled, ne surový výpis:

- **souhrn** toho, co se načetlo,
- **grafy** uložených hodnot,
- **tabulky po dnech**, které lze rozbalit na jednotlivé záznamy.

Časové značky závisejí na hodinách zařízení. Pokud byl čas zařízení
synchronizovaný, nesou záznamy absolutní časové značky v UTC; pokud ne, zobrazí
se relativně k okamžiku odečtu. Hodiny nastavíte přes **Tools → Sync time**,
viz [**Nástroje**](./tools.md).

---

## Historii je nutné nejdřív zapnout {#history-has-to-be-enabled-first}

Záznamy se ukládají jen tehdy, když je historie zapnutá. Zapněte ji a zvolte,
které kanály se mají ukládat, v **Configuration → History** (viz
[**Konfigurace**](./configuration.md)) nebo přes shell příkazy
`config history-enable` / `config history-sensors`, popsané v
[**Historii senzorů (přístup pro vývojáře)**](/sticker/developer-access/sensor-history).

:::info Firmware v1.4.0
Čtení historie senzorů přes NFC vyžaduje **firmware STICKER v1.4.0 nebo novější**.
:::

Pokud chcete místo čtení uložených dat provést nový odečet, použijte
[**Vzorek dat ze senzorů**](./sample-data.md).
