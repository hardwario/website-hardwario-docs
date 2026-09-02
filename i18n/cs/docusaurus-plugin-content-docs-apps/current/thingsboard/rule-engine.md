---
slug: rule-engine
title: Rule Engine
description: "Rule Engine je vizuální programovací systém ThingsBoardu pro zpracování příchozích zpráv ze zařízení. Rule Chain je graf nebo vývojový diagram, který definuje logiku zpracování zpráv (telemetrie, atributy, události). Skládá se z uzlů — stavebních…"
---

import Image from '@theme/IdealImage';

# Rule Engine {#rule-engine}

Rule Engine je vizuální programovací systém ThingsBoardu pro zpracování příchozích zpráv ze zařízení. **Rule Chain** je graf nebo vývojový diagram, který definuje logiku zpracování zpráv (telemetrie, atributy, události). Skládá se z **uzlů** — stavebních bloků, které provádějí konkrétní akci (například uložení do databáze, odeslání e-mailu) — a **relací**, tedy spojení mezi uzly, která podle výsledku určují směr toku dat (*Success*, *Failure*, *True*, *False*).

---

## Případy použití {#use-cases}

Rule Engine zachytává veškerou komunikaci mezi zařízeními a serverem, takže nad těmito daty můžete stavět automatizaci. K nejčastějším použitím patří:

- **Transformace dat a matematické výpočty:** Uzlem *Script* (JavaScript) můžete převádět teploty z Fahrenheita na Celsia, sečíst spotřebu z více fází do jedné proměnné nebo odfiltrovat chybné hodnoty (například ignorovat teploty nad 1000 °C).
- **Vyvolávání a správa alarmů:** Příchozí telemetrii můžete průběžně sledovat. Pokud hodnota překročí nastavený prah, systém může automaticky vytvořit alarm (uzlem *Create Alarm*). Až se hodnoty vrátí k normálu, může se alarm automaticky zrušit (*Clear Alarm*).
- **Vlastní události a notifikace:** Odesílání systémových výstrah (push notifikací do mobilní aplikace) nebo e-mailů a SMS administrátorům, když se zařízení odpojí.
- **Integrace třetích stran (externí API):** Uzel *REST API Call* umožňuje posílat data ze senzorů do vašich vlastních externích systémů (ERP, CRM) nebo naopak stahovat doplňková data, například předpověď počasí.
- **Zpracování RPC (Remote Procedure Call):** Reakce na příkazy odeslané z dashboardu (uživatel například klikne na tlačítko „Otevřít ventil" a Rule Chain zajistí, že se tento příkaz bezpečně nasměruje a doručí do hardwaru).

---

## Jak vytvořit vlastní Rule Chain {#how-to-create-a-custom-rule-chain}

1. **Přejděte** v levém menu do sekce **Rule Chains**.
2. **Klikněte na ikonu „+"** vpravo nahoře a zvolte **Create new rule chain**.
3. **Pojmenujte ji** (například *Zpracování teploty jeřábu*) a uložte.
4. Kliknutím na název otevřete **editor Rule Engine** (vizuální plochu).
5. V levém panelu najdete knihovnu uzlů. **Přetáhněte** požadovaný uzel (například *Filter -> Script*) na plochu.
6. Dvojklikem na uzel nastavíte jeho logiku (například napíšete JavaScriptový úryvek: `return msg.temperature > 50;`).
7. **Spojte uzly:** Klikněte na šedý bod na hraně prvního uzlu a tažením veďte linku k druhému uzlu. Systém vás vyzve k volbě typu relace (například *True*, pokud teplota překročila 50).
8. Po dokončení úprav **vždy klikněte na ikonu fajfky (Apply changes)** v pravém dolním rohu, aby se řetězec uložil a nasadil.

---

## ⚠️ Práce s Root Rule Chain {#️-working-with-the-root-rule-chain}

Při vytvoření instance nebo tenanta ThingsBoardu se automaticky vygeneruje **Root Rule Chain**. Ta funguje jako hlavní vstupní brána — **každá jednotlivá zpráva z každého zařízení prochází nejprve tímto řetězcem**.

### Na co si dát pozor {#what-to-be-careful-about}

1. **Nikdy nemažte uzly „Save Timeseries" a „Save Client Attributes":** Tyto uzly zajišťují vlastní zápis dat ze senzorů do databáze ThingsBoardu. Pokud je omylem smažete nebo přerušíte cestu k nim, vaše zařízení budou vypadat online, ale **na dashboardech se neobjeví žádná data**, protože se neukládají!
2. **Nezatěžujte Root Rule Chain složitými skripty:** Pokud v JavaScriptovém uzlu uvnitř Root Rule Chain uděláte chybu (například nekonečnou smyčku nebo syntaktickou chybu), riskujete zablokování ukládání dat pro absolutně všechna zařízení ve svém systému.

### Doporučený postup: bezpečné úpravy {#best-practice-safe-editing}

Abyste nerozbili základní ukládání dat, postupujte takto (zapouzdření):

1. Neupravujte svou vlastní logiku přímo v *Root Rule Chain*.
2. Vytvořte novou samostatnou Rule Chain (například *Alarmy jeřábu*) podle postupu výše. Všechny své výpočty, e-maily a alarmy postavte a otestujte bezpečně v tomto izolovaném řetězci.
3. Pak přejděte do *Root Rule Chain*, vezměte uzel **Rule Chain** (z kategorie *Flow*) a připojte ho hned za uzel `Save Timeseries` relací **Success**.
4. V konfiguraci tohoto nového uzlu zvolte svou právě vytvořenou rule chain *Alarmy jeřábu*.

Data se tím nejdřív bezpečně uloží do databáze a teprve pak se kopie předá do vašeho vlastního řetězce, kde můžete experimentovat bez rizika pro stabilitu celého systému.
