---
slug: firmware-update
title: Aktualizace firmwaru
description: "Nahrání firmwaru do zařízení CHESTER přes Bluetooth z QR kódu, podle ID nebo ze souboru: kontrola SHA-256, fáze aktualizace a bezpečný návrat při chybě."
---

import FlowSteps from '@site/src/components/FlowSteps';

# Aktualizace firmwaru zařízení CHESTER přes Bluetooth {#update-chester-firmware-over-bluetooth}

Aplikace nahraje image firmwaru do připojeného zařízení CHESTER přes Bluetooth.
Otevřete **CHESTER → Nástroje → Aktualizace firmwaru**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-firmware-update.png" alt="Obrazovka Aktualizace firmwaru s pokyny a tlačítky Naskenovat QR firmwaru, Zadat ID firmwaru a Otevřít soubor s firmwarem" width="320" />

---

## Výběr firmwaru {#choose-the-firmware}

Firmware můžete aplikaci předat třemi způsoby:

| Tlačítko | Odkud firmware pochází |
|---|---|
| **Naskenovat QR firmwaru** | QR kód s odkazem na image firmwaru nebo na jeho stránku ve službě HARDWARIO s firmwarem. Aplikace image stáhne |
| **Zadat ID firmwaru** | **Unikátní identifikátor** firmwaru ve službě HARDWARIO s firmwarem, napsaný nebo vložený, s pomlčkami i bez nich. Funguje i vložený odkaz na firmware. Zvolte **Stáhnout** |
| **Otevřít soubor s firmwarem** | Soubor `app_update.bin` uložený v telefonu. Připojení k internetu není potřeba, takže si soubor připravíte, dokud máte signál, a zařízení ve sklepě aktualizujete později |

