---
slug: user-roles
title: User Roles
---

import Image from '@theme/IdealImage';

# User Roles

**Roles** define specific permissions and actions, and they are used within groups to assign those exact rights to a specific item or entity.

:::info
**Need to manage user access?** See the tutorial: [**How to Create Groups with Different Permissions**](./user-groups.md). It covers how to create new groups, assign generic or entity-specific roles, and control access to specific devices or dashboards.
:::

## Creating New Roles

To create a new role:

1. Log in as **Tenant Administrator**.
2. Navigate to **Security** > **Roles** in the left menu.
3. Click the **+** button to add a new role.
4. Enter the role **Name** and **Description**.
5. Select the **Role Type**:
   - **Generic** — define permissions per resource (Device, User, Dashboard, etc.). Best for roles that need fine-grained control over different resource types.
   - **Group** — define permissions that apply to all entities within an assigned group. Best for simpler roles where the same operations apply across all resources.
6. Configure the **Permissions** based on the intended access level.
7. Click **Add**.

After creating the role, assign it to a customer's user group (see above) so that Customer Administrators can start placing users into it.
