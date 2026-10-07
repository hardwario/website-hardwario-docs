---
slug: /
title: FIBER
description: "FIBER je robustní průmyslové zařízení IoT postavené na platformě embedded Linux a určené pro aplikace průmyslového IoT."
sidebar_label: Úvod
---
import Image from '@theme/IdealImage';

# FIBER {#fiber}

:::info Máte zařízení FIBER Lite?

**FIBER Lite** je varianta zařízení FIBER pro testování na stole, postavená na Raspberry Pi 5. Tato stránka
popisuje průmyslové zařízení FIBER s modulem CM4, stránky [**Instalace**](installation) (nebo
[**Rychlý průvodce**](first-steps)) níže ale popisují **stejný postup pro obě varianty** včetně celého stacku
ChirpStack, Node-RED, InfluxDB, Grafana a Dashboard; na několika místech, kde se postup liší, mají záložky.
Skutečné rozdíly jsou jen v hardwaru (FIBER Lite nemá displej ani senzory 1-Wire), viz
[**FIBER Lite**](fiber-lite/introduction) v postranním panelu.

:::

**FIBER** je robustní průmyslové zařízení IoT postavené na platformě **embedded Linux** a určené pro **aplikace průmyslového IoT**. Integruje **bezdrátové rádio 868/915 MHz** i **8kanálový hub 1-Wire pro senzory a akční členy**.

Díky modulární a otevřené architektuře podporuje zařízení **FIBER** standardní distribuce **Raspberry Pi OS** i **vlastní linuxové image sestavené pomocí Yocto**, takže ho lze použít jako předem nakonfigurované měřicí zařízení i jako vývojovou platformu. Zařízení je určené pro nasazení v průmyslovém a komerčním prostředí. Nabízí bezdrátové i drátové komunikační kanály pro spolehlivý sběr dat ze senzorů, lokální vizualizaci na integrovaném displeji a odolné síťové připojení přes **Ethernet**, **Wi-Fi** nebo volitelně **LTE**.

<img src="/img/fiber.webp" data-zoom-src="/img/fiber.webp" width="540" alt="FIBER" />

## Rychlé odkazy {#quick-links}

* [**Instalace**](installation): Instalace a konfigurace linuxového systému na zařízení FIBER.
* [**Popis hardwaru**](category/hardware-description): Výpočetní platforma, rozhraní pro senzory, konektivita a úplné technické specifikace.
* [**Seznam změn**](changelog): Nejnovější změny firmwaru a platformy.

## Typické využití {#typical-use-cases}

- Monitorování prostředí v nemocnicích: na odděleních, v lékárnách a skladech
- Monitorování farmaceutického chladového řetězce se záznamem historie teplot a upozorněním na odchylky
- Monitorování chladicích zařízení v maloobchodě, aby se zboží nezkazilo
- Laboratorní prostředí vyžadující přesnou regulaci teploty
- Monitorování teploty v energetické infrastruktuře (transformátory, rozvaděče)
- Výroba: vícebodové monitorování procesních teplot na výrobních linkách

## Klíčové vlastnosti {#key-features}

| Vlastnost | Popis |
|---|---|
| **Platforma embedded Linux** | Kompatibilní s Raspberry Pi OS nebo vlastními image založenými na Yocto. |
| **Hybridní integrace senzorů** | Bezdrátové senzory v pásmech ISM 868/915 MHz a navíc 8 plně nezávislých portů 1-Wire pro drátové senzory. |
| **Průmyslové provedení** | Rozsah provozních teplot –20 °C až +60 °C; základem je modul Compute Module 4 kvůli dlouhodobé spolehlivosti. |
| **Flexibilní konektivita** | Ethernet, Wi-Fi, BLE nebo volitelný modul LTE Cat 4. |
| **Lokální vizualizace a diagnostika** | LCD s podsvícením, stavové LED pro každý kanál a integrovaný akustický bzučák. |
| **Power-over-Ethernet** | Napájení přes PoE se záložní baterií Li-Ion na desce. |
| **Plný root přístup k Linuxu** | Podpora Dockeru pro vývoj vlastního firmwaru a aplikací. |
| **Zabezpečený MQTT** | Protokol MQTT se šifrováním TLS pro bezpečný přenos dat. |
| **Otevřené cílové systémy pro data** | Data posíláte do vlastních systémů. Na otevřené linuxové platformě poběží v podstatě jakýkoli protokol, který váš projekt potřebuje. |
