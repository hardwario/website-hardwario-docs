---
title: Install Grafana
---

# Install Grafana

Part of FIBER Lite's complete pre-integrated software stack. Not part of a stock FIBER install.

1. Install prerequisites and add the **Grafana** repository:

   ```sh
   sudo apt-get install -y apt-transport-https wget gnupg
   sudo mkdir -p /etc/apt/keyrings
   sudo wget -O /etc/apt/keyrings/grafana.asc https://apt.grafana.com/gpg-full.key
   sudo chmod 644 /etc/apt/keyrings/grafana.asc
   echo "deb [signed-by=/etc/apt/keyrings/grafana.asc] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
   ```

1. Update the package list, install, and enable **Grafana**:

   ```sh
   sudo apt-get update
   sudo apt-get install -y grafana
   sudo systemctl enable --now grafana-server
   ```

1. Change the default admin password via the API:

   ```sh
   curl -X PUT http://localhost:3000/api/admin/users/1/password \
     -u admin:admin -H "Content-Type: application/json" \
     -d '{"password":"<new password>"}'
   ```

1. Add the InfluxDB datasource:

   ```sh
   curl -X POST http://localhost:3000/api/datasources \
     -u admin:<new password> -H "Content-Type: application/json" \
     -d '{
       "name": "InfluxDB fiber-lite", "type": "influxdb", "access": "proxy",
       "url": "http://localhost:8086",
       "jsonData": {"version": "Flux", "organization": "fiber-lite", "defaultBucket": "fiber-lite", "tlsSkipVerify": true},
       "secureJsonData": {"token": "<influxdb token from the InfluxDB setup step>"}
     }'
   ```

1. Now, you can access **Grafana** at this address: `http://[TARGET IP ADDRESS]:3000/`

   :::tip

   Dashboard panels are best built once there's real device/gateway data flowing in — there's
   nothing meaningful to visualize before that.

   :::
