---
slug: troubleshooting
title: Řešení problémů a FAQ
title_meta: "Řešení problémů a FAQ (HARDWARIO Manager)"
---

# Řešení problémů a FAQ {#troubleshooting-and-faq}

Začněte tady, když v aplikaci HARDWARIO Manager něco nefunguje. Problémy
konkrétních zařízení mají vlastní stránky: [**Řešení problémů u zařízení CHESTER**](./chester/troubleshooting.md)
podrobně popisuje připojení a párování přes Bluetooth a stránky
[**FIBER**](./fiber/index.md) uvádějí hlášení jednotlivých kroků brány FIBER.

---

## NFC a STICKER {#nfc-and-sticker}

| Problém | Co zkontrolovat |
|---|---|
| Po přiložení telefonu k zařízení STICKER se nic neděje | NFC je zapnuté (**NFC is off** znamená, že je vypnuté v nastavení telefonu). Přiložte **horní část zadní strany** telefonu rovně k zařízení, bez silného pouzdra, a několik sekund ho nehýbejte. Pokud se nic nenačte, pomalu telefonem v té oblasti posouvejte. |
| **NFC is not available on this phone** | Telefon nemá NFC. Zařízení STICKER s ním nenastavíte, pro CHESTER a FIBER přes Bluetooth ho ale použít můžete. |
| **Couldn't reach the STICKER** | Přiložení bylo příliš krátké nebo se telefon pohnul. Přiložte ho znovu a nehýbejte s ním. |
| Na iPhonu dialog hlásí **Lift the phone for ~2 s, then tap again** | To je v pořádku. Zařízení potřebuje chvíli bez pole NFC. Telefon oddalte, počkejte a přiložte znovu. |
| **Unknown STICKER** | Zařízení není v seznamu [**Saved STICKERs**](./sticker/saved-stickers.md), takže aplikace nemá jeho secret key. Nárokujte ho nebo importujte jeho klíč. |
| Zápis jako by nic neudělal | Zápisy se špatným secret key zařízení tiše ignoruje. Zkontrolujte uložený secret key tohoto zařízení. |
| **…firmware is too old to read history over NFC** | Čtení historie senzorů vyžaduje firmware STICKER 1.4.0 nebo novější. |
| **…reports config version …, but this app supports version …** | Aplikace a firmware zařízení STICKER se neshodnou na formátu konfigurace. Aktualizujte aplikaci nebo firmware zařízení STICKER, aby si odpovídaly. |

---

## Bluetooth (CHESTER a FIBER) {#bluetooth-chester-and-fiber}

| Problém | Co zkontrolovat |
|---|---|
| **Bluetooth is off** | Zapněte v telefonu Bluetooth a zkuste to znovu. |
| **Bluetooth permission needed** | V nastavení telefonu povolte aplikaci oprávnění **Zařízení v okolí**. Na Androidu 11 a starším zapněte také **Polohu**. |
| Zařízení se nenašlo | Zkontrolujte, že je napájené a do několika metrů od telefonu, a hledejte znovu. |
| **Authorization expired** (FIBER) | Jednorázová relace skončila. Podržte ENTER na bráně FIBER a naskenujte QR kód znovu. |
| **Disconnected after 30 minutes** (CHESTER) | Aplikace ukončí spojení, které se 30 minut nepoužívá. Připojte se znovu na stejné obrazovce. |

Většina chyb Bluetooth vysvětluje, co se stalo a co dělat. Pod hlášením je
**Technical details** s původní chybou, kterou můžete zkopírovat do požadavku
na podporu.

---

## ATELOS a nárokování {#atelos-and-claiming}

| Problém | Co zkontrolovat |
|---|---|
| **Could not register this phone with ATELOS** | I nárokování bez účtu potřebuje ATELOS. Zkontrolujte připojení telefonu k internetu. |
| **This STICKER belongs to another account** | Majitel ho musí nejdřív předat, viz [**Předání zařízení**](./sticker/saved-stickers.md#hand-a-device-on). |
| **No server connection** | Zkontrolujte připojení telefonu k internetu a zkuste to znovu. |

---

## FAQ {#faq}

**Potřebuji účet ATELOS?**
Ne. Bez účtu nárokujete zařízení STICKER k samotnému telefonu. S účtem můžete
zařízení nárokovat do sdílené skupiny a jejich klíče stáhnout do každého
telefonu, ve kterém se přihlásíte. Viz [**Účet ATELOS**](./atelos.md).

**Funguje aplikace bez internetu?**
Komunikace se zařízeními přes NFC a Bluetooth internet nepotřebuje. Nárokování
zařízení, stažení firmwaru podle QR kódu nebo ID a účet ATELOS ano. Soubor
s firmwarem pro CHESTER, který už máte v telefonu, nahrajete i bez signálu, viz
[**Aktualizace firmwaru**](./chester/firmware-update.md).

**Kde jsou uložená moje zařízení a klíče?**
V telefonu, v jeho zabezpečeném úložišti. Aktualizace aplikace je zachovají.
Odinstalace aplikace je může smazat, proto je předtím vyexportujte.

**Jak přenesu zařízení do jiného telefonu?**
Vyexportujte je ze seznamu **Saved STICKERs** (**⋮ → Export**) a soubor nebo QR
kódy importujte v novém telefonu, viz [**Saved STICKERs**](./sticker/saved-stickers.md).
Zařízení nárokovaná k účtu ATELOS se objeví i po přihlášení.

**Lze zařízení STICKER nastavit bez baterií?**
Ano. Pole NFC napájí zařízení dost dlouho na to, aby si nastavení uložilo, viz
[**Konfigurace vypnutého zařízení**](./sticker/offline-configuration.md).

**Je aplikace v češtině?**
Ano. Jazyk změníte v **Settings → Language**, viz [**Nastavení aplikace**](./settings.md).

**Jakou verzi aplikace mám?**
Verze je uvedená dole v menu i na obrazovce **Settings**. Uveďte ji, když se
obracíte na podporu.

**Existuje aplikace pro iOS?**
Aplikace na iOS běží, v App Storu ale zatím není. Viz
[**Instalace aplikace**](./install.md).
