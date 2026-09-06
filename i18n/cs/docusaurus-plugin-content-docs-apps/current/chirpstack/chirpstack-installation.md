---
slug: chirpstack-installation
title: Instalace
description: "Tento průvodce popisuje instalaci ChirpStack v4 na systému Debian/Ubuntu. Zahrnuje instalaci potřebných závislostí, konfiguraci serveru ChirpStack a zprovoznění komunikace s branami. Postupujte podle pokynů krok za krokem, aby instalace proběhla bez…"
title_meta: "Instalace (ChirpStack)"
---
import Image from '@theme/IdealImage';

# Průvodce instalací ChirpStack v4 {#chirpstack-v4-installation-guide}

Tento průvodce popisuje instalaci **ChirpStack v4** na **systému Debian/Ubuntu**. Zahrnuje instalaci potřebných závislostí, konfiguraci serveru ChirpStack a zprovoznění komunikace s branami. Postupujte podle pokynů krok za krokem, aby instalace proběhla bez potíží.

---

## Předpoklady {#prerequisites}

Než začnete, ujistěte se, že máte aktuální systém. V terminálu spusťte tento příkaz:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## Postup {#procedure}

### Instalace potřebných závislostí {#install-required-dependencies}

Nainstalujte `Mosquitto`, `Redis` a `PostgreSQL`, které jsou pro provoz ChirpStacku nezbytné:

```bash
sudo apt install \
mosquitto \
mosquitto-clients \
redis-server \
redis-tools \
postgresql
```

### Konfigurace databáze PostgreSQL {#configure-postgresql-database}

1. Přihlaste se do `PostgreSQL CLI` (příkazové řádky) a vytvořte pro ChirpStack samostatnou roli a databázi:

   ```bash
   sudo -u postgres psql
   ```

2. Spusťte potřebné databázové příkazy:

   ```sql
   CREATE ROLE chirpstack WITH LOGIN PASSWORD 'chirpstack';

   CREATE DATABASE chirpstack WITH OWNER chirpstack;

   \c chirpstack

   CREATE EXTENSION pg_trgm;

   \q
   ```

  :::warning
  
  Následující SQL příkazy spouštějte v PostgreSQL CLI **jeden po druhém**.
  
  :::

### Přidání repozitáře ChirpStack {#add-chirpstack-repository}

Standardní nastavení repozitáře (doporučené dokumentací ChirpStacku):

1. Nainstalujte potřebné balíčky:

   ```bash
   sudo apt install apt-transport-https dirmngr
   ```

2. Nastavte klíč repozitáře ChirpStack:

   ```bash
   sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1CE2AFD36DBCCA00
   ```

3. Přidejte repozitář do seznamu:

   ```bash
   sudo echo "deb https://artifacts.chirpstack.io/packages/4.x/deb stable main" | sudo tee /etc/apt/sources.list.d/chirpstack.list
   ```

4. Aktualizujte seznam balíčků:

   ```bash
   sudo apt update
   ```

### Instalace ChirpStacku a Gateway Bridge {#install-chirpstack-and-gateway-bridge}

Aktualizujte seznam balíčků a nainstalujte `ChirpStack server` a `Gateway Bridge`:

```bash
sudo apt install chirpstack chirpstack-gateway-bridge
```

### Vygenerování secret key {#generate-a-secret-key}

Vygenerujte unikátní secret key pro zabezpečení API a přihlašovacích tokenů. Vygenerovaný klíč si zkopírujte, budete ho potřebovat v konfiguraci:

```bash
openssl rand -base64 32
```

### Konfigurace ChirpStacku {#configure-chirpstack}

1. Otevřete konfigurační soubor ChirpStacku:

   ```bash
   sudo nano /etc/chirpstack/chirpstack.toml
   ```

2. Zapněte region `EU868`:

   ```toml
   [network]

   enabled_regions = [
       "eu868",
   ]
   ```

3. Nastavte secret key:

   ```toml
   secret = "PASTE_YOUR_SECRET_KEY_HERE"
   ```

