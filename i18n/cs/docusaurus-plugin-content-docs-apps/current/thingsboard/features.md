---
slug: features
title: Funkce
title_meta: "Funkce (ThingsBoard)"
---
import Image from '@theme/IdealImage';

# Funkce {#features}

ThingsBoard nabízí pokročilé nástroje pro uspořádání infrastruktury IoT, automatizaci procesů a doručování reportů zákazníkům. Tato sekce popisuje hlavní funkce platformy HARDWARIO ThingsBoard.

---

## [Assety](/apps/thingsboard/assets) {#assets}

Assety jsou v ThingsBoard logické kontejnery, které představují skutečné objekty (budovy, podlaží, zóny nebo vybavení). Na rozdíl od zařízení, která představují fyzický hardware, z assetů sestavíte strukturovanou hierarchii, která výrazně usnadní řízení přístupu, abstrakci dashboardů i škálování.

**Assety použijte, když potřebujete:**
- Vytvořit víceúrovňové hierarchie (například region → město → budova → podlaží)
- Sdružit více senzorů pod jednu logickou entitu
- Zpřístupnit zákazníkovi skupinu zařízení přes jediný asset

---

## [Pravidla notifikací](/apps/thingsboard/notifications-manager) {#notification-rules}

Správce pravidel notifikací (Notification Rules Manager) je dashboard, ve kterém bez programování nastavíte upozornění při překročení limitů. Určíte podmínky pro telemetrická data a při každém překročení limitu dostanete upozornění e-mailem nebo SMS.

**Pravidla notifikací použijte, když potřebujete:**
- Dostat upozornění, když hodnota senzoru překročí nastavený limit
- Sledovat jedním pravidlem víc zařízení
- Řídit četnost upozornění nastavením doby trvání a ochranné prodlevy (cooldown)

---

## [E-mailové notifikace](/apps/thingsboard/email-notification) {#email-notifications}

Pro pokročilejší scénáře můžete v Rule Engine platformy ThingsBoard sestavit zcela vlastní řetězce e-mailových notifikací v JavaScriptu. Máte tak plnou kontrolu nad filtrováním zařízení, formátováním dat i omezením četnosti.

**Tento přístup použijte, když potřebujete:**
- Filtrovat notifikace podle labelu zařízení nebo vlastních atributů
- Formátovat telemetrické hodnoty a časové značky v těle e-mailu (například převod na CET)
- Naprogramovat vlastní omezení četnosti (například jeden e-mail za 24 hodin pro každé zařízení)

---

## [Plánované reporty](/apps/thingsboard/email-reports) {#scheduled-reports}

Pravidelné reporty v PDF se zákazníkům automaticky vytvářejí a posílají podle nastaveného plánu. Reporty se skládají ve vizuálním návrháři rozvržení a odcházejí podle nastavitelné e-mailové šablony. Po nastavení už nevyžadují žádný zásah.

**Plánované reporty použijte, když potřebujete:**
- Posílat klientům měsíční nebo týdenní souhrny dat
- Zahrnout do jednoho PDF dokumentu grafy a tabulky z více zařízení
- Automatizovat opakované reportování bez ruční práce

---

## [Vkládání dashboardů](/apps/thingsboard/embedding-dashboards) {#embedding-dashboards}

Veřejné dashboardy ThingsBoard vložíte přímo do externích webových aplikací pomocí jednoduchého prvku `iframe`. Postup je optimalizovaný pro dokumentační frameworky založené na Reactu, jako je Docusaurus (MDX), takže se živé grafy vykreslí přímo na vašich stránkách.

**Vkládání dashboardů použijte, když potřebujete:**
- Zobrazit živou telemetrii a grafy v externím webu nebo na stránce dokumentace
- Sdílet dashboard jen pro čtení, aniž by se návštěvníci museli přihlašovat
- Integrovat vizuály ThingsBoard do projektu Docusaurus (MDX) se správnou syntaxí JSX

---

## [Rule Engine](/apps/thingsboard/rule-engine) {#rule-engine}

Rule Engine je jádro automatizace v platformě ThingsBoard. Každou příchozí zprávu ze zařízení zpracuje podle pravidel, která sestavíte z uzlů ve vizuálním editoru, takže máte plnou kontrolu nad transformací dat, správou alarmů a integracemi třetích stran.

**Rule Engine použijte, když potřebujete:**
- Transformovat nebo počítat hodnoty z příchozí telemetrie (například převody jednotek, součty fází)
- Vytvářet a automaticky rušit alarmy podle prahových podmínek
- Posílat data do externích systémů voláním REST API
- Směrovat a zpracovávat příkazy pro zařízení (RPC)

:::caution
Při úpravách Root Rule Chain vždy zachovejte uzly **Save Timeseries** a **Save Client Attributes**. Pokud je odstraníte, přestanou se do databáze ukládat jakákoli data. Bezpečné postupy úprav najdete v návodu [Rule Engine](/apps/thingsboard/rule-engine).
:::
