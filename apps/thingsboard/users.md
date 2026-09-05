---
slug: users
title: Adding Users
---

import Image from '@theme/IdealImage';

# Adding Users

In this guide, you will learn how to create new user accounts, send activation links, and manage login credentials in ThingsBoard.

---

## Step 1: Create a New User

1. Select **Users** from the left-hand navigation menu.
2. Click the **"+" (Plus)** button on the right side of the screen.

![Users list in ThingsBoard with the plus button in the top-right corner for creating a new user](images/users-0.png)

3. Enter the required information about the user.
4. At the bottom, locate the **Activation method** section. You have two options for inviting the user to ThingsBoard (this can also be done later):
   - **Display activation link:** Generates a link that you can manually copy and send to the user yourself.
   - **Send activation mail:** Sends an automated email directly from ThingsBoard containing the activation link.

![Add user dialog's User details step with email, name, phone fields, and the Activation method selector](images/users-1.png)

5. Next, click on **Owner and groups** at the top right.
6. Select the **Customer** and the **User Group** the user will belong to.
   > **Reminder:** The assigned group determines which dashboards and devices the user will be able to see, as well as their specific permissions.

![Add user dialog's Owner and groups step with the customer selected and the entity group list open](images/users-2.png)

7. Finally, click **Add**.

You have successfully created a new user!

:::info
**Need to manage user access?** See [**User Management**](/apps/thingsboard/users-managing) to learn how to create groups, assign roles, and control access to specific devices or dashboards.
:::

---

## Step 2: Invite or Activate a User

If you skipped the activation step during creation, or if you need to resend the invite so the user can log in and create a password, do the following:

1. Click on the specific user from your Users list.
2. In the **Details** tab, choose one of the following actions:
   - **Resend activation:** Automatically sends an email with the activation link to the user.
   - **Display activation link:** Displays a URL that you can manually copy and send to the user. Once they click this link, they will be prompted to create their new password.

![User details panel with the Display activation link and Resend activation buttons in the Details tab](images/users-3.png)

---

## How to Change Your Password

1. Click on the **three dots** next to your user icon in the top right corner.
2. Select **Account** from the drop-down menu.

![Home screen with the top-right user menu open, offering Account and Logout options](images/password-change-1.png)

3. You will be directed to the **Profile** tab, where you can also update your general account information.
4. To **change your password**, switch to the **Security** tab.
5. Enter your current password, followed by your new password.

:::info
If you received a **temporary password via email**, please enter it in the current password field.
:::

![Account Security tab with Change Password fields for current and new passwords, next to the password requirements](images/password-change-2.png)
