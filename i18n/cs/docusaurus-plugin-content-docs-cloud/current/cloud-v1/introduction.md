---
slug: /introduction
sidebar_position: 1
title: Úvod
description: "Základní vlastnosti"
---
import Image from '@theme/IdealImage';

# Úvod do CLOUD {#cloud-introduction}

**HARDWARIO Cloud** je infrastruktura, která zajišťuje IoT konektivitu, umožňuje správu IoT zařízení HARDWARIO a poskytuje přístup k přenášeným datům zařízení prostřednictvím REST API nebo callbacků.

<Image img={require('../../../../../cloud/cloud-v1/images/hardwario-cloud.png')} alt="Diagram: zařízení CHESTER se připojuje k HARDWARIO Cloud přes LTE-M/NB-IoT/LoRaWAN; data proudí přes webhook a REST API do integrací"/><br/>

1. Základní vlastnosti platformy **HARDWARIO Cloud** popisuje kapitola:<br/>
   [**Základní vlastnosti**](#basic-features)

1. Bezpečnostní opatření vysvětluje kapitola:<br/>
   [**Bezpečnostní opatření**](#security-precautions)

1. O možnostech cloudových integrací se dočtete v kapitole:<br/>
   [**Cloudové integrace**](#cloud-integrations)

## Základní vlastnosti {#basic-features}

* Příchozí spojení jsou zapouzdřena do takzvaných relací, které navazují jednotlivá zařízení. Relace jsou unikátní a plně dohledatelné v komunikačních logech.

* Zprávy procházející socketem se překládají z binárního formátu do **JSON** a předávají se k pipeline zpracování v RabbitMQ.

* Zpráva se ukládá do databáze, a pokud je nakonfigurován asynchronní callback (zákazníkem), je zpráva okamžitě doručena do zákaznického backendu (webhook).

* Data jsou k dispozici také přes **REST API**.

* Zákazníci mohou se zařízeními a zprávami pracovat prostřednictvím webového portálu, který je klientem jeho **REST API** (HARDWARIO Cloud je postaven na modelu API-first).

* Celý stack je implementován v Node.js (framework Fastify) + Vue.js (frontend).

* **HARDWARIO Cloud** používá jako databázi **MongoDB** a jako in-memory cache Redis.

* Všechny komponenty běží v izolovaných kontejnerech **Docker** (spouštěných pomocí **Docker Compose**).

## Bezpečnostní opatření {#security-precautions}

- Komunikace mezi zařízením a serverem využívá osvědčenou implementaci **DTLS** socketu (v1.2) v režimu **PSK**.

- **Bluetooth Low Energy** má zapnutý bezpečnostní PIN. PIN je pro každé zařízení unikátní.

- Servery jsou provozovány ve frankfurtském datovém centru Digital Ocean.

- Probíhají automatizované týdenní zálohy všech serverů.

- Všechny servery běží na nejnovější LTS distribuci **Ubuntu Server**.

- Tým HARDWARIO aktualizuje serverový software v pravidelných měsíčních intervalech spolu s bezpečnostním auditem (běžící procesy, uživatelé, systémové prostředky atd.).

- Veškerá přihlášení k serverům jsou možná pouze z běžného uživatelského účtu (žádné přihlášení jako root).

- Přihlášení je možné pouze pomocí SSH klíče (žádná hesla). SSH klíč musí být chráněn heslem.

- Každý člen týmu HARDWARIO je povinen používat správce hesel spolu s 2FA všude, kde je to možné. Preferováno je ověřování přes důvěryhodné poskytovatele identity, jako je Google, Microsoft atd.

## Cloudové integrace {#cloud-integrations}

### Callbacky {#callbacks}

Callbacky jsou zprávy, které cloud automaticky přeposílá na definovaný **URL** endpoint. Callbacky se vždy zadávají pro danou **skupinu** pomocí ikony **Edit**. Při nastavování callbacku se vyplňují následující pole:

* `Name` - Vámi zvolený název callbacku; doporučujeme uvést název integrované aplikace, např. **[Ubidots](https://ubidots.com)**

* `Enabled` - Callback lze zapnout/vypnout. Funkční je ve stavu Enabled - Yes

* `Note` - Prostor pro vaši interní poznámku

* `Method` - Výběr z následujících HTTP možností:

  * `POST` - Nese parametry požadavku v těle zprávy

  * `GET` - Nese parametry požadavku připojené v URL řetězci

  * `PUT` - Vytvoří nový zdroj nebo nahradí reprezentaci cílového zdroje požadovaným payloadem

  * `PATCH` - Aktualizuje hodnoty vlastností zdroje

* `URL Address` - URL endpointu, na který budou zprávy odesílány. Důrazně doporučujeme použít protokol HTTPS (technologie TLS).

* `Query Parameters` - Volitelné rozšíření URL

* `Name` - Název zadaného parametru

* `Value` - Hodnota parametru

* `HTTP Headers` - Doplňkový kontext HTTP požadavku

* `Name` - Název zadané hlavičky (např. `Authentication`)

* `Value` - Hodnota, např. autentizační token

* `Content Type` - Výběr z následujících možností:

  * `application/json`

  * `application/x-www-form-urlencoded`

  * `application/octet-stream`

* `Payload` - Toto pole umožňuje uživateli transformovat obsah zprávy pomocí funkcionálního jazyka **JSONata**. Pokud další transformace pomocí **JSONata** není potřeba, nechte pole prázdné (payload bude předán tak, jak je). Popis jazyka **JSONata** najdete zde; níže je příklad výběru a transformace části obsahu zprávy:

  ```json
  {
    "external_temperature": data.hygrometer.temperature,
    "external_humidity": data.hygrometer.humidity,
    "device_orientation": data.accelerometer.orientation
  }
  ```

* `Original message` - Obsah zprávy před transformací **JSONata**

* `Transformed payload` - Obsah zprávy po transformaci **JSONata**

Callback uložte tlačítkem **SAVE CALLBACK**.

### REST API {#rest-api}

**REST API** je aplikační programové rozhraní, které odpovídá omezením architektonického stylu **REST** a umožňuje interakci s webovými službami **RESTful**.

Popis našeho **REST API** najdete na tomto odkazu:
https://api.hardwario.cloud
