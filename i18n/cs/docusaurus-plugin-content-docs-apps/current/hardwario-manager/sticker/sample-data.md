---
slug: sample-data
title: Odečet dat ze senzorů
description: "Jedním přiložením přes NFC přečtete v aplikaci HARDWARIO Manager všechny senzory zařízení STICKER a hodnoty zároveň odešlete rádiem, rychlý test celé cesty."
---

# Odečet dat ze senzorů {#sample-sensor-data}

Okamžitě přečtěte všechny senzory zařízení STICKER a podívejte se na hodnoty.
Rychleji neověříte, že zařízení funguje celou cestou.

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Senzory → Odečíst data**.
2. Přiložte telefon k zařízení STICKER a nehýbejte s ním.
3. Aplikace přečte senzory a ukáže aktuální hodnoty.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-sample.png" alt="Data odečtená přes NFC: upozornění, že hodnoty byly zároveň odeslány rádiem, teplota a vlhkost, skupina Zařízení s napájecím napětím a tlačítko Odečíst znovu" width="320" />

Hodnoty jsou seskupené: nejdřív měření (teplota, vlhkost a další zapnuté
senzory), pak **Zařízení** (napájecí napětí a podobně), **Čítače** a **1-Wire**
s jedním řádkem na slot. Hodnotu hlásí jen zapnuté senzory; pokud nehlásí žádný,
obrazovka napíše *Zařízení nenahlásilo žádné hodnoty senzorů.*

:::info Odečet zároveň odešle uplink
Zařízení STICKER čte senzory **a** odesílá hodnoty v jediném kroku firmwaru,
proto obrazovka uvádí: *Naměřené hodnoty byly zároveň odeslány rádiem.* Uplink
jde přes LoRaWAN nebo P2P podle [**režimu rádia**](./radio.md), ve kterém
zařízení běží. Aplikace hlásí, že hodnoty odešly, ne že je síť přijala; to
ověříte na svém síťovém serveru.
:::

Odečet trvá déle než většina akcí přes NFC, protože čeká na senzory i na rádio.
Držte telefon u zařízení, dokud se neobjeví výsledek. **Odečíst znovu** provede
další měření.

Pokud chcete místo nového měření přečíst hodnoty, které zařízení uložilo dříve,
použijte [**Historii senzorů**](./sensor-history.md).
