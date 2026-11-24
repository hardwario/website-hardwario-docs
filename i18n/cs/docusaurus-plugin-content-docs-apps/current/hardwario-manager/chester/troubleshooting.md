---
slug: troubleshooting
title: Řešení problémů
description: "Řešení problémů s Bluetooth u zařízení CHESTER v aplikaci HARDWARIO Manager: co znamenají chyby hledání, párování, spojení a stahování a co dělat."
title_meta: "Řešení problémů (HARDWARIO Manager pro CHESTER)"
---

# Řešení problémů se zařízením CHESTER {#chester-troubleshooting}

Aplikace každou chybu Bluetooth roztřídí a zobrazí hlášení, co se stalo a co
dělat. Původní text chyby najdete po rozbalení **Technické podrobnosti** i
s tlačítkem pro zkopírování. Když problém hlásíte, tento text přiložte.

Kde nový pokus nepomůže, nabídne aplikace místo tlačítka pro opakování rovnou
nápravu: **Zapnout Bluetooth**, když je Bluetooth v telefonu vypnuté, a
**Otevřít nastavení**, když chybí oprávnění.

---

## Hledání a připojování {#finding-and-connecting}

| Co vidíte | Co dělat |
|---|---|
| **Bluetooth je vypnuté** | Zapněte v telefonu Bluetooth, nebo klepněte na **Zapnout Bluetooth**, a spusťte vyhledávání znovu. |
| **Je potřeba oprávnění k Bluetooth** | Povolte aplikaci v nastavení telefonu oprávnění Zařízení v okolí, viz [**Instalace aplikace**](../install.md). |
| **Zařízení nenalezeno**, v okolí není žádné zařízení CHESTER | Zkontrolujte, že je zařízení zapnuté a v dosahu, a spusťte vyhledávání znovu. Hledání podle naskenovaného QR kódu skončí po 30 sekundách. |
| Aplikace našla zařízení, ale ne to se sériovým číslem, které hledáte | Aplikace vypíše sériová čísla, která našla. Ověřte, že máte před sebou správné zařízení. |
| **Připojení selhalo** | Přibližte telefon k zařízení, zařízení vypněte a zapněte a opakujte pokus. |
| Vyhledávání se samo zastaví | Vyhledávání běží asi 30 sekund. Použijte **Vyhledat znovu**. |
| **Nepodporované zařízení** | Zařízení nenabízí služby CHESTER. Zkontrolujte, že na něm běží firmware CHESTER a že se nezaseklo v bootloaderu. |
| Zařízení zmizelo dřív, než se aplikace připojila | Dostalo se mimo dosah. Spusťte vyhledávání znovu a klepněte na zařízení, až se zase objeví. |
| **Bluetooth je zaneprázdněné** | Spojení drží jiná aplikace nebo nedokončená operace. Chvíli počkejte a zkuste to znovu. |

---

## Párování {#pairing}

| Co vidíte | Co dělat |
|---|---|
| **Párování selhalo** | Telefon má pravděpodobně uložené zastaralé spárování. Zrušte spárování zařízení v nastavení Bluetooth telefonu, pak se připojte znovu a zadejte passkey ze štítku. |
| Párování se nedokončilo | Přijměte v telefonu žádost o párování a zadejte passkey. Pokud je v telefonu uložené zastaralé spárování, nejdřív ho zrušte. |
| Zařízení párování právě odmítlo | Chvíli počkejte a zkuste to znovu. Zaseknutý pokus o párování vyřeší vypnutí a zapnutí zařízení. |
| Obecná chyba Bluetooth na Androidu | Přibližte se k zařízení, vypněte a zapněte ho a zkuste to znovu. Pokud potíže trvají, vypněte a zapněte Bluetooth v telefonu, nebo zrušte spárování zařízení v nastavení Bluetooth. |
| Passkey ze štítku zařízení nepřijme | Zařízení může mít v **Pokročilá konfigurace → Bluetooth** nastavený vlastní passkey. Použijte ten, nebo se zeptejte toho, kdo zařízení nastavoval. |

