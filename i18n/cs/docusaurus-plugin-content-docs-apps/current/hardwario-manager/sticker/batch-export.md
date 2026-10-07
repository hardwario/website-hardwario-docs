---
slug: batch-export
title: Načtení více zařízení
---

# Načtení více zařízení STICKER (hromadný export) {#scan-multiple-stickers-batch-export}

Načtěte konfiguraci mnoha zařízení najednou a vyexportujte ji společně. Hodí se
to pro inventuru, audity a zálohu před změnou.

---

## Načtení zařízení {#capture-the-devices}

1. Otevřete **HARDWARIO Manager** a přejděte na
   **STICKER → Configuration → Scan multiple (batch export)**.
2. Zvolte, které sekce se mají načíst: **LoRaWAN**, **Application**, **Sensors**,
   **Alarms**.
3. Postupně přiložte telefon ke každému zařízení STICKER. Konfigurace každého
   zařízení se při přiložení načte automaticky a počet načtených zařízení roste.

<img src="/img/hw-manager/hw-manager-batch-config-export.png" alt="Hromadné načtení zařízení STICKER s vybranými sekcemi a dvěma načtenými zařízeními" width="320" />

Skener se po každém zařízení sám znovu aktivuje, takže můžete projít celou
přepravku zařízení, aniž byste mezi přiloženími sahali na obrazovku. Když
přiložíte telefon k zařízení, které už jste načetli, jeho záznam se aktualizuje
a duplikát nevznikne; tlačítkem **Remove** zařízení ze sady odeberete.

---

## Společný export {#export-them-together}

Až budete mít všechno načtené, zvolte **Export all** a vyberte formát.

<img src="/img/hw-manager/hw-manager-batch-config-export-as.png" alt="Export všech načtených konfigurací jako JSON nebo CSV" width="320" />

| Formát | Výsledek |
|---|---|
| **Share as JSON** | Jeden soubor `.json` se všemi načtenými konfiguracemi |
| **Share as CSV** | Tabulka s jedním řádkem pro každou načtenou konfiguraci |

:::info Pouze čtení
Hromadné načtení do zařízení nikdy nic nezapisuje. Pokud chcete mnoha zařízením
nastavit totéž, použijte [**šablonu**](./templates.md).
:::

Hromadný export můžete později načíst zpět: **Configuration → Configure from
file** soubor s více zařízeními rozpozná a zeptá se, které zařízení z něj načíst. Viz
[**Konfigurace**](./configuration.md).
