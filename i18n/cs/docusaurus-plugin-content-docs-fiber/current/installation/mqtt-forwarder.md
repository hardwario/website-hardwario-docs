---
title: Instalace ChirpStack MQTT Forwarderu
description: "V této části se nainstaluje ChirpStack MQTT Forwarder, který propojuje Concentratord s"
---

# Instalace ChirpStack MQTT Forwarderu {#install-chirpstack-mqtt-forwarder}

V této části se nainstaluje **ChirpStack MQTT Forwarder**, který propojuje Concentratord s
MQTT brokerem. Vyžaduje již běžící Concentratord (viz výše).

1. Nainstalujte balíček **ChirpStack MQTT Forwarder**:

   ```sh
   sudo apt install chirpstack-mqtt-forwarder
   ```

1. Vytvořte konfigurační soubor **MQTT Forwarderu**:

   ```sh
   cat << EOF | sudo tee /etc/chirpstack-mqtt-forwarder/chirpstack-mqtt-forwarder.toml > /dev/null
   [logging]
     level="info"
     log_to_syslog=false

   [backend]
     enabled="concentratord"

     [backend.concentratord]
     event_url = "ipc:///tmp/concentratord_event"
     command_url = "ipc:///tmp/concentratord_command"

   [mqtt]
     topic_prefix="eu868"
     server="tcp://127.0.0.1:1883"
     username=""
     password=""
     ca_cert=""
     tls_cert=""
     tls_key=""
   EOF
   ```

1. Povolte a spusťte službu:

   ```sh
   sudo systemctl enable --now chirpstack-mqtt-forwarder
   ```

1. Zkontrolujte logy služby a ověřte úspěšné spuštění:

   ```sh
   sudo journalctl -fu chirpstack-mqtt-forwarder
   ```
