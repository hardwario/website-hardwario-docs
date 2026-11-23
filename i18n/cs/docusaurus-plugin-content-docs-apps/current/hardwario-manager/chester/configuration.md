---
slug: configuration
title: Konfigurace
description: "Konfigurace zařízení CHESTER v aplikaci HARDWARIO Manager: rychlé nastavení intervalů a LTE nebo LoRaWAN, pokročilá konfigurace všech parametrů a ukládání."
title_meta: "Konfigurace (HARDWARIO Manager pro CHESTER)"
---

# Konfigurace zařízení CHESTER {#configure-a-chester}

Otevřete **CHESTER → Konfigurace**. Aplikace přečte konfiguraci zařízení
(**Čtení konfigurace…**) a otevře **Rychlé nastavení**, formulář s průvodcem pro
nastavení, která potřebuje většina nasazení. **Pokročilá konfigurace** ukazuje
všechny parametry, které zařízení má. Úpravy se mezi oběma pohledy přenášejí
a do zařízení se nic nedostane, dokud je neuložíte. Uložení zařízení restartuje,
viz [**Ukládání**](#saving).

Tlačítko sdílení v horní liště (**Sdílet konfiguraci**) pošle celou konfiguraci
jako text: pro každé nastavení jeden příkaz shellu `<module> config <name> <value>`,
včetně slotů tagů BLE a včetně úprav, které jste ještě neuložili. Je to záznam
konfigurace, který si můžete ponechat nebo poslat podpoře.

:::caution Sdílená konfigurace obsahuje klíče
Text obsahuje všechny hodnoty, které zařízení hlásí, včetně klíčů LoRaWAN.
Sdílejte ho jen s lidmi, kterým důvěřujete.
:::

---

## Rychlé nastavení {#quick-set-up}

Formulář nese v záhlaví zařízení, se kterým pracuje, například **CHESTER
2159019023**. Sekce se zobrazí, jen pokud je zařízení opravdu má.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-configuration.png" alt="Rychlé nastavení se sekcí Intervaly, Interval vzorkování 1 min a Interval hlášení 10 min, a se sekcí Komunikace s režimem LTE, nad tlačítky Pokročilá konfigurace a Uložit do CHESTER" width="320" />

Nastavení, které má popis, má vedle sebe tlačítko **?**. Klepnutím si přečtete,
co nastavení dělá.

### Intervaly {#intervals}

Sekce **Intervaly** obsahuje **Interval vzorkování** a **Interval hlášení**.
Každý se zadává číslem a jednotkou (s, min nebo h), s rychlou volbou běžných
hodnot. Povolený rozsah je uvedený pod polem, v jednotce, kterou jste zvolili.

### Komunikační režim {#communication-mode}

Sekce **Komunikace** začíná polem **Režim**: **Žádný**, **LTE** nebo
**LoRaWAN**, podle toho, co firmware nabízí. Pole zvoleného režimu se objeví
pod ním ve stejné sekci.

### LTE {#lte}

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-configuration-lte.png" alt="Sekce Komunikace s režimem LTE: SIM nastavená na Jiná, Režim rádia, APN, IP adresa a Anténa" width="320" />

| Nastavení | Možnosti |
|---|---|
| **SIM** | **Vodafone SIM**, nebo **Jiná** pro SIM kartu jiného operátora |
| **Režim rádia** | **LTE-M**, **NB-IoT** nebo **Both** (obě technologie) |
| **APN** | Název přístupového bodu datové služby SIM karty. Zobrazí se jen u volby **Jiná** |
| **IP adresa** | Adresa serveru, kam zařízení odesílá data. Jen číslice a tečky |
| **Anténa** | **Interní** nebo **Externí** |

**Vodafone SIM** ponechá APN prázdné, takže ho přidělí síť, nechá zařízení
vybrat síť automaticky a nastaví **Režim rádia** na **Both**. Aplikace sama
vybere **Vodafone SIM**, když zařízení tyto hodnoty už má. Volbu **Jiná**
použijte, když vaše SIM karta potřebuje konkrétní APN.

:::info Další nastavení LTE v pokročilé konfiguraci
Ostatní parametry LTE, například síť (PLMN ID), ověřování a pásma LTE, najdete
v **Pokročilá konfigurace → LTE**.
:::

### LoRaWAN {#lorawan}

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-configuration-lorawan.png" alt="Sekce Komunikace s režimem LoRaWAN, aktivací OTAA, pásmem EU868, prázdnou třídou a začátkem klíčů s nenastaveným DevEUI, nad tlačítky Pokročilá konfigurace a Uložit do CHESTER" width="320" />

| Nastavení | Možnosti |
|---|---|
| **Aktivace** | **OTAA** nebo **ABP** |
| **Pásmo** | Regionální frekvenční plán, například **EU868**. Musí odpovídat regionu brány |
| **Třída** | **Třída A** mezi odesíláním spí a má nejnižší spotřebu. **Třída C** nepřetržitě naslouchá downlinkům |

Pod nadpisem **Klíče** následují identifikátory a klíče zvolené aktivace:
**DevEUI**, **JoinEUI (AppEUI)** a **AppKey** pro OTAA; **DevAddr**,
**NwkSKey** a **AppSKey** pro ABP.

Pole klíčů přijímají šestnáctkový zápis s oddělovači i bez nich a ukazují, kolik
znaků se čeká, například *32 hex znaků (16 B)*. Každé má tlačítko kopírování
(**Kopírovat klíč**) a tlačítko, které vyplní náhodnou hodnotu (**Vygenerovat
náhodný klíč**). Pod klíči jsou:

- **Vygenerovat klíče** vyplní náhodnými hodnotami všechny klíče zvolené
  aktivace kromě DevEUI, který zařízení identifikuje.
- **Sdílet klíče** pošle aktivaci a její klíče jako text, abyste zařízení mohli
  zaregistrovat na síťovém serveru LoRaWAN.

---

## Pokročilá konfigurace {#advanced-configuration}

**Pokročilá konfigurace** dole v rychlém nastavení ukazuje **všechny** parametry,
které zařízení hlásí, seskupené podle modulů do sbalených karet. Které skupiny
se objeví, záleží na firmwaru: **Aplikace**, **LTE**, **LoRaWAN**,
**Bluetooth**, **BLE tagy**, **1-Wire** a další. Podnadpis každé karty uvádí
počet nastavení, například **12 nastavení**, k tomu kolik jste jich změnili
a kolik hodnot je mimo rozsah.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-advanced.png" alt="Pokročilá konfigurace s názvem zařízení nahoře a sbalenými skupinami Aplikace, Bluetooth, BLE tagy a CLOUD, u každé počet nastavení, nad tlačítky Přejít na rychlé nastavení a Uložit do zařízení" width="320" />

Po rozbalení skupiny se každé nastavení zobrazí podle svého typu: přepínač pro
logickou hodnotu, rozbalovací seznam pro pevnou sadu možností, číselné pole
s rozsahem, interval s jednotkou, šestnáctkové pole pro klíč. Tlačítko **?**
vedle nastavení ho vysvětlí.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-advanced-application.png" alt="Rozbalená skupina Aplikace s poli intervalů, u každého hodnota, jednotka a tlačítko nápovědy s otazníkem" width="320" />

Nastavení, která se neuplatní, jsou skrytá: práh a hystereze alarmu, dokud je
alarm vypnutý, a klíče LoRaWAN té aktivace, kterou nepoužíváte. Skryté
nastavení si úpravu, kterou jste v něm udělali, ponechá.

Ve firmwaru, který ho hlásí, obsahuje skupina **Bluetooth** passkey pro
párování. Když zůstane prázdný, použije zařízení tovární passkey vytištěný na
štítku.

Skupina **BLE tagy** uvádí **Sloty tagů se nespravují zde, ale v sekci BLE
tagy.** a tlačítkem **Otevřít BLE tagy** vás tam přenese, viz
[**BLE tagy**](./ble-tags.md).

**Přejít na rychlé nastavení** vás vrátí do formuláře s průvodcem.

---

## Ukládání {#saving}

Tlačítko pro uložení je dole na obrazovce: **Uložit do CHESTER** v rychlém
nastavení, **Uložit do zařízení** v pokročilé konfiguraci. Zůstane neaktivní,
dokud něco nezměníte a dokud nejsou všechny hodnoty platné. Hodnota mimo rozsah
je označená pod svým polem a lišta hlásí **Některé hodnoty jsou mimo rozsah nebo
neplatné – před zápisem je opravte.** s tlačítkem **Zobrazit**, které přejde na
první z nich.

Tlačítko s ikonou hodin se šipkou vedle záhlaví formuláře (**Vrátit změny**)
vaše úpravy zahodí. Když odcházíte s neuloženými úpravami, aplikace se zeptá
**Zahodit změny?**: **Pokračovat v úpravách**, nebo **Zahodit**.

Uložení zapíše každé změněné nastavení a pak je příkazem `config save` uloží do
paměti zařízení. **Zařízení se potom restartuje, aby změny použilo**, a tím se
Bluetooth spojení přeruší. Aplikace na zařízení počká a sama se k němu znovu
připojí:

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-reconnect.png" alt="Pruh Připojování k CHESTER se sériovým číslem, číslem pokusu a odpočtem do dalšího pokusu a s tlačítkem Zrušit" width="320" />

**Připojování k CHESTER** se sériovým číslem, s textem **Pokus 1 z 5** a odpočtem
do dalšího pokusu. První pokus přijde po 30 sekundách; všech pět pokusů
dohromady čeká nejvýš asi 9 minut. Tlačítkem **Zrušit** čekání ukončíte. Když
selžou všechny pokusy, aplikace to oznámí; připojte se znovu z obrazovky
[**Připojit k CHESTER**](./connect.md).

Shell zařízení hlásí problémy slovy, ne stavovými kódy, takže aplikace odpověď
přečte a řekne vám, co se stalo:

- pokud zařízení hodnotu odmítne, uložení selže a aplikace ocituje vlastní slova
  zařízení;
- pokud zápis selže v polovině, aplikace uvede nastavení, které selhalo, a
  upozorní, že konfigurace se uložila jen částečně. Načtěte ji znovu, abyste
  viděli aktuální stav;
- pokud se hodnoty zapíšou, ale závěrečný `config save` selže, aplikace upozorní,
  že se hodnoty při příštím restartu ztratí.

---

## Když se konfiguraci nepodaří přečíst {#if-the-read-comes-back-empty}

Zařízení, které neodpovídá nebo jehož firmware nepodporuje konfigurační příkazy
shellu, aplikace ohlásí jako **Žádná konfigurace** s uvedením důvodu a tlačítkem
**Zkusit znovu**, místo aby ukázala prázdný formulář. Držte zařízení blízko
telefonu a zkuste to znovu; pokud stále mlčí, připojte se znovu. Viz
[**Řešení problémů**](./troubleshooting.md).
