---
title: Aktualizace systému
description: "Po nahrání systému aktualizujte Raspberry Pi OS na zařízení FIBER: seznam balíčků příkazem apt update, všechny balíčky příkazem apt upgrade a pak restart."
---

# Aktualizace systému {#update-system}

1. Aktualizujte seznam balíčků, aby systém znal jejich nejnovější verze:

   ```sh
   sudo apt update
   ```

1. Aktualizujte všechny nainstalované balíčky na nejnovější verze:

   ```sh
   sudo apt upgrade -y
   ```

1. Restartujte systém, aby se aktualizace projevily:

   ```sh
   sudo reboot
   ```
