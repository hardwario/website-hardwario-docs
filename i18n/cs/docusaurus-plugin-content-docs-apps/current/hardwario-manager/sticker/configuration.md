---
slug: configuration
title: Konfigurace
description: "Čtení, úprava a zápis konfigurace zařízení STICKER přes NFC v aplikaci HARDWARIO Manager: rádio, intervaly, senzory, historie, alarmy, export a import."
title_meta: "Konfigurace (HARDWARIO Manager pro STICKER)"
---

# Konfigurace zařízení STICKER {#configure-a-sticker}

Tento návod popisuje, jak přes NFC přečíst, upravit a zapsat konfiguraci
zařízení STICKER. Pokud jste aplikaci ještě nenainstalovali, začněte stránkou
[**Instalace aplikace**](../install.md).

Přejděte na **STICKER → Konfigurace**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-configuration.png" alt="Nabídka Konfigurace s položkami Načíst, Hromadný export, Hromadný zápis, Konfigurovat ze souboru a Šablony" width="320" />

| Položka | Co dělá |
|---|---|
| **Načíst** | Přečte konfiguraci zařízení, kterou pak upravíte a zapíšete zpět. Běžný postup. |
| **Hromadný export** | Načte konfigurace mnoha zařízení najednou, viz [**Načtení více zařízení**](./batch-export.md) |
| **Hromadný zápis** | Hodnoty nastavíte jednou a zapíšete je do jednoho zařízení za druhým, viz [**Hromadný zápis**](./batch-write.md) |
| **Konfigurovat ze souboru** | Načte konfiguraci, kterou jste si uložili dříve (viz níže) |
| **Šablony** | Znovu použitelné konfigurační předvolby, viz [**Šablony**](./templates.md) |

---

## Čtení a úprava {#read-and-edit}

Zvolte **Načíst** a držte telefon u zařízení STICKER, dokud se konfigurace
nepřečte. V záhlaví formuláře je zařízení, ze kterého pochází (STICKER a jeho
sériové číslo). Pak otevřete sekci, kterou chcete změnit.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-configuration-sticker.png" alt="Přečtená konfigurace: sbalené sekce Rádio, Měření a hlášení, Senzory, Historie a Alarmy, pod nimi připnuté tlačítko Uložit do zařízení" width="320" />

| Sekce | Obsah |
|---|---|
| **Rádio** | **Režim rádia**, nastavení sítě (region, podpásmo, síť), DevEUI a aktivace, klíče v podskupině **Klíče**, ADR a datová rychlost, kontrola spojení a interval ohlašování |
| **Měření a hlášení** | Intervaly vzorkování a odesílání |
| **Senzory** | Které senzory jsou zapnuté, k čemu slouží piny GPIO a volby jednotlivých senzorů |
| **Historie** | Zda se měření ukládají, které kanály a přibližně na jak dlouho uložená historie vystačí, viz [**Historie senzorů**](./sensor-history.md) |
| **Alarmy** | Práh vybité baterie, způsob odesílání alarmů, bzučák alarmu a pak pravidla alarmů, viz [**Pravidla alarmů**](./alarms.md) |

Každá sekce řadí pole v pořadí, v jakém je používá firmware, a skryje pole,
které by zařízení při daném nastavení ignorovalo. Když **Režim rádia** nastavíte
na `OFF`, ostatní nastavení rádia zmizí. V režimu `P2P` zůstane jen DevEUI,
AppKey a kontrola spojení. **Podpásmo** se zobrazí jen pro US915 a AU915
a **Datová rychlost** jen při vypnutém ADR. Skrytá hodnota ve formuláři zůstává,
takže po přepnutí zpět ji najdete na svém místě.

:::info Klíče se řídí režimem rádia a aktivací
Podskupina **Klíče** je uvnitř sekce Rádio a ve výchozím stavu je sbalená.
Zobrazuje jen klíče, které platí: JoinEUI a AppKey pro **OTAA**, DevAddr a klíče
relace pro **ABP** a v režimu **P2P** jen AppKey, bez ohledu na aktivaci. Při
vypnutém rádiu je podskupina skrytá. DevEUI najdete nad ní ve skupině
**Připojení**. Samotný režim rádia přepnete a klíče přečtete v nabídce **Rádio**,
viz [**Rádio**](./radio.md).
:::

