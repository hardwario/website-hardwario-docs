---
slug: application-customization
title: Přizpůsobení aplikace
description: "Tento článek popisuje postup, když potřebujete upravit existující katalogovou aplikaci v CHESTER SDK. Vývojář to může udělat několika způsoby, ale cílem tohoto článku je ukázat proces, který představuje co nejmenší tření, když vývojář potřebuje držet…"
---
import Image from '@theme/IdealImage';

# Přizpůsobení aplikace {#application-customization}

Tento článek popisuje postup, když potřebujete upravit existující katalogovou aplikaci v **CHESTER SDK**. Vývojář to může udělat několika způsoby, ale cílem tohoto článku je ukázat proces, který představuje co nejmenší tření, když vývojář potřebuje držet krok s aktualizacemi **CHESTER SDK**.

## Vytvoření forku aplikace {#creating-application-fork}

Tato kapitola vás provede procesem, jak vytvořit **fork katalogové aplikace**. Jako příklad použijeme katalogovou aplikaci **CHESTER Current**, ale postup lze aplikovat na cokoliv v **CHESTER SDK** – klidně vylepšete i ovladače přímo ve stromu zdrojových kódů.

:::tip

Pokud je vaše změna dostatečně obecná a věříte, že by z ní mohl mít prospěch kdokoliv, promluvte si s námi o jejím začlenění do upstreamu. Vystavení vašeho kódu širšímu publiku přináší výhodu potenciálně vyšší míry testování a velmi pravděpodobně budete mít ruce volné od jeho další údržby.

:::

Tento postup je založen na naklonování repozitáře **Git** a vytvoření vlastní větve **Git** z větve `main` (lokální větev `main` bude synchronizována s větví `main` ze vzdáleného serveru **CHESTER SDK**).

Níže je minimalizovaná sada příkazů převzatá z instalačního postupu **CHESTER SDK** na [**Ubuntu**](./installation-on-ubuntu.md). Jediný rozdíl je v tom, že jako výchozí bod **NEPOUŽÍVÁME** repozitář **Git** `skeleton`, ale jako kořenový repozitář používáme samotné **CHESTER SDK**.

1. Nastavte pracovní prostor **West** s **CHESTER SDK**:

   ```
   mkdir chester-app && cd chester-app
   python3 -m venv venv
   source venv/bin/activate
   pip install --upgrade pip
   pip install west
   west init -m git@github.com:hardwario/chester-sdk.git --manifest-rev main
   west config build.board chester
   west update
   west packages pip --install
   west zephyr-export
   west sdk install -t arm-zephyr-eabi
   ```

1. Přepněte se do adresáře repozitáře **CHESTER SDK**:

   ```
   cd chester
   ```

1. V tomto repozitáři **Git** změňte **Git remote** s názvem `origin`, který ukazuje na **HARDWARIO**, na `upstream`:

   ```
   git remote rename origin upstream
   ```

   :::tip

   Děláme to proto, že v následujících krocích nastavíme jako `origin` váš vlastní **Git** remote.

   :::

1. Na firemním Git serveru vytvořte prázdný repozitář (např. `chester-sdk`).

1. Přidejte **SSH** cestu k firemnímu **Git** serveru jako nový remote `origin`:

   ```
   git remote add origin git@gitlab.awesome-company.com:chester-sdk.git
   ```

   :::caution

   Příkaz výše jen tak nekopírujte – adresu nahraďte tou skutečnou, kterou poskytuje váš **Git** server.

   :::

1. Odešlete větev `main` nedávno inicializovaného repozitáře **CHESTER SDK** na svůj remote:

   ```
   git push origin main
   ```

1. Vytvořte novou větev Git pro vylepšenou aplikaci **CHESTER Current**:

   ```
   git switch -c awesome-company/current
   ```

1. Implementujte požadované změny (např. v adresáři `chester/application/current`).

   :::tip

   Výsledkem bude jeden až mnoho nových commitů nad větví `awesome-company/current`.

   :::

1. Odešlete změny ve své větvi **Git** na svůj **Git** remote:

   ```
   git push origin awesome-company/current
   ```

V tuto chvíli budete mít ve svém **lokálním** repozitáři (na disku) i na svém **Git** serveru větev `main`, která kopíruje větev `main` z **CHESTER SDK** hostovaného na **GitLab** od **HARDWARIO**. Kromě toho budete mít na svém **Git** remote, označovaném jako `origin`, novou větev **Git** s požadovanými změnami.

## Aktualizace vaší aplikace {#updating-your-application}

Doporučujeme pravidelně synchronizovat změny vlastní aplikace s nejnovější verzí **CHESTER SDK**. Následující kroky vás provedou postupem aktualizace.

1. Za předpokladu, že jste ve větvi **Git** `awesome-company/current`, získejte nejnovější změny v **CHESTER SDK**:

   ```
   git fetch upstream main:main
   ```

   :::tip

   V tuto chvíli může větev `main` obdržet několik nových commitů **Git**.

   :::

1. Nyní můžete svou větev přerovnat (rebase) na nejnovější změny ve větvi `main`:

   ```
   git rebase main
   ```

   :::tip

   Vaše commity **Git** budou přehrány nad commity z větve `main`.

   :::

   :::caution

   Občas mohou být nedávné aktualizace v **CHESTER SDK** v konfliktu s vašimi změnami. Pokud **Git** nedokáže konflikty vyřešit automaticky, provede vás jejich řešením. Pokud jste vytvořili více commitů **Git**, můžete je řešit jeden po druhém. Z tohoto důvodu je někdy jednodušší udržovat své změny jako jediný commit, pokud má změna rozumnou velikost.

   :::

1. V dalším kroku odešlete svou větev s nedávnými aktualizacemi na svůj **Git** remote:

   ```
   git push origin awesome-company/current -f
   ```

   :::tip

   Všimněte si parametru `-f` (force) na konci příkazu. Je to proto, že historie Git byla přepsána příkazem `git rebase` a vaše lokální větev se **rozešla** s vaší vzdálenou větví. Tento parametr říká vzdálenému serveru **Git**, aby vynutil přepsání větve.

   :::

Výše uvedený postup by vám měl pomoci udržet vaši práci synchronizovanou s **CHESTER SDK**. Na svou práci můžete pohlížet jako na sadu patchů, které se přehrávají nad větví `main` **CHESTER SDK**.
