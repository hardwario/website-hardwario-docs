---
slug: creating-dashboard
title: První dashboard
description: "Vytvořte dashboard v HARDWARIO Dashboards, přidejte widget Value card s živou hodnotou, upravte jeho velikost a dashboard uložte."
title_meta: "První dashboard (HARDWARIO Dashboards)"
---
import Image from '@theme/IdealImage';

# První dashboard {#your-first-dashboard}

V tomto návodu vytvoříte dashboard a přidáte na něj kartu, která ukazuje živou hodnotu ze zařízení. Potom můžete pokračovat [grafy](/apps/thingsboard/charts).

Než začnete, zařízení by mělo být [připojené](/apps/thingsboard/cloud-connection) a jeho hodnoty by se měly objevovat v **Latest telemetry** (viz [Správa zařízení](/apps/thingsboard/devices#check-the-device-data)).

---

## Krok 1: Vytvořte dashboard {#step-1-create-the-dashboard}

1. V levém menu otevřete **Dashboards**.
2. Vpravo nahoře klikněte na **Add dashboard** a zvolte **Create new dashboard**.

   ![Seznam dashboardů s otevřenou nabídkou Add dashboard s volbami Create new dashboard a Import dashboard](../../../../../apps/thingsboard/images/dashboard-add-menu.jpg)

3. Zadejte **Title**, například *Warehouse*. Ostatní pole jsou nepovinná. Klikněte na **Add**.

   ![Dialog Add dashboard s vyplněným názvem Warehouse](../../../../../apps/thingsboard/images/dashboard-add-dialog.jpg)

Nový dashboard se otevře v **režimu úprav**, připravený na první widget.

![Prázdný dashboard v režimu úprav s tlačítkem Add new widget uprostřed a lištou úprav nahoře](../../../../../apps/thingsboard/images/dashboard-edit-empty.jpg)

---

## Krok 2: Přidejte kartu s živou hodnotou {#step-2-add-a-card-with-a-live-value}

1. Klikněte na **Add new widget** uprostřed (nebo na **Add widget** v horní liště).
2. Otevře se seznam balíčků widgetů. Zvolte **Cards**.

   ![Panel Select widgets bundle s balíčky Charts, Cards, Maps, Analogue gauges a dalšími](../../../../../apps/thingsboard/images/dashboard-widget-bundles.jpg)

3. Zvolte **Value card**. Ukazuje jednu hodnotu, která se aktualizuje v reálném čase.

   ![Balíček Cards s widgety Value card, Horizontal value card, Label & value card a dalšími](../../../../../apps/thingsboard/images/dashboard-cards-bundle.jpg)

4. V sekci **Datasource** napište do pole **Device** název zařízení a vyberte ho.
5. V poli **Data key** odeberte výchozí klíč `temperature`, klikněte do pole a vyberte hodnotu, kterou chcete zobrazit, například `hygrometer.temperature.measurements.avg`. Můžete napsat část názvu a vyhledat ji.
6. V sekci **Appearance** nastavte:
   - **Label**: text nad hodnotou, například *Chladírna A*,
   - **Value**: jednotku (například `°C`) a počet desetinných míst (**decimals**),
   - případně **Icon** a barvy.
7. Klikněte na **Add**.

![Nastavení widgetu Value card: zařízení (1), datový klíč (2), label Cold room A (3) a jednotka s jedním desetinným místem (4)](../../../../../apps/thingsboard/images/dashboard-value-card-config.jpg)

Karta se objeví na dashboardu a ukazuje poslední hodnotu s časem poslední aktualizace.

![Dashboard v režimu úprav s kartou Cold room A, která ukazuje 4.1 °C](../../../../../apps/thingsboard/images/dashboard-value-card-result.jpg)

---

## Krok 3: Uspořádejte dashboard {#step-3-arrange-the-dashboard}

- **Velikost** widgetu změníte tažením za jeho pravý dolní roh.
- **Přesunete** ho tažením.
- **Upravíte** ho tak, že na něj najedete myší a kliknete na **ikonu tužky** v jeho pravém horním rohu.
- **Zkopírujete** ho pravým kliknutím a volbou **Copy**, potom pravým kliknutím na volné místo a volbou **Paste**. V kopii změňte jen datový klíč, třeba na vlhkost. Je to rychlejší než začínat znovu.

---

## Krok 4: Uložte {#step-4-save}

Vpravo nahoře klikněte na **Save**. Dashboard opustí režim úprav. Karta se teď aktualizuje pokaždé, když zařízení pošle nová data.

Pokud budete chtít dashboard později upravit, otevřete ho a v horní liště klikněte na **Edit mode**.

![Uložený dashboard s tlačítkem Edit mode v horní liště vedle časového okna](../../../../../apps/thingsboard/images/dashboard-view-mode.jpg)

:::tip Hodnota je prázdná?
Zkontrolujte, že jste vybrali správné zařízení a klíč: otevřete zařízení a porovnejte to s jeho **Latest telemetry**. Grafy navíc závisí na [časovém okně](/apps/thingsboard/time-window).
:::

---

## Ukázka {#example}

Hotový dashboard může kombinovat karty s hodnotami, grafy, mapu a tabulku:

![Dashboard Warehouse overview se čtyřmi kartami s hodnotami, mapou lokalit a grafem teplot dvou chladíren](../../../../../apps/thingsboard/images/dashboard-example-overview.jpg)

---

## Další kroky {#next-steps}

- [Grafy a jejich vzhled](/apps/thingsboard/charts): přidejte graf s historií.
- [Časové okno](/apps/thingsboard/time-window): zvolte, jaké období dashboard ukazuje.
- [Veřejný odkaz](/apps/thingsboard/public-link): nasdílejte dashboard.

:::info Dokumentace ThingsBoard
HARDWARIO Dashboards jsou postavené na platformě ThingsBoard. Podrobnosti najdete v oficiální dokumentaci ThingsBoard (anglicky): [Dashboards](https://thingsboard.io/docs/pe/user-guide/dashboards/).
:::
