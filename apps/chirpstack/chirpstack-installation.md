---
slug: chirpstack-installation
title: Installation
title_meta: "Installation (ChirpStack)"
---
import Image from '@theme/IdealImage';

# ChirpStack v4 Installation Guide

This guide outlines the installation process of **ChirpStack v4** on a **Debian/Ubuntu system**. It covers installing the required dependencies, configuring the ChirpStack server, and enabling communication with gateways. Follow the instructions step by step for a smooth installation process.

---

## Prerequisites

Before you start, ensure your system is up to date. Run the following command in your terminal:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## Procedure

### Install Required Dependencies

Install `Mosquitto`, `Redis`, and `PostgreSQL`, which are essential for ChirpStack's operation:

```bash
sudo apt install \
mosquitto \
mosquitto-clients \
redis-server \
redis-tools \
postgresql
```

### Configure PostgreSQL Database

1. Log in to the `PostgreSQL CLI` (command-line interface) and create a dedicated role and database for ChirpStack:

   ```bash
   sudo -u postgres psql
   ```

2. Run the required database requirements:

   ```sql
   CREATE ROLE chirpstack WITH LOGIN PASSWORD 'chirpstack';

   CREATE DATABASE chirpstack WITH OWNER chirpstack;

   \c chirpstack

   CREATE EXTENSION pg_trgm;

   \q
   ```

  :::warning
  
  Run the following SQL commands **one by one** in the PostgreSQL CLI.
  
  :::

### Add ChirpStack Repository

Standard Repository Setup (Recommended by ChirpStack Documentation):

1. Install the necessary packages:

   ```bash
   sudo apt install apt-transport-https dirmngr
   ```

2. Set up the ChirpStack repository key:

   ```bash
   sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1CE2AFD36DBCCA00
   ```

3. Add the repository to the list:

   ```bash
   sudo echo "deb https://artifacts.chirpstack.io/packages/4.x/deb stable main" | sudo tee /etc/apt/sources.list.d/chirpstack.list
   ```

4. Update the package list:

   ```bash
   sudo apt update
   ```

### Install ChirpStack and Gateway Bridge

Update the package list and install the `ChirpStack server` and `Gateway Bridge`:

```bash
sudo apt install chirpstack chirpstack-gateway-bridge
```

### Generate a Secret Key

Generate a unique secret key for securing API and login tokens. Make sure to copy the generated key for use in the configuration:

```bash
openssl rand -base64 32
```

### Configure ChirpStack

1. Edit the ChirpStack configuration file:

   ```bash
   sudo nano /etc/chirpstack/chirpstack.toml
   ```

2. Enable `EU868` Region:

   ```toml
   [network]

   enabled_regions = [
       "eu868",
   ]
   ```

3. Set the Secret Key:

   ```toml
   secret = "PASTE_YOUR_SECRET_KEY_HERE"
   ```

### Configure ChirpStack Gateway Bridge

1. Edit the **Gateway Bridge** configuration file:

   ```bash
   sudo nano /etc/chirpstack-gateway-bridge/chirpstack-gateway-bridge.toml
   ```

2. Update the **MQTT** integration topic templates:

   ```toml
   [integration.mqtt]
   event_topic_template="eu868/gateway/{{ .GatewayID }}/event/{{ .EventType }}"
   state_topic_template="eu868/gateway/{{ .GatewayID }}/state/{{ .StateType }}"
   command_topic_template="eu868/gateway/{{ .GatewayID }}/command/#"
   ```

### Verify Host Configuration

Ensure `127.0.0.1` is mapped to localhost:

```bash
sudo cat /etc/hosts
```

:::warning

If missing, add the following line to file `/etc/hosts`:

:::

```bash
echo "127.0.0.1 localhost" | sudo tee -a /etc/hosts
```

### Start and Enable ChirpStack Services

Start and enable the ChirpStack and **Gateway Bridge** services:

```bash
sudo systemctl start chirpstack
sudo systemctl enable chirpstack
sudo systemctl start chirpstack-gateway-bridge
sudo systemctl enable chirpstack-gateway-bridge
```

### Verify Service Status

Check the logs to ensure that the services are running correctly:

```bash
sudo journalctl -u chirpstack -f
sudo journalctl -u chirpstack-gateway-bridge -f
```

### Allow outside connections to MQTT broker

:::info

Mainly for testing and debug purposes

:::

- Edit the mosquitto config file in `/etc/mosquitto/mosquitto.conf`:  
  Add to the bottom:  
  ```
  listener 1883
  allow_anonymous true
  ```
---

## Post-Installation Checklist

### Access the ChirpStack Web Interface

1. After starting the ChirpStack service, access the web interface using a web browser at:

   ```arduino
   http://localhost:8080
   ```

   > If ChirpStack is hosted on a remote server, replace `localhost` with the server's IP address or hostname.

2. Ensure that port `8080` is not blocked and is listening on the server:

   ```bash
   sudo netstat -tuln | grep 8080
   ```

  :::note
  
  If the output shows that port 8080 is listening, it is ready to accept connections.
  
  :::

3. Log in using the default credentials:

   Username: `admin`  
   Password: `admin`

### Verify LoRaWAN Gateway Connection

To confirm that your **LoRaWAN** gateway is connected and operational:

- Navigate to the **Gateway** section in the ChirpStack web interface:

  - In the ChirpStack web interface, go to `Gateways`.

- Check Gateway Status:

  - Ensure that your gateway appears in the list.

  - Verify that the `"Last Seen"` value is updating.

- Troubleshoot Connection Issues:

  - Check the gateway logs to ensure proper configuration for communication with ChirpStack.

  - Verify the **MQTT** topic configuration in the `chirpstack-gateway-bridge.toml` file.

---

## Completion

Your ChirpStack installation is now complete! You can now access the ChirpStack web interface and configure your LoRaWAN gateways and devices. If you encounter any issues, refer to the logs or consult the official [ChirpStack Documentation](https://www.chirpstack.io/docs/index.html).
