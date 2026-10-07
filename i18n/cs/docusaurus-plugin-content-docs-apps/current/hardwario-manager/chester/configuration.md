---
slug: configuration
title: Konfigurace
title_meta: "Konfigurace (HARDWARIO Manager pro CHESTER)"
---

# Konfigurace zařízení CHESTER {#configure-a-chester}

Otevřete **CHESTER → Configuration**. Aplikace přečte konfiguraci zařízení a
nabídne ji ve dvou zobrazeních: jako průvodce **Quick Set-up** a jako úplný přehled
**Advanced Configuration**. Úpravy se mezi nimi přenášejí a do zařízení se nic
nezapíše, dokud je neuložíte.

V záhlaví obrazovky je uvedené zařízení, se kterým pracujete, a akcí sdílení
v horní liště vyexportujete celou konfiguraci jako text.

---

## Rychlé nastavení {#quick-set-up}

Výchozí zobrazení obsahuje nastavení, která potřebuje většina nasazení. Sekce se
zobrazí jen tehdy, když je zařízení skutečně podporuje.

<img src="/img/hw-manager/hw-manager-chester-configuration.png" alt="Quick Set-up s intervaly vzorkování a odesílání, volbou komunikačního režimu a sekcí LTE" width="320" />

### Intervaly {#intervals}

**Sample interval** a **Report interval** v sekundách; pod každým polem je
uvedený povolený rozsah.

### Komunikační režim {#communication-mode}

**None**, **LTE** nebo **LoRaWAN**. Sekce níže se řídí touto volbou: po výběru
LTE se zobrazí sekce LTE, po výběru LoRaWAN sekce LoRaWAN.

### LTE {#lte}

<img src="/img/hw-manager/hw-manager-chester-configuration-lte.png" alt="Sekce LTE s volbami SIM, režimu rádia, IP adresy a antény nad tlačítky Go to Advanced Configuration a Save to CHESTER" width="320" />

| Nastavení | Volby |
|---|---|
| **SIM** | **Vodafone SIM**, nebo **Other** pro SIM od jakéhokoli jiného operátora |
| **Radio mode** | **LTE-M**, **NB-IoT** nebo **Both** |
| **IP address** | Adresa, na kterou zařízení odesílá data; nápověda uvádí výchozí hodnotu |
| **Antenna** | **Internal** nebo **External** |

:::info APN je v Advanced Configuration
Quick Set-up pole **APN** nemá. Pokud vaše SIM potřebuje konkrétní APN, nastavte
ho v **Advanced Configuration → LTE**, kde jsou všechny parametry LTE: APN, síť,
autentizace a další.
:::

### LoRaWAN {#lorawan}

Když jako komunikační režim zvolíte **LoRaWAN**, nastavíte režim aktivace
(**OTAA** nebo **ABP**), regionální pásmo (**band**), třídu zařízení (**class**)
a identifikátory a klíče pro zvolený režim aktivace: DevEUI, JoinEUI a AppKey pro OTAA; DevAddr a
klíče relace pro ABP.

Pole s klíči přijímají hexadecimální zápis s oddělovači i bez nich a ukazují,
kolik znaků se očekává. U každého je tlačítko pro zkopírování a tlačítko, které
vygeneruje náhodnou hodnotu.

---

## Rozšířená konfigurace {#advanced-configuration}

**Go to Advanced Configuration** zobrazí **všechny** parametry, které zařízení
hlásí, seskupené do sbalitelných karet. Které skupiny se zobrazí, závisí na
zařízení; to na obrázku hlásí Application, LoRaWAN, LTE a BLE tags. V podtitulku
každé karty je počet nastavení, která obsahuje.

<img src="/img/hw-manager/hw-manager-chester-advanced.png" alt="Advanced Configuration se skupinami Application, LoRaWAN, LTE a BLE tags a počty jejich nastavení" width="320" />

Po rozbalení skupiny se každé nastavení zobrazí podle svého typu: logická
hodnota jako přepínač, pevná sada voleb jako rozbalovací seznam, číslo jako pole
s jednotkou a povoleným rozsahem. Pod každým nastavením je jeho popis přímo
z firmwaru.

<img src="/img/hw-manager/hw-manager-chester-advanced-application.png" alt="Rozbalená skupina Application s přepínačem, dvěma poli intervalů s rozsahy a rozbalovacím seznamem režimu" width="320" />

Tlačítkem **Go to Quick Set-up** se vrátíte do průvodce.

---

## Ukládání {#saving}

**Save to CHESTER** (v rozšířeném zobrazení **Save to device**) zapíše všechna
změněná nastavení a pak je uloží do paměti zařízení. Tlačítko je neaktivní, dokud
nic nezměníte a dokud nejsou všechny hodnoty platné; hodnota mimo rozsah se
označí a zápis zablokuje.

Shell zařízení hlásí problémy textem, ne stavovými kódy, proto aplikace odpověď
přečte a sdělí vám, co se stalo:

- pokud zařízení hodnotu odmítne, uložení selže a aplikace ocituje hlášení
  zařízení;
- pokud zápis selže uprostřed, aplikace uvede nastavení, u kterého selhal, a
  upozorní, že se konfigurace uložila jen částečně. Aktuální stav uvidíte, když
  ji načtete znovu;
- pokud se hodnoty zapíšou, ale selže závěrečné uložení do paměti, aplikace
  upozorní, že se hodnoty při dalším restartu ztratí.

**Revert changes** úpravy zahodí.

---

## Když se konfiguraci nepodaří přečíst {#if-the-read-comes-back-empty}

Když zařízení neodpovídá nebo jeho firmware nepodporuje konfigurační příkazy
shellu, aplikace to oznámí a nezobrazí prázdnou konfiguraci. Držte zařízení
blízko telefonu a zkuste to znovu; pokud ani pak neodpoví, připojte se k němu
znovu. Viz [**Řešení problémů**](./troubleshooting.md).
