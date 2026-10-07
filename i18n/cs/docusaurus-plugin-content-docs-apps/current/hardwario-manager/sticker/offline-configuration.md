---
slug: offline-configuration
title: Konfigurace vypnutého zařízení
---

# Konfigurace vypnutého zařízení STICKER {#configure-a-powered-off-sticker}

Zařízení STICKER lze konfigurovat **bez vložených baterií**. Pole NFC z telefonu
zařízení napájí dost dlouho na to, aby si nastavení uložilo, a zařízení ho
začne používat po dalším startu z baterií. Díky tomu můžete zařízení připravit ještě
před instalací.

:::info Zařízení už musí mít svůj secret key
Offline zápis probíhá stejným šifrovaným kanálem jako běžný, takže zařízení musí
mít nastavený secret key a musí být uložené v telefonu. Viz
[**Saved STICKERs**](./saved-stickers.md).
:::

---

## Sestavení konfigurace a její zápis {#build-a-configuration-and-write-it}

1. Přejděte na **STICKER → Configuration → Configure without reading**.
2. Sestavte konfiguraci: buď ji volbou **Apply template** vyplňte z uložené
   šablony, nebo otevřete jednotlivé sekce a hodnoty nastavte ručně.
3. Klepněte na **Save to device** a přiložte telefon k zařízení STICKER.

<img src="/img/hw-manager/hw-manager-configuration-without-reading.png" alt="Configure without reading: sestavení konfigurace offline s počítadlem velikosti, připravené k zápisu do tagu" width="320" />

Protože se ze zařízení předem nic nečetlo, zapíše se každá nastavená hodnota
přesně tak, jak je. Není s čím porovnávat, a proto tu chybí i volba
**Revert to read values**.

---

## Sledujte počítadlo velikosti {#watch-the-size-counter}

Offline zápis se musí vejít do paměti tagu v zařízení, proto obrazovka při
přidávání nastavení průběžně ukazuje **počítadlo velikosti** vzhledem k limitu.
Pokud limit překročíte, odebírejte nastavení, dokud se do něj nevejdete. Nejsnáz
se v limitu udržíte se šablonou, která obsahuje jen to, co skutečně potřebujete.

---

## Hromadné použití šablony offline {#apply-a-template-offline-in-bulk}

Pokud chcete mnoha vypnutým zařízením nastavit totéž, sestavte konfiguraci jednou
jako šablonu a použijte ji v **STICKER → Templates**:

1. Otevřete šablonu a zvolte **Apply offline**.
2. Konfigurace se ze šablony předvyplní: zkontrolujte ji.
3. Klepněte na **Write to tag** a postupně přikládejte telefon ke každému zařízení.
4. Pomocí **Verify (read tag)** zařízení přečtěte zpět a ověřte, co se uložilo.

Viz [**Šablony**](./templates.md).

:::tip Před instalací zápis ověřte
Takto nastavené zařízení převezme nastavení až při dalším startu, takže při zápisu
není nic vidět. Volbou **Verify (read tag)** ověříte, že se zápis povedl, ještě
než zařízení namontujete na zeď.
:::
