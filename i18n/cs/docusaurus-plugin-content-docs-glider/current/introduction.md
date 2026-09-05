---
slug: /
title: GLIDER
sidebar_label: Úvod
---
import Image from '@theme/IdealImage';

# GLIDER {#glider}

**HARDWARIO GLIDER** je kompaktní IoT zařízení **LTE-M / NB-IoT** postavené na SoC Nordic **nRF9151**. Je určeno pro dlouhodobé nízkoenergetické monitorování teploty, pulzních čítačů, událostí bezpotenciálových kontaktů a zařízení **Modbus RTU** a dodává se předkonfigurované pro komunikaci s **HARDWARIO Cloud**.

:::tip
### Než zařízení GLIDER zprovozníte, přečtěte si [**Rychlý průvodce**](first-steps). {#to-get-your-glider-running-read-the-quick-start-guide}
:::

<img src="/img/glider.webp" data-zoom-src="/img/glider.webp" width="540" alt="GLIDER" />

## Rychlé odkazy {#quick-links}

* [**Rychlý průvodce**](first-steps.md): Návod k nastavení krok za krokem.
* [**Nastavení HARDWARIO Cloud**](cloud-setup.md): Spárování zařízení s platformou.
* [**Popis hardwaru**](hardware-description.md): Hlavní části a parametry zařízení GLIDER.
* [**Externí senzory**](external-sensors/index.md): Zapojení a konfigurace externích senzorů.
* [**Nahrání firmwaru**](firmware-flashing/index.md): Možnosti nahrání firmwaru do zařízení.
* [**Přístup ke konzoli**](category/console-access): Komunikace se zařízením GLIDER přes USB-C nebo J-Link.
* [**Konfigurace**](configuration.md): Doladění chování firmwaru.
* [**Příkazy**](category/commands): Jaké příkazy zařízení rozumí.
* [**CBOR payload**](payload.md): Jak zařízení kóduje data odesílaná do cloudu.

## Typické případy použití {#typical-use-cases}

- Vzdálené monitorování teploty v chladicích řetězcích, skladech nebo sklenících
- Měření spotřeby pomocí pulzního čítání (voda, plyn, elektřina)
- Záznam událostí dveří, oken nebo jiných bezpotenciálových kontaktů
- Integrace průmyslových senzorů Modbus RTU do HARDWARIO Cloud

## Klíčové vlastnosti {#key-features}

| Vlastnost | Popis |
|---|---|
| **Mobilní konektivita** | Kompaktní LTE-M / NB-IoT postavené na Nordic nRF9151. |
| **Dlouhodobé monitorování** | Nízkoenergetické sledování teploty, pulzních čítačů a událostí bezpotenciálových kontaktů. |
| **Podpora Modbus RTU** | Nativní integrace s průmyslovými senzory Modbus RTU. |
| **Připraveno pro HARDWARIO Cloud** | Dodává se předkonfigurované pro přímé připojení k HARDWARIO Cloud. |
| **Konzole USB-C / J-Link** | Konfigurace a diagnostika přes obě konzole. |
