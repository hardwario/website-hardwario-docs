---
title: Firewall
description: "Upravte 10.0.0.0/24 podle skutečné podsítě vaší LAN."
---

# Firewall {#firewall}

1. Nainstalujte `ufw`:

   ```sh
   sudo apt install -y ufw
   ```

1. **Povolte SSH ještě před zapnutím firewallu** — obrácený postup vás může připravit o přístup:

   ```sh
   sudo ufw allow 22/tcp
   sudo ufw allow from 10.0.0.0/24 to any port 8080
   sudo ufw allow from 10.0.0.0/24 to any port 1880
   sudo ufw allow from 10.0.0.0/24 to any port 80
   sudo ufw allow from 10.0.0.0/24 to any port 8086
   sudo ufw allow from 10.0.0.0/24 to any port 3000
   ```

   :::tip

   Upravte `10.0.0.0/24` podle skutečné podsítě vaší LAN.

   :::

1. Zapněte firewall:

   ```sh
   sudo ufw enable
   ```

1. Než se odpojíte, okamžitě ověřte z jiného počítače v LAN, že SSH a všechna webová
   rozhraní jsou stále dostupná.
