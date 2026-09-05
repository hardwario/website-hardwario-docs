---
slug: notifications-manager
title: Notifikace
description: "Zákazník provozující sklady chce dostat upozornění, když teplota v některém skladu překročí 28 °C. Vytvoří pravidlo: Device = WarehouseSensorA, Variable = temperature, Condition = > 28, Recipient = manager@company.com. Od té chvíle se e-mail odesílá…"
---
import Image from '@theme/IdealImage';

# Správce pravidel notifikací {#notification-rules-manager}

**Správce pravidel notifikací** je nástroj pro nastavení automatických výstrah podle dat z vašich IoT zařízení (senzorů, měřičů a dalších). Umožňuje přesně definovat podmínky, za kterých dostanete e-mail nebo SMS, například když teplota překročí zadanou hodnotu, vlhkost klesne pod prah nebo zařízení nahlásí nečekanou hodnotu.

:::info Ukázkový případ použití
Zákazník provozující sklady chce dostat upozornění, když teplota v některém skladu překročí 28 °C. Vytvoří pravidlo: *Device = Warehouse_Sensor_A, Variable = temperature, Condition = > 28, Recipient = manager@company.com*. Od té chvíle se e-mail odesílá automaticky vždy, když senzor naměří víc než 28 °C.
:::

---

## Přihlášení a přístup k dashboardu {#logging-in-and-accessing-the-dashboard}

1. Přihlaste se do platformy na **app.hardwario.cloud** svým e-mailem a heslem.
2. V levém navigačním menu klikněte na **Notifications**.
3. Otevře se dashboard **Notification Rules Manager**. Pokud jste tu poprvé, tabulka pravidel bude prázdná.

:::caution Poznámka
Položka menu **Notifications** je vidět jen zákazníkům, kterým byl k tomuto dashboardu udělen přístup. Pokud ji nevidíte, obraťte se na administrátora platformy.
:::

---

## Úrovně přístupu {#access-levels}

| Role | Přístup |
|------|--------|
| **Customer Administrator** | Plný přístup. Může pravidla vytvářet, upravovat, kopírovat, mazat a zapínat či vypínat. |
| **Customer User** | Jen pro čtení. Pravidla vidí, ale nemůže je vytvářet, upravovat, kopírovat, mazat ani přepínat. |

:::info
Pokud jste Customer User a potřebujete pravidlo změnit, obraťte se na svého Customer Administratora.
:::

---

## Přehled rozhraní {#interface-overview}

![Prázdný widget Notification Rules Manager s vyhledávacím polem a tlačítkem Add Rule v záhlaví](../../../../../apps/thingsboard/images/notifications-manager-1.png)

### Vysvětlení sloupců tabulky {#table-columns-explained}

| Sloupec | Popis |
|--------|-------------|
| **Device(s)** | První sledované zařízení. Pokud je jich víc, objeví se odznak **+N more**. Najetím myší zobrazíte celý seznam. |
| **Customer** | Zákazník nebo zákazníci, kterým zařízení patří (zobrazuje se, když existují podřízení zákazníci). Pokud zařízení patří více zákazníkům, zobrazí se první s **+N more**. |
| **Variable(s)** | Sledované telemetrické klíče. |
| **Condition** | Spouštěcí podmínka a prah, plus odznaky Duration/Cooldown, pokud jsou nastavené. |
| **Recipients** | Počet a typ příjemců (e-mail nebo SMS). Najetím myší zobrazíte seznam. |
| **Enabled** | Přepínač pro zapnutí a vypnutí pravidla bez jeho smazání. |
| **Actions** | **Edit** · **Copy** · **Delete** |

---

## Vytvoření nového pravidla {#creating-a-new-rule}

Klikněte na **+ Add Rule** v pravém horním rohu widgetu. Pod záhlavím se otevře formulář pravidla.

### Krok 1: Vyberte zařízení {#step-1-select-devices}

V sekci **DEVICES** zvolte zařízení, která má pravidlo sledovat. Jedno pravidlo může sledovat víc zařízení současně.

1. Klikněte na pole **Filter devices...**. Objeví se rozbalovací seznam dostupných zařízení.
2. Začněte psát a filtrujte podle názvu, nebo seznam projděte a vyberte.
3. Klikněte na zařízení v seznamu nebo stiskněte **+ Add**. Objeví se jako odznak nad polem.
4. U dalších zařízení postup zopakujte. Zařízení odeberete kliknutím na **×** na jeho odznaku.

:::tip
Přidání více zařízení znamená, že se pravidlo vyhodnotí pro *každé* zařízení samostatně. Notifikace se odešle vždy, když podmínku splní *kterékoli* z vybraných zařízení.
:::

### Krok 2: Vyberte proměnné {#step-2-select-variables}

V sekci **VARIABLES** zvolte nebo napište telemetrické klíče, které chcete sledovat.

**Použití výběru proměnných (doporučeno):**

