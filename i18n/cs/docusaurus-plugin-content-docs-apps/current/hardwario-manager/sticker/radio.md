---
slug: radio
title: Rádio
description: "V aplikaci HARDWARIO Manager přes NFC přepnete rádio zařízení STICKER mezi Vypnuto, LoRaWAN a P2P, přečtete a sdílíte jeho klíče a spustíte připojení k síti."
title_meta: "Rádio (HARDWARIO Manager pro STICKER)"
---

# Rádio {#radio}

V nabídce **STICKER → Rádio** najdete vše, co se týká rádiového spojení zařízení:

| Položka | Co dělá |
|---|---|
| **Režim rádia** | Přepne rádio mezi **LoRaWAN**, **P2P** a **Vypnuto** |
| **Klíče rádiového spojení** | Přečte DevEUI a klíče potřebné k registraci zařízení v síti a umožní je sdílet |
| **Připojení k radiové síti** | Připojí zařízení k síti hned, bez čekání na další pokus |

Všechny tři používají šifrovaný kanál, takže zařízení musí být uložené se svým
**tajným klíčem**. Viz [**Uložená zařízení STICKER**](./saved-stickers.md).

---

## Režim rádia {#radio-mode}

Zařízení STICKER používá vždy jen jedno rádio. Z výroby má rádio **vypnuté**
a nevysílá nic, dokud nezvolíte režim.

1. Přejděte na **STICKER → Rádio → Režim rádia** a zvolte **Načíst režim rádia**.
2. Přiložte telefon k zařízení STICKER. Obrazovka ukáže tři režimy, ten, ve
   kterém zařízení běží, označí jako **Aktuální** a stav spojení vypíše jako
   *Spojení: …* se [**stavy rádia**](./device-info.md#radio-states) známými
   z Informací o zařízení.
3. Klepněte na požadovaný režim, zvolte **Uložit režim rádia** a znovu
   přiložte telefon k zařízení. Tlačítko je aktivní, až když vyberete jiný než
   aktuální režim.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-radio-mode.png" alt="Obrazovka Režim rádia: úvodní text, Spojení: Znovu se připojuje, karta LoRaWAN označená jako Aktuální a zaškrtnutá, karty P2P a Vypnuto a tlačítko Uložit režim rádia" width="320" />

| Režim | Co říká aplikace |
|---|---|
| **LoRaWAN** | *Připojí se k síti LoRaWAN přes její brány.* |
| **P2P** | *Komunikuje přímo se zařízením FIBER, bez sítě LoRaWAN.* Viz [**Režim LoRa P2P**](/sticker/connectivity/lora-p2p). |
| **Vypnuto** | *Rádio mlčí. Senzory a historie běží dál.* |

Uložením se zařízení restartuje v novém režimu a aplikace to potvrdí hlášením
**Režim rádia uložen**. Pokud chcete zařízení z obrazovky režimu přečíst znovu,
použijte **Načíst režim rádia** v nabídce **Více akcí**.

Režim **P2P** aplikace nabídne, jen když ho zařízení zvládne. Jinak karta uvede
důvod:

- *Vyžaduje firmware 2.0.0 nebo novější.*
- *Vyžaduje DevEUI a AppKey, které zařízení STICKER nemá nastavené.* Režim P2P
  zařízení identifikuje podle DevEUI a spojení zabezpečuje jeho AppKey, proto
  obojí nejdřív nastavte v [**Konfiguraci**](./configuration.md).

Když zvolíte **P2P**, aplikace připomene, že frekvence a spreading factor P2P se
musí shodovat se zařízením FIBER. Výchozí hodnoty se shodují; změnit je lze jen
z příkazové řádky zařízení.

---

## Klíče rádiového spojení {#radio-link-keys}

Přečtěte klíče, které potřebujete k registraci zařízení na síťovém serveru.

1. Přejděte na **STICKER → Rádio → Klíče rádiového spojení** a zvolte
   **Načíst klíče rádiového spojení**.
2. Přiložte telefon k zařízení STICKER.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-radio-link-keys.png" alt="Obrazovka Klíče rádiového spojení pro jedno zařízení STICKER s aktivací OTAA: SN, Aktivace, DevEUI, JoinEUI a AppKey a tlačítka Sdílet, Naskenovat další STICKER a Vymazat vše" width="320" />

Karta ukazuje sériové číslo (**SN**), **Aktivaci** a klíče, které pro zařízení
platí:

| Zařízení používá | Zobrazené klíče |
|---|---|
| Aktivaci **OTAA** | DevEUI, JoinEUI, AppKey |
| Aktivaci **ABP** | DevEUI, DevAddr, NwkSKey, AppSKey |
| Režim rádia **P2P** | DevEUI, AppKey |

Firmware může některý klíč přes NFC zadržet. Klíč, který nevrátí, chybí na
obrazovce i v exportu; aplikace si nic nedomýšlí.

### Čtení více zařízení {#read-several-devices}

Obrazovka si přečtená zařízení skládá do seznamu, místo aby poslední čtení
přepsala. Tlačítkem **Naskenovat další STICKER** přidáte další zařízení a mezi
přečtenými přecházíte šipkami. **Vymazat vše** seznam vyprázdní; aplikace ho
zapomene i při zavření. Takhle rychle posbíráte klíče celé dávky zařízení před
jejich registrací.

### Sdílení klíčů {#share-the-keys}

Zvolte **Sdílet** (u více zařízení **Sdílet vše**) a vyberte formát:

| Volba | Co dostanete |
|---|---|
| **Sdílet jako JSON** | Soubor .json s úplnou konfigurací rádia a klíči |
| **Sdílet jako CSV** | Tabulku s úplnou konfigurací rádia a klíči |
| **Sdílet jako text** | Text, který vložíte přímo do zprávy nebo poznámky |

Když máte přečtených více zařízení, každá volba exportuje všechna najednou.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-radio-link-keys-share.png" alt="Nabídka sdílení klíčů rádiového spojení s volbami Sdílet jako JSON, Sdílet jako CSV a Sdílet jako text" width="320" />

Klíče pak použijte k registraci zařízení na síťovém serveru
[**ChirpStack**](/sticker/connectivity/lorawan-chirpstack) nebo
[**The Things Stack**](/sticker/connectivity/lorawan-tts).

:::caution Export klíčů je úplný
Na rozdíl od exportu konfigurace export klíčů nic nevynechává. AppKey a klíče
relace, které zařízení vrátilo, obsahuje celé, aby soubor šlo použít k registraci
zařízení. Zacházejte s ním podle toho.
:::

---

## Připojení k radiové síti {#join-radio-network}

Zařízení se k síti pokouší připojit samo podle svého plánu. **Připojení
k radiové síti** ho požádá, ať to zkusí hned.

1. Přejděte na **STICKER → Rádio → Připojení k radiové síti**.
2. Přiložte telefon k zařízení STICKER.

Aplikace potvrdí **Připojování zahájeno**. Zařízení odešle žádost o připojení,
a pokud síť neodpoví, zkouší to dál samo, takže příkaz není třeba posílat znovu.
Nic se nemaže a zařízení se nerestartuje.

Výsledek ověříte v [**Informacích o zařízení**](./device-info.md): řádek
**Rádio** ukazuje *Připojování*, dokud zařízení čeká, a *V pořádku*, jakmile ho
síť přijme.
