---
slug: troubleshooting
title: Řešení problémů
description: "Aplikace každé selhání Bluetooth zařadí do zprávy, která říká, co se stalo a co"
---

# Řešení problémů se zařízením CHESTER {#chester-troubleshooting}

Aplikace každé selhání Bluetooth zařadí do zprávy, která říká, co se stalo a co
dělat. Surová chyba zůstává pod rozbalovacím prvkem **Technical details**
s tlačítkem **Copy**. Ten text přiložte, když problém hlásíte.

Tam, kde opakování nepomůže (vypnutý Bluetooth, neudělené oprávnění), nabídne
aplikace otevření nastavení telefonu místo tlačítka pro opakování.

---

## Hledání a připojování {#finding-and-connecting}

| Co vidíte | Co dělat |
|---|---|
| **Bluetooth is off** | Zapněte v telefonu Bluetooth a vyhledejte znovu. |
| **Bluetooth permission needed** | Povolte aplikaci v nastavení telefonu oprávnění k zařízením v okolí, viz [**Instalace aplikace**](../install.md). |
| **Device not found**. Žádné zařízení CHESTER v okolí | Zkontrolujte, že je zařízení zapnuté a v dosahu, a vyhledejte znovu. |
| Zařízení se našla, ale ne sériové číslo, které jste chtěli | Aplikace vypíše, která sériová čísla viděla. Ověřte, že se díváte na správné zařízení. |
| **Connection failed** | Přiblížte telefon, zařízení vypněte a zapněte a zkuste to znovu. |
| Vyhledávání se samo zastaví | Vyhledávání běží asi 30 sekund. Použijte **Rescan**. |
| **Not a CHESTER** | Zařízení nenabízí služby CHESTER. Zkontrolujte, že na něm běží firmware CHESTER a že nezůstalo v bootloaderu. |
| Zařízení zmizelo, než se připojilo | Vypadlo z dosahu. Vyhledejte znovu a klepněte na něj, až se zase objeví. |

---

## Párování {#pairing}

| Co vidíte | Co dělat |
|---|---|
| **Pairing failed** | Telefon pravděpodobně drží zastaralé párování. Zapomeňte zařízení v nastavení Bluetooth telefonu, pak se připojte znovu a zadejte passkey z etikety. |
| Párování se nedokončilo | Přijměte v telefonu žádost o párování a zadejte passkey. Pokud existuje zastaralé párování, nejdřív ho zapomeňte. |
| Zařízení párování právě odmítlo | Chvíli počkejte a zkuste to znovu. Vypnutí a zapnutí zařízení uvízlý pokus o párování vyčistí. |
| Obecná chyba Bluetooth na Androidu | Přibližte se, zařízení vypněte a zapněte a zkuste to znovu. Pokud potíže trvají, vypněte a zapněte Bluetooth v telefonu, nebo zařízení v nastavení Bluetooth zapomeňte. |

:::tip Zapomenutí zařízení je běžné řešení
Většina trvalých problémů s párováním je zastaralá vazba v telefonu. Zapomeňte
zařízení CHESTER v nastavení Bluetooth samotného telefonu (ne jen v aplikaci) a
pak se připojte znovu z QR kódu.
:::

---

## Za provozu spojení {#while-connected}

| Co vidíte | Co dělat |
|---|---|
| **Connection lost**. Zařízení spojení ukončilo | Mohlo se restartovat; restart nebo aktualizace firmwaru tohle dělají. Připojte se znovu. |
| Zařízení se vypnulo | Zkontrolujte jeho napájení nebo baterii a připojte se znovu. |
| **No answer from the device** | Držte ho blízko telefonu a zkuste to znovu. Pokud dál mlčí, připojte se znovu. |
| Telefon má příliš mnoho připojení Bluetooth | Odpojte jiné zařízení a zkuste to znovu. |
| **The device refused it** | Firmware tuto operaci nepovoluje. Zkontrolujte, že na zařízení běží aktuální firmware CHESTER. |
| Čtení konfigurace se vrátilo bez použitelných dat | Firmware možná nepodporuje shell příkazy pro konfiguraci. Viz [**Konfigurace**](./configuration.md). |

---

## Stahování {#downloads}

Načtení passkey nebo image firmwaru vyžaduje internet:

| Co vidíte | Co dělat |
|---|---|
| **No server connection** | Zkontrolujte připojení telefonu k internetu a zkuste to znovu. |
| Server na dané adrese nic nemá (404) | Odkaz je špatný nebo prošlý. Získejte nový QR kód. |

---

## Věci, které jsou normální {#things-that-are-expected}

- **Opuštěním obrazovky CHESTER se zařízení odpojí.** Je to záměr. Spojení patří
  té obrazovce.
- **Jen jedno zařízení CHESTER naráz.** Před připojením k jinému se odpojte.
- **Zařízení připojené z vyhledávání v okolí se nepamatuje** a nedohledá se pro
  něj passkey. Připojte se z QR kódu a získáte obojí.
- **Sloty BLE tagů zůstanou prázdné, dokud neuložíte.** Navázání tagu změnu jen
  připraví; do zařízení se dostane až po klepnutí na **Save to device**, viz
  [**BLE tagy**](./ble-tags.md).
