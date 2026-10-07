---
title: Popis hardwaru
sidebar_position: 6
description: "GLIDER je postavený na modulu SiP Nordic nRF9151, tedy mikrokontroléru Cortex-M33 s integrovaným mobilním modemem LTE-M / NB-IoT."
title_meta: "Popis hardwaru (GLIDER)"
---
import Image from '@theme/IdealImage';

# Popis hardwaru {#hardware-description}

Zařízení GLIDER je postavené na modulu SiP (system-in-package) **Nordic nRF9151**, tedy mikrokontroléru Cortex-M33 s integrovaným mobilním modemem LTE-M / NB-IoT. Tato stránka shrnuje technické údaje, které budete potřebovat při integraci, zapojování nebo rozšiřování zařízení.

## Blokové schéma {#block-diagram}

![Schéma zařízení GLIDER](../../../../glider/images/hardwario-glider-wireless-diagram.png)

## Mikrokontrolér {#microcontroller}

| | |
| :--- | :--- |
| SoC | **Nordic nRF9151** |
| Jádro | ARM Cortex-M33 s TrustZone-M |
| Bezpečnostní rozšíření | TF-M (Trusted Firmware-M) IPC backend, nezabezpečená prováděcí doména (cíl `*_ns`) |
| Modem | Integrovaný LTE-M / NB-IoT |
| Bootloader | MCUboot s výměnou dvou obrazů (DFU přes `AT$FW`) |
| Watchdog | Hardwarový watchdog 120 s |

Příkaz `west build` používá tento cíl sestavení:

```text
gauger_lte/nrf9151/ns
```

## Rozložení pinů {#pinout}

Tabulka uvádí všechny piny GPIO, které GLIDER používá, podle souboru `gauger_lte_nrf9151_common.dtsi`.

| Pin | Signál | Funkce | Poznámky |
| :--- | :--- | :--- | :--- |
| P0.00 | `USB_EN` | Zapnutí napájení převodníku USB | Aktivní v log. 1; ve výchozím stavu vypnuto. |
| P0.01 | `INT` | (Rezervovaný vstup přerušení) | - |
| P0.02 / P0.03 | `I2C3 SDA/SCL` | 1-Wire master DS2484 | I²C 100 kHz. |
| P0.04 / P0.05 / P0.06 | `RS_DE / RS_RE / RS_ON` | Povolení vysílače RS-485, povolení příjmu, napájení izolátoru | `RS_ON` aktivní v log. 1; ve výchozím stavu vypnuto. |
| P0.07 | `SLPZ` | Spánek / probuzení DS2484 | Aktivní v log. 0. |
| P0.08 / P0.09 / P0.10 | `LED_Y / LED_R / LED_G` | Žlutá / červená / zelená stavová LED | Aktivní v log. 1. |
| P0.13–P0.20 | `GP0`–`GP7` | Univerzální analogové vývody na kolíkové liště | Lze přivést na `AIN7`–`AIN0`. |
| P0.21 | `DI_EN` | Zapnutí napájení digitálních vstupů | Aktivní v log. 1; ve výchozím stavu vypnuto. |
| P0.22 / P0.23 | `DI_CH0 / DI_CH1` | Izolované digitální vstupy (CH1 / CH2) | Aktivní v log. 1. |
| P0.24 / P0.25 | `UART0 RX / TX` | Konzole USB-C (přes FT234XD) | 1 000 000 baud. |
| P0.26 | `USB_DETECT` | Detekce kabelu USB-C | Aktivní v log. 0. |
| P0.27 / P0.28 | `UART1 RX / TX` | Ladicí port na kolíkové liště JP5 | 115 200 baud. |
| P0.29 / P0.30 | `UART2 RX / TX` | RS-485 (Modbus RTU) přes ISO1212DBQ | 19 200 baud, 8E1. |
| P0.31 | `BUTTON` | Uživatelské tlačítko | Interní pull-up; aktivní v log. 0. |

## Konektivita {#connectivity}

#### Mobilní síť {#cellular}

