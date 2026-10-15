---
slug: beacons
title: Připojení Beaconů
title_meta: "Připojení Beaconů k bráně FIBER (HARDWARIO Manager)"
---

# Připojení Beaconů k bráně FIBER {#connect-beacons-to-a-fiber}

Beacony jsou bluetoothové senzorové tagy (například teploty a vlhkosti), které
brána FIBER sleduje přímo. Aplikace je najde přes Bluetooth a přidá je do brány
FIBER.

Otevřete **FIBER → Connected Beacons** a klepněte na **+** (nebo na
**Connect Beacon**). Stejný krok nabízí i průvodce nastavením, viz
[**Nastavení brány FIBER**](./setup.md).

---

## Vyhledání a připojení {#find-and-connect}

Aplikace hledá Beacony v okolí a vypíše je i se silou signálu. Beacon vysílá jen
jednou za několik sekund, takže se může objevit až po chvíli; pokud se
neobjeví, přibližte ho k telefonu. Seznam můžete filtrovat podle adresy nebo
názvu a volbou **Scan again** hledání zopakujete.

| Způsob přidání | Jak |
|---|---|
| **Jeden Beacon** | Klepněte na něj v seznamu. |
| **Connect all nearby Beacons** | Postupně přidá všechny Beacony v dosahu s dostatečně silným signálem. Než začnete, odneste Beacony, které připojit nechcete, protože by se přidaly také. Aplikace pak ohlásí, kolik se jich přidalo a kolik bylo odmítnuto. |
| **Add by address** | Zadejte adresu Bluetooth Beaconu ze štítku (12 šestnáctkových číslic, například `C0:FF:EE:00:00:01`). |
| **Add by QR code** | Naskenujte QR kód na Beaconu. |

:::info Adresa není na iPhonu vidět
iOS aplikacím adresu Bluetooth Beaconu neprozradí. Pokud se u Beaconu zobrazí
**Address not visible on this phone**, opište adresu ze štítku a použijte
**Add by address**.
:::

---

## Správa připojených Beaconů {#manage-connected-beacons}

| Akce | Co dělá |
|---|---|
| **Rename** | Pojmenuje Beacon. Prázdné pole znamená jeho adresu Bluetooth. |
| **Disconnect** | Odebere Beacon. S aktuálním firmwarem brány FIBER se odebere z brány, která ho přestane sledovat. Se starším firmwarem zmizí jen ze seznamu v telefonu. |
| **Disconnect all Beacons** | Totéž pro všechny Beacony v seznamu. |

---

## Když to nefunguje {#if-it-does-not-work}

| Hlášení | Co dělat |
|---|---|
| **This FIBER's firmware can't add Beacons yet** | Seznam je jen ke čtení. Aktualizujte firmware brány FIBER. |
| **The FIBER refused the Beacon** | Zkontrolujte, že má brána FIBER volný slot pro Beacon, a zkuste to znovu. |
| **Bluetooth permission needed** | V nastavení aplikace povolte oprávnění Zařízení v okolí a hledejte znovu. |
| **No Beacons nearby** | Přibližte Beacon, chvíli počkejte, nebo ho přidejte podle adresy. |
