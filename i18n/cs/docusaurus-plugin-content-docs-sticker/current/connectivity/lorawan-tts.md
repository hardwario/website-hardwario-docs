---
slug: lorawan-tts
title: The Things Stack
description: "Než jednotku STICKER zaregistrujete v The Things Stack, přečtěte přes NFC její výrobní klíče aplikací HARDWARIO Manager a zapněte radio."
title_meta: "The Things Stack (STICKER)"
---
import Image from '@theme/IdealImage';

# The Things Stack {#the-things-stack}

**The Things Stack (TTS)** je spravovaný síťový server LoRaWAN od The Things Industries, dostupný jako veřejná cloudová služba (TTS Cloud / Community Edition) nebo jako privátní podnikové nasazení.

:::info Předpoklady
1. Ujistěte se, že máte přístup k aktivní instanci **The Things Stack** a v dosahu funkční bránu LoRaWAN.
2. Před vytvořením profilů koncových zařízení v TTS si přes NFC vytáhněte přihlašovací údaje zařízení pomocí [**HARDWARIO Manager**](/sticker/hardwario-manager/).
:::

---

## Přihlašovací údaje zařízení a získání přes NFC {#device-credentials--nfc-extraction}

Než jednotku STICKER zaregistrujete v The Things Stack, přečtěte přes NFC její výrobní klíče aplikací
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
| **[OTAA (aktivace přes vzduch)](./tts-otaa.md)** *(doporučeno)* | Dynamické vyjednání klíčů session při připojení. Zajišťuje maximální bezpečnost. | **DevEUI**, **JoinEUI (AppEUI)**, **AppKey** |
| **[ABP (aktivace personalizací)](./tts-abp.md)** | Předem přidělené statické klíče session. Proceduru připojení úplně vynechává. | **DevAddr**, **NwkSKey**, **AppSKey** |

---

## Formátovač payloadu a konfigurace downlinků {#payload-formatter--downlink-configuration}

Při registraci koncového zařízení STICKER v TTS:

- **Formátovač uplinku:** V **Payload Formatters → Uplink** přiřaďte oficiální dekodér payloadu STICKER (`ttn.js`). Ten dekóduje standardní data ze senzorů na fPort 2 a systémové a alarmové zprávy na fPort 3.
- **Formátovač downlinku:** V **Payload Formatters → Downlink** přiřaďte `ttn.js`, čímž zapnete kódování JSON payloadů pro vzdálenou správu na **fPort 85** (viz [**Downlink příkazy**](downlink-commands.md)).

---

## Užitečné odkazy {#useful-links}

- [HARDWARIO Manager a STICKER](/sticker/hardwario-manager/)
- [Rychlý průvodce HARDWARIO Manager](/apps/hardwario-manager/first-steps)
- [Čtení informací o zařízení a klíčů LoRaWAN přes NFC](/apps/hardwario-manager/sticker/device-info)
- [Dokumentace koncových zařízení TTS](https://docs.hardwario.com/apps/the-things-stack/tts-configuration/tts-end-devices)
- [Dekodér payloadu STICKER (`ttn.js`) na GitHubu](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)
