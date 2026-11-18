---
slug: users
title: Přidávání uživatelů
description: "Nové uživatelské účty v HARDWARIO Dashboards: přiřazení zákazníka a uživatelské skupiny, aktivační odkaz e-mailem nebo ručně a změna vlastního hesla v účtu."
title_meta: "Přidávání uživatelů (HARDWARIO Dashboards)"
---

import Image from '@theme/IdealImage';

# Přidávání uživatelů {#adding-users}

V tomto návodu se naučíte, jak v HARDWARIO Dashboards vytvářet nové uživatelské účty, posílat aktivační odkazy a spravovat přihlašovací údaje.

:::tip Nejdřív skupiny
Co uživatel uvidí, určuje jeho uživatelská skupina. Skupinu a její oprávnění proto nastavte jako první, viz [Skupiny, role a oprávnění](/apps/thingsboard/users-managing). Jinak nový uživatel uvidí buď všechno, nebo nic.
:::

---

## Krok 1: Vytvořte nového uživatele {#step-1-create-a-new-user}

1. V levém navigačním menu zvolte **Users**.
2. Vpravo nahoře klikněte na **Add user**.

![Seznam uživatelů se zvýrazněným tlačítkem Add user vpravo nahoře](../../../../../apps/thingsboard/images/users-0.jpg)

3. Zadejte potřebné údaje o uživateli.
4. Dole najdete sekci **Activation method**. Uživatele můžete pozvat dvěma způsoby (i později):
   - **Display activation link:** Vygeneruje odkaz, který můžete ručně zkopírovat a uživateli sami poslat.
   - **Send activation mail:** uživateli se automaticky pošle e-mail s aktivačním odkazem.

![Krok User details v dialogu Add user s poli e-mail, jméno, telefon a volbou Activation method](../../../../../apps/thingsboard/images/users-1.jpg)

5. Klikněte na **Next: Owner and groups**.
6. Zvolte **Customer** a **User Group**, do které bude uživatel patřit.
   > **Připomínka:** Přiřazená skupina určuje, které dashboardy a zařízení uživatel uvidí, a také jeho konkrétní oprávnění.

![Krok Owner and groups v dialogu Add user s vybraným zákazníkem a otevřeným seznamem skupin entit](../../../../../apps/thingsboard/images/users-2.jpg)

7. Nakonec klikněte na **Add**.

Tím je nový uživatel vytvořený.

:::info
**Potřebujete spravovat přístupy uživatelů?** Na stránce [**Skupiny, role a oprávnění**](/apps/thingsboard/users-managing) se dozvíte, jak vytvářet skupiny, přiřazovat role a řídit přístup ke konkrétním zařízením nebo dashboardům.
:::

---

## Krok 2: Pozvěte nebo aktivujte uživatele {#step-2-invite-or-activate-a-user}

Pokud jste aktivaci při vytváření přeskočili nebo potřebujete pozvánku poslat znovu, aby se uživatel mohl přihlásit a vytvořit si heslo, postupujte takto:

1. Klikněte v seznamu Users na konkrétního uživatele.
2. Na záložce **Details** zvolte jednu z těchto akcí:
   - **Resend activation:** Automaticky pošle uživateli e-mail s aktivačním odkazem.
   - **Display activation link:** Zobrazí URL, kterou můžete ručně zkopírovat a uživateli poslat. Po kliknutí na odkaz si uživatel vytvoří nové heslo.

![Panel s detailem uživatele s tlačítky Display activation link a Resend activation na záložce Details](../../../../../apps/thingsboard/images/users-3.jpg)

---

## Jak si změnit heslo {#how-to-change-your-password}

1. Klikněte na své jméno vlevo dole.
2. V rozbalovací nabídce zvolte **Account**.

![Otevřené uživatelské menu vlevo dole se zvýrazněnou volbou Account](../../../../../apps/thingsboard/images/password-change-1.jpg)

3. Otevře se záložka **Profile**, kde můžete upravit i obecné údaje o svém účtu.
4. Chcete-li **změnit heslo**, přepněte na záložku **Security**.
5. Zadejte současné heslo a pak nové heslo.

:::info
Pokud jste dostali **dočasné heslo e-mailem**, zadejte ho do pole pro současné heslo.
:::

![Záložka Security v účtu s poli Change Password pro současné a nové heslo vedle požadavků na heslo](../../../../../apps/thingsboard/images/password-change-2.jpg)

:::info Dokumentace ThingsBoard
HARDWARIO Dashboards jsou postavené na platformě ThingsBoard. Podrobnosti najdete v oficiální dokumentaci ThingsBoard (anglicky): [Users](https://thingsboard.io/docs/pe/user-guide/users/).
:::
