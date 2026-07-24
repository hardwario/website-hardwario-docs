---
slug: users-managing
title: User Management
---

import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Managing User Visibility and Permissions

ThingsBoard is incredibly powerful because it allows us to **completely determine what a customer can and cannot see**, and precisely define what they can and cannot do within the system. This ensures a clean and secure environment for all your users.

---

## Step 1: Creating User Roles

The first step is to define roles, which act as sets of permissions.

1.  Go to the **Security** section in the left menu (the last item).
2.  Expand it and select **Roles**.
3.  To create a new role, click the **plus (+) icon** in the top right corner.
4.  Enter the **Role Name**, **Description**, and choose the **Role Type**.

![Add Role dialog with the role name filled in and the Role type dropdown open, offering Generic and Group](images/roles-2.png)

### Difference between Role Types:
* **Group:** In this type, you only specify the operations (e.g., read, write) the user can perform. This role is linked to a specific entity (device, dashboard, etc.) later when setting up user groups.
* **Generic:** Here, you define exactly what the user can and cannot do globally. Note: If you grant access to "Devices" here, the user will see **all devices** belonging to that customer, not just a specific group.

<Tabs>
  <TabItem value="lte" label="Group">
![Add Role dialog of Group type where Permissions list only the allowed operations, here Read](images/roles-3.png)
  </TabItem>
  <TabItem value="lora" label="Generic">
![Add Role dialog of Generic type with per-resource permissions: Device with Read and Write, Dashboard with All](images/roles-4.png)
  </TabItem>
</Tabs>

**IMPORTANT (User Profile Management):**
For users with restricted access, it is recommended to create a **Generic** role where you allow **All** operations for the **Profile** resource. Adding this role to a user group allows users to change their own passwords and account details.

![Generic Edit Profile role granting the All operation on the Profile resource so users can manage their own account](images/roles-6.png)

---

## Step 2: Creating User Groups

Next, you need to create groups to which you will assign the roles created above.

1.  Go to the **Users** section and select the **Groups** tab.
2.  You will see default groups: *Customer Administrators* (full access) and *Customer Users* (read-only access to everything).
3.  Click the **plus (+) icon** in the top right, enter a name and description.

![Add entity group dialog over the User groups list, with the group name filled in and the default groups visible behind](images/groups-2.png)

4.  Once created, click the arrow to the left of your group name to enter the group settings.
5.  Navigate to the **Roles** tab.

![User group details panel open on the Roles tab, showing an empty User group roles table with the plus icon](images/groups-4.png)

### Adding Permissions to the Group:
1.  Click the **plus (+) icon** located to the left of the search bar.
2.  Select your **Role Type** and the specific role.
3.  If you selected **Group role type**, you must also specify:
    * **Group Owner:** Usually yourself or the specific customer.
    * **Type:** Define what the rules apply to (e.g., *Device* or *Dashboard*).
    * **Entity Group:** The specific group of entities the user should have access to.

![Add group permission dialog with a Group role type, the role, group owner, Device type, and entity group selected](images/groups-6.png)

:::info
You must have your **Entity Groups** ready beforehand. This means your devices or dashboards should already be organized into groups. You will pair these groups with the user group in this step. Creating groups for devices/dashboards is similar to creating user groups.
:::

If you are adding a **Generic** role (like the profile editing role), you only need to select the role, and it will apply globally to the user's account permissions.

![Add group permission dialog with a Generic role type where only the role itself needs to be selected](images/groups-7.png)

---

## Step 3: Adding Users to the Group

You can add users to your newly configured group in two ways:

1.  **New Users:** Directly within your group (under the Users tab), click the **plus (+) icon**.

![Empty Users tab of a user group with the plus icon in the top-right corner for adding a new user](images/groups-3.png)

2.  **Existing Users:** * Go to the main **Users** -> **Users** section.
    * Click on a specific user.
    * In the **Details** tab, click the **Manage owner and groups** button.
    * Select the desired user group and click **Update**.

![Manage owner and groups dialog on a user's details with the entity group list open to pick the user group](images/user-2.png)

---

## Step 4: Creating and Sharing Device Groups

As mentioned in the previous steps, to give users access to specific devices without showing them everything, you need to use **Device Groups**. ThingsBoard allows a flexible structure where a single device group can be shared with multiple user groups (for example, allowing both the end customer and your internal maintenance team to see the same devices).

### Creating a Device Group
1. Go to the **Entities** section in the left menu and select **Devices**.
2. Switch to the **Groups** tab.
3. Click the **plus (+) icon** in the top right corner to create a new group.
4. Enter a **Name** and **Description** for the group, then save it.

### Adding Devices to the Group
1. Click on your newly created device group to open it.
2. Go to the **Entities** tab inside the group.
3. Click the **plus (+) icon** and select the specific devices you want to include. *(Note: A single device can belong to multiple groups at the same time).*

### Sharing the Device Group with Users
Once your device group is populated, you need to grant users access to it by linking it to the user groups created in Step 2.

1. Go back to **Users** -> **Groups** and open your specific user group.
2. Navigate to the **Roles** tab and click the **plus (+) icon**.
3. Select a **Group** role type (e.g., a role that grants read-only or read/write access).
4. Set the **Type** to *Device* and select your newly created **Entity Group** (the Device Group).
5. Click **Add**.

:::tip
You can repeat this sharing process across as many user groups as needed. The exact same device group can be shared with "Customer A" (with read-only rights) and your "Service Team" (with full access rights) simultaneously!
:::