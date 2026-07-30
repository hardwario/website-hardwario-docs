---
title: Install InfluxDB
---

# Install InfluxDB

Part of FIBER Lite's complete pre-integrated software stack. Not part of a stock FIBER install.

1. Download the **InfluxData** repository GPG key and verify its fingerprint before trusting it:

   ```sh
   curl --silent --location -O https://repos.influxdata.com/influxdata-archive.key
   gpg --show-keys --with-fingerprint --with-colons ./influxdata-archive.key 2>&1 \
     | grep -q '^fpr:\+24C975CBA61A024EE1B631787C3D57159FC2F927:$' \
     && echo "fingerprint OK"
   ```

1. Add the key and repository:

   ```sh
   sudo mkdir -p /etc/apt/keyrings
   cat influxdata-archive.key | gpg --dearmor | sudo tee /etc/apt/keyrings/influxdata-archive.gpg > /dev/null
   rm influxdata-archive.key
   echo 'deb [signed-by=/etc/apt/keyrings/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main' | sudo tee /etc/apt/sources.list.d/influxdata.list
   ```

1. Update the package list and install **InfluxDB 2.x** with its CLI:

   ```sh
   sudo apt update
   sudo apt install -y influxdb2 influxdb2-cli
   sudo systemctl enable --now influxdb
   ```

1. Initialize the organization, bucket, and API token non-interactively:

   ```sh
   influx setup --username fiberlite --password '<choose a password>' \
     --org fiber-lite --bucket fiber-lite --token "$(openssl rand -hex 32)" --force
   ```

   :::tip

   `openssl rand -hex 32` generates a random 64-character token so you don't have to invent one.
   Immediately after, run `influx auth list` to print it back out — store it, together with the
   password you chose; they are needed again for the Node-RED flow above and the Grafana
   datasource below.

   :::
