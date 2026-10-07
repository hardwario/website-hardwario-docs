---
slug: devices
title: Zařízení
description: "Stránka Devices obsahuje seznam všech zařízení IoT zaregistrovaných ve vašem prostoru."
title_meta: "Zařízení (HARDWARIO Cloud)"
---

# Zařízení {#devices}

Stránka **Devices** obsahuje seznam všech zařízení IoT zaregistrovaných ve vašem prostoru. Každé odpovídá jednomu fyzickému zařízení CHESTER (nebo jinému zařízení HARDWARIO) a má vlastní identitu, stav a konfiguraci.

## Přidání zařízení {#adding-a-device}

:::tip Videonávod

Postup krok za krokem ukazuje video [**Jak přidat CHESTER do HARDWARIO Cloud**](/cloud/videos-cloud/cloud-chester-add/).

:::

Klikněte vpravo nahoře na **+ NEW DEVICE**. Zařízení lze zprovoznit dvěma způsoby:

### Naskenování QR kódu {#scan-qr-code}

Tlačítkem **SCAN DEVICE** otevřete skener s kamerou a namiřte ho na QR kód na štítku zařízení. Skener automaticky vyplní **Serial Number (HSN)** a **Claim Token**.

### Ruční zadání {#manual-entry}

Vyplňte pole ručně:

| Pole | Popis |
|---|---|
| **Name** | Srozumitelný název, například `warehouse-sensor-01` |
| **Serial Number (HSN)** | Sériové číslo HARDWARIO vytištěné na štítku zařízení |
| **Claim Token** | Jedinečný token každého zařízení. Najdete ho v QR kódu, nebo ho vypíšete příkazem `info show` přes J-Link RTT |

![Dialog vytvoření nového zařízení](../../../../cloud/images/device-create.png)

:::tip

Vytvořte alespoň jeden [tag](tags.md) a přiřaďte ho zařízení a [konektoru](connectors.md). Právě tagy směrují zprávy uplink zařízení do vaší integrace.

:::

## Seznam zařízení {#device-list}

V seznamu zařízení vidíte u každého zařízení:

- **Name** a volitelný komentář
- **Last Seen**: čas posledního uplinku
- **Firmware**: název a verze aplikace
- **Tags**: přiřazené tagy zobrazené jako barevné štítky

Kliknutím na řádek zařízení otevřete jeho detail.

## Detail zařízení {#device-detail}

### Overview {#overview}

Zobrazuje kompletní profil zařízení, který se automaticky vyplní ze zpráv typu session:

| Pole | Popis |
|---|---|
| **Name** | Upravitelný srozumitelný název |
| **Comment** | Volitelná textová poznámka |
| **Serial Number** | Sériové číslo HARDWARIO (HSN) |
| **Last Seen** | Čas poslední přijaté zprávy |
| **Product** | Výrobce hardwaru a název produktu (například CHESTER-M) |
| **HW Variant / Revision** | Označení hardwarové varianty a revize desky (například R3.4) |
| **Firmware** | ID balíčku aplikace, název a verze |
| **LTE Firmware** | Verze firmwaru modemu |
| **IMEI / ICCID / IMSI** | Identifikátory modemu LTE |
| **BLE Passkey** | Přístupový klíč Bluetooth (passkey) pro místní konfiguraci přes BLE |

### Tags {#tags}

Zde zařízení přiřadíte nebo odeberete tagy. Tagy určují, které konektory dostávají zprávy tohoto zařízení. Aby se zprávy přeposílaly, musí mít zařízení a konektor alespoň jeden společný tag.

### Labels {#labels}

Labely jsou **páry klíč–hodnota** připojené k zařízení. Jsou součástí payloadu každého callbacku konektoru, takže backend může na jednotlivá zařízení reagovat různě.

Příklady:
- `location: prague-warehouse-a`
- `customer: acme-corp`
- `floor: 3`

### Messages {#messages}

Zobrazuje historii zpráv tohoto konkrétního zařízení. Podrobnosti viz [Zprávy](messages.md).

### Firmware {#firmware}

Zobrazuje historii aktualizací firmwaru; zde také naplánujete bezdrátovou aktualizaci. Viz [Firmware](firmware.md).

### Downlink {#downlink}

Zde naplánujete downlinkové příkazy, které se doručí při příštím připojení zařízení. Viz [Downlink](/cloud/downlink).
