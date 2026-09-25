---
slug: users-managing
title: Správa uživatelů
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
* **Group:** U tohoto typu určujete jen operace (například čtení, zápis), které uživatel může provádět. Tato role se ke konkrétní entitě (zařízení, dashboardu a podobně) váže až později, při nastavování uživatelských skupin.
* **Generic:** Tady definujete přesně, co uživatel globálně může a nemůže. Pozor: Pokud tu povolíte přístup k „Devices“, uvidí uživatel **všechna zařízení** daného zákazníka, ne jen konkrétní skupinu.

<Tabs>
  <TabItem value="lte" label="Group">
![Dialog Add Role typu Group, kde Permissions obsahují jen povolené operace, zde Read](../../../../../apps/thingsboard/images/roles-3.png)
  </TabItem>
  <TabItem value="lora" label="Generic">
![Dialog Add Role typu Generic s oprávněními po zdrojích: Device s Read a Write, Dashboard s All](../../../../../apps/thingsboard/images/roles-4.png)
  </TabItem>
</Tabs>

**DŮLEŽITÉ (správa vlastního profilu):**
U uživatelů s omezeným přístupem doporučujeme vytvořit roli typu **Generic**, kde pro zdroj **Profile** povolíte operaci **All**. Přidáním této role do uživatelské skupiny umožníte uživatelům měnit si vlastní heslo a údaje účtu.

![Role Generic Edit Profile s operací All nad zdrojem Profile, aby si uživatelé mohli spravovat vlastní účet](../../../../../apps/thingsboard/images/roles-6.png)

---

## Krok 2: Vytvoření uživatelských skupin {#step-2-creating-user-groups}

Dále je potřeba vytvořit skupiny, kterým přiřadíte výše vytvořené role.

1.  Přejděte do sekce **Users** a zvolte kartu **Groups**.
2.  Uvidíte výchozí skupiny: *Customer Administrators* (plný přístup) a *Customer Users* (přístup ke všemu jen pro čtení).
3.  Klikněte vpravo nahoře na **ikonu plus (+)** a zadejte název a popis.

![Dialog Add entity group nad seznamem uživatelských skupin s vyplněným názvem skupiny a viditelnými výchozími skupinami v pozadí](../../../../../apps/thingsboard/images/groups-2.png)

4.  Po vytvoření vstoupíte do nastavení skupiny kliknutím na šipku vlevo od jejího názvu.
5.  Přejděte na kartu **Roles**.

![Panel s detailem uživatelské skupiny otevřený na kartě Roles s prázdnou tabulkou User group roles a ikonou plus](../../../../../apps/thingsboard/images/groups-4.png)

### Přidání oprávnění do skupiny: {#adding-permissions-to-the-group}
1.  Klikněte na **ikonu plus (+)** vlevo od vyhledávacího pole.
2.  Zvolte **Role Type** a konkrétní roli.
3.  Pokud jste zvolili typ role **Group**, musíte také určit:
    * **Group Owner:** Obvykle vy sami nebo konkrétní zákazník.
    * **Type:** Určete, na co pravidla platí (například *Device* nebo *Dashboard*).
    * **Entity Group:** Konkrétní skupina entit, ke které má uživatel mít přístup.

![Dialog Add group permission s typem role Group, rolí, vlastníkem skupiny, typem Device a vybranou skupinou entit](../../../../../apps/thingsboard/images/groups-6.png)

:::info
Své **skupiny entit** musíte mít připravené předem. Vaše zařízení nebo dashboardy by tedy už měly být uspořádané do skupin. V tomto kroku tyto skupiny spárujete s uživatelskou skupinou. Vytváření skupin zařízení a dashboardů je podobné jako vytváření uživatelských skupin.
:::

Pokud přidáváte roli typu **Generic** (třeba roli pro úpravu profilu), stačí zvolit jen roli a bude se globálně vztahovat na oprávnění účtu uživatele.

![Dialog Add group permission s typem role Generic, kde je potřeba zvolit jen samotnou roli](../../../../../apps/thingsboard/images/groups-7.png)

---

## Krok 3: Přidání uživatelů do skupiny {#step-3-adding-users-to-the-group}

Uživatele do své nově nastavené skupiny můžete přidat dvěma způsoby:

1.  **Noví uživatelé:** Přímo ve své skupině (na kartě Users) klikněte na **ikonu plus (+)**.

![Prázdná karta Users uživatelské skupiny s ikonou plus v pravém horním rohu pro přidání nového uživatele](../../../../../apps/thingsboard/images/groups-3.png)

2.  **Existující uživatelé:** * Přejděte do hlavní sekce **Users** -> **Users**.
    * Klikněte na konkrétního uživatele.
    * Na kartě **Details** klikněte na tlačítko **Manage owner and groups**.
    * Zvolte požadovanou uživatelskou skupinu a klikněte na **Update**.

![Dialog Manage owner and groups v detailu uživatele s otevřeným seznamem skupin entit pro výběr uživatelské skupiny](../../../../../apps/thingsboard/images/user-2.png)

---

## Krok 4: Vytváření a sdílení skupin zařízení {#step-4-creating-and-sharing-device-groups}

Jak už bylo řečeno v předchozích krocích, abyste uživatelům dali přístup ke konkrétním zařízením a neukázali jim všechno, musíte použít **skupiny zařízení**. ThingsBoard umožňuje flexibilní strukturu, kde jednu skupinu zařízení lze nasdílet více uživatelským skupinám (například aby stejná zařízení viděl koncový zákazník i váš interní servisní tým).

### Vytvoření skupiny zařízení {#creating-a-device-group}
1. V levém menu přejděte do sekce **Entities** a zvolte **Devices**.
2. Přepněte na kartu **Groups**.
3. Kliknutím na **ikonu plus (+)** vpravo nahoře vytvořte novou skupinu.
4. Zadejte **Name** a **Description** skupiny a uložte ji.

### Přidání zařízení do skupiny {#adding-devices-to-the-group}
1. Kliknutím na svou novou skupinu zařízení ji otevřete.
2. Uvnitř skupiny přejděte na kartu **Entities**.
3. Klikněte na **ikonu plus (+)** a zvolte konkrétní zařízení, která chcete zahrnout. *(Poznámka: Jedno zařízení může patřit do několika skupin současně.)*

### Nasdílení skupiny zařízení uživatelům {#sharing-the-device-group-with-users}
Jakmile je skupina zařízení naplněná, musíte k ní uživatelům dát přístup jejím propojením s uživatelskými skupinami z kroku 2.

1. Vraťte se na **Users** -> **Groups** a otevřete svou konkrétní uživatelskou skupinu.
2. Přejděte na kartu **Roles** a klikněte na **ikonu plus (+)**.
3. Zvolte typ role **Group** (například roli, která dává přístup jen pro čtení, nebo pro čtení i zápis).
4. Nastavte **Type** na *Device* a zvolte svou novou **skupinu entit** (skupinu zařízení).
5. Klikněte na **Add**.

:::tip
Tenhle proces sdílení můžete zopakovat u libovolného počtu uživatelských skupin. Úplně stejnou skupinu zařízení lze současně nasdílet zákazníkovi A (s právy jen pro čtení) i vašemu servisnímu týmu (s plnými právy)!
:::
