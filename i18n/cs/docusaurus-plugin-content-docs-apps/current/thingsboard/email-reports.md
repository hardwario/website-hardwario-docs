---
slug: email-reports
title: Reporty
description: "Tento návod vás provede kompletním nastavením automatických PDF reportů pomocí modulu Reporting. Postup má tři hlavní kroky: vytvoření rozvržení reportu, přípravu e-mailové zprávy a nastavení plánovače."
---
import Image from '@theme/IdealImage';

# Nastavení e-mailových reportů {#setting-up-email-reports}

Tento návod vás provede kompletním nastavením automatických PDF reportů pomocí modulu **Reporting**. Postup má tři hlavní kroky: vytvoření rozvržení reportu, přípravu e-mailové zprávy a nastavení plánovače.

## Krok 1: Vytvořte šablonu reportu {#step-1-create-a-report-template}
Nejprve je potřeba určit, jak bude výsledné PDF vypadat a jaká data bude obsahovat.

1. V levém hlavním menu přejděte na **Reporting** -> **Overview** (nebo **Templates**).
2. Klikněte vpravo nahoře na tlačítko **+ Add report template** a zvolte **Create new report template**.
3. Zadejte název šablony (například *Obecný měsíční report*) a formát nechte na **PDF**.
4. Nacházíte se ve vizuálním Report Builderu. Přetahujte komponenty z levého panelu:
   * **Text & Content:** Pro přidání záhlaví, titulků a zápatí (Markdown je podporovaný).
   * **Charts:** Pro vložení grafů. V nastavení grafu zvolte cílová zařízení a časové okno (například *Previous month*).
   * **Tables:** Pro vložení datových tabulek. *Tip: Pokud chcete data z více zařízení sloučit do jednoho řádku, nezapomeňte v nastavení tabulky zapnout agregaci dat (například 1 Day).*
5. Až budete s rozvržením spokojeni, uložte šablonu kliknutím na **Save** / **Apply**.

:::info
**Oficiální dokumentace:** Více o vytváření a návrhu rozvržení reportů:
[ThingsBoard Reporting Key Concepts](https://thingsboard.io/docs/pe/user-guide/reporting/reporting-key-concepts/)
:::

## Krok 2: Vytvořte šablonu notifikace {#step-2-create-a-notification-template}
Aby se report dostal k zákazníkům, musíme vytvořit text e-mailu, který bude PDF přílohu doprovázet.

1. V levém menu přejděte na **Notification center** -> **Templates**.
2. Kliknutím na tlačítko **+ Add template** vytvořte novou šablonu notifikace.
3. Pojmenujte šablonu (například *Šablona e-mailu s měsíčním reportem*).
4. Zvolte odpovídající **Notification type** (například *Report generated*).
5. V sekci **Delivery methods** zaškrtněte volbu **Email**.
6. Vyplňte obsah e-mailu:
   * **Subject:** například `Měsíční report monitoringu - %d{MMMM yyyy}`.
   * **Body:** Napište doprovodný text, který zákazník v e-mailu uvidí. Můžete použít čistý text nebo formátování HTML (odrážky, tučný text a další).
   * *Poznámka:* ThingsBoard k této e-mailové šabloně automaticky přiloží vygenerovaný soubor PDF, když ji plánovač spustí.
7. Uložte šablonu.

:::info
**Oficiální dokumentace:** Pokročilé formátování e-mailů a směrování notifikací:
[ThingsBoard Notification Templates](https://thingsboard.io/docs/pe/user-guide/notifications/#templates)
:::

## Krok 3: Naplánujte automatické doručování {#step-3-schedule-the-automated-delivery}
Nyní je potřeba předchozí kroky spojit a systému říct, kdy a komu se má report posílat.

1. Vraťte se v levém menu do sekce **Reporting** a klikněte na **Scheduling reports**.
2. Kliknutím na ikonu **+** přidejte nový rozvrh.
3. Vyplňte konfiguraci plánovače:
   * **Report template:** Zvolte rozvržení reportu vytvořené v kroku 1.
   * **Notification template:** Zvolte e-mailovou šablonu připravenou v kroku 2.
4. Přejděte na nastavení **Schedule**:
   * Zvolte správné časové pásmo.
   * Nastavte interval opakování – u měsíčních reportů naplánujte spuštění na 1. den každého měsíce v čase, který vám vyhovuje (například 01:00).
5. V sekci **Recipients** / **Targets** určete, kdo e-mail dostane. Můžete zvolit konkrétní uživatele, zákazníky nebo zadat e-mailové adresy přímo.
6. Uložte rozvrh.

:::info
**Oficiální dokumentace:** Více o plánování událostí a doručování reportů:
[ThingsBoard Scheduler](https://thingsboard.io/docs/pe/user-guide/scheduler/)
:::

**Hotovo!** Systém teď bude každý měsíc automaticky generovat PDF podle vašeho návrhu, přiloží ho k připravenému e-mailu a odešle určeným příjemcům.
