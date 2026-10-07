---
slug: sensor-history
title: Historie senzorů
title_meta: "Historie senzorů (HARDWARIO Manager pro STICKER)"
---

# Čtení historie senzorů {#read-sensor-history}

Zařízení STICKER umí měření ukládat do vlastní paměti (store-and-forward), takže
hodnoty naměřené v době, kdy bylo offline, se neztratí. Uložené záznamy přečtete
přes NFC.

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Tools → Sensor history**.
2. Přiložte telefon k zařízení STICKER a nehýbejte s ním.
3. Uložené záznamy se načtou a zobrazí k prohlédnutí.

Při jednom přiložení se přes NFC přenese vždy jen jedna stránka, proto se velký
buffer načítá po **stránkách**. Přikládejte telefon opakovaně, dokud se nenačte
všechno.

---

## Co dostanete {#what-you-get}

Obrazovka data přehledně zobrazí, nejde o surový výpis:

- **souhrn** toho, co se načetlo,
- **grafy** uložených hodnot,
- **tabulky po dnech**, které lze rozbalit na jednotlivé záznamy.

Časové značky závisejí na hodinách zařízení. Pokud byl čas zařízení
synchronizovaný, mají záznamy absolutní časové značky v UTC; pokud ne, zobrazí
se čas relativně k okamžiku čtení. Hodiny nastavíte přes **Tools → Sync time**,
viz [**Nástroje**](./tools.md).

---

## Historii je nutné nejdřív zapnout {#history-has-to-be-enabled-first}

Záznamy se ukládají jen tehdy, když je historie zapnutá. Zapnete ji a kanály
k ukládání zvolíte v **Configuration → History** (viz
[**Konfigurace**](./configuration.md)) nebo příkazy shellu
`config history-enable` / `config history-sensors`, které popisuje stránka
[**Historie senzorů (přístup pro vývojáře)**](/sticker/developer-access/sensor-history).

:::info Firmware v1.4.0
Čtení historie senzorů přes NFC vyžaduje **firmware STICKER v1.4.0 nebo novější**.
:::

Pokud chcete místo uložených dat získat nové měření, použijte
[**Vzorek dat ze senzorů**](./sample-data.md).
