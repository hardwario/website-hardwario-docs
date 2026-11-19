---
slug: sensor-history
title: Historie senzorů
description: "Měření uložená v zařízení STICKER přečtete v aplikaci HARDWARIO Manager přes NFC a projdete je jako souhrn, grafy a tabulky po dnech."
title_meta: "Historie senzorů (HARDWARIO Manager pro STICKER)"
---

# Čtení historie senzorů {#read-sensor-history}

Zařízení STICKER umí ukládat měření přímo v sobě (store-and-forward), takže
hodnoty naměřené v době, kdy bylo offline, se neztratí. Uložené záznamy přečtete
zpět přes NFC.

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Senzory → Historie senzorů**.
2. Přiložte telefon k zařízení STICKER a nehýbejte s ním.
3. Aplikace uložené záznamy načte a zobrazí.

<img src="/img/hw-manager/hw-manager-sensor-history.png" alt="Obrazovka Historie senzorů po načtení: souhrn uložené historie s 12 záznamy, intervalem 15 min, časovým rozsahem a 2 kanály a pod ním graf teploty" width="320" />

Velká vyrovnávací paměť se přenáší po několika stránkách. Aplikace je čte jednu
za druhou, dokud držíte telefon v klidu, a ukazuje průběh. Pokud se čtení
přeruší, obrazovka uvede, kolik záznamů už má: podržte telefon v klidu a načtěte
znovu pro zbytek.

---

## Co dostanete {#what-you-get}

Obrazovka data přehledně zpracuje, nevypisuje je surově:

- souhrn **Uložená historie**: počet záznamů, interval odesílání, časový rozsah
  a kanály,
- **Grafy** uložených hodnot, ve kterých můžete jednotlivé kanály skrýt,
- **tabulky po dnech**, které rozbalíte na jednotlivé záznamy.

U dlouhé historie se zobrazí nejnovější záznamy a obrazovka uvede, kolik jich
z celkového počtu ukazuje.

Časové značky závisí na hodinách zařízení. Pokud byl čas zařízení
synchronizován, mají záznamy absolutní časové značky v UTC; pokud ne, jsou
seskupené jako *Den 1*, *Den 2* a tak dál, relativně k okamžiku čtení. Hodiny
nastavíte přes **Nástroje → Synchronizovat čas**, viz [**Nástroje**](./tools.md).

<img src="/img/hw-manager/hw-manager-sensor-history-table.png" alt="Rozbalená tabulka Den 1 s 12 záznamy: čas relativně k okamžiku čtení, teplota ve °C a vlhkost v %" width="320" />

---

## Historii je nutné nejdřív zapnout {#history-has-to-be-enabled-first}

Záznamy se ukládají, jen když je historie zapnutá. Zapnete ji a zvolíte
ukládané kanály v **Konfigurace → Historie** (viz
[**Konfigurace**](./configuration.md)) nebo přes shell příkazy
`config history-enable` / `config history-channels`, které popisuje stránka
[**Historie senzorů (přístup pro vývojáře)**](/sticker/developer-access/sensor-history).
Sekce **Historie** také odhadne, kolik času se pro zvolené kanály a interval
odesílání do paměti vejde.

<img src="/img/hw-manager/hw-manager-configuration-history.png" alt="Sekce Historie v konfiguraci: zapnutá historie store-and-forward, teplota a vlhkost vybrané jako zaznamenávané kanály a odhad zhruba 3 měsíců historie" width="320" />

Když zařízení nemá žádné záznamy, obrazovka řekne, o který případ jde:

- **Historie je vypnutá**: zapněte ji a zařízení pak při každém odeslání uloží
  jeden záznam. Tlačítko **Otevřít nastavení historie** vás tam přenese.
- **Zatím žádné záznamy**: historie je zapnutá a první záznam se objeví po
  nejbližším odeslání. Aktualizace firmwaru nebo změna zaznamenávaných kanálů
  vyrovnávací paměť vymaže.

Pokud chcete místo uložených dat provést nové měření, použijte
[**Odečet dat ze senzorů**](./sample-data.md).
