---
slug: reset
title: Reset zařízení
description: "Možnosti resetu sahají od neškodného restartu po úplné vymazání vendor resetem."
---

# Reset zařízení STICKER {#reset-a-sticker}

Možnosti resetu sahají od neškodného restartu po úplné vymazání vendor resetem.
Vyberte **nejméně destruktivní** variantu, která váš problém vyřeší.

Otevřete **STICKER → Tools → Reset**, zvolte variantu a přiložte telefon
k zařízení.

| Reset | Co dělá |
|---|---|
| **Reboot device** | Restartuje zařízení; zachová všechna nastavení i data |
| **Reset counters** | Vynuluje čítače Hallových kontaktů a vstupů |
| **Device reset** | Vrátí nastavení, ale zachová spojení LoRaWAN. Zařízení zůstává zprovozněné |
| **Factory reset** | Vrátí nastavení a zahodí session i klíče LoRaWAN, takže se zařízení do sítě připojí znovu. Identitu zařízení zachová |

---

## Vendor changes {#vendor-changes}

Dvě další operace jsou v **STICKER → Tools → Vendor changes**. Autentizují se
**vendor tokenem** zařízení, ne jeho secret key, a proto jsou držené odděleně od
žebříčku resetů výše.

<img src="/img/hw-manager/hw-manager-vendor-changes.png" alt="Vendor changes s volbami Change secret key a Vendor reset" width="320" />

| Operace | Co dělá |
|---|---|
| **Change secret key** | Nastaví na zařízení nový secret key |
| **Vendor reset** | Vymaže zařízení až na sériové číslo a vendor token. Konfigurace, klíče LoRaWAN i secret key se smažou, a nastaví nový secret key |

Obrazovka umí **načíst vendor token z Saved STICKERs**: klepnutím na zařízení
přečtete jeho sériové číslo a aplikace doplní token, který k němu má uložený.
Tlačítko s kostkou vygeneruje náhodný klíč, takže si ho nemusíte vymýšlet.

Po úspěchu se nový secret key uloží zpět do vašeho seznamu
[**Uložené STICKERy**](./saved-stickers.md), takže zařízení funguje dál, aniž
byste cokoli ručně přepisovali.

:::caution Change secret key zároveň resetuje konfiguraci
Současný firmware neumí překlíčování na místě, takže **Change secret key**
resetuje i konfiguraci zařízení. Počítejte s tím, že ji budete muset znovu
aplikovat. Se [**šablonou**](./templates.md) je to na jedno klepnutí.
:::

:::danger Bez možnosti vzít zpět
**Factory reset** zahodí session a klíče LoRaWAN, takže se zařízení do sítě
připojí znovu. **Vendor reset** vymaže zařízení až na sériové číslo a vendor
token a nastaví nový secret key. Ani jedno nelze vzít zpět. Použijte je jen
tehdy, když skutečně chcete začít z čistého stavu.
:::
