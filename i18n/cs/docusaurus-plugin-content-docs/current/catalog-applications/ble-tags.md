---
slug: ble-tags
title: Bluetooth Tagy
description: "Platforma CHESTER obsahuje dedikovaný subsystém pro senzory Teltonika EYE, který umožňuje bezproblémovou integraci až osmi Bluetooth tagů pro monitorování teploty a vlhkosti."
---

import Image from '@theme/IdealImage';

# Subsystém BLE Tag pro CHESTER {#chester-ble-tag-subsystem}

Platforma **CHESTER** obsahuje dedikovaný **subsystém pro senzory Teltonika EYE**, který umožňuje bezproblémovou integraci až osmi Bluetooth tagů pro monitorování teploty a vlhkosti.  
Tento subsystém poskytuje spolehlivé bezdrátové snímání prostředí pro širokou škálu aplikací.

---

## 1. Aktivace subsystému {#1-activating-the-subsystem}

Subsystém **pro senzory Teltonika EYE** aktivujete následujícím příkazem:

```
tag config enabled true
```

Po zapnutí subsystému uložte konfiguraci a restartujte zařízení **CHESTER**, aby se změna projevila:

```
config save
```

```
device restart
```

---

## 2. Aktivace tagu {#2-tag-activation}

:::info
**Zabalený senzor by měl přijít již aktivovaný.**  
Pokud aktivní není, přiložte k senzoru **magnet** a probuďte ho tak z režimu hibernace, jak ukazuje obrázek níže.
:::

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '376px', height: '250px' }}>
        <Image img={require('../../../../../chester/catalog-applications/images/tag-magnet.png')} alt="Magnet přiložený k senzoru Teltonika EYE pro jeho probuzení; zelená LED potvrzuje aktivaci" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

<br />

---

## 3. Registrace tagů {#3-enrolling-tags}

Než je možné senzory používat, musí je zařízení nejprve **zaregistrovat**.

Registrace tagu:
1. Umístěte tag blízko k zařízení **CHESTER**.
2. Spusťte níže uvedený příkaz a vyčkejte až 10 sekund na vyhledání.

```
tag enroll
```

Můžete také definovat **volitelný limit síly signálu** (od `-128` do `0 dBm`) a řídit tak citlivost registrace.  
Nižší hodnoty (např. `-128 dBm`) poskytují větší dosah, zatímco vyšší hodnoty (např. `-40 dBm`, výchozí) jsou striktnější.

```
tag enroll <threshold>
```

Příklad:

```
tag enroll -55
```

Po dokončení registrace ji učiňte **trvalou** uložením konfigurace:

```
config save
```

Seznam všech aktuálně zaregistrovaných tagů vypíšete příkazem:

```
tag list
```

---

## 4. Ruční správa tagů {#4-manual-tag-management}

Místo automatické registrace můžete tagy přidávat nebo odebírat ručně podle jejich **MAC adresy**.

### Přidání tagu {#add-a-tag}

Tag přidáte ručně příkazem:

```
tag config devices add <MAC_ADDRESS>
```

Příklad:

```
tag config devices add 7cd9f413e360
```

### Odebrání tagu {#remove-a-tag}

Dříve přidaný tag odeberete příkazem:

```
tag config devices remove <MAC_ADDRESS>
```

Příklad:

```
tag config devices remove 7cd9f413e360
```

Po přidání nebo odebrání tagů uložte konfiguraci:

```
config save
```

---

## 5. Konfigurace přes aplikaci EYE {#5-configuring-via-eye-app}

Tagy lze konfigurovat pomocí [**aplikace Teltonika EYE**](https://wiki.teltonika-gps.com/view/EYE_SENSOR_/_BTSMP1#EYE_App_Configuration).  
Důrazně doporučujeme aktualizovat firmware, protože výchozí verze neumožňuje některá pokročilá nastavení.

### Jak provést konfiguraci {#how-to-configure}

1. Otevřete **aplikaci EYE** a vyberte zařízení ze seznamu.  
2. Klepnutím na tlačítko **CONFIGURE** otevřete obrazovku nastavení zařízení.  
3. Upravte konfigurační volby podle potřeby.  
   *(Poznámka: Aplikace pro Android poskytuje podrobnější informace, například název zařízení, adresu a sériové číslo. Verze pro iOS je omezenější.)*

:::info 
Přístup ke konfiguraci vyžaduje PIN kód. 

**Výchozí PIN: 123456**

Tento PIN lze později změnit v nastavení zařízení. 
:::

#### Aplikace Teltonika EYE – přehled zařízení {#teltonika-eye-app--device-overview}

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div>
        <Image img={require('../../../../../chester/catalog-applications/images/ble-app-settings.png')} width={200} height={200} alt="Přehled zařízení v aplikaci EYE se hodnotami ze senzoru, stavem firmwaru a tlačítkem CONFIGURE" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

### Doporučená konfigurace {#recommended-configuration}

Následující konfiguraci doporučujeme pro optimální výkon komunikace a energetickou účinnost při použití senzorů Teltonika EYE se subsystémem BLE Tag pro CHESTER.
Toto nastavení zajišťuje stabilní přenos dat, dostatečnou frekvenci vysílání pro spolehlivé vyhledání senzoru a vyváženou spotřebu energie.

#### Aplikace Teltonika EYE – konfigurace zařízení {#teltonika-eye-app--device-configuration}

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div>
        <Image img={require('../../../../../chester/catalog-applications/images/ble-settings.png')} width={200} height={200} alt="Konfigurační obrazovka aplikace EYE: vysílací výkon 4 dBm, interval vysílání 10 s, paket Sensors, aktivní teplota a vlhkost" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>


#### Tabulka konfiguračních nastavení {#configuration-settings-table}

| **Nastavení**         | **Hodnota**           |
| --------------------- | --------------------- |
| Nastavení výkonu signálu | 4 dBm              |
| Interval vysílání     | 10 s                  |
| Nastavení paketu      | Sensors               |
| Aktivní senzory       | Teplota, vlhkost      |

---

## 6. Testování signálu {#6-signal-testing}

Efektivní komunikační dosah mezi zařízením **CHESTER** a senzory Teltonika závisí na **konfiguraci výkonu signálu** tagu.

Sílu signálu otestujete příkazem:

```
tag read
```

Ve výstupu zkontrolujte hodnotu **RSSI**:
- Pokud je signál **nižší než -85 dBm**, zvažte zvýšení úrovně výkonu tagu pro lepší stabilitu.

## 7. Měřené parametry {#7-measured-parameters}

| Měřená veličina         | Popis                                                        |
|-------------------------|--------------------------------------------------------------|
| Teplota                 | Teplota okolního prostředí senzoru.|
| Vlhkost                 | Relativní vlhkost okolního vzduchu. |
| Pohyb / akcelerometr    | Detekuje pohyb a změny orientace (pitch/roll) zařízení. |
| Detekce magnetu         | Detekuje změny magnetického pole, např. otevření/zavření dveří pomocí magnetu. |
| Napětí / stav baterie   | Sleduje napětí interní baterie (pro odhad zbývající životnosti).|


:::tip
Pokud potřebujete další pomoc nebo vizuální návod, podívejte se na  
[**video průvodce**](https://docs.hardwario.com/chester/videos-chester/chester-pair-tag).
:::
