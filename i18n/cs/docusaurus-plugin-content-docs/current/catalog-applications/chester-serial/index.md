---
title: CHESTER Serial
description: "CHESTER Serial čte elektroměry a senzory přes RS-485 nebo RS-232 a jejich hodnoty odesílá přes LTE nebo LoRaWAN: jeho hardware, varianty, nastavení a data."
---

# CHESTER Serial {#chester-serial}

**CHESTER Serial** je univerzální aplikace pro průmyslovou sériovou komunikaci. Slouží jako brána, která přes RS-485 nebo RS-232 čte elektroměry, střídač, průtokoměr a senzory a jejich hodnoty odesílá do cloudu přes LTE-M/NB-IoT nebo LoRaWAN.

:::info Firmware

Všechny parametry, příkazy a firmware ke stažení najdete na stránce **[Firmware CHESTER Serial](../../firmware/chester-serial/index.md)**.

:::

## Co umí {#what-it-can-do}

- Přes modul [**CHESTER-X2**](../../extension-modules/chester-x2.md) čte až 8 podřízených zařízení Modbus RTU na sběrnici RS-485 typu multi-drop.
- Přes modul [**CHESTER-X12**](../../extension-modules/chester-x12.md) připojí jedno zařízení spojením bod-bod přes RS-232.
- Má ovladače pro elektroměry (Carlo Gavazzi, ORNO, Schneider), hybridní střídač SolaX, ultrazvukový průtokoměr FlowT, radonovou sondu Piketronic, senzor CO₂ MicroSENS a čtečku karet RFID Promag.
- Data odesílá přes LTE (kódování CBOR) nebo LoRaWAN (úsporné binární kódování).
- Sbírá hodnoty z bluetoothových senzorových tagů.

## Technické specifikace {#technical-specifications}

| Vlastnost | Hodnota |
| :--- | :--- |
| **Operační systém** | Zephyr RTOS |
| **Fyzické rozhraní** | RS-232 (modul X12), RS-485 (modul X2) |
| **Aplikační protokoly** | Transparentní (vlastní protokol zařízení), Modbus RTU |
| **Cloudové formáty** | CBOR (LTE), optimalizovaný binární (LoRaWAN) |
| **Napájení** | Vyžadován externí zdroj (6–28 V DC) |

## Modely {#variants}

