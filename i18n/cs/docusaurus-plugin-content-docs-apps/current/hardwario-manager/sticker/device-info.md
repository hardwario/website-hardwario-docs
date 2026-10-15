---
slug: device-info
title: Informace o zařízení a klíče LoRaWAN
---

# Čtení informací o zařízení a klíčů LoRaWAN {#read-device-info-and-lorawan-keys}

Přes NFC během několika sekund přečtete identifikační údaje zařízení STICKER
a klíče LoRaWAN, které potřebujete k jeho registraci v síti.

:::info Zařízení nejdřív uložte
Obě obrazovky používají šifrovaný kanál, takže zařízení musí být uložené se svým
**secret key**. Viz [**Saved STICKERs**](./saved-stickers.md).
:::

---

## Čtení informací o zařízení {#read-device-info}

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Device info**.
2. Přiložte telefon k zařízení STICKER a nehýbejte s ním.

<img src="/img/hw-manager/hw-manager-device-info.png" alt="Informace o zařízení přečtené přes NFC se sériovým číslem, firmwarem, časem a dobou běhu" width="320" />

| Pole | Význam |
|---|---|
| **Serial number** | Identita zařízení |
| **Firmware** | Běžící verze firmwaru |
| **Time (UTC)** | Hodiny zařízení |
| **Uptime** | Doba od posledního startu |
| **Battery** | Naměřené napájecí napětí |
| **LoRaWAN** | Stav připojení LoRaWAN |
| **DevEUI** | Identifikátor zařízení v síti LoRaWAN |
| **Health** | Souhrn stavových příznaků zařízení |
| **Active alarms** | Pravidla alarmů, která jsou právě aktivní, viz [**Pravidla alarmů**](./alarms.md) |
| **Counters** | Čítače Hallových spínačů a vstupů |
| **Last downlink** | Síla signálu (RSSI a SNR) poslední zprávy, kterou zařízení přijalo ze sítě, a jak dávno přišla |

**Advanced** rozbalí další diagnostické podrobnosti, například sestavení firmwaru
a příčinu posledního resetu. **Read again** zopakuje čtení, aniž byste museli
opustit obrazovku; stačí znovu přiložit telefon k zařízení.

---

## Čtení klíčů LoRaWAN {#read-lorawan-keys}

1. Přejděte na **STICKER → LoRaWAN → LoRaWAN keys** a zvolte **Read LoRaWAN keys**.
2. Přiložte telefon k zařízení STICKER.

<img src="/img/hw-manager/hw-manager-lrw-keys.png" alt="Klíče LoRaWAN přečtené přes NFC" width="320" />

Co se zobrazí, závisí na režimu aktivace zařízení:

| Režim | Zobrazené klíče |
|---|---|
| **OTAA** | DevEUI, JoinEUI (AppEUI), AppKey |
| **ABP** | DevEUI, DevAddr a klíče relace |

---

## Okamžité připojení k síti {#join-the-network-now}

Zařízení STICKER, které ještě není v síti, zkouší připojení podle vlastního
plánu. Chcete-li, aby to zkusilo hned, přejděte na
**STICKER → LoRaWAN → LoRaWAN join** a přiložte telefon k zařízení.

<img src="/img/hw-manager/hw-manager-sticker-lorawan.png" alt="Menu LoRaWAN zařízení STICKER s položkami LoRaWAN keys a LoRaWAN join" width="320" />
 Nic se
nesmaže a zařízení se nerestartuje. Hodí se to po registraci zařízení na
síťovém serveru, abyste nemuseli čekat na další plánovaný pokus.

Pokud má zařízení zastaralá data relace (například po přesunu do jiné sítě),
použijte místo toho **LoRaWAN reset**, viz [**Reset zařízení**](./reset.md).

---

## Načtení několika zařízení najednou {#read-several-devices-in-one-session}

Obrazovka předchozí čtení nepřepíše, ale vede si seznam. Tlačítkem **Scan next
STICKER** přidáte další zařízení, mezi načtenými zařízeními přecházíte stránkováním
a volbou **Clear all** začnete znovu. Takto rychle posbíráte klíče celé série
zařízení ještě před jejich registrací.

---

## Sdílení klíčů {#share-the-keys}

Klíče můžete sdílet jako **JSON**, **CSV**, **text** nebo **QR kód**, případně
je zkopírovat volbou **Copy JSON to clipboard**. Když je načtených více zařízení,
akce sdílení zahrnou všechna a **Share all** je vyexportuje společně.

<img src="/img/hw-manager/hw-manager-lrw-keys-share.png" alt="Sdílení klíčů LoRaWAN jako JSON, CSV, text nebo QR kód" width="320" />

Použijte je k registraci zařízení v
[**ChirpStack**](/sticker/connectivity/lorawan-chirpstack) nebo
[**The Things Stack**](/sticker/connectivity/lorawan-tts).

:::caution Export klíčů je úplný
Na rozdíl od exportu konfigurace export klíčů LoRaWAN nic neodstraňuje. AppKey
i klíče relace jsou v něm celé, aby se soubor dal použít k registraci zařízení.
Zacházejte s ním podle toho a dávejte pozor, kde QR kód zobrazujete.
:::
