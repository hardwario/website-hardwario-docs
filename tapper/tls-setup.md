---
slug: /tls-setup
title: MQTT TLS Setup
---

import Image from '@theme/IdealImage';

# MQTT over TLS

This guide provides all the information needed to make TLS work with self-signed certificates.

## Certificate Authority

First, we need to set up the certificate authority.

This is fairly straightforward:  
`openssl req -new -x509 -days <duration> -extensions v3_ca -keyout ca.key -out ca.crt`

## Server

Second, we need to set up the server.

### Certificate

Generate a server key.  
`openssl genrsa -aes256 -out server.key rsa 4096`

Or generate a server key without encryption.  
`openssl genrsa -out server.key rsa 4096`

Generate a certificate signing request.  
`openssl req -out server.csr -key server.key -new`

Create a `v3.ext` file with the following contents.

```conf
subjectAltName         = DNS:hostname, IP:10.0.0.0
```

If you wish to use the `hostname` and `10.0.0.0` in SANs for Mosquito server specification, replace them with your hostname and IP.  
For more information about SANs, refer to this [RFC](https://www.rfc-editor.org/rfc/rfc9525#name-identifying-application-ser).

Sign the CSR with your CA key.

```bash
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -extfile v3.ext
```

### Mosquitto Setup

We also need to configure Mosquitto actually to use these certificates and keys.

Make a config file for mosquitto (for example, `nano mosquitto.conf`).

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

You can run mosquitto with this config file by specifying the `-c` option: `mosquitto -c mosquitto.conf`

## Client

Finally, we also need to authenticate and authorize the client.

### Certificate

Generate a client key.  
`openssl genrsa -aes256 -out client.key rsa 4096`

Or generate a client key without encryption.  
`openssl genrsa -out client.key rsa 4096`

Generate a CSR.  
`openssl req -out client.csr -key client.key -new`

Sign the CSR with your CA key.  
`openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365`

Send the `client.key`, `client.crt`, and `ca.crt` to the TAPPER and update your [TAPPER config](/tapper/usage/#configuration) accordingly.

:::tip

You can send the files using `scp`

:::