- **LTE-M** a **NB-IoT** přes vestavěný modem nRF9151.
- Slot **nano-SIM** přístupný zvenku.
- Ve výchozím stavu povolená pásma LTE: **band 8** a **band 20** (Evropa). Pásma lze změnit při sestavení firmwaru.

#### USB-C (konzole AT) {#usb-c-at-console}

- Konektor USB-C → převodník USB-UART **FT234XD** → `UART0` v nRF9151.
- 1 000 000 baud, 8N1.
- Firmware zapne převodník automaticky, když zaznamená přechod `USB_DETECT` do log. 0 (ošetření zákmitů 50 ms).
- Viz [**Konzole AT (USB-C)**](console/usb-at.md).

#### J-Link (RTT) {#j-link-rtt}

- Standardní konektor SWD (`SWDIO`, `SWCLK`, `GND`, `VTref`).
- RTT (Real-Time Transfer) zpřístupní shell Zephyr a průběžný výpis logů.
- Viz [**Konzole RTT (J-Link)**](console/rtt-jlink.md).

#### 1-Wire (W1, W2) {#1-wire-w1-w2}

Dva elektricky rovnocenné porty na šroubovací svorkovnici. Oba obsluhuje stejný master 1-Wire **Maxim DS2484** na interní sběrnici I²C3.

- Ke slotům lze současně přiřadit až **8 teploměrů DS18B20**.
- Příkaz `therm scan` najde v jednom průchodu až **12 zařízení**.
- Viz [**Externí teplotní senzory**](external-sensors/temperature.md).

#### Digitální vstupy (CH1, CH2) {#digital-inputs-ch1-ch2}

- **2 galvanicky oddělené** kanály vedené na `P0.22` a `P0.23`.
- Každý kanál podporuje režimy `disabled`, `counter` a `event`.
- Nastavitelné ošetření zákmitů (doba v aktivním a v neaktivním stavu) a ochranná doba mezi událostmi.
- Viz [**Konfigurace → Digitální vstupy**](configuration.md#digital-inputs).

#### RS-485 (Modbus RTU) {#rs-485-modbus-rtu}

- Izolovaný transceiver RS-485 (**ISO1212DBQ**) na `UART2`.
- 19 200 baud, 8E1, rámcování RTU, časový limit odpovědi 500 ms.
- Napájí se jen po výslovném zapnutí (`modbus enable`), takže v klidu šetří energii.
- Viz [**Příkazy shellu → `modbus`**](commands/shell-commands.md).

## Napájení a časování {#power-and-timing}

| | |
| :--- | :--- |
| Napájecí větev | Jediná větev 3,3 V (typické pro nRF9151) |
| Časový limit watchdogu | 120 s |
| Výchozí perioda vzorkování | 60 s (`app config interval-sample`) |
| Výchozí perioda uplinku | 300 s (`app config interval-send`) |
| Výchozí watchdog downlinku | 36 h (`app config downlink-wdg-interval`; `0` vypíná) |
| Odpojování napájení periferií | Převodník USB, digitální vstupy a izolátor RS-485 jsou ve výchozím stavu vypnuté a napájejí se, jen když je to potřeba |

## Indikace a ovládání {#indicators-and-controls}

- **LED (3):** červená, zelená, žlutá. Řízené přes GPIO, ovládat je lze příkazem shellu `led`.
- **Tlačítko (1):** spouští akce `app sample` / `app send` podle počtu stisků:
 - 1 stisk: vynutit `send`
 - 2 stisky: vynutit `sample`
 - 3 stisky: `sample` a poté `send`
 - 4 stisky: restart zařízení

## Firmware {#firmware}

Firmware zařízení GLIDER stojí na **Zephyr / nRF Connect SDK** a nadstavbě **HIO SDK** od HARDWARIO, která obsahuje cloudového klienta, konfigurační framework, obsluhu tlačítka, detekci hran a interpret ATCI.

Příkaz pro sestavení:

```bash
west build -b gauger_lte/nrf9151/ns application
```

Interní název desky je `gauger_lte`, obchodní název produktu je GLIDER; oba označují tentýž hardware.
