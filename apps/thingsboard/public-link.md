---
slug: public-link
title: Public link
description: "Share a HARDWARIO Dashboards dashboard through a read-only public link by making its device group and dashboard group public, stop sharing, and handle sub-customers."
title_meta: "Public link (HARDWARIO Dashboards)"
---

import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Public link

A public link lets anyone open a dashboard in their browser **without an account**, for example your customers, a presentation or a TV screen in your office. The link is **read-only**: nobody can change anything.

:::info One rule
For a public dashboard to show data, **both the dashboard and the devices behind it must be public**. You make public a whole **group**: a dashboard group and a device group.
:::

```mermaid
flowchart LR
  DG[Public device group] --> D[Public dashboard group]
  D --> L([Public link])
  L --> V[Anyone with the link<br/>read-only]
  classDef hero stroke-width:1.5px;
  class L hero;
```

:::caution
Anyone who has the link sees the data. Don't share a link to a dashboard with sensitive data.
:::

---

:::info
#### ⚠️ Important note: Working with sub-customers

If you are configuring this public link for a specific sub-customer, you might not see their Device or Dashboard groups while logged in as a Tenant Administrator. 

To resolve this, you must log in as a **Customer Administrator** for that specific customer:
1. **Navigate** to **Customers** in the left menu.
2. **Find** the customer, click the **Manage customer users** icon, and log in as one of their administrators. 
3. **Workaround:** If the sub-customer does not have any Customer Administrator accounts yet, you can create a temporary test profile. You do not need to use a real email address (e.g., `test@temp.local`). Create the user, log in as them to complete this tutorial, and delete the temporary user account afterward.

*(Alternatively, if you only need to grab the public link without logging in as the sub-customer, check out the [**Pro Tip below**](#-pro-tip-how-to-get-the-link-without-logging-in-as-a-sub-customer).)*
:::
---

## Step 1: Make the device group public

For the dashboard to display data properly, the public user needs read access to the devices feeding the dashboard. 

**(Optional) How to create a new Device Group:**
If you do not have a specific group yet, you can create one:
1. **Navigate** to **Devices -> Groups** in the left-hand menu.
2. **Click** **Add entity group** in the top-right corner.
3. **Enter** a name for your new group and click **Add**.

**Make the Device Group public:**
1. **Navigate** to **Devices -> Groups** in the left-hand menu.

![Devices list with the Groups tab highlighted in the top bar](images/public-link-3.jpg)

2. **Locate** the Device Group containing the devices you want to display on the dashboard.
   > **Tip:** You can use a custom group, or you can use the default **"All"** group. If you make the "All" group public, any new devices added to this customer in the future will automatically become visible to the public link without requiring further configuration.
3. **Click** the **Share icon** (the icon with three connected dots) on the right side of the group's row. **Alternatively**, open the group, click the **pencil icon** next to its name and click **Make entity group public**.
4. **Result:** The group is now public and read-only. Its **Public** checkbox is ticked.

![Device groups list with the share icon of the All group circled and its Make public tooltip shown](images/public-link-4.jpg)

---

## Step 2: Make the dashboard group public

Next, you need to share the dashboard itself.

**(Optional) How to create a new Dashboard Group:**
If you do not have a specific group for your dashboards yet:
1. **Navigate** to **Dashboards -> Groups** in the left-hand menu.
2. **Click** **Add entity group** in the top-right corner.
3. **Enter** a name for your new group and click **Add**.

**Make the Dashboard Group public:**
1. **Navigate** to **Dashboards -> Groups** in the left-hand menu.

![Dashboards list with the Groups tab highlighted in the top bar](images/public-link-1.jpg)

2. **Locate** the Dashboard Group that contains the dashboard you want to share.
3. **Click** the **Share icon** (the icon with three connected dots) on the right side of the group's row. **Alternatively**, open the group, click the **pencil icon** next to its name and click **Make entity group public**.

![Dashboard groups list with the share icon of the All group circled and its Make public tooltip shown](images/public-link-2.jpg)

---

## Step 3: Obtain the public link

Now that both the devices and the dashboard are public, you can generate and share the working URL.

1. **Stay** in the **Dashboards -> Groups** section.
2. **Click** directly on the **name** of the Dashboard Group you just made public. This will open the group and display a list of all dashboards inside it.
3. **Locate** the specific dashboard you want to share.
4. **Click** the very first icon on the right side of the dashboard's row, the **Chain link icon (🔗)** titled "Public dashboard link".
5. **Result:** The URL is now copied to your clipboard. 

You can now send this link to your clients or users. Anyone with this link can view the dashboard and its real-time data directly in their browser without needing to log in.

![Dashboard group content with the chain-link icon circled; its Public dashboard link tooltip copies the URL](images/public-link-5.jpg)


## Stop sharing {#stop-sharing}

To stop sharing, make the groups private again: on the **Groups** tab, click the **Make private** icon (the curved arrow) in the row of the dashboard group, and do the same for the device group. The public link stops working.

![Dashboard groups list with the Make private tooltip on the public Warehouse dashboards group](images/public-link-make-private.jpg)

:::tip
A group can contain more dashboards or devices than the one you want to share. Make public only a group that contains nothing else you would not show. If needed, create a separate group just for sharing, for example *Public*.
:::

---

## 💡 Pro tip: How to get the link without logging in as a sub-customer

If you are operating at the parent customer level (Tenant Administrator) and want to grab the public link without the hassle of logging in as the sub-customer's administrator, you can use this shortcut:

1. **Navigate** to your main **Dashboards** (or Devices) list where you can see all dashboards/devices across your entire system, including those belonging to sub-customers.
2. **Locate** the specific dashboard you want to share.
3. **Find** the **Groups** column in the row of that dashboard.
4. **Click** directly on the name of the group in that column.

![Main Dashboards list with an arrow pointing to the Public group name in the sub-customer dashboard's Groups column](images/public-link-6.jpg)

5. **Result:** This will redirect you straight to the group's content page. From here, you can easily click the **Chain link icon (🔗)** to copy the public link, just as described in [**Step 3**](#step-3-obtain-the-public-link) above. 

![Dashboard group content with the chain-link icon circled; its Public dashboard link tooltip copies the URL](images/public-link-5.jpg)

---

## Next steps

- [Embedding dashboards](/apps/thingsboard/embedding-dashboards): put the public dashboard on your website.
- [Time window](/apps/thingsboard/time-window#save-the-default-time-window): set which period visitors see first.

:::info ThingsBoard documentation
HARDWARIO Dashboards is built on ThingsBoard. More details in the official ThingsBoard documentation: [Make dashboard public](https://thingsboard.io/docs/pe/user-guide/dashboards/#make-dashboard-public) · [Public entity groups](https://thingsboard.io/docs/pe/user-guide/groups/#make-group-public-or-private).
:::
