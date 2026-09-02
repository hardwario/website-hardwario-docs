---
title: Instalace Grafany
description: "Dostupné na zařízení FIBER i FIBER Lite."
---

# Instalace Grafany {#install-grafana}

Dostupné na zařízení FIBER i FIBER Lite.

1. Nainstalujte potřebné balíčky a přidejte repozitář **Grafana**:

   ```sh
   sudo apt-get install -y apt-transport-https wget gnupg
   sudo mkdir -p /etc/apt/keyrings
   sudo wget -O /etc/apt/keyrings/grafana.asc https://apt.grafana.com/gpg-full.key
   sudo chmod 644 /etc/apt/keyrings/grafana.asc
   echo "deb [signed-by=/etc/apt/keyrings/grafana.asc] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
   ```

1. Aktualizujte seznam balíčků, nainstalujte a zapněte **Grafanu**:

   ```sh
   sudo apt-get update
   sudo apt-get install -y grafana
   sudo systemctl enable --now grafana-server
   ```

1. Změňte výchozí heslo administrátora pomocí API:

   ```sh
   curl -X PUT http://localhost:3000/api/admin/users/1/password \
     -u admin:admin -H "Content-Type: application/json" \
     -d '{"password":"<new password>"}'
   ```

1. Přidejte datový zdroj InfluxDB:

   ```sh
   curl -X POST http://localhost:3000/api/datasources \
     -u admin:<new password> -H "Content-Type: application/json" \
     -d '{
       "name": "InfluxDB fiber", "type": "influxdb", "access": "proxy",
       "url": "http://localhost:8086",
       "jsonData": {"version": "Flux", "organization": "fiber", "defaultBucket": "fiber", "tlsSkipVerify": true},
       "secureJsonData": {"token": "<influxdb token from the InfluxDB setup step>"}
     }'
   ```

1. Nyní je **Grafana** dostupná na této adrese: `http://[TARGET IP ADDRESS]:3000/`

   :::tip

   Panely dashboardu se nejlépe staví ve chvíli, kdy už tečou reálná data ze zařízení či brány — do té
   doby není co smysluplného vizualizovat.

   :::
