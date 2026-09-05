---
slug: assets
title: Assety
description: "Assety jsou logické kontejnery, které ve vašem prostředí ThingsBoard reprezentují objekty z reálného světa (budovy, podlaží, zóny nebo zařízení). Na rozdíl od zařízení (která reprezentují fyzický hardware odesílající data) slouží assety k organizaci…"
---

import Image from '@theme/IdealImage';

# Assety {#assets}

Assety jsou logické kontejnery, které ve vašem prostředí ThingsBoard reprezentují objekty z reálného světa (budovy, podlaží, zóny nebo zařízení). Na rozdíl od zařízení (která reprezentují fyzický hardware odesílající data) slouží assety k organizaci celkové struktury projektu a k určení, jak se data a přístupová práva rozdělují mezi vaše zákazníky.

---

## Co jsou assety a k čemu jsou dobré? {#what-are-assets-and-what-are-they-good-for}

**Hlavní přínosy assetů:**
- **Logická hierarchie:** Můžete vytvořit strukturu jako *region → město → ulice → budova*.
- **Škálovatelnost:** Místo správy stovek jednotlivých senzorů spravujete jediný asset (například „Hala A"), ke kterému jsou tyto senzory přiřazené.
- **Řízení přístupu:** Přístupová práva zákazníků lze definovat na úrovni assetu. Když asset se zákazníkem nasdílíte, může automaticky získat přístup k zařízením, která k němu patří (přes relace).
- **Abstrakce dashboardů:** Dashboardy mohou být dynamické. Jediný dashboard umí přizpůsobit svá data podle toho, který asset uživatel zvolí.

---

## Jak vytvořit asset {#how-to-create-an-asset}

### Krok 1: Přihlaste se {#step-1-log-in}

Přihlaste se do ThingsBoardu jako *Customer Administrator*.

### Krok 2: Přejděte na Assets {#step-2-navigate-to-assets}

V levém navigačním menu přejděte na **Entities** → **Assets**.

### Krok 3: Přidejte nový asset {#step-3-add-a-new-asset}

Klikněte vpravo nahoře na ikonu **„+"** a zvolte **Add new asset**.

![Prázdný seznam Assets v ThingsBoardu se šipkou na ikonu plus pro přidání nového assetu](../../../../../apps/thingsboard/images/assets-1.png)

### Krok 4: Vyplňte údaje {#step-4-fill-in-the-details}

Zadejte informace o assetu:
- **Name:** Název assetu (například *Komplex Barrandov*).
- **Asset Profile:** Zvolte profil (výchozí je *default*). Profily určují pravidla zpracování dat.
- **Label:** Volitelný label pro lepší organizaci a filtrování.

![Dialog Add asset s poli name, label, výchozím profilem assetu a vlastníkem, se šipkou na tlačítko Add](../../../../../apps/thingsboard/images/assets-2.png)

### Krok 5: Uložte {#step-5-save}

Klikněte na **Add**. Asset je vytvořený.

### Krok 6: Přidejte relace (volitelně) {#step-6-add-relations-optional}

Na kartě **Relations** můžete vytvořit relace k jiným zařízením nebo k nadřazeným assetům (například relaci „Contains" směřující dolů k vašim senzorům).

![Dialog Add relation na kartě Relations assetu s typem relace Contains a zařízením zvoleným jako cílová entita](../../../../../apps/thingsboard/images/assets-3.png)

---

## Hierarchie a sdílení s podřízenými zákazníky {#hierarchy-and-sharing-with-sub-customers}

Assety jsou klíčovým prvkem pro **multi-tenancy** (správu více zákazníků v jednom prostředí).

### Přiřazování zařízení {#assigning-devices}

Do assetů můžete pomocí relací „vložit" různá zařízení. Například asset s názvem „Budova A" může obsahovat 10 konkrétních senzorů (zařízení) instalovaných v ní.

### Sdílení se zákazníky {#sharing-with-customers}

Pokud máte podřízeného zákazníka (Customer), můžete s ním nasdílet celý asset. ThingsBoard pak automaticky zajistí, že uživatelé pod tímto zákazníkem tento asset a všechno, co s ním souvisí, uvidí.

### Dynamické pohledy dashboardu {#dynamic-dashboard-views}

Díky téhle struktuře můžete pro všechny zákazníky vytvořit **jediný univerzální dashboard**:
- **Zákazník A** se přihlásí a ve výběru zdroje (například ve widgetu *Entities Hierarchy*) vidí jen své vlastní assety a zařízení, která jsou k nim přiřazená.
- **Zákazník B** se přihlásí do úplně stejného dashboardu, ale vidí zcela jiná data (jen svoje).
- **Nadřazený zákazník nebo tenant admin**, který má přístup ke všemu, vidí ve stejném dashboardu celý strom všech zákazníků a všech assetů, což je ideální pro globální přehled a údržbu.
