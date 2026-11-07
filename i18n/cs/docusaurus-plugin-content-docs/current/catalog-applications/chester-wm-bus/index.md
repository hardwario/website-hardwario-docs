---
title: CHESTER wM-Bus
description: "CHESTER wM-Bus v naplánovaných skenováních čte měřiče Wireless M-Bus a jejich telegramy odesílá přes LTE: jeho hardware, varianty, nastavení a data."
---
import Image from '@theme/IdealImage';

# CHESTER wM-Bus {#chester-wm-bus}

![Zařízení CHESTER wM-Bus v bílé krabičce, pohled šikmo shora](/img/chester/catalog-applications/chester-wm-bus.webp)

Zařízení **CHESTER wM-Bus** je brána **Wireless M-Bus**. V naplánovaných skenováních naslouchá nastaveným měřičům wM-Bus, přijaté surové telegramy shromažďuje a odesílá přes síť **NB-IoT/LTE-M**.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER wM-Bus](../../firmware/chester-wm-bus/index.md)**.

:::

## Co umí {#what-it-can-do}

- Podporuje všechny měřiče wM-Bus tříd T1 a C1 bez ohledu na výrobce.
- Měří spotřebu **tepla**, **plynu**, **elektřiny** a **vody** v domech a bytech a odečítá i **další zařízení wM-Bus**.
- Skenuje **periodicky**, **denně**, **týdně** nebo **měsíčně**.
- Během příjmu přepíná mezi **dvěma anténami**, aby skenovalo s co nejlepším příjmem v **obou polarizacích**.
- Díky nízké spotřebě vydrží na baterie 7 a více let při denním odečtu; objednat lze i variantu s externím napájením.
- Podporuje novější stack **LTEv2** a aktuální **HARDWARIO Cloud**.

## Podporované senzory wM-Bus {#supported-wm-bus-sensors}

**CHESTER wM-Bus přijímá pakety z jakéhokoli měřiče wM-Bus, který vysílá v režimu T1 nebo C1, bez ohledu na výrobce.**

