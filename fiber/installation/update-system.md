---
title: Update System
description: "After flashing, bring Raspberry Pi OS on FIBER up to date: refresh the package list with apt update, upgrade all packages with apt upgrade and reboot."
---

# Update System

1. Update the package list to get information on the newest versions of packages:

   ```sh
   sudo apt update
   ```

1. Upgrade all installed packages to their latest versions:

   ```sh
   sudo apt upgrade -y
   ```

1. Reboot the system to apply updates:

   ```sh
   sudo reboot
   ```
