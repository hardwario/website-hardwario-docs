---
slug: first-steps
title: Rychlý průvodce
description: "Rychlý průvodce zařízením STICKER: zapnutí, zprovoznění přes NFC aplikací HARDWARIO Manager a připojení k ChirpStacku, The Things Stacku nebo jinému serveru LoRaWAN."
title_meta: "Rychlý průvodce (STICKER)"
---
import Image from '@theme/IdealImage';

# Rychlý průvodce zařízením STICKER {#sticker-quick-start-guide}

Vítejte! Tato stránka vám pomůže zařízení STICKER **zapnout, zprovoznit a aktivovat** a připojit ho k vámi zvolenému síťovému serveru LoRaWAN (ChirpStack, The Things Stack nebo vlastní backend).

---

## Než začnete {#before-you-start}

#### Co je STICKER {#what-sticker-is}

**STICKER** je otevřená IoT platforma založená na SoC STM32WL s integrovanou konektivitou LoRaWAN a softwarově volitelným proprietárním režimem **LoRa P2P**. Jde o kompaktní senzorovou platformu na baterie postavenou na Zephyr RTOS, na které běží katalogové aplikace jako STICKER Clime, Input a Motion.

Technické detaily najdete v [**popisu hardwaru**](/sticker/hardware-description/).

#### Co budete potřebovat {#you-will-need}
- **Zařízení STICKER** (varianta Clime / Input / Motion)
- **2× baterii AA** (alkalickou nebo lithiovou, 1,5 V)
- **Bránu LoRaWAN** v dosahu
- **Síťový server LoRaWAN** (ChirpStack / TTS / vlastní LNS)
- Telefon s **NFC** a nainstalovanou aplikací [**HARDWARIO Manager**](/sticker/hardwario-manager/)

