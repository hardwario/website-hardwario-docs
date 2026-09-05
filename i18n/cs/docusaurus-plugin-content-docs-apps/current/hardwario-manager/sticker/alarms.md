---
slug: alarms
title: Pravidla alarmů
description: "Pravidlo alarmu sleduje jednu měřenou veličinu a označí zařízení jako alarmující,"
---

# Nastavení pravidel alarmů {#set-up-alarm-rules}

Pravidlo alarmu sleduje jednu měřenou veličinu a označí zařízení jako alarmující,
když podmínka platí. Pravidla žijí ve **slotech** na zařízení (až **16**) a
upravují se v **Configuration → Alarms**.

---

## Přidání pravidla {#add-a-rule}

1. Přejděte na **STICKER → Configuration**, přečtěte zařízení a otevřete **Alarms**.
2. Zvolte **New alarm**.
3. Vyberte druh pravidla, zvolte jeho zdroj a veličinu a nastavte hodnoty.
4. Potvrďte a dejte **Save to device**.

| Druh pravidla | Sleduje |
|---|---|
| **Threshold (analog band)** | Měřenou hodnotu vstupující do pásma nebo z něj vystupující, například teplotu nad limitem |
| **State (digital 0/1)** | Digitální vstup dosahující daného stavu |
| **Rate (count increase)** | Čítač rostoucí za dané období o víc, než je povoleno |

Otevřením **Advanced** u pravidla nastavíte jeho **hysterezi**: rezervu, o kterou
se hodnota musí vrátit, než alarm zmizí. Hystereze zabrání tomu, aby hodnota
sedící přesně na limitu opakovaně vyvolávala a rušila alarm.

Pokud nové pravidlo duplikuje pravidlo už obsazené v některém slotu, aplikace vás
upozorní.

---

## Úprava, přejmenování a vyprázdnění {#edit-rename-and-clear}

Existující pravidlo změníte volbou **Edit alarm**. **Rename alarm** dá slotu
přívětivé jméno a **Clear** slot na zařízení vyprázdní.

:::info Jména alarmů zůstávají v telefonu
Přívětivé jméno alarmu ukládá aplikace, do zařízení se nezapisuje. Dělá sloty
čitelné pro vás; se zařízením neputuje ani se neobjeví v jeho uplincích.
:::

---

## Kontrola aktivních alarmů {#check-which-alarms-are-active}

**STICKER → Device info → Advanced** vypisuje **Active alarms**, tedy alarmy
aktuálně vyvolané na zařízení. Viz
[**Informace o zařízení a klíče LoRaWAN**](./device-info.md).

---

## Použití pravidel na více zařízeních {#reuse-rules-across-devices}

Pravidla alarmů lze nést v **šabloně**, takže celá flotila může dostat stejná
pravidla najednou, viz [**Šablony**](./templates.md). Pravidla lze také postavit
v prohlížeči pomocí
[**generátoru šablon**](./template-generator.mdx) a nastavit na dálku pomocí
[**generátoru downlink příkazů**](/sticker/connectivity/downlink-commands-generator)
nebo shell příkazem `alarm`, viz
[**Pravidla alarmů (přístup pro vývojáře)**](/sticker/developer-access/alarm-rules).
