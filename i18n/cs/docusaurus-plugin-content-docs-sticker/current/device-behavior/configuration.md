---
slug: configuration
title: Konfigurace
description: Jak zařízení STICKER nastavit přes NFC, downlinkem nebo v shellu, kdy se změna projeví a co s nastavením udělá reset.
---
import LedPattern from '@site/src/components/LedPattern';

# Konfigurace {#configuration}

Zařízení STICKER nemá tlačítka ani displej. Na této stránce zjistíte, jak ho nastavit, kdy se změna projeví a co s nastavením udělá reset.

## Tři způsoby konfigurace {#three-ways-to-configure}

| Způsob | Co potřebujete | Co můžete změnit |
|---|---|---|
| Aplikace [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration) přes NFC | Telefon s NFC a secret key zařízení | Všechna nastavení včetně LoRaWAN, ale ne parametry rádia pro LoRa P2P |
| [**Downlink**](downlinks.md), tedy zpráva ze síťového serveru | Funkční připojení k síti | Většinu nastavení, například intervaly, senzory a pravidla alarmů, ale žádná síťová nastavení |
| Shell | [**Sestavení debug**](firmware.md) a sonda J-Link | Všechna nastavení |

Standardně se používá NFC. V nainstalovaných zařízeních běží sestavení release, které shell nemá.

## Kdy se změna projeví {#when-a-change-takes-effect}

- **Většina nastavení** včetně síťových začne platit po uložení, při kterém se zařízení restartuje. Po restartu výsledek ukáže uplink s nastavením (zpráva s hlavními parametry).
- **Pravidla alarmů a vynulování čítačů** se projeví hned. Neuložená pravidla alarmů se při dalším restartu ztratí.

## NFC v praxi {#nfc-in-practice}

- **Baterie:** NFC funguje, jen když má zařízení funkční baterie. Jinak telefon uvidí prázdný tag.
- **Držte telefon v klidu:** nechte ho přiložený k zařízení. Celý přenos dat proběhne na jedno přiložení.
- **Časové limity:** relace skončí 3 s po posledním požadavku a trvá nejvýš 120 s.
- **Restart:** když se zařízení po přenosu dat restartuje, LED nejdřív ukáže výsledek a pak startovní sekvenci.

| LED | Význam |
|---|---|
| <LedPattern pattern="green" /> Zelená trvale, nejvýš 5 s | Zařízení rozpoznalo telefon |
| <LedPattern pattern="green yellow" /> Zelená a žlutá, 2 s | Přenos dat proběhl v pořádku. Pokud zařízení odpovědělo chybou, ukáže ji aplikace. |
| <LedPattern pattern="red" /> Červená, 2 s | Přenos dat se nepovedl, například kvůli špatnému klíči nebo proto, že se odpověď nedostala do telefonu |

## Zabezpečení {#security}

Každé zařízení STICKER má vlastní secret key. Do aplikace HARDWARIO Manager ho u každého zařízení přidáte jen jednou, viz [**Saved STICKERs**](/apps/hardwario-manager/sticker/saved-stickers). Příkazy i odpovědi jsou šifrované, takže bez klíče telefon konfiguraci nepřečte ani nezmění.

## Hlavní nastavení a výchozí hodnoty {#main-settings-and-defaults}

| Nastavení | Výchozí hodnota ve firmwaru |
|---|---|
| Režim rádia (`radio-mode`): `off`, `lorawan` nebo `p2p` | `off` |
| Region LoRaWAN (`lrw-region`) | `eu868` |
| Interval hlášení (`interval-report`, 60–86400 s) | 15 min |
| Interval měření (`interval-sample`) | `0`: senzory se přečtou těsně před každým hlášením |
| Historie senzorů (`history-enable`) | Vypnutá |
| Práh alarmu slabé baterie (`battery-level`) | 2400 mV |
| Senzor teploty a vlhkosti na desce (`cap-sht`) | Zapnutý; všechny ostatní senzory jsou vypnuté |

Než zařízení nainstalujete, zkontrolujte hodnoty v aplikaci HARDWARIO Manager. Všechny parametry a jejich rozsahy najdete na referenční stránce [**Konfigurace**](../developer-access/configuration.md).

## Reset zařízení a obnovení továrního nastavení {#device-reset-and-factory-reset}

- **Device reset** vrátí nastavení na výchozí hodnoty, ale zachová identitu zařízení, režim rádia, klíče LoRaWAN a většinu nastavení LoRaWAN.
- **Factory reset** zachová jen identitu zařízení (například sériové číslo a secret key) a identifikátory LoRaWAN DevEUI a JoinEUI. Smaže síťové klíče i ostatní síťová nastavení a vypne rádio, takže zařízení musíte nastavit znovu. Vynuluje také čítače a smaže uloženou historii.

Obě varianty najdete v aplikaci HARDWARIO Manager, viz [**Reset zařízení**](/apps/hardwario-manager/sticker/reset). Pokud síťový server po obnovení továrního nastavení odmítá žádosti zařízení o připojení, postupujte podle stránky [**Řešení problémů**](troubleshooting.md).
