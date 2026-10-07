---
slug: bmeters-hydroclima-2
title: BMeters Hydroclima 2
---
import Image from '@theme/IdealImage';

# BMeters Hydroclima 2 {#bmeters-hydroclima-2}

[Webové stránky](https://www.bmeters.com/en/products/hydroclima-2/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/bmeters-hydroclima-2.png')} width={376} height={376} alt="Bílý indikátor topných nákladů BMeters Hydroclima 2 s čárovým kódem, displejem a tlačítkem" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />


## Popis {#description}

HYDROCLIMA-2 je indikátor topných nákladů se dvěma teplotními senzory, který zaznamenává i teplotu okolí. Komunikuje bezdrátově přes wireless M-Bus, baterie vydrží 10 let a zařízení uchovává až 24 měsíců historie spotřeby a teplot.

## Konfigurace {#configuration}

:::info

Zařízení se dodává **předkonfigurované**, ale v programu [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering) ho můžete přeprogramovat a upravit.

:::

### Postup konfigurace {#configuration-procedure}

Indikátor se programuje a nastavuje rádiem pomocí [**přijímače RFM-RX2**](https://www.bmeters.com/en/products/rfm-rx2/) a programu [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering).

Program BMetering musí být správně nastavený. Konfiguraci pak spustíte tlačítkem na indikátoru:

- indikátor v továrním stavu: stiskněte tlačítko na < 1 s,
- již nastavený indikátor: podržte tlačítko > 5 s, dokud se na displeji
nezobrazí „rF“.

Postup konfigurace indikátoru popisuje
**uživatelská příručka programu BMetering**.

## Konfigurace adresy wM-Bus {#wireless-m-bus-address-configuration}

### Kde na zařízení najdete adresu {#where-to-find-the-address-on-the-device}

Adresa (8 číslic) je **nad čárovým kódem a pod displejem**, viz obrázek níže.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/bmeters-hydroclima-2.png')} width={376} height={376} alt="Hydroclima 2 s vyznačenou osmimístnou adresou wM-Bus vedle čárového kódu nad displejem" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

### Přiřazení adresy wM-Bus k zařízení CHESTER {#mapping-the-wm-bus-address-to-chester}

Adresu přiřadíte v **terminálu CHESTER**, například v těchto aplikacích:

- [**HARDWARIO Monitor (Windows)**](https://github.com/hardwario/hio-monitor/releases)
- [**HARDWARIO Manager (Android)**](https://play.google.com/store/apps/details?id=com.hardwario.manager)
- [**Terminál pro Google Chrome**](https://terminal.hardwario.com/)

---

### Přidávání a správa adres wM-Bus v zařízení CHESTER {#managing-and-adding-wm-bus-device-addresses-in-chester}

Správu seznamu **adres wM-Bus** (**přidávání a odebírání**), nastavení skenování i příklady konfigurací pro typická nasazení popisuje dokumentace aplikace CHESTER wM-Bus:

- [**Konfigurace seznamu adres**](/chester/catalog-applications/chester-wm-bus#address-list-configuration): **správa a úprava** seznamu propojených **adres** wM-Bus
- [**Konfigurace skenování**](/chester/catalog-applications/chester-wm-bus#scan-configuration): **úprava nastavení skenování** pro komunikaci se zařízeními
- [**Příklady konfigurací**](/chester/catalog-applications/chester-wm-bus#example-configurations): referenční **šablony** pro typická nasazení

---

## Šifrování zpráv a správa klíčů {#message-encryption-and-key-management}

**Odesílané zprávy jsou šifrované**, aby se při přenosu dat šetřila energie a prodloužila výdrž baterie.

**Přijatá data je proto nutné dešifrovat** pomocí **dešifrovacích klíčů**.  
Máte dvě možnosti:

- [**HARDWARIO Cloud**](/chester/catalog-applications/chester-wm-bus#hardwario-cloud--decryption-keys): návod, jak zadávat a spravovat dešifrovací klíče
- [**Dešifrovací stránka**](https://wmbusmeters.org/): online nástroj pro ruční dešifrování a analýzu dat
