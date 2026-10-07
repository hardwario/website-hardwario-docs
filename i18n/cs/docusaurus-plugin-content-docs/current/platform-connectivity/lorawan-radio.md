---
slug: lorawan-radio
title: Sítě LoRaWAN
---
import Image from '@theme/IdealImage';

Základní deska CHESTER-M obsahuje také rádio LoRaWAN. [Katalogové aplikace](../catalog-applications/index.md) mají osazené rádio NB-IoT/LTE-M i LoRaWAN. Na jiné rádio proto snadno přepnete pouhou změnou konfigurace.

Zařízení CHESTER používá modul **CMWX1ZZABZ-078** od firmy **Murata**. Tento modul má firmware od výrobce, který se stará o veškerou komunikaci LoRaWAN. Do modulu můžete nahrát i náš open-source firmware [lora-modem](https://github.com/hardwario/lora-modem), který je s firmwarem výrobce zpětně kompatibilní, ale přidává další funkce a podporu novější verze LoRaWAN. Firmware je [velmi dobře zdokumentovaný](https://github.com/hardwario/lora-modem/wiki/AT-Command-Interface), komunikaci přes příkazy AT ale obstarává zařízení CHESTER, takže vám stačí nastavit klíče podle návodu níže.

Standardní modul **CMWX1ZZABZ-078** od firmy **Murata** používá standard LoRaWAN 1.0.2 release B.

---

## Konfigurace režimu sítě {#network-mode-configuration}

Firmware některých katalogových aplikací umí pracovat se sítí NB-IoT/LTE i LoRaWAN. Takový firmware po zapnutí neposílá data, **LED bliká žlutě** a je nutné nastavit správný režim rádia.

Nastavení `app mode` aktuálně vyžadují tyto katalogové aplikace:

- [CHESTER Clime](/chester/catalog-applications/chester-clime)
- [CHESTER Control](/chester/catalog-applications/chester-control)
- [CHESTER Push](/chester/catalog-applications/chester-push)
- [CHESTER Current](/chester/catalog-applications/chester-current)
- [CHESTER Scale](/chester/catalog-applications/chester-scale)
- [CHESTER Meteo](/chester/catalog-applications/chester-meteo)
- [CHESTER Range](/chester/catalog-applications/chester-range)

Ve výchozím stavu zařízení **nepoužívá žádné rádio** (režim `none`) a je potřeba nastavit konfigurační parametr **mode**.

- `app config mode lte` pro síť NB-IoT/LTE
- `app config mode lrw` pro síť LoRaWAN

Poté změny uložte příkazem `config save`. Zařízení se restartuje a použije správnou síť.

---

## Brána LoRaWAN EMBER {#ember-lorawan-gateway}

Nabízíme také **bránu LoRaWAN EMBER** ([dokumentace EMBER](/ember/), [e-shop EMBER](https://www.hardwario.store/ember/)). Brána obstará komunikaci LoRaWAN se zařízením CHESTER a síťový software může běžet v našem HARDWARIO Cloud, nebo kompletně ve vaší infrastruktuře. Síť LoRaWAN je velmi flexibilní a spolehlivá, má dlouhý dosah a používáme ji ve velkých továrnách nebo na rozsáhlých otevřených plochách.

Brána EMBER používá pro správu zařízení a další integrace [CHIRPSTACK](https://www.chirpstack.io/) a [Node-RED](https://nodered.org/).

---

## Konfigurace LoRaWAN v zařízení CHESTER {#chester-lorawan-configuration}

Níže najdete příklad konfiguračních parametrů, které zařízení CHESTER podporuje. Síťové klíče a další nastavení můžete konfigurovat těmito nástroji:
- [HARDWARIO Manager](../platform-connectivity/hardwario-manager.md)
- [HARDWARIO Terminal](https://terminal.hardwario.com/) experimentální konzole BLE v prohlížeči Chrome
- J-Link s [HARDWARIO CLI Console](../developer-tools/command-line-tools.md#interactive-console)

:::tip

Ne všechny katalogové aplikace podporují přepnutí z NB-IoT/LTE-M na rádio LoRaWAN v konfiguraci. Ozvěte se nám a firmware vám připravíme přesně podle vašich potřeb.

:::

Možností konfigurace je mnoho, například autentizace **ABP** nebo **OTAA**. Kvůli co nejdelšímu dosahu lze modem nastavit i na pevnou datovou rychlost. Pro příjem zpráv přes downlink podporuje třídy **A** a **C**.

Celou aktuální konfiguraci vypíšete příkazem `lrw config show`.

```
lrw config test false
lrw config antenna int
lrw config band eu868
lrw config chmask
lrw config class a
lrw config mode otaa
lrw config nwk public
lrw config adr true
lrw config datarate 0
lrw config dutycycle true
lrw config devaddr 66445903
lrw config deveui 0000000000000000
lrw config joineui 0000000000000000
lrw config appkey 00000000000000000000000000000000
lrw config nwkskey 00000000000000000000000000000000
lrw config appskey 00000000000000000000000000000000
```

Rozdíl mezi OTAA a ABP doporučujeme nastudovat v článku [The Things Industries ABP vs OTAA](https://www.thethingsindustries.com/docs/devices/abp-vs-otaa/).

### Konfigurace OTAA {#otaa-configuration}

Klíče se vymění automaticky během procesu **Join** po spuštění zařízení CHESTER.
Tuto konfiguraci nastavíte a používáte nejsnáze.

V profilu zařízení (device profile) v **CHIRPSTACK** na záložce **JOIN (OTAA/ABP)** zapněte **Device supports OTAA**.
![Zapnutí Device supports OTAA v profilu zařízení v CHIRPSTACK](../../../../../chester/platform-connectivity/images/lorawan-chirpstack-device-profile-otaa.png)

Při vytváření zařízení v CHIRPSTACK můžete klíče automaticky vygenerovat a uložit.

Při kopírování Appkey z CHIRPSTACK klikněte na **symbol oka**, aby se klíč zobrazil, a zkopírujte ho ručně: označte klíč myší a zvolte kopírovat. Ve starších verzích CHIRPSTACK nepoužívejte tlačítko pro kopírování, nefunguje správně.

Klíč navíc obsahuje mezery, takže ho v shellu zařízení CHESTER musíte zadat v uvozovkách **"11 22 33 ... ee ff"**.

```
lrw config mode otaa
lrw config nwk public
lrw config dutycycle false

lrw config deveui <your-deveui>
lrw config appkey "<your-appkey>"

config save
```

### Konfigurace ABP {#abp-configuration}

Klíče se zadávají ručně. U pevné instalace, kde je signál zařízení na hraně, je to někdy lepší řešení.
Tuto konfiguraci používáme s vypnutým **ADR** (adaptivní datová rychlost), aby síť komunikovala pevnou rychlostí.

V profilu zařízení v CHIRPSTACK na záložce JOIN (OTAA/ABP) **vypněte** Device supports OTAA a zadejte tyto konfigurační parametry pro EU868:

- RX1 delay: `0`
- RX1 data-rate offset: `0`
- RX2 data-rate: `3`
- RX2 channel frequency (Hz): `869525000`
- Factory-preset frequencies (Hz): `868100000, 868300000, 868500000, 867100000, 867300000, 867100000, 867700000, 867900000`

Klíče si pro testování a vývoj můžete vygenerovat tímto [online generátorem](https://loratools.nl/#/keys), pro produkci použijte pro jistotu offline generátor.

Poté nakonfigurujte zařízení CHESTER:

```
lrw config mode abp
lrw config nwk public
lrw config dutycycle false

lrw config deveui <deveui>
lrw config devaddr <devaddr>
lrw config nwkskey <nwkskey>
lrw config appskey <appskey>
```


Můžete také vypnout adaptivní datovou rychlost a nastavit pevnou ([datové rychlosti EU868](https://www.thethingsnetwork.org/docs/lorawan/regional-parameters/#eu863-870-data-rates)):

```
lrw config adr false
lrw config datarate 3

config save
```

Pozor, při nižší datové rychlosti je maximální payload menší, může klesnout [až na 51 bajtů](https://www.thethingsnetwork.org/docs/lorawan/regional-parameters/#eu863-870-maximum-payload-size). Těchto 51 bajtů platí pro celý paket LoRaWAN, nejen pro užitečná data.

### Konfigurace CHIRPSTACK {#chirpstack-configuration}

Následující tabulka uvádí přehled doporučených konfiguračních parametrů pro zařízení CHESTER v prostředí ChirpStack v4.

| **Parametr** | **Hodnota** |
|----------------|-----------|
| **General → MAC version** | **LoRaWAN 1.0.4** |
| **General → Regional parameters revision** | **A** |
| **General → ADR algorithm** | **Default ADR algorithm (LoRa only)** |
| **Join (OTAA/ABP) → Device supports OTAA** | **ON** |
| **Class-B → Device supports Class-B** | **OFF** |
| **Class-C → Device supports Class-C** | **OFF** |

:::info
Pokud si nastavením **ChirpStack** nejste jistí, projděte si návod s podrobným postupem instalace a konfigurace ChirpStack v4: [**Getting Started with ChirpStack v4**](/apps/chirpstack/index#getting-started-with-chirpstack-v4)
:::

## Dekodéry a kodeky {#decoders-and-codecs}

Surová binární data (RAW) správně dekódujete jen dekodérem, který vrací hodnoty ve formátu JSON.

Dekodéry HARDWARIO fungují v CHIRPSTACK i v Node-RED. Jako příklad poslouží složka [codec](https://github.com/hardwario/chester-sdk/tree/main/applications/clime/codec) aplikace CHESTER Clime.

Obsahuje soubory:

- [cs-decoder.js](https://github.com/hardwario/chester-sdk/blob/main/applications/clime/codec/cs-decoder.js): dekodér pro CHIRPSTACK
- [nr-decoder.js](https://github.com/hardwario/chester-sdk/blob/main/applications/clime/codec/nr-decoder.js): dekodér pro Node-RED

### Dekodér pro CHIRPSTACK {#chirpstack-decoder}

Dekodér nastavíte v profilu zařízení (Device profile) na záložce **Codec**.

### Dekodér pro Node-RED {#node-red-decoder}

V Node-RED se připojujeme přímo k MQTT brokeru v CHIRPSTACK uzlem MQTT in, který má nastavený topic MQTT `application/<application-id>/device/+/event/up`.

Nahraďte `<application-id>` ID své aplikace. Ve starších verzích CHIRPSTACK je to **číslo 0..n**, v novějších verzích je to **unikátní ID**.

---

## Řešení problémů {#troubleshooting}

### Veřejná vs. privátní síť {#public-vs-private-network}

Síť LoRaWAN lze nastavit jako privátní nebo veřejnou. Neznamená to, že síť je nebo není viditelná. Znamená to pouze, že rádiové pakety používají odlišnou preambuli.

Pokud vaše síť nebo brána nevidí ani jeden paket, obvykle je to právě kvůli tomu.

Ve své bráně (MikroTik) zkontrolujte konfigurační volbu **Network** a pak nastavte zařízení CHESTER příkazem `lrw config nwk private` nebo `lrw config nwk public`.

Pak v bráně MikroTik přejděte na záložku **Traffic** a zkontrolujte, jestli tam vidíte paket **JOIN** ze svého zařízení s **Dev Addr**. Na této záložce vidíte surové zašifrované pakety ze všech zařízení v okolí.
Hodí se ale k ověření, že zařízení i brána používají stejný privátní/veřejný prefix paketů.

Pokud vidíte přicházející pakety, můžete problém dále řešit v CHIRPSTACK v části Gateways na záložce **Live LoRaWAN Frames**. Teprve když tu pakety uvidíte, přejděte do Applications a hledejte dekódované pakety; pokud tam pakety zařízení nejsou, hledejte chybu například v klíčích.

**Netmore** používá **veřejnou** síť. Chcete-li typ sítě svého zařízení nastavit na veřejnou, použijte příkaz `lrw config nwk public`.
