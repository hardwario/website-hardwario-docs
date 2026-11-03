---
slug: startup
title: Start a inicializace
description: Co zařízení STICKER dělá při startu, co ukazuje jeho LED a co se stane při slabé baterii, v kalibračním režimu a když start selže.
---
import LedPattern from '@site/src/components/LedPattern';

# Start a inicializace {#startup-and-initialization}

Tato stránka popisuje, co zařízení STICKER dělá při startu, co ukazuje LED a co dělat, když se start nepovede.

## Co se děje při startu {#what-happens-at-startup}

Zařízení startuje po vložení baterií a po každém restartu, například když uložíte novou konfiguraci. Zkontroluje baterii a spustí startovní sekvenci LED (jednou červená, žlutá a zelená, asi 3 s). Mezitím se rozběhnou senzory, rádio a NFC. Potom se zařízení připojí k síti podle nastaveného režimu rádia (`radio-mode`).

Nečekaná startovní sekvence znamená, že se zařízení restartovalo.

## Stavová LED {#status-led}

Pokud tabulka neuvádí jinak, LED opakuje svůj vzor každé 3 s. Většina bliknutí je kvůli úspoře energie velmi krátká, proto se dívejte pozorně.

| LED | Co znamená |
|---|---|
| <LedPattern pattern="red yellow green" /> jednou | **Start:** zařízení právě nastartovalo. |
| <LedPattern pattern="yellow red" /> | **Připojování:** zařízení se připojuje nebo znovu připojuje k síti. Pokud LED nikdy nepřejde na zelenou, zkontrolujte pokrytí branami, region a síťové klíče. |
| <LedPattern pattern="green" /> | **Připojeno:** zařízení je v síti a žádný alarm není aktivní. |
| <LedPattern pattern="yellow yellow" /> | **Slabý signál:** zařízení je připojené, ale síť přestala potvrzovat, že ho slyší. Zkusí odolnější nastavení rádia, a teprve když to nepomůže, připojí se k síti znovu. |
| <LedPattern pattern="yellow" /> | **Rádio vypnuté:** rádio je vypnuté nebo s uloženým nastavením nemůže nastartovat. Zařízení měří, ale nic neposílá. |
| <LedPattern pattern="red" /> | **Aktivní alarm**, zobrazuje se jen ve stavu Připojeno. |
| <LedPattern pattern="orange" /> každou sekundu | **Kalibrační režim**, viz níže. |
| <LedPattern pattern="green orange" /> nebo <LedPattern pattern="orange green" /> jednou | **Změna vstupu** (jen během první hodiny po startu): Hallův spínač, vstup nebo senzor pohybu sepnul (nejdřív zelená) nebo rozepnul (nejdřív oranžová). |
| <LedPattern pattern="green" /> trvale, nejvýš 5 s | **NFC:** zařízení rozpoznalo telefon. |
| <LedPattern pattern="green yellow" /> 2 s | **NFC:** přenos dat proběhl v pořádku. |
| <LedPattern pattern="red" /> 2 s | **NFC:** přenos dat se nepovedl. |

Rádio zapnete v aplikaci [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration): zvolte režim rádia a zadejte síťová nastavení. Stavy Připojování a Slabý signál podrobně popisuje stránka [**Připojení k síti**](network-connection.md).

## Slabá baterie při startu {#low-battery-at-startup}

Při každém startu zařízení nejdřív změří baterii. Pokud je napětí nižší než 1,8 V, zařízení nenastartuje:

- <LedPattern pattern="red red red" /> Po startovní sekvenci LED 5 s rychle bliká červeně, 1 s svítí červeně a pak zhasne.

Zařízení se samo vypnulo a zůstane vypnuté, i když se baterie zotaví. Chcete-li ho znovu spustit, **vyměňte baterie**. Mez 1,8 V nejde změnit. Alarm slabé baterie, který vás varuje dřív, popisuje stránka [**Baterie a napájení**](battery.md).

## Kalibrační režim {#calibration-mode}

Kalibrační režim je servisní režim pro testy ve výrobě a pro běžné používání není určený.

- **Jak se spustí:** přiložením magnetů k oběma Hallovým spínačům při startu zařízení nebo volbou **Tools → Calibration mode** v aplikaci HARDWARIO Manager.
- **Co uvidíte:** pět rychlých oranžových bliknutí, potom každou sekundu krátké oranžové bliknutí.
- **Co dělá:** každých 30 s odešle hodnoty ze senzorů, pokud režim rádia není nastavený na Vypnuto. Běžná hlášení, alarmy, historie senzorů a NFC jsou vypnuté.
- **Jak skončí:** po 120 min se zařízení restartuje do běžného provozu. Dřív režim ukončíte tak, že baterie vyjmete a znovu vložíte.

:::caution
Kalibrační režim spustí i magnety přiložené současně k oběma Hallovým spínačům během prvních 30 min po startu. Jakmile režim běží, magnety odeberte. Jinak se při dalším restartu spustí znovu.
:::

## Když se start nepovede {#when-startup-fails}

Když selže volitelná část, například senzor nebo NFC, zařízení nastartuje bez ní. Když selže nezbytná část, obvykle rádio, zařízení asi 60 s čeká se zhasnutou LED a pak se restartuje. Pokud problém trvá, startovní sekvence se opakuje zhruba jednou za minutu a zařízení nic neposílá. Takové zařízení pošlete do servisu.

Když firmware přestane reagovat, vestavěný watchdog zařízení restartuje, takže se po zaseknutí zotaví samo.
