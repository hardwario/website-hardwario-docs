---
slug: troubleshooting
title: Řešení problémů
title_meta: "Řešení problémů (HARDWARIO Manager pro CHESTER)"
---

# Řešení problémů se zařízením CHESTER {#chester-troubleshooting}

Aplikace každou chybu Bluetooth roztřídí a zobrazí hlášení, co se stalo a co
dělat. Původní text chyby najdete po rozbalení **Technical details** i s tlačítkem
**Copy**. Když problém hlásíte, tento text přiložte.

Kde nový pokus nepomůže (vypnutý Bluetooth, neudělené oprávnění), nabídne aplikace
místo tlačítka pro opakování otevření nastavení telefonu.

---

## Hledání a připojování {#finding-and-connecting}

| Co vidíte | Co dělat |
|---|---|
| **Bluetooth is off** | Zapněte v telefonu Bluetooth a spusťte vyhledávání znovu. |
| **Bluetooth permission needed** | Povolte aplikaci v nastavení telefonu oprávnění Zařízení v okolí, viz [**Instalace aplikace**](../install.md). |
| **Device not found**, v okolí není žádné zařízení CHESTER | Zkontrolujte, že je zařízení zapnuté a v dosahu, a spusťte vyhledávání znovu. |
| Aplikace našla zařízení, ale ne to se sériovým číslem, které hledáte | Aplikace vypíše sériová čísla, která našla. Ověřte, že máte před sebou správné zařízení. |
| **Connection failed** | Přibližte telefon k zařízení, zařízení vypněte a zapněte a opakujte pokus. |
| Vyhledávání se samo zastaví | Vyhledávání běží asi 30 sekund. Použijte **Rescan**. |
| **Not a CHESTER** | Zařízení nenabízí služby CHESTER. Zkontrolujte, že na něm běží firmware CHESTER a že se nezaseklo v bootloaderu. |
| Zařízení zmizelo dřív, než se aplikace připojila | Dostalo se mimo dosah. Spusťte vyhledávání znovu a klepněte na zařízení, až se zase objeví. |

---

## Párování {#pairing}

| Co vidíte | Co dělat |
|---|---|
| **Pairing failed** | Telefon má pravděpodobně uložené zastaralé spárování. Zrušte spárování zařízení v nastavení Bluetooth telefonu, pak se připojte znovu a zadejte passkey ze štítku. |
| Párování se nedokončilo | Přijměte v telefonu žádost o párování a zadejte passkey. Pokud je v telefonu uložené zastaralé spárování, nejdřív ho zrušte. |
| Zařízení párování právě odmítlo | Chvíli počkejte a zkuste to znovu. Zaseknutý pokus o párování vyřeší vypnutí a zapnutí zařízení. |
| Obecná chyba Bluetooth na Androidu | Přibližte se k zařízení, vypněte a zapněte ho a zkuste to znovu. Pokud potíže trvají, vypněte a zapněte Bluetooth v telefonu, nebo zrušte spárování zařízení v nastavení Bluetooth. |

:::tip Obvykle pomůže zrušit spárování
Většinu přetrvávajících problémů s párováním způsobuje zastaralé spárování
uložené v telefonu. Zrušte spárování zařízení CHESTER přímo v nastavení Bluetooth
telefonu (nestačí to udělat jen v aplikaci) a pak se znovu připojte přes QR kód.
:::

---

## Během spojení {#while-connected}

| Co vidíte | Co dělat |
|---|---|
| **Connection lost**, zařízení spojení ukončilo | Zařízení se možná restartovalo (spojení ukončí restart i aktualizace firmwaru). Připojte se znovu. |
| Zařízení se vypnulo | Zkontrolujte jeho napájení nebo baterii a připojte se znovu. |
| **No answer from the device** | Držte zařízení blízko telefonu a zkuste to znovu. Pokud ani pak neodpoví, připojte se znovu. |
| Telefon má příliš mnoho připojení Bluetooth | Odpojte jiné zařízení a zkuste to znovu. |
| **The device refused it** | Firmware tuto operaci nepovoluje. Zkontrolujte, že na zařízení běží aktuální firmware CHESTER. |
| Čtení konfigurace nevrátilo žádná použitelná data | Firmware možná nepodporuje konfigurační příkazy shellu. Viz [**Konfigurace**](./configuration.md). |

---

## Stahování {#downloads}

Ke stažení passkey nebo image firmwaru je potřeba internet:

| Co vidíte | Co dělat |
|---|---|
| **No server connection** | Zkontrolujte připojení telefonu k internetu a zkuste to znovu. |
| Server na dané adrese nic nemá (404) | Odkaz je chybný nebo vypršela jeho platnost. Opatřete si nový QR kód. |

---

## Očekávané chování {#things-that-are-expected}

- **Opuštěním obrazovky CHESTER se zařízení odpojí.** Je to záměr: spojení je
  vázané na tuto obrazovku.
- **Vždy jen jedno zařízení CHESTER.** Před připojením k jinému se odpojte.
- **Zařízení připojené přes vyhledávání v okolí si aplikace nepamatuje** a
  nedohledá pro něj passkey. Když se připojíte přes QR kód, získáte obojí.
- **Sloty pro tagy BLE zůstanou prázdné, dokud změny neuložíte.** Přiřazení tagu
  změnu jen připraví; do zařízení se zapíše až po klepnutí na **Save to device**,
  viz [**Tagy BLE**](./ble-tags.md).
