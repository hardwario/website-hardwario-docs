---
slug: alarms
title: Pravidla alarmů
title_meta: "Pravidla alarmů (HARDWARIO Manager pro STICKER)"
---

# Nastavení pravidel alarmů {#set-up-alarm-rules}

Pravidlo alarmu sleduje jednu měřenou veličinu, a když je podmínka splněná,
přepne zařízení do stavu alarmu. Pravidla jsou uložená ve **slotech** v zařízení
(až **16**) a upravují se v **Configuration → Alarms**.

---

## Přidání pravidla {#add-a-rule}

1. Přejděte na **STICKER → Configuration**, přečtěte zařízení a otevřete **Alarms**.
2. Zvolte **New alarm**.
3. Vyberte druh pravidla, zvolte jeho zdroj a veličinu a nastavte hodnoty.
4. Potvrďte a klepněte na **Save to device**.

| Druh pravidla | Sleduje |
|---|---|
| **Threshold (analog band)** | Prahové pravidlo: měřená hodnota vstoupí do pásma nebo z něj vystoupí, například teplota překročí limit |
| **State (digital 0/1)** | Stavové pravidlo: digitální vstup přejde do daného stavu |
| **Rate (count increase)** | Četnostní pravidlo: čítač za dané období vzroste o víc, než je povoleno |

Ve volbě **Advanced** u pravidla nastavíte jeho **hysterezi**: rozpětí, o které se
hodnota musí vrátit zpět, než se alarm zruší. Díky hysterezi hodnota, která se
drží přesně na limitu, nespouští a neruší alarm pořád dokola.

Pokud nové pravidlo opakuje pravidlo, které už je v některém slotu, aplikace vás
upozorní.

---

## Úprava, přejmenování a vyprázdnění {#edit-rename-and-clear}

Existující pravidlo změníte volbou **Edit alarm**. Volbou **Rename alarm** dáte
slotu srozumitelný název a volbou **Clear** slot v zařízení vyprázdníte.

:::info Názvy alarmů zůstávají v telefonu
Srozumitelný název alarmu ukládá aplikace, do zařízení se nezapisuje. Slouží jen
k tomu, abyste se ve slotech vyznali; zařízení ho nezná a v jeho uplincích se
neobjeví.
:::

---

## Kontrola aktivních alarmů {#check-which-alarms-are-active}

V části **STICKER → Device info → Advanced** najdete **Active alarms**, tedy
alarmy, které jsou v zařízení právě aktivní. Viz
[**Informace o zařízení a klíče LoRaWAN**](./device-info.md).

---

## Použití pravidel na více zařízeních {#reuse-rules-across-devices}

Pravidla alarmů může obsahovat i **šablona**, takže stejná pravidla nastavíte
všem zařízením najednou, viz [**Šablony**](./templates.md). Pravidla lze také
sestavit v prohlížeči v
[**Generátoru šablon**](./template-generator.mdx) a bezdrátově je nastavit pomocí
[**Generátoru příkazů přes downlink**](/sticker/connectivity/downlink-commands-generator)
nebo příkazem shellu `alarm`, viz
[**Pravidla alarmů (přístup pro vývojáře)**](/sticker/developer-access/alarm-rules).
