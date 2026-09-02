# Překladový glosář (en → cs)

Tenhle soubor je jediné místo, kde se ladí terminologie. Překlady se dělají
**ručně s Claudem** — než začneš překládat stránku, přečti si tento glosář a drž
se ho. Automatický překlad přes API se nepoužívá.

Hotový překlad zkontroluj `npm run verify:i18n`: porovná každou českou stránku
s její anglickou předlohou a ohlásí strukturální rozdíly (ztracený řádek
tabulky, přeložený blok kódu, změněný slug, chybějící obrázek). API nepotřebuje.

## Nikdy nepřekládat ani neskloňovat

Názvy produktů a značek se píší přesně takto, vždy velkými písmeny a **bez
českých koncovek**. Když si věta o skloňování říká, vlož před název obecné
podstatné jméno (zařízení, jednotka, modul, senzor, brána) a skloňuj to:

| Správně | Špatně |
|---|---|
| konfigurace firmwaru vašeho zařízení STICKER | konfigurace firmwaru vašeho STICKERu |
| připojte se k zařízení CHESTER | připojte se k CHESTERu |
| data ze senzoru STICKER Clime | data ze STICKER Clime**u** |
| v aplikaci HARDWARIO Manager | v HARDWARIO Manageru |
| brána TOWER odešle | TOWER odešle |

Tohle platí pro všechny názvy níže, v každém pádu, i uvnitř tabulek a
popisků obrázků:

HARDWARIO, CHESTER, STICKER, TOWER, EMBER, FIBER, GAUGER, GLIDER, TAPPER,
HARDWARIO Cloud, HARDWARIO Manager, Milesight, RAKwireless, OnLogic,
Raspberry Pi, MikroTik, Carlo Gavazzi, Nexelec, ChirpStack, ThingsBoard,
The Things Stack, Zephyr, nRF Connect SDK.

## Přesný tvar zápisu

| Správně | Špatně |
|---|---|
| `wM-Bus` | wM-BUS, WM-Bus, wmbus |
| `LoRaWAN` | Lorawan, LORAWAN |
| `NB-IoT` | NB-IOT, nbiot |
| `LTE-M` | LTE M |
| `Wi-Fi` | WiFi, wifi |
| `M-Bus` | MBus |
| `Modbus RTU` | MODBUS RTU |
| `RS-485` | RS485 |
| `1-Wire` | OneWire |

## Ustálené překlady

| en | cs |
|---|---|
| uplink | uplink (nepřekládat) |
| downlink | downlink (nepřekládat) |
| payload | payload (nepřekládat) |
| gateway | brána |
| firmware | firmware |
| firmware update / flashing | aktualizace firmwaru / nahrání firmwaru |
| extension module | rozšiřující modul |
| catalog application | katalogová aplikace |
| device | zařízení |
| sensor | senzor |
| enclosure | krabička |
| terminal block | svorkovnice |
| jumper | propojka |
| power supply | napájení |
| battery pack | bateriový pack |
| provisioning | zprovoznění |
| commissioning | uvedení do provozu |
| deployment | nasazení |
| dashboard | dashboard |
| troubleshooting | řešení problémů |
| getting started / first steps | první kroky |
| quick start guide | rychlý průvodce |
| ordering codes | objednací kódy |
| changelog | seznam změn |
| release notes | poznámky k vydání |
| default | výchozí |
| enabled / disabled | zapnuto / vypnuto |
| supported | podporováno |
| see the section below | viz níže |

## Styl

- Vykat, ale co nejméně: preferuj neosobní tvar („Připojte kabel", ne „Měl byste
  připojit kabel"). Návody píšeme v rozkazovacím způsobu.
- Nadpisy bez tečky na konci.
- Desetinná čárka v českém textu, ale **v hodnotách z kódu, tabulek registrů
  a technických parametrů nechat tečku** tak, jak je v originále.
- Jednotky se od čísla oddělují nedělitelnou mezerou tam, kde to originál dělá
  taky; jinak se formát nemění.
