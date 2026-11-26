---
slug: assets
title: Assets
description: "Create assets in HARDWARIO Dashboards for buildings, floors or zones, link devices to them through relations and share them with sub-customers."
---

import Image from '@theme/IdealImage';

# Assets

Assets are logical containers that represent real-world objects (buildings, floors, zones or equipment) in HARDWARIO Dashboards. Unlike devices (which represent physical hardware sending data), assets are used to organize your project's overall structure and define how data and access rights are distributed across your customers.

---

## What are assets and what are they good for?

**Main benefits of using Assets:**
- **Logical hierarchy:** You can create a structure such as *Region → City → Street → Building*.
- **Scalability:** Instead of managing hundreds of individual sensors, you manage a single Asset (e.g., "Hall A") to which those sensors are assigned.
- **Access control:** Access rights for customers can be defined at the Asset level. If you share an Asset with a customer, they can automatically gain access to the devices that belong to it (through relations).
- **Dashboard abstraction:** Dashboards can be dynamic. A single dashboard can adapt its data based on which Asset the user selects.

---

## How to create an asset

### Step 1: Log in

Log in to HARDWARIO Dashboards as a *Customer Administrator*.

### Step 2: Navigate to assets

In the left menu, open **Assets** (**Entities → Assets** for tenant administrators).

### Step 3: Add a new asset

Click **Add asset** in the top-right corner and choose **Add new asset**.

![Empty Assets list with the Add asset button highlighted](images/assets-1.jpg)

### Step 4: Fill in the details

Enter the asset information:
- **Name** (1): The name of the asset (e.g., *Warehouse Prague*).
- **Asset Profile:** Select a profile (the default is *default*). Profiles determine the rules for data processing.
- **Label** (2): An optional label for better organization and filtering.

![Add asset dialog with the Name (1), Label (2) and Add (3) highlighted](images/assets-2.jpg)

### Step 5: Save

Click **Add** (3). The asset is now created.

### Step 6: Add relations (optional)

In the **Relations** tab, you can create relations to other devices or parent Assets (e.g., creating a "Contains" relation pointing down to your sensors).

![Add relation dialog with the Contains relation type (1) and a device selected as the target entity (2)](images/assets-3.jpg)

---

## Hierarchy and sharing with sub-customers

Assets are a key element for **Multi-tenancy** (managing multiple customers within a single environment).

### Assigning devices

You can "insert" various devices into Assets using relations. For example, an Asset named "Building A" might contain 10 specific sensors (Devices) installed inside it.

### Sharing with customers

If you have a sub-customer (Customer), you can share an entire Asset with them. HARDWARIO Dashboards then automatically ensures that the users under that customer can see this Asset and everything connected to it.

### Dynamic dashboard views

Thanks to this structure, you can create **one universal dashboard** for all your customers:
- **Customer A** logs in and, in the source selection (e.g., the *Entities Hierarchy* widget), sees only their own Assets and the devices assigned to them.
- **Customer B** logs into the exact same dashboard but sees completely different data (only their own).
- **Parent Customer / Tenant Admin**, who has access to everything, sees the complete tree of all customers and all assets in the same dashboard, which is ideal for a global overview and maintenance.

:::info ThingsBoard documentation
HARDWARIO Dashboards is built on ThingsBoard. More details in the official ThingsBoard documentation: [Assets](https://thingsboard.io/docs/pe/user-guide/assets/).
:::
