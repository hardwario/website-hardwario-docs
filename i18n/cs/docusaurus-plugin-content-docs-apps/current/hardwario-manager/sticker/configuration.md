---
slug: configuration
title: Konfigurace
title_meta: "Konfigurace (HARDWARIO Manager pro STICKER)"
---

# Konfigurace zařízení STICKER {#configure-a-sticker}

Tento návod popisuje, jak přes NFC přečíst, upravit a zapsat konfiguraci
zařízení STICKER. Pokud jste aplikaci ještě nenainstalovali, začněte stránkou
[**Instalace aplikace**](../install.md).

Přejděte na **STICKER → Configuration**.

<img src="/img/hw-manager/hw-manager-configuration.png" alt="Obrazovka Configuration s volbami Read configuration from the device, Scan multiple (batch export), Configure without reading a Configure from file" width="320" />

| Volba | Co dělá |
|---|---|
| **Read configuration from the device** | Přečte konfiguraci zařízení, kterou pak upravíte a zapíšete zpět. Běžný postup. |
| **Scan multiple (batch export)** | Načte konfigurace mnoha zařízení najednou, viz [**Načtení více zařízení**](./batch-export.md) |
| **Configure without reading** | Konfiguraci sestavíte sami a zapíšete do zařízení, i do vypnutého, viz [**Konfigurace vypnutého zařízení**](./offline-configuration.md) |
| **Configure from file** | Načte konfiguraci, kterou jste si uložili dříve (viz níže) |

---

## Čtení a úprava {#read-and-edit}

Zvolte **Read configuration from the device** a držte telefon u zařízení STICKER,
dokud se konfigurace nepřečte. Pak otevřete sekci, kterou chcete změnit.

<img src="/img/hw-manager/hw-manager-configuration-sticker.png" alt="Sbalené sekce konfigurace s akcemi pro uložení a export pod nimi" width="320" />

| Sekce | Obsah |
|---|---|
| **LoRaWAN** | Region, režim aktivace, EUI a klíče pro zvolený režim v podskupině **Keys** |
| **Measurement & reporting** | Intervaly vzorkování a odesílání |
| **Sensors** | Které senzory jsou zapnuté |
| **History** | Zda se měření ukládají a které kanály, viz [**Historie senzorů**](./sensor-history.md) |
| **Alarms** | Sloty pravidel alarmů, viz [**Pravidla alarmů**](./alarms.md) |

:::info Klíče se řídí režimem aktivace
Podskupina **Keys** je uvnitř sekce LoRaWAN a ve výchozím stavu je sbalená.
Zobrazuje jen klíče, které pro daný režim platí: JoinEUI a AppKey pro **OTAA**,
DevAddr a klíče relace pro **ABP**. DevEUI najdete v základním nastavení LoRaWAN
nad ní.
:::

Sekce Sensors je záměrně nad History: které senzory jsou zapnuté, rozhoduje
o tom, které kanály historie existují.

---

## Zápis změn {#write-the-changes}

Upravte, co potřebujete, pak klepněte na **Save to device** a znovu přiložte
telefon k zařízení STICKER.

<img src="/img/hw-manager/hw-manager-configuration-sticker-revert.png" alt="Úprava hodnot konfigurace s akcemi Save to device a Revert changes" width="320" />

Další akce na obrazovce:

| Akce | Význam |
|---|---|
| **Apply template** | Před zápisem vyplní formulář z uložené šablony, viz [**Šablony**](./templates.md) |
| **Revert changes** | Zahodí úpravy |
| **Revert to read values** | Vrátí jedno pole na hodnotu přečtenou ze zařízení |
| **Save as template** | Uloží aktuální nastavení jako šablonu pro další použití |
| **Export config to file** | Uloží kopii, kterou lze později načíst |

Do zařízení se nic nezapíše, dokud neklepnete na **Save to device**.

Význam jednotlivých parametrů popisuje
[**přehled konfiguračních parametrů**](/sticker/developer-access/configuration).

:::info Export vynechává tajné údaje
**Export config to file** uloží JSON bez klíčů, takže konfigurační soubor můžete
bezpečně poslat kolegovi. Klíče zůstávají v zařízení a v seznamu
[**Saved STICKERs**](./saved-stickers.md).
:::

---

## Konfigurace ze souboru {#configure-from-file}

**Configure from file** přijímá tři druhy souborů a s každým naloží jinak:

| Soubor | Co se stane |
|---|---|
| Export jedné konfigurace | Načte se přímo do formuláře |
| **Hromadný export** | Aplikace vás vyzve, abyste ze souboru **vybrali zařízení** |
| **Export historie změn** | Aplikace vás vyzve, abyste **vybrali okamžik**, a pak obnoví konfiguraci ve stavu, v jakém byla při daném čtení |

---

## Použití konfigurace na více zařízeních {#reuse-a-configuration-across-devices}

Pokud chcete mnoho zařízení nastavit stejně, uložte si **šablonu** a použijte ji
pro každé zařízení, přes NFC nebo offline u vypnutých zařízení. Viz
[**Šablony**](./templates.md).

:::danger Factory reset a vendor reset
**Factory reset** zahodí relaci a klíče LoRaWAN, takže se zařízení k síti připojí
znovu. **Vendor reset** zařízení vymaže až na sériové číslo a vendor token
a nastaví nový secret key. Vrátit to nelze. Viz
[**Reset zařízení**](./reset.md).
:::
