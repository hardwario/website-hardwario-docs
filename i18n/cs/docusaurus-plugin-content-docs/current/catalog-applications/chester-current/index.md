---
title: CHESTER Current
description: "CHESTER Current je katalogová aplikace pro neinvazivní měření střídavého a stejnosměrného proudu: co měří, jaký má hardware, sondy, varianty a firmware."
---

# CHESTER Current {#chester-current}

![CHESTER Current se dvěma klešťovými proudovými sondami](/img/chester/catalog-applications/chester-current.webp)

Zařízení **CHESTER Current** měří střídavý i stejnosměrný proud bez rozpojení obvodu: k modulu **CHESTER-K1** se připojují až čtyři klešťové proudové sondy. Výsledky odesílá do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

:::info Firmware

Konfigurační parametry, kalibraci kanálů, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER Current](../../firmware/chester-current/index.md)**.

:::

## Co umí {#what-it-can-do}

- Měří střídavý i stejnosměrný proud až na čtyřech kanálech klešťovými proudovými sondami.
- Na kanálech v režimu single-ended měří napětí; proudových a napěťových kanálů je dohromady nejvýše čtyři.
- Běží na baterii: sondy dostávají napájení jen během měření.
- Dvoubodovou kalibrací každého kanálu převádí hodnoty na ampéry nebo jiné jednotky.
- Čte několik teplotních sond **DS18B20** 1-Wire.
- Sbírá hodnoty z bluetoothových senzorových tagů.
- Při výpadku externího napájení běží dál na záložním modulu **CHESTER-Z1** a změnu napájení nahlásí (varianta **CHESTER Current Z**).

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-K1-1C-2C-3C-4C`: 4x diferenciální vstup + 5 V boost
* `CHESTER-E2-LP`: Krabička s pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

## Princip měření {#measurement-principle}

Aplikace je určená hlavně k neinvazivnímu měření proudu pomocí takzvaného **DC Current „Transformer“** (DCCT). Měří střídavý i stejnosměrný proud až na 4 kanálech. Proudové sondy jsou kleště, které se nasadí na měřený vodič a převádějí magnetický tok (úměrný elektrickému proudu) na diferenciální výstupní napětí.

:::tip

Proudové sondy potřebují během měřicího cyklu napájení 5 V, které vyrábí zvyšující měnič (boost) na modulu **CHESTER-K1**. Měnič i napájecí větve jednotlivých kanálů řídí software, takže zařízení **CHESTER Current** může běžet na baterii jako zařízení s nízkou spotřebou. Na výdrž baterie má zásadní vliv interval měření.

:::

Kromě proudu může zařízení na přání měřit i napětí, a to až na 4 kanálech (v režimu single-ended). Měření proudu a napětí lze kombinovat, celkový počet kanálů ale nikdy nepřesáhne 4.

## Proudové sondy {#current-probes}

Vybrat si můžete až 4 proudové sondy s těmito rozsahy:

- Maximální proud **10 A**
- Maximální proud **100 A**
- Maximální proud **300 A**
- Maximální proud **1 000 A**
- Maximální proud **1 500 A**

:::caution

Proudový rozsah je uveden pro stejnosměrný proud. Při návrhu systému pro střídavý proud vynásobte maximální očekávaný střídavý proud koeficientem `1.42` (druhá odmocnina ze dvou) a ověřte, že výsledek nepřekročí rozsah sondy.

:::

## Zapojení {#wiring}

Schéma zapojení zařízení **CHESTER Current** najdete v [**popisu svorkovnice**](../../extension-modules/chester-k1.md) rozšiřujícího modulu **CHESTER-K1**. Modul **CHESTER-K1** zabírá oba sloty **A** i **B**, takže používáte svorky **A1** až **A8** a **B1** až **B8**.

## Varianty {#variants}

| Varianta | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Current Z**](chester-current-z.md) | Záložní modul CHESTER-Z1 | [CHESTER Current Z](../../firmware/chester-current/chester-current-z.md) |
| [**CHESTER Current 1W**](chester-current-1w.md) | Teplotní sondy DS18B20 1-Wire | [CHESTER Current](../../firmware/chester-current/index.md) |

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
