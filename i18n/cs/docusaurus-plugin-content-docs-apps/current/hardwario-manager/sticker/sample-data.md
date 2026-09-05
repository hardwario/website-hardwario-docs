---
slug: sample-data
title: Vzorek dat ze senzorů
description: "Přečtěte právě teď každý senzor zařízení STICKER a podívejte se na hodnoty, je to"
---

# Vzorek dat ze senzorů {#sample-sensor-data}

Přečtěte právě teď každý senzor zařízení STICKER a podívejte se na hodnoty, je to
nejrychlejší test celé cesty, že zařízení funguje.

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Tools → Sample data**.
2. Přiložte telefon k zařízení STICKER a nehýbejte s ním.
3. Aplikace přečte senzory a zobrazí aktuální hodnoty.

<img src="/img/hw-manager/hw-manager-sample.png" alt="Odečet vzorku dat přes NFC s odesláním přes LoRaWAN" width="320" />

:::info Vzorkování zároveň odešle uplink
U zařízení STICKER firmware v jednom kroku senzory přečte **a** hodnoty odešle,
takže vzniká i **uplink přes LoRaWAN**. Odečet jen přes NFC neexistuje.
Aplikace hlásí, jestli bylo odeslání doručeno, takže jedno přiložení potvrdí
celou cestu od senzoru k síťovému serveru.
:::

Vzorkování trvá déle než většina akcí přes NFC, protože se čeká na senzory a na
radio. Držte telefon u zařízení, dokud se výsledek neobjeví.

Pokud chcete místo nového odečtu přečíst měření uložená v zařízení dříve,
použijte [**Historii senzorů**](./sensor-history.md).
