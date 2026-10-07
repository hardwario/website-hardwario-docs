---
title: Firewall
---

# Firewall {#firewall}

1. Nainstalujte `ufw`:

   ```sh
   sudo apt install -y ufw
   ```

1. **SSH povolte ještě před zapnutím firewallu**, jinak si můžete zablokovat přístup:

   ```sh
   sudo ufw allow 22/tcp
   sudo ufw allow from 10.0.0.0/24 to any port 8080
   sudo ufw allow from 10.0.0.0/24 to any port 1880
   sudo ufw allow from 10.0.0.0/24 to any port 80
   sudo ufw allow from 10.0.0.0/24 to any port 8086
   sudo ufw allow from 10.0.0.0/24 to any port 3000
   ```

   :::tip

   Upravte `10.0.0.0/24` podle skutečné podsítě své LAN.

   :::

1. Zapněte firewall:

   ```sh
   sudo ufw enable
   ```

1. Hned potom, ještě než se odpojíte, ověřte z jiného počítače v LAN, že SSH a všechna webová
   rozhraní jsou stále dostupná.
