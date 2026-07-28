---
slug: spaces
title: Spaces
---

# Spaces

A **Space** is the top-level organizational unit in HARDWARIO Cloud. Everything — devices, tags, connectors, variables, and users — lives inside a space.

Typical use cases:
- One space per **customer** deployment
- One space per **project** or environment (e.g. `myproject-dev`, `myproject-prod`)
- A personal space for development and testing

## Space Types

| Type | Description |
|---|---|
| **personal** | Automatically created for every user account — your private workspace |
| **team** | Shared workspace for a group of users |
| **default** | Standard space type for customer deployments |
| **premium** | Space with extended limits or features |

## Creating a Space

1. In the top-right corner, open **SPACES** and click **+ NEW SPACE**.

   ![The SPACES page with the "+ NEW SPACE" button highlighted](images/spaces-new-space.png)

2. Enter a name following the [naming conventions](/cloud/#naming-conventions), then click **CREATE**.

   ![The "Create new space" dialog — enter a name and click CREATE](images/create-space.png)

The new space appears in your space switcher immediately.

## Space Overview

When you open a space, the left sidebar shows all available sections:

- **Devices** — all devices registered in this space
- **Messages** — uplink and downlink messages across all devices
- **Tags** — tag management
- **Connectors** — webhook connectors
- **Variables** — decryption keys and other space-level variables
- **Users** — space members and their roles
- **FOTA** — firmware update management

## Members

You can invite other users to collaborate in your space. Each member has a role:

| Role | Permissions |
|---|---|
| **Admin** | Full access — can add/remove devices, manage connectors, invite users, change settings |
| **User** | Read-only access — can view devices and messages but cannot make changes |

To invite members and manage their roles, see [**Users**](/cloud/users) under **Administration**.

:::info

A user can be a member of multiple spaces with different roles in each.

:::

## API Keys

Each space has its own API keys for programmatic access. API keys are scoped to the space and can be used to list devices, retrieve messages, and send downlinks via the [REST API](/cloud/api).

To create an API key, go to **Settings → API Keys** in your space.
