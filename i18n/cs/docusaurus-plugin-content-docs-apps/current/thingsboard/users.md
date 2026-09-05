---
slug: users
title: Přidávání uživatelů
description: "V tomto návodu se naučíte, jak v ThingsBoardu vytvářet nové uživatelské účty, posílat aktivační odkazy a spravovat přihlašovací údaje."
---

import Image from '@theme/IdealImage';

# Přidávání uživatelů {#adding-users}

V tomto návodu se naučíte, jak v ThingsBoardu vytvářet nové uživatelské účty, posílat aktivační odkazy a spravovat přihlašovací údaje.

---

## Krok 1: Vytvořte nového uživatele {#step-1-create-a-new-user}

1. V levém navigačním menu zvolte **Users**.
2. Klikněte na tlačítko **„+" (plus)** na pravé straně obrazovky.

![Seznam uživatelů v ThingsBoardu s tlačítkem plus vpravo nahoře pro vytvoření nového uživatele](../../../../../apps/thingsboard/images/users-0.png)

3. Zadejte potřebné informace o uživateli.
4. Dole najdete sekci **Activation method**. Máte dvě možnosti, jak uživatele do ThingsBoardu pozvat (jde to udělat i později):
   - **Display activation link:** Vygeneruje odkaz, který můžete ručně zkopírovat a uživateli sami poslat.
   - **Send activation mail:** Pošle automatický e-mail přímo z ThingsBoardu s aktivačním odkazem.

![Krok User details v dialogu Add user s poli e-mail, jméno, telefon a volbou Activation method](../../../../../apps/thingsboard/images/users-1.png)

5. Dále klikněte vpravo nahoře na **Owner and groups**.
6. Zvolte **Customer** a **User Group**, do které bude uživatel patřit.
   > **Připomínka:** Přiřazená grupa určuje, které dashboardy a zařízení uživatel uvidí, a také jeho konkrétní oprávnění.

![Krok Owner and groups v dialogu Add user s vybraným zákazníkem a otevřeným seznamem grup entit](../../../../../apps/thingsboard/images/users-2.png)

7. Nakonec klikněte na **Add**.

Nového uživatele máte úspěšně vytvořeného!

:::info
**Potřebujete spravovat přístupy uživatelů?** Ve [**správě uživatelů**](/apps/thingsboard/users-managing) se dozvíte, jak vytvářet grupy, přiřazovat role a řídit přístup ke konkrétním zařízením nebo dashboardům.
:::

---

## Krok 2: Pozvěte nebo aktivujte uživatele {#step-2-invite-or-activate-a-user}

Pokud jste aktivaci při vytváření přeskočili nebo potřebujete pozvánku poslat znovu, aby se uživatel mohl přihlásit a vytvořit si heslo, postupujte takto:

1. Klikněte v seznamu Users na konkrétního uživatele.
2. Na kartě **Details** zvolte jednu z těchto akcí:
   - **Resend activation:** Automaticky pošle uživateli e-mail s aktivačním odkazem.
   - **Display activation link:** Zobrazí URL, kterou můžete ručně zkopírovat a uživateli poslat. Po kliknutí na odkaz bude vyzván k vytvoření nového hesla.

![Panel s detailem uživatele s tlačítky Display activation link a Resend activation na kartě Details](../../../../../apps/thingsboard/images/users-3.png)

---

## Jak si změnit heslo {#how-to-change-your-password}

1. Klikněte na **tři tečky** vedle ikony svého uživatele vpravo nahoře.
2. V rozbalovací nabídce zvolte **Account**.

![Domovská obrazovka s otevřeným uživatelským menu vpravo nahoře s volbami Account a Logout](../../../../../apps/thingsboard/images/password-change-1.png)

3. Přejdete na kartu **Profile**, kde můžete upravit i obecné informace o svém účtu.
4. Pro **změnu hesla** přepněte na kartu **Security**.
5. Zadejte své současné heslo a poté nové heslo.

:::info
Pokud jste dostali **dočasné heslo e-mailem**, zadejte ho do pole pro současné heslo.
:::

![Karta Security v účtu s poli Change Password pro současné a nové heslo vedle požadavků na heslo](../../../../../apps/thingsboard/images/password-change-2.png)
