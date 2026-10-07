---
slug: firmware-update
title: Aktualizace firmwaru
---

# Aktualizace firmwaru zařízení CHESTER přes Bluetooth {#update-chester-firmware-over-bluetooth}

Aplikace stáhne image firmwaru z odkazu a nahraje ho do připojeného zařízení
CHESTER přes Bluetooth.

Otevřete **CHESTER → Tools → Firmware update**.

<img src="/img/hw-manager/hw-manager-chester-firmware-update.png" alt="Obrazovka Firmware update s pokyny a tlačítkem Scan firmware QR" width="320" />

:::info Firmware pochází z QR kódu
Obrazovka aktualizace načítá image z **QR kódu s odkazem na firmware**.
Nenajdete tu katalog, pole pro adresu ani výběr souboru. Tento QR kód dostanete
se svým vlastním sestavením, nebo ho najdete u
[**hotových binárních souborů**](/chester/catalog-applications/catalog-applications#application-firmware)
katalogových aplikací.
:::

---

## Spuštění aktualizace {#run-the-update}

1. Zvolte **Scan firmware QR** a namiřte kameru na kód.
2. Aplikace image stáhne: **Downloading firmware…**
3. Zkontrolujte souhrn: název souboru, **velikost** a otisk **SHA-256**. Pokud
   to není firmware, který jste čekali, zvolte **Scan a different firmware**.
4. Zvolte **Start update**.

Aktualizace pak projde těmito fázemi a ukazatel zobrazuje její průběh:

| Fáze | Co se děje |
|---|---|
| **Preparing…** | Připravuje se zařízení |
| **Uploading… _n_%** | Přenáší se image |
| **Testing the new image…** | Zařízení kontroluje přijatý image |
| **Rebooting the device…** | Zařízení se restartuje do nového firmwaru |
| **Confirming the new image…** | Nový firmware se označí jako funkční |
| **Done** | |

Po dokončení aplikace oznámí, že se zařízení restartuje s novým firmwarem a může
chvíli trvat, než bude znovu dostupné.

:::caution Nechte aplikaci otevřenou a zařízení napájené
Během aktualizace nemůžete z obrazovky odejít. Dokud aktualizace neskončí, nechte
telefon blízko zařízení a oba přístroje napájené.
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

Pokud se aktualizace zasekne (90 sekund bez postupu), aplikace ji přeruší
a oznámí vám to. Obvykle zařízení přišlo o napájení nebo se dostalo mimo dosah.

Další hlášení, se kterými se můžete setkat:

- **The device refused the firmware image**: image není pro tento hardware
  platný. Zkontrolujte, že QR kód odkazuje na firmware pro tuto variantu zařízení
  CHESTER.
- **The device has no room for the image**: zařízení restartujte a zkuste to znovu.
- **The downloaded firmware file is empty**: QR kód neodkazuje na platný image.

Problémy s připojením popisuje stránka [**Řešení problémů**](./troubleshooting.md).
