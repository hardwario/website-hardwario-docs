---
title: Údržba
---

# Údržba (`settings`) {#maintenance-settings}

Příkazem `settings` ve vývojářském shellu konfiguraci uložíte nebo resetujete (otevření konzole popisuje stránka [**Nastavení firmwaru**](firmware-setup.md)). Změna přes `config` se okamžitě projeví v RAM, ale pokud ji neuložíte, restartem se ztratí.

Resety tvoří **žebříček podle závažnosti**: každá úroveň zachovává jen část toho, co zachovává úroveň nad ní, a po každém resetu se zařízení restartuje. Celkový přehled (a odpovídající akce přes NFC v aplikaci HARDWARIO Manager) najdete v části [**Žebříček resetů**](../features.md) na stránce s funkcemi firmwaru.

:::info Firmware v2.0.0
Žebříček resetů přinesl firmware v1.4.0. Ve **firmwaru STICKER v2.0.0** maže `settings factory-reset` navíc čítače impulzů a historii a tovární reset i vendor reset ruší také spárování P2P. `settings vendor-reset` smaže claim token a zavře claim okno; vlastník ho pak znovu otevře z aplikace.
:::

---

| Příkaz | Co dělá |
|---|---|
| `settings save` | Uloží připravené změny `config` do flash paměti a restartuje zařízení. |
| `settings device-reset` | Vrátí konfiguraci a pravidla alarmů na výchozí hodnoty; **zachovává identitu zařízení, celé zprovoznění LoRaWAN, čítače impulzů i historii** (zůstává zprovozněné a připojené). |
| `settings factory-reset` | Vrátí konfiguraci a pravidla alarmů na výchozí hodnoty včetně nastavení rádia a `radio-mode`; zachovává identitu zařízení, DevEUI a JoinEUI. **Zahazuje relaci a klíče rádia** (stav LoRaMac a spárování P2P), takže se zařízení připojí znovu, a **maže čítače impulzů a historii**. |
| `settings vendor-reset <new-secret-key>` | Vymaže úložiště i historii a ponechá zařízení **jen sériové číslo a vendor token**: smaže claim token, DevEUI a JoinEUI a zavře claim okno. Ve stejném volání vyžaduje nový 32místný hexadecimální `secret_key`. Zařízení příkaz odmítne, pokud má vypnutou politiku `vendor-reset-allow`. |
| `settings erase` | Úplné vymazání NVS **včetně identity a přístupových údajů LoRaWAN**. Nevratné a dostupné jen ze shellu. |

## Úrovně resetu podrobně {#reset-tiers-in-detail}

| | `device-reset` | `factory-reset` | `vendor-reset` | `settings erase` |
|---|---|---|---|---|
| Dostupný přes | NFC, shell | NFC, shell | kanál NFC výrobce, shell | shell |
| Sériové číslo, čítač nonce, vendor token | zachová | zachová | zachová | smaže |
| Secret key | zachová | zachová | nahradí (z příkazu) | smaže |
| Claim token | zachová | zachová | smaže | smaže |
| Claim okno | zachová | zachová | → `done` | → `active` |
| `vendor-reset-allow` | zachová | zachová | výchozí | výchozí |
| DevEUI, JoinEUI | zachová | zachová | smaže | smaže |
| Ostatní nastavení a klíče rádia, `radio-mode` | zachová | výchozí | výchozí | výchozí |
| Zbytek konfigurace, pravidla alarmů | výchozí | výchozí | výchozí | výchozí |
| Čítače impulzů, historie | zachová | smaže | smaže | smaže čítače |
| Stav LoRaMac (DevNonce, čítače rámců), spárování P2P | zachová | smaže | smaže | — |

:::caution Nevratné úrovně
`settings factory-reset` zahodí klíče rádia (vynutí nové připojení) a smaže čítače i historii; `settings vendor-reset` vymaže všechno kromě sériového čísla a vendor tokenu (a nastaví nový secret key); `settings erase` vrátí zařízení do prázdného stavu bez identity. Žádnou z těchto akcí nelze vzít zpět.
:::
