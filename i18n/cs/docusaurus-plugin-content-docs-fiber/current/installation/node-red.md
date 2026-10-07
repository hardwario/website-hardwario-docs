---
title: Instalace Node-RED
---

# Instalace Node-RED {#install-node-red}

1. Stáhněte a spusťte instalační skript **Node-RED**:

   ```sh
   bash <(curl -sL https://github.com/node-red/linux-installers/releases/latest/download/install-update-nodered-deb)
   ```

   :::tip

   Výše uvedený soubor z vydání se jmenuje `install-update-nodered-deb`. Pokud jednou začne vracet
   chybu 404, zjistěte jeho aktuální název na [stránce vydání node-red/linux-installers](https://github.com/node-red/linux-installers/releases).

   :::

1. Povolte automatické spouštění služby **Node-RED** při startu systému:

   ```sh
   sudo systemctl enable nodered.service
   ```

1. Restartem systému instalaci dokončete:

   ```sh
   sudo reboot
   ```

1. **Node-RED** je teď dostupný na adrese: `http://[TARGET IP ADDRESS]:1880/`

## Zabezpečení a tok dat {#hardening--data-flow}

1. Nastavte explicitní tajný klíč pro šifrování přihlašovacích údajů. Bez něj Node-RED generuje nový
   při každém restartu a přihlašovací údaje uložené ve flows už nepůjde obnovit. V souboru
   `~/.node-red/settings.js` odkomentujte a nastavte:

   ```js
   credentialSecret: "<a random secret>",
   ```

1. Zabezpečte editor. **Ve výchozím stavu je zcela otevřený.** Instalační výstup Node-RED sám
   výslovně varuje, aby editor nebyl bez zabezpečení přístupný ze sítě. Vygenerujte hash hesla:

   ```sh
   node-red admin hash-pw
   ```

   Potom v `settings.js` odkomentujte a vyplňte blok `adminAuth` tímto hashem:

   ```js
   adminAuth: {
       type: "credentials",
       users: [{
           username: "admin",
           password: "<bcrypt hash from above>",
           permissions: "*"
       }]
   },
   ```

   ```sh
   sudo systemctl restart nodered.service
   ```

1. Nainstalujte uzel pro InfluxDB:

   ```sh
   cd ~/.node-red && npm install node-red-contrib-influxdb
   sudo systemctl restart nodered.service
   ```

   :::tip

   Restart je nutný, protože Node-RED za běhu nenačítá nově nainstalované typy uzlů.

   :::

1. Vytvořte flow: **MQTT in** (topic `application/+/device/+/event/up`, broker
   `localhost:1883`) → **Function** (rozparsuje JSON uplinku z ChirpStack a nastaví `msg.measurement` a
   `msg.payload = [fields, tags]`) → **InfluxDB out** (konfigurační uzel: `influxdbVersion: "2.0"`,
   `url: http://localhost:8086`, token z kroku [Instalace InfluxDB](/fiber/installation/influxdb/); uzel: `org:
   fiber`, `bucket: fiber`).

   :::tip

   Dokud není připojená žádná brána ani zařízení LoRaWAN, je tento flow jen příprava. Vytvořte ho
   už teď, aby byl připravený, jakmile zaregistrujete bránu a zařízení (viz
   [Registrace brány a zařízení](/fiber/installation/register-device/) výše) a začnou přicházet skutečné uplinky.

   :::
