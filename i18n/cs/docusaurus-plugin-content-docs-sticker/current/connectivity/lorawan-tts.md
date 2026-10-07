---
slug: lorawan-tts
title: The Things Stack
title_meta: "The Things Stack (STICKER)"
---
import Image from '@theme/IdealImage';

# The Things Stack {#the-things-stack}

**The Things Stack (TTS)** je spravovaný síťový server LoRaWAN od společnosti The Things Industries, dostupný jako veřejná cloudová služba (TTS Cloud / Community Edition) nebo jako privátní podnikové nasazení.

:::info Předpoklady
1. Ujistěte se, že máte přístup k aktivní instanci **The Things Stack** a v dosahu funkční bránu LoRaWAN.
2. Než v TTS vytvoříte profily koncových zařízení, přečtěte přes NFC klíče zařízení v aplikaci [**HARDWARIO Manager**](/sticker/hardwario-manager/).
:::

---

## Klíče zařízení a jejich načtení přes NFC {#device-credentials--nfc-extraction}

Než zařízení STICKER zaregistrujete v The Things Stack, přečtěte přes NFC jeho výrobní klíče v aplikaci
[**HARDWARIO Manager**](/apps/hardwario-manager). Nepotřebujete kabel ani programátor,
stačí přiložit telefon k zařízení.

:::tip S aplikací začínáte?
Projděte si nejdřív [**rychlého průvodce aplikací HARDWARIO Manager**](/apps/hardwario-manager/first-steps):
instalaci aplikace, zapnutí NFC a udělení oprávnění, o která aplikace požádá.
STICKER se čte telefonem s **Androidem** a NFC.
:::

1. **Uložte zařízení, aby aplikace měla jeho secret key.** STICKER odpovídá jen
   šifrovaným kanálem, takže bez klíče aplikace nic nepřečte. Každé zařízení přidáte
   jen jednou (viz
   [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers)) a od té
   doby aplikace klíč doplňuje sama.
2. **Otevřete STICKER → LoRaWAN keys** a zvolte **Read LoRaWAN keys**.
3. **Přiložte telefon.** Zadní stranou telefonu se dotkněte krabičky zařízení STICKER a
   vteřinu či dvě se nehýbejte. Anténa NFC bývá u **horní části zadní strany**
   telefonu; pokud se nic nestane, pomalu telefonem v tom místě pohybujte. Na
   **iOS** vás systémový dialog skenování v půli vyzve, abyste telefon zvedli a
   přiložili znovu. Toto zvednutí je nutné. Celý postup přiložení a to, co během
   výměny ukazuje LED, popisuje [**STICKER přes NFC**](/apps/hardwario-manager/sticker).
4. **Zapište si klíče, které aplikace ukáže.** Které to budou, závisí na režimu
   aktivace: **DevEUI**, **JoinEUI (AppEUI)** a **AppKey** pro OTAA, nebo **DevEUI**,
   **DevAddr** a klíče relace pro ABP, viz
   [**Informace o zařízení a klíče LoRaWAN**](/apps/hardwario-manager/sticker/device-info).
5. **Zkontrolujte, že je rádio zapnuté.** V **STICKER → Configuration** musí být
   v sekci LoRaWAN parametr **`radio-mode`** nastavený na LoRaWAN, aby se zařízení
   po registraci začalo připojovat k síti; z výroby se totiž dodává s vypnutým rádiem. Viz
   [**Konfigurace**](/apps/hardwario-manager/sticker/configuration) a
   [**Šablony**](/apps/hardwario-manager/sticker/templates), pokud chcete celé sérii
   zařízení nastavit totéž.

---

## Volba metody aktivace {#select-activation-method}

| Režim aktivace | Popis | Potřebné údaje |
|---|---|---|
| **[OTAA (bezdrátová aktivace)](./tts-otaa.md)** *(doporučeno)* | Dynamické vyjednání klíčů relace při připojení. Nejvyšší úroveň zabezpečení. | **DevEUI**, **JoinEUI (AppEUI)**, **AppKey** |
| **[ABP (aktivace personalizací)](./tts-abp.md)** | Předem přidělené statické klíče relace. Procedura Join se úplně vynechává. | **DevAddr**, **NwkSKey**, **AppSKey** |

---

## Formátovač payloadu a konfigurace downlinků {#payload-formatter--downlink-configuration}

Při registraci koncového zařízení STICKER v TTS:

- **Formátovač uplinku:** V **Payload Formatters → Uplink** přiřaďte oficiální dekodér payloadu STICKER (`ttn.js`). Ten dekóduje standardní data ze senzorů na fPort 2 a systémové a alarmové zprávy na fPort 3.
- **Formátovač downlinku:** V **Payload Formatters → Downlink** přiřaďte `ttn.js`, aby se payloady v JSON pro správu na dálku kódovaly na **fPort 85** (viz [**Příkazy přes downlink**](downlink-commands.md)).

---

## Užitečné odkazy {#useful-links}

- [HARDWARIO Manager a STICKER](/sticker/hardwario-manager/)
- [Rychlý průvodce aplikací HARDWARIO Manager](/apps/hardwario-manager/first-steps)
- [Čtení informací o zařízení a klíčů LoRaWAN přes NFC](/apps/hardwario-manager/sticker/device-info)
- [Koncová zařízení v TTS](/apps/the-things-stack/tts-configuration/tts-end-devices)
- [Dekodér payloadu STICKER (`ttn.js`) na GitHubu](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)
