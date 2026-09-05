---
slug: devices
title: Zařízení
description: "Stránka Devices vypisuje všechna IoT zařízení zaregistrovaná ve vašem prostoru. Každé zařízení odpovídá fyzickému zařízení CHESTER (nebo jinému zařízení HARDWARIO) a má vlastní identitu, stav a konfiguraci."
---

# Zařízení {#devices}

Stránka **Devices** vypisuje všechna IoT zařízení zaregistrovaná ve vašem prostoru. Každé zařízení odpovídá fyzickému zařízení CHESTER (nebo jinému zařízení HARDWARIO) a má vlastní identitu, stav a konfiguraci.

## Přidání zařízení {#adding-a-device}

:::tip Videonávod

Postup krok za krokem najdete ve videu [**Jak přidat CHESTER do cloudu**](/cloud/videos-cloud/cloud-chester-add/).

:::

Klikněte vpravo nahoře na **+ NEW DEVICE**. Zařízení lze zprovoznit dvěma způsoby:

### Naskenování QR kódu {#scan-qr-code}

Kliknutím na **SCAN DEVICE** otevřete skener kamerou. Namiřte ho na QR kód na etiketě zařízení. Skener automaticky vyplní **Serial Number (HSN)** a **Claim Token**.

### Ruční zadání {#manual-entry}

Vyplňte pole ručně:

| Pole | Popis |
|---|---|
| **Name** | Čitelné jméno, například `warehouse-sensor-01` |
| **Serial Number (HSN)** | Sériové číslo HARDWARIO vytištěné na etiketě zařízení |
| **Claim Token** | Token unikátní pro každé zařízení. Je vidět na QR kódu nebo přes `info show` po J-Link RTT |

![Dialog vytvoření nového zařízení](../../../../cloud/images/device-create.png)

:::tip

Vytvořte alespoň jeden [tag](tags.md) a přiřaďte ho zařízení a [konektoru](connectors.md). Tagy jsou to, co směruje uplink zprávy zařízení do vaší integrace.

:::

## Seznam zařízení {#device-list}

Seznam zařízení zobrazuje u každého zařízení přehled:

- **Name** a volitelný komentář
- **Last Seen**: čas posledního uplinku
- **Firmware**: název a verze aplikace
- **Tags**: přiřazené tagy zobrazené jako barevné odznaky

Kliknutím na řádek zařízení otevřete jeho detail.

## Detail zařízení {#device-detail}

### Overview {#overview}

Zobrazuje kompletní profil zařízení, vyplněný automaticky ze zpráv session:

| Pole | Popis |
|---|---|
| **Name** | Editovatelné čitelné jméno |
| **Comment** | Volitelná textová poznámka |
| **Serial Number** | Sériové číslo HARDWARIO (HSN) |
| **Last Seen** | Čas poslední přijaté zprávy |
| **Product** | Výrobce hardwaru a název produktu (například CHESTER-M) |
| **HW Variant / Revision** | Označení hardwarové varianty a revize desky (například R3.4) |
| **Firmware** | ID balíčku aplikace, název a verze |
| **LTE Firmware** | Verze firmwaru modemu |
| **IMEI / ICCID / IMSI** | Identifikátory modemu LTE |
| **BLE Passkey** | Bluetooth passkey pro lokální konfiguraci přes BLE |

### Tags {#tags}

Přiřazuje nebo odebírá tagy zařízení. Tagy určují, které konektory dostanou zprávy tohoto zařízení. Zařízení a konektor musí mít alespoň jeden tag společný, aby se zprávy přeposílaly.

### Labels {#labels}

Labely jsou **páry klíč-hodnota** připojené k zařízení. Přiloží se ke každému callbacku konektoru, takže váš backend může na jednotlivá zařízení reagovat různě.

Příklady použití:
- `location: prague-warehouse-a`
- `customer: acme-corp`
- `floor: 3`

### Messages {#messages}

Zobrazuje historii zpráv tohoto konkrétního zařízení. Podrobnosti viz [Zprávy](messages.md).

### Firmware {#firmware}

Zobrazuje historii aktualizací firmwaru a umožňuje naplánovat aktualizaci vzduchem. Viz [Firmware](firmware.md).

### Downlink {#downlink}

Naplánuje downlink příkazy k doručení při dalším připojení zařízení. Viz [Downlink](/cloud/downlink).
