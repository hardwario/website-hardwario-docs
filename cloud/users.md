---
slug: users
title: Users
---

# Users

The **Users** page lists everyone with access to your Space and lets you invite new
members and manage their roles. A person can belong to several Spaces at once, with a
different role in each.

## Roles

Every member has one of two roles in a Space:

| Role | What they can do |
|---|---|
| **Admin** | Full access. Manage devices, tags, connectors, variables, and firmware; invite and manage other members; change Space settings. |
| **User** | Read-only. View devices and their messages, but cannot make changes. |

## Inviting a member

1. Open **Users** in the left sidebar and click **+ INVITE USER**.
2. Enter the person's **email address**.
3. Choose their **role**: **Admin** or **User**.
4. Click **Send Invite**.

They receive an email with an invitation link. To accept, they sign in, or register,
with an **email & password**, a **Google** account, or a **Microsoft** account. Once
accepted, they appear in the Users list with the role you assigned.

## Managing members

Use the menu next to a member in the Users list to:

- **Change their role** between **Admin** and **User**.
- **Remove** them: they lose access to this Space immediately. Their account is not
  deleted, and their access to any other Spaces is unaffected.

## Transferring ownership

The Space owner can hand ownership to another **Admin** member from
**Space Settings → Transfer Ownership**.

:::tip Manage members via the API
Everything here is also available through the [**REST API**](/cloud/api): the users
endpoints (`POST …/users/invite`, `GET/PUT/DELETE …/users/{id}`) let you automate
member management.
:::
