---
slug: /tls-setup
title: Nastavení MQTT TLS
description: "Tento návod obsahuje všechny informace potřebné k zprovoznění TLS s vlastnoručně podepsanými certifikáty."
---

import Image from '@theme/IdealImage';

# MQTT přes TLS {#mqtt-over-tls}

Tento návod obsahuje všechny informace potřebné k zprovoznění TLS s vlastnoručně podepsanými certifikáty.

## Certifikační autorita {#certificate-authority}

Nejprve je potřeba nastavit certifikační autoritu.

Je to poměrně přímočaré:  
`openssl req -new -x509 -days <duration> -extensions v3_ca -keyout ca.key -out ca.crt`

## Server {#server}

Za druhé je potřeba nastavit server.

### Certifikát {#certificate}

Vygenerujte klíč serveru.  
`openssl genrsa -aes256 -out server.key rsa 4096`

Nebo vygenerujte klíč serveru bez šifrování.  
`openssl genrsa -out server.key rsa 4096`

Vygenerujte žádost o podepsání certifikátu.  
`openssl req -out server.csr -key server.key -new`

Vytvořte soubor `v3.ext` s následujícím obsahem.

```conf
subjectAltName         = DNS:hostname, IP:10.0.0.0
```

Pokud chcete v SAN pro specifikaci serveru Mosquitto použít `hostname` a `10.0.0.0`, nahraďte je svým hostname a IP adresou.  
Více informací o SAN najdete v tomto [RFC](https://www.rfc-editor.org/rfc/rfc9525#name-identifying-application-ser).

Podepište CSR klíčem své CA.

```bash
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -extfile v3.ext
```

### Nastavení Mosquitto {#mosquitto-setup}

Také je potřeba nakonfigurovat Mosquitto tak, aby tyto certifikáty a klíče skutečně používalo.

Vytvořte konfigurační soubor pro mosquitto (například `nano mosquitto.conf`).

```conf
per_listener_settings true

listener 1883
allow_anonymous true

listener 8883
cafile /path/to/ca.crt
certfile /path/to/server.crt
keyfile /path/to/server.key
allow_anonymous false
require_certificate true
use_identity_as_username true
acl_file /path/to/acl
```

Mosquitto s tímto konfiguračním souborem spustíte pomocí volby `-c`: `mosquitto -c mosquitto.conf`

## Klient {#client}

Nakonec je potřeba klienta také autentizovat a autorizovat.

### Certifikát {#certificate-1}

Vygenerujte klíč klienta.  
`openssl genrsa -aes256 -out client.key rsa 4096`

Nebo vygenerujte klíč klienta bez šifrování.  
`openssl genrsa -out client.key rsa 4096`

Vygenerujte CSR.  
`openssl req -out client.csr -key client.key -new`

Podepište CSR klíčem své CA.  
`openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365`

Odešlete soubory `client.key`, `client.crt` a `ca.crt` do zařízení TAPPER a odpovídajícím způsobem upravte [konfiguraci TAPPER](usage#configuration).

:::tip

Soubory můžete odeslat pomocí `scp`

:::
