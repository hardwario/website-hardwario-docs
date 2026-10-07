---
slug: sample-data
title: Vzorek dat ze senzorů
---

# Vzorek dat ze senzorů {#sample-sensor-data}

Okamžitě přečtěte všechny senzory zařízení STICKER a zobrazte jejich hodnoty.
Je to nejrychlejší způsob, jak ověřit funkci zařízení od začátku do konce.

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Tools → Sample data**.
2. Přiložte telefon k zařízení STICKER a nehýbejte s ním.
3. Aplikace přečte senzory a zobrazí aktuální hodnoty.

<img src="/img/hw-manager/hw-manager-sample.png" alt="Hodnoty senzorů přečtené přes NFC a odeslané přes LoRaWAN" width="320" />

:::info Vzorkování zároveň odešle uplink
U zařízení STICKER firmware v jednom kroku senzory přečte **a** hodnoty odešle,
takže vzniká i **uplink přes LoRaWAN**. Čtení jen přes NFC bez odeslání
neexistuje. Aplikace ukáže, jestli bylo odeslání doručeno, takže jedním
přiložením ověříte celou cestu od senzoru k síťovému serveru.
:::

Vzorkování trvá déle než většina akcí přes NFC, protože se čeká na senzory a na
rádio. Držte telefon u zařízení, dokud se výsledek neobjeví.

Hodnoty, které zařízení uložilo dříve, přečtete na stránce
[**Historie senzorů**](./sensor-history.md).
