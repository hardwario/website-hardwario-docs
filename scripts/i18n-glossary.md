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

Tenhle seznam platí **i pro anglické zdroje**. `Wi-Fi` a `RS-485` se dřív psaly
v angličtině jinak než v češtině; sjednoceno 2026-09-07, aby překlad nemusel
opravovat, co je špatně už v předloze. Když narazíš na porušení v anglické
stránce, oprav napřed ji, pak české zrcadlo — jinak to `npm run verify:i18n`
ohlásí jako odchylku překladu.

Výjimka: doslovné výpisy, potisky desek a popisky v cizím rozhraní zůstávají tak,
jak je zařízení nebo aplikace opravdu zobrazuje (`WiFi:` ve výpisu GAUGERu,
`1-WIRE` na svorkovnici CHESTER-C1).

## Popisky rozhraní aplikací

Mobilní ani cloudová aplikace nemá českou lokalizaci, takže **popisky, které
uživatel vidí na obrazovce, se nepřekládají** — čtenář musí v návodu najít přesně
to, co má v telefonu. Píšou se tučně a v původním znění: **Saved STICKERs**,
**Templates**, **Device info**, **Send Test Mail**.

Neplatí to pro *názvy sekcí dokumentace*: ty přeložené jsou (kategorie
`Administration` je v české navigaci **Správa**), takže odkaz do nich musí
používat český název.

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
| shell command | příkaz shellu |
| video tutorial | videonávod |
| SDK library | knihovna SDK |
| "How To:" (prefix titulku) | „Jak na:" |
| managed service | spravovaná služba |
| Space (HARDWARIO Cloud) | prostor |
| Tags / Labels (HARDWARIO Cloud) | tagy / labely (dvě různé funkce, nezaměňovat) |
| desktop programming | programování na počítači |
| over the air | bezdrátově |
| click | kliknutí (na mobilu „klepnutí") |
| thermometer | teploměr |
| illuminance | osvětlenost (ne „osvětlení") |
| radio | rádio (s délkou) |
| session | relace |
| build (podstatné jméno) | sestavení; „build" jen tam, kde je to název příkazu |
| callback | callback |
| positive rail | kladná větev |
| store (odkaz na e-shop) | obchod |

## Styl

- Vykat, ale co nejméně: preferuj neosobní tvar („Připojte kabel", ne „Měl byste
  připojit kabel"). Návody píšeme v rozkazovacím způsobu.
- Nadpisy bez tečky na konci.
- Desetinná čárka v českém textu **i v tabulkách a seznamech technických
  parametrů** („±0,3 °C", „2,5 m"). Tečka zůstává jen tam, kde je hodnota částí
  kódu: ve výpisech, konfiguračních klíčích, tabulkách registrů a v číslech
  verzí a revizí desek (`R1.1`, `v1.2.1`).
- Uvozovky jsou české: `„…“`. Nikdy nezavírej rovnou uvozovkou `"`.
- Přívlastek se v češtině klade za jméno: „senzory LoRaWAN", ne „LoRaWAN
  senzory"; „příkazy AT", ne „AT příkazy"; „konzole AT", ne „AT konzole".
- Vyhýbej se kalku „Pro + podstatné jméno slovesné". Piš „Chcete-li konzoli
  připojit, …" nebo rovnou rozkazem „Konzoli připojíte pomocí…".
- Jednotky se od čísla oddělují nedělitelnou mezerou tam, kde to originál dělá
  taky; jinak se formát nemění.
