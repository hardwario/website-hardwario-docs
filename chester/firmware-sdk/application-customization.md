---
slug: application-customization
title: Application Customization
---
import Image from '@theme/IdealImage';

# Application Customization

This article explains workflow when you need to modify the existing catalog application in the **CHESTER SDK**. There are multiple ways how a developer can do this, but the goal of this article is to demonstrate a process that provides low friction when the developer needs to keep pace with the **CHESTER SDK** updates.

## Creating Application Fork

This chapter will guide you through the process of how to create a **fork of the catalog application**. As an example, we will use the catalog application **CHESTER Current**, but the process can be applied to anything in the **CHESTER SDK** - feel free to enhance the in-tree drivers.

:::tip

If your change is generic enough and you believe anybody could benefit from it, talk to us about upstreaming your work. Exposing your code to a wider audience brings the benefit of potentially higher testing exposure, and very likely, your hands will be free from its further maintenance.

:::

This flow is based on cloning the **Git** repository and creating your own **Git** branch from the `main` branch (the local `main` branch will be synchronized with the `main` branch from the **CHESTER SDK** remote server).

Below is the minimized set of commands that is extracted from the **CHESTER SDK** installation procedure on [**Ubuntu**](./installation-on-ubuntu.md). The only difference is that we do **NOT** use the `skeleton` **Git** repository as a starting point, but we rather use the **CHESTER SDK** itself as the root repository.

1. Setup the **West** workspace with **CHESTER SDK**:

   ```
   mkdir chester-app && cd chester-app
   python3 -m venv venv
   source venv/bin/activate
   pip install --upgrade pip
   pip install west
   west init -m git@github.com:hardwario/chester-sdk.git --manifest-rev main
   west config build.board chester
   west update
   west packages pip --install
   west zephyr-export
   west sdk install -t arm-zephyr-eabi
   ```

1. Switch to the **CHESTER SDK** repository directory:

   ```
   cd chester
   ```

1. In this **Git** repository, change the **Git remote** called `origin` pointing to **HARDWARIO** to `upstream`:

   ```
   git remote rename origin upstream
   ```

   :::tip

   We do this because, in the following steps, we will set up your own **Git** remote as the `origin`.

   :::

1. On your company Git server, set up an empty repository (e.g., `chester-sdk`).

1. Add your company **Git** server **SSH** path as the new `origin` remote:

   ```
   git remote add origin git@gitlab.awesome-company.com:chester-sdk.git
   ```

   :::caution

   Do not just copy/paste the command above - update the address with the real one provided by your **Git** server.

   :::

1. Push the `main` branch of the recently initialized **CHESTER SDK** repository to your remote:

   ```
   git push origin main
   ```

1. Create a new Git branch for the enhanced **CHESTER Current** application:

   ```
   git switch -c awesome-company/current
   ```

1. Implement your desired changes (e.g., in the directory `chester/application/current`).

   :::tip

   As a result, you will have one-to-many new commits on top of the `awesome-company/current` branch.

   :::

1. Push the changes in your **Git** branch to your **Git** remote:

   ```
   git push origin awesome-company/current
   ```

At this point, in your **local** repository (on the disk) and your **Git** server, you will have the `main` branch that copies the `main` branch from the **CHESTER SDK** hosted on **GitLab** from **HARDWARIO**. Also, you will have your new **Git** branch with the requested changes on your **Git** remote, referred to as `origin`.

## Updating Your Application

You are advised to regularly synchronize your custom application changes to the latest version of the **CHESTER SDK**. The following steps will guide you through the update procedure.

1. Assuming you are in the `awesome-company/current` **Git** branch, get the latest changes in the **CHESTER SDK**:

   ```
   git fetch upstream main:main
   ```

   :::tip

   At this point, the `main` branch may receive multiple of the new **Git** commits.

   :::

1. Now you can rebase your branch to the latest changes in the `main` branch:

   ```
   git rebase main
   ```

   :::tip

   Your **Git** commits will be re-played on top of the commits from the `main` branch.

   :::

   :::caution

   Occasionally the recent updates in the **CHESTER SDK** might be in conflict with your changes. If **Git** cannot resolve the conflicts automatically, it will guide you through the conflict resolution. If you have created multiple **Git** commits, you may resolve them one by one. For that reason, it is sometimes easier to maintain your changes as a single commit if the change has a reasonable size.

   :::

1. In the next step, push your branch with the recent updates to your **Git** remote:

   ```
   git push origin awesome-company/current -f
   ```

   :::tip

   Notice the `-f` (force) parameter at the end of the command. That is because the Git history has been rewritten using the `git rebase` command, and your local branch has **diverged** from your remote branch. This parameter tells the **Git** remote server to enforce branch overwrite.

   :::

The above workflow should help you to keep your work synchronized with the **CHESTER SDK**. You can think of your work as a set of patches that are played on top of the **CHESTER SDK** `main` branch.
