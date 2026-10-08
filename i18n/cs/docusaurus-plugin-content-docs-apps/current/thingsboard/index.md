---
slug: index
title: ThingsBoard
description: "ThingsBoard je open-source platforma pro IoT, která pomáhá připojovat zařízení, sbírat data a proměnit je v přehledné a užitečné informace."
---
import Image from '@theme/IdealImage';

# ThingsBoard {#thingsboard}

[**ThingsBoard**](https://app.hardwario.cloud/) je open-source IoT platforma, která firmám pomáhá připojovat zařízení, sbírat data a přeměňovat je na přehledné a užitečné informace. S připravenými dashboardy, upozorněními a nástroji pro automatizaci snadno sledujete provoz, zvýšíte efektivitu a rozšíříte IoT projekty i bez hlubokých technických znalostí.

:::info
**Přístup do systému:** Do platformy HARDWARIO ThingsBoard se můžete přihlásit na **https://app.hardwario.cloud/**.

Pokud chcete do systému získat přístup a prohlížet vizualizace a grafy dat ze svých zařízení HARDWARIO, napište prosím na **ask@hardwario.com**.
:::

:::tip Zařízení z HARDWARIO Cloudu
S [automatickým připojením](/apps/thingsboard/cloud-connection#automatic-connection) z HARDWARIO Cloudu se vaše zařízení objeví ve vašem účtu ThingsBoard sama - stačí přidat jeden konektor s ID své skupiny zařízení.
:::

---

## Ukázka dashboardu s IoT daty {#example-of-an-iot-data-dashboard}

import ThingsBoardDashboard from '@site/src/components/ThingsBoardDashboard';

<ThingsBoardDashboard />

---

## První kroky {#getting-started}

Podle následujících kroků nastavíte ThingsBoard od začátku a začnete sledovat svá zařízení.

---

### 1. Vytvoření zařízení v ThingsBoard {#1-create-a-device-in-thingsboard}

Přihlaste se do [ThingsBoard](https://app.hardwario.cloud/) a vytvořte nové zařízení.
Toto zařízení bude fungovat jako koncový bod, který přijímá a ukládá data odesílaná z HARDWARIO Cloud.

👉 [Přidání nového zařízení](/apps/thingsboard/creating-device)

---

### 2. Připojení k HARDWARIO Cloud {#2-connect-to-hardwario-cloud}

Přejděte do [HARDWARIO Cloud](https://hardwario.cloud/) a nastavte konektor, který bude směřovat na vaše zařízení v ThingsBoard.
Konektor pak bezpečně přenáší data ze zařízení z HARDWARIO Cloud do ThingsBoard.

👉 [Připojení k ThingsBoard](/apps/thingsboard/cloud-connection)

---

### 3. Vytvoření dashboardu {#3-create-a-dashboard}

Jakmile spojení funguje a data přicházejí, vytvořte v ThingsBoard dashboard.
Přidejte do něj widgety, například karty, grafy a ukazatele, a sledujte data v reálném čase.

👉 [Vytvoření dashboardu](/apps/thingsboard/creating-dashboard)

---

### 4. Nastavení uživatelských rolí a skupin {#4-set-up-user-roles-and-groups}

V ThingsBoard přesně určíte, co smí který uživatel vidět a dělat.
Vytvořte role s konkrétními oprávněními a rozdělte uživatele do skupin, ke kterým patří jejich zařízení a dashboardy.

👉 [Správa uživatelů](/apps/thingsboard/users-managing)

---

### 5. Přidání uživatelů {#5-add-users}

Vytvořte uživatelské účty, přiřaďte je do skupin a odešlete aktivační odkazy, aby se zákazníci mohli přihlásit ke svým dashboardům.

👉 [Přidání uživatelů](/apps/thingsboard/users)

---

### 6. Sdílení dashboardu přes veřejný odkaz {#6-share-a-dashboard-via-public-link}

Vygenerujte pro jakýkoli dashboard veřejnou URL adresu pouze pro čtení a sdílejte ji se zákazníky nebo partnery; přihlášení není potřeba.

👉 [Veřejný odkaz](/apps/thingsboard/public-link)

---

## Funkce {#features}

ThingsBoard nabízí řadu pokročilých funkcí pro organizaci dat, automatizaci procesů a doručování reportů. Kompletní přehled najdete v sekci [Funkce](/apps/thingsboard/features).

| Funkce | Popis |
|---------|-------------|
| [Assety](/apps/thingsboard/assets) | Uspořádejte zařízení do logických hierarchií (budovy, podlaží, zóny) pro snazší řízení přístupu a abstrakci dashboardů. |
| [Pravidla notifikací](/apps/thingsboard/notifications-manager) | Nastavte e-mailová a SMS upozornění při překročení limitů, bez programování a přímo z widgetu na dashboardu. |
| [E-mailové notifikace](/apps/thingsboard/email-notification) | Ve vlastních řetězcích pravidel (Rule Chains) odesílejte podmíněná e-mailová upozornění s formátovanými daty a nastavitelným omezením četnosti. |
| [Plánované reporty](/apps/thingsboard/email-reports) | Pravidelné reporty v PDF se automaticky vytvoří a odešlou zákazníkům podle nastaveného plánu. |
| [Rule Engine](/apps/thingsboard/rule-engine) | Vizuální programování pro transformaci dat, správu alarmů, integrace třetích stran a automatizaci zařízení. |
