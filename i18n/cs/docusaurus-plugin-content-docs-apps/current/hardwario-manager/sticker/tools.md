---
slug: tools
title: Nástroje
description: "Nástroje pro STICKER v aplikaci HARDWARIO Manager: synchronizace hodin, kalibrační režim, resety zařízení a změny výrobce."
title_meta: "Nástroje (HARDWARIO Manager pro STICKER)"
---

# Nástroje {#tools}

V nabídce **STICKER → Nástroje** jsou akce, které pracují se zařízením přímo,
ne přes jeho konfiguraci.

| Nástroj | Co dělá |
|---|---|
| **Synchronizovat čas** | Nastaví hodiny zařízení podle telefonu |
| **Režim kalibrace** | Restartuje zařízení do servisního režimu kalibrace senzorů |
| [**Reset**](./reset.md) | Restart, vynulování čítačů nebo reset zařízení, jeho relace LoRaWAN či celé konfigurace |
| [**Změny výrobce**](./reset.md#vendor-changes) | Změna tajného klíče nebo reset výrobce, ověřené vendor-tokenem zařízení |

Akce se senzory (**1-Wire senzory**, [**Odečíst data**](./sample-data.md)
a [**Historie senzorů**](./sensor-history.md)) najdete v nabídce
**STICKER → Senzory**, akce s rádiem v nabídce
[**STICKER → Rádio**](./radio.md).

---

## Synchronizovat čas {#sync-time}

Zvolte **Synchronizovat čas** a přiložte telefon k zařízení STICKER. Hodiny
zařízení se nastaví podle telefonu v čase UTC a aplikace to potvrdí hlášením
**Čas synchronizován**.

Teprve se synchronizovanými hodinami mají uložená měření absolutní časové
značky. Bez nich [**Historie senzorů**](./sensor-history.md) uvádí čas záznamů
jen relativně k okamžiku čtení a **Informace o zařízení** ukazují stavový
příznak **Čas nesynchronizován**.

---

## Režim kalibrace {#calibration-mode}

Zvolte **Režim kalibrace**, potvrďte a přiložte telefon k zařízení STICKER.
Zařízení se restartuje do servisního režimu kalibrace senzorů: přes LoRaWAN
posílá živé hodnoty senzorů a běžné odesílání pozastaví až asi na 2 hodiny.
Při dalším startu režim samo ukončí.

Jde o servisní akci pro kalibraci senzoru podle reference.

---

## Nástroje pro ladění {#debug-tools}

Pokud je zapnutý [**režim ladění**](../settings.md#debug-mode), obsahuje
nabídka Nástroje navíc **Nástroje pro ladění**. Slouží k diagnostice a opravám,
pro běžnou konfiguraci je nepotřebujete:

| Nástroj | Co dělá |
|---|---|
| **Zrušit nárok** | Uvolní zařízení, ke kterému přiložíte telefon, aby si ho mohl nárokovat někdo jiný, stejně jako **Zrušit nárok** v seznamu [**Uložená zařízení STICKER**](./saved-stickers.md) |
| **Zapsat kód pro nárokování** | Zapíše kód pro nárokování zpět do zařízení, jehož kód byl nahrazen |
| **NFC konzole** | Nízkoúrovňová konzole pro surové příkazy NFC |
