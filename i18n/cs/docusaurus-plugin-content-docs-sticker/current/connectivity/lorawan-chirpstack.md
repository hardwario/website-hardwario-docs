---
slug: lorawan-chirpstack
title: ChirpStack v4
description: "Než jednotku STICKER zaregistrujete v ChirpStack v4, přečtěte přes NFC její výrobní klíče aplikací HARDWARIO Manager a zapněte radio."
title_meta: "ChirpStack v4 (STICKER)"
---
import Image from '@theme/IdealImage';

# ChirpStack v4 {#chirpstack-v4}

**ChirpStack v4** je open-source síťový server LoRaWAN pro privátní nasazení na vlastní infrastruktuře.

:::info Předpoklady
1. Ujistěte se, že je **ChirpStack v4** nainstalovaný a funkční. Viz [průvodce instalací ChirpStacku](https://docs.hardwario.com/apps/chirpstack/chirpstack-installation).
2. Před vytvořením profilů koncových zařízení v ChirpStacku si přes NFC vytáhněte přihlašovací údaje zařízení pomocí [**HARDWARIO Manager**](/sticker/hardwario-manager/).
:::

---

## Přihlašovací údaje zařízení a získání přes NFC {#device-credentials--nfc-extraction}

Než jednotku STICKER zaregistrujete v ChirpStack v4, přečtěte přes NFC její výrobní klíče aplikací
[**HARDWARIO Manager**](/apps/hardwario-manager). Bez kabelu a bez programátoru.
Stačí přiložit telefon k zařízení.

:::tip S aplikací začínáte?
Projděte si nejdřív [**rychlého průvodce HARDWARIO Manager**](/apps/hardwario-manager/first-steps):
instalaci aplikace, zapnutí NFC a udělení oprávnění, o která si aplikace řekne.
STICKER se čte telefonem s **Androidem** a NFC.
:::

1. **Uložte zařízení, aby aplikace měla jeho secret key.** STICKER odpovídá jen
   šifrovaným kanálem, takže bez klíče aplikace nic nepřečte. Každé zařízení přidáte
   jednou (viz
   [**Uložené STICKERy**](/apps/hardwario-manager/sticker/saved-stickers)) a od té
   doby aplikace klíč doplňuje automaticky.
2. **Otevřete STICKER → LoRaWAN keys** a zvolte **Read LoRaWAN keys**.
3. **Přiložte telefon.** Zadní stranou telefonu se dotkněte krabičky STICKER a
   vteřinu či dvě se nehýbejte. Anténa NFC bývá u **horní části zadní strany**
   telefonu; pokud se nic nestane, pomalu telefonem v tom místě pohybujte. Na
   **iOS** vás systémový dialog skenování v půli vyzve, abyste telefon zvedli a
   přiložili znovu. Toto zvednutí je nutné. Celý postup přiložení a to, co během
   výměny ukazuje LED, popisuje [**STICKER přes NFC**](/apps/hardwario-manager/sticker).
4. **Zapište si klíče, které aplikace ukáže.** Které to budou, závisí na režimu
   aktivace: **DevEUI**, **JoinEUI (AppEUI)** a **AppKey** pro OTAA, nebo **DevEUI**,
   **DevAddr** a klíče session pro ABP, viz
   [**Informace o zařízení a klíče LoRaWAN**](/apps/hardwario-manager/sticker/device-info).
5. **Zkontrolujte, že je radio zapnuté.** V **STICKER → Configuration** musí být
   v sekci LoRaWAN parametr **`radio-mode`** nastavený na LoRaWAN, protože zařízení
   se dodávají s vypnutým radiem; jednotka se pak po registraci pokusí připojit. Viz
   [**Konfigurace**](/apps/hardwario-manager/sticker/configuration) a
   [**Šablony**](/apps/hardwario-manager/sticker/templates), když chcete celé dávce
   dát stejné nastavení.

---

## Volba metody aktivace {#select-activation-method}

| Režim aktivace | Popis | Potřebné údaje |
|---|---|---|
| **[OTAA (aktivace přes vzduch)](./chirpstack-otaa.md)** *(doporučeno)* | Dynamické vyjednání klíčů session při připojení. Zajišťuje nejvyšší bezpečnost. | **DevEUI**, **JoinEUI (AppEUI)**, **AppKey** |
| **[ABP (aktivace personalizací)](./chirpstack-abp.md)** | Předem přidělené statické klíče session. Proceduru připojení obchází. | **DevAddr**, **NwkSKey**, **AppSKey** |

---

## Profil zařízení a nastavení kodeku payloadu {#device-profile--payload-codec-setup}

Při konfiguraci **Device Profile** zařízení STICKER v ChirpStack v4:

- **Ovladač kodeku:** Zvolte kodek **JavaScript** a vložte oficiální dekodér STICKER (`ttn.js`).
- **Obousměrné možnosti:** Kodek automaticky parsuje telemetrické uplinky na fPort 2, alarmová hlášení na fPort 3 a formátuje vzdálené JSON downlinky na **fPort 85** (viz [**Downlink příkazy**](downlink-commands.md)).

---

## Užitečné odkazy {#useful-links}

- [HARDWARIO Manager a STICKER](/sticker/hardwario-manager/)
- [Rychlý průvodce HARDWARIO Manager](/apps/hardwario-manager/first-steps)
- [Čtení informací o zařízení a klíčů LoRaWAN přes NFC](/apps/hardwario-manager/sticker/device-info)
- [Průvodce instalací ChirpStack v4](https://docs.hardwario.com/apps/chirpstack/chirpstack-installation)
- [Dokumentace koncových zařízení ChirpStack](https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-end-devices)
- [Průvodce dekodéry payloadu v ChirpStacku](https://docs.hardwario.com/apps/chirpstack/chirpstack-configuration/chirpstack-decoding)
- [Dekodér payloadu STICKER (`ttn.js`) na GitHubu](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)
