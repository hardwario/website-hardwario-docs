---
slug: alarms
title: Pravidla alarmů
description: "Až 16 pravidel alarmů zařízení STICKER v aplikaci HARDWARIO Manager: prahová, stavová a četnostní pravidla s dobou držení, nastavení alarmů a aktivní alarmy."
title_meta: "Pravidla alarmů (HARDWARIO Manager pro STICKER)"
---

# Nastavení pravidel alarmů {#set-up-alarm-rules}

Pravidlo alarmu sleduje jednu měřenou hodnotu, a když je podmínka splněná,
přepne zařízení do stavu alarmu. Zařízení pojme až **16** pravidel a upravují se
v **Konfigurace → Alarmy**. Tato sekce obsahuje i nastavení, která platí pro
všechny alarmy.

---

## Nastavení alarmů {#alarm-settings}

Nad pravidly najdete v sekci Alarmy:

| Nastavení | Co dělá |
|---|---|
| **Úroveň baterie** | Práh slabé baterie v mV (1000–3600, výchozí 2400); pod ním zařízení vyvolá alarm baterie |
| **Bzučák alarmu** | Jak bzučák při alarmu zní, od `OFF` a `ONCE` po `CONTINUOUS`. Zobrazí se jen tehdy, když piny GPIO ovládají bzučák (**Senzory → Piny GPIO**). |
| **Limit alarmů** | Nejkratší doba v sekundách mezi dvěma alarmovými zprávami (0 limit vypne) |
| **Potvrzované alarmové zprávy** | Odesílá každý alarm jako potvrzovanou zprávu: zařízení čeká na potvrzení ze sítě a až třikrát to zkusí znovu |

**Limit alarmů** a **Potvrzované alarmové zprávy** jsou při vypnutém rádiu
skryté, protože žádný alarm tehdy neodchází.

---

## Přidání pravidla {#add-a-rule}

1. Přejděte na **STICKER → Konfigurace → Načíst**, přečtěte zařízení a otevřete
   **Alarmy**.
2. Zvolte **Přidat alarm**.
3. V polích **Senzor** a **Měřená hodnota** vyberte, co se má sledovat.
   Aplikace z toho odvodí typ alarmu a zobrazí ho, například
   **Typ alarmu: práh (analogové pásmo)**.
4. Nastavte podmínku a dobu držení a klepněte na **Uložit**.
5. Klepněte na **Uložit do zařízení**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-alarm-add.png" alt="Obrazovka Nový alarm s vybranými vestavěnými senzory a teplotou, typem alarmu práh (analogové pásmo), dolní mezí 2 °C, horní mezí 8 °C, zpožděním před spuštěním 300 s a tlačítkem Uložit" width="320" />

| Typ alarmu | Podmínka | Doba držení |
|---|---|---|
| **práh (analogové pásmo)** | **Dolní mez** a **Horní mez**: alarm se spustí, když hodnota opustí pásmo | **Zpoždění před spuštěním**: jak dlouho musí hodnota zůstat mimo pásmo |
| **stav (digitální 0/1)** | **Aktivní při**: stav, který alarm spouští | **Doba potvrzení**: jak dlouho musí vstup ve stavu vydržet; pravidla pohybu mají místo ní pole **Doba klidu** |
| **rychlost (nárůst počtu)** | **Počet**: alarm se spustí, když počet v okně vzroste aspoň o tuto hodnotu | **Okno počítání**: 0 znamená jeden interval odesílání |

Doba držení může být 0 až 3600 s.

Pokud nové pravidlo opakuje pravidlo, které už je nastavené, aplikace vás
upozorní, a hodnoty, které by zařízení odmítlo, nepřijme.

:::caution Pravidlo pro vypnutý senzor se nikdy nespustí
Pokud je senzor, který pravidlo sleduje, v sekci **Senzory** vypnutý, průvodce na
to upozorní pod měřenou hodnotou a seznam pravidel označí pravidlo jako
**Neaktivní**. Pravidlo v zařízení zůstane, ale nespustí se, dokud senzor znovu
nezapnete.
:::

---

## Úprava a smazání {#edit-and-delete}

Otevřete nabídku **⋮** u pravidla a zvolte **Upravit**, nebo **Smazat**. Když je
obsazených všech 16 pravidel, před přidáním dalšího jedno smažte.

Pravidlo vytvořené pro typ senzoru 1-Wire, který jeho slot už neočekává, je
označené jako **Neaktivní** a nevyhodnocuje se. Zařízení odmítne změnu, po které
by taková pravidla zůstala, proto je nejdřív upravte nebo smažte.

---

## Kontrola aktivních alarmů {#check-which-alarms-are-active}

V části **STICKER → Informace o zařízení** najdete **Aktivní alarmy**, tedy
alarmy, které jsou v zařízení právě aktivní. Viz
[**Informace o zařízení**](./device-info.md).

---

## Použití pravidel na více zařízeních {#reuse-rules-across-devices}

Pravidla alarmů může obsahovat i **šablona**, takže stejná pravidla nastavíte
všem zařízením najednou, viz [**Šablony**](./templates.md). Bezdrátově je
nastavíte také pomocí
[**Generátoru příkazů přes downlink**](/sticker/connectivity/downlink-commands-generator)
nebo příkazem shellu `alarm`, viz
[**Pravidla alarmů (přístup pro vývojáře)**](/sticker/developer-access/alarm-rules).

:::info Pravidla z Generátoru konfiguračních šablon se do aplikace nepřenesou
[**Generátor konfiguračních šablon**](./template-generator.mdx) sestavuje pravidla alarmů ve
formátu firmwaru v1.4. Když takovou šablonu načtete do aplikace, převede ji pro
firmware v2.0.0 a tato pravidla odstraní. Nastavte je proto přímo v aplikaci.
:::
