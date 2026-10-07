---
slug: users
title: Uživatelé
description: "Stránka Users obsahuje seznam všech, kdo mají přístup do vašeho prostoru; zde také zvete nové členy a spravujete jejich role."
---

# Uživatelé {#users}

Stránka **Users** obsahuje seznam všech, kdo mají přístup do vašeho prostoru. Zde také zvete nové
členy a spravujete jejich role. Jedna osoba může patřit do několika prostorů najednou, v každém
s jinou rolí.

## Role {#roles}

Každý člen má v prostoru jednu ze dvou rolí:

| Role | Co může dělat |
|---|---|
| **Admin** | Plný přístup. Správa zařízení, tagů, konektorů, proměnných a firmwaru; zvaní a správa dalších členů; změna nastavení prostoru. |
| **User** | Pouze pro čtení. Může prohlížet zařízení a jejich zprávy, ale nemůže nic měnit. |

## Pozvání člena {#inviting-a-member}

1. Otevřete **Users** v levém postranním panelu a klikněte na **+ INVITE USER**.
2. Zadejte **e-mailovou adresu** dané osoby.
3. Zvolte její **roli**: **Admin** nebo **User**.
4. Klikněte na **Send Invite**.

Pozvaný dostane e-mail s odkazem na pozvánku. Pozvánku přijme tak, že se přihlásí nebo zaregistruje
**e-mailem a heslem**, účtem **Google** nebo účtem **Microsoft**. Potom se objeví v seznamu Users
s rolí, kterou jste mu přidělili.

## Správa členů {#managing-members}

V nabídce vedle člena v seznamu Users můžete:

- **Změnit jeho roli** mezi **Admin** a **User**.
- **Odebrat** ho: okamžitě ztratí přístup do tohoto prostoru. Jeho účet se nesmaže
  a přístup do ostatních prostorů zůstane beze změny.

## Převod vlastnictví {#transferring-ownership}

Vlastník prostoru může vlastnictví předat jinému členovi s rolí **Admin**
v **Space Settings → Transfer Ownership**.

:::tip Správa členů přes API
Vše zde popsané je dostupné také přes [**REST API**](/cloud/api): pomocí endpointů
pro uživatele (`POST …/users/invite`, `GET/PUT/DELETE …/users/{id}`) můžete správu členů
automatizovat.
:::
