---
slug: firmware-update
title: Aktualizace firmwaru
---

# Aktualizace firmwaru zařízení CHESTER přes Bluetooth {#update-chester-firmware-over-bluetooth}

Aplikace vezme image firmwaru a nahraje ho do připojeného zařízení CHESTER přes
Bluetooth.

Otevřete **CHESTER → Tools → Firmware update**.

<img src="/img/hw-manager/hw-manager-chester-firmware-update.png" alt="Obrazovka Firmware update se třemi způsoby výběru image: naskenování QR kódu firmwaru, zadání ID firmwaru nebo otevření souboru s firmwarem" width="320" />

---

## Výběr image {#choose-the-image}

Obrazovka nabízí tři způsoby, jak image získat:

| Zdroj | Kdy ho použít |
|---|---|
| **Scan firmware QR** | Máte QR kód, který jste dostali se svým sestavením na míru, nebo QR kód z [**předpřipravených binárek**](/chester/catalog-applications/catalog-applications#application-firmware) katalogových aplikací. |
| **Enter firmware ID** | Máte **jedinečný identifikátor** firmwaru (vypíše se při nahrání firmwaru) nebo jeho odkaz ke sdílení. Jedno ID vždy označuje stejný image, takže ho lze nadiktovat po telefonu. Stažený soubor se ověří proti kontrolnímu součtu, který k němu služba pro firmware zveřejňuje; při neshodě aplikace firmware nenahraje. |
| **Open a firmware file** | Soubor `.bin` už máte v telefonu. Nepotřebujete signál, což se hodí ve sklepech a rozvaděčích. Soubor, který není platným image firmwaru, aplikace odmítne dřív, než se dostane do zařízení. |

---

## Spuštění aktualizace {#run-the-update}

1. Vyberte image jedním ze tří způsobů výše. Aplikace ho stáhne nebo načte.
2. Zkontrolujte souhrn: název souboru, **verzi**, **velikost** a otisk
   **SHA-256**, u image vybraného podle ID také **Checksum verified against the
   firmware service**. Pokud to není to, co jste čekali, zvolte
   **Choose a different firmware**.
3. Zvolte **Start update**.

Aktualizace pak projde jednotlivými fázemi s ukazatelem průběhu:

| Fáze | Co se děje |
|---|---|
| **Preparing…** | Příprava zařízení |
| **Uploading… _n_%** | Přenos image |
| **Testing the new image…** | Zařízení kontroluje přijatý image |
| **Rebooting the device…** | Zařízení se restartuje do nového firmwaru. Výměna velkého image může trvat několik minut |
| **Confirming the new image…** | Nový firmware se označí jako funkční |
| **Done** | |

Úspěch aplikace ohlásí až poté, co potvrzení skutečně uvidí: zařízení se
restartovalo, běží na novém firmwaru a nevrátí se ke starému. Restart přeruší
spojení Bluetooth, proto závěrečná obrazovka nabídne **Reconnect**: aplikace
počká, až zařízení naběhne, a najde ho znovu podle sériového čísla.

:::caution Nechte aplikaci otevřenou a zařízení napájené
Během aktualizace nelze z obrazovky odejít. Mějte telefon u zařízení a obojí
napájené, dokud aktualizace neskončí. **Cancel** se nejdřív zeptá, protože
přerušení nechá aktualizaci nedokončenou: zařízení si ponechá dosavadní firmware
a celý image se musí nahrát znovu.
:::

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

Pokud se nahrávání zasekne (90 sekund bez postupu), aplikace ho přeruší
a oznámí vám to. Obvykle zařízení přišlo o napájení nebo se dostalo mimo dosah.

Pokud zařízení nový firmware spustilo, ale potvrzení nepřišlo, aplikace to
oznámí: zařízení se při dalším restartu vrátí ke starému firmwaru. Nechte ho
napájené a u telefonu a aktualizaci spusťte znovu.

Další hlášení, se kterými se můžete setkat:

- **The device refused the firmware image**: image není pro tento hardware
  platný. Zkontrolujte, že QR kód odkazuje na firmware pro tuto variantu zařízení
  CHESTER.
- **The device has no room for the image**: zařízení restartujte a zkuste to znovu.
- **The downloaded firmware file is empty**: QR kód nebo ID neodkazuje na platný image.

Problémy s připojením popisuje stránka [**Řešení problémů**](./troubleshooting.md).
