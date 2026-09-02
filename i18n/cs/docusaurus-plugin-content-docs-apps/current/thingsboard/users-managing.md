---
slug: users-managing
title: Správa uživatelů
description: "ThingsBoard je mimořádně silný v tom, že umožňuje úplně určit, co zákazník vidí a co ne, a přesně definovat, co v systému může a nemůže dělat. Tím zajistíte čisté a bezpečné prostředí pro všechny své uživatele."
---

import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Správa viditelnosti a oprávnění uživatelů {#managing-user-visibility-and-permissions}

ThingsBoard je mimořádně silný v tom, že umožňuje **úplně určit, co zákazník vidí a co ne**, a přesně definovat, co v systému může a nemůže dělat. Tím zajistíte čisté a bezpečné prostředí pro všechny své uživatele.

---

## Krok 1: Vytvoření uživatelských rolí {#step-1-creating-user-roles}

Prvním krokem je definovat role, které fungují jako sady oprávnění.

1.  V levém menu přejděte do sekce **Security** (poslední položka).
2.  Rozbalte ji a zvolte **Roles**.
3.  Novou roli vytvoříte kliknutím na **ikonu plus (+)** vpravo nahoře.
4.  Zadejte **Role Name**, **Description** a zvolte **Role Type**.

![Dialog Add Role s vyplněným názvem role a otevřenou nabídkou Role type s volbami Generic a Group](../../../../../apps/thingsboard/images/roles-2.png)

### Rozdíl mezi typy rolí: {#difference-between-role-types}
* **Group:** U tohoto typu určujete jen operace (například čtení, zápis), které uživatel může provádět. Tato role se ke konkrétní entitě (zařízení, dashboardu a podobně) váže až později, při nastavování uživatelských grup.
* **Generic:** Tady definujete přesně, co uživatel globálně může a nemůže. Pozor: Pokud tu povolíte přístup k „Devices", uvidí uživatel **všechna zařízení** daného zákazníka, ne jen konkrétní grupu.

<Tabs>
  <TabItem value="lte" label="Group">
![Dialog Add Role typu Group, kde Permissions obsahují jen povolené operace, zde Read](../../../../../apps/thingsboard/images/roles-3.png)
  </TabItem>
  <TabItem value="lora" label="Generic">
![Dialog Add Role typu Generic s oprávněními po zdrojích: Device s Read a Write, Dashboard s All](../../../../../apps/thingsboard/images/roles-4.png)
  </TabItem>
</Tabs>

**DŮLEŽITÉ (správa vlastního profilu):**
U uživatelů s omezeným přístupem doporučujeme vytvořit roli typu **Generic**, kde pro zdroj **Profile** povolíte operaci **All**. Přidáním této role do uživatelské grupy umožníte uživatelům měnit si vlastní heslo a údaje účtu.

![Role Generic Edit Profile s operací All nad zdrojem Profile, aby si uživatelé mohli spravovat vlastní účet](../../../../../apps/thingsboard/images/roles-6.png)

---

## Krok 2: Vytvoření uživatelských grup {#step-2-creating-user-groups}

Dále je potřeba vytvořit grupy, kterým přiřadíte výše vytvořené role.

1.  Přejděte do sekce **Users** a zvolte kartu **Groups**.
2.  Uvidíte výchozí grupy: *Customer Administrators* (plný přístup) a *Customer Users* (přístup ke všemu jen pro čtení).
3.  Klikněte vpravo nahoře na **ikonu plus (+)** a zadejte název a popis.

![Dialog Add entity group nad seznamem uživatelských grup s vyplněným názvem grupy a viditelnými výchozími grupami v pozadí](../../../../../apps/thingsboard/images/groups-2.png)

4.  Po vytvoření vstoupíte do nastavení grupy kliknutím na šipku vlevo od jejího názvu.
5.  Přejděte na kartu **Roles**.

![Panel s detailem uživatelské grupy otevřený na kartě Roles s prázdnou tabulkou User group roles a ikonou plus](../../../../../apps/thingsboard/images/groups-4.png)

### Přidání oprávnění do grupy: {#adding-permissions-to-the-group}
1.  Klikněte na **ikonu plus (+)** vlevo od vyhledávacího pole.
2.  Zvolte **Role Type** a konkrétní roli.
3.  Pokud jste zvolili typ role **Group**, musíte také určit:
    * **Group Owner:** Obvykle vy sami nebo konkrétní zákazník.
    * **Type:** Určete, na co pravidla platí (například *Device* nebo *Dashboard*).
    * **Entity Group:** Konkrétní grupa entit, ke které má uživatel mít přístup.

![Dialog Add group permission s typem role Group, rolí, vlastníkem grupy, typem Device a vybranou grupou entit](../../../../../apps/thingsboard/images/groups-6.png)

:::info
Své **grupy entit** musíte mít připravené předem. Vaše zařízení nebo dashboardy by tedy už měly být uspořádané do grup. V tomto kroku tyto grupy spárujete s uživatelskou grupou. Vytváření grup zařízení a dashboardů je podobné jako vytváření uživatelských grup.
:::

Pokud přidáváte roli typu **Generic** (třeba roli pro úpravu profilu), stačí zvolit jen roli a bude se globálně vztahovat na oprávnění účtu uživatele.

![Dialog Add group permission s typem role Generic, kde je potřeba zvolit jen samotnou roli](../../../../../apps/thingsboard/images/groups-7.png)

---

## Krok 3: Přidání uživatelů do grupy {#step-3-adding-users-to-the-group}

Uživatele do své nově nastavené grupy můžete přidat dvěma způsoby:

1.  **Noví uživatelé:** Přímo ve své grupě (na kartě Users) klikněte na **ikonu plus (+)**.

![Prázdná karta Users uživatelské grupy s ikonou plus v pravém horním rohu pro přidání nového uživatele](../../../../../apps/thingsboard/images/groups-3.png)

2.  **Existující uživatelé:** * Přejděte do hlavní sekce **Users** -> **Users**.
    * Klikněte na konkrétního uživatele.
    * Na kartě **Details** klikněte na tlačítko **Manage owner and groups**.
    * Zvolte požadovanou uživatelskou grupu a klikněte na **Update**.

![Dialog Manage owner and groups v detailu uživatele s otevřeným seznamem grup entit pro výběr uživatelské grupy](../../../../../apps/thingsboard/images/user-2.png)

---

## Krok 4: Vytváření a sdílení grup zařízení {#step-4-creating-and-sharing-device-groups}

Jak už bylo řečeno v předchozích krocích, abyste uživatelům dali přístup ke konkrétním zařízením a neukázali jim všechno, musíte použít **grupy zařízení**. ThingsBoard umožňuje flexibilní strukturu, kde jednu grupu zařízení lze nasdílet více uživatelským grupám (například aby stejná zařízení viděl koncový zákazník i váš interní servisní tým).

### Vytvoření grupy zařízení {#creating-a-device-group}
1. V levém menu přejděte do sekce **Entities** a zvolte **Devices**.
2. Přepněte na kartu **Groups**.
3. Kliknutím na **ikonu plus (+)** vpravo nahoře vytvořte novou grupu.
4. Zadejte **Name** a **Description** grupy a uložte ji.

### Přidání zařízení do grupy {#adding-devices-to-the-group}
1. Kliknutím na svou novou grupu zařízení ji otevřete.
2. Uvnitř grupy přejděte na kartu **Entities**.
3. Klikněte na **ikonu plus (+)** a zvolte konkrétní zařízení, která chcete zahrnout. *(Poznámka: Jedno zařízení může patřit do několika grup současně.)*

### Nasdílení grupy zařízení uživatelům {#sharing-the-device-group-with-users}
Jakmile je grupa zařízení naplněná, musíte k ní uživatelům dát přístup jejím propojením s uživatelskými grupami z kroku 2.

1. Vraťte se na **Users** -> **Groups** a otevřete svou konkrétní uživatelskou grupu.
2. Přejděte na kartu **Roles** a klikněte na **ikonu plus (+)**.
3. Zvolte typ role **Group** (například roli, která dává přístup jen pro čtení, nebo pro čtení i zápis).
4. Nastavte **Type** na *Device* a zvolte svou novou **grupu entit** (grupu zařízení).
5. Klikněte na **Add**.

:::tip
Tenhle proces sdílení můžete zopakovat u libovolného počtu uživatelských grup. Úplně stejnou grupu zařízení lze současně nasdílet zákazníkovi A (s právy jen pro čtení) i vašemu servisnímu týmu (s plnými právy)!
:::
