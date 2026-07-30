---
title: Install Node-RED
---

# Install Node-RED

1. Download and run the **Node-RED** installation script:

   ```sh
   bash <(curl -sL https://github.com/node-red/linux-installers/releases/latest/download/update-nodejs-and-nodered-deb)
   ```

   :::tip

   Check the actual current release asset name/URL before running this — release filenames on
   the `node-red/linux-installers` GitHub repository have changed between versions.

   :::

1. Enable the **Node-RED** service to start automatically on boot:

   ```sh
   sudo systemctl enable nodered.service
   ```

1. Reboot the system to complete the installation:

   ```sh
   sudo reboot
   ```

1. Now, you can access **Node-RED** at this address: `http://[TARGET IP ADDRESS]:1880/`

:::tip

Running a **FIBER Lite**? Its full pre-integrated pipeline adds hardening (credential secret,
editor auth) and an InfluxDB-bound flow on top of this — see
[**Additional Hardening & Data Flow**](/fiber/fiber-lite/node-red-hardening) under FIBER Lite
in the sidebar.

:::
