---
slug: application-customization
title: Přizpůsobení aplikace
---
import Image from '@theme/IdealImage';

# Přizpůsobení aplikace {#application-customization}

Tento článek popisuje postup úpravy existující katalogové aplikace v **CHESTER SDK**. Možností je několik; tento článek ukazuje tu, při které vývojář co nejsnáze drží krok s aktualizacemi **CHESTER SDK**.

## Vytvoření forku aplikace {#creating-application-fork}

Tato kapitola ukazuje, jak vytvořit **fork katalogové aplikace**. Jako příklad použijeme katalogovou aplikaci **CHESTER Current**, postup ale platí pro cokoli v **CHESTER SDK**. Klidně vylepšete i ovladače přímo ve stromu zdrojových kódů.

:::tip

Pokud je vaše změna dostatečně obecná a mohla by se hodit i dalším, domluvte se s námi na jejím začlenění do upstreamu. Kód, který používá víc lidí, bývá lépe otestovaný, a jeho další údržba vás nejspíš už nebude zatěžovat.

:::

Postup spočívá v naklonování repozitáře **Git** a vytvoření vlastní větve **Git** z větve `main` (lokální větev `main` se bude synchronizovat s větví `main` na vzdáleném serveru **CHESTER SDK**).

Níže je zkrácená sada příkazů z instalačního postupu **CHESTER SDK** na [**Ubuntu**](./installation-on-ubuntu.md). Jediný rozdíl: jako výchozí bod **NEPOUŽÍVÁME** repozitář **Git** `skeleton`, ale jako kořenový repozitář použijeme přímo **CHESTER SDK**.

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

1. V tomto repozitáři **Git** přejmenujte **Git remote** `origin`, který ukazuje na **HARDWARIO**, na `upstream`:

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

   Příkaz výše jen tak nekopírujte: adresu nahraďte skutečnou adresou svého **Git** serveru.

   :::

1. Odešlete větev `main` právě inicializovaného repozitáře **CHESTER SDK** do svého remote:

   ```
   git push origin main
   ```

1. Vytvořte novou větev Git pro vylepšenou aplikaci **CHESTER Current**:

   ```
   git switch -c awesome-company/current
   ```

1. Implementujte požadované změny (např. v adresáři `chester/application/current`).

   :::tip

   Výsledkem bude jeden nebo více nových commitů ve větvi `awesome-company/current`.

   :::

1. Odešlete změny ve své větvi **Git** na svůj **Git** remote:

   ```
   git push origin awesome-company/current
   ```

Teď máte v **lokálním** repozitáři (na disku) i na svém **Git** serveru větev `main`, která je kopií větve `main` z **CHESTER SDK** od **HARDWARIO** na **GitHubu**. Na svém **Git** remote `origin` máte navíc novou větev **Git** s požadovanými změnami.

## Aktualizace aplikace {#updating-your-application}

Změny ve své aplikaci pravidelně synchronizujte s nejnovější verzí **CHESTER SDK**. Postup aktualizace popisují následující kroky.

1. Ve větvi **Git** `awesome-company/current` stáhněte nejnovější změny z **CHESTER SDK**:

   ```
   git fetch upstream main:main
   ```

   :::tip

   Do větve `main` tak může přibýt několik nových commitů **Git**.

   :::

1. Nyní můžete svou větev přerovnat (rebase) na nejnovější změny ve větvi `main`:

   ```
   git rebase main
   ```

   :::tip

   Vaše commity **Git** se znovu aplikují nad commity z větve `main`.

   :::

   :::caution

   Občas jsou nové aktualizace **CHESTER SDK** v konfliktu s vašimi změnami. Pokud **Git** konflikty nevyřeší automaticky, provede vás jejich řešením. Máte-li víc commitů **Git**, řešíte konflikty u každého zvlášť. Proto je někdy jednodušší udržovat změny jako jediný commit, pokud není příliš velký.

   :::

1. Pak odešlete aktualizovanou větev do svého **Git** remote:

   ```
   git push origin awesome-company/current -f
   ```

   :::tip

   Všimněte si parametru `-f` (force) na konci příkazu. Příkaz `git rebase` přepsal historii Git a lokální větev se **rozešla** se vzdálenou větví. Parametr proto vzdálenému serveru **Git** říká, že má větev přepsat.

   :::

Tímto postupem udržíte svou práci v souladu s **CHESTER SDK**. Své změny si můžete představit jako sadu patchů, které se aplikují nad větví `main` **CHESTER SDK**.