### Konfigurace ChirpStack Gateway Bridge {#configure-chirpstack-gateway-bridge}

1. Otevřete konfigurační soubor **Gateway Bridge**:

   ```bash
   sudo nano /etc/chirpstack-gateway-bridge/chirpstack-gateway-bridge.toml
   ```

2. Upravte šablony topiců integrace **MQTT**:

   ```toml
   [integration.mqtt]
   event_topic_template="eu868/gateway/{{ .GatewayID }}/event/{{ .EventType }}"
   state_topic_template="eu868/gateway/{{ .GatewayID }}/state/{{ .StateType }}"
   command_topic_template="eu868/gateway/{{ .GatewayID }}/command/#"
   ```

### Kontrola konfigurace hostů {#verify-host-configuration}

Ujistěte se, že je `127.0.0.1` namapovaná na localhost:

```bash
sudo cat /etc/hosts
```

:::warning

Pokud chybí, přidejte do souboru `/etc/hosts` tento řádek:

:::

```bash
echo "127.0.0.1 localhost" | sudo tee -a /etc/hosts
```

### Spuštění a povolení služeb ChirpStack {#start-and-enable-chirpstack-services}

Spusťte a povolte služby ChirpStack a **Gateway Bridge**:

```bash
sudo systemctl start chirpstack
sudo systemctl enable chirpstack
sudo systemctl start chirpstack-gateway-bridge
sudo systemctl enable chirpstack-gateway-bridge
```

### Kontrola stavu služeb {#verify-service-status}

Zkontrolujte logy, abyste se ujistili, že služby běží správně:

```bash
sudo journalctl -u chirpstack -f
sudo journalctl -u chirpstack-gateway-bridge -f
```

### Povolení vnějších připojení k MQTT brokeru {#allow-outside-connections-to-mqtt-broker}

:::info

Především pro účely testování a ladění

:::

- Otevřete konfigurační soubor mosquitto v `/etc/mosquitto/mosquitto.conf`:  
  Na konec přidejte:  
  ```
  listener 1883
  allow_anonymous true
  ```
---

## Kontrolní seznam po instalaci {#post-installation-checklist}

### Přístup do webového rozhraní ChirpStack {#access-the-chirpstack-web-interface}

1. Po spuštění služby ChirpStack otevřete webové rozhraní v prohlížeči na adrese:

   ```arduino
   http://localhost:8080
   ```

   > Pokud ChirpStack běží na vzdáleném serveru, nahraďte `localhost` IP adresou nebo hostname serveru.

2. Ujistěte se, že port `8080` není blokovaný a na serveru naslouchá:

   ```bash
   sudo netstat -tuln | grep 8080
   ```

  :::note
  
  Pokud výstup ukazuje, že port 8080 naslouchá, je připravený přijímat připojení.
  
  :::

3. Přihlaste se výchozími údaji:

   Uživatelské jméno: `admin`  
   Heslo: `admin`

### Kontrola připojení brány LoRaWAN {#verify-lorawan-gateway-connection}

Abyste se ujistili, že je vaše brána **LoRaWAN** připojená a funkční:

- Přejděte ve webovém rozhraní ChirpStack do sekce **Gateway**:

  - Ve webovém rozhraní ChirpStack přejděte na `Gateways`.

- Zkontrolujte stav brány:

  - Ujistěte se, že se vaše brána objevila v seznamu.

  - Zkontrolujte, že se hodnota `"Last Seen"` aktualizuje.

- Řešení problémů s připojením:

  - Zkontrolujte logy brány, abyste se ujistili, že je komunikace s ChirpStackem správně nastavená.

  - Zkontrolujte konfiguraci topiců **MQTT** v souboru `chirpstack-gateway-bridge.toml`.

---

## Dokončení {#completion}

Instalace ChirpStacku je hotová! Nyní se můžete přihlásit do webového rozhraní ChirpStack a nastavit své brány a zařízení LoRaWAN. Pokud narazíte na problémy, podívejte se do logů nebo do oficiální [dokumentace ChirpStack](https://www.chirpstack.io/docs/index.html).
