---
slug: /security
title: Vylepšení zabezpečení
description: "Tento dokument popisuje několik kroků, jak zvýšit zabezpečení zařízení TAPPER."
---

import Image from '@theme/IdealImage';

# Zvýšení zabezpečení {#improving-security}

Tento dokument popisuje několik kroků, kterými zvýšíte zabezpečení zařízení TAPPER.

## SSH pouze s autentizací veřejným klíčem {#ssh-with-public-key-authentication-only}

Přihlašování je tak bezpečnější i rychlejší.

### Postup {#procedure}

- Než nahrajete systém na Raspberry Pi nástrojem RPi Imager, otevřete [OS Customization](https://www.raspberrypi.com/documentation/computers/getting-started.html#advanced-options) a zapněte SSH pouze s autentizací veřejným klíčem.
  - Doporučujeme klíč SSH typu EdDSA (Ed25519)
    - Pokud vhodný klíč SSH nemáte, vytvořte si nový příkazem `ssh-keygen -t ed25519`

## MQTT s TLS {#mqtt-with-tls}

MQTT může komunikovat přes TLS. Doporučujeme to, protože TLS brání odposlechu a neoprávněným požadavkům.

### Postup {#procedure-1}

Celé nastavení TLS popisuje stránka [Nastavení TLS pro MQTT](/tapper/tls-setup/).

## Heslo k Wi-Fi jako hash místo otevřeného textu {#wifi-passphrase-as-a-hash-instead-of-clear-text}

Místo hesla k Wi-Fi můžete do konfiguračního souboru zapsat jeho hash (`psk`), který vygeneruje `wpa_passphrase`.

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
- Zkopírujte hodnotu `psk` a vložte ji do konfigurace:
  - Příklad:
  ```yaml
  wifi:
    network: "ExampleSSID"
    passphrase: "e8aecc0d08936c19af0f377de39a2412c5025fce8d8140b122c33dc346ae3b10"
  ...
  ```
