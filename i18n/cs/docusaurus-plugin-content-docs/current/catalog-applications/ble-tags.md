---
slug: ble-tags
title: Bluetooth tagy
---

import Image from '@theme/IdealImage';

# Subsystém BLE Tag pro CHESTER {#chester-ble-tag-subsystem}

Platforma **CHESTER** obsahuje vyhrazený **subsystém pro senzory Teltonika EYE**, se kterým připojíte až osm Bluetooth tagů pro sledování teploty a vlhkosti.  
Získáte tak spolehlivé bezdrátové měření podmínek prostředí pro nejrůznější použití.

---

## 1. Aktivace subsystému {#1-activating-the-subsystem}

**Subsystém pro senzory Teltonika EYE** zapnete tímto příkazem:

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
**Senzor by měl být při dodání už aktivovaný.**  
Pokud aktivní není, přiložte k senzoru **magnet** a probuďte ho tak z režimu hibernace, jak ukazuje obrázek níže.
:::

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div style={{ width: '376px', height: '250px' }}>
        <Image img={require('../../../../../chester/catalog-applications/images/tag-magnet.png')} alt="K senzoru Teltonika EYE je přiložený magnet, který ho probudí; zelená LED potvrzuje aktivaci" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

<br />

---

## 3. Registrace tagů {#3-enrolling-tags}

Než je možné senzory používat, musí je zařízení nejprve **zaregistrovat**.

Postup registrace tagu:
1. Položte tag do blízkosti zařízení **CHESTER**.
2. Spusťte příkaz níže a počkejte až 10 sekund, než zařízení tag najde.

```
tag enroll
```

Citlivost registrace můžete řídit **volitelnou prahovou hodnotou síly signálu** (od `-128` do `0 dBm`).  
Nižší hodnota (např. `-128 dBm`) znamená větší dosah, vyšší hodnota (např. `-40 dBm`, což je výchozí hodnota) je přísnější.

```
tag enroll <threshold>
```

Příklad:

```
tag enroll -55
```

Aby registrace platila **trvale**, uložte po jejím dokončení konfiguraci:

```
config save
```

Seznam všech aktuálně zaregistrovaných tagů vypíšete příkazem:

```
tag list
```

---

## 4. Ruční správa tagů {#4-manual-tag-management}

Místo automatické registrace můžete tagy přidávat nebo odebírat ručně podle **MAC adresy**.

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

Tagy nastavíte v [**aplikaci Teltonika EYE**](https://wiki.teltonika-gps.com/view/EYE_SENSOR_/_BTSMP1#EYE_App_Configuration).  
Důrazně doporučujeme aktualizovat firmware, protože ve výchozí verzi některá pokročilá nastavení chybí.

### Postup konfigurace {#how-to-configure}

1. Otevřete **aplikaci EYE** a vyberte zařízení ze seznamu.  
2. Klepnutím na tlačítko **CONFIGURE** otevřete obrazovku nastavení zařízení.  
3. Upravte nastavení podle potřeby.  
   *(Poznámka: Aplikace pro Android zobrazuje podrobnější informace, například název zařízení, adresu a sériové číslo. Verze pro iOS jich ukazuje méně.)*

:::info 
Konfigurace je chráněná PIN kódem. 

**Výchozí PIN: 123456**

PIN můžete později změnit v nastavení zařízení. 
:::

#### Aplikace Teltonika EYE – přehled zařízení {#teltonika-eye-app--device-overview}

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div>
        <Image img={require('../../../../../chester/catalog-applications/images/ble-app-settings.png')} width={200} height={200} alt="Přehled zařízení v aplikaci EYE s hodnotami ze senzoru, stavem firmwaru a tlačítkem CONFIGURE" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>

### Doporučená konfigurace {#recommended-configuration}

Pro senzory Teltonika EYE používané se subsystémem BLE Tag zařízení CHESTER doporučujeme následující konfiguraci, se kterou senzory komunikují optimálně a úsporně.
Data se s ní přenášejí stabilně, senzor vysílá dost často na to, aby ho zařízení spolehlivě našlo, a spotřeba energie zůstává vyvážená.

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

Skutečný dosah komunikace mezi zařízením **CHESTER** a senzory Teltonika závisí na tom, jaký **výkon signálu** má tag nastavený.

Sílu signálu otestujete příkazem:

```
tag read
```

Ve výstupu zkontrolujte hodnotu **RSSI**:
- Pokud je signál **nižší než -85 dBm**, zvažte zvýšení výkonu tagu, aby bylo spojení stabilnější.

## 7. Měřené parametry {#7-measured-parameters}

| Měřená veličina         | Popis                                                        |
|-------------------------|--------------------------------------------------------------|
| Teplota                 | Teplota okolí senzoru.|
| Vlhkost                 | Relativní vlhkost okolního vzduchu. |
| Pohyb / akcelerometr    | Detekuje pohyb a změny orientace (pitch/roll) zařízení. |
| Detekce magnetu         | Detekuje změny magnetického pole, např. otevření/zavření dveří pomocí magnetu. |
| Napětí / stav baterie   | Sleduje napětí vnitřní baterie (pro odhad zbývající výdrže).|


:::tip
Pokud potřebujete další pomoc nebo názorný postup, podívejte se na  
[**videonávod**](/chester/videos-chester/chester-pair-tag).
:::
