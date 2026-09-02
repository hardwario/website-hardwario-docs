---
slug: /usage
title: Používání klienta
description: "Použití: tapper COMMAND [OPTIONS] [ARGS]..."
---

import Image from '@theme/IdealImage';

# Používání CLI klienta TAPPER {#tapper-client-cli-usage}

## Příkazy {#commands}

Použití: `tapper COMMAND [OPTIONS] [ARGS]...`

### version {#version}

Vypíše verzi buildu klienta TAPPER na stdout.

`tapper version`

### run {#run}

Spustí klienta.

`tapper run [OPTIONS]` nebo `sudo ~/.local/bin/tapper run [OPTIONS]`, pokud chcete použít konfiguraci WiFi.

:::info 

Pro použití NetworkManageru je vyžadováno `sudo`.

:::

#### Volby {#options}

- `-c PATH` `--config PATH` cesta ke [konfiguračnímu](#configuration) souboru
- `-d` `---debug` zobrazí ladicí výstup
- `-h IP` `--host IP` host MQTT brokeru
- `-p PORT` `--port PORT` port MQTT brokeru
- `-ca PATH` `--cafile PATH` cesta k souboru s certifikátem CA
- `-cert PATH` `--certfile PATH` cesta k souboru s klientským certifikátem pro použití s TLS
- `-key PATH` `--keyfile PATH` cesta k souboru s klíčem pro použití s TLS
- `--legacy` pro použití se starším hardwarem R1.0
- `--help` zobrazí nápovědu

#### Chování periferií {#peripherals-behavior}

**LED**

|        Chování        |   Popis    |
| :--------------------: | :--------------: |
| Jedno krátké žluté bliknutí | Detekován NFC tag |
|  Trvalé červené svícení  | Detekováno otevření (tamper)  |

**Bzučák**

|    Chování     |   Popis    |
| :-------------: | :--------------: |
| Jedno krátké pípnutí  | Detekován NFC tag |
| Trvalé pípání | Detekováno otevření (tamper)  |

## Konfigurace {#configuration}

Konfigurační soubor zařízení TAPPER používá syntaxi YAML.

### MQTT {#mqtt}

- Host je host s MQTT brokerem. Minimálně tento údaj je vyžadován.
- Port je port, na kterém je MQTT broker vystaven.

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

Nastavení TLS najdete v [Nastavení TLS](tls-setup).

- Cafile je cesta k souboru CA, kterým se ověřuje certifikát serveru. (Podepisující CA)
- Certfile je cesta k souboru s klientským certifikátem podepsaným danou CA.
- Keyfile je cesta k souboru s klientským klíčem.

:::warning[Certifikát MQTT serveru]

**MQTT host** musí **odpovídat** hodnotě **CN** nebo jednomu ze **SAN** uvedených v X509 certifikátu **serveru**.

Viz [Nastavení MQTT TLS](tls-setup)

:::

### WiFi {#wifi}

- WiFi lze nastavit buď ve statickém, nebo v dynamickém režimu.

:::tip

Pole `passphrase` může obsahovat hodnotu `psk` získanou z `wpa_passphrase`.

:::

#### Dynamický {#dynamic}

Dynamický režim používá DHCP a nastavuje adresu, bránu a DNS servery automaticky.

```yaml
wifi:
  network: "MyWiFiSSID"
  passphrase: "supersecretpassword"
  mode: "dynamic"
```

#### Statický {#static}

Ve statickém režimu musíte nastavit vše ručně.

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

Příklad konfiguračního souboru v `/home/hardwario/tapper.conf`:

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

Ten by se použil takto: `sudo tapper run -c /home/hardwario/tapper.conf`
