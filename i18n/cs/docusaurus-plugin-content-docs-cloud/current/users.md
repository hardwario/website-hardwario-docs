---
slug: users
title: Uživatelé
description: "Stránka Users obsahuje seznam všech, kdo mají přístup k vašemu Space, a umožňuje zvát nové"
---

# Uživatelé {#users}

Stránka **Users** obsahuje seznam všech, kdo mají přístup k vašemu Space, a umožňuje zvát nové
členy a spravovat jejich role. Jedna osoba může patřit do několika Spaces najednou, v každém
s jinou rolí.

## Role {#roles}

Každý člen má ve Space jednu ze dvou rolí:

| Role | Co může dělat |
|---|---|
| **Admin** | Plný přístup — správa zařízení, tagů, konektorů, proměnných a firmwaru; zvaní a správa dalších členů; změna nastavení Space. |
| **User** | Pouze pro čtení — může prohlížet zařízení a jejich zprávy, ale nemůže provádět změny. |

## Pozvání člena {#inviting-a-member}

1. Otevřete **Users** v levém postranním panelu a klikněte na **+ INVITE USER**.
2. Zadejte **e-mailovou adresu** dané osoby.
3. Zvolte její **roli** — **Admin** nebo **User**.
4. Klikněte na **Send Invite**.

Obdrží e-mail s odkazem na pozvánku. Pro přijetí se přihlásí — nebo zaregistruje —
pomocí **e-mailu a hesla**, účtu **Google** nebo účtu **Microsoft**. Po přijetí
se objeví v seznamu Users s rolí, kterou jste jim přidělili.

## Správa členů {#managing-members}

V nabídce vedle člena v seznamu Users můžete:

- **Změnit jeho roli** mezi **Admin** a **User**.
- **Odebrat** ho — okamžitě ztratí přístup k tomuto Space. Jeho účet se nesmaže
  a přístup k ostatním Spaces zůstane nedotčen.

## Převod vlastnictví {#transferring-ownership}

Vlastník Space může předat vlastnictví jinému členovi s rolí **Admin** v
**Space Settings → Transfer Ownership**.

:::tip Správa členů přes API
Vše zde popsané je dostupné také přes [**REST API**](/cloud/api) — uživatelské
endpointy (`POST …/users/invite`, `GET/PUT/DELETE …/users/{id}`) umožňují automatizovat
správu členů.
:::
