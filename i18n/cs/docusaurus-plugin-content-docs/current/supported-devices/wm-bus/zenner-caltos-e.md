---
slug: zenner-caltos-e
title: Zenner caltos-E
description: "Webové stránky"
---
import Image from '@theme/IdealImage';

# Zenner caltos-E {#zenner-caltos-e}

[Webové stránky](https://zenner.com/products/hkv_caltos_e/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/zenner-caltos-e.png')} width={376} height={376} alt="Bílý indikátor topných nákladů Zenner caltos E s malým LCD a QR kódem" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Popis {#description}

Elektronický indikátor topných nákladů caltos E přesně zaznamenává spotřebu tepla radiátoru pomocí pokročilého měření teploty. Jeho integrované rozhraní wireless M-Bus (wM-Bus) zajišťuje spolehlivý přenos dat pro moderní aplikace dílčího měření.

## Konfigurace {#configuration}

:::info

Zařízení je dodáváno **předkonfigurované**.
:::

## Konfigurace wireless M-Bus adresy {#wireless-m-bus-address-configuration}

### Kde na zařízení najdete adresu {#where-to-find-the-address-on-the-device}

Adresa se nachází **úplně dole na zařízení**, jak je vidět na obrázku níže (8 číslic).  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/zenner-caltos-e.png')} width={376} height={376} alt="caltos E s osmimístnou wM-Bus adresou vyznačenou úplně dole na krabičce" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

### Mapování wM-Bus adresy do zařízení CHESTER {#mapping-the-wm-bus-address-to-chester}

Mapování je nutné provést pomocí **CHESTER Terminal**, například s:  

- [**HARDWARIO Monitor (Windows)**](https://github.com/hardwario/hio-monitor/releases)
- [**HARDWARIO Manager (Android)**](https://play.google.com/store/apps/details?id=com.hardwario.manager)
- [**Google Chrome Terminal**](https://terminal.hardwario.com/)

---

### Správa a přidávání wM-Bus adres zařízení v CHESTER {#managing-and-adding-wm-bus-device-addresses-in-chester}

Zde můžete spravovat seznam **wM-Bus adres** (**přidat/odebrat**), upravit nastavení skenování a projít si příklady konfigurace pro typická nasazení.  

- [**Konfigurace seznamu adres**](/chester/catalog-applications/chester-wm-bus#address-list-configuration): **správa a úprava** seznamu propojených wM-Bus **adres**  
- [**Konfigurace skenování**](/chester/catalog-applications/chester-wm-bus#scan-configuration): **úprava nastavení skenování** pro komunikaci se zařízeními 
- [**Příklady konfigurace**](/chester/catalog-applications/chester-wm-bus#example-configurations): referenční **šablony** pro typická nasazení 

---

## Šifrování zpráv a správa klíčů {#message-encryption-and-key-management}

**Přenášené zprávy jsou šifrované**, aby se optimalizovala spotřeba energie při přenosu dat, což prodlužuje celkovou výdrž baterie.

**Přijatá data je proto nutné dešifrovat**, což se provádí pomocí **dešifrovacích klíčů**.  
K tomu máte dvě možnosti:

- [**HARDWARIO Cloud**](/chester/catalog-applications/chester-wm-bus#hardwario-cloud--decryption-keys): návod, jak zadat a spravovat dešifrovací klíče  
- [**Dešifrovací stránka**](https://wmbusmeters.org/): online nástroj pro ruční dešifrování a analýzu dat