ID vždy označuje tentýž firmware, takže ho jde nadiktovat po telefonu.
[**Hotové binární soubory**](/chester/catalog-applications/catalog-applications#application-firmware)
katalogových aplikací uvádějí ID a odkaz u každého sestavení. Vlastní sestavení
dostane svoje ID a odkaz, když ho do služby nahrajete.

Ze souboru vyberte `app_update.bin`, který vznikl při sestavení firmwaru.
Soubor `.hex`, archiv ani nic jiného, co není image firmwaru, aplikace nepřijme.

---

## Spuštění aktualizace {#run-the-update}

1. Vyberte firmware podle předchozí části. Aplikace ukáže **Stahování
   firmwaru…** (nebo **Čtení souboru s firmwarem…**).
2. Zkontrolujte souhrn: název firmwaru, jeho verzi, pokud je známá, velikost,
   **ID firmwaru**, pokud pochází ze služby, a otisk **SHA-256**. Firmware
   stažený podle ID se navíc porovná s kontrolním součtem, který služba
   zveřejňuje: **Kontrolní součet ověřen proti službě s firmwarem.** Pokud to
   není to, co jste čekali, zvolte **Vybrat jiný firmware**.
3. Zvolte **Spustit aktualizaci**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-firmware-ready.png" alt="Karta se souhrnem firmwaru s názvem, verzí, velikostí, ID firmwaru a SHA-256, nad tlačítky Spustit aktualizaci a Vybrat jiný firmware" width="320" />

Aktualizace pak prochází jednotlivými fázemi a ukazatel průběhu ukazuje postup:

<FlowSteps zone="Aktualizace firmwaru" steps={[
  {role: 'Fáze 1', title: 'Příprava…', detail: 'Příprava zařízení'},
  {role: 'Fáze 2', title: 'Nahrávání… n %', detail: 'Přenos image'},
  {role: 'Fáze 3', title: 'Testování nového firmwaru…', detail: 'Zařízení kontroluje přijatý image'},
  {role: 'Fáze 4', title: 'Aplikování nového firmwaru…', detail: 'Zařízení se restartuje a přepne na nový firmware'},
  {role: 'Fáze 5', title: 'Potvrzování nového firmwaru…', detail: 'Nový firmware se označí jako funkční'},
  {role: 'Výsledek', title: 'Hotovo', detail: 'Zařízení běží na novém firmwaru'},
]} />

Během aplikování nového firmwaru aplikace doplní: *Může to trvat až 2 minuty.
Zařízení nevypínejte.*

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-firmware-progress.png" alt="Probíhající aktualizace: název fáze a ukazatel průběhu, připomínka nechat aplikaci otevřenou a zařízení zapnuté a tlačítko Zrušit" width="320" />

:::caution Nechte aplikaci otevřenou a zařízení zapnuté
Obrazovka vás vyzve: *Nechte aplikaci otevřenou a zařízení zapnuté, dokud se
aktualizace nedokončí.* Během aktualizace se nemůžete vrátit zpět. Držte
telefon blízko zařízení a obojí nechte zapnuté, dokud aktualizace neskončí.
:::

**Zrušit** pod ukazatelem průběhu se nejdřív zeptá: **Zastavit aktualizaci?**
Zastavením zůstane aktualizace nedokončená. Zařízení si nechá firmware, který
mělo, a celý firmware se bude muset nahrát znovu. Zvolte **Pokračovat
v aktualizaci**, nebo **Zastavit aktualizaci**.

Po dokončení obrazovka ukáže **Aktualizace dokončena**: zařízení se restartovalo,
běží na novém firmwaru a aktualizace je potvrzená, takže se nevrátí zpět. Restart
přeruší spojení Bluetooth, proto zvolte **Připojit znovu**. Aplikace zařízení
znovu najde a vrátí se do menu CHESTER.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-firmware-done.png" alt="Obrazovka Aktualizace dokončena s tlačítkem Připojit znovu" width="320" />

---

## Když aktualizace selže {#if-it-fails}

Nezdařená aktualizace je bezpečná. Image se potvrdí až poté, co se zařízení
restartuje a image otestuje, takže když aktualizace selže uprostřed, zařízení
**naběhne s předchozím firmwarem**.

Aplikace uvede, ve které fázi aktualizace selhala, protože na tom závisí další postup:

| Kdy selhala | Co to znamená |
|---|---|
| Před kontrolou nebo během ní | Aktualizace vůbec nezačala. Zkuste to znovu. |
| Během nahrávání | Přenos se zastavil před dokončením. Zařízení si ponechá současný firmware. Pokus můžete bezpečně zopakovat. |
| Po nahrání | Zařízení se při dalším restartu vrátí k předchozímu firmwaru. Připojte se znovu a před dalším pokusem zkontrolujte jeho verzi. |

Dokud se zařízení nerestartuje, aplikace aktualizaci, která 90 sekund nepostoupí,
přeruší a oznámí vám to. Obvykle zařízení přišlo o napájení nebo se dostalo mimo
dosah. Po restartu je přepínání firmwaru chvíli tiché, a tak aplikace čeká na
potvrzení až 6 minut. Když nepřijde, upozorní, že zařízení sice naběhlo
s novým firmwarem, ale při příštím restartu se vrátí k původnímu; spusťte
aktualizaci znovu.

Další hlášení, se kterými se můžete setkat:

- **Zařízení odmítlo obraz firmwaru**: image není pro tento hardware platný.
  Zkontrolujte, že QR kód odkazuje na firmware pro tuto variantu zařízení
  CHESTER.
- **Zařízení nemá pro obraz místo**: zařízení restartujte a zkuste to znovu.
- **Stažený soubor s firmwarem je prázdný**: QR kód neodkazuje na platný image.
- **Služba s firmwarem nemá žádný image s tímto unikátním identifikátorem**:
  zkontrolujte ID a zkuste to znovu.
- **Stažený image neodpovídá kontrolnímu součtu zveřejněnému pro toto ID**:
  stažený soubor se cestou změnil, například kvůli captive portálu. Zkontrolujte
  připojení telefonu a zkuste to znovu.
- **Tento soubor není obraz firmwaru**, **Tento soubor je na obraz firmwaru pro
  CHESTER mnohonásobně velký**: vyberte `app_update.bin`, který vznikl při
  sestavení firmwaru.
- **Bluetooth spojení se zařízením se během aktualizace přerušilo**: nechte
  zařízení napájené vedle telefonu a spusťte aktualizaci znovu.

Problémy s připojením popisuje stránka [**Řešení problémů**](./troubleshooting.md).
