---
title: Instalace Node-RED
description: "Výše uvedený release asset se jmenuje install-update-nodered-deb. Pokud v budoucnu vrátí 404,"
---

# Instalace Node-RED {#install-node-red}

1. Stáhněte a spusťte instalační skript **Node-RED**:

   ```sh
   bash <(curl -sL https://github.com/node-red/linux-installers/releases/latest/download/install-update-nodered-deb)
   ```

   :::tip

   Výše uvedený release asset se jmenuje `install-update-nodered-deb`. Pokud v budoucnu vrátí 404,
   podívejte se na [stránku releasů node-red/linux-installers](https://github.com/node-red/linux-installers/releases)
   a zjistěte aktuální název assetu.

   :::

1. Povolte automatické spouštění služby **Node-RED** při startu systému:

   ```sh
   sudo systemctl enable nodered.service
   ```

1. Restartujte systém, čímž se instalace dokončí:

   ```sh
   sudo reboot
   ```

1. Nyní je **Node-RED** dostupný na této adrese: `http://[TARGET IP ADDRESS]:1880/`

## Zabezpečení a tok dat {#hardening--data-flow}

1. Nastavte explicitní tajný klíč pro šifrování přihlašovacích údajů. Bez něj Node-RED generuje nový
   při každém restartu a všechny uložené přihlašovací údaje flows se stanou neobnovitelnými. V souboru
   `~/.node-red/settings.js` odkomentujte a nastavte:

   ```js
   credentialSecret: "<a random secret>",
   ```

1. Zabezpečte editor. **Ve výchozím stavu je zcela otevřený**. Samotný instalační výstup Node-RED
   výslovně varuje před jeho nezabezpečeným vystavením. Vygenerujte hash hesla:

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

1. Nainstalujte node pro InfluxDB:

   ```sh
   cd ~/.node-red && npm install node-red-contrib-influxdb
   sudo systemctl restart nodered.service
   ```

   :::tip

   Restart je nutný, protože Node-RED za běhu nenahrává nově nainstalované typy nodes.

   :::

1. Vytvořte flow: **MQTT in** (topic `application/+/device/+/event/up`, broker
   `localhost:1883`) → **Function** (parsování uplink JSON z ChirpStack, nastavení `msg.measurement` a
   `msg.payload = [fields, tags]`) → **InfluxDB out** (konfigurační node: `influxdbVersion: "2.0"`,
   `url: http://localhost:8086`, token z kroku [Instalace InfluxDB](influxdb); node: `org:
   fiber`, `bucket: fiber`).

   :::tip

   Dokud není připojena žádná brána nebo zařízení LoRaWAN, je toto flow jen přípravou. Vytvořte ho
   nyní, aby bylo připraveno, jakmile budou brána a zařízení zaregistrovány (viz
   [Registrace brány a zařízení](register-device) výše) a začnou přicházet skutečné uplinky.

   :::
