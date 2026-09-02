---
slug: milesight-ft101
title: FT101
description: "Milesight FT101 je přenosné testovací zařízení pro sítě LoRaWAN® určené pro posouzení a optimalizaci signálu. Obsahuje osmijádrový procesor se systémem Android 12.0, podporuje všechna standardní frekvenční pásma LoRaWAN® a nabízí až 8 hodin…"
---

import Image from '@theme/IdealImage';

# Milesight Field Tester FT101 {#milesight-field-tester-ft101}

Milesight FT101 je **přenosné testovací zařízení pro sítě LoRaWAN®** určené pro **posouzení a optimalizaci signálu**. Obsahuje **osmijádrový procesor se systémem Android 12.0**, podporuje **všechna standardní frekvenční pásma LoRaWAN®** a nabízí **až 8 hodin nepřetržitého provozu**. Zařízení je ideální pro hodnocení kvality sítě, hledání optimálních míst pro nasazení a komplexní **testování sítí LoRaWAN v terénu**.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '500px', height: '500px' }}>
        <Image img={require('../../../../../../smart-devices/milesight/utility/images/ft101.png')} />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Odkazy k integraci {#integration-links}
| Zdroj           | Odkaz                                                                |
|-----------------|----------------------------------------------------------------------|
| HARDWARIO Store | https://www.hardwario.store/p/milesight-ft101                        |
| Oficiální stránka | https://www.milesight.com/product/accessories/ft101                 |
| Uživatelská příručka | https://resource.milesight.com/milesight/iot/document/ft101-user-guide-en.pdf |
| Katalogový list | https://resource.milesight.com/milesight/iot/document/ft101-datasheet-en.pdf |

---

## Získání klíčů zařízení {#retrieving-device-keys}

Nejprve zjistěte jedinečné identifikační údaje vašeho zařízení FT101.

1. Zapněte zařízení a otevřete aplikaci **Field Tester**
2. **Pokud zařízení NENÍ registrováno**: Device EUI a Application Key budou viditelné na domovské obrazovce
3. Přejděte do **Settings > LoRaWAN Settings** a zaznamenejte **Application EUI** (8bitový kód, někdy označovaný jako Join EUI)
4. **Pokud zařízení JE registrováno**: Přejděte do **Settings > Basic Information**, kde najdete:
   - **Device EUI** (8bitový kód)
   - **Application Key** (16bitový šifrovací klíč)

:::info
**AppEUI** (Join EUI) je pevné: **24E124C0002A0001**

**DevEUI** (Device Extended Unique Identifier) je pro každé zařízení jedinečné a najdete ho vytištěné na štítku zařízení.
:::

---

## Konfigurace zařízení {#device-configuration}

Před připojením k síti se ujistěte, že jsou lokální nastavení správná.

1. Přejděte do **LoRaWAN Settings** v aplikaci Field Tester
2. **Frequency Plan**: Zvolte **EU868** (standard pro Evropu / Českou republiku)
3. **Save**: Klepnutím na tlačítko Save uložíte změny

**Další možnosti konfigurace**
- Konfigurovatelný **Tx power**, **interval hlášení** (6-60 s), **frekvenční pásmo** a **spreading factor**
- Režim **Mock sensor** pro simulaci různých zařízení Milesight
- Záznam GPS souřadnic během terénních testů

---

## Registrace v LNS (na straně serveru) {#lns-registration-server-side}

Tento postup probíhá v rozhraní vašeho LoRaWAN network serveru (např. TTN, ChirpStack nebo Milesight IoT Cloud).

### Kroky registrace {#registration-steps}

1. **Vytvořte aplikaci**: Vytvořte složku nebo kontejner (např. „Field_Testing")
2. **Přidejte zařízení**:
   - **Name**: Zadejte označení (např. FT101-Tester)
   - **Device EUI**: Zadejte kód získaný z testeru
3. **Nastavení připojení**:
   - **Join Mode**: Zvolte OTAA
   - **LoRaWAN Version**: Zvolte v1.0.3
   - **Regional Parameters Revision**: Zvolte RP001 Regional Parameters 1.0.3
4. **Vložte klíče**: Vložte App EUI (Join EUI) a App Key z předchozího kroku
5. **Confirmed Data**: Ujistěte se, že je server nastaven na odpovídání na potvrzené uplinky (u standardních LNS zapnuto ve výchozím stavu)
6. **Save**: Potvrďte registraci v LNS

Informace o podporovaných platformách LoRaWAN network serverů najdete zde 👉[**LoRaWAN Network Options**](https://docs.hardwario.com/smart-devices/milesight/utility/index#lorawan-network-options)

---

## Aktivace v síti (Join) {#network-activation-join}

Sledujte **Network Status** v horní liště domovské obrazovky.

- **Úspěch**: Stav se změní na „Connected"
- **Řešení problémů**: Pokud zařízení i po několika minutách stále zobrazuje „Not connected to the gateway":
  - Restartujte aplikaci (stiskem prostředního tlačítka otevřete správce úloh a aplikaci zavřete)
  - **Vzdálenost**: Ověřte v logách LNS, že jste v dosahu brány
  - **Chyby v klíčích**: Zkontrolujte překlepy v App Key (např. záměnu '0' za 'O')
  - **Anténa**: Ujistěte se, že je anténa LoRa pevně dotažená

---

## Základní funkce {#core-functions}

| Funkce | Popis | Cíl |
|----------|-------------|-----------|
| **Testování v reálném čase** | Zobrazuje okamžité hodnoty RSSI a SNR pro vaši aktuální pozici | Okamžité ověření stavu sítě na přesném místě |
| **Vyhodnocení signálu** | Testuje různé kombinace Data Rate (DR) a Spreading Factor (SF7–SF12) | Nalezení nejstabilnějšího nastavení SF/DR pro spolehlivý provoz |
| **Noise Scan** | Skenuje spektrum (863–870 MHz) a měří rušivé rádiové pozadí | Odhalení „rádiového smogu", který by mohl blokovat komunikaci senzorů |
| **Mapování pokrytí** | Mapování kvality signálu s GPS záznamem | Určení optimálních míst pro nasazení |
| **Ping-pong simulace** | Simuluje obousměrnou komunikaci | Testování možností downlinku |

### Testovací funkce {#testing-features}

- Několik testovacích režimů: kvalita signálu (RSSI/SNR), mapování pokrytí, skenování šumu, ping-pong simulace
- Výsledky testů uložené v 64GB interním úložišti
- Export přes USB Type-C nebo microSD kartu (až 256 GB)
- Vložte **microSD kartu** pro automatické ukládání výsledků měření do souboru CSV pro analýzu na PC

---

## Interpretace výsledků Noise Scan {#interpreting-noise-scan-results}

Nižší hodnota RSSI (více záporná) znamená čistší prostředí.

| Hodnota RSSI | Prostředí | Doporučení |
|------------|-------------|----------------|
| -110 dBm až -120 dBm | Výborné / čisté | Ideální pro instalaci brány |
| -90 dBm až -100 dBm | Střední rušení | Funkční, ale dosah může být snížený |
| Vyšší než -85 dBm | Silné rušení | Kritické. Přemístěte bránu nebo změňte frekvenci |

---

## Další možnosti {#additional-capabilities}

Lze nainstalovat **Milesight ToolBox** pro konfiguraci dalších senzorů Milesight přes vestavěnou **NFC čtečku** (ISO/IEC 14443A, čtecí vzdálenost 1-3 cm).

**Úvodní nastavení**
- Připojte se k **Wi-Fi** a zapněte **Location Services** v nastavení Androidu
- Udělte aplikaci Field Tester oprávnění k poloze pro sledování GPS

---

## Konfigurace LoRaWAN {#lorawan-configuration}
| Parametr         | Hodnota                  |
|------------------|--------------------------|
| Verze LoRaWAN    | 1.0.3                    |
| Režim            | OTAA / ABP               |
| Citlivost        | -137 dBm @ 125kHz, SF=12 |
| Tx Power         | 19 dBm (470MHz) / 16 dBm (868MHz) / 22 dBm (915MHz) |

---

## Napájení {#power-supply}
| Typ    | Hodnota                                      |
|--------|----------------------------------------------|
| Napájení | 4.3V/4300mAh dobíjecí lithium-iontová baterie |
| Nabíjení | 5V ⎓ 2A přes USB Type-C                     |
| Aktivní provoz | ~8 hodin nepřetržitého provozu         |
| Pohotovostní režim | >300 hodin (~7 dní)                  |

---

## Technické parametry {#technical-specifications}

| **Parametr** | **Hodnota** |
|---------------|-----------|
| **Bezdrátový přenos** | |
| Protokol | LoRaWAN® V1.0.3 |
| Anténa | 1× 50Ω SMA female konektor (externí) |
| Frekvence | CN470 / IN865 / EU868 / RU864 / US915 / AU915 / KR920 / AS923-1&2&3&4 |
| Tx Power | 19 dBm (470MHz) / 16 dBm (868MHz) / 22 dBm (915MHz) |
| Citlivost | -137 dBm @ 125kHz, SF=12 |
| **Konektivita** | |
| Wi-Fi | 802.11 b/g/n (2.4GHz), 802.11 a/n/ac (5GHz) |
| Bluetooth | 4.0 (BLE) |
| GPS/GNSS | GPS / GLONASS / Beidou / Galileo |
| **Displej a rozhraní** | |
| Obrazovka | 5.72" TP LCD dotyková obrazovka, rozlišení 1440 × 720 |
| Operační systém | Android 12.0 |
| Procesor | Osmijádrový MTK6762, 2 GHz |
| Paměť | 4GB RAM + 64GB ROM |
| Rozšíření úložiště | microSD až 256GB |
| **Konfigurace** | |
| NFC | ISO/IEC 14443A, čtecí vzdálenost 1-3 cm |
| USB | Type-C (USB 3.0) pro napájení a data |
| **Funkce** | |
| Testovací režimy | Kvalita signálu (RSSI/SNR), mapování pokrytí, analýza SF, skenování šumu, ping-pong simulace |
| Geolokace | GPS záznam testovacích bodů |
| Reporty | Komplexní možnosti exportu |
| **Fyzické vlastnosti** | |
| Napájení | 4.3V/4300mAh Li-ion dobíjecí |
| Výdrž baterie | ~8 hodin aktivně / >300 hodin v pohotovosti |
| Provozní teplota | -10°C ~ +50°C |
| Skladovací teplota | -20°C ~ +60°C |
| Vlhkost | 95% RH (nekondenzující) |
| Krytí | IP65 |
| Rozměry | 178 × 83 × 17 mm |
| Hmotnost | 242 g (bez antény) |
| **Certifikace** | CE, FCC, RoHS |
