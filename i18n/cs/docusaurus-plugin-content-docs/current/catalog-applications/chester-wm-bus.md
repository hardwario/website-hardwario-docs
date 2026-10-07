---
slug: chester-wm-bus
title: CHESTER wM-Bus
---
import Image from '@theme/IdealImage';

# CHESTER wM-Bus {#chester-wm-bus}

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../chester/catalog-applications/images/chester-wm-bus.png')} width={376} height={376} alt="Brána CHESTER wM-Bus v bílé krabičce na stěnu se dvěma externími anténami" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />
:::caution

Základy společné pro všechny katalogové aplikace CHESTER tu neopakujeme. Najdete je na těchto stránkách:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.

:::


## Přehled aplikace {#application-overview}

**CHESTER wM-Bus** je brána **Wireless M-Bus**. **Podporuje všechny měřiče wM-Bus tříd T1 a C1 bez ohledu na výrobce** a funguje jako **průchozí brána (pass-thru)**: přijaté telegramy se na smysluplné jednotky dekódují až v koncové IoT aplikaci.

Zařízení v nastavených intervalech naslouchá vybraným měřičům wM-Bus, přijaté surové pakety shromažďuje a odesílá přes síť **NB-IoT/LTE-M**.

Používá se v domech a bytech k měření spotřeby **tepla**, **plynu**, **elektřiny** a **vody** a k odečtu **dalších zařízení wM-Bus**.

Zařízení má **dvě antény**, mezi kterými může během příjmu přepínat, a skenovat tak s co nejlepším příjmem v **obou polarizacích**.

Zařízení může podle nastavení skenovat **periodicky**, **denně**, **týdně** nebo **měsíčně**.

Spotřeba zařízení je tak nízká, že při denním odečtu vydrží na baterie 7 a více let. Objednat lze i variantu s externím napájením.

