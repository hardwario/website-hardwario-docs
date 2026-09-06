---
slug: configuration
title: Konfigurace
description: "Tento návod provází čtením, úpravou a zápisem konfigurace zařízení STICKER přes"
title_meta: "Konfigurace (HARDWARIO Manager for STICKER)"
---

# Konfigurace zařízení STICKER {#configure-a-sticker}

Tento návod provází čtením, úpravou a zápisem konfigurace zařízení STICKER přes
NFC. Pokud jste aplikaci ještě nenainstalovali, začněte u
[**Instalace aplikace**](../install.md).

Přejděte na **STICKER → Configuration**.

<img src="/img/hw-manager/hw-manager-configuration.png" alt="Obrazovka Configuration s volbami Read configuration from the device, Scan multiple (batch export), Configure without reading a Configure from file" width="320" />

| Vstupní akce | Co dělá |
|---|---|
| **Read configuration from the device** | Přečte, co je na zařízení, pak to upravíte a zapíšete zpět. Běžná cesta. |
| **Scan multiple (batch export)** | Zachytí konfigurace mnoha zařízení v jedné session, viz [**Načtení více zařízení**](./batch-export.md) |
| **Configure without reading** | Sestaví konfiguraci a zapíše ji do zařízení, i vypnutého, viz [**Konfigurace vypnutého zařízení**](./offline-configuration.md) |
| **Configure from file** | Načte konfiguraci, kterou jste si uložili dříve (viz níž) |

---

## Čtení a úprava {#read-and-edit}

Zvolte **Read configuration from the device** a držte telefon u zařízení STICKER,
dokud se konfigurace nepřečte. Pak otevřete sekci, kterou chcete změnit.

<img src="/img/hw-manager/hw-manager-configuration-sticker.png" alt="Sbalené sekce konfigurace s akcemi pro uložení a export pod nimi" width="320" />

| Sekce | Pokrývá |
|---|---|
| **LoRaWAN** | Region, režim aktivace, EUI a. V podskupině **Keys**. Klíčový materiál pro zvolený režim |
| **Measurement & reporting** | Intervaly vzorkování a reportování |
| **Sensors** | Které senzory jsou zapnuté |
| **History** | Jestli se měření ukládají a které kanály, viz [**Historie senzorů**](./sensor-history.md) |
| **Alarms** | Sloty pravidel alarmů, viz [**Pravidla alarmů**](./alarms.md) |

:::info Klíče se řídí režimem aktivace
**Keys** je uvnitř sekce LoRaWAN a ve výchozím stavu je sbalená. Zobrazuje jen
klíče, které platí: JoinEUI a AppKey pro **OTAA**, DevAddr a klíče session pro
**ABP**. DevEUI je v základech LoRaWAN nad tím.
:::

Sensors je záměrně nad History, protože to, které senzory jsou zapnuté, určuje,
které kanály historie existují.

---

## Zápis změn {#write-the-changes}

Upravte, co potřebujete, pak klepněte na **Save to device** a znovu přiložte
telefon k zařízení STICKER.

<img src="/img/hw-manager/hw-manager-configuration-sticker-revert.png" alt="Úprava hodnot konfigurace s akcemi Save to device a Revert changes" width="320" />

Další akce na obrazovce:

| Akce | Efekt |
|---|---|
| **Apply template** | Před zápisem vyplní formulář z uložené šablony, viz [**Šablony**](./templates.md) |
| **Revert changes** | Zahodí vaše úpravy |
| **Revert to read values** | Vrátí jedno pole na hodnotu, kterou nahlásilo zařízení |
| **Save as template** | Z aktuálních nastavení udělá znovupoužitelnou šablonu |
| **Export config to file** | Uloží kopii, kterou lze později načíst |

Do zařízení se nic nezapíše, dokud neklepnete na **Save to device**.

Význam jednotlivých parametrů popisují
[**Konfigurační parametry**](/sticker/developer-access/configuration).

:::info Export vynechává tajné údaje
**Export config to file** zapíše JSON s odstraněným klíčovým materiálem, takže je
konfigurační soubor bezpečné nasdílet kolegovi. Klíče zůstávají v zařízení a ve
vašem seznamu [**Uložené STICKERy**](./saved-stickers.md).
:::

---

## Configure from file {#configure-from-file}

**Configure from file** přijímá tři druhy souborů a každému se přizpůsobí:

| Soubor | Co se stane |
|---|---|
| Export jedné konfigurace | Načte se přímo do formuláře |
| **Dávkový export** | Aplikace se zeptá, které **zařízení** ze souboru zvolit |
| **Export historie změn** | Aplikace se zeptá, který **okamžik** zvolit, a pak konfiguraci zrekonstruuje tak, jak byla při daném čtení |

---

## Použití konfigurace na více zařízeních {#reuse-a-configuration-across-devices}

Pokud chcete mnoho zařízení nastavit stejně, uložte si **šablonu** a aplikujte ji
na každé zařízení, přes NFC nebo offline na vypnutá zařízení. Viz
[**Šablony**](./templates.md).

:::danger Factory a vendor resety
**Factory reset** zahodí session a klíče LoRaWAN zařízení, takže se do sítě
připojí znovu. **Vendor reset** ho vymaže až na sériové číslo a vendor token a
nastaví nový secret key. Vzít zpět to nelze. Viz
[**Reset zařízení**](./reset.md).
:::
