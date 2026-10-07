---
slug: /introduction
sidebar_position: 1
title: Úvod
description: "HARDWARIO Cloud v1 (starší verze): infrastruktura, která zajišťovala připojení, správu zařízení a přístup k datům pro zařízení HARDWARIO."
---
import Image from '@theme/IdealImage';

# Úvod do cloudu {#cloud-introduction}

**HARDWARIO Cloud** je infrastruktura, která zajišťuje připojení zařízení IoT HARDWARIO, slouží k jejich správě a zpřístupňuje přenášená data přes REST API nebo callbacky.

<Image img={require('../../../../../cloud/cloud-v1/images/hardwario-cloud.png')} alt="Diagram: zařízení CHESTER se připojuje k HARDWARIO Cloud přes LTE-M/NB-IoT/LoRaWAN; data proudí přes webhook a REST API do integrací"/><br/>

1. Základní vlastnosti platformy **HARDWARIO Cloud** popisuje kapitola:<br/>
   [**Základní vlastnosti**](#basic-features)

1. Bezpečnostní opatření vysvětluje kapitola:<br/>
   [**Bezpečnostní opatření**](#security-precautions)

1. O možnostech cloudových integrací se dočtete v kapitole:<br/>
   [**Cloudové integrace**](#cloud-integrations)

## Základní vlastnosti {#basic-features}

* Příchozí spojení se zapouzdřují do takzvaných relací, které navazují zařízení. Každá relace je jedinečná a plně dohledatelná v komunikačních logech.

* Zprávy procházející socketem se překládají z binárního formátu do **JSON** a předávají se ke zpracování v pipeline RabbitMQ.

* Zpráva se uloží do databáze, a pokud si zákazník nakonfiguroval asynchronní callback, okamžitě se doručí do jeho backendu (webhook).

* Data jsou k dispozici také přes **REST API**.

* Se zařízeními a zprávami mohou zákazníci pracovat ve webovém portálu, který je klientem **REST API** platformy (HARDWARIO Cloud je postavený na modelu API-first).

* Celý stack je napsaný v Node.js (framework Fastify) a Vue.js (frontend).

* **HARDWARIO Cloud** používá jako databázi **MongoDB** a jako in-memory cache Redis.

* Všechny komponenty běží v izolovaných kontejnerech **Docker** (spouštěných pomocí **Docker Compose**).

## Bezpečnostní opatření {#security-precautions}

- Komunikace mezi zařízením a serverem využívá osvědčenou implementaci socketu **DTLS** (v1.2) v režimu **PSK**.

- **Bluetooth Low Energy** má zapnutý bezpečnostní PIN. PIN je pro každé zařízení unikátní.

- Servery běží ve frankfurtském datovém centru společnosti Digital Ocean.

- Všechny servery se automaticky každý týden zálohují.

- Všechny servery běží na nejnovější LTS distribuci **Ubuntu Server**.

- Tým HARDWARIO aktualizuje serverový software v pravidelných měsíčních intervalech spolu s bezpečnostním auditem (běžící procesy, uživatelé, systémové prostředky atd.).

- Na servery se lze přihlásit pouze z běžného uživatelského účtu (přihlášení jako root není možné).

- Přihlásit se lze jen klíčem SSH (ne heslem). Klíč SSH musí být chráněný heslem.

- Každý člen týmu HARDWARIO musí všude, kde je to možné, používat správce hesel a dvoufázové ověření (2FA). Přednost má ověřování přes důvěryhodné poskytovatele identity, například Google nebo Microsoft.

## Cloudové integrace {#cloud-integrations}

### Callbacky {#callbacks}

Callbacky jsou zprávy, které cloud automaticky přeposílá na zadaný endpoint (**URL**). Callback se vždy nastavuje pro konkrétní **skupinu** ikonou **Edit**. Při nastavení callbacku vyplníte tato pole:

* `Name`: Název callbacku podle vaší volby; doporučujeme uvést název integrované aplikace, např. **[Ubidots](https://ubidots.com)**

* `Enabled`: Callback lze zapnout a vypnout. Funguje, když je Enabled nastavené na Yes

* `Note`: Prostor pro vaši interní poznámku

* `Method`: Výběr metody HTTP:

  * `POST`: Nese parametry požadavku v těle zprávy

  * `GET`: Nese parametry požadavku připojené k URL

  * `PUT`: Vytvoří nový zdroj nebo nahradí reprezentaci cílového zdroje požadovaným payloadem

  * `PATCH`: Aktualizuje hodnoty vlastností zdroje

* `URL Address`: URL endpointu, na který se budou zprávy odesílat. Důrazně doporučujeme použít protokol HTTPS (technologie TLS).

* `Query Parameters`: Volitelné rozšíření URL

* `Name`: Název zadaného parametru

* `Value`: Hodnota parametru

* `HTTP Headers`: Doplňující kontext požadavku HTTP

* `Name`: Název zadané hlavičky (např. `Authentication`)

* `Value`: Hodnota, např. autentizační token

* `Content Type`: Výběr z následujících možností:

  * `application/json`

  * `application/x-www-form-urlencoded`

  * `application/octet-stream`

* `Payload`: V tomto poli můžete obsah zprávy transformovat funkcionálním jazykem **JSONata**. Pokud další transformaci **JSONata** nepotřebujete, nechte pole prázdné (payload se předá beze změny). Níže je příklad výběru a transformace části obsahu zprávy:

  ```json
  {
    "external_temperature": data.hygrometer.temperature,
    "external_humidity": data.hygrometer.humidity,
    "device_orientation": data.accelerometer.orientation
  }
  ```

* `Original message`: Obsah zprávy před transformací **JSONata**

* `Transformed payload`: Obsah zprávy po transformaci **JSONata**

Callback uložte tlačítkem **SAVE CALLBACK**.

### REST API {#rest-api}

**REST API** je aplikační programové rozhraní, které dodržuje omezení architektonického stylu **REST** a slouží ke komunikaci s webovými službami **RESTful**.

Popis našeho **REST API** najdete na adrese:
https://api.hardwario.cloud
