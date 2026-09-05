---
slug: zenner-minomess
title: Zenner Minomess
description: "Web-Site"
---
import Image from '@theme/IdealImage';

# Zenner Minomess {#zenner-minomess}

[Web-Site](https://zenner.com/products/wwz_minomess_lorawan_wm-bus-2/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/zenner-minomess.png')} width={376} height={376} alt="Vodoměr Zenner Minomess s válečkovým počítadlem a označením wM-Bus na čelní straně" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Popis {#description}

Vodoměr Minomess je kompaktní suchoběžný vodoměr se stíněnou magnetickou spojkou a sedmimístným válečkovým počítadlem. Je vybaven rádiovým modulem wireless M-Bus (wM-Bus) pro snadnou integraci do systémů dálkového odečtu.

## Konfigurace {#configuration}

:::info

Zařízení je dodáváno **předkonfigurované**.
:::

## Konfigurace adresy wireless M-Bus {#wireless-m-bus-address-configuration}

### Kde na zařízení najdete adresu {#where-to-find-the-address-on-the-device}

Adresa je zobrazena **na displeji zařízení, vlevo od jednotky m³**, jak je vidět na obrázku níže (8 číslic).  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/zenner-minomess.png')} width={376} height={376} alt="Číselník Minomess s osmimístnou adresou wM-Bus vyznačenou vlevo od jednotky m3 na displeji" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

### Mapování adresy wM-Bus do zařízení CHESTER {#mapping-the-wm-bus-address-to-chester}

Mapování je nutné provést pomocí **CHESTER Terminal**, například s:  

- [**HARDWARIO Monitor (Windows)**](https://github.com/hardwario/hio-monitor/releases)
- [**HARDWARIO Manager (Android)**](https://play.google.com/store/apps/details?id=com.hardwario.manager)
- [**Google Chrome Terminal**](https://terminal.hardwario.com/)

---

### Správa a přidávání adres zařízení wM-Bus v zařízení CHESTER {#managing-and-adding-wm-bus-device-addresses-in-chester}

Zde můžete spravovat seznam **adres wM-Bus** (**přidávat/odebírat**), upravovat nastavení skenování a prohlédnout si ukázkové konfigurace pro typická nastavení.  

- [**Konfigurace seznamu adres**](/chester/catalog-applications/chester-wm-bus#address-list-configuration): **správa a úprava** seznamu propojených **adres** wM-Bus  
- [**Konfigurace skenování**](/chester/catalog-applications/chester-wm-bus#scan-configuration): **úprava nastavení skenování** pro komunikaci se zařízeními 
- [**Ukázkové konfigurace**](/chester/catalog-applications/chester-wm-bus#example-configurations): referenční **šablony** pro typická nastavení 

---

## Šifrování zpráv a správa klíčů {#message-encryption-and-key-management}

**Přenášené zprávy jsou šifrovány** kvůli optimalizaci spotřeby energie při přenosu dat, což prodlužuje celkovou životnost baterie.

**Přijatá data je proto nutné dešifrovat**, což se provádí pomocí **dešifrovacích klíčů**.  
K tomu existují dvě možnosti:

- [**HARDWARIO Cloud**](/chester/catalog-applications/chester-wm-bus#hardwario-cloud--decryption-keys): návod, jak zadávat a spravovat dešifrovací klíče  
- [**Dešifrovací stránka**](https://wmbusmeters.org/): online nástroj pro manuální dešifrování a analýzu dat
