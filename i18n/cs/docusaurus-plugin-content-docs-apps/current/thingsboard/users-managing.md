---
slug: users-managing
title: Správa uživatelů
---

import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Správa viditelnosti a oprávnění uživatelů {#managing-user-visibility-and-permissions}

V ThingsBoard můžete **přesně určit, co zákazník vidí a co ne**, i to, co v systému smí a nesmí dělat. Všichni uživatelé tak pracují v přehledném a bezpečném prostředí.

---

## Krok 1: Vytvoření uživatelských rolí {#step-1-creating-user-roles}

Nejdřív vytvořte role, které fungují jako sady oprávnění.

1.  V levém menu přejděte do sekce **Security** (poslední položka).
2.  Rozbalte ji a zvolte **Roles**.
3.  Novou roli vytvoříte kliknutím na **ikonu plus (+)** vpravo nahoře.
4.  Zadejte **Role Name**, **Description** a zvolte **Role Type**.

![Dialog Add Role s vyplněným názvem role a otevřenou nabídkou Role type s volbami Generic a Group](../../../../../apps/thingsboard/images/roles-2.png)

### Rozdíl mezi typy rolí: {#difference-between-role-types}
* **Group:** U tohoto typu určujete jen operace (například čtení, zápis), které uživatel může provádět. Tato role se ke konkrétní entitě (zařízení, dashboardu a podobně) váže až později, při nastavování uživatelských skupin.
* **Generic:** Tady přesně určíte, co uživatel smí a nesmí globálně dělat. Pozor: Pokud tu povolíte přístup k „Devices“, uvidí uživatel **všechna zařízení** daného zákazníka, ne jen konkrétní skupinu.

<Tabs>
  <TabItem value="lte" label="Group">
![Dialog Add Role typu Group, kde Permissions obsahují jen povolené operace, zde Read](../../../../../apps/thingsboard/images/roles-3.png)
  </TabItem>
  <TabItem value="lora" label="Generic">
![Dialog Add Role typu Generic s oprávněními po zdrojích: Device s Read a Write, Dashboard s All](../../../../../apps/thingsboard/images/roles-4.png)
  </TabItem>
</Tabs>

**Důležité (správa vlastního profilu):**
U uživatelů s omezeným přístupem doporučujeme vytvořit roli typu **Generic**, kde pro zdroj **Profile** povolíte operaci **All**. Když tuto roli přidáte do uživatelské skupiny, uživatelé si budou moci sami změnit heslo a údaje účtu.

![Role Generic Edit Profile s operací All nad zdrojem Profile, aby si uživatelé mohli spravovat vlastní účet](../../../../../apps/thingsboard/images/roles-6.png)

---

## Krok 2: Vytvoření uživatelských skupin {#step-2-creating-user-groups}

Dále vytvořte skupiny, kterým přiřadíte výše vytvořené role.

1.  Přejděte do sekce **Users** a zvolte záložku **Groups**.
2.  Uvidíte výchozí skupiny: *Customer Administrators* (plný přístup) a *Customer Users* (přístup ke všemu jen pro čtení).
3.  Klikněte vpravo nahoře na **ikonu plus (+)** a zadejte název a popis.

![Dialog Add entity group nad seznamem uživatelských skupin s vyplněným názvem skupiny a viditelnými výchozími skupinami v pozadí](../../../../../apps/thingsboard/images/groups-2.png)

4.  Po vytvoření vstoupíte do nastavení skupiny kliknutím na šipku vlevo od jejího názvu.
5.  Přejděte na záložku **Roles**.

![Panel s detailem uživatelské skupiny otevřený na záložce Roles s prázdnou tabulkou User group roles a ikonou plus](../../../../../apps/thingsboard/images/groups-4.png)

### Přidání oprávnění do skupiny: {#adding-permissions-to-the-group}
1.  Klikněte na **ikonu plus (+)** vlevo od vyhledávacího pole.
2.  Zvolte **Role Type** a konkrétní roli.
3.  Pokud jste zvolili typ role **Group**, musíte také určit:
    * **Group Owner:** Obvykle vy sami nebo konkrétní zákazník.
    * **Type:** Určete, na co pravidla platí (například *Device* nebo *Dashboard*).
    * **Entity Group:** Konkrétní skupina entit, ke které má uživatel mít přístup.

![Dialog Add group permission s typem role Group, rolí, vlastníkem skupiny, typem Device a vybranou skupinou entit](../../../../../apps/thingsboard/images/groups-6.png)

:::info
**Skupiny entit** musíte mít připravené předem, zařízení nebo dashboardy tedy už musí být uspořádané do skupin. V tomto kroku tyto skupiny spárujete s uživatelskou skupinou. Vytváření skupin zařízení a dashboardů je podobné jako vytváření uživatelských skupin.
:::

Pokud přidáváte roli typu **Generic** (třeba roli pro úpravu profilu), stačí zvolit samotnou roli a ta pak platí globálně pro oprávnění účtu uživatele.

![Dialog Add group permission s typem role Generic, kde je potřeba zvolit jen samotnou roli](../../../../../apps/thingsboard/images/groups-7.png)

---

## Krok 3: Přidání uživatelů do skupiny {#step-3-adding-users-to-the-group}

Uživatele do nově nastavené skupiny můžete přidat dvěma způsoby:

1.  **Noví uživatelé:** Přímo ve skupině (na záložce Users) klikněte na **ikonu plus (+)**.

![Prázdná záložka Users uživatelské skupiny s ikonou plus v pravém horním rohu pro přidání nového uživatele](../../../../../apps/thingsboard/images/groups-3.png)

2.  **Existující uživatelé:** * Přejděte do hlavní sekce **Users** -> **Users**.
    * Klikněte na konkrétního uživatele.
    * Na záložce **Details** klikněte na tlačítko **Manage owner and groups**.
    * Zvolte požadovanou uživatelskou skupinu a klikněte na **Update**.

![Dialog Manage owner and groups v detailu uživatele s otevřeným seznamem skupin entit pro výběr uživatelské skupiny](../../../../../apps/thingsboard/images/user-2.png)

---

## Krok 4: Vytváření a sdílení skupin zařízení {#step-4-creating-and-sharing-device-groups}

Jak už zaznělo v předchozích krocích, chcete-li uživatelům zpřístupnit jen konkrétní zařízení, a ne všechno, použijte **skupiny zařízení**. Struktura v ThingsBoard je pružná: jednu skupinu zařízení můžete sdílet s více uživatelskými skupinami (například aby stejná zařízení viděl koncový zákazník i váš interní servisní tým).

### Vytvoření skupiny zařízení {#creating-a-device-group}
1. V levém menu přejděte do sekce **Entities** a zvolte **Devices**.
2. Přepněte na záložku **Groups**.
3. Kliknutím na **ikonu plus (+)** vpravo nahoře vytvořte novou skupinu.
4. Zadejte **Name** a **Description** skupiny a uložte ji.

### Přidání zařízení do skupiny {#adding-devices-to-the-group}
1. Nově vytvořenou skupinu zařízení otevřete kliknutím.
2. Uvnitř skupiny přejděte na záložku **Entities**.
3. Klikněte na **ikonu plus (+)** a zvolte konkrétní zařízení, která chcete zahrnout. *(Poznámka: Jedno zařízení může patřit do několika skupin současně.)*

### Sdílení skupiny zařízení s uživateli {#sharing-the-device-group-with-users}
Jakmile skupina obsahuje zařízení, zpřístupněte ji uživatelům: propojte ji s uživatelskými skupinami z kroku 2.

1. Vraťte se na **Users** -> **Groups** a otevřete příslušnou uživatelskou skupinu.
2. Přejděte na záložku **Roles** a klikněte na **ikonu plus (+)**.
3. Zvolte typ role **Group** (například roli, která dává přístup jen pro čtení, nebo pro čtení i zápis).
4. Nastavte **Type** na *Device* a zvolte nově vytvořenou **skupinu entit** (skupinu zařízení).
5. Klikněte na **Add**.

:::tip
Sdílení můžete zopakovat pro libovolný počet uživatelských skupin. Tutéž skupinu zařízení můžete současně sdílet se zákazníkem A (s právy jen pro čtení) i se svým servisním týmem (s plnými právy).
:::
