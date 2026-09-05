---
slug: chester-wm-bus
title: CHESTER wM-Bus
description: "Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:"
---
import Image from '@theme/IdealImage';

# CHESTER wM-Bus {#chester-wm-bus}

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../chester/catalog-applications/images/chester-wm-bus.png')} width={376} height={376} alt="Brána CHESTER wM-Bus v bílé krabičce na stěnu se dvěma externími antény" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />
:::caution

Některé základní informace zde nejsou uvedeny, protože jsou společné pro všechny katalogové aplikace CHESTER. Podívejte se prosím na:

- [**První kroky**](https://docs.hardwario.com/chester/first-steps): jak připojit zařízení do Cloudu.
- [**Common functionality**](common-functionality.md): jak funguje LED, tlačítko a konfigurace sítě.
- [**Platform Management**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::


## Přehled aplikace {#application-overview}

**CHESTER wM-Bus** je brána **Wireless M-Bus**. **Podporuje všechny wM-Bus měřiče tříd T1 a C1 bez ohledu na výrobce** a funguje jako **pass-thru brána**: dekódování přijatých telegramů do smysluplných jednotek probíhá až v koncové IoT aplikaci.

Zařízení naslouchá nakonfigurovaným wM-Bus měřičům ve stanovených intervalech, agreguje surové přijaté wM-Bus pakety a odesílá je přes síť **NB-IoT/LTE-M**.

Používá se v domech a bytech pro měření spotřeby **tepla**, **plynu**, **elektřiny**, **vody** a pro odečet **dalších wM-Bus zařízení**.

Zařízení má **dvě antény**, mezi kterými lze během příjmu přepínat, a dosáhnout tak ideálního příjmu při skenování v **obou polarizacích**.

Zařízení lze nakonfigurovat pro **periodické**, **denní**, **týdenní** nebo **měsíční skenování**.

Zařízení má dostatečně nízkou spotřebu, aby při denním odečtu mohlo pracovat z baterií 7+ let. K dispozici je také varianta s externím napájením.

CHESTER wM-Bus přijímá pouze surové hexadecimální wM-Bus telegramy. Ani zařízení, ani HARDWARIO Cloud data měřičů neinterpretují. Každý wM-Bus měřič má vlastní reprezentaci zakódovaných dat a telegramy mohou být navíc zašifrované. Dekódování surových hexadecimálních hodnot do smysluplných jednotek je na zákazníkovi nebo integrátorovi. Zašifrované telegramy lze volitelně dešifrovat na straně Cloudu, viz [dešifrovací klíče HARDWARIO Cloud](#hardwario-cloud--decryption-keys).

Toto zařízení podporuje novější stack **LTEv2** a **HARDWARIO Cloud v2**.

## Varianty aplikace {#application-variants}

**CHESTER wM-Bus** lze objednat v jedné z těchto variant:

### CHESTER wM-Bus {#chester-wm-bus-1}

Bateriové napájení 6 ks alkalických článků „D".

Katalogový hardware **CHESTER wM-Bus** se skládá z těchto objednacích kódů:

* `CHESTER-M-CES`: Standardní základní deska bez superkondenzátorů

* `CHESTER-B1W`: Nosná deska B1 s wM-Bus rádiem.

Více podrobností viz [**Objednací kódy**](../ordering-codes.md).

### CHESTER wM-Bus DC {#chester-wm-bus-dc}

Externí napájení adaptérem 230V DC.

Katalogový hardware **CHESTER wM-Bus DC** se skládá z těchto objednacích kódů:

* `CHESTER-M-CS`: Standardní základní deska se superkondenzátory

* `CHESTER-B1W`: Nosná deska B1 s wM-Bus rádiem.

Více podrobností viz [**Objednací kódy**](../ordering-codes.md).

## Skenování a chování {#scanning-and-behavior}

Adresy wM-Bus zařízení a režim zařízení lze importovat a překonfigurovat přes cloud.

Zařízení má nastavitelné parametry, díky kterým může skenovat wM-Bus zařízení periodicky, denně, týdně nebo měsíčně. Nastavit lze také dobu skenování a další parametry.

## Výchozí konfigurace {#default-configuration}

Toto je výchozí konfigurace (vypsaná příkazem `app config show`):

```
app config scan-timeout 130
app config scan-interval 600
app config scan-hour 12
app config scan-weekday 3
app config scan-day 15
app config scan-mode off
app config scan-ant dual
app config poll-interval 28800
app config downlink-wdg-interval 172800
```

Pokud máte nakonfigurované nějaké wM-Bus adresy, uvidíte je v logu také, spolu s jejich počtem.

```
app config address count 1
app config address add 81763000
```

## Specifické příkazy {#specific-commands}

:::info

Celou strukturu příkazů můžete snadno prozkoumat – začněte příkazem `help`.

:::

:::caution

Pro uplatnění nové konfigurace je potřeba zadat `config save`, který aplikuje nové konfigurační parametry a restartuje zařízení. To platí pouze tehdy, pokud zařízení konfigurujete přes Bluetooth nebo J-Link.
Není to potřeba, pokud příkazy aplikujete dávkově přes cloud.

:::

### Konfigurace seznamu adres {#address-list-configuration}

`wm scan`

Provede skenování a vypíše všechna zařízení v dosahu (zobrazí jejich adresy a výrobce).

`wm enroll <timeout> <threshold>`

Zaregistruje (naučí) všechna zařízení v dosahu.

- `timeout`: délka skenování v sekundách.  
- `threshold` (RSSI) – minimální síla signálu zařízení, která bude akceptována (rozsah 0 až -150 dBm).  

Pokud parametry nezadáte, použije se výchozí hodnota z `config timeout`.

`app config address`

Vypíše všechny uložené adresy zařízení. Pokud tento výpis provádíte přes BLE a obsahuje velké množství zařízení (desítky), doporučujeme po výpisu zařízení restartovat.

`app config address add 123456`

Přidání senzoru vysílajícího celoročně s adresou 123456.

`app config address remove 123456`

Odebrání senzoru ze seznamu.

`app config address erase`

Odebrání všech senzorů ze seznamu.

`config save`

Po dokončení konfigurace je potřeba vše potvrdit.

`send`

Odešle hodnoty ze nasbíraných dat do cloudu.  
Užitečné pro ověření datového toku a kontrolu, zda senzory správně odesílají data.

:::caution
**Chování bez adres** → Pokud nejsou nakonfigurovány žádné adresy, zařízení skenuje všechna dostupná zařízení a odesílá do cloudu všechna jejich data.
:::

### Konfigurace dekódování v cloudu {#cloud-decode-configuration}

`app config cloud-decode false/true`

- `false`: zprávy se odesílají v surovém (binárním) formátu.  
- `true`: cloud dekóduje zprávy do čitelného formátu (JSON).  
  Pokud jsou zprávy zašifrované, použije se dešifrovací klíč ze sekce **Variables**.


### Konfigurace skenování {#scan-configuration}

Skenování označuje dobu, během které CHESTER zachytává wM-Bus pakety. Metoda skenování se nastavuje parametrem `scan-mode`.

`app config scan-mode <mode>`

- **off**: automatické skenování vypnuto, ideální pro přepravu nebo ladění umístění s ručním spuštěním skenování
- **interval**: skenování v intervalech. Pouze pro debug, parametr `scan-interval` (ignoruje nastavené měsíce skenování)
- **daily**: skenování jednou denně, vždy v hodinu nastavenou parametrem `scan-hour`
- **weekly**: skenování jednou týdně, vždy v hodinu a den v týdnu nastavené parametry `scan-hour` a `scan-weekday`
- **monthly**: skenování jednou měsíčně, vždy v hodinu a den v měsíci nastavené parametry `scan-hour` a `scan-day`

`app config scan-timeout 480`

Po spuštění skenování se skenuje maximálně po dobu `scan-timeout` (nastavitelné v rozsahu 10-86400 sekund), nebo dokud nedorazí pakety od všech zařízení ze seznamu adres.

Jde o bezpečnostní časovač, který v nejhorším případě zabrání tomu, aby skenování zůstalo neomezeně zapnuté v případě nepřijetí/poruchy senzoru. Timeout se zdvojnásobí, pokud jsou parametrem `scan-ant` aktivovány obě antény.

`app config scan-interval 600`

Pevné skenování v intervalech, pokud je `scan-mode` nastaven na **interval**, pouze pro debug, jednotky sekund 0-86400.

`app config scan-hour 12`

Určuje hodinu, ve kterou má skenování začít. Hodiny zařízení CHESTER pracují v UTC. Zařízení nerozlišuje časové zóny ani letní čas. Správnou hodinu je nutné zvážit s určitou rezervou, pokud wM-Bus senzory automaticky přepínají své hodiny na letní/zimní čas.

`app config scan-weekday 2`

Určuje den v týdnu, kdy se má skenovat při týdenním skenování. 0 = neděle, 1 = pondělí, ...

`app config scan-day 2`

Určuje den v měsíci 1-28, kdy se skenuje při měsíčním skenování

`app config scan-ant <mode>`

**single**: skenování používá pouze jeden cyklus s jednou antenou; pokud přijme data od všech zařízení, odešle data okamžitě, pokud ne, odešle data po timeoutu `scan-timeout`

**dual**: skenování probíhá dvakrát, každé s jinou antenou. Pokud nejsou v prvním cyklu s antenou 1 naskenována všechna zařízení, spustí se druhé skenování s druhou antenou. Každé skenování trvá maximálně scan-timeout sekund. Maximální doba, kdy je wM-Bus přijímač aktivní, je rovna 2x `scan-timeout`.

`config save`

Po dokončení konfigurace je potřeba vše potvrdit.

## Příklady konfigurací {#example-configurations}

Při konfiguraci přes BLE je potřeba změny konfigurace uplatnit příkazem `config save`.

Při konfiguraci přes [cloudové config downlink příkazy](/cloud/downlink/config) příkaz `config save` nepřidávejte, aplikuje se automaticky. Jinak se konfigurace neuplatní

### Interval a wM-Bus pakety každé 2 minuty {#interval-and-wm-bus-packets-every-2-minutes}

wM-Bus zařízení odesílají paket každé 2 minuty.
Chceme použít pouze jednu antenu.
Chceme odesílat data do cloudu každé 2 hodiny.
Všechna zařízení jsou celoroční, vysílají (stejně) v letě i v zimě.

```
app config scan-mode interval
app config scan-interval 7200   (measurement every 2 hours = 7200 seconds)
app config scan-timeout 130     (sensors send every 2 minutes = 120 seconds + reserve)
app config scan-ant single      (only one antenna, we scan for 130 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

### Interval a wM-Bus pakety každé 2 minuty, dvě antény {#interval-and-wm-bus-packets-every-2-minutes-two-antennas}

wM-Bus zařízení odesílají paket každé 2 minuty.
Chceme použít obě antény pro lepší příjem, každou orientovanou jinak pro změnu polarity.
Chceme odesílat data do cloudu každé 2 hodiny.
Všechna zařízení jsou celoroční, vysílají (stejně) v letě i v zimě.

```
app config scan-mode interval
app config scan-interval 7200   (scanning every 2 hours = 7200 seconds)
app config scan-timeout 130     (sensors send every 2 minutes = 120 seconds + reserve)
app config scan-ant dual        (both antennas, we scan up to 130 seconds with one antenna and another up to 130 seconds with the second antenna, effectively scanning up to 260 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

### Interval a wM-Bus pakety odesílané každou hodinu {#interval-and-wm-bus-packets-sending-every-hour}

wM-Bus zařízení odesílají paket každou 1 hodinu.
Chceme použít pouze jednu antenu.
Chceme odesílat data do cloudu každou hodinu.
Všechna zařízení jsou celoroční, vysílají (stejně) v letě i v zimě.

**Tato konfigurace není pro bateriovou variantu, protože skenuje neustále**

```
app config scan-mode interval
app config scan-interval 3620   (scanning every hour = 3600 seconds + 20 seconds reserve for sending)
app config scan-timeout 3600    (scanning up to 3600 seconds)
app config scan-ant single      (one antenna, we scan up to 3580 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

### Denní skenování {#daily-scanning}

wM-Bus zařízení odesílají paket každou 1 hodinu.
Chceme použít pouze jednu antenu.
Chceme odesílat data do cloudu jednou denně.
Všechna zařízení jsou celoroční, vysílají (stejně) v letě i v zimě.

**Tato konfigurace není optimální pro bateriovou variantu**

```
app config scan-mode daily      (daily scanning)
app config scan-hour 12         (always at 12 o'clock UTC (for CET, conversion is needed))
app config scan-timeout 3600    (scanning up to 3600 seconds)
app config scan-ant single      (one antenna, we scan up to 3600 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

## Firmware {#firmware}

Nejnovější firmware je k dispozici v katalogových aplikacích v [kapitole Firmware](index.md#application-firmware).

## Příklad JSON zprávy {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
V tomto příkladu **JSON** vidíte surová data ze dvou wM-Bus senzorů

Každá cloudová JSON zpráva obsahuje až 20 wM-Bus paketů. Pokud je CHESTER nakonfigurován pro více než 20 zařízení, surové wM-Bus pakety se rozdělí do více JSON zpráv.

<details>
<summary><b>Zobrazit příklad JSON</b></summary>
<p>

```json
{
    "accelerometer": {
        "accel_x": 0.22,
        "accel_y": 0.07,
        "accel_z": 9.42,
        "orientation": 2
    },
    "battery": {
        "current_load": null,
        "voltage_load": null,
        "voltage_rest": null
    },
    "frame": {
        "protocol": 3,
        "sequence": 0,
        "timestamp": 1698660040
    },
    "network": {
        "parameter": {
            "band": 1184866148,
            "cid": 248833,
            "earfcn": -2121962691,
            "ecl": 536882852,
            "eest": 0,
            "plmn": 536882852,
            "rsrp": 384479,
            "rsrq": 508,
            "snr": 0
        }
    },
    "state": {
        "uptime": 47
    },
    "thermometer": {
        "temperature": 22.31
    },
    "wmbus": {
        "cycle": 1,
        "devices": 2,
        "packets": [
            {
                "data": "32446850003076816980a0919f2b06007007000061087c08000000000000000000000000010101020100000000000000000000",
                "rssi": -65
            },
            {
                "data": "32446850003076816980a0919f2b06007007000061087c08000000000000000000000000010101020100000000000000000000",
                "rssi": -72
            }
        ],
        "part": 0,
        "received": 2,
        "scan_time": 17
    }
}
```

</p>
</details>

  </TabItem>
  <TabItem value="lora" label="LoRaWAN">

<details>
<summary><b>Zobrazit příklad JSON</b></summary>
<p>

```json
{
  "system": {
    "uptime": 15000,
    "voltage_rest": 3.6
  },
  "wmbus": {
    "status": 0,
    "packet_count": 125,
    "message": "0412345678..." 
  }
}
```

</p>
</details>

  </TabItem>
</Tabs>



## HARDWARIO Cloud – dešifrovací klíče {#hardwario-cloud--decryption-keys}

**Přenášené zprávy z wM-Bus zařízení jsou zašifrované**, aby se optimalizovala spotřeba energie při přenosu dat, což prodlužuje celkovou životnost baterie.  

**Přijatá data je proto nutné dešifrovat**, což se provádí pomocí **dešifrovacích klíčů**.  

V této sekci si ukážeme, **jak přidat jednotlivé dešifrovací klíče** do Cloudu pomocí sekce **Variables**.  

:::tip
Pokud si nejste jistí, **jak začít s Cloudem**, postupujte podle tohoto návodu: [**HARDWARIO Cloud v2**](/cloud/)
:::

### Podrobný postup {#step-by-step-instructions}

1. V levém panelu vyberte **Variables**.  
2. Klikněte na tlačítko **+ NEW VARIABLE** v pravém horním rohu.  
3. Vyplňte následující informace:  
   - **Device** → vyberte své zařízení  
   - **Name of Variable** → zadejte wM-Bus adresu zařízení  
   - **Value of Variable** → zadejte dešifrovací klíč přiřazený vašemu zařízení  
   - **Environment** → vyberte `wmbus`  
   - **Comment** → volitelné, můžete přidat komentář  
4. Vaše data by se nyní měla v Cloudu zobrazovat **dešifrovaná**.  

:::info
Existuje také možnost vzít příchozí data z Cloudu a **ručně je dešifrovat** pomocí **online nástroje**: [https://wmbusmeters.org/](https://wmbusmeters.org/).  
:::

## Podporované wM-Bus senzory {#supported-wm-bus-sensors}

**CHESTER wM-Bus přijímá pakety z jakéhokoli wM-Bus měřiče vysílajícího v režimu T1 nebo C1, bez ohledu na výrobce.** Neexistuje žádný seznam kompatibility, se kterým byste své měřiče museli srovnávat.

Zařízení funguje jako **pass-thru brána**: přijaté wM-Bus telegramy přeposílá do Cloudu a **dekódování do smysluplných jednotek probíhá v koncové IoT aplikaci**. Volitelně lze telegramy dešifrovat na straně Cloudu pomocí [dešifrovacích klíčů](#hardwario-cloud--decryption-keys) uložených pro jednotlivá zařízení.

Měřiče uvedené níže jsou ty, které jsme interně otestovali a zdokumentovali, včetně **vodoměrů**, **měřičů tepla** a **indikátorů rozdělovačů nákladů na teplo** od **BMeters** a **Zenner**. Jde o výchozí bod, nikoli o omezení.

➡️ [Otestované wM-Bus senzory](https://docs.hardwario.com/chester/supported-devices/wm-bus_sensors)

---

## Seznam změn {#changelog}

### v3.5.1 – 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Režim enroll (učení) pro párování bezdrátových měřičů
- **Přidáno**: Režim scan-all s podporou konfigurace dekódování na straně cloudu
- **Přidáno**: Příkaz send v shellu pro ruční vložení paketu
- **Přidáno**: Pole výrobce v dekódovaných datech

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Opraveno**: Příjem dlouhých wM-Bus paketů (dříve byly zkráceny nebo zahozeny)
- **Přidáno**: Podpora bateriové varianty (6× článek D) vedle existující DC varianty
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové API endpointy); firmware pro Cloud v1 nebyl pro tuto aplikaci dostupný

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
