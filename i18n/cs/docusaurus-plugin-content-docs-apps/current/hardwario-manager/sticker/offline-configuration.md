---
slug: offline-configuration
title: Konfigurace vypnutého zařízení
description: "Zařízení STICKER lze konfigurovat bez vložených baterií. Pole NFC z telefonu"
---

# Konfigurace vypnutého zařízení STICKER {#configure-a-powered-off-sticker}

Zařízení STICKER lze konfigurovat **bez vložených baterií**. Pole NFC z telefonu
zařízení napájí dost dlouho na to, aby si nastavení uložilo, a zařízení ho
aplikuje při dalším startu na baterie. Díky tomu můžete zařízení připravit ještě
před instalací.

:::info Zařízení už musí mít svůj secret key
Offline zápisy jdou stejným šifrovaným kanálem jako běžné, takže zařízení musí být
zprovozněné se secret key a uložené v telefonu. Viz
[**Uložené STICKERy**](./saved-stickers.md).
:::

---

## Sestavení konfigurace a její zápis {#build-a-configuration-and-write-it}

1. Přejděte na **STICKER → Configuration → Configure without reading**.
2. Sestavte konfiguraci: buď volbou **Apply template** z uloženého presetu, nebo
   otevřete jednotlivé sekce a hodnoty nastavte ručně.
3. Klepněte na **Save to device** a přiložte telefon k zařízení STICKER.

<img src="/img/hw-manager/hw-manager-configuration-without-reading.png" alt="Configure without reading: sestavení konfigurace offline s počítadlem velikosti, připravené k zápisu do tagu" width="320" />

Protože se ze zařízení nic nečetlo, zapíše se každá hodnota, kterou nastavíte,
tak jak je. Není s čím porovnávat a není tu ani **Revert to read values**.

---

## Sledujte počítadlo velikosti {#watch-the-size-counter}

Offline zápis se musí vejít do tagové paměti zařízení, takže obrazovka průběžně
zobrazuje **počítadlo velikosti** proti limitu. Pokud ho překročíte, ubírejte
nastavení, dokud se počítadlo nevejde. Nejjednodušší cesta, jak zůstat v limitu,
je šablona, která nese jen to, co skutečně potřebujete.

---

## Hromadná aplikace šablony offline {#apply-a-template-offline-in-bulk}

Pokud chcete mnoha vypnutým zařízením nastavit totéž, sestavte konfiguraci jednou
jako šablonu a aplikujte ji z **STICKER → Templates**:

1. Otevřete šablonu a zvolte **Apply offline**.
2. Konfigurace se ze šablony předvyplní: zkontrolujte ji.
3. Klepněte na **Write to tag** a postupně přikládejte telefon ke každému zařízení.
4. Pomocí **Verify (read tag)** zařízení přečtěte zpět a ověřte, co se uložilo.

Viz [**Šablony**](./templates.md).

:::tip Ověřte to před instalací
Takhle nastavené zařízení aplikuje nastavení až při dalším startu, takže se v době
zápisu nic viditelného nestane. **Verify (read tag)** je způsob, jak si zápis
potvrdit, ještě než zařízení půjde na zeď.
:::
