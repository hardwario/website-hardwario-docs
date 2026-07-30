---
title: Install ChirpStack
---

# Install ChirpStack

1. Install required packages for **ChirpStack** (MQTT broker and Redis):

   ```sh
   sudo apt install \
       mosquitto \
       mosquitto-clients \
       redis-server \
       redis-tools
   ```

1. Install the **GPG tool** for verifying package signatures:

   ```sh
   sudo apt install gpg
   ```

1. Create the directory for **APT keyrings** if it doesn't exist:

   ```sh
   sudo mkdir -p /etc/apt/keyrings/
   ```

1. Download and add the **ChirpStack** repository GPG key:

   ```sh
   sudo sh -c 'wget -q -O - https://artifacts.chirpstack.io/packages/chirpstack.key | gpg --dearmor > /etc/apt/keyrings/chirpstack.gpg'
   ```

1. Add the **ChirpStack** repository to the APT sources list:

   ```sh
   echo "deb [signed-by=/etc/apt/keyrings/chirpstack.gpg] https://artifacts.chirpstack.io/packages/4.x/deb stable main" | sudo tee /etc/apt/sources.list.d/chirpstack.list
   ```

1. Update the package list and install the **ChirpStack** package (SQLite variant):

   ```sh
   sudo apt update
   sudo apt install chirpstack-sqlite
   ```

1. Create the `/var/lib/chirpstack` directory and the SQLite database file with proper ownership:

   ```sh
   sudo mkdir -p /var/lib/chirpstack
   sudo chown chirpstack:chirpstack /var/lib/chirpstack
   sudo chmod 0750 /var/lib/chirpstack
   sudo install -o chirpstack -g chirpstack -m 0640 /dev/null /var/lib/chirpstack/chirpstack.sqlite
   ```

1. Write the **ChirpStack** configuration file:

   ```sh
   cat << 'EOF' | sudo tee /etc/chirpstack/chirpstack.toml > /dev/null
   [logging]
     level = "info"

   [sqlite]
     path="sqlite:///var/lib/chirpstack/chirpstack.sqlite"
     pragmas=[
       "busy_timeout = 1000",
       "foreign_keys = ON",
     ]

   [redis]
     servers = ["redis://localhost/"]
     cluster = false

   [network]
     net_id = "000000"
     enabled_regions = [
       "as923",
       "as923_2",
       "as923_3",
       "as923_4",
       "au915_0",
       "cn470_10",
       "cn779",
       "eu433",
       "eu868",
       "in865",
       "ism2400",
       "kr920",
       "ru864",
       "us915_0",
       "us915_1",
     ]

   [api]
     bind = "0.0.0.0:8080"
     secret = "you-must-replace-this"

   [integration]
     enabled = ["mqtt"]

     [integration.mqtt]
       server = "tcp://localhost:1883/"
       json = true
   EOF
   ```

1. Generate and set a random secret key in the **ChirpStack** configuration:

   ```sh
   sudo chown chirpstack:chirpstack /etc/chirpstack/chirpstack.toml
   sudo chmod 0640 /etc/chirpstack/chirpstack.toml
   sudo sed -i "s|secret = \"you-must-replace-this\"|secret = \"$(openssl rand -base64 32)\"|" /etc/chirpstack/chirpstack.toml
   ```

1. Enable and start the **ChirpStack** service:

   ```sh
   sudo systemctl enable --now chirpstack-sqlite
   ```

1. Check the service logs to verify successful startup:

   ```sh
   sudo journalctl -fu chirpstack-sqlite
   ```

1. Now, you can access **ChirpStack** at this address: `http://[TARGET IP ADDRESS]:8080/`

   :::danger

   The default login is `admin` / `admin`. Change this password before exposing the device on
   any shared network.

   :::
