---
title: Údržba
---

# Údržba (`settings`) {#maintenance-settings}

Příkazem `settings` ve vývojářském shellu konfiguraci uložíte nebo resetujete (otevření konzole popisuje stránka [**Nastavení firmwaru**](firmware-setup.md)). Změna přes `config` se okamžitě projeví v RAM, ale pokud ji neuložíte, restartem se ztratí.

Resety tvoří **žebříček podle závažnosti**: každá úroveň zachovává jen část toho, co zachovává úroveň nad ní, a po každém resetu se zařízení restartuje. Celkový přehled (a odpovídající akce přes NFC v aplikaci HARDWARIO Manager) najdete v části [**Žebříček resetů**](../features.md) na stránce s funkcemi firmwaru.

:::info Firmware v1.4.0
Žebříček resetů níže **přinesl firmware STICKER v1.4.0** (#299). Verze v1.3.x má vedle `settings save` jen jediný `settings reset`; v1.4.0 dělí resety na `device-reset` / `factory-reset` / `vendor-reset` a přidává `settings erase`. Původní `settings reset` se mění na **`settings device-reset`** (se stejným chováním).
:::

---

| Příkaz | Co dělá |
|---|---|
| `settings save` | Uloží připravené změny `config` do flash paměti a restartuje zařízení. |
| `settings device-reset` | Vrátí konfiguraci a pravidla alarmů na výchozí hodnoty; **zachovává identitu zařízení a celé zprovoznění LoRaWAN** (zůstává zprovozněné a připojené). |
| `settings factory-reset` | Vrátí konfiguraci a pravidla alarmů na výchozí hodnoty; zachovává pouze identitu zařízení a **zahazuje relaci a klíče LoRaWAN**, takže se zařízení k síti připojí znovu. |
| `settings vendor-reset <new-secret-key>` | Vymaže úložiště i historii a ponechá zařízení **jen sériové číslo a vendor token**; ve stejném volání vyžaduje nový 32místný hexadecimální `secret_key`. Zařízení příkaz odmítne, pokud má vypnutou politiku `vendor-reset-allow`. |
| `settings erase` | Úplné vymazání NVS **včetně identity a přístupových údajů LoRaWAN**. Nevratné a dostupné jen ze shellu. |

:::caution Nevratné úrovně
`settings factory-reset` zahodí klíče LoRaWAN (vynutí nové připojení); `settings vendor-reset` vymaže všechno kromě sériového čísla a vendor tokenu (a nastaví nový secret key); `settings erase` vrátí zařízení do prázdného stavu bez identity. Žádnou z těchto akcí nelze vzít zpět.
:::
