---
slug: rule-engine
title: Rule Engine
---

import Image from '@theme/IdealImage';

# Rule Engine {#rule-engine}

Rule Engine je v ThingsBoard systém vizuálního programování pro zpracování příchozích zpráv ze zařízení. **Rule Chain** (řetězec pravidel) je graf neboli vývojový diagram, který určuje, jak se mají zprávy (telemetrie, atributy, události) zpracovat. Skládá se z **uzlů**, stavebních bloků, které provádějí konkrétní akci (například uložení do databáze, odeslání e-mailu), a **relací**, tedy spojení mezi uzly, která podle výsledku určují směr toku dat (*Success*, *Failure*, *True*, *False*).

---

## Typické využití {#use-cases}

Rule Engine zachytává veškerou komunikaci mezi zařízeními a serverem a nad těmito daty můžete stavět automatizaci. K nejčastějším použitím patří:

- **Transformace dat a matematické výpočty:** Uzlem *Script* (JavaScript) můžete převádět teploty z Fahrenheita na Celsia, sečíst spotřebu z více fází do jedné proměnné nebo odfiltrovat chybné hodnoty (například ignorovat teploty nad 1000 °C).
- **Vyvolávání a správa alarmů:** Příchozí telemetrii můžete průběžně sledovat. Pokud hodnota překročí nastavený limit, systém může automaticky vytvořit alarm (uzlem *Create Alarm*). Až se hodnoty vrátí k normálu, může se alarm automaticky zrušit (*Clear Alarm*).
- **Vlastní události a notifikace:** Odesílání systémových upozornění (push notifikací do mobilní aplikace) nebo e-mailů a SMS administrátorům, když se zařízení odpojí.
- **Integrace třetích stran (externí API):** Uzlem *REST API Call* posíláte data ze senzorů do vlastních externích systémů (ERP, CRM) nebo naopak stahujete doplňková data, například předpověď počasí.
- **Zpracování RPC (Remote Procedure Call):** Reakce na příkazy odeslané z dashboardu (uživatel například klikne na tlačítko „Otevřít ventil“ a Rule Chain příkaz bezpečně nasměruje a doručí do hardwaru).

---

## Jak vytvořit vlastní Rule Chain {#how-to-create-a-custom-rule-chain}

1. **Přejděte** v levém menu do sekce **Rule Chains**.
2. **Klikněte na ikonu „+“** vpravo nahoře a zvolte **Create new rule chain**.
3. **Pojmenujte ji** (například *Zpracování teploty jeřábu*) a uložte.
4. Kliknutím na název otevřete **editor Rule Engine** (vizuální plochu).
5. V levém panelu najdete knihovnu uzlů. **Přetáhněte** požadovaný uzel (například *Filter -> Script*) na plochu.
6. Dvojklikem na uzel nastavíte jeho logiku (například napíšete úryvek v JavaScriptu: `return msg.temperature > 50;`).
7. **Spojte uzly:** Klikněte na šedý bod na hraně prvního uzlu a tažením veďte linku k druhému uzlu. Systém vás vyzve k volbě typu relace (například *True*, pokud teplota překročila 50).
8. Po dokončení úprav **vždy klikněte na ikonu zaškrtnutí (Apply changes)** v pravém dolním rohu, aby se řetězec uložil a nasadil.

---

## ⚠️ Práce s Root Rule Chain {#️-working-with-the-root-rule-chain}

Při vytvoření instance nebo tenanta ThingsBoard se automaticky vygeneruje **Root Rule Chain**. Funguje jako hlavní vstup: **každá zpráva z každého zařízení prochází nejdřív tímto řetězcem**.

### Na co si dát pozor {#what-to-be-careful-about}

1. **Nikdy nemažte uzly „Save Timeseries“ a „Save Client Attributes“:** Tyto uzly zapisují data ze senzorů do databáze ThingsBoard. Pokud je omylem smažete nebo přerušíte cestu k nim, zařízení se budou jevit jako online, ale **na dashboardech se neobjeví žádná data**, protože se neukládají.
2. **Nezatěžujte Root Rule Chain složitými skripty:** Pokud v JavaScriptovém uzlu uvnitř Root Rule Chain uděláte chybu (například nekonečnou smyčku nebo syntaktickou chybu), můžete zablokovat ukládání dat úplně všech zařízení v systému.

### Doporučený postup: bezpečné úpravy {#best-practice-safe-editing}

Abyste nerozbili základní ukládání dat, postupujte takto (zapouzdření):

1. Vlastní logiku nepište přímo do *Root Rule Chain*.
2. Vytvořte novou samostatnou Rule Chain (například *Alarmy jeřábu*) podle postupu výše. Všechny výpočty, e-maily a alarmy v tomto izolovaném řetězci bezpečně sestavte a otestujte.
3. Pak přejděte do *Root Rule Chain*, vezměte uzel **Rule Chain** (z kategorie *Flow*) a připojte ho hned za uzel `Save Timeseries` relací **Success**.
4. V konfiguraci tohoto nového uzlu zvolte právě vytvořenou Rule Chain *Alarmy jeřábu*.

Data se tím nejdřív bezpečně uloží do databáze a teprve pak se kopie předá do vlastního řetězce, kde můžete experimentovat bez rizika pro stabilitu celého systému.
