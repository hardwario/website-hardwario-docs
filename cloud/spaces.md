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

1. Click your account name in the top-right corner
2. Select **New Space**
3. Enter a name following the [naming conventions](/cloud/#naming-conventions)
4. Click **Create**

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

### Inviting a User

1. Go to **Users** in the left sidebar
2. Click **+ INVITE USER**
3. Enter their email address and select a role
4. Click **Send Invite**

The invited user receives an email with a link to accept the invitation. They can sign in with:
- Email & password
- Google account
- Microsoft account

:::info

A user can be a member of multiple spaces with different roles in each.

:::

## API Keys

Each space has its own API keys for programmatic access. API keys are scoped to the space and can be used to list devices, retrieve messages, and send downlinks via the [REST API](api.md).

To create an API key, go to **Settings → API Keys** in your space.
