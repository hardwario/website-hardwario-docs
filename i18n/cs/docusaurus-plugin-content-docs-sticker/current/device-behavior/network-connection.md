---
slug: network-connection
title: Připojení k síti
description: Jak se zařízení STICKER připojuje k síti, jak pozná ztrátu rádiového spojení a jak spojení obnoví.
---
import LedPattern from '@site/src/components/LedPattern';
import StickerTimeline from '@site/src/components/StickerTimeline';

# Připojení k síti {#network-connection}

Tato stránka vysvětluje, jak se zařízení STICKER připojuje k síti a co dělá, když spojení ztratí. Přečtěte si ji, pokud se zařízení na síťovém serveru neobjeví nebo od něj přestala přicházet data.

## Režim rádia {#radio-mode}

Režim rádia (`radio-mode`) určuje, jestli a jak zařízení STICKER posílá data:

| Režim rádia | Co zařízení dělá |
|---|---|
| **Vypnuto** | Měří a vyhodnocuje alarmy, ale nic neposílá. |
| **LoRaWAN** | Posílá data přes síť LoRaWAN v regionu, který nastavíte: EU868, US915, AU915 nebo AS923. |
| **LoRa P2P** | Posílá data přímo do hubu ProXimos, bez sítě LoRaWAN. |

Režim rádia nastavíte přes NFC v aplikaci [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration). Nový režim začne platit po uložení, při kterém se zařízení restartuje. Downlink (zpráva ze sítě do zařízení) nemůže změnit režim rádia ani žádné jiné síťové nastavení.

## Připojování k síti {#joining-the-network}

U aktivace **OTAA** (bezdrátové aktivace) dostává zařízení klíče relace při připojení k síti. Připojuje se při každém startu, i když bylo těsně předtím připojené. Když síť neodpoví, zkusí to znovu asi za 1 min a pak s pauzou, která se pokaždé zdvojnásobí až na 1 h. Šetří tak baterie. Až příčinu odstraníte, restartujte zařízení a připojí se hned.

U aktivace **ABP** (aktivace personalizací) jsou klíče relace uložené v zařízení, takže se k síti připojovat nemusí.

## Stavy připojení {#connection-states}

Stav připojení ukazuje stavová LED každé 3 s:

| Stav | Stavová LED | Co znamená |
|---|---|---|
| **Připojování** | <LedPattern pattern="yellow red" /> žluté, pak červené bliknutí | Připojuje se k síti nebo čeká na další pokus |
| **Připojeno** | <LedPattern pattern="green" /> velmi krátké zelené bliknutí | Je v síti a kontroly spojení jsou úspěšné |
| **Slabý signál** | <LedPattern pattern="yellow yellow" /> dvě žlutá bliknutí | Je stále v síti, ale kontroly spojení selhávají |
| **Rádio vypnuté** | <LedPattern pattern="yellow" /> velmi krátké žluté bliknutí | Režim rádia je nastavený na Vypnuto, nebo rádio s uloženým nastavením nemůže nastartovat |

## Ztráta spojení {#when-the-link-is-lost}

Síť hlášení nepotvrzuje, a tak si zařízení STICKER spojení kontroluje samo. Každé 5. hlášení nese kontrolu spojení a síť na ni odpoví, pokud hlášení zachytila některá brána. Funkční spojení potvrdí i jakýkoli downlink.

<StickerTimeline variant="link-loss" />

**Slabý signál.** Po 3 neúspěšných kontrolách za sebou přejde zařízení do stavu Slabý signál. Od té chvíle přidává kontrolu spojení ke každému hlášení. Po každé neúspěšné kontrole sníží přenosovou rychlost (jak rychle se zpráva vysílá) o jeden stupeň a přepne na plný vysílací výkon. Nižší přenosová rychlost má větší dosah, takže zprávy často zase dorazí. Jedna úspěšná kontrola nebo jakýkoli downlink vrátí zařízení do stavu Připojeno.

**Nové připojení.** Když nepomůže ani nejnižší přenosová rychlost, zkusí se zařízení s OTAA připojit znovu asi za 1 min a pak s pauzami, které se zdvojnásobují až na 1 h. Ve výchozím nastavení to začne asi 4–5 h po ztrátě spojení. Po obnovení sítě může další pokus přijít až zhruba za 1 h. Pokud nechcete čekat, restartujte zařízení a připojí se hned.

Zařízení s ABP se znovu připojit nemůže. Zůstane ve stavu Slabý signál a dál vysílá. Jakmile síť zase funguje, data od něj začnou hned přicházet.

<details>
<summary><b>Nastavení kontrol spojení a názvy stavů</b></summary>

| Nastavení | Výchozí hodnota | Význam |
|---|---|---|
| Interval kontrol spojení (`radio-link-check-interval`) | 5 | Kontrolu spojení nese každé 5. hlášení a první hlášení po připojení k síti. Hodnota `0` kontroly spojení vypne, a tím vyřadí i stav Slabý signál a nové připojení, které po něm následuje. |
| Neúspěšné kontroly před novým připojením (`radio-link-check-fail-rejoin`) | 5 | Počet neúspěšných kontrol ve stavu Slabý signál, po kterém se zařízení s OTAA připojí znovu; připojí se ale jen tehdy, když už zároveň dosáhlo nejnižší přenosové rychlosti |
| Neúspěšné kontroly před stavem Slabý signál | 3 | Pevná hodnota |

Odpověď na příkaz `get_radio_state` (viz [**Příkazy přes downlink**](../connectivity/downlink-commands.md)) uvádí stav jako `healthy` (Připojeno), `warning` (Slabý signál), `joining` (Připojování), `reconnect` (čekání na další pokus o připojení, LED jako ve stavu Připojování) nebo `disabled` (Rádio vypnuté).

</details>

## Data, která se nepodařilo odeslat {#data-that-could-not-be-sent}

Dokud zařízení není připojené, dál měří, ale nic neposílá.

- **Naměřené hodnoty**, které nedorazily, se samy znovu neodešlou. Pokud je zapnutá historie senzorů (`history-enable`, ve výchozím nastavení vypnutá), chybějící hodnoty můžete dodatečně vyčíst; viz [**Historie a čítače**](history-and-counters.md).
- **Alarmové reporty** počkají a odejdou po dalším připojení k síti. Restart čekající reporty smaže, ale alarmy, které stále trvají, zařízení nahlásí znovu.

V pásmu EU868 může zprávu zdržet i zákonný limit vysílacího času 1 % (36 s za hodinu). Pravidelná hlášení ve výchozím intervalu zůstávají hluboko pod ním.

## LoRa P2P {#lora-p2p}

V režimu LoRa P2P posílá zařízení STICKER data přes modem HARDWARIO FIBER do hubu ProXimos, ne do sítě LoRaWAN. Stavy, signalizace LED a kontroly spojení fungují stejně jako v LoRaWAN, ale každé hlášení se potvrzuje a spárování s hubem vydrží i restart. Přenosová rychlost je pevná, takže ji zařízení ve stavu Slabý signál před novým spárováním nesnižuje. Postup nastavení najdete na stránce [**Režim LoRa P2P**](../connectivity/lora-p2p.md).
