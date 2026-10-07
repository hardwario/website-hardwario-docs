---
slug: /tls-setup
title: Nastavení MQTT TLS
description: "Návod obsahuje vše potřebné ke zprovoznění TLS s certifikáty podepsanými vlastní certifikační autoritou (self-signed)."
---

import Image from '@theme/IdealImage';

# MQTT přes TLS {#mqtt-over-tls}

Tento návod obsahuje vše potřebné ke zprovoznění TLS s certifikáty podepsanými vlastní certifikační autoritou (self-signed).

## Certifikační autorita {#certificate-authority}

Nejprve nastavte certifikační autoritu.

Je to jednoduché:  
`openssl req -new -x509 -days <duration> -extensions v3_ca -keyout ca.key -out ca.crt`

## Server {#server}

Potom nastavte server.

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

Hodnoty `hostname` a `10.0.0.0` v položce SAN, která identifikuje server Mosquitto, nahraďte názvem hostitele a IP adresou svého serveru.  
Více informací o SAN najdete v tomto [RFC](https://www.rfc-editor.org/rfc/rfc9525#name-identifying-application-ser).

Podepište CSR klíčem své CA.

```bash
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -extfile v3.ext
```

### Nastavení Mosquitto {#mosquitto-setup}

Server Mosquitto je ještě potřeba nastavit tak, aby tyto certifikáty a klíče skutečně používal.

Vytvořte konfigurační soubor pro Mosquitto (například příkazem `nano mosquitto.conf`).

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

Server Mosquitto s tímto konfiguračním souborem spustíte s volbou `-c`: `mosquitto -c mosquitto.conf`

## Klient {#client}

Nakonec je potřeba autentizovat a autorizovat klienta.

### Certifikát {#certificate-1}

Vygenerujte klíč klienta.  
`openssl genrsa -aes256 -out client.key rsa 4096`

Nebo vygenerujte klíč klienta bez šifrování.  
`openssl genrsa -out client.key rsa 4096`

Vygenerujte CSR.  
`openssl req -out client.csr -key client.key -new`

Podepište CSR klíčem své CA.  
`openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365`

Zkopírujte soubory `client.key`, `client.crt` a `ca.crt` do zařízení TAPPER a upravte podle nich [konfiguraci zařízení TAPPER](/tapper/usage/#configuration).

:::tip

Soubory můžete zkopírovat příkazem `scp`.

:::
