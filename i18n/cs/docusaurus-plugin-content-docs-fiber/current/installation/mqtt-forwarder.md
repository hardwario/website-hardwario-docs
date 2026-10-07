---
title: Instalace ChirpStack MQTT Forwarder
---

# Instalace ChirpStack MQTT Forwarder {#install-chirpstack-mqtt-forwarder}

V této části nainstalujete **ChirpStack MQTT Forwarder**, který propojuje Concentratord s brokerem
MQTT. Concentratord už musí běžet (viz předchozí krok).

1. Nainstalujte balíček **ChirpStack MQTT Forwarder**:

   ```sh
   sudo apt install chirpstack-mqtt-forwarder
   ```

1. Vytvořte konfigurační soubor služby **MQTT Forwarder**:

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

1. V logu služby ověřte, že se úspěšně spustila:

   ```sh
   sudo journalctl -fu chirpstack-mqtt-forwarder
   ```
