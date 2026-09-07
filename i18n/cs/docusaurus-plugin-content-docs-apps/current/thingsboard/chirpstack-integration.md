---
slug: chirpstack-integration
title: Chirpstack
---

import Image from '@theme/IdealImage';

# Integrace ChirpStack MQTT přes TLS {#chirpstack-mqtt-integration-via-tls}

Tento návod vysvětluje, jak připojit vaši platformu HARDWARIO ThingsBoard k MQTT brokeru ChirpStack přes šifrované připojení TLS. Používá obecnou integraci MQTT, která zajišťuje bezpečný přenos dat pomocí klientských certifikátů.

## Předpoklady {#prerequisites}

Než integraci v platformě ThingsBoard nastavíte, ujistěte se, že jste v uživatelském rozhraní ChirpStack úspěšně vygenerovali a stáhli tyto tři soubory (pod **Applications** -> **Integrations** -> **MQTT Certificate**):

* **Certifikát CA** (`ca.pem`)
* **Certifikát TLS** (`client-cert.pem`)
* **Klíč TLS** (`client-key.pem`)

> **Poznámka:** Ujistěte se, že váš MQTT broker (Mosquitto) má nastavený listener s TLS na portu `8883` a že integrace MQTT v platformě ChirpStack má nastavené `json=true`.

---

## Kroky konfigurace v platformě ThingsBoard {#configuration-steps-in-thingsboard}

Zabezpečenou integraci MQTT nastavíte takto:

### 1. Vytvořte integraci {#1-create-integration}
1.  Přihlaste se do své instance ThingsBoard.
2.  V levém menu přejděte na **Integrations**.
3.  Klikněte na **Add integration** a jako typ zvolte **MQTT**.

### 2. Nastavení připojení {#2-connection-settings}
Na kartě **Connection** nastavte tyto parametry:

| Pole | Hodnota |
| :--- | :--- |
| **Host** | IP adresa vašeho serveru ChirpStack (například `10.0.0.52`) |
| **Port** | `8883` |
| **Enable SSL/TLS** | Zapnuto |
| **Credentials type** | PEM (certificate based) |

### 3. Nahrání přihlašovacích údajů {#3-credential-upload}
Nahrajte tři soubory získané z rozhraní ChirpStack do odpovídajících polí:

* **CA certificate:** nahrajte `ca.pem`.
* **Certificate:** nahrajte `client-cert.pem`.
* **Private key:** nahrajte `client-key.pem`.

### 4. Konfigurace topicu {#4-topic-configuration}
Nastavte **Topic filter** pro příjem uplink dat ze svých zařízení:
`application/+/device/+/event/up`

---

## Kontrola a řešení problémů {#verification--troubleshooting}

Po uložení ThingsBoard naváže zabezpečené připojení MQTT přes TLS. Broker připojení ověří klientským certifikátem podepsaným vaší CA z platformy ChirpStack. 

### Jak to zkontrolovat: {#how-to-verify}
* **Logy integrace:** V platformě ThingsBoard přejděte na kartu **Logs** své integrace. Pokud je konfigurace správná, měli byste vidět úspěšné události připojení.
* **Kontrola na straně serveru:** Pokud se připojení nezdaří, ověřte na serveru tímto příkazem, že Mosquitto skutečně naslouchá na portu 8883: 
    `ss -tlnp | grep mosquitto`

### Časté chyby: {#common-pitfalls}
* **Záměna certifikátů:** Ujistěte se, že jste si nezaměnili soubory `Certificate` a `Private key`.
* **Formát JSON:** Pokud se připojení jeví jako aktivní, ale nepřicházejí žádná data, zkontrolujte znovu, že integrace MQTT v platformě ChirpStack má zapnuté `json=true`.