| Model | Rozdíl | Firmware |
| :--- | :--- | :--- |
| [**CHESTER Serial RS-485**](#chester-serial-rs-485) | Rozhraní RS-485 CHESTER-X2, až 8 zařízení Modbus RTU | [CHESTER Serial RS-485](../../firmware/chester-serial/chester-serial-rs485.md) |
| [**CHESTER Serial RS-232**](#chester-serial-rs-232) | Rozhraní RS-232 CHESTER-X12, 1 zařízení | [CHESTER Serial RS-232](../../firmware/chester-serial/chester-serial-rs232.md) |

## Obě varianty {#model-chester-serial}

Obě varianty sdílejí hardwarový základ, nastavení i data popsaná v této části; části jednotlivých variant doplňují, čím se liší.

### Hardware {#hardware}

Obě varianty mají stejnou základní desku i krabičku a liší se modulem rozhraní:

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-E2-LP`: Krabička s pigtailem SMA
* `CHESTER-X2` (modul rozhraní RS-485) nebo `CHESTER-X12` (modul rozhraní RS-232) ve slotu A, viz [Modely](#variants)

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

:::caution

Zařízení **CHESTER Serial** potřebuje pro nepřetržitý provoz externí napájení (6–28 V DC). Senzory i sériové rozhraní jsou napájené trvale.

:::

### Nastavení {#settings}

Toto jsou nastavení, která u zařízení CHESTER Serial obvykle měníte: jak často se zařízení čtou a hlásí, sériovou linku a zařízení ve slotech. Parametr nastavíte příkazem `app config <parameter> <value>` a změnu uplatníte příkazem `config save`, který konfiguraci uloží a restartuje zařízení. Všechny parametry najdete na [**stránce firmwaru**](../../firmware/chester-serial/index.md#configuration-parameters).

Sloupec **HARDWARIO Manager** uvádí název, pod kterým parametr zobrazuje aplikace HARDWARIO Manager; aplikace názvy parametrů zobrazuje anglicky.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `interval-sample` | Sample interval | `<1-86400>` | `60` | Jak často se čtou zařízení a bluetoothové tagy, v sekundách |
| `interval-report` | Report interval | `<0-86400>` | `1800` | Interval hlášení v sekundách; `0` pravidelná hlášení vypne |
| `interval-aggreg` | Aggregation interval | `<1-86400>` | `300` | Interval agregace hodnot z bluetoothových tagů v sekundách |
| `serial-baudrate` | Serial baudrate | `<1200-115200>` | `9600` | Přenosová rychlost |
| `serial-data-bits` | Serial data bits | `<7-9>` | `8` | Počet datových bitů; Modbus RTU používá vždy 8 |
| `serial-parity` | Serial parity | `none`, `odd`, `even` | `none` | Parita |
| `serial-stop-bits` | Serial stop bits | `<1-2>` | `1` | Počet stop bitů |
| `device-0` až `device-7` | Device 0 až Device 7 | `type[,addr[,timeout]]` | `""` | Zařízení ve slotech 0 až 7: jeho typ, jeho adresa Modbus `1`–`247` (v režimu Modbus povinná) a časový limit jeho odpovědi v sekundách (výchozí `1`); `""` slot vyprázdní |

Nastavení sériové linky musí odpovídat připojeným zařízením. Každý typ použijte nejvýše jednou: firmware má pro každý typ jediný datový buffer. Typy zařízení, protokol na lince (`serial-mode`) a počet zařízení závisí na variantě: viz [**CHESTER Serial RS-485**](#chester-serial-rs-485) a [**CHESTER Serial RS-232**](#chester-serial-rs-232). Síťový režim (`app config mode`: `lte` nebo `lrw`) popisuje článek [**Společné funkce**](../common-functionality.md#network-mode-configuration).

### Data přes LTE {#data-over-lte}

CHESTER Serial čte všechna nastavená zařízení každých `interval-sample` sekund, poprvé 10 sekund po startu, a od každého si mezi dvěma hlášeními uchová prvních 32 vzorků, každý s vlastní časovou značkou. Každých `interval-report` sekund, poprvé 30 sekund po startu, odešle hlášení se všemi vzorky od posledního hlášení. Příkaz `send` a jeden stisk tlačítka na základní desce odešlou hlášení hned. Přečtení karty čtečkou Promag MF7S odešle hlášení hned, když je `interval-report` nastavený na `0`; jinak karta počká na další hlášení.

Hodnoty zařízení se odesílají tak, jak byly přečteny: každá odpověď zařízení přidá jeden vzorek a hodnota, jejíž čtení selže, je `null`. Hodnoty bluetoothových tagů se agregují: každá položka `measurements` má `timestamp` a hodnoty `min`, `max`, `avg`, `mdn` za interval `interval-aggreg`. Baterie se měří 60 sekund po startu a pak každých 12 hodin; do prvního měření jsou hodnoty baterie `0`.

Každé hlášení obsahuje společná data všech aplikací CHESTER (`message`, `network`, `system`, `thermometer` a `accelerometer`), která popisuje článek [**Společné funkce**](../common-functionality.md#common-data-lte); aplikace CHESTER Serial posílá `message.version` `2`.

Kromě společných dat posílá aplikace CHESTER Serial:

- [`attribute`](#attribute): identifikaci zařízení v textové podobě
- [`devices`](#devices): jednu položku za každý nastavený slot se vzorky jeho zařízení; klíče vzorku závisí na typu zařízení a typy zařízení na variantě
- [`ble_tags`](#bluetooth-tags): hodnoty zaregistrovaných bluetoothových tagů agregované za `interval-aggreg`

#### Identifikace zařízení {#attribute}

Každé hlášení nese strukturu `attribute` s identifikací zařízení v textové podobě: `vendor_name`, `product_name`, `hw_variant`, `hw_revision`, `fw_version` a `serial_number`.

#### Zařízení ve slotech {#devices}

Seznam `devices` má jednu položku pro každý nastavený slot:

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].device` | Číslo slotu (`device-0` až `device-7`) | | 0–7 | 1 |
| `devices[].type` | Typ zařízení jako číslo: `5` `microsens_180hs`, `6` `or_we_504`, `7` `em1xx`, `8` `or_we_516`, `9` `em5xx`, `10` `iem3000`, `11` `promag_mf7s`, `12` `flowt_ft201`, `13` `piketronic`, `14` `solax_g3` | | 1–14 | 1 |
| `devices[].type_name` | Typ zařízení jako text, například `em1xx` | | | |
| `devices[].addr` | Adresa Modbus ze slotu; `0`, když slot udává samotný typ | | 0–247 | 1 |
| `devices[].data[].timestamp` | Čas vzorku (unixový čas) | s | | 1 s |

Klíč `data` obsahuje vzorky pořízené od posledního hlášení a v položce je vždy, když existuje alespoň jeden vzorek. Pro typy `sensecap_s1000` (`1`), `cubic_6303` (`2`), `lambrecht` (`3`) a `generic` (`4`) posílá firmware v4.0.1 položku s klíči `device`, `type`, `type_name` a `addr`. Ostatní klíče v `devices[].data[]` závisí na typu zařízení a typy zařízení závisí na variantě: viz [**CHESTER Serial RS-485**](#chester-serial-rs-485) a [**CHESTER Serial RS-232**](#chester-serial-rs-232).

#### Bluetoothové tagy {#bluetooth-tags}

Odesílá se v každém hlášení: jedna položka za každý zaregistrovaný tag Teltonika EYE, nejvýše 8 (viz [**Tagy BLE**](../ble-tags.md)); do zaregistrování prvního tagu je seznam prázdný.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `ble_tags[].addr` | Bluetoothová adresa tagu | | | |
| `ble_tags[].rssi` | Síla signálu tagu | dBm | | 1 dBm |
| `ble_tags[].voltage` | Napětí baterie tagu | V | 2,00–4,55 | 0,01 V |
| `ble_tags[].temperature.measurements[]` | Teplota měřená tagem: `timestamp` a hodnoty `min`, `max`, `avg`, `mdn` | °C | −20 až 60 | 0,01 °C |
| `ble_tags[].humidity.measurements[]` | Relativní vlhkost měřená tagem: `timestamp` a hodnoty `min`, `max`, `avg`, `mdn` | % | 0–100 | 1 %; `avg` 0,01 % |

### Data přes LoRaWAN {#data-over-lorawan}

V režimu LoRaWAN zařízení při každém hlášení odešle jeden uplink za každé nastavené zařízení typu `5` až `14`, s odstupem jedné sekundy. Uplink má nejvýše 51 bajtů a nese poslední hodnoty jednoho zařízení. Dekodér pro ChirpStack/TTN v souboru `codec/cs-decoder.js` této aplikace v sadě CHESTER SDK vrací pro každé zařízení tato pole; klíče v `device.data` závisí na typu zařízení a uvádějí je části o variantách.

Každá zpráva obsahuje společná pole LoRaWAN popsaná v článku [**Společné funkce**](../common-functionality.md#common-data-lorawan) a pole z tabulky níže.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `version` | Verze formátu payloadu | | `1` | |
| `device_index` | Číslo slotu (`device-0` až `device-7`) | | 0–7 | 1 |
| `device.type` | Typ zařízení jako číslo, stejně jako `devices[].type` přes LTE | | 5–14 | 1 |
| `device.type_name` | Typ zařízení jako text, například `em1xx` | | | |
| `device.addr` | Adresa Modbus ze slotu; `0`, když slot udává samotný typ | | 0–247 | 1 |
| `device.status`, `device.valid`, `device.error` | Stav čtení; firmware v4.0.1 posílá vždy `1`, takže `valid` je `true` a `error` je `false` | | `1` | |

Float16 je 16bitové číslo s plovoucí řádovou čárkou, které má 11 platných bitů, tedy zhruba tři platné číslice: kolem 230 V se mění po 0,125 V a nad 32 768 po 32. Uchová hodnoty do 65 504. Když poslední čtení zařízení selhalo, je hodnota Float16 `NaN`, kterou JSON zobrazí jako `null`.

## CHESTER Serial RS-485 {#chester-serial-rs-485}

Varianta s rozšiřujícím modulem **CHESTER-X2** pro běžnou průmyslovou sběrnici, na které je více zařízení zapojeno za sebou (daisy-chain):

* **Rozhraní:** RS-485 se společnou zemí
* **Topologie:** sběrnice multi-drop
* **Kapacita:** až 8 podřízených zařízení Modbus RTU

Používá **[firmware CHESTER Serial RS-485](../../firmware/chester-serial/chester-serial-rs485.md)**.

### Hardware {#chester-serial-rs-485-hardware}

Její hardware tvoří tyto objednací kódy:

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-X2`: Modul rozhraní RS-485
* `CHESTER-X10`: Externí napájecí vstup (6–28 V DC)
* `CHESTER-E2-LP`: Krabička s pigtailem SMA

### Nastavení {#chester-serial-rs-485-settings}

Varianta CHESTER Serial RS-485 používá nastavení aplikace [CHESTER Serial](#settings) s protokolem Modbus RTU: nastavte `serial-mode` na `modbus` a každému zařízení v `device-0` až `device-7` zadejte jeho adresu Modbus, nejvýše 8 zařízení na jedné sběrnici. Zařízení na jedné sběrnici RS-485 sdílejí nastavení linky, takže všechna musí mít stejnou přenosovou rychlost, paritu i počet stop bitů. Většina podporovaných zařízení je z výroby nastavená na 9600 Bd, což je i výchozí hodnota firmwaru; střídač SolaX X3-Hybrid G3 používá 115 200 Bd a radonová sonda Piketronic RPP-R 19 200 Bd se sudou paritou.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `serial-mode` | Serial mode | `transparent`, `modbus` | `transparent` | Protokol na sériové lince: `modbus` pro zařízení Modbus RTU |

Sloty `device-0` až `device-7` přijímají tyto typy zařízení, každé se svou adresou Modbus:

| Typ | Zařízení | Rozhraní |
| :--- | :--- | :--- |
| `em1xx` | Jednofázový elektroměr Carlo Gavazzi EM1XX | RS-485, Modbus RTU |
| `em5xx` | Třífázový elektroměr Carlo Gavazzi EM5XX | RS-485, Modbus RTU |
| `or_we_504` | Jednofázový elektroměr ORNO OR-WE-504 | RS-485, Modbus RTU |
| `or_we_516` | Třífázový elektroměr ORNO OR-WE-516 | RS-485, Modbus RTU |
| `iem3000` | Třífázový elektroměr Schneider iEM3000 | RS-485, Modbus RTU |
| `flowt_ft201` | Ultrazvukový průtokoměr FlowT FT201 | RS-485, Modbus RTU |
| `piketronic` | Radonová sonda Piketronic RPP-R | RS-485, Modbus RTU |
| `solax_g3` | Hybridní střídač SolaX X3-Hybrid G3 | RS-485, Modbus RTU |

### Data {#chester-serial-rs-485-data}

Varianta CHESTER Serial RS-485 odesílá data aplikace [CHESTER Serial](#data-over-lte) pro tyto typy zařízení:

- [Carlo Gavazzi EM1XX](#carlo-gavazzi-em1xx) (`em1xx`)
- [Carlo Gavazzi EM5XX](#carlo-gavazzi-em5xx) (`em5xx`)
- [ORNO OR-WE-504](#orno-or-we-504) (`or_we_504`)
- [ORNO OR-WE-516](#orno-or-we-516) (`or_we_516`)
- [Schneider iEM3000](#schneider-iem3000) (`iem3000`)
- [FlowT FT201](#flowt-ft201) (`flowt_ft201`)
- [Piketronic RPP-R](#piketronic-rpp-r) (`piketronic`)
- [SolaX X3-Hybrid G3](#solax-x3-hybrid-g3) (`solax_g3`)

Výkon, účiník a energie elektroměrů se přenášejí jako 32bitová čísla s plovoucí řádovou čárkou, která uchovají zhruba sedm platných číslic; rozlišení uvedené v tabulkách platí v rámci těchto sedmi číslic. Údaj `float32` ve sloupci Rozlišení označuje hodnotu, kterou takto předává už sám elektroměr.

#### Carlo Gavazzi EM1XX {#carlo-gavazzi-em1xx}

Odesílá se pro zařízení typu `em1xx`. Rozsahy odpovídají elektroměru EM111: modelu pro přímé připojení (`AV8`, do 45 A) a modelu pro proudový transformátor (`AV5`, sekundární proud 5 A, převod nejvýše 60). Ve výchozím režimu měření A hlásí elektroměr všechny hodnoty jako kladné; režim měření B hlásí dodávku do sítě zápornými hodnotami a dodanou energii počítá v `energy_out`.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage` | Napětí mezi fází a nulovým vodičem | V | 161–276 | 0,1 V |
| `devices[].data[].current` | Proud | A | 0–45 (`AV8`), 0–360 (`AV5`) | 0,001 A |
| `devices[].data[].power` | Činný výkon | kW | podle údaje elektroměru | 0,0001 kW |
| `devices[].data[].power_apparent` | Zdánlivý výkon | kVA | podle údaje elektroměru | 0,0001 kVA |
| `devices[].data[].power_reactive` | Jalový výkon | kvar | podle údaje elektroměru | 0,0001 kvar |
| `devices[].data[].power_factor` | Účiník | | −1 až 1 | 0,001 |
| `devices[].data[].frequency` | Frekvence | Hz | 45–65 | 0,1 Hz |
| `devices[].data[].energy_in` | Odebraná činná energie celkem | kWh | 0–9999999 | 0,1 kWh |
| `devices[].data[].energy_out` | Dodaná činná energie celkem | kWh | 0–9999999 | 0,1 kWh |

#### Carlo Gavazzi EM5XX {#carlo-gavazzi-em5xx}

Odesílá se pro zařízení typu `em5xx`. Rozsahy odpovídají elektroměrům EM540 (přímé připojení, do 65 A) a EM530 (proudové transformátory se sekundárním proudem 5 A, převod nejvýše 2000, primární proud nejvýše 10 kA; hlásí primární hodnoty). Ve výchozím režimu měření A je výkon vždy kladný; režimy měření B a C hlásí dodávku do sítě zápornými hodnotami a dodanou energii počítají v `energy_out`.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage_l1`, `voltage_l2`, `voltage_l3` | Napětí mezi jednotlivými fázemi a nulovým vodičem | V | 96–276 | 0,1 V |
| `devices[].data[].current_l1`, `current_l2`, `current_l3` | Proud jednotlivých fází | A | 0–65 (EM540), 0–10000 (EM530) | 0,001 A |
| `devices[].data[].current` | Proud nulovým vodičem (registr `An` elektroměru) | A | podle údaje elektroměru | 0,001 A |
| `devices[].data[].power_l1`, `power_l2`, `power_l3` | Činný výkon jednotlivých fází | kW | podle údaje elektroměru | 0,0001 kW |
| `devices[].data[].power` | Celkový činný výkon | kW | podle údaje elektroměru | 0,0001 kW |
| `devices[].data[].power_apparent` | Celkový zdánlivý výkon | kVA | podle údaje elektroměru | 0,0001 kVA |
| `devices[].data[].power_reactive` | Celkový jalový výkon | kvar | podle údaje elektroměru | 0,0001 kvar |
| `devices[].data[].power_factor` | Celkový účiník | | −1 až 1 | 0,001 |
| `devices[].data[].power_factor_l1`, `power_factor_l2`, `power_factor_l3` | Účiník jednotlivých fází | | −1 až 1 | 0,001 |
| `devices[].data[].frequency` | Frekvence | Hz | 45–65 | 0,1 Hz |
| `devices[].data[].energy_in` | Odebraná činná energie celkem | kWh | 0–99999999,9 | 0,1 kWh |
| `devices[].data[].energy_out` | Dodaná činná energie celkem | kWh | 0–99999999,9 | 0,1 kWh |

#### ORNO OR-WE-504 {#orno-or-we-504}

Odesílá se pro zařízení typu `or_we_504`. Elektroměr OR-WE-504 má jmenovité hodnoty 230 V, 50 Hz, 5(80) A a měří odebranou energii.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage` | Napětí | V | podle údaje elektroměru | 0,1 V |
| `devices[].data[].current` | Proud | A | 0–80 | 0,1 A |
| `devices[].data[].power` | Činný výkon | kW | podle údaje elektroměru | 0,001 kW |
| `devices[].data[].power_apparent` | Zdánlivý výkon | kVA | podle údaje elektroměru | 0,001 kVA |
| `devices[].data[].power_reactive` | Jalový výkon | kvar | podle údaje elektroměru | 0,001 kvar |
| `devices[].data[].power_factor` | Účiník | | −1 až 1 | 0,001 |
| `devices[].data[].frequency` | Frekvence | Hz | podle údaje elektroměru | 0,1 Hz |
| `devices[].data[].energy_in` | Odebraná činná energie celkem | kWh | 0–4294967,295 | 0,001 kWh |

#### ORNO OR-WE-516 {#orno-or-we-516}

Odesílá se pro zařízení typu `or_we_516`. Elektroměr OR-WE-516 má jmenovité hodnoty 3 × 230/400 V, 50 Hz, 5(80) A a všechny hodnoty předává jako 32bitová čísla s plovoucí řádovou čárkou.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage_l1`, `voltage_l2`, `voltage_l3` | Napětí jednotlivých fází | V | podle údaje elektroměru | 0,01 V |
| `devices[].data[].current_l1`, `current_l2`, `current_l3` | Proud jednotlivých fází | A | 0–80 | 0,001 A |
| `devices[].data[].power_l1`, `power_l2`, `power_l3` | Činný výkon jednotlivých fází | kW | podle údaje elektroměru | float32 |
| `devices[].data[].power` | Celkový činný výkon | kW | podle údaje elektroměru | float32 |
| `devices[].data[].power_apparent` | Celkový zdánlivý výkon | kVA | podle údaje elektroměru | float32 |
| `devices[].data[].power_reactive` | Celkový jalový výkon | kvar | podle údaje elektroměru | float32 |
| `devices[].data[].power_factor` | Celkový účiník | | −1 až 1 | float32 |
| `devices[].data[].power_factor_l1`, `power_factor_l2`, `power_factor_l3` | Účiník jednotlivých fází | | −1 až 1 | float32 |
| `devices[].data[].frequency` | Frekvence | Hz | podle údaje elektroměru | 0,01 Hz |
| `devices[].data[].energy` | Celková činná energie | kWh | 0–999999,99 | float32 |
| `devices[].data[].energy_in` | Odebraná (přímá) činná energie | kWh | 0–999999,99 | float32 |
| `devices[].data[].energy_out` | Dodaná (zpětná) činná energie | kWh | 0–999999,99 | float32 |

#### Schneider iEM3000 {#schneider-iem3000}

Odesílá se pro zařízení typu `iem3000`. Rozsahy odpovídají řadám iEM3100, iEM3200 a iEM3300: 100–277 V mezi fází a nulovým vodičem ±20 %, 50/60 Hz ±10 %, do 63 A (iEM3150, iEM3155) nebo 125 A (iEM3350, iEM3355), případně proudový transformátor s primárním proudem do 32 767 A (iEM3250, iEM3255). Modely iEM3155, iEM3255 a iEM3355 měří navíc zdánlivý a jalový výkon a dodanou energii. Elektroměr předává hodnoty jako 32bitová čísla s plovoucí řádovou čárkou a energie ve Wh; řada iEM3200 počítá energii do 99 999 999 MWh, zbylé dvě do 99 999 999,9 kWh.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].voltage_l1`, `voltage_l2`, `voltage_l3` | Napětí mezi jednotlivými fázemi a nulovým vodičem | V | 80–332 | 0,01 V |
| `devices[].data[].current_l1`, `current_l2`, `current_l3` | Proud jednotlivých fází | A | 0–63 (iEM3150, iEM3155), 0–125 (iEM3350, iEM3355) | 0,001 A |
| `devices[].data[].power_l1`, `power_l2`, `power_l3` | Činný výkon jednotlivých fází; záporný, když výkon teče od zátěže ke zdroji | kW | podle údaje elektroměru | float32 |
| `devices[].data[].power` | Celkový činný výkon | kW | podle údaje elektroměru | float32 |
| `devices[].data[].power_apparent` | Celkový zdánlivý výkon | kVA | podle údaje elektroměru | float32 |
| `devices[].data[].power_reactive` | Celkový jalový výkon | kvar | podle údaje elektroměru | float32 |
| `devices[].data[].power_factor` | Celkový účiník ve čtyřkvadrantovém kódování elektroměru: hodnota od −1 do 1 je přímo účiník; nad 1 je účiník 2 minus hodnota, pod −1 je to −2 minus hodnota | | −2 až 2 | float32 |
| `devices[].data[].frequency` | Frekvence | Hz | 45–66 | 0,01 Hz |
| `devices[].data[].energy_in` | Odebraná činná energie celkem | kWh | 0–99999999,9 (iEM3100, iEM3300) | 0,001 kWh |
| `devices[].data[].energy_out` | Dodaná činná energie celkem | kWh | 0–99999999,9 (iEM3100, iEM3300) | 0,001 kWh |

#### FlowT FT201 {#flowt-ft201}

Odesílá se pro zařízení typu `flowt_ft201`. Průtokoměr posílá hodnoty v jednotkách nastavených ve vlastním menu: objem ve výchozím nastavení v m³ (klíče pak nesou m³/s, m³/min a m³/h), energii v GJ, kWh nebo jiné jednotce. Rozsah průtoku vyplývá z rozsahu rychlosti proudění a ze světlosti potrubí (DN25 až DN1200). Teploty měří energetická verze průtokoměru se senzory Pt1000.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].flow_s` | Průtok za sekundu | m³/s | podle rychlosti a světlosti potrubí | 0,0001 m³/s |
| `devices[].data[].flow_m` | Průtok za minutu | m³/min | podle rychlosti a světlosti potrubí | 0,0001 m³/min |
| `devices[].data[].flow_h` | Průtok za hodinu | m³/h | podle rychlosti a světlosti potrubí | 0,0001 m³/h |
| `devices[].data[].velocity` | Rychlost proudění | m/s | −5 až 5 | 0,0001 m/s |
| `devices[].data[].total_positive`, `total_negative`, `total_net` | Proteklý objem v kladném a v záporném směru a jejich rozdíl | m³ | podle údaje průtokoměru | 0,001 m³ |
| `devices[].data[].energy_hot`, `energy_cold` | Celková energie pro vytápění a pro chlazení | podle nastavení průtokoměru | podle údaje průtokoměru | 0,001 jednotky |
| `devices[].data[].temp_inlet`, `temp_outlet` | Teplota na vstupu a na výstupu | °C | −40 až 80, −40 až 130 (vysokoteplotní senzory) | 0,01 °C |
| `devices[].data[].signal_quality` | Kvalita signálu; běžně nad 60 | | 0–99 | 1 |

#### Piketronic RPP-R {#piketronic-rpp-r}

Odesílá se pro zařízení typu `piketronic`.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].radon_concentration` | Koncentrace radonu, klouzavý průměr za 1 hodinu | Bq/m³ | 100–100000 | 1 Bq/m³ |
| `devices[].data[].radon_concentration_day` | Koncentrace radonu, klouzavý průměr za 1 den | Bq/m³ | 20–100000 | 1 Bq/m³ |
| `devices[].data[].temperature` | Teplota v měřicí komoře sondy | °C | −40 až 125 | 1 °C |
| `devices[].data[].humidity` | Relativní vlhkost v měřicí komoře sondy | % | 0–100 | 1 % |

#### SolaX X3-Hybrid G3 {#solax-x3-hybrid-g3}

Odesílá se pro zařízení typu `solax_g3`. Rozsahy odpovídají největšímu modelu řady, X3-Hybrid-10.0: doporučený stejnosměrný výkon až 8000 W na fotovoltaickém vstupu 1 a 5000 W na vstupu 2; menší modely mají nižší limity.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].pv1_power` | Výkon fotovoltaického vstupu 1 | W | 0–8000 | 1 W |
| `devices[].data[].pv2_power` | Výkon fotovoltaického vstupu 2 | W | 0–5000 | 1 W |
| `devices[].data[].bat_power` | Výkon baterie | W | podle údaje střídače | 1 W |
| `devices[].data[].bat_temp` | Teplota baterie | °C | podle údaje střídače | 1 °C |
| `devices[].data[].bat_soc` | Stav nabití baterie | % | 0–100 | 1 % |
| `devices[].data[].feedin_power` | Výkon v místě připojení k síti: kladný, když teče do sítě, záporný, když se ze sítě odebírá | W | podle údaje střídače | 1 W |
| `devices[].data[].feedin_energy` | Energie dodaná do sítě celkem | kWh | 0–21474836,47 | 0,01 kWh |
| `devices[].data[].consume_energy` | Energie odebraná ze sítě celkem | kWh | 0–21474836,47 | 0,01 kWh |
| `devices[].data[].eps_power_l1`, `eps_power_l2`, `eps_power_l3` | Činný výkon záložního výstupu EPS v jednotlivých fázích | W | podle údaje střídače | 1 W |

#### Přes LoRaWAN {#chester-serial-rs-485-data-lorawan}

Uplink zařízení těchto typů nese v `device.data` tyto klíče; ostatní pole a formát Float16 popisuje část [Data přes LoRaWAN](#data-over-lorawan):

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `device.data.voltage` | Napětí (`em1xx`, `or_we_504`) | V | jako přes LTE | Float16 |
| `device.data.current` | Proud (`em1xx`, `or_we_504`) | A | jako přes LTE | Float16 |
| `device.data.power` | Činný výkon (`em1xx`, `or_we_504`) | kW | jako přes LTE | Float16 |
| `device.data.voltage_l1`, `voltage_l2`, `voltage_l3` | Napětí jednotlivých fází (`em5xx`, `or_we_516`, `iem3000`) | V | jako přes LTE | Float16 |
| `device.data.current_l1`, `current_l2`, `current_l3` | Proud jednotlivých fází (`em5xx`, `or_we_516`, `iem3000`) | A | jako přes LTE | Float16 |
| `device.data.power_l1`, `power_l2`, `power_l3` | Činný výkon jednotlivých fází (`em5xx`, `or_we_516`, `iem3000`) | kW | jako přes LTE | Float16 |
| `device.data.power_total` | Celkový činný výkon (`em5xx`, `or_we_516`, `iem3000`) | kW | jako přes LTE | Float16 |
| `device.data.frequency` | Frekvence (všechny elektroměry) | Hz | jako přes LTE | Float16 |
| `device.data.energy_in` | Odebraná činná energie (`em1xx`, `em5xx`, `iem3000`); u `or_we_504` posílá firmware v4.0.1 hodnotu vydělenou 1000, tedy v MWh | kWh | 0–65504 | Float16 |
| `device.data.energy` | Odebraná činná energie (`or_we_516`) | kWh | 0–65504 | Float16 |
| `device.data.energy_out` | Dodaná činná energie; u `or_we_504` vždy `0` | kWh | 0–65504 | Float16 |
| `device.data.flow_h` | Průtok (`flowt_ft201`) | m³/h | jako přes LTE | Float16 |
| `device.data.velocity` | Rychlost proudění (`flowt_ft201`) | m/s | jako přes LTE | Float16 |
| `device.data.temp_inlet`, `temp_outlet` | Teplota na vstupu a na výstupu (`flowt_ft201`) | °C | jako přes LTE | Float16 |
| `device.data.energy_hot`, `energy_cold` | Celková energie pro vytápění a pro chlazení (`flowt_ft201`) | podle nastavení průtokoměru | 0–65504 | Float16 |
| `device.data.signal_quality` | Kvalita signálu (`flowt_ft201`); `null`, když poslední čtení selhalo | | 0–99 | 1 |
| `device.data.radon_concentration`, `radon_concentration_day` | Koncentrace radonu, hodinový a denní průměr (`piketronic`) | Bq/m³ | jako přes LTE | Float16 |
| `device.data.humidity` | Relativní vlhkost (`piketronic`) | % | jako přes LTE | Float16 |
| `device.data.temperature` | Teplota (`piketronic`) | °C | jako přes LTE | Float16 |
| `device.data.pv1_power`, `pv2_power` | Výkon fotovoltaického vstupu 1 a 2 (`solax_g3`) | W | jako přes LTE | Float16 |
| `device.data.bat_power` | Výkon baterie (`solax_g3`) | W | jako přes LTE | Float16 |
| `device.data.bat_temp` | Teplota baterie (`solax_g3`) | °C | jako přes LTE | Float16 |
| `device.data.bat_soc` | Stav nabití baterie (`solax_g3`) | % | jako přes LTE | Float16 |
| `device.data.feedin_power` | Výkon v místě připojení k síti (`solax_g3`) | W | jako přes LTE | Float16 |
| `device.data.feedin_energy`, `consume_energy` | Energie dodaná do sítě a odebraná ze sítě celkem (`solax_g3`) | kWh | 0–65504 | Float16 |
| `device.data.eps_power_l1`, `eps_power_l2`, `eps_power_l3` | Činný výkon záložního výstupu EPS v jednotlivých fázích (`solax_g3`) | W | jako přes LTE | Float16 |

## CHESTER Serial RS-232 {#chester-serial-rs-232}

Varianta s rozšiřujícím modulem **CHESTER-X12** pro spojení bod-bod s jedním periferním zařízením, se staršími zařízeními nebo se senzory, které potřebují přímé sériové spojení:

* **Rozhraní:** RS-232 se společnou zemí
* **Topologie:** spojení bod-bod
* **Kapacita:** jedno zařízení (spojení 1:1)

Používá **[firmware CHESTER Serial RS-232](../../firmware/chester-serial/chester-serial-rs232.md)**, který pracuje se senzorem CO₂ MicroSENS 180-HS a se čtečkou RFID Promag MF7S.

### Hardware {#chester-serial-rs-232-hardware}

Její hardware tvoří tyto objednací kódy:

* `CHESTER-M-CGLS`: Standardní základní deska
* `CHESTER-X12`: Modul rozhraní RS-232
* `CHESTER-E2-LP`: Krabička s pigtailem SMA

### Nastavení {#chester-serial-rs-232-settings}

Varianta CHESTER Serial RS-232 připojuje jedno zařízení ve slotu `device-0` a používá `serial-mode transparent` s nastavením aplikace [CHESTER Serial](#settings). Sériovou linku nastavte podle zařízení: čtečka Promag MF7S používá 19 200 Bd a senzor MicroSENS 180-HS 9600 Bd, obě s 8 datovými bity, paritou `none` a 1 stop bitem.

| Parametr | HARDWARIO Manager | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- | :--- |
| `serial-mode` | Serial mode | `transparent`, `modbus` | `transparent` | Protokol na sériové lince: `transparent` pro zařízení s vlastním protokolem |

Slot `device-0` přijme jeden z těchto typů zařízení:

| Typ | Zařízení | Rozhraní |
| :--- | :--- | :--- |
| `microsens_180hs` | Senzor CO₂ MicroSENS 180-HS | RS-232, transparentní režim |
| `promag_mf7s` | Čtečka karet RFID Promag MF7S | RS-232, transparentní režim |

### Data {#chester-serial-rs-232-data}

Varianta CHESTER Serial RS-232 odesílá data aplikace [CHESTER Serial](#data-over-lte) pro tyto typy zařízení:

- [MicroSENS 180-HS](#microsens-180-hs) (`microsens_180hs`)
- [Promag MF7S](#promag-mf7s) (`promag_mf7s`)

#### MicroSENS 180-HS {#microsens-180-hs}

Odesílá se pro zařízení typu `microsens_180hs`.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].co2_percent` | Koncentrace CO₂ | obj. % | 0–20 | 0,001 obj. % |
| `devices[].data[].temperature` | Teplota senzoru, kterou používá pro vlastní kompenzaci | °C | −20 až 250 | 0,1 °C |
| `devices[].data[].pressure` | Tlak vzduchu měřený senzorem | mbar | 600–1200 | 1 mbar |

#### Promag MF7S {#promag-mf7s}

Odesílá se pro zařízení typu `promag_mf7s`: jeden vzorek za každou kartu přiloženou ke čtečce.

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `devices[].data[].card_uid` | UID karty: 8 hexadecimálních číslic, které čtečka posílá, převedených na číslo | | 0–4294967295 | |

#### Přes LoRaWAN {#chester-serial-rs-232-data-lorawan}

Uplink zařízení těchto typů nese v `device.data` tyto klíče a čtečka Promag MF7S odešle uplink po každém přečtení karty; ostatní pole a formát Float16 popisuje část [Data přes LoRaWAN](#data-over-lorawan):

| Klíč | Význam | Jednotka | Rozsah | Rozlišení |
| :--- | :--- | :--- | :--- | :--- |
| `device.data.co2_percent` | Koncentrace CO₂ (`microsens_180hs`) | obj. % | jako přes LTE | 0,1 obj. % |
| `device.data.temperature` | Teplota (`microsens_180hs`) | °C | jako přes LTE | 0,1 °C |
| `device.data.pressure` | Tlak vzduchu (`microsens_180hs`) | mbar | jako přes LTE | 1 mbar |
| `device.data.uid`, `uid_hex` | UID poslední karty (`promag_mf7s`) jako číslo a jako 8 hexadecimálních číslic; před první kartou `null` | | 0–4294967295 | |
| `device.data.timestamp` | Čas posledního přečtení karty (`promag_mf7s`, unixový čas) | s | | 1 s |
| `device.data.total_reads` | Počet přečtených karet od startu zařízení (`promag_mf7s`) | | 0–65535 | 1 |

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