Jakmile máte vybrané alespoň jedno zařízení, klikněte na pole s proměnnou. Objeví se seznam všech telemetrických klíčů, které vybraná zařízení už poslala. Když je vybráno víc zařízení, jsou klíče seskupené:

- **Common to all devices (N)**: klíče dostupné na každém vybraném zařízení. Ty jsou pro pravidla nad více zařízeními nejužitečnější.
- **Skupiny podle zařízení**: klíče, které existují jen na konkrétních zařízeních.

Kliknutím na klíč ho přidáte jako odznak. Už přidané klíče jsou označené ✓ a nelze je přidat dvakrát.

**Ruční zadání klíče:**

Napište název klíče přímo do pole a stiskněte **Enter** nebo klikněte na **+ Add**. To se hodí u zařízení, která ještě žádnou telemetrii neposlala.

:::caution Důležité
Název proměnné musí přesně odpovídat telemetrickému klíči, jak ho zařízení posílá (rozlišují se velká a malá písmena). Dostupné klíče zkontrolujete tak, že otevřete zařízení v ThingsBoardu → karta *Latest Telemetry*.
:::

### Krok 3: Nastavte podmínku {#step-3-set-the-condition}

V bloku **CONDITION** určete, kdy se má notifikace odeslat.

| Pole | Popis | Příklad |
|-------|-------------|---------|
| **Operator** | Operátor porovnání: větší než, menší než, rovná se, větší nebo rovno, menší nebo rovno. | > greater than |
| **Threshold** | Hodnota, se kterou se naměřená telemetrie porovnává. | 28 |

Příklad: *Operator = > greater than, Threshold = 28* znamená: „Pošli notifikaci, když hodnota proměnné překročí 28."

### Krok 4: Nastavte časování {#step-4-configure-timing}

Blok **TIMING** obsahuje dvě volitelná pole pro jemnější řízení. Pro výchozí chování je nechte na 0.

| Pole | Popis | Výchozí |
|-------|-------------|---------|
| **Duration (min)** | Podmínka musí být splněná nepřerušeně tolik minut, než se notifikace odešle. Odfiltruje krátké špičky. | 0 = poslat okamžitě |
| **Cooldown (min)** | Minimální doba mezi dvěma notifikacemi tohoto pravidla. Zabraňuje zaplavení notifikacemi. | 0 = bez omezení |

### Krok 5: Přidejte příjemce {#step-5-add-recipients}

**Notification type**: V sekci **NOTIFICATION TYPE** zvolte **Email** nebo **SMS**. Objeví se odpovídající pole pro příjemce.

**Příjemci e-mailu:**
1. Do pole *user@example.com* napište e-mailovou adresu.
2. Stiskněte **Enter** nebo klikněte na **+ Add**. Adresa se objeví jako odznak.
3. U dalších příjemců postup zopakujte.

**Příjemci SMS:**  
Zadejte telefonní číslo v mezinárodním formátu: `+420600123456`. Přidávání funguje stejně jako u e-mailu.

:::tip
K jednomu pravidlu můžete přidat libovolný počet příjemců. Notifikace se odešle všem současně.
:::

### Krok 6: Uložte pravidlo {#step-6-save-the-rule}

Jakmile jsou vyplněná všechna povinná pole, klikněte na **Save Rule**. Pravidlo se okamžitě uloží a začne se vyhodnocovat v zapnutém stavu. Objeví se v tabulce pravidel.

:::caution Povinná pole
- Alespoň jedno zařízení
- Alespoň jedna proměnná
- Hodnota prahu
- Alespoň jeden příjemce (e-mail nebo SMS)
:::

![Formulář New Rule se sekcemi zařízení, proměnných, podmínky, časování, typu notifikace, šablony zprávy a příjemců](../../../../../apps/thingsboard/images/notifications-manager-2.png)

---

## Správa existujících pravidel {#managing-existing-rules}

### Úprava pravidla {#editing-a-rule}

U pravidla, které chcete změnit, klikněte na **Edit**. Otevře se formulář s předvyplněnými hodnotami. Proveďte změny a klikněte na **Save Rule**.

### Kopírování pravidla {#copying-a-rule}

Klikněte na **Copy**. Otevře se formulář nového pravidla se stejnými hodnotami jako originál. Upravte, co potřebujete (například jiný prah nebo zařízení), a uložte.

:::tip
Kopírování je ideální, když chcete podobné pravidlo pro jiné zařízení nebo prah, aniž byste všechno vyplňovali od začátku.
:::

### Smazání pravidla {#deleting-a-rule}

Klikněte na **Delete**. Objeví se potvrzovací dialog. Po potvrzení se pravidlo trvale odstraní ze všech zařízení, kde bylo uložené.

:::caution Varování
Smazání je trvalé a nelze ho vzít zpět. Pokud chcete notifikace jen dočasně zastavit, použijte místo toho přepínač **Enabled**.
:::

### Zapnutí a vypnutí pravidla {#enabling--disabling-a-rule}

Každé pravidlo má ve sloupci **Enabled** přepínač. Jeho vypnutím pravidlo deaktivujete: žádné notifikace se nebudou posílat, ale pravidlo zůstane uložené a lze ho kdykoli znovu zapnout.

