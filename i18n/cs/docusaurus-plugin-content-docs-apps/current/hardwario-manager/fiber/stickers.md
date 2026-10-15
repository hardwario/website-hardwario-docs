---
slug: stickers
title: Připojení zařízení STICKER
title_meta: "Připojení zařízení STICKER k bráně FIBER (HARDWARIO Manager)"
---

# Připojení zařízení STICKER k bráně FIBER {#connect-stickers-to-a-fiber}

Brána FIBER sbírá data ze zařízení STICKER, která má zaregistrovaná. Aplikace
zařízení STICKER zaregistruje v jednom kroku: přes **NFC** přečte jeho klíče
LoRaWAN a přes **Bluetooth** je předá bráně FIBER.

Otevřete **FIBER → Connected STICKERs** a klepněte na **+** (nebo na
**Connect STICKER**). Stejný krok nabízí i průvodce nastavením, viz
[**Nastavení brány FIBER**](./setup.md).

:::info Potřebujete telefon s NFC
Klíče se čtou přiložením telefonu k zařízení STICKER, takže telefon musí mít
zapnuté NFC. Viz [**Instalace aplikace**](../install.md).
:::

---

## Připojení zařízení STICKER {#connect-a-sticker}

1. Pokud aplikace není autorizovaná, požádá vás nejdřív o naskenování brány
   FIBER: **podržte ENTER** na bráně a naskenujte QR kód, který zobrazí.
2. **Přiložte telefon k zařízení STICKER.** Aplikace přečte jeho sériové číslo
   a klíče LoRaWAN.
3. Pokud zařízení STICKER ještě nebylo nárokované, aplikace ho cestou nárokuje
   v ATELOSu, viz [**Účet ATELOS**](../atelos.md#claim-a-sticker).
4. Brána FIBER zařízení STICKER zaregistruje přes Bluetooth.
5. Až o to aplikace požádá, **přiložte telefon k zařízení STICKER znovu**.
   Aplikace spustí jeho připojení k síti LoRaWAN, takže začne bráně FIBER hlásit
   hned.

Aplikace potvrdí, že je zařízení STICKER připojené a jeho připojování k síti
LoRaWAN začalo. Volbou **Connect another STICKER** pokračujte dalším zařízením.

---

## Správa připojených zařízení STICKER {#manage-connected-stickers}

Seznam ukazuje každé zařízení STICKER podle názvu, nebo podle sériového čísla,
pokud název nemá.

| Akce | Co dělá |
|---|---|
| **Rename** | Pojmenuje zařízení STICKER. Prázdné pole znamená sériové číslo. |
| **Disconnect** | Odebere zařízení STICKER. S aktuálním firmwarem brány FIBER se odebere z brány, která pak přestane přijímat jeho data. Se starším firmwarem zmizí jen ze seznamu v telefonu a brána FIBER si ponechá vlastní registraci. |
| **Disconnect all STICKERs** | Totéž pro všechna zařízení STICKER v seznamu. |

---

## Když to nefunguje {#if-it-does-not-work}

| Hlášení | Co dělat |
|---|---|
| **This STICKER belongs to another account.** | Majitel ho musí nejdřív předat, viz [**Předání zařízení**](../sticker/saved-stickers.md#hand-a-device-on). |
| **This STICKER has already been claimed, so it carries no claim code…** | Přihlaste se k účtu, který zařízení vlastní, a zkuste to znovu. |
| **The STICKER did not expose its OTAA keys over NFC.** | Firmware klíče nevydá. Získejte je místo toho z ATELOSu. |
| **The STICKER didn't respond.** | Přiložte k němu telefon znovu a zkontrolujte, že je napájené. |
| **Authorization was lost.** | Naskenujte QR kód brány FIBER znovu (podržte ENTER). |
| **The FIBER rejected the STICKER.** | Zkuste to znovu. Pokud se to opakuje, zkontrolujte bránu FIBER. |
| **…connected, but its LoRaWAN join could not be started.** | Zařízení STICKER je zaregistrované. Otevřete ho v seznamu a klepnutím připojení k síti zopakujte. |
