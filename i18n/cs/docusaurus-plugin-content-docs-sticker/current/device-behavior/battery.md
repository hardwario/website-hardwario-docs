---
slug: battery
title: Baterie a napájení
description: Jak dlouho zařízení STICKER vydrží na baterie, jak hlásí jejich stav a co se stane při slabé baterii a po výměně baterií.
---

# Baterie a napájení {#battery-and-power}

Tato stránka popisuje, jak dlouho zařízení STICKER vydrží na baterie, jak hlásí jejich stav a co se stane, když jsou baterie slabé nebo když je vyměníte.

## Výdrž baterií {#battery-life}

Zařízení STICKER vydrží **2+ roky na 2× AA**. Skutečná výdrž závisí na nastavení a na rádiových podmínkách v místě instalace. Zkracují ji:

- **Kratší interval hlášení** (`interval-report`, výchozí 15 min). Při každém hlášení se zařízení probudí a vysílá.
- **Slabé pokrytí a časté nové připojování.** Daleko od brány potřebuje každé hlášení pomalejší nastavení rádia a mnohonásobně víc energie. Zařízení bez pokrytí se k síti pořád dokola pokouší připojit.
- **Varianta s Hallovými spínači.** Oba Hallovy spínače odebírají proud nepřetržitě.

## Jak zařízení hlásí stav baterií {#how-the-battery-level-is-reported}

Zařízení měří napětí baterií při každém čtení senzorů, ve výchozím nastavení jednou za hlášení. Hodnotu najdete tady:

- **Telemetrie** (pravidelné hlášení s naměřenými hodnotami): `voltage` ve voltech. Podle této hodnoty sledujte stav baterií v čase.
- **Uplink Info** (zpráva s informacemi o zařízení): `battery` v mV.
- **Síťový server:** na vyžádání úroveň baterie od 1 (2,4 V a méně) do 254 (3,6 V a více). Hodnota 255 znamená, že úroveň není známá. Například ChirpStack ji zobrazuje jako baterii zařízení.

## Slabá baterie {#low-battery}

Když napětí klesne pod práh slabé baterie (`battery-level`, výchozí 2,4 V), zařízení zhruba do 10 s odešle alarmový report (zprávu o alarmu) a telemetrii. Ve stavu Připojeno navíc LED každé 3 s krátce blikne červeně. Tento alarm je vestavěný a nepotřebuje žádné pravidlo alarmu. Skončí, když napětí stoupne o víc než 0,3 V nad práh (ve výchozím nastavení nad 2,7 V), a zařízení to oznámí druhým alarmovým reportem. Práh můžete změnit, viz [**Alarmy**](alarms.md).

Jen při startu probíhá ještě samostatná kontrola: pod 1,8 V zařízení nenastartuje, zabliká červeně a vypne se až do výměny baterií. Viz [**Start a inicializace**](startup.md).

## Výměna baterií {#replacing-the-batteries}

S novými bateriemi zařízení nastartuje jako obvykle a znovu se připojí k síti. Zařízení v režimu LoRa P2P zůstane spárované.

- **Co zůstane:** nastavení, síťové klíče, historie senzorů a celkové stavy čítačů Hallových spínačů a vstupů. Ztratit se mohou jen poslední impulzy a záznamy historie, které zařízení ještě neuložilo.
- **Co se nastaví znovu:** hodiny. Po připojení si je zařízení seřídí podle sítě, nebo je nastavíte nástrojem **Sync time** v části [**Tools**](/apps/hardwario-manager/sticker/tools) aplikace HARDWARIO Manager. Záznamy historie z doby předtím pak dostanou správný čas.
- **Co se smaže:** aktivní alarmy, zprávy čekající na odeslání a počty pohybů ze senzoru PIR a z akcelerometru. Konec alarmů zařízení nenahlásí a alarmy, které stále platí, vyvolá znovu.

Podrobnosti najdete na stránce [**Historie a čítače**](history-and-counters.md).
