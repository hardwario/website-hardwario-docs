---
slug: reset
title: Reset zařízení
---

# Reset zařízení STICKER {#reset-a-sticker}

Varianty resetu sahají od neškodného restartu až po úplné vymazání vendor
resetem. Zvolte **nejšetrnější** variantu, která problém vyřeší.

Otevřete **STICKER → Tools → Reset**, zvolte variantu a přiložte telefon
k zařízení.

| Reset | Co dělá |
|---|---|
| **Reboot device** | Restartuje zařízení; zachová všechna nastavení i data |
| **Reset counters** | Vynuluje čítače Hallových spínačů a vstupů |
| **Device reset** | Obnoví výchozí nastavení a konfiguraci (včetně pravidel alarmů), ale zachová identitu zařízení i klíče LoRaWAN, takže zařízení zůstane připojené k síti. Potom se restartuje |
| **LoRaWAN reset** | Smaže stav LoRaWAN (čítače rámců, DevNonce a aktuální relaci) a restartuje se, takže se zařízení připojí, jako by v síti nikdy nebylo. Klíče i konfigurace zůstanou. Pro nové uvedení do provozu po změně klíčů nebo při přesunu zařízení do jiné sítě |
| **Factory reset** | Obnoví výchozí nastavení a zahodí klíče i relaci LoRaWAN, takže zařízení potřebuje nové klíče, než se znovu připojí. Identita zařízení zůstane (sériové číslo, secret key, vendor-token, DevEUI a JoinEUI), takže ho aplikace dál najde. Potom se restartuje |

---

## Vendor changes {#vendor-changes}

Dvě další operace najdete v **STICKER → Tools → Vendor changes**. Ověřují se
**vendor tokenem** zařízení, ne jeho secret key, a proto jsou oddělené od resetů
výše.

<img src="/img/hw-manager/hw-manager-vendor-changes.png" alt="Vendor changes s volbami Change secret key a Vendor reset" width="320" />

| Operace | Co dělá |
|---|---|
| **Change secret key** | Nastaví na zařízení nový secret key |
| **Vendor reset** | Vymaže zařízení až na sériové číslo a vendor token: smaže konfiguraci, klíče LoRaWAN i secret key a nastaví nový secret key |

Obrazovka umí **načíst vendor token ze seznamu Saved STICKERs**: přiložením
telefonu k zařízení přečtete jeho sériové číslo a aplikace doplní token, který
k němu má uložený.
Tlačítko s kostkou vygeneruje náhodný klíč, takže si ho nemusíte vymýšlet.

Po úspěšné změně se nový secret key uloží do seznamu
[**Saved STICKERs**](./saved-stickers.md), takže zařízení můžete dál používat,
aniž byste cokoli ručně opisovali.

:::caution Change secret key zároveň resetuje konfiguraci
Současný firmware neumí změnit klíč bez resetu, takže **Change secret key**
resetuje i konfiguraci zařízení. Počítejte s tím, že ji budete muset znovu
zapsat; se [**šablonou**](./templates.md) je to otázka jednoho kroku.
:::

:::danger Nevratné operace
**Factory reset** zahodí relaci a klíče LoRaWAN, takže zařízení potřebuje nové
klíče, než se k síti znovu připojí. **Vendor reset** vymaže zařízení až na sériové číslo a vendor
token a nastaví nový secret key. Ani jednu operaci nelze vrátit. Použijte je jen
tehdy, když skutečně chcete začít z čistého stavu.
:::
