---
title: Nastavení HARDWARIO Cloud
sidebar_position: 3
description: "Připojení zařízení GLIDER k HARDWARIO Cloud: zařízení je z výroby připravené, stačí ho zaregistrovat ve webovém rozhraní pomocí dvou identifikátorů."
---
import Image from '@theme/IdealImage';

# Připojení zařízení GLIDER k HARDWARIO Cloud {#connecting-glider-to-hardwario-cloud}

Zařízení GLIDER je z výroby připraveno komunikovat s **HARDWARIO Cloud**. Stačí ho zaregistrovat ve webovém rozhraní pomocí dvou údajů, které jsou pro každou jednotku unikátní: **sériového čísla** a **claim tokenu**.

:::tip
Tato stránka se zaměřuje jen na spárování s cloudem. Celé nastavení od začátku (účet v cloudu, prostor, zařízení, zapnutí, kontrola LED) popisuje [**Rychlý průvodce**](first-steps.md).
:::

## Co budete potřebovat {#what-you-will-need}

- Účet v HARDWARIO Cloud: [https://cloud.hardwario.com](https://cloud.hardwario.com)
- Zařízení GLIDER, které je **zapnuté** a připojené k mobilní síti
- Přístup ke **konzoli RTT**, nebo ke **konzoli AT**, ze které oba údaje vyčtete

:::info
Pokud ještě nemáte konzoli připravenou, postupujte nejprve podle jednoho z těchto návodů:

- [**Konzole RTT (J-Link)**](console/rtt-jlink.md): pro vývojové pracoviště se sondou J-Link.
- [**Konzole AT (USB-C)**](console/usb-at.md): doporučeno pro první zprovoznění.
:::

## Krok 1: Vyčtěte sériové číslo a claim token {#step-1---read-the-serial-number-and-claim-token}

#### Pomocí konzole RTT (shell Zephyr) {#using-the-rtt-console-zephyr-shell}

```text
info show
```

Jednotlivé údaje můžete vypsat i samostatně:

```text
info serial-number
info claim-token
```

#### Pomocí konzole AT {#using-the-at-console}

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

## Krok 2: Vytvořte zařízení v HARDWARIO Cloud {#step-2---create-the-device-in-hardwario-cloud}

1. Přihlaste se na [https://cloud.hardwario.com](https://cloud.hardwario.com).
2. Otevřete **prostor**, ve kterém má zařízení být (nebo vytvořte nový).
3. Klikněte na **Create new device**.
4. Vyplňte:
 - **Name**: libovolný název, například `Warehouse-A freezer`.
 - **Serial number**: hodnota z kroku 1.
 - **Claim token**: hodnota z kroku 1.
5. Klikněte na **Create**.

Zařízení se teď zobrazí v prostoru.

## Krok 3: Ověřte, že data přicházejí {#step-3---verify-that-data-arrives}

1. Otevřete nové zařízení ve webovém rozhraní cloudu.
2. Přejděte na **Show device messages**.

Do několika minut by měl dorazit první payload CBOR. Zařízení GLIDER ve výchozím nastavení:

- Vzorkuje senzory každých **60 sekund** (`app config interval-sample`)
- Odesílá payload každých **300 sekund / 5 minut** (`app config interval-send`)

Okamžitý uplink vynutíte takto:

- **Konzole AT:** `AT$SHELL="app send"`
- **Konzole RTT:** `app send`

Strukturu payloadu popisuje stránka [**CBOR payload**](payload.md).

## Řešení problémů {#troubleshooting}

| Příznak | Co zkontrolovat |
| :--- | :--- |
| Cloud ukazuje zařízení jako **offline** | Počkejte na první uplink až 5 minut. Ověřte, že je SIM karta aktivní a má datový tarif. Vynuťte `app send`. |
| `AT$INFO?` zobrazuje prázdný claim token | Zařízení nebylo zprovozněno. Kontaktujte podporu HARDWARIO. |
| Zprávy přicházejí, ale datová pole vypadají chybně | Ověřte, že cloud má pro tento firmware správný dekodér CBOR. Viz [**CBOR payload**](payload.md). |
| Zařízení se každých 36 hodin odpojí | Zařízení restartuje watchdog downlinku, viz `app config downlink-wdg-interval` na stránce [**Konfigurace**](configuration.md). |

#### Čtení logů firmwaru {#reading-firmware-logs}

Pokud nedokážete zjistit, proč se zařízení nepřipojí, připojte [**konzoli RTT (J-Link)**](console/rtt-jlink.md) a sledujte logy modemu. Uvidíte pokusy o připojení k síti LTE-M, vyjednávání APN a případné chyby při odesílání CBOR.
