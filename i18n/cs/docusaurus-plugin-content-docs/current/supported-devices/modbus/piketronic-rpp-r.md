---
slug: piketronic-rpp-r
title: Radonová sonda Piketronic RPP-R
description: "Web-Site"
---

[Web-Site](https://www.piketronic.cz/)

![Piketronic RPP-R](../../../../../../chester/supported-devices/modbus/images/piketronic-rpp-r.jpg)

### Popis {#description}

Piketronic **RPP-R** je radonová sonda, která průběžně měří koncentraci radonu
spolu s teplotou a vlhkostí vzduchu uvnitř své měřicí komory. Je vybavena
rozhraním **RS-485 Modbus RTU** pro odečet naměřených hodnot. Toto zařízení
podporuje aplikace **CHESTER Serial**.

:::info

Radonová sonda je samostatný senzor. **Nevyžaduje** žádný externí senzor. Nová
hodnota koncentrace radonu je k dispozici **každé 4 minuty**; častější čtení
vrací stejnou hodnotu.

:::

---

### Modbus komunikace {#modbus-communication}

#### Příklad instalace Modbus komunikace: Piketronic RPP-R {#example-of-modbus-communication-installation-piketronic-rpp-r}

Sonda RPP-R má čtyřpinový konektor s označením **B RxTx-**, **A RxTx+**, **GND**, **VCC**.

| **Piketronic RPP-R** | **CHESTER Modbus**       |
|----------------------|------------------------|
| A RxTx+              | Pin 7 (A)              |
| B RxTx-             | Pin 6 (B)              |
| GND                  | Pin 1 (GND)            |
| VCC                  | Napájení (viz poznámka níže) |

:::info

Sonda potřebuje napájení na **VCC**. Lze ji napájet z vyhrazeného napájecího
výstupu zařízení CHESTER (VIN), **pokud** napětí a proud odpovídají požadavkům
sondy RPP-R. Nejprve ověřte napájecí napětí sondy; jinak použijte samostatný
externí zdroj. Označení linek A/B u RS-485 se mezi výrobci liší; pokud nepřijímáte
žádná data, prohoďte vodiče **A** a **B**.

:::

---

### Procházení a konfigurace {#browsing-and-configuration}

Sonda RPP-R nemá **žádný displej ani tlačítka**. Její Modbus adresa a sériové
parametry se nastavují dvěma bloky DIP přepínačů na sondě. **Po změně kteréhokoli
přepínače je nutné sondu restartovat (odpojit a znovu připojit napájení).**

#### Adresa (blok přepínačů `ADDRESS`) {#address-switch-block-address}

Hodnota od **1 do 247**. Přepínač označený `1` je nejméně významný bit; přepínač
v poloze **dolů** znamená logickou `0`.

#### Rychlost a parita (blok přepínačů `RATE`, přepínače 4-3-2-1) {#speed-and-parity-switch-block-rate-switches-4-3-2-1}

| RATE (4 3 2 1) | Přenosová rychlost | Parita | Stop bit |
|----------------|-----------|--------|----------|
| 0 0 0 0        | 19.2k     | Sudá   | 1        |
| 0 0 0 1        | 9.6k      | Sudá   | 1        |
| 0 0 1 0        | 2.4k      | Sudá   | 1        |
| 0 0 1 1        | 1.2k      | Sudá   | 1        |
| 0 1 0 0        | 19.2k     | Lichá  | 1        |
| 0 1 0 1        | 9.6k      | Lichá  | 1        |
| 0 1 1 0        | 2.4k      | Lichá  | 1        |
| 0 1 1 1        | 1.2k      | Lichá  | 1        |
| 1 0 0 0        | 19.2k     | Žádná  | 2        |
| 1 0 0 1        | 9.6k      | Žádná  | 2        |
| 1 0 1 0        | 2.4k      | Žádná  | 2        |
| 1 0 1 1        | 1.2k      | Žádná  | 2        |
| 1 1 x x        | *nepoužívat* |     |          |

---

### Výchozí konfigurace Modbus komunikace {#default-modbus-communication-configuration}

| Adresa  | Přenosová rychlost | Parita | Stop bit |
|---------|-----------|--------|----------|
| 1       | 19.2k     | Sudá   | 1        |

:::info

Tabulka výše uvádí doporučené nastavení (všechny přepínače `RATE` dolů). Vždy
nastavte zařízení CHESTER tak, aby odpovídalo přepínačům skutečně nastaveným na sondě.

:::

---

### Konfigurace Modbus komunikace pro CHESTER {#modbus-communication-configuration-for-chester}

Následujícími příkazy nakonfigurujete aplikaci CHESTER Serial přes CHESTER
Terminal. Sonda se přidává jako Modbus zařízení typu `piketronic`.

```
app config serial-mode "modbus"
app config serial-baudrate "19200"
app config serial-parity "even"
app config serial-stop-bits "1"
app config device-0 "piketronic,1"
config save
```

Hodnota `device-0` má tvar `type,address`, zde typ `piketronic` na Modbus adrese `1`.

Sondu můžete také kdykoli přečíst přímo z terminálu:

```
device piketronic sample 1
```

Vypíše se koncentrace radonu (hodinový a denní průměr), teplota, vlhkost, aktuální
nastavení a identifikace zařízení/firmwaru/sériového čísla sondy.

---

### Naměřené hodnoty {#measured-values}

Dekodér: `com.hardwario.chester.app.serial`. Hodnoty se zobrazují v poli `devices`
(`devices → data`).

| Naměřená hodnota           | Klíč / cesta                            | Jednotka |
|----------------------------|-----------------------------------------|--------|
| Koncentrace radonu (1 h)   | devices → data → radon_concentration     | Bq/m³  |
| Koncentrace radonu (1 den) | devices → data → radon_concentration_day | Bq/m³  |
| Teplota                    | devices → data → temperature             | °C     |
| Vlhkost                    | devices → data → humidity                | %      |

:::info

Koncentrace radonu je **hodinový klouzavý průměr** (aktualizovaný každé 4 minuty).
Samostatně se také uvádí **denní klouzavý průměr**.

:::

---
