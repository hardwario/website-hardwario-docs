---
slug: /security
title: Vylepšení zabezpečení
description: "Tento dokument popisuje několik kroků pro zvýšení zabezpečení vašeho zařízení TAPPER."
---

import Image from '@theme/IdealImage';

# Zvýšení zabezpečení {#improving-security}

Tento dokument popisuje několik kroků pro zvýšení zabezpečení vašeho zařízení TAPPER.

## SSH pouze s autentizací veřejným klíčem {#ssh-with-public-key-authentication-only}

Umožňuje bezpečnější a rychlejší přihlášení.

### Postup {#procedure}

- Před nahráním systému na Raspberry Pi pomocí RPi Imager přejděte do [OS Customization](https://www.raspberrypi.com/documentation/computers/getting-started.html#advanced-options) a zapněte SSH pouze s autentizací veřejným klíčem.
  - Doporučuje se SSH klíč typu EdDSA (Ed25519)
    - Pokud žádný použitelný SSH klíč nemáte, vytvořte nový příkazem `ssh-keygen -t ed25519`

## MQTT s TLS {#mqtt-with-tls}

MQTT může pracovat pomocí TLS. To je doporučeno, protože zabraňuje odposlechu a neautorizovaným požadavkům.

### Postup {#procedure-1}

Celé nastavení TLS je popsáno v [MQTT TLS Setup](/tapper/tls-setup/).

## Heslo k Wi-Fi jako hash místo otevřeného textu {#wifi-passphrase-as-a-hash-instead-of-clear-text}

Heslo k Wi-Fi v konfiguračním souboru může být hash vygenerovaný pomocí `wpa_psk`.

### Postup {#procedrue}

- V terminálu zadejte `wpa_passphrase <SSID> <PASSPHRASE>`
  - Příklad:
  ```bash
  $ wpa_passphrase "ExampleSSID" "ExamplePassphrase"
  network={
          ssid="ExampleSSID"
          #psk="ExamplePassphrase"
          psk=e8aecc0d08936c19af0f377de39a2412c5025fce8d8140b122c33dc346ae3b10
  }
  ```
- Zkopírujte `psk` a vložte jej do své konfigurace:
  - Příklad:
  ```yaml
  wifi:
    network: "ExampleSSID"
    passphrase: "e8aecc0d08936c19af0f377de39a2412c5025fce8d8140b122c33dc346ae3b10"
  ...
  ```
