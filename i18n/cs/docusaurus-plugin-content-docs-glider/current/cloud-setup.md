---
title: Nastavení HARDWARIO Cloud
sidebar_position: 3
description: "Zařízení GLIDER je z výroby připraveno komunikovat s HARDWARIO Cloud. Stačí zařízení zaregistrovat ve webovém rozhraní pomocí dvou údajů, které jsou pro každou jednotku unikátní: sériového čísla a claim tokenu."
---
import Image from '@theme/IdealImage';

# Připojení zařízení GLIDER k HARDWARIO Cloud {#connecting-glider-to-hardwario-cloud}

Zařízení GLIDER je z výroby připraveno komunikovat s **HARDWARIO Cloud**. Stačí zařízení zaregistrovat ve webovém rozhraní pomocí dvou údajů, které jsou pro každou jednotku unikátní: **sériového čísla** a **claim tokenu**.

:::tip
Tato stránka se zaměřuje na spárování s cloudem. Kompletní nastavení od začátku do konce (účet v cloudu, prostor, zařízení, zapnutí, kontrola LED) najdete v [**rychlém průvodci**](first-steps.md).
:::

## Co budete potřebovat {#what-you-will-need}

- Účet v HARDWARIO Cloud: [https://cloud.hardwario.com](https://cloud.hardwario.com)
- Zařízení GLIDER, které je **zapnuté** a připojené k mobilní síti
- Přístup buď ke **RTT konzoli**, nebo k **AT konzoli** pro vyčtení přihlašovacích údajů

:::info
Pokud ještě nemáte konzoli připravenou, postupujte nejprve podle jednoho z těchto návodů:

- [**RTT konzole (J-Link)**](console/rtt-jlink.md): pro vývojová nasazení se sondou J-Link.
- [**AT konzole (USB-C)**](console/usb-at.md): doporučeno pro první zprovoznění.
:::

## Krok 1 - Vyčtěte sériové číslo a claim token {#step-1---read-the-serial-number-and-claim-token}

#### Pomocí RTT konzole (shell Zephyr) {#using-the-rtt-console-zephyr-shell}

```text
info show
```

Můžete se také dotázat na jednotlivé údaje:

```text
info serial-number
info claim-token
```

#### Pomocí AT konzole {#using-the-at-console}

```text
AT$INFO?
```

Měli byste vidět výstup podobný tomuto:

```text
$INFO: "vendor-name","HARDWARIO"
$INFO: "product-name","GLIDER"
$INFO: "hw-revision","R1.1"
$INFO: "hw-variant",""
$INFO: "serial-number","2163212289"
$INFO: "claim-token","ab01ad36ab1234567890abcdef..."
```

Poznamenejte si hodnoty **`serial-number`** a **`claim-token`**. V dalším kroku budete potřebovat obě.

## Krok 2 - Vytvořte zařízení v HARDWARIO Cloud {#step-2---create-the-device-in-hardwario-cloud}

1. Přihlaste se na [https://cloud.hardwario.com](https://cloud.hardwario.com).
2. Otevřete **prostor**, ve kterém má zařízení být (nebo vytvořte nový).
3. Stiskněte **Create new device**.
4. Vyplňte:
 - **Name**: libovolný srozumitelný popisek, např. `Warehouse-A freezer`.
 - **Serial number**: hodnota z kroku 1.
 - **Claim token**: hodnota z kroku 1.
5. Stiskněte **Create**.

Zařízení se nyní objeví ve vašem prostoru.

## Krok 3 - Ověřte, že data přicházejí {#step-3---verify-that-data-arrives}

1. Otevřete nové zařízení ve webovém rozhraní cloudu.
2. Přejděte na **Show device messages**.

Během několika minut byste měli vidět první příchozí CBOR payload. Zařízení GLIDER ve výchozím nastavení:

- Vzorkuje senzory každých **60 sekund** (`app config interval-sample`)
- Odesílá payload každých **300 sekund / 5 minut** (`app config interval-send`)

Okamžitý uplink vynutíte takto:

- **AT konzole:** `AT$SHELL="app send"`
- **RTT konzole:** `app send`

Struktura payloadu je popsána na stránce [**CBOR payload**](payload.md).

## Řešení problémů {#troubleshooting}

| Příznak | Co zkontrolovat |
| :--- | :--- |
| Zařízení je v cloudu vedeno jako **offline** | Vyčkejte až 5 minut na první uplink. Zkontrolujte, že je SIM aktivní a má data. Vynuťte `app send`. |
| `AT$INFO?` zobrazuje prázdný claim token | Zařízení nebylo zprovozněno. Kontaktujte podporu HARDWARIO. |
| Zprávy přicházejí, ale datová pole vypadají chybně | Ověřte, že cloud má pro tento firmware správný CBOR dekodér. Viz [**CBOR payload**](payload.md). |
| Zařízení se každých 36 hodin odpojí | Reset watchdogu pro downlink, viz `app config downlink-wdg-interval` v [**konfiguraci**](configuration.md). |

#### Čtení logů firmwaru {#reading-firmware-logs}

Pokud nedokážete zjistit, proč se zařízení nepřipojí, připojte [**RTT konzoli (J-Link)**](console/rtt-jlink.md) a sledujte logy modemu. Uvidíte pokusy o připojení k LTE-M, vyjednávání APN a případné chyby při odesílání CBOR.