:::tip Obvykle pomůže zrušit spárování
Většinu přetrvávajících problémů s párováním způsobuje zastaralé spárování
uložené v telefonu. Zrušte spárování zařízení CHESTER přímo v nastavení Bluetooth
telefonu (nestačí to udělat jen v aplikaci) a pak se znovu připojte přes QR kód.
:::

---

## Během spojení {#while-connected}

| Co vidíte | Co dělat |
|---|---|
| **Spojení ztraceno**, zařízení spojení ukončilo | Zařízení se možná restartovalo; spojení ukončí restart, uložení konfigurace i aktualizace firmwaru. Když restart způsobila aplikace, připojí se sama; jinak se připojte znovu. |
| Zařízení se vypnulo | Zkontrolujte jeho napájení nebo baterii a připojte se znovu. |
| **Zařízení neodpovídá** | Držte zařízení blízko telefonu a zkuste to znovu. Pokud ani pak neodpoví, připojte se znovu. |
| Telefon má příliš mnoho připojení Bluetooth | Odpojte jiné zařízení a zkuste to znovu. |
| **Zařízení to odmítlo** | Firmware tuto operaci nepovoluje. Zkontrolujte, že na zařízení běží aktuální firmware CHESTER. |
| Čtení konfigurace nevrátilo žádná použitelná data | Firmware možná nepodporuje konfigurační příkazy shellu. Viz [**Konfigurace**](./configuration.md). |
| **Připojování k CHESTER** to vzdá | Aplikace zařízení po restartu nenašla. Zkontrolujte, že je napájené a v dosahu, a připojte se znovu z obrazovky [**Připojit k CHESTER**](./connect.md). |

---

## Stahování {#downloads}

Ke stažení passkey nebo image firmwaru je potřeba internet:

| Co vidíte | Co dělat |
|---|---|
| **Není spojení se serverem** | Zkontrolujte připojení telefonu k internetu a zkuste to znovu. |
| Server na dané adrese nic nemá (404) | Odkaz je chybný nebo vypršela jeho platnost. Opatřete si nový QR kód. |
| **Firmware není použitelný** | Soubor nebo stažený image není firmware pro CHESTER, nebo nesedí jeho kontrolní součet. Viz [**Aktualizace firmwaru**](./firmware-update.md#if-it-fails). |

---

## Očekávané chování {#things-that-are-expected}

- **Spojení trvá, dokud aplikaci používáte.** Když obrazovky CHESTER opustíte,
  zařízení zůstane připojené. Spojení skončí, když klepnete na **Odpojit**, když
  zařízení zmizí, nebo po 30 minutách, během kterých aplikace se zařízením
  nekomunikuje; obrazovka **Připojit k CHESTER** to pak vysvětlí upozorněním
  **Odpojeno po 30 minutách**.
- **Vždy jen jedno zařízení CHESTER.** Než se připojíte k dalšímu, odpojte se.
- **Uložení zařízení restartuje.** Uložení konfigurace, restart, obnovení
  továrního nastavení i uložená změna slotů tagů BLE zařízení CHESTER restartují
  a spojení se na chvíli přeruší. Aplikace se připojí sama.
- **Zařízení připojené přes vyhledávání v okolí si aplikace nepamatuje** a passkey
  pro něj nedohledá. Obojí získáte, když se připojíte přes QR kód.
- **Sloty tagů BLE, které přiřadíte, zůstanou prázdné, dokud změny neuložíte.**
  **Přiřadit** změnu jen připraví; do zařízení se dostane až klepnutím na
  **Uložit do zařízení**. Přidání tagu podle adresy, podle QR kódu nebo
  spárováním tagů v okolí se projeví okamžitě, viz [**BLE tagy**](./ble-tags.md).
