---
slug: hardware-description
title: Popis hardwaru
description: "STICKER je kompaktní IoT zařízení postavené na System-on-Chip STM32WL s integrovaným radiem LoRa a jádrem ARM Cortex-M4F."
---
import Image from '@theme/IdealImage';

# Popis hardwaru {#hardware-description}

STICKER je kompaktní IoT zařízení postavené na **System-on-Chip STM32WL** s integrovaným **radiem LoRa** a jádrem ARM Cortex-M4F.  
Napájejí ho dvě baterie AA, přičemž zařízení monitoruje napětí baterií a hospodárně řídí napájení (boost převodník a LDO).

Zařízení obsahuje **NFC paměť a anténu** pro snadnou konfiguraci, a to i bez napájení (sběr energie).

---

## Senzory a periferie {#sensors--peripherals}

### Vestavěné senzory {#built-in-sensors}

Podle konkrétní osazovací varianty obsahuje zařízení STICKER:
- **Teplota a vlhkost:** Senzor Sensirion SHT43 pro velmi přesné měření prostředí.
- **Intenzita osvětlení:** Senzor okolního osvětlení Texas Instruments OPT3001.
- **Atmosférický tlak:** Senzor tlaku NXP MPL3115A2.
- **Pohyb PIR:** Pasivní infračervený senzor pohybu Excelitas PYD1698 pro detekci přítomnosti (až 5 m, $\ge 50^\circ$).
- **Tříosý akcelerometr:** Akcelerometr STMicroelectronics LIS2DH12 pro sledování náklonu, vibrací a orientace.
- **Detekce otevření dveří:** Dva Hallovy senzory Allegro A1266.

### Fyzická rozhraní a externí konektivita {#physical-interfaces--external-connectivity}

- **Rozhraní SWD:** Fyzické programovací pady SWD pro nahrávání a ladění firmwaru přes J-Link (`make flash`). Pro nahrání image jsou nutné, protože firmware záměrně nemá bootloader ani aktualizace na dálku.
- **Master sběrnice 1-Wire:** Vyhrazené rozhraní 1-Wire s podporou externích digitálních teplotních sond (například Dallas DS18B20) a senzorů HARDWARIO Machine Probe.
- **Rozhraní S0:** Pulzní vstup kompatibilní se standardními výstupy S0 elektroměrů, plynoměrů a vodoměrů.
- **Měření napětí a průmyslové logické vstupy:** Podporuje až 2 digitální vstupy přijímající průmyslovou logiku až 30 V DC pro přímé napojení na PLC nebo sledování stavu stroje.