Sekce Senzory je záměrně nad Historií: které senzory jsou zapnuté, rozhoduje
o tom, které kanály historie existují.

---

## Zápis změn {#write-the-changes}

Upravte, co potřebujete, pak klepněte na **Uložit do zařízení** a znovu
přiložte telefon k zařízení STICKER. Aplikace zápis potvrdí hlášením
**Konfigurace uložena**: zařízení se restartuje a novou konfiguraci použije.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-configuration-sticker-revert.png" alt="Přečtená konfigurace s otevřenou sekcí Rádio a rozbalenou nabídkou Více akcí: Uložit do zařízení, Použít šablonu, Uložit jako šablonu a Exportovat konfiguraci do souboru" width="320" />

Hodnotu mimo rozsah aplikace ohlásí pod názvem sekce a se zápisem počká, dokud
ji neopravíte; **Zobrazit** přejde na první takovou hodnotu.

Tlačítko v záhlaví formuláře, **Vrátit na načtené hodnoty**, vrátí celý
formulář do stavu přečteného ze zařízení. Ostatní akce najdete pod **Více akcí**
vedle tlačítka **Uložit do zařízení**:

| Akce | Význam |
|---|---|
| **Použít šablonu** | Před zápisem vyplní formulář z uložené šablony, viz [**Šablony**](./templates.md) |
| **Uložit jako šablonu** | Uloží aktuální nastavení jako šablonu pro další použití |
| **Exportovat konfiguraci do souboru** | Uloží kopii, kterou lze později načíst |

Do zařízení se nic nezapíše, dokud neklepnete na **Uložit do zařízení**.

Význam jednotlivých parametrů popisuje
[**přehled konfiguračních parametrů**](/sticker/developer-access/configuration).

:::info Export vynechává tajné údaje
**Exportovat konfiguraci do souboru** uloží JSON bez klíčů, takže konfigurační
soubor můžete bezpečně poslat kolegovi. Klíče zůstávají v zařízení a v seznamu
[**Uložená zařízení STICKER**](./saved-stickers.md).
:::

---

## Konfigurace ze souboru {#configure-from-file}

**Konfigurovat ze souboru** přijímá tři druhy souborů a s každým naloží jinak:

| Soubor | Co se stane |
|---|---|
| Export jedné konfigurace | Načte se přímo do formuláře |
| **Hromadný export** | Aplikace zobrazí výzvu **Vyberte zařízení** a vy zvolíte zařízení ze souboru |
| **Export historie změn** | Aplikace zobrazí výzvu **Vyberte okamžik** a pak obnoví konfiguraci ve stavu, v jakém byla při zvoleném čtení |

Nastavení, které soubor neobsahuje, má hodnotu **Beze změny** a zařízení si
ponechá svou vlastní. Počítadlo velikosti ukazuje, kolik zápis zabere z limitu
448 B. Tlačítko **Zapsat do zařízení** pak soubor zapíše do každého zařízení
STICKER, ke kterému telefon přiložíte, jedno po druhém, stejně jako
[**Hromadný zápis**](./batch-write.md).

---

## Použití konfigurace na více zařízeních {#reuse-a-configuration-across-devices}

Pokud chcete mnoho zařízení nastavit stejně, uložte si **šablonu** a použijte ji
přes NFC pro každé zařízení, nebo hodnoty nastavte jednou volbou **Hromadný zápis**
a přikládejte telefon k jednomu zařízení za druhým. Viz
[**Šablony**](./templates.md) a [**Hromadný zápis**](./batch-write.md).

:::danger Factory reset a vendor reset
**Factory reset** zahodí relaci a klíče LoRaWAN, takže se zařízení k síti připojí
znovu. **Vendor reset** zařízení vymaže až na sériové číslo a vendor token
a nastaví nový secret key. Vrátit to nelze. Viz
[**Reset zařízení**](./reset.md).
:::
