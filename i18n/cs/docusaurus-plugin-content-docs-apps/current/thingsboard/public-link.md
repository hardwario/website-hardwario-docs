---
slug: public-link
title: Veřejný odkaz
---

import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Jak vytvořit veřejný odkaz jen pro čtení {#how-to-create-a-read-only-public-link}

Tento návod vysvětluje, jak nasdílet dashboard ThingsBoard veřejnou URL. Externí uživatelé si díky tomu můžou dashboard a jeho telemetrická data prohlédnout bez účtu v platformě ThingsBoard. Tento veřejný přístup je ve výchozím stavu striktně **jen pro čtení**, takže vaše data zůstávají v bezpečí.

---

:::info
#### ⚠️ Důležitá poznámka: práce s podřízenými zákazníky {#️-important-note-working-with-sub-customers}

Pokud tento veřejný odkaz nastavujete pro konkrétního podřízeného zákazníka, jeho skupiny zařízení ani dashboardů možná neuvidíte, dokud jste přihlášení jako Tenant Administrator. 

Řešením je přihlásit se jako **Customer Administrator** daného zákazníka:
1. **Přejděte** v levém menu na **Customers**.
2. **Najděte** zákazníka, klikněte na ikonu **Manage customer users** a přihlaste se jako některý z jeho administrátorů. 
3. **Náhradní postup:** Pokud podřízený zákazník ještě žádný účet Customer Administrator nemá, můžete si vytvořit dočasný testovací profil. Nemusíte použít skutečnou e-mailovou adresu (například `test@temp.local`). Uživatele vytvořte, přihlaste se jako on, projděte tento návod a dočasný účet pak smažte.

*(Případně, pokud potřebujete jen získat veřejný odkaz bez přihlašování za podřízeného zákazníka, podívejte se na [**tip níže**](#-pro-tip-how-to-get-the-link-without-logging-in-as-a-sub-customer)!)*
:::
---

## Krok 1: Zveřejněte skupinu zařízení {#step-1-make-the-device-group-public}

Aby dashboard správně zobrazoval data, potřebuje veřejný uživatel přístup pro čtení k zařízením, která dashboard plní. 

**(Volitelně) Jak vytvořit novou skupinu zařízení:**
Pokud ještě žádnou konkrétní skupinu nemáte, můžete si ji vytvořit:
1. **Přejděte** v levém menu na **Devices -> Groups**.
2. **Klikněte** vpravo nahoře na ikonu **„+“** (plus).
3. **Zadejte** název nové skupiny a klikněte na **Add**.

**Zveřejnění skupiny zařízení:**
1. **Přejděte** v levém menu na **Devices -> Groups**.

![Seznam zařízení se zvýrazněnou kartou Groups v horní liště](../../../../../apps/thingsboard/images/public-link-3.png)

2. **Najděte** skupinu zařízení obsahující zařízení, která chcete na dashboardu zobrazit.
   > **Tip:** Můžete použít vlastní skupinu, nebo výchozí skupinu **„All“**. Když zveřejníte skupinu „All“, budou se veřejným odkazem automaticky zobrazovat i všechna zařízení, která tomuto zákazníkovi přidáte v budoucnu, bez dalšího nastavování.
3. **Klikněte** na **ikonu sdílení** (ikona se třemi spojenými body) na pravé straně řádku skupiny. **Případně** klikněte na řádku na ikonu šipky/úpravy a zvolte **„Make entity group public“**.
4. **Výsledek:** ThingsBoard automaticky přiřadí veřejnému uživateli systému oprávnění jen pro čtení k této skupině zařízení.

![Seznam skupin zařízení s zakroužkovanou ikonou sdílení u skupiny All a zobrazeným popiskem Make public](../../../../../apps/thingsboard/images/public-link-4.png)

---

## Krok 2: Zveřejněte skupinu dashboardů {#step-2-make-the-dashboard-group-public}

Dále je potřeba nasdílet samotný dashboard.

**(Volitelně) Jak vytvořit novou skupinu dashboardů:**
Pokud pro své dashboardy ještě žádnou konkrétní skupinu nemáte:
1. **Přejděte** v levém menu na **Dashboards -> Groups**.
2. **Klikněte** vpravo nahoře na ikonu **„+“** (plus).
3. **Zadejte** název nové skupiny a klikněte na **Add**.

**Zveřejnění skupiny dashboardů:**
1. **Přejděte** v levém menu na **Dashboards -> Groups**.

![Seznam dashboardů se zvýrazněnou kartou Groups v horní liště](../../../../../apps/thingsboard/images/public-link-1.png)

2. **Najděte** skupinu dashboardů, která obsahuje dashboard, jejž chcete nasdílet.
3. **Klikněte** na **ikonu sdílení** (ikona se třemi spojenými body) na pravé straně řádku skupiny. **Případně** klikněte na řádku na ikonu šipky/úpravy a zvolte **„Make entity group public“**.

![Seznam skupin dashboardů s zakroužkovanou ikonou sdílení u skupiny All a zobrazeným popiskem Make public](../../../../../apps/thingsboard/images/public-link-2.png)

---

## Krok 3: Získejte veřejný odkaz {#step-3-obtain-the-public-link}

Teď, když jsou veřejná zařízení i dashboard, můžete vygenerovat a nasdílet funkční URL.

1. **Zůstaňte** v sekci **Dashboards -> Groups**.
2. **Klikněte** přímo na **název** skupiny dashboardů, kterou jste právě zveřejnili. Skupina se otevře a zobrazí seznam všech dashboardů v ní.
3. **Najděte** konkrétní dashboard, který chcete nasdílet.
4. **Klikněte** na první ikonu na pravé straně řádku dashboardu, **ikonu řetězu (🔗)** s popiskem „Public dashboard link“.
5. **Výsledek:** URL je nyní ve vaší schránce. 

Tento odkaz můžete poslat svým klientům nebo uživatelům. Kdokoli s tímto odkazem si může dashboard a jeho data v reálném čase zobrazit přímo v prohlížeči, bez přihlašování.

![Obsah skupiny dashboardů se zakroužkovanou ikonou řetězu; popisek Public dashboard link zkopíruje URL](../../../../../apps/thingsboard/images/public-link-5.png)


## 💡 Tip: jak získat odkaz bez přihlašování za podřízeného zákazníka {#-pro-tip-how-to-get-the-link-without-logging-in-as-a-sub-customer}

Pokud pracujete na úrovni nadřazeného zákazníka (Tenant Administrator) a chcete veřejný odkaz získat bez otravného přihlašování za administrátora podřízeného zákazníka, použijte tuhle zkratku:

1. **Přejděte** do svého hlavního seznamu **Dashboards** (nebo Devices), kde vidíte všechny dashboardy a zařízení v celém systému, včetně těch patřících podřízeným zákazníkům.
2. **Najděte** konkrétní dashboard, který chcete nasdílet.
3. **Najděte** na řádku toho dashboardu sloupec **Groups**.
4. **Klikněte** přímo na název skupiny v tomto sloupci.

![Hlavní seznam dashboardů se šipkou na název skupiny Public ve sloupci Groups u dashboardu podřízeného zákazníka](../../../../../apps/thingsboard/images/public-link-6.png)

5. **Výsledek:** Přesměruje vás to přímo na stránku s obsahem skupiny. Odtud už snadno kliknete na **ikonu řetězu (🔗)** a veřejný odkaz zkopírujete, přesně jak popisuje [**krok 3**](#step-3-obtain-the-public-link) výše. 

![Obsah skupiny dashboardů se zakroužkovanou ikonou řetězu; popisek Public dashboard link zkopíruje URL](../../../../../apps/thingsboard/images/public-link-5.png)