Stav zařízení signalizuje **vícebarevná LED (R/G/Y)** - podrobnosti viz [**Signalizace LED**](#led-indication) - a bezdrátovou komunikaci obstarává **vnitřní anténa 868/915 MHz**.

---

## Blokové schéma {#block-diagram}

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../sticker/images/block-diagram-sticker.png')} alt="Blokové schéma zařízení STICKER: LoRa SoC STM32WLE5CC se senzory, NFC pamětí, napájecí cestou pro 2x AA a stavovou LED" />
      </div>
    </div>
    <div class="col col--24">
    </div>
  </div>
</div>
<br />

---

### Architektura konfigurace přes NFC {#nfc-configuration-architecture}

![STICKER - architektura konfigurace přes NFC](../../../../sticker/images/sticker-nfc.drawio.png)

---

## Signalizace LED {#led-indication}

Zařízení STICKER má jednu stavovou LED se třemi nezávisle řízenými kanály - **červeným**, **zeleným** a **žlutým**. Firmware rozsvěcí červený a zelený kanál i společně, čímž vzniká **oranžová**, kterou vyhrazuje pro servisní režimy. LED je jediná zpětná vazba, kterou zařízení lokálně dává, takže tyto vzory jsou nejrychlejší způsob, jak zjistit, co jednotka dělá, ještě než se objeví v síti.

:::note
Vzory a časování níže platí pro **firmware v1.4.0**. Většina stavových bliknutí je záměrně velmi krátká - 5 až 10 ms - kvůli šetření baterie. Čekejte krátký záblesk, ne pohodlné bliknutí.
:::

### Startovní sekvence {#boot-sequence}

Každé zapnutí spustí pevný karusel, který zároveň potvrdí funkčnost všech tří kanálů:

| Krok | Barva | Doba |
|---|---|---|
| 1 | Červená | 0,5 s |
| 2 | *(zhasnuto)* | 0,25 s |
| 3 | Žlutá | 0,5 s |
| 4 | *(zhasnuto)* | 0,25 s |
| 5 | Zelená | 1,5 s |

Karusel trvá asi 5 sekund. Pokud ho uvidíte nečekaně, zařízení se restartovalo.

### Stavový heartbeat {#status-heartbeat}

Za provozu zařízení signalizuje svůj stav každé **3 sekundy**. Zobrazuje se vždy jen jeden vzor - firmware kontroluje podmínky níže v uvedeném pořadí a **vyhrává první shoda**, takže závažnější stav vždy zakryje ten méně závažný:

| Priorita | Stav zařízení | Vzor LED |
|---|---|---|
| 1 | Probíhá výměna přes NFC | LED přebírají [vzory NFC](#nfc-interaction) níže |
| 2 | **Konfiguraci se nepodařilo načíst** - uložené nastavení je poškozené | Červená a žlutá střídavě, dvakrát, po ~60 ms |
| 3 | **Připojování nebo opětovné připojování** k síti LoRaWAN | Jedno žluté bliknutí, pak ~200 ms poté jedno červené |
| 4 | **Degradované spojení** - kontroly spojení selhávají, ale session stále žije | Dvě žlutá bliknutí ~200 ms po sobě |
| 5 | **Radio vypnuté** nastavením `radio-mode` | Jedno žluté bliknutí |
| 6 | **Je aktivní alarm** | Jedno červené bliknutí |
| 7 | Normální provoz | Jedno zelené bliknutí |

Tři žluté stavy tvoří záměrnou stupnici závažnosti, takže vážnost síťového problému poznáte už z počtu bliknutí:

**radio vypnuté (1× žlutá)** → **degradované spojení (2× žlutá)** → **připojování / opětovné připojování (žlutá + červená)**

Priorita 2 stojí nad všemi: zařízení blikající červeno-žlutě přišlo o uloženou identitu a zprovoznění a běží na výrobních výchozích hodnotách. Tam je potřeba technik, ne kontrola sítě.

:::note
Zařízení bez zeleného bliknutí nemusí být vadné - klidně jen zobrazuje něco s vyšší prioritou. Alarmy se navíc vyhodnocují i tehdy, když LED patří vzoru s vyšší prioritou. Skryté je jen červené bliknutí alarmu; sám alarm se stále vyvolá a stále odešle svůj uplink.
:::

Debug buildy firmwaru nahrazují jedno zelené bliknutí zeleným následovaným žlutým, což je rychlý způsob, jak poznat debug jednotku od release jednotky.

### Interakce s NFC {#nfc-interaction}

Dokud je telefon přiložený k zařízení, LED sleduje výměnu krok za krokem:

| Co se děje | LED |
|---|---|
| Telefon detekován v poli NFC | Zelená, svítí |
| Zpracovává se příkaz | Rychlé zelené blikání (~90 ms) |
| **Příkaz odmítnut** - špatný klíč nebo token, opakovaná či poškozená žádost | Rychlé červené blikání po 2 s, pak zhasne |
| Odpověď zapsána, čeká se, než ji telefon přečte | Zelená **a** žlutá, svítí |
| Výměna dokončena, telefon odebrán | Zhasnuto |
| Konfigurace úspěšně aplikována | Deset zelených bliknutí, 100 ms svítí / 100 ms zhasnuto |

Červené bliknutí při odmítnutí se vyplatí znát: bez něj vypadá odmítnutý příkaz pro toho, kdo drží telefon, úplně stejně jako úspěšný.

### Aktivace vstupu {#input-activation}

Na jednotkách s nakonfigurovanými Hallovými senzory nebo externími vstupy potvrzuje LED každou změnu vstupu. **Pořadí barev kóduje směr**, takže aktivaci nelze zaměnit s uvolněním:

| Událost | Vzor |
|---|---|
| Vstup se stane aktivním | Zelená, pak oranžová - po 50 ms |
| Vstup se vrátí do neaktivního stavu | Oranžová, pak zelená - po 50 ms |

Opakované změny jsou omezené na jednu signalizaci za 500 ms.

:::warning Pouze pomůcka při uvádění do provozu
Tato signalizace se **sama vypne hodinu po zapnutí**. Doba se počítá od startu, ne od poslední události, protože po instalaci už blikání není žádoucí. Pokud ho potřebujete při testování zpět, zařízení vypněte a zapněte.
:::

PIR a akcelerometr jsou momentové senzory - hlásí vždy jen aktivaci - takže na těchto vstupech uvidíte pouze sekvenci zelená-pak-oranžová.

### Kalibrační režim {#calibration-mode}

| Stav | Vzor |
|---|---|
| Vstup do kalibrace | Pět rychlých oranžových bliknutí, 100 ms svítí / 100 ms zhasnuto |
| Kalibrace běží | Jedno oranžové bliknutí každou sekundu |

Do kalibrace se vstupuje přiložením magnetu k **oběma** Hallovým senzorům do **30 minut** od zapnutí. Běží **120 minut** a pak se zařízení samo restartuje. Pro oba stavy se používá oranžová, aby se kalibrace nikdy nespletla s některým ze žlutých síťových varování.

### Hluboký spánek {#deep-sleep}

Když zařízení uspíte do hlubokého spánku, všechny tři kanály se vypnou. Úplně zhasnutá LED na spícím zařízení je normální a není to závada.

### Testování LED {#testing-the-led}

LED lze řídit přímo z vývojářské konzole příkazy `ats led` - hodí se to při kontrole podezřelé jednotky. Viz [**Diagnostika**](developer-access/diagnostics.md).

---

## Přehled {#overview}

#### STICKER Clime - krabička, základní deska a držák baterií {#sticker-clime---enclosure-mainboard-and-battery-holder}

![STICKER Clime](../../../../sticker/images/sticker-clime-overview.png)

#### STICKER Input - krabička, základní deska a držák baterií {#sticker-input---enclosure-mainboard-and-battery-holder}

![STICKER Input](../../../../sticker/images/sticker-input-overview.png)

#### STICKER Motion - krabička, základní deska a držák baterií {#sticker-motion---enclosure-mainboard-and-battery-holder}

![STICKER Motion](../../../../sticker/images/sticker-motion-overview.png)

---

## Schémata hardwaru {#hardware-schematics}

### Napájení {#power}

**[Stáhnout schéma napájení (PDF)](../../../../sticker/hardware-diagrams/power.pdf)**
![STICKER - napájení](../../../../sticker/images/power.png)

### Anténa {#antenna}

**[Stáhnout schéma antény (PDF)](../../../../sticker/hardware-diagrams/antenna.pdf)**
![STICKER - anténa](../../../../sticker/images/antenna.png)

### MCU {#mcu}

**[Stáhnout schéma MCU (PDF)](../../../../sticker/hardware-diagrams/mcu.pdf)**
![STICKER - MCU](../../../../sticker/images/mcu.png)

### Senzory {#sensors}

**[Stáhnout schéma senzorů (PDF)](../../../../sticker/hardware-diagrams/sensors.pdf)**
![STICKER - senzory](../../../../sticker/images/sensors.png)

### NFC {#nfc}

**[Stáhnout schéma NFC (PDF)](../../../../sticker/hardware-diagrams/nfc.pdf)**
![STICKER - NFC](../../../../sticker/images/nfc.png)

---

## Technické parametry {#technical-specification}

| **Kategorie** | **Parametr** | **Hodnota** |
|-------------------|---------------------------|------------------------------------|
| **Konstrukce** | Materiál krabičky        | ABS                                |
|                   | Rozměry                 | 91 × 36.5 × 33.3 mm                |
| **Napájení** | Nominální napětí článku      | 1.5 V                              |
|                   | Nominální kapacita baterií  | 3000 mAh                           |
|                   | Rozsah provozního napětí   | 1.8 V až 3.6 V                     |
|                   | Klidová spotřeba    | < 80 µA                            |
|                   | Špičková spotřeba    | < 100 mA                           |
| **Prostředí** | Provozní teplota     | -30 °C až +70 °C                   |
|                   | Skladovací teplota       | -30 °C až +70 °C                   |
|                   | Krytí krabičky      | IP40                               |
| **Senzory** | Integrovaný teploměr – rozsah měření   | -20 °C až +60 °C     |
|                   | Integrovaný teploměr – přesnost měření| ±0.2 °C (0 °C až 65 °C) |
|                   | Integrovaný vlhkoměr – rozsah měření    | 0 % až 100 %           |
|                   | Integrovaný vlhkoměr – přesnost měření | ±2 % (od 10 % do 90 %) |
|                   | PIR – dosah detekce     | 5 m                                |
|                   | PIR – zorný úhel       | ≥ 50°                              |

![STICKER - katalog](../../../../sticker/images/sticker.png)