#### Užitečné odkazy {#useful-links}
- Průvodce mobilní aplikací pro NFC: [**HARDWARIO Manager**](/sticker/hardwario-manager/)
- Dekodér STICKER: [ttn.js na GitHubu](https://github.com/hardwario/sticker-firmware/blob/main/app/decoder/ttn.js)
- Rozcestník datasheetů HARDWARIO: [hardwario.com/resources/datasheets](https://www.hardwario.com/resources/datasheets)

---

## Krok 1: Určete variantu svého zařízení STICKER {#step-1-identify-your-sticker-variant}

Zařízení STICKER přichází s předinstalovanou jednou z katalogových aplikací:

- **STICKER Clime**: Monitorování teploty, vlhkosti, osvětlení a barometrického tlaku.  
  [Dokumentace →](/sticker/catalog-applications/sticker-clime/)
- **STICKER Input**: Externí senzory (1-Wire, Machine Probe) a průmyslové vstupy (pulzy S0, logika 0–30 V).  
  [Dokumentace →](/sticker/catalog-applications/sticker-input/)
- **STICKER Motion**: Detekce pohybu PIR s extrémně nízkou spotřebou a sledování zrychlení ve třech osách.  
  [Dokumentace →](/sticker/catalog-applications/sticker-motion/)

---

## Krok 2: Zapnutí a výchozí stav z výroby (v1.4.0+) {#step-2-power-up--understand-factory-defaults-v140}

1. **Otevřete krabičku** a vložte dvě baterie AA podle značek polarity.
2. Sledujte **startovní sekvenci LED**: červená (0,5 s) → žlutá (0,5 s) → zelená (1,5 s).

:::info Výchozí stav z výroby: radio vypnuté
Od firmwaru **v1.4.0** se zařízení STICKER dodává s vypnutým radiem (`radio-mode` vypnutý), aby se baterie nevybíjela během přepravy. Zařízení se po vložení baterií **nepokusí** připojit k LoRaWAN. Mlčí, dokud ho v kroku 3 neaktivujete přes NFC.
:::

3. **Signalizace stavovou LED:** Po startu bude LED blikat **1× žlutě každé 3 sekundy**, což znamená, že zařízení běží normálně, ale radio je vypnuté.

---

## Krok 3: Konfigurace a aktivace přes NFC {#step-3-configure--activate-via-nfc}

Zařízení STICKER se konfiguruje **přiložením telefonu**, bez kabelu, bez
programátoru a bez softwaru na počítači. Funguje to i **bez vložených baterií**:
pole NFC zařízení napájí dost dlouho na to, aby si nastavení uložilo.

:::tip S aplikací začínáte?
Začněte [**rychlým průvodcem HARDWARIO Manager**](/apps/hardwario-manager/first-steps), který popisuje instalaci aplikace, zapnutí NFC a první přiložení.
:::

1. **Nainstalujte aplikaci** a zapněte **NFC**. STICKER se konfiguruje z telefonu s Androidem.
2. **Přidejte zařízení** mezi uložené STICKERy, aby aplikace měla jeho **secret key**, protože STICKER odpovídá jen šifrovaným kanálem.
3. **Přečtěte klíče.** Otevřete **STICKER → LoRaWAN keys** a přiložte telefon k zařízení. Zapište si **DevEUI**, **JoinEUI (AppEUI)** a **AppKey** pro OTAA, nebo **DevAddr** a klíče session pro ABP.
4. **Zapište konfiguraci.** Otevřete **STICKER → Configuration**, v sekci **LoRaWAN** nastavte region, režim aktivace a klíče, přepněte **`radio-mode`** na LoRaWAN a dalším přiložením konfiguraci zapište zpět.

### Kde je který krok popsaný {#where-each-step-is-documented}

| Co děláte | Návod |
|---|---|
| Instalace aplikace a zapnutí NFC | [**Instalace aplikace**](/apps/hardwario-manager/install) |
| Správné držení telefonu (a krok navíc se zvednutím a druhým přiložením na iOS) | [**STICKER přes NFC**](/apps/hardwario-manager/sticker) |
| Přidání zařízení a jeho secret key | [**Uložené STICKERy**](/apps/hardwario-manager/sticker/saved-stickers) |
| Čtení informací o zařízení a klíčů LoRaWAN | [**Informace o zařízení a klíče LoRaWAN**](/apps/hardwario-manager/sticker/device-info) |
| Čtení, úprava a zápis konfigurace | [**Konfigurace**](/apps/hardwario-manager/sticker/configuration) |
| Konfigurace zařízení bez vložených baterií | [**Konfigurace vypnutého zařízení**](/apps/hardwario-manager/sticker/offline-configuration) |
| Stejné nastavení pro celou dávku | [**Šablony**](/apps/hardwario-manager/sticker/templates) |

### Co vám LED řekne po přiložení {#what-the-led-tells-you-after-the-tap}

| LED | Význam | Co dělat |
|---|---|---|
| **Deset zelených bliknutí** | Konfigurace byla aplikována | Nic. Zápis se povedl |
| **Rychlé červené blikání zhruba 2 sekundy** | **Přiložení bylo odmítnuto.** Aplikace použila špatný **secret key** nebo token, nebo byl požadavek zopakovaný či poškozený. Do zařízení se **nic nezapsalo** | Zkontrolujte, že je zařízení uložené se správným secret key v [**Uložených STICKERech**](/apps/hardwario-manager/sticker/saved-stickers), a přiložte telefon znovu |
| Heartbeat se změní z **1× žluté** na **žlutou + červenou** | Radio je zapnuté a zařízení se připojuje | Počkejte. Připojení může vyžadovat několik pokusů |
| Heartbeat se ustálí na **1× zelené** | Připojeno. Zařízení odesílá payload **Device Info on Join** | Nic. Zařízení je v provozu |

---

## Krok 4: Registrace na síťovém serveru LoRaWAN {#step-4-register-on-your-lorawan-network-server}

### ChirpStack v4 {#chirpstack-v4}
1. Zaregistrujte zařízení pomocí DevEUI, JoinEUI a AppKey získaných z aplikace [**HARDWARIO Manager**](/sticker/hardwario-manager/).
2. Přiřaďte dekodér payloadu STICKER.
3. Postupujte podle úplného průvodce: [integrace s LNS ChirpStack](/sticker/connectivity/lorawan-chirpstack/).

### The Things Stack (TTS / TTN) {#the-things-stack-tts--ttn}
1. Přidejte nové koncové zařízení pomocí klíčů OTAA nebo ABP získaných z aplikace [**HARDWARIO Manager**](/sticker/hardwario-manager/).
2. Naimportujte dekodér payloadu.
3. Postupujte podle úplného průvodce: [integrace s The Things Stack](/sticker/connectivity/lorawan-tts/).

---

## Krok 5: Kontrola po uvedení do provozu {#step-5-post-commissioning-verification}

Po registraci a připojení:

- **Zkontrolujte uplinky:** Ověřte, že na dashboard vašeho LNS dorazil počáteční uplink **Device Info** (verze firmwaru, stav baterie, příčina resetu) i pravidelné pakety s daty ze senzorů.
- **Zkontrolujte stav LED:** Jedno zelené bliknutí každé 3 sekundy potvrzuje kvalitní spojení se sítí a bezproblémový provoz.
- **Upravte intervaly:** Vzorkovací a uplinkové intervaly dolaďte přes NFC v aplikaci [**HARDWARIO Manager**](/sticker/hardwario-manager/) nebo downlink příkazy LoRaWAN (fPort 85).

:::info Zapojení vstupů STICKER Input
Pokud používáte **STICKER Input**, projděte si před připojením externích sond pokyny ke svorkovnici a DIP přepínačům: [průvodce zapojením STICKER Input](sticker-input-wiring/index.md).
:::

---

## Kontrolní seznam při potížích {#troubleshooting-checklist}

LED je jediná zpětná vazba, kterou STICKER na místě dává, takže je nejrychlejší
cestou, jak zjistit, co jednotka dělá. Tabulky níže uvádějí všechny vzory ve
**firmwaru v1.4.0**. Většina bliknutí je kvůli úspoře baterie záměrně velmi krátká
(5–10 ms), čekejte tedy spíš záblesk než pohodlné bliknutí. Úplnou referenci
s časováním najdete v [**signalizaci LED**](/sticker/hardware-description/#led-indication).

### Stavový heartbeat – jeden vzor každé 3 sekundy {#status-heartbeat--one-pattern-every-3-seconds}

Vždy se ukáže jen jeden vzor. Firmware tyto stavy kontroluje v uvedeném pořadí a
**první shoda vyhrává**, takže závažnější stav překryje méně závažný.

| Vzor LED | Co znamená | Co dělat |
|---|---|---|
| **1× zelená** | Normální provoz, připojeno a v pořádku | Nic. To je cílový stav |
| **Zelená, pak žlutá** | Totéž, ale jednotka běží na **debugovacím** sestavení firmwaru | Na vývojových jednotkách očekávané; pro nasazení nahrajte release sestavení |
| **1× červená** | **Je aktivní alarm** | Přečtěte aktivní alarmy v [**Informacích o zařízení**](/apps/hardwario-manager/sticker/device-info) a projděte [**pravidla alarmů**](developer-access/alarm-rules.md) |
| **1× žlutá** | **Radio vypnuté** parametrem `radio-mode`. Výchozí stav z výroby | Zapište konfiguraci LoRaWAN se zapnutým radiem (krok 3) |
| **2× žlutá**, ~200 ms od sebe | **Zhoršené spojení**. Kontroly spojení selhávají, ale session stále žije | Zkontrolujte pokrytí bránou a umístění antény; jakmile se spojení vrátí, zařízení se zotaví samo |
| **1× žlutá, pak 1× červená** ~200 ms poté | **Připojuje se nebo se připojuje znovu** a od sítě nedostává odpověď | Zkontrolujte blízkost brány, frekvenční plán / region a shodu DevEUI, JoinEUI a AppKey se síťovým serverem |
| **Červená a žlutá střídavě, dvakrát** | **Uloženou konfiguraci nešlo načíst**. Identita i zprovoznění jsou pryč a zařízení běží na výchozích hodnotách z výroby | Zapište celou konfiguraci znovu přes NFC aplikací [**HARDWARIO Manager**](/apps/hardwario-manager/sticker/configuration); pokud se stav vrátí, jednotka potřebuje servis |
| **Vůbec nic** | Zařízení je buď v **hlubokém spánku** (všechny kanály vypnuté. Očekávané, ne závada), nebo nemá napájení | Pokud nespí, zkontrolujte polaritu baterií a vyměňte je |

### Během přiložení NFC {#during-an-nfc-tap}

Když je telefon přiložený k zařízení, LED krok za krokem sleduje průběh výměny
dat.

| LED | Co znamená | Co dělat |
|---|---|---|
| **Zelená, svítí** | Telefon zachycen v poli NFC | Nehýbejte telefonem |
| **Rychlé zelené blikání** (~90 ms) | Příkaz se zpracovává | Nehýbejte telefonem |
| **Rychlé červené blikání 2 s, pak zhasne** | **Příkaz odmítnut**: špatný secret key nebo vendor token, zopakovaný požadavek, nebo poškozený požadavek. Do zařízení se **nic nezapsalo** | Zkontrolujte, že je zařízení uložené se správným secret key, viz [**Uložené STICKERy**](/apps/hardwario-manager/sticker/saved-stickers), a přiložte telefon znovu |
| **Zelená a žlutá, svítí** | Odpověď je zapsaná a zařízení čeká, až si ji telefon přečte | Nehýbejte telefonem; na **iOS** telefon zvedněte a přiložte znovu, když vás k tomu dialog skenování vyzve |
| **Deset zelených bliknutí**, 100 ms svítí / 100 ms nesvítí | Konfigurace byla úspěšně aplikována | Nic |
| **Zhasnuto** | Výměna skončila, telefon oddálen | Nic |

Červené odmítavé bliknutí stojí za zapamatování: bez něj by odmítnutý příkaz vypadal
pro toho, kdo drží telefon, úplně stejně jako úspěšný. **Červené bliknutí během
přiložení znamená vždy, že se nic nezapsalo.**

### Start, vstupy a kalibrace {#boot-inputs-and-calibration}

| Kdy | Vzor LED | Co znamená |
|---|---|---|
| Zapnutí | **Červená 0,5 s → žlutá 0,5 s → zelená 1,5 s** (karusel ~5 s) | Normální start; zároveň prokazuje, že fungují všechny tři kanály. Nečekaný výskyt znamená, že se zařízení restartovalo |
| Vstup se aktivuje | **Zelená, pak oranžová**. Každá 50 ms | Sepnul vstup na STICKER Input nebo Hallův senzor |
| Vstup se vrátí do klidu | **Oranžová, pak zelená**. Každá 50 ms | Tentýž vstup zase rozepnul |
| Žádná signalizace vstupů | *(zhasnuto)* | Tato pomůcka pro uvádění do provozu se **hodinu po zapnutí sama vypne**; pro další testování zařízení odpojte a znovu připojte k napájení |
| Vstup do kalibrace | **Pět rychlých oranžových bliknutí** | Spouští se režim kalibrace |
| Probíhající kalibrace | **1× oranžová každou sekundu** | Běží 120 minut, pak se zařízení samo restartuje |

### Potíže, které LED neukáže {#problems-the-led-does-not-show}

| Příznak | Co zkontrolovat |
|---|---|
| **Na síťovém serveru nepřicházejí uplinky**, ale heartbeat je 1× zelená | Zařízení je připojené a běží. Zkontrolujte, že uplink dorazí až do vaší aplikace a že je v [ChirpStacku](connectivity/lorawan-chirpstack.md) nebo [The Things Stacku](connectivity/lorawan-tts.md) přiřazený dekodér payloadu |
| **Uplinky přicházejí, ale dekódují se jako surové bajty** | Chybí kodek `ttn.js`, nebo je přiřazený špatnému směru, viz průvodce nastavením vašeho síťového serveru |
| **Telefon zařízení nikdy nepřečte** | Pomalu pohybujte telefonem okolo jeho antény NFC (obvykle u horní části zadní strany) a ověřte, že je NFC zapnuté, viz [**Instalace aplikace**](/apps/hardwario-manager/install) |
| **Uplinky jsou příliš časté nebo příliš řídké** | Upravte intervaly vzorkování a odesílání přes NFC, nebo [**downlink příkazem**](connectivity/downlink-commands.md) na fPort 85 |
