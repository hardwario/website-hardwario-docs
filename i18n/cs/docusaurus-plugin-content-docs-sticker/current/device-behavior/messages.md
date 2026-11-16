---
slug: messages
title: Zprávy a časování
description: Jaké zprávy zařízení STICKER posílá po připojení k síti a za běžného provozu, jak často a jak si nastavuje hodiny.
---
import StickerTimeline from '@site/src/components/StickerTimeline';

# Zprávy a časování {#messages-and-timing}

Tato stránka ukazuje, jaké zprávy zařízení STICKER posílá, v jakém pořadí a jak často. Podle ní ověříte, jestli to, co vidíte na síťovém serveru, odpovídá očekávanému chování.

<StickerTimeline variant="messages" />

## Druhy zpráv {#message-types}

Každý uplink (zpráva ze zařízení do sítě) má číslo portu, takzvaný fPort, podle kterého poznáte, jakou zprávu nese:

| Zpráva | fPort | Co nese |
|---|---|---|
| **Telemetrie** | 2 | Pravidelně naměřené hodnoty, napětí baterie a stav alarmů |
| **Alarmový report** | 3 | Které alarmy začaly nebo skončily a kdy |
| **Uplink Info** a **uplink s nastavením** | 85 | Informace o zařízení a hlavní nastavení |
| **Odpovědi na příkazy** | 85 | Odpověď na příkaz poslaný downlinkem (zprávou do zařízení), označená pořadovým číslem příkazu (`seq`) |

Pole jednotlivých zpráv popisuje stránka [**Payload a dekodér**](payload.md).

## Po každém připojení k síti {#after-every-join}

Při každém startu i po každém novém připojení se zařízení STICKER nejdřív ohlásí a teprve potom posílá data. Pořadí je vždy stejné:

1. **uplink Info**;
2. **uplink s nastavením**;
3. případné **alarmové reporty**, které čekaly, dokud zařízení nebylo v síti;
4. první **telemetrie**.

Sled začne po náhodném zpoždění nejvýš 30 s, aby zařízení, která se restartují současně, nevysílala naráz. U aktivace ABP (bez připojování k síti) proběhne stejný sled po každém startu.

## Info a nastavení každých 24 h {#info-and-settings-every-24-h}

Zařízení STICKER opakuje uplink Info a uplink s nastavením každých 24 h (výchozí hodnota). Vaše aplikace tak má aktuální údaje, i když zařízení běží měsíce bez restartu. Další opakování přijde 21,6–24 h po předchozím, ale jen když je zařízení připojené. Periodu změníte intervalem ohlášení (`interval-announce`, 1–168 h, `0` opakování vypne).

<details>
<summary><b>Co obsahuje uplink Info a uplink s nastavením</b></summary>

| Uplink | Obsah |
|---|---|
| **Info** (dekóduje se jako `info`) | Verze firmwaru, sériové číslo, doba od startu, aktuální čas (jakmile jsou nastavené hodiny), napětí baterie, příčina posledního restartu, aktivní alarmy, stav slotů 1-Wire a po chybě firmwaru i podrobnosti pro technickou podporu HARDWARIO |
| **Nastavení** (dekóduje se jako `config_dump`) | Interval hlášení a interval měření, zda je zapnutá historie senzorů, zapnuté senzory a vstupy, zjištěný typ senzoru 1-Wire v každém slotu |

Kdykoli si je vyžádáte příkazem `get_info` nebo `get_settings`; viz [**Příkazy přes downlink**](../connectivity/downlink-commands.md).

</details>

## Pravidelná hlášení {#regular-reports}

Zařízení STICKER posílá telemetrii jednou za interval hlášení (`interval-report`, výchozí 15 min, rozsah 60 s až 24 h), který se počítá od startu. Každé zařízení k tomu přidá vlastní pevný posun nejvýš 1 min a náhodné zpoždění nejvýš 10 s, aby mnoho zařízení nevysílalo naráz.

Interval měření (`interval-sample`) určuje, jak často zařízení čte senzory, a interval hlášení, jak často hodnoty odesílá. Ve výchozím nastavení (`0`) čte senzory těsně před každým hlášením. S intervalem měření 5–3600 s reagují alarmy na každé měření, zařízení ale spotřebuje víc energie.

Když alarm začne nebo skončí, pošle zařízení STICKER alarmový report a k tomu telemetrii navíc, obojí zhruba do 10 s. Tato mimořádná hlášení neposouvají pravidelné časování a neukládají se do historie senzorů; viz [**Alarmy**](alarms.md).

## Synchronizace času {#time-synchronization}

Hodiny zařízení STICKER určují čas záznamů v historii senzorů i alarmových událostí. Čas si zařízení vyžádá od sítě po připojení a pak každých 7 dní. Krátkou žádost přibalí k běžnému uplinku, takže samostatnou zprávu s časem neuvidíte.

- Chcete-li hodiny seřídit hned, pošlete příkaz `clock_sync`. Jakmile čas dorazí, zařízení odpoví uplinkem Info.
- Přes NFC umí aplikace HARDWARIO Manager nastavit hodiny podle času v telefonu.
- Pokud síťový server na žádosti o čas neodpovídá, hodiny zůstanou nenastavené a na `clock_sync` žádná odpověď nepřijde.
- Po vyjmutí baterií se čas v hodinách ztratí. Zařízení si ho znovu vyžádá při dalším připojení k síti.

Podrobnosti najdete na stránce [**Hodiny reálného času**](../developer-access/clock.md).
