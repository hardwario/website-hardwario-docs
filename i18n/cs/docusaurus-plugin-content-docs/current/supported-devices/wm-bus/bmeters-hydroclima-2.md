---
slug: bmeters-hydroclima-2
title: BMeters Hydroclima 2
description: "Webové stránky"
---
import Image from '@theme/IdealImage';

# BMeters Hydroclima 2 {#bmeters-hydroclima-2}

[Webové stránky](https://www.bmeters.com/en/products/hydroclima-2/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/bmeters-hydroclima-2.png')} width={376} height={376} alt="Bílý indikátor rozdělovače tepla BMeters Hydroclima 2 s čárovým kódem, displejem a tlačítkem" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />


## Popis {#description}

HYDROCLIMA-2 je indikátor rozdělovače nákladů na teplo se dvěma teplotními senzory a záznamem teploty okolí. Nabízí bezdrátovou komunikaci wM-Bus, desetiletou životnost baterie a poskytuje až 24 měsíců historických statistik spotřeby a teplot.

## Konfigurace {#configuration}

:::info

Zařízení je dodáváno **předkonfigurované**, lze jej však přeprogramovat a přizpůsobit pomocí [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering).

:::

### Postup konfigurace {#configuration-procedure}

Programování a konfigurace zařízení se provádí bezdrátově pomocí [**přijímače RFM-RX2**](https://www.bmeters.com/en/products/rfm-rx2/) a [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering).

Pro spuštění konfiguračního postupu musí být software BMetering správně nastaven:

- u indikátoru ve výrobním stavu stiskněte tlačítko na < 1 s
- u již nakonfigurovaného indikátoru stiskněte tlačítko na > 5 s, dokud se na displeji
nezobrazí zpráva „rF“.

Způsob konfigurace indikátoru je popsán v dokumentaci
týkající se **uživatelské příručky softwaru Bmetering**.

## Konfigurace adresy wM-Bus {#wireless-m-bus-address-configuration}

### Kde na zařízení najít adresu {#where-to-find-the-address-on-the-device}

Adresa se nachází **nad čárovým kódem a pod displejem**, jak je znázorněno na obrázku níže (8 číslic).

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

### Mapování adresy wM-Bus do zařízení CHESTER {#mapping-the-wm-bus-address-to-chester}

Mapování se musí provést pomocí **CHESTER Terminal**, například s využitím:

- [**HARDWARIO Monitor (Windows)**](https://github.com/hardwario/hio-monitor/releases)
- [**HARDWARIO Manager (Android)**](https://play.google.com/store/apps/details?id=com.hardwario.manager)
- [**terminálu v Google Chrome**](https://terminal.hardwario.com/)

---

### Správa a přidávání adres zařízení wM-Bus v zařízení CHESTER {#managing-and-adding-wm-bus-device-addresses-in-chester}

Zde můžete spravovat seznam **adres wM-Bus** (**přidávat/odebírat**), upravovat nastavení skenování a prohlédnout si příklady konfigurací pro typická nasazení.

- [**Konfigurace seznamu adres**](/chester/catalog-applications/chester-wm-bus#address-list-configuration): **správa a úprava** seznamu propojených **adres** wM-Bus
- [**Konfigurace skenování**](/chester/catalog-applications/chester-wm-bus#scan-configuration): **úprava nastavení skenování** pro komunikaci se zařízeními
- [**Příklady konfigurací**](/chester/catalog-applications/chester-wm-bus#example-configurations): referenční **šablony** pro typická nasazení

---

## Šifrování zpráv a správa klíčů {#message-encryption-and-key-management}

**Přenášené zprávy jsou šifrované**, aby se optimalizovala spotřeba energie při přenosu dat, což prodlužuje celkovou životnost baterie.

**Přijatá data je proto nutné dešifrovat**, což se provádí pomocí **dešifrovacích klíčů**.  
K tomu existují dvě možnosti:

- [**HARDWARIO Cloud**](/chester/catalog-applications/chester-wm-bus#hardwario-cloud--decryption-keys): návod, jak zadávat a spravovat dešifrovací klíče
- [**Stránka pro dešifrování**](https://wmbusmeters.org/): online nástroj pro manuální dešifrování a analýzu dat