Zařízení CHESTER wM-Bus přijímá jen surové hexadecimální telegramy wM-Bus. Data měřičů neinterpretuje ani zařízení, ani HARDWARIO Cloud. Každý měřič wM-Bus kóduje data po svém a telegramy mohou být navíc zašifrované. Dekódování surových hexadecimálních hodnot na smysluplné jednotky je na zákazníkovi nebo integrátorovi. Zašifrované telegramy lze volitelně dešifrovat v cloudu, viz [dešifrovací klíče v HARDWARIO Cloud](#hardwario-cloud--decryption-keys).

Toto zařízení podporuje novější stack **LTEv2** a **HARDWARIO Cloud v2**.

## Varianty aplikace {#application-variants}

Zařízení **CHESTER wM-Bus** lze objednat v jedné z těchto variant:

### CHESTER wM-Bus {#chester-wm-bus-1}

Napájení šesti alkalickými články „D“.

Hardware katalogové aplikace **CHESTER wM-Bus** tvoří tyto položky (objednací kódy):

* `CHESTER-M-CES`: Standardní základní deska bez superkondenzátorů

* `CHESTER-B1W`: Nosná deska B1 s rádiem wM-Bus.

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

### CHESTER wM-Bus DC {#chester-wm-bus-dc}

Externí napájení síťovým adaptérem DC (230 V).

Hardware katalogové aplikace **CHESTER wM-Bus DC** tvoří tyto položky (objednací kódy):

* `CHESTER-M-CS`: Standardní základní deska se superkondenzátory

* `CHESTER-B1W`: Nosná deska B1 s rádiem wM-Bus.

Podrobnosti najdete na stránce [**Objednací kódy**](../ordering-codes.md).

## Skenování a chování {#scanning-and-behavior}

Adresy zařízení wM-Bus i režim zařízení lze importovat a měnit přes cloud.

Zařízení může podle nastavení skenovat zařízení wM-Bus periodicky, denně, týdně nebo měsíčně. Nastavit lze i čas skenování a další parametry.

## Výchozí konfigurace {#default-configuration}

Výchozí konfigurace, jak ji vypíše příkaz `app config show`:

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

Pokud máte nastavené adresy wM-Bus, uvidíte je v logu také, spolu s jejich počtem.

```
app config address count 1
app config address add 81763000
```

## Příkazy aplikace {#specific-commands}

:::info

Celou stromovou strukturu příkazů snadno prozkoumáte: začněte příkazem `help`.

:::

:::caution

Novou konfiguraci uplatníte příkazem `config save`, který uloží nové parametry a restartuje zařízení. To platí jen při konfiguraci přes Bluetooth nebo J-Link.
Když posíláte příkazy dávkově přes cloud, není to potřeba.

:::

### Konfigurace seznamu adres {#address-list-configuration}

`wm scan`

Provede skenování a vypíše všechna zařízení v dosahu (zobrazí jejich adresy a výrobce).

`wm enroll <timeout> <threshold>`

Zaregistruje (naučí) všechna zařízení v dosahu.

- `timeout`: délka skenování v sekundách.  
- `threshold` (RSSI): minimální síla signálu, od které se zařízení přijme (rozsah 0 až -150 dBm).  

Pokud parametry nezadáte, použije se výchozí hodnota z `config timeout`.

`app config address`

Vypíše všechny uložené adresy zařízení. Pokud výpis spouštíte přes BLE a obsahuje hodně zařízení (desítky), doporučujeme potom zařízení restartovat.

`app config address add 123456`

Přidání celoročně vysílajícího senzoru s adresou 123456.

`app config address remove 123456`

Odebrání senzoru ze seznamu.

`app config address erase`

Odebrání všech senzorů ze seznamu.

`config save`

Po dokončení konfigurace vše potvrďte.

`send`

Odešle nasbíraná data do cloudu.  
Hodí se k ověření toku dat a ke kontrole, zda senzory správně vysílají.

:::caution
**Chování bez adres** → Pokud nejsou nastavené žádné adresy, zařízení skenuje všechna dostupná zařízení a do cloudu odesílá všechna jejich data.
:::

### Konfigurace dekódování v cloudu {#cloud-decode-configuration}

`app config cloud-decode false/true`

- `false`: zprávy se odesílají v surovém (binárním) formátu.  
- `true`: cloud dekóduje zprávy do čitelného formátu (JSON).  
  Pokud jsou zprávy zašifrované, použije se dešifrovací klíč ze sekce **Variables**.


### Konfigurace skenování {#scan-configuration}

Skenováním se rozumí doba, po kterou zařízení CHESTER zachytává pakety wM-Bus. Způsob skenování určuje parametr `scan-mode`.

`app config scan-mode <mode>`

- **off**: automatické skenování vypnuté; vhodné pro přepravu nebo pro hledání vhodného umístění s ručně spouštěným skenováním
- **interval**: skenování v intervalech daných parametrem `scan-interval`, jen pro ladění (ignoruje nastavené měsíce skenování)
- **daily**: skenování jednou denně, vždy v hodinu nastavenou parametrem `scan-hour`
- **weekly**: skenování jednou týdně, vždy v hodinu a den v týdnu nastavené parametry `scan-hour` a `scan-weekday`
- **monthly**: skenování jednou měsíčně, vždy v hodinu a den v měsíci nastavené parametry `scan-hour` a `scan-day`

`app config scan-timeout 480`

Spuštěné skenování trvá nejdéle `scan-timeout` (nastavitelné v rozsahu 10–86400 sekund), nebo dokud nedorazí pakety od všech zařízení ze seznamu adres.

Jde o pojistný časovač: když se paket ze senzoru nepodaří přijmout nebo je senzor porouchaný, zabrání tomu, aby skenování běželo donekonečna. Pokud jsou parametrem `scan-ant` zapnuté obě antény, časový limit se zdvojnásobí.

`app config scan-interval 600`

Pevný interval skenování v sekundách (0–86400), pokud je `scan-mode` nastavený na **interval**; jen pro ladění.

`app config scan-hour 12`

Určuje hodinu, kdy má skenování začít. Hodiny zařízení CHESTER běží v UTC a zařízení nerozlišuje časová pásma ani letní čas. Pokud senzory wM-Bus samy přecházejí na letní a zimní čas, zvolte hodinu s dostatečnou rezervou.

`app config scan-weekday 2`

Určuje den v týdnu pro týdenní skenování: 0 = neděle, 1 = pondělí, ...

`app config scan-day 2`

Určuje den v měsíci (1–28) pro měsíční skenování.

`app config scan-ant <mode>`

**single**: skenuje se jen v jednom cyklu jednou anténou; pokud dorazí data od všech zařízení, odešlou se okamžitě, jinak až po uplynutí `scan-timeout`

**dual**: skenuje se dvakrát, pokaždé jinou anténou. Pokud se v prvním cyklu s anténou 1 nepodaří zachytit všechna zařízení, spustí se druhé skenování s druhou anténou. Každé skenování trvá nejvýše scan-timeout sekund, takže přijímač wM-Bus je aktivní nejdéle 2× `scan-timeout`.

`config save`

Po dokončení konfigurace vše potvrďte.

## Příklady konfigurací {#example-configurations}

Při konfiguraci přes BLE je potřeba změny uplatnit příkazem `config save`, jinak se konfigurace nepoužije.

Při konfiguraci [downlinkovými příkazy Config z cloudu](/cloud/downlink/config) příkaz `config save` nepřidávejte, konfigurace se uplatní automaticky.

### Interval a pakety wM-Bus každé 2 minuty {#interval-and-wm-bus-packets-every-2-minutes}

Zařízení wM-Bus vysílají paket každé 2 minuty.
Chceme použít jen jednu anténu.
Chceme odesílat data do cloudu každé 2 hodiny.
Všechna zařízení jsou celoroční, vysílají (stejně) v létě i v zimě.

```
app config scan-mode interval
app config scan-interval 7200   (measurement every 2 hours = 7200 seconds)
app config scan-timeout 130     (sensors send every 2 minutes = 120 seconds + reserve)
app config scan-ant single      (only one antenna, we scan for 130 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

### Interval a pakety wM-Bus každé 2 minuty, dvě antény {#interval-and-wm-bus-packets-every-2-minutes-two-antennas}

Zařízení wM-Bus vysílají paket každé 2 minuty.
Pro lepší příjem chceme použít obě antény, každou natočenou jinak kvůli změně polarizace.
Chceme odesílat data do cloudu každé 2 hodiny.
Všechna zařízení jsou celoroční, vysílají (stejně) v létě i v zimě.

```
app config scan-mode interval
app config scan-interval 7200   (scanning every 2 hours = 7200 seconds)
app config scan-timeout 130     (sensors send every 2 minutes = 120 seconds + reserve)
app config scan-ant dual        (both antennas, we scan up to 130 seconds with one antenna and another up to 130 seconds with the second antenna, effectively scanning up to 260 seconds)
app config address count 2
app config address add 111111
app config address add 222222
```

### Interval a pakety wM-Bus každou hodinu {#interval-and-wm-bus-packets-sending-every-hour}

Zařízení wM-Bus vysílají paket jednou za hodinu.
Chceme použít jen jednu anténu.
Chceme odesílat data do cloudu každou hodinu.
Všechna zařízení jsou celoroční, vysílají (stejně) v létě i v zimě.

**Tato konfigurace není vhodná pro bateriovou variantu, protože zařízení skenuje nepřetržitě**

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

Zařízení wM-Bus vysílají paket jednou za hodinu.
Chceme použít jen jednu anténu.
Chceme odesílat data do cloudu jednou denně.
Všechna zařízení jsou celoroční, vysílají (stejně) v létě i v zimě.

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

Nejnovější firmware najdete na stránce Katalogové aplikace v kapitole [Firmware aplikací](index.md#application-firmware).

## Ukázková zpráva JSON {#example-json-message}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="lte" label="LTE">
    
Tato ukázka **JSON** obsahuje surová data ze dvou senzorů wM-Bus

Každá zpráva JSON pro cloud obsahuje až 20 paketů wM-Bus. Pokud je v zařízení CHESTER nastaveno více než 20 zařízení wM-Bus, surové pakety se rozdělí do více zpráv JSON.

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>
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
<summary><b>Zobrazit ukázku JSON</b></summary>
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

**Zprávy ze zařízení wM-Bus se přenášejí zašifrované**, aby se při přenosu dat šetřila energie a prodloužila výdrž baterie.  

**Přijatá data je proto nutné dešifrovat**, k čemuž slouží **dešifrovací klíče**.  

V této části ukážeme, **jak přidat jednotlivé dešifrovací klíče** do cloudu v sekci **Variables**.  

:::tip
Pokud si nejste jistí, **jak s cloudem začít**, postupujte podle návodu: [**HARDWARIO Cloud v2**](/cloud/)
:::

### Podrobný postup {#step-by-step-instructions}

1. V levém panelu vyberte **Variables**.  
2. Klikněte na tlačítko **+ NEW VARIABLE** v pravém horním rohu.  
3. Vyplňte tyto údaje:  
   - **Device** → vyberte své zařízení  
   - **Name of Variable** → zadejte adresu wM-Bus zařízení  
   - **Value of Variable** → zadejte dešifrovací klíč zařízení  
   - **Environment** → vyberte `wmbus`  
   - **Comment** → volitelný komentář  
4. Data by se teď měla v cloudu zobrazovat **dešifrovaná**.  

:::info
Příchozí data z cloudu můžete také **dešifrovat ručně** v **online nástroji**: [https://wmbusmeters.org/](https://wmbusmeters.org/).  
:::

## Podporované senzory wM-Bus {#supported-wm-bus-sensors}

**CHESTER wM-Bus přijímá pakety z jakéhokoli měřiče wM-Bus, který vysílá v režimu T1 nebo C1, bez ohledu na výrobce.** Své měřiče tedy nemusíte ověřovat proti žádnému seznamu kompatibility.

Zařízení funguje jako **průchozí brána (pass-thru)**: přijaté telegramy wM-Bus přeposílá do cloudu a **dekódování na smysluplné jednotky probíhá v koncové IoT aplikaci**. Telegramy lze volitelně dešifrovat v cloudu pomocí [dešifrovacích klíčů](#hardwario-cloud--decryption-keys) uložených pro jednotlivá zařízení.

Níže uvedené měřiče jsme sami otestovali a zdokumentovali, mimo jiné **vodoměry**, **měřiče tepla** a **indikátory topných nákladů** značek **BMeters** a **Zenner**. Seznam je výchozím bodem, ne omezením.

➡️ [Otestované senzory wM-Bus](/chester/supported-devices/wm-bus_sensors)

---

## Seznam změn {#changelog}

### v3.5.1 – 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Režim enroll (učení) pro párování bezdrátových měřičů
- **Přidáno**: Režim scan-all s podporou konfigurace dekódování v cloudu
- **Přidáno**: Příkaz send v shellu pro ruční vložení paketu
- **Přidáno**: Pole výrobce v dekódovaných datech

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Opraveno**: Příjem dlouhých paketů wM-Bus (dříve se zkracovaly nebo zahazovaly)
- **Přidáno**: Podpora bateriové varianty (6× článek D) vedle stávající varianty s napájením DC
- **Změněno**: Přechod na protokol Cloud v2 (kódování CBOR, nové endpointy API); firmware pro Cloud v1 nebyl pro tuto aplikaci dostupný

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
