---
slug: reset
title: Reset zařízení
description: "Resety zařízení STICKER v aplikaci HARDWARIO Manager od restartu po tovární nastavení a změna tajného klíče či reset výrobce ověřený vendor-tokenem."
---

# Reset zařízení STICKER {#reset-a-sticker}

Varianty resetu sahají od neškodného restartu až po úplné vymazání resetem
výrobce. Zvolte **nejšetrnější** variantu, která problém vyřeší.

Otevřete **STICKER → Nástroje → Reset** a zvolte variantu. Aplikace popíše, co
reset udělá, a zeptá se **Opravdu odeslat?**; zvolte **Odeslat** a přiložte
telefon k zařízení.

| Reset | Co dělá |
|---|---|
| **Restartovat zařízení** | Restartuje zařízení. Všechna nastavení, klíče i uložená data zůstanou |
| **Vynulovat čítače** | Vynuluje čítače Hallových spínačů a vstupů |
| **Reset zařízení** | Vrátí nastavení a konfiguraci na výchozí hodnoty a smaže pravidla alarmů, ale zachová identitu zařízení a klíče LoRaWAN, takže zařízení zůstane připojené k síti |
| **Reset LoRaWAN** | Smaže čítače rámců LoRaWAN, DevNonce a relaci, restartuje a připojí se, jako by v síti nikdy nebylo. Klíče i konfigurace zůstanou. Hodí se po výměně klíčů nebo při přesunu zařízení do jiné sítě |
| **Tovární nastavení** | Vrátí nastavení na výchozí hodnoty, zahodí klíče a relaci LoRaWAN, smaže čítače impulzů a historii a **vypne** rádio. Identita zůstane (sériové číslo, tajný klíč, vendor-token, DevEUI a JoinEUI), takže aplikace se k zařízení dál dostane |

Po obnovení **továrního nastavení** zařízení mlčí, dokud znovu nenastavíte jeho
klíče LoRaWAN a nezapnete rádio v [**Režimu rádia**](./radio.md).

---

## Změny výrobce {#vendor-changes}

Dvě další operace najdete v nabídce **STICKER → Nástroje → Změny výrobce**.
Ověřují se **vendor-tokenem** zařízení, ne jeho tajným klíčem, a proto jsou
oddělené od resetů výše. Spustit je může jen ten, kdo vendor-token má.

<img src="/img/hw-manager/hw-manager-vendor-changes.png" alt="Změny výrobce s volbami Změnit tajný klíč a Reset výrobce" width="320" />

| Operace | Co dělá |
|---|---|
| **Změnit tajný klíč** | Nastaví na zařízení nový tajný klíč. Zároveň zařízení smaže až na sériové číslo a vendor-token |
| **Reset výrobce** | Smaže zařízení až na sériové číslo a vendor-token a nastaví nový tajný klíč |

Obě operace smažou konfiguraci, klíče a relaci LoRaWAN, DevEUI a JoinEUI, čítače
impulzů i historii. Vypnou rádio a zařízení nepůjde nárokovat, dokud se znovu
neotevře okno pro nárokování.

Tlačítko **Načíst vendor-token z Uložených zařízení STICKER** token doplní:
přiložte telefon k zařízení, aplikace přečte jeho sériové číslo a dohledá token,
který k němu má uložený. Jinak token zadejte do pole **Vendor-token (hex)**.
Tlačítko s kostkami vedle pole **Nový tajný klíč (hex)** vygeneruje náhodný klíč,
takže si ho nemusíte vymýšlet.

Po úspěšné změně se nový tajný klíč uloží do seznamu
[**Uložená zařízení STICKER**](./saved-stickers.md), takže aplikace se zařízením
dál komunikuje, aniž byste cokoli ručně opisovali.

:::caution Změnit tajný klíč zařízení zároveň smaže
Tato aplikace neumí změnit klíč tak, aby konfigurace zůstala, proto
**Změnit tajný klíč** zařízení smaže stejně jako reset výrobce. Počítejte s tím,
že potom znovu nastavíte rádio a zapíšete konfiguraci. Se
[**šablonou**](./templates.md) je konfigurace otázkou jednoho přiložení.
:::

:::danger Nevratné operace
**Tovární nastavení**, **Reset výrobce** ani **Změnit tajný klíč** nelze vrátit.
Po každé z nich zůstane rádio **vypnuté**, dokud znovu nenastavíte LoRaWAN.
Použijte je jen tehdy, když skutečně chcete začít z čistého stavu.
:::
