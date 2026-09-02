---
title: Instalace ChirpStack
description: "Výchozí přihlašovací údaje jsou admin / admin. Změňte toto heslo, než zařízení vystavíte"
---

# Instalace ChirpStack {#install-chirpstack}

1. Nainstalujte potřebné balíčky pro **ChirpStack** (MQTT broker a Redis):

   ```sh
   sudo apt install \
       mosquitto \
       mosquitto-clients \
       redis-server \
       redis-tools
   ```

1. Nainstalujte nástroj **GPG** pro verifikaci podpisů balíčků:

   ```sh
   sudo apt install gpg
   ```

1. Vytvořte adresář pro **klíčenky APT**, pokud ještě neexistuje:

   ```sh
   sudo mkdir -p /etc/apt/keyrings/
   ```

1. Stáhněte a přidejte GPG klíč repozitáře **ChirpStack**:

   ```sh
   sudo sh -c 'wget -q -O - https://artifacts.chirpstack.io/packages/chirpstack.key | gpg --dearmor > /etc/apt/keyrings/chirpstack.gpg'
   ```

1. Přidejte repozitář **ChirpStack** do seznamu zdrojů APT:

   ```sh
   echo "deb [signed-by=/etc/apt/keyrings/chirpstack.gpg] https://artifacts.chirpstack.io/packages/4.x/deb stable main" | sudo tee /etc/apt/sources.list.d/chirpstack.list
   ```

1. Aktualizujte seznam balíčků a nainstalujte balíček **ChirpStack** (varianta SQLite):

   ```sh
   sudo apt update
   sudo apt install chirpstack-sqlite
   ```

1. Vytvořte adresář `/var/lib/chirpstack` a soubor databáze SQLite se správným vlastnictvím:

   ```sh
   sudo mkdir -p /var/lib/chirpstack
   sudo chown chirpstack:chirpstack /var/lib/chirpstack
   sudo chmod 0750 /var/lib/chirpstack
   sudo install -o chirpstack -g chirpstack -m 0640 /dev/null /var/lib/chirpstack/chirpstack.sqlite
   ```

1. Zapište konfigurační soubor **ChirpStack**:

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

1. Vygenerujte a nastavte náhodný tajný klíč v konfiguraci **ChirpStack**:

   ```sh
   sudo chown chirpstack:chirpstack /etc/chirpstack/chirpstack.toml
   sudo chmod 0640 /etc/chirpstack/chirpstack.toml
   sudo sed -i "s|secret = \"you-must-replace-this\"|secret = \"$(openssl rand -base64 32)\"|" /etc/chirpstack/chirpstack.toml
   ```

1. Povolte a spusťte službu **ChirpStack**:

   ```sh
   sudo systemctl enable --now chirpstack-sqlite
   ```

1. Zkontrolujte logy služby a ověřte úspěšné spuštění:

   ```sh
   sudo journalctl -fu chirpstack-sqlite
   ```

1. Nyní je **ChirpStack** dostupný na této adrese: `http://[TARGET IP ADDRESS]:8080/`

   :::danger

   Výchozí přihlašovací údaje jsou `admin` / `admin`. Změňte toto heslo, než zařízení vystavíte
   do jakékoli sdílené sítě.

   :::
