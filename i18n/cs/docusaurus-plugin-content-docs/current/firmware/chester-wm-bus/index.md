---
title: CHESTER wM-Bus
description: "Firmware katalogové aplikace CHESTER wM-Bus: skenování, seznam adres, všechny konfigurační parametry s výchozími hodnotami a formát dat."
---

# CHESTER wM-Bus {#chester-wm-bus}

Firmware **CHESTER wM-Bus** udělá ze zařízení CHESTER bránu Wireless M-Bus. V naplánovaných skenováních naslouchá měřičům wM-Bus, sbírá jejich surové telegramy a odesílá je do HARDWARIO Cloud přes NB-IoT/LTE-M. Zařízení data měřičů nedekóduje; telegramy může na požádání dešifrovat a dekódovat HARDWARIO Cloud (viz [**Konfigurace dekódování v cloudu**](#cloud-decode-configuration)).

Firmware má jediné sestavení: používá ho bateriové zařízení CHESTER wM-Bus i varianta [**CHESTER wM-Bus DC**](../../catalog-applications/chester-wm-bus/index.md#chester-wm-bus-dc).

Co mají všechny katalogové aplikace společné (LED, tlačítko, síťový režim a příkazy konzole), popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md). Hardware a varianty produktu najdete na stránce katalogové aplikace [**CHESTER wM-Bus**](../../catalog-applications/chester-wm-bus/index.md).

## Podporovaný hardware {#supported-hardware}

Firmware podporuje:

- nosnou desku **CHESTER-B1** s rádiem wM-Bus a dvěma anténami (viz [**Objednací kódy**](../../ordering-codes.md#chester-b1))
- měřiče wM-Bus libovolného výrobce, které vysílají v režimu **T1** nebo **C1** (viz [**Otestované senzory wM-Bus**](../../supported-devices/wm-bus.md))
- napájení z primárních článků (jmenovité napětí 3,6 V, kapacita 26 000 mAh) nebo z externího adaptéru 230 V. Doporučené jsou dva lithiové články Saft LSH 20 (velikost D, 3,6 V).

## Skenování a chování {#scanning-and-behavior}

Adresy zařízení wM-Bus i režim zařízení lze importovat a měnit přes cloud.

Zařízení může podle nastavení skenovat zařízení wM-Bus periodicky, denně, týdně nebo měsíčně. Nastavit lze i čas skenování a další parametry.

- Při skenování zůstává přijímač wM-Bus zapnutý nejdéle `scan-timeout` sekund. Skenování skončí dřív, jakmile dorazí paket od každé adresy ze seznamu, a zařízení pak pakety odešle.
- Od každého měřiče ze seznamu si zařízení ponechá první paket, který během skenování přijme; pakety ostatních měřičů ignoruje.
- Bez seznamu adres si zařízení ponechá první paket od každého měřiče, který zachytí, a skenování vždy trvá celý `scan-timeout`.
- Během skenování žlutá LED blikne každé 2 sekundy (dvakrát po sobě, když naslouchá druhá anténa). Při odesílání dat se na půl sekundy rozsvítí červená LED.
- Dva stisky tlačítka na základní desce spustí skenování, tři stisky ukončí probíhající skenování, jako by uplynul `scan-timeout`. Jeden stisk a čtyři nebo pět stisků fungují tak, jak popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md#button-behaviour).

## Konfigurační parametry {#configuration-parameters}

Parametr nastavíte příkazem `app config <parametr> <hodnota>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Aktuální hodnoty včetně seznamu adres vypíše příkaz `app config show`.

:::caution

Příkaz `config save` je potřeba jen při konfiguraci přes Bluetooth nebo J-Link. Příkazy poslané dávkově přes cloud se uplatní i bez něj.

:::

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `scan-timeout` | Scan timeout | `<1-86400>` | `130` | Nejdelší doba skenování jednou anténou v sekundách |
| `scan-interval` | Scan interval | `<30-604800>` | `600` | Doba mezi začátky dvou skenování v sekundách v režimu skenování `interval` |
| `scan-hour` | Scan hour | `<0-23>` | `12` | Hodina (UTC), kdy začíná denní, týdenní a měsíční skenování |
| `scan-weekday` | Scan weekday | `<0-6>` | `3` | Den v týdnu pro týdenní skenování: `1` je pondělí, `6` sobota |
| `scan-day` | Scan day | `<1-31>` | `15` | Den v měsíci pro měsíční skenování |
| `scan-mode` | Scan mode | `off`, `interval`, `daily`, `weekly`, `monthly` | `off` | Kdy se skenování spouští: nikdy samo, v pevném intervalu, nebo jednou denně, týdně či měsíčně (viz [**Konfigurace skenování**](#scan-configuration)) |
| `scan-ant` | Scan ant | `single`, `dual` | `single` | S hodnotou `dual` se skenování zopakuje druhou anténou, pokud první anténa nezachytila všechny adresy |
| `poll-interval` | Poll interval | `<5-1209600>` | `28800` | Jak často se zařízení ptá HARDWARIO Cloud na zprávy downlink, v sekundách |
| `downlink-wdg-interval` | Downlink wdg interval | `<0-1209600>` | `172800` | V režimu LTE se zařízení restartuje, když se s HARDWARIO Cloud nespojí déle než tento počet sekund; `0` hlídání vypne |
| `cloud-decode` | Cloud decode | `true`, `false` | `false` | Telegramy dekóduje HARDWARIO Cloud (viz [**Konfigurace dekódování v cloudu**](#cloud-decode-configuration)) |

Parametry jsou stejné pro bateriové zařízení i pro variantu CHESTER wM-Bus DC.

Síťový režim (`app config mode`) a nastavení sítě popisuje článek [**Společné funkce**](../../catalog-applications/common-functionality.md#network-mode-configuration). Zařízení CHESTER wM-Bus startuje v režimu `lte`.

### Konfigurace seznamu adres {#address-list-configuration}

`wm scan`

Provede skenování a vypíše všechna zařízení v dosahu (zobrazí jejich adresu, výrobce a sílu signálu). Po skončení skenování zařízení data odešle.

`wm enroll <timeout> <threshold>`

Zaregistruje (naučí) všechna zařízení v dosahu.

- `timeout`: délka skenování v sekundách (5–86400).
- `threshold` (RSSI): minimální síla signálu, od které se zařízení přijme (rozsah -128 až 0 dBm).

Pokud parametry nezadáte, skenování trvá `scan-timeout` sekund a přijme zařízení s jakoukoli silou signálu. Naučená zařízení nahradí seznam adres: po skončení skenování zařízení odešle data, nový seznam uloží a restartuje se.

`app config address`

Vypíše všechny uložené adresy zařízení. Pokud výpis spouštíte přes BLE a obsahuje hodně zařízení (desítky), doporučujeme potom zařízení restartovat.

`app config address add 123456`

Přidání celoročně vysílajícího senzoru s adresou 123456. Seznam pojme až 256 adres.

`app config address remove 123456`

Odebrání senzoru ze seznamu.

`app config address erase`

Odebrání všech senzorů ze seznamu.

`app config address count 2`

Vymaže seznam před řádky `add`, které za ním následují. Pokud máte nastavené adresy wM-Bus, příkaz `app config show` je vypíše v tomto tvaru i s jejich počtem, takže vypsanou konfiguraci můžete beze změny použít znovu:

```
app config address count 1
app config address add 81763000
```

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

- `false`: hlášení nese surové telegramy: `packets` obsahuje každý telegram hexadecimálně (`data`) se silou signálu (`rssi`).
- `true`: HARDWARIO Cloud telegramy dekóduje a dekódované hodnoty zobrazí v `packets`.
  Pokud jsou telegramy zašifrované, cloud použije dešifrovací klíč ze sekce **Variables** (viz [**dešifrovací klíče**](#hardwario-cloud--decryption-keys)).

### Konfigurace skenování {#scan-configuration}

Skenováním se rozumí doba, po kterou zařízení CHESTER zachytává pakety wM-Bus. Způsob skenování určuje parametr `scan-mode`.

`app config scan-mode <mode>`

- **off**: automatické skenování vypnuté; vhodné pro přepravu nebo pro hledání vhodného umístění s ručně spouštěným skenováním
- **interval**: skenování v intervalech daných parametrem `scan-interval`, jen pro ladění
- **daily**: skenování jednou denně, vždy v hodinu nastavenou parametrem `scan-hour`
- **weekly**: skenování jednou týdně, vždy v hodinu a den v týdnu nastavené parametry `scan-hour` a `scan-weekday`
- **monthly**: skenování jednou měsíčně, vždy v hodinu a den v měsíci nastavené parametry `scan-hour` a `scan-day`

`app config scan-timeout 480`

Spuštěné skenování trvá nejdéle `scan-timeout` (nastavitelné v rozsahu 1–86400 sekund), nebo dokud nedorazí pakety od všech zařízení ze seznamu adres.

Jde o pojistný časovač: když se paket ze senzoru nepodaří přijmout nebo je senzor porouchaný, zabrání tomu, aby skenování běželo donekonečna. Pokud jsou parametrem `scan-ant` zapnuté obě antény, časový limit se zdvojnásobí.

`app config scan-interval 600`

Pevný interval skenování v sekundách (30–604800), pokud je `scan-mode` nastavený na **interval**; jen pro ladění.

`app config scan-hour 12`

Určuje hodinu, kdy má skenování začít. Hodiny zařízení CHESTER běží v UTC a zařízení nerozlišuje časová pásma ani letní čas. Pokud senzory wM-Bus samy přecházejí na letní a zimní čas, zvolte hodinu s dostatečnou rezervou.

`app config scan-weekday 2`

Určuje den v týdnu pro týdenní skenování: 1 = pondělí, 2 = úterý, … 6 = sobota. S hodnotou 0 firmware v4.0.1 týdenní skenování nikdy nespustí, takže neděli nastavit nelze.

`app config scan-day 2`

Určuje den v měsíci (1–31) pro měsíční skenování. Skenování proběhne jen v měsících, které tento den mají; chcete-li skenovat každý měsíc, zvolte den od 1 do 28.

`app config scan-ant <mode>`

**single**: skenuje se jen v jednom cyklu jednou anténou; pokud dorazí data od všech zařízení, odešlou se okamžitě, jinak až po uplynutí `scan-timeout`

**dual**: skenuje se dvakrát, pokaždé jinou anténou. Pokud se v prvním cyklu s anténou 1 nepodaří zachytit všechna zařízení, spustí se druhé skenování s druhou anténou. Každé skenování trvá nejvýše `scan-timeout` sekund, takže přijímač wM-Bus je aktivní nejdéle 2× `scan-timeout`.

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

## HARDWARIO Cloud – dešifrovací klíče {#hardwario-cloud--decryption-keys}

**Zprávy ze zařízení wM-Bus se přenášejí zašifrované.**

**Přijatá data je proto nutné dešifrovat**, k čemuž slouží **dešifrovací klíče**.

V této části ukážeme, **jak přidat jednotlivé dešifrovací klíče** do cloudu v sekci **Variables**. Cloud je použije, když zařízení odesílá telegramy s parametrem `cloud-decode` nastaveným na `true`.

:::tip
Pokud si nejste jistí, **jak s cloudem začít**, postupujte podle návodu: [**HARDWARIO Cloud**](/cloud/)
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

## Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `wm scan` | Okamžitě spustí skenování a vypíše každé zařízení, které zachytí |
| `wm timeout` | Ukončí probíhající skenování, jako by uplynul `scan-timeout` |
| `wm enroll <timeout> <threshold>` | Nahradí seznam adres zařízeními nalezenými při skenování (viz [**Konfigurace seznamu adres**](#address-list-configuration)) |
| `send` | Okamžitě odešle nasbíraná data a ukončí probíhající skenování (totéž dělá `wm send`) |
| `poll` | Okamžitě se zeptá HARDWARIO Cloud na zprávy downlink |

Seznam adres se spravuje příkazem `app config address` (viz [**Konfigurace seznamu adres**](#address-list-configuration)). Ostatní podpříkazy `wm` (`on`, `off`, `config`, `ant`, `push`, `poll`, `poll_ts`, `weekday`, `heap`) slouží k ladění.

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-wmbus:v4.0.1](https://firmware.hardwario.com/chester/07488f3fd70e481aa21072ce3ac211e8), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `07488f3fd70e481aa21072ce3ac211e8`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/07488f3fd70e481aa21072ce3ac211e8/hex), SHA256 `5c53dada80d70d8ca25d36456d698dbebb61af27bf329df6c5778b4d32850aa7`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/07488f3fd70e481aa21072ce3ac211e8/bin), SHA256 `65c41fe6818dce77d08b8ea511e61c529130fcc4e671dd3cfc4c3dde5a25d8fc`
- **Sestavení ze SDK:** `west chester-update wmbus --variant "CHESTER wM-Bus"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).

## Ukázková zpráva JSON {#example-json-message}

Každé pole s jednotkou, rozsahem a rozlišením popisuje stránka katalogové aplikace v části [**Data**](../../catalog-applications/chester-wm-bus/index.md#data-over-lte).

Ukázka je hlášení ze skenování, které zachytilo telegramy obou měřičů ze seznamu adres.

Každé hlášení nese až 20 telegramů. Když jich skenování zachytí víc, rozdělí se do více hlášení.

Struktura `wmbus` obsahuje:

- `scan_time`: doba skenování v sekundách
- `received`: počet měřičů, od kterých skenování přijalo telegram
- `devices`: počet adres v seznamu (bez seznamu počet zachycených měřičů)
- `cycle`: pořadové číslo skenování od spuštění zařízení
- `part`: pořadí tohoto hlášení, když se telegramy z jednoho skenování rozdělí do více hlášení, počínaje `0`
- `packets`: surové telegramy (`data`, hexadecimálně, od pole délky, bez bajtů CRC) se silou signálu (`rssi`, dBm); s nastavením `cloud-decode` na `true` tu HARDWARIO Cloud místo nich zobrazí dekódované hodnoty měřičů

<details>
<summary><b>Zobrazit ukázku JSON</b></summary>

```json
{
    "frame": {
        "protocol": 3,
        "sequence": 27,
        "timestamp": 1762430712
    },
    "state": {
        "uptime": 1296131
    },
    "battery": {
        "voltage_rest": 3.65,
        "voltage_load": 3.61,
        "current_load": 36
    },
    "network": {
        "parameter": {
            "eest": 8,
            "ecl": 0,
            "rsrp": -95,
            "rsrq": -11,
            "snr": 6,
            "plmn": 23003,
            "cid": 1036050,
            "band": 20,
            "earfcn": 6300
        }
    },
    "thermometer": {
        "temperature": 21.06
    },
    "accelerometer": {
        "accel_x": 0.22,
        "accel_y": 0.07,
        "accel_z": 9.78,
        "orientation": 2
    },
    "wmbus": {
        "scan_time": 37,
        "received": 2,
        "devices": 2,
        "cycle": 14,
        "part": 0,
        "packets": [
            {
                "data": "32446850003076816980a0919f2b06007007000061087c08000000000000000000000000010101020100000000000000000000",
                "rssi": -71
            },
            {
                "data": "32446850152904766980a0919f2b0600700700005e087c08000000000000000000000000010101020100000000000000000000",
                "rssi": -84
            }
        ]
    }
}
```

</details>

## Seznam změn {#changelog}

### v3.5.1 – 2025-12-08 {#v351--2025-12-08}

- **Přidáno**: Režim enroll (učení) pro párování bezdrátových měřičů
- **Přidáno**: Režim scan-all s podporou konfigurace dekódování v cloudu
- **Přidáno**: Příkaz send v shellu pro ruční vložení paketu
- **Přidáno**: Pole výrobce v dekódovaných datech

### v3.5.0 – 2025-12-03 {#v350--2025-12-03}

- **Opraveno**: Příjem dlouhých paketů wM-Bus (dříve se zkracovaly nebo zahazovaly)
- **Přidáno**: Podpora bateriové varianty (6× článek D) vedle stávající varianty s napájením DC
- **Změněno**: Přechod na protokol HARDWARIO Cloud (kódování CBOR, nové endpointy API); firmware pro Cloud Legacy nebyl pro tuto aplikaci dostupný

:::info

Kompletní přehled všech změn platformy najdete v [**Seznamu změn CHESTER**](/chester/changelog).

:::
