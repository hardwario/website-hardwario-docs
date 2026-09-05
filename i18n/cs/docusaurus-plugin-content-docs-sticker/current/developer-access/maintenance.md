---
title: Údržba
description: "Příkaz settings ukládá a resetuje uloženou konfiguraci přes vývojářský shell (otevření konzole viz Nastavení firmwaru). Změna přes config se okamžitě projeví v RAM, ale do uložení se restartem ztratí."
---

# Údržba (`settings`) {#maintenance-settings}

Příkaz `settings` ukládá a resetuje uloženou konfiguraci přes vývojářský shell (otevření konzole viz [**Nastavení firmwaru**](firmware-setup.md)). Změna přes `config` se okamžitě projeví v RAM, ale do uložení se restartem ztratí.

Resety tvoří **žebříček podle závažnosti**: každá úroveň zachovává striktní podmnožinu té nad sebou a všechny restartují zařízení. Koncepční pohled (a ekvivalenty přes NFC v aplikaci HARDWARIO Manager) najdete v [**žebříčku resetů**](../features.md) na stránce s funkcemi firmwaru.

:::info Firmware v1.4.0
Žebříček resetů níže je **nový v připravovaném firmwaru STICKER v1.4.0** (#299). Ve verzi v1.3.x existuje jediný `settings reset` vedle `settings save`; v1.4.0 dělí resety na `device-reset` / `factory-reset` / `vendor-reset` a přidává `settings erase`. Původní `settings reset` se mění na **`settings device-reset`** (stejné chování).
:::

---

| Příkaz | Co dělá |
|---|---|
| `settings save` | Uloží připravené změny `config` do flash a restartuje zařízení. |
| `settings device-reset` | Vrátí konfiguraci a pravidla alarmů na výchozí hodnoty; **zachovává identitu zařízení a celé zprovoznění LoRaWAN** (zůstává zprovozněné a připojené). |
| `settings factory-reset` | Vrátí konfiguraci a pravidla alarmů na výchozí hodnoty; zachovává pouze identitu zařízení a **zahazuje session a klíče LoRaWAN**, takže se zařízení do sítě připojí znovu. |
| `settings vendor-reset <new-secret-key>` | Vymaže úložiště i historii a zprovozní zařízení znovu **jen na sériové číslo a vendor token**; ve stejném volání vyžaduje nový 32místný hexadecimální `secret_key`. Odmítnuto, pokud je politika `vendor-reset-allow` zařízení vypnutá. |
| `settings erase` | Úplné vymazání NVS **včetně identity a přihlašovacích údajů LoRaWAN**. Destruktivní a dostupné jen ze shellu. |

:::caution Destruktivní úrovně
`settings factory-reset` zahodí klíče LoRaWAN (vynutí nové připojení); `settings vendor-reset` vymaže všechno kromě sériového čísla a vendor tokenu (a nastaví nový secret key); `settings erase` vrátí jednotku do prázdného stavu bez identity. Žádnou z těchto akcí nelze vzít zpět.
:::
