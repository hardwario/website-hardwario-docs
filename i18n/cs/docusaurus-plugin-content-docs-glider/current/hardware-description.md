---
title: Popis hardwaru
sidebar_position: 6
description: "Zařízení GLIDER je postaveno na system-in-package Nordic nRF9151, mikrokontroléru Cortex-M33 s integrovaným celulárním modemem LTE-M / NB-IoT. Tato stránka shrnuje technické detaily, které jsou důležité při integraci, zapojení nebo rozšiřování…"
---
import Image from '@theme/IdealImage';

# Popis hardwaru {#hardware-description}

Zařízení GLIDER je postaveno na system-in-package **Nordic nRF9151**, mikrokontroléru Cortex-M33 s integrovaným celulárním modemem LTE-M / NB-IoT. Tato stránka shrnuje technické detaily, které jsou důležité při integraci, zapojení nebo rozšiřování zařízení.

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

Cílový řetězec firmwaru používaný příkazem `west build` je:

```text
gauger_lte/nrf9151/ns
```

## Pinout {#pinout}

Tabulka níže uvádí každý GPIO využívaný zařízením GLIDER, převzatý z `gauger_lte_nrf9151_common.dtsi`.

| Pin | Signál | Funkce | Poznámky |
| :--- | :--- | :--- | :--- |
| P0.00 | `USB_EN` | Povolení napájení USB převodníku | Aktivní v log. 1; výchozí stav vypnuto. |
| P0.01 | `INT` | (Rezervovaný vstup přerušení) | - |
| P0.02 / P0.03 | `I2C3 SDA/SCL` | 1-Wire master DS2484 | I²C 100 kHz. |
| P0.04 / P0.05 / P0.06 | `RS_DE / RS_RE / RS_ON` | Povolení vysílače RS-485, povolení příjmu, napájení izolátoru | `RS_ON` aktivní v log. 1; výchozí stav vypnuto. |
| P0.07 | `SLPZ` | Spánek / probuzení DS2484 | Aktivní v log. 0. |
| P0.08 / P0.09 / P0.10 | `LED_Y / LED_R / LED_G` | Žlutá / červená / zelená stavová LED | Aktivní v log. 1. |
| P0.13–P0.20 | `GP0`–`GP7` | Univerzální analogové headery | Lze směrovat na `AIN7`–`AIN0`. |
| P0.21 | `DI_EN` | Povolení napájení digitálních vstupů | Aktivní v log. 1; výchozí stav vypnuto. |
| P0.22 / P0.23 | `DI_CH0 / DI_CH1` | Izolované digitální vstupy (CH1 / CH2) | Aktivní v log. 1. |
| P0.24 / P0.25 | `UART0 RX / TX` | Konzole USB-C (přes FT234XD) | 1 000 000 baud. |
| P0.26 | `USB_DETECT` | Detekce kabelu USB-C | Aktivní v log. 0. |
| P0.27 / P0.28 | `UART1 RX / TX` | Debugovací port na headeru JP5 | 115 200 baud. |
| P0.29 / P0.30 | `UART2 RX / TX` | RS-485 (Modbus RTU) přes ISO1212DBQ | 19 200 baud, 8E1. |
| P0.31 | `BUTTON` | Uživatelské tlačítko | Interní pull-up; aktivní v log. 0. |

## Konektivita {#connectivity}

#### Celulární síť {#cellular}

- **LTE-M** a **NB-IoT** přes vestavěný modem nRF9151.
- Slot **nano-SIM** přístupný zvenku.
- Výchozí povolená LTE pásma: **band 8** a **band 20** (Evropa). Pásma lze překonfigurovat při buildu.

#### USB-C (AT konzole) {#usb-c-at-console}

- Konektor USB-C → převodník USB-UART **FT234XD** → `UART0` v nRF9151.
- 1 000 000 baud, 8N1.
- Firmware zapne převodník automaticky, když zaznamená přechod `USB_DETECT` do log. 0 (debounce 50 ms).
- Viz [**AT konzole (USB-C)**](console/usb-at.md).

#### J-Link (RTT) {#j-link-rtt}

- Standardní SWD header (`SWDIO`, `SWCLK`, `GND`, `VTref`).
- RTT (Real-Time Transfer) poskytuje Zephyr shell a živý tok logů.
- Viz [**RTT konzole (J-Link)**](console/rtt-jlink.md).

#### 1-Wire (W1, W2) {#1-wire-w1-w2}

Dva elektricky rovnocenné porty na šroubovací svorkovnici, oba řízené stejným 1-Wire masterem **Maxim DS2484** na interní sběrnici I²C3.

- Ke slotům lze současně navázat až **8 teploměrů DS18B20**.
- Příkaz `therm scan` dokáže v jednom průchodu vyčíst až **12 zařízení**.
- Viz [**Externí teplotní senzory**](external-sensors/temperature.md).

#### Digitální vstupy (CH1, CH2) {#digital-inputs-ch1-ch2}

- **2 galvanicky izolované** kanály vedené na `P0.22` a `P0.23`.
- Každý kanál podporuje režimy `disabled`, `counter` a `event`.
- Konfigurovatelný debounce (aktivní / neaktivní doby) a prodleva mezi událostmi.
- Viz [**Konfigurace → Digitální vstupy**](configuration.md#digital-inputs).

#### RS-485 (Modbus RTU) {#rs-485-modbus-rtu}

- Izolovaný transceiver RS-485 (**ISO1212DBQ**) na `UART2`.
- 19 200 baud, 8E1, rámcování RTU, timeout odpovědi 500 ms.
- Napájen pouze při explicitním zapnutí (`modbus enable`), v nečinnosti tak šetří proud.
- Viz [**Příkazy shellu → `modbus`**](commands/shell-commands.md).

## Napájení a časování {#power-and-timing}

| | |
| :--- | :--- |
| Napájecí větev | Jednotlivá 3.3 V (typické pro nRF9151) |
| Timeout watchdogu | 120 s |
| Výchozí perioda vzorkování | 60 s (`app config interval-sample`) |
| Výchozí perioda uplinku | 300 s (`app config interval-send`) |
| Výchozí downlink watchdog | 36 h (`app config downlink-wdg-interval`; `0` vypíná) |
| Hradlování napájení periferií | USB převodník, digitální vstupy a izolátor RS-485 jsou výchozí vypnuté a napájejí se, jen když je potřeba |

## Indikace a ovládání {#indicators-and-controls}

- **LED (3):** červená, zelená, žlutá. Řízené přes GPIO; ovladatelné příkazem shellu `led`.
- **Tlačítko (1):** spouští akce `app sample` / `app send` podle vzoru stisků:
 - 1 stisk: vynutit `send`
 - 2 stisky: vynutit `sample`
 - 3 stisky: `sample` a poté `send`
 - 4 stisky: restart zařízení

## Firmware {#firmware}

Firmware pro GLIDER je postaven na **Zephyr / nRF Connect SDK** s nadstavbou **HIO SDK** od HARDWARIO, která poskytuje cloudového klienta, konfigurační framework, obsluhu tlačítka, detekci hran a interpret ATCI.

Příkaz pro build:

```bash
west build -b gauger_lte/nrf9151/ns application
```

Interní název desky je `gauger_lte`, GLIDER je komerční název produktu; oba označují tentýž hardware.
