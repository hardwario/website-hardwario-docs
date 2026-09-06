---
slug: configuration
title: Konfigurace
description: "Otevřete CHESTER → Configuration. Aplikace přečte konfiguraci zařízení a pak"
title_meta: "Konfigurace (HARDWARIO Manager for CHESTER)"
---

# Konfigurace zařízení CHESTER {#configure-a-chester}

Otevřete **CHESTER → Configuration**. Aplikace přečte konfiguraci zařízení a pak
nabídne dva pohledy na ni: vedené **Quick Set-up** a plnou **Advanced
Configuration**. Vaše úpravy se mezi nimi přenášejí a do zařízení se nic
nedostane, dokud neuložíte.

Obrazovka má v záhlaví zařízení, se kterým pracuje, a akce sdílení v horní liště
vyexportuje celou konfiguraci jako text.

---

## Quick Set-up {#quick-set-up}

Výchozí pohled pokrývá nastavení, která většina nasazení potřebuje. Sekce se
objeví jen tehdy, když je zařízení skutečně má.

<img src="/img/hw-manager/hw-manager-chester-configuration.png" alt="Quick Set-up s intervaly vzorkování a reportování, volbou komunikačního režimu a sekcí LTE" width="320" />

### Intervaly {#intervals}

**Sample interval** a **Report interval**, v sekundách, každý s povoleným rozsahem
pod polem.

### Komunikační režim {#communication-mode}

**None**, **LTE** nebo **LoRaWAN**. Sekce níž se této volbě přizpůsobí. Zvolte
LTE a objeví se sekce LTE, zvolte LoRaWAN a dostanete tu pro LoRaWAN.

### LTE {#lte}

<img src="/img/hw-manager/hw-manager-chester-configuration-lte.png" alt="Sekce LTE s volbami SIM, režimu radia, IP adresy a antény nad tlačítky Go to Advanced Configuration a Save to CHESTER" width="320" />

| Nastavení | Volby |
|---|---|
| **SIM** | **Vodafone SIM**, nebo **Other** pro SIM od jakéhokoli jiného operátora |
| **Radio mode** | **LTE-M**, **NB-IoT** nebo **Both** |
| **IP address** | Adresa, na kterou se reportuje; nápověda označuje výchozí |
| **Antenna** | **Internal** nebo **External** |

:::info APN je v Advanced Configuration
Quick Set-up pole **APN** nemá. Pokud vaše SIM potřebuje konkrétní APN, nastavte
ho v **Advanced Configuration → LTE**, kde je celá sada parametrů LTE: APN, síť,
autentizace a zbytek.
:::

### LoRaWAN {#lorawan}

Volba **LoRaWAN** jako komunikačního režimu vám dá režim aktivace
(**OTAA** nebo **ABP**), regionální **band**, **class** zařízení a identifikátory
a klíče pro zvolený režim aktivace: DevEUI, JoinEUI a AppKey pro OTAA; DevAddr a
klíče session pro ABP.

Pole s klíči přijímají hex s oddělovači i bez nich a zobrazují očekávaný počet
znaků. Každé má tlačítko pro zkopírování a tlačítko, které vygeneruje náhodnou
hodnotu.

---

## Advanced Configuration {#advanced-configuration}

**Go to Advanced Configuration** zobrazí **každý** parametr, který zařízení hlásí,
seskupený do sbalitelných karet. Které skupiny se objeví, závisí na zařízení. To
níže hlásí Application, LoRaWAN, LTE a BLE tags. Podtitulek každé karty počítá
nastavení, která obsahuje.

<img src="/img/hw-manager/hw-manager-chester-advanced.png" alt="Advanced Configuration se skupinami Application, LoRaWAN, LTE a BLE tags a počty jejich nastavení" width="320" />

Rozbalte skupinu a každé nastavení se vykreslí podle svého typu: přepínač
u booleanu, rozbalovací nabídka u pevné sady voleb, číselné pole s jednotkou a
povoleným rozsahem, a pod tím je popis přímo z firmwaru.

<img src="/img/hw-manager/hw-manager-chester-advanced-application.png" alt="Rozbalená skupina Application s přepínačem, dvěma poli intervalů s rozsahy a rozbalovací nabídkou režimu" width="320" />

**Go to Quick Set-up** se vrátí do vedeného pohledu.

---

## Ukládání {#saving}

**Save to CHESTER** (v pokročilém pohledu **Save to device**) zapíše každé
změněné nastavení a pak je zapíše do paměti zařízení. Tlačítko zůstává neaktivní,
dokud se něco nezmění a všechno není validní; hodnota mimo rozsah se označí a
zápis zablokuje.

Shell zařízení hlásí problémy slovy, ne stavovými kódy, takže aplikace odpověď
přečte a řekne vám, co se stalo:

- pokud zařízení hodnotu odmítne, uložení selže a cituje vlastní slova zařízení;
- pokud zápis selže v polovině, aplikace pojmenuje nastavení, které selhalo, a
  upozorní, že konfigurace byla uložená jen částečně. Načtěte ji znovu, abyste
  viděli aktuální stav;
- pokud zápisy projdou, ale závěrečné potvrzení selže, aplikace upozorní, že se
  hodnoty při dalším restartu ztratí.

**Revert changes** vaše úpravy zahodí.

---

## Když se čtení vrátí prázdné {#if-the-read-comes-back-empty}

Zařízení, které neodpovídá, nebo jehož firmware nepodporuje shell příkazy pro
konfiguraci, se ohlásí jako takové, místo aby se zobrazilo jako prázdná
konfigurace. Držte zařízení blízko telefonu a zkuste to znovu; pokud dál mlčí,
připojte se znovu. Viz [**Řešení problémů**](./troubleshooting.md).
