---
title: Install ChirpStack MQTT Forwarder
---

# Install ChirpStack MQTT Forwarder

This section installs the **ChirpStack MQTT Forwarder** that connects the Concentratord to the
MQTT broker. It depends on Concentratord already running (see above).

1. Install the **ChirpStack MQTT Forwarder** package:

   ```sh
   sudo apt install chirpstack-mqtt-forwarder
   ```

1. Write the **MQTT Forwarder** configuration file:

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

1. Enable and start the service:

   ```sh
   sudo systemctl enable --now chirpstack-mqtt-forwarder
   ```

1. Check the service logs to verify successful startup:

   ```sh
   sudo journalctl -fu chirpstack-mqtt-forwarder
   ```