Zařízení funguje jako **průchozí brána (pass-thru)**: přijaté telegramy wM-Bus přeposílá do cloudu a **dekódování na smysluplné jednotky probíhá v koncové IoT aplikaci**. Telegramy lze volitelně dešifrovat v cloudu pomocí [dešifrovacích klíčů](../../firmware/chester-wm-bus/index.md#hardwario-cloud--decryption-keys) uložených pro jednotlivá zařízení.

Zařízení CHESTER wM-Bus přijímá surové hexadecimální telegramy wM-Bus a přeposílá je tak, jak je přijalo. Každý měřič wM-Bus kóduje data po svém a telegramy mohou být navíc zašifrované. Se zapnutým dekódováním v cloudu data měřičů interpretuje HARDWARIO Cloud; jinak je dekódování surových hexadecimálních hodnot na smysluplné jednotky na zákazníkovi nebo integrátorovi.

Níže uvedené měřiče jsme sami otestovali a zdokumentovali, mimo jiné **vodoměry**, **měřiče tepla** a **indikátory topných nákladů** značek **BMeters** a **Zenner**. Seznam je výchozím bodem.

➡️ [Otestované senzory wM-Bus](../../supported-devices/wm-bus.md)

## Modely {#variants}

| Model | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER wM-Bus**](#model-chester-wm-bus) | Napájení z primárních článků: jmenovité napětí 3,6 V, kapacita 26 000 mAh | [CHESTER wM-Bus](../../firmware/chester-wm-bus/index.md) |
| [**CHESTER wM-Bus DC**](#chester-wm-bus-dc) | Externí adaptér 230 V místo primárních článků | [CHESTER wM-Bus](../../firmware/chester-wm-bus/index.md) |

## CHESTER wM-Bus {#model-chester-wm-bus}

Základní model napájený z primárních článků.

### Hardware {#hardware}

Napájení z primárních článků: jmenovité napětí 3,6 V, kapacita 26 000 mAh. Doporučené jsou dva lithiové články Saft LSH 20 (velikost D, 3,6 V).

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CES`: Standardní základní deska
* `CHESTER-B1` s volbou `W`: nosná deska s držáky baterií a modulem wM-Bus, viz [**CHESTER-B1**](../../ordering-codes.md#chester-b1)
* `CHESTER-E19-P`: Krabička pro zařízení CHESTER s deskou CHESTER-B1

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/catalog-applications/images/chester-wm-bus.png')} width={376} height={376} alt="Brána CHESTER wM-Bus v bílé krabičce na stěnu se dvěma externími anténami" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

### Nastavení {#settings}

Toto jsou nastavení, která u zařízení CHESTER wM-Bus obvykle měníte: kdy skenování probíhá, jak dlouho trvá a které měřiče čte. Parametr nastavíte příkazem `app config <parameter> <value>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení; dávka příkazů poslaná přes cloud se uplatní automaticky. Všechny parametry najdete na [**stránce firmwaru**](../../firmware/chester-wm-bus/index.md#configuration-parameters).

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `scan-mode` | Scan mode | `off`, `interval`, `daily`, `weekly`, `monthly` | `off` | Kdy se skenování spouští: na vyžádání tlačítkem nebo příkazem, každých `scan-interval` sekund, nebo jednou denně, týdně či měsíčně v hodinu `scan-hour` |
| `scan-interval` | Scan interval | `<30-604800>` | `600` | Doba mezi začátky dvou skenování v sekundách v režimu `interval` |
| `scan-hour` | Scan hour | `<0-23>` | `12` | Hodina (UTC), kdy začíná denní, týdenní a měsíční skenování |
| `scan-weekday` | Scan weekday | `<0-6>` | `3` | Den v týdnu pro týdenní skenování, od `1` (pondělí) do `6` (sobota) |
| `scan-day` | Scan day | `<1-31>` | `15` | Den v měsíci pro měsíční skenování; den od `1` do `28` skenuje každý měsíc |
| `scan-timeout` | Scan timeout | `<1-86400>` | `130` | Nejdelší doba skenování jednou anténou v sekundách; nastavte ji delší, než je perioda vysílání měřičů |
| `scan-ant` | Scan ant | `single`, `dual` | `single` | S hodnotou `dual` skenování pokračuje druhou anténou, když u první antény uplyne `scan-timeout` |
| `cloud-decode` | Cloud decode | `true`, `false` | `false` | S hodnotou `true` telegramy dešifruje a dekóduje HARDWARIO Cloud (viz [**Data přes LTE**](#data-over-lte)) |
| `address` | Address | `add <address>`, `remove <address>`, `erase` | prázdný seznam | Měřiče, které se mají číst, zadané adresou wM-Bus, nejvýše 256; s prázdným seznamem si zařízení ponechá první paket od každého měřiče, který zachytí. Příkaz `wm enroll` seznam nahradí měřiči v dosahu ([postup](../../firmware/chester-wm-bus/index.md#address-list-configuration)) |

### Data přes LTE {#data-over-lte}

Zařízení odešle hlášení na konci každého skenování: jakmile dorazí telegram od každého měřiče ze seznamu adres, nebo když uplyne `scan-timeout` (s nastavením `scan-ant dual` až po jeho uplynutí u druhé antény). Příkaz `send` a jeden stisk tlačítka na základní desce odešlou dosud shromážděné telegramy hned a probíhající skenování ukončí. Hlášení se řídí plánem skenování nastaveným v `scan-mode`.

Od každého měřiče nese hlášení první telegram přijatý při skenování. Jedno hlášení pojme až 20 telegramů; zbytek skenování přijde v dalších hlášeních s vyšší hodnotou `wmbus.part`. Ostatní hodnoty jsou poslední jednotlivá měření. Hodnota, jejíž čtení selže, je `null`; baterie se měří 60 sekund po startu a pak každých 12 hodin, takže hodnoty v `battery` jsou do prvního měření `null`.

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER wM-Bus je posílá pod vlastními klíči: `frame` místo `message` (`frame.protocol` má hodnotu `3`), `state.uptime` místo `system.uptime` a `battery` místo hodnot baterie ve struktuře `system`.

Kromě společných dat posílá aplikace CHESTER wM-Bus:

- [`wmbus`](#wmbus): údaje o skenování a telegramy přijaté od měřičů, surové nebo dekódované v HARDWARIO Cloud

Zařízení CHESTER wM-Bus odesílá data přes NB-IoT/LTE-M.

#### Skenování a telegramy {#wmbus}

Struktura `wmbus` popisuje skenování a nese telegramy:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `wmbus.scan_time` | Doba skenování | s | 0–172800 | 1 s |
| `wmbus.received` | Počet měřičů, od kterých skenování přijalo telegram | | 0–256 | 1 |
| `wmbus.devices` | Počet adres v seznamu; s prázdným seznamem počet měřičů zachycených při skenování | | 0–256 | 1 |
| `wmbus.cycle` | Pořadové číslo skenování od startu zařízení | | 0–4294967295 | 1 |
| `wmbus.part` | Pořadí tohoto hlášení mezi hlášeními jednoho skenování, počínaje `0` | | 0–12 | 1 |
| `wmbus.packets[].data` | Telegram v hexadecimálním zápisu od pole délky (L-field), po odebrání bajtů CRC | | | |
| `wmbus.packets[].rssi` | Síla signálu, se kterou byl telegram přijat | dBm | přibližně −107 až −30 | 1 dBm |

Zařízení telegramy přeposílá tak, jak je přijalo: hlavička každého telegramu nese výrobce a adresu měřiče, zbytek jeho hodnoty, zašifrované, pokud je měřič šifruje. S nastavením `cloud-decode` na `true` zařízení posílá tytéž telegramy se silou signálu v podobě, kterou dekóduje HARDWARIO Cloud: cloud každý telegram dešifruje klíčem uloženým v sekci **Variables** ([postup](../../firmware/chester-wm-bus/index.md#hardwario-cloud--decryption-keys)) a dekódované hodnoty měřiče zobrazí v `wmbus.packets`. Které hodnoty to jsou a v jakých jednotkách, záleží na měřiči.

## CHESTER wM-Bus DC {#chester-wm-bus-dc}

Varianta **CHESTER wM-Bus DC** se napájí externím adaptérem 230 V místo primárních článků:

- Základní deska má superkondenzátory (`CHESTER-M-CS` místo `CHESTER-M-CES`).
- Hodí se pro konfigurace s dlouhým skenováním, například pro nepřetržité skenování (viz [**příklady konfigurací**](../../firmware/chester-wm-bus/index.md#example-configurations)).

Používá stejný **[firmware CHESTER wM-Bus](../../firmware/chester-wm-bus/index.md)** jako bateriová varianta.

### Hardware {#chester-wm-bus-dc-hardware}

Její hardware tvoří tyto objednací kódy:

* `CHESTER-M-CS`: Standardní základní deska se superkondenzátory
* `CHESTER-B1` s volbou `W`: nosná deska s modulem wM-Bus, viz [**CHESTER-B1**](../../ordering-codes.md#chester-b1)
* `CHESTER-E19-P`: Krabička pro zařízení CHESTER s deskou CHESTER-B1

### Nastavení {#chester-wm-bus-dc-settings}

Nastavení je stejné jako u zařízení [CHESTER wM-Bus](#settings).

### Data {#chester-wm-bus-dc-data}

Varianta CHESTER wM-Bus DC odesílá přesně stejná data jako [CHESTER wM-Bus](#data-over-lte).

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