![Tabulka pravidel se dvěma teplotními pravidly, zaškrtávátky Enabled a akčními tlačítky Edit, Copy a Delete](../../../../../apps/thingsboard/images/notifications-manager-3.png)

---

## Filtrování a řazení pravidel {#filtering-and-sorting-rules}

### Vyhledávání {#search}

Použijte pole *Search rules...* v pravém horním rohu. Výsledky se aktualizují v reálném čase napříč všemi poli (název zařízení, proměnná, příjemce a další).

### Filtr zákazníka {#customer-filter}

Pokud vaše organizace spravuje podřízené zákazníky, objeví se v horní liště rozbalovací filtr. Zvolením zákazníka zobrazíte jen pravidla pro zařízení tohoto zákazníka.

### Řazení {#sorting}

Kliknutím na záhlaví jakéhokoli řaditelného sloupce seznam seřadíte. Dalším kliknutím pořadí obrátíte. Aktivní směr řazení ukazuje šipka ˅/˄. Řaditelné sloupce:

- **Device(s)**: název zařízení
- **Customer**: název zákazníka
- **Variable(s)**: název proměnné
- **Recipients**: typ notifikace (e-mail / SMS)
- **Enabled**: aktivní / neaktivní

---

## Jak fungují Duration a Cooldown {#understanding-duration-and-cooldown}

| Nastavení | Co dělá | Kdy ho použít |
|---------|-------------|----------------|
| **Duration** *(minuty)* | Podmínka musí být splněná nepřerušeně tolik minut, než se notifikace odešle. Krátká špička výstrahu nevyvolá. | Chcete ignorovat krátké nebo náhodné výkyvy a reagovat jen na trvalý stav. |
| **Cooldown** *(minuty)* | Minimální doba mezi dvěma notifikacemi tohoto pravidla. I když podmínka platí dál, další zpráva se neodešle, dokud tento interval neuplyne. | Chcete omezit frekvenci notifikací, například nejvýš jedna výstraha za hodinu, ne padesát. |

:::info Doporučené nastavení pro začátek
Pokud si nejste jistí, nastavte **Duration = 0** a **Cooldown = 30**. Notifikace se odešle okamžitě po splnění podmínky, ale nejvýš jednou za 30 minut.
:::

---

## Často kladené otázky {#frequently-asked-questions}

**Nedostal jsem notifikaci, i když podmínka měla být splněná. Co mám zkontrolovat?**
- Je pravidlo zapnuté? Zkontrolujte přepínač **Enabled** v tabulce.
- Je název proměnné napsaný správně? Musí přesně odpovídat telemetrickému klíči, který zařízení posílá.
- Není **Duration** nastavené na vysokou hodnotu? Podmínka musí být splněná nepřerušeně po celou dobu.
- Není aktivní **Cooldown**, který ještě neuplynul?
- Je e-mailová adresa nebo telefonní číslo zadané správně?
- Zkontrolujte složku se spamem: notifikační e-mail mohl být odfiltrovaný.

**Můžu jedním pravidlem pokrýt víc zařízení a víc proměnných současně?**  
Ano. Při vytváření pravidla přidejte víc zařízení a víc proměnných. Pravidlo se vyhodnotí pro každou kombinaci zařízení a proměnné samostatně. Když je vybráno víc zařízení, výběr proměnných automaticky ukáže, které telemetrické klíče jsou společné všem vybraným zařízením a které jsou specifické pro jednotlivá.

**Změnil se jazyk rozhraní. Jak ho přepnu zpátky?**  
Použijte přepínač jazyka v pravém horním rohu widgetu. Vaše volba se ukládá pro váš uživatelský účet. Ostatních uživatelů se to nedotkne.

**Co se stane, když smažu pravidlo, které bylo uložené na více zařízeních?**  
Pravidlo se odstraní ze všech zařízení, kde bylo uložené. Tuhle akci nelze vzít zpět.

**Jak zjistím, které telemetrické klíče moje zařízení posílá?**  
Otevřete v ThingsBoardu detail zařízení (sekce *Devices*) a klikněte na kartu *Latest Telemetry*. Jsou tam vypsané všechny klíče i jejich aktuální hodnoty.

**Můžu nastavit pravidlo pro zařízení podřízeného zákazníka?**  
Ano. Pokud spravujete podřízené zákazníky, zvolte příslušného zákazníka filtrem v horní liště. Při vytváření pravidla se pak zobrazí jen zařízení tohoto zákazníka.

**Co znamená odznak „1 email" nebo „1 SMS" v tabulce?**  
Ukazuje počet a typ příjemců daného pravidla. Najetím myší na odznak zobrazíte konkrétní adresy nebo telefonní čísla.

**Jak poznám, že se pravidlo spustilo?**  
Dostanete e-mail nebo SMS podle nastavení. Notifikace obsahuje název zařízení, proměnnou, naměřenou hodnotu a podmínku, která se spustila.
