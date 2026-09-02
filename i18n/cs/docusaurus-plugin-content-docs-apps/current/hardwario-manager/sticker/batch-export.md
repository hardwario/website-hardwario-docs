---
slug: batch-export
title: Načtení více zařízení
description: "Zachyťte konfiguraci mnoha zařízení v jedné session a vyexportujte je společně —"
---

# Načtení více zařízení STICKER (dávkový export) {#scan-multiple-stickers-batch-export}

Zachyťte konfiguraci mnoha zařízení v jedné session a vyexportujte je společně —
hodí se na inventuru, audity a záložení před změnou.

---

## Zachycení zařízení {#capture-the-devices}

1. Otevřete **HARDWARIO Manager** a přejděte na
   **STICKER → Configuration → Scan multiple (batch export)**.
2. Zvolte, které sekce se mají zachytit — **LoRaWAN**, **Application**, **Sensors**,
   **Alarms**.
3. Postupně přiložte telefon ke každému zařízení STICKER. Konfigurace každého
   zařízení se při přiložení zachytí automaticky a průběžný počet roste.

<img src="/img/hw-manager/hw-manager-batch-config-export.png" alt="Zachycení několika zařízení STICKER v jedné dávce s vybranými sekcemi a dvěma zachycenými zařízeními" width="320" />

Skener se po každém zařízení sám znovu aktivuje, takže můžete projít celou
přepravku bez sahání na obrazovku. Přiložení k zařízení, které už jste zachytili,
jeho záznam aktualizuje, místo aby přidalo duplikát, a **Remove** ho ze sady
odebere.

---

## Společný export {#export-them-together}

Až budete mít všechno načtené, zvolte **Export all** a vyberte formát.

<img src="/img/hw-manager/hw-manager-batch-config-export-as.png" alt="Export všech zachycených konfigurací jako JSON nebo CSV" width="320" />

| Formát | Výsledek |
|---|---|
| **Share as JSON** | Jeden soubor `.json` se všemi zachycenými konfiguracemi |
| **Share as CSV** | Tabulka s jedním řádkem na každou zachycenou konfiguraci |

:::info Tohle jen čte
Dávkové načtení do zařízení nikdy nezapisuje. Pokud chcete mnoha zařízením
nastavit totéž, použijte místo toho [**šablonu**](./templates.md).
:::

Dávkový export lze později načíst zpět: **Configuration → Configure from
file** dávkový soubor rozpozná a zeptá se, které zařízení z něj načíst. Viz
[**Konfigurace**](./configuration.md).
