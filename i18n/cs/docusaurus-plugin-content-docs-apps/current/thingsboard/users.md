---
slug: users
title: Přidávání uživatelů
---

import Image from '@theme/IdealImage';

# Přidávání uživatelů {#adding-users}

V tomto návodu se naučíte, jak v platformě ThingsBoard vytvářet nové uživatelské účty, posílat aktivační odkazy a spravovat přihlašovací údaje.

---

## Krok 1: Vytvořte nového uživatele {#step-1-create-a-new-user}

1. V levém navigačním menu zvolte **Users**.
2. Klikněte na tlačítko **„+“ (plus)** na pravé straně obrazovky.

![Seznam uživatelů v platformě ThingsBoard s tlačítkem plus vpravo nahoře pro vytvoření nového uživatele](../../../../../apps/thingsboard/images/users-0.png)

3. Zadejte potřebné údaje o uživateli.
4. Dole najdete sekci **Activation method**. Uživatele můžete do ThingsBoard pozvat dvěma způsoby (i později):
   - **Display activation link:** Vygeneruje odkaz, který můžete ručně zkopírovat a uživateli sami poslat.
   - **Send activation mail:** ThingsBoard uživateli automaticky pošle e-mail s aktivačním odkazem.

![Krok User details v dialogu Add user s poli e-mail, jméno, telefon a volbou Activation method](../../../../../apps/thingsboard/images/users-1.png)

5. Dále klikněte vpravo nahoře na **Owner and groups**.
6. Zvolte **Customer** a **User Group**, do které bude uživatel patřit.
   > **Připomínka:** Přiřazená skupina určuje, které dashboardy a zařízení uživatel uvidí, a také jeho konkrétní oprávnění.

![Krok Owner and groups v dialogu Add user s vybraným zákazníkem a otevřeným seznamem skupin entit](../../../../../apps/thingsboard/images/users-2.png)

7. Nakonec klikněte na **Add**.

Tím je nový uživatel vytvořený.

:::info
**Potřebujete spravovat přístupy uživatelů?** Na stránce [**Správa uživatelů**](/apps/thingsboard/users-managing) se dozvíte, jak vytvářet skupiny, přiřazovat role a řídit přístup ke konkrétním zařízením nebo dashboardům.
:::

---

## Krok 2: Pozvěte nebo aktivujte uživatele {#step-2-invite-or-activate-a-user}

Pokud jste aktivaci při vytváření přeskočili nebo potřebujete pozvánku poslat znovu, aby se uživatel mohl přihlásit a vytvořit si heslo, postupujte takto:

1. Klikněte v seznamu Users na konkrétního uživatele.
2. Na záložce **Details** zvolte jednu z těchto akcí:
   - **Resend activation:** Automaticky pošle uživateli e-mail s aktivačním odkazem.
   - **Display activation link:** Zobrazí URL, kterou můžete ručně zkopírovat a uživateli poslat. Po kliknutí na odkaz si uživatel vytvoří nové heslo.

![Panel s detailem uživatele s tlačítky Display activation link a Resend activation na záložce Details](../../../../../apps/thingsboard/images/users-3.png)

---

## Jak si změnit heslo {#how-to-change-your-password}

1. Klikněte na **tři tečky** vedle ikony svého uživatele vpravo nahoře.
2. V rozbalovací nabídce zvolte **Account**.

![Domovská obrazovka s otevřeným uživatelským menu vpravo nahoře s volbami Account a Logout](../../../../../apps/thingsboard/images/password-change-1.png)

3. Otevře se záložka **Profile**, kde můžete upravit i obecné údaje o svém účtu.
4. Chcete-li **změnit heslo**, přepněte na záložku **Security**.
5. Zadejte současné heslo a pak nové heslo.

:::info
Pokud jste dostali **dočasné heslo e-mailem**, zadejte ho do pole pro současné heslo.
:::

![Záložka Security v účtu s poli Change Password pro současné a nové heslo vedle požadavků na heslo](../../../../../apps/thingsboard/images/password-change-2.png)
