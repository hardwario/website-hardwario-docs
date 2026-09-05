---
title: Firewall
---

# Firewall

1. Install `ufw`:

   ```sh
   sudo apt install -y ufw
   ```

1. **Allow SSH before enabling the firewall**: reversing this order can lock you out:

   ```sh
   sudo ufw allow 22/tcp
   sudo ufw allow from 10.0.0.0/24 to any port 8080
   sudo ufw allow from 10.0.0.0/24 to any port 1880
   sudo ufw allow from 10.0.0.0/24 to any port 80
   sudo ufw allow from 10.0.0.0/24 to any port 8086
   sudo ufw allow from 10.0.0.0/24 to any port 3000
   ```

   :::tip

   Adjust `10.0.0.0/24` to match your actual LAN subnet.

   :::

1. Enable the firewall:

   ```sh
   sudo ufw enable
   ```

1. Immediately verify SSH and all web UIs are still reachable from another machine on the LAN
   before disconnecting.
