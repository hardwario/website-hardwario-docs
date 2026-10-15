---
slug: setup
title: Nastavení brány FIBER
title_meta: "Nastavení brány FIBER (HARDWARIO Manager)"
---

# Nastavení brány FIBER {#set-up-a-fiber}

Průvodce nastavením provede novou bránu FIBER od zapnutí až ke sběru dat.
Spustíte ho přes **FIBER → Provisioning**. K dokončeným krokům se můžete vrátit,
dopředu ale přeskakovat nelze.

:::info Než začnete
Zapněte bránu FIBER a mějte ji v dosahu Bluetooth telefonu. Zapněte v telefonu
Bluetooth, a až o to aplikace požádá, povolte oprávnění **Zařízení v okolí**
a **Kamera**.
:::

---

## 1. Scan QR {#1-scan-qr}

**Podržte ENTER** na bráně FIBER, aby zobrazila svůj QR kód, pak zvolte
**Scan device QR** a namiřte na něj fotoaparát. Aplikace se připojí přes
Bluetooth; může to trvat až minutu. Viz
[**Jak telefon získá přístup**](./index.md#how-the-phone-gets-access).

## 2. Set device name {#2-set-device-name}

Pojmenujte bránu FIBER, například `fiber-warehouse-1`. Název se uloží do
zařízení a brána se jím identifikuje, proto zvolte něco snadno rozpoznatelného.

## 3. Connect to Wi-Fi {#3-connect-to-wi-fi}

Aplikace se brány FIBER zeptá, které sítě Wi-Fi vidí, a vypíše je. Síť, ve které
je telefon, je označená **Recommended**.

1. Klepněte na síť, zadejte heslo a potvrďte.
2. Počkejte, až aplikace ohlásí **Connected to „…“** s adresou, kterou brána
   dostala.

Místo psaní můžete tlačítkem **Scan Wi-Fi QR** naskenovat QR kód Wi-Fi ze
štítku routeru nebo kód nasdílený z jiného telefonu. Pokud vaše síť chybí,
použijte **Rescan**; síť, která běží jen v pásmu 5 GHz, může být mimo dosah.

Pokud je brána FIBER připojená ethernetovým kabelem, zvolte
**Skip Wi-Fi for now**. Brána na kabelu dostane adresu z DHCP ještě před
spuštěním průvodce. Nastavení Ethernetu včetně statické adresy najdete
v [**Připojení k síti**](./network.md).

## 4. Role {#4-role}

Zvolte, jak bude brána FIBER pracovat:

| Role | Kdy ji použít |
|---|---|
| **Server** | Brána FIBER pracuje samostatně. Připojíte k ní zařízení STICKER a Beacony a ona sbírá jejich data. |
| **Client** | Brána FIBER posílá data jiné bráně FIBER, která je nastavená jako server. |

Zbytek průvodce závisí na zvolené roli.

## 5a. Server: připojení zařízení STICKER a Beaconů {#5a-server-connect-stickers-and-beacons}

Následují dva nepovinné kroky:

- **Connect STICKERs**: přidejte zařízení STICKER hned, viz [**Připojení zařízení STICKER**](./stickers.md).
- **Connect Beacons**: přidejte Beacony hned, viz [**Připojení Beaconů**](./beacons.md).

Oba kroky lze přeskočit volbou **Skip & continue** nebo **Skip & finish**
a udělat je později z domovské stránky brány FIBER.

## 5b. Client: připojení k serveru {#5b-client-connect-to-a-server}

Brána FIBER v roli klienta posílá data přes MQTT bráně FIBER, kterou jste
nastavili jako server. Zadejte:

| Pole | Hodnota |
|---|---|
| **Server address** | Název hostitele nebo IP adresa serveru, například `192.168.1.42`. MQTT běží na portu **8883** přes TLS, port proto nepřidávejte. |
| **MQTT username** | Uživatelské jméno, které server očekává |
| **MQTT password** | Jeho heslo |

Zvolte **Save to the FIBER**. Pokud firmware brány FIBER zatím neumí adresu
serveru přes Bluetooth přijmout, aplikace si ji ponechá v telefonu a oznámí to.

## 6. Dokončení {#6-finish}

Zvolte **Finish setup**. Aplikace zapíše do brány FIBER, že je nastavení hotové,
a přepne na domovskou stránku brány.
