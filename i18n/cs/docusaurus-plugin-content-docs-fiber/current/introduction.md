---
slug: /
title: Úvod
description: "popisuje průmyslové zařízení FIBER založené na CM4, ale Instalace (nebo"
---
import Image from '@theme/IdealImage';

# FIBER {#fiber}

:::info Máte zařízení FIBER Lite?

**FIBER Lite** je varianta zařízení FIBER pro testování na stole, postavená na Raspberry Pi 5. Vše na této stránce
popisuje průmyslové zařízení FIBER založené na CM4, ale [**Instalace**](installation) (nebo
[**Rychlý průvodce**](first-steps)) níže je **stejný postup pro obě varianty**, se
záložkami na několika místech, kde se postup rozchází, včetně kompletního stacku ChirpStack, Node-RED, InfluxDB,
Grafana a Dashboard. Jediné skutečné rozdíly jsou hardwarové (žádný displej, žádné senzory 1-Wire
u zařízení FIBER Lite), viz [**FIBER Lite**](fiber-lite/introduction) v postranním panelu.

:::

**FIBER** je robustní průmyslové IoT zařízení postavené na platformě **embedded Linux** a navržené pro **průmyslové IoT aplikace**. Integruje jak **bezdrátové rádio 868/915 MHz**, tak **8kanálový hub pro senzory/aktuátory 1-Wire**.

Díky své modulární a otevřené architektuře podporuje zařízení **FIBER** standardní distribuce **Raspberry Pi OS** i **vlastní linuxové image vytvořené pomocí Yocto**, takže jej lze použít jako předkonfigurované měřicí zařízení nebo jako vývojovou platformu. Zařízení je navrženo pro nasazení v průmyslovém a komerčním prostředí a poskytuje bezdrátové i drátové komunikační kanály pro spolehlivý sběr dat ze senzorů, lokální vizualizaci na integrovaném displeji a robustní síťové připojení přes **Ethernet**, **WiFi** nebo volitelně **LTE**.

<img src="/img/fiber.webp" data-zoom-src="/img/fiber.webp" width="540" alt="FIBER" />

## Rychlé odkazy {#quick-links}

* [**Instalace**](installation): Zavedení a konfigurace linuxového systému na zařízení FIBER.
* [**Popis hardwaru**](category/hardware-description): Výpočetní platforma, senzorová rozhraní, konektivita a kompletní technické specifikace.
* [**Seznam změn**](changelog): Nejnovější změny firmwaru a platformy.

## Typické případy použití {#typical-use-cases}

- Monitorování prostředí v nemocnicích na odděleních, v lékárnách a skladech
- Monitorování farmaceutického chladového řetězce s ukládanou historií teplot a výstrahami při odchylkách
- Monitorování chlazení v retailu pro zabránění zkažení zboží
- Laboratorní prostředí vyžadující přesnou regulaci teploty
- Monitorování teploty v energetické infrastruktuře (transformátory, rozvaděče)
- Výroba: víicebodové monitorování procesních teplot na výrobních linkách

## Klíčové vlastnosti {#key-features}

| Vlastnost | Popis |
|---|---|
| **Platforma embedded Linux** | Kompatibilní s Raspberry Pi OS nebo vlastními image založenými na Yocto. |
| **Hybridní integrace senzorů** | Bezdrátové senzory v ISM pásmu 868 MHz plus 8 plně nezávislých portů 1-Wire pro drátové senzory. |
| **Design průmyslové kvality** | Provozní rozsah –20 °C až +60 °C, postaveno na modulu Compute Module 4 pro dlouhodobou spolehlivost. |
| **Flexibilní konektivita** | Ethernet, WiFi, BLE nebo volitelný modul LTE Cat 4. |
| **Lokální vizualizace a diagnostika** | LCD s podsvícením, stavové LED pro každý kanál a integrovaný akustický bzučák. |
| **Power-over-Ethernet** | Napájení přes PoE, se zálohovací Li-Ion baterií na desce. |
| **Plný root přístup k Linuxu** | Podpora Dockeru pro vývoj vlastního firmwaru a aplikací. |
| **Zabezpečený MQTT** | Protokol MQTT se šifrováním TLS pro bezpečný přenos dat. |
| **Otevřené cíle pro data** | Datové toky do vašich vlastních systémů. Otevřená linuxová platforma zvládne v podstatě jakýkoli protokol, který váš projekt potřebuje. |
