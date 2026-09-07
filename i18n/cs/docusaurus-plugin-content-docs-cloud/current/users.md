---
slug: users
title: Uživatelé
description: "Stránka Uživatelé vypisuje všechny, kdo mají přístup do vašeho prostoru, a umožňuje zvát nové členy a spravovat jejich role."
---

# Uživatelé {#users}

Stránka **Users** obsahuje seznam všech, kdo mají přístup do vašeho prostoru, a umožňuje zvát nové
členy a spravovat jejich role. Jedna osoba může patřit do několika prostorů najednou, v každém
s jinou rolí.

## Role {#roles}

Každý člen má v prostoru jednu ze dvou rolí:

| Role | Co může dělat |
|---|---|
| **Admin** | Plný přístup. Správa zařízení, tagů, konektorů, proměnných a firmwaru; zvaní a správa dalších členů; změna nastavení prostoru. |
| **User** | Pouze pro čtení. Může prohlížet zařízení a jejich zprávy, ale nemůže provádět změny. |

## Pozvání člena {#inviting-a-member}

1. Otevřete **Users** v levém postranním panelu a klikněte na **+ INVITE USER**.
2. Zadejte **e-mailovou adresu** dané osoby.
3. Zvolte její **roli**: **Admin** nebo **User**.
4. Klikněte na **Send Invite**.

Obdrží e-mail s odkazem na pozvánku. Pro přijetí se přihlásí, nebo zaregistruje,
pomocí **e-mailu a hesla**, účtu **Google** nebo účtu **Microsoft**. Po přijetí
se objeví v seznamu Users s rolí, kterou jste mu přidělili.

## Správa členů {#managing-members}

V nabídce vedle člena v seznamu Users můžete:

- **Změnit jeho roli** mezi **Admin** a **User**.
- **Odebrat** ho: okamžitě ztratí přístup do tohoto prostoru. Jeho účet se nesmaže
  a přístup do ostatních prostorů zůstane nedotčen.

## Převod vlastnictví {#transferring-ownership}

Vlastník Space může předat vlastnictví jinému členovi s rolí **Admin** v
**Space Settings → Transfer Ownership**.

:::tip Správa členů přes API
Vše zde popsané je dostupné také přes [**REST API**](/cloud/api): uživatelské
endpointy (`POST …/users/invite`, `GET/PUT/DELETE …/users/{id}`) umožňují automatizovat
správu členů.
:::
