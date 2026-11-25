---
slug: features
title: Pokročilé
description: "Pokročilé funkce HARDWARIO Dashboards: assety, Rule Engine a integrace."
title_meta: "Pokročilé (HARDWARIO Dashboards)"
---
import Image from '@theme/IdealImage';

# Pokročilé {#advanced}

Až budete mít zařízení, dashboardy, sdílení a uživatele nastavené (viz [návody krok za krokem](/apps/thingsboard/index#step-by-step)), tyto nástroje vám pomohou uspořádat větší projekty, automatizovat procesy a doručovat reporty zákazníkům.

:::tip Nastavíme to za vás
Některé z těchto funkcí vyžadují technické nastavení. Pokud ho nechcete dělat sami, napište nám na [ask@hardwario.com](mailto:ask@hardwario.com).
:::

---

## [Assety](/apps/thingsboard/assets) {#assets}

Assety jsou v HARDWARIO Dashboards logické kontejnery, které představují skutečné objekty (budovy, podlaží, zóny nebo vybavení). Na rozdíl od zařízení, která představují fyzický hardware, z assetů sestavíte strukturovanou hierarchii, která výrazně usnadní řízení přístupu, abstrakci dashboardů i škálování.

**Assety použijte, když potřebujete:**
- Vytvořit víceúrovňové hierarchie (například region → město → budova → podlaží)
- Sdružit více senzorů pod jednu logickou entitu
- Zpřístupnit zákazníkovi skupinu zařízení přes jediný asset

{/* Hidden for now (2026-11-18): email notifications and scheduled reports

---

## [E-mailové notifikace](/apps/thingsboard/email-notification) {#email-notifications}

Pro scénáře nad rámec [pravidel notifikací](/apps/thingsboard/notifications-manager) můžete v Rule Engine sestavit zcela vlastní řetězce e-mailových notifikací v JavaScriptu. Máte tak plnou kontrolu nad filtrováním zařízení, formátováním dat i omezením četnosti.

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

*/}

---

## [Rule Engine](/apps/thingsboard/rule-engine) {#rule-engine}

Rule Engine zpracovává každou zprávu ze zařízení: výpočty, alarmy, notifikace, napojení na jiné systémy a příkazy pro zařízení. Rule chainy nastavuje **HARDWARIO**: napište nám, co potřebujete, a postavíme to.

**Typické požadavky:**
- Výpočty a převody jednotek (například součty fází, spotřeba za den)
- Alarmy, které se samy vytvoří a zruší podle limitů
- Odesílání dat do vašeho ERP, CRM nebo databáze
- Příkazy z tlačítka na dashboardu do zařízení

Všechny možnosti a postup najdete na stránce [Rule Engine](/apps/thingsboard/rule-engine).

---

## [Integrace](/apps/thingsboard/integrations) {#integrations}

Propojte HARDWARIO Dashboards s dalšími systémy, například se síťovým serverem LoRaWAN [ChirpStack](/apps/thingsboard/chirpstack-integration).

:::info Dokumentace ThingsBoard
HARDWARIO Dashboards jsou postavené na platformě ThingsBoard. Podrobnosti najdete v oficiální dokumentaci ThingsBoard (anglicky): [ThingsBoard PE documentation](https://thingsboard.io/docs/pe/).
:::
