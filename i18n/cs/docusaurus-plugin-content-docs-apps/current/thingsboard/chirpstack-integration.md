---
slug: chirpstack-integration
title: ChirpStack
description: "Připojení HARDWARIO Dashboards k brokeru MQTT serveru ChirpStack přes TLS na portu 8883 s certifikátem CA a klientským certifikátem."
title_meta: "Integrace ChirpStack (HARDWARIO Dashboards)"
---

import Image from '@theme/IdealImage';

# Integrace ChirpStack MQTT přes TLS {#chirpstack-mqtt-integration-via-tls}

Tento návod vysvětluje, jak HARDWARIO Dashboards připojit k brokeru MQTT serveru ChirpStack šifrovaným spojením TLS. Postup využívá obecnou integraci MQTT, která data přenáší bezpečně díky klientským certifikátům.

## Předpoklady {#prerequisites}

Než integraci v HARDWARIO Dashboards nastavíte, vygenerujte a stáhněte v uživatelském rozhraní ChirpStack tyto tři soubory (v části **Applications** -> **Integrations** -> **MQTT Certificate**):

* **Certifikát CA** (`ca.pem`)
* **Certifikát TLS** (`client-cert.pem`)
* **Klíč TLS** (`client-key.pem`)

> **Poznámka:** Broker MQTT (Mosquitto) musí mít na portu `8883` listener s TLS a integrace MQTT v ChirpStack musí mít nastavené `json=true`.

---

## Postup nastavení v HARDWARIO Dashboards {#configuration-steps-in-thingsboard}

Zabezpečenou integraci MQTT nastavíte takto:

### 1. Vytvořte integraci {#1-create-integration}
1.  Přihlaste se do [HARDWARIO Dashboards](https://app.hardwario.cloud/) jako správce tenantu.
2.  V levém menu přejděte na **Integrations**.
3.  Klikněte na **Add integration** a jako typ zvolte **MQTT**.

### 2. Nastavení připojení {#2-connection-settings}
Na záložce **Connection** nastavte tyto parametry:

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
Nastavte **Topic filter**, aby integrace přijímala uplinky ze zařízení:
`application/+/device/+/event/up`

---

## Kontrola a řešení problémů {#verification--troubleshooting}

Po uložení HARDWARIO Dashboards naváže zabezpečené připojení MQTT přes TLS. Broker připojení ověří klientským certifikátem, který podepsala certifikační autorita (CA) vašeho serveru ChirpStack. 

### Jak to zkontrolovat: {#how-to-verify}
* **Logy integrace:** Otevřete u integrace záložku **Logs**. Pokud je konfigurace správná, měli byste vidět úspěšné události připojení.
* **Kontrola na straně serveru:** Pokud se připojení nezdaří, ověřte na serveru tímto příkazem, že Mosquitto skutečně naslouchá na portu 8883: 
    `ss -tlnp | grep mosquitto`

### Časté chyby: {#common-pitfalls}
* **Záměna certifikátů:** Zkontrolujte, že jste nezaměnili soubory `Certificate` a `Private key`.
* **Formát JSON:** Pokud se připojení jeví jako aktivní, ale nepřicházejí žádná data, zkontrolujte, že má integrace MQTT v ChirpStack zapnuté `json=true`.

:::info Dokumentace ThingsBoard
HARDWARIO Dashboards jsou postavené na platformě ThingsBoard. Podrobnosti najdete v oficiální dokumentaci ThingsBoard (anglicky): [ChirpStack integration](https://thingsboard.io/docs/pe/user-guide/integrations/chirpstack/).
:::
