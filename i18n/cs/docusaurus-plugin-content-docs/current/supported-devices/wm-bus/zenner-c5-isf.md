---
slug: zenner-c5-isf
title: Zenner C5-ISF
description: "Webové stránky"
---
import Image from '@theme/IdealImage';

# Zenner C5-ISF {#zenner-c5-isf}

[Webové stránky](https://zenner.com/products/wmz_zelsius_c5_isf-2/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/zenner-c5-isf.png')} width={376} height={376} alt="Měřič tepelné energie Zenner zelsius C5-ISF s LCD displejem a jednovtokovým průtokovým senzorem z mosazi" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Popis {#description}

Měřič zelsius C5-ISF je kompaktní a přesný měřič tepelné energie s robustním jednovtokovým průtokovým senzorem. Disponuje komunikačním rozhraním wireless M-Bus (wM-Bus) pro efektivní a přesné vzdálené sledování spotřeby.

## Konfigurace {#configuration}

:::info

Zařízení je dodáváno **předkonfigurované**.
:::

## Konfigurace adresy Wireless M-Bus {#wireless-m-bus-address-configuration}

### Kde na zařízení najít adresu {#where-to-find-the-address-on-the-device}

Adresa se nachází **ve středu pod čárovým kódem** a tvoří ji **poslední dvě skupiny čtyř číslic**, jak je znázorněno na obrázku níže (8 číslic).  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/zenner-c5-isf.png')} width={376} height={376} alt="C5-ISF s vyznačenými posledními dvěma čtyřčíselnými skupinami sériového čísla jako adresou wM-Bus" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

### Přiřazení adresy wM-Bus k zařízení CHESTER {#mapping-the-wm-bus-address-to-chester}

Přiřazení je nutné provést pomocí **terminálu CHESTER**, například s:  

- [**HARDWARIO Monitor (Windows)**](https://github.com/hardwario/hio-monitor/releases)
- [**HARDWARIO Manager (Android)**](https://play.google.com/store/apps/details?id=com.hardwario.manager)
- [**Terminál v Google Chrome**](https://terminal.hardwario.com/)

---

### Správa a přidávání adres zařízení wM-Bus v zařízení CHESTER {#managing-and-adding-wm-bus-device-addresses-in-chester}

Zde můžete spravovat seznam **adres wM-Bus** (**přidávat/odebírat**), upravovat nastavení skenování a prohlédnout si ukázkové konfigurace pro typická nasazení.  

- [**Konfigurace seznamu adres**](/chester/catalog-applications/chester-wm-bus#address-list-configuration) – **správa a úprava** seznamu propojených **adres** wM-Bus  
- [**Konfigurace skenování**](/chester/catalog-applications/chester-wm-bus#scan-configuration) – **úprava nastavení skenování** pro komunikaci se zařízeními 
- [**Ukázkové konfigurace**](/chester/catalog-applications/chester-wm-bus#example-configurations) – referenční **šablony** pro typická nasazení 

---

## Šifrování zpráv a správa klíčů {#message-encryption-and-key-management}

**Přenášené zprávy jsou šifrované**, aby se optimalizovala spotřeba energie při přenosu dat, což prodlužuje celkovou životnost baterie.

**Přijatá data je proto nutné dešifrovat**, což se provádí pomocí **dešifrovacích klíčů**.  
K tomu máte dvě možnosti:

- [**HARDWARIO Cloud**](/chester/catalog-applications/chester-wm-bus#hardwario-cloud--decryption-keys) – návod, jak zadávat a spravovat dešifrovací klíče  
- [**Dešifrovací stránka**](https://wmbusmeters.org/) – online nástroj pro manuální dešifrování a analýzu dat
