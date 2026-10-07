---
slug: templates
title: Šablony
---

# Šablony: vytvoření, sdílení, úprava a použití {#templates-create-share-edit-and-apply}

Šablona je znovu použitelná konfigurační předvolba: **jednou uložíte, použijete
mnohokrát**. Šablony obsahují jen nastavení, která lze sdílet; identita a tajné
údaje jednotlivých zařízení (sériové číslo, klíče a EUI pro LoRaWAN, klíče relace)
se záměrně vynechávají, takže šablonu můžete bezpečně použít pro více zařízení
i předat kolegovi.

Otevřete **STICKER → Templates**.

<img src="/img/hw-manager/hw-manager-template.png" alt="Seznam šablon" width="320" />

---

## Vytvoření šablony {#create-a-template}

Zvolte **Add template** a vyberte zdroj:

<img src="/img/hw-manager/hw-manager-template-add.png" alt="Vytvoření nové šablony: volba zdroje" width="320" />

| Zdroj | Použijte, když |
|---|---|
| **From a device** | Máte zařízení už nastavené tak, jak chcete |
| **Create manually** | Sestavujete předvolbu od začátku |
| **From hex** | Někdo vám poslal šablonu jako hexadecimální řetězec |
| **From QR code** | Někdo vám šablonu sdílel jako QR kód |

Když šablonu vytváříte **ručně**, pojmenujte ji a nastavte hodnoty v libovolné kategorii.
Prázdná kategorie se neuloží, takže šablona obsahuje jen to, co jste nastavili.

<img src="/img/hw-manager/hw-manager-template-create.png" alt="Ruční sestavení šablony" width="320" />

Šablonu můžete také uložit z právě upravované konfigurace volbou
**Configuration → Save as template**, nebo ji sestavit v prohlížeči
v [**Generátoru šablon**](./template-generator.mdx).

---

## Úprava šablony {#edit-a-template}

Otevřete šablonu a zvolte **Edit values**.

<img src="/img/hw-manager/hw-manager-template-edit.png" alt="Úprava hodnot šablony" width="320" />

**Rename** a **Delete** jsou ve stejné nabídce.

---

## Použití šablony {#apply-a-template}

Otevřete šablonu a zvolte, jak ji zapsat:

| Akce | Co se stane |
|---|---|
| **Apply over NFC** | Přečte zařízení, zobrazí výsledné změny ke kontrole a pak zapíše |
| **Apply offline** | Hromadný zápis do vypnutých zařízení, viz [**Konfigurace vypnutého zařízení**](./offline-configuration.md) |

Při offline použití se konfigurace ze šablony předvyplní. Zkontrolujte ji a pak zvolte
**Write to tag**.

<img src="/img/hw-manager/hw-manager-template-offline.png" alt="Offline použití šablony: předvyplněná, připravená ke kontrole a zápisu do tagu" width="320" />

---

## Sdílení šablony {#share-a-template}

Otevřete šablonu a zvolte **Share**; vznikne **QR kód** a **hexadecimální
řetězec**. **Copy hex** vloží řetězec do schránky. Kdokoli šablonu načte zpět
volbou **Add template → From QR code** nebo **From hex**.

<img src="/img/hw-manager/hw-manager-template-share-qr.png" alt="Sdílení šablony jako QR kódu a hexadecimálního řetězce" width="320" />

Šablona, která se do QR kódu nevejde, se nabídne jen jako hexadecimální řetězec.

Když importujete šablonu se stejným názvem, jaký už máte, aplikace se zeptá, jestli ji chcete
nahradit (**Replace**).
