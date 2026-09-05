---
slug: features
title: Funkce
description: "ThingsBoard nabízí pokročilé nástroje pro organizaci vaší IoT infrastruktury, automatizaci procesů a doručování reportů zákazníkům. Tato sekce popisuje klíčové možnosti dostupné na platformě HARDWARIO ThingsBoard."
---
import Image from '@theme/IdealImage';

# Funkce {#features}

ThingsBoard nabízí pokročilé nástroje pro organizaci vaší IoT infrastruktury, automatizaci procesů a doručování reportů zákazníkům. Tato sekce popisuje klíčové možnosti dostupné na platformě HARDWARIO ThingsBoard.

---

## [Assety](assets) {#assets}

Assety jsou logické kontejnery, které ve vašem prostředí ThingsBoard reprezentují objekty z reálného světa (budovy, podlaží, zóny nebo zařízení). Na rozdíl od zařízení (která reprezentují fyzický hardware) vám assety umožňují postavit strukturovanou hierarchii, která výrazně zjednodušuje řízení přístupu, abstrakci dashboardů a škálování.

**Assety použijte, když potřebujete:**
- Vytvořit víceúrovňové hierarchie (například region → město → budova → podlaží)
- Sdružit více senzorů pod jednu logickou entitu
- Nasdílet zákazníkovi přístup k sadě zařízení jediným assetem

---

## [Pravidla notifikací](notifications-manager) {#notification-rules}

Správce pravidel notifikací je no-code dashboard pro nastavení prahových výstrah. Nadefinujete podmínky pro svá telemetrická data a při každém překročení prahu dostanete upozornění e-mailem nebo SMS, bez programování.

**Pravidla notifikací použijte, když potřebujete:**
- Dostat výstrahu, když hodnota senzoru překročí nastavený limit
- Sledovat jedním pravidlem víc zařízení
- Řídit frekvenci výstrah nastavením doby trvání a klidové prodlevy

---

## [E-mailové notifikace](email-notification) {#email-notifications}

Pro pokročilejší scénáře notifikací umožňuje Rule Engine v ThingsBoardu postavit plně vlastní řetězce e-mailových notifikací v JavaScriptu. Tento přístup vám dává plnou kontrolu nad filtrováním zařízení, formátováním dat i omezováním frekvence.

**Tento přístup použijte, když potřebujete:**
- Filtrovat notifikace podle labelu zařízení nebo vlastních atributů
- Formátovat telemetrické hodnoty a časové značky v těle e-mailu (například převod na CET)
- Implementovat vlastní logiku omezení frekvence (například jeden e-mail za 24 hodin na zařízení)

---

## [Plánované reporty](email-reports) {#scheduled-reports}

Automaticky generujte a posílejte zákazníkům periodické PDF reporty podle nastaveného rozvrhu. Reporty se skládají ve vizuálním návrháři rozvržení a doručují se konfigurovatelnou e-mailovou šablonou, po nastavení už bez jakéhokoli zásahu.

**Plánované reporty použijte, když potřebujete:**
- Posílat klientům měsíční nebo týdenní souhrny dat
- Zahrnout do jednoho PDF dokumentu grafy a tabulky z více zařízení
- Automatizovat opakované reportování bez ruční práce

---

## [Vkládání dashboardů](embedding-dashboards) {#embedding-dashboards}

Veřejné dashboardy ThingsBoard vložte přímo do externích webových aplikací jednoduchým `iframe`. Postup je optimalizovaný pro dokumentační frameworky založené na Reactu, jako je Docusaurus (MDX), takže se vaše živé grafy vykreslí přímo ve vašich stránkách.

**Vkládání dashboardů použijte, když potřebujete:**
- Zobrazit živou telemetrii a grafy v externím webu nebo na stránce dokumentace
- Nasdílet dashboard jen pro čtení, aniž by se návštěvníci museli přihlašovat
- Integrovat vizuály ThingsBoardu do projektu Docusaurus (MDX) se správnou syntaxí JSX

---

## [Rule Engine](rule-engine) {#rule-engine}

Rule Engine je jádro automatizace v ThingsBoardu. Zpracovává každou příchozí zprávu z vašich zařízení pomocí vizuálního editoru s uzly a dává vám plnou kontrolu nad transformací dat, správou alarmů a integracemi třetích stran.

**Rule Engine použijte, když potřebujete:**
- Transformovat nebo počítat hodnoty z příchozí telemetrie (například převody jednotek, součty fází)
- Vytvářet a automaticky rušit alarmy podle prahových podmínek
- Posílat data do externích systémů voláním REST API
- Směrovat a zpracovávat příkazy pro zařízení (RPC)

:::caution
Při úpravách Root Rule Chain vždy zachovejte uzly **Save Timeseries** a **Save Client Attributes**. Jejich odstraněním se přestanou ukládat veškerá data do databáze. Bezpečné postupy úprav najdete v návodu [Rule Engine](rule-engine).
:::
