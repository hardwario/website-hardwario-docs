---
slug: /usage
title: Používání klienta
description: "Použití klienta TAPPER z příkazové řádky: příkazy, volby a argumenty pro ovládání čtečky NFC ze shellu."
---

import Image from '@theme/IdealImage';

# Používání CLI klienta TAPPER {#tapper-client-cli-usage}

## Příkazy {#commands}

Použití: `tapper COMMAND [OPTIONS] [ARGS]...`

### version {#version}

Vypíše na stdout verzi sestavení klienta TAPPER.

`tapper version`

### run {#run}

Spustí klienta.

`tapper run [OPTIONS]` nebo `sudo ~/.local/bin/tapper run [OPTIONS]`, pokud chcete použít konfiguraci Wi-Fi.

:::info 

Bez `sudo` nelze použít NetworkManager.

:::

#### Volby {#options}

- `-c PATH` `--config PATH` cesta ke [konfiguračnímu](#configuration) souboru
- `-d` `--debug` zobrazí ladicí výstup
- `-h IP` `--host IP` hostitel brokeru MQTT
- `-p PORT` `--port PORT` port brokeru MQTT
- `-ca PATH` `--cafile PATH` cesta k souboru s certifikátem CA
- `-cert PATH` `--certfile PATH` cesta k souboru s klientským certifikátem pro TLS
- `-key PATH` `--keyfile PATH` cesta k souboru s klíčem pro TLS
- `--legacy` pro starší hardware R1.0
- `--help` zobrazí nápovědu

#### Chování periferií {#peripherals-behavior}

**LED**

|        Chování        |   Popis    |
| :--------------------: | :--------------: |
| Jedno krátké žluté bliknutí | Detekován tag NFC |
|  Trvale svítí červeně  | Detekováno otevření (tamper)  |

**Bzučák**

|    Chování     |   Popis    |
| :-------------: | :--------------: |
| Jedno krátké pípnutí  | Detekován tag NFC |
| Trvalé pípání | Detekováno otevření (tamper)  |

## Konfigurace {#configuration}

Konfigurační soubor zařízení TAPPER používá syntaxi YAML.

### MQTT {#mqtt}

- Host je hostitel, na kterém běží broker MQTT. Zadat je nutné alespoň tento údaj.
- Port je port, na kterém je broker MQTT dostupný.

```yaml
mqtt:
  host: "your_host" 
  port: 1883
  tls:
    cafile: "/path/to/file"
    certfile: "/path/to/file"
    keyfile: "/path/to/file"
```

#### TLS {#tls}

Jak TLS nastavit, popisuje stránka [Nastavení TLS](/tapper/tls-setup/).

- Cafile je cesta k certifikátu CA (podepisující autority), kterým se ověřuje certifikát serveru.
- Certfile je cesta k souboru s klientským certifikátem, který tato CA podepsala.
- Keyfile je cesta k souboru s klientským klíčem.

:::warning[Certifikát serveru MQTT]

**MQTT host** musí **odpovídat** hodnotě **CN** nebo jednomu ze **SAN** uvedených v certifikátu X509 **serveru**.

Viz [Nastavení TLS pro MQTT](/tapper/tls-setup/)

:::

### Wi-Fi {#wifi}

- Wi-Fi lze nastavit buď ve statickém, nebo v dynamickém režimu.

:::tip

Pole `passphrase` může obsahovat hodnotu `psk` získanou z `wpa_passphrase`.

:::

#### Dynamický režim {#dynamic}

V dynamickém režimu se adresa, brána a servery DNS nastaví automaticky přes DHCP.

```yaml
wifi:
  network: "MyWiFiSSID"
  passphrase: "supersecretpassword"
  mode: "dynamic"
```

#### Statický režim {#static}

Ve statickém režimu nastavíte vše ručně.

```yaml
wifi:
  network: "MyWiFiSSID"
  passphrase: "supersecretpassword"
  mode: "static"
  address: "192.168.1.100/24"
  gateway: "192.168.1.1"
  nameservers:  
  - 8.8.8.8
  - 1.1.1.1
```

K adrese lze připojit délku prefixu nebo masku sítě, jak je vidět v příkladu.

### Příklad {#example}

Příklad konfiguračního souboru `/home/hardwario/tapper.conf`:

```yaml
mqtt:
  host: "10.0.0.150"
  port: 8883
  tls:
    cafile: "/home/hardwario/ca.crt"
    certfile: "/home/hardwario/client.crt"
    keyfile: "/home/hardwario/client.key"
wifi:
  network: "MyWiFiSSID"
  passphrase: "supersecretpassword"
  mode: "static"
  address: "192.168.1.100/24"
  gateway: "192.168.1.1"
  nameservers:  
  - 8.8.8.8
  - 1.1.1.1
```

Klienta s ním spustíte takto: `sudo tapper run -c /home/hardwario/tapper.conf`
