---
slug: lorawan-radio
title: Sítě LoRaWAN
description: "Základní deska CHESTER-M obsahuje také LoRaWAN radio. Katalogové aplikace mají osazené jak NB-IoT/LTE-M, tak LoRaWAN radio. Díky tomu můžete snadno přepnout na jiné radio pouze softwarovou rekonfigurací."
---
import Image from '@theme/IdealImage';

Základní deska CHESTER-M obsahuje také LoRaWAN radio. [Katalogové aplikace](../catalog-applications/index.md) mají osazené jak NB-IoT/LTE-M, tak LoRaWAN radio. Díky tomu můžete snadno přepnout na jiné radio pouze softwarovou rekonfigurací.

Zařízení CHESTER používá modul **CMWX1ZZABZ-078** od firmy **Murata**. Tento modul má firmware od výrobce, který se stará o veškerou komunikaci LoRaWAN. Je také možné nahrát náš vlastní open-source firmware [lora-modem](https://github.com/hardwario/lora-modem), který je zpětně kompatibilní s firmwarem výrobce, ale navíc přidává další funkce a podporu vyšší verze LoRaWAN. Je také [velmi dobře zdokumentovaný](https://github.com/hardwario/lora-modem/wiki/AT-Command-Interface), nicméně tuto AT komunikaci obstarává zařízení CHESTER, takže vše, co potřebujete, je nastavit klíče, jak je vysvětleno níže.

Standardní modul **CMWX1ZZABZ-078** od firmy **Murata** používá standard LoRaWAN 1.0.2 release B.

---

## Konfigurace režimu sítě {#network-mode-configuration}

Některé katalogové firmwary umožňují nakonfigurovat použití sítě NB-IoT/LTE nebo LoRaWAN. Tento firmware po zapnutí neposílá data, **LED bliká žlutě** a je nutné nakonfigurovat správný režim radia.

Tato konfigurace `app mode` je aktuálně potřebná pro tyto katalogové aplikace:

- [CHESTER Clime](https://docs.hardwario.com/chester/catalog-applications/chester-clime)
- [CHESTER Control](https://docs.hardwario.com/chester/catalog-applications/chester-control)
- [CHESTER Push](https://docs.hardwario.com/chester/catalog-applications/chester-push)
- [CHESTER Current](https://docs.hardwario.com/chester/catalog-applications/chester-current)
- [CHESTER Scale](https://docs.hardwario.com/chester/catalog-applications/chester-scale)
- [CHESTER Meteo](https://docs.hardwario.com/chester/catalog-applications/chester-meteo)
- [CHESTER Range](https://docs.hardwario.com/chester/catalog-applications/chester-range)

Výchozí funkčnost je taková, že zařízení **nepoužívá žádné radio** (režim `none`) a je potřeba nastavit konfigurační parametr **mode**.

- `app config mode lte` pro síť NB-IoT/LTE
- `app config mode lrw` pro síť LoRaWAN

Poté změny uložte příkazem `config save`. Zařízení se restartuje a použije správnou síť.

---

## LoRaWAN brána EMBER {#ember-lorawan-gateway}

Nabízíme také **LoRaWAN bránu EMBER** ([dokumentace EMBER](../../ember), [EMBER e-shop](https://www.hardwario.store/ember/)). Tato brána umí zajistit komunikaci LoRaWAN se zařízením CHESTER a síťový software může běžet v našem HARDWARIO Cloud, nebo kompletně ve vaší infrastruktuře. Síť LoRaWAN je velmi flexibilní, spolehlivá, s dlouhým dosahem a používáme ji ve velkých fabrikách nebo na rozsáhlých otevřených plochách.

Zařízení EMBER používá pro správu zařízení a další integrace [CHIRPSTACK](https://www.chirpstack.io/) a [Node-RED](https://nodered.org/).

---

## Konfigurace LoRaWAN v zařízení CHESTER {#chester-lorawan-configuration}

Zde je příklad konfiguračních parametrů, které zařízení CHESTER podporuje. Ke konfiguraci síťových klíčů a nastavení můžete použít tyto nástroje:
- [HARDWARIO Manager](../platform-connectivity/hardwario-manager.md)
- [HARDWARIO Terminal](https://terminal.hardwario.com/) experimentální BLE konzole v prohlížeči Chrome
- J-Link s [HARDWARIO CLI Console](../developer-tools/command-line-tools.md#interactive-console)

:::tip

Ne všechny katalogové firmwary podporují přepnutí NB-IoT/LTE-M na LoRaWAN radio pomocí konfigurace. Dejte nám prosím vědět, abychom mohli firmware vytvořit přesně podle vašich potřeb.

:::

Existuje velké množství konfigurací, například autentizace **ABP** nebo **OTAA**. Modem lze také nastavit na fixní datarate pro dosažení nejdelšího dosahu. Podporuje také režimy třídy **A** a **C** pro příjem downlink zpráv.

Pro zobrazení aktuální konfigurace zadejte `lrw config show`, což vypíše kompletní konfiguraci.

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

Rozdíl mezi OTAA a ABP doporučujeme nastudovat v článku [The Thing Industries ABP vs OTAA](https://www.thethingsindustries.com/docs/devices/abp-vs-otaa/).

### Konfigurace OTAA {#otaa-configuration}

Klíče se vyměňují automaticky během procesu **Join** při startu zařízení CHESTER.
Tato konfigurace se nejsnáze nastavuje a používá.

V device profilu v **CHIRPSTACK** na kartě **JOIN (OTAA/ABP)** zapněte **Device supports OTAA**.
![Zapnutí Device supports OTAA v device profilu v CHIRPSTACK](../../../../../chester/platform-connectivity/images/lorawan-chirpstack-device-profile-otaa.png)

Když vytváříte zařízení, v CHIRPSTACK můžete klíče automaticky vygenerovat a uložit je do zařízení.

Při kopírování Appkey z CHIRPSTACK klikněte na **symbol oka**, aby se klíč zobrazil, a zkopírujte ho ručně – označte klíč myší a zvolte kopírovat. Nepoužívejte kopírovací tlačítko ve starších verzích CHIRPSTACK, je tam chyba.

Klíč navíc obsahuje mezery, takže v shellu zařízení CHESTER musíte klíč vložit do uvozovek **"11 22 33 ... ee ff"**.

```
lrw config mode otaa
lrw config nwk public
lrw config dutycycle false

lrw config deveui <your-deveui>
lrw config appkey "<your-appkey>"

config save
```

### Konfigurace ABP {#abp-configuration}

Klíče se zadávají ručně. V některých případech je to lepší řešení u fixní instalace, kdy je signál zařízení na hraně.
Tuto konfiguraci používáme s vypnutým **ADR** (automatická datová rychlost), aby síť měla fixní rychlost komunikace.

V device profilu v CHIRPSTACK na kartě JOIN (OTAA/ABP) **vypněte** Device supports OTAA a zadejte tyto konfigurační parametry pro EU868:

- RX1 delay: `0`
- RX1 data-rate offset: `0`
- RX2 data-rate: `3`
- RX2 channel frequency (Hz): `869525000`
- Factory-preset frequencies (Hz): `868100000, 868300000, 868500000, 867100000, 867300000, 867100000, 867700000, 867900000`

Pro generování klíčů můžete pro testování a vývoj použít tento [online generátor](https://loratools.nl/#/keys), pro produkci použijte pro jistotu offline generátor.

Poté nakonfigurujte zařízení CHESTER

```
lrw config mode abp
lrw config nwk public
lrw config dutycycle false

lrw config deveui <deveui>
lrw config devaddr <devaddr>
lrw config nwkskey <nwkskey>
lrw config appskey <appskey>
```


Můžete také vypnout adaptivní datovou rychlost a nastavit fixní ([datové rychlosti EU868](https://www.thethingsnetwork.org/docs/lorawan/regional-parameters/#eu863-870-data-rates)):

```
lrw config adr false
lrw config datarate 3

config save
```

Pozor, nižší datová rychlost znamená menší payload, který může klesnout [až na 51 bajtů](https://www.thethingsnetwork.org/docs/lorawan/regional-parameters/#eu863-870-maximum-payload-size). Těchto 51 bajtů platí pro kompletní LoRaWAN paket, nejen pro váš užitečný payload.

### Konfigurace CHIRPSTACK {#chirpstack-configuration}

Následující tabulka uvádí přehled doporučených konfiguračních parametrů pro zařízení CHESTER v prostředí ChirpStack v4.

| **Parametr** | **Hodnota** |
|----------------|-----------|
| **General – MAC version** | **LoRaWAN 1.0.4** |
| **General – Regional parameters revision** | **A** |
| **General – ADR algorithm** | **Default ADR algorithm (LoRa only)** |
| **Join (OTAA/ABP) – Device supports OTAA** | **ON** |
| **Class-B – Device supports Class-B** | **OFF** |
| **Class-C – Device supports Class-C** | **OFF** |

:::info
Pokud si nejste jisti nastavením nebo konfigurací **ChirpStack**, podívejte se prosím do následujícího návodu, který obsahuje podrobné instrukce k instalaci a konfiguraci ChirpStack v4: [**Getting Started with ChirpStack v4**](https://docs.hardwario.com/apps/chirpstack/index#getting-started-with-chirpstack-v4)
:::

## Dekodéry a kodeky {#decoders-and-codecs}

Pro správné dekódování RAW binárních dat musíte použít dekodér, který vypisuje hodnoty ve formátu JSON.

HARDWARIO používá dekodéry, které lze použít v CHIRPSTACK nebo Node-RED. Podívejme se například na složku [codec](https://github.com/hardwario/chester-sdk/tree/main/applications/clime/codec) aplikace CHESTER Clime.

Obsahuje soubory:

- [cs-decoder.js](https://github.com/hardwario/chester-sdk/blob/main/applications/clime/codec/cs-decoder.js): dekodér pro CHIRPSTACK
- [nr-decoder.js](https://github.com/hardwario/chester-sdk/blob/main/applications/clime/codec/nr-decoder.js): dekodér pro Node-RED

### Dekodér pro CHIRPSTACK {#chirpstack-decoder}

Dekodér můžete nastavit v Device-profile na kartě **Codec**.

### Dekodér pro Node-RED {#node-red-decoder}

Pro Node-RED se připojujeme přímo k MQTT brokeru v CHIRPSTACK pomocí node MQTT out, který má nastavené MQTT téma na `application/<application-id>/device/+/event/up`.

Nahraďte `<application-id>` ID své aplikace. Ve starších verzích CHIRPSTACK je to **číslo 0..n**, v novějších verzích je to **unikátní ID**.

---

## Řešení problémů {#troubleshooting}

### Veřejná vs. privátní síť {#public-vs-private-network}

Síť LoRaWAN lze nastavit jako privátní nebo veřejnou. Neznamená to, že síť je nebo není viditelná. Znamená to pouze, že radiové pakety používají odlišnou preambuli.

Pokud vaše síť nebo brána nevidí ani jeden paket, obvykle je to právě kvůli tomu.

Ve své bráně (Mikrotik) zkontrolujte konfigurační volbu **Network**, poté nakonfigurujte zařízení CHESTER příkazem `lrw config nwk private` nebo `lrw config nwk public`.

Poté přejděte na kartu **Traffic** v Mikrotiku a zkontrolujte, zda vidíte paket **JOIN** ze svého zařízení s **Dev Addr**. Na této kartě vidíte RAW zašifrované pakety ze všech zařízení v okolí.
Je ale užitečné zkontrolovat, jestli zařízení a brána používají stejný privátní/veřejný prefix paketů.

Pokud vidíte přicházející pakety, můžete problém dále řešit v CHIRPSTACK v části Gateways na kartě **Live LoraWAN Frames**. Až teprve poté, co zde uvidíte pakety, přejděte do Applications a hledejte dekódované pakety a řešte například špatné klíče, pokud tam pakety zařízení nejsou vidět.

**Netmore** používá **veřejnou** síť. Pro nastavení typu sítě vašeho zařízení na veřejnou použijte příkaz `lrw config nwk public`.
