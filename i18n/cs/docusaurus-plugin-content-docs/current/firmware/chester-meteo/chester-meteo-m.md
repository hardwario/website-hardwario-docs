---
title: CHESTER Meteo M
description: "Firmware CHESTER Meteo M: čím se liší od hlavního firmwaru CHESTER Meteo při čtení meteostanice Modbus přes modul CHESTER-X2."
---

# CHESTER Meteo M {#chester-meteo-m}

**CHESTER Meteo M** je firmware CHESTER Meteo sestavený pro meteostanici a senzor prachových částic připojené přes RS-485 Modbus RTU. Vše, co tato stránka nezmiňuje, funguje stejně jako u firmwaru [**CHESTER Meteo**](index.md).

## Rozdíly oproti hlavnímu firmwaru {#differences-from-chester-meteo}

### Hardware {#hardware}

- Přidává modul **CHESTER-X2** ve slotu A, rozhraní RS-485 pro zařízení Modbus (viz [**CHESTER-X2**](../../ordering-codes.md#chester-x2)). Modul zabírá místo vstupního modulu CHESTER-X0, takže analogový srážkoměr, anemometr a směrovku větru připojit nelze.
- Čte meteostanici **SenseCAP S500** nebo **SenseCAP S1000** (parametr `meteo-type`).
- Volitelně čte na stejné sběrnici senzor prachových částic **Cubic** (parametr `pm-type`).

### Chování {#behavior}

Při každém vzorku firmware přečte zvolená zařízení Modbus a jejich hodnoty agreguje stejně jako hodnoty ostatních senzorů.

:::caution

Firmware v4.0.1 hodnotu `meteo-type lambrecht` přijme, podporu meteostanic Lambrecht ale nemá zabudovanou, takže z nich žádná data nečte.

:::

### Konfigurační parametry {#configuration-parameters}

Parametry sběrnice Modbus obsahuje každé sestavení firmwaru CHESTER Meteo, používá je ale jen tento firmware:

| Parametr | Hodnoty | Výchozí | Význam |
| :--- | :--- | :--- | :--- |
| `meteo-type` | `none`, `lambrecht`, `sensecap-s1000`, `sensecap-s500` | `none` | Typ meteostanice; s hodnotou `none` firmware žádnou meteostanici nečte |
| `meteo-addr` | `<1-247>` | `1` | Adresa meteostanice na sběrnici Modbus |
| `pm-type` | `none`, `cubic-6303` | `none` | Typ senzoru prachových částic; s hodnotou `none` firmware žádný senzor nečte |
| `pm-addr` | `<1-247>` | `1` | Adresa senzoru prachových částic na sběrnici Modbus |
| `modbus-baud` | `<1200-19200>` | `9600` | Přenosová rychlost |
| `modbus-parity` | `none`, `odd`, `even`, `mark`, `space` | `none` | Parita; fungují jen `none`, `odd` a `even`, s `mark` nebo `space` se rozhraní Modbus nespustí |
| `modbus-stop-bits` | `0_5`, `1`, `1_5`, `2` | `1` | Uloží se, ale neuplatní: firmware použije 1 stop bit s paritou `odd` nebo `even` a 2 stop bity s `none` |
| `modbus-addr` | `<1-247>` | `1` | Uloží se, firmware v4.0.1 ho ale nepoužívá; adresy zařízení určují `meteo-addr` a `pm-addr` |

Příklad: `app config meteo-type sensecap-s500` a potom `config save`.

### Příkazy {#commands}

| Příkaz | Akce |
| :--- | :--- |
| `app modbus` | Vypíše poslední hodnoty zařízení Modbus |
| `app modbus sample` | Okamžitě přečte zařízení Modbus a vypíše hodnoty |
| `app modbus_set_sensecap <current_addr> <new_addr>` | Změní adresu meteostanice SenseCAP na sběrnici Modbus; připojte jen meteostanici a pak ji odpojte od napájení a znovu připojte, aby novou adresu použila |
| `app modbus_set_cubic <current_addr> <new_addr>` | Změní adresu senzoru Cubic na sběrnici Modbus; připojte jen tento senzor |

### Data {#data}

S parametrem `meteo-type` nastaveným na `sensecap-s500` nebo `sensecap-s1000` obsahuje hlášení navíc strukturu `sensecap`. Každá hodnota v ní má `measurements` s časovou značkou a hodnotami `min`, `max`, `avg` a `mdn`:

| Klíč | Hodnota | Jednotka |
| :--- | :--- | :--- |
| `air_temperature` | Teplota vzduchu | °C |
| `air_humidity` | Relativní vlhkost | % |
| `barometric_pressure` | Atmosférický tlak | Pa |
| `wind_direction_avg` | Průměrný směr větru podle meteostanice | ° |
| `wind_speed_avg` | Průměrná rychlost větru podle meteostanice | m/s |
| `light_intensity` | Osvětlenost (jen S1000) | lx |
| `accumulated_rainfall` | Úhrn srážek (jen S1000) | mm |
| `pm2_5`, `pm10` | Prachové částice PM2,5 a PM10 (jen S1000) | µg/m³ |
| `co2` | Koncentrace CO₂ (jen S1000) | ppm |

S parametrem `pm-type cubic-6303` obsahuje hlášení navíc strukturu `cubic_pm` se stejným uspořádáním:

| Klíč | Hodnota | Jednotka |
| :--- | :--- | :--- |
| `tsp` | Celkový polétavý prach (TSP) | µg/m³ |
| `pm1_0`, `pm2_5`, `pm10` | Prachové částice PM1,0, PM2,5 a PM10 | µg/m³ |
| `gas_flow` | Průtok plynu, jak ho hlásí senzor | Podle senzoru |

Struktura `weather_station` hlavního firmwaru v hlášení zůstává, bez modulu CHESTER-X0 ale neobsahuje platné hodnoty. V režimu LoRaWAN se hodnoty zařízení Modbus neodesílají.

:::caution

Firmware v4.0.1 agreguje hodnoty zařízení Modbus v každém intervalu agregace dvakrát. Struktury `sensecap` a `cubic_pm` proto mají za každý interval dvě položky, druhou bez hodnot (`null`), a dekódované časové značky je rozprostřou na dvojnásobek skutečné doby.

:::

## Sestavení firmwaru {#firmware-build}

- **Firmware:** [hio-chester-meteo-m:v4.0.1](https://firmware.hardwario.com/chester/0b1d815d983b40118c26ee0e425e9f76), sestaveno 2026-09-07 ze SDK v4.0.1
- **Identifikátor:** `0b1d815d983b40118c26ee0e425e9f76`, slouží k aktualizaci firmwaru přes HARDWARIO Cloud ([postup](/cloud/firmware))
- **Soubor HEX** pro nahrání přes J-Link: [stáhnout](https://firmware.hardwario.com/chester/0b1d815d983b40118c26ee0e425e9f76/hex), SHA256 `35c4e7659dd8bf5ca27d85afdfa5c3268a3ae4ea9c6c543d33d4e8cd927e7416`
- **Soubor BIN** pro aktualizaci přes Bluetooth v aplikaci HARDWARIO Manager: [stáhnout](https://firmware.hardwario.com/chester/0b1d815d983b40118c26ee0e425e9f76/bin), SHA256 `05d351f779bba72446641b0a67da55b8a792187bf813769ddbe777f66377a495`
- **Sestavení ze SDK:** `west chester-update meteo --variant "CHESTER Meteo M"`

Postup nahrání popisuje článek [**Nahrání firmwaru**](../../firmware-flashing/index.md).
