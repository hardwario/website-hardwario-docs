---
slug: rule-engine
title: Rule Engine
description: "Co dělá Rule Engine v HARDWARIO Dashboards, co s ním pro vás HARDWARIO postaví (výpočty, alarmy, integrace) a jak o to požádat."
---

# Rule Engine {#rule-engine}

Rule Engine zpracovává každou zprávu, kterou vaše zařízení pošlou do HARDWARIO Dashboards. Pracuje v **rule chainech** (řetězcích pravidel): v diagramech složených z uzlů, kde každý uzel dělá jeden krok, například výpočet, kontrolu limitu, alarm, e-mail nebo volání jiného systému. Data ze zařízení projdou těmito kroky, než se uloží a zobrazí na dashboardech.

---

## Kdo to nastavuje {#who-sets-it-up}

V HARDWARIO Dashboards rule chainy nastavuje a spravuje **HARDWARIO**. Váš účet sekci Řetězy pravidel nemá: rule chainy běží pro celou platformu a chyba v nich by mohla zastavit ukládání dat.

Vy popíšete, co potřebujete, a my rule chain postavíme, otestujeme a zapojíme.

---

## Co pro vás můžeme postavit {#what-we-can-build-for-you}

- **Výpočty a převody:** převody jednotek, součty více fází nebo senzorů, rozdíly, spotřeba za hodinu nebo den, hodnoty podle kalibrační tabulky.
- **Čištění dat:** ignorování zjevně chybných hodnot (například teploty 1000 °C), vyhlazení kolísajících hodnot nebo ukládání jen vybraných veličin.
- **Alarmy:** vytvoření alarmu, když hodnota překročí limit nebo zařízení přestane posílat data, a jeho automatické zrušení, když se hodnota vrátí do normálu. Alarm může záviset na více hodnotách nebo zařízeních.
- **Notifikace:** e-mail, SMS nebo push do mobilu v situacích, které stránka [Notifikace](/apps/thingsboard/notifications-manager) nepokrývá, například zprávy kombinující více zařízení nebo denní souhrn.
- **Napojení na jiné systémy:** odesílání dat do vašeho ERP, CRM nebo databáze přes REST API, MQTT nebo webhook, případně načítání dat zvenku, třeba předpovědi počasí nebo cen.
- **Příkazy pro zařízení:** předání příkazu z tlačítka na dashboardu (například „otevři ventil“) do zařízení, nebo posílání příkazů podle plánu či podmínky.
- **Doplňující informace k datům:** připojení umístění, zákazníka, budovy nebo limitů uložených u zařízení ke každé zprávě, aby je mohly použít dashboardy a reporty.

---

## Jak to probíhá {#how-it-works}

1. **Napište nám, co potřebujete**, například „pošli SMS servisu, když teplota v chladírně zůstane 15 minut nad 8 °C“. Pište na [ask@hardwario.com](mailto:ask@hardwario.com) nebo svému kontaktu v HARDWARIU.
2. **Potvrdíme řešení:** která zařízení a hodnoty se použijí, kdo dostane jaké zprávy a co je případně potřeba doplnit u zařízení nebo dashboardů.
3. **Postavíme ho v samostatném rule chainu** jen pro vaše zařízení a otestujeme na skutečných datech.
4. **Zapojíme ho až za uložení dat.** Vaše měření se vždy nejdřív uloží, takže vlastní pravidlo data nikdy neohrozí.
5. **Pozdější změny:** nové limity, příjemci nebo zařízení jsou pro nás krátký požadavek.

---

## Co si nastavíte sami {#what-you-can-set-up-yourself}

Některé věci rule chain nepotřebují a nastavíte je přímo ve svém účtu:

- **Notifikace** při překročení limitu nebo když zařízení přestane posílat data: viz [Notifikace](/apps/thingsboard/notifications-manager).
- **Dashboardy** pro vaše zařízení: viz [První dashboard](/apps/thingsboard/creating-dashboard).
- **Uživatelé a přístupy:** viz [Skupiny, role a oprávnění](/apps/thingsboard/users-managing).

:::info Dokumentace ThingsBoard
HARDWARIO Dashboards jsou postavené na platformě ThingsBoard. Podrobnosti najdete v oficiální dokumentaci ThingsBoard (anglicky): [Rule engine](https://thingsboard.io/docs/pe/user-guide/rule-engine/).
:::
