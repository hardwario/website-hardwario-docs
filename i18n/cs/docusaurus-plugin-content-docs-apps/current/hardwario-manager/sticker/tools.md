---
slug: tools
title: Nástroje
title_meta: "Nástroje (HARDWARIO Manager pro STICKER)"
---

# Nástroje {#tools}

**STICKER → Tools** sdružuje servisní akce, které pracují se zařízením přímo, ne
přes jeho konfiguraci.

| Nástroj | Co dělá |
|---|---|
| **Sync time** | Nastaví hodiny zařízení podle telefonu |
| **Calibration mode** | Restartuje zařízení do servisního režimu kalibrace senzorů |
| [**Reset**](./reset.md) | Resety od prostého restartu až po factory reset |
| **Vendor changes** | Změní secret key nebo provede vendor reset, viz [**Reset zařízení**](./reset.md) |
| **Debug tools** | Servisní a opravné nástroje, zobrazené jen v ladicím režimu (viz níže) |

Nástroje pro senzory a síť mají na obrazovce STICKER vlastní menu:

| Menu | Co obsahuje |
|---|---|
| **Sensors** | [**Senzory 1-Wire**](./one-wire-sensors.md), [**Vzorek dat**](./sample-data.md), [**Historie senzorů**](./sensor-history.md) |
| **LoRaWAN** | **LoRaWAN keys** a **LoRaWAN join**, viz [**Informace o zařízení a klíče LoRaWAN**](./device-info.md) |

<img src="/img/hw-manager/hw-manager-sticker-tools.png" alt="Menu Tools zařízení STICKER s položkami Sync time, Calibration mode, Reset a Vendor changes" width="320" />
<img src="/img/hw-manager/hw-manager-sticker-sensors.png" alt="Menu Sensors zařízení STICKER s položkami 1-Wire sensors, Sample data a Sensor history" width="320" />

---

## Sync time {#sync-time}

Zvolte **Sync time** a přiložte telefon k zařízení STICKER. Hodiny zařízení se
nastaví podle telefonu, v čase UTC.

Teprve se synchronizovanými hodinami mají uložená měření absolutní časové
značky. Bez nich [**Historie senzorů**](./sensor-history.md) uvádí čas záznamů
jen relativně k okamžiku čtení.

---

## Calibration mode {#calibration-mode}

Zvolte **Calibration mode** a přiložte telefon k zařízení STICKER. Zařízení se
restartuje do servisního režimu kalibrace senzorů: posílá přes LoRaWAN aktuální
hodnoty ze senzorů a běžné hlášení pozastaví nejvýše asi na dvě hodiny. Režim
skončí dalším restartem zařízení.

Jde o servisní akci pro kalibraci senzoru podle reference.

---

## Debug tools {#debug-tools}

Při zapnutém [**ladicím režimu**](../settings.md#debug-mode) (**Debug mode**)
obsahuje nabídka Tools navíc **Debug tools**: servisní a opravné nástroje, které
do běžné práce nepatří.

| Nástroj | Co dělá |
|---|---|
| **Unclaim** | Předá zařízení, které držíte, někomu dalšímu, viz [**Předání zařízení**](./saved-stickers.md#hand-a-device-on) |
| **Write claim code** | Zapíše kód pro nárokování do zařízení, jehož kód byl v ATELOSu nahrazen, aby šlo zařízení znovu nárokovat přiložením. Nový kód vystavte v ATELOSu, vložte ho sem a přiložte telefon k zařízení. |
| **NFC Console** | Nízkoúrovňová konzole pro surové příkazy NFC určená k diagnostice |
