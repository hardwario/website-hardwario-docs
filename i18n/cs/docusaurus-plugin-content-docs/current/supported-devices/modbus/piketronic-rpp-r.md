---
slug: piketronic-rpp-r
title: Radonová sonda Piketronic RPP-R
---

[Webové stránky](https://www.piketronic.cz/)

![Piketronic RPP-R](../../../../../../chester/supported-devices/modbus/images/piketronic-rpp-r.jpg)

### Popis {#description}

Piketronic **RPP-R** je radonová sonda, která průběžně měří koncentraci radonu
a také teplotu a vlhkost vzduchu ve své měřicí komoře. Naměřené hodnoty se
z ní čtou přes rozhraní **RS-485 Modbus RTU**. Sondu podporuje aplikace
**CHESTER Serial**.

:::info

Radonová sonda je samostatný senzor a **nepotřebuje** žádný další externí senzor.
Nová hodnota koncentrace radonu je k dispozici **každé 4 minuty**; při častějším
čtení dostanete stejnou hodnotu.

:::

---

### Komunikace Modbus {#modbus-communication}

#### Příklad zapojení komunikace Modbus: sonda Piketronic RPP-R {#example-of-modbus-communication-installation-piketronic-rpp-r}

Sonda RPP-R má čtyřpinový konektor s vývody **B RxTx-**, **A RxTx+**, **GND** a **VCC**.

| **Piketronic RPP-R** | **CHESTER Modbus**       |
|----------------------|------------------------|
| A RxTx+              | Pin 7 (A)              |
| B RxTx-             | Pin 6 (B)              |
| GND                  | Pin 1 (GND)            |
| VCC                  | Napájení (viz poznámka níže) |

:::info

Sonda potřebuje napájení na svorce **VCC**. Lze ji napájet z vyhrazeného napájecího
výstupu zařízení CHESTER (VIN), **pokud** napětí a proud odpovídají požadavkům
sondy RPP-R. Nejprve si ověřte napájecí napětí sondy; pokud nevyhovuje, použijte
samostatný externí zdroj. Výrobci značí linky A/B sběrnice RS-485 různě; pokud
nepřicházejí žádná data, prohoďte vodiče **A** a **B**.

:::

---

### Ovládání a konfigurace {#browsing-and-configuration}

Sonda RPP-R nemá **žádný displej ani tlačítka**. Adresa Modbus a parametry sériové
linky se nastavují dvěma bloky DIP přepínačů na sondě. **Po změně kteréhokoli
přepínače sondu restartujte (odpojte a znovu připojte napájení).**

#### Adresa (blok přepínačů `ADDRESS`) {#address-switch-block-address}

Hodnota od **1 do 247**. Přepínač označený `1` odpovídá nejnižšímu bitu; přepínač
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

### Výchozí konfigurace komunikace Modbus {#default-modbus-communication-configuration}

| Adresa  | Přenosová rychlost | Parita | Stop bit |
|---------|-----------|--------|----------|
| 1       | 19.2k     | Sudá   | 1        |

:::info

V tabulce je doporučené nastavení (všechny přepínače `RATE` dolů). Zařízení CHESTER
vždy nastavte podle toho, jak jsou přepínače na sondě skutečně nastavené.

:::

---

### Konfigurace komunikace Modbus v zařízení CHESTER {#modbus-communication-configuration-for-chester}

Aplikaci CHESTER Serial nastavíte v terminálu CHESTER těmito příkazy. Sonda se
přidá jako zařízení Modbus typu `piketronic`.

```
app config serial-mode "modbus"
app config serial-baudrate "19200"
app config serial-parity "even"
app config serial-stop-bits "1"
app config device-0 "piketronic,1"
config save
```

Hodnota `device-0` má tvar `type,address`, zde typ `piketronic` s adresou Modbus `1`.

Hodnoty ze sondy můžete kdykoli přečíst i přímo v terminálu:

```
device piketronic sample 1
```

Příkaz vypíše koncentraci radonu (hodinový a denní průměr), teplotu, vlhkost,
aktuální nastavení a identifikaci sondy (zařízení, firmware, sériové číslo).

---

### Měřené hodnoty {#measured-values}

Dekodér: `com.hardwario.chester.app.serial`. Hodnoty se zobrazují v poli `devices`
(`devices → data`).

| Měřená hodnota             | Klíč / cesta                            | Jednotka |
|----------------------------|-----------------------------------------|--------|
| Koncentrace radonu (1 h)   | devices → data → radon_concentration     | Bq/m³  |
| Koncentrace radonu (1 den) | devices → data → radon_concentration_day | Bq/m³  |
| Teplota                    | devices → data → temperature             | °C     |
| Vlhkost                    | devices → data → humidity                | %      |

:::info

Koncentrace radonu se udává jako **hodinový klouzavý průměr** (aktualizuje se každé
4 minuty). Zvlášť se odesílá i **denní klouzavý průměr**.

:::

---
