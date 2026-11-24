---
slug: templates
title: Šablony
description: "Konfigurační šablony pro STICKER v aplikaci HARDWARIO Manager: vytvoření ze zařízení, ručně, z hexu či QR kódu, použití přes NFC či hromadným zápisem, sdílení."
---

# Šablony: vytvoření, sdílení, úprava a použití {#templates-create-share-edit-and-apply}

Šablona je znovu použitelná konfigurační předvolba: **jednou uložíte, použijete
mnohokrát**. Šablony obsahují jen nastavení, která lze sdílet; identita a tajné
údaje jednotlivých zařízení (sériové číslo, klíče a EUI pro LoRaWAN, klíče relace)
se záměrně vynechávají, takže šablonu můžete bezpečně použít pro více zařízení
i předat kolegovi.

Otevřete **STICKER → Konfigurace → Šablony**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-template.png" alt="Seznam šablon s uloženou šablonou a sekcemi, které nastavuje, a tlačítko Přidat šablonu" width="320" />

---

## Vytvoření šablony {#create-a-template}

Zvolte **Přidat šablonu** a vyberte zdroj:

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-template-add.png" alt="Nová šablona: Ze zařízení, Vytvořit ručně, Z hex a Z QR kódu" width="320" />

| Zdroj | Použijte, když |
|---|---|
| **Ze zařízení** | Máte zařízení už nastavené tak, jak chcete |
| **Vytvořit ručně** | Sestavujete předvolbu od začátku |
| **Z hex** | Někdo vám poslal šablonu jako hexadecimální řetězec |
| **Z QR kódu** | Někdo vám šablonu sdílel jako QR kód |

Když šablonu vytváříte **ručně**, pojmenujte ji a nastavte hodnoty v libovolné kategorii.
Prázdná kategorie se neuloží, takže šablona obsahuje jen to, co jste nastavili.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-template-create.png" alt="Ruční sestavení šablony: pole pro název a sekce Rádio, Měření a hlášení, Senzory, Historie a Alarmy" width="320" />

Šablonu můžete také uložit z právě upravované konfigurace volbou
**Více akcí → Uložit jako šablonu** na obrazovce Konfigurace, nebo ji sestavit
v prohlížeči v [**Generátoru konfiguračních šablon**](./template-generator.mdx).

:::info Starší šablony se převádějí
Šablona vytvořená pro firmware v1.4 (kód sdílený ze starší verze aplikace nebo
šablona z Generátoru konfiguračních šablon) se při načtení převede pro firmware v2.0.0.
Formulář, na který ji použijete, pod nadpisem **Převedeno pro firmware 2.0**
uvede, co se změnilo. Pravidla alarmů ze staršího firmwaru převést nelze,
a proto se odstraní; nastavte je znovu.
:::

---

## Úprava šablony {#edit-a-template}

Otevřete šablonu a zvolte **Upravit hodnoty**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-template-edit.png" alt="Úprava hodnot šablony s otevřenou sekcí Měření a hlášení a intervalem hlášení 15 min" width="320" />

**Přejmenovat** a **Smazat** jsou ve stejné nabídce.

---

## Použití šablony {#apply-a-template}

Otevřete šablonu a zvolte **Použít přes NFC**: aplikace přečte zařízení,
vyplní formulář ze šablony, vy ho zkontrolujete a zapíšete tlačítkem **Uložit
do zařízení**.

Pokud chcete stejnou šablonu použít pro mnoho zařízení, otevřete
[**Hromadný zápis**](./batch-write.md), zvolte **Více akcí → Použít šablonu**,
pak **Zapsat do zařízení** a přikládejte telefon k jednomu zařízení za druhým.

---

## Sdílení šablony {#share-a-template}

Otevřete šablonu a zvolte **Sdílet**; vznikne **QR kód** a **hexadecimální
řetězec**. **Kopírovat hex** vloží řetězec do schránky. Kdokoli šablonu načte
zpět volbou **Přidat šablonu → Z QR kódu** nebo **Z hex**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-template-share-qr.png" alt="Sdílení šablony jako QR kódu a hexadecimálního řetězce s tlačítkem Kopírovat hex" width="320" />

Šablona, která se do QR kódu nevejde, se nabídne jen jako hexadecimální řetězec.

Když šablonu importujete nebo přejmenujete na název, který už používáte,
aplikace se zeptá, jestli stávající šablonu chcete nahradit (**Nahradit**).
