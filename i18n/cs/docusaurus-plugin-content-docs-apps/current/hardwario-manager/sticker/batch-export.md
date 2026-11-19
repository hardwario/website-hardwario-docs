---
slug: batch-export
title: Načtení více zařízení
description: "Hromadné načtení konfigurace mnoha zařízení STICKER v jedné relaci aplikace HARDWARIO Manager a společný export do JSON nebo CSV pro inventuru či zálohu."
---

# Načtení více zařízení STICKER (hromadný export) {#scan-multiple-stickers-batch-export}

Načtěte konfiguraci mnoha zařízení najednou a vyexportujte ji společně. Hodí se
to pro inventuru, audity a zálohu před změnou.

---

## Načtení zařízení {#capture-the-devices}

1. Otevřete **HARDWARIO Manager** a přejděte na
   **STICKER → Konfigurace → Hromadný export**.
2. V kroku **1 · Vyberte, co skenovat** zvolte sekce, které se mají načíst:
   **Rádio**, **Aplikace**, **Senzory**, **Alarmy**.
3. Klepněte na **Spustit skenování** a postupně přikládejte telefon ke každému
   zařízení STICKER. Konfigurace každého zařízení se při přiložení načte a počet
   (například **Zachyceno: 2**) roste.

<img src="/img/hw-manager/hw-manager-batch-config-export.png" alt="Hromadný export s vybranými sekcemi Rádio, Aplikace, Senzory a Alarmy, jedním zachyceným zařízením STICKER s tlačítkem Odebrat a tlačítkem Exportovat vše" width="320" />

Skener se po každém zařízení sám znovu aktivuje, takže můžete projít celou
přepravku zařízení, aniž byste mezi přiloženími sahali na obrazovku. Když
přiložíte telefon k zařízení, které už jste načetli, jeho záznam se aktualizuje
a duplikát nevznikne; tlačítkem **Odebrat** zařízení ze sady odeberete.

---

## Společný export {#export-them-together}

Až budete mít všechno načtené, zvolte **Exportovat vše** (tlačítko ukazuje
počet) a vyberte formát.

<img src="/img/hw-manager/hw-manager-batch-config-export-as.png" alt="Exportovat vše: Sdílet jako JSON nebo Sdílet jako CSV" width="320" />

| Formát | Výsledek |
|---|---|
| **Sdílet jako JSON** | Jeden soubor `.json` se všemi načtenými konfiguracemi |
| **Sdílet jako CSV** | Tabulka s jedním řádkem pro každou načtenou konfiguraci |

:::caution Samotná sekce Rádio exportuje klíče
Když zvolíte jen sekci **Rádio**, **Sdílet jako JSON** vytvoří stejný soubor
jako export [**Klíče rádiového spojení**](./radio.md), včetně klíčů, které
zařízení vrátila. Když zvolíte i další sekci nebo exportujete do CSV, klíče
v souboru nebudou.
:::

:::info Pouze čtení
Hromadné načtení do zařízení nikdy nic nezapisuje. Pokud chcete mnoha zařízením
nastavit totéž, použijte [**Hromadný zápis**](./batch-write.md) nebo
[**šablonu**](./templates.md).
:::

Hromadný export můžete později načíst zpět: **Konfigurace → Konfigurovat ze
souboru** soubor s více zařízeními rozpozná a zeptá se, které zařízení z něj
načíst. Viz
[**Konfigurace**](./configuration.md).
